/**
 * In-memory rate limiter for API routes.
 *
 * Uses a sliding-window approach per IP address. Entries auto-expire
 * after `windowMs` to prevent memory leaks. Safe for single-instance
 * deployments (Vercel serverless). For multi-instance, swap to
 * Redis-backed rate limiting.
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Cleanup stale entries every 60 seconds to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  rateLimitMap.forEach((entry, key) => {
    if (now > entry.resetTime) {
      rateLimitMap.delete(key);
    }
  });
}, 60_000);

interface RateLimitOptions {
  /** Max requests allowed within the window */
  maxRequests: number;
  /** Time window in milliseconds */
  windowMs: number;
}

/**
 * Check if a request should be rate-limited.
 *
 * @param identifier  Unique key for this limiter (e.g. `send-msg:${ip}`)
 * @param options     Max requests and time window
 * @returns `{ limited: true, retryAfterMs }` if rate-limited, otherwise `{ limited: false }`
 */
export function rateLimit(
  identifier: string,
  options: RateLimitOptions
): { limited: boolean; retryAfterMs?: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry || now > entry.resetTime) {
    // First request or window has expired — start fresh
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + options.windowMs,
    });
    return { limited: false };
  }

  if (entry.count >= options.maxRequests) {
    return {
      limited: true,
      retryAfterMs: entry.resetTime - now,
    };
  }

  entry.count++;
  return { limited: false };
}

/**
 * Extract client IP from a Request object.
 * Works on Vercel (x-forwarded-for) and locally.
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    // x-forwarded-for can be comma-separated; first entry is the real client
    return forwarded.split(',')[0].trim();
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp;
  return '127.0.0.1';
}

/** Standard 429 response helper */
export function rateLimitResponse(retryAfterMs?: number) {
  return Response.json(
    {
      success: false,
      message: 'Too many requests. Please slow down and try again later.',
    },
    {
      status: 429,
      headers: {
        'Retry-After': String(Math.ceil((retryAfterMs || 60000) / 1000)),
      },
    }
  );
}

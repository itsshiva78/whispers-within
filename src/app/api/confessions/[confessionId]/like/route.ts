import dbConnect from '@/lib/dbConnect';
import ConfessionModel from '@/model/Confession';
import { rateLimit, getClientIp, rateLimitResponse } from '@/lib/rateLimit';

export async function POST(request: Request, { params }: { params: { confessionId: string } }) {
  // Rate limit: 30 likes per minute per IP (prevents like-bombing)
  const ip = getClientIp(request);
  const { limited, retryAfterMs } = rateLimit(`like:${ip}`, {
    maxRequests: 30,
    windowMs: 60_000,
  });
  if (limited) return rateLimitResponse(retryAfterMs);

  // Per-confession rate limit: 1 like per confession per IP per hour (deduplication)
  const confessionId = params.confessionId;
  const { limited: dedupLimited } = rateLimit(`like:${ip}:${confessionId}`, {
    maxRequests: 1,
    windowMs: 3600_000,
  });
  if (dedupLimited) {
    return Response.json(
      { success: false, message: 'You already liked this confession' },
      { status: 429 }
    );
  }

  await dbConnect();
  try {
    const confession = await ConfessionModel.findByIdAndUpdate(
      confessionId,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!confession) {
      return Response.json({ success: false, message: 'Confession not found' }, { status: 404 });
    }

    return Response.json({ success: true, likes: confession.likes });
  } catch (error) {
    console.error('Error liking confession:', error);
    return Response.json({ success: false, message: 'Error liking confession' }, { status: 500 });
  }
}

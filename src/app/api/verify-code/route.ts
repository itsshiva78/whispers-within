import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import { rateLimit, getClientIp, rateLimitResponse } from '@/lib/rateLimit';

export async function POST(request: Request) {
  // Rate limit: 5 attempts per 15 minutes per IP (prevents brute-force on 6-digit codes)
  const ip = getClientIp(request);
  const { limited, retryAfterMs } = rateLimit(`verify:${ip}`, {
    maxRequests: 5,
    windowMs: 15 * 60_000,
  });
  if (limited) return rateLimitResponse(retryAfterMs);

  // Connect to the database
  await dbConnect();

  try {
    const { username, code } = await request.json();

    if (!username || typeof username !== 'string') {
      return Response.json(
        { success: false, message: 'Username is required' },
        { status: 400 }
      );
    }
    if (!code || typeof code !== 'string' || code.length !== 6) {
      return Response.json(
        { success: false, message: 'A valid 6-digit verification code is required' },
        { status: 400 }
      );
    }

    const decodedUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return Response.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Also rate-limit per-user to prevent distributed brute-force
    const { limited: userLimited, retryAfterMs: userRetry } = rateLimit(`verify-user:${decodedUsername}`, {
      maxRequests: 5,
      windowMs: 15 * 60_000,
    });
    if (userLimited) return rateLimitResponse(userRetry);

    // Check if the code is correct and not expired
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = user.verifyCodeExpiry ? new Date(user.verifyCodeExpiry) > new Date() : false;

    if (isCodeValid && isCodeNotExpired) {
      // Update the user's verification status
      user.isVerified = true;
      await user.save();

      return Response.json(
        { success: true, message: 'Account verified successfully' },
        { status: 200 }
      );
    } else if (!isCodeNotExpired) {
      // Code has expired
      return Response.json(
        {
          success: false,
          message:
            'Verification code has expired. Please sign up again to get a new code.',
        },
        { status: 400 }
      );
    } else {
      // Code is incorrect
      return Response.json(
        { success: false, message: 'Incorrect verification code' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error verifying user:', error);
    return Response.json(
      { success: false, message: 'Error verifying user' },
      { status: 500 }
    );
  }
}

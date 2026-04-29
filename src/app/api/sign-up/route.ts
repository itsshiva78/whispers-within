import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import bcrypt from 'bcryptjs';
import { sendVerificationEmail } from '@/helpers/sendVerificationEmail';
import { rateLimit, getClientIp, rateLimitResponse } from '@/lib/rateLimit';

export async function POST(request: Request) {
  // Rate limit: 5 sign-ups per hour per IP (prevents email bombing)
  const ip = getClientIp(request);
  const { limited, retryAfterMs } = rateLimit(`signup:${ip}`, {
    maxRequests: 5,
    windowMs: 3600_000,
  });
  if (limited) return rateLimitResponse(retryAfterMs);

  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    // Basic input validation
    if (!username || typeof username !== 'string' || username.trim().length < 2) {
      return Response.json({ success: false, message: 'Valid username is required' }, { status: 400 });
    }
    if (!email || typeof email !== 'string') {
      return Response.json({ success: false, message: 'Valid email is required' }, { status: 400 });
    }
    if (!password || typeof password !== 'string' || password.length < 6) {
      return Response.json({ success: false, message: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const existingVerifiedUserByUsername = await UserModel.findOne({
      username: username.trim().toLowerCase(),
      isVerified: true,
    });

    if (existingVerifiedUserByUsername) {
      return Response.json(
        {
          success: false,
          message: 'Username is already taken',
        },
        { status: 400 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email: email.trim().toLowerCase() });
    let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: 'User already exists with this email',
          },
          { status: 400 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await existingUserByEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username: username.trim().toLowerCase(),
        email: email.trim().toLowerCase(),
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessages: true,
        messages: [],
      });

      await newUser.save();
    }

    // Send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: 'User registered successfully. Please verify your account.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error registering user:', error);
    return Response.json(
      {
        success: false,
        message: 'Error registering user',
      },
      { status: 500 }
    );
  }
}

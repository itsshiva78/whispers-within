import UserModel from '@/model/User';
import dbConnect from '@/lib/dbConnect';
import { Message } from '@/model/User';
import { resend } from '@/lib/resend';
import NewMessageEmail from '../../../../emails/NewMessageEmail';
import { rateLimit, getClientIp, rateLimitResponse } from '@/lib/rateLimit';

// Max message length to prevent DB abuse
const MAX_MESSAGE_LENGTH = 2000;
const MAX_NAME_LENGTH = 50;

export async function POST(request: Request) {
  // Rate limit: 10 messages per minute per IP
  const ip = getClientIp(request);
  const { limited, retryAfterMs } = rateLimit(`send-msg:${ip}`, {
    maxRequests: 10,
    windowMs: 60_000,
  });
  if (limited) return rateLimitResponse(retryAfterMs);

  await dbConnect();
  const { username, content, senderName, senderGender } = await request.json();

  // Input validation
  if (!username || typeof username !== 'string') {
    return Response.json(
      { message: 'Invalid username', success: false },
      { status: 400 }
    );
  }

  if (!content || typeof content !== 'string' || content.trim().length === 0) {
    return Response.json(
      { message: 'Message content is required', success: false },
      { status: 400 }
    );
  }

  if (content.length > MAX_MESSAGE_LENGTH) {
    return Response.json(
      { message: `Message must be under ${MAX_MESSAGE_LENGTH} characters`, success: false },
      { status: 400 }
    );
  }

  // Sanitize optional fields
  const safeSenderName = typeof senderName === 'string' ? senderName.slice(0, MAX_NAME_LENGTH).trim() : undefined;
  const allowedGenders = ['Male', 'Female', 'Other', ''];
  const safeSenderGender = typeof senderGender === 'string' && allowedGenders.includes(senderGender) ? senderGender : '';

  try {
    const user = await UserModel.findOne({ username: username.trim() }).exec();

    if (!user) {
      return Response.json(
        { message: 'User not found', success: false },
        { status: 404 }
      );
    }

    // Check if the user is accepting messages
    if (!user.isAcceptingMessages) {
      return Response.json(
        { message: 'User is not accepting messages', success: false },
        { status: 403 } // 403 Forbidden status
      );
    }

    // Capture hint metadata from request
    const userAgent = request.headers.get('user-agent') || '';
    const senderDevice = /Mobile|Android|iPhone/i.test(userAgent) ? 'Mobile' : 'Desktop';
    const hour = new Date().getHours();
    const senderTimePeriod = hour < 6 ? 'Late Night' : hour < 12 ? 'Morning' : hour < 17 ? 'Afternoon' : hour < 21 ? 'Evening' : 'Night';
    const senderPlatform = /iPhone|iPad/i.test(userAgent) ? 'iOS' : /Android/i.test(userAgent) ? 'Android' : /Windows/i.test(userAgent) ? 'Windows' : /Mac/i.test(userAgent) ? 'Mac' : 'Web';

    const newMessage = { 
      content: content.trim(), 
      createdAt: new Date(), 
      senderDevice, 
      senderTimePeriod, 
      senderPlatform,
      senderName: safeSenderName,
      senderGender: safeSenderGender,
    };

    // AI Zero-Tolerance Moderation (fail-OPEN: bypass on error)
    try {
      const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
      if (apiKey) {
        const { GoogleGenerativeAI } = await import('@google/generative-ai');
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `You are a content moderation AI for an anonymous app. Analyze the following message and return ONLY the exact string "TOXIC" if it contains severe cyberbullying, hate speech, threats, or explicit self-harm. If it is safe, playful banter, or a general confession, return ONLY the exact string "SAFE". Message: "${content.trim()}"`;
        const result = await model.generateContent(prompt);
        const responseText = result.response.text().trim().toUpperCase();
        
        if (responseText.includes("TOXIC")) {
          console.warn(`[AI Moderation] Silently discarded toxic message to ${username}`);
          // Return generic success to the toxic sender so they don't know they were blocked
          return Response.json(
            { message: 'Message sent successfully', success: true },
            { status: 201 }
          );
        }
      }
    } catch (aiError) {
      // SECURITY: Fail-OPEN — if AI moderation fails, allow the message.
      // This prevents legitimate users from being blocked due to API issues.
      console.warn('[AI Moderation] Failed, bypassing moderation for availability:', aiError);
    }

    // Push the new message to the user's messages array
    user.messages.push(newMessage as Message);
    await user.save();

    // Send notification email
    try {
      if (user.email) {
        await resend.emails.send({
          from: 'no-reply@whispers-within.in',
          to: user.email, // Dynamic recipient from database
          subject: 'Whispers Within: New Message',
          react: NewMessageEmail({ username: user.username, message: content }),
        });
      }
    } catch (emailError) {
      console.error('Error sending notification email:', emailError);
      // Don't fail the request if email fails
    }

    return Response.json(
      { message: 'Message sent successfully', success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding message:', error);
    return Response.json(
      { message: 'Internal server error', success: false },
      { status: 500 }
    );
  }
}

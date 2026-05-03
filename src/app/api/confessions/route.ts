import dbConnect from '@/lib/dbConnect';
import ConfessionModel from '@/model/Confession';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';
import { rateLimit, getClientIp, rateLimitResponse } from '@/lib/rateLimit';

export async function POST(request: Request) {
  // Rate limit: 5 confessions per 10 minutes per IP
  const ip = getClientIp(request);
  const { limited, retryAfterMs } = rateLimit(`confession:${ip}`, {
    maxRequests: 5,
    windowMs: 10 * 60_000,
  });
  if (limited) return rateLimitResponse(retryAfterMs);

  await dbConnect();
  try {
    const { content, category, senderName, senderGender } = await request.json();

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return Response.json({ success: false, message: 'Confession content is required' }, { status: 400 });
    }

    if (content.length > 500) {
      return Response.json({ success: false, message: 'Confession must be under 500 characters' }, { status: 400 });
    }

    // Sanitize optional fields
    const allowedCategories = ['general', 'love', 'funny', 'secret', 'regret', 'gratitude'];
    const safeCategory = typeof category === 'string' && allowedCategories.includes(category) ? category : 'general';
    const safeSenderName = typeof senderName === 'string' ? senderName.slice(0, 50).trim() : undefined;
    const allowedGenders = ['Male', 'Female', 'Other', ''];
    const safeSenderGender = typeof senderGender === 'string' && allowedGenders.includes(senderGender) ? senderGender : '';

    // AI Moderation for confessions (fail-OPEN)
    try {
      const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
      if (apiKey) {
        const { GoogleGenerativeAI } = await import('@google/generative-ai');
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `You are a content moderation AI for an anonymous confession wall. Analyze the following confession and return ONLY the exact string "TOXIC" if it contains severe cyberbullying, hate speech, threats, doxxing, or explicit self-harm. If it is safe, playful banter, or a general confession, return ONLY the exact string "SAFE". Confession: "${content.trim()}"`;
        const result = await model.generateContent(prompt);
        const responseText = result.response.text().trim().toUpperCase();

        if (responseText.includes("TOXIC")) {
          console.warn(`[AI Moderation] Silently discarded toxic confession`);
          return Response.json({ success: true, message: 'Confession posted anonymously' }, { status: 201 });
        }
      }
    } catch (aiError) {
      // SECURITY: Fail-OPEN — allow confession if moderation is unavailable
      console.warn('[AI Moderation] Failed for confession, bypassing:', aiError);
    }

    // Capture hint metadata from request
    const userAgent = request.headers.get('user-agent') || '';
    const senderDevice = /Mobile|Android|iPhone/i.test(userAgent) ? 'Mobile' : 'Desktop';
    const hour = new Date().getHours();
    const senderTimePeriod = hour < 6 ? 'Late Night' : hour < 12 ? 'Morning' : hour < 17 ? 'Afternoon' : hour < 21 ? 'Evening' : 'Night';
    const senderPlatform = /iPhone|iPad/i.test(userAgent) ? 'iOS' : /Android/i.test(userAgent) ? 'Android' : /Windows/i.test(userAgent) ? 'Windows' : /Mac/i.test(userAgent) ? 'Mac' : 'Web';

    const confession = await ConfessionModel.create({
      content: content.trim(),
      category: safeCategory,
      senderName: safeSenderName,
      senderGender: safeSenderGender,
      senderDevice,
      senderTimePeriod,
      senderPlatform,
      revealedTo: [],
    });

    return Response.json({ success: true, message: 'Confession posted anonymously', confession }, { status: 201 });
  } catch (error) {
    console.error('Error posting confession:', error);
    return Response.json({ success: false, message: 'Error posting confession' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50); // Cap at 50 to prevent DB abuse
    const category = searchParams.get('category');

    const filter = category && category !== 'all' ? { category } : {};

    const confessions = await ConfessionModel.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await ConfessionModel.countDocuments(filter);

    const session = await getServerSession(authOptions);
    const userId = session?.user?._id?.toString();

    // Securely map the confessions
    const mappedConfessions = confessions.map((c) => {
      const confessionObj = c.toObject();
      const isRevealedToCurrentUser = userId && confessionObj.revealedTo?.some(
        (id: any) => id.toString() === userId
      );

      return {
        ...confessionObj,
        // Only attach sender info if the current user paid to reveal
        senderName: isRevealedToCurrentUser ? confessionObj.senderName : undefined,
        senderGender: isRevealedToCurrentUser ? confessionObj.senderGender : undefined,
        // Provide hint to the frontend on whether the identity is revealed for this user
        isNameRevealed: isRevealedToCurrentUser,
      };
    });

    return Response.json({
      success: true,
      confessions: mappedConfessions,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('Error fetching confessions:', error);
    return Response.json({ success: false, message: 'Error fetching confessions' }, { status: 500 });
  }
}

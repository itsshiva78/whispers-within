import dbConnect from '@/lib/dbConnect';
import ConfessionModel from '@/model/Confession';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { content, category, senderName, senderGender } = await request.json();

    if (!content || content.trim().length === 0) {
      return Response.json({ success: false, message: 'Confession content is required' }, { status: 400 });
    }

    if (content.length > 500) {
      return Response.json({ success: false, message: 'Confession must be under 500 characters' }, { status: 400 });
    }

    // Capture hint metadata from request
    const userAgent = request.headers.get('user-agent') || '';
    const senderDevice = /Mobile|Android|iPhone/i.test(userAgent) ? 'Mobile' : 'Desktop';
    const hour = new Date().getHours();
    const senderTimePeriod = hour < 6 ? 'Late Night' : hour < 12 ? 'Morning' : hour < 17 ? 'Afternoon' : hour < 21 ? 'Evening' : 'Night';
    const senderPlatform = /iPhone|iPad/i.test(userAgent) ? 'iOS' : /Android/i.test(userAgent) ? 'Android' : /Windows/i.test(userAgent) ? 'Windows' : /Mac/i.test(userAgent) ? 'Mac' : 'Web';

    const confession = await ConfessionModel.create({
      content: content.trim(),
      category: category || 'general',
      senderName,
      senderGender,
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
    const limit = parseInt(searchParams.get('limit') || '20');
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

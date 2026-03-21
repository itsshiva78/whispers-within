import dbConnect from '@/lib/dbConnect';
import ConfessionModel from '@/model/Confession';

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { content, category } = await request.json();

    if (!content || content.trim().length === 0) {
      return Response.json({ success: false, message: 'Confession content is required' }, { status: 400 });
    }

    if (content.length > 500) {
      return Response.json({ success: false, message: 'Confession must be under 500 characters' }, { status: 400 });
    }

    const confession = await ConfessionModel.create({
      content: content.trim(),
      category: category || 'general',
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

    return Response.json({
      success: true,
      confessions,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('Error fetching confessions:', error);
    return Response.json({ success: false, message: 'Error fetching confessions' }, { status: 500 });
  }
}

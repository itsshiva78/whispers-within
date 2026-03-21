import dbConnect from '@/lib/dbConnect';
import ConfessionModel from '@/model/Confession';

export async function POST(request: Request, { params }: { params: { confessionId: string } }) {
  await dbConnect();
  try {
    const confession = await ConfessionModel.findByIdAndUpdate(
      params.confessionId,
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

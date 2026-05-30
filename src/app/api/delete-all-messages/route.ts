import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import dbConnect from '@/lib/dbConnect';
import MessageModel from '@/model/Message';

export async function DELETE() {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return Response.json({ success: false, message: 'Not authenticated' }, { status: 401 });
  }

  try {
    await MessageModel.deleteMany({ userId: session.user._id });

    return Response.json({ success: true, message: 'All messages deleted successfully' });
  } catch (error) {
    console.error('Error deleting all messages:', error);
    return Response.json({ success: false, message: 'Error deleting messages' }, { status: 500 });
  }
}

import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';

export async function DELETE() {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return Response.json({ success: false, message: 'Not authenticated' }, { status: 401 });
  }

  try {
    const result = await UserModel.updateOne(
      { _id: session.user._id },
      { $set: { messages: [] } }
    );

    if (result.modifiedCount === 0) {
      return Response.json({ success: false, message: 'No messages to delete' }, { status: 404 });
    }

    return Response.json({ success: true, message: 'All messages deleted successfully' });
  } catch (error) {
    console.error('Error deleting all messages:', error);
    return Response.json({ success: false, message: 'Error deleting messages' }, { status: 500 });
  }
}

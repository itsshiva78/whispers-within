import UserModel from '@/model/User';
import dbConnect from '@/lib/dbConnect';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return Response.json({ success: false, message: 'Not Authenticated' }, { status: 401 });
  }

  const { name, gender } = await request.json();

  if (!name || name.trim().length < 2) {
    return Response.json({ success: false, message: 'Name must be at least 2 characters' }, { status: 400 });
  }

  try {
    await dbConnect();
    const user = await UserModel.findById(session.user._id);
    if (!user) {
      return Response.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    user.name = name.trim();
    user.gender = gender || '';
    await user.save();

    return Response.json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    return Response.json({ success: false, message: 'Error updating profile' }, { status: 500 });
  }
}

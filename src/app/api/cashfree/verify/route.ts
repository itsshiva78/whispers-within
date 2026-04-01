import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/options';
import UserModel from '@/model/User';
import dbConnect from '@/lib/dbConnect';
// @ts-ignore
import { Cashfree, CFEnvironment } from 'cashfree-pg';

// Initialize Cashfree v5 SDK
const cashfree = new Cashfree(
  process.env.CASHFREE_ENVIRONMENT === 'PRODUCTION' ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX,
  process.env.CASHFREE_APP_ID,
  process.env.CASHFREE_SECRET_KEY
);

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ success: false, message: 'Not Authenticated' }, { status: 401 });
    }

    const { orderId } = await request.json();
    if (!orderId) {
      return NextResponse.json({ success: false, message: 'Order ID is required' }, { status: 400 });
    }

    // Fetch payments for this order from Cashfree
    const response = await cashfree.PGOrderFetchPayments(orderId);

    const payments = response.data;
    const isPaid = payments.some(
      (payment: any) => payment.payment_status === 'SUCCESS'
    );

    if (!isPaid) {
      return NextResponse.json({ success: false, message: 'Payment verification failed' }, { status: 400 });
    }

    // Extract message ID from order_id (format: order_{messageId}_{timestamp})
    const parts = orderId.split('_');
    const messageId = parts[1];

    if (!messageId) {
      return NextResponse.json({ success: false, message: 'Invalid Order ID format' }, { status: 400 });
    }

    await dbConnect();
    const user = await UserModel.findById(session.user._id);
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const messageIndex = user.messages.findIndex((m: any) => m._id.toString() === messageId);
    
    if (messageIndex === -1) {
      return NextResponse.json({ success: false, message: 'Message not found' }, { status: 404 });
    }

    user.messages[messageIndex].isNameRevealed = true;
    await user.save();

    return NextResponse.json({ 
      success: true, 
      message: 'Hint successfully revealed!',
      senderName: user.messages[messageIndex].senderName || 'Anonymous',
      senderGender: user.messages[messageIndex].senderGender || 'Secret 🤫'
    });

  } catch (error) {
    console.error('Cashfree Verification Error:', error);
    return NextResponse.json(
      { success: false, message: 'Error verifying payment' }, 
      { status: 500 }
    );
  }
}

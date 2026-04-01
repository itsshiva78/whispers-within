import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/options';
import ConfessionModel from '@/model/Confession';
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

    // Extract confession ID from order_id (format: conf_{confessionId}_{timestamp})
    const parts = orderId.split('_');
    const confessionId = parts[1];

    if (!confessionId) {
      return NextResponse.json({ success: false, message: 'Invalid Order ID format' }, { status: 400 });
    }

    await dbConnect();
    const confession = await ConfessionModel.findById(confessionId);
    if (!confession) {
      return NextResponse.json({ success: false, message: 'Confession not found' }, { status: 404 });
    }

    const userId = session.user._id as any;
    
    // Check if already revealed to prevent double counting if the user refreshes
    if (!confession.revealedTo?.some(id => id.toString() === userId.toString())) {
      confession.revealedTo?.push(userId);
      await confession.save();
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Hint successfully revealed!',
      senderName: confession.senderName || 'Anonymous',
      senderGender: confession.senderGender || 'Secret 🤫'
    });

  } catch (error) {
    console.error('Cashfree Confession Verification Error:', error);
    return NextResponse.json(
      { success: false, message: 'Error verifying payment' }, 
      { status: 500 }
    );
  }
}

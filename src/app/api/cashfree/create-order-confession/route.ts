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

    const { confessionId } = await request.json();
    if (!confessionId) {
      return NextResponse.json({ success: false, message: 'Confession ID is required' }, { status: 400 });
    }

    await dbConnect();
    const confession = await ConfessionModel.findById(confessionId);
    if (!confession) {
      return NextResponse.json({ success: false, message: 'Confession not found' }, { status: 404 });
    }

    // Check if already revealed to this user
    const userId = session.user._id;
    if (confession.revealedTo?.some(id => id.toString() === userId.toString())) {
      return NextResponse.json({ success: false, message: 'Identity already revealed to you' }, { status: 400 });
    }

    const orderId = `conf_${confessionId}_${Date.now()}`;
    const customerId = `cust_${session.user._id}`;
    
    const orderRequest = {
      order_amount: 49.00,
      order_currency: 'INR',
      order_id: orderId,
      customer_details: {
        customer_id: customerId,
        customer_phone: '9999999999',
        customer_email: session.user.email || 'customer@example.com',
        customer_name: session.user.username || 'Whispers User',
      },
      order_meta: {
        return_url: `${(process.env.NEXTAUTH_URL || '').replace('http://', 'https://')}/confessions?order_id={order_id}`,
      },
      order_note: `Reveal Identity for confession ${confessionId}`,
    };

    const response = await cashfree.PGCreateOrder(orderRequest);
    
    return NextResponse.json({ 
      success: true, 
      payment_session_id: response.data.payment_session_id,
      order_id: response.data.order_id 
    });

  } catch (error: any) {
    console.error('Cashfree Confession Order Create Error:', error.response?.data || error.message || error);
    return NextResponse.json(
      { success: false, message: 'Error creating payment order', error: error.response?.data?.message || error.message }, 
      { status: 500 }
    );
  }
}

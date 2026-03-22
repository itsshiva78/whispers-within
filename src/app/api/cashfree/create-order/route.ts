import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/options';
import UserModel from '@/model/User';
import dbConnect from '@/lib/dbConnect';
// @ts-ignore
import { Cashfree, CFEnvironment } from 'cashfree-pg';

// Initialize Cashfree v5 SDK (constructor-based)
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

    const { messageId } = await request.json();
    if (!messageId) {
      return NextResponse.json({ success: false, message: 'Message ID is required' }, { status: 400 });
    }

    await dbConnect();
    const user = await UserModel.findById(session.user._id);
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const message = user.messages.find((m: any) => m._id.toString() === messageId);
    if (!message) {
      return NextResponse.json({ success: false, message: 'Message not found' }, { status: 404 });
    }

    if (message.isNameRevealed) {
      return NextResponse.json({ success: false, message: 'Name already revealed' }, { status: 400 });
    }

    const orderId = `order_${messageId}_${Date.now()}`;
    const customerId = `cust_${session.user._id}`;
    
    const orderRequest = {
      order_amount: 1.00,
      order_currency: 'INR',
      order_id: orderId,
      customer_details: {
        customer_id: customerId,
        customer_phone: '9999999999',
        customer_email: user.email || 'customer@example.com',
        customer_name: user.username || 'Whispers User',
      },
      order_meta: {
        return_url: `${(process.env.NEXTAUTH_URL || '').replace('http://', 'https://')}/dashboard?order_id={order_id}`,
      },
      order_note: `Unmask Sender for message ${messageId}`,
    };

    const response = await cashfree.PGCreateOrder(orderRequest);
    
    return NextResponse.json({ 
      success: true, 
      payment_session_id: response.data.payment_session_id,
      order_id: response.data.order_id 
    });

  } catch (error: any) {
    console.error('Cashfree Order Create Error:', error.response?.data || error.message || error);
    return NextResponse.json(
      { success: false, message: 'Error creating payment order', error: error.response?.data?.message || error.message }, 
      { status: 500 }
    );
  }
}

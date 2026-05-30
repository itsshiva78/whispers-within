import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, category, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const response = await resend.emails.send({
      from: 'Whispers Within Support <onboarding@resend.dev>', // onboarding domain ensures it sends without verified domain
      to: ['shivasap27@gmail.com'], // The user's requested email
      subject: `[${category.toUpperCase()}] New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f5;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #6d28d9;">New Support Message</h2>
            <p><strong>From:</strong> ${name} (${email})</p>
            <p><strong>Category:</strong> ${category}</p>
            <hr style="border: 1px solid #e5e7eb; margin: 20px 0;" />
            <h3 style="color: #374151;">Message:</h3>
            <p style="color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            <hr style="border: 1px solid #e5e7eb; margin: 20px 0;" />
            <p style="font-size: 12px; color: #9ca3af;">Sent from the Whispers Within Contact Form</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data: response });
  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

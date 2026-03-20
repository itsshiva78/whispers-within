import { Resend } from 'resend';
import * as fs from 'fs';
import * as path from 'path';

// Manually parse .env file
const envPath = path.resolve(__dirname, '../.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const resendApiKeyLine = envContent.split('\n').find(line => line.startsWith('RESEND_API_KEY='));
const resendApiKey = resendApiKeyLine ? resendApiKeyLine.split('=')[1].trim() : undefined;

const resend = new Resend(resendApiKey);

async function testResend() {
  console.log('Testing Resend with API Key:', process.env.RESEND_API_KEY ? 'Present' : 'Missing');
  
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'shivasap27sh@gmail.com', // Testing with the new email provided
      subject: 'Resend Test Connection',
      html: '<strong>Resend is working correctly!</strong>',
    });

    console.log('Success! Email sent:', data);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

testResend();

import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env');
let apiKey = '';
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/^GEMINI_API_KEY=(.*)$/m);
    if (match) apiKey = match[1].trim().replace(/^["']|["']$/g, '');
}

if (!apiKey) {
    console.error('ERROR: GEMINI_API_KEY is missing in .env');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

async function testFlash() {
    console.log('Testing gemini-1.5-flash...');
    try {
        const result = await model.generateContent('Say Hi');
        const response = await result.response;
        console.log('SUCCESS:', response.text());
    } catch (error) {
        console.error('FAILED:', error.message);
        console.error('Full Error:', JSON.stringify(error, null, 2));
    }
}

testFlash();

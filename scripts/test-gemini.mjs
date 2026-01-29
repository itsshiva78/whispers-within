import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

// Manual .env parser
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
console.log('Using Key:', apiKey.substring(0, 5) + '...');
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

async function testGemini() {
    try {
        console.log('Testing Gemini API...');
        const prompt = 'Write a short haiku about a mystery.';
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log('SUCCESS: Gemini responded!');
        console.log('Response:', text);
    } catch (error) {
        console.error('API FAILED:', error.message);
        console.error('Full Error:', JSON.stringify(error, null, 2));
    }
}

testGemini();

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

const candidates = [
    'gemini-1.5-flash',
    'gemini-1.5-flash-latest',
    'gemini-1.5-flash-001',
    'gemini-1.5-pro',
    'gemini-1.0-pro',
    'gemini-pro',
    'gemini-2.0-flash-exp',
    'gemini-1.5-flash-8b'
];

async function findModel() {
    console.log('Testing models...');
    for (const modelName of candidates) {
        process.stdout.write(`Testing ${modelName}... `);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent('Hi');
            await result.response;
            console.log('✅ SUCCESS!');
            console.log(`\n>>> WINNER: ${modelName} <<<\n`);
            return;
        } catch (error) {
            console.log(`❌ Failed (${error.status || 'Error'})`);
        }
    }
    console.log('\nALL MODELS FAILED.');
}

findModel();

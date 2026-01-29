import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

// Manual .env parser
const envPath = path.resolve(process.cwd(), '.env');
let apiKey = '';
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/^OPENAI_API_KEY=(.*)$/m);
    if (match) apiKey = match[1].trim().replace(/^["']|["']$/g, '');
}

if (!apiKey) {
    console.error('ERROR: OPENAI_API_KEY is missing in .env');
    process.exit(1);
}

const openai = new OpenAI({ apiKey });

async function testOpenAI() {
    try {
        console.log('Testing OpenAI API with model: gpt-3.5-turbo-instruct');
        const response = await openai.completions.create({
            model: 'gpt-3.5-turbo-instruct',
            prompt: 'Say "Hello, World!"',
            max_tokens: 10,
        });
        console.log('SUCCESS: API responded!');
        console.log('Response:', response.choices[0].text.trim());
    } catch (error) {
        console.error('API FAILED:', error.message);
        if (error.status === 401) console.log('HINT: Your API Key is invalid.');
        if (error.status === 429) console.log('HINT: You have exceeded your quota or rate limit.');
        if (error.status === 404) console.log('HINT: Model not found or you do not have access to it.');
    }
}

testOpenAI();

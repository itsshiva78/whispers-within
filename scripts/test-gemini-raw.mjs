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

// URL to list models
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

async function listModels() {
    console.log('Fetching available models from Google...');
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            console.log('SUCCESS: API is enabled and working.');
            console.log('Available Models:');
            if (data.models) {
                // Just map and print names to avoid huge output
                const names = data.models.map(m => m.name);
                console.log(names.join('\n'));
            } else {
                console.log('No models found (data.models is empty).');
            }
        } else {
            console.error(`ERROR ${response.status}:`);
            console.error(JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error('Network Error:', error);
    }
}

listModels();

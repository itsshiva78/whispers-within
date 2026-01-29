import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

// Manual .env parser
const envPath = path.resolve(process.cwd(), '.env');
let uri = '';

try {
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const match = envContent.match(/^MONGODB_URI=(.*)$/m);
        if (match) {
            uri = match[1].trim();
            // Remove quotes if present
            if ((uri.startsWith('"') && uri.endsWith('"')) || (uri.startsWith("'") && uri.endsWith("'"))) {
                uri = uri.slice(1, -1);
            }
        }
    }
} catch (e) {
    console.error('Error reading .env:', e.message);
}

console.log('Testing connection to:', uri ? 'URI found (hidden)' : 'URI IS MISSING');

if (!uri) {
    console.error('ERROR: MONGODB_URI is variable is missing in .env file.');
    process.exit(1);
}

async function connect() {
    try {
        console.log('Attempting to connect...');
        // Set short timeout to fail fast
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log('SUCCESS: Connected to MongoDB!');
        await mongoose.disconnect();
        console.log('Disconnected.');
    } catch (error) {
        console.error('CONNECTION FAILED:', error.message);
        if (error.name === 'MongooseServerSelectionError') {
            console.log('HINT: This usually means your IP address is not whitelisted in MongoDB Atlas.');
            console.log('      Go to Network Access -> Add IP Address -> Allow Access from Anywhere (0.0.0.0/0).');
        } else if (error.code === 8000) {
            console.log('HINT: Authentication failed. Check your username and password in the URI.');
        }
    }
}

connect();

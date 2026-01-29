import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

// Manual .env parser
const envPath = path.resolve(process.cwd(), '.env');
let uri = '';
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/^MONGODB_URI=(.*)$/m);
    if (match) uri = match[1].trim().replace(/^["']|["']$/g, '');
}

// Minimal Schema
const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    isVerified: Boolean,
});
const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function testLoginQuery(identifier) {
    try {
        await mongoose.connect(uri);
        console.log(`Testing query for identifier: "${identifier}"`);

        // exact match
        const userExact = await User.findOne({
            $or: [{ username: identifier }, { email: identifier }]
        });
        console.log(`Exact match found: ${!!userExact}`);

        // regex match (case insensitive)
        const userRegex = await User.findOne({
            $or: [
                { username: { $regex: new RegExp(`^${identifier}$`, 'i') } },
                { email: { $regex: new RegExp(`^${identifier}$`, 'i') } }
            ]
        });
        console.log(`Case-insensitive match found: ${!!userRegex}`);

        if (userExact) console.log(`Stored Username: ${userExact.username}`);

        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}

// Test with lowercase version of what exists in DB
testLoginQuery('its_shiva_'); 

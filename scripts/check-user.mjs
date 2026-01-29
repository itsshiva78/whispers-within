import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import UserModel from '../src/model/User.ts'; // We'll need to handle TS import or just define schema here

// Manual .env parser
const envPath = path.resolve(process.cwd(), '.env');
let uri = '';
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/^MONGODB_URI=(.*)$/m);
    if (match) uri = match[1].trim().replace(/^["']|["']$/g, '');
}

// Minimal Schema to avoid TS issues
const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    isVerified: Boolean,
});
const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function listAllUsers() {
    try {
        await mongoose.connect(uri);
        console.log('Listing all users in DB:');
        const users = await User.find({});
        users.forEach(u => {
            console.log(`- Username: ${u.username}, Email: ${u.email}, Verified: ${u.isVerified}`);
        });
        if (users.length === 0) console.log('No users found in database.');
        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}

listAllUsers();

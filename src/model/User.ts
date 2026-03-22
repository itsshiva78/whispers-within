import mongoose, { Schema, Document } from 'mongoose';

export interface Message extends Document {
  content: string;
  createdAt: Date;
  senderDevice?: string;
  senderTimePeriod?: string;
  senderPlatform?: string;
  senderName?: string;
  senderGender?: string;
  isNameRevealed?: boolean;
}

const MessageSchema: Schema<Message> = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  senderDevice: {
    type: String,
    default: 'Unknown',
  },
  senderTimePeriod: {
    type: String,
    default: 'Unknown',
  },
  senderPlatform: {
    type: String,
    default: 'Unknown',
  },
  senderName: {
    type: String,
    required: false,
  },
  senderGender: {
    type: String,
    enum: ['Male', 'Female', 'Other', ''],
    default: '',
  },
  isNameRevealed: {
    type: Boolean,
    default: false,
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password?: string;
  verifyCode?: string;
  verifyCodeExpiry?: Date;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  messages: Message[];
  provider?: string;
  name?: string;
  gender?: string;
}

// Updated User schema
const UserSchema: Schema<User> = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please use a valid email address'],
  },
  password: {
    type: String,
    required: false, // Optional for OAuth users
  },
  verifyCode: {
    type: String,
    required: false, // Optional for OAuth users
  },
  verifyCodeExpiry: {
    type: Date,
    required: false, // Optional for OAuth users
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessages: {
    type: Boolean,
    default: true,
  },
  provider: {
    type: String,
    default: 'credentials',
  },
  name: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other', ''],
    default: '',
  },
  messages: [MessageSchema],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>('User', UserSchema);

export default UserModel;

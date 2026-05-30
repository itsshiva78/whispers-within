import mongoose, { Schema, Document } from 'mongoose';



export interface User extends Document {
  username: string;
  email: string;
  password?: string;
  verifyCode?: string;
  verifyCodeExpiry?: Date;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  provider?: string;
  name?: string;
  gender?: string;
  isPro?: boolean;
  proExpiryDate?: Date;
  emailNotifications?: boolean;
  phone?: string;
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
  emailNotifications: {
    type: Boolean,
    default: true,
  },
  phone: {
    type: String,
    required: false,
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
  isPro: {
    type: Boolean,
    default: false,
  },
  proExpiryDate: {
    type: Date,
    required: false,
  },
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>('User', UserSchema);

export default UserModel;

import mongoose, { Schema, Document } from 'mongoose';

export interface Confession extends Document {
  content: string;
  category: string;
  likes: number;
  createdAt: Date;
  senderDevice?: string;
  senderTimePeriod?: string;
  senderPlatform?: string;
  senderName?: string;
  senderGender?: string;
  revealedTo?: mongoose.Types.ObjectId[];
}

const ConfessionSchema: Schema<Confession> = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Confession content is required'],
    maxlength: [500, 'Confession must be under 500 characters'],
  },
  category: {
    type: String,
    default: 'general',
    enum: ['general', 'love', 'funny', 'deep', 'regret', 'secret'],
  },
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
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
  revealedTo: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const ConfessionModel =
  (mongoose.models.Confession as mongoose.Model<Confession>) ||
  mongoose.model<Confession>('Confession', ConfessionSchema);

export default ConfessionModel;

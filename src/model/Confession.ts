import mongoose, { Schema, Document } from 'mongoose';

export interface Confession extends Document {
  content: string;
  category: string;
  likes: number;
  createdAt: Date;
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
});

const ConfessionModel =
  (mongoose.models.Confession as mongoose.Model<Confession>) ||
  mongoose.model<Confession>('Confession', ConfessionSchema);

export default ConfessionModel;

import mongoose, { Schema, Document } from 'mongoose';

export interface Message extends Document {
  userId: mongoose.Types.ObjectId;
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
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: [true, 'Message content is required'],
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

// Primary index for user message feeds to optimize sorting and listing queries
MessageSchema.index({ userId: 1, createdAt: -1 });

const MessageModel =
  (mongoose.models.Message as mongoose.Model<Message>) ||
  mongoose.model<Message>('Message', MessageSchema);

export default MessageModel;
export { MessageSchema };

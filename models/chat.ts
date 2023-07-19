import mongoose, { Document, Schema } from 'mongoose';

export interface IChatMessage extends Document {
  content: string;
  sender: string;
  receiver: string;
  timestamp: Date;
}

const ChatMessageSchema: Schema = new Schema({
  content: { type: String, required: true },
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  timestamp: { type: Date, required: true },
});

const ChatModel = mongoose.models.ChatMessage || mongoose.model<IChatMessage>('ChatMessage', ChatMessageSchema);

export default ChatModel;

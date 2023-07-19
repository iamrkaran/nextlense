
import mongoose, { Document, Schema } from 'mongoose';

interface NotificationFields {
  type: 'like' | 'comment';
  postId: string;
  sender: string;
  timestamp: Date;
}

export interface NotificationDocument extends Document, NotificationFields {}

const notificationSchema = new Schema<NotificationDocument>({
  type: { type: String, enum: ['like', 'comment'], required: true },
  postId: { type: String, required: true },
  sender: { type: String, required: true },
  timestamp: { type: Date, required: true },
});

const Notification = mongoose.models.Notification || mongoose.model<NotificationDocument>('Notification', notificationSchema);

export default Notification;

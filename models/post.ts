import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './user';

// Post Schema
export interface IPost extends Document {
  user: IUser['_id'];
  caption: string;
  image: string; 
  createdDate: Date;
  likes: IUser['_id'][];
  comments: { user: IUser['_id'], text: string, createdDate: Date }[];
}

const PostSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  caption: { type: String, required: true },
  image: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ user: { type: Schema.Types.ObjectId, ref: 'User' }, text: String, createdDate: { type: Date, default: Date.now } }],
});

const PostModel = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);

export default PostModel;

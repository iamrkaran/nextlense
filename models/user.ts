import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
  user: IUser['_id'];
  caption: string;
  image: string; 
  createdDate: Date;
  likes: IUser['_id'][];
  comments: { user: IUser['_id'], text: string, createdDate: Date }[];
}

interface IUser extends Document {
  username: string;
  name: string;
  bio: string;
  website: string;
  gender: 'Male' | 'Female' | 'Other'; 
  email: string;
  password: string;
  picture: string;
  createdDate: Date;
  usernameChanges: [{ username: string, changedDate: Date }];
  followers: this[];
  following: this[];
  savedPosts: IPost[];
  isOAuthUser: boolean; 
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  bio: { type: String, default: '' },
  website: { type: String, default: '' },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Other' },  
  email: { type: String, required: true, unique: true },
  password: { type: String },
  picture: { type: String, default: '/images/profile.jpg' },
  createdDate: { type: Date, default: Date.now },
  usernameChanges: [{ username: String, changedDate: { type: Date, default: Date.now } }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  savedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  isOAuthUser: { type: Boolean, default: false }, 
});

const UserModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export type { IUser };

export default UserModel;

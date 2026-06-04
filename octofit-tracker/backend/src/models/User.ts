import { Schema, model } from 'mongoose';

export interface UserDocument {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  team?: string;
  createdAt: Date;
}

const userSchema = new Schema<UserDocument>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  team: { type: String },
  createdAt: { type: Date, required: true, default: Date.now }
});

const User = model<UserDocument>('User', userSchema);
export default User;
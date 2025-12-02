import { Schema, model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  passwordHash: string;
  role: 'student' | 'admin' | 'instructor';
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['student','admin','instructor'], default: 'student' }
}, { timestamps: true });

export default model<IUser>('User', userSchema);

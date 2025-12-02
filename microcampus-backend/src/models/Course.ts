import { Schema, model, Types } from "mongoose";

interface ICourse {
  title: string;
  description?: string;
  instructor?: string;
  students: Types.ObjectId[];
}

const courseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  description: { type: String },
  instructor: { type: String },
  students: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

export default model<ICourse>('Course', courseSchema);

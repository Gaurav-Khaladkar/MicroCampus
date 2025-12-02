import { Schema, model } from "mongoose";

interface INotice {
  title: string;
  content: string;
  postedBy?: string;
  course?: Schema.Types.ObjectId;
}

const noticeSchema = new Schema<INotice>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  postedBy: { type: String },
  course: { type: Schema.Types.ObjectId, ref: 'Course' }
}, { timestamps: true });

export default model<INotice>('Notice', noticeSchema);

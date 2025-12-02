import { Schema, model, Types } from "mongoose";

interface IQuestion {
  q: string;
  options: string[];
  correctIndex: number;
}

interface IQuiz {
  questions: IQuestion[];
}

interface INote {
  title: string;
  course: Types.ObjectId | string;
  author: Types.ObjectId | string;
  content: string;
  attachments: string[];
  quiz?: IQuiz;
  status: 'pending' | 'approved' | 'rejected';
}

const noteSchema = new Schema<INote>({
  title: { type: String, required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  attachments: [{ type: String }],
  quiz: {
    questions: [
      {
        q: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctIndex: { type: Number, required: true }
      }
    ]
  },
  status: { type: String, enum: ['pending','approved','rejected'], default: 'pending' }
}, { timestamps: true });

export default model<INote>('Note', noteSchema);

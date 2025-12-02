import { Schema, model, Types } from "mongoose";

interface IQuizAttempt {
  student: Types.ObjectId;
  note: Types.ObjectId;
  answers: number[];
  score: number;
  total: number;
}

const quizAttemptSchema = new Schema<IQuizAttempt>({
  student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  note: { type: Schema.Types.ObjectId, ref: 'Note', required: true },
  answers: [{ type: Number, required: true }],
  score: { type: Number, default: 0 },
  total: { type: Number, required: true }
}, { timestamps: true });

export default model<IQuizAttempt>('QuizAttempt', quizAttemptSchema);

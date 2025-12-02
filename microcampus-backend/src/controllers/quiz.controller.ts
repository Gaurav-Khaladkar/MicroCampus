import { Response } from "express";
import Note from "../models/Note";
import QuizAttempt from "../models/QuizAttempt";
import { AuthRequest } from "../middleware/auth.middleware";
import { Types } from "mongoose";

export const submitAttempt = async (req: AuthRequest, res: Response) => {
  try {
    const { noteId } = req.params;
    const { answers } = req.body as { answers: number[] };
    if (!Types.ObjectId.isValid(noteId)) return res.status(400).json({ message: "Invalid noteId" });

    const note = await Note.findById(noteId);
    if (!note || !note.quiz || !Array.isArray(note.quiz.questions)) {
      return res.status(404).json({ message: "Quiz not found for this note" });
    }

    const questions = note.quiz.questions;
    if (!Array.isArray(answers) || answers.length !== questions.length) {
      return res.status(400).json({ message: "Answers array must match number of questions" });
    }

    let score = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctIndex) score++;
    });

    const attempt = await QuizAttempt.create({
      student: req.user!._id,
      note: note._id,
      answers,
      score,
      total: questions.length,
    });

    const populated = await attempt.populate('student', 'name email').populate('note', 'title');
    return res.status(201).json({ attempt: populated, score, total: questions.length });
  } catch (err) {
    console.error('submitAttempt error:', err);
    return res.status(500).json({ message: "Submit attempt failed", err });
  }
};

export const listAttempts = async (req: AuthRequest, res: Response) => {
  try {
    const { note, all } = req.query;
    const filter: any = {};
    if (note && Types.ObjectId.isValid(String(note))) filter.note = note;
    if (!all || all === 'false') filter.student = req.user!._id;
    const attempts = await QuizAttempt.find(filter).sort({ createdAt: -1 }).populate('student', 'name email').populate('note', 'title');
    return res.json(attempts);
  } catch (err) {
    console.error('listAttempts error:', err);
    return res.status(500).json({ message: "List attempts failed", err });
  }
};

export const getAttempt = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid id" });
    const attempt = await QuizAttempt.findById(id).populate('student', 'name email').populate('note', 'title quiz');
    if (!attempt) return res.status(404).json({ message: "Attempt not found" });
    if (String((attempt.student as any)._id) !== req.user!._id && req.user!.role !== 'admin') {
      return res.status(403).json({ message: "Forbidden" });
    }
    return res.json(attempt);
  } catch (err) {
    console.error('getAttempt error:', err);
    return res.status(500).json({ message: "Get attempt failed", err });
  }
};

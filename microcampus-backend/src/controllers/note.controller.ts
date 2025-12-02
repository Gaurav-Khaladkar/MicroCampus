import { Response } from "express";
import Note from "../models/Note";
import { AuthRequest } from "../middleware/auth.middleware";

export const createNote = async (req: AuthRequest, res: Response) => {
  try {
    const { title, course, content, quiz } = req.body;
    const files = (req as any).files as Express.Multer.File[] | undefined;
    const attachments = files ? files.map(f => f.filename) : [];
    const note = await Note.create({ title, course, content, quiz, attachments, author: req.user!._id });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Create note failed", err });
  }
};

export const listNotes = async (req: AuthRequest, res: Response) => {
  try {
    const { course, status, q } = req.query;
    const filter: any = {};
    if (course) filter.course = course;
    if (status) filter.status = status;
    if (q) filter.title = { $regex: q, $options: 'i' };
    const notes = await Note.find(filter).sort({ createdAt: -1 }).populate('author', 'name email').populate('course', 'title');
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "List notes failed", err });
  }
};

export const getNote = async (req: AuthRequest, res: Response) => {
  try {
    const note = await Note.findById(req.params.id).populate('author', 'name email').populate('course', 'title');
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Get note failed", err });
  }
};

export const approveNote = async (req: AuthRequest, res: Response) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    note.status = 'approved';
    await note.save();
    res.json({ message: "Note approved", note });
  } catch (err) {
    res.status(500).json({ message: "Approve failed", err });
  }
};

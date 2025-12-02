import { Request, Response } from "express";
import Notice from "../models/Notice";
import { AuthRequest } from "../middleware/auth.middleware";

export const createNotice = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content, postedBy } = req.body;
    const notice = await Notice.create({ title, content, postedBy: postedBy || req.user?.name || "Unknown" });
    return res.status(201).json(notice);
  } catch (err) {
    console.error('createNotice error:', err);
    return res.status(500).json({ message: "Create notice failed", err });
  }
};

export const listNotices = async (req: Request, res: Response) => {
  try {
    const { course } = req.query;
    const filter: any = {};
    if (course) filter.course = course;
    const notices = await Notice.find(filter).sort({ createdAt: -1 });
    return res.json(notices);
  } catch (err) {
    console.error('listNotices error:', err);
    return res.status(500).json({ message: "List notices failed", err });
  }
};

export const getNotice = async (req: Request, res: Response) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) return res.status(404).json({ message: "Notice not found" });
    return res.json(notice);
  } catch (err) {
    console.error('getNotice error:', err);
    return res.status(500).json({ message: "Get notice failed", err });
  }
};

export const deleteNotice = async (req: AuthRequest, res: Response) => {
  try {
    const n = await Notice.findByIdAndDelete(req.params.id);
    if (!n) return res.status(404).json({ message: "Notice not found" });
    return res.json({ message: "Notice deleted" });
  } catch (err) {
    console.error('deleteNotice error:', err);
    return res.status(500).json({ message: "Delete notice failed", err });
  }
};

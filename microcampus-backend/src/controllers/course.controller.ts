import { Request, Response } from "express";
import { Types } from "mongoose";
import Course from "../models/Course";

export const createCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.create(req.body);
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: "Create course failed", err });
  }
};

export const listCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find().populate('students', 'name email');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "List courses failed", err });
  }
};

export const enroll = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const { userId } = req.body;
    if (!Types.ObjectId.isValid(courseId)) return res.status(400).json({ message: "Invalid courseId" });
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const userObjectId = new Types.ObjectId(userId);
    if (course.students.some(s => s.equals(userObjectId))) {
      return res.status(400).json({ message: "Already enrolled" });
    }
    course.students.push(userObjectId);
    await course.save();
    res.json({ message: "Enrolled", course });
  } catch (err) {
    res.status(500).json({ message: "Enroll failed", err });
  }
};

import dotenv from 'dotenv';
import { connectDB } from '../config/db';
import User from '../models/User';
import Course from '../models/Course';
import Note from '../models/Note';
import bcrypt from 'bcryptjs';
dotenv.config();

async function seed() {
  await connectDB();
  await User.deleteMany({});
  await Course.deleteMany({});
  await Note.deleteMany({});

  const adminPass = await bcrypt.hash('admin123', 10);
  const userPass = await bcrypt.hash('user123', 10);

  const admin = await User.create({ name: 'Admin', email: 'admin@micro.test', passwordHash: adminPass, role: 'admin' });
  const user = await User.create({ name: 'User', email: 'user@micro.test', passwordHash: userPass, role: 'student' });

  const course = await Course.create({ title: 'Data Structures', description: 'DSA course', instructor: 'Prof. X', students: [user._id] });

  const note = await Note.create({
    title: 'Stacks and Queues',
    course: course._id,
    content: 'Notes on stacks and queues...',
    attachments: [],
    quiz: { questions: [
      { q: 'Stack is LIFO?', options: ['True','False','Sometimes','None'], correctIndex: 0 },
      { q: 'Queue is FIFO?', options: ['True','False','Sometimes','None'], correctIndex: 0 }
    ]},
    status: 'approved',
    author: admin._id
  });

  console.log('Seeded:', { admin: admin.email, user: user.email, course: course.title, note: note.title });
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });

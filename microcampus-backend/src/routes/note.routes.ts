import { Router } from "express";
import { createNote, listNotes, getNote, approveNote } from "../controllers/note.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";

const router = Router();

router.get('/', authMiddleware, listNotes);
router.get('/:id', authMiddleware, getNote);
router.post('/', authMiddleware, createNote);
router.put('/:id/approve', authMiddleware, roleMiddleware('admin'), approveNote);

export default router;

import { Router } from "express";
import { submitAttempt, listAttempts, getAttempt } from "../controllers/quiz.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post('/:noteId/attempt', authMiddleware, submitAttempt);
router.get('/attempts', authMiddleware, listAttempts);
router.get('/attempts/:id', authMiddleware, getAttempt);

export default router;

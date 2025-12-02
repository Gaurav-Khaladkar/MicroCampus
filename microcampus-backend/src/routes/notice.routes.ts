import { Router } from "express";
import { createNotice, listNotices, getNotice, deleteNotice } from "../controllers/notice.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";

const router = Router();

router.get('/', authMiddleware, listNotices);
router.get('/:id', authMiddleware, getNotice);
router.post('/', authMiddleware, createNotice);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteNotice);

export default router;

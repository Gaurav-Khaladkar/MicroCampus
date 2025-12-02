import { Router } from "express";
import { listUsers, deleteUser } from "../controllers/admin.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";

const router = Router();

router.get('/users', authMiddleware, roleMiddleware('admin'), listUsers);
router.delete('/users/:id', authMiddleware, roleMiddleware('admin'), deleteUser);

export default router;

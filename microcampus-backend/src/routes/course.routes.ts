import { Router } from "express";
import { createCourse, listCourses, enroll } from "../controllers/course.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";

const router = Router();

router.get('/', authMiddleware, listCourses);
router.post('/', authMiddleware, roleMiddleware('admin'), createCourse);
router.post('/:courseId/enroll', authMiddleware, enroll);

export default router;

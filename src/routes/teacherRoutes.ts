import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {  registerTeacher, loginTeacher, updateStudentGradeById } from "../controllers/teacherController";

const teacherRouter = Router();
//swagger
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       description: User object that needs to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               profile:
 *                 type: object
 *                 properties:
 *                   bio:
 *                     type: string
 *                   socialLinks:
 *                     type: array
 *                     items:
 *                       type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
teacherRouter.post("/register", registerTeacher);
teacherRouter.post("/login", loginTeacher);
// teacherRouter.use(authMiddleware);
teacherRouter.put("/changeGradeForStudent/:id", authMiddleware,  updateStudentGradeById);
// teacherRouter.get("/", getAllStudent);
// teacherRouter.get("/getAvgForAllStudents", getAvgForAllStudents);

export default teacherRouter;


import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {  registerTeacher, loginTeacher, updateStudentGradeById, getAllStudents, getAvgForAllStudents, changeStudentGradeById } from "../controllers/teacherController";

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
teacherRouter.put("/updateGradeForStudent/:id", authMiddleware,  updateStudentGradeById);
teacherRouter.put("/changeGradeForStudent/:id/:numOfTest", authMiddleware,  changeStudentGradeById);
teacherRouter.get("/:id", authMiddleware, getAllStudents);
teacherRouter.get("/getAvgForAllStudents/:id", authMiddleware, getAvgForAllStudents);

export default teacherRouter;


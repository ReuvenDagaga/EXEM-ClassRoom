import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {  registerTeacher, loginTeacher, updateStudentGradeById, getAllStudents, getAvgForAllStudents, changeStudentGradeById } from "../controllers/teacherController";

const teacherRouter = Router();

teacherRouter.post("/register", registerTeacher);
teacherRouter.post("/login", loginTeacher);
teacherRouter.put("/updateGradeForStudent/:id", authMiddleware,  updateStudentGradeById);
teacherRouter.put("/changeGradeForStudent/:id/:numOfTest", authMiddleware,  changeStudentGradeById);
teacherRouter.get("/:id", authMiddleware, getAllStudents);
teacherRouter.get("/getAvgForAllStudents/:id", authMiddleware, getAvgForAllStudents);

export default teacherRouter;


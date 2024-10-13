import { Router } from "express";

const teacherRouter = Router();

teacherRouter.post("/register", registerTeacher);
teacherRouter.get("/login", loginTeacher);
teacherRouter.use(authMiddleware);
teacherRouter.get("/", getAllStudent);
teacherRouter.get("/getAvgForAllStudents", getAvgForAllStudents);
teacherRouter.put("/changeGradeForStudent/:id", changeGradeForStudent);

export default teacherRouter;

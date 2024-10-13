import { Router } from "express";

const studentRouter = Router();

studentRouter.post("/register", registerStudent);
studentRouter.get("/login", loginStudent);
studentRouter.use(authMiddleware);
studentRouter.get("/", getAllGrade);


export default studentRouter;

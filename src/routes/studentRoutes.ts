import { Router } from "express";
import { registerStudent, loginStudent } from "../controllers/studentController";

const studentRouter = Router();

studentRouter.post("/register", registerStudent);
studentRouter.post("/login", loginStudent);
// studentRouter.use(authMiddleware);


export default studentRouter;

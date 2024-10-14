import { Router } from "express";
import { registerStudent, loginStudent } from "../controllers/studentController";
import { authMiddleware } from "../middleware/authMiddleware";

const studentRouter = Router();

studentRouter.post("/register", registerStudent);
studentRouter.post("/login", loginStudent);
export default studentRouter;

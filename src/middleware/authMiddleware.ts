import { log } from "console";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
    user?: { Id: string }
};

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token; 
  if (!token) {
    res.status(401).send({ message: "Unauthorized, missing token" });
    return;
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { Id: string }
  req.user = decoded;
  console.log(decoded);
  if (!decoded) {
    res.status(401).send({ message: "Unauthorized" });
  }
  next();
};

import { NextFunction, Request, Response } from "express";
import Teacher, { ITeacher } from "../models/Teacher";
// import { ResponseStructure } from "../types/response";

export const registerTeacher = async (req: Request, res: Response, next: NextFunction ) => {
    try {
    const teacher: ITeacher = await Teacher.create(req.body);
    //   const response = new ResponseStructure(true, user);
      res.status(201).json(teacher);
    } catch (error) {
      next(error);
    }
  };
  

import { NextFunction, Request, Response } from "express";
import Teacher, { ITeacher } from "../models/Teacher";
import { createTeacher } from "../services/teacherService";
import { Types } from "mongoose";
// import { ResponseStructure } from "../types/response";

export const registerTeacher = async (req: Request, res: Response, next: NextFunction ) => {
    try {
    const { username, email, password, className } = req.body;
    const classId: Types.ObjectId = await createTeacher(username, email, password, className);
    //const response = new ResponseStructure(true, user);
    res.status(201).json(classId);
    } 
    catch (error) {
      next(error);
    }
  };
  

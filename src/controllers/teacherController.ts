import { NextFunction, Request, Response } from "express";
import Teacher, { ITeacher } from "../models/Teacher";
import { createTeacher } from "../services/teacherService";
import { Types } from "mongoose";
import { generateToken } from '../utils/generateToken';
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
  



  export const loginTeacher = async (req: Request, res: Response) => {
    const { username, password} = req.body;
    const teacher = await Teacher.findOne({username});

    // if(!teacher || !(await teacher.comparePassword(password))){


    if(!teacher || !password){
         res.status(401).json({massage: "username or password are wrong"})
         return
    };
    const token = generateToken(teacher._id);
        res.cookie('token', token,{ httpOnly: true, secure: false, maxAge: 3600000 });
        res.status(201).json({ massage: "login success", token });
    }



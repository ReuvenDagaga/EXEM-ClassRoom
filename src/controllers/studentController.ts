import { NextFunction, Request, Response } from "express";
import Student, { IStudent } from "../models/Student";
import { addToClassRoom } from "../services/studentService";
import { Types } from "mongoose";
import { generateToken } from '../utils/generateToken';
import  ClassRoom ,{ IClassRoom } from "../models/ClassRoom";
import { log } from "console";
// import { ResponseStructure } from "../types/response";

export const registerStudent = async (req: Request, res: Response, next: NextFunction ) => {
    try {
    const { username, email, password, classname } = req.body;
    const classRoom: IClassRoom | null = await ClassRoom.findOne({ name: classname });
    if (!classRoom) {
      throw new Error("Class not found in controller");
      return;
    }
    const classId: Types.ObjectId = await addToClassRoom( username, email, password, classRoom );
    //const response = new ResponseStructure(true, user);
    res.status(201).json(classId);
    } 
    catch (error) {
      next(error);
    }
  };
  

  export const loginStudent = async (req: Request, res: Response) => {
    const { email , password} = req.body;
    const student = await Student.findOne({ email });
    
    // if(!teacher || !(await teacher.comparePassword(password))){
    if(!student || !password){
         res.status(401).json({massage: "username or password are wrong"})
         return
    };
    const token = generateToken(student._id);
    const grades = student.grades;

    res.cookie('token', token,{ httpOnly: true, secure: false, maxAge: 3600000 });
    res.status(201).json({ grades });
}



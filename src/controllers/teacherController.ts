import { NextFunction, Request, Response } from "express";
import Teacher, { ITeacher } from "../models/Teacher";
import { createTeacher, updateGrade } from "../services/teacherService";
import { Types } from "mongoose";
import { generateToken } from '../utils/generateToken';
import { Grade } from "../interface/Grade";
import Student, { IStudent } from "../models/Student";
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
    const { email, password} = req.body;
    const teacher = await Teacher.findOne({ email });

    // if(!teacher || !(await teacher.comparePassword(password))){


    if(!teacher || !password){
         res.status(401).json({massage: "username or password are wrong"})
         return
    };
    const token = generateToken(teacher._id);
        res.cookie('token', token,{ httpOnly: true, secure: false, maxAge: 3600000 });
        res.status(201).json({ massage: "login success", token });
    }



    export const updateStudentGradeById = async (req: Request, res: Response) => {
        
        const studentId = req.params.id;
        if(!studentId){
            res.status(404).json( {message: "studentId not found"} );
            return;
        }
        const student = await Student.findOne({ studentId });
        const newGrades: Grade = req.body;

        if(!student || !newGrades){
            res.status(404).json( {message: "student not found or grades not found"} );
            return;
        }

        const updateStudent: IStudent = await updateGrade(student, newGrades);
        res.json(updateStudent);
    }
    
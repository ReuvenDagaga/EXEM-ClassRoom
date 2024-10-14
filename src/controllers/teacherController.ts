import { NextFunction, Request, Response } from "express";
import Teacher, { ITeacher } from "../models/Teacher";
import { createTeacher, updateGrade, getAllStudent, changeGrade } from "../services/teacherService";
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
        const student = await Student.findOne({ _id: req.params.id });
        const newGrades: Grade = req.body;
        if(!student || !newGrades){
            res.status(404).json( {message: "student not found or grades not found"} );
            return;
        }
        const teacher = await Teacher.findOne({ classId: student.classId });    
        if(!teacher){
            res.status(404).json( {message: "teacher not found or teacher he not in class"} );
            return;
        }
        const updateStudent: IStudent = await updateGrade(student, newGrades);
        res.json(updateStudent);
    }


    export const getAllStudents = async (req: Request, res: Response) => {
        const teacher = await Teacher.findOne({ _id: req.params.id });    
        if(!teacher){
            res.status(404).json( {message: "teacher not found or teacher he not in class"} );
            return;
        }
        const users = await getAllStudent( teacher );
        res.json(users);
    }
    

export const getAvgForAllStudents = async (req: Request, res: Response) => {
    const teacher = await Teacher.findOne({ _id: req.params.id });      
    if(!teacher){
        res.status(404).json( {message: "teacher not found or teacher he not in class"} );
        return;
    }
    const students = await getAllStudent( teacher );
    const gradesAvg = await claculateGradeAvg( students  );
    res.json(gradesAvg);
}

export const claculateGradeAvg = async (students: IStudent[]) => {

    let gradesAvg: number = 0; 
    let sumOfTest: number = 0; 
    students.forEach( (student: IStudent) => {
        if(!student.grades){
            return;
        }
        student.grades.forEach( (grade: Grade) => {
            gradesAvg += grade.grade;
            sumOfTest += 1;
        });
    });
    return gradesAvg / sumOfTest;
};

export const changeStudentGradeById = async (req: Request, res: Response) => {
    const student = await Student.findOne({ _id: req.params.id });
    if(!student){
        res.status(404).json( {message: "student not found"} );
        return;
    }
    const numOfTest: number = Number(req.params.numOfTest);
    if(!numOfTest){
        res.status(404).json( {message: "numOfTest not found"} );
        return;
    }
    const newGrades: Grade = req.body;
    if(!newGrades){
        res.status(404).json( {message: "newGrades not found"} );
        return;
    }

    const updateStudent: IStudent = await changeGrade(student, newGrades, numOfTest);
    res.json(updateStudent);
}


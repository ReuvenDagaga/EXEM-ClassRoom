import { Types } from "mongoose";
import ClassRoom ,{ IClassRoom } from "../models/ClassRoom";
import Teacher, { ITeacher } from "../models/Teacher";
import Student, { IStudent } from "../models/Student";
import { Grade } from "../interface/Grade";
import { types } from "util";



export const createTeacher = async ( username: string, email: string, password: string, className: string): Promise<Types.ObjectId> => {        
    const newClassRoom: IClassRoom = new ClassRoom({
        classname: className,
    });

    const newTeacher: ITeacher = new Teacher({
        username: username,
        email: email,
        password: password,
        classId: newClassRoom._id
    });

    await Teacher.create(newTeacher);

    newClassRoom.teacher = newTeacher._id;

    await ClassRoom.create(newClassRoom);

    return newClassRoom._id;
};


export const updateGrade = async (student: IStudent, newGrades: Grade): Promise<IStudent> => {
    if (!student.grades) {
        student.grades = [];
    }
    student.grades.push(newGrades);
    await student.save();
    return student;
};

export const getAllStudent = async (teacher: ITeacher): Promise<IStudent[]> => {
  const students = await Student.find({ classId: teacher.classId }).select("-password");
  return students;
};

export const changeGrade = async (student: IStudent, newGrades: Grade, numOfTest: number): Promise<IStudent> => {
    if (!student.grades) {
        return student;
    }
    student.grades[numOfTest] = newGrades;
    await student.save();
    return student;
};

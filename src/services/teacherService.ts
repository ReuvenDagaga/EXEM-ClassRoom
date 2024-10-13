import { Types } from "mongoose";
import ClassRoom ,{ IClassRoom } from "../models/ClassRoom";
import Teacher, { ITeacher } from "../models/Teacher";
import Student, { IStudent } from "../models/Student";
import { Grade } from "../interface/Grade";



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

    Teacher.create(newTeacher);

    newClassRoom.teacher = newTeacher._id;

    ClassRoom.create(newClassRoom);

    return newClassRoom._id;
};


export const updateGrade = async (student: IStudent, newGrades: Grade): Promise<IStudent> => {
    student.grades.push(newGrades);
    student.save();
    return student;
};



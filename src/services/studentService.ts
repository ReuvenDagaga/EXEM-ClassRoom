import { Types } from "mongoose";
import ClassRoom ,{ IClassRoom } from "../models/ClassRoom";
import Student, { IStudent } from "../models/Student";



export const addToClassRoom = async ( username: string, email: string, password: string, classRoom: IClassRoom): Promise<Types.ObjectId> => {        
    
    
    const newStudent: IStudent = new Student({
        username: username,
        email: email,
        password: password,
        classId: classRoom._id
    });

    Student.create(newStudent);

    classRoom.students?.push(newStudent._id);
    classRoom.save();

    return newStudent._id;
};


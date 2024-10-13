import { Types } from "mongoose";
import ClassRoom ,{ IClassRoom } from "../models/ClassRoom";
import Teacher, { ITeacher } from "../models/Teacher";



export const createTeacher = async ( username: string, email: string, password: string, className: string): Promise<Types.ObjectId> => {    
    const currentTime = Date.now()
    
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


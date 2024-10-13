import mongoose, { Schema, Document, Types } from "mongoose";
import { IStudent } from "./Student";
import { ITeacher } from "./Teacher";

export interface IClassRoom extends Document {
  _id: Types.ObjectId,
  classname: string,
  teacher: ITeacher['_id'],
  students: IStudent['_id'][],
}

const ClassRoomSchema = new Schema<IClassRoom>({
    classname: {
    type: String,
    required: [true, "classname is required"],
    unique: true,
    minlength:[3, "classname must be at least 3 chars long"],
    maxlength: [30, "classname cannot exceed 30 chars!"],
    match: [/^[a-zA-Z0-9]+$/, "classname can only contain letters, numbers"]
  },
    teacher: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Teachers' 
    },
    students: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Students'
    }
});

export default mongoose.model<IClassRoom>("ClassRooms", ClassRoomSchema);

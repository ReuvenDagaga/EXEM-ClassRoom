import { kMaxLength } from "buffer";
import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";

export interface ITeacher extends Document {
  _id: Types.ObjectId,
  username: string,
  email: string,
  password: string,
  classId?: Types.ObjectId
}

const teacherSchema = new Schema<ITeacher>({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    minlength:[3, "Username must be at least 3 chars long"],
    maxlength: [30, "Username cannot exceed 30 chars!"],
    match: [/^[a-zA-Z0-9]+$/, "Username can only contain letters, numbers"]
  },
  email: {
    type: String,
    required:[true,"Email is required"],
    unique:true,
    validate: {
      validator: function (emailInput:string) {
        return validator.isEmail(emailInput);
      },
      message: "Please provide valid email address"
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength:[3, "Password must be at least 3 chars long"],
    maxlength: [30, "Password cannot exceed 30 chars!"],
    match: [/^[a-zA-Z0-9]+$/, "Password can only contain letters, numbers"]
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId
  }
});

export default mongoose.model<ITeacher>("Teachers", teacherSchema);

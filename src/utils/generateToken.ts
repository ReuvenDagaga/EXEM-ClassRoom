import { Types } from "mongoose";
import jwt from 'jsonwebtoken';

export const generateToken = (Id: Types.ObjectId): string => {
    return jwt.sign({ Id }, process.env.JWT_SECRET as string, { expiresIn: '10h' })
};
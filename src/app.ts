import express from 'express';
import dotenv from 'dotenv';
import teacherRouter from './routes/teacherRoutes';
import studentRouter from './routes/studentRoutes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from "./swagger";
import connectToDB from './DAL/db';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use('/swagger',swaggerUi.serve, swaggerUi.setup(swaggerSpec));

connectToDB();

app.use(cookieParser());
app.use("/teacher", teacherRouter);
app.use("/student", studentRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

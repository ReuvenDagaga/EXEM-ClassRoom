import express from 'express';
import dotenv from 'dotenv';
import teacherRouter from './routes/teacherRoutes';


dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
// app.use(cookieParser());

app.use("/teacher", teacherRouter);
app.use("/student", studentRouter);

// app.use(authMiddleware);
// app.use("/get", userRouter);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

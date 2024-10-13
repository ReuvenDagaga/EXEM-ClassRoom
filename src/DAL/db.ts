import mongoose from 'mongoose';

const connectToDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGODB || "");
    console.log(`Mongo Connected: ${con.connection.host}`);
  } catch (error) {
    console.log(`${error}`);
  }
};

export default connectToDB;
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = (await mongoose.connect(process.env.MONGODB_URI as string))
      .connection;
    console.log("database connected succesfully");
  } catch (error) {
    console.log("database error");
  }
};
export default connectDB;

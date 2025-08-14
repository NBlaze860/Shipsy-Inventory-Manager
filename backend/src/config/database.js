import mongoose from "mongoose";

export const connectdb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("database connected");
  } catch (error) {
    console.log("database connection error: " + error);
  }
};

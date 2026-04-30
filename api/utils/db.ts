import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDb = async () => {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not defined');

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Connection error:", error);
  }
};
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDb = async () => {
  if (!process.env.MONGO_DB_URI) throw new Error('MONGO_DB_URI is not defined');

  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Connection error:", error);
  }
};
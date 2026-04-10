import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected:", process.env.MONGO_URI);
  } catch (err) {
    console.error("MongoDB connection error:", err.message || err);
    process.exit(1);
  }
}

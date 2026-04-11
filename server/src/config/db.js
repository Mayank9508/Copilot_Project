import mongoose from "mongoose";
import dotenv from "dotenv";
import { env } from "../config/env.js";

dotenv.config({ quiet: true });

export async function connectDB() {
  try {
    await mongoose.connect(env.MONGO_URI );
    console.log("MongoDB connected:", env.MONGO_URI);
  } catch (err) {
    console.error("MongoDB connection error:", err.message || err);
    process.exit(1);
  }
}

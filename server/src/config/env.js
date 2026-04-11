import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: process.env.PORT || 3000,

  // Auth
  JWT_SECRET: process.env.JWT_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET ,

  // Database
  MONGO_URI: process.env.MONGO_URI ,

  // APIs
  HUGGING_FACE_API_KEY: process.env.HUGGING_FACE_API_KEY ,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY ,
};
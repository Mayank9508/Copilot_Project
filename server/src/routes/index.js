import { Router } from "express";
import foldersRouter from "./folders/index.js";
import filesRouter from "./files/index.js";
import authRouter from "./user/index.js";
import { getGeminiResponse, getHuggingFaceResponse } from "../controllers/ai/index.js";

const router = Router();

//user auth routes here
router.use("/auth", authRouter);

// folder and file routes here
router.use("/folders", foldersRouter);
router.use("/files", filesRouter);

//AI routes here
router.post("/huggingface/:chat", getHuggingFaceResponse);
router.post("/gemini/:chat", getGeminiResponse);

export default router;

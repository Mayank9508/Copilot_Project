import { Router } from "express";
import foldersRouter from "./folders/index.js";
import filesRouter from "./files/index.js";
import authRouter from "./user/index.js";
import aiRouter from "./ai/index.js";
// import { getGeminiResponse, getHuggingFaceResponse } from "../controllers/ai/index.js";

const router = Router();

//user auth routes here
router.use("/auth", authRouter);

// folder and file routes here
router.use("/folder", foldersRouter);
router.use("/file", filesRouter);

//AI routes here
router.use("/ai", aiRouter);


export default router;

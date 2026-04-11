import { Router } from "express";
import { getGeminiResponse, getHuggingFaceResponse } from "../../controllers/ai/index.js";


const router = Router();

router.post("/huggingface", getHuggingFaceResponse);
router.post("/gemini", getGeminiResponse);


export default router;
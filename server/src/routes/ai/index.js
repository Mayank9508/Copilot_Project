import { Router } from "express";
import { createAIResponse } from "../../controllers/ai/index.js";

const router = Router();

router.post("/ai/:chat", createAIResponse);

export default router;
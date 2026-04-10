import { Router } from "express";
import foldersRouter from "./folders/index.js";
import filesRouter from "./files/index.js";
import authRouter from "./user/index.js";
import aiRouter from "./ai/index.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/folders", foldersRouter);
router.use("/files", filesRouter);
router.use("/ai", aiRouter);


// router.post("/ai/:chat", async (req, res) => {
//   let chat = req.params.chat || req.body?.chat;
//   let response = await useHuggingFace(chat, process.env.HUGGING_FACE_API_KEY);
//   return res.send(response);
// });

// import { success, badRequest, internalError } from "../utils/response.utils.js";

// router.post("/ai/:chat", async (req, res) => {
//   try {
//     // body > params priority
//     const prompt = req.body?.prompt || req.params?.chat;

//     if (!prompt) {
//       return badRequest(res, {}, "Prompt is required");
//     }

//     const response = await useHuggingFace(
//       prompt,
//       process.env.HUGGING_FACE_API_KEY,
//     );

//     console.log("AI RESPONSE:", response);

//     return success(res, { result: response }, "AI response fetched");
//   } catch (error) {
//     console.log("AI ERROR:", error);
//     return internalError(res, {}, "Failed to fetch AI response");
//   }
// });

// export default router;

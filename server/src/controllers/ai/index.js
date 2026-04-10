import useHuggingFace, { callGemini } from "../../utils/ai.utils.js";
import { badRequest, internalError } from "../../utils/response.utils.js";

export const getHuggingFaceResponse = async (req, res) => {
  let chat = req.params?.chat || req.body?.chat;
  let response = await useHuggingFace(chat, process.env.HUGGING_FACE_API_KEY);
  return res.send(response);
};

export const getGeminiResponse = async (req, res) => {
  try {
    const prompt = req.body?.prompt || req.params?.chat;
    if (!prompt) {
      return badRequest(res, {}, "Prompt is required");
    }
    const response = await callGemini(prompt);
    return success(res, { result: response }, "Gemini response fetched");
  } catch (error) {
    console.log("Gemini ERROR:", error);
    return internalError(res, {}, "Failed to fetch Gemini response");
  }
};

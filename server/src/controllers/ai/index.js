import { env } from "../../config/env.js";
import useHuggingFace, { callGemini } from "../../utils/ai.utils.js";
import { badRequest, internalError, success } from "../../utils/response.utils.js";

export const getHuggingFaceResponse = async (req, res) => {
  let prompt =  req.body?.prompt;
  let response = await useHuggingFace(prompt, env.HUGGING_FACE_API_KEY );
  return success(res, { result: response }, "Hugging Face response fetched");
  // return res.send(response);
};

export const getGeminiResponse = async (req, res) => {
  try {
    const prompt = req.body?.prompt;
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

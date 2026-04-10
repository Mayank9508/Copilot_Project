import useHuggingFace from "../../utils/ai.utils";
import { badRequest, internalError, success } from "../../utils/response.utils";

export const createAIResponse = async (req, res) => {
  try {
    // body > params priority
    const prompt = req.body?.prompt || req.params?.chat;

    if (!prompt) {
      return badRequest(res, {}, "Prompt is required");
    }

    const response = await useHuggingFace(
      prompt,
      process.env.HUGGING_FACE_API_KEY,
    );

    console.log("AI RESPONSE:", response);

    return success(res, { result: response }, "AI response fetched");
  } catch (error) {
    console.log("AI ERROR:", error);
    return internalError(res, {}, "Failed to fetch AI response");
  }
}
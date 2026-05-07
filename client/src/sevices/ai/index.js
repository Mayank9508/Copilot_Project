import { axiosInstance } from "../../config/axiosInstance.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const askGemini = asyncHandler(async (prompt) => {
  const res = await axiosInstance.post("/ai/gemini", { prompt });

  return {
    success: res.data.success,
    response: res.data.data?.result, 
  };
});

export const askHuggingFace = asyncHandler(async (prompt) => {
  const res = await axiosInstance.post("/ai/huggingface", { prompt });

  return {
    success: res.data.success,
    response: res.data.data?.result, 
  };
});
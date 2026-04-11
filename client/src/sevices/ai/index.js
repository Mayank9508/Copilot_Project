import { axiosInstance } from "../../config/axisoInstance";

export const askGemini = (prompt) => {
  return axiosInstance.post("/ai/gemini", { prompt });
};

export const askHuggingFace = (prompt) => {
  return axiosInstance.post("/ai/huggingface", { prompt });
};
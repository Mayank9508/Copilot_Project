// import { GoogleGenAI } from "@google/genai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../config/env.js";

const useHuggingFace = async (prompt, key) => {
  const finalPrompt = `You are a helpful assistant. Always reply in English. And try to cover full ans in 500 tokens only. Query: ${prompt}`;
  const query = async (data) => {
    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      },
    );

    const result = await response.json();
    return result;
  };

  // console.log(query);

  const response = await query({
    messages: [
      //   {
      //     role: "system",
      //     content: "You are a helpful assistant. Always reply in English. And try to cover full ans in 500 tokens only.",
      //   },
      {
        role: "user",
        content: finalPrompt,
      },
    ],
    model: "zai-org/GLM-5.1:novita",
    maxtokens: 500,
    temperature: 0.7,
  });

  console.log("abvc->", response);

  return response.choices?.[0]?.message?.content || "No response";
};

// const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

// export async function callGemini(prompt) {
//   const response = await ai.models.generateContent({
//     model: "gemini-3-flash-preview",
//     contents: prompt,
//   });
//   console.log(response.text);
//   return response.text;
// }

export async function callGemini(prompt) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview", // ✅ updated model
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;

    // console.log("Gemini RAW RESPONSE:", response.candidates[0].content.parts[0].text);
    // const textResponse = response.candidates[0].content.parts[0].text;
    // return textResponse;

    return response.text();
  } catch (error) {
    console.log("Gemini ERROR:", error);
    throw error;
  }
}



export default useHuggingFace;

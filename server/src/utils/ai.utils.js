// import { GoogleGenAI } from "@google/genai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../config/env.js";

const buildPrompt = (prompt) => {
  return `
You are an AI coding assistant like GitHub Copilot.

Rules:
- Always reply in English and Hindi language both, irrespective of the language of the prompt.
- Keep response concise (max 300-500 words)
- If code is asked → provide clean formatted code
- If explanation → keep it simple and structured
- Avoid unnecessary text

User Query:
${prompt}
`;
};

const useHuggingFace = async (prompt, key) => {
  const finalPrompt = buildPrompt(prompt);

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
      {
        role: "user",
        content: finalPrompt,
      },
    ],
    model: "zai-org/GLM-5.1:together",
    maxtokens: 500,
    temperature: 0.7,
  });

  console.log("abvc->", response);

  return response.choices?.[0]?.message?.content || "No response";
};

// const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

export async function callGemini(prompt) {
  try {
    const finalPrompt = buildPrompt(prompt);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const result = await model.generateContent(finalPrompt);
    const response = await result.response;

    return response.text();
  } catch (error) {
    console.log("Gemini ERROR:", error);
    throw error;
  }
}

export default useHuggingFace;

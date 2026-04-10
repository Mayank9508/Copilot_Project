import { GoogleGenAI } from "@google/genai";

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

const ai = new GoogleGenAI({ apiKey: "AIzaSyAcSLqE-YiUq05CxLuqL2aVnDAe4f3yDpY" });

export async function callGemini(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });
  console.log(response.text);
}

export default useHuggingFace;

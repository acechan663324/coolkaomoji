
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateKaomoji = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a single, unique kaomoji based on this description: "${prompt}". Your response must be a JSON object with a single key "kaomoji" containing the kaomoji string. Do not include any other text, explanation, or markdown formatting.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            kaomoji: {
              type: Type.STRING,
              description: "The generated kaomoji.",
            },
          },
        },
        temperature: 0.9,
      },
    });

    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);
    
    if (result && result.kaomoji && typeof result.kaomoji === 'string') {
        return result.kaomoji;
    } else {
        throw new Error("Invalid response format from API.");
    }
  } catch (error) {
    console.error("Error generating kaomoji:", error);
    throw new Error("Failed to generate kaomoji. Please try again.");
  }
};

import { GoogleGenAI, Type } from "@google/genai";
import { NutritionData, LanguageCode } from "../types";

const API_KEY = process.env.API_KEY;

export const fetchNutritionFromGemini = async (
  query: string, 
  lang: LanguageCode
): Promise<NutritionData> => {
  if (!API_KEY) {
    throw new Error("API_KEY_MISSING");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  // Determine prompt language context based on user selection
  const langContext = lang === 'pt-BR' 
    ? "O usuário fala Português. Retorne o nome do alimento e a porção em Português." 
    : "The user speaks English. Return the food name and serving size in English.";

  const prompt = `
    Analyze the food item: "${query}".
    ${langContext}
    Provide nutritional information per standard serving or 100g.
    Return a JSON object with:
    - foodName (string, properly capitalized)
    - calories (number, kcal)
    - protein (number, grams)
    - carbs (number, grams)
    - fat (number, grams)
    - fiber (number, grams, estimate 0 if unknown)
    - sugar (number, grams, estimate 0 if unknown)
    - sodium (number, mg, estimate 0 if unknown)
    - servingSize (string, e.g. "1 medium (182g)" or "100g")
    - emoji (string, a single emoji representing the food)
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            foodName: { type: Type.STRING },
            calories: { type: Type.NUMBER },
            protein: { type: Type.NUMBER },
            carbs: { type: Type.NUMBER },
            fat: { type: Type.NUMBER },
            fiber: { type: Type.NUMBER },
            sugar: { type: Type.NUMBER },
            sodium: { type: Type.NUMBER },
            servingSize: { type: Type.STRING },
            emoji: { type: Type.STRING }
          },
          required: ["foodName", "calories", "protein", "carbs", "fat", "servingSize"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No data returned");

    return JSON.parse(text) as NutritionData;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

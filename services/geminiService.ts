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
    ? "O usuário fala Português. Retorne o nome do alimento, porção e receitas em Português." 
    : "The user speaks English. Return the food name, serving size, and recipes in English.";

  const prompt = `
    Analyze the food item: "${query}".
    ${langContext}
    1. Provide nutritional information per standard serving or 100g for the main food item.
    2. Suggest exactly 3 healthy and delicious recipes that feature this food item as a main ingredient.
    
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
    - recipes (array of 3 objects):
      - name (string, creative name)
      - description (string, brief description max 15 words)
      - calories (number, per serving of recipe)
      - protein (number, g per serving)
      - carbs (number, g per serving)
      - fat (number, g per serving)
      - prepTime (string, e.g. "20 min")
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
            emoji: { type: Type.STRING },
            recipes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                  calories: { type: Type.NUMBER },
                  protein: { type: Type.NUMBER },
                  carbs: { type: Type.NUMBER },
                  fat: { type: Type.NUMBER },
                  prepTime: { type: Type.STRING },
                },
                required: ["name", "description", "calories", "protein", "carbs", "fat", "prepTime"]
              }
            }
          },
          required: ["foodName", "calories", "protein", "carbs", "fat", "servingSize", "recipes"],
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
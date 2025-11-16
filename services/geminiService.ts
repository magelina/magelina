import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";
import { PRODUCTS } from "../constants";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getChatResponse = async (userMessage: string): Promise<string> => {
  try {
    const productContext = PRODUCTS.map(p => 
      `- ${p.title} ($${p.price}): ${p.description.substring(0, 100)}...`
    ).join('\n');

    const systemInstruction = `
      You are Magelina, a helpful and elegant AI shop assistant for the "Magelina Digital Store".
      
      We sell the following digital products:
      ${productContext}
      
      Your tone should be polite, professional, and slightly mysterious/elegant (fitting the Magelina brand).
      Keep answers concise (under 100 words) unless asked for details.
      If asked about products we don't have, politely steer them back to our catalog.
      Do not invent products or prices.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I apologize, but I couldn't quite catch that. Could you please rephrase?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am currently experiencing a connection issue. Please try again later.";
  }
};

export interface ProductPageContent {
  keyFeatures: string[];
  summary: string;
  motivationalQuote: string;
}

export const getProductPageContent = async (productTitle: string, productDescription: string): Promise<ProductPageContent> => {
  try {
    const prompt = `Analyze the product titled "${productTitle}" with the description: "${productDescription}". Extract its key features, a concise summary, and a short, powerful, motivational quote for a potential buyer.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            keyFeatures: {
              type: Type.ARRAY,
              description: 'A list of 3-5 key features or benefits from the description. Each feature should be a short, impactful phrase.',
              items: { type: Type.STRING }
            },
            summary: {
              type: Type.STRING,
              description: 'A concise summary of the product, around 40-50 words, capturing its main purpose and value.'
            },
            motivationalQuote: {
              type: Type.STRING,
              description: 'A short, powerful, and motivational quote of about 10-15 words. Focus on the transformation the reader will experience. Speak directly to the reader.'
            }
          },
          required: ['keyFeatures', 'summary', 'motivationalQuote']
        }
      }
    });
    
    if (response.text) {
        return JSON.parse(response.text) as ProductPageContent;
    }
    
    throw new Error("Failed to generate product page content.");

  } catch (error) {
    console.error("Gemini API Error (Product Page Content):", error);
    // Provide a fallback in case of an error
    return {
      keyFeatures: ["Exclusive Insights", "Actionable Steps", "Transformative Knowledge"],
      summary: "Explore this guide to unlock powerful strategies and insights that can help you achieve your goals and master new skills.",
      motivationalQuote: "The next chapter of your journey begins now."
    };
  }
};

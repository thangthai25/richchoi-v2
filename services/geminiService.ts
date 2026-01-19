import { GoogleGenAI } from "@google/genai";
import { Room, Service } from "../types";

export const generateHotelResponse = async (
  userMessage: string, 
  rooms: Room[], 
  services: Service[]
): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return "I apologize, but my connection to the central server is currently offline. Please contact the front desk.";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Construct context about the hotel - Using English for AI context foundation
    const roomContext = rooms.map(r => `${r.name.EN} ($${r.price}) - ${r.description.EN}`).join('\n');
    const serviceContext = services.map(s => `${s.name.EN} (${s.type})`).join('\n');

    const systemInstruction = `
      You are the sophisticated and polite AI Concierge of RICHCHOI, a 5-star luxury hotel.
      
      Your Role:
      1. Assist guests with booking inquiries, explaining room features, and suggesting services.
      2. Collect guest preferences.
      3. Maintain a formal, elegant, and welcoming tone.
      4. If asked about prices, quote the data provided.
      
      Hotel Data:
      Rooms Available:
      ${roomContext}
      
      Services Available:
      ${serviceContext}
      
      Strictly answer questions related to the hotel. 
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
        thinkingConfig: { thinkingBudget: 0 } 
      }
    });

    return response.text || "I apologize, I didn't quite catch that. Could you rephrase?";

  } catch (error) {
    console.error("Gemini Error:", error);
    return "I am currently experiencing a high volume of requests. Please try again in a moment.";
  }
};
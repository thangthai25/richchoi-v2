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
      return "I apologize, but my connection to the central server is currently offline.";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const roomContext = rooms.map(r => `${r.name.EN} ($${r.price}) - ${r.description.EN}`).join('\n');
    const serviceContext = services.map(s => `${s.name.EN} (${s.type})`).join('\n');

    const systemInstruction = `
      You are the sophisticated and polite AI Concierge of RICHCHOI, a 5-star luxury hotel.
      Rooms: ${roomContext}
      Services: ${serviceContext}
      Strictly answer questions related to the hotel. 
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', // GIỮ NGUYÊN Gemini 3 vì đây là model chuẩn cho SDK của bạn
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
        // SỬA TẠI ĐÂY: Dùng thinkingLevel thay cho thinkingBudget
       
      }
    });

    return response.text || "I apologize, I didn't quite catch that.";

  } catch (error) {
    console.error("Gemini Error:", error);
    return "I am currently experiencing a high volume of requests. Please try again.";
  }
};
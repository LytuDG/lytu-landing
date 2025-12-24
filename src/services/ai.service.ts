import { GoogleGenAI } from "@google/genai";
import { ENV } from "../env/env";
import { LYTU_CHATBOT_SPECIFICATIONS } from "../lib/lytu-specifications";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export class AIService {
  private static ai = new GoogleGenAI({ apiKey: ENV.GOOGLE_AI_API_KEY });
  private static MODEL = "gemini-2.5-flash"; // Using a stable version, as 2.5 flash is likely a typo in user example or ultra-new

  static async sendMessage(
    message: string,
    history: ChatMessage[] = [],
    retries = 3
  ): Promise<string> {
    // Construct context-aware prompt
    const fullPrompt = `
${LYTU_CHATBOT_SPECIFICATIONS}

Historial de conversación:
${history
  .map((m) => `${m.role === "assistant" ? "Lytus" : "Usuario"}: ${m.content}`)
  .join("\n")}

Usuario: ${message}
Lytus:`;

    for (let i = 0; i < retries; i++) {
      try {
        const response = await this.ai.models.generateContent({
          model: this.MODEL,
          contents: fullPrompt,
        });

        if (!response || !response.text) {
          throw new Error("No response text from Gemini");
        }

        return response.text;
      } catch (error) {
        console.error(`Gemini Attempt ${i + 1} failed:`, error);
        if (i === retries - 1) throw error;
        // Exponential backoff
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, i) * 1000)
        );
      }
    }

    throw new Error("Max retries reached");
  }
}

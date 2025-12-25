import { GoogleGenAI } from "@google/genai";
import { ENV } from "../env/env";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export class AIService {
  private static ai = new GoogleGenAI({ apiKey: ENV.GOOGLE_AI_API_KEY });
  // Fallback models list
  private static MODELS = [
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-2.0-flash-lite",
  ];
  private static currentModelIndex = 0;

  private static getModel() {
    return this.MODELS[this.currentModelIndex];
  }

  private static switchModel() {
    this.currentModelIndex = (this.currentModelIndex + 1) % this.MODELS.length;
    console.log(`Switching to backup AI model: ${this.getModel()}`);
  }

  static async sendMessage(
    message: string,
    history: ChatMessage[] = [],
    lang: string = "es",
    retries = 3
  ): Promise<string> {
    const { getLytuChatbotSpecifications } = await import(
      "../lib/lytu-specifications"
    );
    const specs = getLytuChatbotSpecifications(lang);

    // Construct context-aware prompt
    const fullPrompt = `
${specs}

Historial de conversación:
${history
  .map((m) => `${m.role === "assistant" ? "Lytus" : "Usuario"}: ${m.content}`)
  .join("\n")}

Usuario: ${message}
Lytus:`;

    for (let i = 0; i < retries; i++) {
      try {
        const response = await this.ai.models.generateContent({
          model: this.getModel(),
          contents: fullPrompt,
        });

        if (!response || !response.text) {
          throw new Error("No response text from Gemini");
        }

        return response.text;
      } catch (error) {
        console.error(
          `Gemini Attempt ${i + 1} (${this.getModel()}) failed:`,
          error
        );
        this.switchModel(); // Switch to next model for retry
        if (i === retries - 1) throw error;
        // Exponential backoff
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, i) * 1000)
        );
      }
    }

    throw new Error("Max retries reached");
  }

  static async getIntent(input: string, lang: string = "es"): Promise<string> {
    const { getNavigatorPrompt } = await import("../lib/lytu-specifications");
    const prompt = getNavigatorPrompt(lang);

    // 2 retries for navigator since it's critical
    for (let i = 0; i < 2; i++) {
      try {
        const response = await this.ai.models.generateContent({
          model: this.getModel(),
          contents: prompt + input,
        });
        return response?.text?.trim().toUpperCase() || "HOME";
      } catch (error) {
        console.error(`Navigator Error (${this.getModel()}):`, error);
        this.switchModel();
      }
    }
    return "HOME";
  }
}

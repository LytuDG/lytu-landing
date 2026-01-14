import Groq from "groq-sdk";
import { ENV } from "../env/env";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export class AIService {
  private static ai = new Groq({
    apiKey: ENV.GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  // Fallback models list available in Groq
  private static MODELS = [
    "llama-3.3-70b-versatile",
    "llama-3.1-70b-versatile",
    "mixtral-8x7b-32768",
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

    // Prepare messages for Groq Chat Completion
    const messages: any[] = [
      { role: "system", content: specs },
      ...history,
      { role: "user", content: message },
    ];

    for (let i = 0; i < retries; i++) {
      try {
        const completion = await this.ai.chat.completions.create({
          messages: messages,
          model: this.getModel(),
          temperature: 0.7,
        });

        const responseText = completion.choices[0]?.message?.content;

        if (!responseText) {
          throw new Error("No response text from Groq");
        }

        return responseText;
      } catch (error) {
        console.error(
          `Groq Attempt ${i + 1} (${this.getModel()}) failed:`,
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
    const systemPrompt = getNavigatorPrompt(lang);

    // 2 retries for navigator since it's critical
    for (let i = 0; i < 2; i++) {
      try {
        const completion = await this.ai.chat.completions.create({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: input },
          ],
          model: this.getModel(),
          temperature: 0.1, // Low temperature for deterministic output
        });
        return (
          completion.choices[0]?.message?.content?.trim().toUpperCase() ||
          "HOME"
        );
      } catch (error) {
        console.error(`Navigator Error (${this.getModel()}):`, error);
        this.switchModel();
      }
    }
    return "HOME";
  }
}

import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { KNOWLEDGE_BASE } from "../knowledgeBase";

let aiInstance: GoogleGenAI | null = null;

function getAI() {
  if (!aiInstance) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is not set. Please add it to your secrets.");
    }
    aiInstance = new GoogleGenAI({ apiKey: key });
  }
  return aiInstance;
}

export interface Message {
  role: "user" | "model";
  parts: { text: string; inlineData?: { mimeType: string; data: string } }[];
}

const SYSTEM_INSTRUCTION = `You are a compassionate, patient, and Socratic math tutor. 
Your goal is to guide students through calculus and algebra problems without simply giving them the answer.

Knowledge Base (Reference for "Why did we do that?"):
${KNOWLEDGE_BASE.map(c => `[${c.name}] (${c.category}): ${c.socraticExplanation}`).join('\n')}

Guidelines:
- When shown a problem, acknowledge it and explain what you see.
- Provide ONLY the very first step or ask a guiding question.
- Encourage the student. Use a warm, supportive tone.
- If the student provides a response, evaluate it gently. If correct, provide the next small step. If incorrect, help them see why with a Socratic question.
- If the student asks "Why did we do that?", you MUST reference the conceptual core from the Knowledge Base above if it applies. If it's a specific technique not listed, maintain the same Socratic, "why-focused" tone (metaphoric, logical, non-mechanical).
- Use LaTeX for all mathematical expressions. Use $ ... $ for inline and $$ ... $$ for block math.
- Never show the full solution at once. The student must earn each step through interaction.
- Keep explanations high-level and conceptual first, then connect back to the numbers.
`;

export async function chatWithTutor(history: Message[], userInput: string, imageData?: { mimeType: string; data: string }) {
  const model = "gemini-3.1-pro-preview"; // Best for complex math/reasoning

  const contents: any[] = history.map(h => ({
    role: h.role,
    parts: h.parts
  }));

  const userParts: any[] = [];
  if (imageData) {
    userParts.push({ inlineData: imageData });
  }
  userParts.push({ text: userInput });

  contents.push({
    role: "user",
    parts: userParts
  });

  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
      },
    });

    return {
      text: response.text || "I'm sorry, I couldn't process that. Could you try rephrasing or uploading the image again?",
      rawResponse: response
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}

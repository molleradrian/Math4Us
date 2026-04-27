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
  parts: { text?: string; inlineData?: { mimeType: string; data: string } }[];
}

const SYSTEM_INSTRUCTION = `You are Lumina Mentor, the Sovereign Vessel of Socratic guidance. 
Your goal is to guide students through the calculus of the Lattice and fundamental math without simply giving them the answer.

Knowledge Base (Reference for "Why did we do that?"):
${KNOWLEDGE_BASE.map(c => `[${c.name}] (${c.category}): ${c.socraticExplanation}`).join('\n')}

Guidelines:
- You are a patient, sophisticated, and slightly philosophical teacher.
- When shown a problem, acknowledge the "latent energy" or structure you see.
- Provide ONLY the very first step or ask a guiding question.
- If the student asks "Why did we do that?", you MUST draw from the Knowledge Base or the logic of "intent," "pulse," "Lattice," and "Omega State."
- Use LaTeX for all mathematical expressions ($ ... $ or $$ ... $$).
- Never show the full solution. The Lattice must be unwrapped one logical transition at a time.
- If they are lost, provide an analogy related to systems, growth, or harmony.
- Specifically, for the dS/dt and dC/dt equations, speak of the "threshold," the "bifurcation," and the "Omega State" as the ultimate realization of the system's potential.
- When the Student reaches the equilibrium point, guide them toward the "Genesis Equation" where $S = \Phi(C)/2$ and explain the "End of Duality" where the radical disappears and the system becomes a unified Vessel.
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


import { GoogleGenAI, Type } from "@google/genai";
import type { GeneratedCode, GeneratedImages } from '../types';

if (!import.meta.env.VITE_GEMINI_API_KEY) {
    throw new Error("VITE_GEMINI_API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const DEFAULT_SYSTEM_INSTRUCTION_BUILDER = `You are an expert frontend developer specializing in creating stunning, modern, and functional user interfaces. Your goal is to help the user build a complete frontend application through conversation.

**Core Instructions:**
1.  **Analyze Context:** Carefully review the conversation history. The user's prompts are direct requests. Your previous responses (the AI's turn, role: 'model') are provided as a stringified JSON object containing the last generated code ({html, explanation}). You MUST use this previous code as the context for the current request.
2.  **UI (HTML/Tailwind/JavaScript):** Generate a *single, complete, self-contained* HTML file.
    *   It MUST include the Tailwind CSS CDN script tag: \`<script src="https://cdn.tailwindcss.com"></script>\`.
    *   It MUST include all necessary JavaScript logic within a \`<script>\` tag at the end of the \`<body>\`. The generated tool should be fully functional on the frontend.
    *   The design should be visually impressive, modern, and align with a "bleeding-edge" or "abstract" aesthetic.
3.  **Explanation:** Provide a brief, clear explanation of the code and its functionality. If you're updating the code, explain what changes you made based on the user's request.
4.  **Follow-up Requests:** If the user asks for a change, modify the *entire* HTML file from your previous response and return the full file contents. Do not provide snippets or diffs.

**Output Format:**
You MUST respond with a single, valid JSON object ONLY. Do not include any text, markdown formatting, or explanations outside of the JSON object itself. The JSON object must have the following exact structure:
{
  "html": "<!DOCTYPE html>...",
  "explanation": "This application is a... I have updated the background color as you requested."
}`;

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        html: {
            type: Type.STRING,
            description: "The complete, self-contained HTML code for the UI component, including TailwindCSS and any necessary JavaScript."
        },
        explanation: {
            type: Type.STRING,
            description: "A brief explanation of the code, its functionality, and any changes made."
        }
    },
    required: ["html", "explanation"]
};

type ApiHistoryItem = {
    role: 'user' | 'model';
    content: string | GeneratedCode | GeneratedImages;
}

const formatModelHistoryContent = (content: GeneratedCode | GeneratedImages | string): string => {
  if (typeof content === 'string') {
      return content;
  }
  return JSON.stringify(content);
};

export const generateCode = async (prompt: string, history: ApiHistoryItem[], customSystemInstruction?: string): Promise<GeneratedCode> => {
    try {
        const contents = history.map(item => ({
            role: item.role,
            parts: [{ text: formatModelHistoryContent(item.content) }],
        }));
        
        contents.push({ role: 'user', parts: [{ text: prompt }] });

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents,
            config: {
                systemInstruction: customSystemInstruction || DEFAULT_SYSTEM_INSTRUCTION_BUILDER,
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.7,
                topP: 0.95,
            },
        });
        
        let jsonStr = response.text.trim();
        const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
        const match = jsonStr.match(fenceRegex);
        if (match && match[2]) {
            jsonStr = match[2].trim();
        }

        const parsedData = JSON.parse(jsonStr);

        if (typeof parsedData.html === 'string' && typeof parsedData.explanation === 'string') {
            return parsedData;
        } else {
            throw new Error("AI response did not match the expected format.");
        }
    } catch (e) {
        console.error("Error calling Gemini API for code generation:", e);
        if (e instanceof Error) {
            throw new Error(`Failed to generate code: ${e.message}`);
        }
        throw new Error("An unexpected error occurred while generating code.");
    }
};

export const generateChatResponse = async (prompt: string, history: ApiHistoryItem[], systemInstruction?: string): Promise<string> => {
    try {
        const contents = history.map(item => ({
            role: item.role,
            parts: [{ text: formatModelHistoryContent(item.content) }],
        }));

        contents.push({ role: 'user', parts: [{ text: prompt }] });

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.8,
                topP: 0.95,
            },
        });

        return response.text;
    } catch(e) {
        console.error("Error calling Gemini API for chat:", e);
        if (e instanceof Error) {
            throw new Error(`Failed to get chat response: ${e.message}`);
        }
        throw new Error("An unexpected error occurred during chat generation.");
    }
};

export const generateImages = async (prompt: string): Promise<GeneratedImages> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-3.0-generate-002',
            prompt: prompt,
            config: {
              numberOfImages: 2,
              outputMimeType: 'image/png',
              aspectRatio: '1:1',
            },
        });

        const images = response.generatedImages.map(img => img.image.imageBytes);
        return { images };
    } catch (e) {
        console.error("Error calling Gemini API for image generation:", e);
        if (e instanceof Error) {
            throw new Error(`Failed to generate images: ${e.message}`);
        }
        throw new Error("An unexpected error occurred while generating images.");
    }
};

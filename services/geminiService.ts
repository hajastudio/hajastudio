
import { GoogleGenAI, Type } from "@google/genai";
import { CreativeBrief, Concept } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Using a placeholder. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "GEMINI_API_KEY_PLACEHOLDER" });

const conceptSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: 'A catchy, creative title for the story concept.',
    },
    logline: {
      type: Type.STRING,
      description: 'A compelling one-sentence summary of the story.',
    },
    synopsis: {
      type: Type.STRING,
      description: 'A brief, one-paragraph synopsis of the main plot points and character arc.'
    }
  }
};

const conceptListSchema = {
    type: Type.OBJECT,
    properties: {
        concepts: {
            type: Type.ARRAY,
            items: conceptSchema
        }
    }
};


export const generateConcepts = async (brief: CreativeBrief): Promise<Concept[]> => {
  if (!API_KEY) {
    // Return mock data if API key is not available
    return new Promise(resolve => setTimeout(() => resolve([
      { title: "AI Mock Concept 1", logline: "A mock concept logline.", synopsis: "This is a mock synopsis generated because the Gemini API key is missing." },
      { title: "AI Mock Concept 2", logline: "Another mock concept logline.", synopsis: "This is a second mock synopsis. Please set your API key to get real results." },
      { title: "AI Mock Concept 3", logline: "A third mock concept logline.", synopsis: "This final mock synopsis highlights the importance of the API key for full functionality." },
    ]), 1500));
  }
  
  const prompt = `
    Based on the following creative brief, generate 3 distinct and imaginative story concepts.

    **Title:** ${brief.title}
    **Genre:** ${brief.genre}
    **Logline Idea:** ${brief.logline}
    **Target Audience:** ${brief.targetAudience}
    **Key Themes:** ${brief.keyThemes}
    **Desired Visual Style:** ${brief.visualStyle}

    For each concept, provide a unique title, a compelling logline, and a brief synopsis. Ensure the concepts explore different creative directions based on the brief.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: conceptListSchema,
      },
    });

    const jsonText = response.text;
    const parsed = JSON.parse(jsonText);
    return parsed.concepts || [];
  } catch (error) {
    console.error("Error generating concepts:", error);
    throw new Error("Failed to generate concepts from Gemini API.");
  }
};

export const generateScript = async (concept: Concept): Promise<string> => {
    if (!API_KEY) {
    // Return mock data if API key is not available
    return new Promise(resolve => setTimeout(() => resolve(
`[SCENE START]

EXT. MOCK CITY - DAY

A city made of placeholder blocks. A character, MOCK_USER, walks down the street.

MOCK_USER
(to themself)
This script is a mock because the Gemini API key is not set. It's a demonstration of what a real script would look like.

A pop-up appears in front of them with the text: "Please set your API_KEY".

[SCENE END]
`
    ), 1500));
  }

  const prompt = `
    Based on the following approved concept, write the first scene of a short animation script. The script should be formatted correctly with scene headings, character names, and dialogue. It should establish the tone and introduce the main character or conflict.

    **Title:** ${concept.title}
    **Logline:** ${concept.logline}
    **Synopsis:** ${concept.synopsis}

    Generate a compelling opening scene that hooks the viewer.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error("Error generating script:", error);
    throw new Error("Failed to generate script from Gemini API.");
  }
};

import { LMStudioClient, Message } from "./lmstudio-client";

// Example schema and types
interface Character {
  name: string;
  occupation: string;
  personality: string;
  background: string;
}

const characterSchema = {
  name: "characters",
  schema: {
    type: "object",
    properties: {
      characters: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            occupation: { type: "string" },
            personality: { type: "string" },
            background: { type: "string" },
          },
          required: ["name", "occupation", "personality", "background"],
        },
        minItems: 1,
      },
    },
    required: ["characters"],
  },
};

// Initialize client
const client = new LMStudioClient({
  model: "llama-3.2-1b-instruct",
});

// Example 1: Get structured response
export async function getCharacters() {
  const messages: Message[] = [
    { role: "user", content: "Create 1-3 fictional characters" },
  ];
  try {
    const characters = await client.createChatCompletion<Character[]>(
      messages,
      {
        responseSchema: characterSchema,
        temperature: 0.7,
      }
    );

    console.log(characters);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Example 2: Get free-form response
export async function getFreeformResponse(prompt: string) {
  try {
    const response = await client.createChatCompletion<string>([
      {
        role: "user",
        content: prompt,
      },
    ]);

    console.log(response);
  } catch (error) {
    console.error("Error:", error);
  }
}

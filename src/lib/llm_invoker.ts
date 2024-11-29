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
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function summarizeContentPrompt(
  selectedText: string
): Promise<string> {
  if (selectedText.length < 30) {
    return "Content length is too short to summarize";
  }
  const prompt =
    `Summarize the content provided below, make content as short as possible but don't lose the content ` +
    `context. Reply in English if the input is in english, otherwise provide response in the same language as input. ` +
    `Do not return the language name. If the content to summarize is too short, then reply by saying that the content ` +
    `length is too short to summarize.\n\n` +
    selectedText;
  try {
    const response = await client.createChatCompletion<string>([
      {
        role: "user",
        content: prompt,
      },
    ]);
    return response;
  } catch (error) {
    console.error("Error:", error);
    return "Couldn't invoke LLM";
  }
}

export async function gatherKeyPoints(selectedText: string): Promise<string> {
  if (selectedText.length < 30) {
    return "Content length is too short to gather key points";
  }
  const prompt =
    `Gather key points from the content provided below, use bullet points for each key points. ` +
    `Reply in English if the input is in english, otherwise provide response in the same language as input. ` +
    `Do not return the language name. If the content too short, then reply by saying that the content ` +
    `length is too short to gather key points.\n\n` +
    selectedText;
  try {
    const response = await client.createChatCompletion<string>([
      {
        role: "user",
        content: prompt,
      },
    ]);
    return response;
  } catch (error) {
    console.error("Error:", error);
    return "Couldn't invoke LLM";
  }
}

export async function proofread(selectedText: string): Promise<string> {
  const prompt =
    `You are a proof reader. You will look for grammatical mistakes, spelling mistakes, punctuation misktakes. ` +
    `You will return a output after fixing all the issues. Make sure you don't lose the context. And do not change ` +
    `a lot of word or sentences. Keep the content tone as it is \n\n ` +
    selectedText;
  try {
    const response = await client.createChatCompletion<string>([
      {
        role: "user",
        content: prompt,
      },
    ]);
    return response;
  } catch (error) {
    console.error("Error:", error);
    return "Couldn't invoke LLM";
  }
}

export async function setToneToText(
  selectedText: string,
  toneType: string
): Promise<string> {
  const prompt =
    `You are helping to changing tone of a text. You will set the tone to ${toneType}.` +
    `You will show the new text with the tone ${toneType}. Then you will output the original text as well.` +
    `You will then explain what changes you have made and why.\n\n` +
    selectedText;
  try {
    const response = await client.createChatCompletion<string>([
      {
        role: "user",
        content: prompt,
      },
    ]);
    return response;
  } catch (error) {
    console.error("Error:", error);
    return "Couldn't invoke LLM";
  }
}

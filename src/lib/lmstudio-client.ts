import axios, { AxiosInstance } from "axios";

export interface LMStudioConfig {
  baseURL?: string;
  apiKey?: string;
  timeout?: number;
  model: string;
}

export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatCompletionRequest {
  model: string;
  messages: Message[];
  temperature?: number;
  max_tokens?: number;
  response_format?: {
    type: "json_schema" | "text";
    json_schema?: object;
  };
  stream?: boolean;
}

interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: Message;
    finish_reason: string;
  }[];
}

export class LMStudioClient {
  private client: AxiosInstance;
  private defaultSystemPrompt?: string;
  private modelName = "";

  constructor(config: LMStudioConfig) {
    this.client = axios.create({
      baseURL: config.baseURL || "http://localhost:1234/v1",
      timeout: config.timeout || 30000,
      headers: {
        "Content-Type": "application/json",
        ...(config.apiKey && { Authorization: `Bearer ${config.apiKey}` }),
      },
    });
    this.modelName = config.model;
  }

  /**
   * Set a default system prompt to be used in all requests
   */
  setDefaultSystemPrompt(prompt: string) {
    this.defaultSystemPrompt = prompt;
  }

  /**
   * Create a chat completion with optional JSON schema validation
   */
  async createChatCompletion<T = any>(
    messages: Message[],
    options: {
      temperature?: number;
      max_tokens?: number;
      responseSchema?: object;
      stream?: boolean;
    } = {}
  ): Promise<T> {
    const finalMessages: Message[] = [];

    // Add system prompt if exists
    if (this.defaultSystemPrompt) {
      finalMessages.push({
        role: "system",
        content: this.defaultSystemPrompt,
      });
    }

    // Add provided messages
    finalMessages.push(...messages);

    const payload: ChatCompletionRequest = {
      model: this.modelName,
      messages: finalMessages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.max_tokens,
      stream: options.stream ?? false,
    };

    // Add response format if schema is provided
    if (options.responseSchema) {
      payload.response_format = {
        type: "json_schema",
        json_schema: options.responseSchema,
      };
    }

    try {
      const response = await this.client.post<ChatCompletionResponse>(
        "/chat/completions",
        payload
      );

      const content = response.data.choices[0].message.content;

      // Parse JSON response if schema was provided
      if (options.responseSchema) {
        return JSON.parse(content) as T;
      }

      return content as T;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`LMStudio API Error: ${error.message}`);
      }
      throw error;
    }
  }
}

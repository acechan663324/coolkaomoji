import OpenAI from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

const env = import.meta.env as Record<string, string | undefined>;
const API_KEY =
  env.VITE_OPENAI_API_KEY?.trim() ??
  env.OPENAI_API_KEY?.trim() ??
  env.VITE_GEMINI_API_KEY?.trim() ??
  env.GEMINI_API_KEY?.trim();
const MODEL = env.VITE_OPENAI_MODEL?.trim() ?? 'gpt-4o-mini';

let client: OpenAI | null = null;

if (API_KEY) {
  client = new OpenAI({
    apiKey: API_KEY,
    dangerouslyAllowBrowser: true,
  });
}

const getClient = () => {
  if (!client) {
    throw new Error('AI features are unavailable because the OpenAI API key is not configured.');
  }

  return client;
};

const extractMessageContent = (messages: string | null): string => {
  if (!messages) {
    throw new Error('OpenAI returned an empty response.');
  }

  return messages.trim();
};

const sanitizeJson = (text: string) => text.replace(/```json/gi, '').replace(/```/g, '').trim();

const parseJson = <T>(text: string, context: string): T => {
  try {
    return JSON.parse(sanitizeJson(text)) as T;
  } catch (error) {
    console.error(`Failed to parse JSON for ${context}:`, error, text);
    throw new Error('The AI response format was invalid. Please try again.');
  }
};

const runChat = async (messages: ChatCompletionMessageParam[], temperature = 0.7) => {
  const ai = getClient();
  const completion = await ai.chat.completions.create({
    model: MODEL,
    temperature,
    messages,
  });

  const text = extractMessageContent(completion.choices?.[0]?.message?.content ?? null);
  return text;
};

export const generateKaomoji = async (prompt: string): Promise<string> => {
  const responseText = await runChat(
    [
      {
        role: 'system',
        content:
          'You craft playful kaomojis. Always reply with strict JSON: {"kaomoji": "<value>"} and nothing else.',
      },
      {
        role: 'user',
        content: `Generate a single, unique kaomoji based on this description: "${prompt}".`,
      },
    ],
    0.85,
  );

  const { kaomoji } = parseJson<{ kaomoji: string }>(responseText, 'kaomoji');
  if (!kaomoji || typeof kaomoji !== 'string') {
    throw new Error('OpenAI did not return a valid kaomoji.');
  }

  return kaomoji.trim();
};

export const generateKaomojiVariations = async (baseKaomoji: string): Promise<string[]> => {
  const responseText = await runChat(
    [
      {
        role: 'system',
        content:
          'You invent kaomoji variations. Always return JSON: {"variations": ["..."]} with exactly four unique entries.',
      },
      {
        role: 'user',
        content: `Create four creative kaomoji based on "${baseKaomoji}". Do not repeat the original kaomoji.`,
      },
    ],
    0.8,
  );

  const { variations } = parseJson<{ variations: string[] }>(responseText, 'variations');
  if (!Array.isArray(variations)) {
    throw new Error('OpenAI did not return valid variations.');
  }

  return variations.filter((value) => typeof value === 'string' && value.trim().length > 1);
};

export const generateKaomojiDescription = async (kaomoji: string): Promise<string> => {
  const responseText = await runChat(
    [
      {
        role: 'system',
        content:
          'You explain kaomoji meanings. Always return JSON: {"description": "<text>"} describing emotion and usage in 1-2 sentences.',
      },
      {
        role: 'user',
        content: `Describe the kaomoji "${kaomoji}".`,
      },
    ],
    0.65,
  );

  const { description } = parseJson<{ description: string }>(responseText, 'description');
  if (!description || typeof description !== 'string') {
    throw new Error('OpenAI did not return a valid description.');
  }

  return description.trim();
};

export const generateCategoryDescription = async (categoryName: string): Promise<string> => {
  const responseText = await runChat(
    [
      {
        role: 'system',
        content:
          'You summarize kaomoji categories. Always return JSON: {"description": "<text>"} capturing tone, use cases, and vibe.',
      },
      {
        role: 'user',
        content: `Explain what the "${categoryName}" kaomoji category represents in one paragraph.`,
      },
    ],
    0.65,
  );

  const { description } = parseJson<{ description: string }>(responseText, 'category description');
  if (!description || typeof description !== 'string') {
    throw new Error('OpenAI did not return a valid category summary.');
  }

  return description.trim();
};

export const generateDigitalArt = async (prompt: string, width: number): Promise<string> => {
  const responseText = await runChat(
    [
      {
        role: 'system',
        content: `You are an expert ASCII/Unicode artist. ONLY output the art itself without code fences. Every line must be exactly ${width} characters wide.`,
      },
      {
        role: 'user',
        content: `Create a mult-line text illustration using symbols, kaomojis, and emojis inspired by: "${prompt}". Use spaces to pad lines to ${width} characters.`,
      },
    ],
    0.55,
  );

  const art = responseText.replace(/```/g, '').trim();
  if (!art) {
    throw new Error('OpenAI returned an empty art response. Try another prompt.');
  }

  return art;
};

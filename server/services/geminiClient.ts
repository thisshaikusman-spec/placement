// server/services/geminiClient.ts
// Central wrapper around @google/genai. Every agent route calls askGeminiJSON()
// so prompt-building stays in /server/prompts and JSON-parsing stays here.

import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
  console.warn(
    '[geminiClient] GEMINI_API_KEY is missing or still the placeholder value. ' +
      'Set a real key in .env before calling any /api/agents/* route.'
  );
}

const ai = new GoogleGenAI({ apiKey: apiKey || '' });

const MODEL = 'gemini-2.5-flash';

const JSON_SYSTEM_INSTRUCTION =
  'You are a backend reasoning engine. Respond ONLY with a single valid JSON object. ' +
  'Do not include markdown code fences, backticks, explanations, or any text outside the JSON. ' +
  'The JSON must exactly match the shape described in the user prompt.';

/**
 * Strips ```json fences if the model adds them anyway, then parses.
 */
function safeParseJSON<T>(raw: string): T {
  const cleaned = raw
    .trim()
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/, '')
    .replace(/```\s*$/, '')
    .trim();

  try {
    return JSON.parse(cleaned) as T;
  } catch (err) {
    throw new Error(
      `Gemini did not return valid JSON. Raw response (truncated): ${cleaned.slice(
        0,
        500
      )}`
    );
  }
}

/**
 * Sends a prompt to Gemini and parses the response as JSON of type T.
 * Throws on network/API errors or malformed JSON so route handlers can
 * catch and return a clean 500 to the frontend.
 */
export async function askGeminiJSON<T>(userPrompt: string): Promise<T> {
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: userPrompt,
    config: {
      systemInstruction: JSON_SYSTEM_INSTRUCTION,
      temperature: 0.4,
    },
  });

  const text = response.text ?? '';
  if (!text) {
    throw new Error('Gemini returned an empty response.');
  }

  return safeParseJSON<T>(text);
}

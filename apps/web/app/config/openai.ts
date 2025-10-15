import OpenAI from "openai";
const apiKey = process.env.OPEN_AI_KEY!;

export const openai = new OpenAI({ apiKey });

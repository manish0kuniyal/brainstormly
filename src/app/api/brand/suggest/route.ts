// /app/api/brand/suggest/route.ts
import { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// 🔑 simple in-memory cache (resets on server restart)
const cache = new Map<string, any>();

type Suggestion = { name: string; motto: string };
type ApiResponse = { suggestions: Suggestion[] };

function extractJson(text: string): ApiResponse {
  try {
    const parsed = JSON.parse(text);
    if (parsed?.suggestions) return parsed;
  } catch {}
  const codeBlock = text.match(/```json\s*([\s\S]*?)```/i)?.[1];
  if (codeBlock) {
    try {
      const parsed = JSON.parse(codeBlock);
      if (parsed?.suggestions) return parsed;
    } catch {}
  }
  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");
  if (start !== -1 && end !== -1) {
    try {
      const arr = JSON.parse(text.slice(start, end + 1));
      return { suggestions: arr };
    } catch {}
  }
  return { suggestions: [] };
}

export async function POST(req: NextRequest) {
  try {
    const { idea, count = 10, language = "en", styleHints = [] } = await req.json();

    if (!idea || typeof idea !== "string") {
      return new Response(JSON.stringify({ error: "idea is required" }), { status: 400 });
    }

    // ✅ check cache first
    if (cache.has(idea)) {
      return Response.json(cache.get(idea));
    }

    const prompt = `
You are a world-class brand naming strategist.
Given the brand/app idea below, propose ${count} creative, short, easy-to-spell brand names.
For each name, also write a crisp, catchy motto (tagline) in ${language}.
Avoid trademarked names, avoid profanity, avoid personal data, avoid sensitive topics.

Idea:
${idea}

Style hints (optional): ${Array.isArray(styleHints) ? styleHints.join(", ") : ""}

Rules:
- Max 2 words per name
- Prefer .com suitability (no hyphens, no numbers)
- Make the motto <= 8 words
- All output must be valid JSON with this exact shape:

{
  "suggestions": [
    { "name": "NameOne", "motto": "Short catchy motto" },
    { "name": "NameTwo", "motto": "Another short motto" }
  ]
}
    `.trim();

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const json = extractJson(text);

    // ✅ save to cache
    cache.set(idea, json);

    return Response.json(json, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

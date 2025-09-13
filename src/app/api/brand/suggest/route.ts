// src/app/api/brand/suggest/route.ts
import { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is required for /api/brand/suggest");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const MODEL_NAME = process.env.GEMINI_MODEL || "gemini-1.5-flash";
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

const cache = new Map<string, unknown>();

function tryParseJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    /* fallthrough */
  }

  const codeBlock = text.match(/```json\s*([\s\S]*?)```/i)?.[1];
  if (codeBlock) {
    try {
      return JSON.parse(codeBlock);
    } catch {
      /* fallthrough */
    }
  }

  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    const maybe = text.slice(firstBrace, lastBrace + 1);
    try {
      return JSON.parse(maybe);
    } catch {
      /* fallthrough */
    }
  }

  return {};
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const ideaRaw = (body?.idea ?? "").toString();
    const idea = ideaRaw.trim();
    const language = body?.language ?? "en";
    const styleHints = Array.isArray(body?.styleHints) ? body.styleHints : [];

    if (!idea) {
      return new Response(JSON.stringify({ error: "idea is required" }), { status: 400 });
    }

    if (cache.has(idea)) {
      const cached = cache.get(idea) as unknown;
      return new Response(JSON.stringify(cached), {
        headers: { "Cache-Control": "no-store", "Content-Type": "application/json" },
      });
    }

    const prompt = `You are a world-class brand strategist and startup advisor.

Given the brand/app idea below, generate STRICT JSON only (no extra commentary). Use only double quotes.

Requirements:
- Suggest 2 to 3 creative, short, easy-to-spell brand names with mottos.
- Suggest a fitting color theme (5 hex colors).
- Suggest 2 fonts (Google Fonts preferred).
- Suggest an investmentRange for setting up this business online.
- Suggest a recommended techStack (list of frameworks, tools, services). Always include some AI integration in the tech stack.
- Suggest a list of must-have features (breakdown of the app to build). Next to each feature also include the approximate time the user might devote to building it.
- Suggest 2–3 key competitors in the same market (with short notes on differentiation).
- Suggest a launchRoadmap: 3–5 phases (like MVP → Beta → Full Launch), each with goals & rough time estimates.

Idea: ${idea}

Style hints: ${JSON.stringify(styleHints)}
Language: ${language}

JSON schema example:
{
  "idea": "Cake Shop",
  "themeName": "Playful",
  "colors": {
    "primary": "#FF6B6B",
    "secondary": "#FFD93D",
    "accent": "#6BCB77",
    "background": "#FFFFFF",
    "muted": "#F7F7F7"
  },
  "fonts": { "primary": "Poppins", "secondary": "Lora", "fallbacks": ["system-ui", "sans-serif"] },
  "suggestions": [
    { "name": "SweetSlice", "motto": "Bite into happiness" }
  ],
  "businessSetup": {
    "investmentRange": "$5k-$20k",
    "techStack": ["Next.js", "TailwindCSS", "Firebase", "Stripe", "OpenAI API"],
    "features": [
      { "name": "User Authentication", "timeEstimate": "1 week" },
      { "name": "Product Catalog", "timeEstimate": "2 weeks" },
      { "name": "Payments", "timeEstimate": "1 week" }
    ]
  },
  "competitors": [
    { "name": "CakeZone", "note": "Focuses on bulk orders" },
    { "name": "BakeHub", "note": "Strong delivery network" }
  ],
  "launchRoadmap": [
    { "phase": "MVP", "goals": "Basic storefront + payments", "timeEstimate": "1 month" },
    { "phase": "Beta", "goals": "Expand features, small user base", "timeEstimate": "2 months" },
    { "phase": "Full Launch", "goals": "Marketing + scale infra", "timeEstimate": "3 months" }
  ],
  "explanations": "Why these names, colors, fonts, and tech choices suit the idea"
}`;

    const result = await model.generateContent(prompt);

    // Defensive extraction of text from result.response
    let text = "";
    try {
      if (typeof (result as any)?.response?.text === "function") {
        // call and coerce to string
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
       text = (await (result as any).response.text()).toString();
      } else {
        text = String((result as unknown) ?? "");
      }
    } catch (_err) {
      // swallow and continue with empty text (parse fallback will return {})
      // optionally log for server debugging:
      // console.warn("parse text error", _err);
      text = "";
    }

    const parsed = tryParseJson(text);
    cache.set(idea, parsed);

    return new Response(JSON.stringify(parsed ?? {}), {
      status: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  } catch (err: unknown) {
    console.error("/api/brand/suggest error:", err);
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}

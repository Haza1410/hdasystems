import { NextResponse } from "next/server";
import {
  ASSISTANT_MODEL,
  BOOKING_URL,
  buildSystemPrompt,
} from "@/lib/assistant";

export const runtime = "nodejs";

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const MAX_HISTORY = 12;

type Role = "user" | "assistant";
type IncomingMessage = { role: Role; text: string };

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

const FALLBACK =
  "Sorry — I'm having a little trouble right now. The quickest way to get answers is a free 30-minute call — just hit any \"Book a call\" button on the page, or use this link: " +
  BOOKING_URL;

async function callOpenAI(messages: ChatMessage[], apiKey: string) {
  const res = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: ASSISTANT_MODEL,
      messages,
      max_completion_tokens: 600,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`OpenAI ${res.status}: ${detail}`);
  }
  return res.json();
}

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("[chat] OPENAI_API_KEY is not set.");
    return NextResponse.json({ reply: FALLBACK });
  }

  let incoming: IncomingMessage[];
  try {
    const body = await req.json();
    incoming = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const history: ChatMessage[] = incoming
    .filter(
      (m) =>
        (m.role === "user" || m.role === "assistant") &&
        typeof m.text === "string" &&
        m.text.trim().length > 0
    )
    .slice(-MAX_HISTORY)
    .map((m) => ({ role: m.role, content: m.text.slice(0, 2000) }));

  if (history.length === 0) {
    return NextResponse.json({ error: "No message provided." }, { status: 400 });
  }

  const messages: ChatMessage[] = [
    { role: "system", content: buildSystemPrompt() },
    ...history,
  ];

  try {
    const data = await callOpenAI(messages, apiKey);
    const reply =
      (data?.choices?.[0]?.message?.content ?? "").trim() || FALLBACK;
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("[chat] Error:", err);
    return NextResponse.json({ reply: FALLBACK });
  }
}

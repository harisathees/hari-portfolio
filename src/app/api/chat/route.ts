import { availableProviders, streamReply, type ChatMessage } from "@/lib/ai";
import { SYSTEM_PROMPT } from "@/lib/knowledge";

export const runtime = "nodejs";

const MAX_MESSAGES = 12; // only the recent conversation is sent to the model
const MAX_CHARS = 800; // per message
const RATE_LIMIT = { requests: 20, windowMs: 10 * 60 * 1000 }; // per visitor

// Simple in-memory limiter (per server instance) — enough to stop casual abuse of the API keys.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // don't grow forever
  return recent.length > RATE_LIMIT.requests;
}

function json(status: number, error: string) {
  return Response.json({ error }, { status, headers: { "Cache-Control": "no-store" } });
}

function parseMessages(body: unknown): ChatMessage[] | null {
  const raw = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(raw) || raw.length === 0) return null;
  const messages: ChatMessage[] = [];
  for (const m of raw.slice(-MAX_MESSAGES)) {
    const role = (m as { role?: unknown })?.role;
    const content = (m as { content?: unknown })?.content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim().slice(0, MAX_CHARS);
    if (text) messages.push({ role, content: text });
  }
  // conversations must start and end with the visitor
  while (messages[0]?.role === "assistant") messages.shift();
  if (messages.length === 0 || messages[messages.length - 1].role !== "user") return null;
  return messages;
}

export async function POST(req: Request) {
  if (availableProviders().length === 0) {
    return json(503, "The chatbot isn't set up yet — no AI API key is configured.");
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "local";
  if (rateLimited(ip)) return json(429, "Whoa, lots of questions! Give me a few minutes to catch my breath. 🤖");

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json(400, "Invalid request.");
  }
  const messages = parseMessages(body);
  if (!messages) return json(400, "Invalid conversation.");

  // stop if the visitor closes the chat, or if a provider hangs
  const signal = AbortSignal.any([req.signal, AbortSignal.timeout(45_000)]);
  const encoder = new TextEncoder();
  const replies = streamReply(SYSTEM_PROMPT, messages, signal);

  // pull the first chunk before answering, so provider errors become a proper error response
  let first: IteratorResult<string>;
  try {
    first = await replies.next();
  } catch (err) {
    console.error("[chat] all providers failed:", err);
    return json(502, "My circuits are a bit tangled right now — please try again in a moment.");
  }

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        if (!first.done) controller.enqueue(encoder.encode(first.value));
        for await (const text of replies) controller.enqueue(encoder.encode(text));
      } catch (err) {
        console.error("[chat] stream interrupted:", err);
        controller.enqueue(encoder.encode(" …(connection hiccup — please ask again)"));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
  });
}

// Server-only: talks to the LLM providers. Never import this from a client component.

export type ChatMessage = { role: "user" | "assistant"; content: string };
export type ProviderId = "gemini" | "grok" | "groq";

type Provider = {
  id: ProviderId;
  label: string;
  key: string | undefined;
  stream: (system: string, messages: ChatMessage[], signal: AbortSignal) => AsyncGenerator<string>;
};

// replies are meant to be short chat answers; this cap also stops the bot being used to generate long text
const MAX_TOKENS = 500;
const TEMPERATURE = 0.3;

/** Yields the JSON payload of each `data:` line in a server-sent-events response. */
async function* sseData(res: Response): AsyncGenerator<unknown> {
  if (!res.body) return;
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let nl: number;
    while ((nl = buffer.indexOf("\n")) !== -1) {
      const line = buffer.slice(0, nl).trim();
      buffer = buffer.slice(nl + 1);
      if (!line.startsWith("data:")) continue;
      const data = line.slice(5).trim();
      if (!data || data === "[DONE]") continue;
      try {
        yield JSON.parse(data);
      } catch {
        // ignore keep-alives / partial junk
      }
    }
  }
}

async function failWith(res: Response, who: string): Promise<never> {
  const detail = (await res.text().catch(() => "")).slice(0, 300);
  throw new Error(`${who} ${res.status}: ${detail}`);
}

// ---------- Google Gemini ----------
async function* streamGemini(system: string, messages: ChatMessage[], signal: AbortSignal) {
  const model = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:streamGenerateContent?alt=sse`,
    {
      method: "POST",
      signal,
      headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY! },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: system }] },
        contents: messages.map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] })),
        generationConfig: { temperature: TEMPERATURE, maxOutputTokens: MAX_TOKENS },
      }),
    },
  );
  if (!res.ok) await failWith(res, "Gemini");
  for await (const chunk of sseData(res)) {
    const parts = (chunk as { candidates?: { content?: { parts?: { text?: string; thought?: boolean }[] } }[] })
      .candidates?.[0]?.content?.parts;
    for (const part of parts ?? []) if (part.text && !part.thought) yield part.text;
  }
}

// ---------- OpenAI-compatible chat completions (xAI Grok, Groq) ----------
function openAICompatible(baseUrl: string, apiKey: () => string | undefined, model: () => string, who: string) {
  return async function* (system: string, messages: ChatMessage[], signal: AbortSignal) {
    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      signal,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey()}` },
      body: JSON.stringify({
        model: model(),
        stream: true,
        temperature: TEMPERATURE,
        max_tokens: MAX_TOKENS,
        messages: [{ role: "system", content: system }, ...messages],
      }),
    });
    if (!res.ok) await failWith(res, who);
    for await (const chunk of sseData(res)) {
      const text = (chunk as { choices?: { delta?: { content?: string } }[] }).choices?.[0]?.delta?.content;
      if (text) yield text;
    }
  };
}

const PROVIDERS: Provider[] = [
  { id: "gemini", label: "Gemini", key: process.env.GEMINI_API_KEY, stream: streamGemini },
  {
    id: "grok",
    label: "Grok",
    key: process.env.XAI_API_KEY,
    stream: openAICompatible(
      "https://api.x.ai/v1",
      () => process.env.XAI_API_KEY,
      () => process.env.XAI_MODEL || "grok-4.20-0309-non-reasoning",
      "Grok",
    ),
  },
  {
    id: "groq",
    label: "Groq",
    key: process.env.GROQ_API_KEY,
    stream: openAICompatible(
      "https://api.groq.com/openai/v1",
      () => process.env.GROQ_API_KEY,
      () => process.env.GROQ_MODEL || "openai/gpt-oss-20b",
      "Groq",
    ),
  },
];

/** Providers with a key, preferred one (AI_PROVIDER) first — later ones are fallbacks. */
export function availableProviders(): Provider[] {
  const preferred = (process.env.AI_PROVIDER || "").toLowerCase();
  const ready = PROVIDERS.filter((p) => p.key);
  return ready.sort((a, b) => Number(b.id === preferred) - Number(a.id === preferred));
}

/**
 * Streams a reply as plain text. Tries each configured provider in order and falls back
 * to the next one if a provider fails before sending any text.
 */
export async function* streamReply(system: string, messages: ChatMessage[], signal: AbortSignal) {
  const providers = availableProviders();
  let lastError: unknown;
  for (const provider of providers) {
    let sent = false;
    try {
      for await (const text of provider.stream(system, messages, signal)) {
        sent = true;
        yield text;
      }
      if (sent) return;
      lastError = new Error(`${provider.label} returned an empty reply`);
    } catch (err) {
      if (sent || signal.aborted) throw err; // can't switch providers mid-answer
      lastError = err;
      console.error(`[chat] ${provider.label} failed, trying next provider:`, err);
    }
  }
  throw lastError ?? new Error("No AI provider configured");
}

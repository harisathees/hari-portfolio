"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { profile } from "@/data/profile";
import { RobotDoodle } from "./doodles";
import { WashiTape } from "./WashiTape";

type Msg = { role: "user" | "assistant"; content: string; error?: boolean };

const WELCOME: Msg = {
  role: "assistant",
  content: `Hey! 👋 I'm ${profile.name.split(" ")[0]}'s little robot sidekick. Ask me about their projects, skills, experience, or how to get in touch.`,
};

const SUGGESTIONS = [
  `What has ${profile.name.split(" ")[0]} built?`,
  "What's the tech stack?",
  "Tell me about DrawBoard",
  `What's ${profile.name.split(" ")[0]}'s favourite food? 🍛`,
  `How can I contact ${profile.name.split(" ")[0]}?`,
];

const TEASER_KEY = "chatbot-teaser-dismissed";

/** Turns URLs, emails and /projects/... paths in a reply into links. */
function linkify(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const re = /(https?:\/\/[^\s<>()]+[^\s<>().,!?;:'"]|\/projects\/[a-z0-9-]+|[\w.+-]+@[\w-]+\.[\w.-]*\w)/gi;
  let last = 0;
  for (const m of text.matchAll(re)) {
    const [match] = m;
    const i = m.index ?? 0;
    if (i > last) parts.push(text.slice(last, i));
    const cls = "font-semibold text-accent-deep underline decoration-accent/40 underline-offset-2 hover:decoration-accent";
    if (match.startsWith("/")) {
      parts.push(<Link key={i} href={match} className={cls}>{match}</Link>);
    } else if (match.includes("@") && !match.startsWith("http")) {
      parts.push(<a key={i} href={`mailto:${match}`} className={cls}>{match}</a>);
    } else {
      parts.push(<a key={i} href={match} target="_blank" rel="noreferrer" className={cls}>{match.replace(/^https?:\/\//, "")}</a>);
    }
    last = i + match.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1" aria-label="thinking">
      {[0, 1, 2].map((i) => (
        <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-soft/70" style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
    </span>
  );
}

function RobotAvatar({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-flex items-center justify-center rounded-full border-2 border-teal bg-white ${className}`}>
      <RobotDoodle className="h-[62%] w-[62%]" accent="var(--color-teal)" />
    </span>
  );
}

export function ChatBot() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false); // auto pop-up shortly after load
  const [hovered, setHovered] = useState(false); // also shown while hovering / focusing the robot
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // show the "wanna know about Hari?" bubble shortly after load, unless dismissed this session
  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(TEASER_KEY) === "1";
    } catch {}
    if (dismissed) return;
    const t = setTimeout(() => setTeaser(true), 1800);
    return () => clearTimeout(t);
  }, []);

  const dismissTeaser = useCallback(() => {
    setTeaser(false);
    setHovered(false);
    try {
      sessionStorage.setItem(TEASER_KEY, "1");
    } catch {}
  }, []);

  const openChat = useCallback(() => {
    setOpen(true);
    dismissTeaser();
  }, [dismissTeaser]);

  // Esc closes; focus the input when opening
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 250);
    const onKey = (e: globalThis.KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // keep the newest message in view
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [messages, reduce]);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function send(text: string) {
    const question = text.trim().slice(0, 800);
    if (!question || busy) return;
    setInput("");
    setBusy(true);

    const history: Msg[] = [...messages.filter((m) => !m.error), { role: "user", content: question }];
    setMessages([...history, { role: "assistant", content: "" }]);

    const setReply = (content: string, error = false) =>
      setMessages((prev) => [...prev.slice(0, -1), { role: "assistant", content, error }]);

    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.map(({ role, content }) => ({ role, content })) }),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        setReply(data?.error ?? "Something went wrong — please try again.", true);
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let reply = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        setReply(reply);
      }
      if (!reply.trim()) setReply("Hmm, I drew a blank there. Could you ask that another way?", true);
    } catch (err) {
      if ((err as Error).name !== "AbortError") setReply("I couldn't reach my brain just now — check your connection and try again.", true);
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  const showSuggestions = messages.length === 1 && !busy;
  const firstName = profile.name.split(" ")[0];

  return (
    <div className="no-print fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.section
            key="panel"
            role="dialog"
            aria-label={`Chat with ${firstName}'s AI sidekick`}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: reduce ? 0 : 0.2, ease: "easeOut" }}
            style={{ transformOrigin: "bottom right" }}
            className="relative flex h-[min(560px,calc(100dvh-7.5rem))] w-[min(380px,calc(100vw-2rem))] flex-col rounded-2xl border border-ink/15 bg-[#fffdf7] shadow-[0_24px_60px_-18px_rgba(58,47,47,0.45)]"
          >
            <WashiTape color="teal" className="-top-2.5 left-1/2 h-5 w-20 -translate-x-1/2 -rotate-2" />

            <header className="flex items-center gap-3 border-b border-ink/10 px-4 py-3">
              <RobotAvatar className="h-10 w-10 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="font-heading text-sm font-semibold text-ink">{firstName}&apos;s AI sidekick</p>
                <p className="flex items-center gap-1.5 font-hand text-sm leading-none text-ink-soft">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  ask me anything about {firstName} ✦
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
              >
                ×
              </button>
            </header>

            <div ref={listRef} aria-live="polite" className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div key={i} className="flex justify-end">
                    <p className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tr-sm bg-ink px-3.5 py-2 text-[14px] leading-snug text-paper">
                      {m.content}
                    </p>
                  </div>
                ) : (
                  <div key={i} className="flex items-end gap-2">
                    <RobotAvatar className="mb-0.5 h-7 w-7 shrink-0" />
                    <div
                      className={`max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-bl-sm border px-3.5 py-2 text-[14px] leading-snug ${m.error ? "border-accent/30 bg-accent/10 italic text-ink-soft" : "border-ink/10 bg-note-yellow text-ink/90"}`}
                    >
                      {m.content ? linkify(m.content) : <TypingDots />}
                    </div>
                  </div>
                ),
              )}

              {showSuggestions && (
                <div className="flex flex-wrap gap-2 pl-9 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-ink/15 bg-white px-3 py-1 font-hand text-[15px] font-bold text-ink/80 shadow-[0_1px_3px_rgba(58,47,47,0.08)] transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent-deep"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={onSubmit} className="border-t border-ink/10 px-3 pb-2 pt-3">
              <div className="flex items-end gap-2 rounded-xl border border-ink/15 bg-white px-3 py-2 focus-within:border-accent/60">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  rows={1}
                  maxLength={800}
                  placeholder={`Ask about ${firstName}…`}
                  aria-label="Your question"
                  className="max-h-28 min-h-6 flex-1 resize-none bg-transparent text-[14px] leading-6 text-ink outline-none placeholder:text-ink-soft/60"
                />
                <button
                  type="submit"
                  disabled={busy || !input.trim()}
                  aria-label="Send"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-all hover:bg-accent-deep disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 12h13M13 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
              <p className="mt-1.5 text-center font-hand text-xs text-ink-soft/70">AI answers can be wrong — double-check with {firstName}.</p>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      {/* hovering anywhere over the robot or the bubble keeps the bubble open */}
      <div className="flex items-end gap-2" onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
        <AnimatePresence>
          {(teaser || hovered) && !open && (
            <motion.div
              key="teaser"
              initial={{ opacity: 0, x: 12, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 12, scale: 0.9 }}
              transition={{ duration: reduce ? 0 : 0.25 }}
              className="relative mb-3 -rotate-2"
            >
              <button
                type="button"
                onClick={openChat}
                className="rounded-2xl rounded-br-sm border border-ink/15 bg-white px-4 py-2.5 text-left shadow-[0_8px_24px_-8px_rgba(58,47,47,0.35)] transition-transform hover:-translate-y-0.5"
              >
                <span className="block font-hand text-lg font-bold leading-tight text-ink">psst… wanna know about {firstName}? 👋</span>
                <span className="block font-hand text-sm text-accent-deep">ask my AI sidekick →</span>
              </button>
              <button
                type="button"
                onClick={dismissTeaser}
                aria-label="Dismiss"
                className="absolute -left-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-ink/15 bg-white text-xs text-ink-soft shadow-sm hover:text-ink"
              >
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => (open ? setOpen(false) : openChat())}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          aria-label={open ? "Close chat" : `Chat with ${firstName}'s AI sidekick`}
          aria-expanded={open}
          animate={reduce || open ? { y: 0 } : { y: [0, -5, 0] }}
          transition={reduce || open ? { duration: 0 } : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.06, rotate: -4 }}
          whileTap={{ scale: 0.95 }}
          className="relative h-14 w-14 rounded-full shadow-[0_10px_28px_-8px_rgba(58,47,47,0.45)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:h-16 sm:w-16"
        >
          <RobotAvatar className="h-full w-full bg-note-blue" />
          <span className="absolute right-0.5 top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
        </motion.button>
      </div>
    </div>
  );
}

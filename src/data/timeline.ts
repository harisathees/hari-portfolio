// "Career Path" on /about. Entries alternate left/right automatically.
// `aside` is the doodle + stickers shown beside the card on desktop (pure decoration).

export type TimelineAside = {
  doodle: "cat" | "robot" | "mech" | "chip";
  stickers: { text: string; tint: string }[];
  note?: string; // small handwritten line under the stickers
};

export type TimelineEntry = {
  period: string;
  badge: string; // e.g. "🎓 school"
  title: string;
  place: string;
  description: string;
  bullets?: string[];
  aside: TimelineAside;
};

export const timeline: TimelineEntry[] = [
  {
    period: "2023 — 2026",
    badge: "🎓 school",
    title: "B.Sc. Computer Science",
    place: "Kamaraj College of Arts and Science, Thoothukudi (MSU)",
    description:
      "Building computer science foundations — data structures, database management systems, web architecture, and software engineering principles.",
    aside: {
      doodle: "cat",
      stickers: [{ text: "campus cat studying DSA 🐾📖", tint: "var(--color-note-blue)" }],
      note: "theory & foundational algorithms",
    },
  },
  {
    period: "2025",
    badge: "🛡️ security",
    title: "Security Report",
    place: "Peace Soft Technologies",
    description:
      "Found a software bug in Peace Soft Technologies' app that let me take control of it, and documented it in a security report. Seeing both the attacker's side and the developer's side changed how I build.",
    bullets: [
      "Discovered a bug that put the company's app under an outsider's control.",
      "Reported it in a security report so it could be fixed.",
      "Now I build apps with security in mind from day one.",
    ],
    aside: {
      doodle: "robot",
      stickers: [{ text: "security mode: on 🛡️🔍", tint: "var(--color-note-yellow)" }],
      note: "find the bug before they do →",
    },
  },
  {
    period: "2025 — Present",
    badge: "⚡ dev",
    title: "Building Real Products",
    place: "Project-Driven",
    description:
      "Designing and shipping full-stack apps end to end — from a gold loan management system for a pawn brokerage to a real-time collaborative whiteboard, an AI resume checker and a phone-based crowd-sensing platform.",
    bullets: [
      "Real-time systems with Socket.IO, WebSockets and Redis (DrawBoard, Sentinel).",
      "AI features powered by Google Gemini (ATS Resume Checker, AI Safety Report).",
      "Backends in NestJS, Express.js and FastAPI, with PostgreSQL, MySQL and Supabase.",
    ],
    aside: {
      doodle: "mech",
      stickers: [
        { text: "full-stack turbopack beast ⚡🦾", tint: "var(--color-note-green)" },
        { text: "shipping real products 🚀", tint: "var(--color-note-pink)" },
      ],
    },
  },
  {
    period: "2026",
    badge: "💼 work",
    title: "Junior Developer",
    place: "Nellion Tech",
    description: "Built an AI-powered power plant management app as a junior developer at Nellion Tech.",
    aside: {
      doodle: "chip",
      stickers: [{ text: "powering plants with AI ⚡🏭", tint: "var(--color-note-orange)" }],
      note: "real team, real codebase →",
    },
  },
];

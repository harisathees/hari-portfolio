// Your projects. Order here = order on the site (first 6 show by default).
// `link` is the live demo (omit if none). `resume` entries also appear on /resume.

export type NoteColor = "yellow" | "pink" | "blue" | "green" | "orange" | "purple";

export const NOTE_TINT: Record<NoteColor, string> = {
  yellow: "var(--color-note-yellow)",
  pink: "var(--color-note-pink)",
  blue: "var(--color-note-blue)",
  green: "var(--color-note-green)",
  orange: "var(--color-note-orange)",
  purple: "var(--color-note-purple)",
};

export type Project = {
  slug: string;
  name: string;
  subtitle: string;
  date: string;
  blurb: string;
  image: string;
  tags: string[];
  color: NoteColor;
  repo: string;
  link?: string;
  featured?: boolean;
  highlights: string[];
  resume?: { subtitle: string; dates: string; stack: string; bullets: string[] };
};

export const projects: Project[] = [
  {
    slug: "drawboard",
    name: "DrawBoard",
    subtitle: "Real-Time Collaborative Whiteboard",
    date: "2026",
    blurb:
      "Production-grade collaborative drawing board — share a six-character code and sketch together live, with vector strokes streamed over Socket.IO and persisted in PostgreSQL.",
    image: "/projects/drawboard.webp",
    tags: ["Next.js 15", "NestJS 11", "Socket.IO", "PostgreSQL", "Redis"],
    color: "yellow",
    repo: "https://github.com/harisathees/drawboard",
    link: "https://drawboard-harisathees.vercel.app/",
    featured: true,
    highlights: [
      "Vector-only sync model: strokes cross the wire as a tool, a style and ordered points — never images — so they stay tiny and replay at any zoom.",
      "Live presence with named cursors, join/leave notifications and per-user undo/redo that only ever touches your own strokes.",
      "Durable boards with automatic snapshot compaction, so a late joiner replays one row instead of thousands of events.",
      "Horizontally scalable through a Redis adapter, with structured logs, correlation IDs, health probes and Swagger docs for every REST endpoint and socket event.",
    ],
    resume: {
      subtitle: "Collaborative Drawing Board",
      dates: "Aug 2026 - Aug 2026",
      stack: "Next.js, NestJS, Socket.IO, Prisma, PostgreSQL, Redis, Fabric.js",
      bullets: [
        "Built a real-time collaborative whiteboard where users join with a six-character code and draw together live.",
        "Streamed vector strokes over Socket.IO with live cursors, presence, and per-user undo/redo.",
        "Persisted boards in PostgreSQL via Prisma with snapshot compaction and scheduled cleanup of inactive rooms.",
        "Added a Redis adapter for horizontal scaling, structured logging, health probes, and Swagger API docs.",
      ],
    },
  },
  {
    slug: "sentinel",
    name: "Sentinel",
    subtitle: "Collective AI Sensing Platform",
    date: "2026",
    blurb:
      "Phone-first collective intelligence platform — nearby phones observe an incident through camera, microphone, motion and location, and a crowd-fusion engine merges their signals into one confirmed alert.",
    image: "/projects/sentinel.webp",
    tags: ["React Native", "Expo", "FastAPI", "WebSockets", "Supabase"],
    color: "blue",
    repo: "https://github.com/harisathees/Sentinel",
    featured: true,
    highlights: [
      "Crowd fusion engine that correlates observations spatially (Haversine), temporally and by confidence to grade incidents from DETECTED to CONFIRMED.",
      "On-device sensor observers for camera, audio, motion and location behind a pluggable AI provider layer (local, cloud or mock).",
      "Realtime WebSocket broadcasting from FastAPI, with an offline queue and SecureStore on the Expo mobile app.",
      "False-positive protection rules and Pytest coverage for the fusion engine, backed by a Supabase schema for devices, observations and incidents.",
    ],
    resume: {
      subtitle: "Collective AI Sensing Platform",
      dates: "Sep 2026 - Sep 2026",
      stack: "React Native, Expo, FastAPI, Python, WebSockets, Supabase",
      bullets: [
        "Built a phone-first platform where nearby phones observe an incident and fuse their signals into one alert.",
        "Wrote a crowd fusion engine scoring incidents by spatial, temporal, and confidence correlation.",
        "Streamed incidents in real time over WebSockets from a FastAPI backend to an Expo React Native app.",
        "Added false-positive protection rules and Pytest unit tests for the fusion engine.",
      ],
    },
  },
  {
    slug: "ats-resume-checker",
    name: "ATS Resume Checker",
    subtitle: "AI Resume Analysis Tool",
    date: "2026",
    blurb:
      "Upload a resume and get an instant 0–100 ATS compatibility score, missing-keyword analysis and actionable fixes, powered by Google Gemini.",
    image: "/projects/ats-resume-checker.webp",
    tags: ["Next.js 14", "Express.js", "MySQL", "Gemini AI", "JWT"],
    color: "purple",
    repo: "https://github.com/harisathees/AI-ATS-CHECKER",
    featured: true,
    highlights: [
      "Parses PDF, DOC and DOCX uploads and scores ATS compatibility from 0 to 100 with Google Gemini.",
      "Keyword gap analysis, automatic skills extraction and contact-detail parsing with targeted recommendations.",
      "Express.js + TypeScript API with MySQL resume history, JWT sessions and Google OAuth 2.0 sign-in.",
      "Print-ready analysis reports exported to PDF with html2canvas and jsPDF.",
    ],
    resume: {
      subtitle: "AI Resume Analyzer",
      dates: "Mar 2026 - Jul 2026",
      stack: "Next.js, TypeScript, Express.js, MySQL, Gemini AI, JWT, Google OAuth",
      bullets: [
        "Built a resume analyzer that scores ATS compatibility from 0 to 100 using Google Gemini.",
        "Added keyword gap analysis, skills extraction, contact parsing, and improvement suggestions.",
        "Built an Express.js API with MySQL history, JWT authentication, and Google OAuth sign-in.",
        "Generated printable PDF reports in the browser with html2canvas and jsPDF.",
      ],
    },
  },
  {
    slug: "billing",
    name: "Billing",
    subtitle: "Shop Billing & Invoicing App",
    date: "2026",
    blurb:
      "Billing app for a shop: create multi-item bills, view them as printable invoices, download PDFs and send them to customers on WhatsApp.",
    image: "/projects/billing.webp",
    tags: ["Next.js 16", "Supabase", "PWA", "jsPDF"],
    color: "orange",
    repo: "https://github.com/harisathees/simple-billing-software",
    link: "https://hari-billing.netlify.app/",
    featured: true,
    highlights: [
      "Bills and shop details stored in Supabase Postgres, with the shop logo kept in Supabase Storage.",
      "Invoice PDFs generated entirely in the browser on view, download or share — never stored on a server.",
      "Supabase Auth with no public sign-up: the owner provisions staff logins from the terminal.",
      "Installable PWA ready for Bubblewrap Android builds, with light/dark themes, search and infinite scroll.",
    ],
    resume: {
      subtitle: "Shop Billing & Invoicing",
      dates: "Nov 2026 - Nov 2026",
      stack: "Next.js, Supabase, PostgreSQL, jsPDF, PWA",
      bullets: [
        "Built a billing app to create multi-item bills, print invoices, and share them on WhatsApp.",
        "Stored bills and shop details in Supabase with the shop logo in Supabase Storage.",
        "Generated invoice PDFs fully in the browser so no invoice is ever stored on a server.",
        "Shipped it as an installable PWA with staff-only logins managed by the owner.",
      ],
    },
  },
  {
    slug: "ai-safety-report",
    name: "AI Safety Report",
    subtitle: "Manufacturing Safety Report Generator",
    date: "2026",
    blurb:
      "Generates monthly safety reports for manufacturing plants by analysing workplace safety observations with Google Gemini 2.0 Flash.",
    image: "/projects/ai-safety-report.webp",
    tags: ["Next.js", "Gemini 2.0", "TypeScript", "Jest"],
    color: "green",
    repo: "https://github.com/harisathees/ai-safety-report",
    link: "https://ai-safety-report.vercel.app/",
    featured: true,
    highlights: [
      "Turns raw workplace safety observations into structured monthly plant reports using Gemini's native JSON mode.",
      "Hallucination detection that catches and strips fabricated observation IDs from model output.",
      "Strict plant-scoped data isolation so one plant's report never sees another plant's data.",
      "Jest suites proving isolation, hallucination handling and graceful recovery from malformed LLM output.",
    ],
  },
  {
    slug: "aural-graphix",
    name: "Aural Graphix",
    subtitle: "Creative Agency Website",
    date: "2026",
    blurb:
      "Next.js rebuild of the Aural Graphix creative-agency site — a 1:1 recreation of the original design on a modern, SEO-first React stack.",
    image: "/projects/aural-graphix.webp",
    tags: ["Next.js 15", "React 19", "Tailwind CSS v4", "Motion"],
    color: "pink",
    repo: "https://github.com/harisathees/AURAL-GRAPHIX",
    link: "https://auralgraphix.com/",
    featured: true,
    highlights: [
      "Faithful recreation across three breakpoints, with typography, colour and spacing tokens mirrored from the source design system.",
      "Appear, text, ticker, scroll and carousel animations rebuilt with Motion (Framer Motion).",
      "Image weight cut from 49 MB to 3.5 MB using next/image with AVIF/WebP and locally optimised assets.",
      "Static case-study and blog routes plus a generated sitemap, robots.txt and Open Graph images for SEO.",
    ],
  },
  {
    slug: "ascii-art-studio",
    name: "ASCII Art Studio",
    subtitle: "Image to Interactive ASCII",
    date: "2026",
    blurb:
      "Turns any image into interactive ASCII art in the browser — animated, cursor-reactive and exportable as a standalone React component.",
    image: "/projects/ascii-art-studio.webp",
    tags: ["Next.js 16", "React 19", "TypeScript", "Canvas"],
    color: "yellow",
    repo: "https://github.com/harisathees/ascii-art-studio",
    featured: true,
    highlights: [
      "Accurate conversion using a measured character aspect ratio, gamma-correct luminance and edge-aware directional glyphs.",
      "Background removal, five ambient animations and five cursor interactions rendered to canvas.",
      "One-click export to a standalone React component whose only import is react.",
      "Fully client-side — no backend and no API route, so the image never leaves the browser.",
    ],
  },
  {
    slug: "cgpa",
    name: "CGPA Calculator",
    subtitle: "CGPA Tracker for MSU Students",
    date: "2026",
    blurb:
      "Full-stack CGPA calculator for MSU University students — track semesters and courses and compute your CGPA behind a secure account.",
    image: "/projects/cgpa.webp",
    tags: ["Next.js 16", "NestJS 11", "Prisma", "MySQL", "JWT"],
    color: "blue",
    repo: "https://github.com/harisathees/cgpa",
    featured: true,
    highlights: [
      "Monorepo pairing a Next.js 16 frontend with a NestJS 11 REST API.",
      "Self-contained email/password authentication issuing JWTs through Passport and bcrypt.",
      "Semesters and courses modelled in MySQL through Prisma 7, with migrations and seed data.",
      "One-command setup scripts for macOS, Linux and Windows that install, configure env files and migrate.",
    ],
  },
  {
    slug: "nsh-gold-loan",
    name: "NSH Gold Loan",
    subtitle: "Gold Loan & Pawn Brokerage Manager",
    date: "2025",
    blurb:
      "Management system for a gold loan and pawn brokerage business — pledges, re-pledges, interest, cash book and notices, with branch-based access.",
    image: "/projects/nsh-gold-loan.webp",
    tags: ["React", "TypeScript", "Supabase", "Zod"],
    color: "purple",
    repo: "https://github.com/harisathees/gold-loan-management",
    featured: true,
    highlights: [
      "Branch-based roles and user management, so each branch sees and manages only its own loans and customers.",
      "Pledge and re-pledge tracking with banks, plus tested interest calculation and loan-closure flows.",
      "Customer photo and audio capture at pledge time, a daily cash book and a live rates dashboard.",
      "Printable overdue and annual notices, with PDF and Excel exports.",
    ],
  },
  {
    slug: "aquareminder",
    name: "AquaReminder",
    subtitle: "Smart Hydration Reminder App",
    date: "2026",
    blurb:
      "React Native hydration app that calculates a personal daily water target and reminds you with custom sounds — even when the phone is locked.",
    image: "/projects/aquareminder.webp",
    tags: ["React Native", "Expo", "TypeScript", "Notifications"],
    color: "orange",
    repo: "https://github.com/harisathees/drinking-water-remainder",
    featured: true,
    highlights: [
      "Biometric target calculator based on body weight, gender and daily activity level.",
      "High-priority Android notification channels that pop up even when the screen is off or locked.",
      "Custom reminder tones picked from device storage, plus built-in synthesized presets.",
      "Interval and fixed-time schedules, streak tracking, intake history and confetti when you hit your goal.",
    ],
  },
  {
    slug: "frostwork",
    name: "Frostwork",
    subtitle: "Scroll-Driven Arctic WebGL Experience",
    date: "2026",
    blurb:
      "Interactive WebGL scrollytelling — a camera flight over an ice field, through an igloo's entrance and into the cavern beneath, with nothing downloaded.",
    image: "/projects/frostwork.webp",
    tags: ["WebGL2", "GLSL", "JavaScript", "Vite"],
    color: "green",
    repo: "https://github.com/harisathees/igloo",
    featured: true,
    highlights: [
      "Every mesh, material and sound is generated procedurally in the browser — no textures, models or audio files.",
      "Catmull-Rom camera timeline driven by a damped virtual scroll, with handheld drift, parallax and FOV punches.",
      "Around 700 igloo blocks merged into a single draw call, with mortar seams computed in the fragment shader.",
      "90k GPU-animated snowflakes in one draw call, plus custom post-processing and synthesised ambient audio.",
    ],
  },
  {
    slug: "ios-portfolio",
    name: "iOS Portfolio",
    subtitle: "Interactive macOS / iOS Desktop",
    date: "2026",
    blurb:
      "Personal portfolio built as an interactive macOS / iOS desktop — real projects, photos and a Tamil வணக்கம் greeting.",
    image: "/projects/ios-portfolio.webp",
    tags: ["Next.js 16", "React 19", "GSAP", "Zustand"],
    color: "pink",
    repo: "https://github.com/harisathees/ios-portfolio",
    featured: true,
    highlights: [
      "Desktop-style interface with app windows and transitions animated in GSAP.",
      "Window and app state managed globally with Zustand and Immer.",
      "Built-in terminal powered by xterm.js and an in-app PDF viewer.",
      "Showcases real projects from github.com/harisathees.",
    ],
  },
  {
    slug: "laya-test",
    name: "Laya Test",
    subtitle: "Decision-Engine Test Harness",
    date: "2026",
    blurb:
      "Harness and local web console for benchmarking Laya, a non-autoregressive decision engine that returns calibrated probabilities instead of generated tokens.",
    image: "/projects/laya-test.webp",
    tags: ["Python 3.11", "Laya", "Hugging Face"],
    color: "yellow",
    repo: "https://github.com/harisathees/laya",
    featured: true,
    highlights: [
      "Smoke test that loads the English checkpoint and reports memory use and cold-call latency.",
      "English vs Tamil comparison on the multilingual checkpoint, including language detection.",
      "Benchmark with warm-up runs reporting min/median/mean/max latency, standard deviation and throughput.",
      "Stdlib-only HTTP server and single-page console, running entirely on CPU on an 8 GB laptop.",
    ],
  },
  {
    slug: "code-x-circuit",
    name: "Code X Circuit",
    subtitle: "Mobile Repair Shop Website",
    date: "2025",
    blurb:
      "Responsive website for a mobile phone repair shop, with animated service showcases and a working contact form.",
    image: "/projects/code-x-circuit.webp",
    tags: ["HTML", "CSS", "JavaScript", "Swiper"],
    color: "blue",
    repo: "https://github.com/harisathees/codexcircuit",
    featured: true,
    highlights: [
      "Responsive single-page site presenting the shop's repair and design services.",
      "Swiper carousels and ScrollReveal entrance animations.",
      "Contact form that sends enquiries straight to email through EmailJS.",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

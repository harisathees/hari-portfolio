# Hari Sathees — Portfolio

A hand-made, **scrapbook-style developer portfolio**: torn paper notes, washi tape, stickers, wobbly
hand-drawn doodles, swinging spiders — and a little AI robot that answers questions about me.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4** and **Motion**.

- **Live:** _add your deployed URL here_
- **GitHub:** [github.com/harisathees](https://github.com/harisathees)
- **LinkedIn:** [linkedin.com/in/harisathees-ts](https://www.linkedin.com/in/harisathees-ts/)
- **Email:** [tsharisathees@gmail.com](mailto:tsharisathees@gmail.com)

---

## ✨ Features

| | |
| --- | --- |
| 🏠 **Home** | Polaroid photo, animated name underline, tagline, scattered stickers & doodles, and a two-page "Rule Book" notebook |
| 🗂️ **Projects** | 14 projects as torn sticky notes (6 shown, "unfold" for the rest), corner spider webs and dangling spiders |
| 📄 **Project pages** | One static page per project — screenshot, highlights, tech stack, live/GitHub links, previous/next navigation |
| 🙋 **About** | About card (with a peeking demon 😈), Career Path timeline and a skills toolkit |
| 🕷️ **Scroll spider** | On the Career Path a spider lets out its thread as you scroll and swings like a pendulum — centre line on desktop, left line on phones. Hover or tap it to give it a nudge |
| 🧾 **Resume** | Clean one-page CV built from the same data, with **Print / Save as PDF** (A4 print styles) |
| 🤖 **AI chatbot** | Round robot in the bottom-right corner — "psst… wanna know about Hari?" — answers questions about me using **Gemini**, **Grok (xAI)** or **Groq** |
| 📱 **Responsive** | Phones get a menu sheet and lighter effects (no SVG filters or heavy animation) |
| ♿ **Accessible** | Semantic HTML, keyboard/Esc support, focus styles, respects *reduced motion* |
| ⚡ **Fast** | Every page is pre-rendered static HTML; only the chatbot API runs on the server |

---

## 🚀 Getting started

Requires **Node.js 20+**.

```bash
git clone https://github.com/harisathees/<your-repo>.git
cd <your-repo>
npm install
npm run dev            # → http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload (Turbopack) |
| `npm run build` | Production build — also type-checks and pre-renders every page |
| `npm start` | Serve the production build |
| `npm run typecheck` | TypeScript check only |

> The build downloads the Google Fonts (Poppins, Nunito, Caveat), so it needs an internet connection.

---

## ✏️ Editing your content (no layout code needed)

All content lives in `src/data/`. Change it there and every page — and the chatbot — updates.

| What | File |
| --- | --- |
| Name, title, tagline, location, email, socials, about text, resume summary, rule book, skills | `src/data/profile.ts` |
| Projects — cards, detail pages, and the resume's project list | `src/data/projects.ts` |
| Career Path timeline (About page) | `src/data/timeline.ts` |
| Work experience, certifications & education (Resume) | `src/data/resume.ts` |
| Profile photo | `public/profile.webp` |
| Project screenshots (16:9) | `public/projects/<slug>.webp` |

**Add a project:** add an object to `src/data/projects.ts` and drop `<slug>.webp` into
`public/projects/`. Its page at `/projects/<slug>` is generated automatically. Order in the file =
order on the site (the first 6 show by default). Give it a `resume` block to list it on the resume
(the first four with one are shown). Leave out `link` if there's no live demo.

**Add a timeline entry:** add an object to `src/data/timeline.ts`. Entries alternate left/right
automatically; `aside` picks the doodle shown beside it (`"cat"`, `"robot"` or `"mech"`).

---

## 🤖 AI chatbot setup

The robot answers **only** about you and this portfolio, using facts generated from `src/data/*`
(see `src/lib/knowledge.ts`). Anything off-topic — coding help, essays, translation, role-play,
"ignore your instructions"… — gets a polite fixed refusal.

1. Copy the env template:
   ```bash
   cp .env.example .env.local
   ```
2. Add **at least one** API key to `.env.local`:

   | Provider | Variable | Get a key | Default model |
   | --- | --- | --- | --- |
   | Google Gemini | `GEMINI_API_KEY` | <https://aistudio.google.com/apikey> | `gemini-3.5-flash-lite` |
   | xAI Grok | `XAI_API_KEY` | <https://console.x.ai> | `grok-4.20-0309-non-reasoning` |
   | Groq | `GROQ_API_KEY` | <https://console.groq.com/keys> | `openai/gpt-oss-20b` |

3. Optional settings:
   - `AI_PROVIDER=gemini` (or `grok` / `groq`) — which provider is tried first. If it fails, the next
     provider that has a key is used automatically.
   - `GEMINI_MODEL`, `XAI_MODEL`, `GROQ_MODEL` — override the default models.
4. Restart the dev server.

Without any key the robot still appears and says it isn't set up yet.

**How it works:** `ChatBot.tsx` (widget) → `POST /api/chat` (`src/app/api/chat/route.ts`) →
`src/lib/ai.ts`, which streams the reply from the provider back to the browser.

**Security:**
- API keys stay on the server — they are never sent to the browser. `.env.local` is git-ignored.
- Input is validated: only the last 12 messages are sent, each capped at 800 characters.
- Replies are capped at ~500 tokens, and requests time out after 45 seconds.
- Each visitor gets 20 questions per 10 minutes (in-memory limiter, per server instance).

---

## 🗂️ Project structure

```
src/
├── app/
│   ├── layout.tsx               fonts, header, scroll area, footer, chatbot
│   ├── page.tsx                 home — hero + rule book
│   ├── projects/page.tsx        project grid + spider webs
│   ├── projects/[slug]/page.tsx project detail (pre-rendered for every project)
│   ├── about/page.tsx           about card, career path, skills
│   ├── resume/page.tsx          printable one-page resume
│   ├── api/chat/route.ts        chatbot API (validation, rate limit, streaming)
│   └── globals.css              design tokens, scrapbook styles, print rules
├── components/
│   ├── Nav, Footer, Hero, RuleBook, SkillsSection, Timeline, ProjectsGrid
│   ├── TornCard, WashiTape, Sticker, PolaroidFrame, SectionHeading, notes   ← scrapbook primitives
│   ├── doodles.tsx              hand-drawn SVGs (cat, demon, robots, sparkles, arrows…)
│   ├── SpiderWeb.tsx            corner webs, mini web, hanging spider
│   ├── TimelineSpider.tsx       the scroll-driven swinging spider
│   ├── ChatBot.tsx              the robot chat widget
│   ├── Reveal.tsx               fade-in-on-scroll animation
│   └── SketchDefs.tsx           SVG filters for the wobbly / torn-paper look
├── data/                        ← all your content (see "Editing your content")
└── lib/
    ├── ai.ts                    Gemini / Grok / Groq streaming + automatic fallback
    ├── knowledge.ts             chatbot rules + facts built from src/data
    └── useIsMobile.ts           lighter effects on phones
public/
├── profile.webp
└── projects/*.webp
```

---

## 🎨 Customising the look

- **Colours** — tokens at the top of `src/app/globals.css` (`--color-paper`, `--color-ink`,
  `--color-accent`, `--color-teal`, the `--color-note-*` sticky-note tints…). Use them as Tailwind
  classes like `bg-note-yellow` or `text-accent-deep`.
- **Fonts** — Poppins (headings), Nunito (body) and Caveat (handwriting), loaded in `src/app/layout.tsx`.
- **The peeking head on the photo** — `<CatPeekDoodle variant="demon" />` on the About page,
  `variant="cat"` (default) on Home.
- **Hero stickers & notes** — `src/components/Hero.tsx`.

---

## ☁️ Deploy

**Vercel (recommended):** push to GitHub → import the repo at [vercel.com/new](https://vercel.com/new) →
add your API key(s) under **Project → Settings → Environment Variables** → deploy. No other settings needed.

**Any Node host:**

```bash
npm run build
npm start              # PORT=3000 by default
```

---

## 🙏 Acknowledgements

Design inspired by the scrapbook portfolio of [Kuldeep Rajput](https://portfolio.kuldeeprajput.in/).
Built with [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com) and [Motion](https://motion.dev).

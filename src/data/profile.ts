// Everything personal lives here — edit this file to update the whole site.

export const profile = {
  nickname: "hari",
  name: "Hari Sathees",
  title: "Software Developer",
  tagline:
    "Bridging the gap between complex backend logic, pixel-perfect frontend design and security.",
  location: "India ⌁ Tamil Nadu",
  photo: "/profile.webp",
  photoCaption: "that's me! 👋",
  email: "tsharisathees@gmail.com",
  socials: {
    github: "https://github.com/harisathees",
    linkedin: "https://www.linkedin.com/in/harisathees-ts/",
  },
  introAbout:
    "Software Developer focused on shipping resilient applications from UI to database. I build high-performance web apps, real-time collaborative tools, and AI-integrated SaaS products with an obsession for clean code, speed, and great developer experience.",
  resumeSummary:
    "Software Developer with hands-on experience building and deploying web applications using Next.js, React, TypeScript, and Node.js. Skilled in responsive interfaces, API development, databases, and real-time collaboration features. Focused on clean, maintainable code and practical web products that are reliable, easy to use, and simple to improve.",
};

// Personal bits the chatbot can share when visitors ask (not shown on the pages).
export const funFacts = {
  favouriteFood: "Biriyani",
  sports: ["Football"],
  esports: ["Clash of Clans (CoC)"],
  hobbies: ["Watching movies"],
  favouriteMovie: "Interstellar",
  personality: "A bit of an overthinker",
};

export const rulebook = [
  "clean architecture over quick hacks — maintainable code saves days down the line.",
  "type safety from database to UI eliminates entire classes of runtime bugs.",
  "design is engineering — aesthetics, accessibility, and speed must coexist.",
  "ship early and securely — threat-model every feature, test with real users, patch vulnerabilities fast, and iterate relentlessly based on feedback.",
  "keep interfaces tactile and responsive — zero-latency feedback makes web apps feel alive.",
  "stay curious — mastering the modern web requires continuous learning every day.",
];

export const skillGroups = [
  { label: "Languages", items: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"] },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "shadcn/ui", "Tiptap", "Zustand", "TanStack Query", "Responsive Design"],
  },
  {
    label: "Backend & APIs",
    items: ["Node.js", "Bun", "Express.js", "Laravel", "REST APIs", "Next.js API Routes", "WebSockets"],
  },
  { label: "Databases & ORM", items: ["PostgreSQL", "MongoDB", "Supabase", "Redis", "IndexedDB"] },
  {
    label: "Tools & Services",
    items: ["Git", "GitHub", "Docker", "Jenkins", "Vercel", "Clerk", "Postman", "Linux"],
  },
];

export type SkillGroup = (typeof skillGroups)[number];

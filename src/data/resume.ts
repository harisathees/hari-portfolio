// Extra sections for /resume. Summary + skills come from profile.ts,
// projects come from projects.ts (any project with a `resume` block).

export type Certification = {
  issuer: string;
  name: string;
  year: string;
  note?: string; // optional one-line description after a colon
};

export const certifications: Certification[] = [
  {
    issuer: "Peace Soft Technologies",
    name: "Security Report",
    year: "2025",
    note: "Found and reported a software bug that allowed taking control of the company's app.",
  },
];

export type Experience = {
  role: string;
  company: string;
  dates: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    role: "Junior Developer",
    company: "Nellion Tech",
    dates: "2026",
    bullets: ["Built an AI-powered power plant management application."],
  },
];

export const education: { degree: string; dates: string; school: string; specialization?: string } = {
  degree: "B.Sc. Computer Science",
  dates: "2023 - 2026",
  school: "Kamaraj College of Arts and Science, Thoothukudi — MSU",
  // specialization: "…", // optional — shown under the school if set
};

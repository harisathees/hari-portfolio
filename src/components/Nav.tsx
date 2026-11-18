"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "@/data/profile";
import { Sticker } from "./Sticker";
import { GitHubIcon, GmailIcon, LinkedInIcon } from "./icons";

const LINKS = [
  { href: "/", label: "home", num: "01", hint: "start here & featured builds" },
  { href: "/projects", label: "projects", num: "02", hint: "full-stack apps & tools" },
  { href: "/about", label: "about", num: "03", hint: "story, tech stack & rules" },
  { href: "/resume", label: "resume", num: "04", hint: "clean 1-page printable CV" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // close the menu and jump to top on navigation
  useEffect(() => {
    setOpen(false);
    document.getElementById("page-scroll-region")?.scrollTo({ top: 0 });
  }, [pathname]);

  // Esc closes; lock body scroll while open
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      window.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="no-print sticky top-0 z-50 border-b border-ink/10 bg-paper">
      <div className="relative z-50 mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-5">
        <Link href="/" aria-label="Home" onClick={() => setOpen(false)}>
          <Sticker rotate={-2} className="font-hand text-base font-bold text-ink sm:text-lg">
            {profile.nickname || profile.name.split(" ")[0]}
            <span className="text-accent">✦</span>
          </Sticker>
        </Link>

        <nav className="hidden sm:flex items-center gap-6">
          {LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                prefetch
                aria-current={active ? "page" : undefined}
                className={`group relative py-1 font-hand text-base transition-colors sm:text-lg ${active ? "text-ink" : "text-ink-soft hover:text-ink"}`}
              >
                {link.label}
                <span
                  className={`pointer-events-none absolute -bottom-0.5 left-0 h-[5px] w-full -rotate-1 rounded-[1px] bg-accent transition-opacity duration-300 ${active ? "opacity-60" : "opacity-0 group-hover:opacity-25"}`}
                />
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          className={`group sm:hidden relative inline-flex h-[34px] items-center gap-2 rounded-full border pl-3.5 pr-1.5 transition-all duration-200 active:scale-95 ${open ? "border-accent/50 bg-[#fffdf8] shadow-[0_2px_10px_rgba(224,138,60,0.2)] rotate-1" : "border-ink/15 bg-white shadow-[0_2px_8px_rgba(58,47,47,0.12)] hover:border-ink/30 rotate-1"}`}
        >
          <span
            className={`font-hand text-[17px] font-bold leading-none select-none transition-colors duration-200 ${open ? "text-accent-deep" : "text-ink"}`}
          >
            {open ? "close" : "menu"}
          </span>
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200 ${open ? "bg-accent text-white shadow-xs" : "bg-ink/5 text-ink group-hover:bg-accent/15"}`}
            aria-hidden="true"
          >
            <span className="relative flex h-2.5 w-3 flex-col justify-between">
              <span
                className={`h-[1.5px] w-full rounded-full transition-all duration-200 origin-center ${open ? "translate-y-[4.25px] rotate-45 bg-white" : "bg-ink"}`}
              />
              <span className={`h-[1.5px] w-2 rounded-full transition-all duration-150 ${open ? "opacity-0" : "bg-accent"}`} />
              <span
                className={`h-[1.5px] w-full rounded-full transition-all duration-200 origin-center ${open ? "-translate-y-[4.25px] -rotate-45 bg-white" : "bg-ink"}`}
              />
            </span>
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-30 bg-ink/20 sm:hidden"
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute left-0 right-0 top-full z-50 w-full rounded-none border-b border-ink/15 bg-[#fffdf7] shadow-[0_16px_32px_rgba(58,47,47,0.12)] sm:hidden"
            >
              <div className="mx-auto max-w-xl px-4 pt-3 pb-4">
                <nav className="flex flex-col gap-1.5">
                  {LINKS.map((link) => {
                    const active = isActive(pathname, link.href);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        prefetch
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`group relative flex items-center justify-between rounded-xl border px-3.5 py-2.5 transition-all duration-150 ${active ? "border-accent/40 bg-amber-50/90 shadow-xs" : "border-ink/8 bg-white/70 hover:border-ink/20 hover:bg-white active:scale-[0.99]"}`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex h-7 w-7 items-center justify-center font-mono text-xs rounded-full font-bold ${active ? "bg-accent text-white" : "bg-ink/5 text-ink-soft"}`}
                          >
                            {link.num}
                          </span>
                          <div>
                            <p
                              className={`font-hand text-2xl font-bold leading-none ${active ? "text-ink" : "text-ink/80 group-hover:text-ink"}`}
                            >
                              {link.label}
                            </p>
                            <p className="mt-1 font-hand text-sm text-ink-soft/80 leading-none">{link.hint}</p>
                          </div>
                        </div>
                        {active ? (
                          <span className="font-hand text-sm font-bold text-accent-deep bg-accent/15 px-2.5 py-0.5 rounded-full">
                            here ✦
                          </span>
                        ) : (
                          <span className="font-mono text-sm text-ink/30 transition-transform group-hover:translate-x-1">→</span>
                        )}
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt-3.5 pt-3 border-t border-ink/10 flex items-center justify-between">
                  <span className="font-hand text-sm text-ink-soft flex items-center gap-1">
                    <span>📍</span>
                    <span>{profile.location}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${profile.email}`}
                      aria-label="Email me"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/10 bg-white shadow-xs transition-transform active:scale-95"
                    >
                      <GmailIcon className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href={profile.socials.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/10 bg-white text-ink shadow-xs transition-transform active:scale-95"
                    >
                      <GitHubIcon className="h-3.5 w-3.5 fill-current" />
                    </a>
                    <a
                      href={profile.socials.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/10 bg-white shadow-xs transition-transform active:scale-95"
                    >
                      <LinkedInIcon className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

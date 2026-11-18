import type { Metadata } from "next";
import { Caveat, Nunito, Poppins } from "next/font/google";
import { ChatBot } from "@/components/ChatBot";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { SketchDefs } from "@/components/SketchDefs";
import { profile } from "@/data/profile";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.title}`,
  description: profile.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${poppins.variable} ${nunito.variable} ${caveat.variable}`}
    >
      <body suppressHydrationWarning className="flex h-dvh flex-col overflow-hidden bg-paper text-ink">
        <SketchDefs />
        <Nav />
        {/* the page scrolls inside this region so the header stays put */}
        <div id="page-scroll-region" className="min-h-0 flex-1 overflow-y-auto">
          {children}
          <Footer />
        </div>
        <ChatBot />
      </body>
    </html>
  );
}

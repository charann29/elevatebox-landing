import { Lexend } from "next/font/google";

/* Lexend for the ad landing pages (owner). Wrapping a page in LEXEND points both the body
   font and the heading font (--font-display, used by h1-h3 in globals.css) at Lexend. */
const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend", display: "swap" });
export const LEXEND = `${lexend.variable} [--font-sans:var(--font-lexend)] [--font-display:var(--font-lexend)] font-sans`;

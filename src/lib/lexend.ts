import { Lexend } from "next/font/google";

/* Lexend, the site font (owner). The root layout puts --font-lexend on <html>; LEXEND is kept for the
   ad pages that wrap themselves in it, and now just restates the same font. */
export const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend", display: "swap", weight: ["300", "400", "500", "600", "700"] });
export const LEXEND = `${lexend.variable} [--font-sans:var(--font-lexend)] [--font-display:var(--font-lexend)] font-sans`;

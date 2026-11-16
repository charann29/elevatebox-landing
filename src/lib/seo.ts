// Page meta from one set of values, so title, description, canonical, Open Graph and Twitter never drift.
// Facts in the tails come only from content.ts / the company profile: 380+ apps, 175+ organisations,
// 3,000+ processes automated, ₹3,499 analysis, code in your name, bugs answered in under 6 hours.
import type { Metadata } from "next";
import { OG_IMG, type Category, type Entry } from "@/lib/content";

/** First candidate in the 140–158 character window Google shows whole; else the longest that fits. */
export const fit = (...c: string[]) =>
  c.find((s) => s.length >= 140 && s.length <= 158) ??
  c.filter((s) => s.length <= 158).sort((a, b) => b.length - a.length)[0] ??
  c[0];

/** base alone if it already fits, else base plus the first tail that lands it in the window. */
export const withTail = (base: string, tails: string[]) => fit(base, ...tails.map((t) => `${base} ${t}`));

/** title is the full <title>, brand included (the layout template is bypassed). */
export const pageMeta = (
  title: string,
  description: string,
  path: string,
  article?: { publishedTime: string },
): Metadata => ({
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: article
    ? { images: [OG_IMG], title, description, url: path, siteName: "ElevateBox", type: "article", publishedTime: article.publishedTime }
    : { images: [OG_IMG], title, description, url: path, siteName: "ElevateBox", type: "website" },
  twitter: { card: "summary_large_image", title, description, images: [OG_IMG] },
});

// Longest first; withTail takes the first that fits, so every base length lands in the window.
export const BUILD_TAILS = [
  "We have shipped 380+ apps, code, cloud and credentials stay in your name, and every project starts with a ₹3,499 requirement analysis.",
  "380+ apps shipped, code and cloud in your name, bugs answered in under 6 hours. Start with a ₹3,499 requirement analysis.",
  "380+ apps shipped, code in your name, bugs answered in under 6 hours. Start with a ₹3,499 analysis.",
  "380+ apps shipped and code in your name. Start with a ₹3,499 requirement analysis.",
  "380+ apps shipped, code and cloud in your name from day one.",
  "Code in your name, bugs answered in under 6 hours.",
  "380+ apps shipped, code in your name.",
  "Code in your name.",
];

export const AI_TAILS = [
  "We run our own AI voice agent, Roopa by ElevateBox, calling in Telugu, Hindi and English, and have automated 3,000+ processes for clients.",
  "Roopa by ElevateBox, our own AI agent, calls in Telugu, Hindi and English. 3,000+ processes automated, code in your name.",
  "Roopa by ElevateBox AI calls in Telugu, Hindi, English. 3,000+ processes automated.",
  "3,000+ processes automated, with code and models in your name.",
  "3,000+ processes automated, code in your name.",
  "3,000+ processes automated.",
];

export const BLOG_TAILS = [
  "Practical notes from ElevateBox, the Hyderabad team that has shipped 380+ apps and runs Roopa, its own AI calling agent.",
  "Written by ElevateBox, the Hyderabad team behind 380+ shipped apps and Roopa AI calling.",
  "From ElevateBox, the Hyderabad team that has shipped 380+ apps for clients.",
  "From ElevateBox, the Hyderabad team that has shipped 380+ apps.",
  "From ElevateBox, app and AI developers in Hyderabad.",
  "ElevateBox, Hyderabad, 380+ apps shipped.",
  "By ElevateBox, Hyderabad.",
];

/** Meta description for a /services, /technologies, /industries, /ai-solutions or /locations entry. */
export const entryDesc = (cat: Category, e: Entry) => {
  if (e.meta) return e.meta;
  // The H1's keyword (before any ":") so title, description and H1 share it.
  const subject = e.title.split(":")[0];
  return withTail(`${subject} in Hyderabad by ElevateBox. ${e.tagline}`, cat.key === "ai-solutions" ? AI_TAILS : BUILD_TAILS);
};

/** <title> for an entry: its H1 plus brand when that fits 30–60 characters, else a shorter keyword form. */
export const entryTitle = (cat: Category, e: Entry) =>
  [
    `${e.title} | ElevateBox`,
    ...(cat.key === "locations" ? [] : [`${e.title.split(":")[0]} in Hyderabad | ElevateBox`, `${e.title.split(":")[0]} | ElevateBox`, `${e.name} in Hyderabad | ElevateBox`]),
    `${e.name} | ElevateBox`,
  ].find((t) => t.length >= 30 && t.length <= 60) ?? `${e.title} | ElevateBox`;

export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { COMPANY } from "@/lib/content";

// AI training crawlers re-read every page and burned the Vercel Hobby ISR quota (Nov 2026).
// Search engines and AI assistants (ChatGPT search, Perplexity) stay allowed.
const AI_CRAWLERS = [
  "meta-externalagent",
  "GPTBot",
  "ClaudeBot",
  "CCBot",
  "Bytespider",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, disallow: "/" },
    ],
    sitemap: `${COMPANY.site}/sitemap.xml`,
  };
}

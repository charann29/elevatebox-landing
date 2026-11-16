import type { CmsPost } from "../../cms";
import appCost from "./mobile-app-development-cost-india.json";
import whatsappApi from "./whatsapp-business-api-india-small-business.json";
import gbp from "./google-business-profile-india-small-business.json";

// Long-form posts in Growth Studio's shape (see src/lib/cms.ts). Add a post: drop <slug>.json here,
// its images in public/assets/blog/<slug>/, and add it to the list below.
const SITE = "https://elevatebox.in";
const abs = (u: string | null) => (u && u.startsWith("/") ? SITE + u : u);
// ponytail: `images` in each JSON holds the ChatGPT prompts used for its pictures; the page ignores it.
const rich = (p: Omit<CmsPost, "imageUrl" | "ogImageUrl"> & { imageUrl: string | null; ogImageUrl: string | null }): CmsPost => ({
  ...p,
  imageUrl: abs(p.imageUrl),
  ogImageUrl: abs(p.ogImageUrl ?? p.imageUrl),
});

export const RICH_POSTS: CmsPost[] = ([appCost, whatsappApi, gbp] as Parameters<typeof rich>[0][]).map(rich);

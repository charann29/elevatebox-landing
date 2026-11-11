// Studio connect guide: version 6 · blocks guide: version 1.4
// Growth Studio (Growth Combinator's CMS) is read at BUILD time: this site is a static export, so a
// publish in Studio calls /api/revalidate (worker/index.ts), which starts the deploy workflow.
// A network error or 5xx throws and fails the build, so the last good deploy stays live (guide 9a).
const CMS = `${process.env.CMS_API_URL ?? "https://cms.gcombinator.co"}/api/v1/sites/elevatebox`;
export const BLOG_PATH = "/blogs"; // owner's choice: Studio posts join the existing /blogs

export interface CmsPostMeta {
  slug: string; locale: string; title: string; description: string;
  imageUrl: string | null; imageAlt: string | null; ogImageUrl: string | null;
  tags: string[]; readingTimeMinutes: number;
  publishedAt: string | null; updatedAt: string | null;
  heading: string | null; eyebrow: string | null;
  standfirst: string | null; faqHeading: string | null;
}
export interface CmsPost extends CmsPostMeta {
  contentHtml: string;
  toc?: { id: string; text: string; level: number }[];
  faq: { q: string; a: string }[];
  faqPlacement: "body" | "field";
  headline: string | null; breadcrumbLabel: string | null;
}
export interface CmsPageLink {
  path: string; kind: string; title: string; label: string; description: string;
  imageUrl: string | null; imageAlt: string | null;
}
export interface CmsPage extends CmsPost {
  id: string; path: string; kind: string; noindex: boolean;
  breadcrumbs: CmsPageLink[]; children?: CmsPageLink[];
}
export interface CmsPathEntry { id: string; path: string; locale: string; inFolder: boolean; noindex: boolean; lastmod: string | null }

async function cms<T>(path: string): Promise<T | null> {
  const res = await fetch(CMS + path); // a network error throws: fail the build
  if (res.status === 404) return null; // a real "not found"
  if (!res.ok) throw new Error(`Studio answered ${res.status} for ${path}`);
  return res.json() as Promise<T>;
}

// ponytail: English only (the site has one language); other locales are ignored.
const once = <T,>(f: () => Promise<T>) => { let p: Promise<T> | undefined; return () => (p ??= f()); };

export const getStudioPosts = once(async () => {
  const out: CmsPostMeta[] = [];
  for (let page = 1; ; page++) {
    const r = await cms<{ pages: number; items: CmsPostMeta[] }>(`/blog?page=${page}&limit=500`);
    if (!r) throw new Error("Studio site 'elevatebox' not found");
    out.push(...r.items);
    if (page >= r.pages) return out;
  }
});

export const getStudioPost = (slug: string) => cms<CmsPost>(`/blog/${encodeURIComponent(slug)}`);

/** Pages at any address (guide section 10): published paths outside the blog folder. */
export const getStudioPaths = once(async () => {
  const r = await cms<{ paths: CmsPathEntry[] }>("/paths?locale=en");
  if (!r) throw new Error("Studio site 'elevatebox' not found");
  return r.paths.filter((e) => !e.inFolder && e.locale === "en");
});

export const getStudioPage = (path: string) => cms<CmsPage>(`/resolve?path=${encodeURIComponent(path)}&locale=en`);

// Headless WordPress (WPGraphQL + Yoast) for /blogs. Read on demand with a 60 s cache, so a publish
// in WordPress shows up without a rebuild (/api/revalidate?secret=... makes it instant).
// Unset WORDPRESS_GRAPHQL_URL, a network error or a GraphQL error never fails the page: it logs once
// and returns nothing, and the blog keeps showing the Studio and in-repo posts.
// WORDPRESS_CATEGORY (a category slug) limits posts to one category, so another site (e.g. Roopa)
// can share the same WordPress with its own category.
import sanitizeHtml from "sanitize-html";
import type { CmsPost, CmsPostMeta } from "./cms";
import { slugify } from "@/components/inner";

const URL_ = process.env.WORDPRESS_GRAPHQL_URL;
const CATEGORY = process.env.WORDPRESS_CATEGORY || null;

let warned = false;
const warn = (msg: string) => {
  if (!warned) console.warn(`[wordpress] ${msg}; showing the other blog sources only`);
  warned = true;
};

export async function wp<T>(query: string, variables: Record<string, unknown> = {}): Promise<T | null> {
  if (!URL_) return null; // not configured: silently use the old sources
  try {
    const res = await fetch(URL_, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
    if (json.errors?.length) throw new Error(json.errors[0].message);
    return json.data ?? null;
  } catch (e) {
    warn(`request failed (${(e as Error).message})`);
    return null;
  }
}

type Img = { node: { sourceUrl: string; altText: string | null } } | null;
type WpListPost = {
  title: string; slug: string; excerpt: string | null; date: string | null; modified: string | null; content: string | null;
  featuredImage: Img;
  categories: { nodes: { name: string; slug: string }[] };
  author: { node: { name: string } } | null;
};
type WpFullPost = WpListPost & {
  seo: { title: string | null; metaDesc: string | null; opengraphImage: { sourceUrl: string } | null } | null;
};

const LIST_FIELDS = `title slug excerpt date: dateGmt modified: modifiedGmt content
  featuredImage { node { sourceUrl altText } }
  categories { nodes { name slug } }
  author { node { name } }`;

const text = (html: string | null) => sanitizeHtml(html ?? "", { allowedTags: [], allowedAttributes: {} }).replace(/\s+/g, " ").trim();
const minutes = (html: string | null) => Math.max(1, Math.round(text(html).split(" ").length / 200));
const iso = (d: string | null) => (d ? `${d.replace(/Z$/, "")}Z` : null); // *Gmt dates come without "Z"

/** The post's body, cleaned: normal article tags, images, tables, and YouTube embeds only. */
const clean = (html: string) =>
  sanitizeHtml(html, {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, "img", "figure", "figcaption", "iframe", "picture", "source"],
    allowedAttributes: {
      a: ["href", "name", "target", "rel", "title"],
      img: ["src", "srcset", "sizes", "alt", "title", "width", "height", "loading"],
      source: ["srcset", "sizes", "type", "media"],
      iframe: ["src", "width", "height", "title", "allow", "allowfullscreen", "loading"],
      th: ["colspan", "rowspan", "scope"],
      td: ["colspan", "rowspan"],
      "*": ["id", "class"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedIframeHostnames: ["www.youtube.com", "youtube.com", "www.youtube-nocookie.com"],
  });

/** Gives every h2 an id and returns the table of contents the article layout shows. */
const withToc = (html: string) => {
  const toc: CmsPost["toc"] = [];
  const out = html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/g, (m, attrs: string, inner: string) => {
    const label = text(inner);
    const id = /\bid="([^"]+)"/.exec(attrs)?.[1] ?? slugify(label);
    if (!id) return m;
    toc.push({ id, text: label, level: 2 });
    return /\bid="/.test(attrs) ? m : `<h2 id="${id}"${attrs}>${inner}</h2>`;
  });
  return { html: out, toc };
};

const inCategory = (p: WpListPost) => !CATEGORY || p.categories.nodes.some((c) => c.slug === CATEGORY);

// WordPress posts in Growth Studio's shape, so StudioArticle and the blog list render them unchanged.
const meta = (p: WpListPost): CmsPostMeta => ({
  slug: p.slug, locale: "en", title: p.title, description: text(p.excerpt),
  imageUrl: p.featuredImage?.node.sourceUrl ?? null, imageAlt: p.featuredImage?.node.altText || null,
  ogImageUrl: p.featuredImage?.node.sourceUrl ?? null,
  tags: p.categories.nodes.map((c) => c.name), readingTimeMinutes: minutes(p.content),
  publishedAt: iso(p.date), updatedAt: iso(p.modified),
  heading: p.title, eyebrow: p.categories.nodes[0]?.name ?? null, standfirst: null, faqHeading: null,
});

export async function getWpPosts(): Promise<CmsPostMeta[]> {
  const out: CmsPostMeta[] = [];
  for (let after: string | null = null; ; ) {
    const d: { posts: { nodes: WpListPost[]; pageInfo: { hasNextPage: boolean; endCursor: string } } } | null = await wp(
      `query($after: String, $cat: String) { posts(first: 100, after: $after, where: { categoryName: $cat, status: PUBLISH }) {
        nodes { ${LIST_FIELDS} } pageInfo { hasNextPage endCursor } } }`,
      { after, cat: CATEGORY },
    );
    if (!d) return out;
    out.push(...d.posts.nodes.filter(inCategory).map(meta));
    if (!d.posts.pageInfo.hasNextPage) return out;
    after = d.posts.pageInfo.endCursor;
  }
}

export const getWpSlugs = async () => (await getWpPosts()).map((p) => p.slug);

export async function getWpPost(slug: string): Promise<CmsPost | null> {
  const d = await wp<{ post: WpFullPost | null }>(
    `query($slug: ID!) { post(id: $slug, idType: SLUG) { ${LIST_FIELDS}
      seo { title metaDesc opengraphImage { sourceUrl } } } }`,
    { slug },
  );
  const p = d?.post;
  if (!p || !inCategory(p)) return null;
  const { html, toc } = withToc(clean(p.content ?? ""));
  const m = meta(p);
  return {
    ...m,
    // Yoast's SEO title and description feed <title>/meta; the page's H1 stays the post title.
    title: p.seo?.title || p.title,
    description: p.seo?.metaDesc || m.description,
    ogImageUrl: p.seo?.opengraphImage?.sourceUrl ?? m.imageUrl,
    standfirst: m.description || null,
    contentHtml: html, toc, faq: [], faqPlacement: "body",
    headline: p.title, breadcrumbLabel: p.title,
  };
}

// One-off: export the in-repo blog posts (POSTS in src/lib/content.ts + RICH_POSTS JSON) as a
// WordPress WXR file to import at cms.elevatebox.in (Tools > Import > WordPress).
//   node scripts/export-posts-to-wp.mjs        -> wp-export.xml (gitignored)
// Slugs are kept exactly, so /blogs/<slug> URLs don't change. On a slug clash the rich post wins.
// Needs Node 22.18+ (loads content.ts with built-in type stripping).
import fs from "node:fs";
import path from "node:path";
import { registerHooks } from "node:module";

const ROOT = path.resolve(import.meta.dirname, "..");
const SITE = "https://elevatebox.in";

// content.ts uses extensionless imports and JSON without `with { type: "json" }` (bundler style).
registerHooks({
  resolve(spec, context, next) {
    try { return next(spec, context); } catch (e) { if (spec.startsWith(".")) return next(`${spec}.ts`, context); throw e; }
  },
  load(url, context, next) {
    if (url.endsWith(".json")) return { format: "module", source: `export default ${fs.readFileSync(new URL(url), "utf8")};`, shortCircuit: true };
    return next(url, context);
  },
});
const { POSTS } = await import(path.join(ROOT, "src/lib/content.ts"));

const RICH_DIR = path.join(ROOT, "src/lib/posts/rich");
const rich = fs.readdirSync(RICH_DIR).filter((f) => f.endsWith(".json")).map((f) => JSON.parse(fs.readFileSync(path.join(RICH_DIR, f), "utf8")));

const abs = (html) => html.replace(/(src|href|srcset)="\/(?!\/)/g, `$1="${SITE}/`);
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const cdata = (s) => `<![CDATA[${String(s ?? "").replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
const exists = (url) => url && fs.existsSync(path.join(ROOT, "public", url));
const wpDate = (iso) => new Date(iso || Date.now()).toISOString().slice(0, 19).replace("T", " ");

const posts = new Map();
for (const p of POSTS) {
  const brand = `/assets/pages/blog-${p.slug}.webp`;
  posts.set(p.slug, {
    slug: p.slug, title: p.title, date: p.date, excerpt: p.excerpt, category: p.category,
    html: p.sections.map((s) => `<h2>${esc(s.h)}</h2>\n${s.p.map((x) => `<p>${esc(x)}</p>`).join("\n")}`).join("\n\n"),
    image: exists(brand) ? brand : null,
  });
}
for (const p of rich) {
  const brand = `/assets/pages/blog-${p.slug}.webp`;
  posts.set(p.slug, {
    slug: p.slug, title: p.heading ?? p.title, date: p.publishedAt, excerpt: p.description, category: p.eyebrow ?? p.tags?.[0] ?? null,
    // Same rule as src/lib/posts/rich: figures whose image isn't generated yet are left out.
    html: p.contentHtml.replace(/<figure><img src="(\/assets\/blog\/[^"]+)"[\s\S]*?<\/figure>/g, (fig, src) => (exists(src) ? fig : "")),
    image: exists(p.imageUrl) ? p.imageUrl : exists(brand) ? brand : null,
  });
}

let id = 1;
const items = [...posts.values()].map((p) => {
  const postId = id++;
  const thumb = p.image ? id++ : null;
  const date = wpDate(p.date);
  const post = `<item>
  <title>${esc(p.title)}</title>
  <link>${SITE}/blogs/${p.slug}</link>
  <dc:creator>${cdata("admin")}</dc:creator>
  <content:encoded>${cdata(abs(p.html))}</content:encoded>
  <excerpt:encoded>${cdata(p.excerpt)}</excerpt:encoded>
  <wp:post_id>${postId}</wp:post_id>
  <wp:post_date>${date}</wp:post_date>
  <wp:post_date_gmt>${date}</wp:post_date_gmt>
  <wp:post_name>${cdata(p.slug)}</wp:post_name>
  <wp:status>publish</wp:status>
  <wp:post_type>post</wp:post_type>
  ${p.category ? `<category domain="category" nicename="${esc(p.category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""))}">${cdata(p.category)}</category>` : ""}
  ${thumb ? `<wp:postmeta><wp:meta_key>_thumbnail_id</wp:meta_key><wp:meta_value>${thumb}</wp:meta_value></wp:postmeta>` : ""}
</item>`;
  const attachment = thumb
    ? `<item>
  <title>${esc(p.title)}</title>
  <wp:post_id>${thumb}</wp:post_id>
  <wp:post_date>${date}</wp:post_date>
  <wp:post_name>${cdata(`${p.slug}-cover`)}</wp:post_name>
  <wp:post_parent>${postId}</wp:post_parent>
  <wp:status>inherit</wp:status>
  <wp:post_type>attachment</wp:post_type>
  <wp:attachment_url>${SITE}${p.image}</wp:attachment_url>
</item>`
    : "";
  return post + attachment;
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:wp="http://wordpress.org/export/1.2/">
<channel>
  <title>ElevateBox</title>
  <link>${SITE}</link>
  <wp:wxr_version>1.2</wp:wxr_version>
  <wp:base_site_url>${SITE}</wp:base_site_url>
  <wp:base_blog_url>${SITE}</wp:base_blog_url>
${items.join("\n")}
</channel>
</rss>
`;
fs.writeFileSync(path.join(ROOT, "wp-export.xml"), xml);
console.log(`wp-export.xml: ${posts.size} posts, ${items.length ? id - 1 - posts.size : 0} cover images`);

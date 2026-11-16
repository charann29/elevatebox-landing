// On-page SEO audit over the built HTML. Run after `next build`: node scripts/seo-audit.mjs
// Key pages: home, Hyderabad/Telangana pages, /global, /services, /ai-solutions, voice pages.
// Focus keyword = the h1 (KEYWORDS below where it is not). It must appear in <title>,
// meta description and the single <h1>. Also checks canonical, OG, JSON-LD, sitemap, unique
// title/description, FAQPage JSON-LD == visible FAQ text, and pillar <-> cluster links in <main>.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = ".next/server/app";
// Explicit focus keywords where the h1 is not the keyword; every other page uses its h1 (before any ":").
const KEYWORDS = {
  "/": "Mobile App & AI Development Company",
  "/services": "Services",
  "/ai-solutions": "AI Solutions",
  "/ai-voice-calling-agent-hyderabad": "AI Voice Calling Agent",
  "/best-ai-developers-in-hyderabad": "Best AI Developers in Hyderabad",
};
const KEY = /^(?!\/(blogs|proposals|careers)\/)(\/$|.*(hyderabad|telangana)|\/global|\/services|\/ai-solutions)/;

// pillar -> clusters (each cluster must link up, the pillar must link down)
const APP_GLOBAL = ["dubai", "saudi-arabia", "qatar", "usa", "uk", "germany", "netherlands"];
const PILLARS = {
  "/services/mobile-app-development": [
    "/mobile-app-development-company-hyderabad", "/hire-mobile-app-developers-hyderabad",
    "/android-app-development-company-hyderabad", "/ios-app-development-company-hyderabad",
    "/flutter-app-development-company-hyderabad", "/mvp-development-company-hyderabad",
    "/app-development-company-telangana", ...APP_GLOBAL.map((c) => `/global/app-development-company-${c}`),
  ],
  "/services/web-development": ["/web-development-company-hyderabad"],
  "/services": ["/software-development-company-hyderabad"],
  "/ai-solutions": ["/ai-development-company-hyderabad", "/best-ai-developers-in-hyderabad", "/ai-voice-calling-agent-hyderabad", ...APP_GLOBAL.map((c) => `/global/ai-development-company-${c}`)],
  "/ai-voice-calling-agent-hyderabad": APP_GLOBAL.map((c) => `/global/ai-voice-agent-company-${c}`),
};

const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const dec = (s) => s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim();
const norm = (s) => ` ${s.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").trim()} `;
const has = (hay, kw) => norm(hay).includes(norm(kw));
const meta = (h, attr, name) => dec(h.match(new RegExp(`<meta ${attr}="${name}" content="([^"]*)"`))?.[1] ?? "");

const pages = walk(ROOT)
  .filter((f) => f.endsWith(".html") && !/_not-found|_global-error|studio-check/.test(f))
  .map((f) => {
    const p = f.slice(ROOT.length).replace(/\.html$/, "").replace(/^\/index$/, "/");
    return { path: p, html: readFileSync(f, "utf8") };
  });
const sitemap = readFileSync(join(ROOT, "sitemap.xml.body"), "utf8");
const inSitemap = (p) => sitemap.includes(`<loc>https://elevatebox.in${p === "/" ? "" : p}</loc>`);

const titles = {}, descs = {};
for (const pg of pages) {
  const h = pg.html;
  pg.title = dec(h.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "");
  pg.desc = meta(h, "name", "description");
  (titles[pg.title] ??= []).push(pg.path);
  (descs[pg.desc] ??= []).push(pg.path);
}

const rows = [];
for (const pg of pages.filter((p) => KEY.test(p.path))) {
  const h = pg.html, issues = [];
  const h1s = [...h.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => dec(m[1]));
  const lds = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  const nodes = lds.flatMap((j) => j["@graph"] ?? [j]);
  const kw = KEYWORDS[pg.path] ?? h1s[0]?.split(":")[0];
  if (!kw) issues.push("no focus keyword");
  if (h1s.length !== 1) issues.push(`${h1s.length} h1`);
  if (kw && !has(pg.title, kw)) issues.push("kw not in title");
  if (kw && !has(pg.desc, kw)) issues.push("kw not in description");
  if (kw && h1s[0] && !has(h1s[0], kw)) issues.push("kw not in h1");
  if (!/<link rel="canonical"/.test(h)) issues.push("no canonical");
  if (!meta(h, "property", "og:title") || !meta(h, "property", "og:description")) issues.push("no OG");
  if (!nodes.length) issues.push("no JSON-LD");
  if (!inSitemap(pg.path)) issues.push("not in sitemap");
  if (titles[pg.title].length > 1) issues.push(`duplicate title (${titles[pg.title].join(", ")})`);
  if (descs[pg.desc].length > 1) issues.push("duplicate description");
  // FAQPage must equal the visible <details><summary> text
  const faq = nodes.find((n) => n["@type"] === "FAQPage");
  const visible = [...h.matchAll(/<details[^>]*>([\s\S]*?)<\/details>/g)]
    .map((m) => m[1].match(/<summary[^>]*>([\s\S]*?)<\/summary>\s*<p[^>]*>([\s\S]*?)<\/p>/))
    .filter(Boolean)
    .map((m) => [dec(m[1]), dec(m[2])]);
  if (!faq) { if (pg.path !== "/global") issues.push("no FAQPage"); } // ponytail: /global is a hub with no Q&A
  else {
    const ldQa = faq.mainEntity.map((q) => [q.name, q.acceptedAnswer.text]);
    const miss = ldQa.filter(([q, a]) => !visible.some(([vq, va]) => vq === q && va === a));
    if (miss.length) issues.push(`${miss.length} FAQ JSON-LD not visible`);
  }
  // pillar/cluster links, contextual only (<main>, not header/footer)
  const main = h.match(/<main[\s\S]*<\/main>/)?.[0] ?? "";
  const links = (p) => main.includes(`href="${p}"`) || main.includes(`href="https://elevatebox.in${p}"`);
  for (const [pillar, clusters] of Object.entries(PILLARS)) {
    if (clusters.includes(pg.path) && !links(pillar)) issues.push(`no link up to ${pillar}`);
    if (pg.path === pillar) {
      const down = clusters.filter((c) => !links(c));
      if (down.length) issues.push(`no link down to ${down.length} clusters`);
    }
  }
  rows.push({ path: pg.path, kw, issues });
}

const bad = rows.filter((r) => r.issues.length);
for (const r of bad) console.log(`${r.path}  [${r.kw}]\n    - ${r.issues.join("\n    - ")}`);
const count = {};
for (const r of bad) for (const i of r.issues) { const k = i.replace(/\(.*\)|\d+ /g, "").trim(); count[k] = (count[k] ?? 0) + 1; }
console.log(`\n${rows.length} key pages, ${rows.length - bad.length} pass, ${bad.length} with issues`);
for (const [k, v] of Object.entries(count).sort((a, b) => b[1] - a[1])) console.log(`  ${v}\t${k}`);
const missing = Object.keys(PILLARS).filter((p) => !pages.some((pg) => pg.path === p));
if (missing.length) console.log(`  missing pillar pages: ${missing.join(", ")}`);

import Script from "next/script";
import Link from "next/link";
import type { Metadata } from "next";
import { COMPANY, OG_IMG } from "@/lib/content";
import type { CmsPage, CmsPost } from "@/lib/cms";
import { Header, Footer } from "@/components/site";
import { AuthorBox, BlogCover, Byline, COL, FaqCards, PriceCta, RichHero, Toc } from "@/components/inner";
import { StudioBody } from "@/components/studio-body";
import { JsonLd, ORG, breadcrumb, faqPage, ld } from "@/lib/schema";
import "@/app/studio-blocks.css";

type Crumb = { name: string; path: string };

/** Metadata for a Studio post or page at `path`. */
export function studioMetadata(p: CmsPost | CmsPage, path: string): Metadata {
  const image = p.ogImageUrl ?? p.imageUrl ?? OG_IMG;
  const page = "id" in p ? p : null;
  return {
    title: p.title.length > 47 ? { absolute: p.title } : p.title,
    description: p.description,
    alternates: { canonical: path },
    openGraph: { images: [image], title: p.title, description: p.description, type: "article", publishedTime: p.publishedAt ?? undefined },
    robots: page?.noindex ? { index: false, follow: false } : undefined,
    other: page ? { "studio-page": page.id } : undefined,
  };
}

const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

/** A Studio post or page in the site's article layout (blocks guide sections 2, 4, 5). */
export function StudioArticle({ p, path, crumbs }: { p: CmsPost | CmsPage; path: string; crumbs: Crumb[] }) {
  const h1 = p.heading ?? p.title;
  const toc = p.toc ?? [];
  const children = "children" in p && p.kind === "hub" ? (p.children ?? []) : [];
  return (
    <>
      <Header />
      <main className="flex-1">
        <JsonLd
          json={ld(
            ORG,
            {
              "@type": "BlogPosting",
              headline: p.headline ?? p.title,
              description: p.description,
              image: p.imageUrl ?? undefined,
              datePublished: p.publishedAt ?? undefined,
              dateModified: p.updatedAt ?? undefined,
              mainEntityOfPage: `${COMPANY.site}${path}`,
              author: { "@id": ORG["@id"] },
              publisher: { "@id": ORG["@id"] },
            },
            breadcrumb(crumbs),
            ...(p.faq.length ? [faqPage(p.faq)] : []),
          )}
        />
        <RichHero
          eyebrow={p.eyebrow ?? undefined}
          title={h1}
          lead={p.standfirst ?? p.description}
          crumbs={crumbs.map((c, i) => (i < crumbs.length - 1 ? { label: c.name, href: c.path } : { label: c.name }))}
          actions={false}
          meta={
            p.publishedAt ? (
              <Byline>
                {fmt(p.publishedAt)} · {p.readingTimeMinutes} min read
              </Byline>
            ) : undefined
          }
          visual={
            <div className="overflow-hidden rounded-[28px] ring-1 ring-white/15">
              <BlogCover slug={path} title={h1} category={p.eyebrow ?? p.tags[0] ?? "Article"} src={p.imageUrl} alt={p.imageAlt ?? p.title} />
            </div>
          }
        />
        <div className={`${COL} grid gap-8 py-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16 lg:py-20`}>
          <Toc items={toc} />
          <article className="min-w-0 max-w-[70ch] text-[18px] leading-[1.75]">
            <StudioBody html={p.contentHtml} />
            {p.faqPlacement === "field" && p.faq.length > 0 && (
              <section className="mt-12">
                <h2 className="text-[26px] font-semibold">{p.faqHeading ?? "Frequently asked questions"}</h2>
                <div className="mt-5">
                  <FaqCards items={p.faq} />
                </div>
              </section>
            )}
            {children.length > 0 && (
              <ul className="mt-12 grid gap-4 sm:grid-cols-2">
                {children.map((c) => (
                  <li key={c.path}>
                    <Link href={c.path} className="block h-full rounded-3xl border border-line bg-white p-6 transition-colors hover:border-navy/30">
                      <span className="font-semibold text-ink">{c.label}</span>
                      <span className="mt-2 block text-[15px] leading-relaxed text-ink-3">{c.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {!("id" in p) && <AuthorBox />}
          </article>
        </div>
        <PriceCta />
      </main>
      <Footer />
      <Script src="/studio-blocks.js" strategy="afterInteractive" />
    </>
  );
}

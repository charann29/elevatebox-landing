import Script from "next/script";
import Link from "next/link";
import type { Metadata } from "next";
import { COMPANY, OG_IMG } from "@/lib/content";
import type { CmsPage, CmsPost } from "@/lib/cms";
import { Header, Footer } from "@/components/site";
import { CtaBand, PageHero, Section } from "@/components/blocks";
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
        <PageHero
          eyebrow={p.eyebrow ?? undefined}
          title={h1}
          lead={p.standfirst ?? p.description}
          crumbs={crumbs.map((c, i) => (i < crumbs.length - 1 ? { label: c.name, href: c.path } : { label: c.name }))}
        />
        <Section>
          <article className="max-w-3xl">
            {p.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element -- Cloudinary already sizes it
              <img src={p.imageUrl} alt={p.imageAlt ?? p.title} className="mb-8 h-auto w-full rounded-2xl shadow-lg" />
            )}
            {p.publishedAt && (
              <p className="text-xs text-ink-muted">
                {fmt(p.publishedAt)} · {p.readingTimeMinutes} min read
              </p>
            )}
            {toc.length >= 2 && (
              <nav className="studio-toc mt-6" aria-label="In this article">
                <details open>
                  <summary>In this article</summary>
                  <ol>
                    {toc.map((t) => (
                      <li key={t.id} data-level={t.level}>
                        <a href={`#${t.id}`}>{t.text}</a>
                      </li>
                    ))}
                  </ol>
                </details>
              </nav>
            )}
            <div className="mt-8">
              <StudioBody html={p.contentHtml} />
            </div>
            {p.faqPlacement === "field" && p.faq.length > 0 && (
              <section className="mt-10">
                <h2 className="text-2xl font-bold text-brand">{p.faqHeading ?? "Frequently asked questions"}</h2>
                <dl className="mt-4 space-y-5">
                  {p.faq.map((f) => (
                    <div key={f.q}>
                      <dt className="font-semibold text-brand">{f.q}</dt>
                      <dd className="mt-1 leading-relaxed text-ink-muted">{f.a}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}
            {children.length > 0 && (
              <ul className="mt-10 grid gap-5 sm:grid-cols-2">
                {children.map((c) => (
                  <li key={c.path}>
                    <Link href={c.path} className="block h-full rounded-2xl border border-black/5 bg-white p-6 shadow-sm hover:-translate-y-1">
                      <span className="font-semibold text-brand">{c.label}</span>
                      <span className="mt-2 block text-sm leading-relaxed text-ink-muted">{c.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </article>
        </Section>
        <CtaBand />
      </main>
      <Footer />
      <Script src="/studio-blocks.js" strategy="afterInteractive" />
    </>
  );
}

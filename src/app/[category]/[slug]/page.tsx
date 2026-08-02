import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CATEGORIES,
  COMPANY,
  PROCESS_STEPS,
  TESTIMONIALS,
  getCategory,
  getEntry,
} from "@/lib/content";
import { Header, Footer } from "@/components/site";
import {
  BulletGrid,
  CtaBand,
  Faq,
  PageHero,
  QuoteForm,
  Section,
} from "@/components/blocks";

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.flatMap((c) =>
    c.items.map((i) => ({ category: c.key, slug: i.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const entry = getEntry(category, slug);
  const cat = getCategory(category);
  if (!entry || !cat) return {};
  return {
    title: `${entry.title} | ${COMPANY.name}`,
    description: entry.tagline,
    alternates: { canonical: `${cat.base}/${entry.slug}` },
    openGraph: { title: entry.title, description: entry.tagline },
  };
}

export default async function EntryPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const cat = getCategory(category);
  const entry = getEntry(category, slug);
  if (!cat || !entry) notFound();

  const siblings = cat.items.filter((i) => i.slug !== entry.slug).slice(0, 8);
  const quotes = TESTIMONIALS.slice(0, 3);

  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow={cat.label}
          title={entry.title}
          lead={entry.tagline}
          crumbs={[{ label: cat.label, href: cat.base }, { label: entry.name }]}
        />

        <Section>
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <p className="text-lg leading-relaxed text-ink-muted">
                {entry.intro}
              </p>
              <h2 className="mt-10 text-2xl font-bold text-brand">
                What the engagement includes
              </h2>
              <ul className="mt-5 space-y-4">
                {entry.bullets.map((b) => (
                  <li key={b.t} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <span>
                      <strong className="font-semibold text-brand">{b.t}</strong>
                      <span className="text-ink-muted"> — {b.d}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-black/5 bg-[#F8FAFC] p-6">
                <h2 className="font-semibold text-brand">
                  Other {cat.label.toLowerCase()}
                </h2>
                <ul className="mt-4 space-y-1">
                  {siblings.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`${cat.base}/${s.slug}`}
                        className="block rounded-lg px-2 py-1.5 text-sm text-ink-muted transition-colors hover:bg-white hover:text-brand"
                      >
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={cat.base}
                  className="mt-3 block border-t border-black/10 px-2 pt-3 text-sm font-semibold text-brand"
                >
                  View all →
                </Link>
              </div>
            </aside>
          </div>
        </Section>

        <Section
          tinted
          eyebrow="Capabilities"
          title="How we approach this work"
          lead={`Every ${entry.name.toLowerCase()} engagement runs on the same delivery model — the specifics below change, the discipline does not.`}
        >
          <BulletGrid items={entry.bullets} />
        </Section>

        <Section eyebrow="Process" title="How a project runs">
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROCESS_STEPS.map((s) => (
              <li
                key={s.n}
                className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
              >
                <span className="text-sm font-bold text-accent">{s.n}</span>
                <h3 className="mt-2 font-semibold text-brand">{s.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                  {s.d}
                </p>
              </li>
            ))}
          </ol>
        </Section>

        <Section tinted eyebrow="Client feedback" title="What clients say">
          <div className="grid gap-5 lg:grid-cols-3">
            {quotes.map((t) => (
              <figure
                key={t.name + t.role}
                className="flex flex-col rounded-2xl bg-white p-7 shadow-sm"
              >
                <div className="flex gap-0.5 text-accent" aria-label="5 out of 5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} aria-hidden="true">
                      ★
                    </span>
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 border-t border-black/5 pt-4">
                  <p className="text-sm font-semibold text-brand">{t.name}</p>
                  <p className="text-xs text-ink-muted">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>

        <Section eyebrow="FAQ" title={`${entry.name} questions`}>
          <div className="grid gap-12 lg:grid-cols-2">
            <Faq />
            <QuoteForm />
          </div>
        </Section>

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}

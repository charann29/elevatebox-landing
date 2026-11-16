import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CATEGORIES,
  TESTIMONIALS,
  getCategory,
  getEntry } from "@/lib/content";
import { entryDesc, entryTitle, pageMeta } from "@/lib/seo";
import { Header, Footer } from "@/components/site";
import { JsonLd, ORG, breadcrumb, faqPage, ld, service } from "@/lib/schema";
import { FAQS } from "@/lib/content";
import { QuoteForm, Section } from "@/components/blocks";
import {
  COL,
  EntryCards,
  FaqCards,
  FeatureGrid,
  Head,
  HeroVisual,
  Icon,
  PriceCta,
  ProcessTimeline,
  RichHero,
  SidePanel,
  TrustStrip,
  WorkRow,
  pageImage,
} from "@/components/inner";

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
  return pageMeta(entryTitle(cat, entry), entryDesc(cat, entry), `${cat.base}/${entry.slug}`);
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
        <JsonLd
          json={ld(
            ORG,
            service(entry.title, entryDesc(cat, entry), `${cat.base}/${entry.slug}`, entry.name),
            breadcrumb([
              { name: cat.label, path: cat.base },
              { name: entry.name, path: `${cat.base}/${entry.slug}` },
            ]),
            faqPage(FAQS),
          )}
        />
        <RichHero
          eyebrow={cat.label}
          title={entry.title}
          lead={entry.tagline}
          crumbs={[{ label: cat.label, href: cat.base }, { label: entry.name }]}
          visual={<HeroVisual img={pageImage(`${category}-${entry.slug}`)} seed={`${category} ${entry.slug} ${entry.name}`} chip={entry.name} priority />}
        />

        <TrustStrip />

        <section className="bg-white">
          <div className={`${COL} grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24`}>
            <div>
              <p className="text-xl leading-relaxed text-ink-2 lg:text-[22px]">{entry.intro}</p>
              <h2 className="mt-10 text-2xl font-semibold lg:text-[28px]">What the engagement includes</h2>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {entry.bullets.map((b) => (
                  <li key={b.t} className="flex items-start gap-3 rounded-2xl border border-line bg-white px-4 py-3 text-[15px] font-medium leading-snug text-ink">
                    <span className="mt-px grid size-5 shrink-0 place-items-center rounded-full bg-navy text-white">
                      <Icon name="check" className="size-3" />
                    </span>
                    {b.t}
                  </li>
                ))}
              </ul>
            </div>
            <SidePanel seed={`${category} ${entry.slug}`} chips={entry.bullets.map((b) => b.t)} img={pageImage(`${category}-${entry.slug}-detail`)} />
          </div>
        </section>

        <section className="bg-canvas">
          <div className={`${COL} py-16 lg:py-24`}>
            <Head
              eyebrow="Capabilities"
              title="How we approach this work"
              lead={`Every ${entry.name.toLowerCase()} engagement runs on the same delivery model — the specifics below change, the discipline does not.`}
            />
            <div className="mt-10 lg:mt-12">
              <FeatureGrid items={entry.bullets} />
            </div>
          </div>
        </section>

        <WorkRow />

        <section className="hero-3d bg-deep">
          <div className={`${COL} py-16 lg:py-24`}>
            <p className="text-sm font-semibold text-electric-2">Process</p>
            <h2 className="mt-3 text-[30px] font-semibold leading-[1.1] text-white lg:text-[44px]">How a project runs</h2>
            <div className="mt-10 lg:mt-12">
              <ProcessTimeline />
            </div>
          </div>
        </section>

        {quotes.length > 0 && (
        <Section tinted eyebrow="Client feedback" title="What clients say">
          <div className="grid gap-5 lg:grid-cols-3">
            {quotes.map((t) => (
              <figure
                key={t.name + t.role}
                className="flex flex-col rounded-3xl border border-line bg-white p-7"
              >
                <blockquote className="flex-1 text-sm leading-relaxed text-ink-2">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 border-t border-line pt-4">
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-ink-3">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>
        )}

        <section className="bg-white">
          <div className={`${COL} py-16 lg:py-24`}>
            <Head eyebrow="FAQ" title={`${entry.name} questions`} />
            <div className="mt-10 grid items-start gap-10 lg:mt-12 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
              <FaqCards items={FAQS} />
              <div className="rounded-3xl border border-line bg-canvas p-5 sm:p-7 lg:sticky lg:top-28">
                <QuoteForm />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-canvas">
          <div className={`${COL} py-16 lg:py-24`}>
            <Head
              title={`Other ${cat.label.toLowerCase()}`}
              action={
                <Link href={cat.base} className="shrink-0 text-sm font-semibold text-navy underline-offset-4 hover:underline">
                  View all →
                </Link>
              }
            />
            <div className="mt-10">
              <EntryCards category={category} base={cat.base} items={siblings} all={cat.items} four />
            </div>
          </div>
        </section>

        <PriceCta />
      </main>
      <Footer />
    </>
  );
}

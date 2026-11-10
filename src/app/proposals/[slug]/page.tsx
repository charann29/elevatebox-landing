import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COMPANY, OG_IMG, VOICE_APP } from "@/lib/content";
import { PROPOSALS, getProposal } from "@/lib/proposals";
import { Header, Footer } from "@/components/site";
import { CtaBand, PageHero, Section } from "@/components/blocks";
import { JsonLd, ORG, breadcrumb, ld } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROPOSALS.map((p) => ({ slug: p.slug }));
}

const title = (p: { name: string; city: string }) =>
  `${p.name}, ${p.city}: AI Calling and Automation Ideas`;
const desc = (p: { name: string; city: string; industry: string }) =>
  `An open proposal for ${p.name} in ${p.city}: how AI voice calling and automation could save staff time and win more ${p.industry.toLowerCase()} enquiries.`.slice(0, 160);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProposal(slug);
  if (!p) return {};
  const t = title(p);
  return {
    title: t.length > 47 ? { absolute: t } : t,
    description: desc(p),
    alternates: { canonical: `/proposals/${p.slug}` },
    openGraph: { images: [OG_IMG], title: t, description: desc(p), type: "article", publishedTime: p.date },
  };
}

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

const List = ({ items }: { items: string[] }) => (
  <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed text-ink-muted">
    {items.map((i) => (
      <li key={i}>{i}</li>
    ))}
  </ul>
);

export default async function ProposalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProposal(slug);
  if (!p) notFound();
  const t = title(p);
  const host = p.site.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const siblings = PROPOSALS.filter((o) => o.slug !== p.slug && o.industry === p.industry)
    .sort((a, b) => Number(b.city === p.city) - Number(a.city === p.city))
    .slice(0, 5);

  return (
    <>
      <Header />
      <main className="flex-1">
        <JsonLd
          json={ld(
            ORG,
            {
              "@type": "Article",
              headline: t,
              description: desc(p),
              datePublished: p.date,
              dateModified: p.checked > p.date ? p.checked : p.date,
              mainEntityOfPage: `${COMPANY.site}/proposals/${p.slug}`,
              author: { "@id": ORG["@id"] },
              publisher: { "@id": ORG["@id"] },
              about: { "@type": "Organization", name: p.name, url: p.site, address: { "@type": "PostalAddress", addressLocality: p.city, addressRegion: "Telangana", addressCountry: "IN" } },
            },
            breadcrumb([{ name: "Proposals", path: "/proposals" }, { name: p.name, path: `/proposals/${p.slug}` }]),
          )}
        />
        <PageHero
          eyebrow={`${p.industry} · ${p.city}`}
          title={t}
          lead={`What ${p.name} could automate with AI phone calls and better software, based on a public check of its website.`}
          crumbs={[{ label: "Proposals", href: "/proposals" }, { label: p.name }]}
        />

        <Section>
          <article className="max-w-3xl">
            <p className="text-xs text-ink-muted">Published {fmt(p.date)} · website checked {fmt(p.checked)}</p>

            <div className="mt-6 rounded-2xl border border-black/10 bg-[#FFF6E9] p-5 text-sm leading-relaxed text-ink-muted">
              {p.name} is not an ElevateBox client, and this is not an endorsement by them. It is an
              independent proposal written from a public check of{" "}
              <a href={p.site} rel="nofollow noopener" className="underline">{host}</a> on {fmt(p.checked)}.
              If you run {p.name} and something here is wrong or out of date, email{" "}
              <a href={`mailto:${COMPANY.email}?subject=${encodeURIComponent(`Proposal page: ${p.name}`)}`} className="underline">{COMPANY.email}</a>{" "}
              and we will correct or remove it.
            </div>

            <section className="mt-10">
              <h2 className="text-2xl font-bold text-brand">What we checked on the website</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {p.facts.map((f) => (
                  <li key={f.label} className="flex items-start gap-2 text-sm text-ink-muted">
                    <span aria-hidden="true" className={f.ok ? "text-green-700" : "text-amber-700"}>{f.ok ? "✓" : "✗"}</span>
                    <span>{f.label}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold text-brand">1. AI voice calling for {p.name}</h2>
              <p className="mt-4 leading-relaxed text-ink-muted">
                An AI phone agent answers and makes calls in Telugu, Hindi or English, writes down what was said,
                and books the next step. For a {p.industry.toLowerCase()} business in {p.city}, the calls worth handing over first:
              </p>
              <List items={p.voice} />
              <p className="mt-4 text-sm text-ink-muted">
                See how it works: <a href={VOICE_APP} className="underline">Voice by ElevateBox</a>.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold text-brand">2. Automating the stack and growing the business</h2>
              <List items={p.stack} />
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold text-brand">Where we would start</h2>
              <ol className="mt-4 list-decimal space-y-3 pl-5 leading-relaxed text-ink-muted">
                {p.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </section>

            <div className="mt-12 rounded-2xl bg-[#E3ECFF] p-7">
              <h2 className="text-lg font-semibold text-brand">Run {p.name}, or a business like it?</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                We are a Hyderabad AI and app studio. A 30-minute call is enough to tell you which of these is worth doing first.
              </p>
              <Link href="/contact" className="mt-5 inline-block rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white">
                Talk to us
              </Link>
            </div>

            {siblings.length > 0 && (
              <section className="mt-12">
                <h2 className="text-lg font-semibold text-brand">More {p.industry.toLowerCase()} proposals</h2>
                <ul className="mt-3 space-y-2 text-sm">
                  {siblings.map((o) => (
                    <li key={o.slug}>
                      <Link href={`/proposals/${o.slug}`} className="text-ink-muted underline hover:text-brand">
                        {o.name}, {o.city}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>
        </Section>
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}

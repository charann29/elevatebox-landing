import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COMPANY, OG_IMG } from "@/lib/content";
import { PROPOSALS, citySlug, getProposal, industrySlug } from "@/lib/proposals";
import { cityTier, plan } from "@/lib/growth";
import { GrowthPlan, range } from "@/components/growth-plan";
import { Header, Footer } from "@/components/site";
import { CtaBand, PageHero, Section } from "@/components/blocks";
import { JsonLd, ORG, breadcrumb, ld } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROPOSALS.map((p) => ({ slug: p.slug }));
}

const title = (p: { name: string; city: string }) => `Growth Plan for ${p.name}, ${p.city}`;
const desc = (p: { name: string; city: string }) =>
  `A 12-month growth plan for ${p.name} in ${p.city}: tech, automation, strategy and Meta ads, with the funnel and Month 6 and Month 12 numbers.`.slice(0, 160);

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
    robots: { index: false, follow: true },
    openGraph: { images: [OG_IMG], title: t, description: desc(p), type: "article", publishedTime: p.date },
  };
}

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

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
  const g = plan(p.industry, p.city);
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
            breadcrumb([{ name: "Growth plans", path: "/proposals" }, { name: p.name, path: `/proposals/${p.slug}` }]),
          )}
        />
        <PageHero
          eyebrow={`Growth plan · ${p.industry} · ${p.city}`}
          title={t}
          lead={`How ${p.name} could add ${range(g.lo[5].revenue, g.hi[5].revenue)} a month by Month 6 and ${range(g.lo[11].revenue, g.hi[11].revenue)} by Month 12, with tech, automation, strategy and Meta ads run as one plan.`}
          crumbs={[{ label: "Growth plans", href: "/proposals" }, { label: p.name }]}
        />

        <Section>
          <article className="max-w-4xl">
            <p className="text-xs text-ink-muted">
              Written {fmt(p.date)} · website checked {fmt(p.checked)} · see the{" "}
              <Link href={`/proposals/industry/${industrySlug(p.industry)}`} className="underline">{p.industry.toLowerCase()} plan</Link> and the{" "}
              <Link href={`/proposals/city/${citySlug(p.city)}`} className="underline">{p.city} plan</Link>
            </p>

            <div className="mt-6 rounded-2xl border border-black/10 bg-[#FFF6E9] p-5 text-sm leading-relaxed text-ink-muted">
              {p.name} is not an ElevateBox client, and this is not an endorsement by them. The website notes come from a
              public check of <a href={p.site} rel="nofollow noopener" className="underline">{host}</a> on {fmt(p.checked)}.
              The money figures are a model for a typical {p.industry.toLowerCase()} business in {cityTier(p.city)}, built
              from the assumptions printed below, not from {p.name}&apos;s own numbers. If you run {p.name}, email{" "}
              <a href={`mailto:${COMPANY.email}?subject=${encodeURIComponent(`Growth plan: ${p.name}`)}`} className="underline">{COMPANY.email}</a>{" "}
              with your real numbers and we will redo it, or remove the page.
            </div>

            <GrowthPlan s={{ name: p.name, industry: p.industry, city: p.city, host, facts: p.facts, voice: p.voice, stack: p.stack }} g={g} />

            <div className="mt-12 rounded-2xl bg-[#E3ECFF] p-7">
              <h2 className="text-lg font-semibold text-brand">Run {p.name}, or a business like it?</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Send us your real CM1 and CM2 numbers. In a 30-minute call we redo this plan with them and tell you which part to start with.
              </p>
              <Link href="/contact" className="mt-5 inline-block rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white">
                Redo this plan with my numbers
              </Link>
            </div>

            {siblings.length > 0 && (
              <section className="mt-12">
                <h2 className="text-lg font-semibold text-brand">More {p.industry.toLowerCase()} growth plans</h2>
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

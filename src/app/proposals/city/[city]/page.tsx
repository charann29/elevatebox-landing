import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COMPANY, OG_IMG } from "@/lib/content";
import { COMPANIES, PROPOSALS, companyHref, cityBySlug, citySlug, industrySlug, proposalCities } from "@/lib/proposals";
import { cityTier, inr, plan } from "@/lib/growth";
import { GrowthPlan, Table, beLabel, range } from "@/components/growth-plan";
import { Header, Footer } from "@/components/site";
import { CtaBand, PageHero, Section } from "@/components/blocks";
import { JsonLd, ORG, breadcrumb, ld } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return proposalCities().map((c) => ({ city: citySlug(c) }));
}

const title = (c: string) => `Growth Plans for Businesses in ${c}`;

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const city = cityBySlug((await params).city);
  if (!city) return {};
  const t = title(city);
  const d = `12-month growth plans for ${city} businesses by industry: tech, automation, strategy and Meta ads, with Month 6 and Month 12 numbers.`.slice(0, 160);
  return {
    title: t.length > 47 ? { absolute: t } : t,
    description: d,
    alternates: { canonical: `/proposals/city/${citySlug(city)}` },
    openGraph: { images: [OG_IMG], title: t, description: d, type: "article" },
  };
}

export default async function CityPlan({ params }: { params: Promise<{ city: string }> }) {
  const city = cityBySlug((await params).city);
  if (!city) notFound();
  const path = `/proposals/city/${citySlug(city)}`;
  const items = [
    ...PROPOSALS.filter((p) => p.city === city).map((p) => ({ key: p.slug, name: p.name, industry: p.industry, href: `/proposals/${p.slug}` })),
    ...COMPANIES.filter((c) => c.city === city).map((c) => ({ key: c.slug, name: c.name, industry: c.industry, href: companyHref(c.slug) })),
  ];
  const count = (i: string) => items.filter((p) => p.industry === i).length;
  const inds = [...new Set(items.map((p) => p.industry))].sort((a, b) => count(b) - count(a));
  const top = inds[0];
  const g = plan(top, city);

  return (
    <>
      <Header />
      <main className="flex-1">
        <JsonLd
          json={ld(
            ORG,
            { "@type": "Article", headline: title(city), mainEntityOfPage: `${COMPANY.site}${path}`, author: { "@id": ORG["@id"] }, publisher: { "@id": ORG["@id"] } },
            breadcrumb([{ name: "Growth plans", path: "/proposals" }, { name: city, path }]),
          )}
        />
        <PageHero
          eyebrow={`Growth plans · ${city} · ${cityTier(city)}`}
          title={title(city)}
          lead={`What tech, automation, strategy and Meta ads could add for ${city} businesses, industry by industry, then the full plan for its most common trade: ${top.toLowerCase()}.`}
          crumbs={[{ label: "Growth plans", href: "/proposals" }, { label: city }]}
        />
        <Section>
          <article className="max-w-4xl">
            <h2 className="text-2xl font-bold text-brand sm:text-3xl">By industry, in {city}</h2>
            <Table
              head={["Industry", "Plans", "Our fee", "Month 6", "Month 12", "Break-even"]}
              rows={inds.map((i) => {
                const k = plan(i, city);
                return [
                  <Link key={i} href={`/proposals/industry/${industrySlug(i)}`} className="underline">{i}</Link>,
                  count(i),
                  inr(k.fee),
                  range(k.lo[5].revenue, k.hi[5].revenue),
                  range(k.lo[11].revenue, k.hi[11].revenue),
                  beLabel(k),
                ];
              })}
            />

            <h2 className="mt-14 text-2xl font-bold text-brand sm:text-3xl">The full plan: {top.toLowerCase()} in {city}</h2>
            <GrowthPlan s={{ name: `a typical ${top.toLowerCase()} business`, industry: top, city, voice: g.x.voice, stack: g.x.ideas }} g={g} />

            <section className="mt-14">
              <h2 className="text-2xl font-bold text-brand">The {items.length} plans in {city}</h2>
              {inds.map((i) => (
                <div key={i} className="mt-6">
                  <h3 className="font-semibold text-brand">{i}</h3>
                  <ul className="mt-2 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2 lg:grid-cols-3">
                    {items.filter((p) => p.industry === i).sort((a, b) => a.name.localeCompare(b.name)).map((p) => (
                      <li key={p.key}>
                        <Link href={p.href} className="text-ink-muted hover:text-brand hover:underline">{p.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          </article>
        </Section>
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}

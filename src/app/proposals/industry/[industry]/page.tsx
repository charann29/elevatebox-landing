import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COMPANY, OG_IMG } from "@/lib/content";
import { PROPOSALS, citySlug, industryBySlug, industrySample, industrySlug, proposalIndustries } from "@/lib/proposals";
import { inr, plan } from "@/lib/growth";
import { GrowthPlan, Table, beLabel, range } from "@/components/growth-plan";
import { Header, Footer } from "@/components/site";
import { CtaBand, PageHero, Section } from "@/components/blocks";
import { JsonLd, ORG, breadcrumb, ld } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return proposalIndustries().map((i) => ({ industry: industrySlug(i) }));
}

const title = (i: string) => `Growth Plan for ${i} Businesses in Telangana`;

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }): Promise<Metadata> {
  const ind = industryBySlug((await params).industry);
  if (!ind) return {};
  const t = title(ind);
  const d = `A 12-month growth plan for ${ind.toLowerCase()} businesses in Telangana: tech, automation, strategy and Meta ads, by city, with Month 6 and Month 12 numbers.`.slice(0, 160);
  return {
    title: t.length > 47 ? { absolute: t } : t,
    description: d,
    alternates: { canonical: `/proposals/industry/${industrySlug(ind)}` },
    robots: { index: false, follow: true },
    openGraph: { images: [OG_IMG], title: t, description: d, type: "article" },
  };
}

export default async function IndustryPlan({ params }: { params: Promise<{ industry: string }> }) {
  const ind = industryBySlug((await params).industry);
  if (!ind) notFound();
  const path = `/proposals/industry/${industrySlug(ind)}`;
  const g = plan(ind, "Hyderabad");
  const sample = industrySample(ind);
  const items = PROPOSALS.filter((p) => p.industry === ind);
  const cities = [...new Set(items.map((p) => p.city))].sort((a, b) => items.filter((p) => p.city === b).length - items.filter((p) => p.city === a).length);

  return (
    <>
      <Header />
      <main className="flex-1">
        <JsonLd
          json={ld(
            ORG,
            { "@type": "Article", headline: title(ind), mainEntityOfPage: `${COMPANY.site}${path}`, author: { "@id": ORG["@id"] }, publisher: { "@id": ORG["@id"] } },
            breadcrumb([{ name: "Growth plans", path: "/proposals" }, { name: ind, path }]),
          )}
        />
        <PageHero
          eyebrow={`Growth plan · ${ind} · Telangana`}
          title={title(ind)}
          lead={`How a typical ${ind.toLowerCase()} business in Hyderabad could add ${range(g.lo[5].revenue, g.hi[5].revenue)} a month by Month 6 and ${range(g.lo[11].revenue, g.hi[11].revenue)} by Month 12. City by city below, then the ${items.length} businesses we have written plans for.`}
          crumbs={[{ label: "Growth plans", href: "/proposals" }, { label: ind }]}
        />
        <Section>
          <article className="max-w-4xl">
            <h2 className="text-2xl font-bold text-brand sm:text-3xl">By city</h2>
            <p className="mt-3 leading-relaxed text-ink-muted">
              Prices, ad spend and our fee are lower outside Hyderabad; the returns and conversion rates stay the same.
            </p>
            <Table
              head={["City", "Plans", "Our fee", "Month 6", "Month 12", "Break-even"]}
              rows={cities.map((c) => {
                const k = plan(ind, c);
                return [
                  <Link key={c} href={`/proposals/city/${citySlug(c)}`} className="underline">{c}</Link>,
                  items.filter((p) => p.city === c).length,
                  inr(k.fee),
                  range(k.lo[5].revenue, k.hi[5].revenue),
                  range(k.lo[11].revenue, k.hi[11].revenue),
                  beLabel(k),
                ];
              })}
            />

            <GrowthPlan s={{ name: `a typical ${ind.toLowerCase()} business`, industry: ind, city: "Hyderabad", voice: sample.voice, stack: sample.stack.slice(-2) }} g={g} />

            <section className="mt-14">
              <h2 className="text-2xl font-bold text-brand">The {items.length} {ind.toLowerCase()} plans</h2>
              {cities.map((c) => (
                <div key={c} className="mt-6">
                  <h3 className="font-semibold text-brand">{c}</h3>
                  <ul className="mt-2 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2 lg:grid-cols-3">
                    {items.filter((p) => p.city === c).sort((a, b) => a.name.localeCompare(b.name)).map((p) => (
                      <li key={p.slug}>
                        <Link href={`/proposals/${p.slug}`} className="text-ink-muted hover:text-brand hover:underline">{p.name}</Link>
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

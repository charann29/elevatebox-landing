import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY } from "@/lib/content";
import { COMPANIES, PROPOSALS, citySlug, industrySlug, proposalCities, proposalIndustries } from "@/lib/proposals";
import { Header, Footer } from "@/components/site";
import { CtaBand, PageHero, Section } from "@/components/blocks";
import { JsonLd, ORG, breadcrumb, ld } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Growth Plans for Telangana Businesses",
  description:
    "12-month growth plans for Hyderabad and Telangana businesses: tech, automation, strategy and Meta ads, with the funnel and Month 6 and Month 12 numbers.",
  alternates: { canonical: "/proposals" },
};

export default function ProposalsHub() {
  const groups = proposalIndustries().map((ind) => ({
    ind,
    items: PROPOSALS.filter((p) => p.industry === ind).sort((a, b) => a.name.localeCompare(b.name)),
  }));
  return (
    <>
      <Header />
      <main className="flex-1">
        <JsonLd
          json={ld(
            ORG,
            { "@type": "CollectionPage", "@id": `${COMPANY.site}/proposals#page`, url: `${COMPANY.site}/proposals`, name: "Growth plans", about: { "@id": ORG["@id"] } },
            breadcrumb([{ name: "Growth plans", path: "/proposals" }]),
          )}
        />
        <PageHero
          eyebrow="Growth plans"
          title="Growth plans for Telangana businesses"
          lead={`${PROPOSALS.length + COMPANIES.length} 12-month plans for Telangana businesses: ${PROPOSALS.length} established firms whose websites we checked and ${COMPANIES.length} newly registered companies. Tech, automation, strategy and Meta ads, with the money funnel and Month 6 and Month 12 numbers from a stated model. These businesses are not our clients.`}
          crumbs={[{ label: "Growth plans" }]}
        />
        <Section>
          <div className="grid gap-8 sm:grid-cols-2">
            {[
              { h: "By industry", base: "industry", items: proposalIndustries().map((i) => ({ label: i, slug: industrySlug(i), n: [...PROPOSALS, ...COMPANIES].filter((p) => p.industry === i).length })) },
              { h: "By city", base: "city", items: proposalCities().map((c) => ({ label: c, slug: citySlug(c), n: [...PROPOSALS, ...COMPANIES].filter((p) => p.city === c).length })).sort((a, b) => b.n - a.n) },
            ].map((g) => (
              <section key={g.h} className="rounded-2xl border border-black/10 p-6">
                <h2 className="text-xl font-bold text-brand">{g.h}</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((i) => (
                    <li key={i.slug}>
                      <Link href={`/proposals/${g.base}/${i.slug}`} className="inline-block rounded-full bg-brand-wash px-3 py-1.5 text-sm text-brand hover:underline">
                        {i.label} <span className="text-ink-muted">({i.n})</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <h2 className="mt-14 text-2xl font-bold text-brand">Established businesses, by industry</h2>
          <p className="mt-2 text-sm text-ink-muted">The newly registered companies are listed on each industry and city page above.</p>
          <div className="mt-8 space-y-12">
            {groups.map((g) => (
              <section key={g.ind}>
                <h2 className="text-2xl font-bold text-brand">
                  {g.ind} <span className="text-base font-normal text-ink-muted">({g.items.length})</span>
                </h2>
                <ul className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
                  {g.items.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/proposals/${p.slug}`} className="text-ink-muted hover:text-brand hover:underline">
                        {p.name}, {p.city}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </Section>
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}

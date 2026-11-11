import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY } from "@/lib/content";
import { PROPOSALS, proposalIndustries } from "@/lib/proposals";
import { Header, Footer } from "@/components/site";
import { CtaBand, PageHero, Section } from "@/components/blocks";
import { JsonLd, ORG, breadcrumb, ld } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Growth Plans for Telangana Businesses",
  description:
    "12-month growth plans for Hyderabad and Telangana businesses: tech, automation, strategy and Meta ads, with the funnel and Month 6 and Month 12 numbers.",
  alternates: { canonical: "/proposals" },
  robots: { index: false, follow: true },
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
          lead="For each business we checked its public website and wrote a 12-month plan: tech, automation, strategy and Meta ads, with the money funnel and Month 6 and Month 12 numbers from a stated model. These businesses are not our clients."
          crumbs={[{ label: "Growth plans" }]}
        />
        <Section>
          <div className="space-y-12">
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

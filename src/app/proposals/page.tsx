import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY } from "@/lib/content";
import { PROPOSALS, proposalIndustries } from "@/lib/proposals";
import { Header, Footer } from "@/components/site";
import { CtaBand, PageHero, Section } from "@/components/blocks";
import { JsonLd, ORG, breadcrumb, ld } from "@/lib/schema";

export const metadata: Metadata = {
  title: "AI Calling and Automation Proposals for Telangana Businesses",
  description:
    "Open proposals for Hyderabad and Telangana businesses: where AI voice calling and automation could save staff time, based on public website checks.",
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
            { "@type": "CollectionPage", "@id": `${COMPANY.site}/proposals#page`, url: `${COMPANY.site}/proposals`, name: "AI calling and automation proposals", about: { "@id": ORG["@id"] } },
            breadcrumb([{ name: "Proposals", path: "/proposals" }]),
          )}
        />
        <PageHero
          eyebrow="Open proposals"
          title="AI calling and automation proposals for Telangana businesses"
          lead="For each business we checked its public website, then wrote down where AI phone calls and better software would save the most time. These are proposals, not client work."
          crumbs={[{ label: "Proposals" }]}
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

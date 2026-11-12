import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COMPANY, OG_IMG } from "@/lib/content";
import { COMPANIES } from "@/lib/proposals";
import { CompanyPlan } from "@/components/company-plan";
import { Header, Footer } from "@/components/site";
import { CtaBand } from "@/components/blocks";
import { JsonLd, ORG, breadcrumb, ld } from "@/lib/schema";

// ponytail: ~4,800 pages render on first visit and stay cached (ISR), so builds stay fast.
export const dynamicParams = true;
export const revalidate = false;
export function generateStaticParams() {
  return [];
}

const get = (slug: string) => COMPANIES.find((c) => c.slug === slug);
const title = (c: { name: string; city: string }) => `Growth Plan for ${c.name}, ${c.city}`;
const desc = (c: { name: string; city: string; industry: string }) =>
  `A 12-month growth plan for ${c.name}, a new ${c.industry.toLowerCase()} business in ${c.city}: tech, automation, strategy and Meta ads, with Month 6 and Month 12 numbers.`.slice(0, 160);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = get((await params).slug);
  if (!c) return {};
  const t = title(c);
  return {
    title: t.length > 47 ? { absolute: t } : t,
    description: desc(c),
    alternates: { canonical: `/proposals/company/${c.slug}` },
    openGraph: { images: [OG_IMG], title: t, description: desc(c), type: "article" },
  };
}

export default async function CompanyPlanPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = get((await params).slug);
  if (!c) notFound();
  const path = `/proposals/company/${c.slug}`;
  return (
    <>
      <Header />
      <main className="flex-1">
        <JsonLd
          json={ld(
            ORG,
            {
              "@type": "Article",
              headline: title(c),
              description: desc(c),
              mainEntityOfPage: `${COMPANY.site}${path}`,
              author: { "@id": ORG["@id"] },
              publisher: { "@id": ORG["@id"] },
              about: { "@type": "Organization", name: c.name, address: { "@type": "PostalAddress", addressLocality: c.city, addressRegion: "Telangana", addressCountry: "IN" } },
            },
            breadcrumb([{ name: "Growth plans", path: "/proposals" }, { name: c.name, path }]),
          )}
        />
        <CompanyPlan c={c} email={COMPANY.email} />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}

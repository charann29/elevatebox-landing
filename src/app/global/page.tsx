import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY, OG_IMG } from "@/lib/content";
import { GLOBAL_GROUPS } from "@/lib/global";
import { Header, Footer } from "@/components/site";
import { PageHero, Section } from "@/components/blocks";
import { JsonLd, ORG, breadcrumb, ld } from "@/lib/schema";

const TITLE = "AI and App Development for Clients Outside India";
const DESCRIPTION =
  "ElevateBox builds AI systems, AI voice agents and apps for businesses in the UAE, Saudi Arabia, Qatar, the USA, the UK, Germany and the Netherlands.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/global" },
  openGraph: { images: [OG_IMG], title: `${TITLE} | ElevateBox`, description: DESCRIPTION, url: "/global", type: "website" },
};

export default function GlobalHub() {
  const items = GLOBAL_GROUPS.flatMap((g) => g.pages);
  return (
    <>
      <Header />
      <main className="flex-1">
        <JsonLd
          json={ld(
            ORG,
            {
              "@type": "CollectionPage",
              "@id": `${COMPANY.site}/global#page`,
              url: `${COMPANY.site}/global`,
              name: TITLE,
              description: DESCRIPTION,
              mainEntity: {
                "@type": "ItemList",
                itemListElement: items.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${COMPANY.site}${p.href}` })),
              },
            },
            breadcrumb([{ name: "Global", path: "/global" }]),
          )}
        />
        <PageHero
          eyebrow="Clients outside India"
          title={TITLE}
          lead="One Hyderabad team for AI co-pilots and autopilots, AI voice agents on Roopa by ElevateBox, and mobile and web apps. Working hours that overlap yours, data kept in your region, code in your name."
          crumbs={[{ label: "Global" }]}
        />
        <Section>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {GLOBAL_GROUPS.map((g) => (
              <li key={g.label} className="rounded-3xl border border-line p-6">
                <h2 className="text-xl font-bold">{g.label}</h2>
                <ul className="mt-4 space-y-2">
                  {g.pages.map((p) => (
                    <li key={p.href}>
                      <Link href={p.href} className="text-sm font-semibold text-navy hover:underline">{`${p.label} in ${g.in} →`}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-3xl text-sm leading-relaxed text-ink-3">
            {`Our team works from Hyderabad, India. You contract with ${COMPANY.legal} and own the code, cloud and store accounts. To book a call, message us on WhatsApp at ${COMPANY.phone} or email ${COMPANY.email}.`}
          </p>
        </Section>
      </main>
      <Footer />
    </>
  );
}

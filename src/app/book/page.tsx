import type { Metadata } from "next";
import { COMPANY, DISCOVERY, OG_IMG } from "@/lib/content";
import { Header, Footer } from "@/components/site";
import { BookingEmbed, DiscoveryOffer, PageHero, Section } from "@/components/blocks";

const TITLE = `Book a ${DISCOVERY.title} Call`;
const DESCRIPTION = `Book a ${DISCOVERY.title} call with ElevateBox for ${DISCOVERY.price}: your requirements worked through with the delivery team, and a written quotation and timeline.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/book" },
  openGraph: { images: [OG_IMG], title: TITLE, description: DESCRIPTION, url: "/book", type: "website" },
};

export default function BookPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow={`${DISCOVERY.price} · Requirement analysis and quotation`}
          title="Book your product requirement analysis"
          lead="Pay, then pick a time. You talk to the people who will build it, and leave with a quotation and timeline in writing."
          crumbs={[{ label: "Book a call" }]}
        />
        <Section>
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.5fr]">
            <div className="space-y-5 lg:sticky lg:top-24">
              <DiscoveryOffer />
              <p className="px-2 text-sm leading-relaxed text-ink-3">
                {`Questions before you pay? WhatsApp or call ${COMPANY.phone}, ${COMPANY.hours}.`}
              </p>
            </div>
            <div id="schedule">
              <BookingEmbed />
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}

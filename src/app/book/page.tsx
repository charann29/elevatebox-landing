import type { Metadata } from "next";
import { COMPANY, DISCOVERY, OG_IMG } from "@/lib/content";
import { Header, Footer } from "@/components/site";
import { DiscoveryOffer, Faq, PageHero, Section } from "@/components/blocks";

const TITLE = `Book a ${DISCOVERY.title} Call`;
const DESCRIPTION = `Book a ${DISCOVERY.title} call with ElevateBox for ${DISCOVERY.price}: your requirements worked through with the delivery team, and a written quotation and timeline.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/book" },
  openGraph: { images: [OG_IMG], title: TITLE, description: DESCRIPTION, url: "/book", type: "website" },
};

const STEPS = [
  { t: `Pay ${DISCOVERY.price}`, d: "On our Razorpay page — UPI, cards and net banking. You get a receipt by email." },
  { t: "Pick your time", d: "The calendar opens straight after payment. Choose any open slot that suits you." },
  { t: "Leave with a quotation", d: "We work through your requirements on the call, then send the quotation and timeline in writing." },
];

const BOOK_FAQS = [
  { q: "Why is the first call paid?", a: "Because it is real work: the people who would build your product spend the time, prepare, and hand you a written quotation you can take to anyone. It also means every slot goes to someone serious about building." },
  { q: "What if I paid but did not reach the calendar?", a: `WhatsApp ${COMPANY.phone} with your Razorpay payment ID and we will send your booking link straight away.` },
  { q: "Can I reschedule?", a: "Yes. The confirmation email has a link to move your slot." },
];

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
          <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_1fr]">
            <DiscoveryOffer />
            <ol className="space-y-4">
              {STEPS.map((s, k) => (
                <li key={s.t} className="flex gap-4 rounded-3xl bg-white p-6 ring-1 ring-black/5">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink text-sm font-semibold text-white">{k + 1}</span>
                  <div>
                    <h2 className="text-lg font-bold">{s.t}</h2>
                    <p className="mt-1 text-sm leading-relaxed text-ink-3">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="mx-auto mt-16 max-w-3xl">
            <Faq items={BOOK_FAQS} />
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}

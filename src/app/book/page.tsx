import type { Metadata } from "next";
import { COMPANY, OG_IMG } from "@/lib/content";
import { Header, Footer } from "@/components/site";
import { BookingEmbed, PageHero, Section } from "@/components/blocks";

const TITLE = "Book a 30-Minute Call";
const DESCRIPTION =
  "Book a free 30-minute call with the ElevateBox team: what you want to build, what it should cost, and what to leave out. No obligation.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/book" },
  openGraph: { images: [OG_IMG], title: TITLE, description: DESCRIPTION, url: "/book", type: "website" },
};

const AGENDA = [
  { t: "Your goal", d: "What you want to build, who it is for, and what has to be true for it to be worth it." },
  { t: "An honest range", d: "What it should cost and how long it should take, with the assumptions said out loud." },
  { t: "What to cut", d: "The parts we think you can skip or buy instead of build." },
];

export default function BookPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Free · 30 minutes"
          title="Book a call with the people who will build it"
          lead={`Pick a time that suits you. You talk to the delivery team, not a sales desk — ${COMPANY.hours}.`}
          crumbs={[{ label: "Book a call" }]}
        />
        <Section>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
            <ol className="space-y-4">
              {AGENDA.map((a, k) => (
                <li key={a.t} className="rounded-3xl bg-white p-6 ring-1 ring-black/5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-4">{`Step ${k + 1}`}</p>
                  <h2 className="mt-1 text-xl font-bold">{a.t}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-3">{a.d}</p>
                </li>
              ))}
            </ol>
            <BookingEmbed />
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}

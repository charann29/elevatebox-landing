import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CLIENTS, COMPANY, CONSULT_RESULTS, CONSULTS, CREDENTIALS, OG_IMG, clientLogo } from "@/lib/content";
import { Header, Footer } from "@/components/site";
import { Crumbs, Faq, Section } from "@/components/blocks";
import { ConsultForm } from "@/components/consult-form";
import { JsonLd, breadcrumb, faqPage, ld, service } from "@/lib/schema";

export const dynamicParams = false;
export const generateStaticParams = () => CONSULTS.map((c) => ({ tier: c.slug }));

/* DRAFT promise, needs owner yes: refund the fee if the call was not useful. */
const GUARANTEE = "Not useful? Tell us after the call and we refund you in full.";

const find = (tier: string) => CONSULTS.find((c) => c.slug === tier);

export async function generateMetadata({ params }: { params: Promise<{ tier: string }> }): Promise<Metadata> {
  const c = find((await params).tier);
  if (!c) return {};
  const title = `${c.title} for ${c.price}`;
  const path = `/book/${c.slug}`;
  return {
    title,
    description: `${c.lead} Book online with ElevateBox, Hyderabad.`,
    alternates: { canonical: path },
    openGraph: { images: [OG_IMG], title, description: c.lead, url: path, type: "website" },
  };
}

const Tick = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="mt-0.5 size-4 shrink-0 text-[#16a34a]" aria-hidden="true">
    <path d="M5 12l5 5L20 7" />
  </svg>
);

export default async function ConsultPage({ params }: { params: Promise<{ tier: string }> }) {
  const c = find((await params).tier);
  if (!c) notFound();
  const path = `/book/${c.slug}`;

  const steps = [
    { t: "Answer 7 quick questions", d: "So the right person joins your call, prepared for your project." },
    { t: `Pay ${c.price}`, d: "UPI, cards or net banking on Razorpay. Receipt by email." },
    { t: "Pick your time", d: "The calendar opens straight after payment." },
    { t: "Talk to the team", d: "Google Meet. Bring your idea, screenshots or a sketch." },
  ];
  const faqs = [
    { q: "Who will I talk to?", a: "Someone from the team that designs and builds the apps, not a sales caller." },
    { q: "What if I paid but did not reach the calendar?", a: `WhatsApp ${COMPANY.phone} with your Razorpay payment ID and we will send your booking link straight away.` },
    { q: "Can I reschedule?", a: "Yes. The confirmation email has a link to move your slot." },
    { q: "What if the call is not useful?", a: "Tell us after the call and we refund the full fee, processed within fifteen working days. You keep the advice." },
  ];

  return (
    <>
      <JsonLd json={ld(service(c.title, c.lead, path), breadcrumb([{ name: "Book a call", path: "/book" }, { name: c.title, path }]), faqPage(faqs))} />
      <Header />
      <main className="flex-1 pb-24 lg:pb-0">
        {/* Hero: price, promise, one CTA, checkable credentials */}
        <section className="night-glow relative overflow-hidden">
          <div aria-hidden="true" className="night-grid absolute inset-0" />
          <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-10 lg:px-8 lg:pb-20 lg:pt-14">
            <Crumbs items={[{ label: "Book a call", href: "/book" }, { label: c.price }]} />
            <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-electric/15 px-4 py-1.5 text-sm font-semibold text-electric-2 ring-1 ring-electric/30">
              {`${c.title} · ${c.price}`}
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl">{c.headline}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">{c.lead}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#book" className="rounded-full bg-electric px-8 py-4 text-center text-base font-semibold text-white shadow-lg shadow-electric/40 transition-colors hover:bg-[#2f5cf0]">
                {`Book my ${c.price} call ›`}
              </a>
              <p className="text-sm text-white/55">{GUARANTEE}</p>
            </div>
            <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5" aria-label="Where our team has worked">
              {CREDENTIALS.map((x) => (
                <li key={x.k} className="rounded-2xl bg-white/[0.05] px-4 py-3 ring-1 ring-white/10">
                  <p className="text-sm font-bold text-white">{x.k}</p>
                  <p className="text-xs text-white/70">{x.v}</p>
                  <p className="mt-1 text-[11px] text-white/45">{x.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Real clients */}
        <section className="border-b border-black/5 bg-white py-8">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-ink-4">Apps and products we have built</p>
          <ul className="mx-auto mt-5 flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-5">
            {CLIENTS.map((n) => (
              <li key={n} className="flex items-center gap-2">
                <Image src={clientLogo(n)} alt="" width={28} height={28} className="size-7" />
                <span className="font-display text-base font-bold text-ink-2">{n}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Money: real results, then the cost of getting it wrong */}
        <section className="bg-[#f7f7f5] px-5 py-14 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-3xl font-bold sm:text-4xl">What one good plan has done for businesses like yours</h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-3">
              {CONSULT_RESULTS.map((r) => (
                <li key={r.n} className="rounded-3xl bg-white p-7 ring-1 ring-black/5">
                  <p className="font-display text-4xl font-black tracking-tight text-electric">{r.n}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-2">{r.d}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6 grid items-center gap-6 rounded-3xl bg-ink p-8 text-white sm:grid-cols-[1fr_auto] sm:p-10">
              <div>
                <h3 className="text-2xl font-bold text-white">{`The ${c.price} math`}</h3>
                <p className="mt-3 max-w-2xl text-white/70">
                  {`A wrong build costs you ₹3 lakh or more, plus months you could have been selling. One ${c.price} call tells you what will actually bring customers in, what to skip, and what it should cost, before you spend a rupee on development.`}
                </p>
              </div>
              <a href="#book" className="rounded-full bg-electric px-8 py-4 text-center font-semibold text-white shadow-lg shadow-electric/40">{`Book my ${c.price} call ›`}</a>
            </div>
          </div>
        </section>

        <Section>
          <div id="book" className="grid scroll-mt-24 items-start gap-10 lg:grid-cols-[1.2fr_1fr]">
            <ConsultForm offer={c} />
            <div className="space-y-6">
              <div className="rounded-[2rem] bg-white p-7 ring-1 ring-black/[0.07]">
                <div className="flex items-end justify-between gap-4">
                  <h2 className="text-xl font-bold">What you leave with</h2>
                  <p className="font-display text-3xl font-black">{c.price}</p>
                </div>
                <ul className="mt-5 space-y-3">
                  {c.includes.map((i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-ink-2"><Tick />{i}</li>
                  ))}
                </ul>
              </div>
              <ol className="space-y-3">
                {steps.map((s, k) => (
                  <li key={s.t} className="flex gap-4 rounded-3xl bg-white p-5 ring-1 ring-black/5">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-sm font-semibold text-white">{k + 1}</span>
                    <div>
                      <h3 className="font-bold">{s.t}</h3>
                      <p className="mt-0.5 text-sm text-ink-3">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="mx-auto mt-16 max-w-3xl">
            <Faq items={faqs} />
          </div>
        </Section>
      </main>

      {/* Sticky mobile book bar (Mahasiddhi pattern) */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-black/10 bg-white/95 py-3 pl-4 pr-20 backdrop-blur lg:hidden">
        <div>
          <p className="font-display text-xl font-black leading-none">{c.price}</p>
          <p className="text-[11px] text-ink-3">{c.title}</p>
        </div>
        <a href="#book" className="rounded-full bg-electric px-6 py-3 text-sm font-semibold text-white">Book now ›</a>
      </div>
      <Footer />
    </>
  );
}

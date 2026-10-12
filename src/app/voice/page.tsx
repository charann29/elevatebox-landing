import type { Metadata } from "next";
import Image from "next/image";
import { COMPANY, IMG, VOICE_APP } from "@/lib/content";
import { Header, Footer } from "@/components/site";
import { BulletGrid, Faq, PageHero, Section } from "@/components/blocks";

const TITLE = "Voice by ElevateBox — AI phone calls in Telugu, Hindi and English";
const DESCRIPTION =
  "Our own product: an AI phone employee that calls every new lead within seconds, talks in Telugu, Hindi or English, writes down what was said and books the next step.";

export const metadata: Metadata = {
  title: `${TITLE} | ${COMPANY.name}`,
  description: DESCRIPTION,
  alternates: { canonical: "/voice" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/voice", type: "website" },
};

// Only routes that are live on the product app today.
const SIGNUP = `${VOICE_APP}/login?mode=signup`;
const DEMO = `${VOICE_APP}/`;

const STEPS = [
  {
    n: "01",
    t: "Describe the job",
    d: "Tell it what the call is for, in plain words. It writes the script and decides what every call must find out.",
  },
  {
    n: "02",
    t: "It calls your leads",
    d: "New leads from your forms and ads get a call within seconds. Old lists get called inside the hours you set.",
  },
  {
    n: "03",
    t: "You read what happened",
    d: "Answers, a summary, the recording and the outcome land the moment each call ends.",
  },
];

const FEATURES = [
  { t: "Their language", d: "Telugu, Hindi and English, mixed the way people really talk. It switches when the customer does." },
  { t: "Calls in seconds", d: "A lead from your form or Facebook ad is rung while they are still holding their phone." },
  { t: "Every answer written down", d: "Budget, area, preferred time — whatever you ask it to find out, filled in after each call." },
  { t: "Books the next step", d: "Site visits into Google Calendar, a WhatsApp confirmation to the customer, callbacks at the time they asked for." },
  { t: "Old lists called for you", d: "Upload a CSV, pick calling hours and days, pause any time. Numbers on your do-not-call list are skipped." },
  { t: "Answers incoming calls", d: "It also picks up when customers ring your number." },
];

const PRICING = [
  { k: "₹7.98", v: "a minute, billed by the second" },
  { k: "₹0", v: "for calls nobody answers" },
  { k: "₹50", v: "of calls free when you sign up" },
  { k: "₹649", v: "a month for your own number, from" },
];

const FAQS = [
  {
    q: "Is Voice a product or a service?",
    a: "A product. ElevateBox built it and runs it. You sign up, set up your employee yourself in about five minutes, and pay from a prepaid wallet. No project, no setup fee.",
  },
  {
    q: "Which languages does it speak?",
    a: "Telugu, Hindi and English, including the mix of English most people use in everyday Telugu and Hindi.",
  },
  {
    q: "Can I hear it first?",
    a: "Yes. Enter your number on the Voice home page and it calls you in a minute. After signing up you can also talk to your employee in the browser before it calls a customer.",
  },
  {
    q: "What does it cost?",
    a: "₹7.98 a minute, billed by the second, with GST added at checkout. Unanswered calls cost nothing, and bigger recharges bring the rate down to ₹4.94 a minute.",
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Voice by ElevateBox",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: DESCRIPTION,
  url: `${COMPANY.site}/voice`,
  inLanguage: ["te", "hi", "en"],
  publisher: { "@type": "Organization", name: COMPANY.legal, url: COMPANY.site },
  offers: {
    "@type": "Offer",
    priceCurrency: "INR",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "7.98",
      priceCurrency: "INR",
      unitCode: "MIN",
      valueAddedTaxIncluded: false,
    },
  },
};

const PRIMARY =
  "inline-flex items-center justify-center rounded-full bg-ink px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand";
const SECONDARY =
  "inline-flex items-center justify-center rounded-full border border-line px-7 py-3.5 text-base font-semibold text-ink transition-colors hover:border-ink";

export default function VoicePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <PageHero
          eyebrow="Our product"
          title="Voice by ElevateBox: AI phone calls in Telugu, Hindi and English"
          lead="Every lead gets a call within seconds, in their own language. It writes down what they said and books the next step."
          crumbs={[{ label: "Portfolio", href: "/portfolio" }, { label: "Voice" }]}
        />

        <Section>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                The calls your team never gets to, made for you.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-3">
                Indian businesses lose leads in the hours between an enquiry and a callback. Voice
                rings each lead while they are still interested, talks the way they talk at home,
                and hands you the answers.
              </p>
              <ol className="mt-10 grid gap-8 sm:grid-cols-3">
                {STEPS.map((s) => (
                  <li key={s.n}>
                    <span className="font-mono text-sm text-ink-4">{s.n}</span>
                    <h3 className="mt-2 font-semibold">{s.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-3">{s.d}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a href={SIGNUP} className={PRIMARY}>
                  Start free with ₹50 credit
                </a>
                <a href={DEMO} className={SECONDARY}>
                  Get a demo call
                </a>
              </div>
            </div>
            <Image
              src="/assets/project-voice.svg"
              alt="Voice by ElevateBox showing a live Telugu call with the answers written down"
              width={IMG.project.w}
              height={IMG.project.h}
              priority
              className="mx-auto h-[520px] w-[260px] drop-shadow-2xl"
            />
          </div>
        </Section>

        <Section tinted eyebrow="What it does" title="One employee, every call">
          <BulletGrid items={FEATURES} />
        </Section>

        <Section
          eyebrow="Pricing"
          title="Pay only for the minutes you talk"
          lead="A prepaid wallet. Recharge when you need to. No plan, no contract. GST is added at checkout."
        >
          <dl className="grid grid-cols-2 gap-8 border-t border-line pt-10 lg:grid-cols-4">
            {PRICING.map((p) => (
              <div key={p.v}>
                <dt className="text-3xl font-bold text-ink sm:text-4xl">{p.k}</dt>
                <dd className="mt-1 text-sm text-ink-3">{p.v}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section tinted eyebrow="Questions" title="Before you sign up">
          <div className="max-w-3xl">
            <Faq items={FAQS} />
          </div>
        </Section>

        <section className="bg-brand py-14 lg:py-20">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 text-center lg:flex-row lg:justify-between lg:px-8 lg:text-left">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Hear it call you first
              </h2>
              <p className="mt-3 max-w-xl text-white/75">
                Enter your number and Voice rings you in a minute, in Telugu, Hindi or English.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <a
                href={DEMO}
                className="rounded-full bg-white px-8 py-4 text-base font-semibold text-brand transition-transform hover:scale-105"
              >
                Get a demo call
              </a>
              <a
                href={SIGNUP}
                className="rounded-full border border-white/25 px-8 py-4 text-base font-semibold text-white transition-colors hover:border-white"
              >
                Start free
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

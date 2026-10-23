import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CATEGORIES,
  CLIENTS,
  COMPANY,
  CREDENTIALS,
  DISCOVERY,
  FAQS,
  PROJECTS,
  VOICE_APP,
  VOICE_SEO,
  clientLogo,
  serviceIcon,
  OG_IMG,
} from "@/lib/content";
import { Header, Footer, PillCta } from "@/components/site";
import { DiscoveryOffer, Faq } from "@/components/blocks";
import { JsonLd, ORG, faqPage, ld } from "@/lib/schema";

export const metadata: Metadata = {
  title: `${COMPANY.name} — Mobile App, Web & AI Development Company in Hyderabad`,
  description:
    "Mobile app, web and AI development company in Hyderabad. A paid requirement analysis, two-week releases, code in your name, and our own AI calling product, Voice.",
  alternates: { canonical: "/" },
  openGraph: {
    images: [OG_IMG],
    title: `${COMPANY.name} — Mobile App, Web & AI Development Company in Hyderabad`,
    description: "Mobile apps, websites and AI products, built in Hyderabad and kept running after launch.",
    url: "/",
    type: "website",
  },
};

const COL = "mx-auto w-full max-w-7xl px-5 lg:px-8";
const WA = `https://wa.me/${COMPANY.whatsapp.replace(/\D/g, "")}`;

const PROOF = [
  { v: "1,400", l: "Apps built to date" },
  { v: "AIR 14", l: "ACM ICPC — top 0.17% of 8,000+ competitors" },
  { v: "120s → 7s", l: "A core API we sped up at JPMorgan Chase" },
  { v: "< 6 hrs", l: "To respond to any bug or problem" },
];

// Voice in numbers. The call volume is the figure the team quotes for the product.
const VOICE_STATS = [
  { v: "8 lakh", l: "Calls a day, at scale" },
  { v: "Seconds", l: "From a new lead to a call" },
  { v: "3", l: "Languages: Telugu, Hindi, English" },
  { v: "10 min", l: "Free when you sign up" },
];

const VOICE_FEATURES = [
  { t: "Calls every lead in seconds", d: "A form fills, an ad converts, a list uploads — your employee is already dialling.", icon: "M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" },
  { t: "Talks like your best caller", d: "Natural, human-sounding calls in Telugu, Hindi and English.", icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" },
  { t: "Writes down every word", d: "Transcript, summary and the answers you asked for, on every call.", icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5" },
  { t: "Books the next step", d: "Site visits, appointments and callbacks fixed on the call and saved with the lead.", icon: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" },
];

const VOICE_USES = [
  { t: "Real estate", href: `${VOICE_APP}/best/ai-voice-agent-real-estate` },
  { t: "Clinics & hospitals", href: `${VOICE_APP}/best/ai-voice-agent-hospitals-clinics` },
  { t: "Education & coaching", href: `${VOICE_APP}/best/ai-voice-agent-coaching-admissions` },
  { t: "Insurance & loans", href: `${VOICE_APP}/best/ai-voice-agent-loans-insurance` },
  { t: "Automobile dealers", href: `${VOICE_APP}/best/ai-voice-agent-car-dealerships` },
  { t: "D2C & e-commerce", href: VOICE_APP },
];

// An example call, as the product shows it. Illustrative, not a customer recording.
const CALL_LINES: { who: "ai" | "lead"; text: string }[] = [
  { who: "ai", text: "నమస్కారం! మీరు నిన్న మా వెబ్‌సైట్‌లో ఫ్లాట్ గురించి అడిగారు కదా?" },
  { who: "lead", text: "Haan ji, 2BHK dekhna tha. Weekend pe ho sakta hai?" },
  { who: "ai", text: "Bilkul! Saturday 11 baje site visit book kar doon?" },
  { who: "lead", text: "Perfect, kar dijiye." },
];

/** A call in progress: caller, timer, waveform and the transcript as it is written. */
function CallCard({ large }: { large?: boolean }) {
  return (
    <span className="block rounded-3xl bg-white/[0.07] p-5 text-left shadow-2xl shadow-black/40 ring-1 ring-white/15 backdrop-blur-xl">
      <span className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-3">
          <span className="relative grid size-10 place-items-center rounded-full bg-[#22c55e] text-night">
            <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-[#22c55e]/40" />
            <svg viewBox="0 0 24 24" fill="currentColor" className="relative size-4" aria-hidden="true">
              <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2Z" />
            </svg>
          </span>
          <span>
            <span className="block text-sm font-semibold text-white">Live call · New lead</span>
            <span className="block text-xs text-white/55">Example call · 00:42</span>
          </span>
        </span>
        <span aria-hidden="true" className="flex h-6 items-end gap-[3px]">
          {[0, 1, 2, 3, 4, 5].map((k) => (
            <span key={k} className="wave w-[3px] rounded-full bg-[#4ade80]" style={{ animationDelay: `${k * 0.12}s` }} />
          ))}
        </span>
      </span>
      <span className="mt-4 flex flex-col gap-2">
        {(large ? CALL_LINES : CALL_LINES.slice(0, 3)).map((l) => (
          <span
            key={l.text}
            className={`max-w-[88%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed sm:text-sm ${
              l.who === "ai" ? "self-start rounded-bl-sm bg-electric text-white" : "self-end rounded-br-sm bg-white/90 text-ink"
            }`}
          >
            {l.text}
          </span>
        ))}
      </span>
      {large && (
        <span className="mt-4 flex items-center gap-2 rounded-2xl bg-[#22c55e]/15 px-3.5 py-2.5 text-xs font-semibold text-[#4ade80] sm:text-sm">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0" aria-hidden="true">
            <path d="M5 12l5 5L20 7" />
          </svg>
          Site visit booked · Saturday, 11:00 AM
        </span>
      )}
    </span>
  );
}

// What a brief usually starts with, and what we do about it.
const FIXES = [
  { p: "An outdated site or app", f: "Fast, modern sites and apps, designed and built by one team." },
  { p: "No technical team in-house", f: "Design, apps, web, cloud and AI from the first week — no hiring." },
  { p: "Manual, repetitive work", f: "Automations and AI agents that take the repeat work off your people." },
  { p: "Agencies that disappear", f: "The same team keeps it running after launch." },
  { p: "Estimates that keep growing", f: `A ${DISCOVERY.price} analysis first, then a written quotation.` },
  { p: "AI without a business case", f: "AI measured against a real task before it ships." },
];

const STEPS = [
  { t: "Requirement analysis", d: `${DISCOVERY.price}. A call with the people who will build it, and a written quotation and timeline.` },
  { t: "Design and build", d: "Something you can click every two weeks, and a written update every week." },
  { t: "Launch and look after it", d: "Monitoring from day one, and the same team on support afterwards." },
];

const GUARANTEES = [
  "Code, cloud and credentials in your name",
  "NDA before the first workshop",
  "A reply within one working day",
  "Fixed quotation before the build",
  "Bugs answered in under 6 hours",
  "Same team after launch",
];

// A leading "+" marks a cell that is good news for that route too.
const COMPARE: [string, string, string, string][] = [
  ["Time to start", "Within two weeks", "Months to hire", "Weeks of sales calls"],
  ["Who owns the code", "You, from day one", "+You", "Often handed over at the end"],
  ["Pricing", "Paid analysis, then a written quote", "Salaries, whether busy or not", "A guess that grows"],
  ["Range of skills", "Design, apps, web, cloud, AI", "Whoever you managed to hire", "Depends on the team you get"],
  ["Bug response", "Under 6 hours", "When someone is free", "A ticket queue, often days"],
  ["After launch", "Same team keeps it running", "If they stay", "Often ends at delivery"],
];

// The work grid: a 3D render behind each card, the live app screen in front.
const WORK = [
  { slug: "voice", bg: "/assets/work-bg-dark.jpg", span: "md:col-span-4 md:row-span-2" },
  { slug: "vamshi-farms", bg: "/assets/work-bg-blue.jpg", span: "md:col-span-2" },
  { slug: "8meds", bg: "/assets/work-bg-purple.jpg", span: "md:col-span-2" },
  { slug: "medibag", bg: "/assets/work-bg-green.jpg", span: "md:col-span-3" },
  { slug: "oneasy", bg: "", span: "md:col-span-3" },
];

/** A live app screen in a phone bezel. */
function Phone({ slug, name, className = "" }: { slug: string; name: string; className?: string }) {
  return (
    <span className={`block rounded-[2rem] bg-[#0b0b0c] p-[5px] shadow-2xl shadow-black/40 ring-1 ring-white/15 ${className}`}>
      <Image src={`/assets/real-${slug}.jpg`} alt={`${name}, live app screen`} width={520} height={1126} className="block w-full rounded-[1.65rem]" />
    </span>
  );
}

const Check = ({ className = "size-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M5 12l5 5L20 7" />
  </svg>
);
const Cross = ({ className = "size-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className={className} aria-hidden="true">
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

function Heading({ id, eyebrow, title, lead, dark, action }: { id: string; eyebrow: string; title: string; lead?: string; dark?: boolean; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div className="max-w-2xl">
        <p className={`text-sm font-semibold ${dark ? "text-electric-2" : "text-electric"}`}>{eyebrow}</p>
        <h2 id={id} className={`mt-3 text-3xl font-bold leading-[1.08] sm:text-5xl ${dark ? "text-white" : ""}`}>
          {title}
        </h2>
        {lead && <p className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? "text-white/60" : "text-ink-3"}`}>{lead}</p>}
      </div>
      {action}
    </div>
  );
}

const SERVICES = CATEGORIES.find((c) => c.key === "services")!;
const LOCATIONS = CATEGORIES.find((c) => c.key === "locations")!;

export default function Home() {
  const project = (slug: string) => PROJECTS.find((p) => p.slug === slug)!;
  const voice = project("voice");
  return (
    <>
      <Header />

      <main className="flex-1">
        <JsonLd
          json={ld(ORG, { "@type": "WebSite", name: COMPANY.name, url: COMPANY.site, publisher: { "@id": ORG["@id"] } }, faqPage(FAQS))}
        />

        {/* ── Hero ── */}
        <section className="night-glow relative overflow-hidden">
          <div aria-hidden="true" className="night-grid absolute inset-0" />
          <div className={`${COL} relative grid items-center gap-14 pb-20 pt-14 lg:grid-cols-[1.05fr_1fr] lg:pb-28 lg:pt-20`}>
            <div>
              <a
                href={VOICE_APP}
                className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1.5 pl-2 pr-3 text-xs text-white/80 lg:inline-flex transition-colors hover:border-white/30"
              >
                <span className="rounded-full bg-[#22c55e]/15 px-2 py-0.5 font-semibold text-[#4ade80]">New</span>
                Voice — India&apos;s best conversational voice agent
                <span aria-hidden="true">→</span>
              </a>
              <h1 className="text-[2.6rem] lg:mt-7 font-bold leading-[1.02] text-white sm:text-6xl lg:text-[4.4rem]">
                Mobile App &amp; AI Development Company in <span className="text-gradient">Hyderabad</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/65">
                We&apos;re a{" "}
                <Link href="/mobile-app-development-company-hyderabad" className="font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
                  mobile app development company in Hyderabad
                </Link>
                , taking startups and growing businesses from idea to a product people use: design, engineering, launch, and
                the maintenance afterwards.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={VOICE_APP}
                  className="flex items-center justify-center gap-2 rounded-full bg-[#22c55e] px-6 py-3 text-sm font-bold text-night shadow-lg shadow-[#22c55e]/30 transition-transform hover:-translate-y-0.5"
                >
                  <span aria-hidden="true" className="size-2 animate-pulse rounded-full bg-night" />
                  Try Voice AI free
                </a>
                <PillCta className="justify-between sm:justify-start">Book a call</PillCta>
              </div>

              <div className="mt-10 flex items-center gap-3">
                <span className="flex -space-x-2.5">
                  {CLIENTS.slice(0, 4).map((c) => (
                    <Image key={c} src={clientLogo(c)} alt="" width={120} height={100} className="size-9 rounded-full bg-white object-cover ring-2 ring-night" />
                  ))}
                </span>
                <span className="text-sm leading-snug text-white/55">
                  <span className="block font-semibold text-white">1,400 apps built</span>
                  bugs fixed in under 6 hours
                </span>
              </div>
            </div>

            {/* The flagship, live: Voice's own screen with a call in progress over it. */}
            <a href={VOICE_APP} aria-label={`Try ${PROJECTS.find((p) => p.slug === "voice")!.name}`} className="group relative mx-auto hidden h-[36rem] w-full max-w-md lg:block">
              <span aria-hidden="true" className="absolute inset-x-6 top-1/4 h-72 rounded-full bg-[#22c55e]/20 blur-3xl" />
              <span aria-hidden="true" className="absolute inset-x-16 top-1/3 h-64 rounded-full bg-electric/35 blur-3xl" />
              <Phone slug="voice" name="Voice" className="float absolute right-2 top-0 w-[54%] rotate-3 sm:right-4" />
              <span aria-hidden="true" className="absolute bottom-4 left-0 z-10 w-[78%] max-w-xs">
                <CallCard />
              </span>
              <span aria-hidden="true" className="absolute left-0 top-8 z-10 rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15 backdrop-blur-md">
                <span className="block font-display text-2xl font-bold text-white">8 lakh</span>
                <span className="block text-xs text-white/60">calls a day, at scale</span>
              </span>
            </a>
          </div>

          {/* Credentials and clients, scrolling. Text, not logos. */}
          <div className="relative border-t border-white/[0.07] py-6 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
            <ul className="marquee flex w-max items-center gap-12" aria-label="Clients and credentials">
              {[0, 1].flatMap((n) =>
                [...CLIENTS, ...CREDENTIALS.map((c) => `${c.k} · ${c.v}`)].map((c) => (
                  <li key={`${c}-${n}`} aria-hidden={n > 0 || undefined} className="whitespace-nowrap font-display text-lg font-bold tracking-tight text-white/35">
                    {c}
                  </li>
                )),
              )}
            </ul>
          </div>
        </section>

        {/* ── Voice: the flagship ── */}
        <section aria-labelledby="voice" className="px-3 pt-6 sm:px-5">
          <div className="relative mx-auto max-w-[96rem] overflow-hidden rounded-[2.5rem] bg-night ring-1 ring-[#22c55e]/25">
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(50%_45%_at_15%_0%,rgba(34,197,94,0.18),transparent_70%),radial-gradient(55%_50%_at_90%_10%,rgba(61,107,255,0.3),transparent_70%)]" />
            <div aria-hidden="true" className="night-grid absolute inset-0" />
            <div className={`${COL} relative py-14 sm:py-20 lg:py-28`}>
              <div className="mx-auto max-w-3xl text-center">
                <p className="inline-flex items-center gap-2 rounded-full bg-[#22c55e]/10 px-4 py-1.5 text-sm font-semibold text-[#4ade80] ring-1 ring-[#22c55e]/30">
                  <span aria-hidden="true" className="size-2 animate-pulse rounded-full bg-[#22c55e]" />
                  {`Our flagship · Voice by ${COMPANY.name}`}
                </p>
                <h2 id="voice" className="mt-6 text-4xl font-bold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
                  India&apos;s best <span className="text-gradient">conversational voice agent</span>
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
                  An AI phone employee for your business. Describe the job in plain words; it calls every new lead within
                  seconds, talks naturally in Telugu, Hindi or English, writes down what was said, and books the next step.
                </p>
                <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                  <a
                    href={VOICE_APP}
                    className="flex items-center justify-center gap-2 rounded-full bg-[#22c55e] px-8 py-4 text-base font-bold text-night shadow-xl shadow-[#22c55e]/30 transition-transform hover:-translate-y-0.5"
                  >
                    <span aria-hidden="true" className="size-2 animate-pulse rounded-full bg-night" />
                    Get a free demo call
                  </a>
                  <a href={VOICE_APP} className="rounded-full border border-white/15 px-8 py-4 text-center text-base font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5">
                    Start free — 10 minutes on us
                  </a>
                </div>
              </div>

              <dl className="mx-auto mt-10 grid max-w-4xl sm:mt-14 grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                {VOICE_STATS.map((v) => (
                  <div key={v.l} className="rounded-2xl bg-white/[0.05] p-5 text-center ring-1 ring-white/10">
                    <dt className="sr-only">{v.l}</dt>
                    <dd>
                      <p className="whitespace-nowrap font-display text-2xl font-bold text-white sm:text-4xl">{v.v}</p>
                      <p className="mt-1 text-xs leading-snug text-white/55 sm:text-sm">{v.l}</p>
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10 grid items-center gap-6 sm:mt-16 sm:gap-8 lg:grid-cols-[1fr_1.15fr]">
                <div className="mx-auto w-full max-w-md">
                  <CallCard large />
                </div>
                <ul className="grid grid-cols-2 gap-3 sm:gap-4">
                  {VOICE_FEATURES.map((f) => (
                    <li key={f.t} className="rounded-3xl bg-white/[0.04] p-4 ring-1 sm:p-6 ring-white/10 transition-colors hover:bg-white/[0.07]">
                      <span className="grid size-9 place-items-center rounded-xl bg-[#22c55e]/15 sm:size-11 sm:rounded-2xl text-[#4ade80]">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
                          <path d={f.icon} />
                        </svg>
                      </span>
                      <h3 className="mt-3 text-base font-bold leading-snug text-white sm:mt-4 sm:text-lg">{f.t}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-white/60 sm:text-sm">{f.d}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 flex flex-col items-center gap-4 border-t border-white/10 pt-8 text-center sm:mt-14 sm:gap-5 sm:pt-10">
                <p className="text-sm text-white/55">Built for</p>
                <ul className="flex flex-wrap justify-center gap-2">
                  {VOICE_USES.map((u) => (
                    <li key={u.t}>
                      <a href={u.href} className="block rounded-full bg-white/[0.06] px-3 py-1.5 text-xs text-white/80 ring-1 ring-white/10 transition-colors hover:bg-white/[0.12] hover:text-white sm:px-4 sm:py-2 sm:text-sm">
                        {u.t}
                      </a>
                    </li>
                  ))}
                </ul>
                <a href={VOICE_SEO.pricing.href} className="mt-2 text-sm font-semibold text-[#4ade80] hover:underline">
                  Prepaid, from ₹3.50 a minute — see AI voice agent pricing →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Proof ── */}
        <section aria-label="Track record">
          <dl className={`${COL} grid grid-cols-2 gap-y-8 py-12 sm:py-16 lg:grid-cols-4 lg:py-20`}>
            {PROOF.map((s) => (
              <div key={s.v} className="border-l border-line pl-5 lg:pl-8">
                <dt className="sr-only">{s.l}</dt>
                <dd>
                  <p className="whitespace-nowrap font-display text-[1.7rem] font-bold tracking-tight text-ink sm:text-5xl">{s.v}</p>
                  <p className="mt-2 max-w-[14rem] text-sm leading-snug text-ink-3">{s.l}</p>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Work ── */}
        <section aria-labelledby="work" className="bg-canvas">
          <div className={`${COL} py-14 sm:py-20 lg:py-28`}>
            <Heading
              id="work"
              eyebrow="Our work"
              title="Products we built, and still run"
              lead="Every one designed and engineered by this team, live today, and maintained by us."
              action={
                <Link href="/portfolio" className="shrink-0 text-sm font-semibold text-ink underline-offset-4 hover:underline">
                  See the full portfolio →
                </Link>
              }
            />
            <p className="mt-6 text-xs text-ink-4 md:hidden">Swipe to see more →</p>
            <ul className="-mx-5 mt-3 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:none] sm:mt-12 md:mx-0 md:grid md:auto-rows-[22rem] md:grid-cols-6 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
              {WORK.map((w, k) => {
                const p = project(w.slug);
                const big = k === 0;
                return (
                  <li key={w.slug} className={`h-[24rem] w-[82%] shrink-0 snap-center md:h-auto md:w-auto ${w.span}`}>
                    <Link href={p.href ?? "/portfolio"} className="group relative block h-full overflow-hidden rounded-[2rem] bg-night">
                      {w.bg ? (
                        <Image src={w.bg} alt="" fill sizes="(min-width: 768px) 66vw, 100vw" className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
                      ) : (
                        <span className="night-glow absolute inset-0" />
                      )}
                      <span className="absolute inset-0 bg-linear-to-r/srgb from-black/70 via-black/30 to-transparent" />
                      <Phone
                        slug={p.slug}
                        name={p.name}
                        className={`absolute right-6 rotate-6 transition-transform duration-500 group-hover:-translate-y-3 group-hover:rotate-3 ${
                          big ? "-bottom-32 w-32 md:-bottom-24 md:w-64" : "-bottom-32 w-32 md:-bottom-40 md:w-40"
                        }`}
                      />
                      <div className={`relative flex h-full flex-col p-6 sm:p-7 ${big ? "max-w-[64%] md:max-w-sm md:p-10" : "max-w-[64%]"}`}>
                        <p className="text-xs font-semibold uppercase tracking-wider text-white/55">{p.sector}</p>
                        <h3 className={`mt-2 font-bold text-white ${big ? "text-2xl md:text-4xl" : "text-2xl"}`}>{p.name}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-white/70 md:hidden">{p.summary.split(" — ")[0]}</p>
                        <p className={`mt-3 hidden text-sm leading-relaxed text-white/70 ${big ? "md:block" : "md:line-clamp-4"}`}>{p.summary}</p>
                        <span className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur transition-colors group-hover:bg-white group-hover:text-ink">
                          View project <span aria-hidden="true">↗</span>
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ── Services ── */}
        <section aria-labelledby="services">
          <div className={`${COL} py-14 sm:py-20 lg:py-28`}>
            <Heading
              id="services"
              eyebrow="Services"
              title="Everything a product needs, under one roof"
              lead={SERVICES.blurb}
              action={
                <Link href={SERVICES.base} className="shrink-0 text-sm font-semibold text-ink underline-offset-4 hover:underline">
                  {`All ${SERVICES.items.length} services →`}
                </Link>
              }
            />
            <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-3">
              {SERVICES.items.slice(0, 9).map((s, k) => (
                <li key={s.slug}>
                  <Link
                    href={`${SERVICES.base}/${s.slug}`}
                    className="group flex h-full flex-col gap-3 rounded-3xl p-4 ring-1 sm:flex-row sm:gap-5 sm:p-6 ring-black/[0.07] transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-canvas sm:size-14 transition-colors group-hover:bg-electric/10">
                      <Image src={serviceIcon(k)} alt="" width={120} height={130} className="h-9 w-auto" />
                    </span>
                    <span>
                      <span className="flex items-center gap-2 font-display text-[0.95rem] font-bold leading-snug text-ink sm:text-lg">
                        {s.name}
                        <span aria-hidden="true" className="text-electric opacity-0 transition-opacity group-hover:opacity-100">→</span>
                      </span>
                      <span className="mt-1 hidden text-sm leading-relaxed text-ink-3 sm:block">{s.tagline}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Process and guarantees ── */}
        <section aria-labelledby="process" className="px-3 sm:px-5">
          <div className="night-glow relative mx-auto max-w-[96rem] overflow-hidden rounded-[2.5rem]">
            <div aria-hidden="true" className="night-grid absolute inset-0" />
            <div className={`${COL} relative py-14 sm:py-20 lg:py-28`}>
              <Heading
                id="process"
                dark
                eyebrow="How it works"
                title="From a first call to software in your hands"
                lead="No long sales cycle. Three steps, and you know the price before anything is built."
              />
              <ol className="mt-10 grid gap-3 sm:mt-14 sm:gap-5 lg:grid-cols-3">
                {STEPS.map((s, k) => (
                  <li key={s.t} className="flex gap-4 rounded-3xl bg-white/[0.04] p-5 ring-1 ring-white/10 sm:block sm:p-8">
                    <p className="font-display text-3xl font-bold text-electric-2/80 sm:text-5xl">{String(k + 1).padStart(2, "0")}</p>
                    <div>
                    <h3 className="text-lg font-bold text-white sm:mt-6 sm:text-xl">{s.t}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/60 sm:mt-2">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <ul className="mt-8 grid gap-x-8 gap-y-3 border-t border-white/10 pt-8 sm:mt-10 sm:grid-cols-2 sm:gap-y-4 sm:pt-10 lg:grid-cols-3">
                {GUARANTEES.map((g) => (
                  <li key={g} className="flex items-center gap-3 text-sm text-white/80">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-electric/20 text-electric-2">
                      <Check className="size-3.5" />
                    </span>
                    {g}
                  </li>
                ))}
              </ul>
              <div className="mt-10 sm:mt-12">
                <PillCta>Reserve your slot</PillCta>
              </div>
            </div>
          </div>
        </section>

        {/* ── Problems we fix ── */}
        <section aria-labelledby="fixes">
          <div className={`${COL} py-14 sm:py-20 lg:py-28`}>
            <Heading id="fixes" eyebrow="Sounds familiar?" title="What growing businesses bring us" lead="Most briefs start with one of these. Each is something we fix for a living." />
            <ul className="mt-10 grid gap-px overflow-hidden rounded-3xl sm:mt-12 bg-line ring-1 ring-line md:grid-cols-2">
              {FIXES.map((x) => (
                <li key={x.p} className="bg-white p-5 sm:p-7">
                  <p className="flex items-center gap-2 text-sm text-ink-4">
                    <Cross className="size-3.5 text-[#dc2626]" />
                    <span className="line-through decoration-ink-4/40">{x.p}</span>
                  </p>
                  <p className="mt-2 flex items-start gap-2 font-display text-base font-bold leading-snug text-ink sm:mt-3 sm:text-lg">
                    <Check className="mt-1 size-4 shrink-0 text-electric" />
                    {x.f}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Comparison ── */}
        <section aria-labelledby="different" className="bg-canvas">
          <div className={`${COL} py-14 sm:py-20 lg:py-28`}>
            <Heading id="different" eyebrow="The comparison" title="The same build, three ways to get it done" />
            <ul className="mt-10 space-y-3 md:hidden">
              {COMPARE.map(([k, us, hire, agency]) => (
                <li key={k} className="rounded-2xl bg-white p-5 ring-1 ring-black/[0.07]">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-4">{k}</p>
                  <p className="mt-2 flex items-start gap-2 font-semibold text-ink">
                    <Check className="mt-1 size-4 shrink-0 text-electric" />
                    {`${COMPANY.name}: ${us}`}
                  </p>
                  <dl className="mt-3 grid grid-cols-2 gap-3 border-t border-line pt-3 text-xs">
                    {[["Hiring in-house", hire], ["Typical agency", agency]].map(([who, v]) => (
                      <div key={who}>
                        <dt className="text-ink-4">{who}</dt>
                        <dd className="mt-0.5 text-ink-2">{v.replace(/^\+/, "")}</dd>
                      </div>
                    ))}
                  </dl>
                </li>
              ))}
            </ul>
            <div className="mt-12 hidden overflow-x-auto rounded-3xl bg-white ring-1 ring-black/[0.07] md:block">
              <table className="w-full min-w-[44rem] text-left text-sm">
                <thead>
                  <tr>
                    <th className="p-6">
                      <span className="sr-only">Compared on</span>
                    </th>
                    <th className="bg-electric p-6 font-display text-base font-bold text-white">{COMPANY.name}</th>
                    <th className="p-6 font-semibold text-ink-3">Hiring in-house</th>
                    <th className="p-6 font-semibold text-ink-3">A typical agency</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map(([k, us, hire, agency]) => (
                    <tr key={k} className="border-t border-line">
                      <th scope="row" className="p-6 font-medium text-ink-2">{k}</th>
                      <td className="bg-electric/[0.06] p-6 font-medium text-ink">
                        <span className="flex items-start gap-2">
                          <Check className="mt-0.5 size-4 shrink-0 text-electric" />
                          {us}
                        </span>
                      </td>
                      {[hire, agency].map((v) => (
                        <td key={v} className="p-6 text-ink-3">
                          <span className="flex items-start gap-2">
                            {v.startsWith("+") ? (
                              <Check className="mt-0.5 size-4 shrink-0 text-[#16a34a]" />
                            ) : (
                              <Cross className="mt-0.5 size-4 shrink-0 text-ink-4" />
                            )}
                            {v.replace(/^\+/, "")}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section aria-labelledby="faq">
          <div className={`${COL} grid gap-12 py-20 lg:grid-cols-[1fr_1.4fr] lg:py-28`}>
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Heading id="faq" eyebrow="FAQs" title="Questions we hear most" />
              <p className="mt-5 text-ink-3">
                Something else on your mind?{" "}
                <a href={WA} className="font-semibold text-electric hover:underline">Ask us on WhatsApp</a>
                {` or call ${COMPANY.phone}.`}
              </p>
            </div>
            <Faq items={FAQS} />
          </div>
        </section>

        {/* ── Closing offer ── */}
        <section id="quote" className="px-3 pb-6 sm:px-5">
          <div className="night-glow relative mx-auto max-w-[96rem] overflow-hidden rounded-[2.5rem]">
            <div aria-hidden="true" className="night-grid absolute inset-0" />
            <div className={`${COL} relative grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-24`}>
              <div>
                <h2 className="text-4xl font-bold leading-[1.05] text-white sm:text-6xl">
                  Let&apos;s build what&apos;s <span className="text-gradient">next</span>.
                </h2>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/60">
                  {`Start with a ${DISCOVERY.title}: we work through what you need and hand you a written quotation. Or call ${COMPANY.phone}.`}
                </p>
              </div>
              <DiscoveryOffer dark />
            </div>
          </div>
        </section>

        {/* ── Long-form intro and locations ── */}
        <section>
          <div className={`${COL} py-16`}>
            <h2 className="text-2xl font-bold">{`${COMPANY.name} — mobile app, web and AI development in India`}</h2>
            <p className="mt-4 max-w-4xl leading-relaxed text-ink-3">
              {`${COMPANY.name} builds native iOS and Android apps where platform depth matters, and Flutter or React Native where one codebase across both stores is the right economics. Alongside apps we build websites that hold their speed under real traffic, design systems engineering can build exactly, and AI features measured before they ship — including our own product, `}
              <a href={VOICE_APP} className="font-semibold text-electric hover:underline">{voice.name}</a>
              , which calls leads in Telugu, Hindi and English.
            </p>
            <p className="mt-4 max-w-4xl leading-relaxed text-ink-3">
              Our engineers have worked at JPMorgan Chase, Google and Y Combinator-backed startups, and placed in the top
              0.17% at ACM ICPC. We work from Hyderabad with clients in India, the UAE, the UK, Europe and the US, and
              everything we build is handed over so your own team can run it.
            </p>
            <ul className="-mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0">
              {LOCATIONS.items.map((l) => (
                <li key={l.slug}>
                  <Link href={`${LOCATIONS.base}/${l.slug}`} className="block whitespace-nowrap rounded-full border border-line px-3.5 py-1.5 text-xs text-ink-2 hover:border-ink">
                    {`App development in ${l.name}`}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

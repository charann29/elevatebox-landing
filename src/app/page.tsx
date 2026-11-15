import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CATEGORIES,
  CLIENTS,
  COMPANY,
  HOME_STATS,
  CREDENTIALS,
  DISCOVERY,
  FAQS,
  PROJECTS,
  VOICE_APP,
  serviceIcon,
  OG_IMG,
} from "@/lib/content";
import { Header, Footer, PillCta } from "@/components/site";
import { DiscoveryOffer, Faq } from "@/components/blocks";
import { VoiceVideos } from "@/components/voice-videos";
import { CountUp } from "@/components/count-up";
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

const COL = "mx-auto w-[min(1216px,100%-32px)]";
const WA = `https://wa.me/${COMPANY.whatsapp.replace(/\D/g, "")}`;

const PROOF = [
  { v: "380+", l: "Apps built to date" },
  { v: "350+", l: "MSMEs served" },
  { v: "27+", l: "Partner institutions, including IIT Madras, IIT Delhi and BHU" },
  { v: "< 6 hrs", l: "To respond to any bug or problem" },
];

// Voice in numbers. The call volume is the figure the team quotes for the product.
const VOICE_STATS = [
  { v: "8 lakh", l: "Calls a day, at scale" },
  { v: "Seconds", l: "From a new lead to a call" },
  { v: "3", l: "Languages: Telugu, Hindi, English" },
  { v: "10 min", l: "Free when you sign up" },
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
        <p className="text-sm font-semibold text-navy">{eyebrow}</p>
        <h2 id={id} className={`mt-3 text-3xl font-semibold leading-[1.1] lg:text-[44px] ${dark ? "text-ink" : ""}`}>
          {title}
        </h2>
        {lead && <p className="mt-3.5 text-lg leading-relaxed text-ink-2">{lead}</p>}
      </div>
      {action}
    </div>
  );
}

// The hero fan: five live app screens, TRH360 in the middle with the green ring.
const FAN = [
  { src: "/assets/real-medibag.jpg", cls: "left-0 rotate-[-14deg] translate-y-[60px]" },
  { src: "/assets/real-vamshi-farms.jpg", cls: "left-[110px] rotate-[-7deg] translate-y-[10px] lg:left-[200px]" },
  { src: "/assets/trh-app.webp", cls: "left-[230px] z-[2] !w-[140px] -translate-y-[30px] !shadow-[0_0_0_3px_#22c55e,0_50px_90px_-30px_rgba(0,0,0,0.7)] lg:left-[440px] lg:!w-[240px]", centre: true },
  { src: "/assets/real-oneasy.jpg", cls: "right-[110px] rotate-[7deg] translate-y-[10px] lg:right-[200px]" },
  { src: "/assets/autopilot-app.webp", cls: "right-0 rotate-[14deg] translate-y-[60px]" },
];

// Client logos for the two marquee rows: [file in /assets/clients, name, height at 320 wide].
const CLIENT_ROWS: [string, string, number][][] = [
  [["hi-cont2", "Continental Hospitals", 186], ["hi-medicover", "Medicover Hospitals", 200], ["hi-trh360", "TRH360", 88], ["joy", "Joy Hospitals", 178], ["bajaj", "Bajaj Electronics", 183], ["sumantv", "Suman TV", 318]],
  [["hi-mokobara", "Mokobara", 57], ["oneasy", "OnEasy", 93], ["n-8meds", "8Meds", 112], ["n-triq1", "TriQ Pharma", 152], ["vamshi", "Vamshi Farms", 320], ["haritha", "Haritha Wellness", 162]],
];

/** One row of logo tiles, the list twice so the loop is seamless. Pauses on hover; still under reduced motion. */
function LogoRow({ logos, reverse, className = "" }: { logos: [string, string, number][]; reverse?: boolean; className?: string }) {
  return (
    <div className={`mq ${reverse ? "mq-rev" : ""} ${className}`}>
      <ul className="mq-t">
        {[0, 1].flatMap((n) =>
          logos.map(([src, alt, h]) => (
            <li key={`${src}-${n}`} aria-hidden={n > 0 || undefined} className="grid h-[76px] w-[150px] shrink-0 place-items-center rounded-2xl border border-line bg-white px-[22px] py-3.5 lg:h-24 lg:w-[200px]">
              <Image src={`/assets/clients/${src}.png`} alt={n > 0 ? "" : alt} width={320} height={h} className="max-h-[52px] w-auto max-w-full object-contain" />
            </li>
          )),
        )}
      </ul>
    </div>
  );
}

const CASES = [
  {
    name: "TRH360",
    logo: "/assets/clients/hi-trh360.png",
    lh: 88,
    tag: "Healthcare",
    h: "A complete digital hospital in one app",
    p: "Care was split across separate touchpoints, and every patient enquiry depended on someone making a manual call.",
    imp: "The entire patient journey, from booking to follow-up, lives in one app. Every enquiry gets a call back.",
  },
  {
    name: "OnEasy",
    logo: "/assets/clients/oneasy.png",
    lh: 93,
    tag: "Professional services",
    h: "A CA practice, rebuilt as a platform",
    p: "Client work, documents and recurring filings ran across people and spreadsheets, a model that could not scale.",
    imp: "The practice operates as a platform. Clients self-serve their status, and recurring filings run on schedule.",
  },
];

const FOUNDER_CREDS = [
  { src: "/assets/creds/google.png", alt: "Google", h: 108, l: "Associate Product Manager" },
  { src: "/assets/creds/zomato2.png", alt: "Zomato", h: 68, l: "Developer" },
  { src: "/assets/creds/yc.png", alt: "Y Combinator", h: 320, l: "Two YC-funded startups" },
  { src: "/assets/edu/iitm.png", alt: "IIT Madras", h: 320, l: "Studied" },
];

const QUOTES = [
  { q: "ElevateBox isn't just another trainer: it's an ecosystem partner. They set up hands-on innovation labs, curated coding fellowships and industry linkages that made our students startup-ready.", who: "Dr. Madhu Mutyam", role: "HoD, Computer Science, IIT Madras", logo: "/assets/edu/iitm.png" },
  { q: "ElevateBox has helped us reimagine what engineering education can look like when creativity meets structured mentorship.", who: "Prof. Ajit Kumar Chaturvedi", role: "Vice-Chancellor, BHU", logo: "/assets/edu/edu-bhu.png" },
  { q: "ElevateBox workshops helped me evolve from a traditional instructor to an innovation facilitator.", who: "Dr. Neha Agarwal", role: "Associate Professor, IIT Delhi", logo: "/assets/edu/edu-iitd.png" },
];

const EDU: [string, string][] = [
  ["edu-iitg", "IIT Guwahati"], ["edu-iitd", "IIT Delhi"], ["iitm", "IIT Madras"], ["edu-bits", "BITS Goa"], ["edu-bhu", "BHU"], ["vnr", "VNR VJIET"],
  ["edu-gnits", "GNITS"], ["edu-cmr-emblem", "CMR"], ["edu-mgit-emblem", "MGIT"], ["edu-lpu", "LPU"], ["edu-uoh-emblem", "University of Hyderabad"],
];

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

        {/* ── Hero: the 3D band, headline and the fan of live app screens ── */}
        <section className="hero-3d overflow-hidden px-4 pt-12 text-center lg:h-[740px] lg:pt-[64px]">
          <a href={VOICE_APP} className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 py-1.5 pl-1.5 pr-4 text-left text-sm text-white">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-live px-2.5 py-1 text-[11px] font-bold text-[#04210f]">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-[#04210f]" />
              NEW
            </span>
            Voice AI calls your leads in Telugu, Hindi and English
          </a>
          <h1 className="mx-auto mt-6 max-w-3xl text-base font-medium text-electric-2 sm:text-lg">
            Mobile App &amp; AI Development Company in <span className="text-white">Hyderabad</span>
          </h1>
          <p className="mx-auto mt-3 max-w-[15ch] text-[40px] font-[700] leading-[1.04] tracking-[-0.03em] text-white lg:text-[68px]">
            We build apps people <span className="text-gradient">actually use</span>
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/book" className="inline-flex h-[52px] items-center rounded-full bg-white px-[26px] text-base font-semibold text-navy hover:bg-sky">
              Get quote now
            </Link>
            <a href={VOICE_APP} className="inline-flex h-[52px] items-center gap-2 rounded-full px-[26px] text-base font-semibold text-white ring-[1.5px] ring-inset ring-white hover:bg-white/10">
              <span aria-hidden="true" className="size-2 rounded-full bg-live" />
              Try Voice AI free
            </a>
          </div>
          <p className="mt-5 text-sm text-white/70">
            <b className="font-semibold text-white">380+ apps built</b> · bugs fixed in under 6 hours
          </p>
          <div aria-hidden="true" className="relative -mb-[110px] mt-20 h-[330px] w-[600px] max-w-none -translate-x-1/2 left-1/2 lg:absolute lg:bottom-0 lg:mt-0 lg:h-[520px] lg:w-[1100px] lg:origin-bottom lg:scale-[0.65]">
            {FAN.map((f) => (
              <span key={f.src} className={`absolute bottom-0 block w-[130px] rounded-[30px] bg-[#0A1024] p-1.5 shadow-[0_40px_80px_-30px_rgba(1,20,70,0.55),0_0_0_1px_rgba(255,255,255,0.08)] lg:w-[220px] ${f.cls}`}>
                <Image src={f.src} alt="" width={520} height={1126} className="w-full rounded-[24px]" priority={f.centre} />
              </span>
            ))}
          </div>
        </section>

        {/* ── What we do, in one line: moved out of the hero so the phones have room ── */}
        <section aria-label="About ElevateBox" className="border-b border-line bg-white py-12 lg:py-16">
          <p className={`${COL} max-w-4xl text-center text-xl leading-relaxed text-ink-2 lg:text-2xl`}>
            We&apos;re a{" "}
            <Link href="/mobile-app-development-company-hyderabad" className="font-semibold text-navy underline decoration-navy/30 underline-offset-4 hover:decoration-navy">
              mobile app development company in Hyderabad
            </Link>
            , taking startups and growing businesses from idea to a product people use: design, engineering, launch, and
            the maintenance afterwards.
          </p>
        </section>

        {/* ── Clients: two logo rows moving opposite ways ── */}
        <section aria-labelledby="clients" className="bg-white py-16 lg:pb-[88px] lg:pt-20">
          <div className={COL}>
            <h2 id="clients" className="max-w-[20ch] text-3xl font-semibold leading-[1.1] lg:text-[44px]">Trusted by hospitals, brands and MSMEs</h2>
            <p className="mt-3.5 max-w-[42em] text-lg leading-relaxed text-ink-2">175+ organisations across healthcare, commerce, media, real estate and public life.</p>
            <LogoRow logos={CLIENT_ROWS[0]} className="mt-10" />
            <LogoRow logos={CLIENT_ROWS[1]} className="mt-4" reverse />
            {/* Credentials and clients, scrolling. Text, not logos. */}
            <div className="mq mt-8 border-t border-line pt-6">
              <ul className="marquee flex w-max items-center gap-12" aria-label="Clients and credentials">
                {[0, 1].flatMap((n) =>
                  [...CLIENTS, ...CREDENTIALS.map((c) => `${c.k} · ${c.v}`)].map((c) => (
                    <li key={`${c}-${n}`} aria-hidden={n > 0 || undefined} className="whitespace-nowrap text-base font-semibold text-ink-3">
                      {c}
                    </li>
                  )),
                )}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Numbers ── */}
        <section aria-label="ElevateBox in numbers" className="bg-white pb-16 lg:pb-20">
          <dl className={`${COL} grid grid-cols-2 gap-y-7 rounded-[28px] bg-deep px-6 py-10 text-white lg:grid-cols-4 lg:px-12 lg:py-14`}>
            {HOME_STATS.map((s, k) => (
              <div key={s.l} className={`px-4 lg:px-7 ${k % 2 ? "border-l border-white/20" : ""} ${k === 2 ? "lg:border-l lg:border-white/20" : ""} ${k === 0 || k === 2 ? "pl-0 lg:pl-0" : ""} ${k === 2 ? "lg:pl-7" : ""}`}>
                <dt className="sr-only">{s.l}</dt>
                <dd>
                  <p className="text-[44px] font-light leading-none tracking-[-0.02em] lg:text-[72px]">
                    <CountUp value={s.v} />
                    <span className="text-amber">+</span>
                  </p>
                  <p className="mt-2.5 text-base text-white/75">{s.l}</p>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Voice: the flagship ── */}
        <section aria-labelledby="voice" className="bg-night">
          <div className="relative overflow-hidden">
            <div className={`${COL} relative py-14 sm:py-20 lg:py-28`}>
              <div className="mx-auto max-w-3xl text-center">
                <p className="inline-flex items-center gap-2 rounded-full bg-[#22c55e]/10 px-4 py-1.5 text-sm font-semibold text-[#4ade80] ring-1 ring-[#22c55e]/30">
                  <span aria-hidden="true" className="size-2 animate-pulse rounded-full bg-[#22c55e]" />
                  {`Our flagship · Roopa by ${COMPANY.name}`}
                </p>
                <h2 id="voice" className="mt-6 text-4xl font-semibold leading-[1.04] text-white sm:text-6xl">
                  India&apos;s best <span className="text-gradient">conversational voice agent</span>
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
                  An AI phone employee for your business. Describe the job in plain words; it calls every new lead within
                  seconds, talks naturally in Telugu, Hindi or English, writes down what was said, and books the next step.
                </p>
                <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                  <a
                    href={VOICE_APP}
                    className="flex items-center justify-center gap-2 rounded-full bg-[#22c55e] px-8 py-4 text-base font-semibold text-[#04210f] transition-colors hover:bg-[#16a34a]"
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

              <VoiceVideos />

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
                  <p className="whitespace-nowrap text-[1.7rem] font-semibold tracking-tight text-ink sm:text-4xl lg:text-[2.6rem]">{s.v}</p>
                  <p className="mt-2 max-w-[14rem] text-sm leading-snug text-ink-3">{s.l}</p>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Proof, not promises: two client stories ── */}
        <section aria-labelledby="proof" className="bg-canvas py-16 lg:py-24">
          <div className={COL}>
            <h2 id="proof" className="text-3xl font-semibold leading-[1.1] lg:text-[44px]">Proof, not promises</h2>
            <p className="mt-3.5 max-w-[42em] text-lg leading-relaxed text-ink-2">We re-engineer how businesses run, so people do the work only people can do.</p>
            <div className="mt-11 grid gap-5 md:grid-cols-2">
              {CASES.map((c) => (
                <article key={c.h} className="flex flex-col gap-4 rounded-3xl border border-line bg-white p-6 lg:p-[30px]">
                  <span className="grid h-16 w-[180px] place-items-center rounded-[14px] border border-line p-2.5">
                    <Image src={c.logo} alt={c.name} width={320} height={c.lh} className="max-h-10 w-auto" />
                  </span>
                  <span className="self-start rounded-full bg-sky px-3 py-1 text-xs font-semibold text-navy">{c.tag}</span>
                  <h3 className="text-[26px] font-semibold leading-tight">{c.h}</h3>
                  <p className="leading-relaxed text-ink-2">{c.p}</p>
                  <p className="rounded-2xl bg-navy px-5 py-4 font-medium leading-normal text-white">{c.imp}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Work ── */}
        <section aria-labelledby="work">
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
        <section aria-labelledby="services" className="bg-canvas">
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
                    className="group flex h-full flex-col gap-3 rounded-3xl border border-line bg-white p-4 transition-colors duration-300 hover:border-navy/30 sm:flex-row sm:gap-5 sm:p-6"
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

        {/* ── Founder ── */}
        <section aria-labelledby="founder" className="py-16 lg:py-24">
          <div className={`${COL} grid items-center gap-7 lg:grid-cols-[380px_1fr] lg:gap-14`}>
            <figure className="overflow-hidden rounded-3xl bg-[#7E1F2C]">
              <Image src="/assets/founder.jpg" alt="Sai Charan L" width={680} height={850} className="w-full" />
              <figcaption className="px-[22px] pb-5 pt-4 text-white">
                <b className="block text-xl font-semibold">Sai Charan L</b>
                <small className="text-sm text-white/75">{`Founder, ${COMPANY.name}, Hyderabad`}</small>
              </figcaption>
            </figure>
            <div>
              <h2 id="founder" className="max-w-[20ch] text-3xl font-semibold leading-[1.1] lg:text-[44px]">Built by product people, for business owners</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-2 [&_b]:font-semibold [&_b]:text-ink">
                Sai Charan L has worked as an Associate Product Manager at <b>Google</b>, a developer at <b>Zomato</b>, at <b>HackerRank</b> and the AI startup <b>SuperU</b>, and as founding engineer at <b>ICOM</b>, alongside two <b>Y Combinator</b>-backed startups. He studied at <b>IIT Madras</b> and was selected for the <b>ISB Young Leaders Programme</b>. He grew ElevateBox from a first batch of 600 students into the technology company it is today.
              </p>
              <ul className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {FOUNDER_CREDS.map((c) => (
                  <li key={c.alt} className="rounded-2xl border border-line p-4 text-center">
                    <Image src={c.src} alt={c.alt} width={320} height={c.h} className="mx-auto h-[34px] w-[120px] object-contain" />
                    <small className="mt-2.5 block text-[13px] text-ink-2">{c.l}</small>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Process and guarantees ── */}
        <section aria-labelledby="process" className="px-3 sm:px-5">
          <div className="light-glow relative mx-auto max-w-[96rem] overflow-hidden rounded-[2.5rem]">
            <div aria-hidden="true" className="light-grid absolute inset-0" />
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
                  <li key={s.t} className="flex gap-4 rounded-3xl bg-white p-5 ring-1 ring-brand/10 sm:block sm:p-8">
                    <p className="font-display text-3xl font-bold text-electric/80 sm:text-5xl">{String(k + 1).padStart(2, "0")}</p>
                    <div>
                    <h3 className="text-lg font-bold text-ink sm:mt-6 sm:text-xl">{s.t}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-2 sm:mt-2">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <ul className="mt-8 grid gap-x-8 gap-y-3 border-t border-brand/10 pt-8 sm:mt-10 sm:grid-cols-2 sm:gap-y-4 sm:pt-10 lg:grid-cols-3">
                {GUARANTEES.map((g) => (
                  <li key={g} className="flex items-center gap-3 text-sm text-ink-2">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-electric/15 text-electric">
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

        {/* ── In their words: institutions we train with ── */}
        <section aria-labelledby="words" className="bg-night-2 py-16 text-white lg:py-24">
          <div className={COL}>
            <h2 id="words" className="text-3xl font-semibold leading-[1.1] text-white lg:text-[44px]">In their words</h2>
            <p className="mt-3.5 max-w-[42em] text-lg leading-relaxed text-white/70">Leaders from the institutions where we&apos;ve trained 28,000+ students.</p>
            <div className="mt-11 grid gap-5 lg:grid-cols-[1.3fr_1fr_1fr]">
              {QUOTES.map((q, k) => (
                <figure key={q.who} className="flex flex-col justify-between gap-6 rounded-3xl bg-night-3 p-6 lg:p-[30px]">
                  <blockquote className={k === 0 ? "text-[22px] font-light leading-normal lg:text-2xl" : "text-[19px] leading-normal"}>{`“${q.q}”`}</blockquote>
                  <figcaption className="flex items-center gap-3.5">
                    <span className="grid size-[52px] shrink-0 place-items-center rounded-xl bg-white">
                      <Image src={q.logo} alt="" width={128} height={128} className="max-h-10 w-auto" />
                    </span>
                    <span>
                      <b className="block text-[15px] font-semibold">{q.who}</b>
                      <small className="text-[13px] text-white/65">{q.role}</small>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="mt-11 flex flex-wrap items-center gap-6 border-t border-white/15 pt-8 lg:flex-nowrap">
              <p className="shrink-0 text-[15px] text-white/75">
                <b className="block text-[28px] font-semibold text-white">27+ institutions</b>
                28,000+ students trained
              </p>
              <div className="mq min-w-0 basis-full lg:basis-auto lg:flex-1">
                <ul className="mq-t [animation-duration:30s]">
                  {[0, 1].flatMap((n) =>
                    EDU.map(([src, alt]) => (
                      <li key={`${src}-${n}`} aria-hidden={n > 0 || undefined} className="grid size-[58px] shrink-0 place-items-center rounded-[14px] bg-white">
                        <Image src={`/assets/edu/${src}.png`} alt={n > 0 ? "" : alt} width={128} height={128} className="max-h-11 max-w-11 object-contain" />
                      </li>
                    )),
                  )}
                </ul>
              </div>
            </div>
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
          <div className="light-glow relative mx-auto max-w-[96rem] overflow-hidden rounded-[2.5rem]">
            <div aria-hidden="true" className="light-grid absolute inset-0" />
            <div className={`${COL} relative grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-24`}>
              <div>
                <h2 className="text-4xl font-bold leading-[1.05] text-ink sm:text-6xl">
                  Let&apos;s build what&apos;s <span className="text-gradient">next</span>.
                </h2>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-2">
                  {`Start with a ${DISCOVERY.title}: we work through what you need and hand you a written quotation. Or call ${COMPANY.phone}.`}
                </p>
              </div>
              <DiscoveryOffer />
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
              Our founder has worked at Google, Zomato, HackerRank and two Y Combinator-backed startups. We work from Hyderabad with clients in India, the UAE, the UK, Europe and the US, and
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
        {/* ── The paid first step, as a closing band ── */}
        <section aria-labelledby="start" className="bg-navy py-[72px] text-white">
          <div className={`${COL} flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center`}>
            <div>
              <h2 id="start" className="max-w-[20ch] text-3xl font-semibold leading-[1.15] text-white lg:text-[40px]">Start with a ₹3,500 requirement analysis</h2>
              <p className="mt-2.5 text-[17px] text-white/75">A written quotation and timeline before you commit to anything.</p>
            </div>
            <Link href="/book" className="inline-flex h-[52px] shrink-0 items-center rounded-full bg-amber px-[26px] text-base font-semibold text-amber-ink hover:bg-[#ffbf47]">
              Get quote now
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

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
  { v: `${PROJECTS.length}`, l: "Products live, and still maintained by us" },
  { v: "AIR 14", l: "ACM ICPC — top 0.17% of 8,000+ competitors" },
  { v: "120s → 7s", l: "A core API we sped up at JPMorgan Chase" },
  { v: "2 weeks", l: "Between releases you can click and test" },
];

// Voice in numbers. The call volume is the figure the team quotes for the product.
const VOICE_STATS = [
  { v: "8 lakh", l: "Calls a day, at scale" },
  { v: "3", l: "Languages: Telugu, Hindi, English" },
  { v: "Seconds", l: "From a new lead to a call" },
];

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
  "Live every two weeks",
  "Same team after launch",
];

// A leading "+" marks a cell that is good news for that route too.
const COMPARE: [string, string, string, string][] = [
  ["Time to start", "Within two weeks", "Months to hire", "Weeks of sales calls"],
  ["Who owns the code", "You, from day one", "+You", "Often handed over at the end"],
  ["Pricing", "Paid analysis, then a written quote", "Salaries, whether busy or not", "A guess that grows"],
  ["Range of skills", "Design, apps, web, cloud, AI", "Whoever you managed to hire", "Depends on the team you get"],
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
        {lead && <p className={`mt-4 text-lg leading-relaxed ${dark ? "text-white/60" : "text-ink-3"}`}>{lead}</p>}
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
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1.5 pl-2 pr-3 text-xs text-white/80 transition-colors hover:border-white/30"
              >
                <span className="rounded-full bg-[#22c55e]/15 px-2 py-0.5 font-semibold text-[#4ade80]">New</span>
                Voice — India&apos;s best conversational voice agent
                <span aria-hidden="true">→</span>
              </a>
              <h1 className="mt-7 text-[2.6rem] font-bold leading-[1.02] text-white sm:text-6xl lg:text-[4.4rem]">
                Mobile App &amp; AI Development Company in <span className="text-gradient">Hyderabad</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/65">
                We take startups and growing businesses from idea to a product people use: design, engineering, launch,
                and the maintenance afterwards. The team that quotes it is the team that builds it.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <PillCta className="justify-between sm:justify-start">Book a call</PillCta>
                <a
                  href={WA}
                  className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
                >
                  WhatsApp us
                </a>
              </div>

              <div className="mt-10 flex items-center gap-3">
                <span className="flex -space-x-2.5">
                  {CLIENTS.slice(0, 4).map((c) => (
                    <Image key={c} src={clientLogo(c)} alt="" width={120} height={100} className="size-9 rounded-full bg-white object-cover ring-2 ring-night" />
                  ))}
                </span>
                <span className="text-sm leading-snug text-white/55">
                  <span className="block font-semibold text-white">{`${PROJECTS.length} products live`}</span>
                  built and still maintained by us
                </span>
              </div>
            </div>

            {/* Three live app screens, fanned. */}
            <div aria-hidden="true" className="relative mx-auto h-[26rem] w-full max-w-md sm:h-[34rem]">
              <div className="absolute inset-x-8 top-1/3 h-64 rounded-full bg-electric/30 blur-3xl" />
              <Phone slug="8meds" name="8Meds" className="float absolute left-0 top-16 w-[38%] -rotate-[10deg] [animation-delay:-2s]" />
              <Phone slug="vamshi-farms" name="Vamshi Farms" className="float absolute right-0 top-16 w-[38%] rotate-[10deg] [animation-delay:-4s]" />
              <Phone slug="voice" name="Voice" className="float absolute left-1/2 top-0 z-10 w-[46%] -translate-x-1/2" />
              <div className="absolute -left-2 bottom-6 z-20 rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15 backdrop-blur-md sm:-left-8">
                <p className="font-display text-xl font-bold text-white">120s → 7s</p>
                <p className="text-xs text-white/60">API we sped up at JPMorgan</p>
              </div>
              <div className="absolute -right-2 bottom-20 z-20 rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15 backdrop-blur-md sm:-right-6">
                <p className="font-display text-xl font-bold text-white">AIR 14</p>
                <p className="text-xs text-white/60">ACM ICPC</p>
              </div>
            </div>
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

        {/* ── Voice spotlight: our own product ── */}
        <section aria-labelledby="voice" className="px-3 pt-6 sm:px-5">
          <div className="night-glow relative mx-auto max-w-[96rem] overflow-hidden rounded-[2.5rem] ring-1 ring-electric/30">
            <div aria-hidden="true" className="night-grid absolute inset-0" />
            <div className={`${COL} relative grid items-center gap-12 py-16 lg:grid-cols-[1.2fr_1fr] lg:py-20`}>
              <div>
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#4ade80]">
                  <span aria-hidden="true" className="size-2 animate-pulse rounded-full bg-[#22c55e]" />
                  Our product · Voice by {COMPANY.name}
                </p>
                <h2 id="voice" className="mt-4 text-4xl font-bold leading-[1.05] text-white sm:text-6xl">
                  India&apos;s best <span className="text-gradient">conversational voice agent</span>
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/65">
                  AI phone employees that call every new lead within seconds, talk naturally in Telugu, Hindi or English,
                  write down what was said, and book the next step.
                </p>
                <dl className="mt-8 grid max-w-xl grid-cols-3 gap-2 sm:gap-4">
                  {VOICE_STATS.map((v) => (
                    <div key={v.l} className="rounded-2xl bg-white/[0.05] p-3 ring-1 ring-white/10 sm:p-4">
                      <dt className="sr-only">{v.l}</dt>
                      <dd>
                        <p className="whitespace-nowrap font-display text-lg font-bold text-white sm:text-3xl">{v.v}</p>
                        <p className="mt-1 text-xs leading-snug text-white/55">{v.l}</p>
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <PillCta href={VOICE_APP}>Try Voice free</PillCta>
                  <a href={VOICE_APP} className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5">
                    Hear a demo call
                  </a>
                </div>
              </div>
              <a href={VOICE_APP} aria-label={`Open ${voice.name}`} className="relative mx-auto block w-56 sm:w-64">
                <span aria-hidden="true" className="absolute inset-0 rounded-full bg-electric/40 blur-3xl" />
                <Phone slug="voice" name={voice.name} className="float relative" />
              </a>
            </div>
          </div>
        </section>

        {/* ── Proof ── */}
        <section aria-label="Track record">
          <dl className={`${COL} grid grid-cols-2 gap-y-10 py-16 lg:grid-cols-4 lg:py-20`}>
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
          <div className={`${COL} py-20 lg:py-28`}>
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
            <ul className="mt-12 grid auto-rows-[22rem] gap-5 md:grid-cols-6">
              {WORK.map((w, k) => {
                const p = project(w.slug);
                const big = k === 0;
                return (
                  <li key={w.slug} className={w.span}>
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
                          big ? "-bottom-40 w-40 md:-bottom-24 md:w-64" : "-bottom-40 w-40"
                        }`}
                      />
                      <div className={`relative flex h-full flex-col p-7 ${big ? "max-w-[60%] sm:max-w-sm sm:p-10" : "max-w-[60%]"}`}>
                        <p className="text-xs font-semibold uppercase tracking-wider text-white/55">{p.sector}</p>
                        <h3 className={`mt-2 font-bold text-white ${big ? "text-3xl sm:text-4xl" : "text-2xl"}`}>{p.name}</h3>
                        <p className={`mt-3 text-sm leading-relaxed text-white/70 ${big ? "" : "line-clamp-4"}`}>{p.summary}</p>
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
          <div className={`${COL} py-20 lg:py-28`}>
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
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.items.slice(0, 9).map((s, k) => (
                <li key={s.slug}>
                  <Link
                    href={`${SERVICES.base}/${s.slug}`}
                    className="group flex h-full gap-5 rounded-3xl p-6 ring-1 ring-black/[0.07] transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
                  >
                    <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-canvas transition-colors group-hover:bg-electric/10">
                      <Image src={serviceIcon(k)} alt="" width={120} height={130} className="h-9 w-auto" />
                    </span>
                    <span>
                      <span className="flex items-center gap-2 font-display text-lg font-bold text-ink">
                        {s.name}
                        <span aria-hidden="true" className="text-electric opacity-0 transition-opacity group-hover:opacity-100">→</span>
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-ink-3">{s.tagline}</span>
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
            <div className={`${COL} relative py-20 lg:py-28`}>
              <Heading
                id="process"
                dark
                eyebrow="How it works"
                title="From a first call to software in your hands"
                lead="No long sales cycle. Three steps, and you know the price before anything is built."
              />
              <ol className="mt-14 grid gap-5 lg:grid-cols-3">
                {STEPS.map((s, k) => (
                  <li key={s.t} className="rounded-3xl bg-white/[0.04] p-8 ring-1 ring-white/10">
                    <p className="font-display text-5xl font-bold text-electric-2/80">{String(k + 1).padStart(2, "0")}</p>
                    <h3 className="mt-6 text-xl font-bold text-white">{s.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{s.d}</p>
                  </li>
                ))}
              </ol>
              <ul className="mt-10 grid gap-x-8 gap-y-4 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-3">
                {GUARANTEES.map((g) => (
                  <li key={g} className="flex items-center gap-3 text-sm text-white/80">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-electric/20 text-electric-2">
                      <Check className="size-3.5" />
                    </span>
                    {g}
                  </li>
                ))}
              </ul>
              <div className="mt-12">
                <PillCta>Reserve your slot</PillCta>
              </div>
            </div>
          </div>
        </section>

        {/* ── Problems we fix ── */}
        <section aria-labelledby="fixes">
          <div className={`${COL} py-20 lg:py-28`}>
            <Heading id="fixes" eyebrow="Sounds familiar?" title="What growing businesses bring us" lead="Most briefs start with one of these. Each is something we fix for a living." />
            <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-line ring-1 ring-line md:grid-cols-2">
              {FIXES.map((x) => (
                <li key={x.p} className="bg-white p-7">
                  <p className="flex items-center gap-2 text-sm text-ink-4">
                    <Cross className="size-3.5 text-[#dc2626]" />
                    <span className="line-through decoration-ink-4/40">{x.p}</span>
                  </p>
                  <p className="mt-3 flex items-start gap-2 font-display text-lg font-bold leading-snug text-ink">
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
          <div className={`${COL} py-20 lg:py-28`}>
            <Heading id="different" eyebrow="The comparison" title="The same build, three ways to get it done" />
            <div className="mt-12 overflow-x-auto rounded-3xl bg-white ring-1 ring-black/[0.07]">
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
            <ul className="mt-8 flex flex-wrap gap-2">
              {LOCATIONS.items.map((l) => (
                <li key={l.slug}>
                  <Link href={`${LOCATIONS.base}/${l.slug}`} className="block rounded-full border border-line px-3.5 py-1.5 text-xs text-ink-2 hover:border-ink">
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

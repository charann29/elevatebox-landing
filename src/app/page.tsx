import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CATEGORIES,
  CLIENTS,
  COMPANY,
  CREDENTIALS,
  FAQS,
  PROJECTS,
  STATS,
  VOICE_APP,
  projectImg,
  serviceIcon,
  OG_IMG,
} from "@/lib/content";
import { Header, Footer, PillCta } from "@/components/site";
import { QuoteForm } from "@/components/blocks";
import { JsonLd, ORG, faqPage, ld } from "@/lib/schema";

export const metadata: Metadata = {
  title: `${COMPANY.name} — Mobile App, Web & AI Development Company in Hyderabad`,
  description:
    "Mobile app, web and AI development company in Hyderabad. Fixed-scope discovery, two-week releases, code in your name, and our own AI calling product, Voice.",
  alternates: { canonical: "/" },
  openGraph: {
    images: [OG_IMG],
    title: `${COMPANY.name} — Mobile App, Web & AI Development Company in Hyderabad`,
    description: "Mobile apps, websites and AI products, built in Hyderabad and kept running after launch.",
    url: "/",
    type: "website",
  },
};

// One centred column, framed by dashed guides, like the grid of a design file.
const COL = "mx-auto w-full max-w-6xl px-5 lg:px-8";

const CHALLENGES = [
  { t: "An outdated digital presence", d: "A slow site or a dated app turns customers away before they ever call." },
  { t: "No technical team in-house", d: "Hiring engineers is slow and costly, and one hire cannot cover design, apps and cloud." },
  { t: "Manual, repetitive work", d: "Data copied between tools by hand, leads followed up late, reports built every Monday." },
  { t: "Agencies that disappear", d: "The site launches, the invoice is paid, and nobody answers when something breaks." },
  { t: "Estimates that keep growing", d: "A quote that was a guess, a scope that drifts, and a bill that drifts with it." },
  { t: "AI without a business case", d: "Pilots that impress in a demo and save nobody any time in practice." },
];

const GUARANTEES = [
  { t: "Code in your name", d: "Repository, cloud and credentials are yours from the first commit.", icon: "M4 7h16M4 12h16M4 17h10" },
  { t: "Fixed discovery price", d: "Scope and price agreed before the build starts.", icon: "M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" },
  { t: "Live every two weeks", d: "Increments on a real environment, not a slide deck.", icon: "M5 12l5 5L20 7" },
  { t: "Confidential, with an NDA", d: "Signed before the first workshop, on your paper or ours.", icon: "M7 11V7a5 5 0 0 1 10 0v4M5 11h14v10H5z" },
  { t: "A reply within one day", d: "Every new brief gets a real answer by the next working day.", icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" },
  { t: "Still here after launch", d: "One team from the first workshop to the support afterwards.", icon: "M12 8v4l3 3M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" },
];

const STEPS = [
  { n: "Step 1", t: "Tell us the goal", d: "A 30-minute call, or a rough brief on WhatsApp. Within a working day you get scope questions and an honest range." },
  { n: "Step 2", t: "Fixed-price discovery", d: "We map users, flows and risks, then agree scope and price in writing before anything is built." },
  { n: "Step 3", t: "Watch it come to life", d: "Something you can click every two weeks, a written update every week, and launch with monitoring already in." },
];

// Three columns of an honest comparison: what each route usually means.
// A leading "+" marks a cell that is good news for that route too.
const COMPARE: [string, string, string, string][] = [
  ["Time to start", "Within two weeks", "Months to hire", "Weeks of sales calls"],
  ["Who owns the code", "You, from day one", "+You", "Often handed over at the end"],
  ["Pricing", "Fixed discovery, then agreed", "Salaries, whether busy or not", "A guess that grows"],
  ["Range of skills", "Design, apps, web, cloud, AI", "Whoever you managed to hire", "Depends on the team you get"],
  ["After launch", "Same team keeps it running", "If they stay", "Often a new contract"],
];

const SERVICES = CATEGORIES.find((c) => c.key === "services")!;
const LOCATIONS = CATEGORIES.find((c) => c.key === "locations")!;

const Icon = ({ d, className = "size-5" }: { d: string; className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d={d} />
  </svg>
);
const CHECK = "M5 12l5 5L20 7";
const CROSS = "M6 6l12 12M18 6 6 18";

function Heading({ id, title, lead }: { id: string; title: string; lead: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 id={id} className="text-3xl font-bold sm:text-[2.6rem] sm:leading-[1.1]">
        {title}
      </h2>
      <p className="mt-3 text-ink-3">{lead}</p>
    </div>
  );
}

/** A band of the page: full-bleed tint, centred column with dashed guides. */
function Band({ children, tint, id, labelledBy }: { children: React.ReactNode; tint?: boolean; id?: string; labelledBy?: string }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={tint ? "bg-canvas-2" : undefined}>
      <div className={`${COL} guides py-20 lg:py-24`}>{children}</div>
    </section>
  );
}

export default function Home() {
  const voice = PROJECTS.find((p) => p.slug === "voice")!;
  return (
    <>
      <Header />

      <main className="flex-1">
        <JsonLd
          json={ld(ORG, { "@type": "WebSite", name: COMPANY.name, url: COMPANY.site, publisher: { "@id": ORG["@id"] } }, faqPage(FAQS))}
        />

        {/* ── Hero ── */}
        <section className="relative overflow-hidden">
          <div className={`${COL} relative pb-16 pt-10 text-center lg:pt-16`}>
            <a
              href={VOICE_APP}
              className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white py-1.5 pl-2 pr-3 text-xs text-ink-2 shadow-sm transition-colors hover:border-black/15"
            >
              <span className="grid size-5 place-items-center rounded-full bg-[#dcfce7]">
                <span className="size-2 rounded-full bg-[#16a34a]" />
              </span>
              New: Voice — AI phone calls in Telugu, Hindi &amp; English
              <span aria-hidden="true">→</span>
            </a>

            <h1 className="mx-auto mt-7 max-w-4xl text-[2.6rem] font-bold leading-[1.08] sm:text-6xl lg:text-[4.1rem]">
              Mobile App &amp; AI Development Company in{" "}
              <span className="bg-linear-to-r/srgb from-brand to-[#3a7bd5] bg-clip-text text-transparent">Hyderabad</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-3">
              We help startups and growing businesses go from idea to a product people use — design, engineering,
              launch, and the maintenance afterwards. One hand on design, the other on code.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <PillCta>Book a 30-min call</PillCta>
              <a
                href={`https://wa.me/${COMPANY.whatsapp.replace(/\D/g, "")}`}
                className="rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink"
              >
                WhatsApp us
              </a>
            </div>

            {/* Where a review count usually sits: the team's record, every line of it checkable. */}
            <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2">
              {CREDENTIALS.map((c) => (
                <li key={c.k} title={c.note} className="rounded-full border border-black/5 bg-white px-3.5 py-1.5 text-xs text-ink-3">
                  <span className="font-semibold text-ink">{c.k}</span>
                  {` · ${c.v}`}
                </li>
              ))}
            </ul>

            {/* Tilted fact cards either side of the headline, on wide screens. */}
            {STATS.slice(0, 2).map((s, k) => (
              <div
                key={s.label}
                aria-hidden="true"
                className={`absolute top-[23rem] hidden w-48 rounded-2xl bg-white p-4 text-left shadow-xl shadow-black/5 ring-1 ring-black/5 xl:block ${
                  k === 0 ? "-left-10 -rotate-6" : "-right-10 rotate-6"
                }`}
              >
                <p className="font-display text-2xl font-bold text-ink">{s.value}</p>
                <p className="mt-1 text-sm leading-snug text-ink-3">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Product cards: the work, each with a line on what we built. */}
          <ul className="mx-auto flex max-w-[90rem] snap-x gap-5 overflow-x-auto px-5 pb-6 lg:px-8">
            {PROJECTS.map((p) => {
              const card = (
                <>
                  <div className="grid h-72 place-items-center overflow-hidden rounded-2xl bg-canvas">
                    <Image src={projectImg(p.slug)} alt={`${p.name} app`} width={260} height={520} className="mt-16 w-44 drop-shadow-xl transition-transform duration-500 group-hover:-translate-y-3" />
                  </div>
                  <p className="mt-4 rounded-2xl rounded-tl-sm bg-canvas px-4 py-3 text-sm leading-relaxed text-ink-2">
                    {p.summary}
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-ink">{p.name}</p>
                      <p className="text-xs text-ink-3">{p.sector}</p>
                    </div>
                    <p className="flex flex-wrap justify-end gap-1">
                      {p.platforms.map((pl) => (
                        <span key={pl} className="rounded-full border border-black/5 px-2 py-0.5 text-[0.7rem] text-ink-3">{pl}</span>
                      ))}
                    </p>
                  </div>
                </>
              );
              return (
                <li key={p.slug} className="w-[19rem] shrink-0 snap-start">
                  {p.href ? (
                    <a href={p.href} className="group block h-full rounded-3xl bg-white p-4 ring-1 ring-black/5 transition-shadow hover:shadow-xl">
                      {card}
                    </a>
                  ) : (
                    <div className="group h-full rounded-3xl bg-white p-4 ring-1 ring-black/5">{card}</div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Client wordmarks, scrolling. Text, not logos: no clipart next to real work. */}
          <div className="relative mt-8 overflow-hidden border-y border-black/5 bg-white/60 py-6 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
            <ul className="marquee flex w-max gap-16" aria-label="Clients">
              {[...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS].map((c, k) => (
                <li key={`${c}-${k}`} aria-hidden={k >= CLIENTS.length || undefined} className="font-display text-xl font-bold tracking-tight text-ink-4">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Challenges ── */}
        <Band labelledBy="challenges">
          <Heading id="challenges" title="The challenges growing businesses face" lead="Most briefs we get start with one of these. Each is something we fix for a living." />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CHALLENGES.map((c, k) => (
              <li key={c.t} className="rounded-3xl bg-white p-3 ring-1 ring-black/5">
                <div className="grid h-36 place-items-center rounded-2xl bg-canvas">
                  <Image src={serviceIcon(k * 3)} alt="" width={120} height={130} className="h-24 w-auto opacity-90" />
                </div>
                <div className="px-3 pb-3 pt-4">
                  <span className="rounded-full bg-[#fee2e2] px-2 py-0.5 text-[0.7rem] font-semibold text-[#b91c1c]">Problem</span>
                  <h3 className="mt-3 text-lg font-bold">{c.t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-3">{c.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </Band>

        {/* ── Why ElevateBox ── */}
        <Band tint labelledBy="why">
          <Heading id="why" title={`Why choose ${COMPANY.name}?`} lead="What every engagement guarantees — commitments we control, not numbers we would need to inflate." />
          <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {GUARANTEES.map((g) => (
              <li key={g.t} className="text-center">
                <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-white text-brand shadow-sm ring-1 ring-black/5">
                  <Icon d={g.icon} className="size-6" />
                </span>
                <h3 className="mt-4 text-lg font-bold">{g.t}</h3>
                <p className="mx-auto mt-1.5 max-w-xs text-sm leading-relaxed text-ink-3">{g.d}</p>
              </li>
            ))}
          </ul>
          <div className="mt-14 text-center">
            <PillCta>Reserve your slot</PillCta>
          </div>
        </Band>

        {/* ── How to start ── */}
        <Band labelledBy="start">
          <Heading id="start" title={`How to get started with ${COMPANY.name}`} lead="No long sales cycle. Three steps from a first call to software in your hands." />
          <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_1.3fr]">
            <div className="mx-auto w-full max-w-sm rounded-[2rem] bg-ink p-8 text-center text-white shadow-2xl shadow-black/20">
              <svg viewBox="0 0 24 24" className="mx-auto size-16 text-white/80" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
                <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
              </svg>
              <p className="mt-6 font-display text-3xl font-bold leading-tight">Tell us the goal</p>
              <p className="mt-2 text-sm text-white/60">{COMPANY.hours}</p>
              <Link href="/contact" className="mt-7 block rounded-2xl bg-white/10 px-5 py-3.5 text-sm font-semibold transition-colors hover:bg-white/20">
                Free discovery call
              </Link>
            </div>
            <ol className="space-y-5">
              {STEPS.map((s) => (
                <li key={s.n} className="rounded-3xl bg-white p-6 ring-1 ring-black/5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-4">{s.n}</p>
                  <h3 className="mt-1 text-xl font-bold">{s.t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-3">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </Band>

        {/* ── Services ── */}
        <Band tint labelledBy="services">
          <Heading id="services" title="Solutions tailored for your growth" lead={SERVICES.blurb} />
          <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3">
            {SERVICES.items.slice(0, 9).map((s, k) => (
              <li key={s.slug}>
                <Link href={`${SERVICES.base}/${s.slug}`} className="group flex flex-col items-center text-center">
                  <span className="grid size-24 place-items-center rounded-3xl bg-white shadow-sm ring-1 ring-black/5 transition-transform group-hover:-translate-y-1">
                    <Image src={serviceIcon(k)} alt="" width={120} height={130} className="h-14 w-auto" />
                  </span>
                  <span className="mt-4 font-semibold text-ink group-hover:text-brand">{s.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-12 text-center">
            <Link href={SERVICES.base} className="text-sm font-semibold text-ink underline-offset-4 hover:underline">
              {`All ${SERVICES.items.length} services →`}
            </Link>
          </div>
        </Band>

        {/* ── Our work ── */}
        <Band labelledBy="work">
          <Heading id="work" title="Our work" lead="Every product below was designed and built by this team, and is still maintained by it." />
          <ul className="mt-14 grid gap-5 md:grid-cols-2">
            {PROJECTS.slice(0, 4).map((p, k) => (
              <li key={p.slug}>
                <Link
                  href={p.href ?? "/portfolio"}
                  className={`group relative block h-80 overflow-hidden rounded-[2rem] ${
                    ["bg-[#111827]", "bg-[#1d4ed8]", "bg-[#3b0764]", "bg-[#14532d]"][k]
                  }`}
                >
                  <Image src={projectImg(p.slug)} alt={`${p.name} screens`} width={260} height={520} className="absolute -bottom-40 right-8 w-52 rotate-6 drop-shadow-2xl transition-transform duration-500 group-hover:-translate-y-4" />
                  <div className="relative max-w-[55%] p-7">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/60">{p.sector}</p>
                    <h3 className="mt-2 text-2xl font-bold text-white">{p.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">{p.summary}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Link href="/portfolio" className="text-sm font-semibold text-ink underline-offset-4 hover:underline">
              See the full portfolio →
            </Link>
          </div>
        </Band>

        {/* ── What makes us different ── */}
        <Band tint labelledBy="different">
          <Heading id="different" title="What makes us different" lead="The same build, three ways to get it done." />
          <div className="mt-14 overflow-x-auto rounded-3xl bg-white ring-1 ring-black/5">
            <table className="w-full min-w-[42rem] text-left text-sm">
              <thead>
                <tr className="border-b border-black/5">
                  <th className="p-5 font-medium text-ink-4">
                    <span className="sr-only">Compared on</span>
                  </th>
                  <th className="bg-canvas p-5 font-display text-base font-bold text-ink">{COMPANY.name}</th>
                  <th className="p-5 font-semibold text-ink-3">Hiring in-house</th>
                  <th className="p-5 font-semibold text-ink-3">A typical agency</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map(([k, us, hire, agency]) => (
                  <tr key={k} className="border-b border-black/5 last:border-0">
                    <th scope="row" className="p-5 font-medium text-ink-2">{k}</th>
                    <td className="bg-canvas p-5 text-ink">
                      <span className="flex items-start gap-2">
                        <Icon d={CHECK} className="mt-0.5 size-4 shrink-0 text-[#16a34a]" />
                        {us}
                      </span>
                    </td>
                    {[hire, agency].map((v) => (
                      <td key={v} className="p-5 text-ink-3">
                        <span className="flex items-start gap-2">
                          {v.startsWith("+") ? (
                            <Icon d={CHECK} className="mt-0.5 size-4 shrink-0 text-[#16a34a]" />
                          ) : (
                            <Icon d={CROSS} className="mt-0.5 size-4 shrink-0 text-[#dc2626]" />
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
        </Band>

        {/* ── Track record ── */}
        <Band labelledBy="record">
          <Heading id="record" title="Our track record" lead="Where the people who will build your product have built before." />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { big: String(PROJECTS.length), t: "Products live and maintained", d: "Across AI calling, healthcare, commerce, agriculture and the creator economy." },
              { big: "AIR 14", t: CREDENTIALS[0].k, d: CREDENTIALS[0].note },
              { big: "120s → 7s", t: CREDENTIALS[1].k, d: CREDENTIALS[1].note },
            ].map((a) => (
              <li key={a.t} className="rounded-3xl bg-white p-3 ring-1 ring-black/5">
                <div className="grid h-40 place-items-center rounded-2xl bg-canvas font-display text-5xl font-extrabold tracking-tight text-ink">{a.big}</div>
                <div className="px-3 pb-3 pt-4">
                  <h3 className="text-lg font-bold">{a.t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-3">{a.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </Band>

        {/* ── FAQ, as a conversation ── */}
        <Band tint labelledBy="faq">
          <Heading id="faq" title="Frequently asked questions" lead="Curiosity is a good sign. Here are the ones we hear most." />
          <div className="mx-auto mt-14 max-w-3xl space-y-4">
            {FAQS.map((f, k) => (
              <details key={f.q} open={k === 0} className="group">
                <summary className="ml-auto flex w-fit max-w-[90%] cursor-pointer list-none items-center gap-3 rounded-full rounded-br-md bg-white py-2.5 pl-3 pr-5 text-sm font-medium text-ink ring-1 ring-black/5 group-open:bg-ink group-open:text-white">
                  <span aria-hidden="true" className="grid size-6 shrink-0 place-items-center rounded-full bg-canvas text-ink transition-transform group-open:rotate-45">
                    +
                  </span>
                  {f.q}
                </summary>
                <div className="mt-3 flex max-w-[90%] items-end gap-3">
                  <Image src="/icon.png" alt="" width={32} height={32} className="size-8 shrink-0 rounded-full bg-white" />
                  <p className="rounded-3xl rounded-bl-md bg-white px-5 py-3.5 text-sm leading-relaxed text-ink-2 ring-1 ring-black/5">{f.a}</p>
                </div>
              </details>
            ))}
          </div>
        </Band>

        {/* ── End: a dark card with the quote form ── */}
        <section id="quote" className="px-3 pb-6 pt-12 sm:px-5">
          <div className="mx-auto max-w-[90rem] overflow-hidden rounded-[2rem] bg-ink px-5 py-16 text-white lg:px-8 lg:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-white sm:text-5xl">You&apos;ve reached the end — now let&apos;s start something new.</h2>
              <p className="mt-4 text-white/60">
                {`Send the brief, however rough. A person who works on delivery replies within one working day — or call ${COMPANY.phone}.`}
              </p>
            </div>
            <div className="mx-auto mt-10 max-w-3xl">
              <QuoteForm dark />
            </div>
            <div className="mt-12 overflow-hidden rounded-3xl bg-white/5 py-5 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
              <ul className="marquee flex w-max gap-3" aria-hidden="true">
                {[...SERVICES.items, ...SERVICES.items].map((s, k) => (
                  <li key={`${s.slug}-${k}`} className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs text-white/80">
                    <Icon d={CHECK} className="size-3.5" />
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Long-form intro and locations, for people (and search) who read to the bottom ── */}
        <section>
          <div className={`${COL} py-16`}>
            <h2 className="text-2xl font-bold">{`${COMPANY.name} — mobile app, web and AI development in India`}</h2>
            <p className="mt-4 max-w-4xl leading-relaxed text-ink-3">
              {`${COMPANY.name} builds native iOS and Android apps where platform depth matters, and Flutter or React Native where one codebase across both stores is the right economics. Alongside apps we build websites that hold their speed under real traffic, design systems engineering can build exactly, and AI features measured before they ship — including our own product, `}
              <a href={VOICE_APP} className="font-semibold text-brand hover:underline">{voice.name}</a>
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
                  <Link href={`${LOCATIONS.base}/${l.slug}`} className="block rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-xs text-ink-2 hover:border-ink">
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

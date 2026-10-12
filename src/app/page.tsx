import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CATEGORIES,
  COMPANY,
  CREDENTIALS,
  FAQS,
  PROJECTS,
  STATS,
  TESTIMONIALS,
} from "@/lib/content";
import { Header, Footer } from "@/components/site";
import { QuoteForm } from "@/components/blocks";
import { ProcessCarousel } from "@/components/process-carousel";
import { ProjectShowcase } from "@/components/project-showcase";
import { ServiceBands } from "@/components/service-bands";

export const metadata: Metadata = {
  title: `${COMPANY.name} — Mobile App, Web & AI Development Company in Hyderabad`,
  description:
    "ElevateBox builds mobile apps, websites and AI products from Hyderabad — and runs its own AI calling product, Voice. Honest scoping, two-week increments, and code in your name from day one.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${COMPANY.name} — Mobile App, Web & AI Development Company in Hyderabad`,
    description:
      "Mobile apps, websites and AI products, built in Hyderabad and kept running after launch.",
    url: "/",
    type: "website",
  },
};

// Section rhythm of the reference layout: full-bleed, 90rem shell.
const SHELL = "mx-auto w-full max-w-[90rem] px-5 lg:px-8";

/* What every engagement guarantees. Each tile is a commitment the company
   controls — nothing here is a count that would need inflating. */
const GUARANTEES = [
  { t: "Confidentiality with NDA", d: "Signed before the first workshop, on your paper or ours.", tint: "bg-[#E3ECFF]", icon: "M7 11V7a5 5 0 0 1 10 0v4M5 11h14v10H5z" },
  { t: "Code in your name", d: "Repository, cloud and credentials are yours from the first commit.", tint: "bg-[#EFEAFF]", icon: "M4 7h16M4 12h16M4 17h10" },
  { t: "Fixed discovery price", d: "Scope and price agreed before the build starts.", tint: "bg-[#FFF6E9]", icon: "M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" },
  { t: "Something live every two weeks", d: "Increments on a real environment, not a slide deck.", tint: "bg-[#E7F7EE]", icon: "M5 12l5 5L20 7" },
  { t: "Instrumented before launch", d: "Logging, tracing and crash reports in before release day.", tint: "bg-[#FFEBE6]", icon: "M3 12h4l3 8 4-16 3 8h4" },
  { t: "A reply within one day", d: "Every new brief gets a real answer by the next working day.", tint: "bg-[#F0FCFF]", icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" },
];

const LOCATIONS = CATEGORIES.find((c) => c.key === "locations")!;

const Icon = ({ d, className = "size-5" }: { d: string; className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d={d} />
  </svg>
);

const ARROW = "M5 12h14m-6-6 6 6-6 6";
const WHATSAPP = `https://wa.me/${COMPANY.whatsapp.replace(/\D/g, "")}`;
const TEL = `tel:${COMPANY.phone.replace(/\s/g, "")}`;

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex-1">
        {/* ── Hero: headline and about on the left, product collage on the right ── */}
        <section className="bg-[#FAFBFF]">
          <div className={`${SHELL} grid items-center gap-12 py-14 lg:grid-cols-[1.1fr_1fr] lg:py-20`}>
            <div>
              <h1 className="text-4xl font-bold leading-[1.12] sm:text-5xl lg:text-6xl">
                <span className="bg-linear-to-r from-brand to-[#3a7bd5] bg-clip-text text-transparent">
                  Mobile App &amp; AI
                </span>
                <br />
                Development Company in Hyderabad
              </h1>

              <h2 className="mt-8 text-xs font-bold uppercase tracking-[0.14em] text-ink-2">
                About our company
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-ink-3">
                {COMPANY.name} designs and builds mobile apps, websites and AI products for
                businesses in India and abroad — discovery, design, engineering, launch, and the
                maintenance afterwards. We also build and run our own product,{" "}
                <Link href="/voice" className="font-semibold text-brand hover:underline">
                  Voice by ElevateBox
                </Link>
                , which calls leads in Telugu, Hindi and English.
              </p>

              {/* Where the badges sit in the reference: our people's track record,
                  every line of which can be checked. */}
              <ul className="mt-7 flex flex-wrap gap-2">
                {CREDENTIALS.map((c) => (
                  <li
                    key={c.k}
                    title={c.note}
                    className="rounded-full border border-line bg-white px-3.5 py-1.5 text-xs text-ink-2 shadow-sm"
                  >
                    <span className="font-semibold text-ink">{c.k}</span>
                    {` · ${c.v}`}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-7 py-3.5 font-semibold text-white shadow-md transition-colors hover:bg-brand-soft"
                >
                  Get a free quote
                  <Icon d={ARROW} className="size-4" />
                </Link>
                <a
                  href={WHATSAPP}
                  className="inline-flex items-center justify-center rounded-lg border border-line bg-white px-7 py-3.5 font-semibold text-ink transition-colors hover:border-ink"
                >
                  WhatsApp us
                </a>
              </div>
            </div>

            {/* Collage: a live product in the middle, true delivery facts around it. */}
            <div className="relative mx-auto h-[520px] w-full max-w-[520px]" aria-hidden="true">
              <div className="absolute inset-x-8 inset-y-6 rounded-[2.5rem] bg-linear-to-br/srgb from-[#E3ECFF] to-[#F0FCFF]" />
              <Image
                src="/assets/project-voice.svg"
                alt=""
                width={260}
                height={520}
                priority
                className="absolute left-1/2 top-0 h-[520px] w-[260px] -translate-x-1/2 drop-shadow-2xl"
              />
              {STATS.slice(0, 4).map((s, k) => (
                <div
                  key={s.label}
                  className={`absolute w-40 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-black/5 ${
                    ["left-0 top-12 -rotate-3", "right-0 top-24 rotate-3", "left-2 bottom-24 rotate-2", "right-2 bottom-10 -rotate-2"][k]
                  }`}
                >
                  <p className="text-xl font-bold text-brand">{s.value}</p>
                  <p className="mt-1 text-xs leading-snug text-ink-3">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services We Provide ── */}
        <ServiceBands />

        {/* ── Our Featured Projects ── */}
        <ProjectShowcase />

        {/* ── Intro and guarantees ── */}
        <section className="bg-white">
          <div className={`${SHELL} py-16 lg:py-20`}>
            <h2 className="text-2xl font-bold text-brand sm:text-3xl">
              {`${COMPANY.name} — Mobile App, Web and AI Development in Hyderabad`}
            </h2>
            <p className="mt-5 max-w-5xl leading-relaxed text-ink-3">
              We take products from the first workshop to the app store and keep them running
              afterwards. {PROJECTS.length} products we designed and built are live and still
              maintained by this team, across AI calling, healthcare, commerce, agriculture, AI automation and
              the creator economy.
            </p>
            <p className="mt-4 max-w-5xl leading-relaxed text-ink-3">
              We scope honestly — if a simpler build serves you better, we say so during discovery
              — and we ship something you can click on every two weeks.
            </p>

            <h3 className="mt-12 text-center text-xl font-bold text-brand">
              {`${COMPANY.name} guarantees the following :`}
            </h3>
            <ul className="mx-auto mt-8 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {GUARANTEES.map((g) => (
                <li key={g.t} className={`rounded-xl ${g.tint} px-6 py-5 text-center`}>
                  <p className="flex items-center justify-center gap-2.5 font-semibold text-brand">
                    <Icon d={g.icon} />
                    {g.t}
                  </p>
                  <p className="mt-1.5 text-sm text-ink-3">{g.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Our Process ── */}
        <section className="bg-[#0c1a38]">
          <div className={`${SHELL} py-16 lg:py-20`}>
            <h2 className="mb-8 text-center text-4xl font-semibold text-white/90 sm:text-5xl">
              Our Process
            </h2>
            <ProcessCarousel />
          </div>
        </section>

        {/* ── Start Work With Us ── */}
        <section className="bg-white">
          <div className={`${SHELL} py-14`}>
            <h2 className="inline-block border-b-4 border-brand pb-2 text-xl font-bold">
              Start Work With Us
            </h2>
            <h3 className="mt-6 text-2xl font-bold text-brand">
              Send the brief, however rough.
            </h3>
            <p className="mt-4 max-w-5xl leading-relaxed text-ink-3">
              Tell us what you want to build. Within a working day you get scope questions, an
              honest range, and the parts we think you should cut. Discovery is fixed in scope and
              price, so the build estimate rests on evidence rather than a guess.
            </p>
            <p className="mt-4 max-w-5xl leading-relaxed text-ink-3">
              {`Call ${COMPANY.phone}, write to ${COMPANY.email}, or use the form at the bottom of this page — ${COMPANY.hours}.`}
            </p>
          </div>
        </section>

        {/* ── Locations band ── */}
        <section className="bg-[#0c1a38]">
          <div className={`${SHELL} py-12`}>
            <h2 className="text-center text-2xl font-bold text-white">
              Our Services Extend to These Locations
            </h2>
            <ul className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {LOCATIONS.items.map((l) => (
                <li key={l.slug}>
                  <Link
                    href={`${LOCATIONS.base}/${l.slug}`}
                    className="group flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {`App development in ${l.name}`}
                    <span className="grid size-6 place-items-center rounded-full bg-white text-[#0c1a38]">
                      <Icon d={ARROW} className="size-3.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Testimonials: only real, permissioned quotes, so hidden while empty ── */}
        {TESTIMONIALS.length > 0 && (
          <section className="bg-white">
            <div className={`${SHELL} py-16`}>
              <h2 className="text-center text-3xl font-bold">Our Testimonials</h2>
              <ul className="mt-10 grid gap-5 md:grid-cols-3">
                {TESTIMONIALS.map((t) => (
                  <li key={t.name} className="rounded-xl bg-[#E3ECFF] p-6">
                    <p className="leading-relaxed text-ink-2">{`“${t.quote}”`}</p>
                    <p className="mt-5 font-semibold text-ink">{t.name}</p>
                    <p className="text-sm text-ink-3">{t.role}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ── Book a free call ── */}
        <section className="relative overflow-hidden bg-linear-to-br/srgb from-[#0c1a38] to-[#013186]">
          <div className={`${SHELL} grid items-center gap-10 py-16 lg:grid-cols-[1.4fr_1fr] lg:py-20`}>
            <div>
              <h2 className="text-4xl font-bold text-white sm:text-5xl">Book a call for free.</h2>
              <p className="mt-3 text-lg font-semibold text-[#8FC7FF]">
                Talk to the people who will build it, not a sales desk.
              </p>
              <p className="mt-5 max-w-2xl leading-relaxed text-white/80">
                Thirty minutes on what you want to build, what it should cost, and what to leave
                out. No obligation, and no sales sequence afterwards.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={WHATSAPP} className="inline-flex items-center justify-center rounded-lg bg-white px-7 py-3.5 font-semibold text-brand transition-transform hover:scale-105">
                  Book on WhatsApp
                </a>
                <a href={TEL} className="inline-flex items-center justify-center rounded-lg border border-white/30 px-7 py-3.5 font-semibold text-white transition-colors hover:border-white">
                  {`Call ${COMPANY.phone}`}
                </a>
              </div>
            </div>
            <div className="rounded-2xl bg-white/10 p-7 text-white ring-1 ring-white/15 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-wider text-white/70">Free booking</p>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="text-white/60">Working hours</dt>
                  <dd className="mt-1 text-base font-semibold">{COMPANY.hours}</dd>
                </div>
                <div>
                  <dt className="text-white/60">Office</dt>
                  <dd className="mt-1 text-base font-semibold">{COMPANY.address}</dd>
                </div>
                <div>
                  <dt className="text-white/60">Email</dt>
                  <dd className="mt-1 text-base font-semibold">
                    <a href={`mailto:${COMPANY.email}`} className="hover:underline">{COMPANY.email}</a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* ── Long-form intro (the reference's SEO block) ── */}
        <section className="bg-white">
          <div className={`${SHELL} py-14`}>
            <h2 className="text-2xl font-bold">Mobile App Development Company in India</h2>
            <p className="mt-4 max-w-6xl leading-relaxed text-ink-3">
              {COMPANY.name} builds native iOS and Android apps where platform depth matters, and
              Flutter or React Native where one codebase across both stores is the right economics.
              Alongside apps we build websites that hold their speed under real traffic, design
              systems that engineering can build exactly, and AI features that are measured before
              they ship.
            </p>
            <p className="mt-4 max-w-6xl leading-relaxed text-ink-3">
              Our engineers have worked at JPMorgan Chase, Google and Y Combinator-backed startups,
              and placed in the top 0.17% at ACM ICPC. We work from Hyderabad with clients in
              India, the UAE, the UK, Europe and the US, and everything we build is handed over so
              your own team can run it.
            </p>
          </div>
        </section>

        {/* ── FAQs ── */}
        <section className="bg-white">
          <div className={`${SHELL} pb-16`}>
            <h2 className="text-center text-3xl font-bold">FAQs</h2>
            <p className="mt-2 text-center text-sm text-ink-3">
              Not here? Write to us through the form below.
            </p>
            <div className="mx-auto mt-8 max-w-5xl space-y-3">
              {FAQS.map((f, k) => (
                <details key={f.q} className="group rounded-xl bg-[#E3ECFF]/70 px-6 py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-semibold text-ink">
                    {`${String(k + 1).padStart(2, "0")}. ${f.q}`}
                    <span aria-hidden="true" className="text-xl leading-none text-brand transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-ink-3">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Let's Discuss + quote form ── */}
        <section id="quote" className="bg-white">
          <div className={`${SHELL} pb-20`}>
            <p aria-hidden="true" className="text-center text-6xl font-semibold leading-none sm:text-8xl lg:text-9xl">
              <span className="text-ink/80">Let&apos;s </span>
              <span className="text-[#3a7bd5]">Discuss</span>
            </p>
            <div className="mx-auto mt-10 max-w-3xl">
              <h2 className="text-xl font-bold text-brand">Let us elevate your project with our skills</h2>
              <p className="mt-1 mb-6 text-sm text-ink-3">
                {`Get a quote from ${COMPANY.name}. A person who works on delivery replies within one working day.`}
              </p>
              <QuoteForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

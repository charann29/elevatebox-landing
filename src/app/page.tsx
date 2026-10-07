import type { Metadata } from "next";
import { CATEGORIES, COMPANY, PROBLEMS, PRODUCTS, STUDIO } from "@/lib/content";
import { AnnouncementBar, Arrow, Footer, Header, SHELL } from "@/components/site";
import { Portfolio } from "@/components/portfolio";

const TITLE = "ElevateBox — A product studio building AI software for India";
const DESC =
  "ElevateBox is a Hyderabad product studio. We research, build and operate products across conversational AI, fintech, healthcare, hiring, education and agriculture.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: "/" },
  openGraph: { title: TITLE, description: DESC, url: "/", siteName: COMPANY.name, type: "website", locale: "en_IN" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
};

const live = PRODUCTS.filter((p) => p.status === "Live").length;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${COMPANY.site}/#org`,
      name: COMPANY.name,
      legalName: COMPANY.legal,
      url: COMPANY.site,
      logo: `${COMPANY.site}/elevatebox-mark.png`,
      email: COMPANY.email,
      identifier: { "@type": "PropertyValue", propertyID: "CIN", value: COMPANY.cin },
      address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressRegion: "Telangana", addressCountry: "IN" },
    },
    {
      "@type": "ItemList",
      name: "ElevateBox portfolio",
      numberOfItems: PRODUCTS.length,
      itemListElement: PRODUCTS.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.name,
        description: p.value,
        ...(p.url && { url: p.url }),
      })),
    },
  ],
};

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`font-mono text-[12px] tracking-[0.14em] uppercase ${dark ? "text-sky" : "text-brand"}`}>{children}</p>
  );
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <AnnouncementBar />
      <Header dark />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative isolate overflow-hidden bg-navy text-white">
          <div aria-hidden="true" className="grid-texture absolute inset-0 -z-10" />
          <div aria-hidden="true" className="absolute -top-40 left-1/2 -z-10 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(47_91_211/0.45),transparent)]" />
          <div className={`${SHELL} pt-16 pb-20 sm:pt-24 lg:pt-32 lg:pb-28`}>
            <Eyebrow dark>Product studio · Hyderabad</Eyebrow>
            <h1 className="mt-6 max-w-4xl text-[2.6rem] leading-[1.02] font-semibold sm:text-5xl lg:text-6xl">
              We build products for the problems India runs into every day.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/70">
              ElevateBox researches a problem in the field, builds the product, and keeps operating it.{" "}
              {`${PRODUCTS.length} products across ${CATEGORIES.length} categories so far, ${live} of them live.`}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href="#portfolio" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-navy transition-colors hover:bg-white/90">
                Explore the portfolio <Arrow />
              </a>
              <a href={COMPANY.flagship} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/60">
                Hear a voice agent call you
              </a>
            </div>

            <div className="mt-20 lg:mt-28">
              <h2 className="font-mono text-[12px] tracking-[0.14em] text-white/60 uppercase">What we work on</h2>
              <ol className="mt-6 grid border-t border-white/12 sm:grid-cols-2 lg:grid-cols-3">
                {PROBLEMS.map((x, i) => (
                  <li key={x.p} className="flex flex-col gap-4 border-b border-white/12 py-7 sm:pr-8 lg:[&:nth-child(3n+2)]:px-8 lg:[&:nth-child(3n+3)]:pl-8 sm:max-lg:even:pl-8">
                    <span className="font-mono text-[12px] text-white/50">{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-xl leading-snug font-medium text-white sm:text-[1.35rem]">{x.p}</p>
                    <p className="mt-auto font-mono text-[12px] text-sky">{`→ ${x.by}`}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Flagship */}
        <section className="border-b border-line bg-surface">
          <div className={`${SHELL} grid gap-12 py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-28`}>
            <div className="reveal">
              <Eyebrow>Flagship</Eyebrow>
              <h2 className="mt-4 text-4xl font-semibold text-ink sm:text-5xl">Voice Agents</h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-3">
                Describe the job in plain words and we build an AI phone employee from it. It rings a new lead within
                seconds, talks in Telugu, Hindi or English, records what was said and books the next step.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href={COMPANY.flagship} className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#0a3a9c]">
                  Get a free demo call <Arrow />
                </a>
              </div>
            </div>
            <dl className="reveal grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {[
                ["Languages", "Conversations in Telugu, Hindi and English."],
                ["Instant leads", "A form fill or ad lead is called within seconds, not the next morning."],
                ["Bulk campaigns", "Upload a list and an employee works through it, call by call."],
                ["Billing", "A prepaid wallet, charged on talk time. When it runs out, calls stop."],
              ].map(([k, v]) => (
                <div key={k} className="bg-surface p-6">
                  <dt className="font-mono text-[12px] tracking-wide text-ink-3 uppercase">{k}</dt>
                  <dd className="mt-2 text-[15px] leading-relaxed text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Portfolio */}
        <section id="portfolio" className="scroll-mt-4 bg-surface-2">
          <div className={`${SHELL} py-20 lg:py-28`}>
            <header className="reveal max-w-3xl">
              <Eyebrow>Portfolio</Eyebrow>
              <h2 className="mt-4 text-4xl font-semibold text-ink sm:text-5xl">Built at ElevateBox</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-3">
                Products built and incubated at ElevateBox. Filter by category, or open a live one to see it working.
              </p>
            </header>
            <div className="mt-12">
              <Portfolio />
            </div>
          </div>
        </section>

        {/* How we build */}
        <section id="studio" className="scroll-mt-4 border-t border-line bg-surface">
          <div className={`${SHELL} py-20 lg:py-28`}>
            <header className="reveal max-w-3xl">
              <Eyebrow>How we build</Eyebrow>
              <h2 className="mt-4 text-4xl font-semibold text-ink sm:text-5xl">One studio, three stages, every product.</h2>
            </header>
            <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
              {STUDIO.map((s) => (
                <li key={s.n} className="reveal border-t-2 border-ink pt-6">
                  <span className="font-mono text-[12px] text-brand">{s.n}</span>
                  <h3 className="mt-3 text-2xl font-semibold text-ink">{s.t}</h3>
                  <p className="mt-3 leading-relaxed text-ink-3">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Company */}
        <section id="company" className="scroll-mt-4 border-t border-line bg-surface-2">
          <div className={`${SHELL} grid gap-12 py-20 lg:grid-cols-[1fr_1.2fr] lg:py-28`}>
            <header className="reveal">
              <Eyebrow>Company</Eyebrow>
              <h2 className="mt-4 text-4xl font-semibold text-ink sm:text-5xl">The company behind the products</h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-3">
                ElevateBox is a brand of {COMPANY.legal}, a private limited company incorporated in India.
              </p>
            </header>
            <dl className="reveal divide-y divide-line self-start rounded-2xl border border-line bg-surface">
              {[
                ["Legal name", COMPANY.legal],
                ["CIN", COMPANY.cin],
                ["Registered in", COMPANY.city],
                ["Email", COMPANY.email],
              ].map(([k, v]) => (
                <div key={k} className="grid gap-1 px-6 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="font-mono text-[12px] tracking-wide text-ink-3 uppercase">{k}</dt>
                  <dd className="text-[15px] break-words text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="relative isolate overflow-hidden bg-navy text-white">
          <div aria-hidden="true" className="grid-texture absolute inset-0 -z-10" />
          <div className={`${SHELL} py-20 text-center lg:py-28`}>
            <h2 className="mx-auto max-w-3xl text-4xl font-semibold sm:text-5xl">Working on one of these problems?</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/70">
              Whether you want to use a product, partner on one or build the next one with us, write to us.
            </p>
            <a href={`mailto:${COMPANY.email}`} className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-navy transition-colors hover:bg-white/90">
              {COMPANY.email} <Arrow />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

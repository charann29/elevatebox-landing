import type { Metadata } from "next";
import Image from "next/image";
import {
  CATEGORIES,
  COMPANY,
  PROCESS_STEPS,
  STATS,
  TESTIMONIALS,
  avatarImg,
} from "@/lib/content";
import { Header, Footer } from "@/components/site";
import { CtaBand, PageHero, Section } from "@/components/blocks";

export const metadata: Metadata = {
  title: `About Us | ${COMPANY.name}`,
  description:
    "Who we are, how we work, and the delivery principles we hold to on every engagement.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  { t: "Say the inconvenient thing early", d: "If the scope is wrong, the timeline is unrealistic, or the feature will not work, we say so during discovery — not after invoicing the build." },
  { t: "You own everything", d: "Repository, cloud accounts, and credentials are in your name from the first commit. Leaving us should be easy. That keeps us honest." },
  { t: "Ship increments, not demos", d: "Every two weeks something goes to a real environment. Progress you can click on beats a status report." },
  { t: "Boring technology, deliberately", d: "We pick tools with a hiring pool and a support horizon. Novelty is spent once, on the part that actually differentiates you." },
  { t: "Instrument before launch", d: "Logging, tracing, and crash reporting go in before release. You cannot fix what you cannot see." },
  { t: "Write the trade-offs down", d: "Architecture decisions are recorded with the alternatives considered, so the next engineer knows why — including when that engineer is yours." },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="About us"
          title="A delivery company, not a deck company"
          lead={`${COMPANY.name} is a product engineering team in Hyderabad building software for clients across India, the UAE, the UK, Europe, and the US.`}
          crumbs={[{ label: "About Us" }]}
        />

        <Section>
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-brand">
                What we do
              </h2>
              <p className="mt-5 leading-relaxed text-ink-muted">
                We design and build software products end to end — discovery,
                design, engineering, launch, and the maintenance afterwards. Most
                of our work is web and mobile product development, with data,
                cloud, and AI work attached where the product needs it.
              </p>
              <p className="mt-4 leading-relaxed text-ink-muted">
                We are deliberately generalist across industries and deliberately
                narrow on process. The delivery model is the same whether we are
                building a fleet tracking platform or a lending product: scope it
                honestly, build in increments, instrument it, and hand over
                something your own team can run.
              </p>
              <p className="mt-4 leading-relaxed text-ink-muted">
                The engagements we do best are the ones where the client has a
                clear problem and is willing to have the scope challenged. The
                ones we decline are the ones where the decision has already been
                made and the vendor is there to type.
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-8 self-start rounded-3xl bg-[#F8FAFC] p-8">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="text-3xl font-bold text-brand sm:text-4xl">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-sm leading-snug text-ink-muted">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Section>

        <Section tinted eyebrow="Principles" title="How we work">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.t} className="rounded-2xl bg-white p-7 shadow-sm">
                <h3 className="font-semibold text-brand">{v.t}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                  {v.d}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="Process" title="Nine steps, every engagement">
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROCESS_STEPS.map((s) => (
              <li
                key={s.n}
                className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
              >
                <span className="text-sm font-bold text-accent">{s.n}</span>
                <h3 className="mt-2 font-semibold text-brand">{s.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                  {s.d}
                </p>
              </li>
            ))}
          </ol>
        </Section>

        <Section tinted eyebrow="Capabilities" title="What we cover">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c) => (
              <div key={c.key} className="rounded-2xl bg-white p-7 shadow-sm">
                <h3 className="text-lg font-semibold text-brand">{c.label}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                  {c.blurb}
                </p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-accent">
                  {c.items.length} areas
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="Client feedback" title="What clients say">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={t.name + t.role}
                className="flex flex-col rounded-2xl border border-black/5 bg-white p-7 shadow-sm"
              >
                <div className="flex gap-0.5 text-accent" aria-label="5 out of 5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} aria-hidden="true">
                      ★
                    </span>
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-black/5 pt-4">
                  <Image
                    src={avatarImg(i)}
                    alt=""
                    width={160}
                    height={160}
                    className="size-10 shrink-0 rounded-full"
                  />
                  <span>
                    <span className="block text-sm font-semibold text-brand">
                      {t.name}
                    </span>
                    <span className="block text-xs text-ink-muted">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}

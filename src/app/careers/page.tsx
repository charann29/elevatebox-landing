import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY, JOBS } from "@/lib/content";
import { Header, Footer } from "@/components/site";
import { CtaBand, PageHero, Section } from "@/components/blocks";

export const metadata: Metadata = {
  title: `Careers | ${COMPANY.name}`,
  description:
    "Open engineering, design, and growth roles at ElevateBox — Hyderabad, hybrid, and remote.",
  alternates: { canonical: "/careers" },
};

const PERKS = [
  { t: "Real ownership", d: "You own features end to end, including the production behaviour after release." },
  { t: "No billable-hours theatre", d: "We measure delivered work, not hours logged against a timesheet." },
  { t: "Learning budget", d: "An annual budget for courses, conferences, and books, approved by default." },
  { t: "Hybrid by default", d: "Two days in the Hyderabad office, the rest wherever you work best." },
  { t: "Health cover", d: "Family health insurance from day one, no waiting period." },
  { t: "Light on-call", d: "A rotation you are staffed for, with time off after a disturbed night." },
];

export default function CareersPage() {
  const teams = Array.from(new Set(JOBS.map((j) => j.team)));

  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Careers"
          title="Build things that go into production"
          lead="We are a delivery company. That means shipping real products for real users, and living with the consequences — which is the fastest way to get good at this."
          crumbs={[{ label: "Careers" }]}
        />

        <Section
          eyebrow="Open roles"
          title={`${JOBS.length} positions open`}
          lead={`Across ${teams.length} teams: ${teams.join(", ")}.`}
        >
          <ul className="divide-y divide-black/10 border-y border-black/10">
            {JOBS.map((j) => (
              <li key={j.slug}>
                <Link
                  href={`/careers/${j.slug}`}
                  className="group flex flex-col gap-3 py-6 transition-colors hover:bg-[#F8FAFC] sm:flex-row sm:items-center sm:justify-between sm:px-4"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-brand">{j.title}</h3>
                    <p className="mt-1 text-sm text-ink-muted">{j.about}</p>
                  </div>
                  <div className="flex shrink-0 flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-full bg-accent-soft px-3 py-1 font-medium text-brand">
                      {j.team}
                    </span>
                    <span className="rounded-full border border-black/10 px-3 py-1 text-ink-muted">
                      {j.location}
                    </span>
                    <span className="rounded-full border border-black/10 px-3 py-1 text-ink-muted">
                      {j.experience}
                    </span>
                    <span className="font-semibold text-brand opacity-0 transition-opacity group-hover:opacity-100">
                      →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <Section tinted eyebrow="Working here" title="What the job is actually like">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PERKS.map((p) => (
              <div key={p.t} className="rounded-2xl bg-white p-7 shadow-sm">
                <h3 className="font-semibold text-brand">{p.t}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                  {p.d}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="Hiring process" title="Four steps, about two weeks">
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "01", t: "Application review", d: "We read every application. You hear back either way within five working days." },
              { n: "02", t: "Intro call", d: "Thirty minutes on your experience and what you want next. Ask us anything." },
              { n: "03", t: "Paid technical task", d: "A short, realistic task related to the role. We pay for your time." },
              { n: "04", t: "Team conversation", d: "Meet the people you would work with, plus a walkthrough of your task." },
            ].map((s) => (
              <li key={s.n} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
                <span className="text-sm font-bold text-accent">{s.n}</span>
                <h3 className="mt-2 font-semibold text-brand">{s.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{s.d}</p>
              </li>
            ))}
          </ol>
        </Section>

        <CtaBand
          title="Nothing fits right now?"
          lead="Send us your work anyway. We open roles regularly and keep good applications on file."
          cta="Send an open application"
        />
      </main>
      <Footer />
    </>
  );
}

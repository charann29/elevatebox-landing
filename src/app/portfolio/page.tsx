import type { Metadata } from "next";
import Image from "next/image";
import {
  CLIENTS,
  COMPANY,
  IMG,
  PROJECTS,
  STATS,
  clientLogo,
  projectImg,
} from "@/lib/content";
import { Header, Footer } from "@/components/site";
import { CtaBand, PageHero, Section } from "@/components/blocks";

export const metadata: Metadata = {
  title: `Portfolio | ${COMPANY.name}`,
  description:
    "Selected product work across logistics, healthcare, commerce, fintech, education, and media.",
  alternates: { canonical: "/portfolio" },
};

const TINTS = [
  "bg-[#E3ECFF]",
  "bg-[#F0FCFF]",
  "bg-[#FFF6E9]",
  "bg-[#EFEAFF]",
  "bg-[#E7F7EE]",
  "bg-[#FFEBE6]",
];

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Portfolio"
          title="Work that went live and stayed live"
          lead="A selection of products we designed, built, and continue to support. Each one is described by what it does and what changed after launch."
          crumbs={[{ label: "Portfolio" }]}
        />

        <Section>
          <dl className="grid grid-cols-2 gap-8 border-b border-black/10 pb-12 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="text-3xl font-bold text-brand sm:text-4xl">
                  {s.value}
                </dt>
                <dd className="mt-1 text-sm text-ink-muted">{s.label}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p, n) => (
              <article
                key={p.slug}
                className={`flex flex-col rounded-2xl ${TINTS[n % TINTS.length]} p-7`}
              >
                <Image
                  src={projectImg(p.slug)}
                  alt={`${p.name} app screens`}
                  width={IMG.project.w}
                  height={IMG.project.h}
                  className="mx-auto mb-6 h-[520px] w-[260px] rounded-3xl object-cover shadow-lg"
                />
                <span className="text-xs font-semibold uppercase tracking-wide text-brand/60">
                  {p.sector}
                </span>
                <h2 className="mt-2 text-xl font-bold text-brand">{p.name}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                  {p.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.platforms.map((x) => (
                    <span
                      key={x}
                      className="rounded-full bg-white/70 px-2.5 py-1 text-xs font-medium text-brand"
                    >
                      {x}
                    </span>
                  ))}
                </div>
                {p.stack && (
                  <p className="mt-4 text-xs text-ink-muted">
                    <span className="font-semibold text-brand">Stack:</span>{" "}
                    {p.stack.join(", ")}
                  </p>
                )}
                {p.outcome && (
                  <p className="mt-3 border-t border-black/10 pt-3 text-sm leading-relaxed text-ink-muted">
                    <span className="font-semibold text-brand">Outcome:</span>{" "}
                    {p.outcome}
                  </p>
                )}
              </article>
            ))}
          </div>
        </Section>

        <Section
          tinted
          eyebrow="Clients"
          title="Organisations we have delivered for"
          lead="Placeholder names below — replace with permissioned client names and logos before this page goes live."
        >
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-black/5 bg-black/5 sm:grid-cols-3 lg:grid-cols-4">
            {CLIENTS.map((c) => (
              <div
                key={c}
                className="grid h-32 place-items-center bg-white px-4"
                title={c}
              >
                <Image
                  src={clientLogo(c)}
                  alt={c}
                  width={IMG.client.w}
                  height={IMG.client.h}
                  className="h-[100px] w-[120px] opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </Section>

        <CtaBand
          title="Want work like this?"
          lead="Send the brief. We will tell you what we would build and what we would cut."
        />
      </main>
      <Footer />
    </>
  );
}

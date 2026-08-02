import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COMPANY, JOBS, getJob } from "@/lib/content";
import { Header, Footer } from "@/components/site";
import { CtaBand, PageHero, Section } from "@/components/blocks";

export const dynamicParams = false;

export function generateStaticParams() {
  return JOBS.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const j = getJob(slug);
  if (!j) return {};
  return {
    title: `${j.title} | Careers | ${COMPANY.name}`,
    description: j.about,
    alternates: { canonical: `/careers/${j.slug}` },
  };
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const j = getJob(slug);
  if (!j) notFound();

  const others = JOBS.filter((o) => o.slug !== j.slug).slice(0, 5);

  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow={j.team}
          title={j.title}
          lead={j.about}
          crumbs={[{ label: "Careers", href: "/careers" }, { label: j.title }]}
        />

        <Section>
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <dl className="grid grid-cols-2 gap-6 border-b border-black/10 pb-8 sm:grid-cols-4">
                {[
                  ["Team", j.team],
                  ["Location", j.location],
                  ["Type", j.type],
                  ["Experience", j.experience],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs uppercase tracking-wide text-ink-muted/70">
                      {k}
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-brand">{v}</dd>
                  </div>
                ))}
              </dl>

              <h2 className="mt-10 text-2xl font-bold text-brand">
                What you will do
              </h2>
              <ul className="mt-4 space-y-3">
                {j.responsibilities.map((r) => (
                  <li key={r} className="flex gap-3 text-ink-muted">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <span className="leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>

              <h2 className="mt-10 text-2xl font-bold text-brand">
                What we are looking for
              </h2>
              <ul className="mt-4 space-y-3">
                {j.requirements.map((r) => (
                  <li key={r} className="flex gap-3 text-ink-muted">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <span className="leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 rounded-2xl bg-[#E3ECFF] p-7">
                <h2 className="text-lg font-semibold text-brand">
                  How to apply
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  Email your CV and anything you have built to{" "}
                  <a
                    className="font-semibold text-brand underline"
                    href={`mailto:${COMPANY.email}?subject=${encodeURIComponent(j.title)}`}
                  >
                    {COMPANY.email}
                  </a>{" "}
                  with the role title in the subject line. A short note on why
                  this role specifically helps more than a cover letter.
                </p>
                <a
                  href={`mailto:${COMPANY.email}?subject=${encodeURIComponent(`Application: ${j.title}`)}`}
                  className="mt-5 inline-block rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white"
                >
                  Apply for this role
                </a>
              </div>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-black/5 bg-[#F8FAFC] p-6">
                <h2 className="font-semibold text-brand">Other open roles</h2>
                <ul className="mt-4 space-y-3">
                  {others.map((o) => (
                    <li key={o.slug}>
                      <Link
                        href={`/careers/${o.slug}`}
                        className="block text-sm font-medium text-ink-muted transition-colors hover:text-brand"
                      >
                        {o.title}
                      </Link>
                      <p className="mt-0.5 text-xs text-ink-muted/70">
                        {o.location}
                      </p>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/careers"
                  className="mt-5 block border-t border-black/10 pt-4 text-sm font-semibold text-brand"
                >
                  All roles →
                </Link>
              </div>
            </aside>
          </div>
        </Section>

        <CtaBand
          title="Not quite your role?"
          lead="Send an open application. We keep strong ones on file and come back when something fits."
          cta="Send an open application"
        />
      </main>
      <Footer />
    </>
  );
}

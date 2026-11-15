import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COMPANY, JOBS, JOBS_POSTED, getJob } from "@/lib/content";
import { JsonLd, ORG, ld } from "@/lib/schema";
import { pageMeta, withTail } from "@/lib/seo";
import { Header, Footer } from "@/components/site";
import { CtaBand, PageHero, Section } from "@/components/blocks";

export const dynamicParams = false;

export function generateStaticParams() {
  return JOBS.map((j) => ({ slug: j.slug }));
}

const jobDesc = (j: NonNullable<ReturnType<typeof getJob>>) =>
  withTail(j.about, [
    `${j.type}, ${j.experience}, ${j.location}. Join ElevateBox, the Hyderabad team behind 380+ shipped apps.`,
    `${j.type}, ${j.experience}, ${j.location}. Join ElevateBox, 380+ apps shipped.`,
    `${j.type}, ${j.experience}, ${j.location}. Join the ElevateBox team.`,
    `${j.type}, ${j.experience}, ${j.location}, at ElevateBox.`,
    `${j.location} role at ElevateBox.`,
  ]);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const j = getJob(slug);
  if (!j) return {};
  return pageMeta(`${j.title} | Careers | ElevateBox`, jobDesc(j), `/careers/${j.slug}`);
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
        <JsonLd
          json={ld(ORG, {
            "@type": "JobPosting",
            title: j.title,
            description: [`<p>${j.about}</p>`, "<p>What you will do:</p><ul>", ...j.responsibilities.map((r) => `<li>${r}</li>`), "</ul><p>What we look for:</p><ul>", ...j.requirements.map((r) => `<li>${r}</li>`), "</ul>"].join(""),
            datePosted: JOBS_POSTED,
            employmentType: j.type === "Full-time" ? "FULL_TIME" : j.type.toUpperCase().replace(/[^A-Z]+/g, "_"),
            hiringOrganization: { "@type": "Organization", "@id": ORG["@id"], name: COMPANY.name, sameAs: COMPANY.site, logo: ORG.logo },
            jobLocation: { "@type": "Place", address: ORG.address },
            url: `${COMPANY.site}/careers/${j.slug}`,
          })}
        />
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

import { COMPANY } from "@/lib/content";
import { Header, Footer } from "@/components/site";
import { PageHero, Section } from "@/components/blocks";

// ponytail: one template for all three policy pages. Content is a plain
// starting draft — have counsel review before publishing. Not legal advice.

export function LegalPage({
  title,
  crumb,
  updated,
  intro,
  sections,
}: {
  title: string;
  crumb: string;
  updated: string;
  intro: string;
  sections: { h: string; p: string[] }[];
}) {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Legal"
          title={title}
          lead={`Last updated ${updated}`}
          crumbs={[{ label: crumb }]}
        />
        <Section>
          <div className="max-w-3xl">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">
              <strong className="font-semibold">Draft notice:</strong> this is a
              starting template, not legal advice. Have it reviewed by counsel
              and adjusted to your actual data handling and commercial terms
              before publishing.
            </div>

            <p className="mt-8 leading-relaxed text-ink-muted">{intro}</p>

            <div className="mt-10 space-y-10">
              {sections.map((s) => (
                <section key={s.h}>
                  <h2 className="text-xl font-bold text-brand">{s.h}</h2>
                  <div className="mt-3 space-y-3">
                    {s.p.map((para, i) => (
                      <p key={i} className="leading-relaxed text-ink-muted">
                        {para}
                      </p>
                    ))}
                  </div>
                </section>
              ))}

              <section>
                <h2 className="text-xl font-bold text-brand">Contact</h2>
                <p className="mt-3 leading-relaxed text-ink-muted">
                  Questions about this policy can be sent to{" "}
                  <a
                    className="font-semibold text-brand underline"
                    href={`mailto:${COMPANY.email}`}
                  >
                    {COMPANY.email}
                  </a>
                  , or by post to {COMPANY.legal}, {COMPANY.address}.
                </p>
              </section>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}

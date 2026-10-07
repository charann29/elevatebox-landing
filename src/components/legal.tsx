import { COMPANY } from "@/lib/content";
import { Header, Footer, SHELL } from "@/components/site";

// ponytail: one template for all three policy pages. Content is a plain
// starting draft — have counsel review before publishing. Not legal advice.

export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: { h: string; p: string[] }[];
}) {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className={`${SHELL} py-16 lg:py-24`}>
          <p className="font-mono text-[12px] tracking-[0.14em] text-brand uppercase">Legal</p>
          <h1 className="mt-4 text-4xl font-semibold text-ink sm:text-5xl">{title}</h1>
          <p className="mt-4 text-ink-3">{`Last updated ${updated}`}</p>
          <div className="mt-10 max-w-3xl">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">
              <strong className="font-semibold">Draft notice:</strong> this is a
              starting template, not legal advice. Have it reviewed by counsel
              and adjusted to your actual data handling and commercial terms
              before publishing.
            </div>

            <p className="mt-10 leading-relaxed text-ink-3">{intro}</p>

            <div className="mt-10 space-y-10">
              {sections.map((s) => (
                <section key={s.h}>
                  <h2 className="text-xl font-semibold text-ink">{s.h}</h2>
                  <div className="mt-3 space-y-3">
                    {s.p.map((para, i) => (
                      <p key={i} className="leading-relaxed text-ink-3">
                        {para}
                      </p>
                    ))}
                  </div>
                </section>
              ))}

              <section>
                <h2 className="text-xl font-semibold text-ink">Contact</h2>
                <p className="mt-3 leading-relaxed text-ink-3">
                  Questions about this policy can be sent to{" "}
                  <a
                    className="font-semibold text-brand underline"
                    href={`mailto:${COMPANY.email}`}
                  >
                    {COMPANY.email}
                  </a>
                  . {`${COMPANY.legal}, ${COMPANY.city}.`}
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

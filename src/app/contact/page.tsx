import type { Metadata } from "next";
import { COMPANY } from "@/lib/content";
import { Header, Footer } from "@/components/site";
import { Faq, PageHero, QuoteForm, Section } from "@/components/blocks";

export const metadata: Metadata = {
  title: `Contact Us | ${COMPANY.name}`,
  description:
    "Talk to us about a project. We reply within one business day with scope questions, not a sales sequence.",
  alternates: { canonical: "/contact" },
};

const OFFICES = [
  { city: "Hyderabad", role: "Head office & delivery centre", detail: COMPANY.address, hours: COMPANY.hours },
  { city: "Dubai", role: "UAE client coverage", detail: "Client meetings by appointment", hours: "Sun–Thu, 09:00–18:00 GST" },
  { city: "London", role: "UK & Europe client coverage", detail: "Remote coverage with committed overlap", hours: "Mon–Fri, 09:00–17:00 GMT" },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Contact"
          title="Tell us what you are building"
          lead="Send the brief, however rough. We come back with scope questions, an honest range, and the parts we think you should cut."
          crumbs={[{ label: "Contact Us" }]}
        />

        <Section>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-brand">Reach us directly</h2>
              <dl className="mt-6 space-y-5">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-ink-muted/70">
                    Email
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="text-lg font-semibold text-brand hover:text-brand-soft"
                    >
                      {COMPANY.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-ink-muted/70">
                    Phone
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                      className="text-lg font-semibold text-brand hover:text-brand-soft"
                    >
                      {COMPANY.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-ink-muted/70">
                    WhatsApp
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`https://wa.me/${COMPANY.whatsapp.replace(/\D/g, "")}`}
                      className="text-lg font-semibold text-brand hover:text-brand-soft"
                    >
                      Start a chat
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-ink-muted/70">
                    Support hours
                  </dt>
                  <dd className="mt-1 font-medium text-ink">{COMPANY.hours}</dd>
                </div>
              </dl>

              <h2 className="mt-12 text-2xl font-bold text-brand">Offices</h2>
              <div className="mt-6 space-y-4">
                {OFFICES.map((o) => (
                  <div
                    key={o.city}
                    className="rounded-2xl border border-black/5 bg-[#F8FAFC] p-6"
                  >
                    <h3 className="font-semibold text-brand">{o.city}</h3>
                    <p className="mt-1 text-sm text-ink-muted">{o.role}</p>
                    <p className="mt-2 text-sm text-ink-muted">{o.detail}</p>
                    <p className="mt-1 text-xs text-ink-muted/70">{o.hours}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start">
              <h2 className="text-2xl font-bold text-brand">Request a quote</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                The more you can tell us about constraints — budget, deadline,
                existing systems, team — the more useful the first reply will be.
              </p>
              <div className="mt-6">
                <QuoteForm />
              </div>
            </div>
          </div>
        </Section>

        <Section tinted eyebrow="FAQ" title="Questions we get before the first call">
          <div className="max-w-3xl">
            <Faq />
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}

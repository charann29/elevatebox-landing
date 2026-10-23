import Image from "next/image";
import Link from "next/link";
import { CLIENTS, COMPANY, PROJECTS, VOICE_APP, VOICE_SEO, clientLogo } from "@/lib/content";
import { AREAS, type HydPage } from "@/lib/hyderabad";
import { Header, Footer, PillCta } from "@/components/site";
import { Crumbs, DiscoveryOffer, Faq } from "@/components/blocks";
import { JsonLd, ORG, breadcrumb, faqPage, ld, service } from "@/lib/schema";

const COL = "mx-auto w-full max-w-7xl px-5 lg:px-8";
const WA = `https://wa.me/${COMPANY.whatsapp.replace(/\D/g, "")}`;

const PROOF = [
  { v: "1,400", l: "Apps built" },
  { v: "< 6 hrs", l: "Bug response" },
  { v: "AIR 14", l: "ACM ICPC" },
  { v: "8 lakh", l: "AI calls a day, at scale" },
];

function H2({ id, children, lead }: { id: string; children: React.ReactNode; lead?: string }) {
  return (
    <div className="max-w-3xl">
      <h2 id={id} className="text-3xl font-bold leading-[1.1] sm:text-4xl">
        {children}
      </h2>
      {lead && <p className="mt-4 text-base leading-relaxed text-ink-3 sm:text-lg">{lead}</p>}
    </div>
  );
}

function Band({ id, tint, children }: { id: string; tint?: boolean; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className={tint ? "bg-canvas" : undefined}>
      <div className={`${COL} py-14 sm:py-20`}>{children}</div>
    </section>
  );
}

/** One Hyderabad landing page, laid out in the order the page-1 study recommends. */
export function HyderabadLanding({ page }: { page: HydPage }) {
  const cases = page.cases.slugs.map((s) => PROJECTS.find((p) => p.slug === s)!);
  return (
    <>
      <Header />
      <main className="flex-1">
        <JsonLd
          json={ld(
            ORG,
            {
              "@type": "ProfessionalService",
              "@id": `${COMPANY.site}${page.path}#business`,
              name: COMPANY.name,
              url: `${COMPANY.site}${page.path}`,
              telephone: COMPANY.phone,
              email: COMPANY.email,
              address: ORG.address,
              openingHours: "Mo-Sa 10:00-19:00",
              areaServed: ["Hyderabad", ...AREAS].map((name) => ({ "@type": "Place", name })),
              parentOrganization: { "@id": ORG["@id"] },
            },
            { ...service(page.serviceType, page.description, page.path), serviceType: page.serviceType },
            breadcrumb([{ name: page.h1, path: page.path }]),
            faqPage(page.faqs),
          )}
        />

        {/* ── First screen: the phrase, what is built, proof, and the way to start ── */}
        <section className="night-glow relative overflow-hidden">
          <div aria-hidden="true" className="night-grid absolute inset-0" />
          <div className={`${COL} relative pb-14 pt-10 lg:pb-20 lg:pt-14`}>
            <Crumbs items={[{ label: page.h1 }]} />
            <h1 className="mt-8 max-w-4xl text-4xl font-bold leading-[1.04] text-white sm:text-6xl">{page.h1}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">{page.sub}</p>
            <dl className="mt-9 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
              {PROOF.map((s) => (
                <div key={s.l} className="rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
                  <dt className="sr-only">{s.l}</dt>
                  <dd>
                    <p className="whitespace-nowrap font-display text-2xl font-bold text-white">{s.v}</p>
                    <p className="mt-0.5 text-xs text-white/55">{s.l}</p>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 max-w-2xl text-sm text-white/60">
              Built by founding engineers from ClickPe (YC W23) and an AI startup acquired by Microsoft.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <PillCta className="justify-between sm:justify-start">Get a quote</PillCta>
              <a href={WA} className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:border-white/40">
                Free consultation on WhatsApp
              </a>
              <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="text-center text-sm font-semibold text-white/80 hover:text-white">
                {COMPANY.phone}
              </a>
            </div>
            <p className="mt-3 text-xs text-white/45">We reply within one working day.</p>
          </div>
          <div className="relative border-t border-white/[0.07]">
            <ul className={`${COL} flex flex-wrap items-center gap-x-8 gap-y-3 py-5`} aria-label="Clients">
              {CLIENTS.map((c) => (
                <li key={c} className="flex items-center gap-2 text-sm font-semibold text-white/55">
                  <Image src={clientLogo(c)} alt="" width={120} height={100} className="size-7 rounded-full bg-white object-cover" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Band id="intro">
          <p id="intro" className="max-w-4xl font-display text-xl font-bold leading-snug text-ink sm:text-2xl">{page.intro}</p>
        </Band>

        <Band id="services" tint>
          <H2 id="services">{page.services.h2}</H2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {page.services.items.map((s) => (
              <li key={s.t}>
                <Link href={s.href} className="group block h-full rounded-3xl bg-white p-6 ring-1 ring-black/[0.07] transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5">
                  <h3 className="text-lg font-bold group-hover:text-electric">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-3">{s.d}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Band>

        <Band id="why">
          <H2 id="why">{page.why.h2}</H2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {page.why.points.map((w) => (
              <li key={w.t} className="rounded-3xl p-6 ring-1 ring-black/[0.07]">
                <h3 className="text-lg font-bold">{w.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-3">{w.d}</p>
              </li>
            ))}
          </ul>
        </Band>

        <section aria-labelledby="ai" className="px-3 sm:px-5">
          <div className="night-glow relative mx-auto max-w-[96rem] overflow-hidden rounded-[2.5rem]">
            <div aria-hidden="true" className="night-grid absolute inset-0" />
            <div className={`${COL} relative py-14 sm:py-20`}>
              <div className="max-w-3xl">
                <h2 id="ai" className="text-3xl font-bold leading-[1.1] text-white sm:text-4xl">{page.ai.h2}</h2>
                <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">{page.ai.lead}</p>
              </div>
              <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {page.ai.items.map((a) => (
                  <li key={a.t} className="rounded-3xl bg-white/[0.04] p-6 ring-1 ring-white/10">
                    <h3 className="text-lg font-bold text-white">{a.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{a.d}</p>
                  </li>
                ))}
              </ul>
              <a href={VOICE_APP} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#22c55e] px-6 py-3 text-sm font-bold text-night">
                <span aria-hidden="true" className="size-2 animate-pulse rounded-full bg-night" />
                Try Voice, our AI voice agent
              </a>
              <div className="mt-10 border-t border-white/10 pt-8">
                <p className="text-sm font-semibold text-white">AI voice agents in Hyderabad</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {[VOICE_SEO.hyderabad, VOICE_SEO.telugu, VOICE_SEO.realEstateHyd, VOICE_SEO.clinicsHyd, VOICE_SEO.coachingHyd, VOICE_SEO.loansHyd].map((l) => (
                    <li key={l.href}>
                      <a href={l.href} className="block rounded-full bg-white/[0.06] px-3.5 py-1.5 text-xs text-white/80 ring-1 ring-white/10 hover:bg-white/[0.12] hover:text-white sm:text-sm">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <Band id="process">
          <H2 id="process">{page.process.h2}</H2>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {page.process.steps.map((s, k) => (
              <li key={s.t} className="rounded-3xl p-6 ring-1 ring-black/[0.07]">
                <p className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-display text-2xl font-bold text-electric">{String(k + 1).padStart(2, "0")}</span>
                  <span className="rounded-full bg-electric/10 px-3 py-1 text-xs font-semibold text-electric">{s.when}</span>
                </p>
                <h3 className="mt-4 text-lg font-bold">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-3">{s.d}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-ink-4">Typical durations for a first version. Your quotation fixes the real ones.</p>
        </Band>

        <Band id="stack" tint>
          <H2 id="stack">{page.stack.h2}</H2>
          <dl className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {page.stack.groups.map((g) => (
              <div key={g.t}>
                <dt className="text-sm font-semibold text-ink">{g.t}</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {g.items.map((i) => (
                    <span key={i} className="rounded-full bg-white px-3 py-1.5 text-sm text-ink-2 ring-1 ring-black/[0.07]">{i}</span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Band>

        <Band id="industries">
          <H2 id="industries">{page.industries.h2}</H2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {page.industries.items.map((i) => (
              <li key={i.t}>
                <Link href={i.href} className="group block h-full rounded-3xl p-6 ring-1 ring-black/[0.07] transition hover:shadow-xl hover:shadow-black/5">
                  <h3 className="text-lg font-bold group-hover:text-electric">{i.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-3">{i.d}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Band>

        <Band id="cases" tint>
          <H2 id="cases">{page.cases.h2}</H2>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {cases.map((p) => (
              <li key={p.slug} className="overflow-hidden rounded-3xl bg-white ring-1 ring-black/[0.07]">
                <div className="grid h-64 place-items-center overflow-hidden bg-night">
                  <Image
                    src={`/assets/real-${p.slug}.jpg`}
                    alt={`${p.name} ${p.platforms.join(" and ")} app screens, built by ${COMPANY.name}`}
                    width={520}
                    height={1126}
                    className="mt-20 w-40 rounded-[1.4rem] ring-4 ring-black"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-electric">{p.sector}</p>
                  <h3 className="mt-1 text-xl font-bold">{p.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-3">{p.summary}</p>
                  <p className="mt-3 text-xs text-ink-4">{`${p.platforms.join(" · ")} · live and maintained by us`}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link href="/portfolio" className="mt-8 inline-block text-sm font-semibold text-ink hover:underline">
            See the full portfolio →
          </Link>
        </Band>

        <Band id="cost">
          <H2 id="cost" lead={page.cost.lead}>
            {page.cost.h2}
          </H2>
          <div className="mt-10 overflow-hidden rounded-3xl ring-1 ring-black/[0.07]">
            <table className="w-full text-left text-sm">
              <thead className="bg-canvas">
                <tr>
                  <th className="p-4 font-semibold text-ink sm:p-5">What decides the cost</th>
                  <th className="p-4 font-semibold text-ink sm:p-5">What we ask</th>
                </tr>
              </thead>
              <tbody>
                {page.cost.drivers.map(([k, v]) => (
                  <tr key={k} className="border-t border-line">
                    <th scope="row" className="p-4 align-top font-semibold text-ink sm:p-5">{k}</th>
                    <td className="p-4 text-ink-3 sm:p-5">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Band>

        <Band id="local" tint>
          <H2 id="local">Based in Hyderabad</H2>
          <p className="mt-4 max-w-3xl leading-relaxed text-ink-3">
            {`${COMPANY.name} (${COMPANY.legal}) works from ${COMPANY.address}, ${COMPANY.hours}. We meet clients in person across the city and work remotely with teams in India, the UAE, the UK, Europe and the US.`}
          </p>
          <p className="mt-6 text-sm font-semibold text-ink">Areas we serve</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {AREAS.map((a) => (
              <li key={a} className="rounded-full bg-white px-3.5 py-1.5 text-sm text-ink-2 ring-1 ring-black/[0.07]">{a}</li>
            ))}
          </ul>
        </Band>

        <Band id="faq">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <H2 id="faq">{`${page.h1.replace(/ Company| in Hyderabad/g, "")} FAQs`}</H2>
              <p className="mt-5 text-ink-3">
                Something else?{" "}
                <a href={WA} className="font-semibold text-electric hover:underline">Ask us on WhatsApp</a>
                {` or call ${COMPANY.phone}.`}
              </p>
            </div>
            <Faq items={page.faqs} />
          </div>
        </Band>

        <section aria-labelledby="start" className="px-3 pb-6 sm:px-5">
          <div className="night-glow relative mx-auto max-w-[96rem] overflow-hidden rounded-[2.5rem]">
            <div aria-hidden="true" className="night-grid absolute inset-0" />
            <div className={`${COL} relative grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2`}>
              <div>
                <h2 id="start" className="text-3xl font-bold leading-[1.08] text-white sm:text-5xl">Start with a free consultation</h2>
                <p className="mt-4 max-w-lg leading-relaxed text-white/60">
                  Tell us what you are building on WhatsApp or by phone, free. When you are ready, the requirement analysis
                  turns it into a written quotation.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a href={WA} className="rounded-full bg-[#22c55e] px-6 py-3 text-center text-sm font-bold text-night">WhatsApp us</a>
                  <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white">
                    {`Call ${COMPANY.phone}`}
                  </a>
                </div>
              </div>
              <DiscoveryOffer dark />
            </div>
          </div>
        </section>

        <section aria-label="Related pages">
          <ul className={`${COL} flex flex-wrap gap-2 py-12`}>
            {page.related.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="block rounded-full border border-line px-4 py-2 text-sm text-ink-2 hover:border-ink">
                  {`${r.label} →`}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}

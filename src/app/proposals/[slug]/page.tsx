import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COMPANY, OG_IMG, VOICE_APP } from "@/lib/content";
import { PROPOSALS, getProposal } from "@/lib/proposals";
import { breakEven, cpaOf, feeFor, inr, model, project, roasOf, type Month } from "@/lib/growth";
import { Header, Footer } from "@/components/site";
import { CtaBand, PageHero, Section } from "@/components/blocks";
import { JsonLd, ORG, breadcrumb, ld } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROPOSALS.map((p) => ({ slug: p.slug }));
}

const title = (p: { name: string; city: string }) => `Growth Plan for ${p.name}, ${p.city}`;
const desc = (p: { name: string; city: string }) =>
  `A 12-month growth plan for ${p.name} in ${p.city}: tech, automation, strategy and Meta ads, with the funnel and Month 6 and Month 12 numbers.`.slice(0, 160);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProposal(slug);
  if (!p) return {};
  const t = title(p);
  return {
    title: t.length > 47 ? { absolute: t } : t,
    description: desc(p),
    alternates: { canonical: `/proposals/${p.slug}` },
    robots: { index: false, follow: true },
    openGraph: { images: [OG_IMG], title: t, description: desc(p), type: "article", publishedTime: p.date },
  };
}

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

const range = (a: number, b: number) => `${inr(a)} to ${inr(b)}`;
const lc = (s: string) => s[0].toLowerCase() + s.slice(1);
const pct = (n: number) => `${Math.round(n * 1000) / 10}%`;

const H2 = ({ n, children }: { n?: string; children: React.ReactNode }) => (
  <div className="mt-14">
    {n && <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">{n}</p>}
    <h2 className="mt-1 text-2xl font-bold text-brand sm:text-3xl">{children}</h2>
  </div>
);

const Table = ({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) => (
  <>
  {/* Phones: one card per row, the header becomes each value's label. */}
  <ul className="mt-5 space-y-3 sm:hidden">
    {rows.map((r, i) => (
      <li key={i} className="rounded-2xl border border-black/10 p-4">
        <p className="font-semibold text-brand">{r[0]}</p>
        <dl className="mt-2 space-y-1.5 text-sm">
          {r.slice(1).map((c, j) => (
            <div key={j} className="flex gap-3">
              <dt className="w-28 shrink-0 text-xs uppercase tracking-wider text-ink-muted/70">{head[j + 1]}</dt>
              <dd className="leading-relaxed text-ink-muted">{c}</dd>
            </div>
          ))}
        </dl>
      </li>
    ))}
  </ul>
  <div className="mt-5 hidden overflow-x-auto rounded-2xl border border-black/10 sm:block">
    <table className="w-full min-w-[34rem] text-left text-sm">
      <thead className="bg-brand-wash text-xs uppercase tracking-wider text-ink-muted">
        <tr>{head.map((h, i) => <th key={i} className="px-4 py-3 font-semibold">{h}</th>)}</tr>
      </thead>
      <tbody className="divide-y divide-black/5">
        {rows.map((r, i) => (
          <tr key={i}>{r.map((c, j) => <td key={j} className="px-4 py-3 align-top leading-relaxed text-ink-muted">{c}</td>)}</tr>
        ))}
      </tbody>
    </table>
  </div>
  </>
);

/** Revenue added a month, bottom line (filled) inside top line (outline), Months 1 to 12. */
function Chart({ bottom, top }: { bottom: Month[]; top: Month[] }) {
  const max = Math.max(...top.map((r) => r.revenue));
  const W = 600, H = 200, bw = W / 12;
  return (
    <figure className="mt-6">
      <svg viewBox={`0 0 ${W} ${H + 24}`} className="w-full" role="img" aria-label="Revenue added a month, bottom and top line, Months 1 to 12">
        {top.map((t, i) => {
          const ht = (t.revenue / max) * H, hb = (bottom[i].revenue / max) * H;
          const x = i * bw + bw * 0.18, w = bw * 0.64;
          return (
            <g key={t.m}>
              <rect x={x} y={H - ht} width={w} height={ht} rx="3" fill="none" stroke="#013186" strokeWidth="1.5" />
              <rect x={x} y={H - hb} width={w} height={hb} rx="3" fill="#013186" />
              <text x={x + w / 2} y={H + 16} textAnchor="middle" fontSize="11" fill="#3f3f46">M{t.m}</text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-xs text-ink-muted">
        Revenue added a month. Filled: bottom line. Outline: top line. Phase 1 is Months 1 to 3, Phase 2 Months 4 to 6, Phase 3 Months 7 to 12.
      </figcaption>
    </figure>
  );
}

export default async function ProposalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProposal(slug);
  if (!p) notFound();
  const t = title(p);
  const host = p.site.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const x = model(p.industry);
  const fee = feeFor(p.industry);
  const lo = project(p.industry, "bottom", fee);
  const hi = project(p.industry, "top", fee);
  const beLo = breakEven(lo), beHi = breakEven(hi);
  const roas = roasOf(p.industry);
  const cpaLo = cpaOf(p.industry, "bottom"), cpaHi = cpaOf(p.industry, "top");
  const [m3lo, m3hi, m6lo, m6hi, m12lo, m12hi] = [lo[2], hi[2], lo[5], hi[5], lo[11], hi[11]];
  const sum = (rows: Month[], k: "revenue" | "spend") => rows.reduce((s, r) => s + r[k], 0);
  const gaps = p.facts.filter((f) => !f.ok);
  const cm1Price = x.cm1.price ? inr(x.cm1.price) : "free, booked";
  const cm1 = x.cm1.name.toLowerCase(), cm2 = x.cm2.name.toLowerCase();
  const siblings = PROPOSALS.filter((o) => o.slug !== p.slug && o.industry === p.industry)
    .sort((a, b) => Number(b.city === p.city) - Number(a.city === p.city))
    .slice(0, 5);

  const services = [
    {
      t: "Tech consulting",
      d: "We decide what to build, what to skip and what it should cost, then build it with you.",
      items: [...p.stack.slice(0, 2), `A ${cm1} page with one offer and a two-tap UPI checkout, readable by Google and Meta.`],
    },
    {
      t: "Automation and AI calling",
      d: "An AI agent calls in Telugu, Hindi or English, logs every call and books the next step.",
      items: [...p.voice.slice(0, 2), `Every ${cm1} gets a call on the right day to offer the ${cm2}.`],
    },
    {
      t: "Strategy consulting",
      d: "One offer ladder, one price sheet and one weekly number everybody watches.",
      items: [
        `Free step: ${lc(x.free)}.`,
        `${x.cm1.name} at ${cm1Price} as the first step, then the ${cm2} at about ${inr(x.cm2.price)}.`,
        "A weekly CM1 and CM2 report: what came in, from which ad, and what it cost.",
      ],
    },
    {
      t: "Performance marketing",
      d: `Meta ads from Week 1, starting at ${inr(x.spend)} a month, paid by you straight to Meta.`,
      items: [
        `Hero creative: ${x.hook}.`,
        "Every CM1 and CM2 is sent back to Meta, so it finds more people who pay, not people who click.",
        `Spend rises only while the cost per ${cm1} keeps falling.`,
      ],
    },
  ];

  const payback = beLo
    ? `Counting ad spend and our fee against the gross profit on new sales, the plan pays for itself by Month ${beHi} on the top line and Month ${beLo} on the bottom line.`
    : beHi
      ? `Counting ad spend and our fee against the gross profit on new sales, the top line pays back by Month ${beHi}. On the bottom line this trade pays back after Month 12, so we would start with a 6-week paid test before committing to the full plan.`
      : "On these assumptions the plan pays back after Month 12, so we would start with a 6-week paid test before committing to the full plan.";

  return (
    <>
      <Header />
      <main className="flex-1">
        <JsonLd
          json={ld(
            ORG,
            {
              "@type": "Article",
              headline: t,
              description: desc(p),
              datePublished: p.date,
              dateModified: p.checked > p.date ? p.checked : p.date,
              mainEntityOfPage: `${COMPANY.site}/proposals/${p.slug}`,
              author: { "@id": ORG["@id"] },
              publisher: { "@id": ORG["@id"] },
              about: { "@type": "Organization", name: p.name, url: p.site, address: { "@type": "PostalAddress", addressLocality: p.city, addressRegion: "Telangana", addressCountry: "IN" } },
            },
            breadcrumb([{ name: "Growth plans", path: "/proposals" }, { name: p.name, path: `/proposals/${p.slug}` }]),
          )}
        />
        <PageHero
          eyebrow={`Growth plan · ${p.industry} · ${p.city}`}
          title={t}
          lead={`How ${p.name} could add ${range(m6lo.revenue, m6hi.revenue)} a month by Month 6 and ${range(m12lo.revenue, m12hi.revenue)} by Month 12, with tech, automation, strategy and Meta ads run as one plan.`}
          crumbs={[{ label: "Growth plans", href: "/proposals" }, { label: p.name }]}
        />

        <Section>
          <article className="max-w-4xl">
            <p className="text-xs text-ink-muted">Written {fmt(p.date)} · website checked {fmt(p.checked)}</p>

            <div className="mt-6 rounded-2xl border border-black/10 bg-[#FFF6E9] p-5 text-sm leading-relaxed text-ink-muted">
              {p.name} is not an ElevateBox client, and this is not an endorsement by them. The website notes come from a
              public check of <a href={p.site} rel="nofollow noopener" className="underline">{host}</a> on {fmt(p.checked)}.
              The money figures are a model for a typical {p.industry.toLowerCase()} business in Hyderabad, built from the
              assumptions in Section 5, not from {p.name}&apos;s own numbers. If you run {p.name}, email{" "}
              <a href={`mailto:${COMPANY.email}?subject=${encodeURIComponent(`Growth plan: ${p.name}`)}`} className="underline">{COMPANY.email}</a>{" "}
              with your real numbers and we will redo it, or remove the page.
            </div>

            <ul className="mt-8 grid gap-3 sm:grid-cols-4">
              {[
                { k: inr(fee), d: "Our fee a month, all four services" },
                { k: range(m6lo.revenue, m6hi.revenue), d: "Revenue added in Month 6" },
                { k: range(m12lo.revenue, m12hi.revenue), d: "Revenue added in Month 12" },
                { k: beHi && beLo ? `Month ${beHi} to ${beLo}` : beHi ? `Month ${beHi}, top line` : "After Month 12", d: "Break-even, ads and fee included" },
              ].map((s) => (
                <li key={s.d} className="rounded-2xl bg-brand-wash p-4">
                  <p className="text-lg font-bold leading-tight text-brand">{s.k}</p>
                  <p className="mt-1 text-xs leading-snug text-ink-muted">{s.d}</p>
                </li>
              ))}
            </ul>

            <H2 n="First, two words">CM1 and CM2, in our terms</H2>
            <Table
              head={["Term", "What it means for this plan", "Price point"]}
              rows={[
                ["Free step", x.free, "Free"],
                [`CM1, ${x.cm1.name}`, `The number of times a month a new customer makes ${x.cm1.what}. This is the first rupee, or the first firm yes.`, cm1Price],
                [`CM2, ${x.cm2.name}`, `The number of times a month a customer goes on to ${x.cm2.what}. CM2 rate = CM2 divided by CM1.`, `About ${inr(x.cm2.price)}`],
                ["Bottom and top line", `Every number has two versions: the bottom line at a ${pct(x.rate.bottom)} CM2 rate and the top line at ${pct(x.rate.top)}.`, "Both shown"],
              ]}
            />
            <div className="mt-6 rounded-2xl bg-brand p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">In one line</p>
              <p className="mt-2 text-lg leading-relaxed">
                Don&apos;t ask a stranger for the {cm2} on day one. Win the {cm1} first, call every one of them within a
                minute, and move {Math.round(x.rate.bottom * 100)} to {Math.round(x.rate.top * 100)} in 100 of them to the {cm2}.
              </p>
            </div>

            <H2 n="Section 1">What we found on {host}, and what to change</H2>
            <p className="mt-3 leading-relaxed text-ink-muted">
              {gaps.length} of {p.facts.length} basics are missing. Each one costs enquiries before anyone picks up the phone.
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {p.facts.map((f) => (
                <li key={f.label} className="flex items-start gap-2 text-sm text-ink-muted">
                  <span aria-hidden="true" className={f.ok ? "text-green-700" : "text-amber-700"}>{f.ok ? "✓" : "✗"}</span>
                  <span>{f.label}</span>
                </li>
              ))}
            </ul>

            <H2 n="Section 2">Four services, one team, one number</H2>
            <p className="mt-3 leading-relaxed text-ink-muted">
              Most businesses buy these from four vendors who never talk to each other. We run them as one plan, judged by one
              thing: CM1 and CM2.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {services.map((s) => (
                <section key={s.t} className="rounded-2xl border border-black/10 p-5">
                  <h3 className="font-bold text-brand">{s.t}</h3>
                  <p className="mt-1 text-sm text-ink-muted">{s.d}</p>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-muted">
                    {s.items.map((i) => <li key={i}>{i}</li>)}
                  </ul>
                </section>
              ))}
            </div>
            <p className="mt-4 text-sm text-ink-muted">
              The AI calling runs on <a href={VOICE_APP} className="underline">Voice by ElevateBox</a>.
            </p>

            <H2 n="The funnel">From an ad to the {cm2}</H2>
            <ol className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-6">
              {[
                ["Reel or ad", "Meta and Instagram"],
                ["One-offer page", "no login wall"],
                [x.cm1.name, cm1Price],
                ["AI call", "within a minute"],
                ["Follow-up", "WhatsApp and a call"],
                [x.cm2.name, `about ${inr(x.cm2.price)}`],
              ].map(([a, b], i) => (
                <li key={a} className="rounded-xl bg-brand-wash p-3 text-center">
                  <p className="text-[11px] font-semibold text-ink-muted">{i + 1}</p>
                  <p className="text-sm font-bold leading-tight text-brand">{a}</p>
                  <p className="mt-1 text-xs text-ink-muted">{b}</p>
                </li>
              ))}
            </ol>
            <p className="mt-3 text-sm text-ink-muted">
              Anyone who leaves the page or the checkout gets a call and a payment link within minutes. Every stage goes back to
              Meta, so the ads learn who actually pays.
            </p>

            <H2 n="Section 3">The plan in three phases</H2>
            <Table
              head={["Phase", "Months", "Meta spend a month", "What happens"]}
              rows={[
                ["Test and book", "1 to 3", inr(lo[0].spend), "Website gaps fixed, one-offer pages and checkout live, AI calling on missed calls, two hooks per service tested."],
                ["Scale what works", "4 to 6", `${inr(lo[3].spend)} to ${inr(lo[5].spend)}`, "Cut weak ads, scale the two best, lookalikes from paying customers. Spend goes up only after your review."],
                ["Flywheel", "7 to 12", `${inr(lo[6].spend)}, held`, "Reviews, referrals and repeat orders compound; a weekly creative refresh keeps the cost per CM1 down."],
              ]}
            />

            <H2 n="Section 4">The numbers: Month 3, Month 6, Month 12</H2>
            <Table
              head={["Bottom to top line", "Month 3", "Month 6", "Month 12", "First 12 months"]}
              rows={[
                ["CM1", `${m3lo.cm1} to ${m3hi.cm1}`, `${m6lo.cm1} to ${m6hi.cm1}`, `${m12lo.cm1} to ${m12hi.cm1}`, `${lo.reduce((s, r) => s + r.cm1, 0)} to ${hi.reduce((s, r) => s + r.cm1, 0)}`],
                ["CM2", `${m3lo.cm2} to ${m3hi.cm2}`, `${m6lo.cm2} to ${m6hi.cm2}`, `${m12lo.cm2} to ${m12hi.cm2}`, `${Math.round(lo.reduce((s, r) => s + r.cm2, 0))} to ${Math.round(hi.reduce((s, r) => s + r.cm2, 0))}`],
                ["Revenue added", range(m3lo.revenue, m3hi.revenue), range(m6lo.revenue, m6hi.revenue), range(m12lo.revenue, m12hi.revenue), range(sum(lo, "revenue"), sum(hi, "revenue"))],
                ["Meta spend", inr(m3lo.spend), inr(m6lo.spend), inr(m12lo.spend), inr(sum(lo, "spend"))],
              ]}
            />
            <Chart bottom={lo} top={hi} />
            <p className="mt-4 leading-relaxed text-ink-muted">{payback}</p>

            <H2 n="Section 5">The assumptions behind every number</H2>
            <Table
              head={["Input", "Bottom line", "Top line"]}
              rows={[
                ["Return on ad spend, Month 1 / from Month 3", `${roas.bottom[0]}x / ${roas.bottom[1]}x`, `${roas.top[0]}x / ${roas.top[1]}x`],
                [`Cost per ${cm1}, Month 1 / from Month 3`, `${inr(cpaLo[0])} / ${inr(cpaLo[1])}`, `${inr(cpaHi[0])} / ${inr(cpaHi[1])}`],
                ["CM1 a month from website fixes and AI call-backs", `${x.organic.bottom}`, `${x.organic.top}`],
                ["CM2 rate", pct(x.rate.bottom), pct(x.rate.top)],
                ["Gross margin on new sales, for break-even", `${Math.round(x.margin * 100)}%`, `${Math.round(x.margin * 100)}%`],
              ]}
            />
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Revenue = CM1 × {x.cm1.price ? inr(x.cm1.price) : "₹0"} + CM2 × {inr(x.cm2.price)}. From Month 7, referrals and
              reviews add 15% a month to the CM1 that does not come from ads. Figures are before GST. Meta spend is paid by the
              business directly to Meta.
            </p>

            <H2 n="Section 6">How we work, and how we price it</H2>
            <Table
              head={["Way of working", "What it is", "When it fits"]}
              rows={[
                ["Build: co-pilot or autopilot", "We build the system (pages, checkout, CRM, AI calling) and hand it over. You own it and pay only the running cost of the AI and cloud.", "When we are both sure it works"],
                ["Strategy consulting", "We pick the right tools you already have, set them up and run them with your team. Little or no new software.", "Day one, for every client"],
                ["Paid proof of concept", "A one to two week test of an idea neither of us is sure about. You pay for the test; if it works we build, if not we stop.", "New ideas, before a big spend"],
              ]}
            />
            <p className="mt-4 leading-relaxed text-ink-muted">
              We price by what the plan can earn you in six months, not by our hours. For a {p.industry.toLowerCase()} business
              this size that is {inr(fee)} a month for Months 1 to 3,
              {beLo ? ` set so the bottom line breaks even by Month ${beLo}` : " after a paid test that shows the numbers hold"}.
              After Month 3 the fee moves only with your results.
            </p>

            <div className="mt-12 rounded-2xl bg-[#E3ECFF] p-7">
              <h2 className="text-lg font-semibold text-brand">Run {p.name}, or a business like it?</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Send us your real CM1 and CM2 numbers. In a 30-minute call we redo this plan with them and tell you which part to start with.
              </p>
              <Link href="/contact" className="mt-5 inline-block rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white">
                Redo this plan with my numbers
              </Link>
            </div>

            {siblings.length > 0 && (
              <section className="mt-12">
                <h2 className="text-lg font-semibold text-brand">More {p.industry.toLowerCase()} growth plans</h2>
                <ul className="mt-3 space-y-2 text-sm">
                  {siblings.map((o) => (
                    <li key={o.slug}>
                      <Link href={`/proposals/${o.slug}`} className="text-ink-muted underline hover:text-brand">
                        {o.name}, {o.city}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>
        </Section>
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}

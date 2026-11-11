import { VOICE_APP } from "@/lib/content";
import { cityTier, inr, type Month, type Plan } from "@/lib/growth";

// One 12-month growth plan (SkillMeet / Healing Hastha format), used by the business, industry
// and city pages under /proposals. Section 1 (the website check) shows only when we have one.

export type Fact = { label: string; ok: boolean };
export type Subject = {
  name: string; // "Lifeclinic India", or "a typical hospital & clinic business"
  industry: string;
  city: string;
  host?: string;
  facts?: Fact[];
  voice: string[];
  stack: string[];
};

export const range = (a: number, b: number) => `${inr(a)} to ${inr(b)}`;
// lower-cases a sentence start for mid-sentence use, but leaves names like WhatsApp or HTTPS alone
const lc = (s: string) => (/^[A-Z][a-z]+$/.test(s.split(/[\s-]/)[0]) ? s[0].toLowerCase() + s.slice(1) : s);
const pct = (n: number) => `${Math.round(n * 1000) / 10}%`;
const sum = (rows: Month[], k: "revenue" | "spend" | "cm1" | "cm2") => Math.round(rows.reduce((s, r) => s + r[k], 0));
export const beLabel = (g: Plan) =>
  g.beHi && g.beLo ? `Month ${g.beHi} to ${g.beLo}` : g.beHi ? `Month ${g.beHi}, top line` : "After Month 12";

const H2 = ({ n, children }: { n?: string; children: React.ReactNode }) => (
  <div className="mt-14">
    {n && <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">{n}</p>}
    <h2 className="mt-1 text-2xl font-bold text-brand sm:text-3xl">{children}</h2>
  </div>
);

export const Table = ({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) => (
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

export function KpiStrip({ g }: { g: Plan }) {
  return (
    <ul className="mt-8 grid gap-3 sm:grid-cols-4">
      {[
        { k: inr(g.fee), d: "Our fee a month, all four services" },
        { k: range(g.lo[5].revenue, g.hi[5].revenue), d: "Revenue added in Month 6" },
        { k: range(g.lo[11].revenue, g.hi[11].revenue), d: "Revenue added in Month 12" },
        { k: beLabel(g), d: "Break-even, ads and fee included" },
      ].map((s) => (
        <li key={s.d} className="rounded-2xl bg-brand-wash p-4">
          <p className="text-lg font-bold leading-tight text-brand">{s.k}</p>
          <p className="mt-1 text-xs leading-snug text-ink-muted">{s.d}</p>
        </li>
      ))}
    </ul>
  );
}

export function GrowthPlan({ s, g }: { s: Subject; g: Plan }) {
  const { x, fee, lo, hi, beLo, beHi, roas, cpaLo, cpaHi } = g;
  const [m3lo, m3hi, m6lo, m6hi, m12lo, m12hi] = [lo[2], hi[2], lo[5], hi[5], lo[11], hi[11]];
  const gaps = (s.facts ?? []).filter((f) => !f.ok);
  const cm1Price = x.cm1.price ? inr(x.cm1.price) : "free, booked";
  const cm1 = x.cm1.name.toLowerCase(), cm2 = x.cm2.name.toLowerCase();
  let n = 0;
  const sec = () => `Section ${++n}`;

  const services = [
    {
      t: "Tech consulting",
      d: "We decide what to build, what to skip and what it should cost, then build it with you.",
      items: [...s.stack.slice(0, 2), `A ${cm1} page with one offer and a two-tap UPI checkout, readable by Google and Meta.`],
    },
    {
      t: "Automation and AI calling",
      d: "An AI agent calls in Telugu, Hindi or English, logs every call and books the next step.",
      items: [...s.voice.slice(0, 2), `Every ${cm1} gets a call on the right day to offer the ${cm2}.`],
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

  // The full tech solution, each piece next to what it does for the numbers and when it is live.
  const tech: [string, string, string][] = [
    [
      gaps.length
        ? `Website fixes from Section 1: ${gaps.slice(0, 4).map((f) => lc(f.label)).join(", ")}${gaps.length > 4 ? `, and ${gaps.length - 4} more` : ""}`
        : "A fast, phone-first website with HTTPS, WhatsApp, tap-to-call and Telugu pages",
      "Every ad rupee lands on a site that loads safely, works on a phone and can be reached in one tap; more visitors become CM1",
      "Week 1 to 2",
    ],
    [`One-offer ${cm1} pages with a two-tap UPI checkout`, `Ad traffic sees one offer and one button, not a menu; this is what brings the cost per ${cm1} down`, "Week 2"],
    ["Meta Pixel, Conversions API and UTM tags on every page and checkout", "Meta learns from people who pay, not people who click; it is why the return on ad spend rises from Month 1 to Month 3", "Week 2"],
    ["CRM with stages: enquiry, CM1, follow-up, CM2", "No lead is lost and every stage is a number; follow-ups on time raise the CM2 rate", "Week 3"],
    ["AI calling agent in Telugu, Hindi and English on Voice by ElevateBox", "Missed, after-hours and abandoned-checkout calls are returned within a minute; this is the CM1 that does not come from ads", "Week 3 to 4"],
    ...x.tech.map(([a, b]): [string, string, string] => [a, b, "Month 2"]),
    ["WhatsApp automation: confirmations, reminders, payment links, review requests", "Fewer no-shows, more Google reviews and more referrals; this is the Phase 3 flywheel", "Month 2"],
    ["Owner dashboard: CM1, CM2, spend and cost per CM1, every morning", "Spend goes up only when the numbers say so, and weak ads are cut in days, not months", "Month 2"],
  ];

  const payback = beLo
    ? `Counting ad spend and our fee against the gross profit on new sales, the plan pays for itself by Month ${beHi} on the top line and Month ${beLo} on the bottom line.`
    : beHi
      ? `Counting ad spend and our fee against the gross profit on new sales, the top line pays back by Month ${beHi}. On the bottom line this trade pays back after Month 12, so we would start with a 6-week paid test before committing to the full plan.`
      : "On these assumptions the plan pays back after Month 12, so we would start with a 6-week paid test before committing to the full plan.";

  return (
    <>
      <KpiStrip g={g} />

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

      {s.facts && (
        <>
          <H2 n={sec()}>What we found on {s.host}, and what to change</H2>
          <p className="mt-3 leading-relaxed text-ink-muted">
            {gaps.length} of {s.facts.length} basics are missing. Each one costs enquiries before anyone picks up the phone.
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {s.facts.map((f) => (
              <li key={f.label} className="flex items-start gap-2 text-sm text-ink-muted">
                <span aria-hidden="true" className={f.ok ? "text-green-700" : "text-amber-700"}>{f.ok ? "✓" : "✗"}</span>
                <span>{f.label}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      <H2 n={sec()}>Four services, one team, one number</H2>
      <p className="mt-3 leading-relaxed text-ink-muted">
        Most businesses buy these from four vendors who never talk to each other. We run them as one plan, judged by one
        thing: CM1 and CM2.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {services.map((v) => (
          <section key={v.t} className="rounded-2xl border border-black/10 p-5">
            <h3 className="font-bold text-brand">{v.t}</h3>
            <p className="mt-1 text-sm text-ink-muted">{v.d}</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-muted">
              {v.items.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </section>
        ))}
      </div>
      <p className="mt-4 text-sm text-ink-muted">
        The AI calling runs on <a href={VOICE_APP} className="underline">Voice by ElevateBox</a>.
      </p>

      <H2 n={sec()}>The full tech solution, side by side with performance</H2>
      <p className="mt-3 leading-relaxed text-ink-muted">
        What we build on the left; what it does for the ads, the CM1 and the CM2 on the right. Each piece is judged by that
        column, not by how good it looks.
      </p>
      <Table head={["What we build", "What it does for performance", "Live by"]} rows={tech} />

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

      <H2 n={sec()}>The plan in three phases</H2>
      <Table
        head={["Phase", "Months", "Meta spend a month", "What happens"]}
        rows={[
          ["Test and book", "1 to 3", inr(lo[0].spend), "Website gaps fixed, one-offer pages and checkout live, AI calling on missed calls, two hooks per service tested."],
          ["Scale what works", "4 to 6", `${inr(lo[3].spend)} to ${inr(lo[5].spend)}`, "Cut weak ads, scale the two best, lookalikes from paying customers. Spend goes up only after your review."],
          ["Flywheel", "7 to 12", `${inr(lo[6].spend)}, held`, "Reviews, referrals and repeat orders compound; a weekly creative refresh keeps the cost per CM1 down."],
        ]}
      />

      <H2 n={sec()}>The numbers: Month 3, Month 6, Month 12</H2>
      <Table
        head={["Bottom to top line", "Month 3", "Month 6", "Month 12", "First 12 months"]}
        rows={[
          ["CM1", `${m3lo.cm1} to ${m3hi.cm1}`, `${m6lo.cm1} to ${m6hi.cm1}`, `${m12lo.cm1} to ${m12hi.cm1}`, `${sum(lo, "cm1")} to ${sum(hi, "cm1")}`],
          ["CM2", `${m3lo.cm2} to ${m3hi.cm2}`, `${m6lo.cm2} to ${m6hi.cm2}`, `${m12lo.cm2} to ${m12hi.cm2}`, `${sum(lo, "cm2")} to ${sum(hi, "cm2")}`],
          ["Revenue added", range(m3lo.revenue, m3hi.revenue), range(m6lo.revenue, m6hi.revenue), range(m12lo.revenue, m12hi.revenue), range(sum(lo, "revenue"), sum(hi, "revenue"))],
          ["Meta spend", inr(m3lo.spend), inr(m6lo.spend), inr(m12lo.spend), inr(sum(lo, "spend"))],
        ]}
      />
      <Chart bottom={lo} top={hi} />
      <p className="mt-4 leading-relaxed text-ink-muted">{payback}</p>

      <H2 n={sec()}>The assumptions behind every number</H2>
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
        Prices and spend are set for {cityTier(s.city)}. Revenue = CM1 × {x.cm1.price ? inr(x.cm1.price) : "₹0"} + CM2 ×{" "}
        {inr(x.cm2.price)}. From Month 7, referrals and reviews add 15% a month to the CM1 that does not come from ads.
        Figures are before GST. Meta spend is paid by the business directly to Meta.
      </p>

      <H2 n={sec()}>How we work, and how we price it</H2>
      <Table
        head={["Way of working", "What it is", "When it fits"]}
        rows={[
          ["Build: co-pilot or autopilot", "We build the system (pages, checkout, CRM, AI calling) and hand it over. You own it and pay only the running cost of the AI and cloud.", "When we are both sure it works"],
          ["Strategy consulting", "We pick the right tools you already have, set them up and run them with your team. Little or no new software.", "Day one, for every client"],
          ["Paid proof of concept", "A one to two week test of an idea neither of us is sure about. You pay for the test; if it works we build, if not we stop.", "New ideas, before a big spend"],
        ]}
      />
      <p className="mt-4 leading-relaxed text-ink-muted">
        We price by what the plan can earn you in six months, not by our hours. For a {s.industry.toLowerCase()} business
        this size in {cityTier(s.city)} that is {inr(fee)} a month for Months 1 to 3,
        {beLo ? ` set so the bottom line breaks even by Month ${beLo}` : " after a paid test that shows the numbers hold"}.
        After Month 3 the fee moves only with your results.
      </p>
    </>
  );
}

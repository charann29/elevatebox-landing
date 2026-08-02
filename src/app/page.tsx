import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ACCREDITATIONS,
  CATEGORIES,
  CLIENTS,
  COMPANY,
  CREDENTIALS,
  FAQS,
  POSTS,
  PROCESS_STEPS,
  PROJECTS,
  STATS,
} from "@/lib/content";
import { Header, Footer } from "@/components/site";
import { Faq, QuoteForm } from "@/components/blocks";
import { ServiceBands } from "@/components/service-bands";

export const metadata: Metadata = {
  title: `${COMPANY.name} — Product Engineering, Design & AI Delivery`,
  description:
    "Mobile and web product development, UI/UX, cloud, data, and AI delivery from Hyderabad. We scope honestly, ship in increments, and hand over something your team can run.",
  alternates: { canonical: "/" },
};

const SHELL = "mx-auto w-full max-w-[78rem] px-6 lg:px-10";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="label">{children}</p>;
}

/* Section wrapper local to the homepage. The shared `Section` in blocks.tsx
   still carries the old tinted-card styling used by the inner routes; this
   one is the ink/hairline treatment. */
function Band({
  id,
  eyebrow,
  title,
  lead,
  children,
  tinted,
  bordered = true,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  children: React.ReactNode;
  tinted?: boolean;
  bordered?: boolean;
}) {
  return (
    <section
      id={id}
      className={[
        tinted ? "bg-surface-2" : "bg-surface",
        bordered ? "border-t border-line" : "",
      ].join(" ")}
    >
      <div className={`${SHELL} py-20 lg:py-28`}>
        {(eyebrow || title) && (
          <header className="max-w-3xl">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && (
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{title}</h2>
            )}
            {lead && (
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-3">
                {lead}
              </p>
            )}
          </header>
        )}
        <div className={eyebrow || title ? "mt-14" : undefined}>{children}</div>
      </div>
    </section>
  );
}

const ArrowRight = ({ className = "size-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M5 12h14m-6-6 6 6-6 6" />
  </svg>
);

/* What we actually do with AI, stated as capabilities rather than adjectives.
   No sparkle icons: on a page selling engineering, the credible way to look
   AI-native is to name the systems, not to decorate the section. */
const AI_WORK = [
  {
    t: "Retrieval over your own documents",
    d: "Vector search across contracts, tickets, or manuals, with the source passage shown next to every answer so a wrong one is visible immediately.",
  },
  {
    t: "Agents with bounded permissions",
    d: "Multi-step agents that call your tools and APIs under an explicit allow-list, with a reviewable log of every action taken.",
  },
  {
    t: "Extraction from messy input",
    d: "Invoices, prescriptions, and handwritten forms turned into structured rows, with a confidence score and a human queue for the uncertain ones.",
  },
  {
    t: "Voice and Indian languages",
    d: "Speech in and out in Telugu, Hindi, and English, for users who will speak to a product but never type into one.",
  },
  {
    t: "Evaluation before rollout",
    d: "A scored test set per feature, so a prompt or model change is measured against previous behaviour rather than spot-checked.",
  },
  {
    t: "Cost and latency budgets",
    d: "Model routing, caching, and token budgets set per feature — the difference between a demo and something you can afford at volume.",
  },
];

export default function Home() {
  const locations = CATEGORIES[4];
  const recentPosts = POSTS.slice(0, 3);

  return (
    <>
      <Header />

      <main className="flex-1">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-surface">
          <div className={`${SHELL} pb-16 pt-16 lg:pb-24 lg:pt-28`}>
            <div className="max-w-4xl">
              <p className="flex items-center gap-3 text-2xs font-semibold uppercase tracking-[0.14em] text-ink-4">
                <span
                  aria-hidden="true"
                  className="inline-block h-px w-8 bg-ink-4"
                />
                Product engineering · Hyderabad
              </p>

              <h1 className="mt-8 text-4xl font-bold sm:text-5xl lg:text-6xl">
                We build the software other
                <br className="hidden sm:block" /> teams quote for and never
                finish.
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-3">
                Mobile and web products taken end to end — discovery, design,
                engineering, launch, and the maintenance nobody puts in the
                proposal. We scope honestly, ship every two weeks, and hand over
                something your own team can run without us.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-brand"
                >
                  Start a project
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-8 py-4 text-base font-semibold text-ink transition-colors hover:border-ink"
                >
                  See the work
                </Link>
              </div>
            </div>

            {/* Credential strip — the reason to believe any of the above. */}
            <div className="mt-20 border-t border-line pt-8">
              <Eyebrow>The people doing the work have come from</Eyebrow>
              <dl className="mt-6 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-5">
                {CREDENTIALS.map((c) => (
                  <div key={c.k}>
                    <dt className="text-sm font-semibold text-ink">{c.k}</dt>
                    <dd className="mt-1 text-sm text-ink-2">{c.v}</dd>
                    <dd className="mt-0.5 text-xs leading-snug text-ink-4">
                      {c.note}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ── Clients ──────────────────────────────────────────────────
            Wordmarks, not logos. The only real client mark on file is
            8Meds; the other four "logos" in /assets were generated icons —
            a plus sign, a briefcase, a sprout — which read as clipart next
            to type this size. Names set in the page's own face are honest
            and look deliberate. Swap in real SVG marks as clients supply
            them, all five together or not at all. */}
        <section className="border-y border-line bg-surface-2">
          <div className={`${SHELL} py-12`}>
            <p className="label text-center">
              Products we designed, built, and still support
            </p>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-5 sm:gap-x-16">
              {CLIENTS.map((c) => (
                <li
                  key={c}
                  className="text-lg font-semibold tracking-[-0.01em] text-ink-3 transition-colors hover:text-ink"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Accreditation strip. Renders only when ACCREDITATIONS holds marks
            the company genuinely has — see the note in content.ts. */}
        {ACCREDITATIONS.length > 0 && (
          <section className="border-b border-line bg-surface py-8">
            <div
              className={`${SHELL} flex flex-wrap items-center justify-center gap-x-14 gap-y-6`}
            >
              {ACCREDITATIONS.map((a) => (
                <div key={a.name} className="flex items-center gap-3">
                  <Image
                    src={a.img}
                    alt=""
                    width={40}
                    height={40}
                    className="size-10 opacity-70"
                  />
                  <div>
                    <p className="text-sm font-semibold text-ink">{a.name}</p>
                    <p className="font-mono text-xs text-ink-4">{a.id}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Positioning ──────────────────────────────────────────────── */}
        <Band bordered={false}>
          <div className="grid gap-16 lg:grid-cols-[1fr_1.05fr]">
            <div>
              <Eyebrow>How we work</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                A delivery company, not a deck company
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-ink-3">
                Most project failures are scoping failures, not engineering
                failures. So we spend the first weeks arguing about scope,
                write the trade-offs down, and then build against a plan that
                survived scrutiny.
              </p>
              <p className="mt-4 leading-relaxed text-ink-3">
                You own the repository, the cloud accounts, and the credentials
                from the first commit. Leaving us should be easy — which is
                exactly what keeps the work honest.
              </p>
              <Link
                href="/about"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand"
              >
                More about how we work
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <dl className="grid grid-cols-2 border-l border-t border-line">
              {[
                {
                  t: "Honest scoping",
                  d: "If a simpler build — or no build — serves you better, we say so during discovery.",
                },
                {
                  t: "You own everything",
                  d: "Repositories, infrastructure, and credentials in your name throughout.",
                },
                {
                  t: "Increments, not demos",
                  d: "Something on a real environment every two weeks, not a slide deck.",
                },
                {
                  t: "Instrumented before launch",
                  d: "Logging, tracing, and crash reporting wired in before release day.",
                },
              ].map((c) => (
                <div key={c.t} className="border-b border-r border-line p-7">
                  <dt className="font-semibold text-ink">{c.t}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ink-3">
                    {c.d}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Band>

        {/* ── Commitments ──────────────────────────────────────────────── */}
        <section className="border-y border-line bg-ink">
          <div className={`${SHELL} py-14`}>
            <dl className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="text-3xl font-bold text-white">{s.value}</dt>
                  <dd className="mt-2 text-sm leading-snug text-white/55">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Services ─────────────────────────────────────────────────── */}
        <ServiceBands />

        {/* ── Selected work ────────────────────────────────────────────── */}
        <Band
          eyebrow="Selected work"
          title="Five products, still in service"
          lead="Every one of these was designed, built, and is still maintained by this team. No case study is written about a project we only advised on."
        >
          <ul className="border-t border-line">
            {PROJECTS.map((p) => (
              <li
                key={p.slug}
                className="group grid gap-4 border-b border-line py-8 lg:grid-cols-[14rem_1fr_9rem] lg:items-baseline lg:gap-10"
              >
                <div>
                  <h3 className="text-xl font-semibold text-ink">{p.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.1em] text-ink-4">
                    {p.sector}
                  </p>
                </div>
                <p className="leading-relaxed text-ink-3">{p.summary}</p>
                <p className="font-mono text-xs text-ink-4 lg:text-right">
                  {p.platforms.join(" · ")}
                </p>
              </li>
            ))}
          </ul>
          <Link
            href="/portfolio"
            className="group mt-10 inline-flex items-center gap-2 text-sm font-semibold text-brand"
          >
            See the full portfolio
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Band>

        {/* ── AI capability ────────────────────────────────────────────── */}
        <Band
          tinted
          eyebrow="AI delivery"
          title="AI work that survives contact with real users"
          lead="Anyone can wire a chat box to an API. The engineering is in what happens when the model is wrong, slow, or expensive — which is where most AI projects quietly die."
        >
          <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {AI_WORK.map((a) => (
              <article key={a.t} className="bg-surface p-8">
                <h3 className="font-semibold text-ink">{a.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-3">{a.d}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-ink-3">
            If a rules engine or a spreadsheet solves your problem, we will
            tell you that instead. It costs us the larger invoice and saves you
            the rebuild.
          </p>
        </Band>

        {/* ── Process ──────────────────────────────────────────────────── */}
        <Band
          eyebrow="Process"
          title="Nine steps from brief to support"
          lead="The same delivery model on every engagement. The specifics change; the discipline does not."
        >
          <ol className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {PROCESS_STEPS.map((s) => (
              <li key={s.n} className="bg-surface p-8">
                <span className="font-mono text-xs text-ink-4">{s.n}</span>
                <h3 className="mt-3 font-semibold text-ink">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-3">{s.d}</p>
              </li>
            ))}
          </ol>
        </Band>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section className="border-t border-line bg-ink">
          <div
            className={`${SHELL} flex flex-col gap-10 py-20 lg:flex-row lg:items-end lg:justify-between`}
          >
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Send the brief, however rough
              </h2>
              <p className="mt-4 leading-relaxed text-white/60">
                You get scope questions, an honest range, and the parts we think
                you should cut. No sales sequence, no deck.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-ink transition-colors hover:bg-white/90"
              >
                Start a project
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href={`https://wa.me/${COMPANY.whatsapp.replace(/\D/g, "")}`}
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-8 py-4 text-base font-semibold text-white transition-colors hover:border-white"
              >
                WhatsApp us
              </a>
            </div>
          </div>
        </section>

        {/* ── Locations ────────────────────────────────────────────────── */}
        <Band
          eyebrow="Where we deliver"
          title="Committed overlap hours, not a follow-the-sun promise"
          lead={locations.blurb}
        >
          <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {locations.items.map((l) => (
              <Link
                key={l.slug}
                href={`${locations.base}/${l.slug}`}
                className="group bg-surface p-7 transition-colors hover:bg-brand-wash"
              >
                <h3 className="font-semibold text-ink">{l.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-3">
                  {l.tagline}
                </p>
              </Link>
            ))}
          </div>
        </Band>

        {/* ── Writing ──────────────────────────────────────────────────── */}
        <Band
          tinted
          eyebrow="Writing"
          title="The decisions that change outcomes"
        >
          <div className="grid gap-px border border-line bg-line lg:grid-cols-3">
            {recentPosts.map((p) => (
              <Link
                key={p.slug}
                href={`/blogs/${p.slug}`}
                className="group flex flex-col bg-surface p-8 transition-colors hover:bg-brand-wash"
              >
                <span className="label">{p.category}</span>
                <h3 className="mt-4 flex-1 text-lg font-semibold leading-snug text-ink">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-3">
                  {p.excerpt}
                </p>
                <p className="mt-6 font-mono text-xs text-ink-4">
                  {p.readMins} min read
                </p>
              </Link>
            ))}
          </div>
          <Link
            href="/blogs"
            className="group mt-10 inline-flex items-center gap-2 text-sm font-semibold text-brand"
          >
            Read all {POSTS.length} articles
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Band>

        {/* ── FAQ + form ───────────────────────────────────────────────── */}
        <Band eyebrow="FAQ" title="Questions we get before the first call">
          <div className="grid gap-16 lg:grid-cols-[1.15fr_1fr]">
            <Faq items={FAQS} />
            <div>
              <h3 className="text-xl font-semibold text-ink">
                Still have a question?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-3">
                Ask it here and a person who works on delivery will answer.
              </p>
              <div className="mt-6">
                <QuoteForm />
              </div>
            </div>
          </div>
        </Band>

        {/* Category index — kept for internal linking and crawl depth. */}
        <section className="border-t border-line bg-surface-2">
          <div
            className={`${SHELL} flex flex-wrap justify-center gap-3 py-12`}
          >
            {CATEGORIES.map((c) => (
              <Link
                key={c.key}
                href={c.base}
                className="rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium text-ink-2 transition-colors hover:border-ink hover:text-ink"
              >
                All {c.label.toLowerCase()} ({c.items.length})
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

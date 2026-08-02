import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CATEGORIES,
  CLIENTS,
  COMPANY,
  FAQS,
  HERO_IMG,
  IMG,
  POSTS,
  PROCESS_STEPS,
  STATS,
  TESTIMONIALS,
  avatarImg,
  clientLogo,
} from "@/lib/content";
import { Header, Footer } from "@/components/site";
import { Faq, QuoteForm, Section } from "@/components/blocks";
import { ServiceBands } from "@/components/service-bands";
import { ProjectShowcase } from "@/components/project-showcase";

export const metadata: Metadata = {
  title: `${COMPANY.name} — Product Engineering, Design & AI Delivery`,
  description:
    "Mobile and web product development, UI/UX, cloud, data, and AI delivery from Hyderabad. We scope honestly, ship in increments, and hand over something your team can run.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const locations = CATEGORIES[4];
  const recentPosts = POSTS.slice(0, 3);

  return (
    <>
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-accent-soft to-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-32 size-[30rem] rounded-full bg-accent/20 blur-3xl"
          />
          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand">
                Product engineering from Hyderabad
              </span>
              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-brand sm:text-5xl lg:text-6xl">
                Software that ships.{" "}
                <span className="text-accent">And keeps running.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
                {COMPANY.name} designs and builds mobile and web products end to
                end — discovery through launch and the maintenance afterwards. We
                scope honestly, build in two-week increments, and hand over
                something your own team can run.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="rounded-full bg-brand px-8 py-4 text-center text-base font-semibold text-white shadow-lg shadow-brand/20 transition-colors hover:bg-brand-soft"
                >
                  Get a free quote
                </Link>
                <Link
                  href="/portfolio"
                  className="rounded-full border border-brand/20 bg-white px-8 py-4 text-center text-base font-semibold text-brand transition-colors hover:border-brand"
                >
                  See our work
                </Link>
              </div>

              <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <dt className="text-2xl font-bold text-brand sm:text-3xl">
                      {s.value}
                    </dt>
                    <dd className="mt-1 text-xs leading-snug text-ink-muted">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <span className="text-xs font-semibold text-ink-muted">
                  Follow us on
                </span>
                {[
                  { label: "LinkedIn", href: "#" },
                  { label: "Instagram", href: "#" },
                  { label: "X", href: "#" },
                  { label: "YouTube", href: "#" },
                  {
                    label: "WhatsApp",
                    href: `https://wa.me/${COMPANY.whatsapp.replace(/\D/g, "")}`,
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="rounded-full border border-brand/15 bg-white px-4 py-1.5 text-xs font-medium text-ink-muted transition-colors hover:border-brand hover:text-brand"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            <Image
              src={HERO_IMG}
              alt="ElevateBox delivery workspace, dashboard, and mobile app"
              width={780}
              height={680}
              priority
              className="h-auto w-full max-w-[780px] lg:-mr-8 xl:-mr-16"
            />
          </div>
        </section>

        {/* Client marquee */}
        <section className="border-y border-black/5 bg-white py-8">
          <p className="mx-auto max-w-7xl px-5 text-center text-xs font-semibold uppercase tracking-wider text-ink-muted lg:px-8">
            Trusted by teams across commerce, healthcare, AI, and the creator economy
          </p>
          <div className="mt-6 overflow-hidden">
            <div className="marquee flex w-max items-center gap-10 pr-10">
              {/* Repeat to fill the viewport, then duplicate — the -50%
                  keyframe needs exactly two identical halves to loop seamlessly. */}
              {Array.from({ length: 8 }, () => CLIENTS)
                .flat()
                .map((c, i) => (
                  <Image
                    key={`${c}-${i}`}
                    src={clientLogo(c)}
                    alt={c}
                    width={IMG.client.w}
                    height={IMG.client.h}
                    className="h-[100px] w-[120px] shrink-0 opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
                  />
                ))}
            </div>
          </div>
        </section>

        {/* About */}
        <Section>
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                About {COMPANY.name}
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand sm:text-4xl">
                A delivery company, not a deck company
              </h2>
              <p className="mt-6 leading-relaxed text-ink-muted">
                Most project failures are scoping failures, not engineering
                failures. So we spend the first weeks arguing about scope, write
                the trade-offs down, and then build against a plan that survived
                scrutiny.
              </p>
              <p className="mt-4 leading-relaxed text-ink-muted">
                You own the repository, the cloud accounts, and the credentials
                from the first commit. Leaving us should be easy — which is
                exactly what keeps the work honest.
              </p>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-soft"
              >
                More about how we work
                <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { t: "Honest scoping", d: "If a simpler build or no build serves you better, we say so during discovery." },
                { t: "You own everything", d: "Repositories, infrastructure, and credentials in your name throughout." },
                { t: "Increments, not demos", d: "Something on a real environment every two weeks, not a slide deck." },
                { t: "Instrumented before launch", d: "Logging, tracing, and crash reporting wired in before release day." },
              ].map((c) => (
                <div
                  key={c.t}
                  className="rounded-2xl border border-black/5 bg-[#F8FAFC] p-6"
                >
                  <h3 className="font-semibold text-brand">{c.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {c.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Services — full-bleed accordion bands */}
        <ServiceBands />

        <Section tinted>
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((c) => (
              <Link
                key={c.key}
                href={c.base}
                className="rounded-full border border-brand/20 bg-white px-5 py-2.5 text-sm font-semibold text-brand transition-colors hover:border-brand"
              >
                All {c.label.toLowerCase()} ({c.items.length})
              </Link>
            ))}
          </div>
        </Section>

        <ProjectShowcase />

        {/* Process */}
        <Section
          tinted
          eyebrow="Process"
          title="Nine steps from brief to support"
          lead="The same delivery model on every engagement. The specifics change; the discipline does not."
        >
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROCESS_STEPS.map((s) => (
              <li key={s.n} className="rounded-2xl bg-white p-6 shadow-sm">
                <span className="text-sm font-bold text-accent">{s.n}</span>
                <h3 className="mt-2 font-semibold text-brand">{s.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                  {s.d}
                </p>
              </li>
            ))}
          </ol>
        </Section>

        {/* CTA band */}
        <section className="bg-brand py-16 lg:py-20">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 text-center lg:flex-row lg:justify-between lg:px-8 lg:text-left">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Start work with us
              </h2>
              <p className="mt-3 max-w-xl text-white/75">
                Send the brief, however rough. You get scope questions, an honest
                range, and the parts we think you should cut.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-full bg-accent px-8 py-4 text-base font-semibold text-brand-dark transition-transform hover:scale-105"
              >
                Get a free quote
              </Link>
              <a
                href={`https://wa.me/${COMPANY.whatsapp.replace(/\D/g, "")}`}
                className="rounded-full border border-white/25 px-8 py-4 text-base font-semibold text-white transition-colors hover:border-accent hover:text-accent"
              >
                WhatsApp us
              </a>
            </div>
          </div>
        </section>

        {/* Locations */}
        <Section
          eyebrow="Where we deliver"
          title="Committed overlap hours, not a follow-the-sun promise"
          lead={locations.blurb}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {locations.items.map((l) => (
              <Link
                key={l.slug}
                href={`${locations.base}/${l.slug}`}
                className="group rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1"
              >
                <h3 className="font-semibold text-brand">{l.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {l.tagline}
                </p>
              </Link>
            ))}
          </div>
        </Section>

        {/* Testimonials */}
        <Section
          tinted
          eyebrow="Client feedback"
          title="What clients say when we ask honestly"
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={t.name + t.role}
                className="flex flex-col rounded-2xl bg-white p-7 shadow-sm"
              >
                <div className="flex gap-0.5 text-accent" aria-label="5 out of 5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} aria-hidden="true">
                      ★
                    </span>
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-black/5 pt-4">
                  <Image
                    src={avatarImg(i)}
                    alt=""
                    width={160}
                    height={160}
                    className="size-10 shrink-0 rounded-full"
                  />
                  <span>
                    <span className="block text-sm font-semibold text-brand">
                      {t.name}
                    </span>
                    <span className="block text-xs text-ink-muted">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>

        {/* Blog */}
        <Section
          eyebrow="From the blog"
          title="Writing about the decisions that change outcomes"
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((p) => (
              <Link
                key={p.slug}
                href={`/blogs/${p.slug}`}
                className="group flex flex-col rounded-2xl border border-black/5 bg-white p-7 shadow-sm transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                  {p.category}
                </span>
                <h3 className="mt-3 flex-1 text-lg font-semibold leading-snug text-brand">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {p.excerpt}
                </p>
                <p className="mt-5 border-t border-black/5 pt-4 text-xs text-ink-muted">
                  {p.readMins} min read
                </p>
              </Link>
            ))}
          </div>
          <Link
            href="/blogs"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-soft"
          >
            Read all {POSTS.length} articles
            <span aria-hidden="true">→</span>
          </Link>
        </Section>

        {/* FAQ + form */}
        <Section tinted eyebrow="FAQ" title="Questions we get before the first call">
          <div className="grid gap-12 lg:grid-cols-2">
            <Faq items={FAQS} />
            <div>
              <h3 className="text-xl font-bold text-brand">
                Still have a question?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Ask it here and a person who works on delivery will answer.
              </p>
              <div className="mt-6">
                <QuoteForm />
              </div>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}

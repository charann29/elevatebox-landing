import Image from "next/image";
import Link from "next/link";
import { COMPANY, DISCOVERY, FAQS, IMG, serviceIcon } from "@/lib/content";

export function Crumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-white/45">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="hover:text-white">
            Home
          </Link>
        </li>
        {items.map((i) => (
          <li key={i.label} className="flex items-center gap-1.5">
            <span aria-hidden="true">/</span>
            {i.href ? (
              <Link href={i.href} className="hover:text-white">
                {i.label}
              </Link>
            ) : (
              <span className="text-white/75">{i.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  crumbs?: { label: string; href?: string }[];
}) {
  return (
    <section className="night-glow relative overflow-hidden">
      <div aria-hidden="true" className="night-grid absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-10 lg:px-8 lg:pb-24 lg:pt-14">
        {crumbs && <Crumbs items={crumbs} />}
        {eyebrow && (
          <p className="mt-8 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/75">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {lead && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/65">
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  tinted,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  children: React.ReactNode;
  tinted?: boolean;
}) {
  return (
    <section id={id} className={tinted ? "bg-canvas" : undefined}>
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        {(eyebrow || title) && (
          <div className="max-w-3xl">
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-wider text-electric">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                {title}
              </h2>
            )}
            {lead && (
              <p className="mt-4 leading-relaxed text-ink-3">{lead}</p>
            )}
          </div>
        )}
        <div className={eyebrow || title ? "mt-12" : undefined}>{children}</div>
      </div>
    </section>
  );
}

export function BulletGrid({ items }: { items: { t: string; d: string }[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((i, n) => (
        <div key={i.t} className="rounded-3xl bg-white p-7 ring-1 ring-black/[0.07] transition-shadow hover:shadow-xl hover:shadow-black/5">
          <span aria-hidden="true" className="grid size-9 place-items-center rounded-xl bg-electric/10 font-display text-xs font-bold text-electric">
            {String(n + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-4 text-lg font-bold">{i.t}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-3">{i.d}</p>
        </div>
      ))}
    </div>
  );
}

export function LinkCards({
  base,
  items,
}: {
  base: string;
  items: { slug: string; name: string; tagline: string }[];
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((i, n) => (
        <Link
          key={i.slug}
          href={`${base}/${i.slug}`}
          className="group rounded-3xl bg-white p-3 ring-1 ring-black/[0.07] transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
        >
          <span className="grid h-36 place-items-center rounded-2xl bg-canvas">
            <Image src={serviceIcon(n)} alt="" width={IMG.icon.w} height={IMG.icon.h} className="h-24 w-auto" />
          </span>
          <h3 className="mt-4 px-3 text-lg font-bold">{i.name}</h3>
          <p className="mt-1.5 px-3 text-sm leading-relaxed text-ink-3">
            {i.tagline}
          </p>
          <span className="mt-3 inline-block px-3 pb-3 text-sm font-semibold text-electric">
            Read more →
          </span>
        </Link>
      ))}
    </div>
  );
}

export function Faq({
  items = FAQS,
  compact,
}: {
  items?: { q: string; a: string }[];
  compact?: boolean;
}) {
  return (
    <div className={compact ? undefined : "border-t border-line"}>
      {items.map((f) => (
        <details key={f.q} className="border-b border-line py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left font-semibold text-ink">
            {f.q}
            <svg
              className="chev size-5 shrink-0 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>
          <p className="mt-3 pr-11 text-sm leading-relaxed text-ink-3">
            {f.a}
          </p>
        </details>
      ))}
    </div>
  );
}

export function CtaBand({
  title = "Start work with us",
  lead = "Tell us what you are building. We will come back with scope, an honest range, and the parts we think you should cut.",
  cta = "Get a free quote",
}: {
  title?: string;
  lead?: string;
  cta?: string;
}) {
  return (
    <section className="px-3 py-6 sm:px-5">
      <div className="night-glow mx-auto flex max-w-7xl flex-col items-center gap-8 overflow-hidden rounded-[2rem] px-6 py-14 text-center lg:flex-row lg:justify-between lg:px-14 lg:py-16 lg:text-left">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-white/60">{lead}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-full bg-electric px-8 py-4 text-base font-semibold text-white shadow-lg shadow-electric/30 transition-transform hover:scale-105"
          >
            {cta}
          </Link>
          <a
            href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
            className="rounded-full border border-white/25 px-8 py-4 text-base font-semibold text-white transition-colors hover:border-white"
          >
            Call us
          </a>
        </div>
      </div>
    </section>
  );
}

export { QuoteForm } from "@/components/quote-form";

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-3xl space-y-5 leading-relaxed text-ink-2 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:mt-8 [&_h3]:text-lg [&_h3]:font-semibold [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-ink">
      {children}
    </div>
  );
}

/** The paid first step, as one card: price, what it includes, and one button that pays then books. */
export function DiscoveryOffer({ dark }: { dark?: boolean }) {
  const wa = `https://wa.me/${COMPANY.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi, a question about the ${DISCOVERY.title}.`)}`;
  return (
    <div className={`rounded-[2rem] p-8 sm:p-10 ${dark ? "bg-white/[0.04] text-white ring-1 ring-white/10 backdrop-blur" : "bg-white shadow-xl shadow-black/5 ring-1 ring-black/[0.07]"}`}>
      <p className={`text-xs font-semibold uppercase tracking-wider ${dark ? "text-electric-2" : "text-electric"}`}>Start here</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <h3 className={`text-2xl font-bold sm:text-3xl ${dark ? "text-white" : ""}`}>{DISCOVERY.title}</h3>
        <p className={`font-display text-4xl font-black tracking-tight ${dark ? "text-white" : "text-ink"}`}>{DISCOVERY.price}</p>
      </div>
      <ul className="mt-6 space-y-3">
        {DISCOVERY.includes.map((i) => (
          <li key={i} className={`flex items-start gap-3 text-sm ${dark ? "text-white/80" : "text-ink-2"}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="mt-0.5 size-4 shrink-0 text-[#16a34a]" aria-hidden="true">
              <path d="M5 12l5 5L20 7" />
            </svg>
            {i}
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a href={DISCOVERY.pay} className="rounded-full bg-electric px-6 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-electric/30 transition-colors hover:bg-[#2f5cf0]">
          {`Pay ${DISCOVERY.price} and pick a time`}
        </a>
        <a href={wa} className={`rounded-full border px-6 py-3.5 text-center text-sm font-semibold ${dark ? "border-white/20 text-white" : "border-black/10 text-ink"}`}>
          Ask a question first
        </a>
      </div>
      <p className={`mt-4 text-xs ${dark ? "text-white/45" : "text-ink-4"}`}>
        Secure payment on Razorpay. The calendar opens as soon as it goes through.
      </p>
    </div>
  );
}

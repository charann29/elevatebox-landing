import Image from "next/image";
import Link from "next/link";
import { COMPANY, DISCOVERY, FAQS, IMG, serviceIcon } from "@/lib/content";

/** Breadcrumbs. They sit on the dark hero band on every page, so they are white. */
export function Crumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-white/65">
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
              <span className="text-white/90">{i.label}</span>
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
    <section className="hero-3d overflow-hidden">
      <div className="mx-auto w-[min(1216px,100%-32px)] pb-16 pt-8 lg:pb-24 lg:pt-12">
        {crumbs && <Crumbs items={crumbs} />}
        {eyebrow && (
          <p className="mt-8 inline-block rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-medium text-white">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-5 max-w-4xl text-4xl font-[700] leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {lead && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
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
      <div className="mx-auto w-[min(1216px,100%-32px)] py-16 lg:py-24">
        {(eyebrow || title) && (
          <div className="max-w-3xl">
            {eyebrow && (
              <p className="text-sm font-semibold text-navy">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mt-3 text-3xl font-semibold leading-[1.1] lg:text-[44px]">
                {title}
              </h2>
            )}
            {lead && (
              <p className="mt-3.5 text-lg leading-relaxed text-ink-2">{lead}</p>
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
        <div key={i.t} className="rounded-3xl border border-line bg-white p-7 transition-colors hover:border-navy/30">
          <span aria-hidden="true" className="grid size-9 place-items-center rounded-xl bg-sky text-xs font-semibold text-navy">
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
          className="group rounded-3xl border border-line bg-white p-3 transition-colors duration-300 hover:border-navy/30"
        >
          <span className="grid h-36 place-items-center rounded-2xl bg-sky">
            <Image src={serviceIcon(n)} alt="" width={IMG.icon.w} height={IMG.icon.h} className="h-24 w-auto" />
          </span>
          <h3 className="mt-4 px-3 text-lg font-bold">{i.name}</h3>
          <p className="mt-1.5 px-3 text-sm leading-relaxed text-ink-3">
            {i.tagline}
          </p>
          <span className="mt-3 inline-block px-3 pb-3 text-sm font-semibold text-navy">
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
  cta = "Get quote now",
}: {
  title?: string;
  lead?: string;
  cta?: string;
}) {
  return (
    <section className="bg-navy py-16 text-white lg:py-[72px]">
      <div className="mx-auto flex w-[min(1216px,100%-32px)] flex-col items-start gap-7 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="max-w-[24ch] text-3xl font-semibold leading-[1.15] text-white lg:text-[40px]">
            {title}
          </h2>
          <p className="mt-2.5 max-w-xl text-[17px] text-white/75">{lead}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex h-[52px] items-center justify-center rounded-full bg-amber px-[26px] text-base font-semibold text-amber-ink transition-colors hover:bg-[#ffbf47]"
          >
            {cta}
          </Link>
          <a
            href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
            className="inline-flex h-[52px] items-center justify-center rounded-full px-[26px] text-base font-semibold text-white ring-[1.5px] ring-inset ring-white/80 transition-colors hover:bg-white/10"
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
    <div className="max-w-3xl space-y-5 leading-relaxed text-ink-2 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-8 [&_h3]:text-lg [&_h3]:font-semibold [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-ink">
      {children}
    </div>
  );
}

/** The paid first step, as one card: price, what it includes, and one button that pays then books. */
export function DiscoveryOffer() {
  const wa = `https://wa.me/${COMPANY.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi, a question about the ${DISCOVERY.title}.`)}`;
  return (
    <div className="rounded-3xl border border-line bg-white p-7 sm:p-10">
      <p className="text-sm font-semibold text-navy">Start here</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <h3 className="text-2xl font-semibold sm:text-3xl">{DISCOVERY.title}</h3>
        <p className="text-4xl font-semibold tracking-tight text-ink">{DISCOVERY.price}</p>
      </div>
      <ul className="mt-6 space-y-3">
        {DISCOVERY.includes.map((i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-ink-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true">
              <path d="M5 12l5 5L20 7" />
            </svg>
            {i}
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a href={DISCOVERY.pay} className="rounded-full bg-amber px-6 py-3.5 text-center text-sm font-semibold text-amber-ink transition-colors hover:bg-[#ffbf47]">
          {`Pay ${DISCOVERY.price} and pick a time`}
        </a>
        <a href={wa} className="rounded-full border border-line px-6 py-3.5 text-center text-sm font-semibold text-navy hover:border-navy/40">
          Ask a question first
        </a>
      </div>
      <p className="mt-4 text-xs text-ink-4">
        Secure payment on Razorpay. The calendar opens as soon as it goes through.
      </p>
    </div>
  );
}

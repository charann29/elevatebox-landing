import Image from "next/image";
import Link from "next/link";
import { COMPANY, FAQS, IMG, serviceIcon } from "@/lib/content";

export function Crumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-ink-4">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
        </li>
        {items.map((i) => (
          <li key={i.label} className="flex items-center gap-1.5">
            <span aria-hidden="true">/</span>
            {i.href ? (
              <Link href={i.href} className="hover:text-ink">
                {i.label}
              </Link>
            ) : (
              <span className="text-ink-2">{i.label}</span>
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
    <section className="relative">
      <div className="guides relative mx-auto max-w-6xl px-5 pb-16 pt-10 lg:px-8 lg:pb-20 lg:pt-14">
        {crumbs && <Crumbs items={crumbs} />}
        {eyebrow && (
          <p className="mt-6 inline-block rounded-full border border-black/5 bg-white px-3 py-1 text-xs font-medium text-ink-2">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {lead && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-3">
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
    <section id={id} className={tinted ? "bg-canvas-2" : undefined}>
      <div className="guides mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-24">
        {(eyebrow || title) && (
          <div className="max-w-3xl">
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-4">
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
        <div key={i.t} className="rounded-3xl bg-white p-7 ring-1 ring-black/5">
          <span aria-hidden="true" className="grid size-8 place-items-center rounded-full bg-canvas text-xs font-semibold text-ink-3">
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
          className="group rounded-3xl bg-white p-3 ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1"
        >
          <span className="grid h-36 place-items-center rounded-2xl bg-canvas">
            <Image src={serviceIcon(n)} alt="" width={IMG.icon.w} height={IMG.icon.h} className="h-24 w-auto" />
          </span>
          <h3 className="mt-4 px-3 text-lg font-bold">{i.name}</h3>
          <p className="mt-1.5 px-3 text-sm leading-relaxed text-ink-3">
            {i.tagline}
          </p>
          <span className="mt-3 inline-block px-3 pb-3 text-sm font-semibold text-ink opacity-0 transition-opacity group-hover:opacity-100">
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
      <div className="mx-auto flex max-w-[90rem] flex-col items-center gap-8 rounded-[2rem] bg-ink px-6 py-14 text-center lg:flex-row lg:justify-between lg:px-14 lg:py-16 lg:text-left">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-white/60">{lead}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-full bg-white px-8 py-4 text-base font-semibold text-ink transition-transform hover:scale-105"
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

export function QuoteForm({ dark }: { dark?: boolean }) {
  // ponytail: mailto action — no backend, no email provider, no spam handling.
  // Point `action` at a real endpoint when there is one.
  const field =
    "w-full rounded-xl border border-line bg-canvas px-4 py-2.5 text-sm text-ink outline-none focus:border-ink focus:bg-white";
  return (
    <form
      action={`mailto:${COMPANY.email}`}
      method="post"
      encType="text/plain"
      className={`grid gap-5 rounded-3xl bg-white p-7 text-left ${dark ? "" : "ring-1 ring-black/5"}`}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <label htmlFor="qf-name" className="text-sm font-medium text-ink">
            Name
          </label>
          <input id="qf-name" name="name" required className={field} />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="qf-email" className="text-sm font-medium text-ink">
            Email
          </label>
          <input id="qf-email" name="email" type="email" required className={field} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <label htmlFor="qf-phone" className="text-sm font-medium text-ink">
            Phone
          </label>
          <input id="qf-phone" name="phone" type="tel" className={field} />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="qf-budget" className="text-sm font-medium text-ink">
            Budget range
          </label>
          <select id="qf-budget" name="budget" className={field} defaultValue="">
            <option value="" disabled>
              Select a range
            </option>
            <option>Under ₹5 lakh</option>
            <option>₹5–15 lakh</option>
            <option>₹15–50 lakh</option>
            <option>Over ₹50 lakh</option>
            <option>Not sure yet</option>
          </select>
        </div>
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="qf-message" className="text-sm font-medium text-ink">
          What are you building?
        </label>
        <textarea id="qf-message" name="message" rows={4} required className={field} />
      </div>
      <button
        type="submit"
        className="rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand"
      >
        Request a quote
      </button>
      <p className="text-xs text-ink-muted">
        We reply within one business day. No sales sequence, no newsletter signup.
      </p>
    </form>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-3xl space-y-5 leading-relaxed text-ink-2 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:mt-8 [&_h3]:text-lg [&_h3]:font-semibold [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-ink">
      {children}
    </div>
  );
}

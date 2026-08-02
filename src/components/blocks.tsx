import Image from "next/image";
import Link from "next/link";
import { COMPANY, FAQS, IMG, serviceIcon } from "@/lib/content";

export function Crumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-white/60">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
        </li>
        {items.map((i) => (
          <li key={i.label} className="flex items-center gap-1.5">
            <span aria-hidden="true">/</span>
            {i.href ? (
              <Link href={i.href} className="hover:text-accent">
                {i.label}
              </Link>
            ) : (
              <span className="text-white/85">{i.label}</span>
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
    <section className="relative overflow-hidden bg-brand">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-[32rem] rounded-full bg-accent/20 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        {crumbs && <Crumbs items={crumbs} />}
        {eyebrow && (
          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-accent">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 max-w-4xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {lead && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
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
    <section id={id} className={tinted ? "bg-[#F8FAFC]" : undefined}>
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        {(eyebrow || title) && (
          <div className="max-w-3xl">
            {eyebrow && (
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand sm:text-4xl">
                {title}
              </h2>
            )}
            {lead && (
              <p className="mt-4 leading-relaxed text-ink-muted">{lead}</p>
            )}
          </div>
        )}
        <div className={eyebrow || title ? "mt-12" : undefined}>{children}</div>
      </div>
    </section>
  );
}

const TINTS = [
  "bg-[#E3ECFF]",
  "bg-[#F0FCFF]",
  "bg-[#FFF6E9]",
  "bg-[#EFEAFF]",
  "bg-[#E7F7EE]",
  "bg-[#FFEBE6]",
];

export function BulletGrid({ items }: { items: { t: string; d: string }[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((i, n) => (
        <div key={i.t} className={`rounded-2xl ${TINTS[n % TINTS.length]} p-7`}>
          <h3 className="font-semibold text-brand">{i.t}</h3>
          <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">{i.d}</p>
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
          className={`group rounded-2xl ${TINTS[n % TINTS.length]} p-7 transition-transform duration-300 hover:-translate-y-1`}
        >
          <Image
            src={serviceIcon(n)}
            alt=""
            width={IMG.icon.w}
            height={IMG.icon.h}
            className="mb-5 h-[130px] w-[120px]"
          />
          <h3 className="text-lg font-semibold text-brand">{i.name}</h3>
          <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
            {i.tagline}
          </p>
          <span className="mt-5 inline-block text-sm font-semibold text-brand opacity-0 transition-opacity group-hover:opacity-100">
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
    <section className="bg-brand py-14 lg:py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 text-center lg:flex-row lg:justify-between lg:px-8 lg:text-left">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-white/75">{lead}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-full bg-accent px-8 py-4 text-base font-semibold text-brand-dark transition-transform hover:scale-105"
          >
            {cta}
          </Link>
          <a
            href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
            className="rounded-full border border-white/25 px-8 py-4 text-base font-semibold text-white transition-colors hover:border-accent hover:text-accent"
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
    "w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-sm text-ink outline-none focus:border-ink";
  return (
    <form
      action={`mailto:${COMPANY.email}`}
      method="post"
      encType="text/plain"
      className={`grid gap-5 rounded-2xl border border-line p-7 ${dark ? "bg-white" : "bg-surface"}`}
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
    <div className="max-w-3xl space-y-5 leading-relaxed text-ink-muted [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-brand [&_h3]:mt-8 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-brand [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-ink">
      {children}
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, COMPANY, POSTS } from "@/lib/content";
import { NavLink } from "@/components/nav-link";

// ponytail: nav dropdowns and FAQ accordions use native <details>/CSS hover.
// Zero client JS. Swap to a client component only if you need focus trapping
// or scroll-spy.

export function Logo({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/logo.svg"
      alt={COMPANY.name}
      width={180}
      height={50}
      className={className}
      priority
    />
  );
}

const FLAT_NAV = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
];

const TAIL_NAV = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Careers", href: "/careers" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact" },
];

function Dropdown({ cat }: { cat: (typeof CATEGORIES)[number] }) {
  const cols = cat.items.length > 12 ? 3 : 2;
  return (
    <li className="group relative">
      <NavLink
        href={cat.base}
        className="flex cursor-pointer items-center gap-1 whitespace-nowrap py-2 text-xs font-medium transition-colors 2xl:text-[0.7rem] 3xl:text-sm 5xl:text-[1rem]"
        idleClassName="text-ink-muted group-hover:text-brand"
      >
        {cat.label}
        <svg
          className="size-3.5 transition-transform group-hover:rotate-180"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </NavLink>
      <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-1 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-2xl shadow-brand/10">
          <p className="mb-3 max-w-md px-2 text-xs leading-relaxed text-ink-muted">
            {cat.blurb}
          </p>
          <ul
            className="grid gap-x-4 gap-y-0.5"
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(13rem, 1fr))` }}
          >
            {cat.items.map((i) => (
              <li key={i.slug}>
                <Link
                  href={`${cat.base}/${i.slug}`}
                  className="block whitespace-nowrap rounded-lg px-2 py-1.5 text-sm text-ink-muted transition-colors hover:bg-accent-soft hover:text-brand"
                >
                  {i.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={cat.base}
            className="mt-3 block border-t border-black/5 px-2 pt-3 text-sm font-semibold text-brand hover:text-brand-soft"
          >
            View all {cat.label.toLowerCase()} →
          </Link>
        </div>
      </div>
    </li>
  );
}

const WhatsAppIcon = ({ className = "size-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.2 14.1c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.6-2.7-1.2-4.4-3.9-4.5-4.1-.1-.2-1-1.4-1-2.6s.6-1.8.9-2.1c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2 0 .4-.1.5l-.3.4c-.1.1-.3.3-.1.6.1.3.6 1.1 1.3 1.7.9.8 1.6 1 1.9 1.2.2.1.4.1.5-.1l.7-.8c.2-.2.3-.2.5-.1l1.8.9c.2.1.4.2.4.3.1.2.1.7-.1 1.2Z" />
  </svg>
);

const PhoneIcon = ({ className = "size-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2Z" />
  </svg>
);

function TopBar() {
  return (
    <div className="hidden border-b border-line bg-surface-2 lg:block">
      <div className="mx-auto flex max-w-[78rem] items-center justify-between px-6 py-2 text-xs text-ink-3 lg:px-10">
        <p>{COMPANY.timings}</p>
        <div className="flex items-center gap-6">
          <a
            href={`mailto:${COMPANY.email}`}
            className="transition-colors hover:text-ink"
          >
            {COMPANY.email}
          </a>
          <a
            href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
            className="transition-colors hover:text-ink"
          >
            {COMPANY.phone}
          </a>
        </div>
      </div>
    </div>
  );
}

export function FloatingActions() {
  return (
    <>
      <a
        href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
        aria-label="Call us"
        className="fixed bottom-6 left-6 z-40 grid size-12 place-items-center rounded-full bg-ink text-white shadow-lg transition-transform hover:scale-110"
      >
        <PhoneIcon className="size-5" />
      </a>
      <a
        href={`https://wa.me/${COMPANY.whatsapp.replace(/\D/g, "")}`}
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 grid size-12 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
      >
        <WhatsAppIcon className="size-7" />
      </a>
    </>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-surface/85 backdrop-blur-md">
      <TopBar />
      <div className="mx-auto flex max-w-[78rem] items-center justify-between gap-6 px-6 lg:px-10">
        <Link href="/" aria-label={`${COMPANY.name} home`} className="py-2">
          <Logo className="h-auto w-[10rem] shrink-0 object-contain sm:w-[12rem] lg:w-[220px] 3xl:w-[300px]" />
        </Link>

        <nav className="hidden xl:block" aria-label="Main">
          <ul className="flex items-center gap-3 2xl:gap-4 3xl:gap-5">
            {FLAT_NAV.map((n) => (
              <li key={n.href}>
                <NavLink
                  href={n.href}
                  exact={n.href === "/"}
                  className="block cursor-pointer whitespace-nowrap py-2 text-xs font-medium transition-colors 2xl:text-[0.7rem] 3xl:text-sm 5xl:text-[1rem]"
                >
                  {n.label}
                </NavLink>
              </li>
            ))}
            {CATEGORIES.map((c) => (
              <Dropdown key={c.key} cat={c} />
            ))}
            {TAIL_NAV.map((n) => (
              <li key={n.href}>
                <NavLink
                  href={n.href}
                  className="block cursor-pointer whitespace-nowrap py-2 text-xs font-medium transition-colors 2xl:text-[0.7rem] 3xl:text-sm 5xl:text-[1rem]"
                >
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden shrink-0 items-center gap-4 xl:flex">
          <a
            href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-1.5 whitespace-nowrap text-xs font-medium text-ink-2 transition-colors hover:text-ink"
          >
            <PhoneIcon className="size-3.5" />
            {COMPANY.phone}
          </a>
          <Link
            href="/contact"
            className="whitespace-nowrap rounded-full bg-ink px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand 3xl:text-sm"
          >
            Start a project
          </Link>
        </div>

        {/* Mobile */}
        <details className="xl:hidden">
          <summary
            className="my-3 flex size-10 cursor-pointer list-none items-center justify-center rounded-lg border border-black/10 text-brand"
            aria-label="Toggle navigation menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </summary>
          <div className="absolute inset-x-0 top-full max-h-[80vh] overflow-y-auto border-b border-black/5 bg-white p-5 shadow-lg">
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {FLAT_NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="rounded-lg px-3 py-2.5 font-medium text-ink-muted hover:bg-accent-soft hover:text-brand"
                >
                  {n.label}
                </Link>
              ))}
              {CATEGORIES.map((c) => (
                <details key={c.key} className="rounded-lg">
                  <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2.5 font-medium text-ink-muted">
                    {c.label}
                    <svg
                      className="chev size-4 transition-transform"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </summary>
                  <ul className="ml-3 border-l border-black/10 pl-3">
                    {c.items.map((i) => (
                      <li key={i.slug}>
                        <Link
                          href={`${c.base}/${i.slug}`}
                          className="block py-2 text-sm text-ink-muted hover:text-brand"
                        >
                          {i.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
              {TAIL_NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="rounded-lg px-3 py-2.5 font-medium text-ink-muted hover:bg-accent-soft hover:text-brand"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 space-y-2 border-t border-line pt-4">
              <a
                href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                className="block text-sm font-semibold text-ink"
              >
                {COMPANY.phone}
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="block text-sm text-ink-3"
              >
                {COMPANY.email}
              </a>
            </div>
            <Link
              href="/contact"
              className="mt-4 block rounded-full bg-ink px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Start a project
            </Link>
          </div>
        </details>
      </div>
    </header>
  );
}

export function Footer() {
  const recent = POSTS.slice(0, 4);
  return (
    <footer className="bg-ink text-white/65">
      <div className="mx-auto max-w-[78rem] px-6 py-20 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="inline-flex rounded-xl bg-white px-3 py-2">
              <Logo className="h-8 w-auto" />
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed">
              {COMPANY.tagline} Product engineering, design, and AI delivery from
              Hyderabad for clients across India, the UAE, UK, Europe, and the US.
            </p>
            <dl className="mt-7 space-y-2.5 text-sm">
              <div className="flex gap-3">
                <dt className="w-14 shrink-0 text-white/40">Email</dt>
                <dd>
                  <a className="hover:text-white" href={`mailto:${COMPANY.email}`}>
                    {COMPANY.email}
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-14 shrink-0 text-white/40">Phone</dt>
                <dd>
                  <a className="hover:text-white" href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}>
                    {COMPANY.phone}
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-14 shrink-0 text-white/40">Office</dt>
                <dd>{COMPANY.address}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-14 shrink-0 text-white/40">Hours</dt>
                <dd>{COMPANY.hours}</dd>
              </div>
            </dl>
            {/* Social pills removed — every one of them pointed at "#".
                Add them back as real profile URLs; a dead link in the footer
                undoes more trust than the icon row ever earned. */}
          </div>

          {CATEGORIES.slice(0, 3).map((c) => (
            <div key={c.key}>
              <h3 className="text-sm font-semibold text-white">{c.label}</h3>
              <ul className="mt-4 space-y-2">
                {c.items.slice(0, 8).map((i) => (
                  <li key={i.slug}>
                    <Link
                      href={`${c.base}/${i.slug}`}
                      className="text-sm transition-colors hover:text-white"
                    >
                      {i.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={c.base} className="text-sm font-semibold text-white/90">
                    View all →
                  </Link>
                </li>
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-semibold text-white">Company</h3>
            <ul className="mt-4 space-y-2">
              {[...FLAT_NAV, ...TAIL_NAV].map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-sm transition-colors hover:text-white">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/ai-solutions" className="text-sm transition-colors hover:text-white">
                  AI Solutions
                </Link>
              </li>
              <li>
                <Link href="/locations" className="text-sm transition-colors hover:text-white">
                  Locations
                </Link>
              </li>
            </ul>

            <h3 className="mt-8 text-sm font-semibold text-white">Recent posts</h3>
            <ul className="mt-4 space-y-3">
              {recent.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blogs/${p.slug}`}
                    className="text-sm leading-snug transition-colors hover:text-white"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/12 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {COMPANY.legal}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link className="hover:text-white" href="/privacy-policy">
              Privacy Policy
            </Link>
            <Link className="hover:text-white" href="/terms-and-conditions">
              Terms &amp; Conditions
            </Link>
            <Link className="hover:text-white" href="/cancellation-and-refund">
              Cancellation &amp; Refund
            </Link>
            <Link className="hover:text-white" href="/sitemap-page">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

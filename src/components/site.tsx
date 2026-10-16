import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, COMPANY, POSTS, VOICE_APP } from "@/lib/content";
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

// The pill holds what a visitor scans for first; the rest lives in the footer.
const PILL_CATS = ["services", "industries", "ai-solutions"];
const PILL_TAIL = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blogs", href: "/blogs" },
  { label: "About", href: "/about" },
];

function Dropdown({ cat }: { cat: (typeof CATEGORIES)[number] }) {
  const cols = cat.items.length > 12 ? 3 : 2;
  return (
    <li className="group relative">
      <NavLink
        href={cat.base}
        className="flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition-colors"
        activeClassName="bg-canvas text-ink"
        idleClassName="text-ink-2 hover:bg-canvas hover:text-ink"
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
      <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
        <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-2xl shadow-black/10">
          <p className="mb-3 max-w-md px-2 text-xs leading-relaxed text-ink-3">{cat.blurb}</p>
          <ul
            className="grid gap-x-4 gap-y-0.5"
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(13rem, 1fr))` }}
          >
            {cat.items.map((i) => (
              <li key={i.slug}>
                <Link
                  href={`${cat.base}/${i.slug}`}
                  className="block whitespace-nowrap rounded-xl px-2 py-1.5 text-sm text-ink-2 transition-colors hover:bg-canvas hover:text-ink"
                >
                  {i.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={cat.base}
            className="mt-3 block border-t border-black/5 px-2 pt-3 text-sm font-semibold text-ink hover:text-brand"
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

const ARROW_UP_RIGHT = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

/** The page's one primary action, everywhere: a black pill with an arrow chip. */
export function PillCta({
  href = "/book",
  children = "Book a call",
  light,
  className = "",
}: {
  href?: string;
  children?: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 text-sm font-semibold shadow-lg transition-transform hover:-translate-y-0.5 ${
        light ? "bg-white text-ink shadow-black/20" : "bg-ink text-white shadow-black/15"
      } ${className}`}
    >
      {children}
      <span
        className={`grid size-8 place-items-center rounded-full transition-transform group-hover:rotate-45 ${
          light ? "bg-ink text-white" : "bg-white/15 text-white"
        }`}
      >
        {ARROW_UP_RIGHT}
      </span>
    </Link>
  );
}

export function Header() {
  const pillCats = CATEGORIES.filter((c) => PILL_CATS.includes(c.key));
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-4 px-5 py-4 lg:px-8">
        <Link href="/" aria-label={`${COMPANY.name} home`} className="shrink-0">
          <Logo className="h-auto w-[9.5rem] object-contain sm:w-[11rem]" />
        </Link>

        <nav
          className="hidden rounded-full border border-black/5 bg-white/90 px-2 py-1.5 shadow-sm backdrop-blur xl:block"
          aria-label="Main"
        >
          <ul className="flex items-center gap-0.5">
            {pillCats.map((c) => (
              <Dropdown key={c.key} cat={c} />
            ))}
            {PILL_TAIL.map((n) => (
              <li key={n.href}>
                <NavLink
                  href={n.href}
                  className="block whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition-colors"
                  activeClassName="bg-canvas text-ink"
                  idleClassName="text-ink-2 hover:bg-canvas hover:text-ink"
                >
                  {n.label}
                </NavLink>
              </li>
            ))}
            <li>
              <a
                href={VOICE_APP}
                className="flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold text-brand transition-colors hover:bg-brand-wash"
              >
                <span aria-hidden="true" className="size-1.5 rounded-full bg-[#16a34a]" />
                Voice AI
              </a>
            </li>
          </ul>
        </nav>

        <div className="hidden xl:block">
          <PillCta>Book a call</PillCta>
        </div>

        {/* Mobile */}
        <details className="xl:hidden">
          <summary
            className="flex size-11 cursor-pointer list-none items-center justify-center rounded-full border border-black/5 bg-white text-ink shadow-sm"
            aria-label="Toggle navigation menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </summary>
          <div className="absolute inset-x-3 top-full max-h-[80vh] overflow-y-auto rounded-3xl border border-black/5 bg-white p-5 shadow-2xl">
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {FLAT_NAV.map((n) => (
                <Link key={n.href} href={n.href} className="rounded-xl px-3 py-2.5 font-medium text-ink-2 hover:bg-canvas hover:text-ink">
                  {n.label}
                </Link>
              ))}
              {CATEGORIES.map((c) => (
                <details key={c.key} className="rounded-xl">
                  <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-2.5 font-medium text-ink-2">
                    {c.label}
                    <svg className="chev size-4 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </summary>
                  <ul className="ml-3 border-l border-black/10 pl-3">
                    {c.items.map((i) => (
                      <li key={i.slug}>
                        <Link href={`${c.base}/${i.slug}`} className="block py-2 text-sm text-ink-3 hover:text-ink">
                          {i.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
              {TAIL_NAV.map((n) => (
                <Link key={n.href} href={n.href} className="rounded-xl px-3 py-2.5 font-medium text-ink-2 hover:bg-canvas hover:text-ink">
                  {n.label}
                </Link>
              ))}
            </nav>
            <a href={VOICE_APP} className="mt-4 block rounded-full border border-brand px-5 py-3 text-center text-sm font-semibold text-brand">
              Voice AI — AI phone calls
            </a>
            <Link href="/book" className="mt-2 block rounded-full bg-ink px-5 py-3 text-center text-sm font-semibold text-white">
              Book a call
            </Link>
            <div className="mt-4 space-y-1 border-t border-line pt-4 text-sm">
              <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="block font-semibold text-ink">{COMPANY.phone}</a>
              <a href={`mailto:${COMPANY.email}`} className="block text-ink-3">{COMPANY.email}</a>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}

export function Footer() {
  const recent = POSTS.slice(0, 4);
  const cols = [
    { h: "Company", links: [...FLAT_NAV, ...TAIL_NAV, { label: "Mobile App Development in Hyderabad", href: "/mobile-app-development-company-hyderabad" }] },
    ...CATEGORIES.slice(0, 2).map((c) => ({
      h: c.label,
      links: [...c.items.slice(0, 7).map((i) => ({ label: i.name, href: `${c.base}/${i.slug}` })), { label: "View all →", href: c.base }],
    })),
    {
      h: "More",
      links: [
        ...CATEGORIES.slice(2).map((c) => ({ label: c.label, href: c.base })),
        ...recent.map((p) => ({ label: p.title, href: `/blogs/${p.slug}` })),
      ],
    },
  ];
  return (
    <footer className="relative overflow-hidden text-ink-3">
      {/* The big faded wordmark behind the footer. Decorative only. */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-4 select-none text-center font-display text-[18vw] font-extrabold leading-none tracking-tighter text-ink/[0.035]"
      >
        ElevateBox
      </p>
      <div className="relative mx-auto max-w-6xl px-5 pb-10 pt-24 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo className="h-8 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              {`${COMPANY.tagline} From Hyderabad, for clients across India, the UAE, UK, Europe and the US.`}
            </p>
            <dl className="mt-6 space-y-1.5 text-sm">
              <div>
                <dt className="sr-only">Email</dt>
                <dd><a className="hover:text-ink" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></dd>
              </div>
              <div>
                <dt className="sr-only">Phone</dt>
                <dd><a className="hover:text-ink" href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}>{COMPANY.phone}</a></dd>
              </div>
              <div>
                <dt className="sr-only">Hours</dt>
                <dd>{`${COMPANY.address} · ${COMPANY.hours}`}</dd>
              </div>
            </dl>
            <a href={VOICE_APP} className="mt-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-ink hover:border-ink">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-[#16a34a]" />
              Voice by ElevateBox →
            </a>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <h3 className="text-sm font-semibold text-ink">{c.h}</h3>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm leading-snug transition-colors hover:text-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-black/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>{`© ${new Date().getFullYear()} ${COMPANY.legal}. All rights reserved.`}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link className="hover:text-ink" href="/privacy-policy">Privacy Policy</Link>
            <Link className="hover:text-ink" href="/terms-and-conditions">Terms &amp; Conditions</Link>
            <Link className="hover:text-ink" href="/cancellation-and-refund">Cancellation &amp; Refund</Link>
            <Link className="hover:text-ink" href="/sitemap-page">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

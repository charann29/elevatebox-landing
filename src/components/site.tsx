import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, COMPANY, POSTS, VOICE_APP } from "@/lib/content";
import { NavLink } from "@/components/nav-link";

// ponytail: nav dropdowns and FAQ accordions use native <details>/CSS hover.
// Zero client JS. Swap to a client component only if you need focus trapping
// or scroll-spy.

export function Logo({ className = "h-9 w-auto", white }: { className?: string; white?: boolean }) {
  return (
    <Image
      src="/logo.svg"
      alt={COMPANY.name}
      width={180}
      height={50}
      className={`${className} ${white ? "logo-white" : ""}`}
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
  { label: "Courses", href: "/courses" },
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

/** The Voice promo that sits in every mega menu and the mobile menu. */
function VoiceCard() {
  return (
    <a href={VOICE_APP} className="group/v mt-6 block rounded-2xl bg-night p-5 text-white ring-1 ring-electric/30 transition-transform hover:-translate-y-0.5">
      <span className="flex items-center gap-2 text-xs font-semibold text-[#4ade80]">
        <span aria-hidden="true" className="size-1.5 animate-pulse rounded-full bg-[#22c55e]" />
        Voice by {COMPANY.name}
      </span>
      <span className="mt-2 block font-display text-lg font-bold leading-snug">India&apos;s best conversational voice agent</span>
      <span className="mt-1 block text-xs text-white/60">8 lakh calls a day · Telugu, Hindi, English</span>
      <span className="mt-3 inline-block text-sm font-semibold text-electric-2 group-hover/v:underline">Try it free →</span>
    </a>
  );
}

const CHEVRON = (
  <svg className="size-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

/** A mega menu: spans the header width so long lists never run off the panel, opens on hover and on keyboard focus. */
function Dropdown({ cat }: { cat: (typeof CATEGORIES)[number] }) {
  const many = cat.items.length > 12;
  return (
    <li className="group">
      <NavLink
        href={cat.base}
        className="flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1.5 text-[0.95rem] tracking-[-0.025em] transition-colors"
        activeClassName="bg-white/10 text-white"
        idleClassName="text-white/70 hover:bg-white/10 hover:text-white group-hover:bg-white/10 group-hover:text-white"
      >
        {cat.label}
        {CHEVRON}
      </NavLink>
      <div className="invisible absolute inset-x-5 top-full z-50 translate-y-1 pt-2 opacity-0 transition duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 lg:inset-x-8">
        <div className="grid grid-cols-[17rem_1fr] overflow-hidden rounded-3xl bg-white shadow-2xl shadow-black/25 ring-1 ring-black/5">
          <div className="flex flex-col bg-canvas p-7">
            <p className="text-xs font-semibold uppercase tracking-wider text-electric">{cat.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-3">{cat.blurb}</p>
            <Link href={cat.base} className="mt-4 text-sm font-semibold text-ink hover:text-electric">
              {`View all ${cat.items.length} →`}
            </Link>
            <div className="mt-auto">
              <VoiceCard />
            </div>
          </div>
          <ul className={`grid content-start gap-1 p-5 ${many ? "grid-cols-3" : "grid-cols-2"}`}>
            {cat.items.map((i) => (
              <li key={i.slug}>
                <Link href={`${cat.base}/${i.slug}`} className="group/i block rounded-xl px-3 py-2.5 transition-colors hover:bg-canvas">
                  <span className="flex items-center justify-between gap-2 text-sm font-semibold text-ink group-hover/i:text-electric">
                    {i.name}
                    <span aria-hidden="true" className="opacity-0 transition-opacity group-hover/i:opacity-100">→</span>
                  </span>
                  {!many && <span className="mt-0.5 line-clamp-1 block text-xs text-ink-3">{i.tagline}</span>}
                </Link>
              </li>
            ))}
          </ul>
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
        className="fixed bottom-6 left-6 z-40 hidden size-12 sm:grid place-items-center rounded-full bg-electric text-white shadow-lg shadow-electric/30 transition-transform hover:scale-110"
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

/** The page's one primary action, everywhere: a blue pill with an arrow chip. */
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
        light ? "bg-white text-ink shadow-black/20" : "bg-electric text-white shadow-electric/30 hover:bg-[#2f5cf0]"
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
    <>
    {/* Voice, announced above every page. */}
    <a
      href={VOICE_APP}
      className="block bg-linear-to-r/srgb from-[#1d3fd6] via-electric to-[#1d3fd6] px-4 py-2.5 text-center text-xs text-white transition hover:brightness-110 sm:text-sm"
    >
      <span aria-hidden="true" className="mr-2 inline-block size-2 animate-pulse rounded-full bg-[#4ade80] align-middle" />
      <strong className="font-semibold">Voice by {COMPANY.name}</strong>
      {" — India's best conversational voice agent"}
      <span className="hidden sm:inline"> · 8 lakh calls a day</span>
      <span className="ml-2 font-semibold underline underline-offset-4">Try it free →</span>
    </a>
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.07] bg-night/80 backdrop-blur-xl">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 lg:px-8">
        <Link href="/" aria-label={`${COMPANY.name} home`} className="shrink-0">
          <Logo white className="h-auto w-[9.5rem] object-contain sm:w-[10.5rem]" />
        </Link>

        <nav className="hidden xl:block" aria-label="Main">
          <ul className="flex items-center gap-0.5">
            {pillCats.map((c) => (
              <Dropdown key={c.key} cat={c} />
            ))}
            {PILL_TAIL.map((n) => (
              <li key={n.href}>
                <NavLink
                  href={n.href}
                  className="block whitespace-nowrap rounded-full px-3 py-1.5 text-[0.95rem] tracking-[-0.025em] transition-colors"
                  activeClassName="bg-white/10 text-white"
                  idleClassName="text-white/70 hover:bg-white/10 hover:text-white"
                >
                  {n.label}
                </NavLink>
              </li>
            ))}
            <li>
              <a
                href={VOICE_APP}
                className="ml-2 flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#22c55e] px-4 py-1.5 text-sm font-bold text-night shadow-lg shadow-[#22c55e]/25 transition-transform hover:-translate-y-0.5"
              >
                <span aria-hidden="true" className="size-1.5 animate-pulse rounded-full bg-night" />
                Try Voice AI
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
            className="flex size-11 cursor-pointer list-none items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
            aria-label="Toggle navigation menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </summary>
          <div className="absolute inset-x-3 top-full max-h-[80vh] overflow-y-auto rounded-3xl border border-black/5 bg-white p-5 shadow-2xl">
            <a href={VOICE_APP} className="mb-3 flex items-center justify-center gap-2 rounded-full bg-[#22c55e] px-5 py-3 text-sm font-bold text-night">
              <span aria-hidden="true" className="size-1.5 animate-pulse rounded-full bg-night" />
              Try Voice — India&apos;s best voice agent
            </a>
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
            <Link href="/book" className="mt-4 block rounded-full bg-electric px-5 py-3 text-center text-sm font-semibold text-white">
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
    </>
  );
}

export function Footer() {
  const recent = POSTS.slice(0, 4);
  const cols = [
    { h: "Company", links: [...FLAT_NAV, ...TAIL_NAV, { label: "Mobile App Development in Hyderabad", href: "/mobile-app-development-company-hyderabad" }, { label: "AI Developers in Hyderabad", href: "/best-ai-developers-in-hyderabad" }] },
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
    <footer className="relative overflow-hidden bg-night text-white/55">
      {/* The big faded wordmark behind the footer. Decorative only. */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-[3vw] select-none text-center font-display text-[18vw] font-extrabold leading-none tracking-tighter text-white/[0.04]"
      >
        ElevateBox
      </p>
      <div className="relative mx-auto max-w-7xl px-5 pb-[14vw] pt-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo white className="h-8 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              {`${COMPANY.tagline} From Hyderabad, for clients across India, the UAE, UK, Europe and the US.`}
            </p>
            <dl className="mt-6 space-y-1.5 text-sm">
              <div>
                <dt className="sr-only">Email</dt>
                <dd><a className="hover:text-white" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></dd>
              </div>
              <div>
                <dt className="sr-only">Phone</dt>
                <dd><a className="hover:text-white" href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}>{COMPANY.phone}</a></dd>
              </div>
              <div>
                <dt className="sr-only">Hours</dt>
                <dd>{`${COMPANY.address} · ${COMPANY.hours}`}</dd>
              </div>
            </dl>
            <a href={VOICE_APP} className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white hover:border-white/40">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-[#16a34a]" />
              Voice by ElevateBox →
            </a>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <h3 className="text-sm font-semibold text-white">{c.h}</h3>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm leading-snug transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>{`© ${new Date().getFullYear()} ${COMPANY.legal}. All rights reserved.`}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link className="hover:text-white" href="/privacy-policy">Privacy Policy</Link>
            <Link className="hover:text-white" href="/terms-and-conditions">Terms &amp; Conditions</Link>
            <Link className="hover:text-white" href="/cancellation-and-refund">Cancellation &amp; Refund</Link>
            <Link className="hover:text-white" href="/sitemap-page">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

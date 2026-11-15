import { GLOBAL_GROUPS } from "@/lib/global";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, COMPANY, POSTS, VOICE_APP, VOICE_SEO, serviceIcon } from "@/lib/content";
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

/** The Voice promo that sits in every mega menu: a deep-navy card with the green live dot. */
function VoiceCard() {
  return (
    <a
      href={VOICE_APP}
      className="group/v flex h-full flex-col justify-between rounded-2xl bg-deep p-5 text-white transition-colors hover:bg-navy"
    >
      <span className="flex items-center gap-2 text-xs font-semibold text-live">
        <span aria-hidden="true" className="size-2 rounded-full bg-live" />
        {`Roopa by ${COMPANY.name}`}
      </span>
      <span>
        <span className="block text-xl font-semibold leading-snug text-white">India&apos;s best conversational voice agent</span>
        <span className="mt-1.5 block text-xs text-white/70">8 lakh calls a day · Telugu, Hindi, English</span>
        <span className="mt-4 inline-flex items-center gap-1 rounded-full bg-live px-4 py-2 text-sm font-semibold text-[#04210f]">
          Try it free <span aria-hidden="true">→</span>
        </span>
      </span>
    </a>
  );
}

const CHEVRON = (
  <svg className="size-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

/** A mega menu under the nav: the first eight items with an icon and one line each, a "View all"
 * link for the rest, and the Voice card. Opens on hover and on keyboard focus. */
function Dropdown({ cat }: { cat: (typeof CATEGORIES)[number] }) {
  const top = cat.items.slice(0, 8);
  return (
    <li className="group">
      <NavLink
        href={cat.base}
        className="flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-[15px] font-medium transition-colors"
        activeClassName="bg-sky text-navy"
        idleClassName="text-ink hover:text-navy group-hover:bg-sky group-hover:text-navy"
      >
        {cat.label}
        {CHEVRON}
      </NavLink>
      <div className="invisible absolute left-1/2 top-full z-50 w-[min(60rem,calc(100%-2.5rem))] -translate-x-1/2 translate-y-1 pt-2 opacity-0 transition-[opacity,transform,visibility] delay-200 duration-150 group-hover:visible group-hover:delay-0 group-focus-within:delay-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <div className="grid grid-cols-[1fr_16rem] gap-3 rounded-3xl border border-line bg-white p-3 shadow-[0_30px_60px_-30px_rgba(1,30,90,0.35)]">
          <div className="rounded-2xl bg-canvas p-5">
            <p className="text-sm font-semibold text-ink">{cat.label}</p>
            <p className="mt-1 text-xs text-ink-3">{cat.blurb}</p>
            <ul className="mt-4 grid grid-cols-2 gap-1">
              {top.map((i, k) => (
                <li key={i.slug}>
                  <Link href={`${cat.base}/${i.slug}`} className="group/i flex items-start gap-3 rounded-2xl p-2.5 transition-colors hover:bg-white">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-white transition-colors group-hover/i:bg-sky">
                      {cat.key === "services" ? (
                        <Image src={serviceIcon(k)} alt="" width={120} height={130} className="h-6 w-auto" />
                      ) : (
                        <span aria-hidden="true" className="text-sm font-semibold text-navy">{i.name[0]}</span>
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-ink group-hover/i:text-navy">{i.name}</span>
                      <span className="mt-0.5 line-clamp-1 text-xs text-ink-3">{i.tagline}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-line pt-3 text-sm font-semibold">
              <Link href={cat.base} className="text-navy hover:underline">{`View all ${cat.items.length} ${cat.label.toLowerCase()} →`}</Link>
              {cat.key === "services" && (
                <Link href="/mobile-app-development-company-hyderabad" className="text-ink-3 hover:text-navy">
                  App development in Hyderabad →
                </Link>
              )}
            </div>
          </div>
          <VoiceCard />
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
        className="eb-float fixed bottom-6 left-6 z-40 hidden size-12 sm:grid place-items-center rounded-full bg-navy text-white transition-transform hover:scale-110"
      >
        <PhoneIcon className="size-5" />
      </a>
      <a
        href={`https://wa.me/${COMPANY.whatsapp.replace(/\D/g, "")}`}
        aria-label="Chat on WhatsApp"
        className="eb-float fixed bottom-6 right-6 z-40 grid size-12 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
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

/** The page's one primary action, everywhere: an amber pill with an arrow chip. */
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
      className={`group inline-flex items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 text-[15px] font-semibold transition-colors ${
        light ? "bg-white text-navy" : "bg-amber text-amber-ink hover:bg-[#ffbf47]"
      } ${className}`}
    >
      {children}
      <span
        className={`grid size-8 place-items-center rounded-full transition-transform group-hover:rotate-45 ${
          light ? "bg-navy text-white" : "bg-amber-ink/10 text-amber-ink"
        }`}
      >
        {ARROW_UP_RIGHT}
      </span>
    </Link>
  );
}

/** Where to call and write, as the footer and mobile menu show it. */
const ICON = {
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm18 3-10 6L2 7",
  phone: "M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z",
  pin: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0zM12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  clock: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 4v6l4 2",
  lock: "M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2zm2 0V7a5 5 0 0 1 10 0v4",
  doc: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M9 15l2 2 4-4",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  team: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm14 18v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
};
function Icon({ d, className = "size-[18px]" }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export function Header() {
  const pillCats = CATEGORIES.filter((c) => PILL_CATS.includes(c.key));
  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-white">
      <div className="relative mx-auto flex h-[76px] w-[min(1216px,100%-32px)] items-center justify-between gap-6">
        <Link href="/" aria-label={`${COMPANY.name} home`} className="shrink-0">
          <Logo className="h-[30px] w-auto sm:h-9" />
        </Link>

        <nav className="hidden flex-1 xl:block" aria-label="Main">
          <ul className="flex items-center gap-0.5">
            <li>
              <a href={VOICE_APP} className="flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-[15px] font-medium text-navy hover:bg-sky">
                <span aria-hidden="true" className="size-2 rounded-full bg-live" />
                Voice AI
              </a>
            </li>
            {pillCats.map((c) => (
              <Dropdown key={c.key} cat={c} />
            ))}
            {PILL_TAIL.map((n) => (
              <li key={n.href}>
                <NavLink
                  href={n.href}
                  className="block whitespace-nowrap rounded-full px-3 py-2 text-[15px] font-medium transition-colors"
                  activeClassName="bg-sky text-navy"
                  idleClassName="text-ink hover:bg-sky hover:text-navy"
                >
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Link href="/book" className="hidden h-11 items-center rounded-full bg-navy px-5 text-[15px] font-semibold text-white transition-colors hover:bg-deep xl:inline-flex">
          Book a call
        </Link>

        {/* Mobile */}
        <details className="xl:hidden">
          <summary
            className="flex size-11 cursor-pointer list-none items-center justify-center rounded-full border border-line bg-white text-navy"
            aria-label="Toggle navigation menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </summary>
          <div className="absolute inset-x-0 top-full mt-2 max-h-[80vh] overflow-y-auto rounded-3xl border border-line bg-white p-5 shadow-[0_30px_60px_-30px_rgba(1,30,90,0.35)]">
            <a href={VOICE_APP} className="mb-3 flex items-center justify-center gap-2 rounded-full bg-live px-5 py-3 text-sm font-semibold text-[#04210f]">
              <span aria-hidden="true" className="size-2 rounded-full bg-[#04210f]" />
              {`Try Roopa by ${COMPANY.name}`}
            </a>
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {FLAT_NAV.map((n) => (
                <Link key={n.href} href={n.href} className="rounded-xl px-3 py-2.5 font-medium text-ink hover:bg-sky hover:text-navy">
                  {n.label}
                </Link>
              ))}
              {CATEGORIES.map((c) => (
                <details key={c.key} className="rounded-xl">
                  <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-2.5 font-medium text-ink">
                    {c.label}
                    <svg className="chev size-4 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </summary>
                  <ul className="ml-3 border-l border-line pl-3">
                    {c.items.map((i) => (
                      <li key={i.slug}>
                        <Link href={`${c.base}/${i.slug}`} className="block py-2 text-sm text-ink-3 hover:text-navy">
                          {i.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
              {TAIL_NAV.map((n) => (
                <Link key={n.href} href={n.href} className="rounded-xl px-3 py-2.5 font-medium text-ink hover:bg-sky hover:text-navy">
                  {n.label}
                </Link>
              ))}
            </nav>
            <Link href="/book" className="mt-4 block rounded-full bg-navy px-5 py-3 text-center text-sm font-semibold text-white">
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

const PROMISES = [
  { i: ICON.lock, t: "Code in your name", d: "Code, cloud and credentials" },
  { i: ICON.doc, t: "Fixed quotation", d: "Before any build starts" },
  { i: ICON.shield, t: "NDA first", d: "Before the first workshop" },
  { i: ICON.team, t: "Same team after launch", d: "Support from the people who built it" },
];

/** The Hyderabad landing pages, linked from every footer. */
const HYDERABAD = [
  { label: "Mobile app development company", href: "/mobile-app-development-company-hyderabad" },
  { label: "Hire app developers", href: "/hire-mobile-app-developers-hyderabad" },
  { label: "Web development company", href: "/web-development-company-hyderabad" },
  { label: "Software development company", href: "/software-development-company-hyderabad" },
  { label: "AI developers", href: "/best-ai-developers-in-hyderabad" },
  { label: "AI development company", href: "/ai-development-company-hyderabad" },
  { label: "Android app development", href: "/android-app-development-company-hyderabad" },
  { label: "iOS app development", href: "/ios-app-development-company-hyderabad" },
  { label: "Flutter app development", href: "/flutter-app-development-company-hyderabad" },
  { label: "MVP development", href: "/mvp-development-company-hyderabad" },
  { label: "App development in Telangana", href: "/app-development-company-telangana" },
];

export function Footer() {
  const cat = (k: string) => CATEGORIES.find((c) => c.key === k)!;
  const list = (k: string) => {
    const c = cat(k);
    return [...c.items.slice(0, 7).map((i) => ({ label: i.name, href: `${c.base}/${i.slug}` })), { label: `All ${c.label.toLowerCase()}`, href: c.base, all: true }];
  };
  const cols = [
    {
      h: "Company",
      links: [...FLAT_NAV, ...TAIL_NAV, ...CATEGORIES.filter((c) => !["services", "technologies"].includes(c.key)).map((c) => ({ label: c.label, href: c.base }))],
    },
    { h: "Services", links: list("services") },
    { h: "Technologies", links: list("technologies") },
    { h: "From the blog", links: POSTS.slice(0, 4).map((p) => ({ label: p.title, href: `/blogs/${p.slug}` })) },
  ];
  return (
    <footer className="bg-white text-[15px] text-ink-2">
      <div className="mx-auto w-[min(1216px,100%-32px)]">
        <ul className="mb-10 mt-8 grid grid-cols-1 gap-5 rounded-3xl bg-navy p-6 text-white sm:grid-cols-2 lg:mb-12 lg:mt-14 lg:grid-cols-4 lg:px-8">
          {PROMISES.map((p) => (
            <li key={p.t} className="flex items-center gap-3.5">
              <Icon d={p.i} className="size-[26px] shrink-0 text-amber" />
              <span>
                <b className="block text-base font-semibold">{p.t}</b>
                <small className="text-[13px] text-white/75">{p.d}</small>
              </span>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-2 gap-x-5 gap-y-8 pb-12 pt-2 lg:grid-cols-[1.35fr_repeat(4,1fr)] lg:gap-10">
          <div className="col-span-2 lg:col-span-1">
            <Logo className="h-[38px] w-auto" />
            <p className="mt-4 max-w-[30ch] leading-relaxed">
              We take repetitive work off your people, so your business runs faster and grows further. From Hyderabad, for clients across India, the UAE, UK, Europe and the US.
            </p>
            <ul className="mt-5 grid gap-3">
              <li className="flex items-start gap-2.5"><Icon d={ICON.mail} className="mt-0.5 size-[18px] shrink-0 text-navy" /><a className="hover:text-navy" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></li>
              <li className="flex items-start gap-2.5"><Icon d={ICON.phone} className="mt-0.5 size-[18px] shrink-0 text-navy" /><a className="hover:text-navy" href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}>{COMPANY.phone}</a></li>
              <li className="flex items-start gap-2.5 leading-snug"><Icon d={ICON.pin} className="mt-0.5 size-[18px] shrink-0 text-navy" /><span>{COMPANY.address}</span></li>
              <li className="flex items-start gap-2.5"><Icon d={ICON.clock} className="mt-0.5 size-[18px] shrink-0 text-navy" /><span>{COMPANY.hours}</span></li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              <a href="https://www.linkedin.com/company/elevatebox" target="_blank" rel="noopener" className="rounded-full border border-line px-3.5 py-1.5 text-sm font-semibold text-[#0A66C2] hover:border-[#0A66C2]">ElevateBox on LinkedIn</a>
              <a href="https://www.linkedin.com/in/charann06" target="_blank" rel="noopener" className="rounded-full border border-line px-3.5 py-1.5 text-sm font-semibold text-[#0A66C2] hover:border-[#0A66C2]">Founder on LinkedIn</a>
            </div>
            <div className="mt-5 rounded-2xl border border-line p-4">
              <a href={VOICE_APP} className="inline-flex items-center gap-2 font-semibold text-ink hover:text-navy">
                <span aria-hidden="true" className="size-2 rounded-full bg-live" />
                {`Roopa by ${COMPANY.name}`}
              </a>
              <ul className="mt-2.5 grid gap-2.5">
                {[VOICE_SEO.hyderabad, VOICE_SEO.telugu, VOICE_SEO.pricing].map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="hover:text-navy">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <h3 className="mb-4 text-[15px] font-semibold text-ink">{c.h}</h3>
              <ul className="grid gap-2.5">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={`leading-snug hover:text-navy ${"all" in l ? "font-semibold text-navy" : ""}`}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid gap-2.5 border-t border-line py-6 lg:grid-cols-[160px_1fr] lg:items-baseline lg:gap-5">
          <h3 className="text-[15px] font-semibold text-ink">In Hyderabad</h3>
          <ul className="flex flex-wrap gap-y-2 leading-normal">
            {HYDERABAD.map((l, k) => (
              <li key={l.href} className="flex items-center">
                <Link href={l.href} className="whitespace-nowrap hover:text-navy">{l.label}</Link>
                {k < HYDERABAD.length - 1 && <span aria-hidden="true" className="mx-3.5 size-1 rounded-full bg-[#b7c0d3]" />}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-2.5 border-t border-line py-6 lg:grid-cols-[160px_1fr] lg:items-baseline lg:gap-5">
          <h3 className="text-[15px] font-semibold text-ink">Outside India</h3>
          <ul className="flex flex-wrap gap-y-2 leading-normal">
            {[...GLOBAL_GROUPS.map((g) => ({ label: `App development in ${g.label.replace(/^The /, "the ")}`, href: g.pages[2].href })), { label: "All countries", href: "/global" }].map((l, k, all) => (
              <li key={l.href} className="flex items-center">
                <Link href={l.href} className="whitespace-nowrap hover:text-navy">{l.label}</Link>
                {k < all.length - 1 && <span aria-hidden="true" className="mx-3.5 size-1 rounded-full bg-[#b7c0d3]" />}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pb-8 pt-5 text-sm">
          <p>{`© ${new Date().getFullYear()} ${COMPANY.legal}. All rights reserved.`}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link className="hover:text-navy" href="/privacy-policy">Privacy Policy</Link>
            <Link className="hover:text-navy" href="/terms-and-conditions">Terms &amp; Conditions</Link>
            <Link className="hover:text-navy" href="/cancellation-and-refund">Cancellation &amp; Refund</Link>
            <Link className="hover:text-navy" href="/sitemap-page">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

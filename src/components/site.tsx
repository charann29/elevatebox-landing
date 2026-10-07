import Image from "next/image";
import Link from "next/link";
import { COMPANY } from "@/lib/content";

export const SHELL = "mx-auto w-full max-w-[76rem] px-4 sm:px-6 lg:px-10";

const NAV = [
  { label: "Portfolio", href: "/#portfolio" },
  { label: "How we build", href: "/#studio" },
  { label: "Company", href: "/#company" },
];

export const Arrow = ({ className = "size-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M5 12h14m-6-6 6 6-6 6" />
  </svg>
);

export function Logo({ dark = false, className = "h-8 w-auto" }: { dark?: boolean; className?: string }) {
  return (
    <Image
      src={dark ? "/elevatebox-logo-white.svg" : "/elevatebox-logo.svg"}
      alt={COMPANY.name}
      width={388}
      height={83}
      priority
      className={className}
    />
  );
}

export function AnnouncementBar() {
  return (
    <a
      href={COMPANY.flagship}
      className="group block bg-brand text-center text-[13px] leading-snug font-medium text-white transition-colors hover:bg-[#0a3a9c]"
    >
      <span className={`${SHELL} block py-2.5`}>
        <span className="mr-2 hidden rounded-full bg-white/15 px-2 py-0.5 font-mono text-[11px] tracking-wide uppercase sm:inline">New</span>
        Meet our flagship: AI voice agents that hold real conversations — in Telugu, Hindi and English{" "}
        <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
      </span>
    </a>
  );
}

/* Header is drawn over the navy hero on the homepage and over a white band
   elsewhere, so it takes the background it sits on. */
export function Header({ dark = false }: { dark?: boolean }) {
  const link = dark ? "text-white/70 hover:text-white" : "text-ink-3 hover:text-ink";
  return (
    <header className={dark ? "bg-navy" : "border-b border-line bg-surface"}>
      <div className={`${SHELL} flex h-16 items-center justify-between gap-6`}>
        <Link href="/" aria-label={`${COMPANY.name} home`}>
          <Logo dark={dark} className="h-7 w-auto sm:h-8" />
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-8 text-sm md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={`transition-colors ${link}`}>
              {n.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/#contact"
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            dark ? "bg-white text-navy hover:bg-white/90" : "bg-ink text-white hover:bg-ink-2"
          }`}
        >
          Contact
        </Link>
      </div>
    </header>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-2 text-white/60">
      <div className={`${SHELL} py-16`}>
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo dark className="h-8 w-auto" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              A product studio in Hyderabad. We build, launch and operate software for problems India has at scale.
            </p>
          </div>
          <div>
            <h2 className="font-mono text-[11px] tracking-[0.14em] text-white/50 uppercase">Explore</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="transition-colors hover:text-white">{n.label}</Link>
                </li>
              ))}
              <li>
                <a href={COMPANY.flagship} className="transition-colors hover:text-white">Voice Agents</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-mono text-[11px] tracking-[0.14em] text-white/50 uppercase">Contact</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={`mailto:${COMPANY.email}`} className="transition-colors hover:text-white">{COMPANY.email}</a>
              </li>
              <li>{COMPANY.city}</li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs leading-relaxed md:flex-row md:items-start md:justify-between">
          <p>
            © {year} {COMPANY.legal}
            <br />
            CIN {COMPANY.cin} · Registered in {COMPANY.city}
          </p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2">
            <Link className="hover:text-white" href="/privacy-policy">Privacy</Link>
            <Link className="hover:text-white" href="/terms-and-conditions">Terms</Link>
            <Link className="hover:text-white" href="/cancellation-and-refund">Cancellation &amp; refunds</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

// Shared building blocks for the inner pages (/services, /industries, ... and blog posts).
// Server components only: the image helpers read the file system at build time.
import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { COMPANY, DISCOVERY, HOME_STATS, PROCESS_STEPS, PROJECTS, serviceIcon } from "@/lib/content";
import { CountUp } from "@/components/count-up";
import { Crumbs } from "@/components/blocks";

export const COL = "mx-auto w-[min(1216px,100%-32px)]";

/* ------------------------------------------------------------------ */
/* Optional generated images                                           */
/* ------------------------------------------------------------------ */

/** `/assets/pages/<name>.webp` when that file is in /public, else null. Drop a file in and the page uses it on the next build. */
export function pageImage(name: string) {
  const rel = `/assets/pages/${name}.webp`;
  return fs.existsSync(path.join(process.cwd(), "public", rel)) ? rel : null;
}

const hash = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
const BGS = ["/assets/work-bg-dark.jpg", "/assets/work-bg-purple.jpg", "/assets/work-bg-green.jpg", "/assets/work-bg-blue.jpg"];
export const bgFor = (key: string) => BGS[hash(key) % BGS.length];

// Live app screens we can show. [src, name]
const SCREENS: Record<string, [string, string]> = {
  trh: ["/assets/trh-app.webp", "TRH360"],
  autopilot: ["/assets/autopilot-app.webp", "AutoPilot"],
  voice: ["/assets/real-voice.jpg", "Roopa by ElevateBox"],
  vamshi: ["/assets/real-vamshi-farms.jpg", "Vamshi Farms"],
  meds: ["/assets/real-8meds.jpg", "8Meds"],
  medibag: ["/assets/real-medibag.jpg", "MediBag"],
  oneasy: ["/assets/real-oneasy.jpg", "OnEasy"],
};
// Topic words to the two screens that fit them best; anything else picks a pair by hash.
const SCREEN_RULES: [RegExp, string, string][] = [
  [/health|fitness|clinic|pharma|medic|appointment|hospital/, "trh", "meds"],
  [/commerce|grocery|shop|retail|agri|farm|inventory|food|laundry/, "vamshi", "medibag"],
  [/voice|\bai\b|ai-|agent|automation|\brpa\b|\bml\b|vision|predict|generative|consult/, "voice", "oneasy"],
  [/fintech|financ|crm|erp|saas|business|data/, "oneasy", "autopilot"],
];
const PAIRS: [string, string][] = [["trh", "vamshi"], ["meds", "oneasy"], ["medibag", "voice"], ["vamshi", "autopilot"], ["oneasy", "trh"]];
function screensFor(key: string): [string, string][] {
  const rule = SCREEN_RULES.find(([re]) => re.test(key));
  const pair = rule ? [rule[1], rule[2]] : PAIRS[hash(key) % PAIRS.length];
  return pair.map((k) => SCREENS[k]);
}

/** A live app screen in a phone bezel. */
export function Phone({ src, alt = "", className = "" }: { src: string; alt?: string; className?: string }) {
  return (
    <span className={`block rounded-[28px] bg-[#0A1024] p-[5px] shadow-[0_40px_80px_-30px_rgba(1,20,70,0.7),0_0_0_1px_rgba(255,255,255,0.1)] ${className}`}>
      <Image src={src} alt={alt} width={520} height={1126} className="block w-full rounded-[23px]" />
    </span>
  );
}

/**
 * The hero's right-hand panel: the generated image for this page if one exists, otherwise a 3D render
 * with two live app screens on it. `chip` is a short label shown on a floating card.
 */
export function HeroVisual({ img, seed, chip, priority }: { img: string | null; seed: string; chip?: string; priority?: boolean }) {
  if (img)
    return (
      <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] ring-1 ring-white/15 lg:aspect-[5/4]">
        <Image src={img} alt="" fill priority={priority} sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
      </div>
    );
  const [a, b] = screensFor(seed);
  const stat = HOME_STATS[2];
  return (
    <div aria-hidden="true" className="relative aspect-[4/3] overflow-hidden rounded-[28px] ring-1 ring-white/15 lg:aspect-[5/4]">
      <Image src={bgFor(seed)} alt="" fill priority={priority} sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
      <span className="absolute inset-0 bg-linear-to-t from-[#040b2e]/70 via-transparent to-transparent" />
      <Phone src={a[0]} className="float absolute -bottom-[26%] left-[12%] w-[33%] -rotate-[8deg]" />
      <Phone src={b[0]} className="float absolute -bottom-[12%] right-[13%] w-[35%] rotate-[6deg] [animation-delay:-3s]" />
      {chip && (
        <span className="absolute bottom-4 left-4 inline-flex max-w-[70%] items-center gap-2 rounded-full bg-white/95 py-1.5 pl-1.5 pr-3.5 text-xs font-semibold text-ink shadow-lg sm:bottom-5 sm:left-5 sm:text-sm">
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-navy text-white sm:size-7">
            <Icon name="sparkles" className="size-3.5 sm:size-4" />
          </span>
          <span className="truncate">{chip}</span>
        </span>
      )}
      <span className="absolute right-4 top-4 rounded-2xl bg-white/95 px-3.5 py-2.5 text-left shadow-lg sm:right-5 sm:top-5 sm:px-4 sm:py-3">
        <b className="block text-lg font-semibold leading-none text-ink sm:text-2xl">
          {stat.v}
          <span className="text-amber">+</span>
        </b>
        <small className="mt-1 block max-w-[16ch] text-[11px] leading-snug text-ink-3 sm:text-xs">{stat.l}</small>
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Icons (Lucide-style, inline)                                        */
/* ------------------------------------------------------------------ */

const ICONS = {
  phone: "M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2",
  globe: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20",
  layers: "m12 2 10 5-10 5L2 7l10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  wifi: "M5 12.55a11 11 0 0 1 14 0M8.5 16.1a6 6 0 0 1 7 0M12 20h.01M2 8.82a15 15 0 0 1 20 0",
  rocket: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2zM9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",
  chart: "M3 3v18h18M7 16l4-4 4 4 5-6",
  support: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M14.83 9.17l4.24-4.24M4.93 19.07l4.24-4.24",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4",
  zap: "M13 2 3 14h9l-1 8 10-12h-9l1-8z",
  code: "m16 18 6-6-6-6M8 6l-6 6 6 6",
  palette: "M12 22a10 10 0 1 1 10-10c0 2.5-2 4-4.5 4H15a2 2 0 0 0-1.5 3.3A1.6 1.6 0 0 1 12 22zM7.5 10.5h.01M10.5 7h.01M15 7.5h.01M17 11h.01",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  database: "M12 8c4.97 0 9-1.34 9-3s-4.03-3-9-3-9 1.34-9 3 4.03 3 9 3zM21 12c0 1.66-4 3-9 3s-9-1.34-9-3M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5",
  cpu: "M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3",
  cloud: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z",
  workflow: "M3 3h6v6H3zM15 15h6v6h-6zM6 9v3a3 3 0 0 0 3 3h6",
  card: "M2 5h20v14H2zM2 10h20M6 15h4",
  cart: "M8 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM19 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM2 2h3l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6",
  map: "M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  video: "m22 8-6 4 6 4V8zM2 6h14v12H2z",
  bell: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0",
  doc: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5",
  lock: "M5 11h14v11H5zM7 11V7a5 5 0 0 1 10 0v4",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  sparkles: "M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z",
  check: "M20 6 9 17l-5-5",
  arrow: "M5 12h14M13 6l6 6-6 6",
  chat: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  truck: "M1 3h15v13H1zM16 8h4l3 3v5h-7M5.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM18.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
} as const;
export type IconName = keyof typeof ICONS;

export function Icon({ name, className = "size-5" }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  );
}

// Keyword to icon. First match wins; a card with no match gets one from FALLBACK by position.
const ICON_RULES: [RegExp, IconName][] = [
  [/ios|android|mobile|app store|native|kotlin|swift|flutter|react native|widget/i, "phone"],
  [/offline|network|sync/i, "wifi"],
  [/release|launch|store|deploy|rollout|ship/i, "rocket"],
  [/analytic|metric|report|dashboard|instrument|attribution|measure|insight|predict|forecast/i, "chart"],
  [/support|maintenance|sla|upgrade/i, "support"],
  [/secur|privacy|consent|encrypt|fraud|risk|complian|audit|kyc|protect/i, "shield"],
  [/perform|speed|fast|latency|load|peak|realtime|real-time/i, "zap"],
  [/\bapi|integration|webhook|code|framework|server|backend|\bsdk/i, "code"],
  [/design|\bui\b|\bux\b|interface|brand|token|prototype/i, "palette"],
  [/seo|search|discover|keyword/i, "search"],
  [/team|user|cohort|people|staff|hire|talent|mentor|community|social/i, "users"],
  [/data|ledger|database|sql|warehouse|pipeline|inventory/i, "database"],
  [/\bai\b|model|machine|llm|gpt|vision|agent|automat|\brpa\b|\bbot/i, "cpu"],
  [/cloud|aws|azure|gcp|hosting|infra/i, "cloud"],
  [/workflow|process|dispatch|assign|schedul|plan/i, "workflow"],
  [/pay|upi|wallet|billing|settlement|invoice|statement|loan/i, "card"],
  [/cart|checkout|order|catalog|commerce|shop|loyalty|offer|coupon/i, "cart"],
  [/map|gps|track|location|route|navigation|region|overlap|time zone/i, "map"],
  [/video|stream|live|class|tele|media/i, "video"],
  [/notif|remind|alert|nudge/i, "bell"],
  [/content|document|course|contract|cms|news|article/i, "doc"],
  [/chat|message|whatsapp|call|voice/i, "chat"],
  [/deliver|rider|logistic|fleet|pickup/i, "truck"],
  [/time|hour|day/i, "clock"],
];
const FALLBACK: IconName[] = ["layers", "sparkles", "zap", "shield", "workflow", "rocket"];
export const iconFor = (text: string, i: number): IconName => ICON_RULES.find(([re]) => re.test(text))?.[1] ?? FALLBACK[i % FALLBACK.length];
/** One icon per card, no repeats within a grid: first unused keyword match, else the first unused fallback. */
export function iconsFor(texts: string[]): IconName[] {
  const used = new Set<IconName>();
  return texts.map((t) => {
    const pick =
      ICON_RULES.find(([re, n]) => !used.has(n) && re.test(t))?.[1] ??
      [...FALLBACK, ...ICON_RULES.map(([, n]) => n)].find((n) => !used.has(n)) ??
      "layers";
    used.add(pick);
    return pick;
  });
}

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

/** Dark 3D band, text left and a visual right (stacked on phones). */
export function RichHero({
  crumbs,
  eyebrow,
  title,
  lead,
  visual,
  meta,
  actions = true,
}: {
  crumbs: { label: string; href?: string }[];
  eyebrow?: string;
  title: string;
  lead?: string;
  visual: React.ReactNode;
  meta?: React.ReactNode;
  actions?: boolean;
}) {
  return (
    <section className="hero-3d overflow-hidden">
      <div className={`${COL} grid items-center gap-10 pb-12 pt-7 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-20 lg:pt-12`}>
        <div className="min-w-0">
          <Crumbs items={crumbs} />
          {eyebrow && (
            <p className="mt-7 inline-block rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-medium text-white">{eyebrow}</p>
          )}
          <h1 className="mt-5 text-[34px] font-[700] leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl lg:text-[54px]">{title}</h1>
          {lead && <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">{lead}</p>}
          {meta}
          {actions && (
            <>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="inline-flex h-[52px] items-center justify-center rounded-full bg-amber px-[26px] text-base font-semibold text-amber-ink transition-colors hover:bg-[#ffbf47]">
                  Get quote now
                </Link>
                <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="inline-flex h-[52px] items-center justify-center rounded-full px-[26px] text-base font-semibold text-white ring-[1.5px] ring-inset ring-white/80 transition-colors hover:bg-white/10">
                  Call us
                </a>
              </div>
              <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/75">
                {["Code in your name", "Fixed quotation", "NDA first"].map((t) => (
                  <li key={t} className="flex items-center gap-1.5">
                    <Icon name="check" className="size-4 text-amber" />
                    {t}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="min-w-0">{visual}</div>
      </div>
    </section>
  );
}

// Client logos: [file in /assets/clients, name, height at 320 wide]. Same list as the home page.
const LOGOS: [string, string, number][] = [
  ["hi-cont2", "Continental Hospitals", 186], ["hi-medicover", "Medicover Hospitals", 200], ["hi-trh360", "TRH360", 88], ["joy", "Joy Hospitals", 178],
  ["bajaj", "Bajaj Electronics", 183], ["sumantv", "Suman TV", 318], ["hi-mokobara", "Mokobara", 57], ["oneasy", "OnEasy", 93],
  ["n-8meds", "8Meds", 112], ["n-triq1", "TriQ Pharma", 152], ["vamshi", "Vamshi Farms", 320], ["haritha", "Haritha Wellness", 162],
];

/** Client logos scrolling, then the company numbers in a deep-navy box. */
export function TrustStrip() {
  return (
    <section aria-label="Clients and numbers" className="border-b border-line bg-white py-10 lg:py-14">
      <div className={COL}>
        <p className="text-center text-sm font-semibold text-ink-3">Trusted by hospitals, brands and MSMEs</p>
        <div className="mq mt-5">
          <ul className="mq-t">
            {[0, 1].flatMap((n) =>
              LOGOS.map(([src, alt, h]) => (
                <li key={`${src}-${n}`} aria-hidden={n > 0 || undefined} className="grid h-[68px] w-[140px] shrink-0 place-items-center rounded-2xl border border-line bg-white px-5 py-3 lg:h-20 lg:w-[170px]">
                  <Image src={`/assets/clients/${src}.png`} alt={n > 0 ? "" : alt} width={320} height={h} className="max-h-[44px] w-auto max-w-full object-contain" />
                </li>
              )),
            )}
          </ul>
        </div>
        <dl className="mt-8 grid grid-cols-2 gap-y-6 rounded-[28px] bg-deep px-5 py-7 text-white lg:mt-10 lg:grid-cols-4 lg:px-10 lg:py-10">
          {HOME_STATS.map((s, k) => (
            <div key={s.l} className={`px-4 lg:px-7 ${k % 2 ? "border-l border-white/20" : "pl-1 lg:pl-0"} ${k === 2 ? "lg:border-l lg:border-white/20 lg:pl-7" : ""}`}>
              <dt className="sr-only">{s.l}</dt>
              <dd>
                <p className="text-[34px] font-light leading-none tracking-[-0.02em] lg:text-[52px]">
                  <CountUp value={s.v} />
                  <span className="text-amber">+</span>
                </p>
                <p className="mt-2 text-sm leading-snug text-white/75 lg:text-base">{s.l}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** Eyebrow, heading and lead for a section; `action` sits to the right on wide screens. */
export function Head({ eyebrow, title, lead, action, id }: { eyebrow?: string; title: string; lead?: string; action?: React.ReactNode; id?: string }) {
  return (
    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div className="max-w-3xl">
        {eyebrow && <p className="text-sm font-semibold text-navy">{eyebrow}</p>}
        <h2 id={id} className="mt-3 text-[30px] font-semibold leading-[1.1] lg:text-[44px]">{title}</h2>
        {lead && <p className="mt-3.5 text-lg leading-relaxed text-ink-2">{lead}</p>}
      </div>
      {action}
    </div>
  );
}

/** Feature cards with an icon each. */
export function FeatureGrid({ items }: { items: { t: string; d: string }[] }) {
  const icons = iconsFor(items.map((i) => `${i.t} ${i.d}`));
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
      {items.map((i, n) => (
        <li key={i.t} className="group relative flex gap-4 overflow-hidden rounded-3xl border border-line bg-white p-5 transition-colors hover:border-navy/30 sm:block sm:p-7">
          <span aria-hidden="true" className="absolute right-6 top-5 hidden text-[44px] font-light leading-none text-navy/10 sm:block">{String(n + 1).padStart(2, "0")}</span>
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sky text-navy transition-colors group-hover:bg-navy group-hover:text-white sm:size-14">
            <Icon name={icons[n]} className="size-6 sm:size-7" />
          </span>
          <span className="block">
            <h3 className="text-lg font-semibold leading-snug sm:mt-5">{i.t}</h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-ink-3">{i.d}</p>
          </span>
        </li>
      ))}
    </ul>
  );
}

/** The light panel next to the intro: one live screen with two feature chips floating on it. */
export function SidePanel({ seed, chips, img }: { seed: string; chips: string[]; img?: string | null }) {
  if (img)
    return (
      <div className="relative aspect-[4/3.4] overflow-hidden rounded-[28px] border border-line">
        <Image src={img} alt="" fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
      </div>
    );
  const [a] = screensFor(`${seed} side`).reverse();
  return (
    <div aria-hidden="true" className="relative aspect-[4/3.4] overflow-hidden rounded-[28px] bg-sky">
      <span className="absolute inset-0 bg-[url(/assets/pattern-dots.svg)] opacity-60" />
      <span className="absolute -right-16 -top-16 size-64 rounded-full bg-navy/10" />
      <span className="absolute -bottom-20 -left-10 size-56 rounded-full bg-amber/20" />
      <Phone src={a[0]} className="absolute -bottom-[22%] left-1/2 w-[38%] -translate-x-1/2" />
      {chips.slice(0, 2).map((c, k) => (
        <span
          key={c}
          className={`absolute flex max-w-[58%] items-center gap-2.5 rounded-2xl border border-line bg-white px-3 py-2.5 text-xs font-semibold leading-snug text-ink shadow-[0_18px_40px_-20px_rgba(1,49,134,0.35)] sm:text-sm ${
            k === 0 ? "left-[5%] top-[12%]" : "right-[5%] top-[40%]"
          }`}
        >
          <span className={`grid size-8 shrink-0 place-items-center rounded-xl ${k === 0 ? "bg-navy text-white" : "bg-amber text-white"}`}>
            <Icon name={iconFor(c, k)} className="size-4" />
          </span>
          {c}
        </span>
      ))}
    </div>
  );
}

/** The nine delivery steps as a timeline: a vertical rail on phones, a 3-column grid on desktop. */
export function ProcessTimeline() {
  return (
    <ol className="relative grid gap-3 before:absolute before:bottom-6 before:left-[27px] before:top-6 before:w-px before:bg-white/20 sm:gap-4 lg:grid-cols-3 lg:gap-5 lg:before:hidden">
      {PROCESS_STEPS.map((s, k) => (
        <li key={s.n} className="relative flex gap-4 lg:block lg:rounded-3xl lg:bg-[#0a1740]/85 lg:p-7 lg:ring-1 lg:ring-white/10 lg:backdrop-blur">
          <span className={`relative z-[1] grid size-14 shrink-0 place-items-center rounded-2xl text-base font-semibold text-white ring-4 ring-deep lg:ring-0 ${k === 0 || k === 6 ? "bg-amber" : "bg-navy"}`}>{s.n}</span>
          <span className="block flex-1 rounded-2xl bg-[#0a1740]/85 p-4 ring-1 ring-white/10 backdrop-blur lg:bg-transparent lg:p-0 lg:ring-0">
            <h3 className="text-lg font-semibold text-white lg:mt-5">{s.t}</h3>
            <p className="mt-1 text-[15px] leading-relaxed text-white/70">{s.d}</p>
          </span>
        </li>
      ))}
    </ol>
  );
}

// Projects with a real screen, each on its own 3D render.
const WORK: [string, string][] = [
  ["voice", "/assets/work-bg-dark.jpg"],
  ["vamshi-farms", "/assets/work-bg-blue.jpg"],
  ["8meds", "/assets/work-bg-purple.jpg"],
  ["medibag", "/assets/work-bg-green.jpg"],
  ["oneasy", "/assets/work-bg-dark.jpg"],
];

/** "Work we've shipped": real app screens and names. Swipes on phones. */
export function WorkRow() {
  return (
    <section aria-labelledby="work" className="bg-white">
      <div className={`${COL} py-16 lg:py-24`}>
        <Head
          id="work"
          eyebrow="Our work"
          title="Work we've shipped"
          lead="Every one designed and engineered by this team, live today, and maintained by us."
          action={
            <Link href="/portfolio" className="shrink-0 text-sm font-semibold text-navy underline-offset-4 hover:underline">
              See the full portfolio →
            </Link>
          }
        />
        <ul className="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 [scrollbar-width:none] lg:mx-0 lg:mt-12 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0 lg:pb-0">
          {WORK.map(([slug, bg]) => {
            const p = PROJECTS.find((x) => x.slug === slug)!;
            return (
              <li key={slug} className="w-[72%] shrink-0 snap-start sm:w-[44%] lg:w-auto">
                <Link href={p.href ?? "/portfolio"} className="group relative block h-[400px] overflow-hidden rounded-[28px] bg-night">
                  <Image src={bg} alt="" fill sizes="(min-width: 1024px) 240px, 72vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute inset-0 bg-linear-to-b from-black/60 via-black/10 to-transparent" />
                  <span className="relative block p-5">
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-white/65">{p.sector}</span>
                    <span className="mt-1.5 block text-xl font-semibold leading-tight text-white">{p.name}</span>
                  </span>
                  <Phone
                    src={`/assets/real-${slug}.jpg`}
                    alt={`${p.name}, live app screen`}
                    className="absolute -bottom-24 left-1/2 w-[62%] -translate-x-1/2 rotate-[4deg] transition-transform duration-500 group-hover:-translate-y-3 group-hover:rotate-0"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** FAQ accordion as separate cards. */
export function FaqCards({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((f) => (
        <details key={f.q} className="group rounded-2xl border border-line bg-white px-5 py-4 transition-colors open:border-navy/30 sm:px-6 sm:py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-left font-semibold text-ink">
            {f.q}
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-sky text-navy transition-colors group-open:bg-navy group-open:text-white">
              <svg className="chev size-4 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </summary>
          <p className="mt-3 pr-2 text-[15px] leading-relaxed text-ink-3 sm:pr-12">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/** Link cards for entries: generated card image when present, else the icon illustration on a sky tile. */
export function EntryCards({ category, base, items, all = items, four }: { category: string; base: string; items: { slug: string; name: string; tagline: string }[]; all?: { slug: string }[]; four?: boolean }) {
  return (
    <ul className={`grid gap-3 sm:grid-cols-2 sm:gap-4 lg:gap-5 ${four ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
      {items.map((i) => {
        const img = pageImage(`${category}-${i.slug}-card`);
        return (
          <li key={i.slug}>
            <Link
              href={`${base}/${i.slug}`}
              className="group flex h-full items-center gap-4 rounded-3xl border border-line bg-white p-3 pr-4 transition-colors duration-300 hover:border-navy/30 sm:flex-col sm:items-stretch sm:gap-0 sm:p-3"
            >
              <span className="relative grid size-[84px] shrink-0 place-items-center overflow-hidden rounded-2xl bg-sky sm:h-44 sm:w-full">
                {img ? (
                  <Image src={img} alt="" fill sizes="(min-width: 1024px) 380px, 50vw" className="object-cover" />
                ) : (
                  <>
                    <span className="absolute inset-0 hidden bg-[url(/assets/pattern-dots.svg)] opacity-60 sm:block" />
                    <span className="absolute -right-10 -top-10 hidden size-32 rounded-full bg-navy/[0.07] sm:block" />
                    <Image src={serviceIcon(all.findIndex((x) => x.slug === i.slug))} alt="" width={120} height={130} className="relative h-14 w-auto transition-transform duration-500 group-hover:scale-110 sm:h-28" />
                  </>
                )}
              </span>
              <span className="flex min-w-0 flex-1 flex-col sm:px-3 sm:pb-3 sm:pt-5">
                <span className="text-[17px] font-semibold leading-snug text-ink sm:text-lg">{i.name}</span>
                <span className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink-3 sm:line-clamp-none">{i.tagline}</span>
                <span className="mt-auto hidden items-center gap-1.5 pt-4 text-sm font-semibold text-navy sm:inline-flex">
                  Read more
                  <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </span>
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sky text-navy sm:hidden">
                <Icon name="arrow" className="size-4" />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** The first entries of a category as large dark cards: 3D render, live screen, name, tagline. */
export function FeaturedCards({ category, base, items }: { category: string; base: string; items: { slug: string; name: string; tagline: string }[] }) {
  return (
    <ul className="grid gap-4 lg:grid-cols-2 lg:gap-5">
      {items.map((i, k) => {
        const img = pageImage(`${category}-${i.slug}-card`) ?? pageImage(`${category}-${i.slug}`);
        const seed = `${category} ${i.slug} ${i.name}`;
        const a = screensFor(seed)[k % 2];
        return (
          <li key={i.slug}>
            <Link href={`${base}/${i.slug}`} className="group relative block h-[300px] overflow-hidden rounded-[28px] bg-night sm:h-[340px]">
              <Image src={img ?? bgFor(seed)} alt="" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 bg-linear-to-r from-[#040b2e]/90 via-[#040b2e]/55 to-transparent" />
              {!img && <Phone src={a[0]} className="absolute -bottom-28 right-6 w-[34%] max-w-[180px] rotate-[6deg] transition-transform duration-500 group-hover:-translate-y-3 group-hover:rotate-2" />}
              <span className="relative flex h-full max-w-[64%] flex-col p-6 sm:p-8">
                <span className="text-2xl font-semibold leading-tight text-white sm:text-[28px]">{i.name}</span>
                <span className="mt-3 text-[15px] leading-relaxed text-white/75">{i.tagline}</span>
                <span className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition-colors group-hover:bg-white group-hover:text-ink">
                  Read more
                  <Icon name="arrow" className="size-4" />
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Closing band: the paid first step and the quote button. */
export function PriceCta() {
  return (
    <section className="bg-navy text-white">
      <div className={`${COL} relative flex flex-col items-start gap-7 overflow-hidden py-14 lg:flex-row lg:items-center lg:justify-between lg:py-[72px]`}>
        <div>
          <h2 className="max-w-[22ch] text-[30px] font-semibold leading-[1.15] text-white lg:text-[40px]">{`Start with a ${DISCOVERY.price} requirement analysis`}</h2>
          <p className="mt-2.5 max-w-xl text-[17px] text-white/75">A written quotation and timeline before you commit to anything.</p>
        </div>
        <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
          <Link href="/contact" className="inline-flex h-[52px] items-center justify-center rounded-full bg-amber px-[26px] text-base font-semibold text-amber-ink transition-colors hover:bg-[#ffbf47]">
            Get quote now
          </Link>
          <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="inline-flex h-[52px] items-center justify-center rounded-full px-[26px] text-base font-semibold text-white ring-[1.5px] ring-inset ring-white/80 transition-colors hover:bg-white/10">
            Call us
          </a>
        </div>
      </div>
    </section>
  );
}

/** Blog cover: generated image when present, else a 3D render with the title set on it. */
export function BlogCover({ slug, title, category, src, alt, small }: { slug: string; title: string; category: string; src?: string | null; alt?: string; small?: boolean }) {
  const img = src ?? pageImage(`blog-${slug}`);
  if (img)
    return (
      // eslint-disable-next-line @next/next/no-img-element -- may be a CMS URL, already sized there
      <img src={img} alt={alt ?? ""} className="aspect-[16/10] w-full rounded-[inherit] object-cover" />
    );
  return (
    <span aria-hidden="true" className="relative block aspect-[16/10] overflow-hidden rounded-[inherit] bg-night">
      <Image src={bgFor(slug)} alt="" fill sizes={small ? "400px" : "(min-width: 1024px) 560px, 100vw"} className="object-cover" />
      <span className="absolute inset-0 bg-linear-to-tr from-[#040b2e]/90 via-[#040b2e]/45 to-transparent" />
      <span className={`absolute inset-x-0 bottom-0 block ${small ? "p-4" : "p-6 sm:p-8"}`}>
        <span className={`inline-block rounded-full bg-white/15 font-semibold text-white backdrop-blur ${small ? "px-2.5 py-0.5 text-[11px]" : "px-3 py-1 text-xs"}`}>{category}</span>
        {!small && <span className="mt-2.5 line-clamp-4 hidden text-2xl lg:block font-semibold leading-[1.15] tracking-[-0.02em] text-white sm:text-[32px]">{title}</span>}
      </span>
    </span>
  );
}

/** Author line for the blog hero. */
export function Byline({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-7 flex items-center gap-3 text-sm text-white/75">
      <Image src="/assets/founder.jpg" alt="" width={680} height={850} className="size-11 rounded-full object-cover object-top ring-2 ring-white/30" />
      <span>
        <b className="block font-semibold text-white">Sai Charan L</b>
        {children}
      </span>
    </div>
  );
}

/** Author box under an article. */
export function AuthorBox() {
  return (
    <aside className="mt-14 flex flex-col gap-5 rounded-3xl border border-line bg-canvas p-6 sm:flex-row sm:items-center sm:p-7">
      <Image src="/assets/founder.jpg" alt="Sai Charan L" width={680} height={850} className="size-20 shrink-0 rounded-2xl object-cover object-top" />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-4">Written by</p>
        <p className="mt-1 text-lg font-semibold text-ink">Sai Charan L</p>
        <p className="text-sm text-ink-3">{`Founder, ${COMPANY.name}`}</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-2">
          Former Associate Product Manager at Google and developer at Zomato. Studied at IIT Madras.
        </p>
      </div>
    </aside>
  );
}

/** Desktop sticky table of contents; a collapsible box on phones. */
export function Toc({ items }: { items: { id: string; text: string; level?: number }[] }) {
  if (items.length < 2) return null;
  const list = (
    <ol className="mt-3 space-y-1 border-l border-line">
      {items.map((t) => (
        <li key={t.id} className={t.level && t.level > 2 ? "pl-3" : undefined}>
          <a href={`#${t.id}`} className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm leading-snug text-ink-3 transition-colors hover:border-navy hover:text-navy">
            {t.text}
          </a>
        </li>
      ))}
    </ol>
  );
  return (
    <>
      <nav aria-label="In this article" className="hidden lg:sticky lg:top-28 lg:block lg:max-h-[calc(100vh-8rem)] lg:self-start lg:overflow-y-auto">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-4">In this article</p>
        {list}
      </nav>
      <details className="rounded-2xl border border-line bg-canvas px-5 py-4 lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-ink">
          In this article
          <svg className="chev size-4 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </summary>
        {list}
      </details>
    </>
  );
}

export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

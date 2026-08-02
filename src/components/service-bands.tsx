import Image from "next/image";
import Link from "next/link";

// ponytail: native <details name="..."> gives an exclusive accordion —
// opening one band closes the others with zero JavaScript. Supported in all
// current browsers; older ones just allow multiple bands open, which degrades
// fine.

type Band = {
  slug: string;
  title: string;
  href: string;
  showcase: string;
  bg: string;
  text: string;
  muted: string;
  body: string[];
};

const BANDS: Band[] = [
  {
    slug: "app-development",
    title: "App Development",
    href: "/services/mobile-app-development",
    showcase: "/assets/showcase-app-development.svg",
    bg: "bg-[#4335A7]",
    text: "text-white",
    muted: "text-white/80",
    body: [
      "Native iOS and Android where platform depth matters, Flutter or React Native where one codebase across both stores is the right economics. We make that call with you in discovery rather than defaulting to whatever we used last.",
      "Every build ships with automated tests, crash reporting, and a release pipeline your team can run without us — because an app is a subscription, not a purchase, and someone has to keep it alive after launch.",
    ],
  },
  {
    slug: "website-development",
    title: "Website Development",
    href: "/services/web-development",
    showcase: "/assets/showcase-web-development.svg",
    bg: "bg-[#FFF6E9]",
    text: "text-[#03153A]",
    muted: "text-ink-muted",
    body: [
      "Server-rendered by default, so pages arrive fast and search engines see real content. Marketing sites that hold their Core Web Vitals, and logged-in products that handle actual transaction volume.",
      "Performance and accessibility are enforced in CI, not checked once before launch. Budgets fail the build when a change makes the site slower.",
    ],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    href: "/services/ui-ux-design",
    showcase: "/assets/showcase-ui-ux-design.svg",
    bg: "bg-[#8FC7FF]",
    text: "text-[#03153A]",
    muted: "text-[#03153A]/75",
    body: [
      "Research, flows, wireframes, and high-fidelity design delivered as a working system — tokens, components, and every state — so engineering builds what was designed instead of interpreting a screenshot.",
      "Empty, loading, error, and permission-denied states are specified alongside the happy path. Those are the screens users actually hit on a bad day, and they are usually the ones nobody designed.",
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    href: "/services/digital-marketing",
    showcase: "/assets/showcase-digital-marketing.svg",
    bg: "bg-[#FF7F3E]",
    text: "text-white",
    muted: "text-white/85",
    body: [
      "SEO, paid acquisition, content, and lifecycle campaigns run against one reporting model, with attribution wired up before the spend starts rather than reconstructed afterwards.",
      "You get a monthly view of spend, pipeline, and cost per outcome. If a channel is not producing, we will tell you to stop funding it.",
    ],
  },
  {
    slug: "gps-tracking",
    title: "GPS Tracking",
    href: "/services/gps-tracking-solutions",
    showcase: "/assets/showcase-gps-tracking.svg",
    bg: "bg-[#072060]",
    text: "text-white",
    muted: "text-white/75",
    body: [
      "Live location, trip replay, geofencing, and driver behaviour scoring for fleets and logistics operators — built to work with common tracker hardware so you keep procurement leverage.",
      "The primary view is an exception list, not a map of everything that is fine. Dispatchers need to know which vehicles are late, stopped, or off route.",
    ],
  },
  {
    slug: "ai-solutions",
    title: "AI Solutions",
    href: "/ai-solutions",
    showcase: "/assets/showcase-ai-solutions.svg",
    bg: "bg-[#0a6f85]",
    text: "text-white",
    muted: "text-white/80",
    body: [
      "LLM features, agents, and machine learning built into products where they measurably reduce work — with evaluation harnesses so quality is measured rather than assumed, and guardrails so failures are visible.",
      "If a rule or a search index solves your problem better than a model, we will say so before you spend the budget.",
    ],
  },
];

export function ServiceBands() {
  return (
    <section aria-label="Services we provide">
      <div className="mx-auto max-w-7xl px-5 py-16 text-center lg:px-8 lg:pt-24 lg:pb-12">
        <h2 className="text-4xl font-bold tracking-tight text-ink-muted sm:text-5xl">
          Services
        </h2>
        <p className="mt-1 text-4xl font-bold tracking-tight text-ink-muted/70 sm:text-5xl">
          We Provide
        </p>
      </div>

      {BANDS.map((b) => (
        <section key={b.slug} aria-labelledby={`band-${b.slug}`} className={`band ${b.bg}`}>
          <div
            className={`mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-6 lg:px-8 ${b.text}`}
          >
            <h3
              id={`band-${b.slug}`}
              className="text-2xl font-bold tracking-tight sm:text-3xl"
            >
              <Link href={b.href} className="outline-offset-4 hover:underline">
                {b.title}
              </Link>
            </h3>
            <span
              aria-hidden="true"
              className="band-chev grid size-9 shrink-0 place-items-center rounded-full border border-current/30"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                className="size-4"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </div>

          <div className="band-body">
            <div>
              <div className="mx-auto grid max-w-7xl gap-8 px-5 pb-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-14 lg:px-8 lg:pb-14">
                <div>
                  {b.body.map((p, k) => (
                    <p
                      key={k}
                      className={`${k ? "mt-4" : ""} max-w-2xl leading-relaxed ${b.muted}`}
                    >
                      {p}
                    </p>
                  ))}
                  <Link
                    href={b.href}
                    className={`mt-7 inline-flex items-center gap-2 rounded-full border border-current/30 px-6 py-2.5 text-sm font-semibold transition-colors hover:bg-white/10 ${b.text}`}
                  >
                    Explore {b.title}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
                <Image
                  src={b.showcase}
                  alt=""
                  width={520}
                  height={320}
                  className="h-auto w-full max-w-[520px] justify-self-end rounded-2xl"
                />
              </div>
            </div>
          </div>
        </section>
      ))}
    </section>
  );
}

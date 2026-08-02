import Image from "next/image";
import Link from "next/link";

// ponytail: native <details name="..."> gives an exclusive accordion —
// opening one band closes the others with zero JavaScript. Supported in all
// current browsers; older ones just allow multiple bands open, which degrades
// fine.

// Colour note: these bands used to be six saturated fills (purple, cream,
// sky, orange, navy, teal) stacked on top of each other. Against an ink and
// white page that block was the loudest thing on screen and read as a
// template. They are now hairline-separated rows in the ink system; the
// numbering carries the rhythm the colour used to.

type Band = {
  slug: string;
  title: string;
  href: string;
  showcase: string;
  body: string[];
};

const BANDS: Band[] = [
  {
    slug: "app-development",
    title: "App Development",
    href: "/services/mobile-app-development",
    showcase: "/assets/showcase-app-development.svg",
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
    body: [
      "LLM features, agents, and machine learning built into products where they measurably reduce work — with evaluation harnesses so quality is measured rather than assumed, and guardrails so failures are visible.",
      "If a rule or a search index solves your problem better than a model, we will say so before you spend the budget.",
    ],
  },
];

const SHELL = "mx-auto w-full max-w-[78rem] px-6 lg:px-10";

export function ServiceBands() {
  return (
    <section aria-label="Services we provide" className="border-t border-line">
      <div className={`${SHELL} pb-14 pt-20 lg:pb-16 lg:pt-28`}>
        <p className="label">What we do</p>
        <h2 className="mt-4 max-w-3xl text-3xl font-bold sm:text-4xl">
          Six practices, one delivery team
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-3">
          Hover or tap any line to see how we run it.
        </p>
      </div>

      <div className="border-t border-line">
        {BANDS.map((b, i) => (
          <section
            key={b.slug}
            aria-labelledby={`band-${b.slug}`}
            className="band border-b border-line bg-surface transition-colors hover:bg-surface-2"
          >
            <div
              className={`${SHELL} flex items-center justify-between gap-6 py-7`}
            >
              <div className="flex items-baseline gap-6">
                <span
                  aria-hidden="true"
                  className="font-mono text-xs text-ink-4"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  id={`band-${b.slug}`}
                  className="text-2xl font-semibold sm:text-3xl"
                >
                  <Link href={b.href} className="outline-offset-4 hover:underline">
                    {b.title}
                  </Link>
                </h3>
              </div>
              <span
                aria-hidden="true"
                className="band-chev grid size-9 shrink-0 place-items-center rounded-full border border-line text-ink-3"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="size-4"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </div>

            <div className="band-body">
              <div>
                <div
                  className={`${SHELL} grid gap-10 pb-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16 lg:pb-14`}
                >
                  <div className="lg:pl-[3.75rem]">
                    {b.body.map((p, k) => (
                      <p
                        key={k}
                        className={`${k ? "mt-4" : ""} max-w-2xl leading-relaxed text-ink-3`}
                      >
                        {p}
                      </p>
                    ))}
                    <Link
                      href={b.href}
                      className="mt-7 inline-flex items-center gap-2 rounded-full border border-line px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink"
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
                    className="h-auto w-full max-w-[440px] justify-self-end rounded-xl border border-line"
                  />
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

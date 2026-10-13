import type { Metadata } from "next";
import Link from "next/link";
import { PROCESS_STEPS, PROJECTS, OG_IMG } from "@/lib/content";
import { Header, Footer } from "@/components/site";
import { CtaBand, Faq, PageHero, QuoteForm, Section } from "@/components/blocks";
import { JsonLd, ORG, breadcrumb, faqPage, ld, service } from "@/lib/schema";

const PATH = "/mobile-app-development-company-hyderabad";
const TITLE = "Mobile App Development Company in Hyderabad";
const DESCRIPTION =
  "Hyderabad team building Android, iOS, Flutter and React Native apps. Fixed-scope discovery, two-week releases, and the code in your name from day one.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { images: [OG_IMG], title: `${TITLE} | ElevateBox`, description: DESCRIPTION, url: PATH, type: "website" },
};

/* Each question is an H2 with the short answer first, so search and answer
   engines can lift it as-is. No price ranges or counts we cannot stand behind. */
const ANSWERS = [
  {
    q: "How much does mobile app development cost in Hyderabad?",
    a: "It depends on the screens, the integrations and whether you need Android, iOS or both. We start with a fixed-price discovery that ends in a written scope and a fixed build quote, so you know the full cost before any development starts.",
  },
  {
    q: "How long does it take to build an app?",
    a: "A focused first version usually takes a few months. You see something working on a real phone every two weeks, so you can test with users and change direction early instead of waiting for one big launch.",
  },
  {
    q: "Native or cross-platform: which should you choose?",
    a: "Flutter or React Native when one codebase for both stores is the right economics, which is most business apps. Native Kotlin and Swift when the app leans on the device: background work, widgets, Bluetooth or heavy media.",
  },
];

const FAQS = [
  ...ANSWERS,
  {
    q: "Is ElevateBox based in Hyderabad?",
    a: "Yes. The team works from Hyderabad, Telangana, and runs workshops at your office, whether that is in HITEC City, Gachibowli, Madhapur, Kondapur or Secunderabad.",
  },
  {
    q: "Who owns the code and the App Store and Play Store accounts?",
    a: "You do, from the first commit. The repository, cloud account and store listings are created in your name, and we work inside them.",
  },
  {
    q: "Can the app speak Telugu and Hindi?",
    a: "Yes. We build interfaces in Telugu, Hindi and English, and we run our own AI calling product, Voice, which talks to customers in all three.",
  },
  {
    q: "Do you integrate UPI and Indian payment gateways?",
    a: "Yes. Razorpay with UPI, cards and netbanking is a standard part of our builds, including signed webhooks so a payment is never credited twice.",
  },
  {
    q: "What happens after launch?",
    a: "We stay on a fixed monthly scope for fixes, OS upgrades and dependency updates, with crash reporting wired in before release so problems show up before your users report them.",
  },
];

const BUILDS = [
  { t: "Android and iOS apps", d: "Native Kotlin and Swift where platform depth matters.", href: "/technologies/android" },
  { t: "Flutter apps", d: "One codebase for both stores, without the usual cross-platform compromises.", href: "/technologies/flutter" },
  { t: "React Native apps", d: "Cross-platform apps that share skills with your web team.", href: "/technologies/react-native" },
  { t: "AI inside the app", d: "Chat, voice and document features where they save real work.", href: "/ai-solutions" },
];

export default function HyderabadMobilePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <JsonLd
          json={ld(
            ORG,
            {
              ...service("Mobile app development", DESCRIPTION, PATH),
              serviceType: "Mobile app development",
              areaServed: ["Hyderabad", "HITEC City", "Gachibowli", "Madhapur", "Kondapur", "Secunderabad"].map((name) => ({ "@type": "Place", name })),
            },
            breadcrumb([{ name: TITLE, path: PATH }]),
            faqPage(FAQS),
          )}
        />
        <PageHero
          eyebrow="Hyderabad"
          title={TITLE}
          lead="Android, iOS, Flutter and React Native apps, designed and built by a team in Hyderabad, with the code in your name from day one."
          crumbs={[{ label: "Mobile app development in Hyderabad" }]}
        />

        <Section eyebrow="What we build" title="Android, iOS and cross-platform apps built in Hyderabad">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BUILDS.map((b) => (
              <li key={b.t} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
                <Link href={b.href} className="font-semibold text-brand hover:underline">
                  {b.t}
                </Link>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{b.d}</p>
              </li>
            ))}
          </ul>
        </Section>

        {ANSWERS.map((x, i) => (
          <Section key={x.q} tinted={i % 2 === 0} title={x.q}>
            <p className="max-w-3xl text-lg leading-relaxed text-ink-muted">{x.a}</p>
          </Section>
        ))}

        <Section eyebrow="Process" title="Our process, two weeks at a time">
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROCESS_STEPS.map((s) => (
              <li key={s.n} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
                <span className="text-sm font-bold text-accent">{s.n}</span>
                <h3 className="mt-2 font-semibold text-brand">{s.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{s.d}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section tinted eyebrow="Portfolio" title="Apps we have shipped">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p) => (
              <li key={p.slug} className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">{p.sector}</p>
                <h3 className="mt-1 font-semibold text-brand">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.summary}</p>
              </li>
            ))}
          </ul>
          <Link href="/portfolio" className="mt-8 inline-block font-semibold text-brand hover:underline">
            See the full portfolio →
          </Link>
        </Section>

        <Section eyebrow="FAQ" title="Mobile app development in Hyderabad: questions answered">
          <div className="grid gap-12 lg:grid-cols-2">
            <Faq items={FAQS} />
            <QuoteForm />
          </div>
        </Section>

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { CREDENTIALS, PROJECTS, VOICE_APP, OG_IMG } from "@/lib/content";
import { Header, Footer } from "@/components/site";
import { CtaBand, DiscoveryOffer, Faq, PageHero, Section } from "@/components/blocks";
import { JsonLd, ORG, breadcrumb, faqPage, ld, service } from "@/lib/schema";

const PATH = "/best-ai-developers-in-hyderabad";
const TITLE = "AI Developers in Hyderabad";
const DESCRIPTION =
  "Hire AI developers in Hyderabad who ship: AI agents, voice calling in Telugu and Hindi, chatbots and document automation, measured before launch and owned by you.";

export const metadata: Metadata = {
  title: `Best ${TITLE}: AI Agents, Voice & Automation`,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { images: [OG_IMG], title: `Best ${TITLE} | ElevateBox`, description: DESCRIPTION, url: PATH, type: "website" },
};

/* Each question is an H2 with the short answer first, so search and answer engines can
   lift it as-is. Claims are limited to what the team and the live products show. */
const ANSWERS = [
  {
    q: "What makes an AI developer team good?",
    a: "Shipped products, not demos. Look for AI that is live with real users, measured against a baseline before launch, and built so your team owns the code, the data and the model accounts. Ask to see it working.",
  },
  {
    q: "What can AI developers build for a business in Hyderabad?",
    a: "AI phone agents that call leads in Telugu, Hindi and English, chat assistants on your own documents, invoice and form extraction, and agents that carry out multi-step work across your tools with a reviewable log.",
  },
  {
    q: "How much does AI development cost?",
    a: "It depends on the data, the integrations and how much must be reviewed by a person. We start with a paid requirement analysis that ends in a written quotation, so you know the full cost before any build starts.",
  },
];

const FAQS = [
  ...ANSWERS,
  {
    q: "Have you shipped AI products yourselves?",
    a: "Yes. We built and run Voice by ElevateBox, an AI phone employee that calls Indian businesses' leads in Telugu, Hindi and English, and OnEasy's AI agent platform.",
  },
  {
    q: "Is the team based in Hyderabad?",
    a: "Yes. We work from Hyderabad, Telangana, with clients across India, the UAE, the UK, Europe and the US.",
  },
  {
    q: "Who owns the AI system and the data?",
    a: "You do. The code, the cloud account, the model provider accounts and the data stay in your name from the first commit.",
  },
  {
    q: "Will you tell us if AI is the wrong answer?",
    a: "Yes. If a rule, a form or a plain integration does the job, we say so during the requirement analysis instead of building an AI feature that saves nobody time.",
  },
];

const BUILDS = [
  { t: "AI voice agents", d: "Phone calls in Telugu, Hindi and English that capture answers and book the next step.", href: VOICE_APP },
  { t: "AI agents and automation", d: "Multi-step work across your tools, with permissions and an action log.", href: "/ai-solutions/ai-agents-and-automation" },
  { t: "Chat on your documents", d: "Assistants that answer from your own files, with sources.", href: "/ai-solutions" },
  { t: "Document extraction", d: "Invoices, forms and statements read into your systems, with review for low-confidence fields.", href: "/ai-solutions" },
];

const AI_PROJECTS = PROJECTS.filter((p) => ["voice", "oneasy"].includes(p.slug));

export default function AiDevelopersHyderabadPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <JsonLd
          json={ld(
            ORG,
            {
              ...service("AI development", DESCRIPTION, PATH),
              serviceType: "AI software development",
              areaServed: ["Hyderabad", "HITEC City", "Gachibowli", "Madhapur", "Kondapur", "Secunderabad"].map((name) => ({ "@type": "Place", name })),
            },
            breadcrumb([{ name: TITLE, path: PATH }]),
            faqPage(FAQS),
          )}
        />
        <PageHero
          eyebrow="Hyderabad · AI development"
          title="The best AI developers in Hyderabad ship AI that is live"
          lead="AI agents, voice calling and automation, built by a Hyderabad team that runs its own AI product in production — and hands you everything it builds."
          crumbs={[{ label: TITLE }]}
        />

        <Section eyebrow="What we build" title="AI systems we build for businesses">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BUILDS.map((b) => (
              <li key={b.t} className="rounded-3xl bg-white p-6 ring-1 ring-black/5">
                <Link href={b.href} className="font-semibold text-ink hover:underline">
                  {b.t}
                </Link>
                <p className="mt-2 text-sm leading-relaxed text-ink-3">{b.d}</p>
              </li>
            ))}
          </ul>
        </Section>

        {ANSWERS.map((x, i) => (
          <Section key={x.q} tinted={i % 2 === 0} title={x.q}>
            <p className="max-w-3xl text-lg leading-relaxed text-ink-3">{x.a}</p>
          </Section>
        ))}

        <Section eyebrow="Proof" title="AI we have shipped, and the people behind it">
          <ul className="grid gap-5 sm:grid-cols-2">
            {AI_PROJECTS.map((p) => (
              <li key={p.slug} className="rounded-3xl bg-white p-6 ring-1 ring-black/5">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-4">{p.sector}</p>
                <h3 className="mt-1 text-lg font-bold">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-3">{p.summary}</p>
              </li>
            ))}
          </ul>
          <ul className="mt-8 flex flex-wrap gap-2">
            {CREDENTIALS.map((c) => (
              <li key={c.k} title={c.note} className="rounded-full border border-black/5 bg-white px-3.5 py-1.5 text-xs text-ink-3">
                <span className="font-semibold text-ink">{c.k}</span>
                {` · ${c.v}`}
              </li>
            ))}
          </ul>
        </Section>

        <Section tinted eyebrow="FAQ" title="AI developers in Hyderabad: questions answered">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <Faq items={FAQS} />
            <DiscoveryOffer />
          </div>
        </Section>

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}

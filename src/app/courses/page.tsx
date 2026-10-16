import type { Metadata } from "next";
import { COMPANY, COURSES, CREDENTIALS, TRAINING_CALL, OG_IMG } from "@/lib/content";
import { Header, Footer } from "@/components/site";
import { Faq, PageHero, Section } from "@/components/blocks";
import { JsonLd, ORG, breadcrumb, faqPage, ld } from "@/lib/schema";

const PATH = "/courses";
const TITLE = "AI and Coding Courses in Hyderabad";
const DESCRIPTION =
  "Learn to build with AI from engineers who ship it: AI agents, voice AI and production apps. Training for developers and teams in Hyderabad and online.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { images: [OG_IMG], title: `${TITLE} | ElevateBox`, description: DESCRIPTION, url: PATH, type: "website" },
};

// What the people teaching build every day — the subjects, not a fixed syllabus.
const TOPICS = [
  { t: "Building AI agents", d: "Agents that use tools, keep a log of what they did, and stay inside the permissions you give them." },
  { t: "Voice AI", d: "Phone and browser voice agents in Telugu, Hindi and English, from the team that runs one in production." },
  { t: "AI on your own data", d: "Search and chat over documents, with sources, and how to tell when the answer is wrong." },
  { t: "Shipping to production", d: "Testing, monitoring and cost control — what changes when real users arrive." },
];

const FAQS = [
  { q: "Who teaches?", a: `Engineers from the ElevateBox team, whose background includes ${CREDENTIALS.slice(0, 3).map((c) => c.k).join(", ")}. They build the products on this site.` },
  { q: "Is it for beginners?", a: "It is for people who already write some code and want to build with AI. Tell us where you are on the planning call and we will say honestly whether it fits." },
  { q: "Do you train company teams?", a: "Yes. Book the planning call with your team size and goals, and we will shape the sessions around the product you are building." },
];

const WA = `https://wa.me/${COMPANY.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hi, I'm interested in the AI courses.")}`;

export default function CoursesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <JsonLd json={ld(ORG, breadcrumb([{ name: TITLE, path: PATH }]), faqPage(FAQS))} />
        <PageHero
          eyebrow="Courses · Hyderabad and online"
          title="Learn to build with AI, from engineers who ship it"
          lead="Hands-on training for developers and teams: AI agents, voice AI and taking AI to production."
          crumbs={[{ label: "Courses" }]}
        />

        {COURSES.length > 0 && (
          <Section eyebrow="Upcoming" title="Courses">
            <ul className="grid gap-5 sm:grid-cols-2">
              {COURSES.map((c) => (
                <li key={c.name} className="rounded-3xl bg-white p-7 ring-1 ring-black/5">
                  <h3 className="text-xl font-bold">{c.name}</h3>
                  <p className="mt-1 text-sm text-ink-4">{`${c.length} · starts ${c.starts}`}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-3">{c.summary}</p>
                  <p className="mt-5 font-display text-2xl font-bold">{c.price}</p>
                </li>
              ))}
            </ul>
          </Section>
        )}

        <Section tinted={COURSES.length > 0} eyebrow="What you learn" title="What we teach">
          <ul className="grid gap-5 sm:grid-cols-2">
            {TOPICS.map((t) => (
              <li key={t.t} className="rounded-3xl bg-white p-7 ring-1 ring-black/5">
                <h3 className="text-lg font-bold">{t.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-3">{t.d}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section tinted={COURSES.length === 0} eyebrow="Join" title="Book a 30-minute call to plan your training">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div className="rounded-[2rem] bg-ink p-8 text-white sm:p-10">
              <p className="font-display text-3xl font-bold leading-tight">Tell us what you want to build</p>
              <p className="mt-3 text-sm text-white/60">We will suggest the right course or shape sessions for your team.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={TRAINING_CALL} className="rounded-full bg-white px-6 py-3.5 text-center text-sm font-semibold text-ink">
                  Book the call
                </a>
                <a href={WA} className="rounded-full border border-white/20 px-6 py-3.5 text-center text-sm font-semibold text-white">
                  Ask on WhatsApp
                </a>
              </div>
            </div>
            <Faq items={FAQS} />
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}

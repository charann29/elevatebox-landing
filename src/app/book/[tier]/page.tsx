import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CLIENTS, COMPANY, CONSULT_RESULTS, CONSULTS, CREDENTIALS, OG_IMG } from "@/lib/content";
import { LEXEND } from "@/lib/lexend";
import { JsonLd, breadcrumb, faqPage, ld, service } from "@/lib/schema";

/* Ad landing page, one job: get the visitor into the booking form. No site nav, one CTA repeated
   after every section. Layout and colours follow the owner's reference (a single-offer webinar page):
   navy top bar, Lexend headings with a red underline, orange buttons, light-blue alternate bands. */

export const dynamicParams = false;
export const generateStaticParams = () => CONSULTS.map((c) => ({ tier: c.slug }));

/* DRAFT promise, needs owner yes: refund the fee if the call was not useful. */
const GUARANTEE = "Not useful? Tell us after the call and we refund you in full.";
const ORANGE = "bg-[#ff7701] hover:bg-[#f57100]";

const find = (tier: string) => CONSULTS.find((c) => c.slug === tier);

export async function generateMetadata({ params }: { params: Promise<{ tier: string }> }): Promise<Metadata> {
  const c = find((await params).tier);
  if (!c) return {};
  const title = `${c.title.split(" ")[0]} strategic consultation`;
  const path = `/book/${c.slug}`;
  return {
    title,
    description: `${c.lead} Book online with ElevateBox, Hyderabad.`,
    alternates: { canonical: path },
    openGraph: { images: [OG_IMG], title, description: c.lead, url: path, type: "website" },
  };
}

const Check = () => (
  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#ff7701]/15">
    <svg viewBox="0 0 24 24" fill="none" stroke="#ff7701" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="size-3" aria-hidden="true">
      <path d="M5 12l5 5L20 7" />
    </svg>
  </span>
);

function Cta({ href, note = GUARANTEE }: { href: string; note?: string }) {
  return (
    <div className="mt-10 text-center">
      <a href={href} className={`inline-block w-full max-w-sm rounded-md px-6 py-4 whitespace-nowrap text-[15px] font-bold uppercase text-white sm:text-base sm:tracking-wide shadow-sm transition-colors ${ORANGE}`}>
        Join for a strategic consultation
      </a>
      <p className="mt-2 text-sm font-medium text-[#262626]">{note}</p>
    </div>
  );
}

function H2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`text-center ${className}`}>
      <h2 className={`font-semibold tracking-tight text-3xl leading-tight text-[#262626] sm:text-[2.6rem]`}>{children}</h2>
      <span aria-hidden="true" className="mx-auto mt-2 block h-[3px] w-28 rounded bg-[#d32f2f]" />
    </div>
  );
}

/* Simple line icons for the outcome and audience rows (no emoji). */
const ICONS: Record<string, string> = {
  money: "M12 3v18M17 7H9.5a3 3 0 0 0 0 6h5a3 3 0 0 1 0 6H6",
  target: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-5a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0-3a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
  cut: "M4 4l16 16M20 4 4 20",
  rupee: "M6 4h12M6 9h12M14 20 7 13h2a4 4 0 0 0 0-8",
  map: "M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Zm0 0v14m6-12v14",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v4l3 2",
  shop: "M4 9h16l-1 11H5L4 9Zm4 0V7a4 4 0 0 1 8 0v2",
  heart: "M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z",
  home: "M4 11 12 4l8 7v9h-5v-6H9v6H4v-9Z",
  rocket: "M5 19c1-3 3-5 3-5m6-10c3 0 6 3 6 6l-7 7-6-6 7-7Zm-4 10-3 3",
};
const Icon = ({ d }: { d: string }) => (
  <span className="grid size-16 shrink-0 place-items-center rounded-full bg-[#fff3e6] ring-1 ring-[#ff7701]/20">
    <svg viewBox="0 0 24 24" fill="none" stroke="#ff7701" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-7" aria-hidden="true">
      <path d={d} />
    </svg>
  </span>
);

const OUTCOMES = [
  { i: "map", t: "How your business really runs", d: "Sales, operations, team and spend, looked at together. We ask a lot of questions on purpose." },
  { i: "clock", t: "What to automate", d: "The repeated work eating your team's hours: follow-ups, data entry, publishing, reporting." },
  { i: "target", t: "Where to scale", d: "The channel that can bring more customers: Meta ads, LinkedIn, content or your website." },
  { i: "cut", t: "What to skip", d: "Tools, features and spends that cost money without bringing a sale." },
  { i: "rupee", t: "What it should cost", d: "Existing tools where they work, a custom build only where it pays. Honest numbers." },
  { i: "money", t: "When it pays back", d: "A six-month view: what it should earn you, and when it breaks even." },
];

const AUDIENCE = [
  { i: "shop", t: "Business owners", d: "Shops, distributors and service businesses that want more orders and less manual work." },
  { i: "heart", t: "Clinics and hospitals", d: "Bookings, reminders and patient follow-ups that run without extra staff." },
  { i: "home", t: "Builders and real estate", d: "Every enquiry called back and every site visit booked." },
  { i: "rocket", t: "Startup founders", d: "Turn an idea into a first version people pay for, without wasting months." },
];

/* After the call: the owner's three engagement models (from his client-meeting brief).
   No client names here on purpose. */
const ENGAGE = [
  {
    t: "Strategy consulting",
    k: "You have a pain, not a plan",
    d: "We study how your business runs, find where time and money leak, and set you up with tools that already exist, the cheapest way to run them at scale. Often done in days, not months.",
  },
  {
    t: "Build",
    k: "Co-pilots and autopilots made for you",
    d: "Custom apps, internal tools and AI that follow your rules every single time. It runs on your own accounts and you own it. Priced on what it earns you, so it pays back within months.",
  },
  {
    t: "Paid proof of concept",
    k: "For ideas nobody has proven yet",
    d: "We build a small working version first. You pay only for the proof. If it works, we build it in full; if not, you stop there with a clear answer, not a big bill.",
  },
];
const PAIN = ["Enquiries nobody called back.", "Customers who never came a second time.", "Hours lost copying data a phone could handle."];
const FAN = ["z-0 -rotate-6 translate-y-6", "z-10 -rotate-2", "z-10 rotate-2 translate-y-3", "z-0 rotate-6 translate-y-8"];
const PHOTOS = [
  { src: "/assets/real-vamshi-farms.jpg", alt: "Vamshi Farms app" },
  { src: "/assets/real-8meds.jpg", alt: "8Meds app" },
  { src: "/assets/real-medibag.jpg", alt: "MediBag app" },
  { src: "/assets/real-oneasy.jpg", alt: "OnEasy app" },
];

export default async function ConsultPage({ params }: { params: Promise<{ tier: string }> }) {
  const c = find((await params).tier);
  if (!c) notFound();
  const path = `/book/${c.slug}`;
  const minutes = c.title.split("-")[0];

  const faqs = [
    { q: "Who will I talk to?", a: "Someone from the team that runs ads and builds systems for our clients, not a sales caller." },
    { q: "How does the call happen?", a: `On Google Meet, ${minutes} minutes. You pick the time on the calendar right after paying.` },
    { q: "How do I pay?", a: "UPI, cards or net banking on Razorpay. You get a receipt by email." },
    { q: "What if I paid but did not reach the calendar?", a: `WhatsApp ${COMPANY.phone} with your Razorpay payment ID and we will send your booking link straight away.` },
    { q: "Can I reschedule?", a: "Yes. The confirmation email has a link to move your slot." },
    { q: "What if the call is not useful?", a: "Tell us after the call and we refund the full fee, processed within fifteen working days. You keep the advice." },
  ];

  return (
    <div className={`contents ${LEXEND}`}>
      {/* Ad page: one action only. Hide the site-wide call / WhatsApp buttons. */}
      <style>{".eb-float{display:none!important}"}</style>
      <JsonLd json={ld(service(c.title, c.lead, path), breadcrumb([{ name: "Book a call", path: "/book" }, { name: c.title, path }]), faqPage(faqs))} />

      {/* Top bar */}
      <div className="bg-[#0b1a3c] px-4 py-2.5 text-center text-xs font-semibold text-white sm:text-sm">
        ElevateBox, Hyderabad: <span className="text-[#f8e71c]">engineers from Google, JPMorgan Chase and a Y Combinator startup</span>
      </div>

      <main className="flex-1 pb-24 text-[#262626] lg:pb-0">
        {/* Hero */}
        <section className="relative overflow-hidden bg-white">
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(#f1f1f1_1px,transparent_1px),linear-gradient(90deg,#f1f1f1_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-10 lg:grid-cols-2 lg:py-14">
            <div>
              <p className="inline-block bg-[#f8e71c] px-3 py-1 text-xs font-bold sm:text-sm">{`${c.title.split(" ")[0]} strategic consultation on Google Meet`}</p>
              <h1 className={`font-semibold tracking-tight mt-4 text-4xl leading-[1.15] sm:text-5xl`}>{c.headline}</h1>
              <p className="mt-4 text-[15px] leading-relaxed text-[#424242]">{c.lead}</p>
              <ul className="mt-5 space-y-3">
                {c.includes.map((i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px]"><Check />{i}</li>
                ))}
              </ul>
              <a href={`${path}/form`} className={`mt-7 block rounded-md px-6 py-4 text-center whitespace-nowrap text-[15px] font-bold uppercase text-white sm:text-base sm:tracking-wide shadow-sm transition-colors ${ORANGE}`}>
                Join for a strategic consultation
              </a>
              <p className="mt-2 text-center text-sm text-[#424242]">{GUARANTEE}</p>
            </div>
            <div className="order-first lg:order-none">
              {/* Real app screens, shown whole in phone frames, fanned. On phones they come first: product before words. */}
              <ul className="flex justify-center px-2 pb-6 pt-2">
                {PHOTOS.map((p, i) => (
                  <li key={p.src} className={`-mx-[2%] w-[27%] shrink-0 rounded-[1.3rem] bg-[#0b1a3c] p-[4px] shadow-2xl shadow-[#0b1a3c]/35 ${FAN[i]}`}>
                    <Image src={p.src} alt={p.alt} width={520} height={1126} className="w-full rounded-[1.05rem]" priority />
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-center text-sm font-semibold">{`Apps we have built: ${CLIENTS.join(", ")}`}</p>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="bg-[#0b1a3c] px-5 py-20 text-white sm:py-28">
          <div className="mx-auto max-w-2xl space-y-14 text-center text-[2rem] font-semibold leading-tight tracking-tight sm:text-5xl">
            {PAIN.map((l) => <p key={l} className="lit">{l}</p>)}
            <p className="lit text-[#ff7701]">Your business is leaking money.</p>
            <p className="lit">{`One ${minutes}-minute call shows you where, and what to fix first.`}</p>
          </div>
        </section>

        {/* Outcomes */}
        <section className="px-5 py-14 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <H2>At the end of the call, you&apos;ll know</H2>
            <ul className="mt-12 grid gap-x-12 gap-y-9 md:grid-cols-2">
              {OUTCOMES.map((o) => (
                <li key={o.t} className="flex gap-5">
                  <Icon d={ICONS[o.i]} />
                  <div>
                    <h3 className="font-bold">{o.t}</h3>
                    <p className="mt-1.5 leading-relaxed text-[#424242]">{o.d}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Cta href={`${path}/form`} />
          </div>
        </section>

        {/* Audience */}
        <section className="bg-[#fafbfd] px-5 py-14 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <H2>Who is this call for?</H2>
            <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {AUDIENCE.map((a) => (
                <li key={a.t} className="flex flex-col items-center text-center">
                  <Icon d={ICONS[a.i]} />
                  <h3 className="mt-4 font-bold">{a.t}</h3>
                  <p className="mt-1.5 leading-relaxed text-[#424242]">{a.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Engagement models */}
        <section className="px-5 py-14 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <H2>After the call: three ways to work with us</H2>
            <ol className="mt-12 grid gap-5 lg:grid-cols-3">
              {ENGAGE.map((e, i) => (
                <li key={e.t} className="lit rounded-lg p-7 ring-1 ring-black/10">
                  <p className="text-5xl font-semibold tracking-tight text-[#ff7701]">{`0${i + 1}`}</p>
                  <h3 className="mt-4 text-xl font-bold">{e.t}</h3>
                  <p className="mt-1 text-sm font-semibold text-[#0b1a3c]">{e.k}</p>
                  <p className="mt-3 leading-relaxed text-[#424242]">{e.d}</p>
                </li>
              ))}
            </ol>
            <p className="mx-auto mt-8 max-w-2xl text-center leading-relaxed text-[#424242]">
              We price on what the work is worth to you in the next six months, not on your lifetime plans. The call is where we work out which one fits.
            </p>
            <Cta href={`${path}/form`} />
          </div>
        </section>

        {/* Team */}
        <section className="px-5 py-14 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <div>
              <h2 className={`font-semibold tracking-tight text-3xl leading-tight sm:text-[2.6rem]`}>Meet the team who will be on your call</h2>
              <p className="mt-2 text-sm font-bold">{`${COMPANY.name} · ${COMPANY.legal}, Hyderabad`}</p>
              <span aria-hidden="true" className="mt-2 block h-[3px] w-14 rounded bg-[#d32f2f]" />
              <p className="mt-5 leading-relaxed text-[#424242]">We design, build and run apps, websites and AI tools for businesses across India. The people on your call are the engineers who do the work, not a sales desk.</p>
              <ul className="mt-5 space-y-2.5">
                {CREDENTIALS.map((x) => (
                  <li key={x.k} className="flex items-start gap-3"><Check /><span><b>{x.k}</b>{`: ${x.v}. ${x.note}.`}</span></li>
                ))}
              </ul>
              <a href={`${path}/form`} className={`mt-7 block rounded-md px-6 py-4 text-center whitespace-nowrap text-[15px] font-bold uppercase text-white sm:text-base sm:tracking-wide shadow-sm transition-colors ${ORANGE}`}>
                Join for a strategic consultation
              </a>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="bg-[#f3f8fd] px-5 py-14 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <H2>What one good plan has done for businesses like yours</H2>
            <ul className="mt-12 grid gap-5 sm:grid-cols-3">
              {CONSULT_RESULTS.map((r) => (
                <li key={r.n} className="lit rounded-lg bg-white p-8 text-center ring-1 ring-black/10">
                  <p className="text-5xl font-semibold tracking-tight text-[#ff7701] sm:text-6xl">{r.n}</p>
                  <p className="mt-3 leading-relaxed text-[#424242]">{r.d}</p>
                </li>
              ))}
            </ul>
            <Cta href={`${path}/form`} />
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white px-5 py-14 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.6fr]">
            <div>
              <h2 className={`font-semibold tracking-tight text-3xl leading-tight sm:text-[2.6rem]`}>Frequently asked questions:</h2>
              <p className="mt-4 leading-relaxed text-[#424242]">{`WhatsApp ${COMPANY.phone} or email ${COMPANY.email} if you have any other question.`}</p>
            </div>
            <div className="space-y-3">
              {faqs.map((f) => (
                <details key={f.q} className="group rounded border border-[#262626]/70 bg-white px-5 py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                    {f.q}
                    <span aria-hidden="true" className="text-xl leading-none group-open:hidden">+</span>
                    <span aria-hidden="true" className="hidden text-xl leading-none group-open:inline">−</span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-[#424242]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
          <Cta href={`${path}/form`} />
        </section>
      </main>

      <footer className="bg-[#0b1a3c] px-5 py-6 text-center text-xs text-white/70">
        <p>{`© ${COMPANY.legal} · ${COMPANY.address}`}</p>
        <p className="mt-2 space-x-4">
          <Link href="/privacy-policy" className="underline">Privacy</Link>
          <Link href="/terms-and-conditions" className="underline">Terms</Link>
          <Link href="/cancellation-and-refund" className="underline">Refunds</Link>
        </p>
      </footer>

      {/* Sticky mobile bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-black/10 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <div>
          <p className={`font-semibold tracking-tight whitespace-nowrap text-lg leading-none`}>Strategic consultation</p>
          <p className="mt-1 whitespace-nowrap text-[11px] text-[#424242]">{`${minutes} minutes, Google Meet`}</p>
        </div>
        <a href={`${path}/form`} className={`rounded-md px-5 py-3 shrink-0 whitespace-nowrap text-sm font-bold uppercase text-white ${ORANGE}`}>Join now</a>
      </div>
    </div>
  );
}

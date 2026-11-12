import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DM_Serif_Display } from "next/font/google";
import { CLIENTS, COMPANY, CONSULT_RESULTS, CONSULTS, CREDENTIALS, OG_IMG } from "@/lib/content";
import { JsonLd, breadcrumb, faqPage, ld, service } from "@/lib/schema";

/* Ad landing page, one job: get the visitor into the booking form. No site nav, one CTA repeated
   after every section. Layout and colours follow the owner's reference (a single-offer webinar page):
   navy top bar, serif headings with a red underline, orange buttons, light-blue alternate bands. */
const serif = DM_Serif_Display({ weight: "400", subsets: ["latin"], display: "swap" });

export const dynamicParams = false;
export const generateStaticParams = () => CONSULTS.map((c) => ({ tier: c.slug }));

/* DRAFT promise, needs owner yes: refund the fee if the call was not useful. */
const GUARANTEE = "Not useful? Tell us after the call and we refund you in full.";
const ORANGE = "bg-[#ff7701] hover:bg-[#f57100]";

const find = (tier: string) => CONSULTS.find((c) => c.slug === tier);

export async function generateMetadata({ params }: { params: Promise<{ tier: string }> }): Promise<Metadata> {
  const c = find((await params).tier);
  if (!c) return {};
  const title = `${c.title.split(" ")[0]} tech consultation`;
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

const abScript = (tier: string) =>
  `(function(){var v;try{v=localStorage.getItem("eb_ab")}catch(e){}if(v!=="a"&&v!=="b"){v=Math.random()<.5?"a":"b";try{localStorage.setItem("eb_ab",v)}catch(e){}}` +
  `document.documentElement.setAttribute("data-ab",v);var k="eb_abv_${tier}";try{if(sessionStorage.getItem(k))return;sessionStorage.setItem(k,"1")}catch(e){}` +
  `navigator.sendBeacon&&navigator.sendBeacon("/api/consult/ab-view",JSON.stringify({tier:"${tier}",variant:v}))})()`;

function Cta({ href, note = GUARANTEE }: { href: string; note?: string }) {
  return (
    <div className="mt-10 text-center">
      <a href={href} className={`inline-block w-full max-w-sm rounded-md px-6 py-4 text-base font-bold uppercase tracking-wide text-white shadow-sm transition-colors ${ORANGE}`}>
        Join for a tech consultation
      </a>
      <p className="mt-2 text-sm font-medium text-[#262626]">{note}</p>
    </div>
  );
}

function H2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`text-center ${className}`}>
      <h2 className={`${serif.className} text-3xl leading-tight text-[#262626] sm:text-[2.6rem]`}>{children}</h2>
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
  { i: "money", t: "Where you are losing money today", d: "The leads, follow-ups and hours slipping through the cracks in how you run things now." },
  { i: "target", t: "The one fix that pays back first", d: "An app, a website or an AI helper, whichever brings customers in fastest for your business." },
  { i: "cut", t: "What not to build", d: "The features that sound good but eat budget without bringing a single sale." },
  { i: "rupee", t: "What it should really cost", d: "An honest budget range, so no agency can overcharge you later." },
  { i: "map", t: "A clear first step", d: "What to do this month, whether you build with us or not." },
  { i: "clock", t: "When it starts earning", d: "A realistic timeline from first screen to first rupee back." },
];

const AUDIENCE = [
  { i: "shop", t: "Business owners", d: "Shops, distributors and service businesses that want more orders and less manual work." },
  { i: "heart", t: "Clinics and hospitals", d: "Bookings, reminders and patient follow-ups that run without extra staff." },
  { i: "home", t: "Builders and real estate", d: "Every enquiry called back and every site visit booked." },
  { i: "rocket", t: "Startup founders", d: "Turn an idea into a first version people pay for, without wasting months." },
];

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
    { q: "Who will I talk to?", a: "Someone from the team that designs and builds the apps, not a sales caller." },
    { q: "How does the call happen?", a: `On Google Meet, ${minutes} minutes. You pick the time on the calendar right after paying.` },
    { q: "How do I pay?", a: "UPI, cards or net banking on Razorpay. You get a receipt by email." },
    { q: "What if I paid but did not reach the calendar?", a: `WhatsApp ${COMPANY.phone} with your Razorpay payment ID and we will send your booking link straight away.` },
    { q: "Can I reschedule?", a: "Yes. The confirmation email has a link to move your slot." },
    { q: "What if the call is not useful?", a: "Tell us after the call and we refund the full fee, processed within fifteen working days. You keep the advice." },
  ];

  return (
    <>
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
              <p className="inline-block bg-[#f8e71c] px-3 py-1 text-xs font-bold sm:text-sm">{`${c.title.split(" ")[0]} tech consultation on Google Meet`}</p>
              {/* Headline A/B: runs before the h1 paints, so no flicker. Sticky per browser; one view counted per session. */}
              <script dangerouslySetInnerHTML={{ __html: abScript(c.slug) }} />
              <h1 className={`${serif.className} mt-4 text-4xl leading-[1.15] sm:text-5xl`}>
                <span className="ab-a">{c.headline}</span>
                <span className="ab-b">{c.headlineB}</span>
              </h1>
              <p className="mt-4 text-[15px] leading-relaxed text-[#424242]">{c.lead}</p>
              <ul className="mt-5 space-y-3">
                {c.includes.map((i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px]"><Check />{i}</li>
                ))}
              </ul>
              <a href={`${path}/form`} className={`mt-7 block rounded-md px-6 py-4 text-center text-base font-bold uppercase tracking-wide text-white shadow-sm transition-colors ${ORANGE}`}>
                Join for a tech consultation
              </a>
              <p className="mt-2 text-center text-sm text-[#424242]">{GUARANTEE}</p>
            </div>
            <div>
              <ul className="grid grid-cols-2 gap-3">
                {PHOTOS.map((p) => (
                  <li key={p.src} className="overflow-hidden rounded-lg ring-1 ring-black/10">
                    <Image src={p.src} alt={p.alt} width={600} height={600} className="aspect-square w-full object-cover" priority />
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-center text-sm font-semibold">{`Apps we have built: ${CLIENTS.join(", ")}`}</p>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="bg-[#f3f8fd] px-5 py-14 sm:py-20">
          <div className="mx-auto max-w-2xl">
            <p className="text-center text-sm font-semibold">Do you still think</p>
            <h2 className={`${serif.className} mt-2 text-center text-3xl leading-tight sm:text-[2.6rem]`}>An app is just an expense for big companies?</h2>
            <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-[#424242]">
              <p>Most businesses we meet are losing money in plain sight. <b>Enquiries that nobody called back. Customers who never came a second time. Hours spent on work a phone could do.</b></p>
              <p>Why?</p>
              <p>Because the way customers buy has changed. They search on their phone, compare in minutes and pick whoever answers first.</p>
              <p><b>Think about your typical day.</b> How many calls did you miss? How many follow-ups were forgotten? How much of your team&apos;s day went into copying data from one place to another?</p>
              <p><b>The good news?</b> Fixing it rarely needs a huge build. It needs the right first step.</p>
              <p>{`In ${minutes} minutes, the people who build apps every day look at your business and tell you exactly where an app, website or AI can bring in more money, and what to skip.`}</p>
            </div>
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

        {/* Team */}
        <section className="px-5 py-14 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <div>
              <h2 className={`${serif.className} text-3xl leading-tight sm:text-[2.6rem]`}>Meet the team who will be on your call</h2>
              <p className="mt-2 text-sm font-bold">{`${COMPANY.name} · ${COMPANY.legal}, Hyderabad`}</p>
              <span aria-hidden="true" className="mt-2 block h-[3px] w-14 rounded bg-[#d32f2f]" />
              <p className="mt-5 leading-relaxed text-[#424242]">We design, build and run apps, websites and AI tools for businesses across India. The people on your call are the engineers who do the work, not a sales desk.</p>
              <ul className="mt-5 space-y-2.5">
                {CREDENTIALS.map((x) => (
                  <li key={x.k} className="flex items-start gap-3"><Check /><span><b>{x.k}</b>{`: ${x.v}. ${x.note}.`}</span></li>
                ))}
              </ul>
              <a href={`${path}/form`} className={`mt-7 block rounded-md px-6 py-4 text-center text-base font-bold uppercase tracking-wide text-white shadow-sm transition-colors ${ORANGE}`}>
                Join for a tech consultation
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
                <li key={r.n} className="rounded-lg bg-white p-7 text-center ring-1 ring-black/10">
                  <p className={`${serif.className} text-4xl text-[#ff7701]`}>{r.n}</p>
                  <p className="mt-3 leading-relaxed text-[#424242]">{r.d}</p>
                </li>
              ))}
            </ul>
            <Cta href={`${path}/form`} />
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-[#f3f8fd] px-5 py-14 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.6fr]">
            <div>
              <h2 className={`${serif.className} text-3xl leading-tight sm:text-[2.6rem]`}>Frequently asked questions:</h2>
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
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-black/10 bg-white/95 py-3 pr-20 backdrop-blur lg:hidden" style={{ paddingLeft: "4.5rem" }}>
        <div>
          <p className={`${serif.className} text-lg leading-none`}>Tech consultation</p>
          <p className="text-[11px] text-[#424242]">{`${minutes} on Google Meet`}</p>
        </div>
        <a href={`${path}/form`} className={`rounded-md px-5 py-3 text-sm font-bold uppercase text-white ${ORANGE}`}>Join now</a>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ConsultForm } from "@/components/consult-form";
import { CLIENTS, COMPANY, CONSULT_RESULTS, CONSULTS, CREDENTIALS, OG_IMG } from "@/lib/content";
import { LEXEND } from "@/lib/lexend";
import { JsonLd, breadcrumb, ld, service } from "@/lib/schema";

/* Ad landing page, built to Alex Hormozi's landing-page framework (owner, 18 Nov 2026):
   headline = clear outcome, subheadline clarifies it, hero image proves it, CTA says what you get and how,
   the form sits on the page (more than 5 fields = steps), then 3 bullets answering the 3 biggest objections,
   then proof, then legal. Nothing else: a longer page converts worse. The razor for any addition:
   if it doesn't raise the share of qualified people who book, cut it. Colours/fonts stay the live ones. */

export const dynamicParams = false;
export const generateStaticParams = () => CONSULTS.map((c) => ({ tier: c.slug }));

const ORANGE = "bg-[#ff7701] hover:bg-[#f57100]";
const REFUND = "Not useful? Tell us after the call and we refund you in full.";

const find = (tier: string) => CONSULTS.find((c) => c.slug === tier);

export async function generateMetadata({ params }: { params: Promise<{ tier: string }> }): Promise<Metadata> {
  const c = find((await params).tier);
  if (!c) return {};
  const title = `${c.title.split(" ")[0]} ${c.kind ?? "strategic consultation"}`;
  const path = c.path ?? `/book/${c.slug}`;
  return {
    title,
    description: `${c.lead} Book online with ElevateBox, Hyderabad.`,
    alternates: { canonical: path },
    // ad-only pages: kept out of search and the sitemap so the offers are not found side by side
    robots: { index: false, follow: true },
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

const PHOTOS = [
  { src: "/assets/real-vamshi-farms.jpg", alt: "Vamshi Farms app" },
  { src: "/assets/real-8meds.jpg", alt: "8Meds app" },
  { src: "/assets/real-medibag.jpg", alt: "MediBag app" },
  { src: "/assets/real-oneasy.jpg", alt: "OnEasy app" },
];
const FAN = ["z-0 -rotate-6 translate-y-4", "z-10 -rotate-2", "z-10 rotate-2 translate-y-2", "z-0 rotate-6 translate-y-5"];

export default async function ConsultPage({ params }: { params: Promise<{ tier: string }> }) {
  const c = find((await params).tier);
  if (!c) notFound();
  const path = c.path ?? `/book/${c.slug}`;
  const minutes = c.title.split("-")[0];
  const kind = c.kind ?? "strategic consultation";
  // CTA = what they get + how they get it, nothing else
  const cta = `Book my ${minutes}-min call · ${c.price}`;
  const photos = c.photos ?? PHOTOS;

  return (
    <div className={`contents ${LEXEND}`}>
      {/* Ad page: one action only. Hide the site-wide call / WhatsApp buttons. */}
      <style>{".eb-float{display:none!important}"}</style>
      <JsonLd json={ld(service(c.title, c.lead, path), breadcrumb([{ name: "Book a call", path: "/book" }, { name: c.title, path }]))} />

      <div className="bg-[#0b1a3c] px-4 py-2.5 text-center text-xs font-semibold text-white sm:text-sm">
        ElevateBox, Hyderabad: <span className="text-[#f8e71c]">built by product people from Google, Zomato and Y Combinator-backed startups</span>
      </div>

      <main className="flex-1 pb-24 text-[#262626] lg:pb-0">
        {/* Hero: headline, subheadline, proof image, CTA. */}
        <section className="relative overflow-hidden bg-white">
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(#f1f1f1_1px,transparent_1px),linear-gradient(90deg,#f1f1f1_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-6 px-5 pb-10 pt-7 lg:grid-cols-2 lg:gap-10 lg:py-14">
            <div>
              <p className="inline-block bg-[#f8e71c] px-3 py-1 text-xs font-bold sm:text-sm">{`${minutes}-minute ${kind} on Google Meet`}</p>
              {/* Headline A/B: runs before the h1 paints, so no flicker. Sticky per browser; one view counted per session. */}
              <script dangerouslySetInnerHTML={{ __html: abScript(c.slug) }} />
              <h1 className="mt-3 text-[2rem] font-semibold leading-[1.15] tracking-tight sm:text-5xl">
                <span className="ab-a">{c.headline}</span>
                <span className="ab-b">{c.headlineB ?? c.headline}</span>
              </h1>
              <p className="mt-3 text-[15px] leading-relaxed text-[#424242] sm:text-base">{c.lead}</p>
            </div>
            <div>
              <ul className="flex justify-center px-2 pb-3">
                {photos.map((p, i) => (
                  <li key={p.src} className={`-mx-[2%] shrink-0 rounded-[1.1rem] bg-[#0b1a3c] p-[3px] shadow-xl shadow-[#0b1a3c]/30 ${photos.length === 1 ? "w-[40%] sm:w-[36%]" : `w-[21%] lg:w-[26%] ${FAN[i]}`}`}>
                    <Image src={p.src} alt={p.alt} width={520} height={1126} className="w-full rounded-[0.9rem]" priority />
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-center text-xs font-semibold sm:text-sm">{c.caption ?? `Apps we have built: ${CLIENTS.join(", ")}`}</p>
            </div>
            <div className="lg:col-span-2 lg:mx-auto lg:w-full lg:max-w-md">
              <a href="#book" className={`block rounded-md px-4 py-4 text-center text-base font-bold text-white shadow-sm transition-colors ${ORANGE}`}>{cta}</a>
              <p className="mt-2 text-center text-sm text-[#424242]">{REFUND}</p>
            </div>
          </div>
        </section>

        {/* Form on the page: no extra click to a second page. */}
        <section id="book" className="scroll-mt-4 bg-[#f7f7f5] px-5 py-10 sm:py-14">
          <div className="mx-auto max-w-xl">
            <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">Book your call</h2>
            <p className="mt-1 text-center text-sm text-[#424242]">Two short steps, under a minute. Then pick your time and pay.</p>
            <div className="mt-6"><ConsultForm offer={c} /></div>
          </div>
        </section>

        {/* Three bullets: the three biggest objections, most common first. */}
        <section className="px-5 py-12 sm:py-16">
          <ul className="mx-auto max-w-2xl space-y-6">
            {c.objections.map((o) => (
              <li key={o.t} className="flex gap-3">
                <Check />
                <div>
                  <h3 className="font-bold">{o.t}</h3>
                  <p className="mt-1 leading-relaxed text-[#424242]">{o.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Proof, below the fold. */}
        <section className="bg-[#f3f8fd] px-5 py-12 sm:py-16">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Who you will talk to</h2>
            <p className="mt-2 leading-relaxed text-[#424242]">{`The engineers who do the work at ${COMPANY.name} (${COMPANY.legal}, Hyderabad), not a sales desk.`}</p>
            <ul className="mt-4 space-y-2.5">
              {CREDENTIALS.map((x) => (
                <li key={x.k} className="flex items-start gap-3"><Check /><span><b>{x.k}</b>{`: ${x.v}. ${x.note}.`}</span></li>
              ))}
            </ul>
            {!c.focused && (
              <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                {CONSULT_RESULTS.map((r) => (
                  <li key={r.n} className="rounded-lg bg-white p-5 text-center ring-1 ring-black/10">
                    <p className="text-2xl font-semibold tracking-tight text-[#ff7701]">{r.n}</p>
                    <p className="mt-1 text-sm leading-relaxed text-[#424242]">{r.d}</p>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-8 text-sm text-[#424242]">{`Questions? WhatsApp ${COMPANY.phone} or email ${COMPANY.email}.`}</p>
          </div>
        </section>
      </main>

      <footer className="bg-[#0b1a3c] px-5 py-6 text-center text-xs text-white/70">
        <p>{`© ${COMPANY.legal} · ${COMPANY.address}`}</p>
        <p className="mt-2">Payments by Razorpay. Refunds are processed within fifteen working days.</p>
        <p className="mt-2 space-x-4">
          <Link href="/privacy-policy" className="underline">Privacy</Link>
          <Link href="/terms-and-conditions" className="underline">Terms</Link>
          <Link href="/cancellation-and-refund" className="underline">Refunds</Link>
        </p>
      </footer>

      {/* Sticky mobile bar: the same single action */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-black/10 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <div>
          <p className="whitespace-nowrap text-lg font-semibold leading-none tracking-tight">{kind[0].toUpperCase() + kind.slice(1)}</p>
          <p className="mt-1 whitespace-nowrap text-[11px] text-[#424242]">{`${minutes} minutes, Google Meet, ${c.price}`}</p>
        </div>
        <a href="#book" className={`shrink-0 whitespace-nowrap rounded-md px-5 py-3 text-sm font-bold uppercase text-white ${ORANGE}`}>Book now</a>
      </div>
    </div>
  );
}

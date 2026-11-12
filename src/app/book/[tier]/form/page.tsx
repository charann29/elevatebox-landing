import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CONSULTS } from "@/lib/content";
import { LEXEND } from "@/lib/lexend";
import { ConsultForm } from "@/components/consult-form";

export const dynamicParams = false;
export const generateStaticParams = () => CONSULTS.map((c) => ({ tier: c.slug }));

const find = (tier: string) => CONSULTS.find((c) => c.slug === tier);

// ponytail: form step, not a search landing page; noindex and kept out of the sitemap.
export async function generateMetadata({ params }: { params: Promise<{ tier: string }> }): Promise<Metadata> {
  const c = find((await params).tier);
  if (!c) return {};
  return {
    title: `Join for a ${c.title.split(" ")[0]} strategic consultation`,
    alternates: { canonical: `/book/${c.slug}/form` },
    robots: { index: false, follow: true },
  };
}

export default async function ConsultFormPage({ params }: { params: Promise<{ tier: string }> }) {
  const c = find((await params).tier);
  if (!c) notFound();
  return (
    <div className={`contents ${LEXEND}`}>
      <style>{".eb-float{display:none!important}"}</style>
      {/* ponytail: same bare top bar as the ad page, no site nav to leak ad traffic */}
      <div className="bg-[#0b1a3c] px-4 py-2.5 text-center text-xs font-semibold text-white sm:text-sm">
        ElevateBox, Hyderabad: <span className="text-[#f8e71c]">engineers from Google, JPMorgan Chase and a Y Combinator startup</span>
      </div>
      <main className="flex-1 bg-[#f7f7f5] px-5 py-10 sm:py-14">
        <div className="mx-auto max-w-xl">
          <Link href={`/book/${c.slug}`} className="text-sm text-ink-3 hover:text-ink">‹ Back to details</Link>
          <p className="mt-6 text-sm font-semibold text-[#ff7701]">{`${c.title.split(" ")[0]} strategic consultation`}</p>
          <h1 className="mt-1 text-3xl font-bold sm:text-4xl">Tell us about your project</h1>
          <p className="mt-2 text-ink-3">7 quick questions, under a minute. Then pick your time and pay.</p>
          <div className="mt-8">
            <ConsultForm offer={c} />
          </div>
        </div>
      </main>
    </div>
  );
}

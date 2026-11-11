"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import companies from "@/lib/companies.json";
import { cityTier, plan } from "@/lib/growth";
import { GrowthPlan, range } from "@/components/growth-plan";

// Growth plan for one newly registered company, picked by ?c=<slug>. One static page serves all
// ~4,800 of them: a static page each would add ~45,000 files and ~4 GB to every deploy.

type Company = { slug: string; name: string; industry: string; city: string; activity: string; registered: string };
const slugify = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const month = (ym: string) => new Date(`${ym}-01`).toLocaleDateString("en-IN", { month: "long", year: "numeric" });

export function CompanyPlan({ email }: { email: string }) {
  const slug = useSearchParams().get("c") ?? "";
  const c = (companies as Company[]).find((x) => x.slug === slug);

  if (!c) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="text-3xl font-bold text-brand">We could not find that growth plan</h1>
        <p className="mt-3 text-ink-muted">The link may be old or mistyped.</p>
        <Link href="/proposals" className="mt-6 inline-block rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white">See all growth plans</Link>
      </div>
    );
  }

  const g = plan(c.industry, c.city);
  return (
    <>
      <section className="night-glow relative overflow-hidden">
        <div aria-hidden="true" className="night-grid absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-10 lg:px-8 lg:pb-24 lg:pt-14">
          <nav aria-label="Breadcrumb" className="text-xs text-white/45">
            <Link href="/" className="hover:text-white">Home</Link> / <Link href="/proposals" className="hover:text-white">Growth plans</Link> /{" "}
            <span className="text-white/75">{c.name}</span>
          </nav>
          <p className="mt-8 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/75">
            Growth plan · {c.industry} · {c.city}
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl">Growth Plan for {c.name}, {c.city}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/65">
            How {c.name} could add {range(g.lo[5].revenue, g.hi[5].revenue)} a month by Month 6 and{" "}
            {range(g.lo[11].revenue, g.hi[11].revenue)} by Month 12, with tech, automation, strategy and Meta ads run as one plan.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <article className="max-w-4xl">
          <p className="text-xs text-ink-muted">
            Registered {month(c.registered)}{c.activity ? ` · ${c.activity}` : ""} · see the{" "}
            <Link href={`/proposals/industry/${slugify(c.industry)}`} className="underline">{c.industry.toLowerCase()} plan</Link> and the{" "}
            <Link href={`/proposals/city/${slugify(c.city)}`} className="underline">{c.city} plan</Link>
          </p>

          <div className="mt-6 rounded-2xl border border-black/10 bg-[#FFF6E9] p-5 text-sm leading-relaxed text-ink-muted">
            {c.name} is not an ElevateBox client, and this is not an endorsement by them. We know only what its public
            registration shows: the name, the district, the line of business and the month it was registered. The money
            figures are a model for a typical new {c.industry.toLowerCase()} business in {cityTier(c.city)}, built from the
            assumptions printed below. If you run {c.name}, email{" "}
            <a href={`mailto:${email}?subject=${encodeURIComponent(`Growth plan: ${c.name}`)}`} className="underline">{email}</a>{" "}
            with your real numbers and we will redo it, or remove the page.
          </div>

          <GrowthPlan s={{ name: c.name, industry: c.industry, city: c.city, voice: g.x.voice, stack: g.x.ideas }} g={g} />

          <div className="mt-12 rounded-2xl bg-[#E3ECFF] p-7">
            <h2 className="text-lg font-semibold text-brand">Just started {c.name}?</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              The first three months decide most new businesses. In a 30-minute call we redo this plan with your real numbers and tell you what to build first.
            </p>
            <Link href="/contact" className="mt-5 inline-block rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white">
              Redo this plan with my numbers
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}

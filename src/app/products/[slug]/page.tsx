import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMeta } from "@/lib/seo";
import { JsonLd, breadcrumb, ld, service } from "@/lib/schema";
import { Header, Footer } from "@/components/site";
import { CtaBand, PageHero, Section } from "@/components/blocks";
import { SHOWCASE } from "@/lib/showcase";
import { productImg } from "@/lib/showcase-img";

export const dynamicParams = false;
export const generateStaticParams = () => SHOWCASE.map((p) => ({ slug: p.slug }));
const find = (slug: string) => SHOWCASE.find((p) => p.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = find((await params).slug);
  if (!p) return {};
  return pageMeta(`${p.name}: ${p.domain} App and Software | ElevateBox Hyderabad`, `${p.tagline} ${p.problem} Built in ${p.weeks}, ${p.price}. By ElevateBox, Hyderabad.`, `/products/${p.slug}`);
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = find((await params).slug);
  if (!p) notFound();
  const path = `/products/${p.slug}`;
  const img = productImg(p.slug);
  const related = SHOWCASE.filter((x) => x.slug !== p.slug).slice(0, 3);
  return (
    <>
      <Header />
      <main className="flex-1">
        <JsonLd json={ld(service(`${p.name}: ${p.domain} app`, p.tagline, path, `${p.domain} software development`), breadcrumb([{ name: "Products", path: "/products" }, { name: p.name, path }]))} />
        <PageHero eyebrow={`${p.domain} · ready-to-launch product`} title={`${p.name}: ${p.tagline}`} lead={p.problem} crumbs={[{ label: "Products", href: "/products" }, { label: p.name }]} />
        <Section>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            <article className="space-y-8 text-ink">
              <div>
                <h2 className="text-2xl font-bold text-brand">Who it is for</h2>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-ink-muted">{p.who.map((w) => <li key={w}>{w}</li>)}</ul>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-brand">What it does</h2>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-ink-muted">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-brand">What we keep running after launch</h2>
                <p className="mt-2 text-ink-muted">Most companies build the app and leave. We stay and make it earn.</p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-ink-muted">{p.run.map((r) => <li key={r}>{r}</li>)}</ul>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-brand">Time and cost</h2>
                <p className="mt-2 text-ink-muted">{`Usually ${p.weeks} to launch, branded as yours. Typical range ${p.price}, depending on modules. We give a fixed quote after a 45-minute call.`}</p>
                <Link href="/tech-consultation" className="mt-4 inline-block rounded-full bg-[#ff7701] px-6 py-3 font-semibold text-white">Book a 45-minute call · ₹499</Link>
              </div>
            </article>
            {img ? <Image src={img} alt={`${p.name}, ${p.domain.toLowerCase()} product by ElevateBox`} width={1200} height={900} className="w-full rounded-2xl shadow-lg" priority /> : null}
          </div>
        </Section>
        <Section tinted title="More ready-to-launch products">
          <ul className="grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}><Link href={`/products/${r.slug}`} className="block rounded-xl bg-white p-5 ring-1 ring-black/10 hover:ring-brand/40"><span className="text-xs font-semibold uppercase text-brand/60">{r.domain}</span><span className="mt-1 block font-bold text-brand">{r.name}</span></Link></li>
            ))}
          </ul>
          <p className="mt-6"><Link href="/products" className="font-semibold text-brand underline">See all products</Link></p>
        </Section>
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}

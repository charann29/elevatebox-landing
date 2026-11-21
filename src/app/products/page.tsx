import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { JsonLd, ORG, breadcrumb, ld } from "@/lib/schema";
import { Header, Footer } from "@/components/site";
import { CtaBand, PageHero, Section } from "@/components/blocks";
import { SHOWCASE } from "@/lib/showcase";
import { productImg } from "@/lib/showcase-img";

export const metadata: Metadata = pageMeta(
  "Ready-to-Launch Apps and Software by Domain | ElevateBox Hyderabad",
  `${SHOWCASE.length} ready-to-launch products from ElevateBox, Hyderabad: hospital, school, real estate, delivery, fintech, devotional and more. Built for you, then run with AI calling, CRM and growth.`,
  "/products",
);

const TINTS = ["bg-[#E3ECFF]", "bg-[#F0FCFF]", "bg-[#FFF6E9]", "bg-[#EFEAFF]", "bg-[#E7F7EE]", "bg-[#FFEBE6]"];

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <JsonLd json={ld(ORG, { "@type": "CollectionPage", "@id": "https://elevatebox.in/products#page", url: "https://elevatebox.in/products", name: "Ready-to-launch products by ElevateBox" }, breadcrumb([{ name: "Products", path: "/products" }]))} />
        <PageHero
          eyebrow="Ready-to-launch products"
          title="Pick your industry. We launch it for you."
          lead="Products we have designed for every kind of business, ready to brand and launch as yours. We build it, then keep it earning with AI calling, a CRM and growth marketing."
          crumbs={[{ label: "Products" }]}
        />
        <Section>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SHOWCASE.map((p, n) => {
              const img = productImg(p.slug);
              return (
                <li key={p.slug} className={`flex flex-col overflow-hidden rounded-2xl ${TINTS[n % TINTS.length]}`}>
                  <Link href={`/products/${p.slug}`} className="flex flex-1 flex-col">
                    {img ? (
                      <Image src={img} alt={`${p.name}, ${p.domain.toLowerCase()} product by ElevateBox`} width={1200} height={900} className="aspect-[4/3] w-full object-cover" />
                    ) : null}
                    <div className="flex flex-1 flex-col p-6">
                      <span className="text-xs font-semibold uppercase tracking-wide text-brand/60">{p.domain}</span>
                      <h2 className="mt-1 text-xl font-bold text-brand">{p.name}</h2>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{p.tagline}</p>
                      <p className="mt-4 text-sm font-semibold text-brand">{`${p.weeks} · ${p.price}`}</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Section>
        <CtaBand title="Don't see your industry?" lead="Tell us how your business runs. We will tell you what to build first, and what to skip." />
      </main>
      <Footer />
    </>
  );
}

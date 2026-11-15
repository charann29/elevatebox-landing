import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, FAQS, getCategory } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { Header, Footer } from "@/components/site";
import { COL, EntryCards, FaqCards, FeaturedCards, Head, HeroVisual, PriceCta, RichHero, TrustStrip, WorkRow, pageImage } from "@/components/inner";

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.key }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return pageMeta(cat.seoTitle, cat.meta, cat.base);
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  return (
    <>
      <Header />
      <main className="flex-1">
        <RichHero
          eyebrow={cat.label}
          title={`${cat.label} we deliver`}
          lead={cat.blurb}
          crumbs={[{ label: cat.label }]}
          visual={<HeroVisual img={pageImage(cat.key)} seed={`${cat.key} index`} chip={`${cat.items.length} ${cat.label.toLowerCase()}`} priority />}
        />

        <TrustStrip />

        <section className="bg-canvas">
          <div className={`${COL} py-16 lg:py-24`}>
            <FeaturedCards category={cat.key} base={cat.base} items={cat.items.slice(0, 2)} />
            <div className="mt-4 lg:mt-5">
              <EntryCards category={cat.key} base={cat.base} items={cat.items.slice(2)} all={cat.items} />
            </div>
          </div>
        </section>

        <WorkRow />

        <section className="bg-canvas">
          <div className={`${COL} grid items-start gap-10 py-16 lg:grid-cols-[1fr_1.4fr] lg:gap-16 lg:py-24`}>
            <Head eyebrow="Common questions" title="Before you get in touch" />
            <FaqCards items={FAQS} />
          </div>
        </section>

        <PriceCta />
      </main>
      <Footer />
    </>
  );
}

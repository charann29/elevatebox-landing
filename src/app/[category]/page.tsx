import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, COMPANY, getCategory } from "@/lib/content";
import { Header, Footer } from "@/components/site";
import { CtaBand, Faq, LinkCards, PageHero, Section } from "@/components/blocks";

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
  return {
    title: `${cat.label} | ${COMPANY.name}`,
    description: cat.blurb,
    alternates: { canonical: cat.base },
  };
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
        <PageHero
          eyebrow={cat.label}
          title={`${cat.label} we deliver`}
          lead={cat.blurb}
          crumbs={[{ label: cat.label }]}
        />

        <Section>
          <LinkCards base={cat.base} items={cat.items} />
        </Section>

        <Section
          tinted
          eyebrow="Common questions"
          title="Before you get in touch"
        >
          <div className="max-w-3xl">
            <Faq />
          </div>
        </Section>

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}

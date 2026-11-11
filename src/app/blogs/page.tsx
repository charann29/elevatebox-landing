import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { POSTS, POST_CATEGORIES, postCover } from "@/lib/content";
import { getStudioPosts } from "@/lib/cms";
import { Header, Footer } from "@/components/site";
import { CtaBand, PageHero, Section } from "@/components/blocks";

export const metadata: Metadata = {
  title: `Blog`,
  description:
    "Practical writing on product engineering, delivery, cost, and AI — from the team that ships the work.",
  alternates: { canonical: "/blogs" },
};

const fmt = (iso: string) =>
  iso && new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

type Card = { slug: string; title: string; category: string; date: string; readMins: number; excerpt: string; cover: string };

export default async function BlogIndex() {
  // Studio posts first (newest first), then ours; on a slug clash Studio's rewrite wins.
  const studio = await getStudioPosts();
  const taken = new Set(studio.map((s) => s.slug));
  const cards: Card[] = [
    ...studio.map((s) => {
      const category = s.eyebrow ?? s.tags[0] ?? "Article";
      return { slug: s.slug, title: s.heading ?? s.title, category, date: s.publishedAt ?? s.updatedAt ?? "", readMins: s.readingTimeMinutes, excerpt: s.description, cover: s.imageUrl ?? postCover(category) };
    }),
    ...POSTS.filter((p) => !taken.has(p.slug)).map((p) => ({ ...p, cover: postCover(p.category) })),
  ];
  const [featured, ...rest] = cards;

  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Blog"
          title="Notes from the delivery floor"
          lead="Writing about the decisions that actually change project outcomes — scoping, architecture, cost, and where AI earns its place."
          crumbs={[{ label: "Blogs" }]}
        />

        <Section>
          <Link
            href={`/blogs/${featured.slug}`}
            className="group grid gap-8 rounded-3xl bg-[#E3ECFF] p-8 transition-transform duration-300 hover:-translate-y-1 lg:grid-cols-2 lg:p-12"
          >
            <div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand">
                {featured.category}
              </span>
              <h2 className="mt-5 text-2xl font-bold leading-tight text-brand sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-4 leading-relaxed text-ink-muted">
                {featured.excerpt}
              </p>
              <p className="mt-6 text-xs text-ink-muted">
                {fmt(featured.date)} · {featured.readMins} min read
              </p>
            </div>
            <div className="self-center">
              <Image
                src={featured.cover}
                alt=""
                width={600}
                height={400}
                priority
                className="h-auto w-full rounded-2xl shadow-lg"
              />
              <span className="mt-6 inline-block font-semibold text-brand">
                Read the article →
              </span>
            </div>
          </Link>

          <div className="mt-10 flex flex-wrap gap-2">
            {POST_CATEGORIES.map((c) => (
              <span
                key={c}
                className="rounded-full border border-black/10 px-4 py-1.5 text-xs font-medium text-ink-muted"
              >
                {c}
              </span>
            ))}
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <Link
                key={p.slug}
                href={`/blogs/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1"
              >
                <Image
                  src={p.cover}
                  alt=""
                  width={600}
                  height={400}
                  className="h-44 w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-7">
                <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                  {p.category}
                </span>
                <h3 className="mt-3 flex-1 text-lg font-semibold leading-snug text-brand">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {p.excerpt}
                </p>
                <p className="mt-5 border-t border-black/5 pt-4 text-xs text-ink-muted">
                  {fmt(p.date)} · {p.readMins} min read
                </p>
                </div>
              </Link>
            ))}
          </div>
        </Section>

        <CtaBand
          title="Have a project in mind?"
          lead="We are happy to give an opinion before you commit a budget."
        />
      </main>
      <Footer />
    </>
  );
}

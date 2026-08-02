import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COMPANY, POSTS, getPost } from "@/lib/content";
import { Header, Footer } from "@/components/site";
import { CtaBand, PageHero, Section } from "@/components/blocks";

export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: `${p.title} | ${COMPANY.name}`,
    description: p.excerpt,
    alternates: { canonical: `/blogs/${p.slug}` },
    openGraph: {
      title: p.title,
      description: p.excerpt,
      type: "article",
      publishedTime: p.date,
    },
  };
}

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();

  const related = POSTS.filter(
    (o) => o.slug !== p.slug && o.category === p.category,
  ).slice(0, 3);
  const more =
    related.length >= 3
      ? related
      : [...related, ...POSTS.filter((o) => o.slug !== p.slug)].slice(0, 3);

  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow={p.category}
          title={p.title}
          lead={p.excerpt}
          crumbs={[{ label: "Blogs", href: "/blogs" }, { label: p.category }]}
        />

        <Section>
          <div className="grid gap-12 lg:grid-cols-3">
            <article className="lg:col-span-2">
              <p className="text-xs text-ink-muted">
                {fmt(p.date)} · {p.readMins} min read
              </p>
              <div className="mt-8 space-y-10">
                {p.sections.map((s) => (
                  <section key={s.h}>
                    <h2 className="text-2xl font-bold text-brand">{s.h}</h2>
                    <div className="mt-4 space-y-4">
                      {s.p.map((para, i) => (
                        <p key={i} className="leading-relaxed text-ink-muted">
                          {para}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              <div className="mt-12 rounded-2xl bg-[#E3ECFF] p-7">
                <h2 className="text-lg font-semibold text-brand">
                  Working on something like this?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  Send us the brief. We will tell you what we would build, what
                  we would cut, and roughly what it costs.
                </p>
                <Link
                  href="/contact"
                  className="mt-5 inline-block rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white"
                >
                  Talk to us
                </Link>
              </div>
            </article>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-black/5 bg-[#F8FAFC] p-6">
                <h2 className="font-semibold text-brand">Related reading</h2>
                <ul className="mt-4 space-y-4">
                  {more.map((o) => (
                    <li key={o.slug}>
                      <Link
                        href={`/blogs/${o.slug}`}
                        className="block text-sm font-medium leading-snug text-ink-muted transition-colors hover:text-brand"
                      >
                        {o.title}
                      </Link>
                      <p className="mt-1 text-xs text-ink-muted/70">
                        {o.category} · {o.readMins} min
                      </p>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/blogs"
                  className="mt-5 block border-t border-black/10 pt-4 text-sm font-semibold text-brand"
                >
                  All articles →
                </Link>
              </div>
            </aside>
          </div>
        </Section>

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}

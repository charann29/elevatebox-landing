import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COMPANY, POSTS, getPost, postCover, OG_IMG } from "@/lib/content";
import { Header, Footer } from "@/components/site";
import { CtaBand, PageHero, Section } from "@/components/blocks";
import { JsonLd, ORG, breadcrumb, ld } from "@/lib/schema";
import { BLOG_PATH, getStudioPost, getStudioPosts } from "@/lib/cms";
import { StudioArticle, studioMetadata } from "@/components/studio-article";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = new Set([...POSTS.map((p) => p.slug), ...(await getStudioPosts()).map((s) => s.slug)]);
  return [...slugs].map((slug) => ({ slug }));
}

// On a slug clash the Studio post wins: Growth Combinator's rewrites replace our posts at the same URL.
const studioPost = async (slug: string) =>
  (await getStudioPosts()).some((s) => s.slug === slug) ? getStudioPost(slug) : null;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = await studioPost(slug);
  if (s) return studioMetadata(s, `${BLOG_PATH}/${slug}`);
  const p = getPost(slug);
  if (!p) return {};
  return {
    // Long titles drop the " | ElevateBox" suffix so Google shows them whole.
    title: p.title.length > 47 ? { absolute: p.title } : p.title,
    description: p.excerpt,
    alternates: { canonical: `/blogs/${p.slug}` },
    openGraph: { images: [OG_IMG],
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
  const s = await studioPost(slug);
  if (s)
    return (
      <StudioArticle
        p={s}
        path={`${BLOG_PATH}/${slug}`}
        crumbs={[{ name: "Blogs", path: BLOG_PATH }, { name: s.breadcrumbLabel ?? s.title, path: `${BLOG_PATH}/${slug}` }]}
      />
    );
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
        <JsonLd
          json={ld(
            ORG,
            {
              "@type": "BlogPosting",
              headline: p.title,
              description: p.excerpt,
              datePublished: p.date,
              mainEntityOfPage: `${COMPANY.site}/blogs/${p.slug}`,
              author: { "@id": ORG["@id"] },
              publisher: { "@id": ORG["@id"] },
            },
            breadcrumb([{ name: "Blogs", path: "/blogs" }, { name: p.title, path: `/blogs/${p.slug}` }]),
          )}
        />
        <PageHero
          eyebrow={p.category}
          title={p.title}
          lead={p.excerpt}
          crumbs={[{ label: "Blogs", href: "/blogs" }, { label: p.category }]}
        />

        <Section>
          <div className="grid gap-12 lg:grid-cols-3">
            <article className="lg:col-span-2">
              <Image
                src={postCover(p.category)}
                alt=""
                width={600}
                height={400}
                priority
                className="mb-8 h-auto w-full rounded-2xl shadow-lg"
              />
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

              {p.sources && (
                <section className="mt-10">
                  <h2 className="text-2xl font-bold text-brand">Sources</h2>
                  <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-ink-muted">
                    {p.sources.map((s) => (
                      <li key={s.url}>
                        <a href={s.url} className="underline hover:text-brand" rel="noopener">{s.name}</a>
                        {s.what ? ` — ${s.what}` : ""}
                      </li>
                    ))}
                  </ol>
                </section>
              )}

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

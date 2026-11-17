import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COMPANY, POSTS, getPost, OG_IMG } from "@/lib/content";
import { BLOG_TAILS, pageMeta, withTail } from "@/lib/seo";
import { Header, Footer } from "@/components/site";
import { AuthorBox, BlogCover, Byline, COL, Head, PriceCta, RichHero, Toc, slugify } from "@/components/inner";
import { FOUNDER, JsonLd, ORG, breadcrumb, ld } from "@/lib/schema";
import { BLOG_PATH, getStudioPost, getStudioPosts } from "@/lib/cms";
import { StudioArticle, studioMetadata } from "@/components/studio-article";

// New WordPress slugs render on first visit; unknown slugs still 404 (notFound below).
export const dynamicParams = true;
export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = new Set([...POSTS.map((p) => p.slug), ...(await getStudioPosts()).map((s) => s.slug)]);
  return [...slugs].map((slug) => ({ slug }));
}

// On a slug clash the Studio post wins: Growth Combinator's rewrites replace our posts at the same URL.
const studioPost = async (slug: string) =>
  (await getStudioPosts()).some((s) => s.slug === slug) ? getStudioPost(slug) : null;

// <title> for posts whose H1 runs past 60 characters; the H1 itself is unchanged.
const SEO_TITLES: Record<string, string> = {
  "flutter-vs-react-native": "Flutter vs React Native: How to Choose for Your App",
  "freelance-vs-app-development-company-hyderabad": "Freelance App Developer vs App Company in Hyderabad",
  "how-to-build-tax-ai-india": "How to Build a Tax AI for India: Data, Retrieval, Checks",
  "hyderabad-health-apps-telugu-study-2026": "1 of 10 Hyderabad Health Brands Has a Telugu Website",
  "tech-stack-for-a-new-startup": "Picking a Tech Stack for a New Startup | ElevateBox",
};
const postTitle = (p: { slug: string; title: string }) =>
  SEO_TITLES[p.slug] ?? (p.title.length > 47 ? p.title : `${p.title} | ElevateBox`);
const postDesc = (p: { excerpt: string }) => withTail(p.excerpt, BLOG_TAILS);

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
  // Long titles drop the " | ElevateBox" suffix so Google shows them whole.
  return pageMeta(postTitle(p), postDesc(p), `/blogs/${p.slug}`, { publishedTime: p.date });
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
              description: postDesc(p),
              image: `${COMPANY.site}${OG_IMG}`,
              datePublished: p.date,
              mainEntityOfPage: `${COMPANY.site}/blogs/${p.slug}`,
              author: FOUNDER,
              publisher: { "@id": ORG["@id"] },
            },
            breadcrumb([{ name: "Blogs", path: "/blogs" }, { name: p.title, path: `/blogs/${p.slug}` }]),
          )}
        />
        <RichHero
          eyebrow={p.category}
          title={p.title}
          lead={p.excerpt}
          crumbs={[{ label: "Blogs", href: "/blogs" }, { label: p.category }]}
          actions={false}
          meta={
            <Byline>
              {fmt(p.date)} · {p.readMins} min read
            </Byline>
          }
          visual={
            <div className="overflow-hidden rounded-[28px] ring-1 ring-white/15">
              <BlogCover slug={p.slug} title={p.title} category={p.category} />
            </div>
          }
        />

        <div className={`${COL} grid gap-8 py-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16 lg:py-20`}>
          <Toc items={p.sections.map((s) => ({ id: slugify(s.h), text: s.h }))} />
          <article className="min-w-0 max-w-[70ch] text-[18px] leading-[1.75] text-ink-2">
            <div className="space-y-12">
              {p.sections.map((s) => (
                <section key={s.h}>
                  <h2 id={slugify(s.h)} className="scroll-mt-28 text-[26px] font-semibold leading-tight lg:text-[30px]">{s.h}</h2>
                  <div className="mt-5 space-y-5">
                    {s.p.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {p.sources && (
              <section className="mt-12">
                <h2 className="text-[26px] font-semibold">Sources</h2>
                <ol className="mt-4 list-decimal space-y-2 pl-5 text-[15px] text-ink-3">
                  {p.sources.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} className="underline hover:text-navy" rel="noopener">{s.name}</a>
                      {s.what ? ` — ${s.what}` : ""}
                    </li>
                  ))}
                </ol>
              </section>
            )}

            <div className="mt-12 flex flex-col gap-5 rounded-3xl bg-sky p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <h2 className="text-xl font-semibold">Working on something like this?</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">
                  Send us the brief. We will tell you what we would build, what
                  we would cut, and roughly what it costs.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-navy px-6 text-[15px] font-semibold text-white hover:bg-brand-soft"
              >
                Talk to us
              </Link>
            </div>

            <AuthorBox />
          </article>
        </div>

        <section className="bg-canvas">
          <div className={`${COL} py-16 lg:py-20`}>
            <Head
              title="Related reading"
              action={
                <Link href="/blogs" className="shrink-0 text-sm font-semibold text-navy underline-offset-4 hover:underline">
                  All articles →
                </Link>
              }
            />
            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {more.map((o) => (
                <li key={o.slug}>
                  <Link href={`/blogs/${o.slug}`} className="group flex h-full flex-col rounded-3xl border border-line bg-white p-3 transition-colors hover:border-navy/30">
                    <span className="block overflow-hidden rounded-2xl">
                      <BlogCover slug={o.slug} title={o.title} category={o.category} small />
                    </span>
                    <span className="px-2 pb-2 pt-4">
                      <span className="block font-semibold leading-snug text-ink group-hover:text-navy">{o.title}</span>
                      <span className="mt-1.5 block text-xs text-ink-4">
                        {o.category} · {o.readMins} min
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <PriceCta />
      </main>
      <Footer />
    </>
  );
}

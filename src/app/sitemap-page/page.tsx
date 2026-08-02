import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES, COMPANY, JOBS, POSTS } from "@/lib/content";
import { Header, Footer } from "@/components/site";
import { PageHero, Section } from "@/components/blocks";

export const metadata: Metadata = {
  title: `Sitemap | ${COMPANY.name}`,
  description: "Every page on the site, in one list.",
  alternates: { canonical: "/sitemap-page" },
};

const PAGES = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Careers", href: "/careers" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Cancellation & Refund", href: "/cancellation-and-refund" },
];

function Col({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-accent">
        {title}
      </h2>
      <ul className="mt-4 space-y-1.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-sm text-ink-muted transition-colors hover:text-brand"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SitemapPage() {
  const total =
    PAGES.length +
    CATEGORIES.length +
    CATEGORIES.reduce((n, c) => n + c.items.length, 0) +
    POSTS.length +
    JOBS.length +
    1;

  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Sitemap"
          title="Every page on this site"
          lead={`${total} pages across services, technologies, industries, AI solutions, locations, articles, and open roles.`}
          crumbs={[{ label: "Sitemap" }]}
        />

        <Section>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <Col title="Pages" links={PAGES} />
            {CATEGORIES.map((c) => (
              <Col
                key={c.key}
                title={c.label}
                links={[
                  { label: `All ${c.label.toLowerCase()}`, href: c.base },
                  ...c.items.map((i) => ({
                    label: i.name,
                    href: `${c.base}/${i.slug}`,
                  })),
                ]}
              />
            ))}
            <Col
              title="Careers"
              links={JOBS.map((j) => ({
                label: j.title,
                href: `/careers/${j.slug}`,
              }))}
            />
          </div>

          <div className="mt-12 border-t border-black/10 pt-10">
            <Col
              title="Articles"
              links={POSTS.map((p) => ({
                label: p.title,
                href: `/blogs/${p.slug}`,
              }))}
            />
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}

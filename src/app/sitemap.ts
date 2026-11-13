export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { getStudioPaths, getStudioPosts } from "@/lib/cms";
import { CATEGORIES, COMPANY, JOBS, POSTS } from "@/lib/content";
import { COMPANIES, PROPOSALS, citySlug, companyHref, industrySlug, proposalCities, proposalIndustries } from "@/lib/proposals";

const base = COMPANY.site;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    "",
    "/about",
    "/portfolio",
    "/mobile-app-development-company-hyderabad",
    "/hire-mobile-app-developers-hyderabad",
    "/web-development-company-hyderabad",
    "/software-development-company-hyderabad",
    "/android-app-development-company-hyderabad",
    "/ios-app-development-company-hyderabad",
    "/flutter-app-development-company-hyderabad",
    "/mvp-development-company-hyderabad",
    "/ai-development-company-hyderabad",
    "/app-development-company-telangana",
    "/careers",
    "/blogs",
    "/contact",
    "/book",
    "/courses",
    "/best-ai-developers-in-hyderabad",
    "/privacy-policy",
    "/terms-and-conditions",
    "/cancellation-and-refund",
    "/sitemap-page",
  ].map((p) => ({
    url: `${base}${p}`,
    priority: p === "" ? 1 : /hyderabad|telangana/.test(p) ? 0.9 : 0.7,
  }));

  const categoryPages = CATEGORIES.flatMap((c) => [
    { url: `${base}${c.base}`, priority: 0.8 },
    ...c.items.map((i) => ({ url: `${base}${c.base}/${i.slug}`, priority: 0.7 })),
  ]);

  // Growth Studio posts (a Studio slug replaces ours) and its indexable pages at any address.
  const studio = await getStudioPosts();
  const taken = new Set(studio.map((s) => s.slug));
  const posts = [
    ...studio.map((s) => ({
      url: `${base}/blogs/${s.slug}`,
      lastModified: s.updatedAt ?? s.publishedAt ?? undefined,
      priority: 0.6,
    })),
    ...POSTS.filter((p) => !taken.has(p.slug)).map((p) => ({
      url: `${base}/blogs/${p.slug}`,
      lastModified: new Date(p.date),
      priority: 0.6,
    })),
    ...(await getStudioPaths())
      .filter((e) => !e.noindex)
      .map((e) => ({ url: `${base}${e.path}`, lastModified: e.lastmod ?? undefined, priority: 0.6 })),
  ];

  const jobs = JOBS.map((j) => ({
    url: `${base}/careers/${j.slug}`,
    priority: 0.5,
  }));

  const plans = [
    { url: `${base}/proposals`, priority: 0.7 },
    ...proposalIndustries().map((i) => ({ url: `${base}/proposals/industry/${industrySlug(i)}`, priority: 0.7 })),
    ...proposalCities().map((c) => ({ url: `${base}/proposals/city/${citySlug(c)}`, priority: 0.7 })),
    ...PROPOSALS.map((p) => ({ url: `${base}/proposals/${p.slug}`, priority: 0.5 })),
    ...COMPANIES.map((c) => ({ url: `${base}${companyHref(c.slug)}`, priority: 0.4 })),
  ];

  return [...staticPages, ...categoryPages, ...posts, ...jobs, ...plans];
}

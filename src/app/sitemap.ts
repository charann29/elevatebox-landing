import type { MetadataRoute } from "next";
import { CATEGORIES, COMPANY, JOBS, POSTS } from "@/lib/content";

const base = COMPANY.site;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/about",
    "/portfolio",
    "/careers",
    "/blogs",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions",
    "/cancellation-and-refund",
    "/sitemap-page",
  ].map((p) => ({
    url: `${base}${p}`,
    priority: p === "" ? 1 : 0.7,
  }));

  const categoryPages = CATEGORIES.flatMap((c) => [
    { url: `${base}${c.base}`, priority: 0.8 },
    ...c.items.map((i) => ({ url: `${base}${c.base}/${i.slug}`, priority: 0.7 })),
  ]);

  const posts = POSTS.map((p) => ({
    url: `${base}/blogs/${p.slug}`,
    lastModified: new Date(p.date),
    priority: 0.6,
  }));

  const jobs = JOBS.map((j) => ({
    url: `${base}/careers/${j.slug}`,
    priority: 0.5,
  }));

  return [...staticPages, ...categoryPages, ...posts, ...jobs];
}

import type { NextConfig } from "next";

// Vercel builds and serves this site (git integration on main). Pages are still prerendered at
// build time; the only server code is /api/revalidate, which Growth Studio calls to start a rebuild.
// Public URLs of the paid-call ad pages -> internal tier (owner: no prices in URLs).
// ponytail: duplicated from CONSULTS[].path in src/lib/content.ts; change both together.
const AD_PAGES: [string, string][] = [
  ["/tech-consultation", "499"],
  ["/product-review", "1499"],
  ["/project-assessment", "3499"],
];

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  // /book/<tier>/form talks to the booking Worker (leads, Razorpay, admin, Meta CAPI) same-origin.
  // ponytail: workers.dev host until the Worker moves to the elevatebox.in Cloudflare account.
  async rewrites() {
    return [
      { source: "/api/consult/:path*", destination: "https://elevatebox-consult.lsaicharan01.workers.dev/api/:path*" },
      ...AD_PAGES.flatMap(([path, tier]) => [
        { source: path, destination: `/book/${tier}` },
        { source: `${path}/form`, destination: `/book/${tier}/form` },
      ]),
    ];
  },
  // Old price URLs (live ads, shared links) move to the neutral ones; query strings carry over.
  async redirects() {
    return AD_PAGES.flatMap(([path, tier]) => [
      { source: `/book/${tier}`, destination: path, permanent: true },
      { source: `/book/${tier}/form`, destination: `${path}/form`, permanent: true },
    ]);
  },
};

export default nextConfig;

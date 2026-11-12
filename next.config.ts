import type { NextConfig } from "next";

// Vercel builds and serves this site (git integration on main). Pages are still prerendered at
// build time; the only server code is /api/revalidate, which Growth Studio calls to start a rebuild.
const nextConfig: NextConfig = {
  images: { unoptimized: true },
  // /book/<tier>/form talks to the booking Worker (leads, Razorpay, admin, Meta CAPI) same-origin.
  // ponytail: workers.dev host until the Worker moves to the elevatebox.in Cloudflare account.
  async rewrites() {
    return [{ source: "/api/consult/:path*", destination: "https://elevatebox-consult.lsaicharan01.workers.dev/api/:path*" }];
  },
};

export default nextConfig;

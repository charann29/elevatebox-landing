import type { NextConfig } from "next";

// Vercel builds and serves this site (git integration on main). Pages are still prerendered at
// build time; the only server code is /api/revalidate, which Growth Studio calls to start a rebuild.
const nextConfig: NextConfig = {
  images: { unoptimized: true },
};

export default nextConfig;

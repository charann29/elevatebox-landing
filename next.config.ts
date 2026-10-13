import type { NextConfig } from "next";

// Every page is static, so the site exports to plain files in out/ and a
// Cloudflare Worker serves them (wrangler.jsonc).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;

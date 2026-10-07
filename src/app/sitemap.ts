import type { MetadataRoute } from "next";
import { COMPANY } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/privacy-policy", "/terms-and-conditions", "/cancellation-and-refund"].map((p) => ({
    url: `${COMPANY.site}${p || "/"}`,
    priority: p ? 0.3 : 1,
  }));
}

import type { Metadata } from "next";
import { OG_IMG } from "@/lib/content";
import { hydPage } from "@/lib/hyderabad";
import { HyderabadLanding } from "@/components/hyderabad-landing";

const page = hydPage("/web-development-company-hyderabad");

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: page.path },
  openGraph: { images: [OG_IMG], title: `${page.title} | ElevateBox`, description: page.description, url: page.path, type: "website" },
};

export default function Page() {
  return <HyderabadLanding page={page} />;
}

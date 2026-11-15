import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OG_IMG } from "@/lib/content";
import { GLOBAL_PAGES, globalPage } from "@/lib/global";
import { HyderabadLanding } from "@/components/hyderabad-landing";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return GLOBAL_PAGES.map((p) => ({ slug: p.path.split("/").pop()! }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = globalPage((await params).slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: { images: [OG_IMG], title: `${page.title} | ElevateBox`, description: page.description, url: page.path, type: "website" },
  };
}

export default async function Page({ params }: Props) {
  const page = globalPage((await params).slug);
  if (!page) notFound();
  return <HyderabadLanding page={page} />;
}

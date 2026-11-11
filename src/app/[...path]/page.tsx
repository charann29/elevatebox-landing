// Growth Studio pages at any address (connect guide section 10): hubs and pages outside /blogs.
// Our own routes always win; Studio refuses to publish where a page already answers.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStudioPage, getStudioPaths } from "@/lib/cms";
import { StudioArticle, studioMetadata } from "@/components/studio-article";

export const dynamicParams = false;

type Props = { params: Promise<{ path: string[] }> };

export async function generateStaticParams() {
  return (await getStudioPaths()).map((e) => ({ path: e.path.slice(1).split("/") }));
}

const load = async (segments: string[]) => {
  const path = `/${segments.join("/")}`;
  return { path, page: await getStudioPage(path) };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { path, page } = await load((await params).path);
  return page ? studioMetadata(page, path) : {};
}

export default async function StudioPage({ params }: Props) {
  const { path, page } = await load((await params).path);
  if (!page) notFound();
  const crumbs = [...page.breadcrumbs.map((b) => ({ name: b.label, path: b.path })), { name: page.breadcrumbLabel ?? page.title, path }];
  return <StudioArticle p={page} path={path} crumbs={crumbs} />;
}

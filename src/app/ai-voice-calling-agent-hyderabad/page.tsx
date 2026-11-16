import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { hydPage } from "@/lib/hyderabad";
import { HyderabadLanding } from "@/components/hyderabad-landing";

const page = hydPage("/ai-voice-calling-agent-hyderabad");

export const metadata: Metadata = pageMeta(`${page.title} | ElevateBox`, page.description, page.path);

export default function Page() {
  return <HyderabadLanding page={page} />;
}

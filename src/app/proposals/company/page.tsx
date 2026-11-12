import type { Metadata } from "next";
import { Suspense } from "react";
import { OldLink } from "./old-link";

export const metadata: Metadata = { title: "Growth plan", robots: { index: false, follow: true } };

// Old /proposals/company?c=<slug> links: send them to /proposals/company/<slug>.
export default function OldCompanyLink() {
  return (
    <Suspense>
      <OldLink />
    </Suspense>
  );
}

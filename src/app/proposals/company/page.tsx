import type { Metadata } from "next";
import { Suspense } from "react";
import { COMPANY } from "@/lib/content";
import { CompanyPlan } from "@/components/company-plan";
import { Header, Footer } from "@/components/site";
import { CtaBand } from "@/components/blocks";

export const metadata: Metadata = {
  title: "Growth Plan for a New Telangana Business",
  description: "A 12-month growth plan for a newly registered Telangana business: tech, automation, strategy and Meta ads, with Month 6 and Month 12 numbers.",
  robots: { index: false, follow: true },
};

export default function CompanyPlanPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Suspense>
          <CompanyPlan email={COMPANY.email} />
        </Suspense>
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}

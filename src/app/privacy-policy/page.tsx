import type { Metadata } from "next";
import { COMPANY } from "@/lib/content";
import { LegalPage } from "@/components/legal";

export const metadata: Metadata = {
  title: `Privacy Policy | ${COMPANY.name}`,
  description: "How we collect, use, store, and delete personal information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function Page() {
  return (
    <LegalPage
      title="Privacy Policy"
      crumb="Privacy Policy"
      updated="2 August 2026"
      intro={`This policy explains what personal information ${COMPANY.legal} collects through this website and our client engagements, why we collect it, how long we keep it, and the choices you have.`}
      sections={[
        {
          h: "Information we collect",
          p: [
            "When you submit an enquiry form, we collect the name, email address, phone number, and project details you provide. We use this solely to respond to your enquiry and, if we work together, to deliver the engagement.",
            "When you visit the site, our hosting provider records standard server logs including IP address, browser type, and pages requested. These are used for security and diagnostics.",
            "If analytics are enabled, we record aggregate usage data. We do not sell personal information or share it with advertising networks.",
          ],
        },
        {
          h: "Why we process it",
          p: [
            "We process enquiry information on the basis of taking steps at your request before entering a contract, and to perform a contract once one exists.",
            "We process server logs on the basis of our legitimate interest in keeping the site secure and available.",
          ],
        },
        {
          h: "How long we keep it",
          p: [
            "Enquiries that do not become engagements are deleted within twenty-four months. Engagement records are retained for the period required by applicable tax and contractual obligations, then deleted.",
            "Server logs are retained for a short operational window and then rotated out.",
          ],
        },
        {
          h: "Client data during an engagement",
          p: [
            "Where we process personal data on behalf of a client, we act as a processor under that client's instructions and under the terms of the relevant agreement. We do not use client data for any purpose other than delivering the engagement.",
            "Access is limited to team members assigned to the project, revoked when they roll off, and reviewed periodically.",
          ],
        },
        {
          h: "Sharing and sub-processors",
          p: [
            "We use third-party providers for hosting, email, and project management. Each is bound by contractual confidentiality terms. A current list of sub-processors is available on request.",
            "We disclose information to authorities only where legally required, and where permitted we will tell you first.",
          ],
        },
        {
          h: "Your rights",
          p: [
            "You may request access to the personal information we hold about you, ask for it to be corrected or deleted, object to certain processing, or ask for a copy in a portable format.",
            "To exercise any of these, contact us using the details below. We respond within thirty days.",
          ],
        },
        {
          h: "Security",
          p: [
            "We use encryption in transit, access controls with multi-factor authentication, and least-privilege permissions across our systems. Backups are encrypted and restore procedures are tested.",
            "No system is perfectly secure. If a breach affects your information, we will notify you and the relevant authority as required by law.",
          ],
        },
        {
          h: "Cookies",
          p: [
            "This site uses only the cookies strictly necessary for it to function. If we add analytics or marketing cookies, we will request consent first and update this policy.",
          ],
        },
        {
          h: "Changes to this policy",
          p: [
            "We update this policy when our practices change. The date at the top reflects the most recent revision. Material changes affecting existing clients will be communicated directly.",
          ],
        },
      ]}
    />
  );
}

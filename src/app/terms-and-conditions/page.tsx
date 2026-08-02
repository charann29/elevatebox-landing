import type { Metadata } from "next";
import { COMPANY } from "@/lib/content";
import { LegalPage } from "@/components/legal";

export const metadata: Metadata = {
  title: `Terms & Conditions | ${COMPANY.name}`,
  description: "The terms governing use of this website and our services.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function Page() {
  return (
    <LegalPage
      title="Terms & Conditions"
      crumb="Terms & Conditions"
      updated="2 August 2026"
      intro={`These terms govern your use of this website and, where no separate signed agreement exists, our provision of services. Where a signed master services agreement or statement of work exists, that document takes precedence over these terms.`}
      sections={[
        {
          h: "Use of this website",
          p: [
            "You may browse this site and use the enquiry forms for legitimate business purposes. You may not attempt to gain unauthorised access, scrape at a rate that degrades service, or use the site to distribute unlawful material.",
            "Content on this site is provided for information only and does not constitute a binding offer or professional advice.",
          ],
        },
        {
          h: "Engagements and scope",
          p: [
            "Work is performed under a statement of work that defines scope, deliverables, timeline, and commercial terms. Anything not listed as in scope is out of scope.",
            "Changes to an agreed scope are handled through a written change request, with the impact on timeline and cost stated before the change is accepted.",
            "Estimates provided before a statement of work is signed are indicative and are not commitments.",
          ],
        },
        {
          h: "Client responsibilities",
          p: [
            "Timely access to systems, stakeholders, and decisions is required for delivery to proceed as planned. Delays in these areas may affect timelines and cost, and we will flag the impact in writing when it occurs.",
            "You are responsible for the accuracy and lawfulness of content and data you supply to us.",
          ],
        },
        {
          h: "Intellectual property",
          p: [
            "On full payment, ownership of deliverables created specifically for you under a statement of work transfers to you.",
            "We retain ownership of pre-existing tools, libraries, and general know-how used in delivery, and grant you a perpetual licence to use them as embedded in the deliverables.",
            "Third-party components remain subject to their own licences, which we disclose in the deliverable documentation.",
          ],
        },
        {
          h: "Payment terms",
          p: [
            "Invoices are payable within the period stated on the invoice. Late payment may result in work being paused, with notice given before any pause takes effect.",
            "Fees are exclusive of applicable taxes, which are added where required by law.",
          ],
        },
        {
          h: "Confidentiality",
          p: [
            "Each party will keep the other's confidential information confidential and use it only for the purposes of the engagement. This obligation survives the end of the engagement.",
            "Neither party will name the other publicly as a client or supplier without written consent.",
          ],
        },
        {
          h: "Warranties and liability",
          p: [
            "We warrant that services will be performed with reasonable skill and care by suitably qualified personnel.",
            "Except for liability that cannot be limited by law, our aggregate liability under an engagement is limited to the fees paid under the relevant statement of work. Neither party is liable for indirect or consequential loss.",
          ],
        },
        {
          h: "Termination",
          p: [
            "Either party may terminate an engagement with the notice period stated in the statement of work. Work completed up to the termination date is payable.",
            "On termination we will hand over deliverables, documentation, and access in a usable state.",
          ],
        },
        {
          h: "Governing law",
          p: [
            `These terms are governed by the laws of India, and the courts at ${COMPANY.address.split(",")[0]} have exclusive jurisdiction, unless a signed agreement specifies otherwise.`,
          ],
        },
      ]}
    />
  );
}

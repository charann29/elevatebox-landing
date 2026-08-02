import type { Metadata } from "next";
import { COMPANY } from "@/lib/content";
import { LegalPage } from "@/components/legal";

export const metadata: Metadata = {
  title: `Cancellation & Refund Policy | ${COMPANY.name}`,
  description: "How cancellations, refunds, and paused engagements are handled.",
  alternates: { canonical: "/cancellation-and-refund" },
};

export default function Page() {
  return (
    <LegalPage
      title="Cancellation & Refund Policy"
      crumb="Cancellation & Refund"
      updated="2 August 2026"
      intro="This policy explains how cancellations, pauses, and refunds are handled across our engagement types. Where a signed statement of work specifies different terms, that document takes precedence."
      sections={[
        {
          h: "Discovery engagements",
          p: [
            "Fixed-price discovery engagements may be cancelled in writing before the kickoff session for a full refund of any advance paid.",
            "Once the kickoff has taken place, fees are payable in proportion to the work completed, and any remaining balance is refunded within fifteen working days.",
          ],
        },
        {
          h: "Fixed-price delivery",
          p: [
            "Fixed-price projects are billed against agreed milestones. Cancellation before a milestone begins incurs no charge for that milestone.",
            "Cancellation part-way through a milestone is charged in proportion to the work completed, assessed against the deliverables defined for that milestone. Completed deliverables are handed over.",
          ],
        },
        {
          h: "Time-and-materials and retainers",
          p: [
            "Time-and-materials engagements can be ended with the notice period stated in the statement of work, typically thirty days. Time worked up to the end of the notice period is payable.",
            "Retainers are billed monthly in advance. Cancellation takes effect at the end of the current billed month; the current month is not pro-rated.",
          ],
        },
        {
          h: "Pausing an engagement",
          p: [
            "Engagements can be paused by written agreement. We will confirm in writing how long the team can be held and what happens to the allocation after that point.",
            "Pauses beyond the agreed window may require re-staffing when work resumes, which can affect timeline and cost.",
          ],
        },
        {
          h: "Refunds",
          p: [
            "Approved refunds are processed within fifteen working days to the original payment method, unless another method is agreed in writing.",
            "Bank charges, gateway fees, and non-recoverable taxes on the original transaction are deducted where applicable.",
          ],
        },
        {
          h: "Third-party costs",
          p: [
            "Amounts already committed to third parties on your behalf — licences, subscriptions, hosting, hardware, or paid media — are non-refundable once committed. We list any such commitments before incurring them.",
          ],
        },
        {
          h: "Work quality concerns",
          p: [
            "If a deliverable does not meet the agreed acceptance criteria, tell us in writing and we will correct it at no additional cost within the timeframe stated in the statement of work.",
            "We would rather fix the work than issue a refund, and we would rather hear the concern early than at the end.",
          ],
        },
        {
          h: "How to request a cancellation or refund",
          p: [
            `Send the request in writing to ${COMPANY.email} with the engagement name and reason. We acknowledge within two working days and confirm the outcome within ten.`,
          ],
        },
      ]}
    />
  );
}

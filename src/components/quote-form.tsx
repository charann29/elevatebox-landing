"use client";

import { useState } from "react";
import { COMPANY } from "@/lib/content";

// ponytail: no backend on this static site, so an enquiry goes to the team's WhatsApp,
// with a correctly encoded email as the fallback. Point it at a lead API when one exists.
const BUDGETS = ["Under ₹5 lakh", "₹5–15 lakh", "₹15–50 lakh", "Over ₹50 lakh", "Not sure yet"];

export function QuoteForm({ dark }: { dark?: boolean }) {
  const [sent, setSent] = useState<{ wa: string; mail: string } | null>(null);
  const field =
    "w-full rounded-xl border border-line bg-canvas px-4 py-2.5 text-sm text-ink outline-none focus:border-ink focus:bg-white";

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    const text = [
      `New enquiry from elevatebox.in`,
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      get("phone") ? `Phone: ${get("phone")}` : null,
      get("budget") ? `Budget: ${get("budget")}` : null,
      ``,
      get("message"),
    ]
      .filter((l) => l !== null)
      .join("\n");
    const wa = `https://wa.me/${COMPANY.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
    const mail = `mailto:${COMPANY.email}?subject=${encodeURIComponent(`Enquiry from ${get("name")}`)}&body=${encodeURIComponent(text)}`;
    setSent({ wa, mail });
    window.open(wa, "_blank", "noopener");
  }

  if (sent) {
    return (
      <div role="status" className={`grid gap-4 rounded-3xl bg-white p-7 text-left ${dark ? "" : "ring-1 ring-black/5"}`}>
        <p className="font-display text-xl font-bold text-ink">Your enquiry is ready on WhatsApp</p>
        <p className="text-sm leading-relaxed text-ink-3">
          Press send in WhatsApp and it reaches the team directly. We reply within one working day.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={sent.wa} target="_blank" rel="noopener" className="rounded-full bg-[#22c55e] px-6 py-3 text-center text-sm font-bold text-night">
            Open WhatsApp again
          </a>
          <a href={sent.mail} className="rounded-full border border-line px-6 py-3 text-center text-sm font-semibold text-ink">
            Send by email instead
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={`grid gap-5 rounded-3xl bg-white p-7 text-left ${dark ? "" : "ring-1 ring-black/5"}`}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <label htmlFor="qf-name" className="text-sm font-medium text-ink">
            Name
          </label>
          <input id="qf-name" name="name" required autoComplete="name" className={field} />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="qf-email" className="text-sm font-medium text-ink">
            Email
          </label>
          <input id="qf-email" name="email" type="email" required autoComplete="email" className={field} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <label htmlFor="qf-phone" className="text-sm font-medium text-ink">
            Phone
          </label>
          <input id="qf-phone" name="phone" type="tel" autoComplete="tel" className={field} />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="qf-budget" className="text-sm font-medium text-ink">
            Budget range
          </label>
          <select id="qf-budget" name="budget" className={field} defaultValue="">
            <option value="" disabled>
              Select a range
            </option>
            {BUDGETS.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="qf-message" className="text-sm font-medium text-ink">
          What are you building?
        </label>
        <textarea id="qf-message" name="message" rows={4} required className={field} />
      </div>
      <button
        type="submit"
        className="rounded-full bg-electric px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#2f5cf0]"
      >
        Send on WhatsApp
      </button>
      <p className="text-xs text-ink-3">
        {`Opens WhatsApp with your enquiry ready to send. We reply within one working day. Prefer email? ${COMPANY.email}`}
      </p>
    </form>
  );
}

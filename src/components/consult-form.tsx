"use client";

import { useState } from "react";
import { COMPANY } from "@/lib/company";

/* The 7 qualification questions (owner brief), all on one page with native dropdowns
   (owner: form on its own page, simple). Answers are kept in sessionStorage under "eb-consult" for the post-payment
   page to hand to the calendar. ponytail: no backend; the answers reach us via WhatsApp until
   the paid → calendar handoff page exists. */
const Q: { k: string; q: string; opts?: string[]; note?: string; type?: string }[] = [
  { k: "build", q: "What are you looking to build?", opts: ["AI automation for my business", "Mobile app", "Website", "SaaS / startup MVP", "Enterprise software", "Improve an existing product"] },
  { k: "name", q: "What's your name?", type: "text" },
  { k: "phone", q: "What is your WhatsApp number?", type: "tel" },
  { k: "business", q: "Which best describes your business?", opts: ["I have an existing business", "I am building a startup", "I represent a company / enterprise", "I am launching a new venture"] },
  { k: "revenue", q: "What is your current annual business revenue?", opts: ["Pre-revenue (startup)", "Under ₹50 lakh", "₹50 lakh – ₹2 crore", "₹2 crore – ₹10 crore", "₹10 crore+"] },
  { k: "budget", q: "What is your planned investment for this project?", note: "We take on projects starting from ₹3 lakh.", opts: ["₹3–5 lakh", "₹5–10 lakh", "₹10–25 lakh", "₹25 lakh+"] },
  { k: "stage", q: "Which statement best describes you?", opts: ["I'm ready to start immediately", "I have a clear requirement and I'm comparing partners", "I have a tech team and need expert execution", "I'm looking for a long-term technology partner"] },
];

export function ConsultForm({ offer }: { offer: { title: string; price: string; pay: string } }) {
  const [a, setA] = useState<Record<string, string> | null>(null);

  if (a) {
    const summary = Q.map((x) => `${x.q} ${a[x.k]}`).join("\n");
    const wa = `https://wa.me/${COMPANY.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi, I'd like the ${offer.title} (${offer.price}).\n\n${summary}`)}`;
    return (
      <div className="rounded-[2rem] bg-white p-8 shadow-xl shadow-black/5 ring-1 ring-black/[0.07]">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#ff7701]">{"You're a fit"}</p>
        <h2 className="mt-2 text-2xl font-bold">{`Thanks, ${a.name}. One step left.`}</h2>
        <p className="mt-2 text-sm text-ink-3">{offer.pay ? "Pay to open the calendar and pick your time." : "Send your answers on WhatsApp and we'll share your slot and payment link."}</p>
        <div className="mt-6 flex flex-col gap-3">
          {offer.pay && (
            <a href={offer.pay} className="rounded-md bg-[#ff7701] px-6 py-3.5 text-center text-sm font-bold uppercase tracking-wide text-white hover:bg-[#f57100]">
              {`Pay ${offer.price} and pick a time`}
            </a>
          )}
          <a href={wa} className="rounded-full border border-black/10 px-6 py-3.5 text-center text-sm font-semibold text-ink">
            Send my answers on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  const field = "mt-1.5 block w-full rounded-xl border border-black/15 bg-white px-3.5 py-3 text-base text-ink outline-none focus:border-[#ff7701] focus:ring-2 focus:ring-[#ff7701]/20";
  return (
    <form
      className="grid gap-5 rounded-[2rem] bg-white p-6 shadow-xl shadow-black/5 ring-1 ring-black/[0.07] sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        const next = Object.fromEntries(Q.map((x) => [x.k, String(new FormData(e.currentTarget).get(x.k) ?? "").trim()]));
        try { sessionStorage.setItem("eb-consult", JSON.stringify({ ...next, offer: offer.title })); } catch {}
        setA(next);
      }}
    >
      {Q.map((x) => (
        <label key={x.k} className="block text-sm font-semibold text-ink">
          {x.q}
          {x.note && <span className="mt-0.5 block text-xs font-normal text-ink-3">{x.note}</span>}
          {x.opts ? (
            <select name={x.k} required defaultValue="" className={field}>
              <option value="" disabled>Select</option>
              {x.opts.map((o) => <option key={o}>{o}</option>)}
            </select>
          ) : (
            <input
              name={x.k}
              required
              type={x.type}
              autoComplete={x.type === "tel" ? "tel" : "name"}
              inputMode={x.type === "tel" ? "tel" : undefined}
              pattern={x.type === "tel" ? "[+0-9 ]{10,15}" : undefined}
              placeholder={x.type === "tel" ? "+91 98765 43210" : "Your name"}
              className={field}
            />
          )}
        </label>
      ))}
      <button type="submit" className="rounded-md bg-[#ff7701] px-6 py-4 text-base font-bold uppercase tracking-wide text-white shadow-sm hover:bg-[#f57100]">
        Continue ›
      </button>
    </form>
  );
}

"use client";

import { useState } from "react";
import { COMPANY } from "@/lib/company";

/* The 7 qualification questions (owner brief), one per step so drop-off per question can be
   measured later. Answers are kept in sessionStorage under "eb-consult" for the post-payment
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
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Record<string, string>>({});
  const [text, setText] = useState("");
  const cur = Q[step];

  const answer = (v: string) => {
    const next = { ...a, [cur.k]: v.trim() };
    setA(next);
    setText("");
    if (step === Q.length - 1) {
      try { sessionStorage.setItem("eb-consult", JSON.stringify({ ...next, offer: offer.title })); } catch {}
    }
    setStep(step + 1);
  };

  if (step >= Q.length) {
    const summary = Q.map((x) => `${x.q} ${a[x.k]}`).join("\n");
    const wa = `https://wa.me/${COMPANY.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi, I'd like the ${offer.title} (${offer.price}).\n\n${summary}`)}`;
    return (
      <div className="rounded-[2rem] bg-white p-8 shadow-xl shadow-black/5 ring-1 ring-black/[0.07]">
        <p className="text-xs font-semibold uppercase tracking-wider text-electric">{"You're a fit"}</p>
        <h3 className="mt-2 text-2xl font-bold">{`Thanks, ${a.name}. One step left.`}</h3>
        <p className="mt-2 text-sm text-ink-3">{offer.pay ? "Pay to open the calendar and pick your time." : "Send your answers on WhatsApp and we'll share your slot and payment link."}</p>
        <div className="mt-6 flex flex-col gap-3">
          {offer.pay && (
            <a href={offer.pay} className="rounded-full bg-electric px-6 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-electric/30 hover:bg-[#2f5cf0]">
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

  return (
    <div className="rounded-[2rem] bg-white p-8 shadow-xl shadow-black/5 ring-1 ring-black/[0.07]">
      <div className="flex items-center justify-between text-xs font-semibold text-ink-4">
        <span>{`Question ${step + 1} of ${Q.length}`}</span>
        {step > 0 && <button type="button" onClick={() => { setText(a[Q[step - 1].k] ?? ""); setStep(step - 1); }} className="underline">Back</button>}
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/5">
        <div className="h-full bg-electric transition-all" style={{ width: `${(step / Q.length) * 100}%` }} />
      </div>
      <h3 className="mt-5 text-xl font-bold">{cur.q}</h3>
      {cur.note && <p className="mt-1 text-sm text-ink-3">{cur.note}</p>}
      {cur.opts ? (
        <div className="mt-5 grid gap-2">
          {cur.opts.map((o) => (
            <button key={o} type="button" onClick={() => answer(o)}
              className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-colors hover:border-electric ${a[cur.k] === o ? "border-electric bg-electric/5" : "border-black/10"}`}>
              {o}
            </button>
          ))}
        </div>
      ) : (
        <form className="mt-5 flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); if (text.trim()) answer(text); }}>
          <input
            key={cur.k}
            autoFocus
            required
            type={cur.type}
            inputMode={cur.type === "tel" ? "tel" : undefined}
            pattern={cur.type === "tel" ? "[+0-9 ]{10,15}" : undefined}
            value={text}
            onChange={(e) => setText(e.target.value)}
            aria-label={cur.q}
            className="rounded-2xl border border-black/10 px-4 py-3 text-base outline-none focus:border-electric"
          />
          <button type="submit" className="rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white">Next</button>
        </form>
      )}
    </div>
  );
}

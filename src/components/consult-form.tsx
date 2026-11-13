"use client";

import { useState } from "react";
import { cleanPhone, slotDays } from "@/lib/booking.mjs";
import type { Question } from "@/lib/content";

/* Ad booking flow: 7 questions -> pick a time -> Razorpay -> booked.
   Backend is the ElevateBox booking Worker (elevatebox-consult), proxied same-origin at /api/consult/* (vercel.json).
   It saves every lead + booking to D1 (its /admin page), creates the Razorpay order (price from the tier only),
   verifies payment and sends the server-side Purchase to Meta. Pixel events here reuse the Worker's event ids
   (lead_<id>, purchase_<booking>) so Meta dedupes browser + server. */
const API = "/api/consult";

// Keys match the Worker's leads table (investment, stance).
const Q: Question[] = [
  { k: "build", q: "What are you looking to build?", opts: ["AI automation for my business", "Mobile app", "Website", "SaaS / startup MVP", "Enterprise software", "Improve an existing product"] },
  { k: "name", q: "What's your name?", type: "text" },
  { k: "phone", q: "What is your WhatsApp number?", type: "tel" },
  { k: "business", q: "Which best describes your business?", opts: ["I have an existing business", "I am building a startup", "I represent a company / enterprise", "I am launching a new venture"] },
  { k: "revenue", q: "What is your current annual business revenue?", opts: ["Pre-revenue (startup)", "Under ₹50 lakh", "₹50 lakh – ₹2 crore", "₹2 crore – ₹10 crore", "₹10 crore+"] },
  { k: "investment", q: "What is your planned investment for this project?", note: "We take on projects starting from ₹3 lakh.", opts: ["₹3–5 lakh", "₹5–10 lakh", "₹10–25 lakh", "₹25 lakh+"] },
  { k: "stance", q: "Which statement best describes you?", opts: ["I'm ready to start immediately", "I have a clear requirement and I'm comparing partners", "I have a tech team and need expert execution", "I'm looking for a long-term technology partner"] },
];

type Offer = { slug: string; title: string; price: string; questions?: Question[] };
type Rzp = new (o: object) => { open: () => void };
declare global {
  interface Window { fbq?: (...a: unknown[]) => void; Razorpay?: Rzp }
}

const cookie = (n: string) => document.cookie.match(new RegExp(`(?:^|; )${n}=([^;]*)`))?.[1] || "";
function tracking() {
  // Ad params arrive on /book/<tier>?..., and the link to /form drops them; the same-origin referrer still has them.
  let ref = new URLSearchParams();
  try { const r = new URL(document.referrer); if (r.origin === location.origin) ref = r.searchParams; } catch {}
  const get = (k: string) => new URLSearchParams(location.search).get(k) || ref.get(k) || "";
  const fbclid = get("fbclid");
  const attribution: Record<string, string> = { landing_url: location.href, referrer: document.referrer };
  // campaign_id/adset_id/ad_id come from the ads' URL parameters ({{campaign.id}} etc.) so each sale maps to one ad
  for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "campaign_id", "adset_id", "ad_id", "placement", "site_source_name"]) if (get(k)) attribution[k] = get(k);
  try { const ab = localStorage.getItem("eb_ab"); if (ab === "a" || ab === "b") attribution.ab = ab; } catch {}
  const fbc = cookie("_fbc") || (fbclid ? `fb.1.${Date.now()}.${fbclid}` : "");
  return { meta: { fbp: cookie("_fbp"), fbc, sourceUrl: location.href }, attribution, consent: true };
}
// Browser pixel + server mirror (Worker /api/track -> Conversions API), same event id so Meta counts it once.
function track(name: string, id: string, custom: object = {}) {
  window.fbq?.("track", name, custom, { eventID: id });
  const t = tracking().meta;
  fetch(`${API}/track`, { method: "POST", headers: { "content-type": "application/json" }, keepalive: true,
    body: JSON.stringify({ eventName: name, eventId: id, sourceUrl: t.sourceUrl, fbp: t.fbp, fbc: t.fbc }) }).catch(() => {});
}
const post = (path: string, body: object) =>
  fetch(`${API}/${path}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });

function loadCheckout() {
  if (window.Razorpay) return Promise.resolve();
  return new Promise<void>((ok, no) => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => ok();
    s.onerror = () => no(new Error("checkout.js"));
    document.body.appendChild(s);
  });
}

const dayLabel = (d: string) => new Date(`${d}T00:00:00Z`).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });
const timeLabel = (t: string) => { const [h, m] = t.split(":").map(Number); return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${h < 12 ? "am" : "pm"}`; };

const card = "rounded-[2rem] bg-white p-6 shadow-xl shadow-black/5 ring-1 ring-black/[0.07] sm:p-8";
const primary = "rounded-full bg-[#ff7701] px-6 py-4 text-base font-semibold text-white shadow-lg shadow-[#ff7701]/30 hover:bg-[#f57100] disabled:opacity-50";

export function ConsultForm({ offer }: { offer: Offer }) {
  const qs = offer.questions ?? Q;
  const [a, setA] = useState<Record<string, string> | null>(null);
  const [leadId, setLeadId] = useState("");
  const [slots, setSlots] = useState<{ taken: Record<string, string[]>; now: number } | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);

  const loadSlots = () => {
    setSlots(null);
    // Worker clock, so the page never needs Date.now() during render
    fetch(`${API}/slots`).then((r) => (r.ok ? r.json() : null)).then((d) => setSlots({ taken: d?.taken || {}, now: d?.now || 0 }))
      .catch(() => setSlots({ taken: {}, now: 0 }));
  };

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const next = Object.fromEntries(qs.map((x) => [x.k, String(fd.get(x.k) ?? "").trim()]));
    next.phone = cleanPhone(next.phone);
    if (!next.phone) return setMsg("Please enter a 10-digit Indian mobile number.");
    setBusy(true);
    setMsg("");
    const r = await post("lead", { tier: offer.slug, answers: next, tracking: tracking() }).catch(() => null);
    const d = r?.ok ? await r.json() : null;
    setBusy(false);
    if (!d?.lead_id) return setMsg("Could not save your answers. Please check your connection and try again.");
    setLeadId(d.lead_id);
    track("Lead", `lead_${d.lead_id}`, { content_name: offer.title });
    setA(next);
    loadSlots();
    // the form is long; bring the time picker into view instead of leaving the user at the footer
    requestAnimationFrame(() => document.getElementById("eb-book")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  async function pay() {
    setBusy(true);
    setMsg("");
    try {
      const r = await post("order", { tier: offer.slug, date, time, lead_id: leadId, tracking: tracking() });
      const d = await r.json().catch(() => ({}));
      if (r.status === 409) { setBusy(false); setTime(""); loadSlots(); return setMsg("Sorry, that time was just taken. Please pick another."); }
      if (!r.ok) { setBusy(false); return setMsg("Payment could not start. Your answers are saved; please try again in a minute."); }
      track("InitiateCheckout", `checkout_${d.booking_id}`, { value: d.amount / 100, currency: "INR" });
      await loadCheckout();
      new window.Razorpay!({
        key: d.key_id, amount: d.amount, currency: d.currency, order_id: d.order_id,
        name: "ElevateBox", description: `${offer.title}, ${dayLabel(date)} ${timeLabel(time)} IST`,
        prefill: d.prefill, theme: { color: "#3462f2" },
        modal: { ondismiss: () => setBusy(false) },
        handler: async (resp: object) => {
          const v = await post("verify", resp).then((x) => x.json()).catch(() => ({}));
          setBusy(false);
          // Server sends the same Purchase (event id purchase_<booking>) to CAPI when payment is captured.
          if (v.status === "paid") window.fbq?.("track", "Purchase", { value: v.value, currency: "INR" }, { eventID: v.event_id });
          if (v.status === "paid" || v.status === "pending") setDone(true);
          else if (v.status === "conflict") setMsg("Your payment went through, but that time was taken a moment earlier. We will call you to pick a new time or refund you in full.");
          else setMsg("We could not confirm the payment here. If money left your account it is safe; we will call you to confirm.");
        },
      }).open();
    } catch {
      setBusy(false);
      setMsg("Payment could not start. Please try again in a minute.");
    }
  }

  if (done) {
    return (
      <div className={`${card} text-center`}>
        <p className="text-xs font-semibold uppercase tracking-wider text-[#ff7701]">Payment received</p>
        <h2 className="mt-2 text-2xl font-bold">{`You're booked, ${a?.name}.`}</h2>
        <p className="mt-2 text-sm text-ink-3">{`${offer.title} on ${dayLabel(date)} at ${timeLabel(time)} IST. We'll send the Google Meet link to your WhatsApp before the call.`}</p>
      </div>
    );
  }

  if (a) {
    const days = slots?.now ? slotDays(slots.now, slots.taken) : [];
    const day = days.find((x) => x.date === date) || days[0];
    return (
      <div id="eb-book" className={`${card} scroll-mt-24`}>
        <p className="text-xs font-semibold uppercase tracking-wider text-[#ff7701]">{"You're a fit"}</p>
        <h2 className="mt-2 text-2xl font-bold">{`Thanks, ${a.name}. Pick your time.`}</h2>
        {!slots ? <p className="mt-4 text-sm text-ink-3">Loading times…</p> : !day ? (
          <p className="mt-4 text-sm text-ink-3">No times open this week. Your answers are saved; we will call you to fix a time.</p>
        ) : (
          <>
            <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
              {days.map((x) => (
                <button key={x.date} type="button" disabled={!x.left} onClick={() => { setDate(x.date); setTime(""); }}
                  className={`shrink-0 rounded-xl border px-3.5 py-2.5 text-sm font-semibold disabled:opacity-40 ${x.date === day.date ? "border-[#ff7701] bg-[#ff7701]/10 text-[#ff7701]" : "border-black/15 text-ink"}`}>
                  {x.today ? "Today" : dayLabel(x.date)}
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm font-semibold text-[#d32f2f]">{`Only ${day.left} ${day.left === 1 ? "time" : "times"} open ${day.today ? "today" : `on ${dayLabel(day.date)}`}. Calls fill up fast.`}</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {day.times.map((t) => (
                <button key={t.time} type="button" disabled={t.booked} onClick={() => { setDate(day.date); setTime(t.time); }}
                  className={`rounded-xl border px-3.5 py-3 text-sm font-semibold disabled:line-through disabled:opacity-40 ${date === day.date && time === t.time ? "border-[#ff7701] bg-[#ff7701] text-white" : "border-black/15 text-ink"}`}>
                  {timeLabel(t.time)}
                </button>
              ))}
            </div>
            <button type="button" disabled={!time || busy} onClick={pay} className={`mt-6 w-full ${primary}`}>
              {busy ? "Opening payment…" : `Pay ${offer.price} and confirm`}
            </button>
            <p className="mt-3 text-center text-xs text-ink-3">Secure payment by Razorpay. UPI, cards and netbanking.</p>
          </>
        )}
        {msg && <p role="alert" className="mt-4 text-sm font-semibold text-red-700">{msg}</p>}
      </div>
    );
  }

  const field = "mt-1.5 block w-full rounded-xl border border-black/15 bg-white px-3.5 py-3 text-base text-ink outline-none focus:border-[#ff7701] focus:ring-2 focus:ring-[#ff7701]/20";
  return (
    <form className={`grid gap-5 ${card}`} onSubmit={submit}>
      {qs.map((x) => (
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
      {msg && <p role="alert" className="text-sm font-semibold text-red-700">{msg}</p>}
      <button type="submit" disabled={busy} className={primary}>
        {busy ? "Saving…" : "Continue ›"}
      </button>
      {/* Consent for the abandoned-checkout call (Roopa lead source states this): keep the wording. */}
      <p className="text-center text-xs text-ink-3">By continuing, you agree that we may call or WhatsApp you about this booking.</p>
    </form>
  );
}

/**
 * COPY of ~/work/elevatebox-consult/src/lib/booking.mjs (the booking Worker). Keep the two in sync:
 * the Worker re-checks every slot and price, so a drift here only shows a wrong slot, never a wrong charge.
 */

// Server price allowlist in paise. The Worker ignores any amount the browser sends.
export const PRICES_PAISE = { 499: 49900, 1499: 149900, 3499: 349900 };

// Real daily slots (IST). The owner picked a fixed daily cap; nothing here is random.
export const SLOT_CONFIG = {
  times: ["11:00", "13:00", "16:00", "18:30"],
  closedWeekdays: [], // 0 = Sunday ... 6 = Saturday
  days: 7,
  holdMinutes: 10, // a pending (unpaid) order holds its slot this long
};

export function priceFor(tier) {
  const k = String(tier);
  return Object.hasOwn(PRICES_PAISE, k) ? PRICES_PAISE[k] : null;
}

/** 10-digit Indian mobile; +91 / 0 prefix allowed. Same rule as Mahasiddhi. "" when invalid. */
export function cleanPhone(raw) {
  let d = String(raw || "").replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  else if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  return /^[6-9]\d{9}$/.test(d) ? d : "";
}

// India has no DST, so a fixed +05:30 offset is exact.
const IST_OFFSET_MS = 330 * 60000;
export const istDate = (ms) => new Date(ms + IST_OFFSET_MS).toISOString().slice(0, 10);
export const slotEpoch = (date, time) => Date.parse(`${date}T${time}:00+05:30`);
const weekday = (date) => new Date(`${date}T00:00:00Z`).getUTCDay();

/** Paid bookings and live (unexpired) pending holds -> { "YYYY-MM-DD": ["11:00", ...] } */
export function takenFrom(rows, nowMs) {
  const out = {};
  for (const r of rows || []) {
    const live = r.status === "paid" || (r.status === "pending" && Date.parse(r.hold_until) > nowMs);
    if (!live) continue;
    out[r.slot_date] ||= [];
    if (!out[r.slot_date].includes(r.slot_time)) out[r.slot_date].push(r.slot_time);
  }
  return out;
}

/** Days shown in the wizard. Past times today are hidden; taken times are "booked". */
export function slotDays(nowMs, taken = {}, cfg = SLOT_CONFIG) {
  const days = [];
  for (let i = 0; i < cfg.days; i++) {
    const date = istDate(nowMs + i * 864e5);
    if (cfg.closedWeekdays.includes(weekday(date))) continue;
    const times = cfg.times
      .filter((t) => slotEpoch(date, t) > nowMs)
      .map((t) => ({ time: t, booked: (taken[date] || []).includes(t) }));
    if (!times.length) continue;
    days.push({ date, today: i === 0, times, left: times.filter((t) => !t.booked).length });
  }
  return days;
}

export function isBookable(date, time, nowMs, taken = {}, cfg = SLOT_CONFIG) {
  const day = slotDays(nowMs, taken, cfg).find((d) => d.date === date);
  const slot = day?.times.find((t) => t.time === time);
  return Boolean(slot && !slot.booked);
}

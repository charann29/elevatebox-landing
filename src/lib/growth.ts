// 12-month growth model for the /proposals growth plans, in the format of our client growth plans
// (SkillMeet, Healing Hastha): free step -> CM1 (first paid step) -> CM2 (main purchase), with a
// bottom line and a top line. These are industry assumptions, not the business's own numbers;
// every page prints them. ponytail: one table per industry, tune here when real client data lands.

export type Line = "bottom" | "top";

type Model = {
  free: string; // what a stranger gets before paying anything
  cm1: { name: string; price: number; what: string }; // price 0 = a free but booked step
  cm2: { name: string; price: number; what: string };
  spend: number; // Meta ad spend a month in Phase 1, paid by the business to Meta
  fee: number; // ElevateBox fee a month, all four services
  margin: number; // gross margin on added revenue, used for break-even
  organic: Record<Line, number>; // CM1 a month from fixes + AI call-backs, full from Month 3
  rate: Record<Line, number>; // CM2 as a share of CM1
  hook: string; // the one-line ad idea
  roas?: Record<Line, [number, number]>; // return on ad spend, Month 1 and from Month 3 (default below)
};

const M: Record<string, Model> = {
  "Hospital & clinic": {
    free: "Free 2-minute symptom check on WhatsApp, or a free camp slot",
    cm1: { name: "First consultation", price: 600, what: "a booked and paid first OPD consultation" },
    cm2: { name: "Treatment or package", price: 15000, what: "a procedure, scan package or treatment plan" },
    spend: 60000, fee: 50000, margin: 0.5,
    organic: { bottom: 20, top: 40 },
    rate: { bottom: 0.1, top: 0.18 },
    hook: "the doctor on camera explaining one problem at a time, in Telugu",
  },
  "Manufacturing & industrial": {
    free: "Free spec sheet, price range and a call-back within 5 minutes",
    cm1: { name: "First order", price: 30000, what: "a paid sample or first trial order from a new buyer" },
    cm2: { name: "Repeat or bulk order", price: 200000, what: "a repeat or bulk order within 90 days" },
    spend: 50000, fee: 60000, margin: 0.25,
    organic: { bottom: 1, top: 2 },
    rate: { bottom: 0.25, top: 0.4 },
    hook: "the product working on a real shop floor, with the spec on screen",
    roas: { bottom: [2, 8], top: [3, 14] },
  },
  "Services & trade": {
    free: "Free quote on WhatsApp within the hour",
    cm1: { name: "First paid job", price: 4000, what: "a first paid visit or job" },
    cm2: { name: "Contract or repeat customer", price: 30000, what: "an annual contract or a customer who comes back" },
    spend: 40000, fee: 40000, margin: 0.4,
    organic: { bottom: 5, top: 10 },
    rate: { bottom: 0.1, top: 0.18 },
    hook: "a before-and-after of one real job, with the price range",
    roas: { bottom: [1.5, 5], top: [2, 9] },
  },
  "Food & hospitality": {
    free: "Free dessert or welcome drink on the first direct order",
    cm1: { name: "First direct order", price: 700, what: "a first order or table booked directly, not through an aggregator" },
    cm2: { name: "Party, catering or banquet", price: 35000, what: "a party, catering or banquet booking" },
    spend: 40000, fee: 35000, margin: 0.35,
    organic: { bottom: 20, top: 40 },
    rate: { bottom: 0.02, top: 0.04 },
    hook: "the signature dish being made, then the full table",
    roas: { bottom: [1.5, 5], top: [2, 9] },
  },
  "Travel & logistics": {
    free: "Free quote in 10 minutes on WhatsApp",
    cm1: { name: "First booking", price: 6000, what: "a first paid trip, move or shipment" },
    cm2: { name: "Repeat or corporate account", price: 60000, what: "a corporate account or repeat customer" },
    spend: 40000, fee: 40000, margin: 0.2,
    organic: { bottom: 3, top: 6 },
    rate: { bottom: 0.06, top: 0.12 },
    hook: "one real trip or move, start to finish, in 30 seconds",
    roas: { bottom: [1.5, 6], top: [2.5, 10] },
  },
  Jewellery: {
    free: "Free design shortlist on WhatsApp and today's gold rate",
    cm1: { name: "First purchase", price: 20000, what: "a first purchase or a savings-scheme sign-up" },
    cm2: { name: "Wedding order", price: 250000, what: "a wedding or custom order" },
    spend: 60000, fee: 50000, margin: 0.12,
    organic: { bottom: 2, top: 4 },
    rate: { bottom: 0.08, top: 0.14 },
    hook: "a bride trying the set in the showroom, with the making charge shown",
    roas: { bottom: [3, 10], top: [5, 18] },
  },
  Education: {
    free: "Free demo class or career guidance call",
    cm1: { name: "Paid workshop", price: 499, what: "a paid 1 to 3 day workshop or demo week" },
    cm2: { name: "Admission", price: 40000, what: "a full course or admission" },
    spend: 50000, fee: 40000, margin: 0.6,
    organic: { bottom: 10, top: 20 },
    rate: { bottom: 0.06, top: 0.12 },
    hook: "a past student's result, then the teacher explaining one topic",
  },
  "Pharma & medical supplies": {
    free: "Free price list and stock check on WhatsApp",
    cm1: { name: "First trial order", price: 15000, what: "a first order from a new chemist, clinic or hospital" },
    cm2: { name: "Regular account", price: 120000, what: "three months of repeat orders from that account" },
    spend: 30000, fee: 40000, margin: 0.15,
    organic: { bottom: 1, top: 2 },
    rate: { bottom: 0.2, top: 0.35 },
    hook: "same-day delivery shown end to end, with the range on screen",
    roas: { bottom: [2, 8], top: [3, 14] },
  },
  "Real estate & construction": {
    free: "Free site visit with pick-up",
    cm1: { name: "Site visit", price: 0, what: "a site visit that actually happens" },
    cm2: { name: "Unit booked", price: 6000000, what: "a unit booked with token" },
    spend: 100000, fee: 60000, margin: 0.2,
    organic: { bottom: 4, top: 8 },
    rate: { bottom: 0.015, top: 0.03 },
    hook: "a walk-through of the ready unit and the view from it",
    roas: { bottom: [5, 20], top: [8, 35] },
  },
};

export const model = (industry: string) => M[industry] ?? M["Services & trade"];

// Return on ad spend we plan to: Month 1 while Meta learns, and from Month 3. Cost per CM1 follows
// from it (value of one CM1 / return). Low-margin, high-ticket trades need and usually get more.
const ROAS: Record<Line, [number, number]> = { bottom: [1.2, 3], top: [2, 6] };
export const roasOf = (industry: string) => model(industry).roas ?? ROAS;
export const cm1Value = (x: Model, line: Line) => x.cm1.price + x.rate[line] * x.cm2.price;
export const cpaOf = (industry: string, line: Line) => {
  const x = model(industry);
  const v = cm1Value(x, line);
  return roasOf(industry)[line].map((r) => Math.round(v / r / 10) * 10) as [number, number];
};

// Phase 1 (M1-3) holds spend; Phase 2 (M4-6) steps it up only while cost per CM1 falls; Phase 3 holds.
const SPEND_X = [1, 1, 1, 1.33, 1.67, 2, 2, 2, 2, 2, 2, 2];

export type Month = { m: number; spend: number; cm1: number; cm2: number; revenue: number; cumGap: number };

export function project(industry: string, line: Line, fee = model(industry).fee): Month[] {
  const x = model(industry);
  const [c1, c3] = cpaOf(industry, line);
  let gap = 0; // cumulative gross profit minus cumulative cost (ads + fee)
  return SPEND_X.map((k, i) => {
    const m = i + 1;
    const spend = Math.round(x.spend * k);
    const cpa = m === 1 ? c1 : m === 2 ? (c1 + c3) / 2 : c3;
    // fixes + AI call-backs from Month 2; referrals and reviews add 15% a month in Phase 3
    const organic = x.organic[line] * (m === 1 ? 0 : m === 2 ? 0.5 : m <= 6 ? 1 : 1.15 ** (m - 6));
    const cm1 = Math.round(spend / cpa + organic);
    const cm2 = Math.round(cm1 * x.rate[line] * 10) / 10;
    const revenue = Math.round(cm1 * x.cm1.price + cm2 * x.cm2.price);
    gap += revenue * x.margin - spend - fee;
    return { m, spend, cm1, cm2, revenue, cumGap: Math.round(gap) };
  });
}

export const breakEven = (rows: Month[]) => rows.find((r) => r.cumGap >= 0)?.m ?? null;

// Priced by the client's leverage, not our hours: the largest fee (up to the industry's list fee,
// never below ₹25K) at which the bottom line still breaks even by Month 6.
export function feeFor(industry: string) {
  for (let fee = model(industry).fee; fee > 25000; fee -= 5000) {
    const be = breakEven(project(industry, "bottom", fee));
    if (be !== null && be <= 6) return fee;
  }
  return 25000;
}

/** Indian money: 1.2 Cr, 34.5 L, 45K. */
export function inr(n: number) {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(n >= 1e8 ? 0 : 1)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(n >= 1e6 ? 0 : 1)}L`;
  if (n >= 1e3) return `₹${Math.round(n / 1e3)}K`;
  return `₹${n}`;
}

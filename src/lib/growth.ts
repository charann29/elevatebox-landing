// 12-month growth model for the /proposals growth plans, in the format of our client growth plans
// (SkillMeet, Healing Hastha): free step -> CM1 (first paid step) -> CM2 (main purchase), with a
// bottom line and a top line. These are industry assumptions, not the business's own numbers;
// every page prints them. ponytail: one table per industry, tune here when real client data lands.

export type Line = "bottom" | "top";

export type Model = {
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
  tech: [string, string][]; // industry-specific builds: [what we build, what it does for the numbers]
  voice: string[]; // the AI calls worth handing over first
  ideas: string[]; // the next two systems to build
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
    tech: [
      ["Online slot booking that writes straight into each doctor's schedule", "Patients book at 11 pm when they search; fewer drop-offs between ad and first consultation"],
      ["Reports, bills and reminders on WhatsApp, one patient record across reception, lab and pharmacy", "Patients come back for the treatment plan instead of starting over somewhere else: this is the CM2 rate"],
    ],
    voice: ["Call back every missed appointment enquiry within a minute and book the slot, so patients do not ring the next hospital on the list.", "Remind patients the day before their appointment and confirm, reschedule or cancel on the same call."],
    ideas: ["Online appointment booking that writes straight into each doctor's schedule.", "Reports, bills and reminders on WhatsApp instead of printouts and phone calls."],
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
    tech: [
      ["Quote generator from the enquiry details, approved by the sales head in one tap", "Buyers get a price the same day; quotes no longer sit in an inbox while the buyer orders elsewhere"],
      ["Dealer and repeat-buyer ordering on WhatsApp or a portal, linked to Tally and stock", "Re-orders happen on schedule without a sales call: this is the CM2 line"],
    ],
    voice: ["Call every IndiaMART, TradeIndia and website enquiry within minutes, ask quantity, spec and location, and pass qualified buyers to sales.", "Re-order calls to dealers and repeat buyers on a schedule."],
    ideas: ["Quote generation from the enquiry details, with approval by the sales head.", "Dealer ordering portal or WhatsApp ordering instead of phone and email chains."],
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
    tech: [
      ["Quote, invoice and UPI payment link generated from the enquiry", "The first job is paid before the visit; fewer no-shows and unpaid jobs"],
      ["Job scheduling with automatic service reminders", "Customers are reminded before they need you again, so the repeat job comes back to you"],
    ],
    voice: ["Answer enquiry calls when staff are busy or after hours, capture what the customer needs, and book a callback or visit.", "Call back every website and marketplace enquiry within minutes."],
    ideas: ["One enquiry inbox for phone, WhatsApp, website and marketplaces.", "Quotes, invoices and payment links generated from the enquiry."],
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
    tech: [
      ["Direct ordering and table booking on your own site and WhatsApp", "Repeat customers order without the aggregator's 20 to 30 percent commission"],
      ["Party, catering and banquet calendar with online deposits", "Big bookings are confirmed with money, not a phone promise: this is the CM2 line"],
    ],
    voice: ["Take table, room and banquet booking calls when the line is busy.", "Qualify catering and party enquiries: date, headcount, budget, menu."],
    ideas: ["Direct online ordering to avoid aggregator commission on repeat customers.", "Banquet and catering calendar with deposits collected online."],
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
    tech: [
      ["Online quote and booking in one flow, on the site and WhatsApp", "Enquiries become paid bookings while the customer is still comparing"],
      ["Live tracking links and trip updates on WhatsApp", "Fewer 'where is it' calls and more repeat and corporate customers"],
    ],
    voice: ["Answer booking and quote enquiries at any hour and capture trip or shipment details.", "Booking confirmation and pickup reminder calls."],
    ideas: ["Online quotes and bookings that land in one dashboard.", "Live tracking links sent on WhatsApp."],
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
    tech: [
      ["Design catalogue on WhatsApp with today's rate and a visit booking", "Customers shortlist before they walk in, so a showroom visit turns into a purchase"],
      ["Savings-scheme, repair and custom-order tracking with reminders", "Scheme instalments and wedding dates bring customers back for the big order"],
    ],
    voice: ["Answer gold-rate and design enquiries on the phone at any hour, and book a showroom visit.", "Call customers before their monthly gold savings scheme instalment is due."],
    ideas: ["Catalogue with photos on WhatsApp so customers shortlist designs before visiting.", "Savings scheme and order tracking in one system instead of registers."],
  },
  Education: {
    free: "Free demo class or career guidance call",
    cm1: { name: "Paid workshop", price: 499, what: "a paid 1 to 3 day workshop or demo week" },
    cm2: { name: "Admission", price: 40000, what: "a full course or admission" },
    spend: 50000, fee: 40000, margin: 0.6,
    organic: { bottom: 10, top: 20 },
    rate: { bottom: 0.06, top: 0.12 },
    hook: "a past student's result, then the teacher explaining one topic",
    tech: [
      ["Online admission form and fee collection with UPI and automatic receipts", "Interested parents pay the workshop or admission fee the same day"],
      ["Parent updates on WhatsApp: attendance, results and the next intake", "Happy parents refer the next student, and workshop students move to admission"],
    ],
    voice: ["Call back admission enquiries the same day and book a campus visit or demo class.", "Fee due reminder calls to parents, in Telugu or English."],
    ideas: ["Online admission forms that land in one dashboard.", "Fee collection with UPI links and automatic receipts."],
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
    tech: [
      ["Retailer ordering app or WhatsApp ordering with live stock", "Chemists order in two taps instead of calling, so the first trial order is easy"],
      ["Batch, expiry and outstanding-payment dashboard by retailer", "Repeat orders and collections run on schedule: this is the CM2 line"],
    ],
    voice: ["Re-order calls to chemists and hospitals before their stock runs out.", "Answer availability and price enquiries on the phone."],
    ideas: ["Retailer ordering app or WhatsApp ordering with live stock.", "Batch and expiry tracking linked to billing."],
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
    tech: [
      ["One lead inbox for portals, Meta and walk-ins, with a site-visit calendar", "Every lead gets a call in seconds and a booked visit, so ad money is not wasted"],
      ["Buyer portal for payments, documents and construction updates", "Buyers who trust the progress refer friends and pay milestones on time"],
    ],
    voice: ["Call every portal and ad lead within seconds, ask budget, location and timeline, and book a site visit.", "Remind buyers of site visits the evening before, and reschedule on the call."],
    ideas: ["One lead inbox for 99acres, MagicBricks, Housing, Facebook and walk-ins, so no lead is lost.", "Site visit calendar for the sales team with automatic follow-ups."],
  },
  "IT & software": {
    free: "Free 30-minute product or tech audit call",
    cm1: { name: "Paid discovery sprint", price: 50000, what: "a paid one to two week discovery or pilot" },
    cm2: { name: "Project or annual contract", price: 600000, what: "a full project or an annual development contract" },
    spend: 50000, fee: 60000, margin: 0.4,
    organic: { bottom: 1, top: 2 },
    rate: { bottom: 0.25, top: 0.4 },
    hook: "a 30-second screen recording of a product you built, with the result for the client",
    roas: { bottom: [2, 8], top: [3, 14] },
    tech: [
      ["Case-study pages by service and industry, with a booking calendar", "Buyers see proof for their own industry before the call, so more calls turn into paid discovery"],
      ["Proposal and scope generator from the discovery notes", "Proposals go out the same day, while the buyer is still deciding"],
    ],
    voice: ["Call every inbound enquiry within minutes, check budget, timeline and decision-maker, and book a call with sales.", "Follow up on every proposal on day 2 and day 7, and log the objection."],
    ideas: ["LinkedIn and Meta lead forms routed into one CRM, with the source of every lead.", "A client portal for project updates, invoices and approvals."],
  },
  "Retail & wholesale": {
    free: "Free price list and stock check on WhatsApp",
    cm1: { name: "First order", price: 1500, what: "a first order, in store, on WhatsApp or online" },
    cm2: { name: "Regular customer", price: 15000, what: "a customer who buys again within six months" },
    spend: 40000, fee: 35000, margin: 0.2,
    organic: { bottom: 15, top: 30 },
    rate: { bottom: 0.2, top: 0.3 },
    hook: "the shelf, the price and the delivery in one 20-second reel",
    roas: { bottom: [1.5, 5], top: [2, 9] },
    tech: [
      ["WhatsApp catalogue ordering with UPI and delivery slots", "Customers order in two taps instead of calling, so more first orders close"],
      ["Repeat-order reminders from billing data", "Regular customers come back on schedule: this is the CM2 line"],
    ],
    voice: ["Answer price and stock calls at any hour and take the order.", "Call customers when their usual order is due, or when new stock or an offer arrives."],
    ideas: ["Billing, stock and orders in one system linked to Tally.", "A Google Business profile with products, offers and review requests."],
  },
  "Textiles & fashion": {
    free: "Free catalogue or styling help on WhatsApp",
    cm1: { name: "First order", price: 2500, what: "a first order, retail or a trial wholesale lot" },
    cm2: { name: "Repeat or bulk order", price: 25000, what: "a repeat, wedding or bulk order" },
    spend: 50000, fee: 40000, margin: 0.3,
    organic: { bottom: 8, top: 15 },
    rate: { bottom: 0.12, top: 0.2 },
    hook: "the fabric or outfit on a real person, with the price on screen",
    roas: { bottom: [1.5, 5], top: [2, 9] },
    tech: [
      ["WhatsApp and Instagram catalogue with sizes, stock and UPI", "Shoppers pick and pay without a visit, so more reels turn into first orders"],
      ["Bulk, boutique and wedding order tracking with reminders", "Repeat and wedding orders are chased on time: this is the CM2 line"],
    ],
    voice: ["Answer catalogue and price enquiries and book a store visit or video call.", "Call past buyers before weddings and festivals with the new collection."],
    ideas: ["An online catalogue with sizes and stock, linked to billing.", "Dealer and boutique ordering on WhatsApp."],
  },
  "Automobile & mobility": {
    free: "Free vehicle check or test-ride booking",
    cm1: { name: "First service or test ride", price: 2500, what: "a paid first service, or a test ride that happens" },
    cm2: { name: "Vehicle or fleet deal", price: 120000, what: "a vehicle, EV or fleet deal" },
    spend: 60000, fee: 45000, margin: 0.12,
    organic: { bottom: 10, top: 20 },
    rate: { bottom: 0.04, top: 0.08 },
    hook: "the vehicle on the road with the on-road price on screen",
    roas: { bottom: [2, 8], top: [3, 14] },
    tech: [
      ["Test-ride and service booking with reminders", "Enquiries become booked rides and services while the buyer is still comparing"],
      ["Finance and insurance enquiry flow with document upload", "Buyers get a loan answer the same day, so more test rides become sales"],
    ],
    voice: ["Call every test-ride and service enquiry within a minute and book the slot.", "Service-due and insurance-renewal reminder calls."],
    ideas: ["Service history and reminders in one system.", "Online booking with a UPI advance."],
  },
  "Solar & energy": {
    free: "Free rooftop check from a photo and one electricity bill",
    cm1: { name: "Paid site survey", price: 1000, what: "a paid site survey or a booked home visit" },
    cm2: { name: "Installation", price: 200000, what: "a rooftop or commercial installation" },
    spend: 60000, fee: 50000, margin: 0.2,
    organic: { bottom: 4, top: 8 },
    rate: { bottom: 0.1, top: 0.18 },
    hook: "a real rooftop, with the monthly bill before and after",
    roas: { bottom: [2, 8], top: [3, 14] },
    tech: [
      ["Savings calculator: bill to system size, subsidy and payback", "Visitors see their own saving before the call, so more of them book a survey"],
      ["Installation tracker with photos and subsidy paperwork", "Customers who see progress refer neighbours: this feeds the Phase 3 flywheel"],
    ],
    voice: ["Call every enquiry within a minute, ask the monthly bill and roof type, and book a site survey.", "Follow up on every quote and on each subsidy step."],
    ideas: ["A quote generator from the survey, with financing options.", "After-sales service and panel-cleaning reminders."],
  },
  "Media & events": {
    free: "Free event plan or content audit",
    cm1: { name: "First paid booking", price: 10000, what: "a first paid shoot, event booking or content package" },
    cm2: { name: "Event or monthly retainer", price: 100000, what: "a full event or a monthly retainer" },
    spend: 40000, fee: 40000, margin: 0.35,
    organic: { bottom: 3, top: 6 },
    rate: { bottom: 0.12, top: 0.2 },
    hook: "60 seconds of a real event, start to finish",
    roas: { bottom: [1.5, 5], top: [2, 9] },
    tech: [
      ["Portfolio pages by event type, with an instant quote", "Enquirers see work like theirs and a price range, so more of them book"],
      ["Booking calendar with an online advance", "Dates are held with money, not a phone promise"],
    ],
    voice: ["Answer booking enquiries, check the date and budget, and book a call.", "Call past clients before festival and wedding season."],
    ideas: ["A quote and contract generated from the enquiry.", "Client galleries and delivery links on WhatsApp."],
  },
  "Finance & insurance": {
    free: "Free eligibility or coverage check on WhatsApp",
    cm1: { name: "First paid service", price: 2000, what: "a paid consultation, a first policy or a first filing" },
    cm2: { name: "Ongoing client", price: 40000, what: "an ongoing account a year: loans, investments, policies or retainers, counted as your income" },
    spend: 40000, fee: 40000, margin: 0.6,
    organic: { bottom: 5, top: 10 },
    rate: { bottom: 0.1, top: 0.18 },
    hook: "one common money mistake explained in 30 seconds, in Telugu",
    roas: { bottom: [1.5, 5], top: [2, 9] },
    tech: [
      ["Document collection on WhatsApp with a checklist", "Clients finish paperwork the same day, so fewer drop out before the first fee"],
      ["Renewal and due-date tracker", "Renewals and filings come back every year: this is the CM2 line"],
    ],
    voice: ["Call every enquiry within a minute and check eligibility or documents.", "Renewal, EMI and filing-deadline reminder calls."],
    ideas: ["A client portal for documents and status.", "Lead source tracking by product."],
  },
  "Agriculture & agro": {
    free: "Free crop or input advice on WhatsApp, in Telugu",
    cm1: { name: "First order", price: 5000, what: "a first order from a farmer, dealer or FPO" },
    cm2: { name: "Season account", price: 60000, what: "a season-long dealer or farmer account" },
    spend: 30000, fee: 30000, margin: 0.18,
    organic: { bottom: 4, top: 8 },
    rate: { bottom: 0.15, top: 0.25 },
    hook: "the result in a real field, explained by the farmer in Telugu",
    roas: { bottom: [2, 8], top: [3, 14] },
    tech: [
      ["WhatsApp ordering for dealers with stock and credit limits", "Dealers order in two taps, so the first order is easy"],
      ["Crop and season advisory broadcasts in Telugu", "Farmers come back every season: this is the CM2 line"],
    ],
    voice: ["Call dealers and farmers before the season with stock and offers.", "Answer product and dosage questions in Telugu and take the order."],
    ideas: ["A dealer ledger and collections dashboard.", "Route planning for deliveries."],
  },
  "Beauty, wellness & fitness": {
    free: "Free consultation or trial class",
    cm1: { name: "First paid session", price: 499, what: "a first paid session, class or treatment" },
    cm2: { name: "Package or membership", price: 12000, what: "a package or membership" },
    spend: 40000, fee: 35000, margin: 0.5,
    organic: { bottom: 15, top: 30 },
    rate: { bottom: 0.15, top: 0.25 },
    hook: "a real before and after, with the trainer or therapist on camera",
    tech: [
      ["Online booking with UPI and slot reminders", "Empty slots fill at night, when people decide; fewer no-shows"],
      ["Membership and package tracking with renewal nudges", "Members renew on time: this is the CM2 line"],
    ],
    voice: ["Answer booking calls at any hour and fill empty slots.", "Remind members before renewal and win back those who stopped coming."],
    ideas: ["Client records with progress photos and history.", "A Google review request after every visit."],
  },
};

// City size moves prices, ad spend and our fee; returns, rates and margins stay the same.
// ponytail: three tiers by name; swap for real city data when we have clients outside Hyderabad.
const METRO = /hyderabad|secunderabad|kondapur|medchal|ranga ?reddy|patancheru|sangareddy/i;
const TIER2 = /warangal|karimnagar|nizamabad|khammam|^telangana$/i; // "Telangana": district not given
export const cityScale = (city: string) => (METRO.test(city) ? 1 : TIER2.test(city) ? 0.75 : 0.6);
export const cityTier = (city: string) =>
  METRO.test(city) ? "Hyderabad metro" : TIER2.test(city) ? "a tier-2 city" : "a district town";

export function model(industry: string, city = "Hyderabad"): Model {
  const b = M[industry] ?? M["Services & trade"];
  const k = cityScale(city);
  if (k === 1) return b;
  const r = (n: number, step: number) => Math.round((n * k) / step) * step;
  return { ...b, cm1: { ...b.cm1, price: r(b.cm1.price, 10) }, cm2: { ...b.cm2, price: r(b.cm2.price, 100) }, spend: r(b.spend, 1000), fee: r(b.fee, 5000) };
}

// Return on ad spend we plan to: Month 1 while Meta learns, and from Month 3. Cost per CM1 follows
// from it (value of one CM1 / return). Low-margin, high-ticket trades need and usually get more.
const ROAS: Record<Line, [number, number]> = { bottom: [1.2, 3], top: [2, 6] };
const roasOf = (x: Model) => x.roas ?? ROAS;
const cm1Value = (x: Model, line: Line) => x.cm1.price + x.rate[line] * x.cm2.price;
const cpaOf = (x: Model, line: Line) =>
  roasOf(x)[line].map((r) => Math.round(cm1Value(x, line) / r / 10) * 10) as [number, number];

// Phase 1 (M1-3) holds spend; Phase 2 (M4-6) steps it up only while cost per CM1 falls; Phase 3 holds.
const SPEND_X = [1, 1, 1, 1.33, 1.67, 2, 2, 2, 2, 2, 2, 2];

export type Month = { m: number; spend: number; cm1: number; cm2: number; revenue: number; cumGap: number };

function project(x: Model, line: Line, fee: number): Month[] {
  const [c1, c3] = cpaOf(x, line);
  let gap = 0; // cumulative gross profit minus cumulative cost (ads + fee)
  return SPEND_X.map((k, i) => {
    const m = i + 1;
    const spend = Math.round(x.spend * k);
    const cpa = m === 1 ? c1 : m === 2 ? (c1 + c3) / 2 : c3;
    // fixes + AI call-backs from Month 2; referrals and reviews add 15% a month in Phase 3
    const organic = x.organic[line] * (m === 1 ? 0 : m === 2 ? 0.5 : m <= 6 ? 1 : 1.15 ** (m - 6));
    const raw = spend / cpa + organic; // one decimal under 10, so a ₹6L trade does not round 0.5 up to 1
    const cm1 = raw < 10 ? Math.round(raw * 10) / 10 : Math.round(raw);
    const cm2 = Math.round(cm1 * x.rate[line] * 10) / 10;
    const revenue = Math.round(cm1 * x.cm1.price + cm2 * x.cm2.price);
    gap += revenue * x.margin - spend - fee;
    return { m, spend, cm1, cm2, revenue, cumGap: Math.round(gap) };
  });
}

const breakEven = (rows: Month[]) => rows.find((r) => r.cumGap >= 0)?.m ?? null;

// Priced by the client's leverage, not our hours: the largest fee (up to the industry's list fee,
// never below ₹25K, or the list fee if lower) at which the bottom line still breaks even by Month 6.
function feeFor(x: Model) {
  const floor = Math.min(25000, x.fee);
  for (let fee = x.fee; fee > floor; fee -= 5000) {
    const be = breakEven(project(x, "bottom", fee));
    if (be !== null && be <= 6) return fee;
  }
  return floor;
}

/** Everything a growth plan page needs for one industry in one city. */
export function plan(industry: string, city = "Hyderabad") {
  const x = model(industry, city);
  const fee = feeFor(x);
  const lo = project(x, "bottom", fee), hi = project(x, "top", fee);
  return {
    x, fee, lo, hi,
    beLo: breakEven(lo), beHi: breakEven(hi),
    roas: roasOf(x), cpaLo: cpaOf(x, "bottom"), cpaHi: cpaOf(x, "top"),
  };
}
export type Plan = ReturnType<typeof plan>;

/** Indian money: 1.2 Cr, 34.5 L, 45K. */
export function inr(n: number) {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(n >= 1e8 ? 0 : 1)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(n >= 1e6 ? 0 : 1)}L`;
  if (n >= 1e3) return `₹${Math.round(n / 1e3)}K`;
  return `₹${n}`;
}

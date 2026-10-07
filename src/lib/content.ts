// Single source of truth for the site. Every product line below was checked
// against the product's live site (title + meta description) or its README on
// 7 Oct 2026. Rule: describe what the product does, never who uses it. No
// client names, user counts, rankings or awards go in here unless they can be
// produced on request.

export const COMPANY = {
  name: "ElevateBox",
  legal: "ELEVATESCALE TECHNOLOGIES PRIVATE LIMITED",
  cin: "U62099TS2024PTC191165",
  city: "Hyderabad, Telangana, India",
  email: "support@elevatebox.in",
  site: "https://elevatebox.in",
  flagship: "https://agents.elevatebox.in",
};

export const CATEGORIES = [
  "Conversational AI",
  "Fintech & Compliance",
  "Healthcare & Clinical AI",
  "Hiring & Workforce",
  "Education",
  "Agriculture & Food",
  "Wellness",
  "Creator Economy",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Product = {
  name: string;
  value: string;
  category: Category;
  status: "Live" | "In development";
  /** Omitted while a product has no public page. */
  url?: string;
};

export const PRODUCTS: Product[] = [
  {
    name: "Voice Agents",
    value:
      "AI phone employees that call your leads within seconds in Telugu, Hindi or English, capture what was said and book the next step.",
    category: "Conversational AI",
    status: "Live",
    url: "https://agents.elevatebox.in",
  },
  {
    name: "LeadLoop CRM",
    value:
      "A human + AI CRM for telecalling teams: agent, manager and leadership workspaces built around why leads convert, and why they don't.",
    category: "Conversational AI",
    status: "In development",
  },
  {
    name: "Monsoon Intelligence",
    value:
      "A finance manager on WhatsApp for Indian SMBs: GST invoicing, payment reminders and receivables, in plain chat.",
    category: "Fintech & Compliance",
    status: "Live",
    url: "https://heymonsoon.com",
  },
  {
    name: "OnEasy",
    value:
      "Tax, GST and compliance for Indian businesses, run on a practice platform with a client portal for chartered-accountant firms.",
    category: "Fintech & Compliance",
    status: "Live",
    url: "https://oneasy.ai",
  },
  {
    name: "FnOTax India",
    value:
      "Source-verified F&O tax answers for retail traders: ITR-3, turnover, audit applicability and loss carry-forward.",
    category: "Fintech & Compliance",
    status: "Live",
    url: "https://fnotax.com",
  },
  {
    name: "TRH360",
    value:
      "Doctors, lab tests, pharmacy and health packages: appointments, medicine orders and health records in one place.",
    category: "Healthcare & Clinical AI",
    status: "Live",
    url: "https://www.trh360.com",
  },
  {
    name: "Clinical AI",
    value:
      "A mobile assistant for doctors: dictate the visit, get a prescription with real dose columns, and research with cited references.",
    category: "Healthcare & Clinical AI",
    status: "In development",
  },
  {
    name: "8meds",
    value:
      "Online pharmacy with lab tests at home and doctor consults, delivered to the door.",
    category: "Healthcare & Clinical AI",
    status: "Live",
    url: "https://8meds.com",
  },
  {
    name: "Medibag",
    value:
      "Search medicines, add them to a bag, and have a pharmacist confirm availability before you pay.",
    category: "Healthcare & Clinical AI",
    status: "Live",
    url: "https://medibag.in",
  },
  {
    name: "QuickHyre",
    value:
      "An AI job portal: matching, an AI resume builder and mock interviews for candidates, free job posting for employers.",
    category: "Hiring & Workforce",
    status: "Live",
    url: "https://quickhyre.ai",
  },
  {
    name: "beingWise",
    value:
      "Builds the exact ordered web-options list to freeze for TS & AP EAMCET counselling, and flags mistakes before you lock.",
    category: "Education",
    status: "Live",
    url: "https://bestcollegeindia.com",
  },
  {
    name: "SoilFirst by SriBio",
    value:
      "A soil-health app for farmers: pick the crop, describe the problem, get a diagnosis, a remedy and the inputs to apply.",
    category: "Agriculture & Food",
    status: "Live",
    url: "https://soilfirst.in",
  },
  {
    name: "Vamshi Farms",
    value:
      "Farm-to-door storefront for staples, ghee and honey in Hyderabad, on the web and in a mobile app.",
    category: "Agriculture & Food",
    status: "Live",
    url: "https://vamshifarms.app",
  },
  {
    name: "Haritha Wellness",
    value:
      "Ayurveda and naturopathy wellness centre: Panchakarma, yoga and therapeutic food, with consultations booked online.",
    category: "Wellness",
    status: "Live",
    url: "https://harithawellness.in",
  },
  {
    name: "Creator Chart",
    value:
      "Content strategy and personal branding for founders and executives who want to build authority online.",
    category: "Creator Economy",
    status: "Live",
    url: "https://creatorchart.in",
  },
];

/* Each problem maps to a product above — the hero must not promise a fix
   the portfolio does not contain. */
export const PROBLEMS = [
  { p: "Leads go cold before anyone calls them back.", by: "Voice Agents" },
  { p: "Small businesses chase every payment by hand.", by: "Monsoon Intelligence" },
  { p: "Doctors finish the clinic, then start the paperwork.", by: "Clinical AI" },
  { p: "Hiring is slow, noisy and mostly guesswork.", by: "QuickHyre" },
  { p: "Farmers treat crop problems without an agronomist.", by: "SoilFirst" },
  { p: "Students freeze college choices blind.", by: "beingWise" },
];

export const STUDIO = [
  {
    n: "01",
    t: "Research",
    d: "Start from a problem we can see in the field, not a technology looking for a use. Talk to the people who have it, and write down what would have to be true for a product to fix it.",
  },
  {
    n: "02",
    t: "Build",
    d: "One small team per product, shipping in short increments to real users. Shared foundations (auth, billing, AI routing, Indian-language voice) mean a new product never starts from zero.",
  },
  {
    n: "03",
    t: "Operate",
    d: "We run what we ship: support, uptime, cost and the numbers that say whether it works. What earns it gets its own team; what doesn't is wound down, and the lessons go back into the studio.",
  },
];

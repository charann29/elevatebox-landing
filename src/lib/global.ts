// Pages for clients outside India: 7 markets x 3 services, rendered by the Hyderabad template
// (components/hyderabad-landing.tsx) with page.intl set. Owner rules: book a call, no prices,
// no foreign offices or client names; contract is with our Indian company.
import type { HydPage } from "@/lib/hyderabad";

type Country = {
  key: string;
  /** Name used after "in": "Dubai", "the UK". */
  in: string;
  /** Plain country name for schema areaServed. */
  country: string;
  /** Adjective for the meta description: "UAE", "Dutch". */
  short: string;
  tz: string;
  law: string;
  lawShort: string;
  hosting: string;
  sectors: string;
  industries: string[];
  chips: string[];
};

const COUNTRIES: Country[] = [
  {
    key: "dubai",
    in: "Dubai",
    country: "United Arab Emirates",
    short: "UAE",
    tz: "Gulf Standard Time is 1.5 hours behind India, so your whole working day sits inside ours. Calls at 9 am in Dubai are 10:30 am for us.",
    law: "the UAE Personal Data Protection Law (Federal Decree-Law 45 of 2021), and the separate DIFC and ADGM data protection rules when you operate in a free zone",
    lawShort: "UAE PDPL",
    hosting: "UAE cloud regions such as Azure UAE North in Dubai and AWS Middle East (UAE)",
    sectors: "real estate brokers, clinics, e-commerce sellers, logistics firms and fintechs",
    industries: ["real-estate", "healthcare-fitness", "ecommerce", "logistics", "fintech", "education"],
    chips: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah"],
  },
  {
    key: "saudi-arabia",
    in: "Saudi Arabia",
    country: "Saudi Arabia",
    short: "Saudi",
    tz: "Arabia Standard Time is 2.5 hours behind India, so a 9 am start in Riyadh is 11:30 am for us and the full day overlaps.",
    law: "the Saudi Personal Data Protection Law, enforced by SDAIA since September 2024, including its limits on moving personal data outside the Kingdom",
    lawShort: "Saudi PDPL",
    hosting: "in-Kingdom cloud regions such as Google Cloud Dammam, so personal data stays in Saudi Arabia",
    sectors: "Vision 2030 programmes, healthcare providers, retail, logistics and education",
    industries: ["healthcare-fitness", "ecommerce", "logistics", "education", "fintech", "real-estate"],
    chips: ["Riyadh", "Jeddah", "Dammam", "Al Khobar", "Mecca", "Medina"],
  },
  {
    key: "qatar",
    in: "Qatar",
    country: "Qatar",
    short: "Qatar",
    tz: "Qatar is 2.5 hours behind India, so a 9 am start in Doha is 11:30 am for us and the full day overlaps.",
    law: "Qatar's Personal Data Privacy Protection Law (Law No. 13 of 2016), and the QFC data protection rules for firms in the Qatar Financial Centre",
    lawShort: "Qatar PDPPL",
    hosting: "Qatar cloud regions such as Google Cloud Doha and Azure Qatar Central",
    sectors: "hospitality, healthcare, real estate, logistics and education",
    industries: ["hotel-booking", "healthcare-fitness", "real-estate", "logistics", "education", "ecommerce"],
    chips: ["Doha", "Lusail", "Al Rayyan", "Al Wakrah", "Al Khor"],
  },
  {
    key: "usa",
    in: "the USA",
    country: "United States",
    short: "US",
    tz: "India is 9.5 to 13.5 hours ahead of mainland US time zones. We hold a daily call in your morning, our evening, and build while you sleep, so each morning starts with yesterday's work done.",
    law: "HIPAA for health data, the SOC 2 controls enterprise buyers ask for, and state privacy laws such as California's CCPA and CPRA",
    lawShort: "HIPAA and CCPA",
    hosting: "US cloud regions on AWS, Azure or Google Cloud, in your own account",
    sectors: "SaaS startups, healthcare companies, e-commerce brands, logistics firms and fintechs",
    industries: ["healthcare-fitness", "fintech", "ecommerce", "logistics", "education", "real-estate"],
    chips: ["New York", "San Francisco Bay Area", "Austin", "Chicago", "Seattle", "Boston"],
  },
  {
    key: "uk",
    in: "the UK",
    country: "United Kingdom",
    short: "UK",
    tz: "The UK is 4.5 hours behind India in summer and 5.5 hours in winter. Your morning is our afternoon, which leaves four or more shared working hours every day.",
    law: "UK GDPR and the Data Protection Act 2018, with the International Data Transfer Agreement or the UK addendum to the EU clauses covering work done from India",
    lawShort: "UK GDPR",
    hosting: "London cloud regions on AWS, Azure or Google Cloud, in your own account",
    sectors: "fintechs, healthtech, e-commerce, property and education companies",
    industries: ["fintech", "healthcare-fitness", "ecommerce", "real-estate", "education", "logistics"],
    chips: ["London", "Manchester", "Birmingham", "Leeds", "Bristol", "Edinburgh"],
  },
  {
    key: "germany",
    in: "Germany",
    country: "Germany",
    short: "German",
    tz: "Germany is 3.5 hours behind India in summer and 4.5 hours in winter, so your whole morning overlaps our afternoon.",
    law: "the GDPR, with Standard Contractual Clauses covering work done from India, and the EU AI Act for AI systems",
    lawShort: "GDPR",
    hosting: "Frankfurt cloud regions on AWS, Azure or Google Cloud, in your own account",
    sectors: "Mittelstand manufacturers, logistics firms, healthcare, e-commerce and fintechs",
    industries: ["logistics", "inventory-management", "healthcare-fitness", "ecommerce", "fintech", "education"],
    chips: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne", "Stuttgart"],
  },
  {
    key: "netherlands",
    in: "the Netherlands",
    country: "Netherlands",
    short: "Dutch",
    tz: "The Netherlands is 3.5 hours behind India in summer and 4.5 hours in winter, so your whole morning overlaps our afternoon.",
    law: "the GDPR as enforced by the Autoriteit Persoonsgegevens, with Standard Contractual Clauses covering work done from India, and the EU AI Act for AI systems",
    lawShort: "GDPR",
    hosting: "Netherlands cloud regions such as Azure West Europe and Google Cloud europe-west4, in your own account",
    sectors: "logistics and port businesses, e-commerce, fintechs, healthcare and SaaS startups",
    industries: ["logistics", "ecommerce", "fintech", "healthcare-fitness", "inventory-management", "education"],
    chips: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven"],
  },
];

const INDUSTRY: Record<string, [string, string]> = {
  "real-estate": ["Real estate", "Listings, viewing bookings and lead follow-up by AI calls."],
  "healthcare-fitness": ["Healthcare", "Patient apps, appointments, records and clinic tools."],
  ecommerce: ["E-commerce", "Catalogues, checkout, order tracking and support."],
  logistics: ["Logistics", "Driver apps, live tracking, proof of delivery and dispatch."],
  fintech: ["Fintech", "Onboarding, payments, ledgers and dashboards."],
  education: ["Education", "Learning apps, assessments and institute portals."],
  "hotel-booking": ["Hospitality", "Bookings, guest apps and front-desk tools."],
  "inventory-management": ["Inventory and operations", "Stock, warehouses and order flow across sites."],
};

type Service = {
  key: string;
  /** Head term, e.g. "AI Development Company". */
  phrase: string;
  noun: string;
  serviceType: string;
  sub: string;
  lead: (c: Country) => string;
  items: { t: string; d: string; href: string }[];
  steps: { t: string; d: string; when: string }[];
  stack: { t: string; items: string[] }[];
  drivers: [string, string][];
  cases: string[];
  faqs: (c: Country) => { q: string; a: string }[];
};

const SERVICES: Service[] = [
  {
    key: "ai-development-company",
    phrase: "AI Development Company",
    noun: "AI development",
    serviceType: "AI software development",
    sub: "Co-pilots and autopilots built on your own data and your own cloud, measured before launch, sized to pay back within six months.",
    lead: (c) =>
      `ElevateBox is an AI development company working with businesses in ${c.in}: we build co-pilots that help your team and autopilots that run a process end to end, trained on your rules and documents so they answer the same way every time. Everything runs in your cloud account, and we size each build to pay for itself within six months.`,
    items: [
      { t: "AI co-pilots", d: "Assistants inside your tools that draft, look up and check work using your own documents and rules.", href: "/ai-solutions/generative-ai-development" },
      { t: "AI autopilots and agents", d: "Agents that carry out multi-step work across your systems, with a log of every action.", href: "/ai-solutions/ai-agents-and-automation" },
      { t: "Chat on your documents (RAG)", d: "Answers from your policies, catalogues and contracts, each citing the source.", href: "/ai-solutions/generative-ai-development" },
      { t: "Document reading", d: "Invoices, statements and forms read into fields, with a person checking edge cases.", href: "/ai-solutions/ai-ml-development" },
      { t: "Voice AI agents", d: "Phone calls for leads, reminders and follow-ups, run on Roopa by ElevateBox.", href: "/ai-solutions" },
      { t: "AI strategy consulting", d: "Which process to automate first, which existing tools to use, and the cheapest way to run them.", href: "/ai-solutions/ai-consulting" },
    ],
    steps: [
      { t: "Strategy call", d: "We map the process, the data it needs and the number that proves it works.", when: "Week 1" },
      { t: "Test set", d: "50 to 200 of your real examples with known-good answers, collected before any prompt is written.", when: "Weeks 1–2" },
      { t: "Prototype on your data", d: "A working version scored against the test set, so you see accuracy before the full build.", when: "Weeks 2–4" },
      { t: "Production build", d: "Integrations, a human review step for low-confidence cases, logging and a fallback path.", when: "Two-week sprints" },
      { t: "Monitor and improve", d: "Every mistake a person corrects becomes a new test case for the next version.", when: "After launch" },
    ],
    stack: [
      { t: "Models", items: ["OpenAI", "Azure OpenAI", "Gemini", "Claude"] },
      { t: "Retrieval", items: ["Vector search", "Keyword search", "Reranking"] },
      { t: "Voice", items: ["Speech to text", "Text to speech", "SIP and WebRTC"] },
      { t: "Backend", items: ["Python", "Node.js", "PostgreSQL"] },
    ],
    drivers: [
      ["The task", "Answering, reading, calling or acting, and how many steps each one takes."],
      ["Your data", "How clean it is, where it lives and which languages it is in."],
      ["Accuracy needed", "How often it may be wrong before a person checks, and what a mistake costs."],
      ["Integrations", "CRM, ERP, telephony, email or your own app."],
      ["Usage", "Model and call costs, billed at actuals in your own cloud accounts."],
    ],
    cases: ["oneasy", "8meds", "medibag"],
    faqs: (c) => [
      { q: `What is the difference between an AI co-pilot and an autopilot?`, a: "A co-pilot works next to a person: it drafts, looks things up and checks, and the person decides. An autopilot runs the whole task and only hands a person the cases it is unsure about. Most businesses start with a co-pilot and move steps to the autopilot as accuracy is proven." },
      { q: `How do you make sure the AI follows our rules?`, a: "We put your rules, documents and past examples into the system's context and test it against 50 to 200 real cases with known answers. Every version is scored before release, and low-confidence answers go to a person." },
      { q: `Can the AI run inside our own cloud in ${c.in}?`, a: `Yes. We build in your cloud account, for example ${c.hosting}, with model accounts in your name and training on your data switched off.` },
    ],
  },
  {
    key: "ai-voice-agent-company",
    phrase: "AI Voice Agent Company",
    noun: "AI voice agents",
    serviceType: "AI voice agent development",
    sub: "AI phone agents that answer, call back and follow up, built on Roopa by ElevateBox, our own voice product in daily production.",
    lead: (c) =>
      `ElevateBox builds AI voice agents for businesses in ${c.in}: phone agents that answer enquiries, qualify leads, confirm appointments and chase follow-ups, around the clock. They run on Roopa by ElevateBox, the voice product we operate in production every day, and connect to your phone lines, CRM and calendar.`,
    items: [
      { t: "Inbound call answering", d: "Answers every call, handles common questions and books or transfers the rest.", href: "/ai-solutions/ai-agents-and-automation" },
      { t: "Lead qualification calls", d: "Calls new leads within minutes, asks your questions and logs the answers in your CRM.", href: "/ai-solutions/ai-agents-and-automation" },
      { t: "Appointment reminders", d: "Confirms, reschedules and reminds, so fewer slots go empty.", href: "/ai-solutions/ai-agents-and-automation" },
      { t: "Follow-ups and renewals", d: "Payment reminders, renewals and abandoned-checkout calls at the time you choose.", href: "/ai-solutions/ai-agents-and-automation" },
      { t: "CRM and calendar links", d: "Call summaries, recordings and outcomes pushed into the tools your team already uses.", href: "/services/crm-software-development" },
      { t: "Custom voice agents", d: "A voice agent built around your script, knowledge base and hand-off rules.", href: "/ai-solutions/generative-ai-development" },
    ],
    steps: [
      { t: "Call script and goals", d: "Which calls, what the agent must find out, and when it hands over to a person.", when: "Week 1" },
      { t: "Test calls", d: "We run the agent against real call scenarios and your team listens before anything goes live.", when: "Weeks 1–2" },
      { t: "Pilot", d: "Live calls on a slice of your volume, with every call recorded and scored.", when: "Weeks 2–4" },
      { t: "Scale", d: "More numbers, more call types and CRM links once the pilot hits its numbers.", when: "After the pilot" },
      { t: "Tune", d: "Missed questions and failed calls feed the next version of the script.", when: "Every week" },
    ],
    stack: [
      { t: "Voice", items: ["Speech to text", "Text to speech", "Turn-taking and barge-in"] },
      { t: "Telephony", items: ["SIP trunks", "WebRTC", "Call recording"] },
      { t: "Models", items: ["OpenAI", "Azure OpenAI", "Gemini"] },
      { t: "Integrations", items: ["CRMs", "Calendars", "Webhooks", "WhatsApp"] },
    ],
    drivers: [
      ["Call types", "Inbound, outbound or both, and how many different conversations the agent must handle."],
      ["Languages", "English, Hindi and Telugu today; other languages after a test on your calls."],
      ["Volume", "Calls a day and minutes per call, billed at actuals."],
      ["Telephony", "Your existing numbers and provider, or new ones."],
      ["Integrations", "CRM, calendar, payment links and hand-off to your team."],
    ],
    cases: ["voice", "oneasy", "8meds"],
    faqs: (c) => [
      { q: "Which languages can the voice agent speak?", a: "English, Hindi and Telugu are in production today. Other languages, including Arabic, German or Dutch, are available on request after a test on your own call recordings, so you hear the quality before you commit." },
      { q: "Will callers know they are talking to an AI?", a: "We recommend the agent says so at the start of the call, and many jurisdictions expect it. It hands over to a person whenever the caller asks or the question is outside its script." },
      { q: `Can the agent use our phone numbers in ${c.in}?`, a: "In most cases, yes: the agent connects to your telephony provider over SIP. We confirm what your provider supports on the first call, and the test calls run before any live traffic." },
    ],
  },
  {
    key: "app-development-company",
    phrase: "App Development Company",
    noun: "app development",
    serviceType: "Mobile and web app development",
    sub: "iOS, Android, Flutter, React Native and web apps, designed, built and maintained by one team that has shipped 380+ apps.",
    lead: (c) =>
      `ElevateBox is an app development company working with businesses in ${c.in}: we design, build and maintain iOS, Android, Flutter, React Native and web apps, from the first screen to the App Store, Google Play and production, and keep them running afterwards. The team has shipped 380+ apps.`,
    items: [
      { t: "iOS app development", d: "Native Swift apps for iPhone and iPad, through App Store review.", href: "/technologies/ios" },
      { t: "Android app development", d: "Native Kotlin apps tested across the phones your customers use.", href: "/technologies/android" },
      { t: "Flutter and React Native", d: "One codebase for both stores, with a design that looks the same on each.", href: "/technologies/flutter" },
      { t: "Web apps and portals", d: "Customer portals, dashboards and SaaS products on Next.js and Node.js.", href: "/services/web-development" },
      { t: "MVP development", d: "A first version in weeks, built to test the idea with real users.", href: "/mvp-development-company-hyderabad" },
      { t: "UI/UX design", d: "Flows and screens designed around the task and signed off before build.", href: "/services/ui-ux-design" },
      { t: "Dedicated developers", d: "Engineers who join your stand-ups and work in your repository.", href: "/services/resource-augmentation" },
      { t: "Maintenance and support", d: "OS upgrades, fixes and monitoring, with bugs answered in under 6 hours.", href: "/services/mobile-app-development" },
    ],
    steps: [
      { t: "Requirement call", d: "Your users, the screens and the integrations, worked through with the people who build it. You get a written quotation and timeline.", when: "Week 1" },
      { t: "UI/UX design", d: "Flows and screens for every state, signed off before build.", when: "Weeks 2–3" },
      { t: "Build sprints", d: "Two-week sprints, each ending in a build you install on your own phone.", when: "Every 2 weeks" },
      { t: "QA and testing", d: "Automated tests plus device checks inside every sprint.", when: "Every sprint" },
      { t: "Store launch", d: "Store listings, staged rollout and crash reporting switched on.", when: "1–2 weeks with review" },
      { t: "Support", d: "OS upgrades, dependency updates and fixes, bugs answered in under 6 hours.", when: "Monthly, after launch" },
    ],
    stack: [
      { t: "Mobile", items: ["Flutter", "React Native", "Kotlin", "Swift"] },
      { t: "Web and backend", items: ["Next.js", "Node.js", "Python", "PostgreSQL"] },
      { t: "Cloud", items: ["AWS", "Google Cloud", "Azure"] },
      { t: "AI", items: ["OpenAI", "Gemini", "Speech to text", "Vector search"] },
    ],
    drivers: [
      ["Platforms", "iOS, Android, web, or all three from shared code."],
      ["Screens and states", "How many screens, and the error, empty and loading states each needs."],
      ["Integrations", "Payments, maps, messaging, your CRM or ERP."],
      ["Backend and admin", "Accounts, an admin panel, reports, roles and permissions."],
      ["AI features", "Chat, voice or document reading, and the accuracy they need."],
      ["Running costs", "Cloud, messaging and AI usage, billed at actuals in your own accounts."],
    ],
    cases: ["vamshi-farms", "8meds", "medibag"],
    faqs: (c) => [
      { q: "How long does it take to build an app?", a: "Design takes about two to three weeks, then the build runs in two-week sprints, each ending in a version you can install. Your quotation fixes the timeline for your scope; store review adds one to two weeks at launch." },
      { q: "Do you build iOS and Android together?", a: "Yes, for most business apps, with one Flutter or React Native codebase. We choose native Swift and Kotlin when the app leans on the device: background work, Bluetooth, widgets or heavy media." },
      { q: `Can you publish the app under our company in ${c.in}?`, a: "Yes. The App Store and Google Play accounts are created in your company's name, and we publish through them. The code repository and cloud accounts are yours too." },
    ],
  },
];

const title = (s: Service, c: Country) => `${s.phrase} in ${c.in}`;
const path = (s: Service, c: Country) => `/global/${s.key}-${c.key}`;

function build(s: Service, c: Country): HydPage {
  const t = title(s, c);
  return {
    path: path(s, c),
    title: t,
    description: `${t}: ${s.noun} for ${c.short} businesses, ${c.lawShort}-ready, with working hours that overlap yours. Book a call.`,
    h1: t,
    sub: s.sub,
    intro: s.lead(c),
    serviceType: s.serviceType,
    services: { h2: `${s.noun[0].toUpperCase()}${s.noun.slice(1)} services for ${c.in}`, items: s.items },
    why: {
      h2: `Why businesses in ${c.in} work with ElevateBox`,
      points: [
        { t: "Your working hours covered", d: c.tz },
        { t: `${c.lawShort} built in`, d: `We design for ${c.law}, and host in ${c.hosting}.` },
        { t: "380+ apps shipped", d: "Engineers from Google, Zomato, HackerRank and two Y Combinator-backed startups. The team that quotes it builds it." },
        { t: "Code in your name", d: "Repository, cloud and store accounts are yours from day one. Nothing is held back when the work ends." },
      ],
    },
    ai: {
      h2: "AI that does real work",
      lead: `We run an AI product of our own in production, Roopa by ElevateBox, so the AI we build for ${c.in} is tested the same way.`,
      items: [
        { t: "Voice agents", d: "AI phone calls in English, Hindi and Telugu; other languages on request after a test." },
        { t: "Chat on your documents", d: "Answers from your own catalogue, policies and documents, not the open internet." },
        { t: "Document reading", d: "Invoices and forms read into fields, with a person checking the edge cases." },
        { t: "Agents", d: "Multi-step work across your tools, with a log of every action." },
      ],
    },
    process: { h2: `How we deliver ${s.noun} for ${c.in}`, steps: s.steps },
    stack: { h2: "Technology stack", groups: s.stack },
    industries: {
      h2: `Industries we build for in ${c.in}`,
      items: c.industries.map((k) => ({ t: INDUSTRY[k][0], d: INDUSTRY[k][1], href: `/industries/${k}` })),
    },
    cases: { h2: "Products we built and still run", slugs: s.cases },
    cost: {
      h2: `What decides the cost of ${s.noun} in ${c.in}?`,
      lead: "Every project is priced in writing after a requirement call, before any development starts. These are the things that move the number.",
      drivers: s.drivers,
    },
    faqs: [
      ...s.faqs(c),
      { q: `How do you handle the time difference with ${c.in}?`, a: c.tz },
      { q: `How do you handle data protection for clients in ${c.in}?`, a: `We design for ${c.law}. Personal data stays in ${c.hosting}, access is limited to the engineers on your project, and we sign an NDA and data processing terms before we see any data.` },
      { q: `Who do we sign the contract with?`, a: `With ElevateScale Technologies Private Limited, the Indian company that runs ElevateBox, registered in Hyderabad under CIN U62099TS2024PTC191165. Our team works from Hyderabad and works with clients in ${c.in} remotely; we do not have an office in ${c.in}.` },
      { q: `Which businesses in ${c.in} do you build for?`, a: `Mostly ${c.sectors}. If your process is done by people on phones, screens and spreadsheets today, it is usually a good fit.` },
      { q: "Who owns the source code?", a: "You do, from the first commit. The repository, cloud and store accounts are created in your name, and we work inside them." },
    ],
    related: [
      ...SERVICES.filter((o) => o !== s).map((o) => ({ label: title(o, c), href: path(o, c) })),
      ...COUNTRIES.filter((o) => o !== c).slice(0, 4).map((o) => ({ label: title(s, o), href: path(s, o) })),
      { label: "All countries we work with", href: "/global" },
    ],
    areas: [c.country, ...c.chips],
    intl: {
      country: c.country,
      local: {
        h2: `Working with ElevateBox from ${c.in}`,
        body: `${c.tz} Our team works from Hyderabad, India, and works with you over video calls, WhatsApp, email and your own tools. You sign with ElevateScale Technologies Pvt Ltd and own everything we build.`,
        chips: c.chips,
      },
    },
  };
}

export const GLOBAL_PAGES: HydPage[] = COUNTRIES.flatMap((c) => SERVICES.map((s) => build(s, c)));
export const GLOBAL_GROUPS = COUNTRIES.map((c) => ({
  label: c.in === "Dubai" ? "UAE (Dubai)" : c.in.replace(/^the /, "The "),
  in: c.in,
  pages: SERVICES.map((s) => ({ label: s.phrase, href: path(s, c) })),
}));
export const globalPage = (slug: string) => GLOBAL_PAGES.find((p) => p.path === `/global/${slug}`);

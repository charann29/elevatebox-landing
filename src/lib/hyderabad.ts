// Hyderabad landing pages: one dataset, one template (components/hyderabad-landing.tsx).
// Built from the 13 Oct 2026 page-1 study of "mobile app development company in Hyderabad".
// Facts only from COMPANY, CREDENTIALS, PROJECTS and what the team has confirmed; no ratings,
// client quotes or price ranges until real ones exist.

export type HydPage = {
  path: string;
  /** Title tag; the layout appends " | ElevateBox". */
  title: string;
  description: string;
  h1: string;
  /** One line under the H1, naming what is built. */
  sub: string;
  /** The opening sentence, carrying the exact phrase. */
  intro: string;
  serviceType: string;
  services: { h2: string; items: { t: string; d: string; href: string }[] };
  why: { h2: string; points: { t: string; d: string }[] };
  ai: { h2: string; lead: string; items: { t: string; d: string }[] };
  process: { h2: string; steps: { t: string; d: string; when: string }[] };
  stack: { h2: string; groups: { t: string; items: string[] }[] };
  industries: { h2: string; items: { t: string; d: string; href: string }[] };
  cases: { h2: string; slugs: string[] };
  cost: { h2: string; lead: string; drivers: [string, string][] };
  faqs: { q: string; a: string }[];
  related: { label: string; href: string }[];
  /** Places named in the ProfessionalService schema; defaults to Hyderabad and AREAS. */
  areas?: string[];
};

export const AREAS = ["HITEC City", "Madhapur", "Gachibowli", "Jubilee Hills", "Kondapur", "Kukatpally", "Secunderabad", "Banjara Hills"];

const PROCESS_APP = [
  { t: "Requirement analysis", d: "A paid call with the people who will build it. You leave with a written quotation and timeline.", when: "Week 1" },
  { t: "UI/UX design", d: "Flows and screens for every state, including errors and empty screens, signed off before build.", when: "Weeks 2–3" },
  { t: "Build sprints", d: "Two-week sprints, each ending in a build you install on your own phone.", when: "Every 2 weeks" },
  { t: "QA and testing", d: "Automated tests plus checks on low-end Android phones and weak networks, inside every sprint.", when: "Every sprint" },
  { t: "App Store and Play Store launch", d: "Store listings, screenshots and ASO basics, staged rollout and crash reporting switched on.", when: "1–2 weeks with store review" },
  { t: "Support and maintenance", d: "OS upgrades, dependency updates and fixes. Bugs answered in under 6 hours.", when: "Monthly, after launch" },
];

const INDUSTRIES_APP = [
  { t: "Healthcare apps", d: "Patient apps, pharmacy ordering, appointments and doctor tools.", href: "/industries/healthcare-fitness" },
  { t: "Education apps", d: "Learning apps, test prep, college guidance and institute portals.", href: "/industries/education" },
  { t: "Real estate apps", d: "Listings, site-visit booking and lead follow-up by AI calls.", href: "/industries/real-estate" },
  { t: "E-commerce apps", d: "Catalogues, carts, UPI checkout and order tracking.", href: "/industries/ecommerce" },
  { t: "Logistics apps", d: "Driver apps, live tracking, proof of delivery and dispatch.", href: "/industries/logistics" },
  { t: "Fintech apps", d: "KYC flows, payments and dashboards built for Indian rules.", href: "/industries/fintech" },
];

const AI_ITEMS = [
  { t: "Voice agents", d: "AI phone calls in Telugu, Hindi and English. We run our own: Voice by ElevateBox." },
  { t: "Chat inside the app", d: "Answers from your own catalogue, policies and documents, not the open internet." },
  { t: "Document reading", d: "Prescriptions, invoices and forms read into fields, with a person checking the edge cases." },
  { t: "Recommendations", d: "What to show next, based on what each user actually did." },
];

const WHY = [
  { t: "1,400 apps built", d: "Across healthcare, commerce, education and AI. The team that quotes it is the team that builds it." },
  { t: "Engineers from top teams", d: "Founding engineers at ClickPe (YC W23) and an AI startup acquired by Microsoft, and AIR 14 at ACM ICPC." },
  { t: "Bugs answered in under 6 hours", d: "One team from the first call to support, with crash reporting wired in before launch." },
  { t: "Code in your name", d: "Repository, cloud and App Store and Play Store accounts are yours from day one." },
];

const STACK_APP = [
  { t: "Mobile", items: ["Flutter", "React Native", "Kotlin", "Swift"] },
  { t: "Web and backend", items: ["Next.js", "Node.js", "Python", "PostgreSQL", "Supabase"] },
  { t: "Cloud", items: ["AWS", "Google Cloud", "Azure"] },
  { t: "AI", items: ["OpenAI", "Gemini", "Speech to text", "Vector search"] },
];

const COST_DRIVERS: [string, string][] = [
  ["Platforms", "Android only, iOS only, or both from one Flutter or React Native codebase."],
  ["Screens and states", "How many screens, and how many error, empty and loading states each needs."],
  ["Integrations", "Payments (Razorpay, UPI), maps, SMS, WhatsApp, your CRM or ERP."],
  ["Backend and admin", "User accounts, an admin panel, reports, roles and permissions."],
  ["AI features", "Chat, voice or document reading, and how accurate they must be before launch."],
  ["Running costs", "Cloud, SMS and AI API usage, billed at actuals in your own accounts."],
];

const SHARED_FAQS = [
  { q: "Who owns the source code and the App Store and Play Store accounts?", a: "You do, from the first commit. The repository, cloud account and store listings are created in your name, and we work inside them." },
  { q: "Can you add AI features such as chat, voice or document reading to my app?", a: "Yes. We build chat on your own documents, document reading and voice agents. Our own product, Voice by ElevateBox, makes AI phone calls in Telugu, Hindi and English." },
];

export const HYD_PAGES: HydPage[] = [
  {
    path: "/mobile-app-development-company-hyderabad",
    title: "Mobile App Development Company in Hyderabad",
    description:
      "ElevateBox is a mobile app development company in Hyderabad building iOS, Android, Flutter and AI apps for startups and enterprises. Get a quote.",
    h1: "Mobile App Development Company in Hyderabad",
    sub: "iOS, Android, Flutter, React Native and AI-powered apps, designed, built and maintained by one Hyderabad team.",
    intro:
      "ElevateBox is a mobile app development company in Hyderabad that builds iOS, Android, Flutter and React Native apps for startups, growing businesses and enterprises, from the first screen to the App Store and Play Store, and keeps them running afterwards.",
    serviceType: "Mobile app development",
    services: {
      h2: "Mobile app development services in Hyderabad",
      items: [
        { t: "iOS app development", d: "Native Swift apps for iPhone and iPad, through App Store review.", href: "/technologies/ios" },
        { t: "Android app development", d: "Native Kotlin apps tested on the low-end phones your customers actually use.", href: "/technologies/android" },
        { t: "Flutter app development", d: "One codebase for both stores, with a custom design that looks the same on each.", href: "/technologies/flutter" },
        { t: "React Native app development", d: "Cross-platform apps that share code and people with your web team.", href: "/technologies/react-native" },
        { t: "UI/UX design", d: "Flows and screens designed around the task, tested before they are built.", href: "/services/ui-ux-design" },
        { t: "Backend and APIs", d: "Accounts, payments, notifications and admin panels that hold up under load.", href: "/services/saas-paas-development" },
        { t: "AI features", d: "Chat, voice and document reading inside your app.", href: "/ai-solutions" },
        { t: "App maintenance and support", d: "OS upgrades, fixes and monitoring, with bugs answered in under 6 hours.", href: "/services/mobile-app-development" },
      ],
    },
    why: { h2: "Why Hyderabad founders and enterprises choose ElevateBox", points: WHY },
    ai: {
      h2: "AI-powered app development",
      lead: "Most app agencies in Hyderabad stop at screens. We ship AI that does real work inside the app, and run an AI product of our own in production.",
      items: AI_ITEMS,
    },
    process: { h2: "How we build your app", steps: PROCESS_APP },
    stack: { h2: "Technology stack", groups: STACK_APP },
    industries: { h2: "Industries we build mobile apps for", items: INDUSTRIES_APP },
    cases: { h2: "Case studies: apps we built and still run", slugs: ["vamshi-farms", "8meds", "medibag"] },
    cost: {
      h2: "How much does mobile app development cost in Hyderabad?",
      lead: "The cost of an app depends on six things, below. We price yours in writing after a ₹3,500 requirement analysis, so you know the full build cost before development starts.",
      drivers: COST_DRIVERS,
    },
    faqs: [
      { q: "How much does mobile app development cost in Hyderabad?", a: "It depends on the platforms, the number of screens, integrations such as payments, the backend and any AI features. We start with a ₹3,500 requirement analysis that ends in a written quotation, so you know the full cost before any development starts." },
      { q: "How long does it take to build an iOS or Android app?", a: "Design takes about two to three weeks, then the build runs in two-week sprints, each ending in an app you can install. Your quotation fixes the timeline for your scope; store review adds one to two weeks at launch." },
      { q: "Do you build iOS and Android together with Flutter or React Native?", a: "Yes, for most business apps. One Flutter or React Native codebase ships to both stores. We pick native Kotlin and Swift when the app leans on the device: background work, Bluetooth, widgets or heavy media." },
      { q: "Can you build an app for my existing website or software?", a: "Yes. We connect the app to your current website, database, CRM or ERP through APIs, and add the missing APIs when there are none." },
      { q: "Do you provide app maintenance after launch?", a: "Yes. The same team covers OS upgrades, dependency updates and fixes on a monthly scope, and answers any bug or problem in under 6 hours." },
      ...SHARED_FAQS,
      { q: "Should I hire a freelance app developer or an app development company in Hyderabad?", a: "A freelancer suits a small, well-defined app with a short life. A company suits an app your business depends on, because design, backend, testing, launch and support need more than one person, and the work must survive anyone leaving." },
      { q: "Is ElevateBox based in Hyderabad?", a: `Yes. The team works from Hyderabad, Telangana, and meets clients across ${AREAS.slice(0, 6).join(", ")} and Secunderabad.` },
    ],
    related: [
      { label: "Hire mobile app developers in Hyderabad", href: "/hire-mobile-app-developers-hyderabad" },
      { label: "Web development company in Hyderabad", href: "/web-development-company-hyderabad" },
      { label: "Software development company in Hyderabad", href: "/software-development-company-hyderabad" },
      { label: "Top mobile app development companies in Hyderabad", href: "/blogs/top-mobile-app-development-companies-hyderabad" },
      { label: "Android app development company in Hyderabad", href: "/android-app-development-company-hyderabad" },
      { label: "iOS app development company in Hyderabad", href: "/ios-app-development-company-hyderabad" },
      { label: "Flutter app development company in Hyderabad", href: "/flutter-app-development-company-hyderabad" },
      { label: "MVP development for startups", href: "/mvp-development-company-hyderabad" },
      { label: "App development across Telangana", href: "/app-development-company-telangana" },
    ],
  },

  {
    path: "/hire-mobile-app-developers-hyderabad",
    title: "Hire Mobile App Developers in Hyderabad",
    description:
      "Hire mobile app developers in Hyderabad: Flutter, React Native, Android and iOS engineers who join your team in days, with code in your name.",
    h1: "Hire Mobile App Developers in Hyderabad",
    sub: "Flutter, React Native, Android and iOS developers who join your team, your stand-ups and your repository.",
    intro:
      "Hire mobile app developers in Hyderabad from ElevateBox: experienced Flutter, React Native, Android and iOS engineers who work inside your team and your tools, backed by a company that has built 1,400 apps.",
    serviceType: "Mobile app developer staffing",
    services: {
      h2: "Mobile app developers you can hire",
      items: [
        { t: "Flutter developers", d: "Cross-platform engineers shipping one codebase to both stores.", href: "/technologies/flutter" },
        { t: "React Native developers", d: "JavaScript and TypeScript engineers who also work across your web code.", href: "/technologies/react-native" },
        { t: "Android developers", d: "Kotlin engineers for apps that lean on the device.", href: "/technologies/android" },
        { t: "iOS developers", d: "Swift engineers who take apps through App Store review.", href: "/technologies/ios" },
        { t: "Backend developers", d: "Node.js and Python engineers for the APIs your app talks to.", href: "/technologies/nodejs" },
        { t: "UI/UX designers", d: "Designers who hand over screens engineers can build exactly.", href: "/services/ui-ux-design" },
      ],
    },
    why: {
      h2: "Why hire app developers through ElevateBox",
      points: [
        { t: "Start in days, not months", d: "Skip the hiring cycle. Developers join within days of the requirement call." },
        { t: "Backed by a full team", d: "Your developer has designers, testers and senior engineers behind them, not just a CV." },
        { t: "Engineers from top teams", d: "Founding engineers at ClickPe (YC W23) and an AI startup acquired by Microsoft, and AIR 14 at ACM ICPC." },
        { t: "Your code, your accounts", d: "They work in your repository and tools. Nothing is held back when the engagement ends." },
      ],
    },
    ai: {
      h2: "Developers who ship AI features",
      lead: "Our developers build the AI features clients now ask for, on top of the app work.",
      items: AI_ITEMS,
    },
    process: {
      h2: "How hiring works",
      steps: [
        { t: "Requirement call", d: "Your stack, the work ahead and the skills it needs.", when: "Day 1" },
        { t: "Developer profiles", d: "Profiles matched to your stack, with a technical interview if you want one.", when: "Within days" },
        { t: "Onboarding", d: "Access to your repository, tools and stand-ups. First pull request in week one.", when: "Week 1" },
        { t: "Ongoing work", d: "Weekly written updates and a senior engineer reviewing code.", when: "Every week" },
        { t: "Scale up or down", d: "Add a developer for a launch, or step down after it, with notice agreed up front.", when: "Any month" },
      ],
    },
    stack: { h2: "Skills on the team", groups: STACK_APP },
    industries: { h2: "Industries our developers have built for", items: INDUSTRIES_APP },
    cases: { h2: "Apps our developers built", slugs: ["8meds", "medibag", "vamshi-farms"] },
    cost: {
      h2: "How much does it cost to hire app developers in Hyderabad?",
      lead: "A monthly rate per developer, set by seniority and stack, agreed in writing before anyone starts. What moves the rate:",
      drivers: [
        ["Seniority", "Junior, mid-level or senior, and whether they lead others."],
        ["Stack", "Flutter, React Native, native Android or iOS, backend or AI."],
        ["Commitment", "Full-time on your project or a set number of hours a month."],
        ["Duration", "A short launch push or a long engagement."],
      ],
    },
    faqs: [
      { q: "How quickly can a developer start?", a: "Usually within days of the requirement call, once you have seen the profiles and, if you want, interviewed them." },
      { q: "Can I interview the developer first?", a: "Yes. You can run your own technical interview before anyone starts." },
      { q: "Do the developers work in our tools and time zone?", a: "Yes. They join your repository, issue tracker and stand-ups, working Indian hours with overlap for UK, Europe, UAE and US teams." },
      { q: "Should I hire a freelance app developer or hire through a company?", a: "A freelancer works for a short, well-defined task. Hiring through a company gives you a replacement if someone leaves, code review from senior engineers, and designers and testers when you need them." },
      ...SHARED_FAQS,
    ],
    related: [
      { label: "Mobile app development company in Hyderabad", href: "/mobile-app-development-company-hyderabad" },
      { label: "Resource augmentation", href: "/services/resource-augmentation" },
      { label: "Freelancer or app development company?", href: "/blogs/freelance-vs-app-development-company-hyderabad" },
    ],
  },

  {
    path: "/web-development-company-hyderabad",
    title: "Web Development Company in Hyderabad",
    description:
      "ElevateBox is a web development company in Hyderabad building fast websites, web apps and SaaS products in Next.js and React, with SEO built in.",
    h1: "Web Development Company in Hyderabad",
    sub: "Websites, web apps, e-commerce and SaaS products, built fast and found on Google.",
    intro:
      "ElevateBox is a web development company in Hyderabad that builds fast websites, web applications, e-commerce stores and SaaS products in Next.js and React, with SEO, analytics and a CMS your team can use from day one.",
    serviceType: "Web development",
    services: {
      h2: "Web development services in Hyderabad",
      items: [
        { t: "Business websites", d: "Fast, modern sites that rank, with pages your team edits themselves.", href: "/services/web-development" },
        { t: "Web applications", d: "Dashboards, portals and internal tools with accounts and roles.", href: "/services/web-development" },
        { t: "E-commerce development", d: "Stores with UPI checkout, inventory and order tracking.", href: "/services/ecommerce-development" },
        { t: "SaaS development", d: "Multi-tenant products with billing, from first version to scale.", href: "/services/saas-paas-development" },
        { t: "CMS development", d: "Content your marketing team publishes without a developer.", href: "/services/cms-development" },
        { t: "SEO services", d: "Technical SEO, schema and pages written for what people search.", href: "/services/seo-services" },
      ],
    },
    why: { h2: "Why businesses in Hyderabad choose ElevateBox for web development", points: WHY },
    ai: {
      h2: "AI on your website",
      lead: "Websites that answer and act, not just display.",
      items: [
        { t: "AI chat on your content", d: "Visitors get answers from your own pages, policies and catalogue." },
        { t: "Lead calls in seconds", d: "A form fills and Voice by ElevateBox calls the lead in Telugu, Hindi or English." },
        { t: "Search that understands", d: "Search by meaning, not just exact words." },
        { t: "Content at scale", d: "Programmatic SEO pages from your own data, each with real content." },
      ],
    },
    process: {
      h2: "How we build your website",
      steps: [
        { t: "Requirement analysis", d: "Pages, features and integrations, with a written quotation.", when: "Week 1" },
        { t: "Design", d: "Page designs for desktop and mobile, signed off before build.", when: "Weeks 2–3" },
        { t: "Build", d: "Two-week sprints on a live preview link you can share.", when: "Every 2 weeks" },
        { t: "SEO and launch", d: "Titles, schema, sitemap, speed checks and analytics before go-live.", when: "Launch week" },
        { t: "Support", d: "Updates, fixes and new pages. Bugs answered in under 6 hours.", when: "Monthly" },
      ],
    },
    stack: {
      h2: "Technology stack",
      groups: [
        { t: "Frontend", items: ["Next.js", "React", "Vue.js", "Angular"] },
        { t: "Backend", items: ["Node.js", "Python", "PHP"] },
        { t: "Data", items: ["PostgreSQL", "Supabase", "NoSQL"] },
        { t: "Hosting", items: ["Vercel", "AWS", "Google Cloud"] },
      ],
    },
    industries: { h2: "Industries we build websites for", items: INDUSTRIES_APP },
    cases: { h2: "Web products we built", slugs: ["vamshi-farms", "medibag", "oneasy"] },
    cost: {
      h2: "How much does web development cost in Hyderabad?",
      lead: "We quote in writing after a ₹3,500 requirement analysis. What decides the cost:",
      drivers: [
        ["Pages and templates", "How many page types, and how many pages of content."],
        ["Features", "Accounts, search, booking, payments, dashboards."],
        ["Integrations", "CRM, ERP, payment gateways, WhatsApp, analytics."],
        ["Content and SEO", "Copywriting, programmatic pages and schema."],
        ["Running costs", "Hosting and third-party services, billed at actuals in your accounts."],
      ],
    },
    faqs: [
      { q: "How much does a website cost in Hyderabad?", a: "It depends on the number of page types, features such as booking or payments, integrations and content. We quote in writing after a ₹3,500 requirement analysis." },
      { q: "Do you build websites that rank on Google?", a: "Yes. Every site ships with unique titles and descriptions, schema, a sitemap and fast load times, and we can add SEO pages built from your own data." },
      { q: "Can my team edit the website after launch?", a: "Yes. We set up a CMS so your team edits pages, posts and images without a developer." },
      { q: "Do you build e-commerce sites with UPI payments?", a: "Yes. Razorpay with UPI, cards and netbanking, with signed webhooks so no order is charged twice." },
      ...SHARED_FAQS,
    ],
    related: [
      { label: "Mobile app development company in Hyderabad", href: "/mobile-app-development-company-hyderabad" },
      { label: "Software development company in Hyderabad", href: "/software-development-company-hyderabad" },
      { label: "Web development services", href: "/services/web-development" },
    ],
  },

  {
    path: "/software-development-company-hyderabad",
    title: "Software Development Company in Hyderabad",
    description:
      "ElevateBox is a software development company in Hyderabad building custom software, SaaS, CRM, ERP and AI systems, with code in your name.",
    h1: "Software Development Company in Hyderabad",
    sub: "Custom software, SaaS, CRM, ERP and AI systems, designed and run by one Hyderabad team.",
    intro:
      "ElevateBox is a software development company in Hyderabad that builds custom software for businesses: SaaS products, CRMs, ERPs, internal tools and AI systems, connected to the tools you already use and handed over in your name.",
    serviceType: "Custom software development",
    services: {
      h2: "Software development services in Hyderabad",
      items: [
        { t: "Custom software development", d: "Software built around how your business actually runs.", href: "/services/saas-paas-development" },
        { t: "SaaS development", d: "Multi-tenant products with billing and admin.", href: "/services/saas-paas-development" },
        { t: "CRM development", d: "Lead tracking, calling and follow-up built for your sales process.", href: "/services/crm-software-development" },
        { t: "ERP development", d: "Inventory, orders, billing and reports in one system.", href: "/services/erp-software-development" },
        { t: "Process automation", d: "Bots that move data between tools so people stop copying it.", href: "/services/robotic-process-automation" },
        { t: "Data engineering", d: "Pipelines and dashboards your decisions can rely on.", href: "/services/data-engineering" },
      ],
    },
    why: { h2: "Why businesses choose ElevateBox for custom software", points: WHY },
    ai: {
      h2: "AI software development",
      lead: "AI that takes real work off your team, measured before it ships.",
      items: [
        { t: "AI agents", d: "Agents that carry out multi-step tasks with set permissions and a log.", },
        { t: "Voice agents", d: "AI phone calls in Telugu, Hindi and English, from our own product Voice." },
        { t: "Document reading", d: "Invoices, forms and records read into your systems." },
        { t: "Predictive analytics", d: "Forecasts and alerts from the data you already collect." },
      ],
    },
    process: {
      h2: "How we build your software",
      steps: [
        { t: "Requirement analysis", d: "Workflows, users and integrations mapped, with a written quotation.", when: "Week 1" },
        { t: "Architecture and design", d: "System design and screens, with the trade-offs written down.", when: "Weeks 2–3" },
        { t: "Build", d: "Two-week sprints on a real environment.", when: "Every 2 weeks" },
        { t: "Testing and rollout", d: "Automated tests, data migration and a staged rollout.", when: "Before go-live" },
        { t: "Support", d: "Fixes and improvements, with bugs answered in under 6 hours.", when: "Monthly" },
      ],
    },
    stack: {
      h2: "Technology stack",
      groups: [
        { t: "Backend", items: ["Node.js", "Python", "Java", "PHP"] },
        { t: "Frontend", items: ["Next.js", "React", "Angular"] },
        { t: "Data", items: ["PostgreSQL", "SQL databases", "NoSQL"] },
        { t: "Cloud and AI", items: ["AWS", "Azure", "Google Cloud", "OpenAI", "Gemini"] },
      ],
    },
    industries: { h2: "Industries we build software for", items: INDUSTRIES_APP },
    cases: { h2: "Software we built and still run", slugs: ["oneasy", "8meds", "vamshi-farms"] },
    cost: {
      h2: "How much does custom software development cost in Hyderabad?",
      lead: "We quote in writing after a ₹3,500 requirement analysis. What decides the cost:",
      drivers: [
        ["Workflows", "How many processes the software runs, and how many roles use it."],
        ["Integrations", "Existing tools, databases, payment gateways and government APIs."],
        ["Data migration", "Moving records from spreadsheets or an old system."],
        ["AI features", "Agents, document reading or voice, and their accuracy bar."],
        ["Running costs", "Cloud and API usage, billed at actuals in your accounts."],
      ],
    },
    faqs: [
      { q: "How much does custom software cost in Hyderabad?", a: "It depends on the workflows, the roles, integrations and data migration. We quote in writing after a ₹3,500 requirement analysis, before any development starts." },
      { q: "Can you replace our spreadsheets with software?", a: "Yes. We map how the spreadsheets are used today, build the software around that, and migrate the existing records." },
      { q: "Can the software connect to our existing tools?", a: "Yes. We integrate with CRMs, ERPs, accounting tools, payment gateways and WhatsApp through their APIs." },
      ...SHARED_FAQS,
    ],
    related: [
      { label: "Mobile app development company in Hyderabad", href: "/mobile-app-development-company-hyderabad" },
      { label: "Web development company in Hyderabad", href: "/web-development-company-hyderabad" },
      { label: "Best AI developers in Hyderabad", href: "/best-ai-developers-in-hyderabad" },
    ],
  },

  /* Nov 2026 additions, each from a query cluster Search Console already shows impressions for
     (positions 12–45, zero clicks). One page per cluster; no city-swap doorway pages. */

  {
    path: "/android-app-development-company-hyderabad",
    title: "Android App Development Company in Hyderabad",
    description:
      "Android app development company in Hyderabad: Kotlin and Flutter apps tested on the budget phones your customers use, launched on Play Store.",
    h1: "Android App Development Company in Hyderabad",
    sub: "Kotlin and Flutter Android apps, built for the phones and networks your customers actually have.",
    intro:
      "ElevateBox is an Android app development company in Hyderabad that designs, builds and launches Android apps on Google Play, tested on the low-cost phones and patchy networks most Indian users have, and keeps them updated after launch.",
    serviceType: "Android app development",
    services: {
      h2: "Android app development services",
      items: [
        { t: "Native Kotlin apps", d: "For apps that lean on the device: background work, Bluetooth, camera, widgets.", href: "/technologies/kotlin" },
        { t: "Flutter Android apps", d: "One codebase that can ship to iPhone later without a rewrite.", href: "/technologies/flutter" },
        { t: "Play Store launch", d: "Listing, screenshots, data-safety form, staged rollout and review fixes.", href: "/technologies/android" },
        { t: "Offline and low-network mode", d: "Apps that keep working on 2G and sync when the signal returns.", href: "/services/mobile-app-development" },
        { t: "Payments and UPI", d: "Razorpay, UPI intent and subscriptions, tested end to end.", href: "/services/ecommerce-development" },
        { t: "Android app maintenance", d: "Target-SDK upgrades Google enforces each year, plus crash fixes.", href: "/services/mobile-app-development" },
      ],
    },
    why: { h2: "Why choose ElevateBox for your Android app", points: WHY },
    ai: { h2: "AI features on Android", lead: "On-device and cloud AI, built in where it saves your users a step.", items: AI_ITEMS },
    process: { h2: "How we build your Android app", steps: PROCESS_APP },
    stack: {
      h2: "Android technology stack",
      groups: [
        { t: "Android", items: ["Kotlin", "Jetpack Compose", "Flutter", "Room", "WorkManager"] },
        { t: "Backend", items: ["Node.js", "Python", "PostgreSQL", "Firebase", "Supabase"] },
        { t: "Release", items: ["Play Console", "Crashlytics", "Staged rollouts"] },
        { t: "AI", items: ["Gemini", "OpenAI", "ML Kit", "Speech to text"] },
      ],
    },
    industries: { h2: "Industries we build Android apps for", items: INDUSTRIES_APP },
    cases: { h2: "Apps we built and still run", slugs: ["8meds", "medibag", "vamshi-farms"] },
    cost: {
      h2: "How much does Android app development cost in Hyderabad?",
      lead: "An Android app's cost comes down to the six things below. We price yours in writing after a ₹3,500 requirement analysis, before development starts.",
      drivers: COST_DRIVERS,
    },
    faqs: [
      { q: "How much does it cost to build an Android app in Hyderabad?", a: "It depends on the screens, integrations such as UPI and maps, the backend and any AI features. A ₹3,500 requirement analysis ends in a written quotation, so you know the full cost before development starts." },
      { q: "Should I build Android first or Android and iOS together?", a: "In India most users are on Android, so many businesses launch there first. If you build it in Flutter, the same code ships to iPhone later without a rewrite." },
      { q: "Kotlin or Flutter for an Android app?", a: "Flutter for most business apps, because it keeps the iPhone option open. Kotlin when the app depends on background work, Bluetooth, widgets or heavy camera use." },
      { q: "Will my app work on cheap Android phones?", a: "Yes. We test on low-RAM phones and slow networks in every sprint, not just on flagship devices." },
      { q: "Do you handle Google Play Store publishing?", a: "Yes. We prepare the listing, the data-safety form and the screenshots, publish under your own Play Console account, and fix anything Google's review flags." },
      ...SHARED_FAQS,
    ],
    related: [
      { label: "Mobile app development company in Hyderabad", href: "/mobile-app-development-company-hyderabad" },
      { label: "iOS app development company in Hyderabad", href: "/ios-app-development-company-hyderabad" },
      { label: "Flutter app development company in Hyderabad", href: "/flutter-app-development-company-hyderabad" },
      { label: "Hire mobile app developers in Hyderabad", href: "/hire-mobile-app-developers-hyderabad" },
    ],
  },

  {
    path: "/ios-app-development-company-hyderabad",
    title: "iOS App Development Company in Hyderabad",
    description:
      "iOS app development company in Hyderabad: Swift and Flutter iPhone and iPad apps, taken through App Store review and published under your account.",
    h1: "iOS App Development Company in Hyderabad",
    sub: "iPhone and iPad apps in Swift or Flutter, through App Store review and into your own developer account.",
    intro:
      "ElevateBox is an iOS app development company in Hyderabad that builds iPhone and iPad apps in Swift and Flutter, takes them through Apple's App Store review, and publishes them under your own Apple developer account.",
    serviceType: "iOS app development",
    services: {
      h2: "iOS app development services",
      items: [
        { t: "Native Swift apps", d: "SwiftUI apps for iPhone and iPad that feel native to Apple users.", href: "/technologies/swift" },
        { t: "Flutter iOS apps", d: "One codebase for iPhone and Android, with a design that matches on both.", href: "/technologies/flutter" },
        { t: "App Store review", d: "Privacy labels, sign-in rules and review replies handled for you.", href: "/technologies/ios" },
        { t: "TestFlight betas", d: "Your team tests every sprint's build on their own iPhones.", href: "/technologies/ios" },
        { t: "In-app purchases", d: "Subscriptions and purchases set up the way Apple requires.", href: "/services/mobile-app-development" },
        { t: "iOS maintenance", d: "Updates for each new iOS version, before your users hit the bugs.", href: "/services/mobile-app-development" },
      ],
    },
    why: { h2: "Why choose ElevateBox for your iOS app", points: WHY },
    ai: { h2: "AI features on iPhone", lead: "Chat, voice and document reading built into the app, with privacy handled the way Apple expects.", items: AI_ITEMS },
    process: { h2: "How we build your iOS app", steps: PROCESS_APP },
    stack: {
      h2: "iOS technology stack",
      groups: [
        { t: "iOS", items: ["Swift", "SwiftUI", "Flutter", "TestFlight", "StoreKit"] },
        { t: "Backend", items: ["Node.js", "Python", "PostgreSQL", "Firebase", "Supabase"] },
        { t: "Cloud", items: ["AWS", "Google Cloud", "Azure"] },
        { t: "AI", items: ["OpenAI", "Gemini", "Speech to text", "Vision"] },
      ],
    },
    industries: { h2: "Industries we build iOS apps for", items: INDUSTRIES_APP },
    cases: { h2: "Apps we built and still run", slugs: ["8meds", "medibag", "vamshi-farms"] },
    cost: {
      h2: "How much does iOS app development cost in Hyderabad?",
      lead: "An iPhone app's cost comes down to the six things below. We price yours in writing after a ₹3,500 requirement analysis, before development starts.",
      drivers: COST_DRIVERS,
    },
    faqs: [
      { q: "How much does iOS app development cost in Hyderabad?", a: "It depends on the screens, integrations, the backend and any AI features. A ₹3,500 requirement analysis ends in a written quotation before development starts. Apple's developer account costs $99 a year on top, paid by you to Apple." },
      { q: "Do I need a Mac or an Apple developer account?", a: "You need an Apple developer account in your company's name; we help you set it up. You don't need a Mac. We build and sign the app on ours." },
      { q: "How long does App Store review take?", a: "Usually one to three days. We plan one to two weeks for launch in case Apple asks for changes, and handle those replies for you." },
      { q: "Can you build the iPhone and Android apps together?", a: "Yes. With Flutter, one codebase ships to both stores. We pick native Swift when the app depends on Apple-only features such as widgets, HealthKit or Apple Watch." },
      { q: "Can my team test the app before it goes live?", a: "Yes. Every sprint's build goes out on TestFlight, so you test it on your own iPhones." },
      ...SHARED_FAQS,
    ],
    related: [
      { label: "Mobile app development company in Hyderabad", href: "/mobile-app-development-company-hyderabad" },
      { label: "Android app development company in Hyderabad", href: "/android-app-development-company-hyderabad" },
      { label: "Flutter app development company in Hyderabad", href: "/flutter-app-development-company-hyderabad" },
    ],
  },

  {
    path: "/flutter-app-development-company-hyderabad",
    title: "Flutter App Development Company in Hyderabad",
    description:
      "Flutter and cross-platform app development company in Hyderabad: one codebase for Android and iPhone, launched on both stores, maintained after.",
    h1: "Flutter App Development Company in Hyderabad",
    sub: "Cross-platform apps from one Flutter or React Native codebase, launched on Play Store and App Store together.",
    intro:
      "ElevateBox is a Flutter app development company in Hyderabad that builds cross-platform apps: one codebase that ships to Android and iPhone at the same time, with one team, one set of tests and one release cycle.",
    serviceType: "Cross-platform app development",
    services: {
      h2: "Cross-platform app development services",
      items: [
        { t: "Flutter app development", d: "Custom-designed apps that look and behave the same on both platforms.", href: "/technologies/flutter" },
        { t: "React Native app development", d: "Cross-platform apps that share code and people with a React web team.", href: "/technologies/react-native" },
        { t: "Native to Flutter migration", d: "Two separate apps merged into one codebase, screen by screen.", href: "/services/mobile-app-development" },
        { t: "Flutter web and desktop", d: "The same code extended to a web admin or a desktop tool when it fits.", href: "/services/web-development" },
        { t: "Store launch on both", d: "Play Store and App Store listings, reviews and staged rollouts.", href: "/services/mobile-app-development" },
        { t: "Flutter maintenance", d: "Flutter, Android and iOS upgrades kept in step, plus fixes.", href: "/services/mobile-app-development" },
      ],
    },
    why: { h2: "Why choose ElevateBox for Flutter development", points: WHY },
    ai: { h2: "AI features in Flutter apps", lead: "Chat, voice and document reading built once and shipped to both platforms.", items: AI_ITEMS },
    process: { h2: "How we build your cross-platform app", steps: PROCESS_APP },
    stack: {
      h2: "Cross-platform technology stack",
      groups: [
        { t: "Cross-platform", items: ["Flutter", "Dart", "React Native", "TypeScript"] },
        { t: "Backend", items: ["Node.js", "Python", "PostgreSQL", "Firebase", "Supabase"] },
        { t: "Cloud", items: ["AWS", "Google Cloud", "Azure"] },
        { t: "AI", items: ["OpenAI", "Gemini", "Speech to text", "Vector search"] },
      ],
    },
    industries: { h2: "Industries we build cross-platform apps for", items: INDUSTRIES_APP },
    cases: { h2: "Apps we built for both stores", slugs: ["vamshi-farms", "8meds", "medibag"] },
    cost: {
      h2: "How much does Flutter app development cost in Hyderabad?",
      lead: "One codebase usually costs less than two native apps. What decides your price is below; we quote in writing after a ₹3,500 requirement analysis.",
      drivers: COST_DRIVERS,
    },
    faqs: [
      { q: "Is Flutter good enough for a serious business app?", a: "Yes, for most business apps: commerce, booking, healthcare, education and internal tools. We pick native code only when the app depends heavily on device features such as background work, Bluetooth or widgets." },
      { q: "Flutter or React Native?", a: "Flutter when the design must match exactly on both platforms. React Native when your team already writes React for the web and wants to share code and people." },
      { q: "Does a Flutter app cost less than two native apps?", a: "Usually, because one team builds, tests and maintains one codebase. We quote in writing after a ₹3,500 requirement analysis, so you can compare." },
      { q: "Can you move our two native apps to Flutter?", a: "Yes. We migrate screen by screen, so the existing apps keep working until the Flutter version replaces them." },
      ...SHARED_FAQS,
    ],
    related: [
      { label: "Mobile app development company in Hyderabad", href: "/mobile-app-development-company-hyderabad" },
      { label: "Android app development company in Hyderabad", href: "/android-app-development-company-hyderabad" },
      { label: "iOS app development company in Hyderabad", href: "/ios-app-development-company-hyderabad" },
      { label: "Hire mobile app developers in Hyderabad", href: "/hire-mobile-app-developers-hyderabad" },
    ],
  },

  {
    path: "/mvp-development-company-hyderabad",
    title: "MVP Development Company in Hyderabad for Startups",
    description:
      "MVP development company in Hyderabad: first versions of apps and SaaS products for startups, scoped in writing and live in weeks, code in your name.",
    h1: "MVP Development Company in Hyderabad",
    sub: "First versions of apps, web products and SaaS for startups, scoped tight and shipped in weeks.",
    intro:
      "ElevateBox is an MVP development company in Hyderabad that builds the first working version of a startup's app or software, scoped to the one thing it must prove, live in front of real users in weeks, and built so it can grow instead of being thrown away.",
    serviceType: "MVP software development",
    services: {
      h2: "MVP development services for startups",
      items: [
        { t: "Product scoping", d: "What the first version must prove, and what waits for version two.", href: "/services/product-design-and-ideation" },
        { t: "Clickable prototype", d: "Screens investors and first users can tap through before the build.", href: "/services/ui-ux-design" },
        { t: "MVP app development", d: "Android and iPhone from one Flutter or React Native codebase.", href: "/services/mobile-app-development" },
        { t: "SaaS MVP", d: "Sign-up, billing, roles and an admin panel, ready for paying users.", href: "/services/saas-paas-development" },
        { t: "AI MVP", d: "An AI feature proved on real data before you invest in scale.", href: "/ai-solutions" },
        { t: "After the MVP", d: "Analytics wired in, then the version two the data asks for.", href: "/services/web-development" },
      ],
    },
    why: {
      h2: "Why Hyderabad founders build their MVP with ElevateBox",
      points: [
        { t: "Engineers who have founded and scaled", d: "Founding engineers at ClickPe (YC W23) and an AI startup acquired by Microsoft." },
        { t: "Price known before you start", d: "A ₹3,500 requirement analysis ends in a written quotation and timeline." },
        { t: "Code in your name", d: "Repository, cloud and store accounts are yours from day one, ready for due diligence." },
        { t: "Built to grow", d: "The same codebase carries you past the MVP, so you don't pay for a rewrite at seed stage." },
      ],
    },
    ai: { h2: "AI in your first version", lead: "If AI is the product, we prove it works on your data inside the MVP, not after the raise.", items: AI_ITEMS },
    process: {
      h2: "How we build your MVP",
      steps: [
        { t: "Requirement analysis", d: "A paid call that ends in a written scope, quotation and timeline.", when: "Week 1" },
        { t: "Prototype", d: "Clickable screens you can show to users and investors.", when: "Weeks 2–3" },
        { t: "Build sprints", d: "Two-week sprints, each ending in something you can use.", when: "Every 2 weeks" },
        { t: "Launch", d: "Store listings or a live web app, with analytics and crash reporting on.", when: "End of build" },
        { t: "Learn and iterate", d: "We read the usage data with you and scope version two.", when: "After launch" },
      ],
    },
    stack: { h2: "MVP technology stack", groups: STACK_APP },
    industries: { h2: "Startup sectors we have built for", items: INDUSTRIES_APP },
    cases: { h2: "Products we took from idea to live", slugs: ["oneasy", "8meds", "vamshi-farms"] },
    cost: {
      h2: "How much does MVP development cost in Hyderabad?",
      lead: "An MVP's cost is mostly scope. These decide it; we fix it in writing after a ₹3,500 requirement analysis.",
      drivers: [
        ["The one thing to prove", "The narrower the first version, the faster and cheaper it ships."],
        ["Platforms", "Web only, mobile only, or both from one codebase."],
        ["Accounts and payments", "Sign-up, roles, Razorpay or Stripe billing."],
        ["Integrations", "WhatsApp, SMS, maps, CRMs or other APIs."],
        ["AI", "Whether AI is the product or a feature, and how accurate it must be."],
      ],
    },
    faqs: [
      { q: "How long does it take to build an MVP?", a: "It depends on scope. The requirement analysis fixes the timeline in writing; the build then runs in two-week sprints, each ending in something you can use." },
      { q: "How much does an MVP cost for a startup in Hyderabad?", a: "Scope decides it. A ₹3,500 requirement analysis ends in a written quotation, so you know the full cost before development starts." },
      { q: "Will we have to rebuild the MVP after we raise?", a: "No. We build on the same stack a scaled product would use, so the MVP becomes version one instead of a throwaway." },
      { q: "Do you sign an NDA?", a: "Yes, before the first workshop." },
      { q: "Who owns the code and IP?", a: "You do, from the first commit. Everything is created in your company's accounts, which keeps investor due diligence simple." },
      ...SHARED_FAQS,
    ],
    related: [
      { label: "Software development company in Hyderabad", href: "/software-development-company-hyderabad" },
      { label: "Mobile app development company in Hyderabad", href: "/mobile-app-development-company-hyderabad" },
      { label: "Web development company in Hyderabad", href: "/web-development-company-hyderabad" },
      { label: "Best AI developers in Hyderabad", href: "/best-ai-developers-in-hyderabad" },
    ],
  },

  {
    path: "/app-development-company-telangana",
    title: "App Development Company in Telangana",
    description:
      "App and web development company in Telangana, based in Hyderabad, building for businesses in Warangal, Karimnagar, Nizamabad, Khammam and beyond.",
    h1: "App Development Company in Telangana",
    sub: "Mobile apps, websites and AI for businesses across Telangana, from a Hyderabad team that speaks Telugu.",
    intro:
      "ElevateBox is an app and web development company in Telangana, based in Hyderabad, that builds mobile apps, websites and AI tools for businesses across the state, including Warangal, Karimnagar, Nizamabad, Khammam and Mahbubnagar, with discussions in Telugu, Hindi or English.",
    serviceType: "Mobile app and web development",
    areas: ["Telangana", "Hyderabad", "Warangal", "Karimnagar", "Nizamabad", "Khammam", "Mahbubnagar"],
    services: {
      h2: "What we build for Telangana businesses",
      items: [
        { t: "Mobile apps", d: "Android and iPhone apps for customers, staff and field teams.", href: "/mobile-app-development-company-hyderabad" },
        { t: "Websites", d: "Fast, search-ready websites that bring in enquiries.", href: "/web-development-company-hyderabad" },
        { t: "E-commerce", d: "Online stores with UPI checkout and delivery tracking.", href: "/services/ecommerce-development" },
        { t: "Business software", d: "Billing, inventory, CRM and staff apps that replace spreadsheets.", href: "/software-development-company-hyderabad" },
        { t: "Telugu AI calling", d: "AI phone calls that speak Telugu, Hindi and English.", href: "https://agents.elevatebox.in" },
        { t: "Digital marketing", d: "Google search and Meta ads that bring in local customers.", href: "/services/digital-marketing" },
      ],
    },
    why: {
      h2: "Why Telangana businesses work with ElevateBox",
      points: [
        { t: "Talk in Telugu", d: "Requirement calls, demos and training in Telugu, Hindi or English, whichever your team prefers." },
        { t: "Built for local customers", d: "Apps tested on budget Android phones and weak networks, the way users outside the city use them." },
        { t: "1,400 apps built", d: "Across healthcare, commerce, education and AI, by the team that quotes it." },
        { t: "Price known before you start", d: "A ₹3,500 requirement analysis ends in a written quotation and timeline." },
      ],
    },
    ai: { h2: "AI that works in Telugu", lead: "Our own product, Voice by ElevateBox, makes AI calls in Telugu. We build the same into your app or business.", items: AI_ITEMS },
    process: { h2: "How we work with you, wherever you are in Telangana", steps: PROCESS_APP },
    stack: { h2: "Technology stack", groups: STACK_APP },
    industries: { h2: "Industries we build for across Telangana", items: INDUSTRIES_APP },
    cases: { h2: "Products we built and still run", slugs: ["vamshi-farms", "8meds", "medibag"] },
    cost: {
      h2: "How much does app development cost in Telangana?",
      lead: "The cost depends on the six things below, not on your city. We quote in writing after a ₹3,500 requirement analysis.",
      drivers: COST_DRIVERS,
    },
    faqs: [
      { q: "Do you work with businesses outside Hyderabad?", a: "Yes. We work with businesses across Telangana, including Warangal, Karimnagar, Nizamabad, Khammam and Mahbubnagar, over video calls and WhatsApp, and meet in person in Hyderabad or on site when the project needs it." },
      { q: "Can we discuss the project in Telugu?", a: "Yes. Requirement calls, demos and training can be in Telugu, Hindi or English." },
      { q: "Can the app itself be in Telugu?", a: "Yes. We build apps and websites in Telugu and English, and AI phone calls in Telugu through our own product, Voice by ElevateBox." },
      { q: "How much does app development cost in Telangana?", a: "The same as in Hyderabad: it depends on the screens, integrations, backend and AI features. A ₹3,500 requirement analysis ends in a written quotation before development starts." },
      ...SHARED_FAQS,
    ],
    related: [
      { label: "Mobile app development company in Hyderabad", href: "/mobile-app-development-company-hyderabad" },
      { label: "Web development company in Hyderabad", href: "/web-development-company-hyderabad" },
      { label: "Software development company in Hyderabad", href: "/software-development-company-hyderabad" },
      { label: "Telugu AI voice agents", href: "https://agents.elevatebox.in" },
    ],
  },
];

export const hydPage = (path: string) => HYD_PAGES.find((p) => p.path === path)!;

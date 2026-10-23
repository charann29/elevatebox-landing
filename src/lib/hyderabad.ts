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
];

export const hydPage = (path: string) => HYD_PAGES.find((p) => p.path === path)!;

// Single source of truth for every route, nav dropdown, and page body.
// ponytail: one data file + generic templates instead of ~160 hand-written pages.
// Edit copy here; routes, nav, sitemap and static params all derive from it.

export type Entry = {
  slug: string;
  name: string; // nav label
  title: string; // h1
  tagline: string;
  intro: string;
  bullets: { t: string; d: string }[];
};

export type Category = {
  key: string;
  label: string;
  base: string;
  blurb: string;
  items: Entry[];
};

const b = (...pairs: [string, string][]) => pairs.map(([t, d]) => ({ t, d }));

/* ------------------------------------------------------------------ */
/* SERVICES                                                            */
/* ------------------------------------------------------------------ */

const SERVICES: Entry[] = [
  {
    slug: "mobile-app-development",
    name: "Mobile App Development",
    title: "Mobile App Development Services",
    tagline: "Native and cross-platform apps that ship on time and stay maintainable.",
    intro:
      "We build mobile products end to end — discovery, design, engineering, store submission, and the unglamorous maintenance work that keeps an app alive after launch. Every build ships with tests, crash reporting, and a release pipeline your team can run without us.",
    bullets: b(
      ["Native iOS and Android", "Swift and Kotlin where platform depth matters — background work, widgets, deep OS integration."],
      ["Cross-platform builds", "Flutter or React Native when one codebase across both stores is the right economics."],
      ["Offline-first architecture", "Local state that survives bad networks, with conflict resolution you can reason about."],
      ["Store release management", "Signing, staged rollouts, review responses, and phased releases handled for you."],
      ["Instrumentation from day one", "Analytics and crash tracking wired before launch, not bolted on after the first outage."],
      ["Post-launch support", "SLA-backed fixes, OS-version upgrades, and dependency maintenance on a fixed monthly scope."],
    ),
  },
  {
    slug: "web-development",
    name: "Web Development",
    title: "Web Application Development",
    tagline: "Fast, accessible web apps built on frameworks that will still be supported next year.",
    intro:
      "From marketing sites that score well on Core Web Vitals to logged-in products handling real transaction volume. We pick boring, well-supported tooling and spend the saved complexity budget on the parts users actually touch.",
    bullets: b(
      ["Server-rendered by default", "Fast first paint and real SEO, without shipping a megabyte of JavaScript to get there."],
      ["Accessible interfaces", "Keyboard paths, focus management, and screen-reader labels treated as requirements, not polish."],
      ["API and integration work", "REST and GraphQL layers, third-party integrations, and webhook handling with retries."],
      ["Performance budgets", "Bundle and latency budgets enforced in CI so speed does not regress silently."],
      ["Design system delivery", "A component library your designers and engineers share, versioned and documented."],
      ["Migration from legacy stacks", "Incremental strangler-pattern migrations so you are never mid-rewrite with nothing shippable."],
    ),
  },
  {
    slug: "ui-ux-design",
    name: "UI/UX Design",
    title: "UI/UX Design Services",
    tagline: "Interfaces designed around what users are trying to finish, not what the org chart looks like.",
    intro:
      "Research, flows, wireframes, and high-fidelity design delivered as a working system — tokens, components, and states — so engineering builds what was designed instead of interpreting it.",
    bullets: b(
      ["User research and interviews", "Enough evidence to stop arguing about preferences and start deciding."],
      ["Information architecture", "Navigation and hierarchy that match the task, tested before a pixel is polished."],
      ["Interactive prototypes", "Clickable flows you can put in front of users a week before engineering starts."],
      ["Design systems and tokens", "Colour, type, spacing, and components as versioned tokens shared with code."],
      ["Every state designed", "Empty, loading, error, and permission-denied states specified — not left to the developer."],
      ["Usability testing", "Moderated sessions with recorded findings and a prioritised fix list."],
    ),
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    title: "Digital Marketing Services",
    tagline: "Measurable acquisition work with the attribution wired up before the spend starts.",
    intro:
      "SEO, paid acquisition, content, and lifecycle campaigns run against a single reporting model, so you can see which channel actually produced revenue instead of which one produced the most dashboards.",
    bullets: b(
      ["Technical and content SEO", "Crawlability, schema, internal linking, and content built for queries with real intent."],
      ["Paid search and social", "Campaign structure, creative testing, and budget pacing reviewed weekly."],
      ["Conversion rate optimisation", "Hypothesis-driven tests on the pages that carry the most traffic."],
      ["Lifecycle and email", "Onboarding, reactivation, and retention sequences tied to product events."],
      ["Analytics and attribution", "Clean event taxonomy and server-side tracking that survives ad blockers."],
      ["Reporting you can act on", "One monthly view of spend, pipeline, and cost per outcome — no vanity metrics."],
    ),
  },
  {
    slug: "gps-tracking-solutions",
    name: "GPS Tracking Solutions",
    title: "GPS Tracking & Fleet Software",
    tagline: "Live vehicle telemetry, geofencing, and fleet reporting on hardware you already own.",
    intro:
      "Tracking platforms for fleets, logistics operators, and vehicle owners — live location, trip history, driver behaviour, and alerting, built to work with common tracker hardware rather than locking you to one vendor.",
    bullets: b(
      ["Live location and trip replay", "Sub-minute position updates with a replayable history you can export."],
      ["Geofencing and alerts", "Entry, exit, dwell, and speed alerts routed to SMS, push, or webhook."],
      ["Driver behaviour scoring", "Harsh braking, acceleration, and idling surfaced per driver and per route."],
      ["Fuel and maintenance logs", "Consumption tracking and service reminders tied to odometer readings."],
      ["Multi-vendor hardware support", "Protocol adapters for common tracker models so you keep procurement leverage."],
      ["Operator dashboards", "Role-scoped views for dispatch, ops, and finance, each seeing only what they need."],
    ),
  },
  {
    slug: "product-design-and-ideation",
    name: "Product Design & Ideation",
    title: "Product Design & Ideation",
    tagline: "Turn a rough idea into a scoped, costed, testable product plan.",
    intro:
      "A structured discovery engagement that ends with a validated concept, a prioritised backlog, and an honest estimate — so the build decision is made with numbers rather than optimism.",
    bullets: b(
      ["Discovery workshops", "Stakeholders, users, and constraints mapped in the same room in the first week."],
      ["Opportunity sizing", "Which problems are worth solving, ranked by reach and effort."],
      ["Clickable concept", "A prototype real enough to test with users before committing an engineering budget."],
      ["Scoped MVP definition", "An explicit in/out list, so scope creep is a decision rather than an accident."],
      ["Technical feasibility review", "Architecture risks and third-party dependencies flagged before contracts are signed."],
      ["Costed delivery roadmap", "Phases, timelines, and team shape you can take to a board."],
    ),
  },
  {
    slug: "data-engineering",
    name: "Data Engineering",
    title: "Data Engineering Services",
    tagline: "Pipelines, warehouses, and models that make your reporting trustworthy.",
    intro:
      "We build the plumbing between your operational systems and the decisions people make from them — ingestion, transformation, testing, and documentation, so numbers stop disagreeing between dashboards.",
    bullets: b(
      ["Ingestion pipelines", "Batch and streaming ingestion with retries, backfills, and idempotent writes."],
      ["Warehouse modelling", "Dimensional models built for the questions the business actually asks."],
      ["Data quality tests", "Freshness, uniqueness, and referential checks run on every pipeline execution."],
      ["Orchestration", "Scheduled DAGs with alerting, so a silent failure does not become a quarter-end surprise."],
      ["Governance and lineage", "Column-level lineage and access controls documented, not tribal knowledge."],
      ["BI enablement", "Semantic layer and dashboards so analysts stop rewriting the same joins."],
    ),
  },
  {
    slug: "robotic-process-automation",
    name: "Robotic Process Automation",
    title: "Robotic Process Automation (RPA)",
    tagline: "Automate the repetitive back-office work that is currently done by copy-paste.",
    intro:
      "We map the manual process, automate the deterministic parts, and leave a clear human escalation path for the rest. Automation that fails loudly beats automation nobody trusts.",
    bullets: b(
      ["Process discovery", "Time-and-motion mapping to find which tasks are actually worth automating."],
      ["Attended and unattended bots", "Bots that assist a human in-session, or run headless on a schedule."],
      ["Document processing", "Extraction from invoices, forms, and statements with a confidence threshold for review."],
      ["Legacy system bridging", "Automation over systems with no API, without waiting for a vendor roadmap."],
      ["Exception handling", "Every failure routed to a person with the context needed to resolve it."],
      ["Audit trails", "Every bot action logged for compliance review."],
    ),
  },
  {
    slug: "saas-paas-development",
    name: "SaaS & PaaS Development",
    title: "SaaS & PaaS Product Development",
    tagline: "Multi-tenant platforms with billing, roles, and isolation designed in from the start.",
    intro:
      "Building a SaaS product means solving tenancy, entitlements, billing, and onboarding before you solve your actual domain. We bring those solved so your team can focus on the differentiator.",
    bullets: b(
      ["Tenancy and isolation", "Row-level or schema-level isolation chosen deliberately, with the trade-offs written down."],
      ["Subscription billing", "Plans, trials, proration, dunning, and usage metering wired to a real payment provider."],
      ["Roles and permissions", "Org-level RBAC that survives the first enterprise security questionnaire."],
      ["Self-serve onboarding", "Signup to first value without a sales call, instrumented end to end."],
      ["Usage analytics", "Per-tenant activity so customer success knows who is about to churn."],
      ["Scaling path", "A capacity plan that tells you what breaks at 10x and what it costs to fix."],
    ),
  },
  {
    slug: "resource-augmentation",
    name: "Resource Augmentation",
    title: "Resource Augmentation Services",
    tagline: "Vetted engineers embedded in your team, on your process, reporting to your leads.",
    intro:
      "When you need throughput rather than a vendor, we place engineers who work inside your repositories, your stand-ups, and your review process — with a defined ramp-up plan and an exit that does not leave a knowledge hole.",
    bullets: b(
      ["Screened for your stack", "Candidates tested on the technologies you actually run, not a generic aptitude test."],
      ["Embedded in your process", "Your tickets, your reviews, your definition of done."],
      ["Structured ramp-up", "A documented 30-day onboarding plan with checkpoints."],
      ["Flexible scaling", "Scale the team up or down with a defined notice period, no renegotiation."],
      ["Knowledge retention", "Documentation and handover built into the engagement, not promised at the end."],
      ["Time-zone overlap", "Guaranteed daily overlap hours agreed before the contract starts."],
    ),
  },
  {
    slug: "it-staffing",
    name: "IT Staffing",
    title: "IT Staffing & Recruitment",
    tagline: "Permanent technical hiring with a shortlist you can actually interview.",
    intro:
      "Sourcing, screening, and coordination for permanent engineering roles — with technical screening done by engineers, so your team spends interview time on candidates who can pass.",
    bullets: b(
      ["Engineer-led screening", "Technical filter applied before a CV reaches your inbox."],
      ["Calibrated shortlists", "A small, relevant list with written reasoning per candidate."],
      ["Interview coordination", "Scheduling, feedback collection, and candidate communication handled."],
      ["Offer and negotiation support", "Market benchmarks and counter-offer risk flagged before you make an offer."],
      ["Replacement guarantee", "A defined replacement window if a placement does not work out."],
      ["Pipeline reporting", "Weekly funnel numbers so you can see where candidates drop off."],
    ),
  },
  {
    slug: "cms-development",
    name: "CMS Development",
    title: "CMS Development Services",
    tagline: "Content platforms your marketing team can run without filing a ticket.",
    intro:
      "Headless or traditional CMS builds with editing experiences designed for the people who use them daily — previews that work, structured content, and publishing workflows with approvals.",
    bullets: b(
      ["Headless architecture", "Content decoupled from presentation, delivered to web, app, and partner surfaces."],
      ["Structured content models", "Reusable content types instead of a wall of rich-text blobs."],
      ["Live preview", "Editors see the real rendered page before publishing."],
      ["Editorial workflow", "Drafts, scheduling, approvals, and roll-back to a previous version."],
      ["Localisation", "Multi-locale content with translation status visible per field."],
      ["Migration from legacy CMS", "Scripted content migration with a verification report, not a manual re-entry project."],
    ),
  },
  {
    slug: "blockchain-development",
    name: "Blockchain Development",
    title: "Blockchain Development Services",
    tagline: "Smart contracts and distributed ledger work, audited before anything touches mainnet.",
    intro:
      "We build on-chain systems where the trust model genuinely requires one — and say so plainly when a database would serve you better. Every contract ships with tests, invariants, and an external audit path.",
    bullets: b(
      ["Smart contract engineering", "Solidity and Rust contracts written against explicit invariants."],
      ["Security review", "Internal review plus coordination with a third-party auditor before deployment."],
      ["Wallet and key handling", "Custody and signing flows designed with recovery in mind."],
      ["Token and NFT standards", "Standards-compliant implementations, with the compliance questions raised early."],
      ["Off-chain integration", "Indexers, event listeners, and reconciliation between chain state and your database."],
      ["Honest scoping", "If a centralised system fits better, we tell you before you spend the budget."],
    ),
  },
  {
    slug: "iot-development",
    name: "IoT Development",
    title: "IoT Development Services",
    tagline: "Devices, gateways, and dashboards — with the calibration knobs left in.",
    intro:
      "Connected-device systems from firmware to fleet dashboard. Real hardware drifts, so we build calibration, over-the-air updates, and degraded-mode behaviour in from the first prototype.",
    bullets: b(
      ["Firmware and embedded work", "Low-power device code with watchdogs and safe recovery states."],
      ["Gateway and protocol layer", "MQTT, BLE, LoRa and cellular transports with buffering for lost connectivity."],
      ["Device fleet management", "Provisioning, OTA updates, and staged rollouts across thousands of units."],
      ["Telemetry pipelines", "High-cardinality time-series ingestion with downsampling and retention policies."],
      ["Calibration and drift handling", "Per-device offsets exposed as configuration, because sensors read off in the field."],
      ["Operator dashboards", "Live status, alerting, and remote diagnostics for the people running the fleet."],
    ),
  },
  {
    slug: "erp-software-development",
    name: "ERP Software Development",
    title: "ERP Software Development",
    tagline: "Custom ERP modules that fit your process instead of forcing a re-org.",
    intro:
      "Off-the-shelf ERP fits about eighty percent of most businesses. We build the remaining twenty — the modules and integrations specific to how you actually operate — and connect them cleanly to what you already run.",
    bullets: b(
      ["Custom modules", "Inventory, procurement, production, and finance modules matched to your workflow."],
      ["Integration with existing ERP", "Clean interfaces to SAP, Oracle, Odoo or Tally rather than a rip-and-replace."],
      ["Approval workflows", "Multi-level approvals with delegation and full audit history."],
      ["Role-based access", "Fine-grained permissions that satisfy segregation-of-duties requirements."],
      ["Reporting and compliance", "Statutory reports generated from the same data the operators use."],
      ["Phased rollout", "Module-by-module deployment so the business never stops for a big-bang cutover."],
    ),
  },
  {
    slug: "crm-software-development",
    name: "CRM Software Development",
    title: "CRM Software Development",
    tagline: "A pipeline your sales team updates because it helps them, not because you asked.",
    intro:
      "Custom CRM builds and CRM integrations centred on reducing data entry — automatic activity capture, sensible defaults, and reporting that reflects reality rather than what someone remembered to log.",
    bullets: b(
      ["Pipeline and stage modelling", "Stages that match your real sales motion, with exit criteria defined."],
      ["Automatic activity capture", "Email and call logging without manual entry."],
      ["Lead routing and scoring", "Rules-based assignment with an override path for the sales lead."],
      ["Quote and proposal flow", "Templated documents generated from opportunity data."],
      ["Forecasting", "Weighted pipeline reporting that leadership can trust."],
      ["Integrations", "Two-way sync with marketing, billing, and support systems."],
    ),
  },
  {
    slug: "ecommerce-development",
    name: "E-commerce Development",
    title: "E-commerce Development Services",
    tagline: "Storefronts built around checkout conversion and operational reality.",
    intro:
      "Storefront, catalogue, checkout, and the back-office work that decides whether an order actually gets delivered. Built on platforms that handle payments and tax properly rather than a homegrown cart.",
    bullets: b(
      ["Catalogue and merchandising", "Variants, bundles, and search that copes with a large SKU count."],
      ["Checkout optimisation", "Fewer steps, saved addresses, and wallet support to cut abandonment."],
      ["Payments and tax", "Multiple gateways, GST handling, refunds, and reconciliation."],
      ["Inventory and fulfilment", "Stock sync across channels with warehouse and courier integrations."],
      ["Returns and support flows", "Self-serve returns that do not generate a support ticket each time."],
      ["Performance at sale peaks", "Load-tested for campaign traffic before the campaign, not during."],
    ),
  },
  {
    slug: "chrome-extension-development",
    name: "Chrome Extension Development",
    title: "Chrome & Browser Extension Development",
    tagline: "Manifest V3 extensions that survive store review and Chrome's next update.",
    intro:
      "Browser extensions for productivity, internal tooling, and product companion experiences — built to Manifest V3, with permissions kept minimal so store review is straightforward.",
    bullets: b(
      ["Manifest V3 from the start", "Service workers and declarative rules, not a V2 port waiting to break."],
      ["Minimal permission scope", "Only the permissions the feature needs, which speeds review and user trust."],
      ["Cross-browser builds", "One codebase targeting Chrome, Edge, and Firefox where feasible."],
      ["Secure messaging", "Hardened content-script and background communication."],
      ["Store submission", "Listing assets, privacy disclosures, and review responses handled."],
      ["Enterprise deployment", "Managed policy installation for organisation-wide rollout."],
    ),
  },
  {
    slug: "business-protection-services",
    name: "Business Protection Services",
    title: "Business Protection & Security Services",
    tagline: "Security work sized for a growing business, not a bank's compliance department.",
    intro:
      "Practical hardening of the systems you already run — access control, backups you have actually restored from, dependency hygiene, and an incident plan that exists before you need it.",
    bullets: b(
      ["Security assessment", "A prioritised findings list with effort estimates, not a 200-page PDF."],
      ["Access and identity", "SSO, MFA, and least-privilege review across your tools."],
      ["Backup and recovery drills", "Restores tested on a schedule, with recovery time measured."],
      ["Dependency and patch hygiene", "Automated vulnerability scanning wired into CI."],
      ["Incident response plan", "Roles, contacts, and communication templates agreed in advance."],
      ["Team training", "Phishing and secure-handling training that people finish."],
    ),
  },
  {
    slug: "financial-product-development",
    name: "Financial Product Development",
    title: "Financial Product Development",
    tagline: "Money-movement systems built with reconciliation and audit as first-class features.",
    intro:
      "Lending, payments, and wealth products where correctness is not negotiable. Ledgers are append-only, every balance is derivable, and reconciliation runs continuously rather than at month end.",
    bullets: b(
      ["Double-entry ledgers", "Immutable ledger design where every balance can be reconstructed from entries."],
      ["Payment rail integration", "UPI, cards, net banking, and payouts with idempotency and retry safety."],
      ["KYC and onboarding", "Identity verification flows with document capture and manual review queues."],
      ["Reconciliation", "Continuous matching against provider settlements with exception queues."],
      ["Regulatory reporting", "Reports generated from source data, with retention and audit trails."],
      ["Fraud controls", "Velocity rules and anomaly checks with a reviewable decision log."],
    ),
  },
];

/* ------------------------------------------------------------------ */
/* TECHNOLOGIES                                                        */
/* ------------------------------------------------------------------ */

const tech = (
  slug: string,
  name: string,
  tagline: string,
  intro: string,
  bl: [string, string][],
): Entry => ({
  slug,
  name,
  title: `${name} Development Services`,
  tagline,
  intro,
  bullets: b(...bl),
});

const TECHNOLOGIES: Entry[] = [
  tech("flutter", "Flutter", "One codebase, both stores, without the usual cross-platform tax.",
    "Flutter is our default when a product needs to reach iOS and Android on one budget and the interface is more custom than platform-standard. We keep platform channels thin and native modules isolated so the escape hatch stays available.",
    [["Single codebase delivery", "One team shipping both stores, with platform differences handled explicitly."],
     ["Custom UI without compromise", "Flutter's rendering model makes bespoke interfaces cheaper than native."],
     ["Native interop", "Platform channels for camera, Bluetooth, and OS features that need real native code."],
     ["State management that scales", "A chosen, documented pattern rather than three competing ones in one repo."],
     ["Testing at three levels", "Unit, widget, and integration tests running in CI on every push."],
     ["Web and desktop reuse", "Shared business logic when a companion surface is on the roadmap."]]),
  tech("react-native", "React Native", "Cross-platform mobile that shares skills with your web team.",
    "React Native suits teams that already run React on the web — shared language, shared people, and a large library ecosystem. We use the new architecture and keep the native side small and well-tested.",
    [["Shared team skills", "Your React engineers contribute to mobile without a retraining budget."],
     ["New architecture", "Fabric and TurboModules for predictable performance on lower-end devices."],
     ["Over-the-air updates", "Ship JavaScript fixes without a full store review cycle."],
     ["Native module development", "Custom native modules written and tested when the ecosystem falls short."],
     ["Code sharing with web", "Business logic and validation shared between web and mobile packages."],
     ["Performance profiling", "Frame-rate and startup profiling on real low-end hardware, not just a simulator."]]),
  tech("android", "Android", "Native Android built for the device range your users actually own.",
    "Kotlin-first Android development with Jetpack Compose, targeting the OS versions and hardware your analytics show — not the newest flagship in the office.",
    [["Kotlin and Compose", "Modern declarative UI with a maintainable, testable architecture."],
     ["Wide device support", "Tested against the OS and screen mix in your real user base."],
     ["Background work done right", "WorkManager and foreground services that survive aggressive OEM battery policies."],
     ["Play Store compliance", "Data safety declarations, target-SDK deadlines, and policy changes tracked."],
     ["Play Console release management", "Staged rollouts, pre-launch reports, and vitals monitoring."],
     ["Deep OS integration", "Widgets, shortcuts, notifications, and share targets built properly."]]),
  tech("ios", "iOS", "Native iOS that feels like it belongs on the platform.",
    "Swift and SwiftUI applications built to Apple's conventions, with App Store review requirements handled during development rather than discovered at submission.",
    [["Swift and SwiftUI", "Modern, concise UI code with UIKit interop where it is still needed."],
     ["Review-ready from the start", "Privacy manifests, tracking disclosures, and guideline risks addressed early."],
     ["Apple ecosystem features", "Widgets, App Clips, Live Activities, Sign in with Apple, and iCloud sync."],
     ["Accessibility built in", "VoiceOver, Dynamic Type, and contrast handled as a requirement."],
     ["TestFlight distribution", "Structured beta cycles with tester cohorts and feedback triage."],
     ["Performance and battery", "Instruments profiling for launch time, memory, and energy use."]]),
  tech("kotlin", "Kotlin", "Kotlin for Android, backend, and shared multiplatform logic.",
    "Kotlin is our default JVM language — null safety, coroutines, and a standard library that removes a lot of defensive code. We also use Kotlin Multiplatform to share domain logic across mobile targets.",
    [["Null-safe by design", "A whole class of runtime crashes removed by the type system."],
     ["Structured concurrency", "Coroutines with proper cancellation and scoping instead of leaked threads."],
     ["Kotlin Multiplatform", "Shared domain and networking code across Android and iOS."],
     ["Server-side Kotlin", "Ktor and Spring services with the same language as your mobile team."],
     ["Java interop", "Incremental adoption inside an existing Java codebase."],
     ["Test-first delivery", "Coroutine-aware testing with deterministic scheduling."]]),
  tech("swift", "Swift", "Dedicated Swift engineers for iOS and Apple platform work.",
    "Hire Swift developers who can work inside your existing codebase — reviewing, refactoring, and shipping alongside your team rather than delivering a black box.",
    [["Experienced Swift engineers", "Screened on real codebases, not whiteboard puzzles."],
     ["Works in your repo", "Your branching model, your review standards, your CI."],
     ["Concurrency migration", "Moving legacy completion-handler code to async/await safely."],
     ["Architecture refactoring", "Untangling massive view controllers into testable units."],
     ["SwiftUI adoption", "Incremental migration with UIKit interop where it makes sense."],
     ["Knowledge transfer", "Documented decisions so your team owns the code afterwards."]]),
  tech("angular", "Angular", "Angular applications for teams that want structure enforced by the framework.",
    "Angular suits large teams and long-lived enterprise applications where consistency across many contributors matters more than framework flexibility.",
    [["Opinionated structure", "A conventional layout that new contributors can navigate on day one."],
     ["Standalone components and signals", "Modern Angular patterns, not a decade-old module architecture."],
     ["Typed forms and validation", "Complex form flows with type safety end to end."],
     ["RxJS done carefully", "Reactive streams used where they help, avoided where they obscure."],
     ["Lazy-loaded routing", "Route-level code splitting so large apps still start fast."],
     ["Upgrade path", "Version-by-version upgrades with the official migration schematics."]]),
  tech("vuejs", "Vue.js", "Vue applications that stay readable as the team grows.",
    "Vue with the Composition API and TypeScript — a gentle learning curve for new contributors with enough structure to keep a large codebase coherent.",
    [["Composition API", "Reusable logic composables instead of copy-pasted mixins."],
     ["Nuxt for SSR", "Server rendering, routing, and SEO handled by the framework."],
     ["TypeScript throughout", "Typed props, emits, and stores for confident refactoring."],
     ["Pinia state management", "A simple, typed store without the boilerplate."],
     ["Component testing", "Vitest and Testing Library on the components that carry real logic."],
     ["Migration from Vue 2", "A staged upgrade path with compatibility builds."]]),
  tech("nextjs", "Next.js", "Next.js App Router applications on modern rendering strategies.",
    "Next.js is our default for web products — server components by default, streaming where it helps, and static generation where content allows. Deployed on infrastructure that matches the rendering model.",
    [["App Router architecture", "Server components by default, client components only where interaction demands."],
     ["Rendering strategy per route", "Static, incremental, or dynamic chosen per page rather than globally."],
     ["Server actions", "Mutations without hand-writing an API layer for every form."],
     ["Caching and revalidation", "Explicit cache tags and revalidation, so stale content is a choice."],
     ["Image and font optimisation", "Built-in optimisation to keep Core Web Vitals green."],
     ["Deployment pipeline", "Preview deployments per pull request with production promotion."]]),
  tech("nodejs", "Node.js", "Node.js services and APIs built for throughput and observability.",
    "Backend services in TypeScript on Node — well-structured, instrumented, and load-tested, with an operational story that does not depend on one person knowing the runbook.",
    [["TypeScript-first services", "Shared types between API and client so contract drift is caught at build time."],
     ["Framework fit", "Express, Fastify, NestJS, or Hono chosen for the workload rather than habit."],
     ["Streaming and real-time", "Server-sent events and WebSockets for live features."],
     ["Queues and background jobs", "Durable job processing with retries and dead-letter handling."],
     ["Observability", "Structured logs, traces, and metrics wired before launch."],
     ["Load testing", "Capacity numbers measured, so scaling decisions are not guesses."]]),
  tech("php", "PHP", "Modern PHP applications and legacy PHP rescue work.",
    "Laravel and Symfony builds on current PHP versions, plus the less glamorous work of bringing an inherited PHP codebase back to something maintainable and secure.",
    [["Laravel and Symfony", "Mature frameworks with a large hiring pool and long support windows."],
     ["Legacy modernisation", "Incremental upgrades from unsupported PHP versions without a rewrite."],
     ["Security hardening", "Injection, session, and file-upload issues found and fixed."],
     ["Test coverage retrofit", "Characterisation tests added before refactoring inherited code."],
     ["Performance tuning", "Query profiling, caching, and opcache configuration."],
     ["Deployment automation", "Zero-downtime deploys replacing manual FTP releases."]]),
  tech("java", "Java", "Enterprise Java services built to run for a decade.",
    "Spring Boot services for systems where stability, tooling, and a deep hiring pool matter more than novelty — with modern Java features used where they reduce code rather than impress.",
    [["Spring Boot services", "Conventional structure with production-ready defaults."],
     ["Modern JVM", "Current LTS releases with virtual threads where concurrency benefits."],
     ["Transactional integrity", "Correct transaction boundaries and isolation levels, documented."],
     ["Integration ecosystem", "Kafka, JMS, and enterprise connectors handled properly."],
     ["Test pyramid", "Unit, slice, and container-backed integration tests in CI."],
     ["Migration from monolith", "Strangler-pattern extraction with a working system at every step."]]),
  tech("python", "Python", "Python services, automation, and data workloads.",
    "Python for APIs, automation, and data-heavy workloads — typed, tested, and packaged so it runs the same on a laptop and in production.",
    [["FastAPI services", "Typed, documented APIs with automatic schema generation."],
     ["Data and ML workloads", "Pipelines and model-serving with reproducible environments."],
     ["Automation and scripting", "Internal tooling that replaces recurring manual work."],
     ["Type checking", "Static typing enforced in CI so refactors are safe."],
     ["Packaging and deployment", "Reproducible builds with pinned dependencies."],
     ["Async where it earns it", "Asynchronous IO for high-concurrency endpoints, sync where it is simpler."]]),
  tech("nosql", "NoSQL", "Document, key-value, and wide-column databases modelled for your access patterns.",
    "NoSQL works when the data model is designed around queries rather than normalised on instinct. We model access patterns first and set retention, indexing, and cost expectations explicitly.",
    [["Access-pattern modelling", "Schema designed from the queries the application will actually run."],
     ["MongoDB and DynamoDB", "Document and key-value stores with index strategies that control cost."],
     ["Redis caching", "Cache layers with explicit invalidation rather than hopeful TTLs."],
     ["Sharding and replication", "Partitioning strategy chosen before the data outgrows one node."],
     ["Migration from relational", "Staged dual-write migration with verification at each phase."],
     ["Cost monitoring", "Read/write unit tracking so a query change does not triple the bill."]]),
  tech("sql-databases", "SQL Databases", "Oracle, MySQL, PostgreSQL and SQL Server work — modelling, tuning, migration.",
    "Relational database engineering: schema design, query tuning, replication, and migrations between engines, done with a rollback plan at every step.",
    [["Schema design", "Normalised where correctness matters, denormalised deliberately where speed does."],
     ["Query and index tuning", "Execution-plan analysis on the queries that actually dominate load."],
     ["High availability", "Replication, failover, and tested recovery procedures."],
     ["Cross-engine migration", "Oracle to PostgreSQL and similar moves with data verification reports."],
     ["Zero-downtime migrations", "Expand-contract schema changes so deploys never require an outage."],
     ["Backup verification", "Restores tested on a schedule, with recovery time measured and reported."]]),
  tech("aws", "AWS", "AWS architecture, migration, and cost control.",
    "Well-architected AWS environments with infrastructure as code, least-privilege IAM, and a cost model you can explain to finance.",
    [["Infrastructure as code", "Terraform or CDK — no click-ops, every change reviewable."],
     ["Least-privilege IAM", "Scoped roles and policies, audited rather than assumed."],
     ["Serverless and containers", "Lambda, ECS, or EKS chosen for the workload and the team."],
     ["Networking and security", "VPC design, private subnets, and security groups documented."],
     ["Cost optimisation", "Right-sizing, savings plans, and tagging so spend is attributable."],
     ["Migration planning", "Lift-and-shift or re-architecture, with the trade-offs costed."]]),
  tech("azure", "Microsoft Azure", "Azure environments for organisations already in the Microsoft ecosystem.",
    "Azure infrastructure and application delivery, with Entra ID, governance, and hybrid connectivity handled the way enterprise IT expects.",
    [["Entra ID integration", "Identity, conditional access, and SSO across your estate."],
     ["App Service and AKS", "Managed hosting or Kubernetes, chosen for operational capacity."],
     ["Landing zones", "Subscription structure, policy, and governance set up correctly from the start."],
     ["Hybrid connectivity", "Site-to-site and ExpressRoute links to on-premise systems."],
     ["Azure DevOps pipelines", "Build and release pipelines with approvals and environment gates."],
     ["Cost management", "Budgets, alerts, and reservation planning."]]),
  tech("google-cloud", "Google Cloud", "GCP for data, ML, and container workloads.",
    "Google Cloud engineering with a focus on BigQuery-centred data platforms and GKE-based application hosting.",
    [["BigQuery data platform", "Warehouse design with partitioning and clustering that controls query cost."],
     ["GKE and Cloud Run", "Containers on managed Kubernetes or fully managed serverless containers."],
     ["Vertex AI", "Model training and serving pipelines with versioned artefacts."],
     ["Pub/Sub event pipelines", "Decoupled event streaming with replay capability."],
     ["IAM and org policy", "Project structure and permissions designed for least privilege."],
     ["Cost visibility", "Per-project billing export and query cost attribution."]]),
  tech("figma", "Figma", "Figma design systems and developer-ready handoff.",
    "Design delivered in Figma as a working system — variables, components, and auto-layout — so engineering reads specs from the file instead of asking in Slack.",
    [["Component libraries", "Published, versioned libraries with variants and documented usage."],
     ["Design variables", "Colour, spacing, and type tokens that map directly to code tokens."],
     ["Auto layout throughout", "Responsive frames that show how a component behaves at any width."],
     ["Prototype flows", "Interactive prototypes for user testing and stakeholder sign-off."],
     ["Developer handoff", "Specs, states, and edge cases annotated in the file."],
     ["Code Connect mapping", "Figma components linked to real code components."]]),
  tech("adobe-xd", "Adobe XD", "Adobe XD design and prototyping for teams standardised on Creative Cloud.",
    "Interface design, prototyping, and asset delivery in Adobe XD, integrated with the rest of your Creative Cloud workflow.",
    [["Interface design", "Screens and states designed against a shared component set."],
     ["Interactive prototypes", "Auto-animate transitions for realistic user testing."],
     ["Creative Cloud workflow", "Assets and libraries shared with Photoshop and Illustrator work."],
     ["Responsive resize", "Layouts verified across breakpoints before handoff."],
     ["Developer specs", "Shared links with measurements and downloadable assets."],
     ["Migration to Figma", "Structured conversion if you are moving tools."]]),
  tech("photoshop", "Photoshop", "Photoshop production work for campaigns, catalogues, and app assets.",
    "High-volume image production and retouching — product photography, campaign creative, and store assets — delivered in the formats and sizes each channel needs.",
    [["Product retouching", "Consistent lighting, background, and colour across a full catalogue."],
     ["Campaign creative", "Ad and social creative across every required size."],
     ["App store assets", "Screenshots, feature graphics, and icons at every required resolution."],
     ["Batch automation", "Actions and scripts for repeatable, high-volume output."],
     ["Colour management", "Consistent output across print and screen profiles."],
     ["Source file delivery", "Layered, named, organised files you can hand to any designer."]]),
  tech("web-frameworks", "Web Frameworks", "Framework selection and architecture for long-lived web products.",
    "Independent framework evaluation — matching the choice to your team's skills, hiring market, and support horizon rather than to what is trending this quarter.",
    [["Objective evaluation", "A written comparison against your constraints, with a recommendation."],
     ["Team-fit weighting", "The framework your team can staff and maintain, not the fastest benchmark."],
     ["Support horizon", "Release cadence and LTS windows factored into the decision."],
     ["Reference architecture", "A documented starting structure your team can extend."],
     ["Migration strategy", "Incremental paths off a framework that is no longer serving you."],
     ["Performance baselines", "Measured baselines so future regressions are visible."]]),
];

/* ------------------------------------------------------------------ */
/* INDUSTRIES                                                          */
/* ------------------------------------------------------------------ */

const ind = (
  slug: string,
  name: string,
  tagline: string,
  intro: string,
  bl: [string, string][],
): Entry => ({
  slug,
  name,
  title: `${name} App Development`,
  tagline,
  intro,
  bullets: b(...bl),
});

const INDUSTRIES: Entry[] = [
  ind("healthcare-fitness", "Healthcare & Fitness", "Clinical and wellness apps with privacy designed in, not added later.",
    "Patient-facing and clinician-facing products where data sensitivity, consent, and audit trails are core requirements rather than a compliance checkbox at the end.",
    [["Consent and data handling", "Explicit consent capture with per-purpose granularity and revocation."],
     ["Wearable integration", "Apple Health, Google Fit, and device SDK sync with conflict resolution."],
     ["Care and workout plans", "Structured programmes with adherence tracking and reminders."],
     ["Clinician dashboards", "Role-scoped views with full access audit logs."],
     ["Teleconsultation", "Video sessions with scheduling, notes, and prescription flows."],
     ["Encrypted at rest and in transit", "Sensitive fields encrypted with a documented key rotation process."]]),
  ind("education", "Education", "Learning products that hold attention past week one.",
    "Course delivery, assessment, and cohort management platforms built around completion rather than enrolment — because enrolment is the metric that lies.",
    [["Course and path delivery", "Structured sequences with prerequisites and progress tracking."],
     ["Assessment engine", "Quizzes, coding challenges, and rubric-based grading."],
     ["Live and recorded classes", "Streaming, recording, and searchable transcripts."],
     ["Cohort management", "Batches, mentors, and attendance with automated nudges."],
     ["Offline access", "Downloadable content for learners on unreliable connections."],
     ["Learning analytics", "Where learners stall, surfaced to instructors while it still matters."]]),
  ind("fintech", "Fintech", "Financial apps where reconciliation is a feature, not a spreadsheet.",
    "Payments, lending, and investment products built on correct ledger design, with regulatory and audit requirements accounted for in the architecture.",
    [["Ledger correctness", "Double-entry accounting where every balance is derivable from entries."],
     ["Payment integrations", "UPI, cards, and net banking with idempotent, retry-safe flows."],
     ["KYC and onboarding", "Document capture, verification, and manual review queues."],
     ["Risk and fraud controls", "Velocity limits and anomaly detection with a reviewable decision log."],
     ["Statements and reporting", "Customer statements and regulatory reports from the same source data."],
     ["Security posture", "Encryption, secret management, and penetration testing before launch."]]),
  ind("ecommerce", "E-commerce", "Shopping apps built for conversion and for the warehouse behind it.",
    "Consumer commerce experiences with catalogue, checkout, and fulfilment designed together — because a great checkout that cannot promise a delivery date does not convert twice.",
    [["Search and discovery", "Faceted search and recommendations that work at a large SKU count."],
     ["One-page checkout", "Fewer fields, saved addresses, and wallet support."],
     ["Order and delivery tracking", "Real fulfilment status, not a static estimate."],
     ["Returns self-service", "Return initiation and pickup scheduling without a support ticket."],
     ["Loyalty and offers", "Coupons, tiers, and referrals with abuse controls."],
     ["Peak-load readiness", "Load tested for sale events ahead of the event."]]),
  ind("food-delivery", "Food Delivery", "Three-sided delivery platforms: customer, restaurant, rider.",
    "Ordering, dispatch, and live tracking across all three apps, with the assignment logic and edge cases — rejected orders, unreachable riders — designed rather than discovered in production.",
    [["Customer ordering app", "Menus, customisation, scheduling, and live order status."],
     ["Restaurant dashboard", "Order acceptance, prep timers, and menu availability toggles."],
     ["Rider application", "Assignment, navigation, proof of delivery, and earnings."],
     ["Dispatch logic", "Assignment rules with reassignment when a rider goes unreachable."],
     ["Live tracking", "Map tracking with realistic ETAs that update."],
     ["Payments and settlement", "Split settlements to restaurants and riders with reconciliation."]]),
  ind("grocery", "Grocery", "Grocery commerce with the inventory accuracy the category demands.",
    "Quick-commerce and scheduled grocery platforms where substitutions, perishables, and slot management determine whether the order is a good experience.",
    [["Real-time stock", "Inventory synced per dark store or outlet, not a nightly batch."],
     ["Substitution flows", "Customer-approved substitutions handled before the order is packed."],
     ["Slot booking", "Delivery slot capacity managed against picker availability."],
     ["Basket building", "Repeat orders, lists, and one-tap reorder."],
     ["Picker application", "In-store picking with barcode scanning and exception handling."],
     ["Perishable handling", "Batch and expiry tracking through to dispatch."]]),
  ind("logistics", "Logistics", "Freight, fleet, and last-mile software for operations teams.",
    "Shipment lifecycle, fleet visibility, and proof of delivery — built for dispatchers who need the exception list, not a pretty map.",
    [["Shipment lifecycle", "Booking through delivery with milestone events and exception flags."],
     ["Route planning", "Multi-stop optimisation with vehicle and time-window constraints."],
     ["Fleet visibility", "Live vehicle positions with geofence-based status updates."],
     ["Proof of delivery", "Signature, photo, and OTP capture that works offline."],
     ["Freight billing", "Rate cards, surcharges, and automated invoice generation."],
     ["Partner integration", "APIs and EDI links with carriers and 3PL partners."]]),
  ind("real-estate", "Real Estate", "Property platforms for listings, site visits, and long sales cycles.",
    "Property search, lead management, and transaction support for a category where the conversion window is measured in months, not minutes.",
    [["Rich listings", "Photos, floor plans, virtual tours, and verified project details."],
     ["Map-based search", "Locality filters with commute and amenity overlays."],
     ["Site visit scheduling", "Booking, reminders, and agent assignment."],
     ["Lead management", "CRM pipeline built for a multi-month sales cycle."],
     ["Document workflow", "Agreements, KYC, and payment milestone tracking."],
     ["Listing verification", "Owner and broker verification to keep the inventory credible."]]),
  ind("taxi-booking", "Taxi Booking", "Ride-hailing platforms with dispatch logic that survives peak hour.",
    "Rider and driver applications with matching, pricing, and trip lifecycle designed for the messy cases: cancellations, no-shows, and surge conditions.",
    [["Matching and dispatch", "Proximity and acceptance-rate weighted assignment with fallbacks."],
     ["Fare engine", "Distance, time, waiting, and surge computed transparently."],
     ["Live trip tracking", "Navigation, ETA, and shareable trip links."],
     ["Driver earnings", "Trip-level earnings, incentives, and payout schedules."],
     ["Safety features", "SOS, trip sharing, and driver verification."],
     ["Cancellation handling", "Policy-driven charges with a dispute path."]]),
  ind("hotel-booking", "Hotel Booking", "Accommodation booking with inventory and cancellation policy handled correctly.",
    "Search, availability, and booking flows integrated with property management systems, where overbooking and cancellation policy are the two things that must not be approximate.",
    [["Availability and rates", "Live inventory sync with channel managers and PMS."],
     ["Search and filters", "Location, price, amenity, and rating filters that respond instantly."],
     ["Booking and payment", "Prepaid and pay-at-property with clear policy display."],
     ["Cancellation policy engine", "Rules applied and communicated at booking time, not at cancellation."],
     ["Property dashboard", "Inventory, rate, and booking management for hoteliers."],
     ["Reviews", "Verified-stay reviews with moderation."]]),
  ind("media-entertainment", "Media & Entertainment", "Content platforms with playback and monetisation both working.",
    "Streaming and content apps with adaptive playback, offline downloads, and the entitlement logic that decides who can watch what.",
    [["Adaptive playback", "Multi-bitrate streaming that holds up on weak connections."],
     ["DRM and entitlements", "Content protection with per-plan access rules."],
     ["Offline downloads", "Licensed downloads with expiry handling."],
     ["Recommendations", "Personalised rails with cold-start handling for new users."],
     ["Monetisation", "Subscriptions, rentals, and ad insertion in one entitlement model."],
     ["Multi-device continuity", "Resume playback across phone, web, and TV."]]),
  ind("agriculture", "Agriculture & Farming", "Agritech tools built for field conditions and patchy connectivity.",
    "Advisory, marketplace, and farm-management products designed for low bandwidth, regional languages, and users who will not read a tooltip.",
    [["Offline-first", "Full functionality without connectivity, syncing when a signal returns."],
     ["Regional languages", "Multi-language interfaces with voice input where literacy varies."],
     ["Crop advisory", "Stage-based guidance with weather and pest alerts."],
     ["Marketplace", "Input purchase and produce sale with price discovery."],
     ["Farm records", "Plot-level activity, input, and yield history."],
     ["Sensor integration", "Soil and weather station data where hardware is deployed."]]),
  ind("news", "News", "News apps built for speed of publish and speed of load.",
    "Publishing platforms where the editorial workflow and the reader experience both matter — fast pages, push that is timely without being noise.",
    [["Fast reading experience", "Sub-second article loads with prefetching and offline caching."],
     ["Editorial workflow", "Drafting, editing, approval, and scheduled publishing."],
     ["Breaking-news push", "Segmented notifications with frequency caps."],
     ["Personalised feeds", "Topic and source preferences with an editorial override."],
     ["Multi-format content", "Text, video, live blogs, and short-form in one pipeline."],
     ["Ad and subscription revenue", "Ad slots and metered paywall in a single entitlement model."]]),
  ind("social-media", "Social Media", "Social products with moderation designed before launch, not after the incident.",
    "Feeds, profiles, and messaging with the safety and abuse-handling infrastructure that a social product needs on day one.",
    [["Feed architecture", "Ranked timelines that stay fast as the follow graph grows."],
     ["Media pipeline", "Upload, transcode, and delivery for images and video at scale."],
     ["Messaging", "Direct and group messaging with delivery and read state."],
     ["Moderation tooling", "Reporting, review queues, and enforcement actions with audit history."],
     ["Abuse prevention", "Rate limits, spam detection, and block/mute controls."],
     ["Creator tools", "Analytics and monetisation for the people producing the content."]]),
  ind("video-streaming", "Video Streaming", "Live and on-demand video infrastructure that holds up at concurrency.",
    "Streaming platforms covering ingest, transcode, delivery, and playback, with the load characteristics of live events planned for rather than hoped about.",
    [["Ingest and transcode", "Multi-bitrate ladders generated automatically on upload."],
     ["Low-latency live", "LL-HLS delivery for live events where delay is noticeable."],
     ["CDN strategy", "Multi-CDN delivery with failover during peaks."],
     ["Player experience", "Custom players with quality selection, captions, and resume."],
     ["Concurrency planning", "Capacity modelled and load-tested before the event."],
     ["Analytics", "Startup time, rebuffer ratio, and completion tracked per session."]]),
  ind("laundry", "Laundry", "On-demand laundry with pickup, processing, and delivery tracked end to end.",
    "Order, route, and process management for laundry operators — including the item-level tracking that prevents the single worst failure mode in the category.",
    [["Pickup and delivery slots", "Slot booking against real route capacity."],
     ["Item-level tracking", "Tagged garments tracked through wash, press, and pack."],
     ["Service and pricing catalogue", "Per-item and per-kilo pricing with add-ons."],
     ["Route optimisation", "Efficient pickup and drop routing for the delivery fleet."],
     ["Facility operations", "Processing stage tracking with capacity visibility."],
     ["Issue resolution", "Damage and loss claims with photo evidence and a resolution SLA."]]),
  ind("security-services", "Security Services", "Guard management with attendance and patrol verification that cannot be faked.",
    "Workforce software for security agencies — rostering, verified attendance, patrol checkpoints, and incident reporting from the field.",
    [["Verified attendance", "Geofenced, photo-verified check-in and check-out."],
     ["Patrol checkpoints", "NFC or QR checkpoint scanning with timestamped routes."],
     ["Incident reporting", "Field reports with photo and video evidence, escalated by severity."],
     ["Rostering", "Shift planning with coverage gaps highlighted before they happen."],
     ["Client portal", "Site-level visibility for the client organisation."],
     ["Payroll integration", "Attendance feeding directly into wage calculation."]]),
  ind("healthcare-appointments", "Doctor Appointments", "Appointment booking that reflects real clinic capacity.",
    "Discovery, booking, and consultation software for clinics and hospitals, modelled on how appointments actually run — including walk-ins and overruns.",
    [["Doctor discovery", "Search by specialty, location, availability, and language."],
     ["Real availability", "Slots derived from actual clinic schedules, not a static calendar."],
     ["Queue management", "Live token status so patients are not waiting blind."],
     ["Teleconsultation", "Video consults with notes and digital prescriptions."],
     ["Records and history", "Consultation history and reports accessible to patient and doctor."],
     ["Reminders", "Appointment and follow-up reminders that reduce no-shows."]]),
  ind("inventory-management", "Inventory Management", "Stock software that matches what is on the shelf.",
    "Multi-location inventory with receiving, transfers, and cycle counts — built so the system and the warehouse agree, which is the only useful definition of working.",
    [["Multi-location stock", "Per-warehouse and per-outlet stock with transfer workflows."],
     ["Barcode operations", "Scan-based receiving, picking, and stock takes."],
     ["Cycle counting", "Scheduled partial counts with variance reporting."],
     ["Reorder automation", "Lead-time-aware reorder points with purchase order generation."],
     ["Batch and expiry", "Lot tracking with FEFO picking where it applies."],
     ["Accounting integration", "Stock valuation synced to your finance system."]]),
];

/* ------------------------------------------------------------------ */
/* AI SOLUTIONS                                                        */
/* ------------------------------------------------------------------ */

const AI_SOLUTIONS: Entry[] = [
  {
    slug: "generative-ai-development",
    name: "Generative AI Development",
    title: "Generative AI Development Services",
    tagline: "LLM features that are evaluated before they are shipped.",
    intro:
      "We build generative AI into products where it genuinely reduces work — drafting, extraction, summarisation, support deflection — with evaluation harnesses so quality is measured rather than assumed, and guardrails so failures are visible.",
    bullets: b(
      ["Use-case qualification", "An honest assessment of whether an LLM beats a rule or a search index for your case."],
      ["Retrieval-augmented generation", "Grounded answers with citations, so hallucination is detectable."],
      ["Evaluation harnesses", "Golden datasets and automated scoring run on every prompt or model change."],
      ["Guardrails", "Input filtering, output validation, and refusal handling with a human escalation path."],
      ["Cost and latency control", "Model routing, caching, and token budgets sized to the workload."],
      ["Provider flexibility", "An abstraction that lets you switch models without rewriting the product."],
    ),
  },
  {
    slug: "ai-ml-development",
    name: "AI & ML Development",
    title: "AI & Machine Learning Development",
    tagline: "Models trained on your data, deployed with monitoring that catches drift.",
    intro:
      "Classical and deep learning work — forecasting, classification, recommendation, and computer vision — delivered with the MLOps around it, because a model without monitoring is a liability with a good demo.",
    bullets: b(
      ["Problem framing", "Translating a business question into a measurable prediction target."],
      ["Feature and data pipelines", "Reproducible feature engineering with training/serving parity."],
      ["Model development", "Baselines first, complexity only when it beats the baseline measurably."],
      ["Deployment", "Batch or real-time serving with versioned artefacts and rollback."],
      ["Drift monitoring", "Input and prediction drift alerting before accuracy quietly degrades."],
      ["Retraining pipelines", "Scheduled retraining with automated validation gates."],
    ),
  },
  {
    slug: "ai-consulting",
    name: "AI Consulting",
    title: "AI Consulting & Strategy",
    tagline: "A prioritised AI roadmap with the low-value ideas removed.",
    intro:
      "A short, focused engagement that ends with a ranked list of AI opportunities, feasibility notes, cost estimates, and a recommended first project — plus an explicit list of the ideas we think you should not pursue.",
    bullets: b(
      ["Opportunity assessment", "Workflow mapping to find where AI reduces real effort."],
      ["Data readiness review", "An honest read on whether your data supports the ambition."],
      ["Build vs buy analysis", "Where an off-the-shelf tool beats a custom build."],
      ["Risk and governance", "Privacy, IP, and regulatory considerations documented up front."],
      ["Costed roadmap", "Sequenced initiatives with effort and expected return."],
      ["Pilot definition", "A first project scoped small enough to prove or disprove the thesis."],
    ),
  },
  {
    slug: "ai-agents-and-automation",
    name: "AI Agents & Automation",
    title: "AI Agents & Workflow Automation",
    tagline: "Agents with bounded scope, tool permissions, and an audit trail.",
    intro:
      "Agentic systems that take real actions inside your tools — with explicit permission boundaries, human approval on consequential steps, and a full log of what the agent did and why.",
    bullets: b(
      ["Bounded tool access", "Each agent gets the minimum set of tools its job requires."],
      ["Human-in-the-loop", "Approval gates on any irreversible or outward-facing action."],
      ["Durable execution", "Long-running workflows that survive restarts and resume where they stopped."],
      ["Full audit trail", "Every decision, tool call, and output logged and reviewable."],
      ["Failure handling", "Retries with backoff, and a clean escalation to a person on repeated failure."],
      ["Measured outcomes", "Task success rate tracked, so value is demonstrated rather than claimed."],
    ),
  },
  {
    slug: "computer-vision",
    name: "Computer Vision",
    title: "Computer Vision Solutions",
    tagline: "Detection, recognition, and inspection running on real-world footage.",
    intro:
      "Vision systems for inspection, monitoring, and document processing — trained on footage from your actual environment, because a model trained on clean data fails on a dusty camera.",
    bullets: b(
      ["Object detection and tracking", "Detection tuned on your camera angles, lighting, and conditions."],
      ["Quality inspection", "Defect detection with confidence thresholds and human review queues."],
      ["OCR and document parsing", "Structured extraction from forms, invoices, and identity documents."],
      ["Edge deployment", "Models optimised to run on-device where bandwidth or privacy demands it."],
      ["Annotation pipeline", "Labelling workflow and quality control for training data."],
      ["Continuous improvement", "Misclassifications fed back into the training set on a cycle."],
    ),
  },
  {
    slug: "predictive-analytics",
    name: "Predictive Analytics",
    title: "Predictive Analytics Services",
    tagline: "Forecasts that reach the people making the decision.",
    intro:
      "Demand forecasting, churn prediction, and risk scoring — delivered into the tools where decisions are made, with accuracy tracked against outcomes rather than reported once at handover.",
    bullets: b(
      ["Demand forecasting", "Seasonality and promotion-aware forecasts at the granularity you plan at."],
      ["Churn and retention", "Risk scoring with the drivers exposed, so intervention is possible."],
      ["Anomaly detection", "Threshold and model-based alerting tuned to keep false positives survivable."],
      ["Scenario modelling", "What-if analysis for planning decisions."],
      ["Delivery into workflow", "Predictions surfaced in the CRM, ERP, or dashboard people already use."],
      ["Accuracy tracking", "Forecast error monitored over time and reported honestly."],
    ),
  },
];

/* ------------------------------------------------------------------ */
/* LOCATIONS                                                           */
/* ------------------------------------------------------------------ */

const loc = (slug: string, name: string, intro: string, bl: [string, string][]): Entry => ({
  slug,
  name,
  title: `Software Development Company in ${name}`,
  tagline: `Engineering teams serving ${name} clients with committed working-hour overlap.`,
  intro,
  bullets: b(...bl),
});

const LOCATIONS: Entry[] = [
  loc("hyderabad", "Hyderabad", "Our home base. Full-team engagement, on-site workshops, and the shortest feedback loop we offer — most Hyderabad clients see us in person during discovery and at every major milestone.",
    [["On-site collaboration", "In-person discovery, planning, and review sessions."],
     ["Full IST overlap", "Complete working-day overlap with your team."],
     ["Local hiring network", "Access to one of India's deepest engineering talent pools."],
     ["Rapid team scaling", "Adding capacity measured in weeks, not quarters."],
     ["Local contracting", "Indian entity, INR invoicing, GST compliant."],
     ["Long-term support", "Maintenance retainers with on-site availability."]]),
  loc("dubai", "Dubai", "Dedicated delivery for Dubai-based clients, with a working day that overlaps almost entirely with GST and a contracting model that suits UAE procurement requirements.",
    [["Near-full time-zone overlap", "IST and GST differ by 90 minutes — effectively a shared working day."],
     ["UAE compliance awareness", "Data residency and regulatory requirements accounted for in architecture."],
     ["Arabic and English", "Bilingual interfaces with right-to-left layout support."],
     ["Local payment rails", "Regionally appropriate payment gateway integrations."],
     ["On-site milestones", "Travel for kickoff and major reviews built into the engagement."],
     ["Procurement-friendly contracting", "Documentation and terms that pass UAE vendor onboarding."]]),
  loc("uae", "UAE", "Delivery across the Emirates — Dubai, Abu Dhabi, and Sharjah — with the compliance and localisation work that regional launches require.",
    [["Emirates-wide delivery", "Teams serving clients across all seven emirates."],
     ["Data residency", "Architecture that meets UAE data-handling expectations."],
     ["Bilingual products", "Full Arabic and English with RTL support throughout."],
     ["Regional integrations", "Local payment, identity, and logistics providers."],
     ["Overlapping hours", "A shared working day with minimal scheduling friction."],
     ["Ongoing support", "Regional-hours support coverage after launch."]]),
  loc("uk", "United Kingdom", "UK client delivery with a guaranteed daily overlap window, UK GDPR compliance built into the architecture, and contracting under terms UK procurement teams recognise.",
    [["Guaranteed overlap hours", "A committed daily window aligned to UK business hours."],
     ["UK GDPR compliance", "Lawful basis, data minimisation, and subject rights designed in."],
     ["Accessibility standards", "WCAG 2.2 AA as a delivery requirement."],
     ["UK payment integrations", "Open Banking, Faster Payments, and card acquiring."],
     ["Familiar contracting", "Terms, IP assignment, and NDAs that UK legal teams accept."],
     ["Cost efficiency", "Senior engineering at a rate that funds a larger team."]]),
  loc("europe", "Europe", "Delivery for European clients with GDPR, EU data residency, and multi-language requirements handled as architecture rather than afterthought.",
    [["GDPR by design", "Consent, retention, deletion, and portability built into the data model."],
     ["EU data residency", "Hosting and processing within EU regions where required."],
     ["Multi-language delivery", "Localisation infrastructure for a multi-market launch."],
     ["Accessibility compliance", "EN 301 549 and WCAG conformance as a stated deliverable."],
     ["Business-hours overlap", "A committed daily window across CET and IST."],
     ["Local payment methods", "SEPA, iDEAL, Klarna, and regional wallets."]]),
  loc("italy", "Italy", "Italian market delivery — localisation, electronic invoicing requirements, and integrations with the payment methods Italian users actually reach for.",
    [["Italian localisation", "Full-language interfaces reviewed by native speakers."],
     ["e-Invoicing awareness", "Fattura elettronica requirements considered in commerce builds."],
     ["Local payment methods", "Card, bank transfer, and regionally preferred wallets."],
     ["GDPR compliance", "EU data protection requirements built into the architecture."],
     ["CET overlap window", "A committed daily overlap with Italian business hours."],
     ["Regional integrations", "Local logistics and identity providers."]]),
  loc("california", "California", "US West Coast delivery with a committed evening-IST overlap, CCPA-aware data handling, and a delivery cadence built for startup timelines.",
    [["Committed PT overlap", "A daily window aligned to California mornings."],
     ["CCPA-aware architecture", "Consumer data rights supported at the data-model level."],
     ["Startup-paced delivery", "Weekly shipping cadence with demo-able increments."],
     ["US contracting", "Terms and IP assignment familiar to US counsel."],
     ["Async-first communication", "Written updates and recorded demos so progress is visible off-hours."],
     ["Extended runway", "Senior engineering capacity at a rate that stretches a seed round."]]),
  loc("usa", "United States", "Nationwide US delivery with overlap windows agreed per client, and the documentation and process maturity that US enterprise procurement expects.",
    [["Per-client overlap windows", "Coverage agreed for your time zone before the contract starts."],
     ["Enterprise-ready process", "Documentation, security reviews, and audit responses handled."],
     ["US payment and compliance", "PCI-aware handling and US payment provider integrations."],
     ["Accessibility standards", "Section 508 and WCAG conformance as a deliverable."],
     ["Familiar contracting", "MSAs, SOWs, and IP terms your legal team will recognise."],
     ["Scalable capacity", "Team size adjusted per phase without re-contracting."]]),
];

/* ------------------------------------------------------------------ */
/* CATEGORY REGISTRY                                                   */
/* ------------------------------------------------------------------ */

export const CATEGORIES: Category[] = [
  {
    key: "services",
    label: "Services",
    base: "/services",
    blurb: "End-to-end product delivery — design, build, launch, and the maintenance afterwards.",
    items: SERVICES,
  },
  {
    key: "technologies",
    label: "Technologies",
    base: "/technologies",
    blurb: "The stacks we work in daily, chosen for your constraints rather than our comfort.",
    items: TECHNOLOGIES,
  },
  {
    key: "industries",
    label: "Industries",
    base: "/industries",
    blurb: "Domain experience across the sectors where we have shipped more than once.",
    items: INDUSTRIES,
  },
  {
    key: "ai-solutions",
    label: "AI Solutions",
    base: "/ai-solutions",
    blurb: "AI built into products where it measurably reduces work — and skipped where it does not.",
    items: AI_SOLUTIONS,
  },
  {
    key: "locations",
    label: "Locations",
    base: "/locations",
    blurb: "Where we deliver, and the overlap hours and compliance work each region needs.",
    items: LOCATIONS,
  },
];

export const getCategory = (key: string) => CATEGORIES.find((c) => c.key === key);

/* Asset path helpers. Artwork is generated by scripts/assets.mjs into
   /public/assets at the exact dimensions the layout expects — replace any file
   with a client-supplied logo or real photography at the same size and
   filename, and nothing else changes. */
const assetSlug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export const projectImg = (slug: string) => `/assets/project-${slug}.svg`;
export const clientLogo = (name: string) => `/assets/client-${assetSlug(name)}.svg`;

const ICON_NAMES = [
  "mobile", "web", "design", "marketing", "gps", "product", "data", "rpa",
  "saas", "team", "staffing", "cms", "chain", "iot", "erp", "crm", "cart",
  "browser", "shield", "finance", "ai", "cloud",
];
export const serviceIcon = (i: number) =>
  `/assets/icon-${ICON_NAMES[i % ICON_NAMES.length]}.svg`;
export const HERO_IMG = "/assets/hero.svg";
export const OG_IMG = "/assets/og.svg";
export const FLAG_IN = "/assets/flag-in.svg";
/** Blog cover, keyed by post category. */
export const postCover = (category: string) =>
  `/assets/cover-${assetSlug(category)}.svg`;
/** Geometric avatar — 8 variants, no likeness of a real person. */
export const avatarImg = (i: number) => `/assets/avatar-${(i % 8) + 1}.svg`;

/** Slot dimensions, matching the reference layout. */
export const IMG = {
  project: { w: 260, h: 520 },
  client: { w: 120, h: 100 },
  icon: { w: 120, h: 130 },
  hero: { w: 560, h: 640 },
} as const;

export const getEntry = (key: string, slug: string) =>
  getCategory(key)?.items.find((i) => i.slug === slug);

/* ------------------------------------------------------------------ */
/* CLIENTS & PROJECTS                                                  */
/* ------------------------------------------------------------------ */

export type Project = {
  slug: string;
  name: string;
  sector: string;
  summary: string;
  platforms: string[];
  /** Fill in per project. Rendered only when present. */
  stack?: string[];
  /** Fill in per project — real, verifiable results only. Rendered only when present. */
  outcome?: string;
};

// Real client work. `summary` describes scope only — add `stack` and `outcome`
// per project once you have details you can stand behind publicly.
// Confirm each client is happy to be named before this goes live.
export const PROJECTS: Project[] = [
  {
    slug: "vamshi-farms",
    name: "Vamshi Farms",
    sector: "E-commerce / Agriculture",
    summary:
      "Farm-to-customer e-commerce platform — storefront website plus mobile ordering, covering catalogue, cart, checkout, and order tracking.",
    platforms: ["Web", "Android", "iOS"],
  },
  {
    slug: "8meds",
    name: "8Meds",
    sector: "Healthcare Marketplace",
    summary:
      "Pharmacy marketplace app connecting customers with local pharmacies — product search, prescription upload, ordering, and delivery tracking.",
    platforms: ["Android", "iOS"],
  },
  {
    slug: "medibag",
    name: "MediBag",
    sector: "Healthcare",
    summary:
      "Healthcare platform delivered as both a mobile app and a website, covering the customer-facing ordering flow and the web presence around it.",
    platforms: ["Web", "Android", "iOS"],
  },
  {
    slug: "oneasy",
    name: "OnEasy",
    sector: "AI / Automation",
    summary:
      "AI agent platform — autonomous agents that carry out multi-step tasks with tool access, bounded permissions, and a reviewable action log.",
    platforms: ["Web", "API"],
  },
  {
    slug: "creator-chart",
    name: "Creator Chart",
    sector: "Creator Economy",
    summary:
      "Website for creator analytics and rankings, built for fast content pages and a discovery experience that holds up as the dataset grows.",
    platforms: ["Web"],
  },
];

// Client names shown in the logo wall and marquee.
export const CLIENTS = [
  "Vamshi Farms",
  "8Meds",
  "MediBag",
  "OnEasy",
  "Creator Chart",
];

/* ------------------------------------------------------------------ */
/* BLOG                                                                */
/* ------------------------------------------------------------------ */

export type Post = {
  slug: string;
  title: string;
  category: string;
  date: string; // ISO
  readMins: number;
  excerpt: string;
  sections: { h: string; p: string[] }[];
};

const post = (
  slug: string,
  title: string,
  category: string,
  date: string,
  excerpt: string,
  sections: [string, string[]][],
): Post => ({
  slug,
  title,
  category,
  date,
  readMins: Math.max(4, Math.round(sections.flatMap((s) => s[1]).join(" ").split(" ").length / 200)),
  excerpt,
  sections: sections.map(([h, p]) => ({ h, p })),
});

// Generic closing section reused across posts.
const CLOSE = (topic: string): [string, string[]] => [
  "Where to go from here",
  [
    `If you are weighing ${topic} for an upcoming project, the useful next step is usually a short scoping conversation rather than a longer article. Bring your constraints — budget, timeline, existing systems, and the team you already have — and the decision usually resolves itself in an hour.`,
    "We run these as a fixed-scope discovery session with a written recommendation at the end, including the cases where our advice is that you do not need us.",
  ],
];

export const POSTS: Post[] = [
  post("mobile-app-development-cost-india", "What Mobile App Development Actually Costs in India", "Cost & Planning", "2026-07-24",
    "A breakdown of where app budgets actually go, why quotes vary by 5x, and which line items are genuinely optional.",
    [["Why quotes vary so widely", ["Two agencies can quote very different numbers for the same brief and both be honest. The gap is almost always scope interpretation: one assumed a design system and automated tests, the other assumed you would accept template screens and manual QA.", "Ask every vendor to itemise design, engineering, QA, project management, and post-launch support separately. A single blended number hides the trade-offs you most need to see."]],
     ["Where the budget actually goes", ["Engineering is rarely more than sixty percent. Design, QA, project coordination, and release management make up the rest, and cutting them does not remove the work — it moves it to your team.", "Backend work is consistently underestimated. A simple-looking app with user accounts, payments, and notifications carries more server-side effort than the screens suggest."]],
     ["Line items you can genuinely cut", ["Custom illustration, animation polish, and a native tablet layout are all deferrable. Automated tests, crash reporting, and a release pipeline are not — skipping them costs more within six months than they cost to build.", "Cross-platform frameworks reduce cost when the interface is custom and the platform integration is shallow. They do not when you need deep OS features on both platforms."]],
     CLOSE("app development budgets")]),

  post("flutter-vs-react-native", "Flutter vs React Native: Choosing on Constraints, Not Preference", "Technology", "2026-07-18",
    "Both are good. The decision comes down to your existing team, your interface ambitions, and your native integration depth.",
    [["Start with your team", ["If you already run React on the web, React Native means shared language, shared people, and a shorter ramp. That advantage usually outweighs any benchmark difference.", "If you have no incumbent JavaScript team, Flutter's tooling and consistency across platforms are easier to onboard into from scratch."]],
     ["Interface ambition", ["Flutter renders its own widgets, which makes heavily custom interfaces cheaper and more consistent across platforms. If your design is bespoke, this is a real saving.", "React Native maps to platform primitives, which suits products that should feel platform-native rather than brand-native."]],
     ["Native integration depth", ["Both handle common device features well. The difference appears at the edges: complex Bluetooth work, background processing, or a large existing native SDK.", "Audit your required native integrations before choosing. The framework matters less than whether a maintained package exists for the three hardest ones."]],
     CLOSE("a cross-platform framework")]),

  post("ai-integration-existing-products", "Adding AI to an Existing Product Without Breaking It", "AI", "2026-07-11",
    "A staged approach to introducing AI features, with the evaluation and rollback discipline that keeps quality measurable.",
    [["Qualify the use case first", ["The best AI features replace work a human is currently doing by hand: drafting, extracting, summarising, categorising. The worst ones add a chat box to a product nobody wanted to chat with.", "If a deterministic rule or a search index solves it, use that. It is cheaper, faster, and debuggable."]],
     ["Build the evaluation before the feature", ["Assemble fifty to two hundred real examples with known-good outputs before writing a prompt. Without this, every change is a vibe check and quality drifts invisibly.", "Run the evaluation on every prompt and model change in CI. This is the single highest-leverage practice in shipping LLM features."]],
     ["Ship behind a flag with a fallback", ["Roll out to a small cohort, measure task completion rather than engagement, and keep the non-AI path working. Model providers change behaviour without notice.", "Log inputs and outputs from day one, with consent handled. You cannot improve what you did not record."]],
     CLOSE("an AI feature")]),

  post("why-your-app-needs-offline-support", "Offline Support Is a Feature, Not an Edge Case", "Engineering", "2026-07-04",
    "In most of India, connectivity is intermittent rather than absent. Apps that assume a connection fail in ordinary use.",
    [["The failure is not rare", ["Lifts, basements, metro tunnels, and rural coverage gaps are everyday conditions, not exceptions. An app that shows a spinner in these moments is broken for a meaningful share of sessions.", "The common failure mode is worse than a spinner: work is lost. A user fills a form, taps submit, and the data disappears."]],
     ["What offline-first actually requires", ["Write to local storage first, then sync. The user's action succeeds immediately, and the network becomes a background concern.", "Sync needs a conflict policy decided in advance — last-write-wins, server-authoritative, or a merge — and it needs to be written down, because the default is whatever the code happens to do."]],
     ["Test it deliberately", ["Airplane mode is not a sufficient test. The harder case is a slow, flaky connection that succeeds partially.", "Use network throttling and packet-loss simulation in QA, and include a poor-network pass in the release checklist."]],
     CLOSE("offline-first architecture")]),

  post("choosing-a-development-partner", "How to Evaluate a Development Partner", "Cost & Planning", "2026-06-27",
    "The questions that separate agencies who will ship from agencies who will present.",
    [["Ask about the last project that went badly", ["Every agency has one. The useful signal is whether they can describe it specifically, what they changed afterwards, and whether they take a share of the responsibility.", "A vendor with no failures either has no history or no candour."]],
     ["Ask who actually writes the code", ["Sales engineers in the pitch and junior engineers on delivery is a common pattern. Ask to meet the people who will be on your project and check their availability start date.", "Ask for the team's other concurrent commitments. Full-time on paper often means forty percent in practice."]],
     ["Ask what you own at the end", ["Repository access, infrastructure accounts, deployment credentials, and documentation should be yours throughout, not handed over at the end.", "If leaving the vendor would be operationally painful, that pain is the product of a deliberate choice. Check the contract for it."]],
     CLOSE("a development partner")]),

  post("core-web-vitals-that-matter", "Core Web Vitals: The Two Metrics Worth Optimising First", "Performance", "2026-06-20",
    "Most sites fix the wrong metric first. Largest Contentful Paint and Interaction to Next Paint carry the outcomes.",
    [["Largest Contentful Paint", ["LCP is usually dominated by one thing: the hero image or the font blocking render. Fixing image format, sizing, and priority typically moves LCP more than any amount of JavaScript trimming.", "Preload the LCP resource, serve modern formats, and set explicit dimensions to avoid layout shift while it loads."]],
     ["Interaction to Next Paint", ["INP measures whether the page responds when tapped. Long tasks on the main thread are the cause, and hydration of large client components is the usual culprit.", "Move work off the main thread, split bundles by route, and render on the server where interaction is not required."]],
     ["Measure on real devices", ["Lab scores on a fast laptop are not the experience. Use field data from real users, segmented by device tier and connection.", "Set budgets in CI so a regression fails the build instead of surfacing in a quarterly report."]],
     CLOSE("web performance work")]),

  post("gps-tracking-for-fleets", "What Fleet GPS Tracking Should Actually Report", "Logistics", "2026-06-13",
    "Live dots on a map are the easy part. The value is in exceptions, driver behaviour, and the reports that change decisions.",
    [["Live location is table stakes", ["Every tracking product shows vehicles on a map. Few of them help a dispatcher decide what to do next.", "The useful primary view is an exception list: which vehicles are late, stopped unexpectedly, or off route — not a map of everything that is fine."]],
     ["Driver behaviour, used carefully", ["Harsh braking, acceleration, and speeding data reduce accident rates and fuel cost when used for coaching. Used punitively, they produce gaming and resentment.", "Score at the route level as well as the driver level. A route with consistently poor scores across drivers is a route problem."]],
     ["Reports that change decisions", ["Fuel per kilometre by vehicle, idle time by site, and delivery time variance by route are the three reports that most often produce action.", "If a report has never changed a decision, remove it. Dashboard clutter has a cost."]],
     CLOSE("fleet tracking software")]),

  post("saas-multi-tenancy-decisions", "Multi-Tenancy Decisions You Cannot Defer", "SaaS", "2026-06-06",
    "Tenancy, billing, and permissions are architectural. Retrofitting them into a live SaaS is a rewrite in disguise.",
    [["Isolation model", ["Shared tables with a tenant column is the cheapest and the most common. Schema-per-tenant costs more operationally but answers enterprise security questionnaires more easily.", "Choose deliberately and write the reasoning down. The wrong default discovered at your first enterprise deal is expensive."]],
     ["Billing is not a bolt-on", ["Plans, trials, proration, upgrades, downgrades, and dunning all touch your data model. Adding them later means backfilling entitlements across live accounts.", "Model entitlements separately from plan names, so pricing changes do not require code changes."]],
     ["Permissions before customers ask", ["Organisation-level roles, invitations, and audit logs will be requested by the first customer with more than twenty seats. Building them under deal pressure produces the worst version.", "A simple, correct RBAC model early beats a flexible one designed under a deadline."]],
     CLOSE("SaaS architecture")]),

  post("accessibility-is-cheaper-early", "Accessibility Costs Less When It Is Not a Retrofit", "Design", "2026-05-30",
    "Most accessibility work is free at design time and expensive after launch. Here is what to fix and when.",
    [["The expensive-later list", ["Colour contrast, focus order, semantic structure, and form labelling are nearly free during design and build. Fixing them across a shipped product means touching every screen.", "Custom components — dropdowns, modals, date pickers — are where most violations concentrate. Use accessible primitives instead of building from divs."]],
     ["Test with the tools users use", ["Automated scanners catch perhaps a third of issues. Keyboard-only navigation and a screen reader pass catch most of the rest.", "Add both to your release checklist. They take under an hour on a typical release."]],
     ["It is also a legal question", ["Public-sector and enterprise procurement in the UK, EU, and US increasingly requires documented conformance. An inaccessible product is a disqualified bid.", "Accessibility statements should be honest about known gaps and dated. A vague claim is worse than a specific limitation."]],
     CLOSE("accessibility conformance")]),

  post("data-pipelines-that-dont-lie", "Building Data Pipelines People Trust", "Data", "2026-05-23",
    "The reason nobody trusts the dashboard is almost never the dashboard. It is untested pipelines and undocumented definitions.",
    [["Test the data, not just the code", ["Freshness, row count, uniqueness, and referential integrity checks on every run catch the majority of quality incidents before a human sees a wrong number.", "A failing test should stop the pipeline, not warn quietly in a log nobody reads."]],
     ["Define metrics once", ["When two dashboards disagree, the cause is usually two definitions of the same metric. A semantic layer with one definition per metric removes the argument permanently.", "Document the definition next to the metric, in language a non-analyst can check."]],
     ["Make lineage visible", ["When a number looks wrong, the first question is where it came from. Column-level lineage turns a half-day investigation into a two-minute one.", "Ownership matters as much as lineage. Every dataset needs a named owner."]],
     CLOSE("data platform work")]),

  post("app-store-rejections", "The App Store Rejections We See Most Often", "Mobile", "2026-05-16",
    "Most rejections are predictable and preventable. These are the ones that come up repeatedly.",
    [["Account deletion and privacy", ["Apps with account creation must offer in-app account deletion. This is a frequent, easily avoided rejection.", "Privacy manifests and accurate data-collection disclosures are checked. Under-declaring gets caught, and it delays the release."]],
     ["Sign-in requirements", ["Requiring an account to access features that do not need one draws a rejection. So does offering third-party sign-in without an equivalent privacy-preserving option where required.", "Guest access for browsing solves most of these cases."]],
     ["Incomplete review information", ["Demo credentials that do not work, or a build behind a feature flag reviewers cannot reach, produce an immediate rejection.", "Provide working credentials, a short walkthrough note, and access to any gated features."]],
     CLOSE("store submission")]),

  post("erp-integration-without-a-rewrite", "Integrating With an ERP Without Replacing It", "Enterprise", "2026-05-09",
    "You rarely need to replace the ERP. You need a clean interface between it and everything else.",
    [["The rip-and-replace trap", ["ERP replacement projects are long, expensive, and disruptive to exactly the processes that keep revenue moving. Most of the frustration comes from a handful of workflows, not the core.", "Identify the specific workflows that hurt. Building those as custom modules alongside the ERP is usually an order of magnitude cheaper."]],
     ["Interface design matters more than technology", ["An integration layer with a defined contract, idempotent writes, and reconciliation is what makes this safe. Direct database writes into an ERP are how integrations become unmaintainable.", "Treat the ERP as a system of record with an API boundary, even if you have to build that boundary yourself."]],
     ["Roll out module by module", ["Big-bang cutovers concentrate all the risk on one weekend. Phased rollouts let you learn cheaply.", "Run old and new in parallel for one cycle and reconcile. The discrepancies you find are the ones that would have been an incident."]],
     CLOSE("ERP integration")]),

  post("designing-for-low-end-devices", "Designing for the Devices Your Users Actually Have", "Design", "2026-05-02",
    "The office is full of flagships. Your user base is not. Here is how to design and test for the real distribution.",
    [["Check your own analytics first", ["Device and OS distribution is in your analytics. Most teams are surprised by how much of their traffic is on mid-tier hardware three or four years old.", "Set your minimum supported device from data, and buy two of them for the QA shelf."]],
     ["What breaks on low-end hardware", ["Animation-heavy interfaces, large images, and heavy JavaScript degrade first. Startup time and scroll smoothness are the most visible casualties.", "Memory pressure causes background app kills, which surfaces as lost state — a bug users report as the app being unreliable."]],
     ["Design decisions that help", ["Simpler transitions, smaller images, and less concurrent work on the main thread. None of these compromise the design if they are decided early.", "Test the critical path on the slowest supported device before every release."]],
     CLOSE("device support strategy")]),

  post("security-basics-for-startups", "Security Work That Fits a Startup Budget", "Security", "2026-04-25",
    "You do not need a security team. You do need about six practices, and most of them are configuration.",
    [["The high-leverage six", ["SSO with enforced MFA, least-privilege access reviewed quarterly, automated dependency scanning, encrypted backups with tested restores, secret management outside the repository, and a written incident plan.", "Together these take a few weeks of setup and cover the majority of realistic risk for an early-stage company."]],
     ["Restores, not backups", ["An untested backup is a hypothesis. Schedule a restore drill, measure how long it takes, and write the number down.", "Most teams discover their recovery time is several times what they assumed."]],
     ["Have the plan before the incident", ["Who declares an incident, who communicates, and what the customer message says — decided calmly in advance, not at 2am.", "A one-page plan with names and phone numbers is worth more than a policy document nobody has read."]],
     CLOSE("security hardening")]),

  post("when-not-to-build-an-app", "When You Should Not Build a Mobile App", "Cost & Planning", "2026-04-18",
    "Sometimes the honest answer is a website, a WhatsApp flow, or nothing. Here are the signals.",
    [["Low usage frequency", ["Apps earn their install through repeated use. If a user needs your service twice a year, a fast website wins on every dimension including your cost.", "Install friction is real and permanent. Every step between intent and use loses a share of users."]],
     ["No device capability requirement", ["If you do not need the camera, background location, push at scale, or offline operation, the browser can do it. Progressive web apps cover more ground than most teams assume.", "Push notifications alone are rarely worth the cost of two native codebases."]],
     ["No team to maintain it", ["An app is a subscription, not a purchase. OS updates, store policy changes, and dependency deprecations mean ongoing work every year.", "If there is no maintenance budget, the app will be broken within eighteen months. Better not to start."]],
     CLOSE("the app-versus-web decision")]),

  post("hiring-engineers-that-stay", "Technical Hiring That Survives the Probation Period", "Hiring", "2026-04-11",
    "Most bad hires are process failures, not judgement failures. The fixes are boring and effective.",
    [["Test what the job requires", ["Whiteboard algorithm puzzles predict performance on whiteboard algorithm puzzles. A short, paid, realistic task predicts performance on the job.", "Use the same task for every candidate at a level so you can actually compare."]],
     ["Structure the interview", ["Unstructured interviews mostly measure rapport. A defined question set with a written scoring rubric measures something closer to capability.", "Have each interviewer score independently before discussing, to avoid the loudest opinion setting the room."]],
     ["Be honest in the pitch", ["Overselling the role produces accepted offers and six-month departures. Describing the actual technical debt, on-call load, and constraints filters for people who will stay.", "Candidates who join knowing the mess are the ones who help clean it up."]],
     CLOSE("technical hiring")]),

  post("migrating-off-legacy-php", "Migrating Off a Legacy PHP Codebase Without Stopping", "Engineering", "2026-04-04",
    "A full rewrite is the most common and most expensive answer. Incremental migration ships the whole way through.",
    [["Why rewrites stall", ["A rewrite means running two systems, feature-freezing one, and delivering no user value until it is finished. Business pressure eventually forces features into the old system, and the rewrite never lands.", "The strangler pattern avoids this: route by route, the new system takes over while the old one keeps serving everything else."]],
     ["Start with characterisation tests", ["Inherited code rarely has tests, and the behaviour is the specification. Write tests that capture what it currently does — bugs included — before changing anything.", "These tests are what make refactoring safe rather than hopeful."]],
     ["Upgrade the runtime first", ["Moving to a supported PHP version usually delivers immediate performance and security wins, and it is cheaper than any architectural change.", "Do this before deciding whether a migration is needed at all. Sometimes it is enough."]],
     CLOSE("legacy modernisation")]),

  post("push-notifications-that-work", "Push Notifications People Do Not Turn Off", "Product", "2026-03-28",
    "Opt-out is permanent and usually silent. Frequency and relevance discipline is the whole game.",
    [["Ask at the right moment", ["Requesting permission on first launch, before any value has been delivered, produces the worst acceptance rates. Ask after a moment where a notification would obviously help.", "Explain what the notification will be about before triggering the system prompt. You only get one."]],
     ["Segment and cap", ["Broadcast sends to the entire base train users to ignore you. Segment by behaviour, and cap frequency per user per week.", "Track opt-out rate per campaign type. One campaign is usually responsible for most of the damage."]],
     ["Deep link correctly", ["A notification that opens the home screen instead of the relevant content wastes the tap and erodes trust.", "Every notification should land on the exact screen it referenced, including for a cold start."]],
     CLOSE("notification strategy")]),

  post("api-design-that-ages-well", "API Design That Survives Three Years of Change", "Engineering", "2026-03-21",
    "Versioning, pagination, and error shape are the three decisions you will live with longest.",
    [["Version from the first release", ["Adding versioning after external consumers exist is a migration project. Adding it on day one costs a path segment.", "Prefer additive change over new versions, but have the mechanism ready."]],
     ["Paginate everything that can grow", ["Any collection endpoint without pagination is an outage waiting for a customer with more data than you tested with.", "Cursor pagination handles insertion during traversal better than offset pagination."]],
     ["One error shape, everywhere", ["A consistent error body with a machine-readable code, a human message, and a request identifier makes integration and support dramatically cheaper.", "Include the request identifier in logs so a customer report maps to a trace in seconds."]],
     CLOSE("API design")]),

  post("rpa-where-it-pays", "Where RPA Pays Off and Where It Quietly Fails", "Automation", "2026-03-14",
    "Automation of a stable, high-volume, rule-based process pays back fast. Everything else needs care.",
    [["The profitable profile", ["High volume, stable inputs, deterministic rules, and a system without an API. Invoice processing and data entry between two legacy systems are the classic wins.", "Measure the current process before automating. Without a baseline you cannot demonstrate the return."]],
     ["The failure profile", ["Processes that change frequently, or that depend on judgement, produce brittle bots that break weekly and erode trust in the whole programme.", "If a process is about to be replaced by a system upgrade, do not automate it. Wait."]],
     ["Design for failure from the start", ["Bots fail. What matters is whether they fail loudly, log context, and route the case to a person who can resolve it.", "Silent partial failure is the worst outcome, because the errors accumulate before anyone notices."]],
     CLOSE("process automation")]),

  post("design-systems-that-get-used", "Design Systems That Engineers Actually Use", "Design", "2026-03-07",
    "Most design systems fail at adoption, not at design. The fix is distribution and maintenance, not more components.",
    [["Ship it as code", ["A Figma library with no corresponding component package is a suggestion. Engineers will rebuild from screenshots and the system will drift within a quarter.", "Tokens should flow from design to code automatically, or they will diverge."]],
     ["Fewer components, better documented", ["Twenty well-documented components with clear usage guidance beat eighty undocumented ones. Coverage is not the goal; adoption is.", "Document when not to use a component. That guidance prevents more misuse than the usage docs prevent."]],
     ["Fund the maintenance", ["A design system without an owner decays. Someone needs to review contributions, handle version upgrades, and answer questions.", "If nobody owns it, treat it as a one-off style guide and set expectations accordingly."]],
     CLOSE("design system work")]),

  post("kubernetes-when-you-need-it", "Do You Actually Need Kubernetes Yet?", "Infrastructure", "2026-02-28",
    "Kubernetes solves real problems. Most teams adopt it before they have those problems.",
    [["The problems it solves", ["Many services, many teams, heterogeneous workloads, and a need for consistent deployment across environments. If you have these, Kubernetes earns its complexity.", "Bin-packing efficiency at scale is a genuine cost argument — above a certain fleet size."]],
     ["The cost people underestimate", ["Cluster upgrades, networking debugging, and the operational knowledge required are ongoing costs, not one-time setup.", "A team of eight running three services will spend more time on the cluster than the cluster saves them."]],
     ["What to use instead, for now", ["Managed container services and platform-as-a-service handle the common case with a fraction of the operational surface.", "Containerise your workloads regardless. That keeps the migration path open without paying for it early."]],
     CLOSE("infrastructure choices")]),

  post("ecommerce-checkout-conversion", "Checkout Changes That Actually Move Conversion", "E-commerce", "2026-02-21",
    "Most checkout advice is folklore. These are the changes that survive an honest test.",
    [["Reduce fields before redesigning", ["Every optional field costs completions. Address autocomplete, saved cards, and removing the account-creation requirement consistently outperform visual redesigns.", "Guest checkout with an optional post-purchase account creation captures both."]],
     ["Show the total cost early", ["Shipping and tax revealed at the last step is the most common abandonment trigger. Show the full cost as soon as the address is known, or earlier.", "Unexpected charges damage trust beyond the single session."]],
     ["Handle failure well", ["Payment failures happen. A clear message, a retained cart, and an alternative method offered immediately recovers a meaningful share of them.", "Log failure reasons by gateway. One provider is often responsible for a disproportionate share."]],
     CLOSE("checkout optimisation")]),

  post("realtime-features-without-websockets", "Real-Time Features Without Overbuilding", "Engineering", "2026-02-14",
    "Not every live feature needs a persistent socket. Match the transport to the update frequency.",
    [["Polling is often enough", ["For updates measured in tens of seconds, a well-cached poll is simpler, cheaper, and easier to debug than a socket layer.", "Conditional requests and sensible cache headers make polling far less expensive than teams assume."]],
     ["Server-sent events for one-way streams", ["Notifications, live status, and streaming AI responses are one-directional. SSE handles them over plain HTTP with automatic reconnection.", "It works on standard server runtimes with no special infrastructure."]],
     ["WebSockets when you need bidirectional", ["Collaborative editing, chat, and multiplayer interaction genuinely need a socket. Accept the operational cost knowingly.", "Plan for reconnection, message ordering, and state resync — these are where socket implementations usually fail."]],
     CLOSE("real-time architecture")]),

  post("technical-debt-conversations", "How to Talk About Technical Debt With Non-Engineers", "Engineering", "2026-02-07",
    "The word 'debt' is right, and the conversation still goes badly. Frame it in delivery terms instead.",
    [["Translate to delivery impact", ["'The auth module needs refactoring' means nothing to a commercial stakeholder. 'Any change to login takes three days instead of half a day, and carries a rollback risk' is actionable.", "Quantify with real examples from the last quarter."]],
     ["Attach it to upcoming work", ["Debt paid in isolation is hard to justify. Debt paid as part of a feature that touches the same code is an obvious efficiency.", "Keep a list mapping each debt item to the roadmap items it will slow down."]],
     ["Accept that some debt stays", ["Not all debt is worth paying. Code that is ugly but stable and rarely touched can be left alone indefinitely.", "Prioritise by change frequency, not by how much it offends you."]],
     CLOSE("technical debt planning")]),

  post("localisation-beyond-translation", "Localisation Is More Than Translation", "Product", "2026-01-31",
    "Dates, currencies, name formats, and text expansion break layouts long before the translation quality matters.",
    [["Layout must survive expansion", ["German and Finnish routinely run thirty percent longer than English. Fixed-width buttons and single-line labels break first.", "Design with the longest expected string, not the English one."]],
     ["Formats are cultural, not cosmetic", ["Date order, decimal separators, currency placement, and address formats vary in ways that cause real errors, not just awkwardness.", "Use platform internationalisation APIs rather than hand-rolled formatting."]],
     ["Right-to-left is a layout change", ["Arabic and Hebrew mirror the entire layout, including icons that imply direction. This is not a font swap.", "Test RTL early. Retrofitting it across a mature interface is expensive."]],
     CLOSE("localisation")]),

  post("observability-before-you-need-it", "Instrument Before the Outage, Not During", "Infrastructure", "2026-01-24",
    "The cheapest time to add logging and tracing is before you need it. The most expensive is at 3am.",
    [["Three signals, wired early", ["Structured logs with a request identifier, distributed traces across service boundaries, and a handful of business metrics. This covers most incident investigations.", "Consistent request identifiers threaded through every log line is the single highest-value practice."]],
     ["Alert on symptoms, not causes", ["Alert on error rate, latency, and queue depth — things users feel. CPU alerts mostly produce noise.", "Every alert should have a runbook link. An alert with no defined action should be a dashboard instead."]],
     ["Practise the investigation", ["Run a game day where someone breaks something on a staging environment and the team investigates using only production tooling.", "The gaps this exposes are the ones that will hurt during a real incident."]],
     CLOSE("observability")]),

  post("mvp-scope-that-holds", "Writing an MVP Scope That Does Not Grow", "Cost & Planning", "2026-01-17",
    "Scope creep is rarely malicious. It is the absence of a written out-list.",
    [["Write the out-list first", ["An in-scope list without an explicit out-of-scope list invites additions. Naming what is deliberately excluded makes each addition a visible decision with a cost.", "Review the out-list at every milestone. Items move in, but by agreement."]],
     ["Define done per feature", ["'User can upload a file' hides a dozen decisions: size limits, formats, virus scanning, failure handling. Specify them or accept the estimate is a guess.", "Acceptance criteria written before the estimate makes the estimate meaningful."]],
     ["Ship something narrow and real", ["A complete flow for one user type beats partial flows for three. Narrow scope that actually works produces usable feedback; broad scope half-built produces none.", "Pick the single most important user journey and finish it."]],
     CLOSE("MVP scoping")]),

  post("choosing-a-database", "Choosing a Database Without Overthinking It", "Data", "2026-01-10",
    "For most products the answer is PostgreSQL. Here is when it genuinely is not.",
    [["Start relational", ["PostgreSQL handles relational data, JSON documents, full-text search, and geospatial queries competently. For most products it is the right answer for years.", "One well-understood database beats three specialised ones a small team half-knows."]],
     ["When a document store fits", ["Genuinely schemaless data with access patterns known in advance and extreme write throughput requirements. These conditions are less common than the marketing suggests.", "Model access patterns first. NoSQL punishes ad-hoc queries you did not design for."]],
     ["When to add a specialised store", ["Add Redis when you have a measured caching need, a search engine when relational full-text stops keeping up, and a time-series store when telemetry volume demands it.", "Each addition is an operational burden. Add on evidence, not anticipation."]],
     CLOSE("database selection")]),

  post("running-effective-standups", "Stand-Ups That Are Worth Fifteen Minutes", "Process", "2026-01-03",
    "Status theatre helps nobody. A stand-up should surface blockers and nothing else.",
    [["Talk about work, not people", ["Walking the board right-to-left focuses on what is close to done. Going person by person produces status reports nobody uses.", "The goal is finishing work in progress, not reporting activity."]],
     ["Blockers get owners, not sympathy", ["A blocker raised without an assigned owner and a time box will be raised again tomorrow.", "Take detailed problem-solving offline with only the relevant people."]],
     ["Cancel it if it is not working", ["A daily meeting that produces no decisions is a recurring cost with no return. Try three times a week, or async written updates.", "The ceremony is not the point. Unblocking is."]],
     CLOSE("delivery process")]),

  post("payment-gateway-integration-pitfalls", "Payment Integration Mistakes That Cost Real Money", "Fintech", "2025-12-27",
    "Idempotency, webhook handling, and reconciliation are where payment integrations actually fail.",
    [["Idempotency is not optional", ["Network retries will duplicate charge requests. Without idempotency keys, customers get charged twice and you find out from support.", "Generate the key client-side per intent, and persist it before calling the gateway."]],
     ["Trust webhooks, not redirects", ["Users close browsers mid-redirect. The webhook is the authoritative signal that a payment succeeded.", "Verify webhook signatures, handle out-of-order delivery, and make handlers idempotent."]],
     ["Reconcile continuously", ["Your database and the gateway will disagree occasionally. Daily automated reconciliation with an exception queue catches this within hours instead of at month end.", "The discrepancies you find early are cheap. The ones you find in an audit are not."]],
     CLOSE("payment integration")]),

  post("app-maintenance-budget", "Budgeting for the Year After Launch", "Cost & Planning", "2025-12-20",
    "Launch is roughly sixty percent of the first-year cost. Here is what the rest goes on.",
    [["OS and dependency upgrades", ["Both mobile platforms ship annual releases with breaking changes and target-SDK deadlines. Missing a deadline means the store stops accepting updates.", "Budget for a predictable upgrade cycle each year, independent of feature work."]],
     ["Bug fixes and support load", ["Real usage finds issues that testing did not. The first three months after launch carry the heaviest fix load.", "Crash-free session rate is the metric to hold a maintenance retainer against."]],
     ["Third-party changes", ["Payment providers, map SDKs, and analytics vendors deprecate APIs on their schedule, not yours.", "Track deprecation notices for every third-party dependency you ship."]],
     CLOSE("post-launch budgeting")]),

  post("recommendation-systems-cold-start", "Recommendations When You Have No Data Yet", "AI", "2025-12-13",
    "Collaborative filtering needs history. Here is what to do for the first few months.",
    [["Start with rules and popularity", ["Trending, recently added, and category-based rules produce reasonable results immediately and give you a baseline to beat.", "Many products never need more than this. Measure before building a model."]],
     ["Content-based fills the gap", ["Item similarity from attributes and text works without user history and handles new items immediately.", "This also solves the new-item cold start that collaborative filtering never fully escapes."]],
     ["Measure against the baseline", ["A model that does not beat 'most popular in category' is a cost with no benefit. Test it honestly.", "Hold out a control group permanently so you can always answer whether the system is helping."]],
     CLOSE("recommendation systems")]),

  post("mobile-app-security-checklist", "A Practical Mobile App Security Checklist", "Security", "2025-12-06",
    "The issues we find most often in mobile security reviews, in rough order of frequency.",
    [["Secrets in the binary", ["API keys and credentials compiled into the app are extractable in minutes. Anything in the binary is public.", "Move privileged operations server-side. The client should never hold a key that grants more than the user's own access."]],
     ["Insecure local storage", ["Tokens and personal data in plain preferences or unencrypted files are readable on a rooted device.", "Use the platform keystore for credentials and encrypt sensitive local data."]],
     ["Weak transport validation", ["Disabled certificate validation in a debug build shipping to production is a recurring finding.", "Enforce TLS validation, and verify it in the release build rather than assuming."]],
     ["Over-permissioned APIs", ["Server endpoints that trust client-supplied identifiers without authorisation checks are the most common serious finding.", "Authorise every request server-side against the authenticated user, on every endpoint."]],
     CLOSE("a mobile security review")]),

  post("choosing-cloud-provider", "Choosing a Cloud Provider on Something Other Than Habit", "Infrastructure", "2025-11-29",
    "The differences that matter are your team's existing skills, your compliance needs, and your actual workload shape.",
    [["Skills beat feature matrices", ["The provider your team already knows will be cheaper to run and faster to debug, regardless of which has the better managed service this quarter.", "Retraining a team is a real cost that never appears in a comparison table."]],
     ["Compliance and residency constrain the choice", ["Data residency requirements, certifications, and government-cloud availability narrow the field quickly for regulated work.", "Establish these constraints before evaluating anything else."]],
     ["Model your actual costs", ["Egress, cross-zone traffic, and managed-service premiums dominate bills more often than compute. Model your specific workload rather than comparing instance prices.", "Tag everything from day one so cost is attributable when it grows."]],
     CLOSE("cloud selection")]),

  post("qa-that-catches-real-bugs", "QA That Finds Bugs Users Would Have Found", "Process", "2025-11-22",
    "Test-case count is not a quality metric. Coverage of real user paths and real conditions is.",
    [["Test the paths that carry traffic", ["Analytics tells you which flows most users take. Those deserve the deepest coverage, regardless of how interesting they are to test.", "Exhaustive coverage of a rarely used admin screen is time spent poorly."]],
     ["Test under real conditions", ["Slow networks, low battery, interrupted calls, backgrounded apps, and low storage produce most production bug reports and almost no test-plan entries.", "Add a conditions pass to the release checklist."]],
     ["Automate the regression, explore the rest", ["Automated tests hold the line on known behaviour. Exploratory testing by a person finds the issues nobody wrote a case for.", "Both are needed. Neither substitutes for the other."]],
     CLOSE("quality process")]),

  post("microservices-when", "Microservices: Mostly Later Than You Think", "Architecture", "2025-11-15",
    "Service boundaries drawn before you understand the domain become distributed coupling.",
    [["The organisational argument is the real one", ["Microservices primarily solve a team-coordination problem: independent deploy cadence for independent teams. With one team, they add cost and remove nothing.", "Split when deployment coordination becomes the bottleneck, not before."]],
     ["Wrong boundaries are expensive", ["A boundary drawn wrongly turns a function call into a network call with partial failure, versioning, and latency. Extracting it back is harder than splitting it was.", "A modular monolith with enforced internal boundaries gives most of the benefit and keeps the option open."]],
     ["Budget the operational surface", ["Service discovery, distributed tracing, contract testing, and per-service pipelines are all real ongoing costs.", "If you cannot staff that, the architecture will degrade into a distributed monolith."]],
     CLOSE("service architecture")]),

  post("content-seo-that-still-works", "Content SEO That Still Works", "Marketing", "2025-11-08",
    "Volume-first content strategies have stopped working. Depth and genuine expertise still do.",
    [["Answer the question completely", ["Thin pages built to rank for a keyword no longer perform. Pages that answer the question thoroughly enough that the reader stops searching do.", "Write for the person, then check the technical basics."]],
     ["Technical basics still matter", ["Crawlability, fast pages, clean internal linking, and structured data are necessary conditions, not differentiators.", "Fix these once, properly, then stop thinking about them."]],
     ["Prune aggressively", ["Large volumes of low-quality pages can drag down a whole domain. Removing or consolidating them often improves overall performance.", "Audit annually. Retire what has never earned a visit."]],
     CLOSE("content strategy")]),

  post("feature-flags-done-right", "Feature Flags Without the Cleanup Debt", "Engineering", "2025-11-01",
    "Flags decouple deploy from release. They also accumulate into untestable branching if nobody removes them.",
    [["Separate flag types", ["Release flags are temporary and must be removed. Operational kill switches and permanent entitlement checks are different things with different lifecycles.", "Mixing them is why flag systems become unmanageable."]],
     ["Give every release flag an expiry", ["Set a removal date at creation and enforce it. A flag older than a quarter is technical debt with a config UI.", "Alert on stale flags so removal is a routine task, not a cleanup project."]],
     ["Test both paths", ["Every flag doubles the state space. Test the on and off paths for anything on a critical journey.", "Untested combinations are where flag-related incidents come from."]],
     CLOSE("feature flag hygiene")]),

  post("estimating-software-honestly", "Estimating Software Without Lying to Anyone", "Cost & Planning", "2025-10-25",
    "Estimates are probabilistic. Presenting them as single numbers is where the trouble starts.",
    [["Give ranges with confidence", ["'Six to nine weeks, most likely seven' communicates more truth than 'seven weeks' and survives contact with reality better.", "Narrow the range as unknowns resolve, and communicate when it narrows."]],
     ["Estimate the unknowns separately", ["Well-understood work estimates reasonably. Genuinely novel work does not. Time-box a spike to convert the unknown into a known before estimating it.", "Padding an unknown does not make it knowable."]],
     ["Track and recalibrate", ["Record estimates against actuals per team. Most teams have a consistent, measurable bias they can correct for.", "This is more useful than any estimation technique."]],
     CLOSE("estimation practice")]),

  post("dark-mode-properly", "Dark Mode Is Not an Inverted Palette", "Design", "2025-10-18",
    "Inverting colours produces a dark theme that is harder to read than the light one. Here is what actually changes.",
    [["Reduce contrast, do not maximise it", ["Pure white on pure black causes halation and eye strain. Off-white text on a dark grey surface reads better.", "Aim for sufficient contrast rather than maximum contrast."]],
     ["Elevation is expressed with lightness", ["In dark themes, surfaces closer to the viewer are lighter, not more shadowed. Shadow alone does not read on a dark background.", "Build an elevation scale of surface colours rather than reusing the light theme's shadows."]],
     ["Desaturate accent colours", ["Saturated colours vibrate against dark backgrounds. Reduce saturation and adjust lightness for each accent.", "Test both themes at the same time — a single token set rarely serves both without adjustment."]],
     CLOSE("theming work")]),

  post("webhooks-you-can-rely-on", "Building Webhook Endpoints That Do Not Lose Events", "Engineering", "2025-10-11",
    "Webhooks arrive out of order, duplicated, and sometimes not at all. Design for all three.",
    [["Acknowledge fast, process later", ["Respond quickly and enqueue the work. Long processing inside the request causes provider timeouts and unnecessary retries.", "The endpoint's only job is validating and queueing."]],
     ["Idempotent handling", ["Providers retry, so duplicates are guaranteed. Deduplicate on the event identifier before processing.", "Store processed event identifiers with a retention window."]],
     ["Reconcile independently", ["Webhooks get lost. A periodic poll of the provider's API catches what the webhook stream missed.", "Never treat webhook delivery as the only source of truth for anything financial."]],
     CLOSE("webhook infrastructure")]),

  post("onboarding-that-reduces-churn", "Onboarding Flows That Reduce Early Churn", "Product", "2025-10-04",
    "Most churn happens before the user reaches the thing your product is good at.",
    [["Define first value precisely", ["Name the specific moment a new user first gets something useful. Every onboarding decision is then measured against time-to-that-moment.", "If the team cannot agree on what that moment is, that is the first problem to fix."]],
     ["Defer everything not required", ["Profile completion, team invitations, and settings can wait. Each field before first value costs completions.", "Ask for information at the moment it becomes necessary, with the reason visible."]],
     ["Instrument every step", ["Funnel analytics per onboarding step shows exactly where users leave. The biggest drop is almost always fixable and almost always surprising.", "Re-measure after each change; onboarding fixes often move the drop rather than removing it."]],
     CLOSE("onboarding design")]),

  post("tech-stack-for-a-new-startup", "Picking a Stack for a Startup You Hope Outlives the Trend Cycle", "Architecture", "2025-09-27",
    "Boring technology, chosen for hiring and support horizon, beats novelty almost every time.",
    [["Optimise for hiring", ["The stack determines who you can hire and how fast. A niche framework with a small talent pool is a recurring recruitment tax.", "Check local job market data before committing."]],
     ["Check the support horizon", ["Look at release cadence, LTS policy, and whether the maintainers are funded. A framework abandoned in two years is a migration you did not budget for.", "Prefer projects with institutional backing and a track record."]],
     ["Spend your novelty budget once", ["Every unfamiliar technology costs learning time and debugging time. Pick at most one genuinely new thing, and make it the one closest to your differentiator.", "Everything else should be the option your team already knows."]],
     CLOSE("stack selection")]),

  post("customer-support-tooling", "Support Tooling That Reduces Ticket Volume", "Product", "2025-09-20",
    "The best support improvement is usually a product change, not a faster response time.",
    [["Categorise, then fix the top three", ["Tagged tickets reveal that a small number of causes generate most of the volume. Fixing those in the product beats staffing to answer them.", "Review the distribution monthly and act on the top items."]],
     ["Self-service for the predictable", ["Order status, password reset, refund requests, and invoice downloads should never require a human.", "Each self-service flow pays back permanently."]],
     ["Give agents context", ["An agent who has to ask for an order number, then a date, then a screenshot is wasting everyone's time. Surface the account state in the ticket.", "Time-to-resolution improves more from context than from headcount."]],
     CLOSE("support tooling")]),

  post("ab-testing-small-traffic", "A/B Testing When You Do Not Have Millions of Users", "Data", "2025-09-13",
    "Low traffic does not make testing useless. It makes small effects undetectable, which is a different problem.",
    [["Calculate the detectable effect first", ["With your traffic and baseline conversion, work out the smallest effect you could detect in a reasonable time. If that is a twenty percent lift, only test changes plausibly that big.", "Running an underpowered test produces a coin flip with a confidence interval."]],
     ["Test upstream where volume is", ["Test on the highest-traffic step of the funnel. Testing a page that four hundred people see per month will never conclude.", "Move the test, not the timeline."]],
     ["Use qualitative methods for small changes", ["Session recordings, usability tests, and support ticket analysis find problems that low-traffic A/B tests cannot measure.", "Five moderated sessions often beat an inconclusive month-long test."]],
     CLOSE("experimentation")]),

  post("migrating-to-app-router", "Migrating a React App to the Next.js App Router", "Engineering", "2025-09-06",
    "The migration is incremental by design. Doing it route by route keeps the app shippable throughout.",
    [["Both routers coexist", ["The App Router and Pages Router can run in the same application, which means you migrate a route at a time and ship continuously.", "Start with a low-risk leaf route to learn the patterns."]],
     ["Server components change data fetching", ["Data fetching moves into the component, and much client-side state management becomes unnecessary. Resist porting the old patterns unchanged.", "Mark client components explicitly and keep them at the leaves of the tree."]],
     ["Caching is the real learning curve", ["Request memoisation, the data cache, and the router cache each behave differently. Most migration surprises come from here.", "Make caching explicit per route and verify with real requests rather than assuming."]],
     CLOSE("a framework migration")]),

  post("building-for-bharat", "Building Products for the Next Hundred Million Users", "Product", "2025-08-30",
    "Language, connectivity, device tier, and payment familiarity are the four constraints that decide adoption.",
    [["Language is not optional", ["English-only interfaces exclude most of the addressable market. Regional language support with genuinely translated content, not machine-translated labels, changes adoption materially.", "Voice input helps where typing in a regional script is slow."]],
     ["Design for intermittent connectivity", ["Assume the connection drops mid-action. Local-first writes and background sync are the baseline requirement.", "Show clear sync state so users know their action was recorded."]],
     ["Payment familiarity drives conversion", ["UPI is the default expectation. Cash on delivery still matters in many categories, and its absence removes a segment entirely.", "Offer the methods your users already trust, even when they cost you more to process."]],
     CLOSE("inclusive product design")]),

  post("code-review-that-helps", "Code Review That Improves the Code and the Team", "Process", "2025-08-23",
    "Slow, nitpicking review is worse than no review. A few conventions fix most of it.",
    [["Automate the mechanical", ["Formatting, linting, and import order should never appear in a human review comment. Automate them and the review becomes about design.", "This alone removes most review friction."]],
     ["Small pull requests", ["A four-hundred-line change gets a thorough review. A four-thousand-line change gets approved. Reviewability is a function of size.", "Split by concern, not by convenience."]],
     ["Distinguish blocking from optional", ["Mark comments as blocking or suggestion. Ambiguity leads to either ignored feedback or unnecessary rework.", "Review within a working day. A pull request waiting three days costs more than the review saves."]],
     CLOSE("engineering process")]),

  post("choosing-analytics-tools", "Choosing Analytics Without Ending Up With Four Tools", "Data", "2025-08-16",
    "Most teams end up with overlapping analytics because nobody owns the event taxonomy.",
    [["Define the taxonomy first", ["A written naming convention and a schema for properties, agreed before instrumentation, prevents the most common analytics failure: unusable data.", "Review new events against the schema before they ship."]],
     ["One product analytics tool", ["Multiple tools with different definitions produce different numbers and endless reconciliation. Pick one and make it authoritative.", "Export raw events to your warehouse so you are never locked in."]],
     ["Server-side where it matters", ["Client-side tracking loses a meaningful share of events to blockers and network failures. Track revenue-critical events server-side.", "Reconcile client and server counts periodically to know your loss rate."]],
     CLOSE("analytics setup")]),
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);

export const POST_CATEGORIES = Array.from(new Set(POSTS.map((p) => p.category))).sort();

/* ------------------------------------------------------------------ */
/* CAREERS                                                             */
/* ------------------------------------------------------------------ */

export type Job = {
  slug: string;
  title: string;
  team: string;
  location: string;
  type: string;
  experience: string;
  about: string;
  responsibilities: string[];
  requirements: string[];
};

export const JOBS: Job[] = [
  {
    slug: "senior-flutter-engineer",
    title: "Senior Flutter Engineer",
    team: "Mobile",
    location: "Hyderabad / Hybrid",
    type: "Full-time",
    experience: "4-7 years",
    about: "Lead mobile delivery on client products, own architecture decisions, and mentor two to three engineers on the team.",
    responsibilities: [
      "Own the architecture and delivery of Flutter applications from kickoff to store release",
      "Write platform channel code where native integration is required",
      "Review pull requests and raise the team's testing standard",
      "Work directly with clients on scoping and technical trade-offs",
    ],
    requirements: [
      "Four or more years building production mobile applications, at least two in Flutter",
      "Shipped and maintained apps on both the App Store and Play Store",
      "Comfortable reading and writing Kotlin or Swift for platform channels",
      "Experience with widget and integration testing in CI",
    ],
  },
  {
    slug: "backend-engineer-nodejs",
    title: "Backend Engineer (Node.js)",
    team: "Platform",
    location: "Hyderabad / Remote",
    type: "Full-time",
    experience: "3-6 years",
    about: "Build and operate the APIs and background systems behind client products, with real ownership of production behaviour.",
    responsibilities: [
      "Design and build TypeScript services, APIs, and background job processing",
      "Own database schema design and query performance",
      "Instrument services with logs, metrics, and traces before launch",
      "Participate in a light on-call rotation for services you build",
    ],
    requirements: [
      "Three or more years building production Node.js services in TypeScript",
      "Strong relational database skills, including query tuning",
      "Experience with queues, retries, and idempotent processing",
      "Comfortable owning production incidents end to end",
    ],
  },
  {
    slug: "product-designer",
    title: "Product Designer",
    team: "Design",
    location: "Hyderabad",
    type: "Full-time",
    experience: "3-6 years",
    about: "Own end-to-end design for client products — research through to a delivered, documented design system.",
    responsibilities: [
      "Run discovery, research, and usability sessions with real users",
      "Design flows, screens, and every non-happy state",
      "Build and maintain component libraries in Figma with variables",
      "Work alongside engineers through implementation, not just handoff",
    ],
    requirements: [
      "A portfolio showing shipped product work with the reasoning behind it",
      "Strong Figma skills including components, variants, and variables",
      "Experience running usability testing and acting on the findings",
      "Working knowledge of accessibility requirements",
    ],
  },
  {
    slug: "devops-engineer",
    title: "DevOps Engineer",
    team: "Platform",
    location: "Hyderabad / Remote",
    type: "Full-time",
    experience: "3-7 years",
    about: "Own infrastructure, pipelines, and cost across a portfolio of client environments.",
    responsibilities: [
      "Build and maintain infrastructure as code across AWS, Azure, and GCP",
      "Own CI/CD pipelines and deployment safety",
      "Set up monitoring, alerting, and on-call runbooks",
      "Track and optimise cloud spend per client environment",
    ],
    requirements: [
      "Three or more years in an infrastructure or platform role",
      "Strong Terraform and container experience",
      "Practical knowledge of at least one major cloud in depth",
      "Scripting ability in Python, Go, or Bash",
    ],
  },
  {
    slug: "qa-automation-engineer",
    title: "QA Automation Engineer",
    team: "Quality",
    location: "Hyderabad",
    type: "Full-time",
    experience: "2-5 years",
    about: "Build the automated test suites that let us release weekly without holding our breath.",
    responsibilities: [
      "Build and maintain end-to-end suites for web and mobile",
      "Own the release checklist and regression coverage",
      "Run exploratory testing on new features before release",
      "Report defects with reproducible steps and clear severity",
    ],
    requirements: [
      "Two or more years in test automation on web or mobile",
      "Experience with Playwright, Cypress, or Appium",
      "Comfortable reading application code to write meaningful tests",
      "Clear written communication for defect reports",
    ],
  },
  {
    slug: "ai-engineer",
    title: "AI Engineer",
    team: "AI",
    location: "Hyderabad / Hybrid",
    type: "Full-time",
    experience: "2-6 years",
    about: "Build LLM and ML features into client products, with the evaluation discipline to prove they work.",
    responsibilities: [
      "Build retrieval, prompting, and agent systems for client products",
      "Create evaluation datasets and automated scoring for every feature",
      "Optimise cost and latency through routing, caching, and model selection",
      "Advise clients honestly on where AI does and does not help",
    ],
    requirements: [
      "Production experience shipping LLM-backed features, not only prototypes",
      "Strong Python, plus TypeScript for application integration",
      "Experience building evaluation harnesses and measuring quality",
      "Understanding of retrieval, embeddings, and vector search trade-offs",
    ],
  },
  {
    slug: "business-development-manager",
    title: "Business Development Manager",
    team: "Growth",
    location: "Hyderabad",
    type: "Full-time",
    experience: "4-8 years",
    about: "Own new client acquisition for services engagements across India and international markets.",
    responsibilities: [
      "Build and manage a pipeline of qualified services opportunities",
      "Run discovery calls and scope engagements with the delivery team",
      "Write proposals and manage commercial negotiation",
      "Own account relationships through the first delivery phase",
    ],
    requirements: [
      "Four or more years selling technology services or software",
      "Comfortable discussing technical scope with engineering leads",
      "Track record of closing multi-month engagements",
      "Strong written proposal skills",
    ],
  },
  {
    slug: "digital-marketing-specialist",
    title: "Digital Marketing Specialist",
    team: "Growth",
    location: "Hyderabad",
    type: "Full-time",
    experience: "2-5 years",
    about: "Run acquisition across SEO, paid, and content for our own brand and for client accounts.",
    responsibilities: [
      "Own technical and content SEO across owned and client properties",
      "Run and optimise paid search and social campaigns",
      "Build reporting that ties spend to pipeline",
      "Produce and commission content against a keyword strategy",
    ],
    requirements: [
      "Two or more years running performance marketing with budget ownership",
      "Hands-on with GA4, Search Console, and ad platforms",
      "Comfortable with analytics implementation and event tracking",
      "Strong writing and editing ability",
    ],
  },
];

export const getJob = (slug: string) => JOBS.find((j) => j.slug === slug);

/* ------------------------------------------------------------------ */
/* SHARED SITE CONTENT                                                 */
/* ------------------------------------------------------------------ */

export const COMPANY = {
  name: "ElevateBox",
  legal: "ElevateScale Technologies Pvt Ltd",
  tagline: "Design, engineering, and AI delivery for teams that need to ship.",
  email: "charan@elevatebox.in",
  phone: "+91 86886 64337",
  whatsapp: "+918688664337",
  timings: "Mon–Sat, 10:00–19:00 IST",
  address: "Hyderabad, Telangana, India",
  hours: "Mon–Sat, 10:00–19:00 IST",
  site: "https://elevatebox.in",
};

/* Where the team has worked and what it has done. Every line here is
   checkable — that is the whole point of it. A round number a prospect
   cannot verify buys nothing; "founding engineer at ClickPe (YC W23)"
   survives being looked up, which is what makes it worth printing.

   Rule for this array: if you cannot produce evidence on request, it does
   not go in. */
export const CREDENTIALS = [
  { k: "ACM ICPC", v: "All India Rank 14", note: "Top 0.17% of 8,000+ competitors" },
  { k: "JPMorgan Chase", v: "Engineering", note: "Cut a core API from 120s to 7s" },
  { k: "Google", v: "Associate Product Manager", note: "2022 cohort" },
  { k: "ClickPe", v: "Founding Engineer", note: "Y Combinator W23" },
  { k: "Acquired by Microsoft", v: "Founding Engineer", note: "AI startup, exited to Microsoft" },
];

/* Company registrations and certifications.
   EMPTY ON PURPOSE — populate only with marks ElevateScale Technologies
   Pvt Ltd actually holds, and put the real registration number in `id` so
   the claim can be checked. The strip renders nothing while this is empty,
   which is the correct behaviour: an unverifiable government badge is worse
   than no badge, because one search disproves it and takes the rest of the
   page down with it.

   Shape: { name: "Startup India (DPIIT)", id: "DIPP123456", img: "/assets/accred-dpiit.svg" } */
export const ACCREDITATIONS: { name: string; id: string; img: string }[] = [];

/* Delivery facts about how the engagement runs. These are commitments the
   company controls, not counts it would have to inflate. */
export const STATS = [
  { value: "2 weeks", label: "Between shippable increments" },
  { value: "Day one", label: "Repos and cloud in your name" },
  { value: "Fixed", label: "Discovery scope and price" },
  { value: "1 day", label: "Reply time on a new brief" },
];

export const PROCESS_STEPS = [
  { n: "01", t: "Requirements", d: "Workshops with your stakeholders to establish scope, constraints, and success criteria." },
  { n: "02", t: "Research", d: "User, competitor, and technical research to challenge assumptions before they become code." },
  { n: "03", t: "Architecture", d: "System design, integration mapping, and a written record of the trade-offs we chose." },
  { n: "04", t: "Design", d: "Flows, screens, and every non-happy state, delivered as a working component system." },
  { n: "05", t: "Build", d: "Two-week increments, each ending in something demo-able on a real environment." },
  { n: "06", t: "Test", d: "Automated regression plus exploratory passes under poor-network and low-end device conditions." },
  { n: "07", t: "Launch", d: "Staged rollout, store submission, monitoring, and a rollback plan agreed in advance." },
  { n: "08", t: "Measure", d: "Instrumentation reviewed against the success criteria set in step one." },
  { n: "09", t: "Support", d: "Maintenance retainer covering OS upgrades, dependency patching, and SLA-backed fixes." },
];

/* EMPTY ON PURPOSE. The six quotes that used to sit here ("Operations
   Director, Logistics, Dubai" and so on) were written copy, not client
   words — invented praise attributed to people who do not exist.

   Every consumer of this array is guarded on `.length`, so the testimonial
   sections simply do not render while it is empty. Add entries only when a
   real client has said the words and agreed to be quoted; a named person at
   a named company is worth more than six anonymous ones. Until then the
   work itself does the arguing, which it does better anyway. */
export const TESTIMONIALS: { quote: string; name: string; role: string }[] = [];

export const FAQS = [
  { q: "How do you price engagements?", a: "Fixed-price for well-defined scopes, and time-and-materials for evolving products. We recommend fixed-price discovery first so the build estimate is based on evidence rather than assumption." },
  { q: "Who owns the code and infrastructure?", a: "You do, throughout. Repository, cloud accounts, and deployment credentials are in your name from the first commit, not transferred at the end." },
  { q: "How long does a typical project take?", a: "A focused MVP is usually eight to sixteen weeks. Platform work and multi-app products run longer. We give a range with a confidence level, and narrow it as unknowns resolve." },
  { q: "Can you work with our existing team?", a: "Yes. We embed in your repositories, stand-ups, and review process, or run a parallel workstream with defined interfaces — whichever fits how you already work." },
  { q: "What happens after launch?", a: "A maintenance retainer covering OS and dependency upgrades, monitoring, and SLA-backed fixes. You can also take it entirely in-house — the documentation and handover support that with are included." },
  { q: "Do you sign NDAs and custom contracts?", a: "Yes. We work under client MSAs and NDAs routinely, including UK, EU, UAE, and US terms, and we can complete security questionnaires as part of onboarding." },
  { q: "Which time zones do you cover?", a: "We commit to a daily overlap window agreed before the contract starts. UAE and Europe get near-full overlap; US clients get a committed morning or evening window." },
  { q: "Will you tell us if we should not build something?", a: "Yes, and we do. If a simpler tool or no build at all serves you better, we say so during discovery rather than after invoicing the build." },
];

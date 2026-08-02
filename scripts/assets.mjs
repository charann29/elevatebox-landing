// Generates every visual asset the site needs, as original SVG.
// Run: node scripts/assets.mjs
//
// Output lands in public/assets/. Everything is authored here — no third-party
// artwork — so it is safe to ship as-is, and any file can be swapped for real
// photography or a client-supplied logo at the same dimensions.
import { mkdirSync, writeFileSync, rmSync } from "node:fs";

const OUT = "public/assets";
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const BRAND = "#013186";
const BRAND_SOFT = "#0145A6";
const ACCENT = "#3EC0DD";
const INK = "#263137";

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]);
const write = (name, body) => writeFileSync(`${OUT}/${name}`, body.trim() + "\n");
const wrap = (w, h, inner, label) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" role="img" aria-label="${esc(label)}">${inner}</svg>`;

const FONT = "Urbanist, ui-sans-serif, system-ui, sans-serif";
let n = 0;

/* ------------------------------------------------------------------ */
/* 1. SERVICE ICONS — 120x130, line art on a tinted rounded panel      */
/* ------------------------------------------------------------------ */

const TINTS = [
  ["#E3ECFF", BRAND],
  ["#F0FCFF", "#0a6f85"],
  ["#FFF6E9", "#8a5a12"],
  ["#EFEAFF", "#4335A7"],
  ["#E7F7EE", "#166b46"],
  ["#FFEBE6", "#a63b23"],
];

// 24x24 line paths, stroked. Authored here.
const ICON_PATHS = {
  mobile: `<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M10.5 18.5h3"/>`,
  web: `<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 9h20M6 6.5h.01M8.5 6.5h.01"/>`,
  design: `<path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="m2 12 10 5 10-5M2 17l10 5 10-5"/>`,
  marketing: `<path d="M3 11v3a1 1 0 0 0 1 1h2l4 4V6L6 10H4a1 1 0 0 0-1 1Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>`,
  gps: `<path d="M12 21s7-6.4 7-11a7 7 0 1 0-14 0c0 4.6 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>`,
  product: `<circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/>`,
  data: `<ellipse cx="12" cy="5.5" rx="8" ry="3"/><path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>`,
  rpa: `<rect x="4" y="8" width="16" height="12" rx="2.5"/><path d="M12 8V4M9 4h6"/><circle cx="9" cy="14" r="1.3"/><circle cx="15" cy="14" r="1.3"/>`,
  saas: `<path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97A6 6 0 0 0 6.2 11 4 4 0 0 0 7 19h10.5Z"/>`,
  team: `<circle cx="9" cy="8" r="3.2"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 5.4a3.2 3.2 0 0 1 0 5.2M17.5 20a6.5 6.5 0 0 0-2-4.7"/>`,
  staffing: `<circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/><path d="m18.5 4 1.4 1.4L22.7 2"/>`,
  cms: `<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11"/>`,
  chain: `<rect x="3" y="9" width="7" height="7" rx="1.6"/><rect x="14" y="9" width="7" height="7" rx="1.6"/><path d="M10 12.5h4"/><path d="M6.5 9V6.5M17.5 16v2.5"/>`,
  iot: `<circle cx="12" cy="12" r="2.6"/><path d="M8.4 8.4a5 5 0 0 0 0 7.2M15.6 15.6a5 5 0 0 0 0-7.2"/><path d="M5.6 5.6a9 9 0 0 0 0 12.8M18.4 18.4a9 9 0 0 0 0-12.8"/>`,
  erp: `<rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5"/>`,
  crm: `<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H10l2 3h5.5A2.5 2.5 0 0 1 20 9.5v8A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-11Z"/><path d="M8.5 13.5h7"/>`,
  cart: `<path d="M2.5 3.5h2.2l2.4 11.2a2 2 0 0 0 2 1.6h7.4a2 2 0 0 0 2-1.55L20 8H6"/><circle cx="9.5" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/>`,
  browser: `<rect x="2.5" y="4" width="19" height="16" rx="2"/><path d="M2.5 8.5h19"/><circle cx="5.5" cy="6.2" r=".7"/><circle cx="8" cy="6.2" r=".7"/>`,
  shield: `<path d="M12 2.5 4.5 5.8v5.4c0 4.6 3.2 8.6 7.5 10 4.3-1.4 7.5-5.4 7.5-10V5.8L12 2.5Z"/><path d="m9 12 2.2 2.2L15.4 10"/>`,
  finance: `<path d="M3 20h18"/><rect x="5" y="11" width="3.2" height="6" rx="1"/><rect x="10.4" y="7" width="3.2" height="10" rx="1"/><rect x="15.8" y="3.5" width="3.2" height="13.5" rx="1"/>`,
  ai: `<circle cx="12" cy="12" r="3"/><circle cx="12" cy="4" r="1.8"/><circle cx="12" cy="20" r="1.8"/><circle cx="4.5" cy="8" r="1.8"/><circle cx="19.5" cy="8" r="1.8"/><circle cx="4.5" cy="16" r="1.8"/><circle cx="19.5" cy="16" r="1.8"/><path d="M12 5.8v3.2M12 15v3.2M6.1 8.9 9.4 10.6M14.6 13.4l3.3 1.7M6.1 15.1l3.3-1.7M14.6 10.6l3.3-1.7"/>`,
  cloud: `<path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97A6 6 0 0 0 6.2 11 4 4 0 0 0 7 19h10.5Z"/><path d="M12 16v-4.5M9.8 13.2 12 11l2.2 2.2"/>`,
};

const ICON_ORDER = [
  "mobile", "web", "design", "marketing", "gps", "product", "data", "rpa",
  "saas", "team", "staffing", "cms", "chain", "iot", "erp", "crm", "cart",
  "browser", "shield", "finance", "ai", "cloud",
];

ICON_ORDER.forEach((name, i) => {
  const [bg, fg] = TINTS[i % TINTS.length];
  const S = 3.1; // 24 -> ~74px
  const dx = (120 - 24 * S) / 2;
  const dy = (130 - 24 * S) / 2;
  const inner = `
  <rect width="120" height="130" rx="22" fill="${bg}"/>
  <g transform="translate(${dx} ${dy}) scale(${S})" stroke="${fg}" stroke-width="1.5"
     stroke-linecap="round" stroke-linejoin="round" fill="none">${ICON_PATHS[name]}</g>`;
  write(`icon-${name}.svg`, wrap(120, 130, inner, `${name} icon`));
  n++;
});

/* ------------------------------------------------------------------ */
/* 2. CLIENT LOGOS — 120x100 wordmark + mark                           */
/* ------------------------------------------------------------------ */

// Each client gets a distinct mark. Placeholder branding authored here —
// swap for the client's own logo file when you have permission and the asset.
const CLIENT_MARKS = {
  "Vamshi Farms": {
    c: "#166b46",
    mark: `<path d="M20 26c0-7 5.6-12 12.5-12 0 7-5.6 12-12.5 12Z" fill="currentColor" opacity=".85"/>
           <path d="M20 26c0-7-5.6-12-12.5-12 0 7 5.6 12 12.5 12Z" fill="currentColor" opacity=".5"/>
           <path d="M20 26v10" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>`,
    lines: ["VAMSHI", "FARMS"],
  },
  "8Meds": {
    c: "#0a6f85",
    mark: `<rect x="8" y="14" width="24" height="24" rx="12" stroke="currentColor" stroke-width="2.6"/>
           <path d="M20 20v12M14 26h12" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>`,
    lines: ["8MEDS"],
  },
  MediBag: {
    c: BRAND,
    mark: `<rect x="7" y="18" width="26" height="20" rx="4" stroke="currentColor" stroke-width="2.4"/>
           <path d="M15 18v-3a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v3" stroke="currentColor" stroke-width="2.4"/>
           <path d="M20 24v8M16 28h8" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>`,
    lines: ["MEDIBAG"],
  },
  OnEasy: {
    c: "#4335A7",
    mark: `<circle cx="20" cy="26" r="6" stroke="currentColor" stroke-width="2.4"/>
           <circle cx="20" cy="13" r="3" fill="currentColor"/>
           <circle cx="9" cy="33" r="3" fill="currentColor"/>
           <circle cx="31" cy="33" r="3" fill="currentColor"/>
           <path d="M20 16v4M14.9 29.2l-3.3 2.1M25.1 29.2l3.3 2.1" stroke="currentColor" stroke-width="1.8"/>`,
    lines: ["ONEASY"],
  },
  "Creator Chart": {
    c: "#a63b23",
    mark: `<path d="M8 36V24M16 36V16M24 36V20M32 36V12" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>`,
    lines: ["CREATOR", "CHART"],
  },
};

Object.entries(CLIENT_MARKS).forEach(([name, { c, mark, lines }]) => {
  const startY = lines.length > 1 ? 62 : 66;
  const text = lines
    .map(
      (l, i) =>
        `<text x="60" y="${startY + i * 13}" fill="${c}" font-family="${FONT}" font-size="13"
           font-weight="800" letter-spacing="1.2" text-anchor="middle">${esc(l)}</text>`,
    )
    .join("");
  const inner = `<g color="${c}" transform="translate(40 4) scale(1)">${mark}</g>${text}`;
  write(`client-${slug(name)}.svg`, wrap(120, 100, inner, `${name} logo`));
  n++;
});

/* ------------------------------------------------------------------ */
/* 3. PROJECT MOCKUPS — 260x520 phone frame with per-app UI            */
/* ------------------------------------------------------------------ */

const phone = (accent, bg, screen, label) => {
  const inner = `
  <defs>
    <clipPath id="scr"><rect x="14" y="14" width="232" height="492" rx="30"/></clipPath>
    <linearGradient id="bezel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2b3440"/><stop offset="1" stop-color="#11161c"/>
    </linearGradient>
  </defs>
  <rect x="4" y="4" width="252" height="512" rx="40" fill="url(#bezel)"/>
  <rect x="14" y="14" width="232" height="492" rx="30" fill="${bg}"/>
  <g clip-path="url(#scr)">${screen}</g>
  <rect x="95" y="20" width="70" height="15" rx="7.5" fill="#11161c"/>
  <rect x="14" y="14" width="232" height="492" rx="30" fill="none" stroke="#000" stroke-opacity=".12"/>
  <rect x="98" y="492" width="64" height="4" rx="2" fill="${accent}" opacity=".5"/>`;
  return wrap(260, 520, inner, label);
};

const bar = (x, y, w, h, fill, o = 1, r = 4) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" opacity="${o}"/>`;
const txt = (x, y, s, size, fill, weight = 600, anchor = "start") =>
  `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${esc(s)}</text>`;

// Vamshi Farms — produce storefront grid
{
  const A = "#166b46";
  let s = `<rect x="14" y="14" width="232" height="96" fill="${A}"/>
    ${txt(34, 62, "Vamshi Farms", 15, "#fff", 800)}
    ${txt(34, 80, "Fresh from the farm", 9.5, "#fff", 500)}
    ${bar(34, 92, 192, 26, "#fff", 1, 13)}
    ${txt(46, 109, "Search produce", 9, "#8b9aa5", 500)}`;
  const items = [
    ["Tomatoes", "₹40 / kg"], ["Spinach", "₹25 / bunch"],
    ["Mangoes", "₹120 / kg"], ["Onions", "₹35 / kg"],
    ["Carrots", "₹55 / kg"], ["Bananas", "₹60 / dz"],
  ];
  items.forEach(([nm, pr], i) => {
    const x = 30 + (i % 2) * 104;
    const y = 140 + Math.floor(i / 2) * 116;
    s += `${bar(x, y, 92, 104, "#fff", 1, 12)}
      ${bar(x + 8, y + 8, 76, 52, "#E7F7EE", 1, 8)}
      <circle cx="${x + 46}" cy="${y + 34}" r="16" fill="${A}" opacity=".28"/>
      ${txt(x + 8, y + 76, nm, 9.5, INK, 700)}
      ${txt(x + 8, y + 90, pr, 9, A, 700)}`;
  });
  s += `${bar(14, 464, 232, 42, "#fff", 1, 0)}
    ${bar(34, 478, 40, 5, A, 1, 3)}${bar(94, 478, 40, 5, "#c9d3d9", 1, 3)}
    ${bar(154, 478, 40, 5, "#c9d3d9", 1, 3)}`;
  write("project-vamshi-farms.svg", phone(A, "#F5F8F6", s, "Vamshi Farms app"));
  n++;
}

// 8Meds — pharmacy marketplace
{
  const A = "#0a6f85";
  let s = `<rect x="14" y="14" width="232" height="88" fill="${A}"/>
    ${txt(34, 60, "8Meds", 16, "#fff", 800)}
    ${txt(34, 78, "Order from nearby pharmacies", 9, "#fff", 500)}
    ${bar(30, 112, 200, 34, "#fff", 1, 10)}
    ${txt(44, 133, "Upload prescription", 9.5, A, 700)}`;
  const meds = [
    ["Paracetamol 500mg", "MedPlus · 0.8 km", "₹32"],
    ["Amoxicillin 250mg", "Apollo · 1.2 km", "₹96"],
    ["Vitamin D3", "Wellness · 1.6 km", "₹210"],
    ["Cough Syrup", "CityCare · 2.1 km", "₹78"],
  ];
  meds.forEach(([nm, ph, pr], i) => {
    const y = 164 + i * 68;
    s += `${bar(30, y, 200, 58, "#fff", 1, 10)}
      ${bar(40, y + 12, 34, 34, "#F0FCFF", 1, 8)}
      <circle cx="57" cy="${y + 29}" r="9" fill="${A}" opacity=".3"/>
      ${txt(84, y + 24, nm, 9.5, INK, 700)}
      ${txt(84, y + 38, ph, 8.5, "#8b9aa5", 500)}
      ${txt(220, y + 32, pr, 10, A, 800, "end")}`;
  });
  s += `${bar(14, 464, 232, 42, "#fff", 1, 0)}${bar(34, 478, 40, 5, A, 1, 3)}
    ${bar(94, 478, 40, 5, "#c9d3d9", 1, 3)}${bar(154, 478, 40, 5, "#c9d3d9", 1, 3)}`;
  write("project-8meds.svg", phone(A, "#F4F9FB", s, "8Meds app"));
  n++;
}

// MediBag — healthcare
{
  const A = BRAND;
  let s = `<rect x="14" y="14" width="232" height="132" fill="${A}"/>
    ${txt(34, 58, "MediBag", 16, "#fff", 800)}
    ${txt(34, 76, "Your health, organised", 9, "#fff", 500)}
    ${bar(30, 92, 200, 44, "#fff", .14, 10)}
    ${txt(44, 112, "Next appointment", 8.5, "#cfe0ff", 600)}
    ${txt(44, 127, "Dr. Rao · Tomorrow 10:30", 9.5, "#fff", 700)}`;
  const tiles = ["Medicines", "Lab Tests", "Consult", "Records"];
  tiles.forEach((t, i) => {
    const x = 30 + (i % 2) * 104;
    const y = 162 + Math.floor(i / 2) * 78;
    s += `${bar(x, y, 92, 66, "#fff", 1, 12)}
      <circle cx="${x + 24}" cy="${y + 26}" r="12" fill="${ACCENT}" opacity=".3"/>
      ${txt(x + 10, y + 55, t, 9.5, INK, 700)}`;
  });
  s += `${txt(30, 338, "Recent orders", 10.5, INK, 800)}`;
  [0, 1, 2].forEach((i) => {
    const y = 352 + i * 38;
    s += `${bar(30, y, 200, 30, "#fff", 1, 8)}
      ${bar(40, y + 10, 10, 10, A, .3, 3)}
      ${bar(60, y + 10, 96, 5, "#d5dde3", 1, 2.5)}
      ${bar(60, y + 19, 60, 4, "#e4eaee", 1, 2)}`;
  });
  s += `${bar(14, 464, 232, 42, "#fff", 1, 0)}${bar(34, 478, 40, 5, A, 1, 3)}
    ${bar(94, 478, 40, 5, "#c9d3d9", 1, 3)}${bar(154, 478, 40, 5, "#c9d3d9", 1, 3)}`;
  write("project-medibag.svg", phone(A, "#F4F6FA", s, "MediBag app"));
  n++;
}

// OnEasy — AI agents console
{
  const A = "#4335A7";
  const dark = "#12111c";
  let s = `<rect x="14" y="14" width="232" height="492" fill="${dark}"/>
    ${txt(34, 62, "OnEasy", 16, "#fff", 800)}
    ${txt(34, 79, "Agents · 4 running", 9, "#9a93c9", 500)}`;
  const agents = [
    ["Inbox Triage", "running", "#4ade80"],
    ["Invoice Extract", "running", "#4ade80"],
    ["Lead Enrich", "queued", "#fbbf24"],
    ["Report Digest", "running", "#4ade80"],
  ];
  agents.forEach(([nm, st, col], i) => {
    const y = 100 + i * 62;
    s += `${bar(30, y, 200, 52, "#ffffff", .06, 10)}
      <circle cx="46" cy="${y + 26}" r="4" fill="${col}"/>
      ${txt(60, y + 23, nm, 10, "#fff", 700)}
      ${txt(60, y + 37, st, 8.5, "#9a93c9", 500)}
      ${bar(190, y + 21, 28, 10, A, .9, 5)}`;
  });
  s += `${txt(30, 372, "Recent tool calls", 10, "#9a93c9", 700)}`;
  [0, 1, 2, 3].forEach((i) => {
    const y = 386 + i * 24;
    s += `${bar(30, y, 200, 18, "#fff", .05, 5)}
      ${bar(38, y + 6, 6, 6, ACCENT, .9, 2)}
      ${bar(52, y + 7, 100 - i * 14, 4, "#fff", .22, 2)}`;
  });
  write("project-oneasy.svg", phone(A, dark, s, "OnEasy agents console"));
  n++;
}

// Creator Chart — analytics/rankings
{
  const A = "#a63b23";
  let s = `<rect x="14" y="14" width="232" height="92" fill="#1b1416"/>
    ${txt(34, 60, "Creator Chart", 15, "#fff", 800)}
    ${txt(34, 78, "Top creators this week", 9, "#c7a99f", 500)}`;
  // chart
  s += `${bar(30, 120, 200, 92, "#fff", 1, 12)}`;
  const pts = [72, 54, 66, 40, 48, 28, 34];
  let path = "";
  pts.forEach((v, i) => {
    const x = 44 + i * 29;
    const y = 196 - v;
    path += `${i ? "L" : "M"}${x} ${y} `;
    s += `<circle cx="${x}" cy="${y}" r="2.6" fill="${A}"/>`;
  });
  s = s.replace("</text>", "</text>"); // noop, keep order
  s += `<path d="${path}" stroke="${A}" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  const rows = [
    ["1", "@studioline", "1.2M"],
    ["2", "@fieldnotes", "940K"],
    ["3", "@northbeam", "770K"],
    ["4", "@quietloop", "612K"],
  ];
  rows.forEach(([r, h, f], i) => {
    const y = 232 + i * 56;
    s += `${bar(30, y, 200, 46, "#fff", 1, 10)}
      ${txt(46, y + 29, r, 12, A, 800)}
      <circle cx="76" cy="${y + 23}" r="13" fill="${A}" opacity=".18"/>
      ${txt(98, y + 21, h, 9.5, INK, 700)}
      ${txt(98, y + 34, "followers", 8, "#8b9aa5", 500)}
      ${txt(220, y + 28, f, 10, INK, 800, "end")}`;
  });
  s += `${bar(14, 464, 232, 42, "#fff", 1, 0)}${bar(34, 478, 40, 5, A, 1, 3)}
    ${bar(94, 478, 40, 5, "#c9d3d9", 1, 3)}${bar(154, 478, 40, 5, "#c9d3d9", 1, 3)}`;
  write("project-creator-chart.svg", phone(A, "#FAF6F5", s, "Creator Chart"));
  n++;
}

/* ------------------------------------------------------------------ */
/* 4. HERO COLLAGE — 780x680 tilted floating cards + centre phone      */
/* ------------------------------------------------------------------ */
{
  const W = 780;
  const H = 680;

  // --- stats card -------------------------------------------------
  const stats = [
    ["150+", "Products shipped"],
    ["60+", "Engineers & designers"],
    ["12", "Countries served"],
  ];
  const statsCard = `
    <rect width="256" height="228" rx="18" fill="#fff" filter="url(#sh)"/>
    ${txt(24, 36, "Our track record", 11, "#8b9aa5", 700)}
    ${stats
      .map(
        ([v, l], i) => `
      ${bar(24, 50 + i * 58, 208, 48, "#F5F8FC", 1, 12)}
      ${txt(38, 74 + i * 58, v, 19, BRAND, 800)}
      ${txt(100, 72 + i * 58, l, 9.5, INK, 600)}
      ${bar(100, 78 + i * 58, 96 - i * 12, 4, ACCENT, 0.45, 2)}`,
      )
      .join("")}
    ${txt(24, 212, "Product engineering", 9.5, ACCENT, 700)}`;

  // --- tech stack card --------------------------------------------
  const stack = [
    ["Next", ACCENT], ["Flutter", "#4335A7"], ["Node", "#166b46"],
    ["Python", "#8a5a12"], ["Kotlin", "#a63b23"], ["Swift", BRAND_SOFT],
  ];
  const stackCard = `
    <rect width="226" height="206" rx="18" fill="#fff" filter="url(#sh)"/>
    ${txt(22, 34, "What we build with", 11, "#8b9aa5", 700)}
    ${stack
      .map(([nm, c], i) => {
        const x = 22 + (i % 3) * 62;
        const y = 48 + Math.floor(i / 3) * 68;
        return `${bar(x, y, 54, 54, "#F5F8FC", 1, 14)}
          <circle cx="${x + 27}" cy="${y + 23}" r="11" fill="${c}" opacity=".28"/>
          <circle cx="${x + 27}" cy="${y + 23}" r="5" fill="${c}"/>
          ${txt(x + 27, y + 48, nm, 7.5, INK, 700, "middle")}`;
      })
      .join("")}
    ${txt(22, 192, "and more", 9, ACCENT, 700)}`;

  // --- dashboard card ---------------------------------------------
  const bars = [34, 52, 28, 66, 44, 74, 40];
  const dashCard = `
    <rect width="266" height="228" rx="18" fill="#fff" filter="url(#sh)"/>
    ${bar(0, 0, 266, 34, "#F5F8FC", 1, 18)}
    <rect y="20" width="266" height="14" fill="#F5F8FC"/>
    <circle cx="20" cy="17" r="4" fill="#e05c4a"/><circle cx="34" cy="17" r="4" fill="#e8b53f"/>
    <circle cx="48" cy="17" r="4" fill="#4caf7d"/>
    ${txt(22, 60, "Web dashboard", 11, INK, 800)}
    ${bar(22, 70, 60, 4, ACCENT, 1, 2)}
    ${bar(22, 86, 148, 76, "#F5F8FC", 1, 12)}
    ${bars
      .map(
        (v, i) =>
          `<rect x="${34 + i * 17}" y="${150 - v}" width="9" height="${v}" rx="4" fill="${BRAND}" opacity="${0.35 + i * 0.09}"/>`,
      )
      .join("")}
    ${bar(182, 86, 62, 76, "#F0FCFF", 1, 12)}
    <circle cx="213" cy="118" r="22" fill="none" stroke="${ACCENT}" stroke-width="7" opacity=".35"/>
    <circle cx="213" cy="118" r="22" fill="none" stroke="${BRAND}" stroke-width="7"
            stroke-dasharray="98 140" stroke-linecap="round" transform="rotate(-90 213 118)"/>
    ${[0, 1, 2]
      .map(
        (i) => `${bar(22, 176 + i * 17, 222, 11, "#F5F8FC", 1, 5)}
        ${bar(28, 179 + i * 17, 5, 5, ACCENT, 0.8, 2)}
        ${bar(42, 180 + i * 17, 120 - i * 26, 4, INK, 0.18, 2)}`,
      )
      .join("")}`;

  // --- review / social card ---------------------------------------
  const reviewCard = `
    <rect width="228" height="176" rx="18" fill="#fff" filter="url(#sh)"/>
    <circle cx="34" cy="34" r="14" fill="${BRAND}" opacity=".15"/>
    <circle cx="34" cy="34" r="6" fill="${BRAND}"/>
    ${txt(58, 31, "Client review", 10, INK, 800)}
    ${txt(58, 44, "Delivery feedback", 8.5, "#8b9aa5", 500)}
    <g fill="${ACCENT}">${[0, 1, 2, 3, 4]
      .map((i) => `<circle cx="${34 + i * 16}" cy="70" r="5"/>`)
      .join("")}</g>
    ${[0, 1, 2]
      .map(
        (i) =>
          `${bar(24, 90 + i * 15, 180 - i * 34, 6, INK, 0.16, 3)}`,
      )
      .join("")}
    ${bar(24, 146, 74, 20, "#F0FCFF", 1, 10)}
    ${txt(38, 160, "Shipped", 8.5, BRAND, 700)}
    ${bar(108, 146, 74, 20, "#E7F7EE", 1, 10)}
    ${txt(122, 160, "On time", 8.5, "#166b46", 700)}`;

  // --- centre phone -----------------------------------------------
  const tiles = [
    ["Discovery", ACCENT], ["Design", "#4335A7"],
    ["Build", "#166b46"], ["Launch", "#8a5a12"],
  ];
  const phoneScreen = `
    <rect x="12" y="12" width="196" height="416" rx="26" fill="#F5F8FC"/>
    <rect x="12" y="12" width="196" height="150" rx="26" fill="${BRAND}"/>
    <rect x="12" y="120" width="196" height="42" fill="${BRAND}"/>
    ${txt(32, 62, "ElevateBox", 15, "#fff", 800)}
    ${txt(32, 79, "Project workspace", 8.5, "#bcd0f5", 500)}
    ${bar(30, 92, 160, 44, "#fff", 0.14, 12)}
    ${txt(44, 110, "Current sprint", 8, "#bcd0f5", 600)}
    ${txt(44, 126, "Increment 6 · shipped", 9.5, "#fff", 700)}
    ${tiles
      .map(([t, c], i) => {
        const x = 30 + (i % 2) * 84;
        const y = 180 + Math.floor(i / 2) * 76;
        return `${bar(x, y, 74, 64, "#fff", 1, 14)}
          <circle cx="${x + 22}" cy="${y + 24}" r="11" fill="${c}" opacity=".26"/>
          <circle cx="${x + 22}" cy="${y + 24}" r="4.5" fill="${c}"/>
          ${txt(x + 10, y + 52, t, 8.5, INK, 700)}`;
      })
      .join("")}
    ${txt(30, 352, "Recent activity", 9.5, INK, 800)}
    ${[0, 1, 2]
      .map(
        (i) => `${bar(30, 362 + i * 22, 158, 17, "#fff", 1, 6)}
        ${bar(38, 367 + i * 22, 6, 6, ACCENT, 0.9, 2)}
        ${bar(52, 368 + i * 22, 104 - i * 20, 4, INK, 0.16, 2)}`,
      )
      .join("")}`;

  const inner = `
  <defs>
    <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#F7FBFF"/><stop offset="1" stop-color="#EAF1FF"/>
    </linearGradient>
    <linearGradient id="bez" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2b3440"/><stop offset="1" stop-color="#11161c"/>
    </linearGradient>
    <filter id="sh" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="${BRAND}" flood-opacity=".16"/>
    </filter>
    <clipPath id="pscr"><rect x="12" y="12" width="196" height="416" rx="26"/></clipPath>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#hg)"/>
  <circle cx="660" cy="90" r="170" fill="${ACCENT}" opacity=".16"/>
  <circle cx="110" cy="600" r="140" fill="${BRAND}" opacity=".07"/>
  <g opacity=".2">${Array.from({ length: 84 }, (_, i) => {
    const x = 30 + (i % 12) * 15;
    const y = 26 + Math.floor(i / 12) * 15;
    return `<circle cx="${x}" cy="${y}" r="1.7" fill="${BRAND}"/>`;
  }).join("")}</g>

  <g transform="translate(14 86) rotate(-7)">${statsCard}</g>
  <g transform="translate(6 380) rotate(-4)">${reviewCard}</g>
  <g transform="translate(536 40) rotate(7)">${stackCard}</g>
  <g transform="translate(496 396) rotate(4)">${dashCard}</g>

  <g transform="translate(270 116)">
    <rect x="2" y="2" width="216" height="436" rx="36" fill="url(#bez)" filter="url(#sh)"/>
    <g clip-path="url(#pscr)">${phoneScreen}</g>
    <rect x="78" y="18" width="64" height="14" rx="7" fill="#11161c"/>
    <rect x="82" y="418" width="56" height="4" rx="2" fill="${ACCENT}" opacity=".5"/>
  </g>`;

  write("hero.svg", wrap(W, H, inner, "ElevateBox product delivery illustration"));
  n++;
}

/* ------------------------------------------------------------------ */
/* 5. SECTION PATTERN + OG CARD + APP ICON                             */
/* ------------------------------------------------------------------ */
{
  const dots = Array.from({ length: 160 }, (_, i) => {
    const x = 6 + (i % 20) * 16;
    const y = 6 + Math.floor(i / 20) * 16;
    return `<circle cx="${x}" cy="${y}" r="1.8" fill="${BRAND}"/>`;
  }).join("");
  write("pattern-dots.svg", wrap(320, 128, `<g opacity=".28">${dots}</g>`, "Dot pattern"));
  n++;
}

{
  const inner = `
  <defs><linearGradient id="og" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${BRAND}"/><stop offset="1" stop-color="#001f57"/>
  </linearGradient></defs>
  <rect width="1200" height="630" fill="url(#og)"/>
  <circle cx="1050" cy="120" r="220" fill="${ACCENT}" opacity=".16"/>
  <circle cx="120" cy="560" r="170" fill="${ACCENT}" opacity=".1"/>
  <g opacity=".18">${Array.from({ length: 120 }, (_, i) => {
    const x = 70 + (i % 20) * 18;
    const y = 70 + Math.floor(i / 20) * 18;
    return `<circle cx="${x}" cy="${y}" r="2.4" fill="#fff"/>`;
  }).join("")}</g>
  <text x="90" y="300" font-family="${FONT}" font-size="82" font-weight="800" fill="#fff">ElevateBox</text>
  <text x="90" y="368" font-family="${FONT}" font-size="30" font-weight="500" fill="${ACCENT}">Design, engineering, and AI delivery</text>
  <rect x="90" y="410" width="180" height="6" rx="3" fill="${ACCENT}"/>`;
  write("og.svg", wrap(1200, 630, inner, "ElevateBox"));
  n++;
}

{
  const inner = `
  <rect width="512" height="512" rx="112" fill="${BRAND}"/>
  <path d="M256 128 150 340h72l34-72 34 72h72L256 128Z" fill="${ACCENT}"/>
  <rect x="182" y="360" width="148" height="26" rx="13" fill="#fff" opacity=".9"/>`;
  write("app-icon.svg", wrap(512, 512, inner, "ElevateBox icon"));
  n++;
}

/* ------------------------------------------------------------------ */
/* 6. BLOG COVERS — 600x400, one per category                          */
/* ------------------------------------------------------------------ */

const COVER_CATS = [
  "Cost & Planning", "Technology", "AI", "Engineering", "Performance",
  "Logistics", "SaaS", "Design", "Data", "Mobile", "Enterprise", "Security",
  "Hiring", "Product", "Infrastructure", "Process", "Automation",
  "Architecture", "E-commerce", "Fintech", "Marketing",
];

COVER_CATS.forEach((cat, i) => {
  const [bg, fg] = TINTS[i % TINTS.length];
  // Deterministic pseudo-random from the index — no Math.random, so reruns
  // produce byte-identical files.
  const r = (k) => ((Math.sin(i * 12.9898 + k * 78.233) * 43758.5453) % 1 + 1) % 1;
  const glyphs = Array.from({ length: 7 }, (_, k) => {
    const x = 40 + r(k) * 500;
    const y = 40 + r(k + 20) * 320;
    const s = 14 + r(k + 40) * 34;
    const kind = Math.floor(r(k + 60) * 3);
    if (kind === 0) return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(s / 2).toFixed(1)}" fill="${fg}" opacity=".12"/>`;
    if (kind === 1) return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${s.toFixed(1)}" height="${s.toFixed(1)}" rx="${(s / 4).toFixed(1)}" fill="${fg}" opacity=".1"/>`;
    return `<path d="M${x.toFixed(1)} ${(y + s).toFixed(1)} L${(x + s / 2).toFixed(1)} ${y.toFixed(1)} L${(x + s).toFixed(1)} ${(y + s).toFixed(1)} Z" fill="${fg}" opacity=".1"/>`;
  }).join("");

  const inner = `
  <rect width="600" height="400" fill="${bg}"/>
  ${glyphs}
  <g opacity=".3">${Array.from({ length: 40 }, (_, k) => {
    const x = 460 + (k % 8) * 16;
    const y = 300 + Math.floor(k / 8) * 16;
    return `<circle cx="${x}" cy="${y}" r="2" fill="${fg}"/>`;
  }).join("")}</g>
  <rect x="40" y="150" width="360" height="120" rx="18" fill="#fff" opacity=".92"/>
  <rect x="64" y="178" width="46" height="8" rx="4" fill="${fg}"/>
  ${txt(64, 218, cat, 24, fg, 800)}
  <rect x="64" y="234" width="220" height="7" rx="3.5" fill="${INK}" opacity=".2"/>
  <rect x="64" y="249" width="150" height="7" rx="3.5" fill="${INK}" opacity=".12"/>
  ${txt(560, 372, "ElevateBox", 13, fg, 700, "end")}`;
  write(`cover-${slug(cat)}.svg`, wrap(600, 400, inner, `${cat} article cover`));
  n++;
});

/* ------------------------------------------------------------------ */
/* 7. AVATARS — 160x160, geometric, no likeness of a real person       */
/* ------------------------------------------------------------------ */

for (let i = 0; i < 8; i++) {
  const [bg, fg] = TINTS[i % TINTS.length];
  const inner = `
  <rect width="160" height="160" rx="80" fill="${bg}"/>
  <circle cx="80" cy="64" r="26" fill="${fg}" opacity=".8"/>
  <path d="M24 150a56 56 0 0 1 112 0Z" fill="${fg}" opacity=".55"/>
  <circle cx="80" cy="80" r="78" fill="none" stroke="${fg}" stroke-width="2" opacity=".25"/>`;
  write(`avatar-${i + 1}.svg`, wrap(160, 160, inner, "Client avatar"));
  n++;
}

/* ------------------------------------------------------------------ */
/* 8. PROCESS STEP BADGES — 60x60                                      */
/* ------------------------------------------------------------------ */

const STEPS = ["01", "02", "03", "04", "05", "06", "07", "08", "09"];
STEPS.forEach((s, i) => {
  const [bg, fg] = TINTS[i % TINTS.length];
  const inner = `
  <rect width="60" height="60" rx="18" fill="${bg}"/>
  <circle cx="30" cy="30" r="22" fill="none" stroke="${fg}" stroke-width="2" opacity=".3"/>
  ${txt(30, 37, s, 19, fg, 800, "middle")}`;
  write(`step-${s}.svg`, wrap(60, 60, inner, `Step ${s}`));
  n++;
});

/* ------------------------------------------------------------------ */
/* 9. FEATURE CARDS — 220x240                                          */
/* ------------------------------------------------------------------ */

const FEATURES = ["Discovery", "Design", "Build", "Test", "Launch", "Support"];
FEATURES.forEach((f, i) => {
  const [bg, fg] = TINTS[i % TINTS.length];
  const inner = `
  <rect width="220" height="240" rx="20" fill="${bg}"/>
  <circle cx="110" cy="90" r="44" fill="${fg}" opacity=".18"/>
  <circle cx="110" cy="90" r="22" fill="${fg}" opacity=".55"/>
  ${txt(110, 168, f, 17, fg, 800, "middle")}
  <rect x="56" y="184" width="108" height="6" rx="3" fill="${INK}" opacity=".18"/>
  <rect x="76" y="198" width="68" height="6" rx="3" fill="${INK}" opacity=".12"/>`;
  write(`feature-${slug(f)}.svg`, wrap(220, 240, inner, `${f} stage`));
  n++;
});

/* ------------------------------------------------------------------ */
/* 10. BANNERS — 480x180                                               */
/* ------------------------------------------------------------------ */

["Hiring now", "Free consultation", "Case studies"].forEach((b, i) => {
  const [bg, fg] = TINTS[i % TINTS.length];
  const inner = `
  <rect width="480" height="180" rx="18" fill="${bg}"/>
  <circle cx="410" cy="40" r="70" fill="${fg}" opacity=".12"/>
  <rect x="32" y="52" width="40" height="7" rx="3.5" fill="${fg}"/>
  ${txt(32, 96, b, 26, fg, 800)}
  <rect x="32" y="112" width="200" height="6" rx="3" fill="${INK}" opacity=".18"/>
  <rect x="32" y="130" width="112" height="26" rx="13" fill="${fg}" opacity=".9"/>
  <rect x="58" y="141" width="60" height="5" rx="2.5" fill="#fff" opacity=".9"/>`;
  write(`banner-${slug(b)}.svg`, wrap(480, 180, inner, b));
  n++;
});

/* ------------------------------------------------------------------ */
/* 11. FLAG — 28x23 (national flag, public domain design)              */
/* ------------------------------------------------------------------ */
{
  const inner = `
  <rect width="28" height="23" rx="2.5" fill="#fff"/>
  <rect width="28" height="7.67" rx="2.5" fill="#FF9933"/><rect y="5" width="28" height="2.67" fill="#FF9933"/>
  <rect y="15.33" width="28" height="7.67" rx="2.5" fill="#138808"/><rect y="15.33" width="28" height="2.67" fill="#138808"/>
  <circle cx="14" cy="11.5" r="3" fill="none" stroke="#000080" stroke-width="1"/>
  <circle cx="14" cy="11.5" r=".9" fill="#000080"/>`;
  write("flag-in.svg", wrap(28, 23, inner, "India"));
  n++;
}

/* ------------------------------------------------------------------ */
/* 12. SERVICE SHOWCASES — 520x320, one per accordion band             */
/* ------------------------------------------------------------------ */

const showcase = (name, body, label) =>
  write(
    `showcase-${name}.svg`,
    wrap(
      520,
      320,
      `<defs>
        <filter id="ss" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#000" flood-opacity=".22"/>
        </filter>
      </defs>${body}`,
      label,
    ),
  );

// Mini phone used across showcases
const miniPhone = (w, h, accent, screenBg, content = "") => `
  <rect width="${w}" height="${h}" rx="${w * 0.12}" fill="#1b2029"/>
  <rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="${w * 0.1}" fill="${screenBg}"/>
  <rect x="${w * 0.32}" y="7" width="${w * 0.36}" height="4" rx="2" fill="#1b2029"/>
  ${content}
  <rect x="${w * 0.34}" y="${h - 10}" width="${w * 0.32}" height="3" rx="1.5" fill="${accent}" opacity=".6"/>`;

// 1. App development — tilted phone fan
{
  const phones = [
    [26, 56, -12, "#EFEAFF", "#4335A7"],
    [150, 26, -4, "#E3ECFF", BRAND],
    [274, 34, 5, "#F0FCFF", ACCENT],
    [392, 66, 13, "#FFF6E9", "#8a5a12"],
  ];
  const body = phones
    .map(([x, y, r, bg, ac]) => {
      const rows = [0, 1, 2, 3]
        .map(
          (i) =>
            `<rect x="14" y="${58 + i * 26}" width="${72 - i * 10}" height="7" rx="3.5" fill="${ac}" opacity="${0.5 - i * 0.08}"/>`,
        )
        .join("");
      const head = `<rect x="4" y="4" width="92" height="44" rx="10" fill="${ac}" opacity=".82"/>
        <circle cx="24" cy="26" r="9" fill="#fff" opacity=".85"/>
        <rect x="40" y="20" width="42" height="5" rx="2.5" fill="#fff" opacity=".85"/>
        <rect x="40" y="30" width="28" height="4" rx="2" fill="#fff" opacity=".55"/>`;
      return `<g transform="translate(${x} ${y}) rotate(${r})" filter="url(#ss)">${miniPhone(100, 200, ac, bg, head + rows)}</g>`;
    })
    .join("");
  showcase("app-development", body, "Mobile app screens");
  n++;
}

// 2. Web development — browser windows
{
  const win = (x, y, w, h, r, tone) => `
    <g transform="translate(${x} ${y}) rotate(${r})" filter="url(#ss)">
      <rect width="${w}" height="${h}" rx="10" fill="#fff"/>
      <rect width="${w}" height="20" rx="10" fill="#EDF1F6"/>
      <rect y="12" width="${w}" height="8" fill="#EDF1F6"/>
      <circle cx="12" cy="10" r="3" fill="#e05c4a"/><circle cx="22" cy="10" r="3" fill="#e8b53f"/>
      <circle cx="32" cy="10" r="3" fill="#4caf7d"/>
      <rect x="10" y="30" width="${w - 20}" height="${h * 0.34}" rx="7" fill="${tone}" opacity=".8"/>
      ${[0, 1, 2]
        .map(
          (i) =>
            `<rect x="${10 + i * ((w - 20) / 3)}" y="${34 + h * 0.34 + 6}" width="${(w - 20) / 3 - 8}" height="${h * 0.22}" rx="6" fill="${tone}" opacity=".28"/>`,
        )
        .join("")}
      <rect x="10" y="${h - 22}" width="${w * 0.44}" height="6" rx="3" fill="${INK}" opacity=".18"/>
    </g>`;
  const body =
    win(30, 40, 250, 170, -5, ACCENT) +
    win(232, 96, 262, 184, 4, BRAND);
  showcase("web-development", body, "Website layouts");
  n++;
}

// 3. UI/UX design — phone pair with colourful tiles
{
  const grid = (ac) =>
    [0, 1, 2, 3]
      .map((i) => {
        const c = ["#4335A7", "#e8734a", "#2fa36b", "#3b7de0"][i];
        const x = 14 + (i % 2) * 58;
        const y = 74 + Math.floor(i / 2) * 54;
        return `<rect x="${x}" y="${y}" width="50" height="46" rx="12" fill="${c}" opacity=".85"/>
          <circle cx="${x + 25}" cy="${y + 19}" r="8" fill="#fff" opacity=".7"/>
          <rect x="${x + 12}" y="${y + 33}" width="26" height="4" rx="2" fill="#fff" opacity=".65"/>`;
      })
      .join("") +
    `<rect x="14" y="188" width="108" height="20" rx="10" fill="${ac}"/>
     <rect x="46" y="196" width="44" height="5" rx="2.5" fill="#fff" opacity=".9"/>`;
  const head = (ac) => `<rect x="14" y="22" width="60" height="8" rx="4" fill="${ac}"/>
     <rect x="14" y="38" width="94" height="6" rx="3" fill="${INK}" opacity=".2"/>
     <rect x="14" y="52" width="70" height="6" rx="3" fill="${INK}" opacity=".12"/>`;
  const body =
    `<g transform="translate(120 34) rotate(-7)" filter="url(#ss)">${miniPhone(136, 232, ACCENT, "#fff", head(ACCENT) + grid(ACCENT))}</g>` +
    `<g transform="translate(272 54) rotate(6)" filter="url(#ss)">${miniPhone(136, 232, BRAND, "#F7FAFF", head(BRAND) + grid(BRAND))}</g>`;
  showcase("ui-ux-design", body, "Interface design");
  n++;
}

// 4. Digital marketing — social post grid
{
  const posts = [
    ["#2fa36b", "#E7F7EE"], ["#c0392b", "#FFEBE6"],
    ["#8a5a12", "#FFF6E9"], ["#4335A7", "#EFEAFF"],
  ];
  const body = posts
    .map(([c, bg], i) => {
      const x = 22 + i * 122;
      const y = 42 + (i % 2) * 26;
      return `<g transform="translate(${x} ${y}) rotate(${i % 2 ? 4 : -4})" filter="url(#ss)">
        <rect width="108" height="212" rx="12" fill="#fff"/>
        <rect x="8" y="8" width="92" height="92" rx="8" fill="${bg}"/>
        <circle cx="54" cy="54" r="24" fill="${c}" opacity=".55"/>
        <circle cx="16" cy="112" r="7" fill="${c}" opacity=".8"/>
        <rect x="30" y="108" width="46" height="5" rx="2.5" fill="${INK}" opacity=".28"/>
        ${[0, 1, 2]
          .map(
            (k) =>
              `<rect x="8" y="${128 + k * 13}" width="${88 - k * 22}" height="5" rx="2.5" fill="${INK}" opacity="${0.2 - k * 0.05}"/>`,
          )
          .join("")}
        <rect x="8" y="176" width="34" height="16" rx="8" fill="${c}" opacity=".9"/>
        <rect x="48" y="176" width="34" height="16" rx="8" fill="${INK}" opacity=".1"/>
      </g>`;
    })
    .join("");
  showcase("digital-marketing", body, "Social campaign creative");
  n++;
}

// 5. GPS tracking — fleet dashboard
{
  const stats = [["100", "Vehicles"], ["65", "Moving"], ["12", "Idle"], ["485", "Km today"]];
  const body = `
  <g transform="translate(24 34)" filter="url(#ss)">
    <rect width="472" height="252" rx="14" fill="#fff"/>
    <rect width="472" height="26" rx="14" fill="#F3F6FA"/><rect y="14" width="472" height="12" fill="#F3F6FA"/>
    <circle cx="16" cy="13" r="3.4" fill="#e05c4a"/><circle cx="28" cy="13" r="3.4" fill="#e8b53f"/>
    <circle cx="40" cy="13" r="3.4" fill="#4caf7d"/>
    ${stats
      .map(([v, l], i) => {
        const x = 18 + i * 114;
        return `<rect x="${x}" y="40" width="104" height="52" rx="10" fill="${i === 0 ? BRAND : "#F3F6FA"}"/>
          ${txt(x + 14, 68, v, 18, i === 0 ? "#fff" : BRAND, 800)}
          ${txt(x + 14, 82, l, 8.5, i === 0 ? "#bcd0f5" : "#8b9aa5", 600)}`;
      })
      .join("")}
    <rect x="18" y="104" width="290" height="132" rx="10" fill="#EAF1F8"/>
    <path d="M40 210 Q90 150 140 178 T244 130 T292 156" stroke="${BRAND}" stroke-width="3" fill="none" stroke-linecap="round"/>
    ${[0, 1, 2, 3]
      .map((i) => {
        const px = [40, 118, 196, 274][i];
        const py = [210, 168, 150, 160][i];
        return `<circle cx="${px}" cy="${py}" r="7" fill="${ACCENT}" opacity=".35"/><circle cx="${px}" cy="${py}" r="3.4" fill="${BRAND}"/>`;
      })
      .join("")}
    <rect x="320" y="104" width="134" height="132" rx="10" fill="#F3F6FA"/>
    <circle cx="387" cy="150" r="30" fill="none" stroke="${ACCENT}" stroke-width="9" opacity=".35"/>
    <circle cx="387" cy="150" r="30" fill="none" stroke="${BRAND}" stroke-width="9"
            stroke-dasharray="126 190" stroke-linecap="round" transform="rotate(-90 387 150)"/>
    ${[0, 1, 2]
      .map(
        (i) => `<rect x="332" y="${192 + i * 15}" width="110" height="10" rx="5" fill="#fff"/>
        <rect x="338" y="${195 + i * 15}" width="5" height="5" rx="2" fill="${ACCENT}"/>
        <rect x="350" y="${196 + i * 15}" width="${74 - i * 16}" height="4" rx="2" fill="${INK}" opacity=".18"/>`,
      )
      .join("")}
  </g>`;
  showcase("gps-tracking", body, "Fleet tracking dashboard");
  n++;
}

// 6. AI solutions — agent console
{
  const body = `
  <g transform="translate(40 40)" filter="url(#ss)">
    <rect width="440" height="240" rx="14" fill="#14131f"/>
    ${txt(24, 40, "Agent runs", 14, "#fff", 800)}
    ${txt(24, 58, "4 active · 128 tasks today", 9.5, "#9a93c9", 500)}
    ${[
      ["Extract", "#4ade80", 0],
      ["Classify", "#4ade80", 1],
      ["Enrich", "#fbbf24", 2],
      ["Summarise", "#4ade80", 3],
    ]
      .map(
        ([nm, col, i]) => `
      <rect x="24" y="${78 + i * 38}" width="240" height="30" rx="8" fill="#fff" fill-opacity=".06"/>
      <circle cx="40" cy="${93 + i * 38}" r="4" fill="${col}"/>
      ${txt(54, 97 + i * 38, nm, 10, "#fff", 600)}
      <rect x="180" y="${88 + i * 38}" width="${70 - i * 12}" height="10" rx="5" fill="${ACCENT}" opacity=".5"/>`,
      )
      .join("")}
    <rect x="284" y="78" width="132" height="142" rx="10" fill="#fff" fill-opacity=".06"/>
    ${txt(298, 100, "Eval score", 9.5, "#9a93c9", 600)}
    ${txt(298, 126, "94%", 26, "#fff", 800)}
    ${[0, 1, 2, 3, 4]
      .map(
        (i) =>
          `<rect x="${298 + i * 22}" y="${196 - [30, 44, 26, 52, 40][i]}" width="12" height="${[30, 44, 26, 52, 40][i]}" rx="4" fill="${ACCENT}" opacity="${0.45 + i * 0.11}"/>`,
      )
      .join("")}
  </g>`;
  showcase("ai-solutions", body, "AI agent console");
  n++;
}

/* ------------------------------------------------------------------ */
/* 13. TALL SCROLLING SCREENS — 260 wide, ~1180 tall                   */
/*     Rendered inside a scrollable device frame on the site.          */
/* ------------------------------------------------------------------ */

const TALL_H = 1180;

// Reusable screen chunks -------------------------------------------
const searchBar = (y, accent, label) =>
  `${bar(16, y, 228, 30, "#fff", 1, 15)}
   <circle cx="36" cy="${y + 15}" r="5.5" fill="none" stroke="${accent}" stroke-width="1.8"/>
   <path d="M40 ${y + 19} l4 4" stroke="${accent}" stroke-width="1.8" stroke-linecap="round"/>
   ${txt(52, y + 19, label, 9.5, "#8b9aa5", 500)}`;

const chipRow = (y, items, accent) =>
  items
    .map((t, i) => {
      const w = 22 + t.length * 5.4;
      const x = 16 + items.slice(0, i).reduce((a, s) => a + 22 + s.length * 5.4 + 8, 0);
      return `${bar(x, y, w, 24, i === 0 ? accent : "#fff", 1, 12)}
        ${txt(x + w / 2, y + 16, t, 8.5, i === 0 ? "#fff" : INK, 600, "middle")}`;
    })
    .join("");

const sectionTitle = (y, t, extra = "") =>
  `${txt(16, y, t, 12, INK, 800)}${extra ? txt(244, y, extra, 9, ACCENT, 700, "end") : ""}`;

const productGrid = (y, rows, accent, tint, labels) => {
  let s = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < 2; c++) {
      const i = r * 2 + c;
      const x = 16 + c * 118;
      const yy = y + r * 128;
      s += `${bar(x, yy, 110, 116, "#fff", 1, 12)}
        ${bar(x + 8, yy + 8, 94, 62, tint, 1, 9)}
        <circle cx="${x + 55}" cy="${yy + 39}" r="19" fill="${accent}" opacity=".3"/>
        ${txt(x + 10, yy + 88, labels[i % labels.length], 9.5, INK, 700)}
        ${txt(x + 10, yy + 104, "₹" + (40 + i * 25), 9.5, accent, 800)}
        ${bar(x + 78, yy + 94, 22, 14, accent, 0.16, 7)}`;
    }
  }
  return s;
};

const listRows = (y, count, accent, withThumb = true) =>
  Array.from({ length: count }, (_, i) => {
    const yy = y + i * 64;
    return `${bar(16, yy, 228, 54, "#fff", 1, 10)}
      ${withThumb ? `${bar(26, yy + 10, 34, 34, "#F3F6FA", 1, 8)}<circle cx="43" cy="${yy + 27}" r="9" fill="${accent}" opacity=".35"/>` : ""}
      ${bar(withThumb ? 70 : 28, yy + 15, 108 - i * 8, 6, INK, 0.24, 3)}
      ${bar(withThumb ? 70 : 28, yy + 29, 72 - i * 6, 5, INK, 0.14, 2.5)}
      ${bar(206, yy + 20, 28, 14, accent, 0.18, 7)}`;
  }).join("");

const tabBar = (accent) => `
  ${bar(0, TALL_H - 46, 260, 46, "#fff", 1, 0)}
  ${[0, 1, 2, 3]
    .map(
      (i) => `<circle cx="${42 + i * 60}" cy="${TALL_H - 27}" r="7"
        fill="${i === 0 ? accent : "#c9d3d9"}"/>
      ${bar(28 + i * 60, TALL_H - 14, 28, 4, i === 0 ? accent : "#d8e0e5", 1, 2)}`,
    )
    .join("")}`;

const tallScreens = {
  "vamshi-farms": () => {
    const A = "#166b46";
    return `<rect width="260" height="${TALL_H}" fill="#F5F8F6"/>
      <rect width="260" height="150" fill="${A}"/>
      ${txt(16, 52, "Vamshi Farms", 16, "#fff", 800)}
      ${txt(16, 70, "Fresh from the farm, daily", 9.5, "#cfe8da", 500)}
      ${searchBar(92, A, "Search fresh produce")}
      ${chipRow(134, ["All", "Vegetables", "Fruits", "Dairy"], A)}
      ${sectionTitle(196, "Today's harvest", "See all")}
      ${productGrid(210, 3, A, "#E7F7EE", ["Tomatoes", "Spinach", "Mangoes", "Onions", "Carrots", "Bananas"])}
      ${bar(16, 606, 228, 74, A, 0.12, 14)}
      ${txt(32, 636, "Free delivery over ₹500", 11, A, 800)}
      ${txt(32, 656, "Harvested and packed same morning", 8.5, INK, 500)}
      ${sectionTitle(716, "Seasonal picks", "See all")}
      ${productGrid(730, 2, A, "#FFF6E9", ["Guava", "Papaya", "Beetroot", "Okra"])}
      ${sectionTitle(1004, "Recent orders")}
      ${listRows(1018, 2, A)}
      ${tabBar(A)}`;
  },
  "8meds": () => {
    const A = "#0a6f85";
    return `<rect width="260" height="${TALL_H}" fill="#F4F9FB"/>
      <rect width="260" height="142" fill="${A}"/>
      ${txt(16, 50, "8Meds", 17, "#fff", 800)}
      ${txt(16, 68, "Order from pharmacies near you", 9.5, "#cbe7ef", 500)}
      ${searchBar(88, A, "Search medicines")}
      ${bar(16, 158, 228, 58, "#fff", 1, 12)}
      <circle cx="46" cy="187" r="17" fill="${A}" opacity=".16"/>
      <path d="M46 179v16M38 187h16" stroke="${A}" stroke-width="2.4" stroke-linecap="round"/>
      ${txt(74, 183, "Upload prescription", 10.5, INK, 700)}
      ${txt(74, 198, "Pharmacist verified in 15 min", 8.5, "#8b9aa5", 500)}
      ${chipRow(232, ["All", "Fever", "Diabetes", "Vitamins"], A)}
      ${sectionTitle(294, "Nearby pharmacies", "Map")}
      ${listRows(308, 4, A)}
      ${sectionTitle(578, "Frequently ordered")}
      ${productGrid(592, 3, A, "#F0FCFF", ["Paracetamol", "Amoxicillin", "Vitamin D3", "Cough Syrup", "Antacid", "ORS Pack"])}
      ${sectionTitle(988, "Your reminders")}
      ${listRows(1002, 2, A, false)}
      ${tabBar(A)}`;
  },
  medibag: () => {
    const A = BRAND;
    return `<rect width="260" height="${TALL_H}" fill="#F4F6FA"/>
      <rect width="260" height="196" fill="${A}"/>
      ${txt(16, 50, "MediBag", 17, "#fff", 800)}
      ${txt(16, 68, "Your health, organised", 9.5, "#bcd0f5", 500)}
      ${bar(16, 84, 228, 58, "#fff", 0.14, 12)}
      ${txt(32, 106, "Next appointment", 8.5, "#bcd0f5", 600)}
      ${txt(32, 124, "Dr. Rao · Tomorrow 10:30", 10.5, "#fff", 700)}
      ${searchBar(152, A, "Search doctors, tests, medicines")}
      ${["Medicines", "Lab Tests", "Consult", "Records"]
        .map((t, i) => {
          const x = 16 + (i % 2) * 118;
          const y = 216 + Math.floor(i / 2) * 84;
          return `${bar(x, y, 110, 72, "#fff", 1, 12)}
            <circle cx="${x + 28}" cy="${y + 28}" r="13" fill="${ACCENT}" opacity=".3"/>
            <circle cx="${x + 28}" cy="${y + 28}" r="5.5" fill="${ACCENT}"/>
            ${txt(x + 12, y + 60, t, 10, INK, 700)}`;
        })
        .join("")}
      ${sectionTitle(408, "Health summary")}
      ${bar(16, 422, 228, 96, "#fff", 1, 12)}
      ${[0, 1, 2, 3, 4, 5, 6]
        .map(
          (i) =>
            `<rect x="${34 + i * 30}" y="${496 - [30, 44, 26, 52, 38, 58, 42][i]}" width="14" height="${[30, 44, 26, 52, 38, 58, 42][i]}" rx="5" fill="${A}" opacity="${0.3 + i * 0.09}"/>`,
        )
        .join("")}
      ${txt(16, 552, "Recent orders", 12, INK, 800)}
      ${listRows(566, 4, A)}
      ${sectionTitle(836, "Reports")}
      ${listRows(850, 3, A, false)}
      ${sectionTitle(1064, "Care team")}
      ${listRows(1078, 1, A)}
      ${tabBar(A)}`;
  },
  oneasy: () => {
    const A = "#4335A7";
    const dark = "#12111c";
    const row = (y, nm, st, col, w) => `
      ${bar(16, y, 228, 56, "#fff", 0.06, 10)}
      <circle cx="34" cy="${y + 28}" r="4.5" fill="${col}"/>
      ${txt(50, y + 24, nm, 10.5, "#fff", 700)}
      ${txt(50, y + 40, st, 8.5, "#9a93c9", 500)}
      ${bar(160, y + 22, 68, 12, "#fff", 0.08, 6)}
      ${bar(160, y + 22, w, 12, ACCENT, 0.75, 6)}`;
    return `<rect width="260" height="${TALL_H}" fill="${dark}"/>
      ${txt(16, 50, "OnEasy", 17, "#fff", 800)}
      ${txt(16, 68, "Agents · 4 running", 9.5, "#9a93c9", 500)}
      ${bar(16, 86, 228, 72, "#fff", 0.06, 12)}
      ${txt(32, 112, "Tasks completed today", 9, "#9a93c9", 600)}
      ${txt(32, 140, "128", 24, "#fff", 800)}
      ${bar(150, 118, 80, 24, ACCENT, 0.22, 12)}
      ${txt(190, 134, "+18%", 10, ACCENT, 800, "middle")}
      ${sectionTitle(190, "Active agents")}
      ${[
        ["Inbox Triage", "running · 42 today", "#4ade80", 58],
        ["Invoice Extract", "running · 31 today", "#4ade80", 44],
        ["Lead Enrich", "queued", "#fbbf24", 14],
        ["Report Digest", "running · 26 today", "#4ade80", 50],
        ["Ticket Router", "running · 29 today", "#4ade80", 40],
      ]
        .map(([nm, st, c, w], i) => row(204 + i * 66, nm, st, c, w))
        .join("")}
      ${sectionTitle(566, "Tool calls")}
      ${Array.from({ length: 7 }, (_, i) => {
        const y = 580 + i * 30;
        return `${bar(16, y, 228, 24, "#fff", 0.05, 6)}
          ${bar(28, y + 9, 6, 6, ACCENT, 0.9, 2)}
          ${bar(44, y + 10, 120 - i * 12, 5, "#fff", 0.22, 2.5)}
          ${bar(196, y + 9, 34, 7, "#4ade80", 0.5, 3.5)}`;
      }).join("")}
      ${sectionTitle(816, "Evaluation")}
      ${bar(16, 830, 228, 110, "#fff", 0.06, 12)}
      ${txt(32, 858, "Pass rate", 9, "#9a93c9", 600)}
      ${txt(32, 886, "94%", 24, "#fff", 800)}
      ${[0, 1, 2, 3, 4, 5]
        .map(
          (i) =>
            `<rect x="${32 + i * 34}" y="${924 - [26, 38, 22, 44, 34, 48][i]}" width="16" height="${[26, 38, 22, 44, 34, 48][i]}" rx="5" fill="${ACCENT}" opacity="${0.4 + i * 0.1}"/>`,
        )
        .join("")}
      ${sectionTitle(972, "Permissions")}
      ${Array.from({ length: 3 }, (_, i) => {
        const y = 986 + i * 44;
        return `${bar(16, y, 228, 36, "#fff", 0.06, 8)}
          ${bar(28, y + 14, 90 - i * 14, 6, "#fff", 0.2, 3)}
          ${bar(198, y + 11, 32, 14, "#4ade80", 0.35, 7)}`;
      }).join("")}`;
  },
  "creator-chart": () => {
    const A = "#a63b23";
    return `<rect width="260" height="${TALL_H}" fill="#FAF6F5"/>
      <rect width="260" height="120" fill="#1b1416"/>
      ${txt(16, 50, "Creator Chart", 16, "#fff", 800)}
      ${txt(16, 68, "Rankings updated hourly", 9.5, "#c7a99f", 500)}
      ${searchBar(84, A, "Search creators")}
      ${chipRow(136, ["Weekly", "Monthly", "Rising", "All"], A)}
      ${sectionTitle(196, "Growth this week")}
      ${bar(16, 210, 228, 118, "#fff", 1, 12)}
      ${(() => {
        const pts = [78, 60, 70, 46, 54, 34, 40];
        let path = "";
        let dots = "";
        pts.forEach((v, i) => {
          const x = 34 + i * 32;
          const y = 306 - v;
          path += `${i ? "L" : "M"}${x} ${y} `;
          dots += `<circle cx="${x}" cy="${y}" r="3" fill="${A}"/>`;
        });
        return `<path d="${path}" stroke="${A}" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>${dots}`;
      })()}
      ${sectionTitle(356, "Top creators", "View all")}
      ${["@studioline", "@fieldnotes", "@northbeam", "@quietloop", "@paperkite", "@dustline"]
        .map((h, i) => {
          const y = 370 + i * 62;
          return `${bar(16, y, 228, 52, "#fff", 1, 10)}
            ${txt(32, y + 32, String(i + 1), 13, A, 800)}
            <circle cx="66" cy="${y + 26}" r="14" fill="${A}" opacity=".2"/>
            <circle cx="66" cy="${y + 26}" r="6" fill="${A}" opacity=".55"/>
            ${txt(92, y + 23, h, 10, INK, 700)}
            ${txt(92, y + 37, ["1.2M", "940K", "770K", "612K", "588K", "441K"][i] + " followers", 8.5, "#8b9aa5", 500)}
            ${bar(206, y + 20, 28, 13, A, 0.16, 6)}`;
        })
        .join("")}
      ${sectionTitle(756, "Categories")}
      ${productGrid(770, 2, A, "#FFEBE6", ["Tech", "Food", "Travel", "Fitness"])}
      ${sectionTitle(1044, "Watchlist")}
      ${listRows(1058, 1, A)}
      ${tabBar(A)}`;
  },
};

Object.entries(tallScreens).forEach(([s, fn]) => {
  write(`screen-${s}.svg`, wrap(260, TALL_H, fn(), `${s} app screen`));
  n++;
});

console.log(`Wrote ${n} assets to ${OUT}/`);

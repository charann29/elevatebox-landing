// JSON-LD builders. Facts come from COMPANY only, so schema, llms.txt and the
// pages never disagree. No ratings or counts until real ones exist.
import { COMPANY } from "@/lib/content";

const url = (p = "") => `${COMPANY.site}${p}`;

export const ORG = {
  "@type": "Organization",
  "@id": url("/#org"),
  name: COMPANY.name,
  legalName: COMPANY.legal,
  url: url(),
  logo: url("/logo.svg"),
  email: COMPANY.email,
  telephone: COMPANY.phone,
  address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressRegion: "Telangana", addressCountry: "IN" },
};

export const ld = (...nodes: object[]) =>
  JSON.stringify({ "@context": "https://schema.org", "@graph": nodes });

export const breadcrumb = (items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "" }, ...items].map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: url(it.path),
  })),
});

export const faqPage = (items: { q: string; a: string }[]) => ({
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const service = (name: string, description: string, path: string) => ({
  "@type": "Service",
  name,
  description,
  url: url(path),
  provider: { "@id": ORG["@id"] },
  areaServed: [{ "@type": "City", name: "Hyderabad" }, { "@type": "Country", name: "India" }],
});

export const JsonLd = ({ json }: { json: string }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
);

// JSON-LD builders. Facts come from COMPANY only, so schema, llms.txt and the
// pages never disagree. No ratings or counts until real ones exist.
import { COMPANY, OG_IMG } from "@/lib/content";

const url = (p = "") => `${COMPANY.site}${p}`;

/** Founder, also the author of the blog posts. */
export const FOUNDER = {
  "@type": "Person",
  "@id": url("/#founder"),
  name: "Sai Charan L",
  url: "https://www.linkedin.com/in/charann06",
  sameAs: ["https://www.linkedin.com/in/charann06"],
};

export const ORG = {
  // ProfessionalService (a LocalBusiness) so the office, hours and phone count as a local business.
  "@type": ["Organization", "ProfessionalService"],
  "@id": url("/#org"),
  name: COMPANY.name,
  legalName: COMPANY.legal,
  url: url(),
  logo: url("/logo.svg"),
  image: url(OG_IMG),
  email: COMPANY.email,
  telephone: COMPANY.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "First Floor, #28, Mothi Nagar, Nagarjuna Hills, Punjagutta",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500082",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 17.4271462, longitude: 78.4507285 },
  hasMap: "https://maps.app.goo.gl/cekeZVdwwrYZQ1pz9",
  openingHours: "Mo-Sa 10:00-19:00",
  priceRange: "₹₹",
  areaServed: [
    { "@type": "City", name: "Hyderabad" },
    { "@type": "State", name: "Telangana" },
    { "@type": "Country", name: "India" },
  ],
  foundingDate: "2022",
  identifier: { "@type": "PropertyValue", propertyID: "CIN", value: "U62099TS2024PTC191165" },
  founder: FOUNDER,
  sameAs: [
    "https://www.linkedin.com/company/elevatebox",
    "https://www.instagram.com/elevate.box/",
  ],
  knowsAbout: ["Mobile app development", "Android app development", "iOS app development", "Flutter", "React Native", "Web development", "MVP development", "AI voice agents", "Telugu AI calling"],
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

export const service = (name: string, description: string, path: string, serviceType = name) => ({
  "@type": "Service",
  name,
  description,
  serviceType,
  url: url(path),
  provider: { "@id": ORG["@id"] },
  areaServed: [{ "@type": "City", name: "Hyderabad" }, { "@type": "Country", name: "India" }],
});

export const JsonLd = ({ json }: { json: string }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
);

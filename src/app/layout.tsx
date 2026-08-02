import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { FloatingActions } from "@/components/site";
import { OG_IMG } from "@/lib/content";
import "./globals.css";

// Urbanist — SIL Open Font License, served self-hosted by next/font.
const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const DESC =
  "ElevateBox designs and builds mobile and web products end to end — discovery, design, engineering, launch, and the maintenance afterwards. Hyderabad-based, delivering across India, the UAE, UK, Europe, and the US.";

export const metadata: Metadata = {
  metadataBase: new URL("https://elevatebox.in"),
  title: {
    default: "ElevateBox — Product Engineering, Design & AI Delivery",
    template: "%s | ElevateBox",
  },
  description: DESC,
  icons: {
    icon: [
      { url: "/favicon.png" },
      { url: "/assets/app-icon.svg", type: "image/svg+xml" },
    ],
    apple: "/assets/app-icon.svg",
  },
  openGraph: {
    title: "ElevateBox — Product Engineering, Design & AI Delivery",
    description: DESC,
    url: "https://elevatebox.in",
    siteName: "ElevateBox",
    type: "website",
    images: [{ url: OG_IMG, width: 1200, height: 630, alt: "ElevateBox" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ElevateBox — Product Engineering, Design & AI Delivery",
    description: DESC,
    images: [OG_IMG],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${urbanist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <FloatingActions />
      </body>
    </html>
  );
}

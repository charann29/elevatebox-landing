import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { FloatingActions } from "@/components/site";
import { OG_IMG } from "@/lib/content";
import "./globals.css";

// Inter for reading, Plus Jakarta Sans for headings — both SIL OFL, self-hosted by next/font.
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
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
    <html lang="en" className={`${inter.variable} ${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <FloatingActions />
      </body>
    </html>
  );
}

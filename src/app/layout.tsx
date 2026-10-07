import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { COMPANY } from "@/lib/content";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.site),
  title: { default: COMPANY.name, template: `%s | ${COMPANY.name}` },
  icons: { icon: "/favicon.png", apple: "/elevatebox-mark.png" },
  openGraph: { siteName: COMPANY.name, type: "website", locale: "en_IN" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#0a1f4f" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} antialiased`}>
      <body className="flex min-h-screen flex-col font-sans">{children}</body>
    </html>
  );
}

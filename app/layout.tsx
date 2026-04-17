import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";
import { MouseSpotlight } from "./components/common/mouseSpotlight/MouseSpotlight";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Youssef Ali Galal | Front-End Developer",
  description:
    "Front-End Engineer — React, Next.js, TypeScript. Enterprise platforms for Ford, Hyundai, Lexus; scalable UI, APIs, SEO, and performance.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MouseSpotlight />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}

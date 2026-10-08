import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import "./globals.css";
import { portfolio } from "@/data/portfolio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${portfolio.name} — ${portfolio.title}`,
  description: `Portfolio of ${portfolio.name}, a software engineer and full-stack developer specializing in modern web applications.`,
  keywords: [
    portfolio.name,
    "software engineer",
    "full-stack developer",
    "React developer",
    "Node.js developer",
    "portfolio",
  ],
  openGraph: {
    title: `${portfolio.name} — ${portfolio.title}`,
    description: `Portfolio of ${portfolio.name}, a software engineer and full-stack developer specializing in modern web applications.`,
    type: "website",
    locale: "en_US",
    siteName: `${portfolio.name} Portfolio`,
  },
  twitter: {
    card: "summary",
    title: `${portfolio.name} — ${portfolio.title}`,
    description: `Portfolio of ${portfolio.name}, a software engineer and full-stack developer specializing in modern web applications.`,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#010205" },
    { media: "(prefers-color-scheme: light)", color: "#f8f5ef" },
  ],
};

const themeInit = `(function(){try{var s=localStorage.getItem("theme");var m=window.matchMedia("(prefers-color-scheme: light)").matches;var t=s||(m?"light":"dark");document.documentElement.classList.toggle("light",t==="light");document.documentElement.classList.toggle("dark",t==="dark");}catch(e){document.documentElement.classList.add("dark");}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-full overflow-x-hidden">{children}</body>
    </html>
  );
}

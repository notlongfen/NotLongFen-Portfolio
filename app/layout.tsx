import { StructuredData } from "@/components/StructuredData";
import type { Metadata } from "next";
import { Geist_Mono, Unbounded } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://notlongfen.dev";
const siteName = "NotLongFen Portfolio";
const defaultDescription =
  "Long Phan (NotLongFen) - Blockchain & Web3 Developer. Explore my portfolio featuring Polkadot ecosystem projects, hackathon champions, and innovative Web3 solutions.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Blockchain & Web3 Developer`,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: [
    "blockchain developer",
    "web3 developer",
    "polkadot",
    "bifrost",
    "evm",
    "solidity",
    "substrate",
    "rust",
    "react",
    "next.js",
    "portfolio",
    "notlongfen",
    "long phan",
    "defi",
    "cryptocurrency",
    "hackathon",
    "blockchain engineer",
  ],
  authors: [{ name: "Long Phan (NotLongFen)", url: "https://github.com/notlongfen" }],
  creator: "Long Phan (NotLongFen)",
  publisher: "NotLongFen",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: siteName,
    title: `${siteName} | Blockchain & Web3 Developer`,
    description: defaultDescription,
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "NotLongFen Portfolio - Blockchain & Web3 Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Blockchain & Web3 Developer`,
    description: defaultDescription,
    creator: "@notlongfen",
    images: ["/api/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: "LfILMguhpbjgQ0mqR9y3o4EsIy6wfVxOhBRKBKdBPcQ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${unbounded.variable} ${geistMono.variable} antialiased`}
      >
        <StructuredData type="portfolio" />
        {children}
      </body>
    </html>
  );
}

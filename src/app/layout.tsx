import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://www.leap-ts.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Leap Transformation Services | Data & AI Consulting for Financial Services",
  description:
    "Data & AI consulting for financial services—from strategy to production. Boutique expertise delivering enterprise impact.",
  icons: {
    icon: "/icon.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Leap Transformation Services",
    title: "Leap Transformation Services | Data & AI Consulting for Financial Services",
    description:
      "Data & AI consulting for financial services—from strategy to production. Boutique expertise delivering enterprise impact.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leap Transformation Services | Data & AI Consulting for Financial Services",
    description:
      "Data & AI consulting for financial services—from strategy to production. Boutique expertise delivering enterprise impact.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

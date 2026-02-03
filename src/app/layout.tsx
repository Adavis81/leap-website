import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leap Transformation Services | Data & AI Consulting for Financial Services",
  description: "Data & AI consulting for financial services—from strategy to production. Boutique expertise delivering enterprise impact.",
  icons: {
    icon: "/icon.png",
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

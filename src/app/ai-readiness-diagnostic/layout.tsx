import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Readiness Diagnostic | Leap Transformation Services",
  description:
    "A senior-led readiness assessment across ten dimensions of organizational AI absorption. Half-day workshop for executive teams in financial services.",
  alternates: { canonical: "/ai-readiness-diagnostic" },
  openGraph: {
    title: "AI Readiness Diagnostic | Leap Transformation Services",
    description:
      "Ten dimensions. Five maturity levels. One executive conversation that surfaces where AI is actually getting stuck.",
    url: "https://www.leap-ts.com/ai-readiness-diagnostic",
  },
  twitter: {
    title: "AI Readiness Diagnostic | Leap Transformation Services",
    description:
      "Ten dimensions. Five maturity levels. One executive conversation that surfaces where AI is actually getting stuck.",
  },
};

export default function DiagnosticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

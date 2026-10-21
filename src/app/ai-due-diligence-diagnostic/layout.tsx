import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Due Diligence Diagnostic | Leap Transformation Services",
  description:
    "A directional AI due diligence screen for private equity deal teams evaluating portfolio company investments, AI risk, and value creation upside.",
  alternates: { canonical: "/ai-due-diligence-diagnostic" },
  openGraph: {
    title: "AI Due Diligence Diagnostic | Leap Transformation Services",
    description:
      "Twelve questions across six AI diligence domains for PE deal teams assessing target-company risk and value creation upside.",
    url: "https://www.leap-ts.com/ai-due-diligence-diagnostic",
  },
  twitter: {
    title: "AI Due Diligence Diagnostic | Leap Transformation Services",
    description:
      "Twelve questions across six AI diligence domains for PE deal teams assessing target-company risk and value creation upside.",
  },
};

export default function AiDueDiligenceDiagnosticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

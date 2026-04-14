import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offerings | Leap Transformation Services",
  description:
    "Explore Leap's AI and data offerings for financial services: AI strategy and use-case prioritization, agentic cost optimization, AI implementation, and AI education, training, and hackathons.",
  alternates: {
    canonical: "/offerings",
  },
  openGraph: {
    title: "Offerings | Leap Transformation Services",
    description:
      "Explore Leap's AI and data offerings for financial services: AI strategy and use-case prioritization, agentic cost optimization, AI implementation, and AI education, training, and hackathons.",
    url: "https://www.leap-ts.com/offerings",
  },
  twitter: {
    title: "Offerings | Leap Transformation Services",
    description:
      "Explore Leap's AI and data offerings for financial services: AI strategy and use-case prioritization, agentic cost optimization, AI implementation, and AI education, training, and hackathons.",
  },
};

export default function OfferingsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

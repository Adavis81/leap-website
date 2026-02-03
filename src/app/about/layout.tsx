import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Leap Transformation Services",
  description:
    "Meet the founder of Leap Transformation Services and learn about our approach to data, analytics, and AI for financial services.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | Leap Transformation Services",
    description:
      "Meet the founder of Leap Transformation Services and learn about our approach to data, analytics, and AI for financial services.",
    url: "https://www.leap-ts.com/about",
  },
  twitter: {
    title: "About | Leap Transformation Services",
    description:
      "Meet the founder of Leap Transformation Services and learn about our approach to data, analytics, and AI for financial services.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}


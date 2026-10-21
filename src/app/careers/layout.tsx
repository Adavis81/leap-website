import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | Leap Transformation Services",
  description:
    "Explore contract opportunities with Leap Transformation Services, a senior-led Data and AI consulting firm serving private equity and financial services.",
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: "Careers | Leap Transformation Services",
    description:
      "Explore contract opportunities with Leap Transformation Services.",
    url: "https://www.leap-ts.com/careers",
  },
  twitter: {
    title: "Careers | Leap Transformation Services",
    description:
      "Explore contract opportunities with Leap Transformation Services.",
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}

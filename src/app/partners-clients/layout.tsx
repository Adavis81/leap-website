import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partners & Clients | Leap Transformation Services",
  description:
    "A selection of organizations Leap Transformation Services has supported across banking, asset management, and financial services.",
  alternates: {
    canonical: "/partners-clients",
  },
  openGraph: {
    title: "Partners & Clients | Leap Transformation Services",
    description:
      "A selection of organizations Leap Transformation Services has supported across banking, asset management, and financial services.",
    url: "https://www.leap-ts.com/partners-clients",
  },
  twitter: {
    title: "Partners & Clients | Leap Transformation Services",
    description:
      "A selection of organizations Leap Transformation Services has supported across banking, asset management, and financial services.",
  },
};

export default function PartnersClientsLayout({ children }: { children: React.ReactNode }) {
  return children;
}


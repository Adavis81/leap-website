import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { href: "/#services", label: "Services" },
  { href: "/offerings", label: "Offerings" },
  { href: "/#about", label: "About" },
  { href: "/#how-we-work", label: "How We Work" },
  { href: "/#why-leap", label: "Why Leap" },
  { href: "/partners-clients", label: "Partners & Clients" },
  { href: "/careers", label: "Careers" },
  { href: "/#contact", label: "Get in Touch" },
];

export default function SiteFooter({ disclaimer }: { disclaimer?: string }) {
  return (
    <footer className="bg-[#364f6b] px-8 py-14 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 text-center">
        <Link href="/" aria-label="Leap Transformation Services home">
          <Image src="/images/logo-white.svg" alt="Leap Transformation Services" width={140} height={50} />
        </Link>
        <nav aria-label="Footer navigation">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-gray-300 transition-colors hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Leap Transformation Services. All rights reserved.
        </p>
        {disclaimer && <p className="max-w-3xl text-xs text-gray-400">{disclaimer}</p>}
      </div>
    </footer>
  );
}

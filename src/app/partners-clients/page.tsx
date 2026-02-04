"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type LogoItem = {
  name: string;
  href: string;
  logoSrc: string;
};

const partnersAndClients: LogoItem[] = [
  { name: "Citi", href: "https://www.citi.com/", logoSrc: "/images/partners/citi.svg" },
  { name: "SMBC", href: "https://www.smbcgroup.com/", logoSrc: "/images/partners/smbc.png" },
  { name: "BNY Mellon", href: "https://www.bnymellon.com/", logoSrc: "/images/partners/bny-mellon.svg" },
  { name: "Nasdaq", href: "https://www.nasdaq.com/", logoSrc: "/images/partners/nasdaq.svg" },
  { name: "Citco Fund Services", href: "https://www.citco.com/", logoSrc: "/images/partners/citco-fund-services.png" },
  { name: "Fiera Capital", href: "https://www.fieracapital.com/", logoSrc: "/images/partners/fiera-capital.svg" },
  { name: "S&P Global", href: "https://www.spglobal.com/", logoSrc: "/images/partners/sp-global.svg" },
  {
    name: "Goldman Sachs Asset Management",
    href: "https://www.goldmansachs.com/",
    logoSrc: "/images/partners/goldman-sachs-asset-management.svg",
  },
  {
    name: "John Hancock Investments",
    href: "https://www.jhinvestments.com/",
    logoSrc: "/images/partners/john-hancock.svg",
  },
  {
    name: "Jupiter Asset Management",
    href: "https://www.jupiteram.com/",
    logoSrc: "/images/partners/jupiter-asset-management.svg",
  },
  {
    name: "Oppenheimer Funds (Invesco)",
    href: "https://www.invesco.com/us/en/Individual-investor.html",
    logoSrc: "/images/partners/oppenheimer-funds.jpeg",
  },
  {
    name: "Edgbaston Investment Partners",
    href: "https://edgbastonip.com/",
    logoSrc: "/images/partners/edgbaston-investment-partners.jpg",
  },
  {
    name: "Cohen & Steers",
    href: "https://www.cohenandsteers.com/",
    logoSrc: "/images/partners/cohen-and-steers.svg",
  },
  {
    name: "Western Asset Management",
    href: "https://www.westernasset.com/us/en/",
    logoSrc: "/images/partners/western-asset-management.png",
  },
  { name: "HSBC", href: "https://www.hsbc.com/", logoSrc: "/images/partners/hsbc.svg" },
];

export default function PartnersClientsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <Link href="/" className="h-14">
            <Image
              src={scrolled ? "/images/logo-color.svg" : "/images/logo-white.svg"}
              alt="Leap Transformation Services"
              width={140}
              height={50}
              className="object-contain h-full w-auto transition-opacity duration-300"
              priority
            />
          </Link>
          <div className="hidden md:flex items-center gap-10">
            <Link
              href="/#services"
              className={`font-medium transition-colors ${
                scrolled ? "text-[#364f6b] hover:text-[#3fc1c9]" : "text-white/90 hover:text-white"
              }`}
            >
              Services
            </Link>
            <Link
              href="/#about"
              className={`font-medium transition-colors ${
                scrolled ? "text-[#364f6b] hover:text-[#3fc1c9]" : "text-white/90 hover:text-white"
              }`}
            >
              About
            </Link>
            <Link
              href="/#why-leap"
              className={`font-medium transition-colors ${
                scrolled ? "text-[#364f6b] hover:text-[#3fc1c9]" : "text-white/90 hover:text-white"
              }`}
            >
              Why Leap
            </Link>
            <Link
              href="/partners-clients"
              className={`font-medium transition-colors ${
                scrolled ? "text-[#364f6b] hover:text-[#3fc1c9]" : "text-white/90 hover:text-white"
              }`}
            >
              Partners &amp; Clients
            </Link>
            <Link
              href="/#contact"
              className="bg-[#3fc1c9] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#2ba5ad] transition-all hover:shadow-lg"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className={`w-6 h-6 ${scrolled ? "text-[#364f6b]" : "text-white"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4">
            <div className="flex flex-col gap-4">
              <Link
                href="/#services"
                className="text-[#364f6b] hover:text-[#3fc1c9] transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/#about"
                className="text-[#364f6b] hover:text-[#3fc1c9] transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/#why-leap"
                className="text-[#364f6b] hover:text-[#3fc1c9] transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Why Leap
              </Link>
              <Link
                href="/partners-clients"
                className="text-[#3fc1c9] font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Partners &amp; Clients
              </Link>
              <Link
                href="/#contact"
                className="bg-[#3fc1c9] text-white px-6 py-3 rounded-full font-medium text-center hover:bg-[#2ba5ad] transition-all hover:shadow-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get in Touch
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-[#364f6b] to-[#4a6785]">
        <div className="max-w-7xl mx-auto px-8 py-32 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              <p className="text-[#3fc1c9] font-semibold tracking-wider uppercase mb-4">
                Representative Experience
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8">
                <span className="block">Partners</span>
                <span className="block">&amp; Clients</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl">
                A snapshot of the organizations we&apos;ve supported across banking, asset management, insurance, and
                private markets.
              </p>
            </div>
            <div className="flex-shrink-0 hidden lg:block">
              <Image
                src="/images/logo-white.svg"
                alt="Leap"
                width={350}
                height={350}
                className="w-auto h-[350px] opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-[#364f6b] mb-4">
              Selected Partners &amp; Clients
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-3xl">
              A selection of organizations we&apos;ve supported.
            </p>

            <div className="mb-10">
              <div className="text-sm font-semibold tracking-wider uppercase text-[#3fc1c9] mb-3">
                Strategic Partner
              </div>
              <a
                href="https://agenticrisks.com/"
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col md:flex-row items-start md:items-center justify-between gap-8 rounded-3xl bg-gradient-to-br from-[#364f6b] to-[#2c3e50] p-8 md:p-10 text-white shadow-lg"
                aria-label="Visit Agentic Risks"
              >
                <div className="flex items-center gap-6">
                  <Image
                    src="/images/partners/agentic-risks.svg"
                    alt="Agentic Risks logo"
                    width={240}
                    height={64}
                    className="h-12 w-auto object-contain"
                    unoptimized
                  />
                  <div className="hidden md:block w-px h-10 bg-white/20" aria-hidden="true" />
                  <div className="max-w-xl">
                    <div className="text-lg font-semibold">Agentic AI Controls Framework</div>
                    <div className="text-white/80 mt-1">
                      Governance and risk controls for adopting agentic AI workflows with confidence.
                    </div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium group-hover:bg-white/15 transition-colors">
                  Visit Site
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M7 17L17 7M17 7H9M17 7V15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </div>

            <div className="text-sm font-semibold tracking-wider uppercase text-[#3fc1c9] mb-3">
              Selected Clients
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm px-6 py-8">
              <div className="[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] overflow-hidden">
                <div className="logo-marquee">
                  <div className="logo-marquee__group">
                    {partnersAndClients.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="logo-marquee__item group"
                        aria-label={item.name}
                      >
                        <Image
                          src={item.logoSrc}
                          alt={`${item.name} logo`}
                          width={240}
                          height={80}
                          sizes="240px"
                          className="h-14 w-auto max-w-full object-contain opacity-85 group-hover:opacity-100 transition-opacity"
                          unoptimized={item.logoSrc.endsWith(".svg")}
                        />
                      </a>
                    ))}
                  </div>
                  <div className="logo-marquee__group" aria-hidden="true">
                    {partnersAndClients.map((item) => (
                      <a
                        key={`${item.name}-dup`}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="logo-marquee__item group"
                        aria-label={item.name}
                      >
                        <Image
                          src={item.logoSrc}
                          alt={`${item.name} logo`}
                          width={240}
                          height={80}
                          sizes="240px"
                          className="h-14 w-auto max-w-full object-contain opacity-85 group-hover:opacity-100 transition-opacity"
                          unoptimized={item.logoSrc.endsWith(".svg")}
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#364f6b] text-white py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Image src="/images/logo-white.svg" alt="Leap Transformation Services" width={120} height={43} />
          <p className="text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} Leap Transformation Services. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

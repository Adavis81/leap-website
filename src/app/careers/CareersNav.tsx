"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navigation = [
  { href: "/#services", label: "Services" },
  { href: "/offerings", label: "Offerings" },
  { href: "/#about", label: "About" },
  { href: "/#how-we-work", label: "How We Work" },
  { href: "/#why-leap", label: "Why Leap" },
  { href: "/partners-clients", label: "Partners & Clients" },
  { href: "/careers", label: "Careers" },
];

export default function CareersNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white py-3 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8">
        <Link href="/" className="h-14">
          <Image
            src="/images/logo-color.svg"
            alt="Leap Transformation Services"
            width={140}
            height={50}
            className="h-full w-auto object-contain"
            priority
          />
        </Link>

        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-medium transition-colors hover:text-[#3fc1c9] ${
                item.href === "/careers" ? "text-[#3fc1c9]" : "text-[#364f6b]"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="rounded-full bg-[#3fc1c9] px-6 py-2.5 font-medium text-white transition-all hover:bg-[#2ba5ad] hover:shadow-lg"
          >
            Get in Touch
          </Link>
        </div>

        <button
          type="button"
          className="p-2 md:hidden"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <svg className="h-6 w-6 text-[#364f6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="mx-4 mt-2 rounded-xl bg-white p-6 shadow-lg md:hidden">
          <div className="flex flex-col gap-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`py-2 font-medium ${item.href === "/careers" ? "text-[#3fc1c9]" : "text-[#364f6b]"}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="mt-2 rounded-full bg-[#3fc1c9] px-6 py-3 text-center font-medium text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

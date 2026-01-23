"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function About() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="h-16 overflow-hidden">
            <Image
              src="/images/logo-color.svg"
              alt="Leap Transformation Services"
              width={140}
              height={50}
              className="object-contain h-full w-auto"
              priority
            />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#services" className="text-[#364f6b] hover:text-[#3fc1c9] transition-colors">
              Services
            </Link>
            <Link href="/about" className="text-[#3fc1c9] font-medium">
              About
            </Link>
            <Link
              href="/#contact"
              className="bg-[#3fc1c9] text-white px-5 py-2 rounded-lg hover:bg-[#2ba5ad] transition-colors"
            >
              Contact Us
            </Link>
          </div>
          {/* Mobile hamburger button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-[#364f6b]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
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
                href="/about"
                className="text-[#3fc1c9] font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/#contact"
                className="bg-[#3fc1c9] text-white px-5 py-2 rounded-lg hover:bg-[#2ba5ad] transition-colors text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-[#364f6b] to-[#4a6785]">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Meet the Founder
          </h1>
          <p className="text-xl text-gray-200">
            The experience behind Leap
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
            {/* Photo */}
            <div className="flex-shrink-0">
              <Image
                src="/images/adam-davis.png"
                alt="Adam Davis"
                width={320}
                height={320}
                className="rounded-2xl shadow-lg"
              />
            </div>

            {/* Bio */}
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-[#364f6b] mb-2">
                Adam Davis
              </h2>
              <p className="text-xl text-[#3fc1c9] font-medium mb-6">
                Founder
              </p>

              <div className="space-y-4 text-lg text-gray-600">
                <p>
                  With over 20 years of experience in financial services, Adam has advised and
                  delivered data & AI strategy, data management, and reporting solutions for
                  investment managers, asset servicers, private equity firms, and banks.
                </p>
                <p>
                  Prior to founding Leap Transformation Services, Adam was a Partner at Artefact US,
                  where he led engagements helping financial institutions transform their data
                  capabilities and unlock value from AI.
                </p>
                <p>
                  Throughout his career, Adam has built a track record of turning complex data
                  challenges into actionable insights—helping clients achieve strategic goals with
                  precision and efficiency.
                </p>
              </div>
            </div>
          </div>

          {/* Why I Started Leap */}
          <div className="mt-16 bg-gradient-to-br from-[#364f6b] to-[#4a6785] rounded-2xl p-10 text-white">
            <h3 className="text-2xl font-semibold mb-6">Why I Started Leap</h3>
            <blockquote className="text-xl leading-relaxed text-gray-200 italic">
              &ldquo;I founded Leap to give financial services leaders a better consulting experience:
              a senior, industry-tested team with deep financial services expertise that can step in
              quickly and deliver measurable outcomes. Our engagements are right-sized by design—built
              around experienced practitioners, not layers of junior staffing—so you get focused
              execution and results that hold up in the real world.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#364f6b] mb-4">
            Ready to Transform Your Data & AI Capabilities?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Let&apos;s discuss how Leap can help your organization.
          </p>
          <Link
            href="/#contact"
            className="inline-block bg-[#3fc1c9] text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-[#2ba5ad] transition-colors"
          >
            Start a Conversation
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#364f6b] text-white py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Image
            src="/images/logo-white.svg"
            alt="Leap Transformation Services"
            width={120}
            height={43}
          />
          <p className="text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} Leap Transformation Services. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

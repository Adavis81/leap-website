"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/mjgyevdy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="h-16 overflow-hidden block">
            <Image
              src="/images/logo-color.svg"
              alt="Leap Transformation Services"
              width={140}
              height={50}
              className="object-contain h-full w-auto"
              priority
            />
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-[#364f6b] hover:text-[#3fc1c9] transition-colors">
              Services
            </a>
            <a href="/about" className="text-[#364f6b] hover:text-[#3fc1c9] transition-colors">
              About
            </a>
            <a
              href="#contact"
              className="bg-[#3fc1c9] text-white px-5 py-2 rounded-lg hover:bg-[#2ba5ad] transition-colors"
            >
              Contact Us
            </a>
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
              <a
                href="#services"
                className="text-[#364f6b] hover:text-[#3fc1c9] transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="/about"
                className="text-[#364f6b] hover:text-[#3fc1c9] transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#contact"
                className="bg-[#3fc1c9] text-white px-5 py-2 rounded-lg hover:bg-[#2ba5ad] transition-colors text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 bg-gradient-to-br from-[#364f6b] to-[#4a6785]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-shrink-0 hidden md:flex items-center">
              <Image
                src="/images/logo-white.svg"
                alt="Leap Transformation Services"
                width={280}
                height={280}
                className="w-auto h-[280px]"
              />
            </div>
            <div className="max-w-3xl text-center md:text-left">
              <Image
                src="/images/logo-white.svg"
                alt="Leap Transformation Services"
                width={180}
                height={65}
                className="mb-8 mx-auto md:hidden"
              />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Data & AI Consulting for Financial Services
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8">
                From strategy to production
              </p>
              <p className="text-lg text-gray-300 mb-10 max-w-2xl">
                We help financial institutions harness the power of data and AI to drive
                transformation, improve decision-making, and create lasting competitive advantage.
              </p>
              <a
                href="#contact"
                className="inline-block bg-[#3fc1c9] text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-[#2ba5ad] transition-colors"
              >
                Start a Conversation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-gray-50 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#364f6b] text-center mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            End-to-end data and AI capabilities tailored for financial services
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#3fc1c9]/10 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-[#3fc1c9]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#364f6b] mb-3">Data Strategy</h3>
              <p className="text-gray-600">
                Define your data vision, roadmap, and governance frameworks to maximize the value of
                your data assets.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#3fc1c9]/10 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-[#3fc1c9]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#364f6b] mb-3">AI Strategy</h3>
              <p className="text-gray-600">
                From ideation to opportunity evaluation and use case prioritization, we help you
                build an AI roadmap grounded in technical feasibility and measurable business value.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#3fc1c9]/10 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-[#3fc1c9]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#364f6b] mb-3">Data Engineering</h3>
              <p className="text-gray-600">
                Design and implement modern data platforms and pipelines, including the selection
                and implementation of best-fit third-party applications that scale with your
                business needs.
              </p>
            </div>

            {/* Service 4 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#3fc1c9]/10 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-[#3fc1c9]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#364f6b] mb-3">Risk & Compliance</h3>
              <p className="text-gray-600">
                Navigate regulatory requirements with data-driven risk management, including AI
                risk and governance frameworks for generative and agentic AI.
              </p>
            </div>

            {/* Service 5 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#3fc1c9]/10 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-[#3fc1c9]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#364f6b] mb-3">Operating Model & Change</h3>
              <p className="text-gray-600">
                Design and implement target operating models for data and AI, including org
                structure, roles, governance, and change programs to ensure sustainable adoption
                and measurable business impact.
              </p>
            </div>

            {/* Service 6 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#3fc1c9]/10 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-[#3fc1c9]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#364f6b] mb-3">Team Augmentation</h3>
              <p className="text-gray-600">
                Embed experienced data and AI professionals into your teams to accelerate delivery
                and build internal capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#364f6b] mb-6">
                Boutique Expertise.<br />Enterprise Impact.
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Leap Transformation Services is a boutique consulting firm dedicated exclusively to
                helping financial services organizations unlock the full potential of their data and
                AI investments.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We combine deep industry expertise with hands-on technical experience to deliver
                solutions that work in the real world—not just in presentations.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div>
                  <div className="text-3xl font-bold text-[#3fc1c9]">100%</div>
                  <div className="text-gray-600">Financial Services Focus</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#3fc1c9]">E2E</div>
                  <div className="text-gray-600">Strategy to Production</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#364f6b] to-[#4a6785] rounded-2xl p-10 text-white">
              <h3 className="text-2xl font-semibold mb-6">Why Leap?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-[#3fc1c9] flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Deep expertise in Investment Management & servicing, banking, private markets & insurance</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-[#3fc1c9] flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Senior, industry-tested consultants (15+ years) delivering big-firm outcomes through a boutique model</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-[#3fc1c9] flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Practitioners who build, not just advise</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-[#3fc1c9] flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Agile delivery with measurable outcomes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gray-50 scroll-mt-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#364f6b] text-center mb-4">
            Let&apos;s Talk
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            Ready to transform your data and AI capabilities? We&apos;d love to hear from you.
          </p>

          {submitted ? (
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-[#3fc1c9]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-[#3fc1c9]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-[#364f6b] mb-2">Thank You!</h3>
              <p className="text-gray-600">
                We&apos;ve received your message and will be in touch soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#364f6b] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#3fc1c9] focus:ring-2 focus:ring-[#3fc1c9]/20 outline-none transition-colors"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#364f6b] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#3fc1c9] focus:ring-2 focus:ring-[#3fc1c9]/20 outline-none transition-colors"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="company" className="block text-sm font-medium text-[#364f6b] mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#3fc1c9] focus:ring-2 focus:ring-[#3fc1c9]/20 outline-none transition-colors"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-[#364f6b] mb-2">
                  How can we help?
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#3fc1c9] focus:ring-2 focus:ring-[#3fc1c9]/20 outline-none transition-colors resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#3fc1c9] text-white py-4 rounded-lg font-medium hover:bg-[#2ba5ad] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
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

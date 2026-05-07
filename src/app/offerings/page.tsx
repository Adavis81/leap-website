"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

// Animation hook for fade-in on scroll
function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isInView };
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, isInView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function EngagementChip({ duration, label }: { duration: string; label?: string }) {
  return (
    <div className="inline-flex items-center gap-2 bg-[#3fc1c9]/10 text-[#3fc1c9] px-4 py-2 rounded-full text-sm font-semibold">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span><strong>{duration}</strong>{label ? ` · ${label}` : ""}</span>
    </div>
  );
}

const prioritizationSteps = [
  {
    title: "Curated Use Cases",
    body: "We arrive with a library of industry-specific AI use cases so you're not starting from scratch.",
  },
  {
    title: "Readiness Assessment",
    body: "Evaluate organizational and use-case-level readiness across data, tech, people, and governance.",
  },
  {
    title: "Value & Feasibility",
    body: "Score each use case by business impact and ease of implementation to focus on what matters.",
  },
  {
    title: "Prioritize & Roadmap",
    body: "Sequence use cases into a phased plan with quick wins first, then scale.",
  },
  {
    title: "Risk & Governance",
    body: "Embed AI risk controls, policies, and audit-ready governance from day one.",
  },
];

const costPillars = [
  {
    title: "Model-Use Case Alignment",
    body: "Audit current and planned AI use cases, benchmark task complexity, and recommend model routing strategies. Use Haiku for extraction, Sonnet for analysis, Opus for complex reasoning. Each step runs on the most cost-efficient model that meets quality thresholds.",
    metric: "40–60% reduction in API costs",
  },
  {
    title: "Vendor & Platform Rationalization",
    body: "Catalog all AI vendor contracts, API agreements, and platform licenses across the firm. Identify redundancy where multiple teams pay for overlapping tools and recommend consolidation paths: fewer vendors, shared infrastructure.",
    metric: "20–30% reduction in redundant spend",
  },
  {
    title: "Data Architecture for AI Efficiency",
    body: "Trace data lineage into AI workflows to map where data is sourced, duplicated, embedded, and stored across initiatives. Recommend shared infrastructure: centralized vector stores, common data prep pipelines, single-source-of-truth architecture.",
    metric: "15–25% reduction in storage & retrieval costs",
  },
];

const costDeliverables = [
  { title: "Model Routing Matrix", body: "Use-case-to-model mapping with cost projections" },
  { title: "Vendor Landscape & Roadmap", body: "Current state, target state, consolidation plan" },
  { title: "AI Data Flow Assessment", body: "Duplication analysis and shared infra recommendations" },
  { title: "Cost Governance Framework", body: "Policies, review cadence, and decision rights" },
];

const implementationSteps = [
  {
    title: "Proof of Concept",
    body: "Stand up a working prototype against real data. Validate accuracy, latency, and user experience before committing to production.",
  },
  {
    title: "Deploy",
    body: "Production-grade deployment with the right model routing, observability, and cost controls from day one.",
  },
  {
    title: "Integrate",
    body: "Wire AI into existing workflows, data platforms, and systems of record so users get value inside the tools they already use.",
  },
  {
    title: "Optimize",
    body: "Continuous tuning on prompts, models, and workflows as usage scales and the business learns what works.",
  },
];

const educationOfferings = [
  {
    title: "AI Governance Training",
    byline: "",
    duration: "1/2 day to 1 day",
    body: "Executive-level workshops that move AI risk and governance from theory to boardroom-ready action.",
    bullets: [
      "Executive workshop on AI risk management",
      "Risk appetite and adoption strategy for deal and investment teams",
      "Mapping AI workflow risks and controls",
      "Post-deployment risk assessment and controls audit",
    ],
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    ),
  },
  {
    title: "AI Hackathon Design & Facilitation",
    byline: "",
    duration: "A few hours to a few days",
    body: "Turn experimentation into actionable outcomes. We design, run, and synthesize high-impact AI hackathons end to end.",
    bullets: [
      "Challenge themes designed around your workflows",
      "Starter kits with prompt templates and tool access",
      "Keynote on AI: what's working, what's hype",
      "Roaming facilitation and judging panel",
      "Post-event synthesis: top ideas, feasibility, and next steps",
    ],
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    ),
  },
  {
    title: "Function-Centric Training Program",
    byline: "",
    duration: "1/2 day per function",
    body: "Role-specific AI education tailored to how teams actually work, not generic slideware.",
    bullets: [
      "Tailored sessions by function: finance, operations, sales, HR, legal",
      "Hands-on workshops, not slides and lectures",
      "Custom prompt libraries per department",
      "AI Champions program to sustain adoption internally",
      "Adoption metrics dashboard and monthly check-ins",
    ],
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
    ),
  },
  {
    title: "Tool-Centric Training Program",
    byline: "",
    duration: "1/2 day to 1 day",
    body: "Platform-specific enablement across your AI stack, so teams know when to reach for which tool and how to use it safely.",
    bullets: [
      "Claude, ChatGPT, Copilot: when to use which and why",
      "Workflow automation with AI agents and integrations",
      "Data privacy and security best practices per tool",
      "Building effective prompts for domain-specific use cases",
      "Evaluating and onboarding new AI tools safely",
    ],
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    ),
  },
];

export default function OfferingsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-3">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <Link href="/" className="h-14">
            <Image
              src="/images/logo-color.svg"
              alt="Leap Transformation Services"
              width={140}
              height={50}
              className="object-contain h-full w-auto"
              priority
            />
          </Link>
          <div className="hidden md:flex items-center gap-10">
            <Link
              href="/#services"
              className="font-medium text-[#364f6b] hover:text-[#3fc1c9] transition-colors"
            >
              Services
            </Link>
            <Link
              href="/offerings"
              className="font-medium text-[#3fc1c9]"
            >
              Offerings
            </Link>
            <Link
              href="/#about"
              className="font-medium text-[#364f6b] hover:text-[#3fc1c9] transition-colors"
            >
              About
            </Link>
            <Link
              href="/#how-we-work"
              className="font-medium text-[#364f6b] hover:text-[#3fc1c9] transition-colors"
            >
              How We Work
            </Link>
            <Link
              href="/#why-leap"
              className="font-medium text-[#364f6b] hover:text-[#3fc1c9] transition-colors"
            >
              Why Leap
            </Link>
            <Link
              href="/partners-clients"
              className="font-medium text-[#364f6b] hover:text-[#3fc1c9] transition-colors"
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
            <svg className="w-6 h-6 text-[#364f6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                href="/offerings"
                className="text-[#3fc1c9] font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Offerings
              </Link>
              <Link
                href="/#about"
                className="text-[#364f6b] hover:text-[#3fc1c9] transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/#how-we-work"
                className="text-[#364f6b] hover:text-[#3fc1c9] transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                How We Work
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
                className="text-[#364f6b] hover:text-[#3fc1c9] transition-colors py-2"
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
      <section className="pt-32 pb-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <FadeIn>
            <p className="text-[#3fc1c9] font-semibold tracking-wider uppercase mb-4">What We Do</p>
            <h1 className="text-4xl md:text-6xl font-bold text-[#364f6b] mb-6">Offerings</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Boutique AI and data offerings built for financial services: senior-led, AI-augmented, and delivered end to end.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Anchor strip */}
      <section className="px-6 pb-12">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="#ai-strategy"
                className="px-5 py-2 rounded-full border border-[#3fc1c9] text-[#3fc1c9] font-medium hover:bg-[#3fc1c9] hover:text-white transition-colors"
              >
                AI Strategy
              </Link>
              <Link
                href="#ai-implementation"
                className="px-5 py-2 rounded-full border border-[#3fc1c9] text-[#3fc1c9] font-medium hover:bg-[#3fc1c9] hover:text-white transition-colors"
              >
                AI Implementation
              </Link>
              <Link
                href="#operating-model"
                className="px-5 py-2 rounded-full border border-[#3fc1c9] text-[#3fc1c9] font-medium hover:bg-[#3fc1c9] hover:text-white transition-colors"
              >
                Operating Model &amp; Change Management
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section A — AI Strategy (Prioritization + Cost Optimization) */}
      <section id="ai-strategy" className="py-20 px-6 bg-gray-50 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-[#3fc1c9] font-semibold tracking-wider uppercase mb-4">Strategy</p>
              <h2 className="text-3xl md:text-5xl font-bold text-[#364f6b] mb-6">AI Strategy</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From a prioritized roadmap to an efficient operating cost base. Strategy that produces executable outcomes.
              </p>
            </div>
          </FadeIn>

          {/* Sub-block A0: AI Readiness Diagnostic */}
          <FadeIn>
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm mb-10">
              <div className="bg-gradient-to-r from-[#1d2d44] to-[#364f6b] px-10 md:px-12 py-10 text-white">
                <p className="text-[#3fc1c9] font-semibold tracking-wider uppercase text-sm mb-3 flex items-center gap-2">
                  <span className="w-4 h-px bg-[#3fc1c9] inline-block" />
                  New
                </p>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">AI Readiness Diagnostic</h3>
                <p className="text-lg text-gray-300 max-w-3xl">
                  A senior-led assessment across ten dimensions of organizational AI absorption, from leadership alignment
                  and manager fluency to governance and operating model ownership. The diagnostic surfaces where AI is
                  actually getting stuck inside your firm, and what to do about it in the next ninety days.
                </p>
              </div>
              <div className="p-10 md:p-12">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[#3fc1c9] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-gray-700"><strong>Half-day</strong> executive workshop</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[#3fc1c9] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm text-gray-700"><strong>10 dimensions</strong>, 5 maturity levels</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[#3fc1c9] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm text-gray-700"><strong>Executive readout</strong>, 3 pages or fewer</span>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Most firms have given everyone access to a chatbot and called it AI strategy. The hard half is whether
                  the firm can absorb what comes next. This diagnostic measures organizational absorption capacity: the
                  culture, manager support, talent practices, workflow design, and operating model that determine whether
                  AI investment compounds or disperses.
                </p>
                <Link
                  href="/ai-readiness-diagnostic"
                  className="inline-flex items-center gap-2 bg-[#3fc1c9] text-white px-6 py-3 rounded-full font-medium hover:bg-[#2ba5ad] transition-all hover:shadow-lg"
                >
                  Explore the Diagnostic <span>→</span>
                </Link>
              </div>
            </div>
          </FadeIn>

          {/* Sub-block A1: Use Case Prioritization & Roadmap */}
          <FadeIn>
            <div className="bg-white rounded-2xl p-10 md:p-12 border border-gray-100 shadow-sm mb-10">
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#364f6b] mb-3">
                    AI Use Case Prioritization &amp; Roadmap
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    A structured approach to identify, prioritize, and implement AI use cases with proper governance.
                  </p>
                  <div className="mb-8">
                    <EngagementChip duration="~6 weeks" label="Strategy to roadmap" />
                  </div>
                  <div className="border-l-4 border-[#3fc1c9] pl-6 py-2">
                    <p className="text-lg text-[#364f6b] font-semibold mb-1">Start small, scale smart.</p>
                    <p className="text-gray-600">
                      Begin with 2 to 3 low-risk use cases to validate the framework. Prove value quickly, then expand with confidence.
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#3fc1c9] uppercase tracking-wider mb-4">Our Approach</p>
                  <ol className="space-y-4">
                    {prioritizationSteps.map((step, i) => (
                      <li key={step.title} className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#3fc1c9] text-white font-bold flex items-center justify-center">
                          {i + 1}
                        </div>
                        <div>
                          <p className="font-bold text-[#364f6b]">{step.title}</p>
                          <p className="text-gray-600 text-sm">{step.body}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Sub-block A2: Agentic Cost Optimization */}
          <FadeIn>
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              {/* Headline strip */}
              <div className="bg-gradient-to-r from-[#364f6b] to-[#4a6785] px-10 md:px-12 py-10 text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Agentic AI Cost Optimization</h3>
                <p className="text-xl text-gray-200">
                  Reduce AI operating costs <span className="text-[#3fc1c9] font-bold">40–60%</span> while improving governance and performance. Typical payback in under <span className="text-[#3fc1c9] font-bold">3 months</span>.
                </p>
              </div>

              <div className="p-10 md:p-12">
                {/* Engagement chips */}
                <div className="flex flex-wrap gap-3 mb-8">
                  <EngagementChip duration="2 weeks" label="Rapid diagnostic" />
                  <EngagementChip duration="4 weeks" label="Standard assessment" />
                </div>

                {/* The Challenge */}
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 mb-10">
                  <p className="text-sm font-semibold text-[#3fc1c9] uppercase tracking-wider mb-2">The Challenge</p>
                  <p className="text-gray-700 leading-relaxed">
                    Financial services firms overspend on AI by defaulting to premium models for every task, allowing vendor sprawl across business units, and duplicating data pipelines, compounding costs that erode ROI. 60–80% of AI requests are routine but get routed to premium models.
                  </p>
                </div>

                {/* 3 Pillars */}
                <p className="text-sm font-semibold text-[#3fc1c9] uppercase tracking-wider mb-4">Our Approach</p>
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  {costPillars.map((p) => (
                    <div key={p.title} className="flex flex-col bg-gray-50 rounded-xl p-6 border border-gray-100">
                      <h4 className="text-lg font-bold text-[#364f6b] mb-3">{p.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed flex-1">{p.body}</p>
                      <div className="mt-6 pt-4 border-t border-gray-200 min-h-[5.5rem] flex items-center">
                        <p className="text-[#3fc1c9] font-bold text-lg">{p.metric}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Deliverables */}
                <p className="text-sm font-semibold text-[#3fc1c9] uppercase tracking-wider mb-4">What the Client Gets</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                  {costDeliverables.map((d) => (
                    <div key={d.title} className="flex gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <svg className="w-6 h-6 text-[#3fc1c9] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <div>
                        <p className="font-semibold text-[#364f6b] text-sm mb-1">{d.title}</p>
                        <p className="text-gray-600 text-xs leading-relaxed">{d.body}</p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section B — AI Implementation */}
      <section id="ai-implementation" className="py-20 px-6 bg-white scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-[#3fc1c9] font-semibold tracking-wider uppercase mb-4">Execution</p>
              <h2 className="text-3xl md:text-5xl font-bold text-[#364f6b] mb-6">AI Implementation</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From proven concept to production: turning prioritized use cases into working systems.
              </p>
            </div>
          </FadeIn>

          {/* Sub-block: AI Use Case Implementation */}
          <FadeIn>
            <div className="bg-white rounded-2xl p-10 md:p-12 border border-gray-100 shadow-sm">
              <h3 className="text-2xl md:text-3xl font-bold text-[#364f6b] mb-3">
                AI Use Case Implementation
              </h3>
              <p className="text-lg text-gray-600 mb-6 max-w-3xl">
                Turn AI strategy into production-ready solutions, from proof of concept through deployment, integration, and ongoing optimization within your existing infrastructure.
              </p>
              <div className="mb-8">
                <EngagementChip duration="4–6 weeks" label="3–4 use cases" />
              </div>

              {/* TODO: expand with dedicated Implementation deck content */}
              <p className="text-sm font-semibold text-[#3fc1c9] uppercase tracking-wider mb-4">Our Approach</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {implementationSteps.map((step, i) => (
                  <div key={step.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#3fc1c9] text-white font-bold mb-4">
                      {i + 1}
                    </div>
                    <h4 className="text-lg font-bold text-[#364f6b] mb-2">{step.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.body}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 bg-gray-50 border border-gray-100 rounded-2xl p-8 text-center">
                <p className="text-gray-700 max-w-3xl mx-auto">
                  Implementation is the natural follow-on to <Link href="#ai-strategy" className="text-[#3fc1c9] font-semibold hover:underline">AI Use Case Prioritization &amp; Roadmap</Link>. Senior-led delivery, no junior handoffs. The same people who shape the strategy build it.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section C — Operating Model & Change Management */}
      <section id="operating-model" className="py-20 px-6 bg-gray-50 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-[#3fc1c9] font-semibold tracking-wider uppercase mb-4">Change Management</p>
              <h2 className="text-3xl md:text-5xl font-bold text-[#364f6b] mb-6">
                Operating Model &amp; Change Management
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The roles, playbooks, and training that turn AI adoption from pilot into habit.
              </p>
            </div>
          </FadeIn>

          {/* Sub-block: AI Education, Training & Hackathons */}
          <FadeIn>
            <div className="bg-white rounded-2xl p-10 md:p-12 border border-gray-100 shadow-sm">
              <h3 className="text-2xl md:text-3xl font-bold text-[#364f6b] mb-3">
                AI Education, Training &amp; Hackathons
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-3xl">
                From executive education to hands-on enablement across your organization and portfolio companies.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {educationOfferings.map((o, index) => (
                  <FadeIn key={o.title} delay={index * 100}>
                    <div className="group bg-gray-50 p-8 md:p-10 rounded-2xl border border-gray-100 hover:border-[#3fc1c9]/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                      <div className="flex items-center justify-between gap-4 mb-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-[#3fc1c9]/20 to-[#3fc1c9]/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                          <svg className="w-7 h-7 text-[#3fc1c9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {o.icon}
                          </svg>
                        </div>
                        {o.duration && <EngagementChip duration={o.duration} />}
                      </div>
                      <h4 className="text-xl md:text-2xl font-bold text-[#364f6b] mb-2 group-hover:text-[#3fc1c9] transition-colors">
                        {o.title}
                      </h4>
                      {o.byline && (
                        <p className="text-xs font-medium text-[#3fc1c9] mb-3 uppercase tracking-wider">{o.byline}</p>
                      )}
                      <p className="text-gray-600 mb-5">{o.body}</p>
                      <ul className="space-y-2 mt-auto">
                        {o.bullets.map((b) => (
                          <li key={b} className="flex gap-2 text-sm text-gray-700">
                            <span className="text-[#3fc1c9] mt-1">•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#364f6b] to-[#4a6785]">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to start?</h2>
            <p className="text-lg text-gray-200 mb-8">
              Senior-led engagements, right-sized by design. Let&apos;s discuss where AI can move the needle for your firm.
            </p>
            <Link
              href="/#contact"
              className="inline-block bg-[#3fc1c9] text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-[#2ba5ad] transition-colors"
            >
              Start a Conversation
            </Link>
          </FadeIn>
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

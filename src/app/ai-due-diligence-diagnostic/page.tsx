"use client";

import Image from "next/image";
import Link from "next/link";
import SiteFooter from "../components/SiteFooter";
import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import LeadCaptureModal, { type LeadCaptureIntent } from "../components/LeadCaptureModal";

type DomainId =
  | "governance"
  | "shadow-ai"
  | "ip-regulatory"
  | "capability"
  | "operational"
  | "value";

type BandKey = "material" | "further" | "manageable" | "strong";

type Option = {
  label: string;
  score: number;
  isUnknown?: boolean;
};

type Question = {
  id: string;
  domain: DomainId;
  text: string;
  subtext: string;
  options: Option[];
};

type Band = {
  key: BandKey;
  label: string;
  summary: string;
  color: string;
  bg: string;
};

type Domain = {
  number: string;
  label: string;
  shortLabel: string;
  blurb: string;
  tell: string;
  resultCopy: Record<BandKey, string>;
};

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isInView };
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, isInView } = useInView();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function ArrowRightIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function SiteNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { href: "/#services", label: "Services" },
    { href: "/offerings", label: "Offerings" },
    { href: "/#about", label: "About" },
    { href: "/#how-we-work", label: "How We Work" },
    { href: "/#why-leap", label: "Why Leap" },
    { href: "/partners-clients", label: "Partners & Clients" },
  ];

  return (
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
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-medium text-[#364f6b] hover:text-[#3fc1c9] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="bg-[#3fc1c9] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#2ba5ad] transition-all hover:shadow-lg"
          >
            Get in Touch
          </Link>
        </div>

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

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#364f6b] hover:text-[#3fc1c9] transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
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
  );
}

const domains: Record<DomainId, Domain> = {
  governance: {
    number: "01",
    label: "AI Inventory & Governance",
    shortLabel: "Governance",
    blurb: "Whether the target can show what AI is in use, who owns it, and how AI decisions get made.",
    tell: "Show the current AI inventory and name the person who can defend it.",
    resultCopy: {
      material: "The current evidence does not support a reliable AI control baseline.",
      further: "Governance appears incomplete and should be diligence-tested before IC.",
      manageable: "Some governance evidence exists, but the control story needs pressure testing.",
      strong: "Initial evidence suggests a credible AI governance foundation.",
    },
  },
  "shadow-ai": {
    number: "02",
    label: "Shadow AI & Data Exposure",
    shortLabel: "Shadow AI",
    blurb: "Whether sensitive data exposure is controlled and employee AI usage is visible enough to assess.",
    tell: "If a deal team asked where confidential data entered public AI tools, could the target answer?",
    resultCopy: {
      material: "Unverified employee AI use may create hidden data, confidentiality, and IP exposure.",
      further: "Some controls may exist, but shadow AI remains a diligence concern.",
      manageable: "The exposure appears bounded, subject to evidence review.",
      strong: "Initial evidence suggests sensitive AI usage is controlled and visible.",
    },
  },
  "ip-regulatory": {
    number: "03",
    label: "AI Claims, IP & Regulatory",
    shortLabel: "IP & Regulatory",
    blurb:
      "Whether external AI claims hold up against operating reality and whether AI-specific obligations are scoped.",
    tell: "Compare the sales deck AI claim to the technical evidence. What is substantiated?",
    resultCopy: {
      material: "AI claims, IP rights, or regulatory posture may be a material deal issue.",
      further: "Legal and regulatory assumptions need more support before IC.",
      manageable: "Known gaps appear addressable, but should be sized in diligence.",
      strong: "Initial evidence suggests AI claims and obligations are being managed.",
    },
  },
  capability: {
    number: "04",
    label: "Technical Differentiation & Model Dependency",
    shortLabel: "Capability",
    blurb:
      "Whether the AI capability is defensible and whether the architecture leaves credible provider optionality.",
    tell: "What is left of the AI value proposition if the model vendor changes pricing or product access?",
    resultCopy: {
      material: "The AI value thesis may rely on commodity technology or unproven differentiation.",
      further: "The technical moat and model-provider dependency need deeper review.",
      manageable: "Capability appears useful, but durability still needs validation.",
      strong: "Initial evidence supports a more defensible AI capability.",
    },
  },
  operational: {
    number: "05",
    label: "Operational Risk, Insurance & RWI",
    shortLabel: "Ops Risk",
    blurb:
      "Whether high-stakes AI output is validated and whether failure modes have been mapped to deal protections.",
    tell: "Which AI failure would create a valuation, insurance, or RWI issue first?",
    resultCopy: {
      material: "Operational AI failures could create valuation, coverage, or RWI friction.",
      further: "Validation, auditability, or coverage evidence needs more diligence.",
      manageable: "Controls appear partial and should be linked to deal risk allocation.",
      strong: "Initial evidence suggests AI operational risk is being actively managed.",
    },
  },
  value: {
    number: "06",
    label: "Value Creation & EBITDA Upside",
    shortLabel: "Value Creation",
    blurb: "Whether AI upside is sized, owned, and feasible under the target's operating constraints.",
    tell: "Which AI use cases are real enough to underwrite, and who owns post-close execution?",
    resultCopy: {
      material: "AI upside has not been evidenced enough to support the post-close case.",
      further: "Upside exists conceptually, but value sizing needs a deeper workstream.",
      manageable: "There are plausible AI value levers that should be prioritized post-close.",
      strong: "Initial evidence suggests AI can support the value-creation plan.",
    },
  },
};

const domainOrder = Object.keys(domains) as DomainId[];

const questions: Question[] = [
  {
    id: "inventory",
    domain: "governance",
    text: "Does current diligence evidence show a complete inventory of AI tools in use across the target?",
    subtext: "Include public generative AI tools, internal models, embedded vendor AI, APIs, and automated workflows.",
    options: [
      { label: "Yes: documented, current, and reviewed by accountable owners", score: 5 },
      { label: "Partially: some AI tools are documented, but coverage is incomplete", score: 3 },
      { label: "Unknown / not yet evidenced", score: 1.5, isUnknown: true },
      { label: "No: there is no central AI inventory", score: 1 },
    ],
  },
  {
    id: "governance",
    domain: "governance",
    text: "Is there evidence of formal AI governance with named ownership, policy, and decision rights?",
    subtext: "A policy alone is not enough if ownership, enforcement, and escalation paths are unclear.",
    options: [
      { label: "Yes: governance is active, enforced, and owned by senior leadership", score: 5 },
      { label: "Partially: policy exists, but accountability or enforcement is uneven", score: 3 },
      { label: "Unknown / not yet evidenced", score: 1.5, isUnknown: true },
      { label: "No: AI decisions appear ad hoc", score: 1 },
    ],
  },
  {
    id: "sensitive-data",
    domain: "shadow-ai",
    text: "Has the target provided evidence of controls that prevent sensitive data entering public AI tools?",
    subtext: "Relevant data includes contracts, customer information, code, financial models, claims data, and board materials.",
    options: [
      { label: "Yes: restrictions, logging, and technical controls are evidenced", score: 5 },
      { label: "Partially: policy exists, but monitoring or enforcement is limited", score: 3 },
      { label: "Unknown / not yet evidenced", score: 1.5, isUnknown: true },
      { label: "No: employee use is largely unmanaged or invisible", score: 1 },
    ],
  },
  {
    id: "vendor-terms",
    domain: "shadow-ai",
    text: "Have AI vendor terms been reviewed for data rights, output ownership, and liability?",
    subtext: "This includes enterprise AI agreements, embedded AI vendors, and employee-accepted terms of service.",
    options: [
      { label: "Yes: key terms are reviewed, documented, and mapped to AI use cases", score: 5 },
      { label: "Partially: major enterprise tools reviewed, but gaps remain", score: 3 },
      { label: "Unknown / not yet evidenced", score: 1.5, isUnknown: true },
      { label: "No: terms appear unmanaged or accepted outside legal review", score: 1 },
    ],
  },
  {
    id: "external-claims",
    domain: "ip-regulatory",
    text: "Do the target's AI claims match the product and operating evidence?",
    subtext: "Consider customer decks, product pages, investor materials, sales scripts, and regulatory-facing statements.",
    options: [
      { label: "Yes: claims are substantiated and reviewed against actual capability", score: 5 },
      { label: "Mostly: language appears directionally accurate, but not fully tested", score: 3 },
      { label: "Unknown / not yet evidenced", score: 1.5, isUnknown: true },
      { label: "No: there may be a gap between claims and operating reality", score: 1 },
    ],
  },
  {
    id: "regulatory",
    domain: "ip-regulatory",
    text: "Has the target assessed AI-specific regulatory obligations for its use cases and markets?",
    subtext: "Higher-risk use cases may include hiring, lending, underwriting, pricing, customer decisions, or regulated reporting.",
    options: [
      { label: "Yes: obligations are assessed, documented, and reflected in controls", score: 5 },
      { label: "Partially: initial assessment exists, with open gaps", score: 3 },
      { label: "Unknown / not yet evidenced", score: 1.5, isUnknown: true },
      { label: "No: AI-specific obligations have not been assessed", score: 1 },
    ],
  },
  {
    id: "technical-moat",
    domain: "capability",
    text: "What does the evidence suggest about the target's most important AI capability?",
    subtext: "The diligence question is whether the AI capability is defensible, not whether the company uses AI.",
    options: [
      { label: "Proprietary data, architecture, or model work supports differentiation", score: 5 },
      { label: "Custom workflow integration creates some defensible advantage", score: 4 },
      { label: "Third-party AI is integrated, but differentiation appears limited", score: 2.5 },
      { label: "Unknown / not yet evidenced", score: 1.5, isUnknown: true },
      { label: "Mostly commodity prompting or thin API integration", score: 1 },
    ],
  },
  {
    id: "model-dependency",
    domain: "capability",
    text: "How exposed is the target to a single model provider or AI platform?",
    subtext: "Provider pricing, usage restrictions, API changes, or product expansion can affect the investment case.",
    options: [
      { label: "Low: architecture and contracts support credible optionality", score: 5 },
      { label: "Moderate: primary provider exists, but migration path is documented", score: 3.5 },
      { label: "Unknown / not yet evidenced", score: 1.5, isUnknown: true },
      { label: "High: core workflows appear locked into one provider", score: 1 },
    ],
  },
  {
    id: "validation",
    domain: "operational",
    text: "Are AI outputs validated before use in high-stakes business decisions?",
    subtext: "High-stakes use may include pricing, underwriting, hiring, claims, finance, compliance, or customer communications.",
    options: [
      { label: "Yes: human review, validation, and audit trails are evidenced", score: 5 },
      { label: "Partially: review exists, but not consistently across use cases", score: 3 },
      { label: "Unknown / not yet evidenced", score: 1.5, isUnknown: true },
      { label: "No: outputs may be used without reliable validation", score: 1 },
    ],
  },
  {
    id: "insurance-rwi",
    domain: "operational",
    text: "Have insurance and RWI implications of AI-related failure modes been considered?",
    subtext: "Relevant policies may include cyber, E&O, D&O, technology liability, and representations and warranties insurance.",
    options: [
      { label: "Yes: coverage and RWI implications have been reviewed against AI use", score: 5 },
      { label: "Partially: some insurance review exists, but deal implications are open", score: 3 },
      { label: "Unknown / not yet evidenced", score: 1.5, isUnknown: true },
      { label: "No: AI exposure has not been linked to coverage or RWI", score: 1 },
    ],
  },
  {
    id: "ebitda-upside",
    domain: "value",
    text: "Has the target identified quantified AI use cases that could improve EBITDA or competitive position?",
    subtext: "This should go beyond idea lists and connect to impact, feasibility, adoption, and operating model constraints.",
    options: [
      { label: "Yes: prioritized use cases with sizing, owners, and execution path", score: 5 },
      { label: "Partially: use cases exist, but value is not yet quantified", score: 3 },
      { label: "Unknown / not yet evidenced", score: 1.5, isUnknown: true },
      { label: "No: AI upside has not been systematically assessed", score: 1 },
    ],
  },
  {
    id: "post-close-capacity",
    domain: "value",
    text: "Does the target appear able to execute AI value creation after close?",
    subtext: "Consider talent, data readiness, tooling, governance, executive sponsorship, and change capacity.",
    options: [
      { label: "Yes: capabilities and sponsorship are evidenced across key functions", score: 5 },
      { label: "Partially: pockets of capability exist, but execution capacity is uneven", score: 3 },
      { label: "Unknown / not yet evidenced", score: 1.5, isUnknown: true },
      { label: "No: material capability gaps would slow post-close execution", score: 1 },
    ],
  },
];

const premisePoints = [
  {
    num: "01",
    title: "AI is in the growth story.",
    body: "The target markets AI capability, embeds AI in products, or uses AI to support differentiation.",
  },
  {
    num: "02",
    title: "AI touches sensitive workflows.",
    body: "AI is used in customer data, pricing, underwriting, claims, compliance, hiring, or finance processes.",
  },
  {
    num: "03",
    title: "Model dependency matters.",
    body: "Key workflows rely on a model provider, AI platform, or vendor terms that may affect cost, access, or liability.",
  },
  {
    num: "04",
    title: "AI upside is in the value-creation case.",
    body: "AI savings, revenue lift, or productivity gains are part of the underwriting case or post-close plan.",
  },
];

const engagementModes = [
  {
    label: "Deal screen",
    duration: "30-45 min",
    desc: "Use the twelve questions to identify whether AI risk or upside deserves a discrete workstream before IC.",
  },
  {
    label: "AI diligence triage",
    duration: "Half-day",
    desc: "Run a focused session with the deal team to pressure-test evidence, unknowns, and management claims.",
  },
  {
    label: "Dedicated AI diligence workstream",
    duration: "1-2 weeks",
    desc: "Validate the target's AI inventory, controls, claims, model dependencies, failure modes, and value creation case.",
  },
];

const implications = [
  {
    title: "Deal risk",
    body: "AI exposure may need a focused workstream before management representations are relied on.",
  },
  {
    title: "Value thesis",
    body: "AI upside should be separated from marketing claims and sized against execution capacity.",
  },
  {
    title: "Next step",
    body: "A short Leap triage can convert open items into deal-ready diligence questions.",
  },
];

function getBand(score: number): Band {
  if (score <= 2) {
    return {
      key: "material",
      label: "Material AI diligence gaps identified",
      summary:
        "The current evidence suggests AI-related risk could affect valuation, deal protections, or post-close execution.",
      color: "#d96d57",
      bg: "#fff1ef",
    };
  }

  if (score <= 3.25) {
    return {
      key: "further",
      label: "Further diligence required before investment committee",
      summary:
        "There are enough open items to justify a focused AI diligence workstream before relying on the value thesis.",
      color: "#c79d3c",
      bg: "#fff7e8",
    };
  }

  if (score <= 4.25) {
    return {
      key: "manageable",
      label: "Manageable with targeted diligence",
      summary:
        "The evidence is constructive, but selected domains should be pressure-tested before close.",
      color: "#2ba5ad",
      bg: "#ecfbfc",
    };
  }

  return {
    key: "strong",
    label: "Constructive initial AI diligence profile",
    summary:
      "The initial profile is strong, though AI value creation and risk allocation still merit deal-specific validation.",
    color: "#3fc1c9",
    bg: "#e9fbfc",
  };
}

function formatScore(score: number) {
  return score.toFixed(1);
}

function getOptionSignal(option: Option) {
  if (option.isUnknown) return "unknown";
  if (option.score >= 4.5) return "evidenced";
  if (option.score >= 3) return "partial";
  if (option.score > 1.5) return "limited";
  return "not evidenced";
}

function scrollToDiagnostic() {
  document.getElementById("diagnostic")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function DiagnosticTool() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<number | null>>(
    new Array(questions.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadIntent, setLeadIntent] = useState<LeadCaptureIntent>("ai-dd-triage");

  const currentQuestion = questions[currentIndex];
  const selectedAnswer = answers[currentIndex];
  const answeredCount = answers.filter((answer) => answer !== null).length;
  const progress = Math.round((answeredCount / questions.length) * 100);

  const results = useMemo(() => {
    const domainScores = domainOrder.map((domainId) => {
      const domainQuestions = questions.filter((question) => question.domain === domainId);
      const score =
        domainQuestions.reduce((total, question) => {
          const questionIndex = questions.findIndex((item) => item.id === question.id);
          const answerIndex = answers[questionIndex];
          return total + (answerIndex === null ? 1.5 : question.options[answerIndex].score);
        }, 0) / domainQuestions.length;

      return {
        domainId,
        score,
        band: getBand(score),
      };
    });

    const overallScore =
      domainScores.reduce((total, domainResult) => total + domainResult.score, 0) /
      domainScores.length;

    const weakestDomains = [...domainScores]
      .sort((a, b) => a.score - b.score)
      .slice(0, 2)
      .map((domainResult) => domains[domainResult.domainId].label);

    return {
      domainScores,
      overallScore,
      overallBand: getBand(overallScore),
      weakestDomains,
    };
  }, [answers]);

  const openLeadModal = (intent: LeadCaptureIntent) => {
    setLeadIntent(intent);
    setLeadModalOpen(true);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (showResults) return;
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName.toLowerCase();
      if (tag === "input" || tag === "textarea") return;

      if (/^[1-9]$/.test(event.key)) {
        const index = Number(event.key) - 1;
        if (index < currentQuestion.options.length) {
          setAnswers((previous) => {
            const next = [...previous];
            next[currentIndex] = index;
            return next;
          });
        }
      }

      if (event.key === "ArrowLeft" && currentIndex > 0) {
        setCurrentIndex((index) => index - 1);
        scrollToDiagnostic();
      }

      if (event.key === "ArrowRight" && answers[currentIndex] !== null) {
        if (currentIndex === questions.length - 1) {
          setShowResults(true);
        } else {
          setCurrentIndex((index) => index + 1);
        }
        scrollToDiagnostic();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [answers, currentIndex, currentQuestion.options.length, showResults]);

  const selectAnswer = (answerIndex: number) => {
    setAnswers((previous) => {
      const next = [...previous];
      next[currentIndex] = answerIndex;
      return next;
    });
  };

  const goNext = () => {
    if (answers[currentIndex] === null) return;

    if (currentIndex === questions.length - 1) {
      setShowResults(true);
      requestAnimationFrame(scrollToDiagnostic);
      return;
    }

    setCurrentIndex((index) => index + 1);
    requestAnimationFrame(scrollToDiagnostic);
  };

  const goBack = () => {
    setCurrentIndex((index) => Math.max(0, index - 1));
    requestAnimationFrame(scrollToDiagnostic);
  };

  const resetDiagnostic = () => {
    setAnswers(new Array(questions.length).fill(null));
    setCurrentIndex(0);
    setShowResults(false);
    requestAnimationFrame(scrollToDiagnostic);
  };

  return (
    <>
      <section id="diagnostic" className="py-20 md:py-28 px-6 md:px-8 bg-[#f8f9fb] scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-end mb-12">
          <FadeIn>
            <div>
              <p className="text-[#2ba5ad] font-semibold tracking-wider uppercase text-sm mb-5 flex items-center gap-3">
                <span className="w-5 h-px bg-[#2ba5ad] inline-block" />
                Run The Screen
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#364f6b] leading-tight">
                Score the target your team is evaluating.
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-lg text-gray-600 leading-relaxed">
              Answer twelve questions based on the diligence evidence available today. Unknown is a
              valid answer, and it is scored as risk. Your detailed answers stay in this browser.
            </p>
          </FadeIn>
        </div>

        {!showResults ? (
          <FadeIn delay={150}>
            <section className="bg-white border border-gray-200 rounded-lg p-7 md:p-11 shadow-[0_1px_0_rgba(29,45,68,0.04),0_30px_60px_-40px_rgba(29,45,68,0.18)]">
              <div className="mb-8">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <span className="font-mono text-xs uppercase text-gray-400">
                    Question{" "}
                    <strong className="font-semibold text-[#364f6b]">
                      {String(currentIndex + 1).padStart(2, "0")}
                    </strong>{" "}
                    of{" "}
                    <strong className="font-semibold text-[#364f6b]">
                      {String(questions.length).padStart(2, "0")}
                    </strong>
                  </span>
                  <span className="font-mono text-xs text-[#2ba5ad]">{progress}% complete</span>
                </div>
                <div className="mt-3 h-1 overflow-hidden bg-gray-100 rounded-full">
                  <div
                    className="h-1 bg-[#3fc1c9] transition-all duration-300"
                    style={{ width: `${Math.max(answeredCount ? progress : 4, 4)}%` }}
                  />
                </div>
                <div className="mt-4 grid grid-cols-12 gap-1">
                  {questions.map((question, index) => (
                    <span
                      key={question.id}
                      className={`h-1 rounded-full ${
                        index === currentIndex
                          ? "bg-[#364f6b]"
                          : answers[index] !== null
                            ? "bg-[#3fc1c9]"
                            : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase text-[#2ba5ad]">
                  <span className="h-px w-4 bg-[#2ba5ad]" />
                  {domains[currentQuestion.domain].number} | {domains[currentQuestion.domain].label}
                </div>
                <h3 className="max-w-3xl text-2xl md:text-3xl font-bold leading-tight text-[#364f6b]">
                  {currentQuestion.text}
                </h3>
                <p className="mt-4 max-w-4xl text-base leading-relaxed text-gray-600">
                  {currentQuestion.subtext}
                </p>

                <div className="mt-8 flex flex-col gap-3" role="radiogroup" aria-label="Answer options">
                  {currentQuestion.options.map((option, optionIndex) => {
                    const isSelected = selectedAnswer === optionIndex;

                    return (
                      <button
                        key={option.label}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => selectAnswer(optionIndex)}
                        className={`grid w-full grid-cols-[22px_1fr_auto] items-center gap-4 rounded-lg border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-[#3fc1c9] focus:ring-offset-2 ${
                          isSelected
                            ? option.isUnknown
                              ? "border-[#c79d3c] bg-[#fff7e8]"
                              : "border-[#3fc1c9] bg-[#ecfbfc]"
                            : option.isUnknown
                              ? "border-[#ead7a0] bg-[#fffaf0] hover:border-[#c79d3c]"
                              : "border-gray-200 bg-white hover:border-[#3fc1c9] hover:bg-[#f8f9fb]"
                        }`}
                      >
                        <span
                          className={`flex h-[18px] w-[18px] items-center justify-center rounded-full border ${
                            isSelected
                              ? option.isUnknown
                                ? "border-[#c79d3c] bg-[#c79d3c]"
                                : "border-[#3fc1c9] bg-[#3fc1c9]"
                              : "border-gray-400"
                          }`}
                        >
                          {isSelected ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
                        </span>
                        <span className="text-sm leading-6 text-[#364f6b] sm:text-base">
                          {option.label}
                        </span>
                        <span
                          className={`hidden rounded-full border px-2 py-1 font-mono text-xs sm:inline ${
                            option.isUnknown
                              ? "border-[#ead7a0] text-[#c79d3c]"
                              : "border-gray-200 text-gray-400"
                          }`}
                        >
                          {getOptionSignal(option)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex items-center gap-2 font-mono text-xs uppercase text-gray-400">
                  <span className="h-px w-4 bg-gray-300" />
                  Unknown is valid, and scored as risk
                </p>
                <div className="flex items-center justify-between gap-3 sm:justify-end">
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={currentIndex === 0}
                    className="rounded-full border border-gray-200 px-5 py-3 text-sm font-medium text-[#364f6b] transition hover:border-[#364f6b] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={selectedAnswer === null}
                    className="rounded-full bg-[#3fc1c9] px-6 py-3 text-sm font-medium text-[#0c1a2b] transition hover:bg-[#5cd1d8] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                  >
                    {currentIndex === questions.length - 1 ? "See directional results" : "Next"}
                  </button>
                </div>
              </div>
            </section>
          </FadeIn>
        ) : (
          <FadeIn delay={150}>
            <section>
              <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-lg bg-gradient-to-br from-[#1d2d44] to-[#364f6b] p-7 text-white sm:p-9 lg:p-10">
                  <p className="mb-5 text-sm font-semibold uppercase tracking-wider text-[#3fc1c9]">
                    Directional AI DD profile
                  </p>
                  <div className="flex flex-wrap items-baseline gap-4">
                    <div className="font-serif text-7xl leading-none sm:text-8xl" style={{ color: results.overallBand.color }}>
                      {formatScore(results.overallScore)}
                    </div>
                    <div className="font-mono text-xs uppercase text-gray-400">out of 5.0</div>
                  </div>
                  <h2 className="mt-7 max-w-lg text-3xl font-bold leading-tight text-white">
                    {results.overallBand.label}
                  </h2>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-300">
                    {results.overallBand.summary}
                  </p>

                  <div className="mt-8 grid h-16 grid-cols-6 items-end gap-2" aria-label="Domain score sparkline">
                    {results.domainScores.map((domainResult) => (
                      <div
                        key={domainResult.domainId}
                        className="relative h-16 overflow-hidden rounded bg-white/10"
                        title={`${domains[domainResult.domainId].shortLabel}: ${formatScore(
                          domainResult.score
                        )}`}
                      >
                        <div
                          className="absolute bottom-0 left-0 right-0"
                          style={{
                            height: `${Math.max(8, (domainResult.score / 5) * 100)}%`,
                            backgroundColor: domainResult.band.color,
                          }}
                        />
                        <span className="absolute bottom-1 left-0 right-0 z-10 text-center font-mono text-[9px] text-white">
                          {domains[domainResult.domainId].shortLabel.slice(0, 4)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-7 sm:p-9 lg:p-10">
                  <h3 className="text-2xl font-bold text-[#364f6b]">What this suggests</h3>
                  <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-600">
                    This snapshot is intentionally directional. It surfaces the deal questions worth
                    pressure-testing, not the full diligence answer set.
                  </p>
                  <div className="mt-6 grid gap-3 md:grid-cols-3">
                    {implications.map((implication) => (
                      <div key={implication.title} className="rounded-lg border border-gray-200 bg-[#f8f9fb] p-4">
                        <div className="text-sm font-semibold text-[#364f6b]">{implication.title}</div>
                        <p className="mt-2 text-sm leading-6 text-gray-600">{implication.body}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 border-t border-gray-200 pt-5">
                    <div className="font-mono text-xs uppercase text-gray-400">Weakest domains</div>
                    <div className="mt-2 text-base font-semibold text-[#364f6b]">
                      {results.weakestDomains.join(" | ")}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {results.domainScores.map((domainResult) => {
                  const domain = domains[domainResult.domainId];

                  return (
                    <article
                      key={domainResult.domainId}
                      className="rounded-lg border border-gray-200 bg-white p-5 transition hover:-translate-y-px hover:shadow-[0_12px_34px_-28px_rgba(29,45,68,0.35)]"
                      style={{ borderTopColor: domainResult.band.color, borderTopWidth: 4 }}
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <div className="font-mono text-xs uppercase text-gray-400">
                          {domain.number} | {domain.shortLabel}
                        </div>
                        <div className="font-serif text-3xl leading-none" style={{ color: domainResult.band.color }}>
                          {formatScore(domainResult.score)}
                        </div>
                      </div>
                      <h3 className="mt-3 text-base font-semibold leading-snug text-[#364f6b]">
                        {domain.label}
                      </h3>
                      <div className="mt-4 h-1 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-1"
                          style={{
                            width: `${(domainResult.score / 5) * 100}%`,
                            backgroundColor: domainResult.band.color,
                          }}
                        />
                      </div>
                      <p className="mt-4 text-sm leading-6 text-gray-600">
                        {domain.resultCopy[domainResult.band.key]}
                      </p>
                    </article>
                  );
                })}
              </div>

              <div className="mt-7 rounded-lg bg-gradient-to-br from-[#1d2d44] to-[#364f6b] p-7 text-white sm:p-9 lg:p-10">
                <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                  <div>
                    <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#3fc1c9]">
                      Next step
                    </p>
                    <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                      Book a 30-minute AI diligence triage.
                    </h2>
                    <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-300">
                      Leap can pressure-test the target&apos;s evidence, clarify AI value creation,
                      and frame the deal questions that matter before close.
                    </p>
                    <p className="mt-4 font-mono text-xs leading-6 text-gray-400">
                      No target name or detailed answers are required to start the conversation.
                      Contact forms include only the score band, directional score, and weakest domains.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={() => openLeadModal("ai-dd-triage")}
                      className="rounded-full bg-[#3fc1c9] px-6 py-3 text-center text-sm font-medium text-[#0c1a2b] transition hover:bg-[#5cd1d8]"
                    >
                      Book a 30-minute AI diligence triage
                    </button>
                    <button
                      type="button"
                      onClick={() => openLeadModal("ai-dd-workstream")}
                      className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-medium text-white transition hover:border-white/40"
                    >
                      Request a 1-2 week diligence workstream
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
                <p>Directional tool only. Not legal, investment, insurance, tax, or valuation advice.</p>
                <button
                  type="button"
                  onClick={resetDiagnostic}
                  className="self-start text-[#364f6b] underline decoration-gray-300 underline-offset-4 transition hover:text-[#3fc1c9] sm:self-auto"
                >
                  Start the diagnostic again
                </button>
              </div>
            </section>
          </FadeIn>
        )}
      </div>
      </section>
      <LeadCaptureModal
        isOpen={leadModalOpen}
        intent={leadIntent}
        onClose={() => setLeadModalOpen(false)}
        summary={{
          scoreBand: results.overallBand.label,
          directionalScore: `${formatScore(results.overallScore)} / 5`,
          weakestDomains: results.weakestDomains,
        }}
      />
    </>
  );
}

export default function AiDueDiligenceDiagnosticPage() {
  const [leadModalOpen, setLeadModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <SiteNav />

      <section className="pt-32 pb-20 md:pb-28 bg-gradient-to-br from-[#1d2d44] via-[#2a3f5a] to-[#364f6b] text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-[#3fc1c9]/8 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-[#3fc1c9]/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-[1fr_0.78fr] gap-12 lg:gap-20 items-end">
            <div>
              <FadeIn>
                <p className="text-[#3fc1c9] font-semibold tracking-wider uppercase text-sm mb-5 flex items-center gap-3">
                  <span className="w-5 h-px bg-[#3fc1c9] inline-block" />
                  AI Due Diligence Diagnostic
                </p>
              </FadeIn>
              <FadeIn delay={100}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-7">
                  Pressure-test AI risk and{" "}
                  <span className="text-[#3fc1c9]">value creation</span> before IC.
                </h1>
              </FadeIn>
              <FadeIn delay={200}>
                <p className="text-lg md:text-xl text-gray-300 max-w-[56ch] leading-relaxed mb-9">
                  Leap&apos;s 12-question diagnostic helps PE deal teams identify whether AI claims,
                  controls, model dependencies, or value-creation assumptions need a focused
                  diligence workstream.
                </p>
              </FadeIn>
              <FadeIn delay={300}>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#diagnostic"
                    className="inline-flex items-center gap-2.5 bg-[#3fc1c9] text-[#0c1a2b] px-6 py-3.5 rounded-full font-medium hover:bg-[#5cd1d8] transition-colors"
                  >
                    Run the screen <ArrowRightIcon />
                  </a>
                  <a
                    href="#domains"
                    className="inline-flex items-center gap-2.5 border border-white/20 text-white px-6 py-3.5 rounded-full font-medium hover:border-white/40 transition-colors"
                  >
                    See what we evaluate
                  </a>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={350}>
              <aside>
                <p className="text-[#3fc1c9] font-semibold tracking-wider uppercase text-sm mb-5">
                  What Leap Delivers
                </p>
                <p className="text-xl md:text-2xl leading-relaxed font-serif opacity-95">
                  A Leap AI diligence triage produces an evidence gap map, management questions,
                  priority risk domains, and an IC-oriented readout on AI risk and value-creation
                  implications.
                </p>
                <div className="mt-7 grid gap-3 text-sm text-gray-300">
                  {[
                    "Evidence request list",
                    "Management interview guide",
                    "AI risk heatmap",
                    "Value-creation pressure test",
                    "Deal-team readout",
                  ].map((output) => (
                    <div key={output} className="border-l-2 border-[#3fc1c9] pl-4">
                      {output}
                    </div>
                  ))}
                </div>
              </aside>
            </FadeIn>
          </div>

          <FadeIn delay={400}>
            <div className="h-px bg-white/10 mt-14 mb-7" />
            <div className="grid grid-cols-2 md:grid-cols-4">
              {[
                { label: "Questions", value: "12 across six domains" },
                { label: "Audience", value: "PE deal teams and operating partners" },
                { label: "Output", value: "Score band and weakest domains" },
                { label: "Purpose", value: "Triage before IC" },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className={`py-4 pr-5 ${
                    i % 2 === 1 ? "pl-5 border-l border-white/10" : ""
                  } ${
                    i > 0 ? "md:pl-5 md:border-l md:border-white/10" : ""
                  }`}
                >
                  <div className="text-[11px] uppercase tracking-widest text-gray-400 mb-1.5">
                    {item.label}
                  </div>
                  <div className="text-[15px] font-medium">{item.value}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6 md:px-8 bg-[#f8f9fb]">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-[#2ba5ad] font-semibold tracking-wider uppercase text-sm mb-5 flex items-center gap-3">
              <span className="w-5 h-px bg-[#2ba5ad] inline-block" />
              The Premise
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16">
            <FadeIn delay={100}>
              <p className="text-2xl md:text-3xl lg:text-4xl leading-snug font-serif text-[#364f6b]">
                Use the screen when a target markets AI capability, uses AI in sensitive workflows,
                depends on model vendors, or includes AI upside in the value-creation case.
              </p>
            </FadeIn>

            <div className="flex flex-col gap-7">
              {premisePoints.map((point, index) => (
                <FadeIn key={point.num} delay={150 + index * 80}>
                  <div className="grid grid-cols-[28px_1fr] gap-4">
                    <span className="font-mono text-xs text-[#2ba5ad] pt-1">
                      {point.num}
                    </span>
                    <p className="text-gray-600 leading-relaxed">
                      <strong className="text-[#364f6b] font-semibold">
                        {point.title}
                      </strong>{" "}
                      {point.body}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="domains" className="py-20 md:py-28 px-6 md:px-8 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-end mb-14">
            <FadeIn>
              <div>
                <p className="text-[#2ba5ad] font-semibold tracking-wider uppercase text-sm mb-5 flex items-center gap-3">
                  <span className="w-5 h-px bg-[#2ba5ad] inline-block" />
                  What We Evaluate
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-[#364f6b] leading-tight">
                  Six domains. Twelve questions. One IC-oriented triage signal.
                </h2>
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <p className="text-lg text-gray-600 leading-relaxed">
                We publish the domains and the signal we look for. The detailed evidence requests,
                interview guide, and diligence workplan stay inside the advisory workstream.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={150}>
            <div className="grid md:grid-cols-2 border-t border-l border-gray-200">
              {domainOrder.map((domainId) => {
                const domain = domains[domainId];

                return (
                  <article
                    key={domainId}
                    className="border-r border-b border-gray-200 p-7 md:p-9 bg-white hover:bg-[#f8f9fb] transition-colors"
                  >
                    <div className="flex justify-between items-baseline mb-3.5 gap-4">
                      <span className="font-mono text-xs text-[#2ba5ad] tracking-wide">
                        {domain.number}
                      </span>
                    </div>
                    <div className="text-lg font-semibold text-[#364f6b] tracking-tight mb-2">
                      {domain.label}
                    </div>
                    <p className="text-[15px] text-gray-500 leading-relaxed mb-4">
                      {domain.blurb}
                    </p>
                    <div className="border-l-2 border-[#3fc1c9] pl-4 mt-4">
                      <span className="block text-[10.5px] uppercase tracking-widest text-gray-400 mb-1">
                        Key diligence question
                      </span>
                      <p className="text-[13.5px] italic text-[#4a6785] leading-relaxed">
                        {domain.tell}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </section>

      <DiagnosticTool />

      <section className="py-20 md:py-28 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-start">
            <FadeIn>
              <div>
                <p className="text-[#2ba5ad] font-semibold tracking-wider uppercase text-sm mb-5 flex items-center gap-3">
                  <span className="w-5 h-px bg-[#2ba5ad] inline-block" />
                  How It Is Used
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-[#364f6b] leading-tight mb-6">
                  Three ways to deploy it.
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  The public screen is a directional triage. The paid work packages the evidence
                  review, management challenge, AI risk heatmap, value-creation pressure test, and
                  deal-team readout behind the score.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <div className="flex flex-col gap-6">
                {engagementModes.map((mode, index) => (
                  <div
                    key={mode.label}
                    className="grid grid-cols-[32px_1fr] gap-5 pb-6 border-b border-gray-200 last:border-b-0"
                  >
                    <span className="font-serif text-3xl text-[#2ba5ad] leading-none">
                      {["i.", "ii.", "iii."][index]}
                    </span>
                    <div>
                      <h4 className="font-semibold text-[#364f6b] mb-1">
                        {mode.label}{" "}
                        <span className="ml-2 text-[11px] uppercase tracking-widest text-[#2ba5ad] font-medium">
                          {mode.duration}
                        </span>
                      </h4>
                      <p className="text-[15px] text-gray-600 leading-relaxed mt-1.5">
                        {mode.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section id="talk" className="py-20 md:py-28 px-6 md:px-8 bg-gradient-to-br from-[#1d2d44] to-[#364f6b] text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 md:gap-24 items-center">
            <FadeIn>
              <div>
                <p className="text-[#3fc1c9] font-semibold tracking-wider uppercase text-sm mb-5 flex items-center gap-3">
                  <span className="w-5 h-px bg-[#3fc1c9] inline-block" />
                  Get In Touch
                </p>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-5">
                  Book an AI diligence triage.
                </h2>
                <p className="text-gray-300 leading-relaxed max-w-[50ch]">
                  Bring a live target, data room evidence, and the open questions your deal team
                  cannot yet defend. Leap will help decide whether AI risk, AI claims, or AI value
                  creation deserve a focused workstream before close.
                </p>
                <button
                  type="button"
                  onClick={() => setLeadModalOpen(true)}
                  className="inline-flex items-center gap-2.5 bg-[#3fc1c9] text-[#0c1a2b] px-6 py-3.5 rounded-full font-medium hover:bg-[#5cd1d8] transition-colors mt-7"
                >
                  Book an AI diligence triage <ArrowRightIcon />
                </button>
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="bg-white/[0.04] border border-white/10 rounded-lg p-8">
                <h4 className="text-[13px] uppercase tracking-widest text-gray-400 font-medium mb-5">
                  Engagement signals
                </h4>
                <div className="flex flex-col gap-5">
                  {[
                    "Material AI diligence gaps identified",
                    "Further diligence required before investment committee",
                    "AI value creation case needs further diligence",
                  ].map((signal) => (
                    <div key={signal} className="border-l-2 border-[#3fc1c9] pl-4 text-sm leading-6 text-gray-300">
                      {signal}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <SiteFooter disclaimer="Directional tool only. Not legal, investment, insurance, tax, or valuation advice." />

      <LeadCaptureModal
        isOpen={leadModalOpen}
        intent="ai-dd-triage"
        onClose={() => setLeadModalOpen(false)}
      />
    </div>
  );
}

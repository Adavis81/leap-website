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

function HumanoidAvatar({ name }: { name: string }) {
  const avatars: Record<string, React.ReactNode> = {
    ARIA: (
      <svg viewBox="0 0 120 120" fill="none" aria-hidden="true" className="w-full h-full">
        <circle cx="60" cy="60" r="58" fill="#364f6b" />
        <circle cx="60" cy="60" r="58" fill="url(#aria-bg)" />
        <defs><radialGradient id="aria-bg" cx="40%" cy="30%"><stop offset="0%" stopColor="#3fc1c9" stopOpacity="0.25" /><stop offset="100%" stopColor="transparent" /></radialGradient></defs>
        {/* Hair - long flowing */}
        <path d="M28 52c0-20 14-34 32-34s32 14 32 34c0 4-1 8-2 11l4 30c0 3-2 5-4 5h-8c1-8 2-16 1-24-6 4-14 6-23 6s-17-2-23-6c-1 8 0 16 1 24h-8c-2 0-4-2-4-5l4-30c-1-3-2-7-2-11z" fill="#2c1810" />
        <path d="M30 52c-1 6 0 12 2 17l-3 12c8 6 18 9 31 9s23-3 31-9l-3-12c2-5 3-11 2-17" fill="#2c1810" />
        {/* Face */}
        <ellipse cx="60" cy="62" rx="26" ry="30" fill="#e8b89d" />
        {/* Eyes */}
        <ellipse cx="49" cy="58" rx="4" ry="3.5" fill="white" />
        <ellipse cx="71" cy="58" rx="4" ry="3.5" fill="white" />
        <circle cx="50" cy="58" r="2.2" fill="#364f6b" />
        <circle cx="72" cy="58" r="2.2" fill="#364f6b" />
        <circle cx="50.8" cy="57.2" r="0.8" fill="white" />
        <circle cx="72.8" cy="57.2" r="0.8" fill="white" />
        {/* Eyelashes */}
        <path d="M44 55.5c1.5-1.5 3.5-2 5.5-2M54 55.5c-1.5-1.5-3.5-2-5.5-2" stroke="#2c1810" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M66 55.5c1.5-1.5 3.5-2 5.5-2M76 55.5c-1.5-1.5-3.5-2-5.5-2" stroke="#2c1810" strokeWidth="1.2" strokeLinecap="round" />
        {/* Eyebrows */}
        <path d="M44 52c3-2.5 8-2.5 11 0" stroke="#2c1810" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M65 52c3-2.5 8-2.5 11 0" stroke="#2c1810" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* Nose */}
        <path d="M58 63c1 3 2 4 4 3" stroke="#d4a088" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        {/* Smile */}
        <path d="M50 72c5 5 15 5 20 0" stroke="#c4756a" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Blush */}
        <circle cx="43" cy="68" r="4" fill="#e8a0a0" fillOpacity="0.3" />
        <circle cx="77" cy="68" r="4" fill="#e8a0a0" fillOpacity="0.3" />
      </svg>
    ),
    OTTO: (
      <svg viewBox="0 0 120 120" fill="none" aria-hidden="true" className="w-full h-full">
        <circle cx="60" cy="60" r="58" fill="#2f455e" />
        <circle cx="60" cy="60" r="58" fill="url(#otto-bg)" />
        <defs><radialGradient id="otto-bg" cx="35%" cy="25%"><stop offset="0%" stopColor="#7fd7dc" stopOpacity="0.2" /><stop offset="100%" stopColor="transparent" /></radialGradient></defs>
        {/* Hair - short neat */}
        <path d="M34 48c0-18 12-30 26-30s26 12 26 30c0 2-0.5 4-1 6h-50c-0.5-2-1-4-1-6z" fill="#4a3728" />
        {/* Face - slightly squarer */}
        <path d="M34 60c0-16 12-28 26-28s26 12 26 28c0 18-10 32-26 32s-26-14-26-32z" fill="#c68e6a" />
        {/* Glasses */}
        <rect x="38" y="52" width="18" height="14" rx="5" stroke="#364f6b" strokeWidth="2.5" fill="white" fillOpacity="0.15" />
        <rect x="64" y="52" width="18" height="14" rx="5" stroke="#364f6b" strokeWidth="2.5" fill="white" fillOpacity="0.15" />
        <path d="M56 58h8" stroke="#364f6b" strokeWidth="2.5" />
        <path d="M38 58h-4M82 58h4" stroke="#364f6b" strokeWidth="2" />
        {/* Eyes behind glasses */}
        <circle cx="47" cy="59" r="2.5" fill="#364f6b" />
        <circle cx="73" cy="59" r="2.5" fill="#364f6b" />
        <circle cx="47.8" cy="58.2" r="0.8" fill="white" />
        <circle cx="73.8" cy="58.2" r="0.8" fill="white" />
        {/* Eyebrows - thicker */}
        <path d="M40 50c4-3 10-3 14 0" stroke="#4a3728" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M66 50c4-3 10-3 14 0" stroke="#4a3728" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Nose */}
        <path d="M58 65c1 3 3 4 5 3" stroke="#b07d5e" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        {/* Short beard/stubble */}
        <path d="M42 76c0 8 8 14 18 14s18-6 18-14" stroke="#4a3728" strokeWidth="1" strokeLinecap="round" fill="#4a3728" fillOpacity="0.15" />
        {/* Smile */}
        <path d="M50 76c5 3 15 3 20 0" stroke="#a0604e" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    ),
    CLEO: (
      <svg viewBox="0 0 120 120" fill="none" aria-hidden="true" className="w-full h-full">
        <circle cx="60" cy="60" r="58" fill="#3a4b62" />
        <circle cx="60" cy="60" r="58" fill="url(#cleo-bg)" />
        <defs><radialGradient id="cleo-bg" cx="45%" cy="30%"><stop offset="0%" stopColor="#57c8cf" stopOpacity="0.22" /><stop offset="100%" stopColor="transparent" /></radialGradient></defs>
        {/* Hair - bob cut */}
        <path d="M30 55c0-20 14-36 30-36s30 16 30 36c0 6-2 12-4 17h-6c0-3 1-6 1-9 0-14-9-24-21-24s-21 10-21 24c0 3 1 6 1 9h-6c-2-5-4-11-4-17z" fill="#1a0a00" />
        <path d="M30 55c0 8 2 15 5 20v18c-4-4-7-10-7-18l2-20z" fill="#1a0a00" />
        <path d="M90 55c0 8-2 15-5 20v18c4-4 7-10 7-18l-2-20z" fill="#1a0a00" />
        {/* Face */}
        <ellipse cx="60" cy="63" rx="25" ry="29" fill="#f0c8a8" />
        {/* Eyes - larger, expressive */}
        <ellipse cx="48" cy="59" rx="4.5" ry="4" fill="white" />
        <ellipse cx="72" cy="59" rx="4.5" ry="4" fill="white" />
        <circle cx="49" cy="59" r="2.5" fill="#4a6741" />
        <circle cx="73" cy="59" r="2.5" fill="#4a6741" />
        <circle cx="49.8" cy="58" r="1" fill="white" />
        <circle cx="73.8" cy="58" r="1" fill="white" />
        {/* Eyeliner */}
        <path d="M43 57c2-2 5-3 8-2M53 57c-1-1-2-2-4-2" stroke="#1a0a00" strokeWidth="1" strokeLinecap="round" />
        <path d="M67 57c2-2 5-3 8-2M77 57c-1-1-2-2-4-2" stroke="#1a0a00" strokeWidth="1" strokeLinecap="round" />
        {/* Eyebrows */}
        <path d="M43 53c3-2 8-2 11 0" stroke="#1a0a00" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M66 53c3-2 8-2 11 0" stroke="#1a0a00" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        {/* Nose */}
        <path d="M58 64c1 3 2 4 4 3" stroke="#dbb094" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        {/* Lipstick smile */}
        <path d="M50 72c5 5 15 5 20 0" stroke="#c45a5a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M52 72c4 3 12 3 16 0" fill="#c45a5a" fillOpacity="0.3" />
        {/* Earrings */}
        <circle cx="34" cy="68" r="3" fill="#3fc1c9" fillOpacity="0.7" />
        <circle cx="86" cy="68" r="3" fill="#3fc1c9" fillOpacity="0.7" />
      </svg>
    ),
    SAGE: (
      <svg viewBox="0 0 120 120" fill="none" aria-hidden="true" className="w-full h-full">
        <circle cx="60" cy="60" r="58" fill="#2d4258" />
        <circle cx="60" cy="60" r="58" fill="url(#sage-bg)" />
        <defs><radialGradient id="sage-bg" cx="40%" cy="28%"><stop offset="0%" stopColor="#93e1e5" stopOpacity="0.2" /><stop offset="100%" stopColor="transparent" /></radialGradient></defs>
        {/* Hair - short curly textured */}
        <path d="M34 50c0-16 12-30 26-30s26 14 26 30c0 3-1 6-2 9h-48c-1-3-2-6-2-9z" fill="#2c2c2c" />
        <circle cx="38" cy="38" r="5" fill="#2c2c2c" />
        <circle cx="48" cy="28" r="6" fill="#2c2c2c" />
        <circle cx="60" cy="24" r="7" fill="#2c2c2c" />
        <circle cx="72" cy="28" r="6" fill="#2c2c2c" />
        <circle cx="82" cy="38" r="5" fill="#2c2c2c" />
        <circle cx="43" cy="32" r="4" fill="#2c2c2c" />
        <circle cx="77" cy="32" r="4" fill="#2c2c2c" />
        {/* Face */}
        <ellipse cx="60" cy="63" rx="25" ry="30" fill="#8d5e3c" />
        {/* Eyes - wise, slightly narrower */}
        <ellipse cx="48" cy="58" rx="4" ry="3" fill="white" />
        <ellipse cx="72" cy="58" rx="4" ry="3" fill="white" />
        <circle cx="49" cy="58" r="2.2" fill="#3d2b1f" />
        <circle cx="73" cy="58" r="2.2" fill="#3d2b1f" />
        <circle cx="49.7" cy="57.3" r="0.8" fill="white" />
        <circle cx="73.7" cy="57.3" r="0.8" fill="white" />
        {/* Eyebrows - thoughtful */}
        <path d="M43 52c3-3 9-3 12-1" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M65 51c3-2 9-2 12 1" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Nose */}
        <path d="M57 64c1 4 3 5 6 4" stroke="#7a5030" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        {/* Goatee */}
        <path d="M54 78c3 4 9 4 12 0" fill="#2c2c2c" fillOpacity="0.5" />
        {/* Gentle smile */}
        <path d="M50 74c5 4 15 4 20 0" stroke="#6b4030" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    ),
    REX: (
      <svg viewBox="0 0 120 120" fill="none" aria-hidden="true" className="w-full h-full">
        <circle cx="60" cy="60" r="58" fill="#40556f" />
        <circle cx="60" cy="60" r="58" fill="url(#rex-bg)" />
        <defs><radialGradient id="rex-bg" cx="38%" cy="25%"><stop offset="0%" stopColor="#49c4cb" stopOpacity="0.2" /><stop offset="100%" stopColor="transparent" /></radialGradient></defs>
        {/* Hair - crew cut / buzz */}
        <path d="M34 52c0-17 12-30 26-30s26 13 26 30c0 2-0.5 4-1 6h-50c-0.5-2-1-4-1-6z" fill="#8b6914" />
        {/* Face - strong jaw */}
        <path d="M34 58c0-14 12-26 26-26s26 12 26 26c0 10-4 20-10 26-4 4-10 6-16 6s-12-2-16-6c-6-6-10-16-10-26z" fill="#dba882" />
        {/* Eyes - determined */}
        <ellipse cx="48" cy="58" rx="4" ry="3" fill="white" />
        <ellipse cx="72" cy="58" rx="4" ry="3" fill="white" />
        <circle cx="49" cy="58" r="2.5" fill="#2a5a8a" />
        <circle cx="73" cy="58" r="2.5" fill="#2a5a8a" />
        <circle cx="49.7" cy="57.2" r="0.9" fill="white" />
        <circle cx="73.7" cy="57.2" r="0.9" fill="white" />
        {/* Eyebrows - strong */}
        <path d="M42 51c4-3 10-3 14 0" stroke="#8b6914" strokeWidth="2.8" strokeLinecap="round" fill="none" />
        <path d="M64 51c4-3 10-3 14 0" stroke="#8b6914" strokeWidth="2.8" strokeLinecap="round" fill="none" />
        {/* Nose */}
        <path d="M57 64c1 4 3 5 6 3" stroke="#c89570" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* Confident smile */}
        <path d="M48 74c6 4 18 4 24 0" stroke="#a06050" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Chin dimple */}
        <path d="M58 84c2 1 4 1 4 0" stroke="#c89570" strokeWidth="1" strokeLinecap="round" fill="none" />
      </svg>
    ),
  };

  return (
    <div className="relative w-20 h-20 rounded-full overflow-hidden border border-white/10 shadow-sm">
      {avatars[name] || avatars.ARIA}
    </div>
  );
}

const humanTeam = [
  {
    name: "Adam Davis",
    role: "Co-founder",
    initials: "AD",
    imageSrc: "/images/adam-davis.png",
    memojiSrc: "/images/Adam.jpeg",
    imageAlt: "Adam Davis",
    bio:
      "With over 20 years of experience working with asset managers, hedge funds, private equity firms, fund administrators, insurers, and global banks, I lead end-to-end transformations spanning strategy, operating model design, and implementation. My work focuses on modern data platforms, investment data architecture, and AI strategy, implementation, and governance, helping firms unlock value from data while maintaining the controls required in highly regulated environments.",
    quote:
      "We founded Leap to give financial services leaders a better consulting experience: senior, hands-on experts who work iteratively, stay focused on value, and deliver measurable outcomes.",
    linkedinUrl: "https://www.linkedin.com/in/adam-davis9/",
  },
  {
    name: "Hortense Viard",
    role: "Co-founder",
    initials: "HV",
    imageSrc: "/images/hortense-viard.png",
    memojiSrc: "/images/hortense.jpeg",
    imageAlt: "Hortense Viard",
    linkedinUrl: "https://www.linkedin.com/in/hortenseviard/",
    bio:
      "With over 20 years of experience in Financial Services, I work with global banks, insurers, and private equity firms across Europe and the US. I specialize in financial and enterprise risk management, regulatory transformation, and bridging the gap between business and technology. Recent areas of focus include helping organizations manage emerging risks such as ESG and climate change, as well as understanding the impact of AI and Generative AI on risk management frameworks.",
  },
];

const aiAgents = [
  {
    name: "ARIA",
    specialty: "Research & Intelligence",
    bio: "Monitors regulatory developments, market trends, and sector news across financial services. Keeps Leap's work current and commercially aware.",
    imageSrc: "/images/Aria-avatar.png",
  },
  {
    name: "OTTO",
    specialty: "Data Engineering",
    bio: "Builds and structures data pipelines and automates repetitive data tasks. Delivers in hours what would take a junior analyst days.",
    imageSrc: "/images/Otto-avatar.png",
  },
  {
    name: "CLEO",
    specialty: "Document & Deliverable Production",
    bio: "Drafts reports, proposals, and presentations to Leap's standards. Every output reviewed and refined by a human principal before delivery.",
    imageSrc: "/images/Cleo-avatar.png",
  },
  {
    name: "SAGE",
    specialty: "Risk & Compliance Monitoring",
    bio: "Reviews outputs for regulatory alignment and flags anything requiring human judgement. Particularly focused on GenAI and data governance.",
    imageSrc: "/images/Sage-avatar.png",
  },
  {
    name: "REX",
    specialty: "Project Operations",
    bio: "Manages timelines, tracks project status, and keeps delivery on track. The operational backbone of every engagement.",
    imageSrc: "/images/Rex-avatar.png",
  },
];

const extendedTeam = [
  { name: "Change Management Expert", imageSrc: "/images/Senior Pracitioner.png" },
  { name: "Data & AI Solution Architect", imageSrc: "/images/Senior Practitioner 2.png" },
  { name: "AI Engineer", imageSrc: "/images/Sub sector Specialist.png" },
  { name: "Agentic Process Manager", imageSrc: "/images/QA and Control Lead.png" },
  { name: "QA & Control Lead", imageSrc: "/images/AI and Tech Lead.png" },
  { name: "Data Scientist", imageSrc: "/images/Delivery Lead.png" },
];

const leapPrinciples = [
  {
    title: "Financial Services Data Expertise",
    description: "Operating models, governance, and data platforms across asset management, banking, insurance, and private markets.",
  },
  {
    title: "Senior-by-Default Delivery",
    description: "No leverage pyramid. Your work is led and executed by experienced practitioners with 15+ years of experience.",
  },
  {
    title: "Strategy-to-Production",
    description: "We do not stop at decks. We design, build, and implement data platforms, controls, and AI solutions.",
  },
  {
    title: "Risk-Ready AI",
    description: "Practical AI governance, model risk alignment, and controls for generative and agentic AI.",
  },
  {
    title: "Focused Accountability",
    description: "Clear ownership, direct client access, and delivery managed by the people responsible for the outcome.",
  },
  {
    title: "Agent-Augmented Delivery",
    description: "Our AI agents handle research, drafting, and data work at speed so our human principals focus entirely on strategy, judgement, and client outcomes. Senior expertise at every stage, without the traditional cost base.",
  },
];

const workModel = [
  {
    title: "Strategy & Scoping",
    description:
      "We start by understanding your challenge, defining outcomes, and shaping the right approach together. This is where deep industry experience and judgment are irreplaceable.",
  },
  {
    title: "Accelerated Delivery",
    description:
      "Our senior consultants lead every workstream, supported by AI tools that accelerate research, drafting, and analysis, delivering in weeks what traditionally takes months.",
  },
  {
    title: "Quality & Accountability",
    description:
      "Every deliverable is shaped, reviewed, and approved by experienced practitioners. You get senior accountability at every stage, not just a final check.",
  },
];

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/mjgyevdy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) setSubmitted(true);
    } catch (error) {
      console.error("Form submission error:", error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
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
            <a
              href="#services"
              className={`font-medium transition-colors ${
                scrolled ? "text-[#364f6b] hover:text-[#3fc1c9]" : "text-white/90 hover:text-white"
              }`}
            >
              Services
            </a>
            <a
              href="#about"
              className={`font-medium transition-colors ${
                scrolled ? "text-[#364f6b] hover:text-[#3fc1c9]" : "text-white/90 hover:text-white"
              }`}
            >
              About
            </a>
            <a
              href="#how-we-work"
              className={`font-medium transition-colors ${
                scrolled ? "text-[#364f6b] hover:text-[#3fc1c9]" : "text-white/90 hover:text-white"
              }`}
            >
              How We Work
            </a>
            <a
              href="#why-leap"
              className={`font-medium transition-colors ${
                scrolled ? "text-[#364f6b] hover:text-[#3fc1c9]" : "text-white/90 hover:text-white"
              }`}
            >
              Why Leap
            </a>
            <Link
              href="/partners-clients"
              className={`font-medium transition-colors ${
                scrolled ? "text-[#364f6b] hover:text-[#3fc1c9]" : "text-white/90 hover:text-white"
              }`}
            >
              Partners &amp; Clients
            </Link>
            <a
              href="#contact"
              className="bg-[#3fc1c9] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#2ba5ad] transition-all hover:shadow-lg"
            >
              Get in Touch
            </a>
          </div>
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className={`w-6 h-6 ${scrolled ? "text-[#364f6b]" : "text-white"}`}
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
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg mt-2 mx-4 rounded-xl p-6">
            <div className="flex flex-col gap-4">
              <a href="#services" className="text-[#364f6b] font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                Services
              </a>
              <a href="#about" className="text-[#364f6b] font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                About
              </a>
              <a
                href="#how-we-work"
                className="text-[#364f6b] font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                How We Work
              </a>
              <a href="#why-leap" className="text-[#364f6b] font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                Why Leap
              </a>
              <Link
                href="/partners-clients"
                className="text-[#364f6b] font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Partners &amp; Clients
              </Link>
              <a
                href="#contact"
                className="bg-[#3fc1c9] text-white px-6 py-3 rounded-full font-medium text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get in Touch
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Full Screen */}
      <section className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-[#364f6b] via-[#3d5a7a] to-[#2c3e50]">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3fc1c9]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#3fc1c9]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="max-w-7xl mx-auto px-8 py-32 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              <FadeIn>
                <p className="text-[#3fc1c9] font-semibold tracking-wider uppercase mb-4">
                  Data & AI Consulting
                </p>
              </FadeIn>
              <FadeIn delay={100}>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8">
                  <span className="block">Data & AI</span>
                  <span className="block">that actually ships</span>
                  <span className="block text-[#3fc1c9]">in Financial Services</span>
                </h1>
              </FadeIn>
              <FadeIn delay={200}>
                <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl">
                  Senior practitioners who design and deliver strategy-to-production data platforms, AI use cases, and governance, across asset management, banking, insurance, and private markets.
                </p>
              </FadeIn>
              <FadeIn delay={300}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a
                    href="#contact"
                    className="bg-[#3fc1c9] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#2ba5ad] transition-all hover:shadow-xl hover:scale-105"
                  >
                    Start a Conversation
                  </a>
                  <a
                    href="#services"
                    className="border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all"
                  >
                    Explore Services
                  </a>
                </div>
              </FadeIn>
            </div>
            <div className="flex-shrink-0 hidden lg:block">
              <FadeIn delay={400}>
                <Image
                  src="/images/logo-white.svg"
                  alt="Leap"
                  width={350}
                  height={350}
                  className="w-auto h-[350px] opacity-90"
                />
              </FadeIn>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-8 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-20">
              <p className="text-[#3fc1c9] font-semibold tracking-wider uppercase mb-4">What We Do</p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#364f6b] mb-6">Our Services</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                End-to-end data and AI capabilities tailored exclusively for financial services
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                ),
                title: "Data Strategy",
                description: "Align your data vision, operating model, and governance to a clear roadmap, focused on measurable business outcomes and regulatory needs.",
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                ),
                title: "AI Strategy",
                description: "Identify and prioritize AI use cases, then build a pragmatic roadmap grounded in feasibility, controls, and measurable value, including recommendations on the right technical solutions (i.e. - Claude, ChatGPT, Gemini, Copilot, etc.)",
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                ),
                title: "AI Implementation",
                description: "Turn AI strategy into production-ready solutions, from proof of concept through deployment, integration, and ongoing optimization within your existing infrastructure.",
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                ),
                title: "Data Engineering",
                description: "Design and build modern data platforms and pipelines, integrating best-fit tools to scale securely and reliably with your business.",
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                ),
                title: "Risk & Compliance",
                description: "Strengthen data and AI risk management with governance, controls, and regulatory-ready documentation, covering GenAI and emerging AI risks.",
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                ),
                title: "Operating Model & Change",
                description: "Define the roles, processes, and ways of working to run data and AI sustainably, then drive adoption through structured change.",
              },
            ].map((service, index) => (
              <FadeIn key={service.title} delay={index * 100}>
                <div className="group bg-white p-10 rounded-2xl border border-gray-100 hover:border-[#3fc1c9]/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#3fc1c9]/20 to-[#3fc1c9]/5 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-[#3fc1c9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {service.icon}
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[#364f6b] mb-4 group-hover:text-[#3fc1c9] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Full Width */}
      <section id="about" className="pt-32 pb-4 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="mb-16">
              <div className="text-center mb-10">
                <p className="text-[#3fc1c9] font-semibold tracking-wider uppercase mb-4">About Leap</p>
                <h2 className="text-4xl md:text-5xl font-bold text-[#364f6b] mb-6 leading-tight">
                  Boutique Expertise. Enterprise Impact.
                </h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                  Leap Transformation Services is a boutique consulting firm dedicated exclusively to
                  helping financial services organizations unlock the full potential of their data and
                  AI investments. We combine deep industry expertise with hands-on technical experience to deliver
                  solutions that work in the real world, not just in presentations.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                  <div className="text-5xl font-bold text-[#3fc1c9] mb-2">100%</div>
                  <div className="text-gray-600 font-medium">Financial Services Focus</div>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                  <div className="text-5xl font-bold text-[#3fc1c9] mb-2">E2E</div>
                  <div className="text-gray-600 font-medium">Strategy to Production</div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={120}>
            <div className="grid xl:grid-cols-2 gap-8 mb-8">
              {humanTeam.map((member) => (
                <div key={member.name} className="bg-white border border-gray-100 rounded-3xl p-10 shadow-sm h-full">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
                    <Image
                      src={member.imageSrc}
                      alt={member.imageAlt}
                      width={120}
                      height={120}
                      className="rounded-full object-cover w-[120px] h-[120px] flex-shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="text-2xl font-bold text-[#364f6b]">{member.name}</div>
                        {member.linkedinUrl && (
                          <a
                            href={member.linkedinUrl}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${member.name} on LinkedIn`}
                            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0077b5]/10 hover:bg-[#0077b5]/20 transition-colors"
                          >
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="text-[#0077b5]"
                              aria-hidden="true"
                            >
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.266 2.37 4.266 5.455v6.288zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM6.814 20.452H3.861V9h2.953v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                          </a>
                        )}
                      </div>
                      <div className="text-[#3fc1c9] font-medium">{member.role}</div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={160}>
            <div className="relative mb-6">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#3fc1c9]/20 to-[#364f6b]/20 rounded-3xl blur-2xl" />
              <div className="relative bg-gradient-to-br from-[#364f6b] to-[#2c3e50] rounded-3xl p-10 md:p-12 text-white">
                <blockquote className="text-xl md:text-2xl font-light leading-relaxed italic text-center">
                  &ldquo;{humanTeam[0].quote}&rdquo;
                </blockquote>
                <div className="flex items-center justify-center gap-3 mt-6">
                  <span className="text-gray-300 text-sm">&mdash; {humanTeam[0].name} &amp; {humanTeam[1].name}, Co-founders</span>
                </div>
              </div>
            </div>
          </FadeIn>

          <div className="border-t border-[#364f6b]/10 mt-8"></div>

        </div>
      </section>

      {/* How We Work */}
      <section id="how-we-work" className="pt-24 pb-28 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-[#3fc1c9] font-semibold tracking-wider uppercase mb-4">How We Work and Use AI</p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#364f6b] mb-6">Senior-led. AI-enhanced. Human-verified.</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                We use purpose-built AI tools to accelerate delivery, not replace expertise. Every output is led by a senior practitioner and reviewed before it reaches you.
              </p>
            </div>
          </FadeIn>

          {/* Our Team */}
          <FadeIn delay={100}>
            <div className="mb-16">
              {/* Project Leads - co-founders on own row */}
              <div className="flex justify-center gap-16 mb-8">
                {humanTeam.map((member, index) => (
                  <div key={member.name} className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-3 border-[#364f6b]/20 shadow-lg mb-3">
                      <Image
                        src={member.memojiSrc || member.imageSrc}
                        alt={member.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="font-semibold text-[#364f6b] text-sm text-center max-w-[160px] leading-tight">{index === 0 ? "Data & AI Expert" : "Business, Risk & Compliance Expert"}</div>
                  </div>
                ))}
              </div>

              {/* Extended team row */}
              <div className="flex flex-wrap justify-center gap-10 mb-10">
                {extendedTeam.map((member, index) => (
                  <div key={`${member.name}-${index}`} className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-3 border-[#364f6b]/20 shadow-lg mb-3">
                      <Image
                        src={member.imageSrc}
                        alt={member.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="font-semibold text-[#364f6b] text-sm text-center max-w-[120px] leading-tight">{member.name}</div>
                  </div>
                ))}
              </div>

              {/* "supported by" divider */}
              <div className="flex items-center gap-4 max-w-md mx-auto mb-10">
                <div className="flex-1 h-px bg-[#364f6b]/15"></div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#364f6b]/40">supported by AI Agents</span>
                <div className="flex-1 h-px bg-[#364f6b]/15"></div>
              </div>

              {/* AI agents - medium row */}
              <div className="flex flex-wrap justify-center gap-6">
                {aiAgents.map((agent, index) => (
                  <FadeIn key={agent.name} delay={index * 70}>
                    <div className="group relative flex flex-col items-center">
                      <div className="w-18 h-18 rounded-full overflow-hidden border-2 border-[#364f6b]/10 shadow-sm mb-2 group-hover:border-[#3fc1c9]/50 group-hover:shadow-md transition-all duration-300" style={{ width: '4.5rem', height: '4.5rem' }}>
                        <Image
                          src={agent.imageSrc}
                          alt={agent.name}
                          width={72}
                          height={72}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="font-bold text-[#364f6b] text-xs">{agent.name}</div>
                      <div className="text-[#3fc1c9] text-[10px] font-medium leading-tight text-center max-w-[110px]">{agent.specialty}</div>
                      {/* Hover tooltip */}
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 rounded-2xl bg-[#364f6b] text-white p-4 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
                        <div className="text-xs leading-relaxed">{agent.bio}</div>
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#364f6b] rotate-45"></div>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Work model cards */}
          <FadeIn delay={150}>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto text-center mb-10">
              Our process, a model built for financial services.
            </p>
          </FadeIn>
          <div className="grid lg:grid-cols-3 gap-8 mb-10">
            {workModel.map((item, index) => (
              <FadeIn key={item.title} delay={index * 100} className="h-full">
                <div className="h-full rounded-3xl border border-gray-100 bg-white p-10 shadow-sm">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#364f6b] to-[#2c3e50] flex items-center justify-center mb-6">
                    <span className="text-[#3fc1c9] font-bold text-lg">0{index + 1}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#364f6b] mb-4">{item.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{item.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={250}>
            <div className="rounded-2xl bg-gradient-to-br from-[#364f6b] to-[#4a6785] px-8 py-6 text-gray-200 shadow-sm italic text-lg">
              <span className="font-semibold text-white">On data privacy:</span> Leap uses enterprise-grade AI tools where client data is never used for model training. We&apos;re happy to share our AI data handling policy on request.
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Why Leap Section */}
      <section id="why-leap" className="py-32 px-8 bg-gradient-to-br from-[#364f6b] to-[#2c3e50] text-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-20">
              <p className="text-[#3fc1c9] font-semibold tracking-wider uppercase mb-4">The Leap Difference</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose Leap?</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We bring a unique combination of deep expertise and focused execution
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {leapPrinciples.map((item, index) => (
              <FadeIn key={item.title} delay={index * 100} className="h-full">
                <div className="bg-white/5 border border-white/10 rounded-3xl text-center p-8 h-full flex flex-col">
                  <div className="w-16 h-16 bg-[#3fc1c9] rounded-2xl flex items-center justify-center mx-auto mb-6 flex-shrink-0">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4 min-h-[3.5rem] flex items-center justify-center">{item.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{item.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Spotlight */}
      <section id="partners" className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
              <div className="max-w-2xl">
                <p className="text-[#3fc1c9] font-semibold tracking-wider uppercase mb-4">Partner Spotlight</p>
                <h2 className="text-3xl md:text-4xl font-bold text-[#364f6b] mb-4">Agentic Risks</h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Helping organizations adopt agentic AI workflows with clear governance and practical risk controls.
                </p>
              </div>

              <a
                href="https://agenticrisks.com/"
                target="_blank"
                rel="noreferrer"
                className="group w-full lg:w-[560px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#364f6b] to-[#2c3e50] p-10 text-white shadow-lg"
                aria-label="Visit Agentic Risks"
              >
                <div className="flex items-center justify-between gap-6">
                  <Image
                    src="/images/partners/agentic-risks.svg"
                    alt="Agentic Risks logo"
                    width={240}
                    height={64}
                    className="h-12 w-auto object-contain"
                    unoptimized
                  />
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
                </div>

                <div className="mt-8">
                  <div className="text-lg font-semibold">Agentic AI Controls Framework</div>
                  <div className="mt-2 text-white/80">
                    A pragmatic framework for safe, scalable automation with agentic systems.
                  </div>
                </div>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-8 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-[#3fc1c9] font-semibold tracking-wider uppercase mb-4">Get Started</p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#364f6b] mb-6">Let&apos;s Talk</h2>
              <p className="text-xl text-gray-600">
                Ready to transform your data and AI capabilities? We&apos;d love to hear from you.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            {submitted ? (
              <div className="bg-gradient-to-br from-[#3fc1c9]/10 to-[#364f6b]/10 p-16 rounded-3xl text-center">
                <div className="w-20 h-20 bg-[#3fc1c9] rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-[#364f6b] mb-4">Thank You!</h3>
                <p className="text-xl text-gray-600">We&apos;ve received your message and will be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-[#364f6b] mb-3 uppercase tracking-wide">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-[#3fc1c9] outline-none transition-colors text-lg"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-[#364f6b] mb-3 uppercase tracking-wide">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-[#3fc1c9] outline-none transition-colors text-lg"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="mb-8">
                  <label htmlFor="company" className="block text-sm font-semibold text-[#364f6b] mb-3 uppercase tracking-wide">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-[#3fc1c9] outline-none transition-colors text-lg"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
                <div className="mb-10">
                  <label htmlFor="message" className="block text-sm font-semibold text-[#364f6b] mb-3 uppercase tracking-wide">
                    How can we help?
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-[#3fc1c9] outline-none transition-colors text-lg resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#3fc1c9] text-white py-5 rounded-xl text-lg font-semibold hover:bg-[#2ba5ad] transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#364f6b] text-white py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <Image src="/images/logo-white.svg" alt="Leap Transformation Services" width={140} height={50} />
            <div className="flex items-center gap-8">
              <a href="#services" className="text-gray-300 hover:text-white transition-colors">Services</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#how-we-work" className="text-gray-300 hover:text-white transition-colors">How We Work</a>
              <a href="#why-leap" className="text-gray-300 hover:text-white transition-colors">Why Leap</a>
              <Link href="/partners-clients" className="text-gray-300 hover:text-white transition-colors">Partners &amp; Clients</Link>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Get in Touch</a>
            </div>
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Leap Transformation Services. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

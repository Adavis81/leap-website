"use client";

import Image from "next/image";
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
          <a href="/" className="h-14">
            <Image
              src={scrolled ? "/images/logo-color.svg" : "/images/logo-white.svg"}
              alt="Leap Transformation Services"
              width={140}
              height={50}
              className="object-contain h-full w-auto transition-opacity duration-300"
              priority
            />
          </a>
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
            <a
              href="#partners"
              className={`font-medium transition-colors ${
                scrolled ? "text-[#364f6b] hover:text-[#3fc1c9]" : "text-white/90 hover:text-white"
              }`}
            >
              Partners & Clients
            </a>
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
              <a href="#how-we-work" className="text-[#364f6b] font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                How We Work
              </a>
              <a href="#why-leap" className="text-[#364f6b] font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                Why Leap
              </a>
              <a href="#partners" className="text-[#364f6b] font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                Partners & Clients
              </a>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
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
      <section id="about" className="py-32 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <div>
                <p className="text-[#3fc1c9] font-semibold tracking-wider uppercase mb-4">About Leap</p>
                <h2 className="text-4xl md:text-5xl font-bold text-[#364f6b] mb-8 leading-tight">
                  Boutique Expertise.
                  <span className="block">Enterprise Impact.</span>
                </h2>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  Leap Transformation Services is a boutique consulting firm dedicated exclusively to
                  helping financial services organizations unlock the full potential of their data and
                  AI investments. We combine deep industry expertise with hands-on technical experience to deliver
                  solutions that work in the real world, not just in presentations.
                </p>
                <div className="grid grid-cols-2 gap-8 mb-10">
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
            <div className="space-y-8">
              <FadeIn delay={100}>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src="/images/adam-davis.png"
                      alt="Adam Davis"
                      width={80}
                      height={80}
                      className="rounded-full object-cover w-[80px] h-[80px]"
                    />
                    <div>
                      <div className="font-bold text-[#364f6b] text-lg">Adam Davis</div>
                      <div className="text-[#3fc1c9] font-medium">Co-founder</div>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    With over 20 years of experience working with asset managers, hedge funds, private equity firms, fund administrators, insurers, and global banks, I lead end-to-end transformations spanning strategy, operating model design, and implementation. My work focuses on modern data platforms, investment data architecture, and AI strategy, implementation, and governance, helping firms unlock value from data while maintaining the controls required in highly regulated environments.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={200}>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-[80px] h-[80px] rounded-full bg-gradient-to-br from-[#364f6b] to-[#3fc1c9] flex items-center justify-center">
                      <span className="text-white font-bold text-2xl">HV</span>
                    </div>
                    <div>
                      <div className="font-bold text-[#364f6b] text-lg">Hortense Viard</div>
                      <div className="text-[#3fc1c9] font-medium">Co-founder</div>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    With over 20 years of experience in Financial Services, I work with global banks, insurers, and private equity firms across Europe and the US. I specialize in financial and enterprise risk management, regulatory transformation, and bridging the gap between business and technology. Recent areas of focus include helping organizations manage emerging risks such as ESG and climate change, as well as understanding the impact of AI and Generative AI on risk management frameworks.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
          <FadeIn delay={300}>
            <div className="mt-16 relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#3fc1c9]/20 to-[#364f6b]/20 rounded-3xl blur-2xl" />
              <div className="relative bg-gradient-to-br from-[#364f6b] to-[#2c3e50] rounded-3xl p-12 text-white">
                <blockquote className="text-2xl font-light leading-relaxed mb-8 italic">
                  &ldquo;We founded Leap to give financial services leaders a better consulting experience:
                  senior, hands-on experts who work iteratively, stay focused on value, and deliver measurable outcomes.&rdquo;
                </blockquote>
                <div className="text-gray-300">
                  Adam Davis & Hortense Viard, Co-founders
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* How We Work Section */}
      <section id="how-we-work" className="py-32 px-8 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-20">
              <p className="text-[#3fc1c9] font-semibold tracking-wider uppercase mb-4">Our Approach</p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#364f6b] mb-6">
                Senior-led. AI-enhanced. Human-verified.
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We use purpose-built AI tools to accelerate delivery, not replace expertise. Every output is led by a senior practitioner and reviewed before it reaches you.
              </p>
            </div>
          </FadeIn>

          {/* Team Members */}
          <FadeIn>
            <div className="mb-20">
              <h3 className="text-2xl font-bold text-[#364f6b] text-center mb-10">Our Team</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  "Data & AI Expert",
                  "Business, Risk & Compliance Expert",
                  "Change Management Expert",
                  "Data & AI Solution Architect",
                  "AI Engineer",
                  "Agentic Process Manager",
                  "QA & Control Lead",
                  "Data Scientist",
                ].map((role, index) => (
                  <div key={role} className="bg-white p-6 rounded-2xl border border-gray-100 text-center shadow-sm">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#364f6b] to-[#3fc1c9] rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <p className="text-[#364f6b] font-medium text-sm">{role}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* AI Agents */}
          <FadeIn>
            <div className="mb-20">
              <h3 className="text-2xl font-bold text-[#364f6b] text-center mb-4">Supported by AI Agents</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                {[
                  {
                    name: "ARIA",
                    role: "Research & Intelligence",
                    description: "Monitors regulatory developments, market trends, and sector news across financial services. Keeps Leap's work current and commercially aware.",
                  },
                  {
                    name: "OTTO",
                    role: "Data Engineering",
                    description: "Builds and structures data pipelines and automates repetitive data tasks. Delivers in hours what would take a junior analyst days.",
                  },
                  {
                    name: "CLEO",
                    role: "Document & Deliverable Production",
                    description: "Drafts reports, proposals, and presentations to Leap's standards. Every output reviewed and refined by a human principal before delivery.",
                  },
                  {
                    name: "SAGE",
                    role: "Risk & Compliance Monitoring",
                    description: "Reviews outputs for regulatory alignment and flags anything requiring human judgement. Particularly focused on GenAI and data governance.",
                  },
                  {
                    name: "REX",
                    role: "Project Operations",
                    description: "Manages timelines, tracks project status, and keeps delivery on track. The operational backbone of every engagement.",
                  },
                ].map((agent, index) => (
                  <FadeIn key={agent.name} delay={index * 100}>
                    <div className="bg-gradient-to-br from-[#364f6b] to-[#2c3e50] p-8 rounded-2xl text-white h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-[#3fc1c9] rounded-xl flex items-center justify-center">
                          <span className="font-bold text-sm">{agent.name}</span>
                        </div>
                        <div>
                          <div className="font-bold">{agent.name}</div>
                          <div className="text-[#3fc1c9] text-sm">{agent.role}</div>
                        </div>
                      </div>
                      <p className="text-gray-300 leading-relaxed">{agent.description}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Process Steps */}
          <FadeIn>
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-[#364f6b] text-center mb-4">
                Our process, a model built for financial services.
              </h3>
              <div className="grid md:grid-cols-3 gap-8 mt-10">
                {[
                  {
                    step: "01",
                    title: "Strategy & Scoping",
                    description: "We start by understanding your challenge, defining outcomes, and shaping the right approach together. This is where deep industry experience and judgment are irreplaceable.",
                  },
                  {
                    step: "02",
                    title: "Accelerated Delivery",
                    description: "Our senior consultants lead every workstream, supported by AI tools that accelerate research, drafting, and analysis, delivering in weeks what traditionally takes months.",
                  },
                  {
                    step: "03",
                    title: "Quality & Accountability",
                    description: "Every deliverable is shaped, reviewed, and approved by experienced practitioners. You get senior accountability at every stage, not just a final check.",
                  },
                ].map((item) => (
                  <div key={item.step} className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="text-5xl font-bold text-[#3fc1c9] mb-4">{item.step}</div>
                    <h4 className="text-xl font-bold text-[#364f6b] mb-4">{item.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <p className="text-gray-600 italic">
                On data privacy: Leap uses enterprise-grade AI tools where client data is never used for model training. We&apos;re happy to share our AI data handling policy on request.
              </p>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
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
            ].map((item, index) => (
              <FadeIn key={item.title} delay={index * 100} className="h-full">
                <div className="text-center p-8 h-full flex flex-col">
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

      {/* Partners Section */}
      <section id="partners" className="py-32 px-8 bg-gray-50 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-[#3fc1c9] font-semibold tracking-wider uppercase mb-4">Partner Spotlight</p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#364f6b] mb-6">Partners & Clients</h2>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="max-w-2xl mx-auto">
              <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm text-center">
                <h3 className="text-2xl font-bold text-[#364f6b] mb-4">Agentic Risks</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Helping organizations adopt agentic AI workflows with clear governance and practical risk controls.
                </p>
                <p className="text-[#364f6b] font-medium mb-6">
                  Agentic AI Controls Framework
                </p>
                <p className="text-gray-600 mb-8">
                  A pragmatic framework for safe, scalable automation with agentic systems.
                </p>
                <a
                  href="https://www.agenticrisks.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#3fc1c9] text-white px-8 py-3 rounded-full font-medium hover:bg-[#2ba5ad] transition-all hover:shadow-lg"
                >
                  Visit Site
                </a>
              </div>
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
            <div className="flex flex-wrap items-center justify-center gap-8">
              <a href="#services" className="text-gray-300 hover:text-white transition-colors">Services</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#how-we-work" className="text-gray-300 hover:text-white transition-colors">How We Work</a>
              <a href="#why-leap" className="text-gray-300 hover:text-white transition-colors">Why Leap</a>
              <a href="#partners" className="text-gray-300 hover:text-white transition-colors">Partners & Clients</a>
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

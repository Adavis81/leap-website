"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

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
  children: React.ReactNode;
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

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const dimensions = [
  {
    n: "01",
    name: "Leadership Alignment",
    blurb:
      "A documented executive thesis tied to enterprise strategy, with named accountability, not a delegation to IT.",
    tell: "If we removed every AI tool tomorrow, which three business outcomes would suffer first?",
  },
  {
    n: "02",
    name: "Culture & Change Readiness",
    blurb:
      "Active permission to redesign work, not just to use tools as-is. Anchored in real workflows, not generic training.",
    tell: "When did someone last change how they worked because of AI, and was that change recognized?",
  },
  {
    n: "03",
    name: "Manager Support",
    blurb:
      "Front-line managers who can coach, not just authorize. Manager fluency drives adoption more than user training does.",
    tell: "Could your managers, today, hold a credible one-on-one about how someone should be using AI?",
  },
  {
    n: "04",
    name: "Talent & Skills",
    blurb:
      "A current view of which roles are most exposed to AI redesign over the next 18 months, with a plan tied to that view.",
    tell: "Which three roles will look most different two years from now, and what are you doing about that today?",
  },
  {
    n: "05",
    name: "Workflow Redesign",
    blurb:
      "Use cases framed around the workflow and the outcome, with the AI capability chosen second. Not tool-first.",
    tell: "Walk us through one workflow you would redesign first if AI were free and unlimited. Why that one?",
  },
  {
    n: "06",
    name: "Data & Knowledge Access",
    blurb:
      "A defensible data foundation with clear ownership and quality baselines for the domains AI actually needs.",
    tell: "If you built a high-value AI use case tomorrow, would the data exist, be accessible, and be trustworthy?",
  },
  {
    n: "07",
    name: "Governance & Risk Controls",
    blurb:
      "Right-sized governance: enough to defend, not so much that nothing ships. Tiered by risk, not blanket-applied.",
    tell: "How long does it take, end to end, for a new AI use case to get approved here? Is that the right answer?",
  },
  {
    n: "08",
    name: "AI Tool Adoption",
    blurb:
      "Selective, role-aware deployment with adoption signals tied to real workflows, not licenses purchased.",
    tell: "Of the AI licenses you have purchased, what percentage are actively used each week, and by whom?",
  },
  {
    n: "09",
    name: "Measurement & Value Tracking",
    blurb:
      "Use cases with named value owners and metrics that surface in the business reviews that actually matter.",
    tell: "Show us your most successful AI use case. Where does its value show up on a P&L or operating metric?",
  },
  {
    n: "10",
    name: "Operating Model Ownership",
    blurb:
      "A named AI operating model (who decides, who builds, who runs, who governs) accepted across business and technology.",
    tell: "Who, by name, owns the business outcome of your most important AI initiative?",
  },
];

const levels = [
  {
    n: "I",
    name: "Fragmented",
    profile:
      "AI activity exists in pockets. No firm-level thesis. Tooling, governance, and ownership are inconsistent or absent.",
    move: "Establish an executive AI thesis. Name a single accountable executive for outcomes, not delivery.",
  },
  {
    n: "II",
    name: "Experimenting",
    profile:
      "Visible pilots and a recognized intent to do more. Coordination, value tracking, and operating model are still informal.",
    move: "Move from pilots to a managed portfolio with named owners. Equip managers explicitly. Generic training does not move adoption.",
  },
  {
    n: "III",
    name: "Coordinated",
    profile:
      "A defined AI position with named ownership. Adoption is real but uneven across business units. Governance is in place.",
    move: "Workflow redesign in the lagging functions. Calibrate governance for speed: tier approvals so low-risk use cases ship fast.",
  },
  {
    n: "IV",
    name: "Scaling",
    profile:
      "AI is embedded in priority workflows, with measurable outcomes and active manager engagement. The remaining work is institutionalization.",
    move: "Bake AI expectations into hiring, performance, and promotion. Reduce key-person risk by formalizing what champions carry informally.",
  },
  {
    n: "V",
    name: "AI-ready Operating Model",
    profile:
      "AI is part of how the firm runs. Built into hiring, performance, governance, and business reviews. Not dependent on champions.",
    move: "Shift from adoption to advantage. Identify where AI-enabled work design becomes a competitive moat.",
  },
];

const deploymentModes = [
  {
    label: "Sales conversation",
    duration: "30-45 min",
    desc: "Walk a leadership team through 5-8 questions live. The conversation itself surfaces the gaps and the disagreements, which are the most useful finding.",
  },
  {
    label: "Executive workshop",
    duration: "Half-day",
    desc: "The full assessment with the leadership team in the room. Score together; the variance on scores is the alignment finding worth capturing.",
  },
  {
    label: "Engagement kickoff",
    duration: "1-2 weeks",
    desc: "The diagnostic as the baseline output of a paid readiness assessment. Includes interviews, the workshop, and the formal executive summary.",
  },
];

const deliverables = [
  {
    label: "Headline finding",
    desc: "One sentence the executive team can repeat in their next board update. Specific, defensible, and actionable.",
  },
  {
    label: "Strengths and blockers",
    desc: "The three things this organization is meaningfully ahead on, and the three places it is most exposed. Ranked by impact, with evidence.",
  },
  {
    label: "Dimension-level map",
    desc: "A 10-dimension readout showing where the firm is consistent, where it is uneven, and where the executive team disagrees with itself.",
  },
  {
    label: "30-day actions",
    desc: "Five named moves the executive team can make in the next month without a full transformation program.",
  },
  {
    label: "90-day roadmap",
    desc: "The structural moves (Align, Prioritize, Operationalize) sequenced so each phase makes the next one easier.",
  },
];

/* Sample readout bar data */
const mockBars = [
  { label: "Lead", h: 55, low: false },
  { label: "Cult", h: 50, low: false },
  { label: "Mgr", h: 28, low: true },
  { label: "Tlnt", h: 32, low: true },
  { label: "Wflw", h: 45, low: false },
  { label: "Data", h: 60, low: false },
  { label: "Gov", h: 78, low: false },
  { label: "Adopt", h: 40, low: false },
  { label: "Meas", h: 38, low: false },
  { label: "OpMdl", h: 42, low: false },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AIReadinessDiagnosticPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* ============ NAV ============ */}
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
            <Link href="/#services" className="font-medium text-[#364f6b] hover:text-[#3fc1c9] transition-colors">
              Services
            </Link>
            <Link href="/offerings" className="font-medium text-[#364f6b] hover:text-[#3fc1c9] transition-colors">
              Offerings
            </Link>
            <Link href="/#about" className="font-medium text-[#364f6b] hover:text-[#3fc1c9] transition-colors">
              About
            </Link>
            <Link href="/#how-we-work" className="font-medium text-[#364f6b] hover:text-[#3fc1c9] transition-colors">
              How We Work
            </Link>
            <Link href="/#why-leap" className="font-medium text-[#364f6b] hover:text-[#3fc1c9] transition-colors">
              Why Leap
            </Link>
            <Link href="/partners-clients" className="font-medium text-[#364f6b] hover:text-[#3fc1c9] transition-colors">
              Partners &amp; Clients
            </Link>
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
              <Link href="/#services" className="text-[#364f6b] hover:text-[#3fc1c9] transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Services</Link>
              <Link href="/offerings" className="text-[#364f6b] hover:text-[#3fc1c9] transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Offerings</Link>
              <Link href="/#about" className="text-[#364f6b] hover:text-[#3fc1c9] transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link href="/#how-we-work" className="text-[#364f6b] hover:text-[#3fc1c9] transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>How We Work</Link>
              <Link href="/#why-leap" className="text-[#364f6b] hover:text-[#3fc1c9] transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Why Leap</Link>
              <Link href="/partners-clients" className="text-[#364f6b] hover:text-[#3fc1c9] transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Partners &amp; Clients</Link>
              <Link href="/#contact" className="bg-[#3fc1c9] text-white px-6 py-3 rounded-full font-medium text-center hover:bg-[#2ba5ad] transition-all hover:shadow-lg" onClick={() => setMobileMenuOpen(false)}>Get in Touch</Link>
            </div>
          </div>
        )}
      </nav>

      {/* ============ HERO ============ */}
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
                  AI Readiness Diagnostic
                </p>
              </FadeIn>
              <FadeIn delay={100}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-7">
                  The reason AI stalls inside your firm is rarely{" "}
                  <span className="relative inline-block opacity-55">
                    tool access
                    <span className="absolute left-[-2%] right-[-2%] top-[56%] h-[0.08em] bg-current -rotate-[2deg]" />
                  </span>
                  .<br />
                  It is{" "}
                  <span className="text-[#3fc1c9]">organizational absorption</span>.
                </h1>
              </FadeIn>
              <FadeIn delay={200}>
                <p className="text-lg md:text-xl text-gray-300 max-w-[56ch] leading-relaxed mb-9">
                  A senior-led readiness assessment for asset managers, mid-market banks, insurers, and PE-backed financial firms.
                  Ten dimensions. Five maturity levels. One executive conversation that surfaces where AI is actually getting stuck,
                  and what to do about it in the next ninety days.
                </p>
              </FadeIn>
              <FadeIn delay={300}>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2.5 bg-[#3fc1c9] text-[#0c1a2b] px-6 py-3.5 rounded-full font-medium hover:bg-[#5cd1d8] transition-colors"
                  >
                    Book the diagnostic <span>→</span>
                  </Link>
                  <a
                    href="#dimensions"
                    className="inline-flex items-center gap-2.5 border border-white/20 text-white px-6 py-3.5 rounded-full font-medium hover:border-white/40 transition-colors"
                  >
                    See what we measure
                  </a>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={350}>
              <aside>
                <p className="text-xl md:text-2xl leading-relaxed italic opacity-90 font-serif">
                  &ldquo;Most firms have given everyone access to a chatbot and called it AI strategy. That is the easy half. The hard half is whether the firm can absorb what comes next.&rdquo;
                </p>
                <p className="mt-5 text-sm tracking-wide opacity-60">
                  Adam Davis &amp; Hortense Viard, Co-founders
                </p>
              </aside>
            </FadeIn>
          </div>

          <FadeIn delay={400}>
            <div className="h-px bg-white/10 mt-14 mb-7" />
            <div className="grid grid-cols-2 md:grid-cols-4">
              {[
                { label: "Format", value: "Half-day workshop" },
                { label: "Audience", value: "Executive team, in the room" },
                { label: "Output", value: "Executive readout, \u2264 3 pages" },
                { label: "Built for", value: "Mid-size FS firms" },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className={`py-4 pr-5 ${
                    i > 0 ? "pl-5 border-l border-white/10" : ""
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

      {/* ============ PREMISE ============ */}
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
                Tool access is the easy lever.{" "}
                <em className="text-[#2ba5ad]">Absorption capacity</em>, the culture, manager fluency, talent practices, workflow design, and operating model around the tools, is what separates firms whose AI investment compounds from firms where it disperses.
              </p>
            </FadeIn>

            <div className="flex flex-col gap-7">
              {[
                {
                  num: "01",
                  title: "Licenses are not adoption.",
                  body: "The firms with the highest AI license penetration are not the firms with the highest measurable AI value. We see the gap on every engagement.",
                },
                {
                  num: "02",
                  title: "Manager fluency is the throttle.",
                  body: "Front-line managers who cannot coach AI use are the constraint on adoption, not employees, not infrastructure.",
                },
                {
                  num: "03",
                  title: "Workflow redesign beats workflow acceleration.",
                  body: "Speeding up a broken process is a small win. Redesigning the work around the model is where compounding value sits.",
                },
                {
                  num: "04",
                  title: "Operating model decides the ceiling.",
                  body: "If no business leader owns the outcome of AI, no amount of platform investment closes the gap.",
                },
              ].map((pt, i) => (
                <FadeIn key={pt.num} delay={150 + i * 80}>
                  <div className="grid grid-cols-[28px_1fr] gap-4">
                    <span className="font-mono text-xs text-[#2ba5ad] pt-1">
                      {pt.num}
                    </span>
                    <p className="text-gray-600 leading-relaxed">
                      <strong className="text-[#364f6b] font-semibold">
                        {pt.title}
                      </strong>{" "}
                      {pt.body}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ DIMENSIONS ============ */}
      <section id="dimensions" className="py-20 md:py-28 px-6 md:px-8 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-end mb-14">
            <FadeIn>
              <div>
                <p className="text-[#2ba5ad] font-semibold tracking-wider uppercase text-sm mb-5 flex items-center gap-3">
                  <span className="w-5 h-px bg-[#2ba5ad] inline-block" />
                  What We Measure
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-[#364f6b] leading-tight">
                  Ten dimensions of organizational absorption.
                </h2>
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <p className="text-lg text-gray-600 leading-relaxed">
                The diagnostic is twenty questions across the ten dimensions below. We publish the dimensions, the
                signal we look for, and the executive question that surfaces it. The instrument itself (the
                full question set, rubric, and scoring math) is the proprietary part we run live with you.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={150}>
            <div className="grid md:grid-cols-2 border-t border-l border-gray-200">
              {dimensions.map((d) => (
                <article
                  key={d.n}
                  className="border-r border-b border-gray-200 p-7 md:p-9 bg-white hover:bg-[#f8f9fb] transition-colors"
                >
                  <div className="flex justify-between items-baseline mb-3.5 gap-4">
                    <span className="font-mono text-xs text-[#2ba5ad] tracking-wide">
                      {d.n}
                    </span>
                  </div>
                  <div className="text-lg font-semibold text-[#364f6b] tracking-tight mb-2">
                    {d.name}
                  </div>
                  <p className="text-[15px] text-gray-500 leading-relaxed mb-4">
                    {d.blurb}
                  </p>
                  <div className="border-l-2 border-[#3fc1c9] pl-4 mt-4">
                    <span className="block text-[10.5px] uppercase tracking-widest text-gray-400 mb-1">
                      Workshop tell
                    </span>
                    <p className="text-[13.5px] italic text-[#4a6785] leading-relaxed">
                      {d.tell}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============ MATURITY ============ */}
      <section className="py-20 md:py-28 px-6 md:px-8 bg-gradient-to-br from-[#1d2d44] to-[#364f6b] text-white">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="max-w-3xl mb-14 md:mb-20">
              <p className="text-[#3fc1c9] font-semibold tracking-wider uppercase text-sm mb-5 flex items-center gap-3">
                <span className="w-5 h-px bg-[#3fc1c9] inline-block" />
                Where Firms Land
              </p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-5">
                Five maturity levels, named for the executive conversation.
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Most mid-size financial services firms we meet sit at Level II or Level III. Very few are at Level IV; almost
                none at Level V. The level itself is less interesting than the dimension-level pattern that produces it,
                which is why the readout we leave behind is dimensional, not a single number.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="border-t border-white/10">
              {levels.map((l) => (
                <div
                  key={l.n}
                  className="grid grid-cols-[60px_1fr] lg:grid-cols-[80px_0.9fr_1.4fr_1fr] gap-5 lg:gap-10 py-7 border-b border-white/[0.08] items-start"
                >
                  <div className="font-serif text-4xl text-[#3fc1c9] leading-none pt-1">
                    {l.n}
                  </div>
                  <div>
                    <span className="block text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-1.5">
                      Level {l.n}
                    </span>
                    <div className="text-xl font-semibold">{l.name}</div>
                  </div>
                  <div className="col-span-1 lg:col-span-1 text-[15px] text-gray-300 leading-relaxed lg:col-start-3">
                    <span className="block text-[10.5px] uppercase tracking-widest text-gray-500 mb-2">
                      Profile
                    </span>
                    {l.profile}
                  </div>
                  <div className="col-span-1 lg:col-span-1 text-[15px] text-gray-300 leading-relaxed lg:col-start-4">
                    <span className="block text-[10.5px] uppercase tracking-widest text-gray-500 mb-2">
                      Recommended move
                    </span>
                    {l.move}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="mt-9 text-[13.5px] text-gray-400 max-w-3xl leading-relaxed">
              <span className="text-[#3fc1c9] font-mono">Note:</span> we deliberately do not publish the score-to-level math,
              the per-question rubric, or the question set itself. Those are the parts of the instrument that produce a defensible
              result, and they belong inside the engagement. What we publish is the framework you can use to talk to your own
              leadership team about where you think you sit.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ============ HOW IT'S RUN ============ */}
      <section className="py-20 md:py-28 px-6 md:px-8 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-start">
            <FadeIn>
              <div>
                <p className="text-[#2ba5ad] font-semibold tracking-wider uppercase text-sm mb-5 flex items-center gap-3">
                  <span className="w-5 h-px bg-[#2ba5ad] inline-block" />
                  How It&apos;s Run
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-[#364f6b] leading-tight mb-6">
                  Three ways to deploy it.
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  The diagnostic is the same instrument in each mode. What changes is the depth of evidence we
                  collect alongside it. Most engagements start with a workshop and either stop there or convert
                  into a paid readiness assessment with executive interviews and a formal readout.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <div className="flex flex-col gap-6">
                {deploymentModes.map((m, i) => (
                  <div
                    key={m.label}
                    className="grid grid-cols-[32px_1fr] gap-5 pb-6 border-b border-gray-200 last:border-b-0"
                  >
                    <span className="font-serif text-3xl text-[#2ba5ad] leading-none">
                      {["i.", "ii.", "iii."][i]}
                    </span>
                    <div>
                      <h4 className="font-semibold text-[#364f6b] mb-1">
                        {m.label}{" "}
                        <span className="ml-2 text-[11px] uppercase tracking-widest text-[#2ba5ad] font-medium">
                          {m.duration}
                        </span>
                      </h4>
                      <p className="text-[15px] text-gray-600 leading-relaxed mt-1.5">
                        {m.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Scoring philosophy */}
          <div className="mt-16 md:mt-24">
            <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-start">
              <FadeIn>
                <div>
                  <p className="text-[#2ba5ad] font-semibold tracking-wider uppercase text-sm mb-5 flex items-center gap-3">
                    <span className="w-5 h-px bg-[#2ba5ad] inline-block" />
                    Scoring, Practically
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#364f6b] leading-tight">
                    The disagreement is the finding.
                  </h2>
                </div>
              </FadeIn>

              <FadeIn delay={100}>
                <div className="flex flex-col gap-6">
                  {[
                    {
                      num: "i.",
                      title: "We score with the executive team in the room",
                      body: "Not from interviews compiled later. The conversation is the evidence; the variance across the table is the most useful data we collect.",
                    },
                    {
                      num: "ii.",
                      title: "We take the lower score when scores diverge",
                      body: "Disagreement on a dimension is an alignment gap. Until that gap is closed, the higher scorer\u2019s position is not the firm\u2019s position.",
                    },
                    {
                      num: "iii.",
                      title: "We read the pattern, not the total",
                      body: "A firm at Level IV overall but Level II on governance has a specific, addressable problem. The dimension-level shape is what gets written into the readout.",
                    },
                  ].map((item) => (
                    <div
                      key={item.num}
                      className="grid grid-cols-[32px_1fr] gap-5 pb-6 border-b border-gray-200 last:border-b-0"
                    >
                      <span className="font-serif text-3xl text-[#2ba5ad] leading-none">
                        {item.num}
                      </span>
                      <div>
                        <h4 className="font-semibold text-[#364f6b] mb-1.5">
                          {item.title}
                        </h4>
                        <p className="text-[15px] text-gray-600 leading-relaxed">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ============ DELIVERABLES ============ */}
      <section className="py-20 md:py-28 px-6 md:px-8 bg-[#f3f1ec]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-[0.82fr_1.3fr] gap-10 md:gap-20 items-start">
            <FadeIn>
              <div>
                <p className="text-[#2ba5ad] font-semibold tracking-wider uppercase text-sm mb-5 flex items-center gap-3">
                  <span className="w-5 h-px bg-[#2ba5ad] inline-block" />
                  What You Walk Away With
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-[#364f6b] leading-tight">
                  An executive readout you can use on Monday.
                </h2>
                <p className="text-gray-600 mt-6 max-w-[38ch]">
                  Three pages or fewer, written in the language your board already speaks.
                  Designed to be forwarded between executives, not reread by you alone.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <div className="border-t border-gray-300">
                {deliverables.map((d) => (
                  <div
                    key={d.label}
                    className="grid md:grid-cols-[0.7fr_1.3fr] gap-4 md:gap-8 py-5 border-b border-gray-300 items-start"
                  >
                    <h4 className="font-semibold text-[#364f6b]">{d.label}</h4>
                    <p className="text-[15px] text-gray-600 leading-relaxed">
                      {d.desc}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Sample readout mock */}
          <FadeIn delay={200}>
            <div className="mt-14 md:mt-20 bg-white border border-gray-200 rounded-lg p-7 md:p-11 shadow-[0_1px_0_rgba(29,45,68,0.04),0_30px_60px_-40px_rgba(29,45,68,0.18)]">
              <div className="font-mono text-[11px] uppercase tracking-widest text-gray-400 mb-4">
                Sample readout &middot; illustrative
              </div>
              <div className="flex flex-wrap justify-between items-baseline border-b border-gray-200 pb-5 mb-6 gap-3">
                <div>
                  <div className="text-xl md:text-2xl font-semibold text-[#364f6b] tracking-tight">
                    Mid-cap asset manager, 280 staff
                  </div>
                  <div className="text-[11px] uppercase tracking-widest text-gray-400 mt-1.5">
                    Maturity: Level II, Experimenting
                  </div>
                </div>
                <div className="font-mono text-xs text-gray-400">
                  readout &middot; v3.2 &middot; sample
                </div>
              </div>

              {/* Bar chart */}
              <div className="grid grid-cols-5 md:grid-cols-10 gap-1.5 my-5">
                {mockBars.map((bar) => (
                  <div
                    key={bar.label}
                    className="h-14 bg-gray-100 rounded relative overflow-hidden flex items-end"
                  >
                    <div
                      className={`absolute left-0 right-0 bottom-0 rounded-b ${
                        bar.low
                          ? "bg-gradient-to-t from-[#d9b765] to-[#c79d3c]"
                          : "bg-gradient-to-t from-[#3fc1c9] to-[#2ba5ad]"
                      }`}
                      style={{ height: `${bar.h}%` }}
                    />
                    <span className="relative z-10 w-full text-center font-mono text-[9.5px] text-[#364f6b] pb-1 tracking-wide">
                      {bar.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Finding */}
              <p className="font-serif text-lg md:text-xl text-[#364f6b] leading-relaxed border-l-2 border-[#3fc1c9] pl-4 my-6">
                Adoption is concentrated in two desks. Manager-level fluency is the binding constraint, not data, and not
                governance, though governance will become one inside six months if the use-case pipeline is not actively managed.
              </p>

              {/* Footer stats */}
              <div className="grid md:grid-cols-3 gap-5 border-t border-gray-200 pt-5">
                {[
                  { label: "Top blocker", value: "Manager Support \u00B7 Talent & Skills" },
                  { label: "Top strength", value: "Governance & Risk Controls" },
                  { label: "Recommended path", value: "Manager track + 3 use cases, 90 days" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-[10.5px] uppercase tracking-widest text-gray-400 mb-1">
                      {stat.label}
                    </div>
                    <div className="text-[15px] font-medium text-[#364f6b]">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============ CTA ============ */}
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
                  Run the diagnostic with your leadership team.
                </h2>
                <p className="text-gray-300 leading-relaxed max-w-[50ch]">
                  Half a day, in the room with your executive team. We bring the instrument and the moderator;
                  you bring the leaders whose disagreement actually matters. You leave with a readout your board will read.
                </p>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2.5 bg-[#3fc1c9] text-[#0c1a2b] px-6 py-3.5 rounded-full font-medium hover:bg-[#5cd1d8] transition-colors mt-7"
                >
                  Start the conversation <span>→</span>
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="bg-white/[0.04] border border-white/10 rounded-lg p-8">
                <h4 className="text-[13px] uppercase tracking-widest text-gray-400 font-medium mb-5">
                  Direct line
                </h4>
                <div className="flex flex-col gap-5">
                  {[
                    {
                      initials: "AD",
                      name: "Adam Davis",
                      role: "Co-founder \u00B7 Data & AI",
                      email: "adam@leap-ts.com",
                      phone: "516-526-0890",
                    },
                    {
                      initials: "HV",
                      name: "Hortense Viard",
                      role: "Co-founder \u00B7 Risk & Governance",
                      email: "hortense@leap-ts.com",
                      phone: "347-559-9448",
                    },
                  ].map((person) => (
                    <div key={person.initials} className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#2ba5ad] to-[#3fc1c9] text-[#0c1a2b] flex items-center justify-center font-semibold text-sm flex-shrink-0">
                        {person.initials}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <div className="font-medium text-[15px]">{person.name}</div>
                        <div className="text-gray-400 text-[12.5px]">{person.role}</div>
                        <a
                          href={`mailto:${person.email}`}
                          className="text-[#3fc1c9] text-[13px] hover:underline"
                        >
                          {person.email}
                        </a>
                        <a
                          href={`tel:${person.phone.replace(/[^0-9+]/g, "")}`}
                          className="text-gray-300 text-[13px] hover:text-[#3fc1c9] transition-colors"
                        >
                          {person.phone}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-[#364f6b] text-white py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <Image src="/images/logo-white.svg" alt="Leap Transformation Services" width={140} height={50} />
            <div className="flex flex-wrap items-center gap-8">
              <Link href="/#services" className="text-gray-300 hover:text-white transition-colors">Services</Link>
              <Link href="/offerings" className="text-gray-300 hover:text-white transition-colors">Offerings</Link>
              <Link href="/#about" className="text-gray-300 hover:text-white transition-colors">About</Link>
              <Link href="/#how-we-work" className="text-gray-300 hover:text-white transition-colors">How We Work</Link>
              <Link href="/#why-leap" className="text-gray-300 hover:text-white transition-colors">Why Leap</Link>
              <Link href="/partners-clients" className="text-gray-300 hover:text-white transition-colors">Partners &amp; Clients</Link>
              <Link href="/#contact" className="text-gray-300 hover:text-white transition-colors">Get in Touch</Link>
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

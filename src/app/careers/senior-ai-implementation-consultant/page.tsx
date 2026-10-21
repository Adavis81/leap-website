import Link from "next/link";
import CareersNav from "../CareersNav";
import ApplicationFormButton from "../ApplicationFormButton";
import SiteFooter from "../../components/SiteFooter";

const whatYouWillBuild = [
  "Agentic workflow automation: event-driven flows that capture, triage, classify, and route information across operational processes, with human review steps built in by design",
  "AI-powered document and data extraction: reading unstructured inputs such as emails, PDFs, and financial models, and returning structured, reviewable outputs that teams can act on",
  "Monitoring and alerting tools: tracking activity across shared inboxes, workflows, and datasets, and surfacing what needs attention without creating noise",
  "Document analysis and control checks: validating inputs against criteria, flagging exceptions, and identifying gaps across compliance, reporting, and investment workflows",
  "Reconciliation and cross-check tools: comparing data across sources and producing an auditable record of discrepancies",
  "AI-enabled gap assessment tools for sustainability offices",
  "Governance documentation: user guides, workflow documentation, runbooks, RACI, and risk matrices that ship with every use case as standard",
];

const howWeWork = [
  "Use cases arrive scoped and documented. You receive a build plan, agreed technology stack, open questions, and sample data before you start.",
  "You build against live client environments, including Microsoft 365 tenants, Power Platform, SharePoint, OpenAI, Anthropic, Copilot, and document repositories.",
  "Human-in-the-loop is non-negotiable. Every AI output must be reviewed by a human before action, and your build enforces this.",
  "You document as you go. Governance, user guides, and runbooks are deliverables, not afterthoughts.",
  "You flag blockers the same day, whether that is missing access, a wrong assumption, or accuracy below threshold. You do not quietly work around problems.",
];

const required = [
  "Proven experience building production AI tools, including classification, extraction, analysis, or agentic workflow use cases that real users operate. A portfolio or examples are required.",
  "Hands-on experience with Claude (Anthropic), ChatGPT (OpenAI), Copilot (Microsoft), or comparable LLMs, with demonstrable prompt engineering and structured-output capability.",
  "Power Automate experience, including multi-trigger flows, SharePoint upserts, scheduled sweeps, and Outlook or Graph connectors.",
  "SharePoint list design, including structured schemas, status tracking, and filtering for operational trackers.",
  "Python or JavaScript used for data transformation, API integration, and file-level processing.",
  "Precision from a specification. You execute defined use cases accurately, flag deviations early, and do not gold-plate or allow scope creep.",
  "Strong written communication. Build notes, open questions, and handover documentation are part of your output.",
];

const preferred = [
  "Microsoft 365 enterprise environment experience, including service accounts, delegated access, DLP constraints, and connector approvals in regulated environments.",
  "Financial services or private equity context, with an understanding of why data sensitivity, audit trails, human sign-off, and control design matter.",
  "Experience delivering across multiple business functions, such as Finance, Risk, Compliance, Investment, or Sustainability workflows.",
  "Prior consulting or client-delivery experience, with a clear sense of the difference between a working prototype and a production-ready handover.",
  "openpyxl or equivalent experience for Excel-based financial model interaction.",
];

const notRequired = [
  "Machine learning or model training. We use commercial models and build applied wrappers, not infrastructure.",
  "Full-stack engineering. This is applied AI implementation with real business users, not software product development.",
];

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 font-light leading-relaxed">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#31b7bc]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function SeniorAiImplementationConsultantPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#374f6b]">
      <CareersNav />

      <main>
        <section className="bg-gradient-to-br from-[#002244] via-[#374f6b] to-[#1a2744] px-8 pb-20 pt-40 text-white md:pb-24 md:pt-44">
          <div className="mx-auto max-w-5xl">
            <Link href="/careers" className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-[#c8d6e5] transition-colors hover:text-white">← Back to careers</Link>
            <div className="mb-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-[#31b7bc] px-4 py-1.5 text-sm font-semibold">Contract position</span>
              <span className="rounded-full border border-white/30 px-4 py-1.5 text-sm font-medium">Remote / Hybrid</span>
            </div>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">Senior AI Implementation Consultant</h1>
            <p className="mt-6 text-lg font-light text-[#c8d6e5]">Remote / Hybrid · July 2026 · Immediate start</p>
            <ApplicationFormButton
              label="Apply now"
              className="mt-8 inline-block rounded-full bg-[#31b7bc] px-7 py-3.5 font-semibold text-white transition-all hover:bg-[#2ba5ad] hover:shadow-lg"
            />
          </div>
        </section>

        <div className="mx-auto grid max-w-5xl gap-12 px-8 py-16 lg:grid-cols-[1fr_260px] lg:py-20">
          <article className="min-w-0 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-[#002244]">About Leap Transformation Services</h2>
              <div className="mt-5 space-y-4 font-light leading-relaxed">
                <p>Leap Transformation Services is a boutique Data &amp; AI consulting firm founded by Hortense Viard and Adam Davis. We work exclusively with private equity firms and financial services organizations, building AI tools that operating teams across Finance, Risk, Sustainability, Investor Relations, Deal Team, and Front Office functions actually adopt and use.</p>
                <p>Our engagements are senior-led, tightly scoped, and delivery-focused. We build working tools and hand them over with the proper documentation and governance in place based on risk tiering. We are expanding our delivery capacity and looking for an experienced AI builder to join us on active engagements.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#002244]">The role</h2>
              <p className="mt-5 text-xl font-medium text-[#374f6b]">We need a builder who understands financial services.</p>
              <p className="mt-4 font-light leading-relaxed">You will take scoped, well-documented AI use cases and turn them into production-ready agentic workflows across various functions at private equity and financial services clients. You will work directly under the engagement lead, in real client environments, to tight timelines.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#002244]">What you will build</h2>
              <BulletList items={whatYouWillBuild} />
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#002244]">How we work</h2>
              <BulletList items={howWeWork} />
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#002244]">What we are looking for</h2>
              <h3 className="mt-7 text-lg font-semibold text-[#374f6b]">Required</h3>
              <BulletList items={required} />
              <h3 className="mt-9 text-lg font-semibold text-[#374f6b]">Strongly preferred</h3>
              <BulletList items={preferred} />
              <h3 className="mt-9 text-lg font-semibold text-[#374f6b]">Not required</h3>
              <BulletList items={notRequired} />
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#002244]">Engagement details</h2>
              <dl className="mt-6 grid gap-x-8 gap-y-6 rounded-lg border border-[#c8d6e5] bg-[#f3f3f3]/50 p-6 sm:grid-cols-2">
                <div><dt className="text-sm font-semibold uppercase tracking-wider text-[#7b95b3]">Engagement</dt><dd className="mt-1 font-medium text-[#002244]">Contract position; flexible arrangements</dd></div>
                <div><dt className="text-sm font-semibold uppercase tracking-wider text-[#7b95b3]">Location</dt><dd className="mt-1 font-medium text-[#002244]">Remote / hybrid</dd></div>
                <div><dt className="text-sm font-semibold uppercase tracking-wider text-[#7b95b3]">Compensation</dt><dd className="mt-1 font-medium text-[#002244]">Competitive, based on demonstrated delivery capability</dd></div>
                <div><dt className="text-sm font-semibold uppercase tracking-wider text-[#7b95b3]">Start</dt><dd className="mt-1 font-medium text-[#002244]">Immediately</dd></div>
              </dl>
              <p className="mt-5 font-light leading-relaxed">Client calls typically take place in Eastern or Central time zones.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#002244]">How to apply</h2>
              <p className="mt-5 font-light leading-relaxed">Complete the application form with the following information:</p>
              <BulletList items={[
                "One or two AI tools you have built and deployed, including what they did, what technology stack you used, and how they performed when a real user ran them.",
                "Your availability and what you are looking for.",
                "Any relevant financial services or private equity context.",
              ]} />
              <p className="mt-6 font-light leading-relaxed">We keep the process short. If your background fits, we will have a direct conversation and move quickly.</p>
            </section>
          </article>

          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="rounded-lg border border-[#c8d6e5] p-6">
              <h2 className="text-lg font-bold text-[#002244]">Interested?</h2>
              <p className="mt-3 text-sm font-light leading-relaxed">Send your experience, availability, and relevant financial services background.</p>
              <ApplicationFormButton label="Apply" className="mt-5 block w-full rounded-lg bg-[#31b7bc] px-5 py-3 text-center font-semibold text-white transition-colors hover:bg-[#2ba5ad]" />
              <a href="/careers/leap-ai-senior-implementation-consultant.docx" download className="mt-3 block text-center text-sm font-medium text-[#374f6b] hover:text-[#31b7bc]">Download Word version</a>
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

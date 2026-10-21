import Link from "next/link";
import CareersNav from "./CareersNav";
import ApplicationFormButton from "./ApplicationFormButton";
import SiteFooter from "../components/SiteFooter";

const jobDescriptionUrl = "/careers/senior-ai-implementation-consultant";

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#374f6b]">
      <CareersNav />

      <main>
        <section className="bg-gradient-to-br from-[#002244] via-[#374f6b] to-[#1a2744] px-8 pb-24 pt-40 text-white">
          <div className="mx-auto max-w-5xl">
            <p className="mb-4 font-semibold uppercase tracking-[0.2em] text-[#31b7bc]">Join Leap</p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">Careers</h1>
            <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-[#c8d6e5] md:text-xl">
              Work alongside senior practitioners to build practical AI solutions for private equity and financial services organizations.
            </p>
          </div>
        </section>

        <section className="px-8 py-20 md:py-24">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 max-w-2xl">
              <p className="mb-3 font-semibold uppercase tracking-[0.18em] text-[#31b7bc]">Open position</p>
              <h2 className="text-3xl font-bold text-[#002244] md:text-4xl">Build with us</h2>
              <p className="mt-4 text-lg font-light leading-relaxed">
                We are expanding our delivery capacity with an experienced AI builder who understands financial services.
              </p>
            </div>

            <article className="rounded-lg border border-[#c8d6e5] bg-[#f3f3f3]/50 p-7 md:p-10">
              <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
                <div className="max-w-2xl">
                  <div className="mb-5 flex flex-wrap gap-3">
                    <span className="rounded-full border border-[#31b7bc] bg-white px-4 py-1.5 text-sm font-semibold text-[#002244]">
                      Contract position
                    </span>
                    <span className="rounded-full border border-[#c8d6e5] bg-white px-4 py-1.5 text-sm font-medium">
                      Remote / Hybrid
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#002244] md:text-3xl">
                    Senior AI Implementation Consultant
                  </h3>
                  <p className="mt-4 font-light leading-relaxed">
                    Turn well-scoped AI use cases into production-ready agentic workflows across private equity and financial services functions. The work spans workflow automation, document and data extraction, monitoring, control checks, reconciliation, and governance documentation.
                  </p>
                  <p className="mt-4 text-sm font-medium text-[#7b95b3]">
                    Flexible engagement · Eastern or Central time-zone client calls · Immediate start
                  </p>
                </div>

                <div className="flex shrink-0 flex-col gap-3 md:w-60">
                  <Link
                    href={jobDescriptionUrl}
                    className="rounded-lg bg-[#31b7bc] px-6 py-3.5 text-center font-semibold text-white transition-all hover:bg-[#2ba5ad] hover:shadow-lg"
                  >
                    View job description
                  </Link>
                  <ApplicationFormButton
                    label="Apply"
                    className="rounded-lg border border-[#002244] px-6 py-3.5 text-center font-semibold text-[#002244] transition-colors hover:bg-[#002244] hover:text-white"
                  />
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

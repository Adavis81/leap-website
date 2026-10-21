"use client";

import { type FormEvent, useEffect, useState } from "react";

export type LeadCaptureIntent =
  | "readiness-fit-call"
  | "readiness-assessment-outline"
  | "ai-dd-triage"
  | "ai-dd-workstream";

type LeadSummary = {
  scoreBand?: string;
  directionalScore?: string;
  weakestDomains?: string[];
};

type LeadCaptureModalProps = {
  isOpen: boolean;
  intent: LeadCaptureIntent;
  onClose: () => void;
  summary?: LeadSummary;
};

type IntentConfig = {
  eyebrow: string;
  title: string;
  description: string;
  submitLabel: string;
  subject: string;
  leadType: string;
  mode: "readiness" | "diligence";
  defaultInterest: string;
  requiresTiming: boolean;
};

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xykvnkao";

const intentConfig: Record<LeadCaptureIntent, IntentConfig> = {
  "readiness-fit-call": {
    eyebrow: "AI Readiness Diagnostic",
    title: "Schedule a 30-minute readiness fit call.",
    description:
      "Tell us who should join and a few windows that work. We will use the call to confirm whether the workshop or deeper assessment is the right next step.",
    submitLabel: "Send readiness fit request",
    subject: "AI Readiness Fit Call",
    leadType: "AI readiness fit call",
    mode: "readiness",
    defaultInterest: "Not sure yet",
    requiresTiming: true,
  },
  "readiness-assessment-outline": {
    eyebrow: "AI Readiness Diagnostic",
    title: "Request the readiness assessment outline.",
    description:
      "We will send the assessment shape and suggest the right starting point based on your firm type and current AI adoption questions.",
    submitLabel: "Request assessment outline",
    subject: "AI Readiness Assessment Outline",
    leadType: "AI readiness assessment outline",
    mode: "readiness",
    defaultInterest: "Readiness Assessment",
    requiresTiming: false,
  },
  "ai-dd-triage": {
    eyebrow: "AI Due Diligence Diagnostic",
    title: "Book a 30-minute AI diligence triage.",
    description:
      "Share only non-confidential context. We will use the triage to decide whether AI risk, AI claims, or AI value creation need a focused workstream.",
    submitLabel: "Send AI diligence triage request",
    subject: "AI Diligence Triage",
    leadType: "AI diligence triage",
    mode: "diligence",
    defaultInterest: "30-minute AI diligence triage",
    requiresTiming: true,
  },
  "ai-dd-workstream": {
    eyebrow: "AI Due Diligence Diagnostic",
    title: "Request a 1-2 week diligence workstream.",
    description:
      "Send non-confidential intake details and we will follow up on scope, timing, and the diligence questions that need to be defended before IC.",
    submitLabel: "Request diligence workstream",
    subject: "AI Diligence Workstream Request",
    leadType: "AI diligence workstream",
    mode: "diligence",
    defaultInterest: "1-2 week diligence workstream",
    requiresTiming: false,
  },
};

const emptyForm = {
  name: "",
  email: "",
  company: "",
  role: "",
  firmType: "",
  interest: "",
  preferredTimes: "",
  anonymizedContext: "",
  notes: "",
};

export default function LeadCaptureModal({
  isOpen,
  intent,
  onClose,
  summary,
}: LeadCaptureModalProps) {
  const config = intentConfig[intent];
  const [formData, setFormData] = useState({ ...emptyForm, interest: config.defaultInterest });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setFormData({ ...emptyForm, interest: intentConfig[intent].defaultInterest });
    setSubmitted(false);
    setSubmitError("");
  }, [intent, isOpen]);

  if (!isOpen) return null;

  const isDiligence = config.mode === "diligence";

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const message = [
      `${config.leadType} request from ${formData.name}`,
      "",
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `${isDiligence ? "Firm" : "Company"}: ${formData.company}`,
      `Role: ${formData.role}`,
      !isDiligence && formData.firmType ? `Firm type: ${formData.firmType}` : "",
      `Interest: ${formData.interest}`,
      formData.preferredTimes ? `Preferred times: ${formData.preferredTimes}` : "",
      isDiligence && formData.anonymizedContext
        ? `Anonymized target type or sector: ${formData.anonymizedContext}`
        : "",
      summary?.scoreBand ? `Score band: ${summary.scoreBand}` : "",
      summary?.directionalScore ? `Directional score: ${summary.directionalScore}` : "",
      summary?.weakestDomains?.length
        ? `Weakest domains: ${summary.weakestDomains.join(" | ")}`
        : "",
      formData.notes ? `Notes: ${formData.notes}` : "",
      "",
      isDiligence
        ? "Privacy guardrail: no target name, data-room materials, valuation, deal terms, individual answers, management claims, confidential findings, or customer data requested."
        : "Privacy guardrail: no sensitive employee data, internal AI adoption metrics, governance documents, or confidential strategy details requested.",
    ]
      .filter(Boolean)
      .join("\n");

    const payload = {
      _subject: config.subject,
      _replyto: formData.email,
      subject: config.subject,
      message,
      lead_type: config.leadType,
      source_page: isDiligence ? "AI Due Diligence Diagnostic" : "AI Readiness Diagnostic",
      name: formData.name,
      email: formData.email,
      company_or_firm: formData.company,
      role: formData.role,
      firm_type: isDiligence ? undefined : formData.firmType,
      interest: formData.interest,
      preferred_times: formData.preferredTimes,
      anonymized_target_type_or_sector: isDiligence ? formData.anonymizedContext : undefined,
      score_band: summary?.scoreBand,
      directional_score: summary?.directionalScore,
      weakest_domains: summary?.weakestDomains?.join(" | "),
      notes: formData.notes,
      privacy_guardrail: isDiligence
        ? "No target name, data-room materials, valuation, deal terms, individual answers, management claims, confidential findings, or customer data requested."
        : "No sensitive employee data, internal AI adoption metrics, governance documents, or confidential strategy details requested.",
    };

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Formspree request failed");
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Lead capture submission error:", error);
      setSubmitError("Something went wrong. Please try again or use the main contact form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0c1a2b]/65 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-capture-title"
    >
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-6 border-b border-gray-100 px-6 py-5 md:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2ba5ad]">
              {config.eyebrow}
            </p>
            <h2 id="lead-capture-title" className="mt-2 text-2xl font-bold leading-tight text-[#364f6b]">
              {config.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-gray-200 px-3 py-1.5 text-sm font-medium text-[#364f6b] transition hover:border-[#3fc1c9] hover:text-[#2ba5ad]"
            aria-label="Close"
          >
            Close
          </button>
        </div>

        {submitted ? (
          <div className="px-6 py-10 md:px-8">
            <div className="rounded-lg border border-[#3fc1c9]/30 bg-[#3fc1c9]/10 p-7">
              <h3 className="text-xl font-bold text-[#364f6b]">Thanks. We received it.</h3>
              <p className="mt-3 leading-relaxed text-gray-600">
                Leap will follow up shortly. The diagnostic forms send only the intake details shown
                here, plus any score band or weakest-domain summary when applicable.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 rounded-full bg-[#3fc1c9] px-6 py-3 text-sm font-medium text-[#0c1a2b] transition hover:bg-[#5cd1d8]"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-6 md:px-8">
            <p className="mb-6 text-base leading-relaxed text-gray-600">{config.description}</p>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#364f6b]">
                  Name
                </span>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-[#364f6b] outline-none transition focus:border-[#3fc1c9] focus:ring-2 focus:ring-[#3fc1c9]/20"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#364f6b]">
                  Work email
                </span>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-[#364f6b] outline-none transition focus:border-[#3fc1c9] focus:ring-2 focus:ring-[#3fc1c9]/20"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#364f6b]">
                  {isDiligence ? "Firm" : "Company"}
                </span>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(event) => updateField("company", event.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-[#364f6b] outline-none transition focus:border-[#3fc1c9] focus:ring-2 focus:ring-[#3fc1c9]/20"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#364f6b]">
                  Role
                </span>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(event) => updateField("role", event.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-[#364f6b] outline-none transition focus:border-[#3fc1c9] focus:ring-2 focus:ring-[#3fc1c9]/20"
                />
              </label>

              {!isDiligence && (
                <>
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#364f6b]">
                      Firm type
                    </span>
                    <select
                      value={formData.firmType}
                      onChange={(event) => updateField("firmType", event.target.value)}
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-[#364f6b] outline-none transition focus:border-[#3fc1c9] focus:ring-2 focus:ring-[#3fc1c9]/20"
                    >
                      <option value="">Select one</option>
                      <option>Asset manager</option>
                      <option>Bank</option>
                      <option>Insurer</option>
                      <option>Private equity or PE-backed firm</option>
                      <option>Other financial services firm</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#364f6b]">
                      Interested in
                    </span>
                    <select
                      value={formData.interest}
                      onChange={(event) => updateField("interest", event.target.value)}
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-[#364f6b] outline-none transition focus:border-[#3fc1c9] focus:ring-2 focus:ring-[#3fc1c9]/20"
                    >
                      <option>Executive Diagnostic Workshop</option>
                      <option>Readiness Assessment</option>
                      <option>Not sure yet</option>
                    </select>
                  </label>
                </>
              )}

              {isDiligence && (
                <label className="block md:col-span-2">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#364f6b]">
                    Optional anonymized target type or sector
                  </span>
                  <input
                    type="text"
                    value={formData.anonymizedContext}
                    onChange={(event) => updateField("anonymizedContext", event.target.value)}
                    placeholder="Example: B2B software platform, specialty lender, claims processor"
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-[#364f6b] outline-none transition placeholder:text-gray-400 focus:border-[#3fc1c9] focus:ring-2 focus:ring-[#3fc1c9]/20"
                  />
                </label>
              )}

              <label className="block md:col-span-2">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#364f6b]">
                  Preferred times{config.requiresTiming ? "" : " (optional)"}
                </span>
                <input
                  type="text"
                  required={config.requiresTiming}
                  value={formData.preferredTimes}
                  onChange={(event) => updateField("preferredTimes", event.target.value)}
                  placeholder="A few windows and timezone"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-[#364f6b] outline-none transition placeholder:text-gray-400 focus:border-[#3fc1c9] focus:ring-2 focus:ring-[#3fc1c9]/20"
                />
              </label>

              <label className="block md:col-span-2">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#364f6b]">
                  {isDiligence ? "Non-confidential context (optional)" : "Anything else we should know? (optional)"}
                </span>
                <textarea
                  rows={4}
                  value={formData.notes}
                  onChange={(event) => updateField("notes", event.target.value)}
                  className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-[#364f6b] outline-none transition focus:border-[#3fc1c9] focus:ring-2 focus:ring-[#3fc1c9]/20"
                />
              </label>
            </div>

            {summary && (
              <div className="mt-5 rounded-lg border border-gray-200 bg-[#f8f9fb] p-4 text-sm text-gray-600">
                <div className="font-semibold text-[#364f6b]">Included from this snapshot</div>
                <div className="mt-2 grid gap-1">
                  {summary.scoreBand && <div>Score band: {summary.scoreBand}</div>}
                  {summary.directionalScore && <div>Directional score: {summary.directionalScore}</div>}
                  {summary.weakestDomains?.length ? (
                    <div>Weakest domains: {summary.weakestDomains.join(" | ")}</div>
                  ) : null}
                </div>
              </div>
            )}

            <p className="mt-5 text-xs leading-5 text-gray-500">
              {isDiligence
                ? "Do not include target names, data-room materials, valuation, deal terms, individual answers, management claims, confidential findings, or customer data."
                : "Do not include sensitive employee data, internal AI adoption metrics, governance documents, or confidential strategy details."}
            </p>

            {submitError && (
              <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {submitError}
              </p>
            )}

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-gray-200 px-6 py-3 text-sm font-medium text-[#364f6b] transition hover:border-[#3fc1c9] hover:text-[#2ba5ad]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-[#3fc1c9] px-6 py-3 text-sm font-medium text-[#0c1a2b] transition hover:bg-[#5cd1d8] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : config.submitLabel}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

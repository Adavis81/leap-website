"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";

type ApplicationFormButtonProps = {
  label: string;
  className: string;
};

const formEndpoint = "/api/careers/apply";

export default function ApplicationFormButton({ label, className }: ApplicationFormButtonProps) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const resume = formData.get("attachment");

    if (resume instanceof File && resume.size > 3 * 1024 * 1024) {
      setError("Please upload a resume smaller than 3 MB.");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        let serviceMessage = "";

        try {
          const responseBody = (await response.json()) as {
            error?: string;
            errors?: Array<{ message?: string }>;
          };
          serviceMessage =
            responseBody.error ||
            responseBody.errors?.map((item) => item.message).filter(Boolean).join(" ") ||
            "";
        } catch {
          // Formspree occasionally returns an HTML error page instead of JSON.
        }

        throw new Error(serviceMessage || `Submission failed (${response.status})`);
      }
      form.reset();
      setSubmitted(true);
    } catch (submissionError) {
      const message = submissionError instanceof Error ? submissionError.message : "Submission failed";
      setError(`We could not submit your application. ${message}`);
    } finally {
      setSubmitting(false);
    }
  }

  function closePanel() {
    setOpen(false);
    setSubmitted(false);
    setError("");
  }

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {label}
      </button>

      <div
        className={`fixed inset-0 z-[100] transition ${open ? "pointer-events-auto bg-[#002244]/55 opacity-100" : "pointer-events-none bg-transparent opacity-0"}`}
        aria-hidden={!open}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) closePanel();
        }}
      >
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          className={`mx-auto max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-b-xl bg-white shadow-2xl transition-transform duration-500 ease-out ${open ? "translate-y-0" : "-translate-y-full"}`}
        >
          <div className="sticky top-0 z-10 flex items-start justify-between border-b border-[#c8d6e5] bg-white px-6 py-5 md:px-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#31b7bc]">Join Leap</p>
              <h2 id={titleId} className="mt-1 text-2xl font-bold text-[#002244] md:text-3xl">
                Apply for this position
              </h2>
              <p className="mt-1 text-sm text-[#7b95b3]">Senior AI Implementation Consultant · Contract</p>
            </div>
            <button type="button" onClick={closePanel} className="rounded-full p-2 text-[#374f6b] transition-colors hover:bg-[#f3f3f3]" aria-label="Close application form">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {submitted ? (
            <div className="px-6 py-16 text-center md:px-10">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#31b7bc] text-[#31b7bc]">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="mt-5 text-2xl font-bold text-[#002244]">Application received</h3>
              <p className="mx-auto mt-3 max-w-xl font-light leading-relaxed">Thank you for your interest in Leap. Our team will review your application and contact you if your background is a match.</p>
              <button type="button" onClick={closePanel} className="mt-7 rounded-full bg-[#31b7bc] px-7 py-3 font-semibold text-white hover:bg-[#2ba5ad]">Close</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="px-6 py-8 md:px-10 md:py-10">
              <label className="absolute -left-[9999px]" aria-hidden="true">
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
              <input type="hidden" name="position" value="Senior AI Implementation Consultant" />
              <input type="hidden" name="engagement_type" value="Contract" />
              <input type="hidden" name="_subject" value="New application - Senior AI Implementation Consultant" />

              <div className="grid gap-6 md:grid-cols-2">
                <label className="block text-sm font-semibold text-[#002244]">First name <span className="text-[#31b7bc]">*</span><input required name="first_name" autoComplete="given-name" className="mt-2 w-full rounded-lg border border-[#c8d6e5] px-4 py-3 font-normal text-[#374f6b] outline-none transition focus:border-[#31b7bc] focus:ring-2 focus:ring-[#31b7bc]/20" /></label>
                <label className="block text-sm font-semibold text-[#002244]">Last name <span className="text-[#31b7bc]">*</span><input required name="last_name" autoComplete="family-name" className="mt-2 w-full rounded-lg border border-[#c8d6e5] px-4 py-3 font-normal text-[#374f6b] outline-none transition focus:border-[#31b7bc] focus:ring-2 focus:ring-[#31b7bc]/20" /></label>
                <label className="block text-sm font-semibold text-[#002244]">Email <span className="text-[#31b7bc]">*</span><input required type="email" name="email" autoComplete="email" className="mt-2 w-full rounded-lg border border-[#c8d6e5] px-4 py-3 font-normal text-[#374f6b] outline-none transition focus:border-[#31b7bc] focus:ring-2 focus:ring-[#31b7bc]/20" /></label>
                <label className="block text-sm font-semibold text-[#002244]">Phone <span className="text-[#31b7bc]">*</span><input required type="tel" name="phone" autoComplete="tel" className="mt-2 w-full rounded-lg border border-[#c8d6e5] px-4 py-3 font-normal text-[#374f6b] outline-none transition focus:border-[#31b7bc] focus:ring-2 focus:ring-[#31b7bc]/20" /></label>
                <label className="block text-sm font-semibold text-[#002244] md:col-span-2">Upload your resume <span className="text-[#31b7bc]">*</span><input required type="file" name="attachment" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="mt-2 block w-full rounded-lg border border-dashed border-[#7b95b3] bg-[#f3f3f3]/60 px-4 py-5 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-[#002244] file:px-5 file:py-2.5 file:font-semibold file:text-white hover:file:bg-[#374f6b]" /><span className="mt-2 block font-normal text-[#7b95b3]">PDF, DOC, or DOCX · Maximum 3 MB</span></label>
                <label className="block text-sm font-semibold text-[#002244]">How did you hear about us? <span className="font-normal text-[#7b95b3]">(optional)</span><input name="referral_source" className="mt-2 w-full rounded-lg border border-[#c8d6e5] px-4 py-3 font-normal text-[#374f6b] outline-none transition focus:border-[#31b7bc] focus:ring-2 focus:ring-[#31b7bc]/20" /></label>
                <label className="block text-sm font-semibold text-[#002244]">LinkedIn profile <span className="font-normal text-[#7b95b3]">(optional)</span><input type="url" name="linkedin_profile" inputMode="url" placeholder="https://linkedin.com/in/..." className="mt-2 w-full rounded-lg border border-[#c8d6e5] px-4 py-3 font-normal text-[#374f6b] outline-none transition focus:border-[#31b7bc] focus:ring-2 focus:ring-[#31b7bc]/20" /></label>
              </div>

              {error && <p role="alert" className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

              <div className="mt-8 flex flex-col-reverse items-center justify-between gap-4 border-t border-[#c8d6e5] pt-6 sm:flex-row">
                <p className="text-xs font-light text-[#7b95b3]">By submitting, you consent to Leap using this information to assess your application.</p>
                <button type="submit" disabled={submitting} className="w-full shrink-0 rounded-full bg-[#31b7bc] px-8 py-3.5 font-semibold text-white transition-all hover:bg-[#2ba5ad] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">{submitting ? "Submitting..." : "Submit application"}</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

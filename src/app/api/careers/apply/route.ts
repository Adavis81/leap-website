import { NextResponse } from "next/server";

export const runtime = "nodejs";

const maxResumeSize = 3 * 1024 * 1024;
const allowedExtensions = new Set(["pdf", "doc", "docx"]);
const allowedMimeTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/octet-stream",
]);

function textField(formData: FormData, name: string, maxLength: number) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] || character,
  );
}

function safeFilename(filename: string) {
  return filename.replace(/[^a-zA-Z0-9._ -]/g, "_").slice(0, 120) || "resume";
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "Application email service is not configured." }, { status: 503 });
  }

  try {
    const formData = await request.formData();

    // Honeypot: legitimate applicants never see or complete this field.
    if (textField(formData, "website", 200)) {
      return NextResponse.json({ ok: true });
    }

    const firstName = textField(formData, "first_name", 80);
    const lastName = textField(formData, "last_name", 80);
    const email = textField(formData, "email", 254);
    const phone = textField(formData, "phone", 40);
    const referralSource = textField(formData, "referral_source", 500);
    const linkedinProfile = textField(formData, "linkedin_profile", 500);
    const attachment = formData.get("attachment");

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (!(attachment instanceof File) || attachment.size === 0) {
      return NextResponse.json({ error: "Please attach your resume." }, { status: 400 });
    }

    if (attachment.size > maxResumeSize) {
      return NextResponse.json({ error: "Please upload a resume smaller than 3 MB." }, { status: 413 });
    }

    const extension = attachment.name.split(".").pop()?.toLowerCase() || "";
    if (!allowedExtensions.has(extension) || (attachment.type && !allowedMimeTypes.has(attachment.type))) {
      return NextResponse.json({ error: "Resume must be a PDF, DOC, or DOCX file." }, { status: 400 });
    }

    const resumeContent = Buffer.from(await attachment.arrayBuffer()).toString("base64");
    const applicantName = `${firstName} ${lastName}`;
    const optionalRow = (label: string, value: string) =>
      value
        ? `<tr><td style="padding:8px 14px;color:#7b95b3;font-weight:600;vertical-align:top">${label}</td><td style="padding:8px 14px;color:#374f6b">${escapeHtml(value)}</td></tr>`
        : "";

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "Leap-Website/1.0",
      },
      body: JSON.stringify({
        from: "Leap Careers <careers@leap-ts.com>",
        to: ["HR@leap-ts.com"],
        reply_to: email,
        subject: `New application - Senior AI Implementation Consultant - ${applicantName}`,
        html: `
          <div style="font-family:Arial,sans-serif;background:#f3f3f3;padding:32px;color:#374f6b">
            <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #c8d6e5;border-radius:8px;overflow:hidden">
              <div style="background:#002244;padding:24px 28px;border-bottom:4px solid #31b7bc">
                <div style="color:#31b7bc;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase">Leap Careers</div>
                <h1 style="color:#ffffff;font-size:24px;margin:8px 0 0">New application</h1>
                <p style="color:#c8d6e5;margin:8px 0 0">Senior AI Implementation Consultant · Contract</p>
              </div>
              <div style="padding:24px 14px">
                <table role="presentation" style="width:100%;border-collapse:collapse;font-size:15px">
                  <tr><td style="padding:8px 14px;color:#7b95b3;font-weight:600;width:170px">Applicant</td><td style="padding:8px 14px;color:#002244;font-weight:700">${escapeHtml(applicantName)}</td></tr>
                  <tr><td style="padding:8px 14px;color:#7b95b3;font-weight:600">Email</td><td style="padding:8px 14px"><a href="mailto:${escapeHtml(email)}" style="color:#31b7bc">${escapeHtml(email)}</a></td></tr>
                  <tr><td style="padding:8px 14px;color:#7b95b3;font-weight:600">Phone</td><td style="padding:8px 14px;color:#374f6b">${escapeHtml(phone)}</td></tr>
                  ${optionalRow("How they heard", referralSource)}
                  ${optionalRow("LinkedIn", linkedinProfile)}
                </table>
                <p style="margin:24px 14px 4px;color:#374f6b">The applicant's resume is attached to this email.</p>
              </div>
            </div>
          </div>`,
        text: [
          "New application - Senior AI Implementation Consultant (Contract)",
          `Applicant: ${applicantName}`,
          `Email: ${email}`,
          `Phone: ${phone}`,
          referralSource ? `How they heard about Leap: ${referralSource}` : "",
          linkedinProfile ? `LinkedIn: ${linkedinProfile}` : "",
          "Resume attached.",
        ].filter(Boolean).join("\n"),
        attachments: [{
          filename: safeFilename(attachment.name),
          content: resumeContent,
        }],
        tags: [
          { name: "form", value: "careers" },
          { name: "position", value: "senior_ai_implementation_consultant" },
        ],
      }),
    });

    const resendBody = (await resendResponse.json()) as { id?: string; message?: string; name?: string };

    if (!resendResponse.ok) {
      console.error("Resend application error", resendResponse.status, resendBody.name, resendBody.message);
      return NextResponse.json(
        { error: resendBody.message || "Email delivery failed. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, id: resendBody.id });
  } catch (error) {
    console.error("Careers application error", error);
    return NextResponse.json({ error: "We could not process your application. Please try again." }, { status: 500 });
  }
}

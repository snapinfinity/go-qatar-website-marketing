import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { checkRateLimit } from "@/lib/rateLimiter";

const RECIPIENT = process.env.CONTACT_EMAIL || "help.goqatar@gmail.com";

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function createTransporter() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

export async function POST(req: NextRequest) {
  // ── Rate limiting ──────────────────────────────────────────
  const ip = getClientIp(req);
  const { allowed, remaining, retryAfterSeconds } = checkRateLimit(ip);

  if (!allowed) {
    const hours = Math.ceil(retryAfterSeconds / 3600);
    return NextResponse.json(
      {
        error: `Too many requests. You can send ${3} messages per hour. Please try again in ${hours} hour${hours !== 1 ? "s" : ""}.`,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfterSeconds),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  // ── Parse + validate ──────────────────────────────────────
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, subject, category, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  if (message.trim().length < 10) {
    return NextResponse.json(
      { error: "Message must be at least 10 characters." },
      { status: 400 }
    );
  }

  // ── Send email ────────────────────────────────────────────
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    return NextResponse.json(
      { error: "Email service is not configured. Please try again later." },
      { status: 503 }
    );
  }

  const transporter = createTransporter();
  const categoryLabel = category || "General";
  const subjectLine = subject?.trim() || `[${categoryLabel}] Message from ${name}`;

  const htmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px;">
  <div style="max-width: 560px; margin: 0 auto; background: #1a1a1a; border-radius: 12px; overflow: hidden;">
    <div style="background: #292827; padding: 20px 24px; border-bottom: 1px solid rgba(255,255,255,0.1);">
      <h2 style="margin: 0; color: #C9A84C; font-size: 18px;">Go Qatar — ${categoryLabel}</h2>
    </div>
    <div style="padding: 24px;">
      <table style="width:100%; border-collapse:collapse; margin-bottom:16px;">
        <tr>
          <td style="color:#999; font-size:12px; padding: 6px 0; width:80px;">From</td>
          <td style="color:#fff; font-size:14px; padding: 6px 0;">${name} &lt;${email}&gt;</td>
        </tr>
        <tr>
          <td style="color:#999; font-size:12px; padding: 6px 0;">Category</td>
          <td style="color:#C9A84C; font-size:14px; padding: 6px 0; font-weight:600;">${categoryLabel}</td>
        </tr>
        <tr>
          <td style="color:#999; font-size:12px; padding: 6px 0;">Subject</td>
          <td style="color:#fff; font-size:14px; padding: 6px 0;">${subjectLine}</td>
        </tr>
        <tr>
          <td style="color:#999; font-size:12px; padding: 6px 0;">IP</td>
          <td style="color:#555; font-size:12px; padding: 6px 0;">${ip}</td>
        </tr>
      </table>
      <div style="background:#2C2C2E; border-radius:8px; padding:16px;">
        <p style="color:#e0e0e0; font-size:14px; line-height:1.7; margin:0; white-space:pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
      </div>
    </div>
    <div style="padding:12px 24px; background:#111; border-top:1px solid rgba(255,255,255,0.06);">
      <p style="color:#555; font-size:11px; margin:0;">Sent via Go Qatar website contact form · ${new Date().toUTCString()}</p>
    </div>
  </div>
</body>
</html>`;

  try {
    await transporter.sendMail({
      from: `"Go Qatar Website" <${process.env.GMAIL_USER}>`,
      replyTo: `"${name}" <${email}>`,
      to: RECIPIENT,
      subject: `[Go Qatar] [${categoryLabel}] ${subjectLine}`,
      html: htmlBody,
      text: `From: ${name} <${email}>\nCategory: ${categoryLabel}\nSubject: ${subjectLine}\n\n${message}`,
    });

    return NextResponse.json(
      { success: true, remaining },
      { status: 200 }
    );
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}

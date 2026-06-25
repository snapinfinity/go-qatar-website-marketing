"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

type Tab = "contact" | "feedback" | "help";
type Status = "idle" | "loading" | "success" | "error";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  {
    id: "contact",
    label: "Contact Us",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    ),
  },
  {
    id: "feedback",
    label: "Feedback",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
      </svg>
    ),
  },
  {
    id: "help",
    label: "Help Center",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
      </svg>
    ),
  },
];

const FAQ = [
  {
    q: "How do I find an address in Qatar?",
    a: "Open Go Qatar, go to the Search tab, enter the Building Number, Street Number, and Zone Number — then tap Search. The app will pin the exact location on the map.",
  },
  {
    q: "What is Zone, Street, and Building?",
    a: "Qatar uses a unique address system. Zone is the district number, Street is the road number within that zone, and Building is the property number on that street. Every address in Qatar has these three numbers.",
  },
  {
    q: "How do I save a favourite location?",
    a: "After finding a location, tap the three-dot menu on any result and choose 'Add to Favourite'. You can give it a custom label like 'Home' or 'Office'.",
  },
  {
    q: "Can I share a location with someone?",
    a: "Yes. From your history or favourites, tap the three-dot menu on any entry and choose 'Share'. This copies a shareable link with the map coordinates.",
  },
  {
    q: "The map is not loading — what should I do?",
    a: "Check your internet connection. If the issue persists, restart the app. For continued problems, contact us using the form below.",
  },
  {
    q: "Is Go Qatar free to use?",
    a: "Yes, Go Qatar is completely free — no subscription, no hidden fees.",
  },
  {
    q: "How do I open a location in Google Maps or Waze?",
    a: "After searching or from History/Favourites, tap the 'Google Map' or 'Waze' button on any result to open it directly in your preferred navigation app.",
  },
];

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-white/70 mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}

const inputClass =
  "w-full bg-[#1E1E1E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all duration-200";

export default function ContactClient() {
  const [tab, setTab] = useState<Tab>("contact");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    category: "General Inquiry",
    message: "",
    rating: 0,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState("");

  // Read ?tab= from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("tab") as Tab | null;
    if (t && ["contact", "feedback", "help"].includes(t)) setTab(t);
  }, []);

  // Auto-set category when tab changes
  useEffect(() => {
    if (tab === "feedback")
      setForm((f) => ({ ...f, category: "App Feedback" }));
    else if (tab === "help")
      setForm((f) => ({ ...f, category: "Support Request" }));
    else setForm((f) => ({ ...f, category: "General Inquiry" }));
    setStatus("idle");
    setErrors({});
    setServerMsg("");
  }, [tab]);

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email address.";
    if (!form.message.trim()) errs.message = "Message is required.";
    else if (form.message.trim().length < 10)
      errs.message = "Message must be at least 10 characters.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim() || undefined,
          category:
            tab === "feedback"
              ? `App Feedback${form.rating > 0 ? ` (${form.rating}/5 stars)` : ""}`
              : form.category,
          message: form.message.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setServerMsg(data.error || "Something went wrong. Please try again.");
      } else {
        setStatus("success");
        setForm({
          name: "",
          email: "",
          subject: "",
          category:
            tab === "feedback" ? "App Feedback" : tab === "help" ? "Support Request" : "General Inquiry",
          message: "",
          rating: 0,
        });
      }
    } catch {
      setStatus("error");
      setServerMsg("Network error. Please check your connection.");
    }
  }

  const contactCategories = [
    "General Inquiry",
    "Business Partnership",
    "Media & Press",
    "Other",
  ];
  const helpCategories = [
    "Support Request",
    "Bug Report",
    "Account Issue",
    "Feature Request",
  ];

  const categories = tab === "feedback" ? [] : tab === "help" ? helpCategories : contactCategories;

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-gold/[0.05] blur-[100px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/25 text-gold text-xs font-semibold uppercase tracking-widest mb-6">
            We&apos;re here to help
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-4">
            Get in{" "}
            <span className="text-gradient-gold">Touch</span>
          </h1>
          <p className="text-white/50 text-lg max-w-lg mx-auto">
            Send us a message, share feedback, or browse our Help Center.
            We typically respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Tab bar */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 mb-10">
        <div className="flex gap-2 bg-white/[0.03] border border-white/[0.07] rounded-2xl p-1.5">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
                tab === t.id
                  ? "bg-gold text-black shadow-lg"
                  : "text-white/50 hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              {t.icon}
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-24">
        {/* ── Help Center FAQ ─────────────────────────────── */}
        {tab === "help" && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3 mb-12">
              {FAQ.map((item) => (
                <FAQItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
            <div className="border-t border-white/[0.06] pt-10">
              <h3 className="text-xl font-bold text-white mb-2">
                Still need help?
              </h3>
              <p className="text-white/50 text-sm mb-8">
                Can&apos;t find what you&apos;re looking for? Send us a message and we&apos;ll get back to you.
              </p>
            </div>
          </div>
        )}

        {/* ── Shared Form ─────────────────────────────────── */}
        <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 sm:p-8">
          {/* Tab-specific header */}
          {tab === "contact" && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-1">Send us a message</h2>
              <p className="text-white/45 text-sm">We read every message and respond within 24 hours.</p>
            </div>
          )}
          {tab === "feedback" && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-1">Share your feedback</h2>
              <p className="text-white/45 text-sm">Your feedback shapes the next version of Go Qatar.</p>
            </div>
          )}
          {tab === "help" && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-1">Contact Support</h2>
              <p className="text-white/45 text-sm">Describe your issue and we&apos;ll help you resolve it.</p>
            </div>
          )}

          {status === "success" ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center mx-auto mb-5">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#C9A84C">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Message sent!</h3>
              <p className="text-white/50 text-sm mb-6">
                We&apos;ve received your message and will get back to you at{" "}
                <span className="text-white/70">{form.email || "your email"}</span> within 24 hours.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="px-6 py-2.5 bg-white/[0.06] border border-white/10 rounded-xl text-white/70 text-sm hover:bg-white/[0.09] transition-all"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Name + Email row */}
              <div className="grid sm:grid-cols-2 gap-5">
                <FormField label="Your Name *" error={errors.name}>
                  <input
                    type="text"
                    placeholder="Ahmed Al-Rashid"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass}
                    maxLength={80}
                  />
                </FormField>
                <FormField label="Email Address *" error={errors.email}>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClass}
                    maxLength={120}
                  />
                </FormField>
              </div>

              {/* Rating (feedback tab only) */}
              {tab === "feedback" && (
                <FormField label="How would you rate the app?">
                  <div className="flex items-center gap-2 py-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setForm({ ...form, rating: star })}
                        className="transition-transform hover:scale-110"
                      >
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill={star <= form.rating ? "#C9A84C" : "rgba(255,255,255,0.15)"}
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                        </svg>
                      </button>
                    ))}
                    {form.rating > 0 && (
                      <span className="text-white/40 text-sm ml-2">
                        {["", "Poor", "Fair", "Good", "Great", "Excellent"][form.rating]}
                      </span>
                    )}
                  </div>
                </FormField>
              )}

              {/* Category (contact + help only) */}
              {categories.length > 0 && (
                <FormField label="Category">
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className={`${inputClass} cursor-pointer`}
                  >
                    {categories.map((c) => (
                      <option key={c} value={c} className="bg-[#1a1a1a] text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                </FormField>
              )}

              {/* Subject */}
              <FormField label="Subject">
                <input
                  type="text"
                  placeholder={
                    tab === "feedback"
                      ? "e.g. Map loading issue, Missing feature..."
                      : tab === "help"
                      ? "e.g. Cannot find my address..."
                      : "e.g. Partnership inquiry..."
                  }
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className={inputClass}
                  maxLength={120}
                />
              </FormField>

              {/* Message */}
              <FormField label="Message *" error={errors.message}>
                <textarea
                  rows={6}
                  placeholder={
                    tab === "feedback"
                      ? "Tell us what you love, what could be better, or any ideas you'd like to see..."
                      : tab === "help"
                      ? "Describe your issue in detail. Include what you tried and what happened..."
                      : "Write your message here..."
                  }
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputClass} resize-none`}
                  maxLength={2000}
                />
                <div className="text-right text-white/20 text-xs mt-1">
                  {form.message.length}/2000
                </div>
              </FormField>

              {/* Server error */}
              {status === "error" && serverMsg && (
                <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#f87171" className="flex-shrink-0 mt-0.5">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                  <p className="text-red-400 text-sm">{serverMsg}</p>
                </div>
              )}

              {/* Rate limit notice */}
              <p className="text-white/25 text-xs">
                To prevent spam, you can send up to 3 messages per hour.
              </p>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3.5 bg-gold text-black font-bold rounded-xl hover:bg-gold-light transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <>
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="rgba(0,0,0,0.3)" strokeWidth="3"/>
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="black" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    Sending...
                  </>
                ) : tab === "feedback" ? (
                  "Submit Feedback"
                ) : tab === "help" ? (
                  "Send Support Request"
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          )}
        </div>

        {/* Direct contact info */}
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <a
            href="mailto:help.goqatar@gmail.com"
            className="flex items-center gap-4 p-4 bg-white/[0.03] border border-white/[0.07] rounded-xl hover:border-gold/25 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#C9A84C">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
            <div>
              <p className="text-white/40 text-xs mb-0.5">Email directly</p>
              <p className="text-white text-sm font-medium group-hover:text-gold transition-colors">
                help.goqatar@gmail.com
              </p>
            </div>
          </a>
          <div className="flex items-center gap-4 p-4 bg-white/[0.03] border border-white/[0.07] rounded-xl">
            <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
            </div>
            <div>
              <p className="text-white/40 text-xs mb-0.5">Response time</p>
              <p className="text-white text-sm font-medium">Within 24 hours</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

/* ── FAQ accordion item ─────────────────────────────────────── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/[0.07] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/[0.03] transition-colors"
      >
        <span className="text-white font-medium text-sm pr-4">{q}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="rgba(255,255,255,0.4)"
          className={`flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M7 10l5 5 5-5z"/>
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-4 text-white/55 text-sm leading-relaxed border-t border-white/[0.06]">
          <div className="pt-3">{a}</div>
        </div>
      )}
    </div>
  );
}

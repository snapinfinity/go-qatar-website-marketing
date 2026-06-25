"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimateIn, { StaggerContainer, StaggerItem } from "@/components/ui/AnimateIn";

type Status = "idle" | "loading" | "success" | "error";

const USE_CASES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
      </svg>
    ),
    title: "Delivery Routing",
    desc: "Resolve Qatar Zone-Street-Building addresses to GPS coordinates for last-mile delivery fleets.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    ),
    title: "Address Validation",
    desc: "Validate and standardize customer addresses at checkout — reduce failed deliveries instantly.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
      </svg>
    ),
    title: "E-commerce Integration",
    desc: "Embed Qatar address lookup directly into your checkout flow — no manual address typing.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
      </svg>
    ),
    title: "Field Service Apps",
    desc: "Power technician dispatch and on-site service scheduling with precise Qatar address resolution.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
      </svg>
    ),
    title: "Appointment Booking",
    desc: "Let customers book home visits using their Qatar address — clinics, maintenance, and more.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
      </svg>
    ),
    title: "Multi-tenant Platforms",
    desc: "Add Qatar address intelligence to your SaaS platform — real estate, logistics, and government tools.",
  },
];

const inputClass =
  "w-full bg-[#161616] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all duration-200";

export default function BusinessAPISection() {
  const [form, setForm] = useState({
    company: "",
    name: "",
    email: "",
    useCase: "",
    volume: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState("");

  function validate() {
    const e: Record<string, string> = {};
    if (!form.company.trim()) e.company = "Company name is required.";
    if (!form.name.trim()) e.name = "Your name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email.";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "Please describe your use case (min 10 chars).";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStatus("loading");

    const body = {
      name: form.name.trim(),
      email: form.email.trim(),
      category: "Business API Inquiry",
      subject: `API Inquiry — ${form.company.trim()}`,
      message: [
        `Company: ${form.company.trim()}`,
        form.useCase ? `Use case: ${form.useCase}` : null,
        form.volume ? `Expected volume: ${form.volume}` : null,
        "",
        form.message.trim(),
      ]
        .filter((l) => l !== null)
        .join("\n"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setServerMsg(data.error || "Something went wrong.");
      } else {
        setStatus("success");
      }
    } catch {
      setStatus("error");
      setServerMsg("Network error — please try again.");
    }
  }

  return (
    <section className="py-24 relative overflow-hidden" id="business-api">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-gold/[0.04] blur-[140px] -translate-y-1/2" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <AnimateIn className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/25 text-gold text-xs font-semibold uppercase tracking-widest mb-4">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
            </svg>
            Go Qatar for Business
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Need the Go Qatar API
            <br />
            <span className="text-gradient-gold">for your business?</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            Integrate Qatar&apos;s most accurate Zone-Street-Building address resolution
            directly into your platform — delivery routing, checkout validation, field
            service dispatch, and more.
          </p>
        </AnimateIn>

        {/* Use case tiles */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16" staggerMs={70}>
          {USE_CASES.map((uc) => (
            <StaggerItem key={uc.title}>
            <motion.div
              whileHover={{ y: -3, transition: { duration: 0.18 } }}
              className="group flex items-start gap-4 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-gold/20 hover:bg-white/[0.04] transition-colors duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 text-gold group-hover:bg-gold/15 transition-colors">
                {uc.icon}
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm mb-1">{uc.title}</h4>
                <p className="text-white/45 text-xs leading-relaxed">{uc.desc}</p>
              </div>
            </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Form + Info grid */}
        <AnimateIn delay={80} className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Left — Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-3">What you get</h3>
              <ul className="space-y-3">
                {[
                  "Zone / Street / Building → GPS coordinates",
                  "Batch geocoding for large address lists",
                  "Webhook support for real-time events",
                  "Qatar-specific address autocomplete",
                  "Dedicated support & SLA agreement",
                  "White-label options available",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-white/60 text-sm">
                    <div className="w-4 h-4 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="#C9A84C">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-gold/[0.06] border border-gold/15">
              <p className="text-gold font-semibold text-sm mb-1">Custom pricing</p>
              <p className="text-white/50 text-xs leading-relaxed">
                Pricing is based on API call volume and features required. Fill the form and we&apos;ll send you a tailored quote within 1 business day.
              </p>
            </div>

            <div className="flex items-center gap-3 text-white/40 text-xs">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
              </svg>
              Your data is never shared with third parties
            </div>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-3 bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 sm:p-8">
            {status === "success" ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center mx-auto mb-5">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#C9A84C">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Inquiry received!</h3>
                <p className="text-white/50 text-sm max-w-xs mx-auto">
                  We&apos;ll review your requirements and get back to you at{" "}
                  <span className="text-white/70">{form.email}</span> within 1 business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <h3 className="text-xl font-bold text-white mb-1">Request API Access</h3>
                <p className="text-white/40 text-sm mb-6">Tell us about your project and we&apos;ll get back to you with a custom proposal.</p>

                {/* Company + Name */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-white/60 mb-1.5">Company Name *</label>
                    <input
                      type="text"
                      placeholder="Acme Logistics LLC"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className={inputClass}
                      maxLength={80}
                    />
                    {errors.company && <p className="text-red-400 text-xs mt-1">{errors.company}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/60 mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      placeholder="Mohammed Al-Thani"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputClass}
                      maxLength={80}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-medium text-white/60 mb-1.5">Business Email *</label>
                  <input
                    type="email"
                    placeholder="you@yourcompany.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClass}
                    maxLength={120}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Use case + Volume */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-white/60 mb-1.5">Primary Use Case</label>
                    <select
                      value={form.useCase}
                      onChange={(e) => setForm({ ...form, useCase: e.target.value })}
                      className={`${inputClass} cursor-pointer`}
                    >
                      <option value="" className="bg-[#161616]">Select one...</option>
                      <option className="bg-[#161616]">Delivery Routing</option>
                      <option className="bg-[#161616]">Address Validation</option>
                      <option className="bg-[#161616]">E-commerce Checkout</option>
                      <option className="bg-[#161616]">Field Service / Dispatch</option>
                      <option className="bg-[#161616]">Appointment Booking</option>
                      <option className="bg-[#161616]">Real Estate Platform</option>
                      <option className="bg-[#161616]">Government / Public Sector</option>
                      <option className="bg-[#161616]">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/60 mb-1.5">Expected Monthly Volume</label>
                    <select
                      value={form.volume}
                      onChange={(e) => setForm({ ...form, volume: e.target.value })}
                      className={`${inputClass} cursor-pointer`}
                    >
                      <option value="" className="bg-[#161616]">Select range...</option>
                      <option className="bg-[#161616]">Under 1,000 requests</option>
                      <option className="bg-[#161616]">1,000 – 10,000 requests</option>
                      <option className="bg-[#161616]">10,000 – 100,000 requests</option>
                      <option className="bg-[#161616]">100,000+ requests</option>
                      <option className="bg-[#161616]">Not sure yet</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-medium text-white/60 mb-1.5">Describe your project *</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what you're building — e.g. we run a food delivery platform in Qatar and need to resolve customer addresses at checkout and optimise driver routing..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputClass} resize-none`}
                    maxLength={1500}
                  />
                  <div className="flex items-center justify-between mt-1">
                    {errors.message
                      ? <p className="text-red-400 text-xs">{errors.message}</p>
                      : <span />}
                    <span className="text-white/20 text-xs">{form.message.length}/1500</span>
                  </div>
                </div>

                {/* Server error */}
                {status === "error" && serverMsg && (
                  <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#f87171" className="flex-shrink-0 mt-0.5">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>
                    <p className="text-red-400 text-sm">{serverMsg}</p>
                  </div>
                )}

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
                  ) : (
                    "Request API Access"
                  )}
                </button>
              </form>
            )}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions — Go Qatar",
  description: "Read the Terms and Conditions governing your use of the Go Qatar app.",
};

const sections = [
  {
    number: "01",
    title: "Acceptance of Terms",
    content:
      "By accessing and using GO-QATAR, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Use License",
    content:
      "Permission is granted to temporarily use GO-QATAR for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title. Under this license you may not: modify or copy the materials; use the materials for any commercial purpose; attempt to decompile or reverse engineer any software contained in the app.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l6 2.67V11c0 3.88-2.62 7.5-6 8.93C8.62 18.5 6 14.88 6 11V7.67L12 5zm-1 3v5h2V8h-2zm0 6v2h2v-2h-2z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "User Account",
    content:
      "You are responsible for maintaining the security of your Google account used to access GO-QATAR. You agree to accept responsibility for all activities that occur under your account. If you suspect unauthorized access, please notify us immediately at help.goqatar@gmail.com.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Prohibited Uses",
    content:
      "You may not use our service for any illegal or unauthorized purpose. You must not, in the use of the Service, violate any laws in your jurisdiction. Prohibited activities include: scraping or automated data collection, attempting to breach security measures, impersonating other users, or interfering with the proper working of the service.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Service Modifications",
    content:
      "We reserve the right to modify or discontinue, temporarily or permanently, the service with or without notice. We shall not be liable for any modification, suspension, or discontinuance of the service. We may also update the app to improve features and fix issues at any time.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
      </svg>
    ),
  },
  {
    number: "06",
    title: "Limitation of Liability",
    content:
      "In no event shall GO-QATAR be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of (or inability to access or use) the service.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
    ),
  },
  {
    number: "07",
    title: "Governing Law",
    content:
      "These Terms shall be governed and construed in accordance with the laws of Qatar, without regard to its conflict of law provisions. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of Qatar.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
      </svg>
    ),
  },
  {
    number: "08",
    title: "Contact Information",
    content:
      "If you have any questions about these Terms, please contact us at help.goqatar@gmail.com. We aim to respond to all inquiries within 48 business hours.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-gold/[0.05] blur-[100px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/25 text-gold text-xs font-semibold uppercase tracking-widest mb-6">
            <div className="w-4 h-4 rounded-sm overflow-hidden flex-shrink-0 border border-white/20"><Image src="/logos/app_icon.svg" alt="" width={16} height={16} className="w-full h-full" /></div>
            Legal
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Terms &amp; <span className="text-gradient-gold">Conditions</span>
          </h1>
          <p className="text-white/50 text-lg leading-relaxed mb-4">
            Please read these terms carefully before using Go Qatar. By using the
            app, you agree to these terms.
          </p>
          <div className="inline-flex items-center gap-2 text-white/30 text-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
            </svg>
            Last updated: June 2025
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Intro card */}
          <div className="p-6 bg-gold/[0.06] border border-gold/20 rounded-2xl mb-10">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center text-gold shrink-0 mt-0.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                These Terms and Conditions govern your use of the{" "}
                <span className="text-white font-semibold">Go Qatar</span> mobile application.
                By downloading or using the app, you agree to be bound by these terms. If you
                disagree with any part of the terms, you may not access the service.
              </p>
            </div>
          </div>

          {/* Quick nav */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-10">
            {["Acceptance", "License", "Account", "Liability"].map((item) => (
              <div
                key={item}
                className="px-3 py-2 bg-white/[0.03] border border-white/[0.06] rounded-xl text-center text-white/40 text-xs font-medium"
              >
                {item}
              </div>
            ))}
          </div>

          {/* Sections */}
          <div className="space-y-4">
            {sections.map((section) => (
              <div
                key={section.number}
                className="group p-6 bg-white/[0.03] border border-white/[0.06] rounded-2xl hover:border-gold/20 hover:bg-white/[0.05] transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex items-center gap-3">
                    <span className="text-gold/30 text-xs font-black tracking-widest">{section.number}</span>
                    <div className="w-9 h-9 rounded-xl bg-white/[0.05] group-hover:bg-gold/10 group-hover:text-gold text-white/40 flex items-center justify-center transition-all duration-200">
                      {section.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-white font-semibold text-base mb-2">{section.title}</h2>
                    <p className="text-white/50 text-sm leading-relaxed">{section.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Links to other legal pages */}
          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            <a
              href="/privacy-policy"
              className="p-5 bg-white/[0.03] border border-white/[0.06] rounded-2xl hover:border-gold/20 transition-all duration-200 group flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] group-hover:bg-gold/10 group-hover:text-gold text-white/40 flex items-center justify-center transition-all duration-200">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                </svg>
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Privacy Policy</div>
                <div className="text-white/40 text-xs">How we handle your data</div>
              </div>
            </a>
            <div className="p-5 bg-white/[0.03] border border-white/[0.06] rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] text-white/40 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Contact Support</div>
                <div className="text-gold/70 text-xs">help.goqatar@gmail.com</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

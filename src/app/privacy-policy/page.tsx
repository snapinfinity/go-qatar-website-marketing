import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const PRIVACY_URL = "https://goqatar.app/privacy-policy";

export const metadata: Metadata = {
  title: "Privacy Policy — Go Qatar",
  description: "Learn how Go Qatar collects, uses, and protects your personal information.",
  alternates: {
    canonical: PRIVACY_URL,
  },
  openGraph: {
    title: "Privacy Policy — Go Qatar",
    description: "Learn how Go Qatar collects, uses, and protects your personal information.",
    url: PRIVACY_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://goqatar.app/privacy-policy/#webpage",
      url: PRIVACY_URL,
      name: "Privacy Policy — Go Qatar",
      isPartOf: { "@id": "https://goqatar.app/#website" },
      about: { "@id": "https://goqatar.app/#organization" },
      dateModified: "2025-06",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://goqatar.app" },
        { "@type": "ListItem", position: 2, name: "Privacy Policy", item: PRIVACY_URL },
      ],
    },
  ],
};

const sections = [
  {
    number: "01",
    title: "Information We Collect",
    content:
      "We collect information provided through Google Sign-In, such as your name, email address, and profile picture. We also store your favorite locations and recent search history locally on your device to provide a personalized experience.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "How We Use Your Information",
    content:
      "We use the information we collect to provide, maintain, and improve our services, to process transactions, send you technical notices and support messages, and to respond to your comments and questions.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Information Sharing",
    content:
      "We do not share your personal information with third parties except as described in this policy. We may share information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Data Security",
    content:
      "We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. Your data is encrypted in transit and stored securely.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Your Rights",
    content:
      "You have the right to access or delete your personal information at any time. You can remove your saved favorites and recent searches directly within the app. For account-related data, you may contact us at help.goqatar@gmail.com.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
      </svg>
    ),
  },
  {
    number: "06",
    title: "Changes to This Policy",
    content:
      "We may change this privacy policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice through the app.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1-2.73 2.71-2.73 7.08 0 9.79s7.15 2.71 9.88 0C18.32 15.65 19 14.08 19 12.1h2c0 1.98-.88 4.55-2.64 6.29-3.51 3.48-9.21 3.48-12.72 0-3.5-3.47-3.53-9.11-.02-12.58s9.14-3.47 12.65 0L21 3v7.12z" />
      </svg>
    ),
  },
  {
    number: "07",
    title: "Contact Us",
    content:
      "If you have any questions about this privacy policy, please contact us at help.goqatar@gmail.com. We will respond to your inquiry within 24 hours.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
            Privacy <span className="text-gradient-gold">Policy</span>
          </h1>
          <p className="text-white/50 text-lg leading-relaxed mb-4">
            We value your privacy and are committed to being transparent about
            how we handle your data.
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
                This Privacy Policy describes how <span className="text-white font-semibold">Go Qatar</span> collects,
                uses, and shares information about you when you use our mobile application. By using Go Qatar,
                you agree to the collection and use of information in accordance with this policy.
              </p>
            </div>
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

          {/* Contact card */}
          <div className="mt-10 p-6 bg-white/[0.03] border border-white/[0.06] rounded-2xl text-center">
            <p className="text-white/40 text-sm mb-2">Questions about this policy?</p>
            <a
              href="mailto:help.goqatar@gmail.com"
              className="text-gold font-semibold hover:text-gold-light transition-colors text-sm"
            >
              help.goqatar@gmail.com
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

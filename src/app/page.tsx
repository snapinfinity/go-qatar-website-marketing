import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import StatsSection from "@/components/sections/StatsSection";
import DownloadSection from "@/components/sections/DownloadSection";

const NewsSection = dynamic(() => import("@/components/sections/NewsSection"));
const AppScreensSection = dynamic(() => import("@/components/sections/AppScreensSection"));
const BusinessAPISection = dynamic(() => import("@/components/sections/BusinessAPISection"));

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://goqatar.app/#organization",
      name: "Go Qatar",
      url: "https://goqatar.app",
      logo: "https://goqatar.app/icon-192.png",
      description:
        "Go Qatar is a free mobile app for living in and getting around Qatar: find any building from its blue address plate, ride the Doha Metro, read Qatar news and convert Qatari Riyal.",
      sameAs: [
        "https://apps.apple.com/us/app/go-qatar/id6756709380",
        "https://play.google.com/store/apps/details?id=com.snapinfinity.goqatar",
        // Verified 2026-08-20: @goqatar.app is titled "Go Qatar" and links to
        // App Store id6756709380 — the same listing above — so it is the same
        // entity, not a lookalike.
        "https://www.instagram.com/goqatar.app/",
      ],
      parentOrganization: {
        "@type": "Organization",
        name: "Snap Infinity",
        url: "https://snapinfinity.com",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "help.goqatar@gmail.com",
        contactType: "customer support",
        areaServed: "QA",
        availableLanguage: ["English"],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://goqatar.app/#website",
      url: "https://goqatar.app",
      name: "Go Qatar",
      description:
        "Find any building in Qatar from its blue plate, plan Doha Metro journeys, read Qatar news and convert QAR — free on iOS and Android.",
      inLanguage: "en-US",
      publisher: { "@id": "https://goqatar.app/#organization" },
    },
    {
      "@type": "MobileApplication",
      "@id": "https://goqatar.app/#software",
      name: "Go Qatar",
      description:
        "Find any building in Qatar from its blue plate, plan Doha Metro journeys, read Qatar news and convert QAR — free on iOS and Android.",
      url: "https://goqatar.app",
      image: "https://goqatar.app/og-image.png",
      applicationCategory: "TravelApplication",
      operatingSystem: ["IOS", "ANDROID"],
      author: { "@id": "https://goqatar.app/#organization" },
      publisher: { "@id": "https://goqatar.app/#organization" },
      offers: [
        {
          "@type": "Offer",
          url: "https://apps.apple.com/us/app/go-qatar/id6756709380",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          url: "https://play.google.com/store/apps/details?id=com.snapinfinity.goqatar",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <AppScreensSection />
      <HowItWorksSection />
      <NewsSection />
      <BusinessAPISection />
      <DownloadSection />
      <Footer />
    </main>
  );
}

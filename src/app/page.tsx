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
const UpcomingSection = dynamic(() => import("@/components/sections/UpcomingSection"));
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
        "Go Qatar is a mobile navigation app for finding any address in Qatar using the official Zone, Street & Building number system.",
      sameAs: [
        "https://apps.apple.com/us/app/go-qatar/id6756709380",
        "https://play.google.com/store/apps/details?id=com.snapinfinity.goqatar",
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
        "Navigate Qatar like never before. Find any address by Zone, Street & Building number. Get Qatar news, save favourite locations, and explore your city effortlessly.",
      inLanguage: "en-US",
      publisher: { "@id": "https://goqatar.app/#organization" },
    },
    {
      "@type": "MobileApplication",
      "@id": "https://goqatar.app/#software",
      name: "Go Qatar",
      description:
        "Navigate Qatar like never before. Find any address by Zone, Street & Building number. Get Qatar news, save favourite locations, and explore your city effortlessly.",
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
      <UpcomingSection />
      <BusinessAPISection />
      <DownloadSection />
      <Footer />
    </main>
  );
}

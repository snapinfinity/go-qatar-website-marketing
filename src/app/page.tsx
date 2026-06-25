import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import StatsSection from "@/components/sections/StatsSection";
import DownloadSection from "@/components/sections/DownloadSection";
import NewsSection from "@/components/sections/NewsSection";
import AppScreensSection from "@/components/sections/AppScreensSection";
import UpcomingSection from "@/components/sections/UpcomingSection";
import BusinessAPISection from "@/components/sections/BusinessAPISection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
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

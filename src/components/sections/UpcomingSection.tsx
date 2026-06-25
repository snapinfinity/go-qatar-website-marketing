"use client";

import { motion } from "framer-motion";
import AnimateIn, { StaggerContainer, StaggerItem } from "@/components/ui/AnimateIn";

const upcomingFeatures = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/>
      </svg>
    ),
    color: "#3B82F6",
    glow: "rgba(59,130,246,0.15)",
    title: "Flight Booking",
    subtitle: "Cheapest fares in Qatar",
    description:
      "Search and book the cheapest flights from Hamad International Airport. Real-time fare comparison across all major airlines.",
    perks: ["Live price comparison", "Lowest fare guarantee", "Instant e-ticket", "All airlines covered"],
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    color: "#C9A84C",
    glow: "rgba(201,168,76,0.15)",
    title: "Hotel Booking",
    subtitle: "Best deals across Doha",
    description:
      "Find and reserve hotels at the best prices — from luxury stays in West Bay to budget picks near Souq Waqif.",
    perks: ["Best price match", "Instant confirmation", "Free cancellation options", "Luxury to budget"],
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/>
        <rect x="9" y="11" width="14" height="10" rx="2"/>
        <circle cx="12" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      </svg>
    ),
    color: "#10B981",
    glow: "rgba(16,185,129,0.15)",
    title: "Cab Booking",
    subtitle: "Cheapest ride in the city",
    description:
      "Book the most affordable cab in Qatar — no haggling, no surprises. Fixed price upfront using Zone, Street & Building.",
    perks: ["Fixed price upfront", "Cheapest cab guarantee", "Track your ride live", "Zone-based pickup"],
  },
];

export default function UpcomingSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full bg-gold/[0.03] blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <AnimateIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-white/50 text-xs font-semibold uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            Upcoming Features
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Go Qatar is getting{" "}
            <span className="text-gradient-gold">even bigger</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            We&apos;re building an all-in-one Qatar super-app. Flights, hotels,
            and cabs — all at the cheapest prices, all in one place.
          </p>
        </AnimateIn>

        {/* Cards */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerMs={100}>
          {upcomingFeatures.map((feat) => (
            <StaggerItem key={feat.title}>
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.22, ease: "easeOut" } }}
                className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.03] p-7 hover:border-white/[0.14] transition-all duration-300 overflow-hidden h-full"
              >
                {/* Glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at 30% 20%, ${feat.glow} 0%, transparent 70%)` }}
                />

                {/* Header row */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: feat.glow, color: feat.color, border: `1px solid ${feat.color}22` }}
                  >
                    {feat.icon}
                  </div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ color: feat.color, background: feat.glow, border: `1px solid ${feat.color}33` }}
                  >
                    Coming Soon
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1">{feat.title}</h3>
                <p className="text-sm font-semibold mb-3" style={{ color: feat.color }}>{feat.subtitle}</p>
                <p className="text-white/50 text-sm leading-relaxed mb-6">{feat.description}</p>

                <ul className="space-y-2">
                  {feat.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2.5 text-white/60 text-sm">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: feat.glow, border: `1px solid ${feat.color}44` }}
                      >
                        <svg width="8" height="8" viewBox="0 0 24 24" fill={feat.color}>
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      </div>
                      {perk}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom banner */}
        <AnimateIn delay={200} className="mt-12">
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-1">All in one app</p>
              <h4 className="text-lg sm:text-xl font-bold text-white">
                Navigate · Read · Save · Book — all from Go Qatar
              </h4>
            </div>
            <div className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-white/60 text-sm font-medium">Notify me when ready</span>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

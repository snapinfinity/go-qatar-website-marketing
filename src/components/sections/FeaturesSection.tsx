"use client";

import { motion } from "framer-motion";
import AnimateIn, { StaggerContainer, StaggerItem } from "@/components/ui/AnimateIn";

const features = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
    title: "Precision Address Search",
    description:
      "Find any location in Qatar using the official Zone, Street, and Building number system — fast, accurate, and built for Qatar's unique addressing.",
    hero: true,
    color: "from-gold/10 to-gold/5",
    border: "border-gold/15",
    iconColor: "text-gold",
    iconBg: "bg-gold/10",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" />
      </svg>
    ),
    title: "Live Google Maps",
    description: "Visualize every location on a live Google Map. Drop a pin and navigate with turn-by-turn directions.",
    color: "from-blue-500/10 to-blue-500/5",
    border: "border-blue-500/15",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    title: "Save Favourites",
    description: "Bookmark home, office, or any important spot. One-tap access — no re-typing needed.",
    color: "from-rose-500/10 to-rose-500/5",
    border: "border-rose-500/15",
    iconColor: "text-rose-400",
    iconBg: "bg-rose-500/10",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
      </svg>
    ),
    title: "Search History",
    description: "Recent searches always one tap away. Instantly revisit any location without searching again.",
    color: "from-purple-500/10 to-purple-500/5",
    border: "border-purple-500/15",
    iconColor: "text-purple-400",
    iconBg: "bg-purple-500/10",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z" />
      </svg>
    ),
    title: "Qatar News Feed",
    description: "Latest Qatar news in List, Grid, or Reel mode. Filter by category, browse your way.",
    color: "from-amber-500/10 to-amber-500/5",
    border: "border-amber-500/15",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
      </svg>
    ),
    title: "Secure Sign-In",
    description: "Sign in with Google or Apple. Your favorites and history sync securely across all devices.",
    color: "from-emerald-500/10 to-emerald-500/5",
    border: "border-emerald-500/15",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
  },
];

const hero = features[0];
const rest = features.slice(1);

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <AnimateIn className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/25 text-gold text-xs font-semibold uppercase tracking-widest mb-4">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            Features
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Everything you need to
            <br />
            <span className="text-gradient-gold">navigate Qatar</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            A complete toolkit for finding, saving, and exploring any address in Qatar — all in one beautifully designed app.
          </p>
        </AnimateIn>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">

          {/* Hero card — spans 2 cols on lg */}
          <AnimateIn delay={0} className="sm:col-span-2 lg:col-span-2 lg:row-span-1">
            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
              className={`group relative h-full min-h-[200px] sm:min-h-[220px] rounded-2xl bg-gradient-to-br ${hero.color} border ${hero.border} p-7 overflow-hidden flex flex-col justify-between`}
            >
              {/* Animated background glow */}
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-gold/[0.08] rounded-full blur-[60px] pointer-events-none transition-all duration-500 group-hover:scale-125" />

              <div className="relative z-10 flex items-start gap-5">
                <div className={`w-14 h-14 rounded-2xl ${hero.iconBg} border border-gold/20 flex items-center justify-center flex-shrink-0 ${hero.iconColor}`}>
                  {hero.icon}
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-gold/15 border border-gold/25 text-gold text-[10px] font-bold uppercase tracking-widest mb-2">
                    <span className="w-1 h-1 rounded-full bg-gold" />
                    Core Feature
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{hero.title}</h3>
                  <p className="text-white/55 text-sm sm:text-base leading-relaxed">{hero.description}</p>
                </div>
              </div>

              {/* Address format preview */}
              <div className="relative z-10 mt-6 flex items-center gap-3 flex-wrap">
                {[
                  { label: "Zone", value: "25", color: "text-blue-400" },
                  { label: "Street", value: "330", color: "text-green-400" },
                  { label: "Building", value: "12", color: "text-gold" },
                ].map((part, i) => (
                  <div key={part.label} className="flex items-center gap-3">
                    <div className="bg-black/20 rounded-xl px-3 py-1.5 border border-white/[0.06]">
                      <div className={`text-lg font-black ${part.color}`}>{part.value}</div>
                      <div className="text-white/30 text-[9px] uppercase tracking-wider">{part.label}</div>
                    </div>
                    {i < 2 && <span className="text-white/20 text-lg">/</span>}
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimateIn>

          {/* First of the rest — right column, top */}
          <AnimateIn delay={80}>
            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
              className={`group relative rounded-2xl bg-gradient-to-br ${rest[0].color} border ${rest[0].border} p-6 overflow-hidden`}
            >
              <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full blur-[50px] pointer-events-none transition-all duration-500 group-hover:scale-125"
                style={{ background: "rgba(59,130,246,0.1)" }} />
              <div className={`w-11 h-11 rounded-xl ${rest[0].iconBg} border border-blue-500/20 flex items-center justify-center ${rest[0].iconColor} mb-4`}>
                {rest[0].icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-1.5">{rest[0].title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{rest[0].description}</p>
            </motion.div>
          </AnimateIn>

          {/* Bottom row — 3 equal cards */}
          <StaggerContainer className="sm:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4" staggerMs={80}>
            {rest.slice(1).map((feat) => (
              <StaggerItem key={feat.title}>
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
                  className={`group relative rounded-2xl bg-gradient-to-br ${feat.color} border ${feat.border} p-6 h-full overflow-hidden`}
                >
                  <div className={`w-10 h-10 rounded-xl ${feat.iconBg} flex items-center justify-center ${feat.iconColor} mb-4`}>
                    {feat.icon}
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5">{feat.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{feat.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}

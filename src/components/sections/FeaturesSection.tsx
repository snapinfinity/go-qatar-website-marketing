"use client";

import { m } from "framer-motion";
import AnimateIn, { StaggerContainer, StaggerItem } from "@/components/ui/AnimateIn";

const features = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
    title: "Blueboard",
    description:
      "Read any blue plate. Type the three numbers and get the exact building on the map — then open it in Apple Maps, Google Maps or Waze.",
    color: "from-brand/25 to-brand/5",
    border: "border-brand-light/15",
    iconColor: "text-brand-light",
    iconBg: "bg-brand/30",
    glow: "rgba(138,21,56,0.25)",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2.23l2-2H14l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm3.5-7H6V6h5v4zm2 0V6h5v4h-5zm3.5 7c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
      </svg>
    ),
    title: "Doha Metro",
    description:
      "All 3 lines and 37 stations, with a journey planner, your nearest station, and a buzz one stop before yours. Works with no signal.",
    color: "from-emerald-500/10 to-emerald-500/5",
    border: "border-emerald-500/15",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
    glow: "rgba(31,122,77,0.18)",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z" />
      </svg>
    ),
    title: "Qatar News",
    description: "Qatar's latest from Al Jazeera, Gulf Times, Doha News and more, across nine categories.",
    color: "from-sky-500/10 to-sky-500/5",
    border: "border-sky-500/15",
    iconColor: "text-sky-400",
    iconBg: "bg-sky-500/10",
    glow: "rgba(14,165,233,0.12)",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
      </svg>
    ),
    title: "Currency Converter",
    description: "Live QAR exchange rates for 160+ currencies.",
    color: "from-violet-500/10 to-violet-500/5",
    border: "border-violet-500/15",
    iconColor: "text-violet-400",
    iconBg: "bg-violet-500/10",
    glow: "rgba(139,92,246,0.12)",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    title: "Favourites & Sign-in",
    description:
      "Sign in with Google or Apple to save places and sync them across devices — or continue as a guest.",
    color: "from-rose-500/10 to-rose-500/5",
    border: "border-rose-500/15",
    iconColor: "text-rose-400",
    iconBg: "bg-rose-500/10",
    glow: "rgba(244,63,94,0.12)",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
      </svg>
    ),
    title: "Suggestions & Feedback",
    description: "Suggest a feature and follow it from Submitted to In Review to Resolved.",
    color: "from-amber-500/10 to-amber-500/5",
    border: "border-amber-500/15",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10",
    glow: "rgba(245,158,11,0.12)",
  },
];

const hero = features[0];
const metro = features[1];
const rest = features.slice(2);

const metroLines = [
  { name: "Red", className: "bg-metro-red" },
  { name: "Green", className: "bg-metro-green" },
  { name: "Gold", className: "bg-metro-gold" },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/[0.08] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <AnimateIn className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/20 border border-brand-light/25 text-brand-light text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            Features
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            What you open
            <br />
            <span className="text-gradient-brand">Go Qatar for</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Addresses, metro, news and rates — in one app.
          </p>
        </AnimateIn>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">

          {/* Hero card — spans 2 cols on lg */}
          <AnimateIn delay={0} className="sm:col-span-2 lg:col-span-2 lg:row-span-1">
            <m.div
              whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
              className={`group relative h-full min-h-[200px] sm:min-h-[220px] rounded-2xl bg-gradient-to-br ${hero.color} border ${hero.border} p-7 overflow-hidden flex flex-col justify-between`}
            >
              {/* Animated background glow */}
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-brand/[0.2] rounded-full blur-[60px] pointer-events-none transition-all duration-500 group-hover:scale-125" />

              <div className="relative z-10 flex items-start gap-5">
                <div className={`w-14 h-14 rounded-2xl ${hero.iconBg} border border-brand-light/20 flex items-center justify-center flex-shrink-0 ${hero.iconColor}`}>
                  {hero.icon}
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-brand/30 border border-brand-light/25 text-brand-light text-[10px] font-bold uppercase tracking-widest mb-2">
                    <span className="w-1 h-1 rounded-full bg-brand-light" />
                    Core Feature
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{hero.title}</h3>
                  <p className="text-white/55 text-sm sm:text-base leading-relaxed">{hero.description}</p>
                </div>
              </div>

              {/* Blue plate preview */}
              <div className="relative z-10 mt-6 flex items-center gap-3 flex-wrap">
                {[
                  { label: "Zone", value: "25" },
                  { label: "Street", value: "330" },
                  { label: "Building", value: "12" },
                ].map((part, i) => (
                  <div key={part.label} className="flex items-center gap-3">
                    <div className="bg-plate rounded-xl px-3 py-1.5 border border-white/20 shadow-lg shadow-plate/20 text-center min-w-[64px]">
                      <div className="text-lg font-black text-white">{part.value}</div>
                      <div className="text-white/70 text-[9px] uppercase tracking-wider">{part.label}</div>
                    </div>
                    {i < 2 && <span className="text-white/20 text-lg">/</span>}
                  </div>
                ))}
              </div>
            </m.div>
          </AnimateIn>

          {/* Metro — right column, top */}
          <AnimateIn delay={80}>
            <m.div
              whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
              className={`group relative h-full rounded-2xl bg-gradient-to-br ${metro.color} border ${metro.border} p-6 overflow-hidden`}
            >
              <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full blur-[50px] pointer-events-none transition-all duration-500 group-hover:scale-125"
                style={{ background: metro.glow }} />
              <div className={`w-11 h-11 rounded-xl ${metro.iconBg} border border-emerald-500/20 flex items-center justify-center ${metro.iconColor} mb-4`}>
                {metro.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-1.5">{metro.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-4">{metro.description}</p>
              <div className="flex items-center gap-3">
                {metroLines.map((line) => (
                  <span key={line.name} className="flex items-center gap-1.5 text-white/50 text-xs">
                    <span className={`w-2.5 h-2.5 rounded-full ${line.className}`} />
                    {line.name}
                  </span>
                ))}
              </div>
            </m.div>
          </AnimateIn>

          {/* Bottom row — 4 equal cards */}
          <StaggerContainer className="sm:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" staggerMs={80}>
            {rest.map((feat) => (
              <StaggerItem key={feat.title}>
                <m.div
                  whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
                  className={`group relative rounded-2xl bg-gradient-to-br ${feat.color} border ${feat.border} p-6 h-full overflow-hidden`}
                >
                  <div className={`w-10 h-10 rounded-xl ${feat.iconBg} flex items-center justify-center ${feat.iconColor} mb-4`}>
                    {feat.icon}
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5">{feat.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{feat.description}</p>
                </m.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}

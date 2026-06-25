"use client";

import { motion } from "framer-motion";
import AnimateIn, { StaggerContainer, StaggerItem } from "@/components/ui/AnimateIn";

const steps = [
  {
    step: "01",
    title: "Enter Zone, Street & Building",
    description:
      "Type in Qatar's official address format — the unique Zone number, Street number, and Building number. Our smart sliders make it effortless.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Pinpoint on the Map",
    description:
      "Instantly see your location marked on a live Google Map. The map animates to your exact address — no confusion, no guessing.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Navigate or Save",
    description:
      "Open navigation in Google Maps or Waze with one tap, share the location, or save it to your favorites for instant future access.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
      </svg>
    ),
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimateIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-white/50 text-xs font-semibold uppercase tracking-widest mb-4">
            How It Works
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Find any address in
            <br />
            <span className="text-gradient-gold">3 simple steps</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Qatar uses a unique Zone-Street-Building addressing system. Go Qatar makes it second nature.
          </p>
        </AnimateIn>

        {/* Steps */}
        <StaggerContainer staggerMs={140}>
          <div className="grid sm:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <StaggerItem key={step.step}>
                <motion.div
                  className="group relative text-center"
                  whileHover="hover"
                >
                  {/* Icon bubble */}
                  <div className="relative inline-flex items-center justify-center mb-6">
                    <motion.div
                      variants={{ hover: { scale: 1.08, transition: { duration: 0.2, ease: "easeOut" } } }}
                      className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold/15 to-gold/5 border border-gold/20 flex items-center justify-center text-gold"
                    >
                      {step.icon}
                    </motion.div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gold flex items-center justify-center">
                      <span className="text-black text-[9px] font-black">{i + 1}</span>
                    </div>
                  </div>

                  <div className="text-gold/40 text-xs font-black tracking-[0.2em] mb-2">STEP {step.step}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        {/* Address format explainer */}
        <AnimateIn delay={200} className="mt-16">
          <div className="p-6 sm:p-8 bg-glass rounded-2xl border border-white/08 max-w-2xl mx-auto">
            <div className="text-center mb-5">
              <span className="text-white/40 text-xs uppercase tracking-widest font-semibold">Qatar Address Format</span>
            </div>
            <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
              {[
                { code: "Zone", value: "25", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
                { code: "Street", value: "330", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
                { code: "Building", value: "12", color: "text-gold", bg: "bg-gold/10", border: "border-gold/20" },
              ].map((part, i) => (
                <div key={part.code} className="flex items-center gap-4 sm:gap-6">
                  <div className={`text-center px-5 py-3 rounded-xl ${part.bg} border ${part.border}`}>
                    <div className={`text-3xl font-black ${part.color}`}>{part.value}</div>
                    <div className="text-white/35 text-xs mt-1">{part.code}</div>
                  </div>
                  {i < 2 && <div className="text-white/20 text-2xl font-light">/</div>}
                </div>
              ))}
            </div>
            <p className="text-center text-white/35 text-xs mt-5">
              Simply enter these 3 numbers and Go Qatar finds your exact location
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

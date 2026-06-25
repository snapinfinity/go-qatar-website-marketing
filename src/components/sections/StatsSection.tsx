"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "50+", label: "Zones Covered", sub: "All of Qatar" },
  { value: "2", label: "Platforms", sub: "iOS & Android" },
  { value: "Free", label: "To Download", sub: "No subscription" },
  { value: "Real-time", label: "Location Data", sub: "Powered by Google Maps" },
];

export default function StatsSection() {
  return (
    <section className="relative py-10 border-y border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-white/[0.06]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="text-center px-6 py-2"
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
              }}
            >
              <div className="text-3xl font-bold text-gradient-gold mb-1">{stat.value}</div>
              <div className="text-white font-medium text-sm mb-0.5">{stat.label}</div>
              <div className="text-white/35 text-xs">{stat.sub}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

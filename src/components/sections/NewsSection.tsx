"use client";

import { motion } from "framer-motion";
import AnimateIn, { StaggerContainer, StaggerItem } from "@/components/ui/AnimateIn";

const newsViewModes = [
  {
    name: "List View",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
      </svg>
    ),
    description: "Classic card layout with full article details",
    preview: [
      { title: "Qatar National Day Celebrations Begin Across Doha", category: "Events", time: "2h ago" },
      { title: "Lusail City Expansion Project Reaches New Milestone", category: "Development", time: "4h ago" },
      { title: "Qatar Airways Launches New European Route", category: "Travel", time: "6h ago" },
    ],
  },
  {
    name: "Grid View",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z" />
      </svg>
    ),
    description: "Masonry grid for visual browsing",
    preview: null,
  },
  {
    name: "Reel View",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z" />
      </svg>
    ),
    description: "TikTok-style full-screen swipeable feed",
    preview: null,
  },
];

const categories = ["All", "Events", "Development", "Travel", "Business", "Sports"];

export default function NewsSection() {
  return (
    <section id="news" className="py-24 relative overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-blue-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: content */}
          <AnimateIn from="left">
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-white/50 text-xs font-semibold uppercase tracking-widest">
              Qatar News
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Stay updated with
              <br />
              <span className="text-gradient-gold">Qatar&apos;s latest</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              Read curated Qatar news in the layout you love — swipe through
              immersive reels, browse a visual grid, or scan a classic list.
              Filter by category and never miss what matters.
            </p>

            <StaggerContainer className="space-y-3" staggerMs={80}>
              {newsViewModes.map((mode) => (
                <StaggerItem key={mode.name}>
                  <motion.div
                    whileHover={{ x: 4, transition: { duration: 0.15 } }}
                    className="flex items-center gap-4 p-4 bg-glass rounded-xl border border-white/08 hover:border-gold/20 transition-colors duration-200 group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center text-white/60 group-hover:bg-gold/15 group-hover:text-gold transition-all duration-200 shrink-0">
                      {mode.icon}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{mode.name}</div>
                      <div className="text-white/40 text-xs">{mode.description}</div>
                    </div>
                    <div className="ml-auto text-white/20 group-hover:text-gold/50 transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
                      </svg>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </AnimateIn>

          {/* Right: news preview mockup */}
          <AnimateIn from="right" delay={100}>
            <div className="relative">
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
                className="bg-[#1A1A1A] rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl"
              >
                {/* Header */}
                <div className="px-5 pt-5 pb-3">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white font-bold text-base">Qatar News</span>
                    <div className="flex gap-1.5">
                      {["list", "grid", "reel"].map((v) => (
                        <div
                          key={v}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                            v === "list" ? "bg-gold/20 text-gold" : "bg-white/[0.06] text-white/30"
                          }`}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            {v === "list" ? (
                              <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
                            ) : v === "grid" ? (
                              <path d="M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z" />
                            ) : (
                              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z" />
                            )}
                          </svg>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category chips */}
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                    {categories.map((cat) => (
                      <span
                        key={cat}
                        className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${
                          cat === "All" ? "bg-gold text-black" : "bg-white/[0.06] text-white/50"
                        }`}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* News cards */}
                <div className="px-4 pb-5 space-y-3">
                  {newsViewModes[0].preview?.map((article, i) => (
                    <div key={i} className="p-3.5 bg-[#252525] rounded-2xl flex gap-3 items-start">
                      <div
                        className="w-16 h-16 rounded-xl shrink-0 flex items-center justify-center"
                        style={{ background: `hsl(${i * 60 + 200}, 30%, 25%)` }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="white" opacity="0.4">
                          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium leading-snug mb-1.5 line-clamp-2">{article.title}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-gold text-[10px] font-semibold bg-gold/10 px-1.5 py-0.5 rounded-md">{article.category}</span>
                          <span className="text-white/30 text-[10px]">{article.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Floating badge */}
              <div className="absolute -top-3 -right-3 bg-gold text-black text-xs font-black px-3 py-1.5 rounded-full shadow-lg">
                3 View Modes
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}

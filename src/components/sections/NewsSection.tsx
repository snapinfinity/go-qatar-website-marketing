"use client";

import { m } from "framer-motion";
import AnimateIn from "@/components/ui/AnimateIn";

const articles = [
  { title: "Qatar National Day Celebrations Begin Across Doha", category: "Qatar", time: "2h ago" },
  { title: "Lusail City Expansion Project Reaches New Milestone", category: "Business", time: "4h ago" },
  { title: "Qatar Airways Launches New European Route", category: "General", time: "6h ago" },
];

const categories = ["All", "Qatar", "Business", "Sports", "Technology", "World"];

export default function NewsSection() {
  return (
    <section id="news" className="py-24 relative overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-blue-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: content */}
          <AnimateIn from="left">
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-white/50 text-xs font-semibold uppercase tracking-[0.2em]">
              Qatar News
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Stay updated with
              <br />
              <span className="text-gradient-brand">Qatar&apos;s latest</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed">
              Qatar news from Al Jazeera, Gulf Times, Doha News and more,
              across nine categories. Swipe between stories, adjust the text
              size, and share anything worth passing on.
            </p>
          </AnimateIn>

          {/* Right: news preview mockup */}
          <AnimateIn from="right" delay={100}>
            <m.div
              whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
              className="bg-surface rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl"
            >
              {/* Header */}
              <div className="px-5 pt-5 pb-3">
                <div className="mb-4">
                  <span className="text-white font-bold text-base">Qatar News</span>
                </div>

                {/* Category chips */}
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                  {categories.map((cat) => (
                    <span
                      key={cat}
                      className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${
                        cat === "All" ? "bg-brand text-white" : "bg-white/[0.06] text-white/50"
                      }`}
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* News cards */}
              <div className="px-4 pb-5 space-y-3">
                {articles.map((article, i) => (
                  <div key={i} className="p-3.5 bg-field rounded-2xl flex gap-3 items-start">
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
                        <span className="text-brand-light text-[10px] font-semibold bg-brand/20 px-1.5 py-0.5 rounded-md">{article.category}</span>
                        <span className="text-white/30 text-[10px]">{article.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </m.div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimateIn from "@/components/ui/AnimateIn";

/* ══ 3D icon: News ════════════════════════════════════════════ */
function NewsIcon3D() {
  return (
    <motion.div
      className="w-full h-full flex items-center justify-center"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg"
        className="w-[52%]"
        style={{ filter: "drop-shadow(0 20px 40px rgba(201,168,76,0.45))" }}>
        <defs>
          <linearGradient id="ng-gold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F5E49A"/>
            <stop offset="100%" stopColor="#C9A84C"/>
          </linearGradient>
          <linearGradient id="ng-gold-dim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9A7B2E"/>
            <stop offset="100%" stopColor="#7A5F20"/>
          </linearGradient>
          <linearGradient id="ng-card" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2C2C2C"/>
            <stop offset="100%" stopColor="#1A1A1A"/>
          </linearGradient>
          <radialGradient id="ng-img" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#9A7B2E" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#1A1A1A" stopOpacity="0"/>
          </radialGradient>
          <clipPath id="ng-header-clip">
            <rect x="30" y="14" width="220" height="56" rx="18"/>
          </clipPath>
        </defs>

        {/* Card stack depth */}
        <motion.rect x="58" y="42" width="220" height="160" rx="18" fill="#141414"
          animate={{ y: [42, 38, 42] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}/>
        <motion.rect x="44" y="28" width="220" height="160" rx="18" fill="#1E1E1E"
          animate={{ y: [28, 24, 28] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}/>
        <motion.rect x="44" y="28" width="220" height="38" rx="18" fill="url(#ng-gold-dim)" opacity="0.85"
          animate={{ y: [28, 24, 28] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}/>
        <motion.rect x="44" y="52" width="220" height="14" fill="url(#ng-gold-dim)" opacity="0.85"
          animate={{ y: [52, 48, 52] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}/>

        {/* Main card */}
        <rect x="30" y="14" width="220" height="162" rx="18" fill="url(#ng-card)"/>
        <rect x="30" y="14" width="220" height="42" rx="18" fill="url(#ng-gold)"/>
        <rect x="30" y="38" width="220" height="18" fill="url(#ng-gold)"/>

        {/* Shimmer sweep over header */}
        <g clipPath="url(#ng-header-clip)">
          <motion.g
            animate={{ x: [-60, 300] }}
            transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 2.8, ease: "easeInOut" }}
          >
            <rect x={0} y={14} width={44} height={56}
              fill="rgba(255,255,255,0.18)"
              style={{ filter: "blur(8px)" }}/>
          </motion.g>
        </g>

        {/* Header items */}
        <circle cx="52" cy="35" r="7" fill="rgba(0,0,0,0.22)"/>
        <rect x="66" y="31" width="54" height="8" rx="4" fill="rgba(0,0,0,0.18)"/>
        <rect x="216" y="29" width="22" height="12" rx="6" fill="rgba(0,0,0,0.18)"/>

        {/* Article image */}
        <rect x="46" y="66" width="76" height="58" rx="10" fill="#252525"/>
        <rect x="46" y="66" width="76" height="58" rx="10" fill="url(#ng-img)"/>

        {/* Text lines */}
        <rect x="134" y="66" width="100" height="9" rx="4.5" fill="#3C3C3C"/>
        <rect x="134" y="82" width="82"  height="8" rx="4"   fill="#333"/>
        <rect x="134" y="98" width="92"  height="8" rx="4"   fill="#2E2E2E"/>
        <rect x="134" y="114" width="68" height="7" rx="3.5" fill="#292929"/>

        <rect x="46" y="136" width="188" height="1" fill="rgba(255,255,255,0.05)"/>
        <rect x="46" y="146" width="188" height="7" rx="3.5" fill="#333"/>
        <rect x="46" y="160" width="148" height="7" rx="3.5" fill="#2A2A2A"/>

        {/* Gold accent dot */}
        <motion.circle cx="228" cy="136" r="5" fill="#C9A84C"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}/>
      </svg>
    </motion.div>
  );
}

/* ══ 3D icon: Favourites ══════════════════════════════════════ */
function FavouritesIcon3D() {
  return (
    <motion.div
      className="w-full h-full flex items-center justify-center"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
    >
      <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg"
        className="w-[52%]"
        style={{ filter: "drop-shadow(0 24px 48px rgba(201,168,76,0.5))" }}>
        <defs>
          <linearGradient id="fg-gold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F7ECAA"/>
            <stop offset="50%" stopColor="#C9A84C"/>
            <stop offset="100%" stopColor="#A08538"/>
          </linearGradient>
          <linearGradient id="fg-side" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8A6E28"/>
            <stop offset="100%" stopColor="#5C4410"/>
          </linearGradient>
          <radialGradient id="fg-shine" cx="32%" cy="22%" r="55%">
            <stop offset="0%" stopColor="#FFF8DC" stopOpacity="0.55"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
        </defs>

        {/* Expanding pulse rings */}
        <motion.circle cx="160" cy="145" r="70" stroke="#C9A84C" strokeWidth="1.5" fill="none"
          animate={{ r: [70, 130], opacity: [0.45, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}/>
        <motion.circle cx="160" cy="145" r="70" stroke="#C9A84C" strokeWidth="1" fill="none"
          animate={{ r: [70, 130], opacity: [0.3, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 1.2 }}/>

        {/* Ground shadow */}
        <ellipse cx="160" cy="285" rx="62" ry="10" fill="rgba(0,0,0,0.55)"/>

        {/* Pin 3D side */}
        <path d="M160 270 C160 270 100 188 98 146 C98 112 126 82 160 82 C194 82 222 112 222 146 C220 188 160 270 160 270Z"
          fill="url(#fg-side)" transform="translate(5,7)"/>

        {/* Pin body */}
        <path d="M160 264 C160 264 100 182 98 140 C98 106 126 76 160 76 C194 76 222 106 222 140 C220 182 160 264 160 264Z"
          fill="url(#fg-gold)"/>
        <path d="M160 264 C160 264 100 182 98 140 C98 106 126 76 160 76 C194 76 222 106 222 140 C220 182 160 264 160 264Z"
          fill="url(#fg-shine)"/>

        {/* Inner dark hole */}
        <circle cx="160" cy="138" r="36" fill="#101010"/>
        <circle cx="160" cy="138" r="32" fill="#181818"/>

        {/* Beating heart */}
        <motion.g
          style={{ transformOrigin: "160px 138px" }}
          animate={{ scale: [1, 1.14, 1, 1.08, 1] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] }}
        >
          <path d="M160 156 C160 156 136 142 136 128 C136 120 143 115 150 118 C153.5 119.5 157 122.5 160 127 C163 122.5 166.5 119.5 170 118 C177 115 184 120 184 128 C184 142 160 156 160 156Z"
            fill="url(#fg-gold)"/>
          <path d="M160 156 C160 156 136 142 136 128 C136 120 143 115 150 118 C153.5 119.5 157 122.5 160 127 C163 122.5 166.5 119.5 170 118 C177 115 184 120 184 128 C184 142 160 156 160 156Z"
            fill="url(#fg-shine)" opacity="0.7"/>
        </motion.g>

        {/* Sparkle dots */}
        <motion.circle cx="96" cy="104" r="3.5" fill="#C9A84C"
          animate={{ opacity: [0.35, 0.8, 0.35], scale: [1, 1.4, 1] }}
          style={{ transformOrigin: "96px 104px" }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}/>
        <motion.circle cx="224" cy="118" r="2.5" fill="#C9A84C"
          animate={{ opacity: [0.25, 0.7, 0.25], scale: [1, 1.4, 1] }}
          style={{ transformOrigin: "224px 118px" }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}/>
        <motion.circle cx="104" cy="174" r="2" fill="#C9A84C"
          animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.4, 1] }}
          style={{ transformOrigin: "104px 174px" }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}/>
      </svg>
    </motion.div>
  );
}

/* ══ 3D icon: History / Clock ════════════════════════════════ */
function HistoryIcon3D() {
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const r1 = 84, r2 = i % 3 === 0 ? 96 : 91;
    return {
      x1: 160 + r1 * Math.cos(angle), y1: 160 + r1 * Math.sin(angle),
      x2: 160 + r2 * Math.cos(angle), y2: 160 + r2 * Math.sin(angle),
      major: i % 3 === 0,
    };
  });

  return (
    <motion.div
      className="w-full h-full flex items-center justify-center"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
    >
      <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg"
        className="w-[52%]"
        style={{ filter: "drop-shadow(0 20px 40px rgba(201,168,76,0.4))" }}>
        <defs>
          <linearGradient id="hg-bezel" x1="0%" y1="0%" x2="30%" y2="100%">
            <stop offset="0%" stopColor="#F7ECAA"/>
            <stop offset="40%" stopColor="#C9A84C"/>
            <stop offset="100%" stopColor="#7A5F20"/>
          </linearGradient>
          <linearGradient id="hg-bezel-3d" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7A5F20"/>
            <stop offset="100%" stopColor="#4A3A10"/>
          </linearGradient>
          <linearGradient id="hg-face" x1="0%" y1="0%" x2="20%" y2="100%">
            <stop offset="0%" stopColor="#242424"/>
            <stop offset="100%" stopColor="#111"/>
          </linearGradient>
          <radialGradient id="hg-shine" cx="28%" cy="22%" r="58%">
            <stop offset="0%" stopColor="white" stopOpacity="0.14"/>
            <stop offset="100%" stopColor="white" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* 3D depth ring */}
        <circle cx="164" cy="166" r="116" fill="url(#hg-bezel-3d)"/>
        {/* Bezel */}
        <circle cx="160" cy="160" r="116" fill="url(#hg-bezel)"/>
        {/* Clock face */}
        <circle cx="160" cy="160" r="100" fill="url(#hg-face)"/>
        {/* Shine */}
        <circle cx="160" cy="160" r="116" fill="url(#hg-shine)"/>

        {/* Tick marks */}
        {ticks.map((t, i) => (
          <line key={i}
            x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
            stroke={t.major ? "#C9A84C" : "rgba(201,168,76,0.32)"}
            strokeWidth={t.major ? 3.5 : 1.5}
            strokeLinecap="round"/>
        ))}

        {/* Hour hand — very slow (720s per revolution) */}
        <motion.g
          style={{ transformOrigin: "160px 160px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 720, repeat: Infinity, ease: "linear" }}
        >
          <line x1="160" y1="160" x2="127" y2="103" stroke="#C9A84C" strokeWidth="6" strokeLinecap="round"/>
        </motion.g>

        {/* Minute hand — moderate (90s per revolution) */}
        <motion.g
          style={{ transformOrigin: "160px 160px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        >
          <line x1="160" y1="160" x2="200" y2="116" stroke="#C9A84C" strokeWidth="4" strokeLinecap="round"/>
        </motion.g>

        {/* Second hand — fast (8s per revolution) */}
        <motion.g
          style={{ transformOrigin: "160px 160px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <line x1="160" y1="160" x2="136" y2="210" stroke="#F7ECAA" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
          {/* Counter-balance tail */}
          <line x1="160" y1="160" x2="170" y2="142" stroke="#F7ECAA" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
        </motion.g>

        {/* Center cap */}
        <circle cx="160" cy="160" r="9"   fill="url(#hg-bezel)"/>
        <circle cx="160" cy="160" r="4.5" fill="#1A1A1A"/>

        {/* Crown at top */}
        <rect x="153" y="42" width="14" height="18" rx="4" fill="url(#hg-bezel)"/>
        <rect x="148" y="36" width="24" height="12" rx="6" fill="url(#hg-bezel)"/>
      </svg>
    </motion.div>
  );
}

/* ══ Screen config ════════════════════════════════════════════ */
const screens = [
  {
    id: "news",
    label: "News Feed",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
      </svg>
    ),
    title: "Qatar News at Your Fingertips",
    description:
      "Stay informed with curated Qatar news filtered by category. Browse in List, Grid or Reel view and tap any card to read the full story.",
    bullets: [
      "Categories: All, Qatar, Sports, Business, Tech",
      "List / Grid / Reel view modes",
      "Tap any card to read full article",
      "Updated in real-time",
    ],
    visual: <NewsIcon3D />,
    glow: "rgba(201,168,76,0.18)",
  },
  {
    id: "favourites",
    label: "Favourites",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    ),
    title: "Save the Places You Love",
    description:
      "Star any location with a custom label — Home, Office, Mall — and re-navigate in one tap. Open directly in Google Maps or Waze, or share the pin with anyone.",
    bullets: [
      "Custom labels for saved places",
      "One-tap navigation to any saved spot",
      "Open with Google Maps or Waze",
      "Share location with friends",
    ],
    visual: <FavouritesIcon3D />,
    glow: "rgba(201,168,76,0.22)",
  },
  {
    id: "history",
    label: "History",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
      </svg>
    ),
    title: "Never Lose a Search Again",
    description:
      "Every address you look up is automatically saved. Jump back to any recent location, add it to favourites, share it, or open it in navigation — all from the same screen.",
    bullets: [
      "Auto-saves every search",
      "Timestamped entries (date & time)",
      "Open in Google Maps or Waze",
      "Add any entry to Favourites",
    ],
    visual: <HistoryIcon3D />,
    glow: "rgba(201,168,76,0.18)",
  },
];

export default function AppScreensSection() {
  const [active, setActive] = useState(0);
  const current = screens[active];

  return (
    <section className="py-24 relative overflow-hidden" id="features-screens">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-gold/[0.04] blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <AnimateIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/25 text-gold text-xs font-semibold uppercase tracking-widest mb-4">
            Inside the App
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Every screen,{" "}
            <span className="text-gradient-gold">perfectly designed</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Explore the real Go Qatar app — built for speed, clarity, and every
            daily need in Qatar.
          </p>
        </AnimateIn>

        {/* Tab switcher */}
        <AnimateIn delay={80} className="flex items-center justify-center gap-3 mb-12 flex-wrap">
          {screens.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                active === i
                  ? "bg-gold text-black shadow-lg shadow-gold/20"
                  : "bg-white/[0.06] text-white/60 border border-white/10 hover:bg-white/[0.09] hover:text-white"
              }`}
            >
              {s.icon}
              {s.label}
            </button>
          ))}
        </AnimateIn>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* 3D icon panel — aspect-[4/3] keeps it compact */}
          <div className="order-1 lg:order-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.88, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -12 }}
                transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#161616] to-[#0C0C0C] border border-white/[0.07]"
                style={{
                  aspectRatio: "4/3",
                  boxShadow: `0 0 60px ${current.glow}`,
                }}
              >
                {/* Radial glow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(55% 55% at 50% 55%, ${current.glow} 0%, transparent 70%)`,
                  }}
                />
                {current.visual}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Description */}
          <div className="order-0 lg:order-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="inline-flex items-center gap-2 text-gold mb-3">
                  {current.icon}
                  <span className="text-sm font-semibold uppercase tracking-wider">
                    {current.label}
                  </span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
                  {current.title}
                </h3>
                <p className="text-white/55 text-lg leading-relaxed mb-8">
                  {current.description}
                </p>
                <ul className="space-y-3">
                  {current.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-3 text-white/70">
                      <div className="w-5 h-5 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center flex-shrink-0">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="#C9A84C">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      </div>
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

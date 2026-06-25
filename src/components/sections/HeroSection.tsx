"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AppMockup from "@/components/ui/AppMockup";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/storeLinks";

const ease = [0.23, 1, 0.32, 1] as const;

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold/[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-gold/[0.06] blur-[80px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-blue-500/[0.05] blur-[80px] pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left: Text content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/25 text-gold text-xs font-semibold uppercase tracking-widest mb-6"
            >
              <div className="w-[18px] h-[18px] rounded-md overflow-hidden flex-shrink-0 border border-white/20">
                <Image src="/logos/app_icon.svg" alt="" width={18} height={18} className="w-full h-full" />
              </div>
              Available on iOS &amp; Android
            </motion.div>

            {/* Headline — word by word reveal */}
            <div className="overflow-hidden mb-2">
              <motion.h1
                className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1, ease }}
              >
                Your City.
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-6">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.18, ease }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight text-gradient-gold"
              >
                Your Way.
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.32, ease }}
              className="text-white/55 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Navigate Qatar like a local. Find any address instantly using
              Qatar&apos;s unique Zone, Street &amp; Building system — with
              live news, saved favorites, and smart history.
            </motion.p>

            {/* Store buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.42, ease }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10"
            >
              <motion.a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-3 px-5 py-3 bg-white/[0.06] border border-white/10 rounded-2xl hover:bg-white/[0.1] hover:border-gold/30 transition-colors duration-200"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="white" />
                </svg>
                <div className="text-left">
                  <div className="text-white/50 text-[10px] leading-none mb-0.5">Download on the</div>
                  <div className="text-white font-semibold text-sm">App Store</div>
                </div>
              </motion.a>

              <motion.a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-3 px-5 py-3 bg-white/[0.06] border border-white/10 rounded-2xl hover:bg-white/[0.1] hover:border-gold/30 transition-colors duration-200"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M3 20.5v-17C3 2.91 3.34 2.5 3.85 2.5c.23 0 .48.08.69.24L20.5 12l-16 9.26C4.33 21.42 4.08 21.5 3.85 21.5 3.34 21.5 3 21.09 3 20.5z" fill="#34A853"/>
                  <path d="M20.5 12L4.54 21.26l8.02-8.02L20.5 12z" fill="#FBBC04"/>
                  <path d="M4.54 2.74L20.5 12l-7.94-1.24L4.54 2.74z" fill="#EA4335"/>
                  <path d="M3 3.5v17l9.56-8.5L3 3.5z" fill="#4285F4"/>
                </svg>
                <div className="text-left">
                  <div className="text-white/50 text-[10px] leading-none mb-0.5">Get it on</div>
                  <div className="text-white font-semibold text-sm">Google Play</div>
                </div>
              </motion.a>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex items-center gap-4 justify-center lg:justify-start"
            >
              <div className="flex -space-x-2">
                {["#8B4513", "#2E4A7A", "#1A5C2A", "#7A2E6A"].map((color, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-background" style={{ backgroundColor: color }} />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill="#C9A84C">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-white/45 text-xs">Loved by Qatar residents</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.2, ease }}
            className="flex items-center justify-center lg:justify-end"
          >
            <AppMockup />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}

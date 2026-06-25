"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimateIn from "@/components/ui/AnimateIn";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/storeLinks";

export default function DownloadSection() {
  return (
    <section id="download" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-gold/[0.06] via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-gold/[0.05] blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative">
        <AnimateIn>
          {/* App icon */}
          <div className="mb-6 mx-auto inline-block rounded-[22px] border border-white/15 overflow-hidden shadow-2xl shadow-gold/10">
            <Image src="/logos/app_icon.svg" alt="Go Qatar" width={88} height={88} className="block" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Get Go Qatar
            <br />
            <span className="text-gradient-gold">for free today</span>
          </h2>
          <p className="text-white/50 text-xl mb-10 max-w-lg mx-auto leading-relaxed">
            Join thousands of Qatar residents and visitors who navigate smarter every day.
          </p>
        </AnimateIn>

        {/* Download buttons */}
        <AnimateIn delay={120} className="flex flex-wrap gap-4 justify-center mb-12">
          <motion.a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="group flex items-center gap-4 px-7 py-4 bg-white text-black rounded-2xl shadow-xl"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="black">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div className="text-left">
              <div className="text-black/50 text-xs leading-none mb-0.5">Download on the</div>
              <div className="font-bold text-lg leading-tight">App Store</div>
            </div>
          </motion.a>

          <motion.a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="group flex items-center gap-4 px-7 py-4 bg-gold text-black rounded-2xl shadow-xl shadow-gold/20"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M3 20.5v-17C3 2.91 3.34 2.5 3.85 2.5c.23 0 .48.08.69.24L20.5 12l-16 9.26C4.33 21.42 4.08 21.5 3.85 21.5 3.34 21.5 3 21.09 3 20.5z" fill="#34A853"/>
              <path d="M20.5 12L4.54 21.26l8.02-8.02L20.5 12z" fill="#FBBC04"/>
              <path d="M4.54 2.74L20.5 12l-7.94-1.24L4.54 2.74z" fill="#EA4335"/>
              <path d="M3 3.5v17l9.56-8.5L3 3.5z" fill="#4285F4"/>
            </svg>
            <div className="text-left">
              <div className="text-black/50 text-xs leading-none mb-0.5">Get it on</div>
              <div className="font-bold text-lg leading-tight">Google Play</div>
            </div>
          </motion.a>
        </AnimateIn>

        {/* Features list */}
        <AnimateIn delay={200}>
          <div className="flex flex-wrap gap-6 justify-center">
            {["100% Free", "Works Offline", "Regular Updates", "Qatar Address System"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-white/50 text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#C9A84C">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                {item}
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

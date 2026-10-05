import BluePlate from "@/components/ui/BluePlate";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/storeLinks";

const storeButton =
  "flex items-center gap-3 px-5 py-3 rounded-2xl bg-brand-ink/55 border border-white/15 hover:bg-brand-ink/80 hover:border-white/30 hover:-translate-y-0.5 transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-brand-gradient pt-16">
      {/* Settle the maroon wall into the page background */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-28 lg:pt-24 lg:pb-36">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-16 lg:gap-10 items-center">
          {/* Copy */}
          <div>
            <p className="text-brand-light text-xs font-semibold uppercase tracking-[0.2em] mb-5">
              Find your way in
            </p>

            <h1 className="text-[#F4F3F1] font-extrabold text-[44px] sm:text-6xl lg:text-[68px] leading-[1.02] tracking-[-0.03em]">
              Your City.
              <br />
              Your Way.
              <span className="block mt-5 text-xl sm:text-2xl lg:text-[26px] font-semibold tracking-normal leading-snug text-white/80">
                Find any building from its blue plate.
              </span>
            </h1>

            <p className="mt-5 max-w-[34rem] text-white/70 text-lg leading-relaxed">
              Type the zone, street and building numbers and get the exact
              building on the map. Plus Doha Metro, Qatar news and QAR
              exchange rates — in one free app.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className={storeButton}>
                <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="white" />
                </svg>
                <span className="text-left">
                  <span className="block text-white/60 text-[10px] leading-none mb-0.5">Download on the</span>
                  <span className="block text-white font-semibold text-sm">App Store</span>
                </span>
              </a>

              <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className={storeButton}>
                <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 20.5v-17C3 2.91 3.34 2.5 3.85 2.5c.23 0 .48.08.69.24L20.5 12l-16 9.26C4.33 21.42 4.08 21.5 3.85 21.5 3.34 21.5 3 21.09 3 20.5z" fill="#34A853" />
                  <path d="M20.5 12L4.54 21.26l8.02-8.02L20.5 12z" fill="#FBBC04" />
                  <path d="M4.54 2.74L20.5 12l-7.94-1.24L4.54 2.74z" fill="#EA4335" />
                  <path d="M3 3.5v17l9.56-8.5L3 3.5z" fill="#4285F4" />
                </svg>
                <span className="text-left">
                  <span className="block text-white/60 text-[10px] leading-none mb-0.5">Get it on</span>
                  <span className="block text-white font-semibold text-sm">Google Play</span>
                </span>
              </a>
            </div>

            <p className="mt-4 text-sm text-white/55">Free on iOS and Android.</p>
          </div>

          {/* The blue plate */}
          <div className="pb-6 lg:pb-0">
            <BluePlate />
          </div>
        </div>
      </div>
    </section>
  );
}

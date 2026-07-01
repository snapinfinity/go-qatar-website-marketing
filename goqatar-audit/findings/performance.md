# Performance Findings — goqatar.app
**Audit Date:** 2026-06-27  
**Note:** PageSpeed Insights API requires an API key — lab data estimated from code analysis.

---

## Estimated Performance Profile

### Loading Architecture Assessment

**Server-side rendering:** Partially broken due to rendering failure. When working correctly, Next.js 15 + Vercel delivers pre-rendered HTML — fast initial load.

**JavaScript payload:**
- Framer Motion 12.42.0: ~50-70KB gzipped (significant)
- Next.js 15 runtime: ~40KB gzipped  
- React 19: ~35KB gzipped
- 9 client components on homepage: high hydration cost

**Estimated LCP risk:** HIGH  
The hero section uses framer-motion animations that start with `opacity: 0` and animate in. This means the LCP candidate (H1 headline or hero image) is invisible until JavaScript hydrates — **a known LCP antipattern**. LCP is measured when the element becomes visible, not when it starts rendering.

**CLS risk:** LOW  
Inter font loaded via WOFF2 preload (`<link rel="preload">`) — good. Next.js Image component with explicit width/height on all images — good. No layout shift expected from content jumps.

**INP risk:** MEDIUM  
Multiple Framer Motion `whileHover` and `whileTap` handlers on interactive elements. Tab switching in AppScreensSection uses AnimatePresence. Complex animation chains could delay interaction response.

---

## Issues

### HIGH: Hero Content Hidden by Animation Initial State
**Severity:** High  

```tsx
<motion.h1
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.65, delay: 0.1, ease }}
>
  Your City.
</motion.h1>
```

The H1 starts at `opacity: 0` and requires JavaScript to animate visible. This means:
- SSR sends the text, but it's invisible to the viewer on paint
- LCP fires only after hydration + animation completes (0.65s + delay)
- Googlebot may not see the animated content in certain rendering modes

**Fix:** Add CSS fallback for no-JS and ensure the initial render state doesn't hide the LCP candidate:
```tsx
// Only apply animation if motion is available
initial={{ opacity: typeof window !== 'undefined' ? 0 : 1, y: 40 }}
```
Or preferably: wrap animations in `<LazyMotion>` with domAnimation to reduce bundle size.

---

### HIGH: 9 Client Components on Homepage
**Severity:** High  

Every section on the homepage is `"use client"`. This causes:
1. Larger JS bundle (all component code ships to client)
2. Full hydration tree on initial load
3. Time-to-Interactive delayed by animation initialization

**Fix:** Progressively enhance — keep static HTML in server components, extract only the animated parts to client components.

---

### MEDIUM: Framer Motion Full Bundle
**Severity:** Medium  

Importing `from "framer-motion"` without tree-shaking loads the full library. Use `<LazyMotion>` with `domAnimation` feature set to reduce the motion bundle from ~50KB to ~17KB:

```tsx
import { LazyMotion, domAnimation, m } from "framer-motion";

// In layout or root component:
<LazyMotion features={domAnimation} strict>
  {children}
</LazyMotion>

// Replace <motion.div> with <m.div> in components
```

---

### MEDIUM: Continuous Background Animations (AppScreensSection)
**Severity:** Medium  

AppScreensSection has multiple `animate={{ y: [0, -10, 0] }}` infinite loops with `repeat: Infinity` on SVG clock hands, news card stack, and heart pulse. These run perpetually even when off-screen, consuming CPU.

**Fix:** Use `useInView` or `viewport: { once: false }` with `whileInView` instead of unconditional `animate`.

---

### LOW: No Resource Hints for App Store / Play Store
**Severity:** Low  

The App Store and Play Store links (`target="_blank"`) have no `<link rel="preconnect">` for their domains. When users click, there's a cold DNS lookup for `apps.apple.com` and `play.google.com`.

---

## What Works Well
- ✅ WOFF2 font preload in `<head>` (reduces FOUT)
- ✅ Inter font with `display: swap` (prevents invisible text)
- ✅ Next.js Image component throughout (auto-WebP, lazy loading, proper dimensions)
- ✅ SVG icons inlined (zero extra HTTP requests for icons)
- ✅ CSS-only background patterns (no extra images)
- ✅ Vercel edge CDN (fast global delivery)
- ✅ No render-blocking third-party scripts
- ✅ `fetchPriority="low"` on webpack chunk preload (correct)

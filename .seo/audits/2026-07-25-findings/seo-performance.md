# Performance / Core Web Vitals Audit — https://goqatar.app
Date: 2026-07-25
Source: Shared snapshot `.seo/cache/2026-07-25/psi-mobile.json` (Lighthouse, mobile, simulated throttling) + `homepage.html`. No live re-fetch was needed; all data came from the cache.
Field data (CrUX): **Not available** — `crux.error`: "No CrUX data for this origin. The site likely has insufficient Chrome traffic volume for eligibility." This assessment is **lab-only**. Treat as a directional proxy, not a confirmed 75th-percentile pass.

Prior context: `.seo/audits/2026-07-21-findings/performance.md` recommended (1) inline critical CSS, (2) split/lazy-load the 431-chunk (54% unused), (3) drop legacy JS polyfills. `TODO.md`/`STATE.md` mark this item **done** (commit `d41f0b4`, 2026-07-23). This audit checks whether the shipped fix actually changed measured behavior.

## Score
**85/100**

Rationale: all three Core Web Vitals pass in the lab run with no CLS at all and a very low blocking-time proxy for INP, and total payload/DOM size are both small and healthy. Points withheld because (a) there is still no CrUX field data to confirm the real 75th-percentile pass Google actually grades on, (b) LCP's lab margin under throttled mobile conditions is narrow relative to the 2.5s ceiling, and (c) the previously-committed "performance" fix did not change the metrics it targeted — render-blocking CSS, the 431-chunk's unused JS, and the 255-chunk's legacy JS are numerically unchanged from the 2026-07-21 baseline despite the TODO item being checked off, which is a process-trust issue as much as a performance one.

## Core Web Vitals (lab, mobile — Lighthouse simulated throttling)

| Metric | Value | Threshold | Status | Notes |
|---|---|---|---|---|
| LCP | 2326 ms | ≤2.5s Good | **Pass (narrow margin — 174ms of headroom)** | Score 0.93. No CrUX confirmation. |
| INP (proxy: TBT) | 45 ms TBT, 2 short long tasks (95ms, 51ms max) | ≤200ms Good | **Likely pass (lab proxy only, not real INP)** | No CrUX field data; no real user-interaction trace captured by this run. |
| CLS | 0 | ≤0.1 Good | **Pass** | No layout shift in this run; images use explicit width/height via next/image. |
| FCP | 959 ms | ≤1.8s Good | **Pass** | |
| TTFB | 4 ms (server-response-time audit) | ≤200ms Good | **Excellent** | Served from Vercel edge cache (`X-Vercel-Cache: HIT`, `Age: 224406`). |
| Speed Index | 4217 ms | — | **Weak (score 0.77)**, worst-scoring lab metric | Visual completeness lags well behind FCP (0.96s) — consistent with render-blocking CSS delaying paint of the hero's inline SVG mockup, the likely LCP element (no `<img>` on the page is large enough to be the LCP candidate; all are small next/image icons ≤108×22). |
| Total page weight | 283 KB, 18 requests | — | **Good** | `total-byte-weight` score 1. |
| DOM size | 858 elements, depth 14 | <1,500 Good | **Good** | No DOM-bloat risk. |

## Key Findings

1. **[HIGH] Claimed performance fix did not change the metrics it targeted — verify the production build.** The 2026-07-21 audit flagged render-blocking CSS (~151-450ms), a 44KB JS chunk with 54% unused code, and ~12KB of unnecessary legacy JS. `package.json`/`next.config.ts` now have `browserslist` (chrome/edge/firefox ≥89, safari ≥14), `critters` as a devDependency, and `experimental.optimizeCss: true` — but the **live, currently-served HTML** (this snapshot, deployed after that commit per the `Age` header) still shows a plain render-blocking `<link rel="stylesheet" href="/_next/static/css/308ef6b3d4864eb5.css" data-precedence="next"/>` with no inlined `<style>` block in `<head>`, and PSI's `render-blocking-insight` still fails (~90-151ms savings available). The `431-*.js` chunk is still 44,130 bytes total with 24,178 bytes (54.8%) unused (`unused-javascript` audit) — essentially identical to the 2026-07-21 baseline (44KB / 24.1KB / 54%). The `255-*.js` chunk still ships 11,912 bytes flagged by `legacy-javascript-insight` (previously 11.8KB). **Conclusion: `optimizeCss`/`critters` is not visibly inlining critical CSS in production, and the browserslist change did not reduce the legacy-JS footprint of the shipped chunks.** This TODO item should be reopened rather than left checked off — re-run `next build` locally, inspect `.next/server/app/page` output for inlined `<style>`, and confirm `critters` is actually wired into the build pipeline (Next 15's `experimental.optimizeCss` requires `critters` at build time; if the Vercel build doesn't install devDependencies in the deploy environment, this silently no-ops).

2. **[HIGH] Render-blocking CSS still delays paint.** `_next/static/css/308ef6b3d4864eb5.css` (8.7KB transferred / 37.5KB uncompressed) blocks first render; `render-blocking-insight` estimates ~90ms of savings, and the CSS fetch/parse window lines up closely with when LCP actually fires (CSS finishes ~2051ms into the throttled trace, LCP paints at 2326ms). Fix: inline true above-the-fold critical CSS (hero section + navbar) directly in `<head>` as a `<style>` block, defer the full stylesheet with `<link rel="preload" as="style" onload="this.rel='stylesheet'">` (or a working `critters` pipeline per Finding 1).
   ```html
   <!-- next.config.ts snippet to verify critical CSS actually inlines -->
   experimental: {
     optimizeCss: true, // requires "critters" in dependencies (not just devDependencies)
                          // reachable by the deploy build step — move critters to
                          // "dependencies" if the platform prunes devDependencies before `next build`
   },
   ```

3. **[MEDIUM-HIGH] `431-*.js` — 54.8% unused JS (24.2KB of 44.1KB).** Unchanged since 2026-07-21. `package.json` shows `framer-motion: ^12.42.0` as a runtime dependency — this is a common source of a large, mostly-unused shared vendor chunk when only a handful of animation primitives are used per page. Recommendations:
   - Audit what's actually imported from `framer-motion` (or whatever populates chunk 431) via `next build --profile` / bundle analyzer.
   - Import only the specific submodules used (e.g. `motion/react` slim build, or replace simple fade/slide entrance animations in `HeroSection`/`StatsSection` with CSS `@keyframes`/`animate-*` Tailwind utilities) to cut this chunk's footprint, especially since it currently loads `async` on every page including above the fold.
   - The `NewsSection`/`AppScreensSection`/`UpcomingSection`/`BusinessAPISection` dynamic-import split from the 2026-07-21 fix (confirmed present in `src/app/page.tsx` via `next/dynamic`) is good and should stay — extend the same pattern to any framer-motion-heavy below-fold components if not already covered.

4. **[MEDIUM] Legacy JavaScript still shipped (~11.9KB, chunk `255-*.js`).** Unchanged since 2026-07-21 despite the new `browserslist` entry. The `browserslist` field only affects Next's own SWC/Babel transpilation target — it does not retroactively strip polyfills/legacy syntax bundled *inside* third-party dependency code (e.g., pre-transpiled library output). Action: confirm via `legacy-javascript-insight` which specific features/polyfills are being flagged (PSI reports this chunk specifically, not `polyfills-*.js` — the `nomodule` polyfills script Next auto-emits is harmless and skipped by modern browsers, so it is not the source of this finding). Check for CommonJS-only or non-ESM dependencies pulling in `core-js`-style polyfills.

5. **[MEDIUM] Network dependency chain still flagged.** `network-dependency-tree-insight` fails (score 0) — the HTML → CSS → JS critical path remains chained rather than parallelized/shortened. This will improve as a side effect of Findings 2–3 (less to chain, critical CSS inlined).

6. **[LOW] Speed Index (4.2s, score 0.77) is the weakest lab metric despite fast FCP (0.96s).** This gap (FCP fast, Speed Index slow) indicates the page paints something early but takes much longer to visually settle — consistent with the render-blocking CSS delaying the hero's inline SVG illustration and any below-the-fold dynamic-imported sections popping in late. Should self-correct once Findings 2–3 land.

7. **[LOW] Self-hosted font is the single largest asset (49.5KB, 1 file, correctly preloaded).** `next/font` local font (`e4af272ccee01ff0-s.p.woff2`) is preloaded and not causing CLS (size-adjust metrics are correctly applied — CLS is 0). Still worth confirming only the subsets/weights actually used are bundled, since 49.5KB is ~17% of total page weight for one file.

8. **[LOW] Images already well-optimized.** All 7 `<img>` tags use `next/image` (`data-nimg="1"`) with explicit `width`/`height` (prevents CLS) and are SVG icons/logos (vector, tiny — 18.4KB combined transfer for all 7). No raster-image/WebP-AVIF work needed. Minor nit: several small icons (28×28, 18×18) carry `loading="lazy"` even though they sit in the navbar/hero, which is visually above the fold on most viewports — lazy-loading elements already in the initial viewport can very slightly delay their paint (though none of these are large enough to be the LCP candidate, so impact is minimal). Consider `loading="eager"`/`priority` only for the true above-the-fold instances if this is revisited.

9. **[MEDIUM, process risk] No CrUX field data — cannot confirm the 75% pass Google actually grades on.** Both this audit and the 2026-07-21 baseline are single synthetic Lighthouse runs under simulated mobile throttling. Once organic traffic grows past CrUX's eligibility threshold, re-validate against real-user field data (28-day rolling) and the newly available LCP subparts (TTFB / resource load delay / resource load time / element render delay) to see whether render-delay (Finding 2) or something else dominates for real users on real networks.

## Prioritized Recommendations (by expected impact)

1. **Reopen and actually verify the "performance" fix (Finding 1).** Confirm `critters`/`optimizeCss` is inlining critical CSS in the deployed build output before re-marking this TODO item done. This is the highest-leverage item because it's the root cause blocking Findings 2, 3(partially), 4, 5, and 6 from showing measurable improvement.
2. **Inline critical CSS / defer full stylesheet (Finding 2)** — ~90-150ms off render-blocking time, direct LCP/Speed Index improvement.
3. **Reduce the 431-chunk's unused JS, likely by trimming framer-motion usage or code-splitting it further (Finding 3)** — ~270ms estimated PSI savings, plus reduces main-thread script evaluation (currently the single largest script-evaluation cost at ~381ms bootup time for this chunk).
4. **Track down and drop the legacy JS in chunk 255 (Finding 4)** — ~12KB, low effort once the offending dependency is identified.
5. **Re-check network-dependency-tree-insight (Finding 5)** after 1-2 are done — should resolve mostly as a byproduct.
6. **Audit font subsetting (Finding 7)** — low priority, CLS unaffected, free byte savings only.
7. **Re-run against CrUX field data once traffic accrues (Finding 9).**

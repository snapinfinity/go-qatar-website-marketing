# Performance / Core Web Vitals Audit — https://goqatar.app
Date: 2026-07-21
Source: Cached PageSpeed Insights (Lighthouse, mobile) — `.seo/cache/2026-07-21/psi-mobile.json`
Field data (CrUX): **Not available** — origin has insufficient Chrome traffic volume for CrUX eligibility. This assessment is **lab-only** (single Lighthouse run simulated mobile, throttled). Treat as a proxy for real-user experience, not a substitute for it.

## Score
Lighthouse Performance: **96/100** (lab)
Category score assigned by this audit: **90/100** — discounted from the raw Lighthouse score because (a) there is no field data to confirm the 75th-percentile pass required by Google, (b) LCP at 2.4s lab has limited headroom against the 2.5s "Good" ceiling before additional real-world variability (slower devices/networks, cache-cold visits) is applied, and (c) multiple unaddressed diagnostics (render-blocking CSS, forced reflow, network dependency chaining, unused/legacy JS) represent easy, low-risk wins that are currently left on the table.

## Core Web Vitals (lab, mobile)

| Metric | Value | Threshold | Status | Notes |
|---|---|---|---|---|
| LCP | 2418 ms (2.4s) | ≤2.5s Good | **Pass (narrow margin)** | Lab score 0.91. No CrUX confirmation of real 75th-percentile. |
| INP (proxy: TBT) | 50 ms TBT, 1 long task (100ms) | ≤200ms Good | **Pass (proxy only)** | TBT is a lab proxy, not INP itself; genuinely low main-thread blocking is a good sign. |
| CLS | 0 | ≤0.1 Good | **Pass** | No layout shift detected in this run. |
| FCP | 1239 ms | — | Good | |
| Speed Index | 4031 ms (4.0s) | — | **Weak (score 0.80)** | Slowest-scoring lab metric; visual completeness lags despite fast FCP/LCP. |
| TTFB | ~3 ms server response | ≤200ms Good | Excellent | Server responds essentially instantly (edge/static). |
| Total page weight | 267 KiB | — | Good | Small overall payload; 18 requests. |
| DOM size | 856 elements, depth 14 | <1,500 Good | Good | No DOM-bloat risk. |

## Key Findings

### 1. LCP resource timeline vs. actual LCP — large "render delay" gap (High)
All network resources (HTML, CSS, fonts, JS chunks) finish loading by ~241ms, yet LCP fires at 2418ms — a ~2.1s gap that is not resource-load-time but **render/hydration delay**. This points to client-side JS execution (React hydration + main-thread script evaluation) blocking the paint of the LCP element rather than network latency. This is the single biggest lever for shaving real time off LCP.

### 2. Render-blocking CSS delays first paint (High)
`_next/static/css/daee80bfde1ed29c.css` (8.3 KB transferred / 37.6 KB uncompressed) is render-blocking; Lighthouse's render-blocking-insight estimates **~450ms of potential savings** (151ms attributed directly to this file). Recommend inlining critical above-the-fold CSS and deferring the rest, or using Next.js's automatic CSS optimization more aggressively (route-level critical CSS extraction).

### 3. Unused JavaScript in a large chunk (Medium-High)
`chunks/431-c5f0e9e9e07f56e0.js` — 44 KB total, **24.1 KB (54%) unused** on this page. This is the top PSI "opportunity" (~270ms estimated savings). Audit what this chunk contains (likely a shared vendor bundle) and split/lazy-load unused code paths (e.g., dynamic `import()` for below-the-fold or rarely-used components).

### 4. Legacy JavaScript / unnecessary transpilation (Medium)
`chunks/255-98a0bdaa30757bda.js` ships ~11.8 KB of legacy polyfills/transforms not needed for modern (Baseline) browsers. Update the build target (browserslist / `next.config` transpilation target) to emit ES2020+ and drop unnecessary polyfills.

### 5. Network dependency chaining flagged (Medium)
Lighthouse's network-dependency-tree-insight failed (score 0), indicating a critical-path chain (HTML → CSS → JS chunks) that could be shortened. Combined with #2, prioritize preloading the LCP-critical resource and reducing the depth of the render-blocking chain.

### 6. Forced reflow detected (Medium)
A forced synchronous layout was flagged — JS reading geometric properties (e.g., `offsetWidth`) after a DOM/style mutation. This adds to Style & Layout main-thread time (331ms of the 1.3s total main-thread work) and can worsen interaction responsiveness on lower-end devices even though TBT looks fine on the test device. Locate the offending component and batch reads/writes (use `requestAnimationFrame` or measure-before-mutate patterns).

### 7. Web font payload is sizeable but not causing CLS (Low)
Self-hosted `e4af272ccee01ff0-s.p.woff2` (the `-s.p` suffix indicates a next/font subset/preload variant) is 49 KB — the single largest asset on the page (18% of total 267 KB payload) and loads render-blocking-adjacent (107ms–227ms). CLS is 0, so size-adjust/fallback metrics are working correctly, but 49 KB for one font file is worth checking: confirm only the actually-used weights/subsets are bundled (e.g., trim to Latin subset only, drop unused font-weights if multiple are bundled in this file).

### 8. Speed Index (4.0s) lags FCP/LCP (Medium)
Despite FCP at 1.2s and LCP at 2.4s, Speed Index is 4.0s (Lighthouse's weakest-scoring metric at 0.80). This suggests visual content above the fold continues to populate/settle well after the LCP element paints — consistent with the hydration-driven render delay in Finding #1. Reducing JS execution before/around first paint should improve this in tandem with LCP.

### 9. No field data available — verify with real users (Medium, process risk)
CrUX returned no data (insufficient traffic). All the above is a single synthetic Lighthouse run. Once traffic grows, validate against CrUX/PSI field data (28-day rolling) and against LCP subparts (TTFB, resource load delay, resource load time, element render delay) to confirm whether the hypothesis in Finding #1 (render-delay-dominated LCP) holds for real users on real devices/networks.

## Prioritized Recommendations (by expected impact)

1. **Investigate hydration/render-delay gap** (Finding #1) — profile main-thread activity between resource-completion (~240ms) and LCP paint (2418ms); look for blocking synchronous work in the LCP element's render path. Expected impact: largest — directly targets the ~2.1s gap.
2. **Eliminate/reduce render-blocking CSS** (Finding #2) — inline critical CSS, defer rest. Expected impact: ~150-450ms off FCP/LCP.
3. **Trim unused JS in the 431-chunk and split large vendor bundles** (Finding #3) — ~270ms savings, plus reduces main-thread script evaluation (currently the largest main-thread cost bucket at 419ms).
4. **Drop unnecessary legacy JS transpilation** (Finding #4) — ~12 KB savings, modest but free (build config change only).
5. **Shorten the critical-path dependency chain / preload LCP resource** (Finding #5).
6. **Fix the forced reflow source** (Finding #6) — improves resilience of interactivity metrics on lower-end devices even though INP proxy currently looks fine.
7. **Audit font subset/weights bundled in the 49 KB woff2** (Finding #7) — low priority since CLS is unaffected, but free byte savings if trimmable.
8. **Re-run against CrUX field data once traffic accrues** (Finding #9) to confirm lab findings reflect real-user 75th-percentile experience.

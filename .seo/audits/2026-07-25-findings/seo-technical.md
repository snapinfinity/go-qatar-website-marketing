# Technical SEO Audit — goqatar.app
Date: 2026-07-25
Source: `.seo/cache/2026-07-25/` snapshot (homepage.html, robots.txt, sitemap.xml, llms.txt, headers.txt, psi-mobile.json, pages/{privacy-policy,terms,contact}.html) + live curl checks for redirects/IndexNow (nothing else re-fetched).

## Score: 90/100

Strong baseline — this is a well-executed Next.js/Vercel static-marketing site. Prior audit cycle (2026-07-21) already closed most critical items (robots.ts, sitemap.ts, security headers, apex/www redirect, canonical fixes, case-variant redirect). Remaining gaps are polish-level, not structural.

---

## Findings (tagged by severity)

### Critical
None found.

### High
- **[high] Heading order still fails in latest Lighthouse pass, despite TODO item marked done.** `psi-mobile.json` → `accessibility_audits`/`failed_audits` still reports `heading-order`: "Heading elements are not in a sequentially-descending order" (score 0) on the 2026-07-25 snapshot, even though `.seo/STATE.md` logs "fix footer heading-order skip" as completed on 2026-07-21. Either the fix wasn't deployed, was reverted, or only partially addressed the skip. Needs a fresh manual check of the footer's heading hierarchy (likely an `<h3>` used without a preceding `<h2>` in that section) and a re-run of PSI to confirm before closing.

### Medium
- **[medium] CSP relies on `'unsafe-inline'` for script-src and style-src.** `Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; ...` (from `headers.txt` and live curl). This blocks inline-script/style injection vectors far less than a nonce- or hash-based CSP. Given Next.js's static export here (no dynamic inline scripts needed beyond the hydration bootstrap and JSON-LD), consider migrating to `strict-dynamic` + per-request nonces, or at minimum hashing the known inline JSON-LD/style blocks, to remove `'unsafe-inline'` from `script-src`.
- **[medium] Render-blocking requests + JS chaining still flagged.** PSI mobile `failed_audits` shows `render-blocking-insight` (~90ms est. savings) and `network-dependency-tree-insight` (critical-request-chain warning). Lab LCP is 2.3s (good) and CLS is 0 (good), but Speed Index is 4.2s (score 0.77, "needs improvement" band) — the visual-completeness lag is worth closing before it becomes a CWV field-data problem once CrUX has enough traffic (see Low note on CrUX below).
- **[medium] No IndexNow key/endpoint configured.** Confirmed `https://goqatar.app/indexnow.txt` and no IndexNow key file returns 404. Bing/Yandex/Naver won't get push-based instant-index signals; site relies solely on pull-based crawling via sitemap. Low effort, meaningful for a newly-launched site trying to get indexed fast (STATE.md still lists "submit sitemap to GSC" as open).

### Low
- **[low] Redirect responses are inconsistent on security headers.** `https://goqatar.app/contact/` (trailing-slash normalization, 308) and the `www→apex`/case-variant 308s were compared: the trailing-slash redirect response omits `Content-Security-Policy`, `Cross-Origin-Opener-Policy`, `Permissions-Policy`, and `X-Content-Type-Options` (only `Strict-Transport-Security` present), while the www→apex and case-variant redirects carry the full header set. Cosmetic/non-exploitable since redirects have no body, but worth aligning in `next.config.ts` headers() matcher for consistency.
- **[low] No CrUX field data yet.** `psi-mobile.json` → `crux.error`: "No CrUX data for this origin. The site likely has insufficient Chrome traffic volume for eligibility." Expected for a new site — flagging so the next audit cycle knows to re-check field LCP/INP/CLS once traffic accumulates; lab data alone (LCP 2.3s, CLS 0, TBT 45ms) should not be treated as a substitute for field Core Web Vitals in GSC.
- **[low] Legacy JS polyfills still present (partial).** `legacy-javascript-insight` scores 0.5, ~12 KiB estimated savings — smaller than the previously logged 54%-unused-JS finding, suggesting the prior JS-splitting fix landed but transpilation target (likely still targeting older browsers via `browserslist`/babel legacy transforms) wasn't fully modernized to Baseline/ES2020+.
- **[low] robots.txt has no explicit AI-crawler directives.** Current file is minimal (`User-Agent: *` / `Allow: /` + sitemap pointer), which does allow all crawlers including GPTBot/ClaudeBot/PerplexityBot by default — functionally fine given llms.txt is published — but if the business wants to explicitly opt in/out of specific AI training crawlers vs. answer-engine crawlers, that distinction isn't expressed. Optional, not a defect.

---

## Passing / Verified Clean (no action needed)

**Crawlability**
- `robots.txt` valid, `Allow: /`, correct `Sitemap:` pointer to `https://goqatar.app/sitemap.xml`. PSI `robots-txt` audit: pass.
- `sitemap.xml` returns 200, `Content-Type: application/xml`, well-formed, lists all 4 canonical pages (/, /contact, /privacy-policy, /terms) with `lastmod`. No orphaned or excluded pages found.
- 404 handling correct: unknown paths return true HTTP 404 (`X-Next-Error-Status: 404`), not a soft-404 200.
- `llms.txt` published and well-structured for AI/GEO discovery.

**Indexability**
- `meta name="robots" content="index, follow"` and `googlebot` directive (`max-image-preview:large`) present and permissive on homepage, /contact, /privacy-policy, /terms.
- Self-referencing canonicals correct and unique on all 4 pages (verified via curl/grep: `/` → `https://goqatar.app`, `/contact` → `.../contact`, `/privacy-policy` → `.../privacy-policy`, `/terms` → `.../terms`). The previously-logged og:url bug on /contact is confirmed fixed (og:url now matches canonical).
- PSI `canonical` and `is-crawlable` SEO audits: pass (score 1).

**Canonicalization / Redirects**
- `www.goqatar.app` → `https://goqatar.app/` : single-hop 308, no chain.
- `http://goqatar.app/` → `https://goqatar.app/` : single-hop 308.
- Case-variant `/Privacy-Policy` → `/privacy-policy` : 308, confirms the previously-logged fix is live.
- Trailing slash `/contact/` → `/contact` : 308 (Next.js default normalization).
- No redirect chains >1 hop detected in any path tested.

**Security Headers** (from live `headers.txt` on `/`)
- HTTPS enforced, HSTS: `max-age=63072000; includeSubDomains; preload` (2-year max-age, eligible for preload list).
- `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Cross-Origin-Opener-Policy: same-origin`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()` all present — full header set from the 2026-07-21 fix is live in production.
- CSP present (see Medium finding above re: `unsafe-inline`).

**URL Structure**
- Clean, lowercase, hyphenated paths (`/privacy-policy`, `/terms`, `/contact`); no query-string-based content URLs; no session IDs or tracking params in canonical URLs.

**Mobile**
- `<meta name="viewport" content="width=device-width, initial-scale=1"/>` present.
- `site.webmanifest` present and served with correct `application/manifest+json` content-type, theme-color set.
- No mobile-specific PSI failures beyond the general accessibility issues noted above (color-contrast, heading-order — both apply to both form factors, not mobile-specific).

**Core Web Vitals (lab, mobile — PSI/Lighthouse, 2026-07-25)**
- LCP: 2.33s → **Good** (<2.5s threshold), score 0.93.
- CLS: 0 → **Good** (<0.1 threshold), score 1.0 — no layout-shift risk detected.
- TBT: 45ms (proxy for INP responsiveness) → **Good**, score 1.0. No INP field data available yet (see CrUX note) but lab signal is strong.
- FCP: 0.96s. Speed Index 4.2s is the one soft spot (see Medium).
- Lighthouse category scores: Performance 96, Accessibility 95, Best Practices 100, SEO 100.
- No FID references present or needed (correctly using INP-only framing).

**Structured Data**
- Valid JSON-LD `@graph` on homepage: `Organization` (with `contactPoint`, `sameAs` to App Store/Play Store, `parentOrganization`), `WebSite`. Confirms 2026-07-21 schema fix is live. (Detailed schema validation/coverage is owned by the schema sub-audit — flagging presence/parse-validity only here.)
- JSON-LD parses cleanly (validated via JSON.parse in this audit).

**JS Rendering**
- Site is server-rendered/prerendered by Next.js (`X-Nextjs-Prerender: 1` header, `X-Vercel-Cache: HIT`). Full page copy (headline, feature list, stats, nav) is present in raw HTML — confirmed by stripping `<script>`/`<style>` and extracting body text from `homepage.html`: all key content (hero copy, "50+ Zones Covered", "Free To Download", feature descriptions) is present without executing JS. No CSR-only content risk for crawlers that don't render JS.

**IndexNow / Sitemap Submission**
- Sitemap correctness verified (see above). GSC submission itself remains an open manual TODO item already tracked in `.seo/TODO.md` (not re-flagged here as a new finding, just confirmed still outstanding).

---

## Ready-to-paste snippets (for user/maintainer to apply — NOT applied to source by this audit)

### 1. Tighten CSP (remove `unsafe-inline` from script-src via nonce)
```ts
// next.config.ts — headers() function, CSP value
// Requires a per-request nonce generated in middleware.ts and threaded into <Script> tags.
// Example CSP once nonce is wired up:
"default-src 'self'; script-src 'self' 'nonce-__NONCE__' 'strict-dynamic'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'"
```
(Style-src `unsafe-inline` is lower risk and commonly kept for CSS-in-JS/Tailwind setups; script-src is the priority to fix.)

### 2. IndexNow key file (static, no server logic needed)
```
// public/<32-64-char-hex-key>.txt
<same-key-string-as-filename>
```
Then ping on publish/update:
```bash
curl "https://api.indexnow.org/indexnow?url=https://goqatar.app/&key=<key>&keyLocation=https://goqatar.app/<key>.txt"
```
Bing/Yandex/Naver share the same IndexNow endpoint, so one submission covers all three.

### 3. Align security headers on redirect responses
```ts
// next.config.ts — ensure the headers() source matcher includes redirect-triggering paths
// (e.g. match on '/:path*' broadly rather than only page routes) so 308s from
// trailing-slash normalization also carry CSP/COOP/Permissions-Policy/X-Content-Type-Options.
```

### 4. Re-verify footer heading order
```html
<!-- Audit footer markup for a pattern like: -->
<h3>Section title</h3>  <!-- with no preceding <h2> in that region of the DOM -->
<!-- Fix: either promote the footer section heading to <h2>, or nest it correctly
     under the nearest preceding <h2> so levels are never skipped. -->
```

---

## Notes for next audit cycle
- Re-run PSI after the heading-order fix lands and confirm `accessibility_audits` no longer lists it.
- Once CrUX has traffic, re-check field LCP/INP/CLS in `psi-mobile.json` → `crux` (currently empty/ineligible) rather than relying solely on lab data.
- GSC sitemap submission and /contact, /privacy-policy, /terms indexing requests remain open per `.seo/TODO.md` — outside this audit's scope to execute, but indexability is technically clean and ready once submitted.

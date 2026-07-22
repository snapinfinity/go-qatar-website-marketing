# Technical SEO Audit — goqatar.app (2026-07-21)

Site: https://goqatar.app (Next.js 15 App Router, hosted on Vercel)
Source reviewed: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/contact/`, `src/app/privacy-policy/page.tsx`, `src/app/terms/page.tsx`, `next.config.ts`, `public/`
Snapshot used: `.seo/cache/2026-07-21/` (homepage.html, pages/*.html, psi-mobile.json, manifest.txt) + live header/redirect checks performed 2026-07-21.

## Technical Score: 64 / 100

Scoring rationale: strong Core Web Vitals, clean URL structure, and good SSR/crawlability fundamentals are offset by a **critical duplicate-content exposure (apex + www both resolve 200 with no canonical tag anywhere)**, **missing robots.txt/sitemap.xml**, and a stack of missing security headers (CSP, XFO/COOP, HSTS hardening) confirmed by both source inspection and live curl checks.

---

## 1. Crawlability — FAIL

- **robots.txt = 404** (live-confirmed, matches manifest). No `src/app/robots.ts` in source. Nothing blocks crawling by default (no disallow rules exist at all), but the absence means no explicit sitemap pointer, no crawl-delay control, and no AI-crawler token guidance (GPTBot, ClaudeBot, PerplexityBot, etc. get no explicit allow/deny signal).
- **sitemap.xml = 404** (live-confirmed). No `src/app/sitemap.ts`. Site only has 4 real routes (/, /privacy-policy, /terms, /contact) so the practical crawl-discovery impact is small today, but there is zero machine-readable inventory for Google/Bing, and no sitemap reference is possible in robots.txt because robots.txt doesn't exist either.
- **llms.txt = 404** — no AI-crawler guidance file present (optional but increasingly expected for AI answer-engine visibility).
- Meta robots tag on homepage: `<meta name="robots" content="index, follow">` and `<meta name="googlebot" content="index, follow, max-image-preview:large">` — correct, no accidental noindex. Confirmed identical intent in `layout.tsx` (`robots: { index: true, follow: true, googleBot: {...} }`).
- Lighthouse SEO audit `is-crawlable` = pass.
- No `X-Robots-Tag` header observed on any live response.

## 2. Indexability — FAIL (critical gap)

- **No canonical tag anywhere** — confirmed via grep on the cached homepage HTML (`rel="canonical"` / `alternates` — zero matches) and via source review of `layout.tsx`, `contact/page.tsx`, `privacy-policy/page.tsx`, `terms/page.tsx` (none export `alternates.canonical`).
- **Critical: apex and `www` both serve identical 200 content with no redirect between them.** Live check:
  - `https://goqatar.app` → 200 (content-length 99520, ETag `24066c02...`)
  - `https://www.goqatar.app` → 200, **same ETag**, same content-length — i.e. Vercel is serving the exact same deployment on both hosts with no host-canonicalization redirect.
  - Combined with the missing canonical tag, this is a textbook duplicate-content setup: two fully indexable, identical URLs for every page with no signal to consolidate ranking signals. `og:url` in the homepage `<head>` claims `https://goqatar.app` but that's not enforced by any redirect or canonical link.
- Per-page titles/descriptions are unique and reasonable (`Go Qatar — Your City. Your Way.`, `Contact Us — Go Qatar`, `Privacy Policy — Go Qatar`, `Terms & Conditions — Go Qatar`) — no duplicate/thin-title risk across the 4 routes themselves.
- No structured data (JSON-LD) anywhere in `src/` (grep for `ld+json`/`JsonLd` returned no matches) — missed opportunity for `SoftwareApplication`/`Organization` schema on an app-marketing site (would support rich results / app install snippets).
- Custom 404 confirmed working (`/this-page-does-not-exist-xyz` → 404 status, not soft-404).
- Trailing-slash URLs (`/privacy-policy/`) correctly 308-redirect to the non-trailing-slash canonical form (`/privacy-policy`) — good, but this redirect exists at the Vercel/Next.js routing layer, not reinforced by an actual `<link rel=canonical>`.

## 3. Security — FAIL (multiple missing headers)

Live header check on `https://goqatar.app`:
- `Strict-Transport-Security: max-age=63072000` — present, but **missing `includeSubDomains` and `preload`** (flagged by PSI `has-hsts` audit, Medium severity).
- **No `Content-Security-Policy` header** — confirmed by both PSI (`csp-xss` audit: "No CSP found in enforcement mode", High) and live curl (header absent).
- **No `X-Frame-Options` and no frame-control CSP directive** — PSI `clickjacking-mitigation`: "No frame control policy found", High severity. Confirmed absent in live curl.
- **No `Cross-Origin-Opener-Policy` (COOP)** — PSI `origin-isolation`: High severity. Confirmed absent live.
- **No `X-Content-Type-Options`, no `Referrer-Policy`, no `Permissions-Policy`** — all absent from live response headers.
- No Trusted-Types CSP directive (PSI `trusted-types-xss`, High).
- Root cause: `next.config.ts` has no `headers()` function at all, and there is no `vercel.json` / `_headers` file in the repo — security headers are simply never set at any layer.
- HTTPS enforced correctly: `http://goqatar.app` → 308 redirect to `https://goqatar.app/`. TLS itself is fine (Vercel-managed cert).
- `Access-Control-Allow-Origin: *` is present globally (Vercel default for static assets) — low risk for a marketing site with no sensitive API responses, but worth confirming `/api/contact` doesn't inherit this permissive CORS default.

## 4. URL Structure / Redirects — PASS (with the www/apex caveat above)

- Clean, descriptive, lowercase paths: `/`, `/privacy-policy`, `/terms`, `/contact` — no query-string cruft, no session IDs, no unnecessary nesting.
- HTTP→HTTPS: 308 permanent redirect, single hop. Good.
- Trailing-slash → non-trailing-slash: 308, single hop. Good.
- Case sensitivity: `/Privacy-Policy` → 404 (not redirected to canonical lowercase `/privacy-policy`) — Low severity, but a case-variant internal/external link would dead-end instead of resolving.
- **www vs apex is not redirected either direction** (see Indexability section) — this is the one URL-structure item that is a real problem, cross-listed above as Critical.

## 5. Mobile-Friendliness — PASS

- Correct responsive viewport meta: `width=device-width, initial-scale=1`.
- PSI mobile Lighthouse: Performance 96, Accessibility 90, Best Practices 100, SEO 100.
- Tailwind responsive utility classes throughout (`sm:`, `lg:` breakpoints) confirm mobile-first layout.
- One accessibility nit with mobile UX relevance: `select` element in the (likely lower-page use-case) form has no associated label (PSI `select-name` audit, score 0) — affects screen-reader/touch users on that form control specifically.
- Touch targets in nav/buttons appear adequately sized in source (px-4/py-2+ padding on interactive elements); no PSI tap-target failures reported.

## 6. Core Web Vitals — PASS

Per cached PSI mobile Lighthouse run (`psi-mobile.json`, timestamp 2026-07-21T10:33:03Z):
- **LCP: 2.4s** — borderline edge of "Good" (<2.5s threshold), lab score 0.91. Render-blocking CSS (`daee80bfde1ed29c.css`, 8.3KB) estimated to cost 151ms and is flagged as a render-blocking-insight (Est. savings 450ms) — addressing this would move LCP more comfortably into the "Good" band rather than sitting right at the edge.
- **CLS: 0** — excellent, no layout-shift issues detected.
- **TBT: 50ms** — excellent (INP proxy for lab data); note field-level INP has no CrUX data yet (site has insufficient Chrome traffic volume — `crux.error` in the report), so this is lab-only confidence, not confirmed field data.
- Speed Index 4.0s (score 0.80) is the weakest lab metric — driven by JS-heavy hydration (18 requests, 267KB total, largest chunk `4bd1b696...js` at 56KB transfer / 173KB uncompressed).
- Opportunity: "Reduce unused JavaScript" — 24KB in `431-c5f0e9e9e07f56e0.js` chunk, ~270ms potential savings.
- No CrUX (field) data available yet — site likely below Chrome UX Report traffic threshold; PSI/Lighthouse numbers above are lab-only and should be revisited once real-user field data becomes available.

## 7. Structured Data — FAIL (not implemented)

- No JSON-LD anywhere in `src/` — grep for `ld+json`/`JsonLd`/`application/ld` returned zero matches project-wide.
- Recommend adding `SoftwareApplication` (with `operatingSystem`, `applicationCategory: "TravelApplication"` or `NavigationApplication`, `aggregateRating` if available from store reviews, `offers` for free price) and `Organization`/`WebSite` schema at minimum. This is a mobile-app marketing site — `SoftwareApplication` schema is directly applicable and currently a missed rich-result opportunity.

## 8. JavaScript Rendering — PASS

- Homepage is server-rendered/prerendered: `X-Nextjs-Prerender: 1` header confirmed live, and full text content (H1, body copy, feature descriptions, footer links) is present in the raw HTML response — verified core content (`<h1>Your City.</h1>`, feature section copy, nav links) renders without executing JS.
- One isolated client-side bailout (`BAILOUT_TO_CLIENT_SIDE_RENDERING` template marker) is scoped to the animated phone-mockup screenshot carousel in the hero — decorative/non-indexable content, not core copy. Confirmed via grep this appears once and is contained to that widget's `<template data-dgst="BAILOUT_TO_CLIENT_SIDE_RENDERING">`.
- No CSR-only shell / empty-`<div id="root">` pattern — this is a healthy Next.js App Router SSR setup, low JS-rendering risk for crawlers (including non-JS-executing crawlers/LLM bots).

## 9. IndexNow Protocol — NOT IMPLEMENTED

- No IndexNow key file found at `/indexnow.txt` or in `public/` (404 live-checked).
- No sitemap exists to reference or push via IndexNow in the first place — this is a natural side-effect of missing sitemap.ts/robots.ts. Low priority given the tiny, low-change-frequency route set (4 pages), but worth wiring up once dynamic content (e.g., a news/blog section) is added.

---

## Prioritized Recommendations

**Critical**
1. Add a host-canonicalization redirect (www → apex or apex → www, pick one) in `next.config.ts` `redirects()` or at the Vercel project level — currently both hosts serve identical 200 content with matching ETags and no consolidation signal.
2. Add `alternates: { canonical: "..." }` to metadata in `layout.tsx` and each page (`page.tsx`, `contact/page.tsx`, `privacy-policy/page.tsx`, `terms/page.tsx`) so self-referencing canonicals exist even after the redirect fix.

**High**
3. Create `src/app/robots.ts` (Next.js App Router metadata route) generating a proper robots.txt with `Sitemap:` pointer and explicit AI-crawler bot handling per the seo-technical skill's crawler-token guidance.
4. Create `src/app/sitemap.ts` covering `/`, `/privacy-policy`, `/terms`, `/contact` with `lastModified` dates.
5. Add security headers via `next.config.ts` `headers()` (or `vercel.json`): `Content-Security-Policy`, `X-Frame-Options: DENY` (or CSP `frame-ancestors`), `Cross-Origin-Opener-Policy: same-origin`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`.
6. Strengthen HSTS to `max-age=63072000; includeSubDomains; preload`.

**Medium**
7. Add `SoftwareApplication`/`Organization`/`WebSite` JSON-LD structured data to the homepage.
8. Eliminate the 151ms render-blocking CSS request and trim the 24KB unused JS in `431-c5f0e9e9e07f56e0.js` to pull LCP more safely under the 2.5s "Good" threshold (currently 2.4s, on the edge).
9. Add a case-insensitive/lowercase-normalizing redirect for URL paths (e.g. `/Privacy-Policy` → `/privacy-policy`) instead of 404.

**Low**
10. Add an `<label>`/`aria-label` to the unlabeled `<select>` element flagged by Lighthouse.
11. Fix heading-order anomaly in the footer (`<h4>Product</h4>` skipping a level).
12. Consider an `llms.txt` file for AI-crawler/answer-engine guidance.
13. Implement IndexNow ping once a sitemap exists and content starts changing more frequently (e.g., if a news feed page is added).

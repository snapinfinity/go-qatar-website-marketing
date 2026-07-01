# Go Qatar — Full SEO Audit Report
**Site:** https://goqatar.app  
**Date:** 2026-06-27  
**Business Type:** Mobile App Marketing Site (Navigation, Travel)  
**Stack:** Next.js 15.5.19 (App Router) on Vercel  
**Auditors:** Technical, Content, Schema, Sitemap, Performance, Images, GEO, SXO (8 parallel specialists)

---

## SEO Health Score: 44 / 100

| Category | Weight | Score | Weighted |
|----------|--------|-------|---------|
| Technical SEO | 22% | 49/100 | 10.78 |
| Content Quality | 23% | 54/100 | 12.42 |
| On-Page SEO | 20% | 45/100 | 9.00 |
| Schema / Structured Data | 10% | 0/100 | 0.00 |
| Performance (CWV) | 10% | 55/100 | 5.50 |
| AI Search Readiness | 10% | 31/100 | 3.10 |
| Images | 5% | 72/100 | 3.60 |

**Score with all High/Critical fixes applied: ~68/100 (estimated)**

---

## Executive Summary

Go Qatar has a well-designed marketing site with strong visual identity, correct metadata structure, and a clear value proposition for Qatar's navigation niche. However, the site is currently **near-invisible to search engines** due to three foundational failures that must be resolved before any other SEO work matters:

1. **robots.txt and sitemap.xml both return HTTP 404** — crawlers have no discovery mechanism and no directive file
2. **Zero structured schema markup** — Google cannot classify this as an app or generate rich results
3. **All inner page titles contain duplicate branding** ("Contact Us — Go Qatar | Go Qatar") — a metadata rendering bug

Beyond these, the site faces a structural challenge: every homepage section is a `"use client"` component using Framer Motion, reducing SSR content density and increasing JavaScript weight. The site has no blog, no FAQ, no user reviews with real ratings, and no content targeting awareness-stage queries ("how does Qatar's addressing system work") — the queries that dominate the SERP for this niche.

**The most valuable insight from the SXO analysis:** The site sells features to users who already know they want Go Qatar. The SERP audience is mostly still learning that Qatar's Zone/Street/Building system requires a specialized app. This content gap is the biggest long-term traffic opportunity.

---

## Top 5 Critical Issues

| # | Issue | Impact | Pages |
|---|-------|--------|-------|
| 1 | robots.txt returns HTTP 404 | Crawl control absent; sitemap can't be declared | All |
| 2 | sitemap.xml returns HTTP 404 | Pages not submitted to Google; no crawl discovery | All |
| 3 | Zero structured data (JSON-LD) | No app rich results, no entity recognition by AI | All |
| 4 | Page title duplication on inner pages | SERP titles show "Brand — Go Qatar \| Go Qatar" | /contact, /privacy-policy, /terms |
| 5 | No canonical tags on any page | URL variations can split link equity | All |

---

## Top 5 Quick Wins

| # | Win | Effort | Impact |
|---|-----|--------|--------|
| 1 | Deploy robots.ts + sitemap.ts (already written by sitemap agent) | 5 min (git push) | High |
| 2 | Fix title exports in inner pages (strip "— Go Qatar" from page titles) | 15 min | High |
| 3 | Add `alternates.canonical` to layout.tsx and each page | 20 min | High |
| 4 | Add MobileApplication + Organization JSON-LD to layout.tsx | 30 min | Critical |
| 5 | Add llms.txt to /public | 10 min | Medium–High |

---

## Technical SEO (Score: 49/100)

### Critical

**robots.txt — HTTP 404**  
No robots.txt file. The sitemap agent has created `src/app/robots.ts` locally. Deploy to fix.

**sitemap.xml — HTTP 404**  
No XML sitemap. The sitemap agent has created `src/app/sitemap.ts` locally. Deploy to fix.  
After deploy: submit `https://goqatar.app/sitemap.xml` in Google Search Console.

### High

**No canonical tags on any page**  
Add to `layout.tsx` metadata:
```typescript
metadataBase: new URL("https://goqatar.app"),
alternates: { canonical: "/" },
```
And override per page: `alternates: { canonical: "/contact" }` etc.

**og:url hardcoded to homepage on all subpages**  
Every page inherits the root layout's `openGraph.url = "https://goqatar.app"`. When `/privacy-policy` or `/contact` is shared on social, it shows the homepage URL and title. Add page-specific `openGraph` blocks to each page's metadata export.

**5 missing security headers**  
Missing: `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`.  
Add via `next.config.ts` headers config or `vercel.json`. HSTS is present (✅).

**Contact page query params create duplicate content risk**  
Footer links to `/contact?tab=help` and `/contact?tab=feedback` may be indexed as separate pages. Refactor to hash fragments or add canonical pointing to `/contact`.

### Medium

**All homepage sections use `"use client"` unnecessarily**  
HeroSection, FeaturesSection, StatsSection, HowItWorksSection, NewsSection, AppScreensSection, BusinessAPISection, DownloadSection, UpcomingSection — all client components. This increases JS bundle, hydration cost, and reduces SSR content density that Googlebot can parse in the initial response. Extract animation wrappers to separate client components; keep static content in server components.

**No IndexNow implementation**  
Instant crawl notification for Bing/Yandex on deploy. Trivial to add.

### Low

**Web manifest `purpose` field**  
Both PWA icons use `"purpose": "any maskable"` — should be split into separate `"any"` and `"maskable"` entries per W3C spec.

**No 16×16 favicon.ico**  
Only 32×32 PNG is declared as `shortcut icon`. Add traditional ICO or 16px PNG.

---

## Content Quality & E-E-A-T (Score: 54/100)

### E-E-A-T Summary

| Factor | Score | Notes |
|--------|-------|-------|
| Experience | 2/5 | Fabricated social proof (colored circles, no ratings count) |
| Expertise | 3/5 | Features described accurately but no named author/expert |
| Authority | 2/5 | No press, no backlinks, snapinfinity.com serves a Vite placeholder |
| Trust | 3/5 | Privacy policy & ToS present; Gmail contact email undermines business credibility |

### Critical

**Title duplication on all inner pages**  
Template `"%s | Go Qatar"` + page titles already containing "Go Qatar" = double branding.

| Page | Rendered Title |
|------|---------------|
| /contact | "Contact Us — Go Qatar \| Go Qatar" |
| /privacy-policy | "Privacy Policy — Go Qatar \| Go Qatar" |
| /terms | "Terms & Conditions — Go Qatar \| Go Qatar" |

Fix: Remove "— Go Qatar" from each page's `title` export. Let the template append it once.

### High

**H1 contains no target keywords**  
"Your City. Your Way." is a brand tagline. It contains zero search-intent keywords. Googlebot has no clear topical signal from the primary heading.  
Recommendation: Restructure or add a subtitle H2: "Qatar's Address Finder — Zone, Street & Building Navigation App"

**Fabricated social proof**  
The hero section shows 4 placeholder colored circles with static 5-star rating and "Loved by Qatar residents." No real review count, no star rating number, no user names.  
Fix: Display actual App Store/Play Store rating (fetch from iTunes API or hard-code from the live listings). Even "4.7 stars on App Store" with a link is infinitely stronger.

**Gmail contact email**  
`help.goqatar@gmail.com` is visible on Privacy Policy, Terms, and Business API inquiry form. A domain email (`support@goqatar.app`) strongly signals legitimacy for business API inquiries.

**snapinfinity.com serves a Vite placeholder**  
The `rel="author"` link points to a blank scaffolded page. LLMs and quality raters that follow this link find nothing. Fix the developer website or remove the link until it has content.

### Medium

**"50+ Zones Covered" is ambiguous and uncited**  
Qatar has 8 municipalities; the zone numbering goes up to the 90s. "50+ zones" is unexplained. Add a footnote or link to Qatar's official municipal zone reference.

**"Works Offline" vs "Real-time Location Data" conflict**  
The DownloadSection claims "Works Offline"; the StatsSection claims "Real-time Location Data, Powered by Google Maps." These are contradictory without qualification. Clarify: "Core address lookup works offline; live map requires internet."

**Superlative claims in UpcomingSection**  
"Cheapest fares," "Lowest fare guarantee," "Cheapest cab guarantee" — unsubstantiated superlatives. Google quality raters flag these. Remove or qualify with "competitive pricing" until the features launch.

**No blog or content marketing**  
No `/blog`, `/news`, `/guides`. The entire SEO footprint is 4 pages. A single article on "Qatar's Zone Street Building Address System Explained" (1,500+ words) would establish topical authority and generate natural backlinks from expat sites, Qatar forums, and government directories.

---

## On-Page SEO (Score: 45/100)

### H2 Structure (Homepage)

| H2 | Keyword Signal | AI-Extractable |
|----|---------------|----------------|
| "Everything you need to navigate Qatar" | Good | Partial |
| "Every screen, perfectly designed" | Weak | No |
| "Find any address in 3 simple steps" | Good | Yes |
| "Stay updated with Qatar's latest" | Moderate | No |
| "Need the Go Qatar API for your business?" | Good | Yes (only question-form) |
| "Get Go Qatar for free today" | Moderate | Partial |

Only 1 of 8 H2 headings uses question form. AI Overviews strongly prefer question-based headings for extraction.

### Missing On-Page Elements

- No FAQ section on homepage (despite having a good FAQ on /contact)
- No "About" or "About Us" section
- No testimonials with attribution
- No app version / last updated date
- No download count ("Join thousands" — quantify this)
- No "as seen in" or press logos

---

## Schema / Structured Data (Score: 0/100)

**Zero JSON-LD on any page.** This is the largest single missed opportunity.

### Required Schema (Priority Order)

**1. MobileApplication (Critical — add to homepage)**
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MobileApplication",
      "name": "Go Qatar",
      "description": "Navigate Qatar using Zone, Street & Building addresses. Free iOS and Android app.",
      "applicationCategory": "TravelApplication",
      "operatingSystem": "iOS, Android",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "downloadUrl": "https://apps.apple.com/us/app/go-qatar/id6756709380",
      "installUrl": "https://play.google.com/store/apps/details?id=com.snapinfinity.goqatar",
      "author": { "@type": "Organization", "name": "Snap Infinity", "url": "https://snapinfinity.com" },
      "screenshot": "https://goqatar.app/og-image.png",
      "featureList": "Zone/Street/Building address search, Live Google Maps, Offline support, Favourites, Search history, Qatar news feed"
    },
    {
      "@type": "Organization",
      "name": "Snap Infinity",
      "url": "https://snapinfinity.com",
      "logo": "https://goqatar.app/logos/app_icon.svg",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "help.goqatar@gmail.com",
        "contactType": "customer support"
      },
      "sameAs": [
        "https://apps.apple.com/us/app/go-qatar/id6756709380",
        "https://play.google.com/store/apps/details?id=com.snapinfinity.goqatar"
      ]
    },
    {
      "@type": "WebSite",
      "name": "Go Qatar",
      "url": "https://goqatar.app"
    }
  ]
}
```

**2. BreadcrumbList (High — add to /contact, /privacy-policy, /terms)**

**3. WebPage with dateModified (Medium — /privacy-policy, /terms)**  
Both pages have "Last updated: June 2025" — expose this in schema.

---

## Performance (Score: 55/100 — estimated, no CrUX data)

### Key Issues

**Hero animations start at opacity: 0**  
The H1 headline uses `initial={{ opacity: 0, y: 40 }}`. The LCP candidate is hidden until JavaScript hydrates. This delays Largest Contentful Paint.

**Full Framer Motion bundle (~50–70KB gzipped)**  
Switch to `<LazyMotion features={domAnimation}>` with `<m.div>` to reduce to ~17KB.

**Infinite background animations consume CPU**  
AppScreensSection clock hands rotate with `repeat: Infinity` regardless of scroll position. Add viewport-scoped animations.

**Positive signals:**
- Inter font loaded via WOFF2 preload ✅
- Next.js Image component used throughout (auto-WebP) ✅
- SVG icons inlined (zero HTTP requests) ✅
- Pre-rendered by Vercel (fast TTFB from CDN) ✅
- Async JS chunks (no render-blocking) ✅

---

## AI Search Readiness / GEO (Score: 31/100)

### Critical

**llms.txt missing**  
No `llms.txt` at `https://goqatar.app/llms.txt`. The file should be created at `/public/llms.txt` immediately. Template provided in `findings/geo.md`.

**No citable prose passages**  
Every section is UI microcopy (short punchy fragments). AI extractors need 134–167 word prose blocks that answer a specific question. The HowItWorksSection comes closest but is split across animated cards.

### The Opportunity

Qatar's Zone/Street/Building system is a **low-competition, high-opportunity AI search niche**:
- No Wikipedia article exists on the Qatar ZSB system
- LLMs have sparse training data on Qatar addressing
- The first site to publish 500+ words of citable prose explaining the system will dominate AI-generated answers for years

### High

**No FAQ with question-form headings**  
Add 6–8 FAQ questions to the homepage. Target: "What is the Zone Street Building address system?", "Is Go Qatar free?", "Does it work offline?", "What areas does it cover?"

**No YouTube demo video**  
YouTube presence has the strongest correlation (~0.737) with LLM citation frequency. A 60-second app walkthrough would strengthen entity recognition across ChatGPT, Perplexity, and Google AIO.

### Platform Scores

| Platform | Score | Primary Blocker |
|----------|-------|----------------|
| Google AI Overviews | 18/100 | No schema, no FAQ, no canonical |
| ChatGPT | 22/100 | No llms.txt, no Wikipedia entity |
| Perplexity | 30/100 | SSR content helps; robots.txt missing |
| Bing Copilot | 20/100 | No schema, no sitemap served |

---

## Search Experience Optimization (SXO)

**Page-type match:** Correct (product landing page for a mobile app) — but with a structural mismatch.

**The core insight:** The page sells features to users who already know they want Go Qatar. The SERP audience is mostly still asking "what app should I use for Qatar addresses?" or "how do Qatar zone addresses work?" — awareness-stage queries the page cannot currently serve.

### Persona Scores

| Persona | Score | Blocker |
|---------|-------|---------|
| Confused New Arrival (awareness) | 31/100 | Page assumes reader knows what ZSB addresses are |
| Comparison Shopper (consideration) | 50/100 | No "why Go Qatar vs. alternatives" section |
| Business/Logistics User | 48/100 | BusinessAPI section buried; no separate /business page |
| Airport Arrival (download intent) | 63/100 | Dual store buttons; no device-detection CTA |
| Branded Query (returning user) | 74/100 | Clear, consistent — best-served persona |

### Quick SXO Wins

1. Add one sentence above the hero: "Qatar uses a unique address format most map apps can't read. Go Qatar decodes it." — costs zero design effort, captures awareness users.
2. Implement device detection for the hero CTA: show "Download for iPhone" or "Download for Android" based on `navigator.userAgent` (function `getDeviceStoreLink()` already exists in storeLinks.ts).
3. Add a 3-column "vs. alternatives" comparison: what Go Qatar has that QPLACES and Qaddress don't (news feed, Waze integration, cross-device sync).

---

## Images (Score: 72/100)

**Issues:**
- App icon in hero badge uses `alt=""` — should be `alt="Go Qatar app icon"`
- OG image dimensions declared as 1200×630 but not verified against actual file
- No real app screenshots in schema `screenshot` property (only OG image)
- Both PWA manifest icons use combined `"any maskable"` purpose

**Passes:**
- All favicons exist and are accessible ✅
- OG image URL is correct and accessible ✅
- Twitter Card `summary_large_image` set ✅
- Next.js Image component used throughout ✅

---

## Backlinks (Tier 0 — Common Crawl Only)

No Moz or Bing API keys configured. Common Crawl metrics unavailable at audit time.

**Assessment:** As a recently launched app marketing site on a new `.app` TLD, goqatar.app likely has minimal backlinks. The primary link building opportunities are:

1. **App store listings** — Play Store and App Store pages are themselves indexed and linked
2. **Expat directories** — ExpatWoman Qatar, Expatica Qatar, Qatar Living forum posts
3. **Qatar tech blogs** — The Peninsula, Qatar Tribune digital editions
4. **Government portals** — MOI Qatar, QatarFoundation if eligible
5. **App review sites** — AppAdvice, AppFollow, AlternativeTo

**Priority link target:** A "How Qatar's addressing system works" guide on the site would naturally attract links from expat resources, travel blogs, and Qatar business directories.

---

## Competitive Context (from SXO Analysis)

Top competitors in SERP for "Qatar navigation app":
1. QPLACES (Play Store + App Store) — occupies 2 top-3 positions
2. QNAS (qnas.qa) — government tool, high trust
3. Qaddress — established competitor
4. ExpatWoman/Expatica round-ups — informational dominance

**Go Qatar's differentiation that is NOT communicated in SERPs:**
- News feed (3 view modes: List, Grid, Reel)
- Cross-device sync via Google/Apple Sign-In
- Dual navigation: Google Maps AND Waze
- Business API for enterprise address resolution

---

## Subagent Files Created

| File | Status |
|------|--------|
| `src/app/sitemap.ts` | ✅ Created by sitemap agent |
| `src/app/robots.ts` | ✅ Created by sitemap agent |
| `goqatar-audit/findings/technical.md` | ✅ |
| `goqatar-audit/findings/content.md` | ✅ |
| `goqatar-audit/findings/schema.md` | (inline in report — schema agent output) |
| `goqatar-audit/findings/performance.md` | ✅ |
| `goqatar-audit/findings/images.md` | ✅ |
| `goqatar-audit/findings/geo.md` | (inline in report — GEO agent output) |
| `goqatar-audit/findings/sxo.md` | (inline in report — SXO agent output) |

# Content Quality & E-E-A-T Audit — goqatar.app
Date: 2026-07-25 | Pages reviewed: homepage (/), /contact, /privacy-policy, /terms (from shared snapshot `.seo/cache/2026-07-25/`)

## Content Quality Score: 46 / 100

## E-E-A-T Breakdown

| Factor | Weight | Score /100 | Notes |
|---|---|---|---|
| Experience | 20% | 35 | No first-hand user stories, testimonials, or case studies. App screens are illustrative SVG mockups, not real device screenshots. No usage narrative anywhere on site. |
| Expertise | 25% | 40 | No author/team bios anywhere on the site. Business API section makes technical claims (SLA, webhooks, batch geocoding, white-label) with no supporting docs page. Core addressing concept (Zone-Street-Building) is explained clearly and accurately, which helps. |
| Authoritativeness | 25% | 30 | No press mentions, no external citations, no backlinks evidenced, decorative "Loved by Qatar residents" 5-star rating with zero sourced review data. Parent company Snap Infinity is linked but has no independent authority signal on this site. |
| Trustworthiness | 30% | 45 | Personal Gmail (`help.goqatar@gmail.com`) used as the *sole* contact identity — in `contactPoint` schema, on-page, in Privacy Policy, and in Terms. No physical/business address anywhere (page or schema). Privacy Policy is stale (June 2025) and incomplete relative to actual data collection (see findings below). Response-time claims (24h) are now consistent across Contact/Privacy/Terms — a genuine trust positive. Security headers and HTTPS are in place per STATE.md. |

**Weighted E-E-A-T average: ~38/100.** Overall Content Quality Score (46) also factors in acceptable homepage word count/topical coverage, natural keyword usage, good readability, and a well-structured `llms.txt`, which partially offset the weak identity/trust signals.

## Word Counts vs. Minimums

| Page | Words | Type minimum | Verdict |
|---|---|---|---|
| Homepage (/) | ~1,097 | 500 | Meets minimum; reasonable topical coverage (features, how-it-works, news, upcoming features, business API) |
| /contact | ~153 | n/a (support/contact pages exempt) | Very thin — form + email only, no real Help Center content inline despite a "Help Center" tab |
| /privacy-policy | ~398 | — (legal page, no formal minimum, but incomplete relative to actual data practices) | Thin/incomplete — see below |
| /terms | ~514 | — | Thin, generic template language |

## Findings (severity-tagged)

- **[high]** Sole support contact is a personal Gmail address (`help.goqatar@gmail.com`) — used in the `Organization.contactPoint` JSON-LD, on-page in Contact/Privacy/Terms. No branded `@goqatar.app` address anywhere. This is a strong QRG trustworthiness red flag for a commercial app (already tracked in `.seo/TODO.md` as unresolved: `replace-personal-gmail-support-address-with-branded-goqatar-app-email`).
- **[high]** No Qatar business address, company legal entity name, or registration info anywhere on the site or in schema — `Organization` JSON-LD has no `address`/`PostalAddress` field. There is also no About/Team page; the only entity link is "Developed by snapinfinity.com" in the footer. This materially weakens Authoritativeness and Trustworthiness for a QA-targeted local product (tracked: `add-company-legal-entity-name-qatar-business-address-and-an-about-team-section-e-e-a-t`).
- **[high]** Privacy Policy (last updated **June 2025**, now 13 months stale) only discloses **Google Sign-In** data collection, but the homepage advertises **"Sign in with Google or Apple."** Apple Sign-In, Google Maps SDK data flows, and any analytics are not disclosed anywhere in the policy — a factual gap between stated product behavior and legal disclosure (tracked: `legal-review-rewrite-template-terms-update-privacy-policy-for-apple-sign-in-google-maps-sdk-analytics-data-flows-and-qatar-pdppl`).
- **[high]** Terms & Conditions read as unedited boilerplate: e.g. *"Permission is granted to temporarily use GO-QATAR for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title"* is a stock template phrase (near-verbatim from generic web T&C templates), and the product name renders inconsistently as the placeholder-style `GO-QATAR` rather than the branded "Go Qatar" used everywhere else on the site. No Qatar PDPPL reference. Reads as un-reviewed AI/template-generated legal copy rather than counsel-reviewed terms for a QA-jurisdiction consumer app.
- **[medium]** Factual inconsistency: the homepage feature-badge list claims **"Works Offline"** directly alongside "100% Free" and "Regular Updates," but the product's core functions (live Google Maps navigation, real-time Qatar news feed, address-to-GPS lookup) are explicitly described elsewhere on the same page as **live**/real-time. An offline claim for a live-data-dependent app is either inaccurate or needs qualification (e.g., "cached favorites/history available offline").
- **[medium]** Decorative, unsourced 5-star rating ("★★★★★ Loved by Qatar residents") with no review count, star-rating schema, or link to an actual review source. Under Sept 2025 QRG this reads as a fabricated trust signal rather than a citation of real user sentiment (tracked: `replace-illustrative-svg-app-mockups-with-real-device-screenshots-demo-video-source-or-remove-decorative-star-ratings`).
- **[medium]** H1 on the homepage is just **"Your City."** — the second half of the headline ("Your Way.") is a sibling `<div>`, not part of the `<h1>`. The actual H1 text contains no brand name ("Go Qatar") and no primary keyword ("Qatar address," "navigation"), weakening both on-page SEO relevance and AI-citation extractability of the page's core value proposition. Recommend consolidating into one `<h1>Your City. Your Way.</h1>` or `<h1>Go Qatar — Your City, Your Way</h1>`.
- **[medium]** No on-page FAQ or citable explainer passage exists despite `llms.txt` already containing well-formed "Facts for citation." AI answer engines crawling the rendered page (not `llms.txt`) get no structured, quotable 130-170 word passage answering "What is Go Qatar" or "What is the Zone-Street-Building system" (tracked: `add-an-faq-with-134-167-word-citable-answers-a-canonical-what-is-go-qatar-zone-street-building-explainer-passage`).
- **[medium]** "Go Qatar for Business" API section makes specific, unverifiable claims — "Dedicated support & SLA agreement," "White-label options available," "Batch geocoding," "Webhook support" — with no dedicated documentation, pricing page, or case study to substantiate them. Reads as aspirational copy rather than a real, citable product surface (tracked: `give-the-business-api-a-dedicated-page-with-docs-pricing-case-studies-or-soften-unverifiable-sla-white-label-claims`).
- **[low]** /contact is only ~153 words — functional (form + direct email) but offers no actual Help Center content inline despite a "Help Center" tab/link, and no FAQ to reduce support load or serve as citable content.
- **[low]** No blog, case studies, or original research/data anywhere on the site — zero Experience-building content beyond the product description itself. Given the app leans on a genuinely unique local mechanic (Qatar Zone-Street-Building system), there's a clear opportunity for original explainer/data content (e.g., "How Qatar's Zone-Street-Building addressing works," zone coverage maps) that's currently absent.
- **[low]** No external authority signals (press coverage, directory listings, backlinks) evidenced in the crawled pages; backlink outreach to expat/Qatar tech sites is still open in `.seo/TODO.md`.

## Positives Worth Noting

- Response-time claims (24 hours) are now consistent across Contact, Privacy Policy, and Terms — a prior inconsistency has been resolved.
- `llms.txt` is well-structured with clear product/company/facts sections and a distinct "Facts for citation" block — good AI-citation groundwork once mirrored on-page.
- Organization + WebSite + MobileApplication JSON-LD is present and mostly well-formed (missing only `address`).
- Homepage word count and topical coverage (features, how-it-works, news, roadmap, business API) meet the 500-word homepage floor with genuine breadth, not padding.
- Copy is natural, not keyword-stuffed; "Qatar," "Zone/Street/Building," and "address" are used organically and consistently across pages.

## Ready-to-Paste Snippets

**1. Branded `contactPoint` (replace Gmail + add address) — for homepage JSON-LD `Organization` node:**
```json
"contactPoint":{"@type":"ContactPoint","email":"support@goqatar.app","contactType":"customer support","areaServed":"QA","availableLanguage":["English"]},
"address":{"@type":"PostalAddress","addressCountry":"QA","addressLocality":"Doha"}
```
*(Replace `addressLocality`/add `streetAddress` once a real registered business address is confirmed by the business owner — do not publish a placeholder address.)*

**2. Fixed H1 (homepage hero):**
```html
<h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight">
  Go Qatar — Your City. Your Way.
</h1>
```
*(Keep the two-line visual split via CSS `<br>`/flex wrapping inside the single `<h1>`, rather than splitting the text into a sibling non-heading `<div>`.)*

**3. Offline-claim fix (homepage feature badge) — replace "Works Offline" with an accurate claim:**
```html
<div class="flex items-center gap-2 text-white/50 text-sm">
  <svg>...</svg>Saved Favorites Offline
</div>
```

**4. Minimal FAQ block (on-page, citable, ~150 words each) to pair with existing `llms.txt` facts:**
```html
<section aria-labelledby="faq-heading">
  <h2 id="faq-heading">Frequently Asked Questions</h2>
  <h3>What is Go Qatar?</h3>
  <p>Go Qatar is a free iOS and Android app that helps residents and visitors find any address in Qatar using the country's official Zone, Street, and Building numbering system. It combines precision address search, live Google Maps navigation, a curated Qatar news feed, saved favorites, and search history in one app. Go Qatar covers 50+ zones across Qatar and requires no subscription. Developed by Snap Infinity, the app lets users sign in with Google or Apple to sync favorites and history across devices, and connects directly to Google Maps or Waze for turn-by-turn navigation once an address is resolved.</p>
  <h3>What is Qatar's Zone-Street-Building addressing system?</h3>
  <p>Qatar does not use conventional street-name-and-number addresses for most locations. Instead, the country is divided into numbered Zones, each containing numbered Streets, each containing numbered Buildings. Go Qatar lets users enter these three numbers — for example, Zone 25, Street 330, Building 12 — to pinpoint an exact location on a live Google Map and get turn-by-turn directions, without needing to know a conventional street address.</p>
</section>
```

## Cross-Skill Notes

- Programmatic/location-page opportunities (e.g., per-zone landing pages for the 50+ Qatar zones referenced in `llms.txt`) were identified but not scored here — defer to `seo-programmatic` sub-skill if pursued.
- No comparison/competitor pages exist on the site; not applicable — see `seo-competitor-pages` if added later.

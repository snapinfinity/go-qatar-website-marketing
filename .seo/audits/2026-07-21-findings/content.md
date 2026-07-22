# Content Quality & E-E-A-T Audit — goqatar.app
Date: 2026-07-21
Pages reviewed: homepage.html, /privacy-policy, /terms, /contact (cached 2026-07-21 snapshot)

## Category Score: 46 / 100

## E-E-A-T Breakdown

| Factor | Weight | Score /100 | Notes |
|---|---|---|---|
| Experience | 20% | 35 | No first-hand usage signals. The "Every screen, perfectly designed / Explore the real Go Qatar app" section (`#features-screens`) actually renders an illustrative SVG mockup, not a real screenshot — a claim/delivery mismatch. Hero phone mockup is also a hand-built CSS/SVG shell, not an actual app capture. Social proof ("Loved by Qatar residents", 5-star row, 4 colored avatar circles) has no real names, quotes, or linked review source. |
| Expertise | 25% | 30 | No author bios, no team/about page, no explanation of who built the Zone-Street-Building address-resolution logic or how it's validated against Qatar's official addressing authority. Stats like "50+ Zones Covered" and "Real-time Location Data — Powered by Google Maps" are asserted without sourcing. The new "Go Qatar for Business / API" section pitches enterprise capabilities (delivery routing, SLA, white-label) with zero technical docs, changelog, or case studies to back expertise claims. |
| Authoritativeness | 25% | 25 | No press mentions, external citations, awards, or verifiable download/rating counts anywhere in the crawled content. No links to an About/company page beyond a bare footer credit ("Developed by snapinfinity.com"). No entity/organization schema to establish Snap Infinity ↔ Go Qatar authorship in a machine-readable way. |
| Trustworthiness | 30% | 40 | Positives: HTTPS, `author`/`publisher` meta present, working contact form, privacy policy & terms exist, clean `robots: index, follow`. Negatives: support email is a personal Gmail address (`help.goqatar@gmail.com`) rather than a branded `@goqatar.app` address; no physical address or legal entity/registration info (notable gap given the site solicits B2B "Business API" leads asking for company name/email); response-time claims are inconsistent (Contact page says "within 24 hours," Privacy Policy and Terms both say "respond... within 48 hours/business hours"); Terms & Conditions use generic recycled legal boilerplate ("Permission is granted to temporarily use... for personal, non-commercial transitory viewing only") that doesn't fit a mobile app context; Privacy Policy doesn't mention Apple Sign-In (offered in-app) or Google Maps/analytics data sharing, and has no reference to Qatar's PDPPL or any compliance framework despite being a Qatar-specific product; `robots.txt`, `sitemap.xml`, and `llms.txt` all returned 404 in this snapshot (crawl/competence signal, also hurts AI citation readiness). |

**Weighted E-E-A-T: ~33/100**

## AI Citation Readiness Score: 30 / 100

- No `application/ld+json` structured data anywhere on the homepage or subpages (no `Organization`, `SoftwareApplication`, `MobileApplication`, `FAQPage`, or `BreadcrumbList` schema) — a missed opportunity given the page already contains clean, quotable facts (Zone/Street/Building steps, feature list, "50+ zones," "free to download," Qatar governing-law jurisdiction).
- `llms.txt` returns 404 despite being referenced as an expected artifact in the audit inputs — no machine-readable content summary for LLM crawlers.
- Content hierarchy (H1 → H2 → H3) is clean and semantic, which helps generic extraction, but there is no single canonical "About / What is Go Qatar" passage that an AI answer engine could lift as a self-contained definition — the value prop is spread across hero copy, stat strip, and feature cards.
- Facts that would be ideal for citation (zones covered, platforms, pricing) lack sourcing/dates, reducing confidence for AI summarization ("50+" is vague vs. a precise, sourced number).

## Content Depth / Thin Content Check

| Page | Type | Approx. word count (main content) | Minimum | Verdict |
|---|---|---|---|---|
| Homepage | Homepage | ~950–1,050 (marketing copy, excl. nav/footer chrome) | 500 | Meets minimum; good topical coverage of features, steps, news, and a new B2B API pitch |
| /privacy-policy | Legal | ~330 | N/A (no QRG floor, but thin for a Qatar-operating app) | Thin — generic, template-like; missing Apple Sign-In, Maps/analytics data-sharing disclosure, Qatar PDPPL reference |
| /terms | Legal | ~446 | N/A | Thin — boilerplate "temporarily...transitory viewing" license language typical of copy-paste templates, not tailored to actual app functionality (no mention of in-app purchases n/a, minimum age, App Store/Play Store terms precedence) |
| /contact | Support | Form + 2 contact cards, minimal body copy | N/A | Adequate for page purpose but no FAQ/help content despite a "Help Center" tab in the UI |

## Readability

Homepage marketing copy uses short sentences, second-person address, and simple vocabulary — reads at roughly an 8th–9th grade level (Flesch Reading Ease ~60s), appropriate for a consumer app landing page. Legal pages (Privacy/Terms) are denser with longer sentences typical of legal boilerplate but still readable (~10th–12th grade level); acceptable for the page type.

## Keyword Optimization

Keyword usage across title, meta description, H1/H2s, and body ("Qatar navigation," "Zone, Street & Building," "Qatar address finder," "Qatar news") is natural and varied, not stuffed. The `<meta name="keywords">` tag (legacy, ignored by Google) lists 8 terms — harmless but adds no value. No evidence of keyword stuffing; density is appropriate to context.

## Freshness Signals

- Homepage has no visible "last updated" date or changelog; footer copyright shows "© 2026 Go Qatar," which is a weak freshness signal on its own.
- Privacy Policy and Terms both show "Last updated: June 2025" — roughly 13 months old as of this audit (2026-07-21). Not necessarily wrong, but combined with generic/template phrasing it reads as unmaintained rather than actively reviewed.
- The homepage "Coming Soon" section (Flight/Hotel/Cab booking) has no target date or roadmap timestamp, so freshness/progress can't be verified by users or AI crawlers.

## Specific Recommendations

1. **[High]** Add `Organization` and `SoftwareApplication`/`MobileApplication` JSON-LD to the homepage (name, developer, download URLs, category, aggregateRating if real ratings exist) to support AI citation and rich results.
2. **[High]** Fix/publish `llms.txt`, `robots.txt`, and `sitemap.xml` (all 404 in this snapshot) — these are foundational for AI crawler and search engine trust.
3. **[High]** Replace the personal Gmail support address with a branded domain address (e.g., `support@goqatar.app`) and add a real company/legal entity name + Qatar business address to the footer or a dedicated About page — critical given the site now solicits paid B2B "API Access" leads from companies.
4. **[Medium]** Reconcile the conflicting response-time claims ("24 hours" on Contact vs. "48 hours" in Privacy/Terms).
5. **[Medium]** Rewrite Terms & Conditions to remove generic "temporarily... non-commercial transitory viewing" boilerplate and tailor language to actual app functionality (Google/Apple sign-in, no purchases, third-party map data, App Store/Play Store terms precedence, minimum age).
6. **[Medium]** Update Privacy Policy to disclose all data flows actually used by the app: Apple Sign-In (offered in UI but absent from policy), Google Maps SDK data sharing, any analytics/crash-reporting SDKs, and add a reference to compliance with Qatar's Personal Data Privacy Protection Law (PDPPL) given the product's Qatar focus.
7. **[Medium]** Substantiate the "Go Qatar for Business / API" section with real proof points — a docs link, sample response payload, at least one case study or pilot partner, or remove SLA/white-label language until those are actually offered; as written, unverifiable enterprise claims are a low-trust AI-generated-content pattern per Sept 2025 QRG.
8. **[Low]** Replace the abstract "Loved by Qatar residents" + generic avatar circles with real (or clearly sourced) App Store/Google Play ratings and review counts, or remove the star-rating graphic if no real rating backs it.
9. **[Low]** Clarify that the "Every screen, perfectly designed" section shows illustrative mockups rather than "the real Go Qatar app," or replace the SVG mockups with actual device screenshots to avoid an experience/authenticity mismatch.
10. **[Low]** Add explicit "last reviewed" dates and a brief About/company section (who built Go Qatar, why, Snap Infinity's background) to strengthen Experience and Expertise signals.

# Schema.org Structured Data Audit — goqatar.app

Date: 2026-07-25 | Source: `.seo/cache/2026-07-25/homepage.html` + `.seo/cache/2026-07-25/pages/{contact,privacy-policy,terms}.html`
Delivery check: `headers.txt` shows `X-Nextjs-Prerender: 1` (static prerender via Vercel) — the cached HTML is the actual server-rendered markup, so all JSON-LD below is confirmed present in the raw, pre-JS response and fully crawlable by Googlebot and non-JS bots alike. No render-mode discrepancy to flag.

## Schema Category Score: 82 / 100

| Dimension | Weight | Score | Weighted |
|---|---|---|---|
| Presence & Page Coverage | 20% | 95/100 | 19.0 |
| Syntax & Format Validity | 20% | 85/100 | 17.0 |
| Required/Recommended Property Completeness | 25% | 70/100 | 17.5 |
| Rich Results Eligibility | 20% | 75/100 | 15.0 |
| Entity Graph Consistency (`@id` linking) | 15% | 90/100 | 13.5 |
| **Total** | | | **82.0** |

---

## Detection Results

All 4 crawled pages carry exactly one `application/ld+json` `@graph` block each. No Microdata (`itemscope`/`itemtype`) or RDFa (`vocab=`) found anywhere — good, avoids duplicate/conflicting markup.

| Page | Types present | JSON valid |
|---|---|---|
| `/` (homepage) | `Organization`, `WebSite`, `MobileApplication` (incl. nested `ContactPoint`, `Offer` ×2, `parentOrganization`) | ✅ |
| `/contact` | `ContactPage`, `BreadcrumbList` | ✅ |
| `/privacy-policy` | `WebPage`, `BreadcrumbList` | ✅ |
| `/terms` | `WebPage`, `BreadcrumbList` | ✅ |

All four use `"@context": "https://schema.org"` (https, correct casing), all use `@id`-based entity linking (`#organization`, `#website`, `#software`, `#webpage`) rather than duplicating full objects — this is the correct pattern and confirms the JSON-LD was authored deliberately, not templated blindly.

---

## Validation Results (per block)

### Organization (`/`) — PASS with gaps
- ✅ `@type`, `@id`, `name`, `url`, `description` present and non-placeholder
- ✅ `logo`: `https://goqatar.app/icon-192.png` — verified actual file is 192×192px (well above Google's 112×112 minimum), square, absolute HTTPS URL. Logo rich-result eligible.
- ✅ `sameAs` present but **incomplete** — only App Store + Google Play listing URLs. Per the 2026-07-25 GEO audit (`seo-geo.md`), an Instagram account (`@goqatar.app`) exists live but is not linked here. **[medium]**
- ✅ `parentOrganization` (Snap Infinity) present — good E-E-A-T signal, but has no `sameAs`/`url` validation beyond a bare `url` (no logo, no address) — acceptable as a light reference, not a defect.
- ⚠️ No `address` (PostalAddress) or `legalName` — already tracked as an open manual TODO (`add-company-legal-entity-name-qatar-business-address...`), not a new finding, but flagged here for schema completeness. **[low]**
- ✅ `contactPoint.email`, `contactType`, `areaServed: "QA"`, `availableLanguage` present. `email` is a personal Gmail address, not branded — already tracked in TODO/GEO audit, not repeated as new. No `telephone` — optional, not required.

### WebSite (`/`) — PASS
- ✅ All expected properties present (`url`, `name`, `description`, `inLanguage`, `publisher` → `@id` link to Organization).
- ℹ️ No `SearchAction`/`potentialAction` — correctly omitted since the site has no internal search feature; would be invalid to add a fake one. Not a defect.

### MobileApplication (`/`) — PASS on structure, **NOT rich-result eligible**
- ✅ `name`, `description`, `url`, `image` (1200×630, absolute), `applicationCategory: "TravelApplication"` (valid schema.org enum), `operatingSystem: ["IOS","ANDROID"]`, `author`/`publisher` linked to Organization `@id`.
- ✅ `offers`: two `Offer` objects (iOS/Android), each with `url`, `price: "0"`, `priceCurrency: "USD"`, `availability`. Correctly modeled as `MobileApplication` (a `SoftwareApplication` subtype) rather than misusing `Product`.
- ❌ **No `aggregateRating` or `review`.** Google's "Software App" rich result (star rating + install count snippet in Search) **requires `aggregateRating`** (with `ratingValue` + `ratingCount`/`reviewCount`) or `review`. Without it, this markup is valid but earns **zero visual rich-result benefit** in Search today. **[high — missing opportunity, not an error]**
  - ⚠️ Do **not** fabricate a rating. The app (`id6756709380`) appears newly launched with no visible review corpus yet; adding `aggregateRating` not backed by genuine, verifiable App Store/Play Store review counts violates Google's structured-data quality guidelines and risks a manual action. **Add this only once real store ratings exist**, sourced exactly from the live App Store/Play Store numbers.

### ContactPage (`/contact`) — PASS
- ✅ `@type: ContactPage`, `url`, `name`, `description`, `isPartOf` → WebSite `@id`, `about` → Organization `@id`, `mainEntity` → `Organization`/`ContactPoint`. Correct, no placeholders.

### WebPage (`/privacy-policy`, `/terms`) — PASS with a formatting defect
- ✅ `@type`, `@id`, `url`, `name`, `isPartOf`, `about` all correct and absolute.
- ❌ `dateModified: "2025-06"` on both pages is **not full ISO 8601** — schema.org `Date`/`DateTime` expects `YYYY-MM-DD` (e.g. `2025-06-01`), not year-month only. Google's Rich Results Test typically accepts this leniently but it is technically non-conformant and should be corrected to a real, specific last-modified date. **[medium]**

### BreadcrumbList (`/contact`, `/privacy-policy`, `/terms`) — PASS, rich-result eligible
- ✅ Sequential `position` (1, 2), absolute `item` URLs, correct `name` values. Standard, spec-conformant `ListItem` structure. Eligible for the breadcrumb trail rich result in Search.
- ℹ️ Homepage does **not** carry a `BreadcrumbList` (correctly — it's the root, a single-item breadcrumb there would be redundant). Not a defect.

---

## Missing Opportunities

1. **`aggregateRating` on `MobileApplication`** — highest-value gap once real store review data exists (see above). **[high, deferred/conditional]**
2. **`sameAs` on Organization missing the live Instagram profile** — quick, safe addition; strengthens entity resolution for both Google Knowledge Panel eligibility and AI/LLM entity linking. **[medium]**
3. **`dateModified` format fix** on `/privacy-policy` and `/terms` (`"2025-06"` → real `YYYY-MM-DD`). **[medium]**
4. **No `WebPage` node for the homepage itself** in the `/` `@graph` (only `Organization`/`WebSite`/`MobileApplication` are present). Adding one with `@id: https://goqatar.app/#webpage`, `isPartOf` → WebSite, `about` → Organization would complete the entity graph and match the pattern already used consistently on the other 3 pages. **[low]**
5. **`FAQPage`** — not currently present anywhere. Per current Google policy, FAQ rich results were retired for all sites (May 7, 2026), so adding `FAQPage` now yields **no Search Console rich-result benefit**. However, it remains a legitimate low-cost addition for AI/LLM citation (GEO) purposes if/when genuine FAQ content is published — a ready-to-paste `FAQPage` block already exists in `seo-geo.md` (2026-07-25) tied to the open "Add an FAQ" TODO item; no need to duplicate it here. **[info, not critical]**
6. **No `Review`/testimonial schema** — appropriate, since no genuine testimonial content exists on-page (checked; none found). Do not add until real testimonials are published.
7. **No `LocalBusiness`** — correctly absent; Go Qatar is an app/SaaS entity, not a storefront with a physical visited location, so `Organization` is the right type. Not a gap.

---

## Rich Results Eligibility Summary

| Type | Eligible today? | Notes |
|---|---|---|
| Organization → Logo | ✅ Yes | Image dimensions/format verified adequate |
| BreadcrumbList | ✅ Yes | Valid on all 3 subpages |
| Software App (star rating) | ❌ No | Blocked solely by missing `aggregateRating`; do not fake |
| FAQPage | N/A | Retired Search feature (May 2026) — GEO value only, not a Search rich result |
| Sitelinks Search Box (WebSite) | N/A | Correctly not attempted — no internal search feature |

---

## Ready-to-Paste JSON-LD (snippets only — not applied to any source file)

### A. `sameAs` addition for Organization (merge into existing homepage `@graph` Organization node)
```json
"sameAs": [
  "https://apps.apple.com/us/app/go-qatar/id6756709380",
  "https://play.google.com/store/apps/details?id=com.snapinfinity.goqatar",
  "https://www.instagram.com/goqatar.app/"
]
```
*(Verify the exact Instagram handle/URL before pasting — confirm live, do not guess.)*

### B. Corrected `dateModified` for `/privacy-policy` and `/terms` (replace the existing value)
```json
"dateModified": "2025-06-01"
```
*(Replace `2025-06-01` with the actual last-modified date of the legal copy — use the real date, not a placeholder.)*

### C. Homepage `WebPage` node (add as a 4th object inside the existing `/` `@graph` array, alongside Organization/WebSite/MobileApplication)
```json
{
  "@type": "WebPage",
  "@id": "https://goqatar.app/#webpage",
  "url": "https://goqatar.app",
  "name": "Go Qatar — Your City. Your Way.",
  "description": "Navigate Qatar like never before. Find any address by Zone, Street & Building number. Get Qatar news, save favourite locations, and explore your city effortlessly.",
  "isPartOf": { "@id": "https://goqatar.app/#website" },
  "about": { "@id": "https://goqatar.app/#organization" },
  "primaryImageOfPage": "https://goqatar.app/og-image.png",
  "inLanguage": "en-US"
}
```

### D. `aggregateRating` for `MobileApplication` — **template only, do not paste until real data is available**
```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "REPLACE_WITH_ACTUAL_AVERAGE",
  "ratingCount": "REPLACE_WITH_ACTUAL_COUNT"
}
```
Source these two numbers directly from live App Store Connect / Google Play Console data at the time of implementation — never estimate or carry over a number from one store to represent both.

---

## Priority Order for Follow-Up
1. **[medium]** Fix `dateModified: "2025-06"` → real `YYYY-MM-DD` on `/privacy-policy` and `/terms` (snippet B).
2. **[medium]** Add verified Instagram URL to Organization `sameAs` (snippet A).
3. **[low]** Add homepage `WebPage` node for entity-graph completeness (snippet C).
4. **[high, conditional]** Add `aggregateRating` to `MobileApplication` the moment genuine App Store/Play Store review data exists (snippet D template) — largest remaining Search rich-result gap.
5. **[info]** If/when the open FAQ-content TODO is executed, reuse the `FAQPage` JSON-LD already drafted in `seo-geo.md` — GEO/AI benefit only, no Search rich-result impact under current Google policy.

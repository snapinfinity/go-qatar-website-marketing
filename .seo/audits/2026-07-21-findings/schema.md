# Structured Data (Schema.org) Audit — goqatar.app
Date: 2026-07-21
Pages reviewed (from cache `D:/Github/go-qatar-website-marketing/.seo/cache/2026-07-21/`):
- `homepage.html` (https://goqatar.app)
- `pages/contact.html` (https://goqatar.app/contact)
- `pages/privacy-policy.html` (https://goqatar.app/privacy-policy)
- `pages/terms.html` (https://goqatar.app/terms)

Fetch mode: raw HTML from cache (Next.js 15 App Router, server-rendered/prerendered — `X-Nextjs-Prerender: 1`). No client-side-only JSON-LD injection pattern (React Helmet/next/head hydration trick) was found in any bundled script reference, and Next.js App Router metadata is emitted server-side into the initial HTML here, so raw HTML is a reliable source for this check. No re-render with Playwright was necessary.

---

## 1. Detection Results

Searched all four cached HTML files for `application/ld+json`, Microdata (`itemscope`/`itemtype`), and RDFa (`typeof`/`vocab`) attributes.

| Page | JSON-LD | Microdata | RDFa |
|---|---|---|---|
| Homepage `/` | **None found** | None | None |
| `/contact` | **None found** | None | None |
| `/privacy-policy` | **None found** | None | None |
| `/terms` | **None found** | None | None |

**Confirmed: zero structured data blocks exist anywhere on the site.** This matches the known baseline fact for the homepage and extends to all sampled subpages.

Other relevant signals pulled from the HTML (used to populate the generated schema below, not fabricated):
- Title/description: "Go Qatar — Your City. Your Way." / "Navigate Qatar like never before. Find any address by Zone, Street & Building number. Get Qatar news, save favourite locations, and explore your city effortlessly."
- `og:image`: `https://goqatar.app/og-image.png` (1200×630)
- `meta[name=author]` / `meta[name=publisher]`: "Snap Infinity", `rel=author` → `https://snapinfinity.com`
- `meta[name=category]`: "travel"
- App Store listing: `https://apps.apple.com/us/app/go-qatar/id6756709380`
- Google Play listing: `https://play.google.com/store/apps/details?id=com.snapinfinity.goqatar`
- Contact email: `help.goqatar@gmail.com` (mailto link on `/contact`)
- No physical business address, phone number, or social profile links (Facebook/Instagram/X/LinkedIn) found anywhere in the HTML — this is a software/app publisher, not a LocalBusiness.
- `/privacy-policy` and `/terms` both show "Last updated: June 2025" as visible text (month precision only — no exact day given).
- **No canonical `<link rel="canonical">` tag found on `/contact`**, and its `og:url` incorrectly points to `https://goqatar.app` (homepage) instead of `https://goqatar.app/contact`. Noted here because it affects what URL should be used as the page's schema `@id`/`url` — use the real per-page URL in the JSON-LD regardless of what the (buggy) `og:url` says.
- The "How It Works" section (`#how-it-works`) presents a 3-step numbered process (Enter Zone/Street/Building → Pinpoint on Map → Navigate or Save). **Do not mark this up as `HowTo`** — HowTo rich results were removed by Google in September 2023 and the type should not be used regardless of how well the content fits the pattern.
- Decorative 5-star icons next to "Loved by Qatar residents" on the hero are **not** a real, sourced rating (no count, no numeric average, no data source cited). This must not be used to populate `aggregateRating` — see §3.

## 2. Validation Results

Not applicable — there are no existing schema blocks to validate. All checklist items are trivially "fail" only in the sense of "absent," not "malformed." No deprecated types (HowTo, SpecialAnnouncement, CourseInfo, EstimatedSalary, LearningVideo) or legacy Microdata/RDFa were found, so there is nothing to remove or fix — this is a pure "add" job.

## 3. Missing Opportunities

| Opportunity | Type(s) | Priority | Notes |
|---|---|---|---|
| Site/brand entity | `Organization`, `WebSite` | High | No `@id`-linked entity graph anywhere; nothing ties the domain to the "Go Qatar" brand or its publisher "Snap Infinity" for Google/AI entity resolution. |
| App identity | `SoftwareApplication` (subtype `MobileApplication`) | High | Core product of the site has zero app-entity markup. Cannot use `aggregateRating` yet (no genuine review data captured on-site — do not fabricate from decorative stars). Add `offers` (both stores, free/$0) and `sameAs` to store listings. Revisit adding `aggregateRating`/`review` once real App Store/Play Store rating data is pulled in via an automated feed — do not hardcode a snapshot value that will go stale. |
| Site search | `SearchAction` on `WebSite` | N/A | Skipped — the marketing site has no internal site-search endpoint (search is an in-app feature, not a web URL pattern). Adding a `SearchAction` here would be fabricated. |
| Breadcrumbs | `BreadcrumbList` | Medium | Missing on `/contact`, `/privacy-policy`, `/terms` (and would apply to any future subpages). Helps Google understand site hierarchy; low effort. |
| Contact page | `ContactPage` + `ContactPoint` | Medium | `/contact` has a real support email (`help.goqatar@gmail.com`) but no markup identifying it as a contact page or exposing the contact point to Organization. |
| Legal pages | `WebPage` | Low | `/privacy-policy` and `/terms` can carry basic `WebPage` + `dateModified` (from the visible "Last updated: June 2025" text) for freshness signals. |
| FAQ / Help Center | `FAQPage` or `QAPage` | Info | The footer/contact page references a "Help Center" tab, but its content is not present in the static HTML sample (likely a client-rendered tab panel) — genuine FAQ content was not confirmed in this fetch. **Per current policy: Google retired FAQ rich results for all sites (May 7, 2026), so there is no SERP benefit either way.** If the Help Center tab does contain real Q&A content: use `QAPage` if it's genuine user-submitted questions, or `FAQPage` only for AI/LLM citation value (not for SERP). Do not add either type speculatively without confirming actual content — flagged as a follow-up, not included in the generated JSON-LD below. |
| Social profiles | `sameAs` | Low | No social media profiles found on the site to link. If Go Qatar has active social accounts, add them to the Organization's `sameAs` array. |

## 4. Generated JSON-LD (ready to paste)

All blocks use `https://schema.org`, absolute URLs, and ISO 8601 dates. No placeholder text is used — any field for which real data was not available (aggregateRating, exact "last updated" day, social profiles) has been omitted rather than faked. Fill in and add those once real data exists.

### 4.1 Homepage (`https://goqatar.app`) — Organization + WebSite + SoftwareApplication

Insert as a single `<script type="application/ld+json">` block in `<head>` (e.g. via Next.js `generateMetadata`/`<script>` in the root layout or page component for `/`).

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://goqatar.app/#organization",
      "name": "Go Qatar",
      "url": "https://goqatar.app",
      "logo": "https://goqatar.app/icon-192.png",
      "description": "Go Qatar is a mobile navigation app for finding any address in Qatar using the official Zone, Street & Building number system.",
      "sameAs": [
        "https://apps.apple.com/us/app/go-qatar/id6756709380",
        "https://play.google.com/store/apps/details?id=com.snapinfinity.goqatar"
      ],
      "parentOrganization": {
        "@type": "Organization",
        "name": "Snap Infinity",
        "url": "https://snapinfinity.com"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "help.goqatar@gmail.com",
        "contactType": "customer support",
        "areaServed": "QA",
        "availableLanguage": ["English"]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://goqatar.app/#website",
      "url": "https://goqatar.app",
      "name": "Go Qatar",
      "description": "Navigate Qatar like never before. Find any address by Zone, Street & Building number. Get Qatar news, save favourite locations, and explore your city effortlessly.",
      "inLanguage": "en-US",
      "publisher": { "@id": "https://goqatar.app/#organization" }
    },
    {
      "@type": "MobileApplication",
      "@id": "https://goqatar.app/#software",
      "name": "Go Qatar",
      "description": "Navigate Qatar like never before. Find any address by Zone, Street & Building number. Get Qatar news, save favourite locations, and explore your city effortlessly.",
      "url": "https://goqatar.app",
      "image": "https://goqatar.app/og-image.png",
      "applicationCategory": "TravelApplication",
      "operatingSystem": ["IOS", "ANDROID"],
      "author": { "@id": "https://goqatar.app/#organization" },
      "publisher": { "@id": "https://goqatar.app/#organization" },
      "offers": [
        {
          "@type": "Offer",
          "url": "https://apps.apple.com/us/app/go-qatar/id6756709380",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "url": "https://play.google.com/store/apps/details?id=com.snapinfinity.goqatar",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        }
      ]
    }
  ]
}
```

**Not included on purpose:** `aggregateRating` / `review`. Google's Software App structured-data guidelines effectively require a genuine `aggregateRating` for any star-rating rich result to render, and the only "rating" signal on the current page is five decorative static star icons with no numeric value or review count behind them — using it would be fabricated data and would violate Google's structured-data quality guidelines. Once real ratings are available (e.g., pulled programmatically from the App Store Connect / Google Play Developer API and kept in sync), add:
```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "<real average, e.g. 4.7>",
  "ratingCount": "<real total ratings>"
}
```

### 4.2 Contact page (`https://goqatar.app/contact`) — ContactPage + BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://goqatar.app/contact/#webpage",
      "url": "https://goqatar.app/contact",
      "name": "Contact Us — Go Qatar",
      "description": "Get in touch with the Go Qatar team. Send feedback, report a bug, or ask for help.",
      "isPartOf": { "@id": "https://goqatar.app/#website" },
      "about": { "@id": "https://goqatar.app/#organization" },
      "mainEntity": {
        "@type": "Organization",
        "@id": "https://goqatar.app/#organization",
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "help.goqatar@gmail.com",
          "contactType": "customer support"
        }
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://goqatar.app" },
        { "@type": "ListItem", "position": 2, "name": "Contact Us", "item": "https://goqatar.app/contact" }
      ]
    }
  ]
}
```

Fix the underlying bug noted in §1 alongside this: `/contact`'s `og:url` currently outputs `https://goqatar.app` instead of `https://goqatar.app/contact` — should be corrected in the Next.js metadata function so canonical/OG/schema URLs all agree.

### 4.3 Privacy Policy page (`https://goqatar.app/privacy-policy`) — WebPage + BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://goqatar.app/privacy-policy/#webpage",
      "url": "https://goqatar.app/privacy-policy",
      "name": "Privacy Policy — Go Qatar",
      "isPartOf": { "@id": "https://goqatar.app/#website" },
      "about": { "@id": "https://goqatar.app/#organization" },
      "dateModified": "2025-06"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://goqatar.app" },
        { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": "https://goqatar.app/privacy-policy" }
      ]
    }
  ]
}
```
Note: `dateModified: "2025-06"` uses month-precision ISO 8601 because the page only discloses "Last updated: June 2025" with no specific day — do not invent a day-of-month.

### 4.4 Terms & Conditions page (`https://goqatar.app/terms`) — WebPage + BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://goqatar.app/terms/#webpage",
      "url": "https://goqatar.app/terms",
      "name": "Terms & Conditions — Go Qatar",
      "isPartOf": { "@id": "https://goqatar.app/#website" },
      "about": { "@id": "https://goqatar.app/#organization" },
      "dateModified": "2025-06"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://goqatar.app" },
        { "@type": "ListItem", "position": 2, "name": "Terms & Conditions", "item": "https://goqatar.app/terms" }
      ]
    }
  ]
}
```

## 5. Validation Checklist (applied to all generated blocks above)

1. ✅ `@context` is `https://schema.org` (https, not http)
2. ✅ All `@type`s are valid, current schema.org types (`Organization`, `WebSite`, `MobileApplication`, `Offer`, `ContactPage`, `ContactPoint`, `WebPage`, `BreadcrumbList`, `ListItem`) — none deprecated
3. ✅ Required properties present for each type (name/url for Organization & WebSite; name/operatingSystem/applicationCategory for MobileApplication; position/name/item for each ListItem)
4. ✅ Property value types match schema (URLs as strings, Offer.price as string per schema.org convention, ListItem.position as integer)
5. ✅ No placeholder text anywhere — fields without real underlying data (`aggregateRating`, social `sameAs`, exact last-updated day) were omitted rather than faked
6. ✅ All URLs absolute (`https://goqatar.app/...`, full App Store/Play Store URLs)
7. ✅ Dates ISO 8601 (`2025-06`)

## 6. Explicitly Not Recommended

- **HowTo** — not applied to the "3 simple steps" section, per deprecation (removed Sept 2023).
- **SpecialAnnouncement** — not applicable/deprecated (July 2025).
- **FAQPage as a rich-result play** — no SERP benefit post May 7, 2026 retirement; only worth adding if genuine Help Center Q&A content is confirmed, and then purely for AI/LLM citation value, not SERP appearance.
- **aggregateRating on SoftwareApplication** — withheld until real rating data is available; the homepage's decorative star icons are not a valid data source.

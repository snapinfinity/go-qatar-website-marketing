# Google API Findings — goqatar.app
Date: 2026-07-21
Credential tier: **Tier 1** (API key + OAuth/Service Account — PageSpeed, CrUX, CrUX History, Search Console, URL Inspection, Indexing API). GA4 not configured (no `ga4_property_id`).
GSC property used: `sc-domain:goqatar.app` (permission: `siteOwner`, verified).

Note on toolchain: the `scripts/` referenced in the standard workflow do not exist inside `D:/Github/go-qatar-website-marketing`. They were located and run from the sibling `claude-seo` checkout at `D:/Github/claude-seo/scripts/`, using the credentials configured for this Google account.

---

## 1. PageSpeed Insights (Lab Data)

### Mobile (shared snapshot — reused, not re-run)
Source: `D:/Github/go-qatar-website-marketing/.seo/cache/2026-07-21/psi-mobile.json`

| Category | Score |
|---|---|
| Performance | 96/100 |
| Accessibility | 90/100 |
| Best Practices | 100/100 |
| SEO | 100/100 |

| Metric | Value | Rating |
|---|---|---|
| LCP | 2.4 s | Needs Improvement (lab; borderline good) |
| CLS | 0 | Good |
| TBT | 50 ms | Good |
| FCP | 1.2 s | Good |
| Speed Index | 4.0 s | Needs Improvement |

Flagged lab issues: no CSP (High severity, XSS/clickjacking mitigation), no COOP header (High), missing `includeSubDomains`/`preload` on HSTS (Medium), color-contrast failures (5 instances, accessibility), heading order issue, select element missing label, render-blocking CSS (~450ms est. savings), unused JS (~24 KiB in one chunk).

### Desktop (newly fetched)
| Category | Score |
|---|---|
| Performance | 100/100 |
| Accessibility | 90/100 |
| Best Practices | 100/100 |
| SEO | 100/100 |

| Metric | Value | Rating |
|---|---|---|
| LCP | 0.6 s | Good |
| CLS | 0 | Good |
| TBT | 10 ms | Good |
| FCP | 0.3 s | Good |
| Speed Index | 0.6 s | Good |

Desktop lab performance is excellent across the board; same accessibility issues (color contrast, heading order, missing select label) persist as on mobile.

## 2. CrUX Field Data

| Target | Result |
|---|---|
| `https://goqatar.app` (mobile, cached) | No CrUX data — insufficient Chrome traffic volume |
| `https://goqatar.app` (origin, CrUX History, re-checked) | No CrUX history data — insufficient Chrome traffic volume |
| `https://www.goqatar.app` (origin, CrUX History, re-checked) | No CrUX history data — insufficient Chrome traffic volume |

**Field CWV data is not available** for either the bare or `www` origin. All CWV assessment above is lab-only (Lighthouse), not real-user field data. This is expected for a low-traffic marketing/landing site.

## 3. Search Console — Search Performance (last 28 days: 2026-06-23 to 2026-07-18)

Property: `sc-domain:goqatar.app`

| Metric | Value |
|---|---|
| Clicks | 0 |
| Impressions | 0 |
| CTR | 0% |
| Avg. position | 0 (no data) |

**No query or page rows returned.** The domain currently has zero recorded search impressions/clicks in the last 28 days — the site is not yet generating any organic search visibility that Google Search Console has recorded.

## 4. Search Console — Sitemaps

| Property | Sitemaps submitted |
|---|---|
| `sc-domain:goqatar.app` | **None** — no sitemap has been submitted to this property |

**Flag (High):** No sitemap submitted to GSC. Combined with the zero-impressions search performance and the "unknown to Google" URL Inspection results below, this is very likely limiting/delaying discovery and indexation of subpages.

## 5. URL Inspection API

| URL | Coverage state | Robots | Google-selected canonical | Last crawl |
|---|---|---|---|---|
| `https://goqatar.app/` | **Duplicate without user-selected canonical** | Allowed / indexing allowed | `https://www.goqatar.app/` | 2026-07-15 (crawled as mobile) |
| `https://goqatar.app/contact` | **URL is unknown to Google** | n/a (never fetched) | none | never |
| `https://goqatar.app/privacy-policy` | **URL is unknown to Google** | n/a (never fetched) | none | never |
| `https://goqatar.app/terms` | **URL is unknown to Google** | n/a (never fetched) | none | never |

Referring URL recorded for homepage: `https://www.goqatar.app/`.

**Flag (Critical):** The bare-domain homepage `https://goqatar.app/` is classified by Google as a **duplicate with no user-selected canonical**, and Google itself has chosen `https://www.goqatar.app/` as the canonical version instead. This means:
- There is no canonical `<link rel="canonical">` tag (or it isn't resolving as expected) pointing Google definitively to one version.
- Search equity may be splitting/consolidating onto the `www` host rather than the bare domain that PSI/CrUX checks were run against.
- Verify which host (`goqatar.app` vs `www.goqatar.app`) is the intended canonical production host, add self-referencing canonical tags, and set up a permanent redirect from the non-canonical host if both currently resolve.

**Flag (High):** `/contact`, `/privacy-policy`, and `/terms` are all "unknown to Google" — never discovered/crawled. This is consistent with the missing sitemap. These pages should be included in a submitted XML sitemap and internally linked from the homepage/footer to aid discovery.

## 6. GA4

Not available — no `ga4_property_id` configured for this account. Tier 2 checks (organic traffic, top organic landing pages) were not run.

## 7. Data Freshness Notes

- CrUX: 28-day rolling field data (n/a here — insufficient traffic)
- GSC: 2–3 day reporting lag; date range queried was 2026-06-23 to 2026-07-18
- PSI (mobile): cached snapshot from earlier same-day run (2026-07-21T10:33:03Z lab timestamp)
- PSI (desktop): freshly run 2026-07-21

## Summary of Flags by Severity

| Severity | Finding |
|---|---|
| Critical | Homepage canonical mismatch — Google prefers `www.goqatar.app` over `goqatar.app`; no user-selected canonical detected |
| High | No sitemap submitted to Search Console for `sc-domain:goqatar.app` |
| High | `/contact`, `/privacy-policy`, `/terms` are undiscovered by Google ("unknown to Google") |
| Medium | Zero organic clicks/impressions in GSC over trailing 28 days — no measurable organic visibility yet |
| Medium | Missing CSP (High-severity Lighthouse security flag) and COOP header; HSTS missing `includeSubDomains`/`preload` |
| Low | Mobile Speed Index 4.0s, mobile LCP 2.4s — both fine but the weaker of the two form factors vs. desktop's near-instant loads |
| Low | Accessibility: color-contrast failures (5 instances), heading order issue, unlabeled `<select>` element |
| Info | No CrUX field data (mobile or history, either host) — insufficient Chrome traffic volume, expected for a new/low-traffic site |
| Info | GA4 not configured — Tier 2 organic traffic/landing-page reports unavailable |

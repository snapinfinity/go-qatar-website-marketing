# GEO / AI Search Readiness Audit — goqatar.app
Date: 2026-07-21
Source: shared snapshot `.seo/cache/2026-07-21/` (homepage.html, pages/contact.html, pages/privacy-policy.html, pages/terms.html, robots.txt, sitemap.xml, llms.txt, headers.txt, manifest.txt)

## GEO Health Score: 39 / 100

| Dimension | Weight | Score | Weighted |
|---|---|---|---|
| Citability | 25% | 30/100 | 7.5 |
| Structural Readability | 20% | 55/100 | 11.0 |
| Multi-Modal Content | 15% | 25/100 | 3.75 |
| Authority & Brand Signals | 20% | 20/100 | 4.0 |
| Technical Accessibility | 20% | 65/100 | 13.0 |
| **Total** | | | **39.25 ≈ 39** |

---

## 1. AI Crawler Access Status

`robots.txt` returns **404** (confirmed in manifest.txt and by fetching `/robots.txt` — Next.js custom 404 page, `<meta name="robots" content="noindex">` on the error page itself, `X-Nextjs-Prerender` absent). This means:

- **No explicit directives exist for any crawler.** Default behavior for a missing robots.txt is "crawl everything," so GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, anthropic-ai, and cohere-ai are all **implicitly allowed** — but this is an accident of omission, not an intentional GEO strategy.
- No way to signal preferred crawl paths, no way to block low-value routes (e.g., `?tab=` query variants of `/contact`), no sitemap reference for crawlers that do read robots.txt for a `Sitemap:` line.
- Risk: a future deploy could add a default-deny robots.txt (common Next.js boilerplate mistake) and silently cut off all AI crawlers with no one noticing, since there's no baseline being enforced today.

| Crawler | Status | Notes |
|---|---|---|
| GPTBot | Allowed (default) | No directive present |
| OAI-SearchBot | Allowed (default) | No directive present |
| ClaudeBot | Allowed (default) | No directive present |
| PerplexityBot | Allowed (default) | No directive present |
| Google-Extended | Allowed (default) | No directive present |
| CCBot / anthropic-ai / cohere-ai (training bots) | Allowed (default) | Not opted out — site content is trainable but low differentiation risk since it's marketing copy, not proprietary data |

**Severity: High** — absence of any robots.txt is undirected, unmonitored exposure; it should be replaced with an explicit, intentional policy.

## 2. llms.txt Status: **Missing (404)**

Confirmed 404 via manifest.txt and cached response (identical Next.js 404 shell as robots.txt/sitemap.xml, `noindex`). No `/llms.txt`, no RSL 1.0 licensing block, no machine-readable summary of the app's purpose, address-lookup capability, or citable facts for LLM ingestion. See recommended `llms.txt` in Section 6.

**Severity: High**

## 3. Passage-Level Citability (via extracted text from homepage.html)

- Content **is** server-rendered/prerendered (`X-Nextjs-Prerender: 1`, `X-Vercel-Cache: HIT` in headers.txt) — full marketing copy is present in raw HTML, not hydration-only. Good baseline crawlability.
- However, copy is written entirely in **short marketing taglines** (10–40 words per block: "Navigate Qatar like a local...", "Find any location in Qatar using the official Zone, Street, and Building number system — fast, accurate, and built for Qatar's unique addressing."). None of the on-page passages fall in the **134–167 word optimal citation range** — nothing is long enough to be lifted as a self-contained, extractable answer.
- **Zero question-based headings.** All H2/H3s are declarative/brand-voice ("Everything you need to navigate Qatar", "Find any address in 3 simple steps", "Qatar News at Your Fingertips", "Get Go Qatar for free today") rather than the query-shaped phrasing ("How do I find an address in Qatar using Zone, Street, and Building numbers?") that AI Overviews/ChatGPT/Perplexity tend to lift directly.
- **No FAQ section** anywhere on the homepage or crawled subpages (privacy-policy, terms, contact) — a major missed opportunity, since FAQ blocks are the single highest-yield citability format for AI answer engines.
- Stat callouts exist ("50+ Zones Covered", "Real-time Location Data — Powered by Google Maps") but are **unsourced/unattributed** design chips, not sentence-level claims with citations — low reuse value for AI synthesis.
- No dates, no authorship byline, no "last verified" timestamps on factual claims (e.g., zone count, Play Store install numbers).

**Severity: High** — this is the single biggest lever: rewriting hero/feature copy into 134–167 word self-contained answer blocks plus a real FAQ section would materially change extractability.

## 4. Structural Readability

- Proper heading hierarchy present: one `<h1>` ("Your City. Your Way."), multiple `<h2>`/`<h3>` per section (Features, How It Works, News, Download) — structurally sound for parsers.
- "How It Works" section is a clean 3-step numbered list (Enter Zone/Street/Building → Pinpoint on Map → Navigate or Save) — this is the most citation-friendly block on the page (clear sequential process), but still worded as marketing steps rather than an instructional answer to "how do I find an address in Qatar."
- Feature list section (Precision Address Search, Live Google Maps, Save Favourites, Search History, Qatar News Feed, Secure Sign-In) is scannable but each item is a single short sentence, not an expandable answer.
- No table markup for the Zone/Street/Building address-format explanation, despite it being a good candidate for a definition/data table.

**Severity: Medium**

## 5. Multi-Modal Content

- Hero "phone mockup" is hand-built SVG/CSS, not a real screenshot — no meaningful alt text, no video, no image showing the actual app UI that AI engines could describe or cite.
- Product images use generic `alt="Go Qatar"` / `alt="Go Qatar icon"` — not descriptive (missed opportunity for image-based retrieval).
- No demo video, no GIF walkthrough, no downloadable/embedded transcript.
- App Store and Google Play badges link out to real listings (`apps.apple.com/us/app/go-qatar/id6756709380`, `play.google.com/store/apps/details?id=com.snapinfinity.goqatar`) — good for entity verification but not itself "multi-modal content."
- **Zero structured data** (confirmed: no `application/ld+json` anywhere in homepage.html). No `SoftwareApplication`, `Organization`, `FAQPage`, `MobileApplication`, or `AggregateRating` schema — a significant gap given this is literally an app landing page, the highest-value use case for `SoftwareApplication` schema (price, OS, rating, download links).

**Severity: High** (schema absence) / **Medium** (visual content)

## 6. Authority & Brand Signals

- No social profile links anywhere on the site (no Twitter/X, Instagram, Facebook, LinkedIn, YouTube, Reddit, TikTok) — zero cross-platform entity reinforcement. Given YouTube mentions carry the strongest documented correlation (~0.737) with AI citation likelihood, and Reddit/Wikipedia presence is "high," this is a material gap.
- Publisher/developer identified in metadata as "Snap Infinity" (`<meta name="publisher" content="Snap Infinity">`, `<link rel="author" href="https://snapinfinity.com">`) — a positive but thin signal; snapinfinity.com itself has unknown independent authority (not verified in this audit).
- Contact channel is a bare Gmail address (`mailto:help.goqatar@gmail.com`) rather than a branded `@goqatar.app` address — weak trust/authority signal for an app requesting location and account-linked (Google/Apple sign-in) data.
- "Loved by Qatar residents" and 5-star icon row are decorative — not backed by an `AggregateRating` schema or a real review count, so AI engines cannot cite an actual rating.
- No press coverage, backlink-worthy content, or citations of third-party sources found on the crawled pages (homepage, contact, privacy-policy, terms) — nothing here would independently rank as an authority signal outside brand-owned channels.
- Positive: legitimate, verifiable App Store and Google Play listings under a real bundle ID (`com.snapinfinity.goqatar`) — this is the strongest authority signal present, since it's independently verifiable off-domain.

**Severity: High**

## 7. Technical Accessibility for AI Crawlers

- **Strongly positive:** homepage is statically prerendered by Next.js (`X-Nextjs-Prerender: 1`, `X-Vercel-Cache: HIT`, Vercel edge). Raw HTML fetch (no JS execution) already contains full hero copy, feature descriptions, steps, footer — this is a genuine SSR/SSG site, not a client-rendered SPA shell, so GPTBot/ClaudeBot/PerplexityBot (which largely do not execute JS) see the real content on a plain fetch.
- One isolated widget (`BAILOUT_TO_CLIENT_SIDE_RENDERING`, the small map-illustration panel in the phone mockup) requires client hydration, but it is decorative and carries no unique text content — negligible impact.
- **Missing:** `robots.txt` (404), `sitemap.xml` (404), `llms.txt` (404). This means: no `Sitemap:` directive for crawlers, no discoverable full URL list beyond in-page links, no AI-specific ingestion file. Subpages (`/privacy-policy`, `/terms`, `/contact`) are only discoverable via footer nav links — fine for a 4-page site today, but this scales badly and provides no redundancy.
- `Content-Disposition: inline`, correct `Content-Type: text/html; charset=utf-8`, `Access-Control-Allow-Origin: *` — no CORS or header-level blocking of crawlers.
- No `Cache-Control` issues; `Age: 2151261` shows long-lived edge cache, fine for crawl efficiency.

**Severity: Medium** (rendering is solid; the gap is entirely the missing robots.txt/sitemap.xml/llms.txt trio)

---

## 8. Platform-Specific Assessment

| Platform | Assessment |
|---|---|
| **Google AI Overviews** | Weak-Medium. SSR content is crawlable and indexable, but no schema (`SoftwareApplication`, `FAQPage`) means Google has nothing structured to lift into an AIO card. No FAQ content to match "how do I find an address in Qatar" query patterns. |
| **ChatGPT (browsing/search)** | Weak. No llms.txt to guide ingestion; no long-form citable passages; OAI-SearchBot/GPTBot are default-allowed but have thin, unattributed content to work with. |
| **Perplexity** | Weak. Perplexity favors sourced, statistic-rich passages with clear attribution — this site's "50+ zones," "Real-time data" claims are unsourced design elements, not citable sentences. |
| **Bing Copilot** | Weak-Medium. Similar profile to Google; Bing does respect `Sitemap:` directives heavily, and the missing sitemap.xml is a direct discovery gap here. |

---

## 9. Top 5 Highest-Impact Changes

1. **Ship a robots.txt with explicit AI-crawler allow rules + Sitemap directive** (Effort: Low, ~30 min). Currently undirected/accidental-open; make it intentional and add `Sitemap: https://goqatar.app/sitemap.xml`.
2. **Publish `llms.txt`** at the site root (Effort: Low, ~1–2 hrs) — see recommended draft below.
3. **Add `SoftwareApplication` + `FAQPage` JSON-LD schema** to the homepage (Effort: Medium, ~1 day) — zero JSON-LD currently exists; this is the single highest-leverage structured-data fix for an app landing page.
4. **Add a real FAQ section** (5–8 Q&As: "How does Go Qatar's Zone/Street/Building address system work?", "Is Go Qatar free?", "What platforms is Go Qatar available on?", etc.) written as 134–167 word self-contained answers (Effort: Medium, ~1 day).
5. **Add a working sitemap.xml and at least one branded social/video presence** (YouTube demo, LinkedIn company page) to build the brand-mention correlation signals currently at zero (Effort: Medium–High, ongoing).

---

## 10. Recommended `llms.txt`

```
# Go Qatar

> Go Qatar is a free iOS and Android navigation app that helps residents and visitors find any address in Qatar using the country's official Zone, Street, and Building numbering system. It combines precision address search, live Google Maps navigation, a curated Qatar news feed, saved favorites, and search history in one app. Developed by Snap Infinity.

## Product

- [Homepage](https://goqatar.app/): Overview, features, and download links for Go Qatar.
- [How It Works](https://goqatar.app/#how-it-works): 3-step guide to finding a Qatar address by Zone, Street, and Building number.
- [Features](https://goqatar.app/#features): Precision address search, live Google Maps, saved favorites, search history, Qatar news feed, secure sign-in.
- [Qatar News](https://goqatar.app/#news): In-app curated Qatar news feed with List, Grid, and Reel view modes.
- [Download](https://goqatar.app/#download): App Store and Google Play links.

## Company

- [Contact](https://goqatar.app/contact): Support and feedback contact form.
- [Privacy Policy](https://goqatar.app/privacy-policy)
- [Terms & Conditions](https://goqatar.app/terms)
- Developer: Snap Infinity (https://snapinfinity.com)

## App Store Listings

- [iOS App Store](https://apps.apple.com/us/app/go-qatar/id6756709380)
- [Google Play](https://play.google.com/store/apps/details?id=com.snapinfinity.goqatar)

## Facts for citation

- Go Qatar covers 50+ zones across Qatar.
- Go Qatar is free to download with no subscription required.
- Address lookup uses Qatar's official Zone, Street, and Building number system.
- Navigation is powered by live Google Maps with turn-by-turn directions via Google Maps or Waze.
- Sign-in is available via Google or Apple accounts, syncing favorites and history across devices.

## Optional

- [Help Center](https://goqatar.app/contact?tab=help)
- [Feedback](https://goqatar.app/contact?tab=feedback)
```

Note: no RSL 1.0 licensing block is included above because the site has not defined a licensing/training policy; this should be a deliberate decision by the site owner (allow/disallow AI training use) rather than a default inclusion.

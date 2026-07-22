# Sitemap Architecture Audit — goqatar.app
Date: 2026-07-21

## Summary
`https://goqatar.app/sitemap.xml` and `https://goqatar.app/robots.txt` both return HTTP-200-wrapped
Next.js `/_not-found` pages (confirmed via `.seo/cache/2026-07-21/manifest.txt`,
`sitemap.xml`, and `robots.txt` — all three cached bodies are byte-identical 404 HTML with
`<meta name="robots" content="noindex">`). No sitemap exists, so there is no crawl-discovery
path for the site's 4 real routes, and Google/Bing have no `Sitemap:` directive to follow even
if robots.txt existed.

Root cause: `D:/Github/go-qatar-website-marketing/src/app/` has no `sitemap.ts` and no `robots.ts`.
Next.js App Router only generates these routes when the corresponding file is present.

## Site Inventory (from crawl + source)
| Route | Status (cache) | In old sitemap | Notes |
|---|---|---|---|
| `/` | 200 | N/A (no sitemap) | Single-page landing; anchors `#features`, `#how-it-works`, `#news`, `#download` are same-document fragments, not separate crawlable URLs — must NOT be listed as separate `<url>` entries |
| `/contact` | 200 | N/A | `src/app/contact/page.tsx` |
| `/privacy-policy` | 200 | N/A | `src/app/privacy-policy/page.tsx` |
| `/terms` | 200 | N/A | `src/app/terms/page.tsx` |

Total indexable URLs: 4. Well under the 50,000-per-file limit — a single sitemap file is
sufficient; no sitemap index needed.

No location pages, no programmatic/doorway pages present. Quality-gate section (30+/50+
location pages) is not applicable at this time — flagged only as a forward-looking guard if
the "Business API" / news section evolves into templated per-city or per-zone pages.

## Validation Checks

| Check | Result | Severity |
|---|---|---|
| sitemap.xml reachable / valid XML | FAIL — returns 404 page, not XML | Critical |
| robots.txt reachable | FAIL — returns 404 page (no `Sitemap:` directive possible) | Critical |
| >50,000 URL limit | N/A (4 URLs) | — |
| Non-200 URLs in sitemap | N/A (no sitemap existed) | — |
| Noindexed URLs in sitemap | N/A (no sitemap existed); note homepage/contact/etc. themselves are `index, follow` per `layout.tsx` metadata — good | — |
| Redirected URLs | None detected among the 4 routes (all direct 200s) | — |
| lastmod accuracy | Fixed via generated sitemap using real git commit date (2026-06-26) for all 4 routes, verified with `git log -1 --format=%ad -- <file>` | Low (resolved) |
| priority / changefreq | Not used in generated sitemap (both ignored by Google per Search Console docs) | Info |
| Crawled-vs-sitemap coverage | 4/4 crawled pages will be covered once new sitemap deploys; 0/4 covered today | Critical |

## Fix Applied
Generated two new Next.js App Router metadata route files (App Router convention: these
auto-emit `/sitemap.xml` and `/robots.txt` at build/request time, no static XML file needed):

1. **`D:/Github/go-qatar-website-marketing/src/app/sitemap.ts`** (new)
```ts
import type { MetadataRoute } from "next";

const BASE_URL = "https://goqatar.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: "2026-06-26",
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: "2026-06-26",
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: "2026-06-26",
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: "2026-06-26",
    },
  ];
}
```

2. **`D:/Github/go-qatar-website-marketing/src/app/robots.ts`** (new) — required so the sitemap
   is actually discoverable; previously there was no robots.ts either, so even a valid sitemap
   would have had no `Sitemap:` reference.
```ts
import type { MetadataRoute } from "next";

const BASE_URL = "https://goqatar.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
```

Resulting rendered sitemap.xml (what Next.js will emit at `/sitemap.xml`):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://goqatar.app</loc>
    <lastmod>2026-06-26</lastmod>
  </url>
  <url>
    <loc>https://goqatar.app/contact</loc>
    <lastmod>2026-06-26</lastmod>
  </url>
  <url>
    <loc>https://goqatar.app/privacy-policy</loc>
    <lastmod>2026-06-26</lastmod>
  </url>
  <url>
    <loc>https://goqatar.app/terms</loc>
    <lastmod>2026-06-26</lastmod>
  </url>
</urlset>
```

Resulting rendered robots.txt:
```
User-Agent: *
Allow: /

Sitemap: https://goqatar.app/sitemap.xml
```

## Missing Pages (crawled but not previously in sitemap)
All 4: `/`, `/contact`, `/privacy-policy`, `/terms` — sitemap did not exist at all, now added.

## Extra Pages (in sitemap but 404/redirected)
None — sitemap did not exist prior to this fix, so there is nothing to prune. `#features`,
`#how-it-works`, `#news`, `#download` are intentionally excluded as they are in-page anchors on
`/`, not distinct URLs, and must not be added as separate sitemap entries.

## Quality Gates (Location Pages)
Not triggered. 0 location pages detected on this site. No warning or hard stop applies.
Flagging as a watch item only: if a future "Business API"/city directory feature adds
programmatic per-zone or per-city pages, apply the 30+/50+ thresholds at that time.

## Deployment Note
Since the site is hosted on Vercel with static/prerendered output (`X-Nextjs-Prerender: 1` /
`X-Vercel-Cache: HIT` observed in cached headers), confirm the next deploy picks up these two
new route files and re-verify `https://goqatar.app/sitemap.xml` and
`https://goqatar.app/robots.txt` return 200 with correct content-type
(`application/xml` and `text/plain` respectively) post-deploy. Also submit the sitemap URL in
Google Search Console / Bing Webmaster Tools once live.

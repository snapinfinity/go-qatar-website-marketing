# Sitemap Architecture Audit — goqatar.app
Date: 2026-07-25
Source: `.seo/cache/2026-07-25/` (sitemap.xml, robots.txt, homepage.html, manifest.txt) + live repo source (`src/app/sitemap.ts`, `src/app/robots.ts`)

## Summary
The critical failure from the 2026-07-21 audit (sitemap.xml/robots.txt both 404'ing) is
**resolved and confirmed live**. `src/app/sitemap.ts` and `src/app/robots.ts` exist, and the
2026-07-25 crawl confirms both endpoints now return valid content (see manifest.txt: `sitemap.xml
200`, `robots.txt 200`). One regression was introduced by the 2026-07-23 "Apply SEO tracker
auto-fixes" commit: it modified `page.tsx` for all 4 routes plus the shared `Navbar`/`Footer`
components, but nobody bumped `lastModified` in `sitemap.ts` — it is still hardcoded to
`2026-06-26` (the original commit date) for all 4 URLs.

## Site Inventory (source-verified)
`src/app/` contains exactly 4 page routes: `/`, `/contact`, `/privacy-policy`, `/terms`
(confirmed via `find src/app -maxdepth 2 -type f`). No dynamic route segments, no
location/city pages, no programmatic template pages exist anywhere in the app router tree.

| Route | Sitemap entry | Crawl status (2026-07-25) | Real last-modified (git) | Sitemap lastmod |
|---|---|---|---|---|
| `/` | Yes | 200 | 2026-07-23 | 2026-06-26 (stale) |
| `/contact` | Yes | 200 | 2026-07-23 | 2026-06-26 (stale) |
| `/privacy-policy` | Yes | 200 | 2026-07-23 | 2026-06-26 (stale) |
| `/terms` | Yes | 200 | 2026-07-23 | 2026-06-26 (stale) |

Total: 4/4 URLs, well under the 50,000-per-file limit. Single sitemap file is sufficient, no
sitemap index needed.

## Validation Checks

| Check | Result | Severity |
|---|---|---|
| sitemap.xml reachable / valid XML | PASS — well-formed `urlset`, correct namespace, 4 `<url>` entries | — |
| robots.txt reachable | PASS — `User-Agent: *` / `Allow: /` + `Sitemap:` directive present | — |
| `Sitemap:` directive present in robots.txt | PASS — `Sitemap: https://goqatar.app/sitemap.xml` | — |
| >50,000 URL limit | N/A (4 URLs) | — |
| Non-200 URLs in sitemap | PASS — all 4 URLs return 200 per manifest.txt | — |
| Noindexed URLs in sitemap | PASS — none; all 4 pages are `index, follow` | — |
| Redirected URLs in sitemap | PASS — none, all direct 200s, no `www`/apex duplication (308 redirect + self-canonical was already fixed 2026-07-21) | — |
| lastmod accuracy | **FAIL — all 4 entries hardcoded to `2026-06-26`, but git history shows `page.tsx` for all 4 routes plus shared `Navbar.tsx`/`Footer.tsx` were modified 2026-07-23 (JSON-LD, OG fixes, image alt text, header order). lastmod is now inaccurate/stale.** | Medium |
| All identical lastmod | FAIL — all 4 use the exact same static string; even after fixing accuracy this should be per-page (Next.js can auto-derive from build data or be set individually) | Low |
| priority / changefreq | Not present — correctly omitted (both ignored by Google) | Info |
| Crawled-vs-sitemap coverage | 4/4 crawled pages present in sitemap; 4/4 sitemap URLs crawl successfully | — |

## Missing Pages (crawled but not in sitemap)
None. `find src/app -maxdepth 2 -type f` confirms only 4 routes exist; all 4 are present in
`sitemap.ts`. Homepage in-page anchors (`#features`, `#how-it-works`, `#news`, `#download`) are
correctly excluded (same-document fragments, not distinct URLs).

## Extra Pages (in sitemap but 404/redirected)
None.

## Quality Gates (Location Pages)
Not triggered. 0 location/programmatic pages exist in the route tree. No warning or hard stop
applies.

## Fix Recommendation (paste into `src/app/sitemap.ts`, do not apply automatically — orchestrator/user decision)
Replace the hardcoded `2026-06-26` literals with the actual last-changed dates (or better,
derive dynamically at build time, e.g. from `git log` in a build script, or simply bump to the
current deploy date going forward each time page content changes):

```ts
import type { MetadataRoute } from "next";

const BASE_URL = "https://goqatar.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: "2026-07-23",
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: "2026-07-23",
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: "2026-07-23",
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: "2026-07-23",
    },
  ];
}
```

robots.ts requires no change — current output is correct:
```
User-Agent: *
Allow: /

Sitemap: https://goqatar.app/sitemap.xml
```

## Outstanding Action
Per `.seo/STATE.md` "Next action": sitemap.xml has not yet been submitted in Google Search
Console. Now that it is confirmed live and valid, submit it and request indexing for
`/contact`, `/privacy-policy`, `/terms`.

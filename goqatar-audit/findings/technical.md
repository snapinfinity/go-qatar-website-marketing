# Technical SEO Findings — goqatar.app
**Audit Date:** 2026-06-27  
**Auditor:** seo-technical

---

## CRITICAL

### 1. Site-Wide Rendering Failure (Soft 404 on All Pages)
**Severity:** Critical  
**Affected URLs:** /, /contact, /privacy-policy, /terms  

Every page returns HTTP 200 but the body renders the Next.js `_not-found` component.  
Evidence:
- RSC payload on all pages: `"c":["","_not-found"]`
- Body HTML contains: `<h1>404</h1><h2>This page could not be found.</h2>`
- A `<meta name="robots" content="noindex"/>` is injected by the 404 component — this **overrides** the correct `index, follow` meta from layout.tsx
- Duplicate `<title>` tags: `<title>404: This page could not be found.</title>` AND `<title>Go Qatar — Your City. Your Way.</title>`

**Google's behavior:** When a page returns HTTP 200 but shows 404 content with a noindex directive, Google typically drops the page from the index within weeks. If Googlebot has already crawled this, the site has **zero indexed pages**.

**Root cause (likely):** The Next.js 15.5.19 upgrade to React 19 may have broken server-side rendering of one or more `"use client"` components (framer-motion 12.x compatibility, or a prop mismatch under React 19's stricter hydration). Vercel pre-rendered and cached the broken output.

**Fix:** 
1. Check Vercel deployment build logs for server errors
2. Run `npm run build` locally to reproduce — look for any RSC serialization errors
3. If a specific component is throwing, add an error boundary or convert to lazy-load
4. Trigger a fresh deployment from Vercel dashboard (clear cached pre-renders)

---

### 2. Conflicting robots Meta Tags
**Severity:** Critical  
**All pages affected**

The HTML `<head>` contains two conflicting `<meta name="robots">` directives:
```html
<meta name="robots" content="noindex"/>          <!-- from Next.js not-found component -->
<meta name="robots" content="index, follow"/>    <!-- from layout.tsx metadata export -->
```
Google's documented behavior: when multiple robots directives conflict, it applies the **most restrictive** interpretation. The `noindex` wins, preventing all pages from being indexed.

**Fix:** Resolve the rendering failure (see #1). Once the 404 component no longer renders, its noindex meta will not appear.

---

### 3. robots.txt Returns HTTP 404
**Severity:** Critical  
**URL:** https://goqatar.app/robots.txt  

No `robots.txt` file exists. Without it:
- Googlebot cannot confirm the sitemap location
- API routes (`/api/contact`) have no disallow directive
- Bing, Yandex, and other crawlers have no directives at all

**Fix:** The sitemap subagent created `/src/app/robots.ts`. Deploy it.

---

### 4. sitemap.xml Returns HTTP 404
**Severity:** Critical  
**URL:** https://goqatar.app/sitemap.xml  

No XML sitemap. Google's crawler must discover all 4 pages through link traversal only. No sitemap submitted to Search Console → no coverage data, no indexation confirmation.

**Fix:** The sitemap subagent created `/src/app/sitemap.ts`. Deploy it, then submit `https://goqatar.app/sitemap.xml` in Google Search Console.

---

## HIGH

### 5. No Canonical URL Tags
**Severity:** High  

No `<link rel="canonical">` tag on any page. Without canonicals:
- `https://goqatar.app` and `https://goqatar.app/` may be treated as separate URLs
- Any future query string variations (UTM parameters) could create duplicate content signals

**Fix:** Add to `layout.tsx` metadata export:
```typescript
alternates: {
  canonical: BASE_URL,
},
```
For inner pages, add page-specific canonical URLs in each page's metadata.

---

### 6. Missing Security Headers
**Severity:** High  

Headers present:
- ✅ HSTS (`strict-transport-security: max-age=63072000`)
- ✅ CORS (`access-control-allow-origin: *`)

Headers missing:
- ❌ `Content-Security-Policy` — XSS risk
- ❌ `X-Frame-Options` — clickjacking risk
- ❌ `X-Content-Type-Options` — MIME sniffing risk
- ❌ `Referrer-Policy` — privacy leak risk
- ❌ `Permissions-Policy` — browser API abuse risk

Security headers affect trust signals, which feed into E-E-A-T assessments.

**Fix:** Add a `vercel.json` in the project root:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

---

### 7. No Structured Canonical in OG Tags
**Severity:** High  

`og:url` is set to `https://goqatar.app` (no trailing slash) while the server normalizes the URL to `https://goqatar.app/` (with trailing slash). This minor inconsistency can confuse social share counters and link equity attribution.

---

## MEDIUM

### 8. All Section Components Force Client-Side Rendering
**Severity:** Medium  

9 of 9 homepage sections use `"use client"`:
- HeroSection, StatsSection, FeaturesSection, AppScreensSection
- HowItWorksSection, NewsSection, UpcomingSection, BusinessAPISection, DownloadSection

Most use `"use client"` only for Framer Motion animations. This prevents true SSR content delivery. Googlebot will see empty or minimal content in the SSR response before JavaScript runs, hurting crawl efficiency.

**Fix:** Extract animation wrappers into separate client components. Keep the static HTML content (headings, text, feature descriptions) in server components.

Example pattern:
```tsx
// FeaturesSection.tsx (server component — no "use client")
import FeaturesAnimated from "./FeaturesAnimated"; // client

export default function FeaturesSection() {
  return (
    <section id="features">
      <h2>Everything you need to navigate Qatar</h2>
      <p>...</p>
      <FeaturesAnimated features={features} />
    </section>
  );
}
```

### 9. Missing llms.txt
**Severity:** Medium  

No `llms.txt` file at `https://goqatar.app/llms.txt`. This emerging standard lets AI crawlers (Claude, ChatGPT, Perplexity) understand site structure and key content for AI Overview inclusion.

---

## LOW

### 10. Site.webmanifest Icon Purpose Conflict
**Severity:** Low  

Both icon entries in `site.webmanifest` use `"purpose": "any maskable"`. These should be separate entries:
```json
{ "src": "/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any" },
{ "src": "/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
```

### 11. Cache-Control Header is Effectively No-Cache
**Severity:** Low  

`Cache-Control: public, max-age=0, must-revalidate` means every request triggers a revalidation. This is correct for Next.js ISR but means no edge-cached responses — slightly slower for distant users. (Mitigated by Vercel's edge network.)

---

## PASS

- ✅ HTTPS enforced (HSTS 2-year)
- ✅ HTTP/2 enabled
- ✅ lang="en" on `<html>` element
- ✅ viewport meta tag present
- ✅ charset utf-8 present
- ✅ Vercel CDN deployment (good global distribution)
- ✅ og-image.png exists and is accessible (1200×630)
- ✅ favicon-32.png, icon-192.png, icon-512.png, apple-icon.png all exist
- ✅ site.webmanifest present and valid JSON
- ✅ Next.js Image component used throughout (automatic optimization)
- ✅ Font preload for WOFF2 in `<head>`

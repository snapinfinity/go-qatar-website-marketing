# Go Qatar — SEO Action Plan
**Generated:** 2026-06-27  
**Overall Health Score:** 44/100 → Target: 68/100 after Phase 1–2

---

## Phase 1: Critical Fixes — Week 1 (Est. 3–4 hours total)

### 1.1 Deploy sitemap.ts and robots.ts [30 min]
Both files were created by the sitemap audit agent. Just commit and push to Vercel.

```bash
git add src/app/sitemap.ts src/app/robots.ts
git commit -m "Add Next.js sitemap and robots route handlers"
git push
```

After deploy, verify:
- `https://goqatar.app/sitemap.xml` → returns XML (not HTML)
- `https://goqatar.app/robots.txt` → returns plain text

Then: Submit sitemap in [Google Search Console](https://search.google.com/search-console) → Sitemaps.

**Success check:** Google Search Console shows sitemap submitted with 4 URLs.

---

### 1.2 Fix Page Title Duplication [15 min]
**Files:** `src/app/contact/page.tsx`, `src/app/privacy-policy/page.tsx`, `src/app/terms/page.tsx`

Remove the "— Go Qatar" suffix from each page's title. The root layout template `"%s | Go Qatar"` will append the brand once:

```typescript
// contact/page.tsx — BEFORE
export const metadata = {
  title: "Contact Us — Go Qatar",
  ...
}
// Renders as: "Contact Us — Go Qatar | Go Qatar" ❌

// AFTER
export const metadata = {
  title: "Contact Us",
  ...
}
// Renders as: "Contact Us | Go Qatar" ✅
```

Apply the same pattern to privacy-policy and terms pages.

**Success check:** Check page `<title>` tags — each should contain "Go Qatar" exactly once.

---

### 1.3 Add Canonical Tags [20 min]
**File:** `src/app/layout.tsx` + each page file

In `layout.tsx` metadata:
```typescript
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "/",
  },
  // ... existing metadata
};
```

In each page file:
```typescript
// contact/page.tsx
export const metadata: Metadata = {
  title: "Contact Us",
  alternates: { canonical: "/contact" },
  // ...
};

// privacy-policy/page.tsx
alternates: { canonical: "/privacy-policy" },

// terms/page.tsx
alternates: { canonical: "/terms" },
```

**Success check:** `<link rel="canonical" href="https://goqatar.app/">` appears in homepage `<head>`.

---

### 1.4 Fix og:url on Subpages [20 min]
**Files:** `src/app/contact/page.tsx`, `src/app/privacy-policy/page.tsx`, `src/app/terms/page.tsx`

Add page-specific openGraph to each:
```typescript
// contact/page.tsx
export const metadata: Metadata = {
  title: "Contact Us",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Us | Go Qatar",
    description: "Get in touch with the Go Qatar team.",
    url: "https://goqatar.app/contact",
  },
};
```

**Success check:** Share `/contact` on social — preview should show "Contact Us | Go Qatar" not homepage title.

---

### 1.5 Add MobileApplication + Organization JSON-LD [45 min]
**File:** `src/app/layout.tsx`

Add a `JsonLd` helper and inject it in the root layout:

```typescript
// In layout.tsx (server component — no "use client" needed)

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const appSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MobileApplication",
      "name": "Go Qatar",
      "description": "Navigate Qatar using Zone, Street & Building addresses. Free iOS and Android app with live Google Maps, offline support, favourites, and Qatar news.",
      "applicationCategory": "TravelApplication",
      "operatingSystem": "iOS, Android",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "downloadUrl": "https://apps.apple.com/us/app/go-qatar/id6756709380",
      "installUrl": "https://play.google.com/store/apps/details?id=com.snapinfinity.goqatar",
      "featureList": "Zone/Street/Building address search, Live Google Maps navigation, Offline support, Favourites, Search history, Qatar news feed",
      "screenshot": "https://goqatar.app/og-image.png",
      "countriesSupported": "QA",
      "inLanguage": "en",
      "author": {
        "@type": "Organization",
        "name": "Snap Infinity",
        "url": "https://snapinfinity.com"
      }
    },
    {
      "@type": "Organization",
      "name": "Snap Infinity",
      "url": "https://snapinfinity.com",
      "logo": "https://goqatar.app/logos/app_icon.svg",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "help.goqatar@gmail.com",
        "contactType": "customer support",
        "availableLanguage": "English"
      },
      "sameAs": [
        "https://apps.apple.com/us/app/go-qatar/id6756709380",
        "https://play.google.com/store/apps/details?id=com.snapinfinity.goqatar"
      ]
    },
    {
      "@type": "WebSite",
      "name": "Go Qatar",
      "url": "https://goqatar.app",
      "description": "Navigate Qatar using the Zone, Street and Building address system."
    }
  ]
};

// In RootLayout return:
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <JsonLd data={appSchema} />
      </head>
      <body className="bg-background text-white antialiased">{children}</body>
    </html>
  );
}
```

**Success check:** [Google Rich Results Test](https://search.google.com/test/rich-results) on goqatar.app shows MobileApplication detected.

---

### 1.6 Add Security Headers [20 min]
**File:** `next.config.ts`

```typescript
import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  images: {
    domains: [],
  },
};

export default nextConfig;
```

**Success check:** `curl -sI https://goqatar.app | grep -i "x-content"` returns `x-content-type-options: nosniff`.

---

### 1.7 Add llms.txt [10 min]
Create `/public/llms.txt`:

```
# Go Qatar

> Go Qatar is a free mobile app for navigating Qatar using the official Zone, Street, and Building (ZSB) address system. Available on iOS and Android. Developed by Snap Infinity.

Go Qatar helps residents, visitors, and businesses in Qatar find any address using Qatar's unique three-part addressing format: a Zone number, a Street number, and a Building number. The app converts these three numbers into a precise GPS location, displays it on a live Google Map, and enables one-tap navigation via Google Maps or Waze.

## App

- Platform: iOS and Android (free, no subscription)
- Developer: Snap Infinity (snapinfinity.com)
- iOS: https://apps.apple.com/us/app/go-qatar/id6756709380
- Android: https://play.google.com/store/apps/details?id=com.snapinfinity.goqatar
- Coverage: All zones across Qatar

## Key Features

- Zone/Street/Building address search: Resolve any Qatar ZSB address to a GPS pin
- Live Google Maps integration with turn-by-turn navigation
- Core search works offline
- Save favourites: bookmark frequently visited addresses
- Search history: one-tap access to recent lookups
- Qatar news feed: List, Grid, or Reel view with category filtering
- Secure sign-in via Google or Apple with cross-device sync

## Qatar Addressing System

Qatar uses a structured municipal addressing system. Every location is identified by three numbers: Zone, Street, and Building. Standard map apps do not support this format. Go Qatar is purpose-built for it.

## Business API

Zone/Street/Building address resolution for delivery platforms, e-commerce checkout, field service, and government systems. Custom pricing. Contact: https://goqatar.app/contact

## Legal

- Privacy Policy: https://goqatar.app/privacy-policy
- Terms: https://goqatar.app/terms
- Support: help.goqatar@gmail.com
```

---

## Phase 2: High-Impact Improvements — Weeks 2–3

### 2.1 Replace Social Proof with Real Data [2 hours]
- Fetch actual App Store rating from iTunes API (endpoint: `https://itunes.apple.com/lookup?id=6756709380`)
- Display: "4.X stars — N reviews" with link to App Store
- Replace colored placeholder avatars with the rating badge

### 2.2 Add FAQ Section to Homepage [3 hours]
Add a `<section id="faq">` below the download section with 6 Q&A pairs:
1. What is the Zone Street Building address system in Qatar?
2. Is Go Qatar free?
3. Does Go Qatar work offline?
4. How do I find an address in Qatar using the app?
5. What areas does Go Qatar cover?
6. Can businesses integrate Go Qatar into their platform?

Add `FAQPage` JSON-LD schema to the homepage for each Q&A.

### 2.3 Device-Detection CTA in Hero [1 hour]
Wire `getDeviceStoreLink()` (already in `storeLinks.ts`) to show a single primary button above the fold:
```tsx
const storeLink = getDeviceStoreLink();
if (storeLink) {
  // Show single "Download for iPhone" or "Download for Android" button
} else {
  // Show both buttons (desktop)
}
```

### 2.4 Fix Inner Page og:url and Social Meta [30 min]
See Phase 1.4 — ensure all 3 inner pages have correct per-page og:url.

### 2.5 Add BreadcrumbList Schema to Inner Pages [30 min]
Add `BreadcrumbList` JSON-LD to `/contact`, `/privacy-policy`, and `/terms` using the same `JsonLd` helper.

### 2.6 Fix Site.webmanifest Icon Purpose [10 min]
Split `"purpose": "any maskable"` into separate `"any"` and `"maskable"` icon entries.

### 2.7 Add Qatar Address System Explainer to Hero [1 hour]
Add a single explanatory sentence or small card just before/after the hero H1:
> "Qatar uses a unique Zone/Street/Building address system. Most map apps can't read it. Go Qatar can."

This captures awareness-stage searchers who don't yet understand why they need a specialized app.

---

## Phase 3: Content & Authority — Month 2

### 3.1 Publish "Qatar Zone Street Building Address System Explained" [8 hours]
- 1,500–2,000 word guide
- Target keywords: "Qatar address system", "Zone Street Building Qatar", "how to find address in Qatar", "Doha zone number"
- Include: how the system works, all zone numbers, how to read a Qatar address, how to use the app
- Add `Article` schema with `datePublished`, `author`, `about` pointing to Qatar addressing

### 3.2 Update snapinfinity.com [4 hours]
- Replace Vite placeholder with a real company page
- Include: company name, description, app links, press contact
- Link back to goqatar.app
- This directly improves the `rel="author"` authority signal

### 3.3 Create /business Landing Page [4 hours]
- Separate page for the Business API audience
- Own title: "Qatar Address API for Businesses — Go Qatar"
- Own metadata targeting logistics/delivery/SaaS queries
- Add nav item "For Business" pointing to it

### 3.4 LinkedIn/Reddit Presence [2 hours]
- Create Snap Infinity LinkedIn page
- Post app launch on r/qatar, r/doha, r/expats
- These provide branded backlinks and social entity signals

### 3.5 Record YouTube Demo Video [2 hours]
- 60–90 second screen recording: address search → map pin → navigate
- Title: "How to find any address in Qatar — Go Qatar app (Zone/Street/Building)"
- Embed on homepage
- YouTube presence has ~0.737 correlation with LLM citation frequency

---

## Phase 4: Monitoring & Iteration — Ongoing

### Tools to Set Up
- **Google Search Console**: Submit sitemap, monitor Coverage tab for indexed pages, check for "Soft 404" warnings, monitor Core Web Vitals report
- **Bing Webmaster Tools**: Submit sitemap for Bing/Copilot indexation
- **Google Analytics 4**: Track organic traffic channel, app store click-through rate from homepage

### Monthly Checks
- Core Web Vitals score in GSC
- Indexed page count (should be 4 initially, growing if blog is added)
- Check for any manual actions or security issues in GSC
- Monitor app store rating for schema update (if rating changes significantly)

### SEO Drift Baseline
After Phase 1 is deployed, run:
```bash
/seo drift baseline https://goqatar.app
```
This will capture the new baseline for all key SEO signals. Future deploys can be compared against it.

---

## Priority Quick Reference

| Task | Effort | Impact | Phase |
|------|--------|--------|-------|
| Deploy sitemap.ts + robots.ts | 5 min | Critical | 1 |
| Fix title duplication on inner pages | 15 min | High | 1 |
| Add canonical tags | 20 min | High | 1 |
| Add MobileApplication JSON-LD | 45 min | Critical | 1 |
| Add security headers | 20 min | High | 1 |
| Add llms.txt | 10 min | Medium | 1 |
| Fix og:url on subpages | 20 min | High | 1 |
| Real App Store rating in hero | 2 hr | High | 2 |
| FAQ section + FAQPage schema | 3 hr | High | 2 |
| Device-detection hero CTA | 1 hr | Medium | 2 |
| Qatar address system explainer guide | 8 hr | High | 3 |
| snapinfinity.com rebuild | 4 hr | Medium | 3 |
| /business landing page | 4 hr | Medium | 3 |
| YouTube demo embed | 2 hr | Medium | 3 |

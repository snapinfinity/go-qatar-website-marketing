# Content Quality & E-E-A-T Findings — goqatar.app
**Audit Date:** 2026-06-27

---

## E-E-A-T Assessment

### Experience: 2/5
- No real user reviews, ratings, or testimonials with identifiable names
- "Loved by Qatar residents" uses static colored circles as fake social proof
- No case studies, user stories, or documented usage scenarios
- No app store rating displayed on the web (App Store ID: id6756709380 — real data exists but unused)

### Expertise: 3/5
- Features are described with technical accuracy (Zone/Street/Building system)
- Business API section shows domain expertise in Qatar address resolution
- HowItWorksSection clearly explains the unique Qatar addressing system
- No "About" page, no team page, no credentials

### Authoritativeness: 2/5
- No press coverage links or media mentions
- No partner or integration logos (government, telecom, enterprise clients)
- Developer (Snap Infinity) has no visible web presence linked from the site
- No social media profiles linked
- No external validation (awards, certifications, app store badges with live ratings)

### Trustworthiness: 3/5
- HTTPS enforced ✅
- Privacy Policy present ✅
- Terms of Service present ✅
- Contact email visible (help.goqatar@gmail.com) — Gmail address reduces trust vs. a domain email
- No physical address or company registration details
- `last updated: June 2025` dates on legal pages ✅

**Overall E-E-A-T: Weak** — adequate for a brand-new app but will limit organic authority.

---

## Page-by-Page Analysis

### Homepage (/)
**Estimated word count:** ~700 words (visible text, excluding UI labels)  
**Content depth:** Moderate for a landing page

**H1:** Split across two elements: "Your City." + "Your Way." — combined reads as "Your City. Your Way."  
> Issue: The H1 doesn't contain primary keywords ("Qatar navigation", "address finder", "Doha"). It's a brand tagline, not an SEO-optimized heading.

**H2s:**
1. "Everything you need to navigate Qatar" ✅ (contains target keyword)
2. "Stay updated with Qatar's latest" ✅
3. "Every screen, perfectly designed" ❌ (generic, no keyword signal)
4. "Find any address in 3 simple steps" ✅
5. "Need the Go Qatar API for your business?" ✅ (targets B2B segment)
6. "Get Go Qatar for free today" ✅ (CTA-oriented)

**Keyword coverage:**
- "Qatar navigation" — mentioned in hero text ✅
- "Qatar address finder" — implied but not stated ❌ (should be explicit)
- "Zone Street Building Qatar" — explained in HowItWorks ✅
- "Doha address" — not mentioned ❌
- "Qatar GPS" — not mentioned ❌
- "Qatar map" — mentioned in features ✅

**Missing content for SEO:**
- No section explaining what the Qatar Zone/Street/Building system IS for people unfamiliar with it
- No FAQ section (user questions about the app, permissions, offline usage)
- No "supported areas" or coverage map description
- No app version or update history visible

---

### Contact (/contact)
**Word count:** ~30 words visible (form labels only)  
**Severity:** High — thin content, form-only page  
**Metadata:**
- Title: "Contact Us — Go Qatar | Go Qatar" ← **DUPLICATE BRANDING** (template adds "| Go Qatar" to a title that already contains "Go Qatar")
- Description: Good — specific and accurate

---

### Privacy Policy (/privacy-policy)
**Word count:** ~600 words across 7 sections  
**Content quality:** Adequate for an app privacy policy  
**Title:** "Privacy Policy — Go Qatar | Go Qatar" ← **DUPLICATE BRANDING**  
**Issue:** "Last updated: June 2025" — a year-old date signals stale policy; consider updating to June 2026

---

### Terms of Service (/terms)
**Word count:** ~700 words across 8 sections  
**Content quality:** Adequate  
**Title:** "Terms & Conditions — Go Qatar | Go Qatar" ← **DUPLICATE BRANDING**  
**Issue:** References "GO-QATAR" (all caps) inconsistently with "Go Qatar" branding elsewhere

---

## Issues

### HIGH: Title Template Creates Duplicate Brand Names
**Severity:** High  
**Affected:** /contact, /privacy-policy, /terms

The `layout.tsx` title template is `"%s | Go Qatar"`. The inner page titles already contain "Go Qatar":
- `"Contact Us — Go Qatar"` → rendered as `"Contact Us — Go Qatar | Go Qatar"` (57 chars, duplicate brand)
- `"Privacy Policy — Go Qatar"` → `"Privacy Policy — Go Qatar | Go Qatar"` (37 chars, OK length but redundant)
- `"Terms & Conditions — Go Qatar"` → `"Terms & Conditions — Go Qatar | Go Qatar"` (41 chars)

**Fix:** Remove "— Go Qatar" from inner page title exports:
```typescript
// contact/page.tsx
export const metadata = {
  title: "Contact Us",
  description: "...",
};
// Renders as: "Contact Us | Go Qatar"
```

---

### HIGH: H1 Contains No Target Keywords
**Severity:** High  

The homepage H1 "Your City. Your Way." is a brand tagline. While memorable, it contains zero search-intent keywords. For a site targeting "Qatar navigation app" queries, the H1 should signal the product category.

**Fix options:**
1. Add a secondary H1 or change the subheadline to an H1: "Navigate Qatar with the Go Qatar App"
2. Or add a subtitle below the tagline: `<h2>Qatar's #1 Navigation App for Zone, Street & Building Addresses</h2>`

---

### MEDIUM: No Real Social Proof
**Severity:** Medium  

The hero section shows generic colored circles and static stars with "Loved by Qatar residents" — no review count, no rating score, no user names.

**Fix:** 
- Link to App Store/Play Store rating (available via iTunes API)
- Display actual download count or user count if available
- Consider adding 2-3 real user testimonials with names and avatars

---

### MEDIUM: Gmail Contact Address Reduces Trust
**Severity:** Medium  

`help.goqatar@gmail.com` is visible in Privacy Policy and Terms. A custom domain email (`support@goqatar.app`) signals greater legitimacy, especially for business API inquiries.

---

### MEDIUM: Missing Localization for Arabic Speakers
**Severity:** Medium  

Qatar's population is >70% non-English-speaking. The site is English-only with no Arabic (ar) language version. The OG locale is en_US only. 

**Opportunity:** An Arabic landing page (`/ar`) targeting "تطبيق قطر للملاحة" (Qatar navigation app in Arabic) would capture significant search volume.

---

### LOW: No Content Marketing Strategy
**Severity:** Low  

No blog, no FAQ, no help center, no how-to guides. The site has no ability to capture long-tail keywords or build topical authority around:
- "How Qatar addressing system works"
- "Find address in Qatar using Zone number"  
- "Best navigation app for expats in Qatar"
- "Qatar delivery address format"

**Opportunity:** A simple blog or FAQ page with 5-10 articles would dramatically expand keyword coverage.

---

## What Works Well
- Meta description is strong: specific, benefit-oriented, includes keywords
- OG/Twitter Card metadata is complete and correct
- Feature descriptions are clear and specific to Qatar's address system
- BusinessAPI section targets a distinct B2B segment (underserved keyword space)
- HowItWorksSection explains the Zone/Street/Building system educationally
- App Store and Play Store links are correct and functional

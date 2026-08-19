# UI Changes — Review Queue

Any change that modifies visible UI is logged here for manual review.
Append entries in this format:

## 2026-07-21 — <change title>
- **Change:** <what was modified>
- **Files:** <files touched>
- **Visual impact:** <what a user would notice>
- **Review URL:** <deployed URL to check>
- **Reviewed?** [ ]

## 2026-07-22 — Reconcile support response-time claims to 24 hours
- **Change:** Privacy Policy and Terms pages said support responds within "48 hours"/"48 business hours"; Contact page says "24 hours" in 4 places. Standardized Privacy/Terms text to "24 hours" to match the Contact page's repeated commitment.
- **Files:** src/app/privacy-policy/page.tsx, src/app/terms/page.tsx
- **Visual impact:** Visible legal-copy text changes ("48 hours" → "24 hours") in the "Contact Us"/"Contact Information" sections of both pages.
- **Review URL:** https://goqatar.app/privacy-policy , https://goqatar.app/terms
- **Reviewed?** [ ]

## 2026-07-23 — Restore client hydration in dev (CSP eval fix)
- **Change:** The security-headers CSP (`script-src 'self' 'unsafe-inline'`, no `'unsafe-eval'`) blocked webpack's eval-based module execution in `next dev`, so the app rendered server-side but never hydrated — every framer-motion section stayed at `opacity:0` and only the header/footer were visible. Gated `'unsafe-eval'` + `ws:` behind `NODE_ENV !== 'production'`; production CSP unchanged. Committed as 6a9893b.
- **GOTCHA (capture for future auto-fixes):** any CSP added by the security-headers auto-fix MUST include `'unsafe-eval'` (script-src) and `ws:` (connect-src) in development, or `next dev` hydration silently breaks. Prod builds don't use eval, so keep the strict policy there.
- **Files:** next.config.ts
- **Visual impact:** All page sections below the fold now render and animate in on scroll (were previously blank in local dev). No change to the deployed production site.
- **Review URL:** local `next dev` → http://localhost:3000 (verify sections render + scroll reveals fire)
- **Reviewed?** [ ]

## 2026-07-26 — Add Google Tag Manager (GTM-PS48G5JD)
- **Change:** Installed `@next/third-parties` and rendered `<GoogleTagManager gtmId="GTM-PS48G5JD">` in the root layout; opened the production CSP (`script-src`, `img-src`, `connect-src`) for `googletagmanager.com` and `google-analytics.com` so the tag isn't blocked. Container was created in GTM by the user but **not yet published**, and this change is **not yet deployed** — `seo-tracker verify-live` confirms `gtm.js` is not yet reachable on https://goqatar.app. TODO item staged (`[~]`), not marked done, until a post-deploy `verify-live` check passes.
- **Files:** src/app/layout.tsx, next.config.ts, package.json, package-lock.json
- **Visual impact:** None visible on-page; adds a network request to googletagmanager.com and (once tags are configured) sets analytics cookies.
- **Review URL:** https://goqatar.app (after deploy — check Network tab for `gtm.js?id=GTM-PS48G5JD`, and GTM's own Preview mode)
- **Reviewed?** [ ]

## 2026-07-26 — Expand Privacy Policy: analytics/cookies, Apple Sign-In, Maps SDK, PDPPL rights
- **Change:** Added two new sections ("Analytics & Cookies", "Maps & Location Services") disclosing Google Analytics/GTM cookie use and the Google Maps Platform SDK; updated "Information We Collect" to include Apple Sign-In and location data; updated "Information Sharing" to name Google/Apple as processors; updated "Your Rights" to reference Qatar's PDPPL. Renumbered sections 01-09. Bumped "Last updated" to July 2026 and JSON-LD `dateModified` to 2026-07-26. This addresses the Privacy Policy portion of the open "legal review" finding — Terms & Conditions and a formal legal review are still outstanding (see `legal-review-rewrite-template-terms-...` in TODO.md, left open).
- **Files:** src/app/privacy-policy/page.tsx
- **Visual impact:** Two new visible policy sections; renumbered section badges; updated "Last updated" date in the hero.
- **Review URL:** https://goqatar.app/privacy-policy
- **Reviewed?** [ ]

## 2026-08-19 — Hero H1: unify headline + add keyword line
- **Change:** The `<h1>` contained only "Your City." while "Your Way." sat in a sibling non-heading `<div>`, and neither carried a keyword. Merged both lines into a single `<h1>` (block `<m.span>` children, same sizes/gradient/stagger — visually identical), then added a third smaller line inside the heading: "Navigate Qatar by Zone, Street & Building." (20px mobile / 30px desktop, white/75, reveals at 0.26s). Trimmed the sub-headline paragraph so it no longer repeats "Navigate Qatar" / "Zone, Street & Building".
- **Files:** src/components/sections/HeroSection.tsx
- **Visual impact:** New keyword line under the gold "Your Way." — adds ~36px (desktop) / ~55px (mobile, wraps to 2 lines) of hero height. Sub-headline paragraph reworded from "Navigate Qatar like a local. Find any address instantly using Qatar's unique Zone, Street & Building system — with live news, saved favorites, and smart history." to "Find any address instantly with Qatar's official address system — plus live news, saved favorites, and smart history."
- **Verified locally:** `next start` at 375px and desktop — 48/48/20px and 72/72/30px, gold gradient intact (`-webkit-text-fill-color: transparent`), no horizontal overflow, no console errors. Screenshot not captured (Browser pane hidden, so rAF was paused and framer-motion could not advance).
- **Review URL:** https://goqatar.app (check hero on mobile — the new line wraps to 2 lines)
- **Reviewed?** [ ]

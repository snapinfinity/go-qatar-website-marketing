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

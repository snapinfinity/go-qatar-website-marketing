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

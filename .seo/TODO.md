# SEO Tracker — go-qatar-website-marketing

Read this file first. Work items are executed top-to-bottom.
Mark done with `seo-tracker done <id>`.

## Setup

- [x] **1. Verify claude-seo installed**
  - id: setup-01-verify-tools
  - type: auto
  - category: setup
  - priority: critical
  - stop-if-fail: yes
  - action: `seo-tracker verify-tools`

- [x] **2. Verify claude-seo up to date**
  - id: setup-02-update-tools
  - type: auto
  - category: setup
  - priority: high
  - action: `seo-tracker verify-tools` (does update check too)

- [x] **3. Verify Google API keys configured**
  - id: setup-03-verify-keys
  - type: hybrid
  - category: setup
  - priority: high
  - action: `seo-tracker verify-keys`

- [x] **4. Verify project builds**
  - id: setup-04-verify-build
  - type: auto
  - category: setup
  - priority: medium
  - stop-if-fail: no
  - action: `seo-tracker verify-build`

- [x] **5. Set deployed URL**
  - id: setup-05-set-url
  - type: hybrid
  - category: setup
  - priority: critical
  - action: `seo-tracker set-url`

- [x] **6. Run initial SEO audit**
  - id: setup-06-initial-audit
  - type: auto
  - category: setup
  - priority: critical
  - action: `seo-tracker audit`

- [x] **7. Check GTM presence**
  - id: setup-07-check-gtm
  - type: auto
  - category: analytics
  - priority: high
  - action: `seo-tracker check-gtm` (if missing, `seo-tracker add-gtm`)

## Fixes — auto (AI can do)
<!-- Populated by 'seo-tracker audit' -->

- [x] **Add robots.ts (crawler rules + sitemap pointer)  draft created at src/app/robots.ts**
  - id: add-robots-ts-crawler-rules-sitemap-pointer-draft-created-at-src-app-robots-ts
  - type: auto
  - category: technical
  - priority: critical
  - created: 2026-07-21

- [x] **Add sitemap.ts generating /, /contact, /privacy-policy, /terms  draft created at src/app/sitemap.ts**
  - id: add-sitemap-ts-generating-contact-privacy-policy-terms-draft-created-at-src-app-sitemap-ts
  - type: auto
  - category: technical
  - priority: critical
  - created: 2026-07-21

- [x] **Add security headers via headers() in next.config.ts (CSP, X-Frame-Options, COOP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy; extend HSTS)**
  - id: add-security-headers-via-headers-in-next-config-ts-csp-x-frame-options-coop-x-content-type-options-referrer-policy-permissions-policy-extend-hsts
  - type: auto
  - category: technical
  - priority: high
  - created: 2026-07-21

- [x] **Add Organization + WebSite + MobileApplication JSON-LD to homepage (ready-to-paste in findings/schema.md)**
  - id: add-organization-website-mobileapplication-json-ld-to-homepage-ready-to-paste-in-findings-schema-md
  - type: auto
  - category: schema
  - priority: high
  - created: 2026-07-21

- [x] **Add BreadcrumbList + ContactPoint JSON-LD to /contact, /privacy-policy, /terms**
  - id: add-breadcrumblist-contactpoint-json-ld-to-contact-privacy-policy-terms
  - type: auto
  - category: schema
  - priority: medium
  - created: 2026-07-21

- [x] **Publish llms.txt for AI crawlers (draft in findings/geo.md)**
  - id: publish-llms-txt-for-ai-crawlers-draft-in-findings-geo-md
  - type: auto
  - category: geo
  - priority: high
  - created: 2026-07-21

- [x] **Fix /contact og:url  currently points to homepage instead of /contact**
  - id: fix-contact-og-url-currently-points-to-homepage-instead-of-contact
  - type: auto
  - category: on-page
  - priority: medium
  - created: 2026-07-21

- [x] **Reconcile support response-time claims: 24h on Contact vs 48h in Privacy/Terms**
  - id: reconcile-support-response-time-claims-24h-on-contact-vs-48h-in-privacy-terms
  - type: auto
  - category: content
  - priority: medium
  - created: 2026-07-21

- [x] **Fix /Privacy-Policy case-variant 404 (redirect to lowercase); label the unlabeled <select>; fix footer heading-order skip**
  - id: fix-privacy-policy-case-variant-404-redirect-to-lowercase-label-the-unlabeled-select-fix-footer-heading-order-skip
  - type: auto
  - category: technical
  - priority: low
  - created: 2026-07-21

- [x] **Performance: inline critical CSS, split/lazy-load 431-*.js (54% unused), drop legacy JS polyfills, fix forced reflow**
  - id: performance-inline-critical-css-split-lazy-load-431-js-54-unused-drop-legacy-js-polyfills-fix-forced-reflow
  - type: auto
  - category: performance
  - priority: medium
  - created: 2026-07-21

- [x] **Improve image alt text (currently generic 'Go Qatar'/'Go Qatar icon')**
  - id: improve-image-alt-text-currently-generic-go-qatar-go-qatar-icon
  - type: auto
  - category: images
  - priority: low
  - created: 2026-07-21

## Fixes — manual (user must do)
<!-- Populated by 'seo-tracker audit' -->

- [x] **Resolve apex vs www duplication: add 308 redirect + metadataBase self-canonical in layout.tsx**
  - id: resolve-apex-vs-www-duplication-add-308-redirect-metadatabase-self-canonical-in-layout-tsx
  - type: hybrid
  - category: technical
  - priority: critical
  - created: 2026-07-21

- [ ] **Submit sitemap.xml in Google Search Console and request indexing for /contact, /privacy-policy, /terms**
  - id: submit-sitemap-xml-in-google-search-console-and-request-indexing-for-contact-privacy-policy-terms
  - type: manual
  - category: technical
  - priority: high
  - created: 2026-07-21

- [ ] **Replace personal Gmail support address with branded @goqatar.app email**
  - id: replace-personal-gmail-support-address-with-branded-goqatar-app-email
  - type: manual
  - category: content
  - priority: high
  - created: 2026-07-21

- [ ] **Add company/legal entity name + Qatar business address and an About/team section (E-E-A-T)**
  - id: add-company-legal-entity-name-qatar-business-address-and-an-about-team-section-e-e-a-t
  - type: hybrid
  - category: content
  - priority: high
  - created: 2026-07-21

- [ ] **Legal review: rewrite template Terms; update Privacy Policy for Apple Sign-In, Google Maps SDK, analytics data flows, and Qatar PDPPL**
  - id: legal-review-rewrite-template-terms-update-privacy-policy-for-apple-sign-in-google-maps-sdk-analytics-data-flows-and-qatar-pdppl
  - type: manual
  - category: content
  - priority: high
  - created: 2026-07-21

- [ ] **Add an FAQ with 134-167 word citable answers + a canonical 'What is Go Qatar / Zone-Street-Building' explainer passage**
  - id: add-an-faq-with-134-167-word-citable-answers-a-canonical-what-is-go-qatar-zone-street-building-explainer-passage
  - type: hybrid
  - category: geo
  - priority: medium
  - created: 2026-07-21

- [ ] **Give the Business API a dedicated page with docs/pricing/case studies, or soften unverifiable SLA/white-label claims**
  - id: give-the-business-api-a-dedicated-page-with-docs-pricing-case-studies-or-soften-unverifiable-sla-white-label-claims
  - type: hybrid
  - category: sxo
  - priority: medium
  - created: 2026-07-21

- [ ] **Replace illustrative SVG app mockups with real device screenshots/demo video; source or remove decorative star ratings**
  - id: replace-illustrative-svg-app-mockups-with-real-device-screenshots-demo-video-source-or-remove-decorative-star-ratings
  - type: manual
  - category: content
  - priority: medium
  - created: 2026-07-21

- [ ] **Backlink outreach: expat sites (ILoveQatar, Marhaba, Qatar Living), Qatar tech directories (QSTP, QDB), Product Hunt/AlternativeTo launch**
  - id: backlink-outreach-expat-sites-iloveqatar-marhaba-qatar-living-qatar-tech-directories-qstp-qdb-product-hunt-alternativeto-launch
  - type: manual
  - category: backlinks
  - priority: medium
  - created: 2026-07-21

- [ ] **Optional: add GTM + GA4 for analytics (not currently present)**
  - id: optional-add-gtm-ga4-for-analytics-not-currently-present
  - type: manual
  - category: technical
  - priority: low
  - created: 2026-07-21

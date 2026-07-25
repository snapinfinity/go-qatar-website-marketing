# SXO (Search Experience Optimization) Findings — goqatar.app

Date: 2026-07-25
Source: `.seo/cache/2026-07-25/homepage.html`, `pages/contact.html`, `llms.txt`, `psi-mobile.json` + live Google SERP checks for target queries.

## SXO Gap Score: 48 / 100

(Separate from the SEO Health Score of 57 in STATE.md — this measures how well the page's *format and journey* match what Google is actually rewarding for the target queries, not technical SEO hygiene.)

| Dimension | Score | Evidence |
|---|---|---|
| Page-Type Match | 4/15 | SERP for 2 of 3 target queries is dominated by live functional tools/APIs, not marketing pages (see mismatch below) |
| Content Depth / Intent Coverage | 5/15 | No FAQ, no address-lookup content, no dedicated Business API page (only in TODO backlog), no blog/news indexed on web |
| UX / Above-the-Fold Clarity | 8/15 | Fast load (PSI mobile perf 96), clear nav + CTAs, but H1 "Your City. Your Way." doesn't echo the address/navigation intent; hero phone mockup is a static illustrative SVG, not a working tool |
| Schema | 13/15 | Organization + WebSite + MobileApplication (with Offer/price=0) on homepage; ContactPage + BreadcrumbList on /contact — strong |
| Media / Social Proof | 5/15 | 5-star rating graphic + "Loved by Qatar residents" with generic colored-circle avatars — no linked review count, no real screenshots (SVG mockups), already flagged in TODO.md |
| Authority / Trust | 6/15 | Personal Gmail support address (help.goqatar@gmail.com), no visible Qatar legal entity/address, no case studies — matches existing TODO items |
| Conversion Path / Freshness | 7/10 | App Store + Google Play CTAs above the fold, repeated in #download and footer, correctly deep-linked; no visible content freshness signals |

---

## 1. PRIMARY FINDING — Page-Type Mismatch (CRITICAL)

**"Qatar address finder"** and **"Zone Street Building Qatar"** — the two queries closest to the app's core value prop — are NOT dominated by marketing/landing pages in the SERP. They are dominated by **live, functional utility tools**:

- QNAS.qa (Qatar National Address Service) — official free lookup tool + public API docs
- A third-party interactive Zone/Street/Building search tool (3noane.q6r.link)
- WorldStreets Global reverse address lookup tool
- Qaddress / QPLACES — competing apps, ranking via their own Google Play/App Store listing pages
- ILoveQatar.net — one editorial explainer article ("Know your Zone")

**goqatar.app is a pure marketing/download landing page.** The homepage hero shows a *static illustrative SVG mockup* of a Zone/Street/Building search screen (hardcoded values "25 / 330 / 12", non-interactive) — there is no real, working web-based lookup a searcher can use without first installing the app. Users arriving from these queries expect to type in a zone/street/building and get an answer or a map pin immediately; goqatar.app instead asks for an app-store download before delivering any value. **Severity: CRITICAL.**

**"Qatar navigation app"** is dominated by App Store/Google Play listing pages themselves plus third-party ranking/analytics listicles (SimilarWeb, Sensortower) — i.e., aggregators, not brand marketing sites. Page type (marketing/download page) is directionally correct here, but ranking organically against app-store domains is structurally hard, and the site has no supporting comparison/review content to compensate. **Severity: MEDIUM.**

**Recommended fix (highest leverage item in this audit):** Build a real, embedded Zone → Street → Building lookup tool on the website itself (e.g. a `/find-address` page with a form + embedded Google Map that returns a pin, mirroring the in-app UI shown in the hero mockup). This single change would flip the page-type mismatch from CRITICAL to ALIGNED for the two highest-intent queries and create genuinely indexable, citable content — not just a download funnel.

---

## 2. Search Intent Alignment

- Meta title/description and keyword list already target the right phrases ("Qatar address finder", "Zone Street Building Qatar", "Doha address", "Qatar GPS") — on-page metadata is not the gap.
- H1 ("Your City. Your Way.") is a brand slogan, not an intent-matching headline. A cold click from "Qatar address finder" lands on a page whose H1 doesn't restate the query — subhead does the work instead, one beat too late for above-the-fold scanning.
- The in-app "News Feed" feature is not surfaced as indexable web content (no blog/article pages), losing an opportunity to build topical authority around Qatar-related informational queries that could support the address-finder head terms.
- No FAQ/glossary content answering "What is the Zone Street Building system in Qatar" in a citable, standalone passage — this is also a GEO/AI-citability gap (cross-reference `/seo content` or `/seo geo`).

---

## 3. Persona Scoring (Relevance / Clarity / Trust / Action — 25 pts each)

Sorted weakest → strongest (lead fixes here):

### Business / Delivery / Logistics operator — 28/100 (WEAKEST)
- Relevance 8/25 — "Business API" is only a backlog item (TODO.md), not a page a prospect can find or evaluate.
- Clarity 6/25 — no docs, no pricing, no integration details anywhere in indexed content.
- Trust 6/25 — no SLA, no client logos, no case studies.
- Action 8/25 — no distinct "Talk to Sales / Get API Access" CTA separate from the consumer app-download buttons.
- **Fix:** Ship a dedicated `/business` or `/api` page with docs, pricing tiers, and a sales-lead CTA — or soften/remove unverifiable Business API claims until the page exists (already flagged in TODO.md as a manual/hybrid item).

### Tourist / Visitor — 61/100
- Relevance 17/25 — "Works Offline" badge and live-map navigation are genuinely useful for visitors, but copy skews resident-oriented ("navigate like a local").
- Clarity 13/25 — hero doesn't signal "for visitors," may cause bounce for trip-planning searchers.
- Trust 10/25 — no real App Store/Play rating count shown anywhere (only decorative fake 5-star + colored-circle avatars), no press mentions.
- Action 21/25 — CTAs strong and repeated.
- **Fix:** Add a short "New to Qatar? / Visiting?" micro-section acknowledging tourist use case; replace decorative rating graphic with real, linked App Store/Play Store rating badges.

### Expat Resident — 66/100
- Relevance 18/25 — copy explicitly names Zone/Street/Building system, strong keyword match.
- Clarity 14/25 — 3-step "How It Works" is clear, but value is gated entirely behind an app install — no lightweight "check your address right now" path.
- Trust 12/25 — personal Gmail support address, no visible Qatar legal entity/address (both already flagged in TODO.md).
- Action 22/25 — prominent, correctly deep-linked App Store/Play Store CTAs.
- **Fix:** Ship the on-page address-lookup tool (see Finding #1) so residents get value pre-install; move support to a branded @goqatar.app address.

### Local / Returning app user (News feed browsers) — 78/100 (strongest)
- Relevance 20/25, Clarity 20/25, Trust 18/25, Action 20/25 — feature description (List/Grid/Reel modes) is concrete and well-illustrated; lowest-priority persona for SEO acquisition since it's a retention use case, not a discovery one.

---

## 4. Above-the-Fold Clarity & Conversion Path

**Strengths (do not change):**
- Mobile PSI performance score 96 — fast LCP, hero renders quickly.
- App Store + Google Play buttons are present above the fold in the hero, repeated in the `#download` section and footer, and correctly deep-link to the live App Store (id6756709380) and Play Store (com.snapinfinity.goqatar) listings.
- MobileApplication schema includes both store Offers at price 0 — good machine-readable conversion signal.

**Weaknesses:**
- H1 doesn't restate searcher intent (brand slogan over descriptive headline).
- Hero "app screenshot" is a static illustrative SVG mockup with hardcoded demo values, not a real screenshot or working tool — reduces credibility and forfeits the chance to deliver value pre-download.
- Social proof (star rating, "Loved by Qatar residents") is decorative/unverifiable — no linked review count from either store.

---

## 5. Limitations

- No access to actual Google Search Console / rank tracking data for goqatar.app — SERP consensus is based on live WebSearch snapshots for the three target queries (2026-07-25), not a full top-10 crawl-and-classify per the standard SXO workflow.
- `skills/seo-sxo/references/*` (page-type-taxonomy.md, user-story-framework.md, persona-scoring.md, wireframe-templates.md) were not found on this machine; persona/page-type framing above is analyst-derived from the visible SERP and page evidence rather than the formal reference rubric.
- Did not independently verify real App Store/Google Play star ratings — flagged as "unverifiable" based on absence of linked proof on-page, not a confirmed false claim.
- `/business`, `/api`, or any Business API page was not found in the crawled sitemap (only `/`, `/contact`, `/privacy-policy`, `/terms`) — persona scoring for the Business/Delivery segment assumes no such page currently exists.

---

## 6. Cross-Skill Recommendations

- E-E-A-T gaps (support email, legal entity, testimonials) → run `/seo content`.
- On-page address-lookup tool would benefit from Product/SoftwareApplication or WebApplication schema once built → run `/seo schema`.
- No Qatar business address/local signals found → run `/seo local` if a physical/registered presence is to be established.
- Thin content on Business API and lack of FAQ → run `/seo page` for a page-level content audit.

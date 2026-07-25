# GEO / AI-Search Readiness Audit — goqatar.app
Date: 2026-07-25 | Source: `.seo/cache/2026-07-25/` (homepage.html, llms.txt, robots.txt, sitemap.xml, headers.txt, pages/contact|privacy-policy|terms.html) + live check of Reddit/YouTube/Wikipedia presence.

## GEO Category Score: 52 / 100

| Dimension | Weight | Score | Weighted |
|---|---|---|---|
| Citability | 25% | 50/100 | 12.5 |
| Structural Readability | 20% | 60/100 | 12.0 |
| Multi-Modal Content | 15% | 30/100 | 4.5 |
| Authority & Brand Signals | 20% | 25/100 | 5.0 |
| Technical Accessibility | 20% | 90/100 | 18.0 |
| **Total** | | | **52.0** |

---

## Findings (tagged by severity)

### AI Crawler Accessibility
- **[low]** `robots.txt` is fully permissive (`User-Agent: * / Allow: /`, sitemap declared) — GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, CCBot, anthropic-ai, cohere-ai are all implicitly allowed (no disallow rules at all); no explicit per-bot block list exists, which is correct/safe but undocumented — no action required, noted as pass.
- **[low]** `<meta name="robots" content="index, follow">` and `googlebot` meta both allow indexing; no `noai`/`noimageai` meta tags block AI use — pass, but also means no opt-out of training crawlers (CCBot/anthropic-ai/cohere-ai) if the business ever wants one — currently defaulting to fully open, which favors AI-search visibility.

### llms.txt Compliance / Quality
- **[low]** `llms.txt` exists at root, is well-formed per the emerging spec (H1 title, blockquote summary, H2-sectioned markdown links with descriptions, "Optional" section) and includes a dedicated "Facts for citation" bullet list — good baseline, above average quality for a small marketing site.
- **[medium]** llms.txt has no `Last-Updated` field and no license/usage terms — RSL 1.0 licensing is absent entirely (no `license.xml`, no RSL `<link>` tag, no licensing block in llms.txt) — AI platforms increasingly check for machine-readable licensing/attribution terms; add one line documenting reuse terms.
- **[medium]** llms.txt facts section is standalone but not mirrored anywhere in the on-page HTML as an equivalent citable block — if a crawler only indexes the HTML (not llms.txt, which is not yet universally consumed by GPTBot/ClaudeBot/PerplexityBot), those same facts aren't available as a discrete extractable passage on the page itself.

### Passage-Level Citability
- **[high]** No passage on the homepage falls in the optimal 134–167 word citable range. All feature/step blurbs are 15–35 words (e.g. "Bookmark home, office, or any important spot. One-tap access — no re-typing needed." = 13 words); the hero paragraph is ~40 words. Content is fragmented across many small marketing cards rather than a few self-contained, extractable answer blocks.
- **[high]** No headings are phrased as questions ("What is Go Qatar?", "How does Zone-Street-Building addressing work?", "Is Go Qatar free?") — all H2/H3s are marketing headlines ("Everything you need to navigate Qatar", "Find any address in 3 simple steps"), which reduces match probability against natural-language AI Overview / ChatGPT / Perplexity queries.
- **[medium]** Statistics that do exist ("50+ zones", "free to download", "2 platforms") are presented as decorative stat-tiles, not as sentences with source attribution — extractable as facts but not as citable prose.

### Canonical "What is Go Qatar / Zone-Street-Building" Explainer
- **[high]** No single canonical explainer paragraph exists anywhere on the site (homepage, contact, privacy, terms) that directly answers "What is Go Qatar" or "What is Zone-Street-Building addressing" in one self-contained 100–170 word block. The concept is scattered across the hero tagline, a 3-step "How It Works" section, and a Business API blurb, each too short and context-dependent to be lifted cleanly by an LLM. This is the single highest-leverage gap for AI-search citability (already tracked in `.seo/TODO.md` as `add-an-faq-with-134-167-word-citable-answers...`, still open).
- **[low]** The llms.txt summary paragraph itself is a decent proxy explainer (~65 words) but is below the optimal length and not accessible to users/crawlers browsing the HTML site directly.

### Brand Mention Signals
- **[high]** No Wikipedia entity found for "Go Qatar" or "Snap Infinity" — no entity-level trust signal for AI knowledge graphs.
- **[high]** No YouTube presence found (strongest correlation signal, ~0.737, with AI citation per GEO research) — no demo videos, no app-walkthrough content indexed anywhere.
- **[medium]** No Reddit presence/discussion found (r/Qatar, r/QatarLiving, etc.) — high-correlation signal currently at zero.
- **[low]** Only owned/aggregator surfaces found live: goqatar.app, Google Play listing, Apple App Store listing, APKPure/AppBrain/chrome-stats mirror listings, and an Instagram account (@goqatar.app) — no independent press, review, or directory coverage (ILoveQatar, Marhaba, Qatar Living, Product Hunt, etc. — already tracked as an open backlink-outreach TODO item).
- **[medium]** Organization JSON-LD `contactPoint.email` is a personal Gmail address (`help.goqatar@gmail.com`) rather than a branded `@goqatar.app` address — weak trust/authority signal in structured data that AI systems parse for entity credibility (already tracked in TODO, still open).
- **[low]** No physical business address / legal entity name in Organization schema or on-page — E-E-A-T gap for local/regional (Qatar) entity verification (already tracked in TODO, still open).

### FAQ Citability for AI Overviews / ChatGPT / Perplexity
- **[high]** No FAQ section and no `FAQPage` JSON-LD anywhere on the site. This is the biggest structural gap for AI Overview "People Also Ask"-style and ChatGPT/Perplexity direct-answer citation, since there is currently no self-contained Q&A content to lift.
- **[medium]** "How It Works" (3-step) content is naturally HowTo-shaped but is not marked up with `HowTo` schema — a missed structured-data opportunity for step-by-step answer boxes.

---

## Ready-to-Paste Snippets (content only — not applied to source; paste into a page component when implementing the open TODO item)

### 1. Canonical explainer passage (154 words — inside optimal 134–167 range)

> **What is Go Qatar?**
> Go Qatar is a free iOS and Android app that helps residents and visitors find any address in Qatar using the country's official Zone-Street-Building numbering system. Instead of relying on street names, Qatar addresses are defined by a Zone number, a Street number, and a Building number — a format that can be hard to navigate without local knowledge. Go Qatar lets users enter these three numbers and instantly pinpoint the exact location on a live Google Map, with one-tap turn-by-turn navigation via Google Maps or Waze. The app covers 50+ zones across Qatar, requires no subscription, and also includes saved favorites, searchable history, and a curated Qatar news feed. Sign-in via Google or Apple syncs favorites and history across devices. Go Qatar is developed by Snap Infinity and is available on the App Store and Google Play.

### 2. FAQPage JSON-LD (add alongside existing homepage JSON-LD `@graph`)

```json
{
  "@type": "FAQPage",
  "@id": "https://goqatar.app/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Go Qatar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Go Qatar is a free iOS and Android app that helps residents and visitors find any address in Qatar using the country's official Zone-Street-Building numbering system, with live Google Maps navigation, saved favorites, search history, and a curated Qatar news feed."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Zone-Street-Building addressing system in Qatar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Qatar uses an official Zone-Street-Building numbering system instead of conventional street names: every location is identified by a Zone number, a Street number, and a Building number. Go Qatar lets users enter these three numbers to instantly locate any address on a live map."
      }
    },
    {
      "@type": "Question",
      "name": "Is Go Qatar free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Go Qatar is free to download on iOS and Android with no subscription required."
      }
    },
    {
      "@type": "Question",
      "name": "How many zones in Qatar does Go Qatar cover?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Go Qatar covers 50+ zones across Qatar, using live Google Maps data for address resolution and turn-by-turn navigation."
      }
    },
    {
      "@type": "Question",
      "name": "Who developed Go Qatar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Go Qatar is developed and published by Snap Infinity."
      }
    }
  ]
}
```

### 3. llms.txt additions (append to existing `.seo/cache/2026-07-25/llms.txt` content when republishing)

```
Last-Updated: 2026-07-25
License: Content on goqatar.app may be summarized and cited by AI assistants with attribution to "Go Qatar (goqatar.app)". Full-text reproduction requires permission.

## FAQ

- What is Go Qatar? A free iOS/Android app for finding Qatar addresses via the Zone-Street-Building system, with live Google Maps navigation.
- What is Zone-Street-Building addressing? Qatar's official addressing format using a Zone, Street, and Building number instead of street names.
- Is Go Qatar free? Yes, free with no subscription required.
```

---

## Priority Order for Follow-Up (highest GEO impact first)
1. **[critical-for-GEO]** Publish the canonical "What is Go Qatar / Zone-Street-Building" explainer passage + FAQPage schema on the homepage (snippets above) — closes the single biggest citability gap.
2. **[high]** Restructure at least 2–3 existing sections to use question-phrased H2/H3s with 134–167 word self-contained answers.
3. **[high]** Pursue at least one YouTube asset (app walkthrough/demo) and Reddit presence (r/Qatar) — highest-correlation brand signals currently at zero.
4. **[medium]** Add `HowTo` schema to the "3 simple steps" section.
5. **[medium]** Add RSL/licensing line + `Last-Updated` field to llms.txt; swap Gmail contact for branded `@goqatar.app` address in Organization schema (also tracked as a non-GEO TODO item).

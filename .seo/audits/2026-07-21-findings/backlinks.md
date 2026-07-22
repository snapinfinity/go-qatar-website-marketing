# Backlink Profile Analysis — goqatar.app

Source: live tool calls run 2026-07-21 (`scripts/backlinks_auth.py`, `scripts/commoncrawl_graph.py` from the claude-seo skill toolkit) + validated via `scripts/validate_backlink_report.py` (status: PASS, 1 info note, 0 errors/warnings).

**Data-source tier: 0 (Basic — Common Crawl + verification crawler only).** No Moz API key, no Bing Webmaster key, no DataForSEO extension configured on this machine. This report cannot and does not fabricate DA/PA, spam scores, anchor text distributions, or referring-domain counts that require those paid/keyed sources.

---

## 1. Credential / Tier Check

```
python3 scripts/backlinks_auth.py --check --json
```

| Source | Available | Notes |
|---|---|---|
| Common Crawl web graph | Yes | Public data, no key needed |
| Verification crawler | Yes | Requires a known-backlinks list as input (none exists for this domain — see §3) |
| Moz Link Explorer API | **No** | No `MOZ_API_KEY` / config entry found |
| Bing Webmaster API | **No** | No `BING_WEBMASTER_API_KEY` / config entry found |
| DataForSEO (extension) | **No** | Not installed |

Result: Tier 0. Per methodology, fewer than 4 of the 7 weighted scoring factors (referring domains, domain quality, anchor text, toxic ratio, link velocity, follow/nofollow, geo relevance) have any data source at this tier — **0 of 7 factors have data** for this domain specifically (see §2). A rigorous numeric Backlink Health Score cannot be computed honestly at this tier for a domain with no confirmed link data.

## 2. Common Crawl Domain-Level Graph

```
python3 scripts/commoncrawl_graph.py goqatar.app --json
```

Result (release `cc-main-2026-jan-feb-mar`, live query, not cached):

```json
{
  "domain": "goqatar.app",
  "in_crawl": false,
  "in_rankings": false,
  "pagerank": null,
  "harmonic_centrality": null,
  "n_hosts": null,
  "top_referring_domains": [],
  "note": "Domain not found in Common Crawl data. It may be too new, too small, or not yet crawled."
}
```

**goqatar.app is not present in the Common Crawl hyperlink graph at all** — not just below the PageRank/harmonic-centrality ranking threshold, but absent from the vertex set entirely. Common Crawl (confidence: 0.50, quarterly refresh) simply has no record of this domain being linked to or crawled.

**Correct interpretation (per validator, not a subjective call):** this does **not** mean "zero backlinks" or "low authority" as a confirmed fact — it means Common Crawl has not indexed/crawled the domain yet. This is consistent with and expected for a domain the brief describes as young/newly launched. It is a data-absence finding, not a negative-authority finding, and is reported as such.

## 3. Backlink Verification Crawler

`scripts/verify_backlinks.py` requires an input list of known/claimed backlink source URLs to check. **No such list exists** — none was provided for this task, and no prior backlink inventory was found anywhere in `.seo/` for this project (checked `.seo/audits/`, `.seo/cache/`). Result: **not available** — nothing to verify. This is not the same as "no backlinks exist"; it means no candidate links have been identified yet to check.

## 4. Moz API (DA/PA, referring domains, anchor text, top pages)

**Not available** — no Moz API key configured (Tier 1 requirement). No DA/PA estimate, spam score, referring-domain count, or anchor-text distribution can be reported. **No numeric DA/PA figure is stated anywhere in this report** — inventing one would violate the no-fabrication requirement for this audit.

## 5. Bing Webmaster (inbound links, competitor gap)

**Not available** — no Bing Webmaster API key configured (Tier 2 requirement).

## 6. DataForSEO (premium, cross-validation)

**Not available** — extension not installed (Tier 3 requirement).

## 7. Anchor Text Distribution

**Not available.** Requires Moz, Bing, or DataForSEO anchor-text endpoints, none of which are configured. No anchor text sample of any size was obtained.

## 8. Toxic / Spammy Link Patterns

**Not available / none detected.** Toxic-link detection in this toolkit relies on Moz Spam Score (Tier 1), DataForSEO (Tier 3), or the verify-crawler flagging suspicious source pages from a known-links list (none exists here — §3). No toxic, spammy, PBN-style, or reciprocal-link patterns were found, but this is an absence of evidence, not evidence of a clean profile — it simply reflects that no link data was available to inspect.

## 9. Backlink Health Score

**INSUFFICIENT DATA — not a numeric score.**

0 of 7 weighted scoring factors (referring domain count, domain quality distribution, anchor text naturalness, toxic link ratio, link velocity, follow/nofollow ratio, geographic relevance) have any confirmed data for goqatar.app at Tier 0. Per methodology, producing a numeric 0–100 score here would be misleading (validator flags scores computed on <4/7 populated factors as an error). This was confirmed by running `validate_backlink_report.py` against the collected data (status: PASS, with an explicit info-level reminder not to interpret CC absence as "low authority").

For audit-orchestration purposes only, a directional placeholder is provided in the accompanying summary reply — it reflects "no confirmed backlink profile could be established for a young domain," not a measured penalty for toxic links, spam, or bad practice.

## 10. Link-Building Opportunities (Qatar-focused, realistic)

These are recommendations based on the app's category (local address/navigation utility, Qatar-specific) and the SERP landscape already observed in this audit cycle (see `sxo.md`, which found ILoveQatar.net and Qatar Trendz ranking with related "Zone/Street/Building" explainer content). None of these are confirmed existing links — they are outreach targets, not verified backlinks.

1. **Qatar expat/lifestyle content sites (e.g., ILoveQatar.net, Marhaba Qatar, Qatar Living community/blog section).** These sites already publish "how Qatar addresses work" explainer content and rank for the exact queries goqatar.app targets (confirmed in this audit's SXO analysis). A pitch to be featured as "the app that makes Zone/Street/Building lookup easy" is a natural content fit and a realistic, low-friction outreach target for a resource/tool mention link.

2. **Qatar tech ecosystem and startup directories (e.g., Qatar Science & Technology Park (QSTP) portfolio/news pages, Qatar Development Bank / Qatar Business Incubation Center listings, local startup directories/press like The Peninsula Qatar business/tech section, Gulf-Times tech coverage).** If Snap Infinity (the publisher) has any incubator, accelerator, or local business-registration affiliation, a portfolio-page listing is a credible, easily obtainable authoritative .qa link and also supports local trust signals flagged as missing in the SXO/content findings.

3. **App discovery and review platforms (e.g., AlternativeTo, Product Hunt launch, AppAdvice/similar app-directory listings, plus GCC-focused tech blogs covering new local apps).** These are standard, achievable link sources for a newly launched consumer app and typically require only a submission/launch post rather than a relationship-based pitch — a good near-term, low-cost first step while longer-term relationship-based outreach (item 1) develops.

Not recommended as a priority: generic global directory submissions or paid link packages — for a geo-specific niche app, topical Qatar relevance (items 1–2 above) will do more for both link quality and referral traffic than volume-based generic directories.

## Limitations

- Only Tier 0 sources were available on this machine; no Moz, Bing, or DataForSEO data could be collected. Set `MOZ_API_KEY` / `BING_WEBMASTER_API_KEY` (free tiers exist for both) to unlock DA/PA, spam score, and anchor-text analysis on the next audit cycle.
- No known/claimed backlink list existed to run through the verification crawler; if any existing backlinks are known (e.g., from outreach already done, an App Store page, press mentions), supply them as a JSON list to `verify_backlinks.py` for a real verification pass.
- Common Crawl's absence of this domain reflects crawl-recency/coverage, not a confirmed "zero backlinks" state — it should be re-checked against a future CC release once the domain has had more time to be discovered and crawled.
- Link-building suggestions in §10 are outreach targets derived from category/SERP fit, not confirmed relationships or guaranteed placements.

## Cross-Skill Recommendations

- For crawlability/technical factors that affect whether Common Crawl and other crawlers can discover and index goqatar.app at all, see `/seo technical` findings already in this audit (`technical.md`).
- For E-E-A-T / trust-signal gaps (named testimonials, credentials, press mentions) that both improve conversion and make the site more "linkable," see `/seo content` (`content.md`) and the SXO Authority dimension in `sxo.md`.
- Do not duplicate seo-content's E-E-A-T analysis or seo-technical's crawlability analysis here — both are covered in their respective findings files for this audit.

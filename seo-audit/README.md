# SEO Audit Script — Go Qatar

Run a full code SEO audit and fix session.

```bash
bash seo-audit/seo_audit.sh
```

---

## What It Does

| Step | Task | Status |
|------|------|--------|
| 1 | Ask to start — never runs automatically | ✅ Done |
| 2 | On return visit — ask Continue / Restart / New / Reset | ✅ Done |
| 3 | Continue — find last pending step, ask to resume from there | ✅ Done |
| 4 | Restart — clear all `[x]` marks, reset progress to 0, stay on same issues | ✅ Done |
| 5 | Reset all — delete all data, restart script from zero | ✅ Done |
| 6 | Install `claude-seo` plugin (auto, first run only) | ✅ Done |
| 7 | Create `audit/<timestamp>/` and `fix/<timestamp>/` folders | ✅ Done |
| 8 | Run code SEO audit — 5 categories only | ✅ Done |
| 9 | Save `audit/<timestamp>/raw.md` — full audit output | ✅ Done |
| 10 | Build `audit/<timestamp>/report.md` — score + tables + full content | ✅ Done |
| 11 | Build `fix/<timestamp>/fixes.md` — numbered checklist per issue | ✅ Done |
| 12 | Print summary: health score + issue counts | ✅ Done |
| 13 | Fix all at once — Claude solves everything, marks all `[x]` | ✅ Done |
| 14 | Fix one by one — confirm per issue, marks `[x]` as each is solved | ✅ Done |
| 15 | Auto-update overall status to `✅ All Solved` when last issue is done | ✅ Done |
| 16 | Compare health score across audit runs | ⏳ Pending |
| 17 | Weekly auto-run / cron mode | 🔲 Not started |
| 18 | Slack or email notification after each run | 🔲 Not started |

---

## Startup Flow

**First run (no data):**
```
No previous runs found
Start SEO audit now? [y/N]:
```

**Return visit (previous data exists):**
```
Previous run found
Date     : 2026-06-29_13-00-00
Progress : 3 / 8 fixed
Status   : ⏳ Pending

[C]  Continue  — pick up from where you left off
[R]  Restart   — clear all [x] marks, fix same issues again from scratch
[N]  New audit — run a fresh SEO audit
[X]  Reset all — delete all data and start from zero
```

**Continue asks:**
```
Current step : FIX-004 — Add canonical tags to inner pages
Progress     : 3 / 8 fixed

Start from here? [y/N]:
```

---

## Output Folder Structure

```
seo_work/
├── audit/
│   ├── 2026-06-29_13-00-00/
│   │   ├── raw.md       ← full Claude audit output
│   │   └── report.md   ← overview score + category table + full content
│   └── 2026-06-30_09-15-00/
│       ├── raw.md
│       └── report.md
└── fix/
    ├── 2026-06-29_13-00-00/
    │   └── fixes.md    ← numbered checklist, updates as issues are solved
    └── 2026-06-30_09-15-00/
        └── fixes.md
```

---

## fixes.md Format

```markdown
# Fix Tracker — Go Qatar

**Status:** ⏳ Pending
**Progress:** 0 / 8 fixed

## 🔴 Critical
- [ ] `FIX-001` Missing sitemap.xml
- [ ] `FIX-002` No JSON-LD schema

## 🟠 High
- [ ] `FIX-003` Duplicate title tags on inner pages
- [x] `FIX-004` Missing canonical tags   ← marked solved after fix

## Recommendations (Manual / External)
- Submit sitemap to Google Search Console
- Build backlinks through outreach
```

When all issues are solved:

```
**Status:** ✅ All Solved
**Progress:** 8 / 8 fixed
```

---

## Fix Modes

| Choice | What happens |
|--------|-------------|
| `A` — Fix all | Claude fixes everything at once, marks all `[x]` |
| `I` — Fix one by one | Confirm per issue, marks `[x]` as each is solved |
| `N` — Skip | Audit saved, fix manually anytime |

---

## What Gets Audited

**Code Fixable — Claude edits these directly**
- Technical SEO (robots.txt, sitemap, canonical, redirects, indexability)
- Performance (Core Web Vitals, images, JS, CSS, lazy loading)
- On-Page SEO (titles, meta descriptions, OG tags, headings, alt text)
- Structured Data (Schema.org, FAQ, Breadcrumb, Organization)
- Mobile & Accessibility (viewport, tap targets)

**Recommendations only — never fixed automatically**
- Backlinks / domain authority
- Keyword rankings / search volume
- Competitor analysis
- Google Business Profile / local citations
- Reviews, analytics, organic traffic

---

## Requirements

| Requirement | Notes |
|-------------|-------|
| `claude` CLI | Must be on PATH |
| Python 3.10+ | Homebrew `python@3.11` auto-used if system Python is older |
| Git | Used to clone `claude-seo` on first run |
| Internet | Required during audit (WebFetch/WebSearch) |

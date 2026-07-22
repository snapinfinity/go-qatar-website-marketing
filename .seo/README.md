# SEO Tracker — go-qatar-website-marketing

This folder tracks SEO work for this project. Managed by `seo-tracker` CLI.

## Files

| File | Purpose |
|---|---|
| `TODO.md` | Primary checklist. AI/user works from top to bottom. |
| `DONE.md` | Chronological log of completed items. |
| `UI-CHANGES.md` | Queue of UI-visible changes awaiting manual review. |
| `STATE.md` | Auto-generated summary. |
| `audits/` | Full audit reports, one per audit run. |

## Common commands

```bash
seo-tracker status          # show summary
seo-tracker next            # show next TODO to work on
seo-tracker list            # list all TODOs
seo-tracker done <id>       # mark a TODO complete
seo-tracker audit           # run new audit + generate follow-up TODOs
seo-tracker add-todo "..."  # add ad-hoc todo
seo-tracker reset           # archive + start fresh
```

Full command reference: `seo-tracker help`

## For AI sessions

When starting a Claude session in this project:
1. Read `STATE.md` for the current summary
2. Read `TODO.md` to see the checklist
3. Work on the next unchecked item where prerequisites are met
4. Mark done via `seo-tracker done <id>`

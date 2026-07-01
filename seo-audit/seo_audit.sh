#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
#  Go Qatar — SEO Audit Script
#  Run: bash seo-audit/seo_audit.sh
# ─────────────────────────────────────────────────────────────
set -euo pipefail

# ── Config ────────────────────────────────────────────────────
SITE_URL="https://goqatar.app"
SEO_REPO="https://github.com/AgriciDaniel/claude-seo.git"
SEO_SKILL_DIR="$HOME/.claude/skills/seo"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
SEO_WORK_DIR="$PROJECT_DIR/seo_work"
TIMESTAMP="$(date +%Y-%m-%d_%H-%M-%S)"
DATE_READABLE="$(date '+%A %d %B %Y, %H:%M')"

AUDIT_DIR="$SEO_WORK_DIR/audit/$TIMESTAMP"
FIX_DIR="$SEO_WORK_DIR/fix/$TIMESTAMP"
RAW_FILE="$AUDIT_DIR/raw.md"
REPORT_FILE="$AUDIT_DIR/report.md"
FIXES_FILE="$FIX_DIR/fixes.md"

# Runtime flags
SKIP_AUDIT=false
HEALTH="N/A"
TOTAL=0
C_COUNT=0; H_COUNT=0; M_COUNT=0; L_COUNT=0

# ── Colours ───────────────────────────────────────────────────
GOLD='\033[0;33m'; BOLD='\033[1m'; GREEN='\033[0;32m'
YELLOW='\033[1;33m'; BLUE='\033[0;34m'; RED='\033[0;31m'
DIM='\033[2m'; NC='\033[0m'

bar()  { echo -e "${GOLD}${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"; }
step() { echo -e "\n${BLUE}${BOLD}[$1]${NC} $2"; }
ok()   { echo -e "     ${GREEN}✓${NC}  $1"; }
warn() { echo -e "     ${YELLOW}⚠${NC}  $1"; }
err()  { echo -e "     ${RED}✗${NC}  $1"; }
info() { echo -e "     ${DIM}$1${NC}"; }

# ── Header ────────────────────────────────────────────────────
echo ""
bar
echo -e "  ${GOLD}${BOLD}Go Qatar — SEO Audit Script${NC}"
echo -e "  ${DIM}Site: $SITE_URL${NC}"
echo -e "  ${DIM}Date: $DATE_READABLE${NC}"
bar

# ── Startup: check for previous run ──────────────────────────
LAST_AUDIT_STAMP=$(ls -t "$SEO_WORK_DIR/audit/" 2>/dev/null | head -1 || true)
LAST_FIX_STAMP=$(ls -t "$SEO_WORK_DIR/fix/" 2>/dev/null | head -1 || true)

PREV_FIXES=""
if [ -n "$LAST_FIX_STAMP" ] && [ -f "$SEO_WORK_DIR/fix/$LAST_FIX_STAMP/fixes.md" ]; then
  PREV_FIXES="$SEO_WORK_DIR/fix/$LAST_FIX_STAMP/fixes.md"
fi

# Show prompt if ANY previous audit or fix run exists
if [ -n "$LAST_AUDIT_STAMP" ] || [ -n "$PREV_FIXES" ]; then
  echo ""
  bar
  echo -e "  ${BOLD}Previous run found${NC}"
  echo -e "  ${DIM}Date : ${LAST_AUDIT_STAMP:-$LAST_FIX_STAMP}${NC}"

  if [ -n "$PREV_FIXES" ]; then
    PREV_SOLVED=$(grep -c "^\- \[x\]" "$PREV_FIXES" 2>/dev/null || echo 0)
    PREV_TOTAL=$(grep -cE "^\- \[(x| )\]" "$PREV_FIXES" 2>/dev/null || echo 0)
    PREV_STATUS=$(grep "^\*\*Status:\*\*" "$PREV_FIXES" 2>/dev/null | head -1 | sed 's/\*\*Status:\*\* //' || echo "Unknown")
    echo -e "  ${DIM}Progress : $PREV_SOLVED / $PREV_TOTAL fixed${NC}"
    echo -e "  ${DIM}Status   : $PREV_STATUS${NC}"
  else
    echo -e "  ${DIM}Previous audit ran but fix tracker was not built${NC}"
    PREV_SOLVED=0; PREV_TOTAL=0
  fi

  bar
  echo ""

  if [ -n "$PREV_FIXES" ]; then
    echo -e "  ${BOLD}[C]${NC}  Continue  — pick up from where you left off"
    echo -e "  ${BOLD}[R]${NC}  Restart   — clear all progress, fix same issues again"
    echo -e "  ${BOLD}[N]${NC}  New audit — run a fresh SEO audit"
    echo -e "  ${BOLD}[X]${NC}  Reset all — delete all data and start from zero"
  else
    echo -e "  ${BOLD}[N]${NC}  New audit — run a fresh SEO audit"
    echo -e "  ${BOLD}[X]${NC}  Reset all — delete all data and start from zero"
    echo -e "  ${BOLD}[S]${NC}  Skip      — exit"
  fi

  echo ""
  read -rp "$(echo -e "${BOLD}Choice: ${NC}")" START_CHOICE
  echo ""

  case "${START_CHOICE:-n}" in

    # ── Continue ───────────────────────────────────────────────
    [Cc])
      NEXT_LINE=$(grep "^\- \[ \]" "$PREV_FIXES" | head -1 || true)

      if [ -z "$NEXT_LINE" ]; then
        bar
        echo -e "  ${GREEN}${BOLD}✅ All issues from the last run are already solved!${NC}"
        echo -e "  ${DIM}Run [N] for a new audit.${NC}"
        bar
        echo ""
        exit 0
      fi

      NEXT_ID=$(echo "$NEXT_LINE" | grep -oE 'FIX-[0-9][0-9][0-9]' || true)
      NEXT_TEXT=$(echo "$NEXT_LINE" | sed 's/^\- \[ \] `FIX-[0-9][0-9][0-9]` //' | tr -d '\r')

      echo -e "  ${BOLD}Current step  :${NC} $NEXT_ID — $NEXT_TEXT"
      echo -e "  ${DIM}Progress      : $PREV_SOLVED / $PREV_TOTAL fixed${NC}"
      echo ""
      read -rp "$(echo -e "${BOLD}Start from here? [y/N]: ${NC}")" START_HERE
      echo ""

      if [[ "${START_HERE:-n}" =~ ^[Yy]$ ]]; then
        FIXES_FILE="$PREV_FIXES"
        REPORT_FILE="$SEO_WORK_DIR/audit/$LAST_AUDIT_STAMP/report.md"
        HEALTH=$(grep "| Health Score |" "$REPORT_FILE" 2>/dev/null \
          | awk -F'|' '{print $3}' | tr -d ' ' || echo "N/A")
        TOTAL=$PREV_TOTAL
        SKIP_AUDIT=true
        ok "Continuing from $NEXT_ID"
      else
        info "Running a new audit instead..."
        SKIP_AUDIT=false
      fi
      ;;

    # ── Restart ────────────────────────────────────────────────
    [Rr])
      python3 - "$PREV_FIXES" << 'PYEOF'
import sys, re
path = sys.argv[1]
with open(path, 'r') as f:
    content = f.read()
content = content.replace('- [x]', '- [ ]')
content = re.sub(r'\*\*Status:\*\*.*', '**Status:** ⏳ Pending', content)
content = re.sub(r'\*\*Progress:\*\* \d+ / (\d+) fixed', r'**Progress:** 0 / \1 fixed', content)
with open(path, 'w') as f:
    f.write(content)
PYEOF

      FIXES_FILE="$PREV_FIXES"
      REPORT_FILE="$SEO_WORK_DIR/audit/$LAST_AUDIT_STAMP/report.md"
      HEALTH=$(grep "| Health Score |" "$REPORT_FILE" 2>/dev/null \
        | awk -F'|' '{print $3}' | tr -d ' ' || echo "N/A")
      TOTAL=$PREV_TOTAL
      SKIP_AUDIT=true

      ok "All done symbols cleared — $TOTAL issues reset to pending"
      ;;

    # ── Reset all ──────────────────────────────────────────────
    [Xx])
      echo -e "  ${RED}This will delete all audit and fix data in seo_work/.${NC}"
      read -rp "$(echo -e "${BOLD}Are you sure? [y/N]: ${NC}")" CONFIRM_RESET
      echo ""
      if [[ "${CONFIRM_RESET:-n}" =~ ^[Yy]$ ]]; then
        rm -rf "$SEO_WORK_DIR/audit" "$SEO_WORK_DIR/fix"
        ok "All data cleared"
        echo ""
        info "Restarting script from the beginning..."
        echo ""
        exec "$0"
      else
        info "Reset cancelled. Running new audit instead..."
        SKIP_AUDIT=false
      fi
      ;;

    # ── Skip / exit ────────────────────────────────────────────
    [Ss])
      echo -e "  ${DIM}Exiting.${NC}"
      exit 0
      ;;

    # ── New audit (default) ────────────────────────────────────
    *)
      info "Starting fresh audit..."
      SKIP_AUDIT=false
      ;;
  esac
fi

# ── Ask before starting audit (when no previous prompt was shown) ─
if [ "$SKIP_AUDIT" = false ] && [ -z "$LAST_AUDIT_STAMP" ]; then
  echo ""
  bar
  echo -e "  ${BOLD}No previous runs found${NC}"
  bar
  echo ""
  read -rp "$(echo -e "${BOLD}Start SEO audit now? [y/N]: ${NC}")" START_NOW
  echo ""
  if [[ ! "${START_NOW:-n}" =~ ^[Yy]$ ]]; then
    echo -e "  ${DIM}Exiting. Run the script again when ready.${NC}"
    echo ""
    exit 0
  fi
fi

# ═════════════════════════════════════════════════════════════
#  AUDIT STEPS — only run when not continuing/restarting
# ═════════════════════════════════════════════════════════════

if [ "$SKIP_AUDIT" = false ]; then

  # ── Step 1: Check / install claude-seo ─────────────────────
  step "1/5" "Checking claude-seo plugin..."

  if [ -d "$SEO_SKILL_DIR" ]; then
    ok "claude-seo already installed"
    info "Location: $SEO_SKILL_DIR"
  else
    warn "claude-seo not found — installing now"

    BREW_PY="/opt/homebrew/bin/python3.11"
    PY_SHIM=""
    CURRENT_PY_VER=$(python3 -c 'import sys; print(sys.version_info.minor)' 2>/dev/null || echo "0")

    if [ "$CURRENT_PY_VER" -lt 10 ] && [ -x "$BREW_PY" ]; then
      PY_SHIM=$(mktemp -d)
      ln -sf "$BREW_PY" "$PY_SHIM/python3"
      export PATH="$PY_SHIM:$PATH"
      info "Shimmed to $($BREW_PY --version)"
    elif [ "$CURRENT_PY_VER" -lt 10 ]; then
      err "Python 3.10+ required. Run: brew install python@3.11"
      exit 1
    fi

    TMP_DIR=$(mktemp -d)
    trap 'rm -rf "$TMP_DIR" "${PY_SHIM:-}"' EXIT

    git clone --depth 1 "$SEO_REPO" "$TMP_DIR/claude-seo" --quiet 2>&1 \
      || { err "Clone failed. Check internet connection."; exit 1; }
    bash "$TMP_DIR/claude-seo/install.sh" 2>&1 \
      || { err "Install failed."; exit 1; }
    ok "claude-seo installed"
  fi

  # ── Step 2: Create folder structure ────────────────────────
  step "2/5" "Creating output folders..."

  mkdir -p "$AUDIT_DIR" "$FIX_DIR"
  ok "seo_work/audit/$TIMESTAMP/"
  ok "seo_work/fix/$TIMESTAMP/"

  PREV=$(ls "$SEO_WORK_DIR/audit/" 2>/dev/null | wc -l | tr -d ' ')
  info "Total audit runs so far: $PREV"

  # ── Step 3: Run code SEO audit ─────────────────────────────
  step "3/5" "Running code SEO audit on $SITE_URL..."
  info "Auditing only issues fixable in the Next.js codebase."
  echo ""

  AUDIT_PROMPT="Perform a comprehensive CODE SEO audit of $SITE_URL.

Only report issues that can be fixed in the website codebase.

Audit these 5 categories:

1. Technical SEO — robots.txt, sitemap.xml, crawlability, indexability, redirects, canonical tags, status codes
2. Performance — Core Web Vitals (LCP, CLS, INP), page speed, image optimisation, JS/CSS optimisation, lazy loading, compression
3. On-Page SEO — title tags, meta descriptions, Open Graph, Twitter cards, heading structure, URL structure, internal linking, image alt text, duplicate metadata, content quality
4. Structured Data — Schema.org, FAQ schema, Breadcrumb schema, Organisation schema, validation errors
5. Mobile & Accessibility — viewport tag, mobile friendliness, tap targets, accessibility issues

Start your response with this exact line (replace XX with the score):
HEALTH_SCORE: XX/100

Then use these exact section headers:
## [CRITICAL] Issues
## [HIGH] Issues
## [MEDIUM] Issues
## [LOW] Issues
## Recommendations (Manual / External)

For every code issue:
- State the severity label [CRITICAL] / [HIGH] / [MEDIUM] / [LOW]
- Why it matters (1 sentence)
- Exact fix with code snippet
- File(s) affected (e.g. src/app/layout.tsx)

Under Recommendations, list off-page items only (backlinks, rankings, GBP, analytics, reviews) — no severity labels, informational only."

  if ! claude -p "/seo audit $SITE_URL" \
       --allowedTools "Bash,Read,Write,WebFetch,WebSearch" \
       --output-format text \
       2>&1 | tee "$RAW_FILE"; then
    warn "Primary audit failed — using fallback prompt"
    claude -p "$AUDIT_PROMPT" \
       --allowedTools "WebFetch,WebSearch,Bash" \
       --output-format text \
       2>&1 | tee "$RAW_FILE"
  fi

  RAW_LINES=$(wc -l < "$RAW_FILE" | tr -d ' ')

  if [ "$RAW_LINES" -eq 0 ]; then
    err "Audit produced no output — both primary and fallback commands failed."
    err "Check that 'claude' is on your PATH and you have internet access."
    err "Raw file: $RAW_FILE"
    exit 1
  fi

  ok "Raw audit saved — $RAW_LINES lines"

  # ── Step 4: Build report.md + fixes.md ─────────────────────
  step "4/5" "Building audit report and fix tracker..."

  HEALTH=$(grep "^HEALTH_SCORE:" "$RAW_FILE" 2>/dev/null | head -1 | awk -F': ' '{print $2}' || true)
  [ -z "$HEALTH" ] && HEALTH="N/A"

  TMP_C="$AUDIT_DIR/.tmp_c"
  TMP_H="$AUDIT_DIR/.tmp_h"
  TMP_M="$AUDIT_DIR/.tmp_m"
  TMP_L="$AUDIT_DIR/.tmp_l"

  grep -iE "\[CRITICAL\]" "$RAW_FILE" 2>/dev/null \
    | grep -v "^#\|^---\|^HEALTH" \
    | sed 's/.*\[CRITICAL\][: ]*//' | sed 's/^\*\*//; s/\*\*$//' \
    | grep -v "^$" | head -15 > "$TMP_C" 2>/dev/null || touch "$TMP_C"

  grep -iE "\[HIGH\]" "$RAW_FILE" 2>/dev/null \
    | grep -v "^#\|^---\|^HEALTH" \
    | sed 's/.*\[HIGH\][: ]*//' | sed 's/^\*\*//; s/\*\*$//' \
    | grep -v "^$" | head -15 > "$TMP_H" 2>/dev/null || touch "$TMP_H"

  grep -iE "\[MEDIUM\]" "$RAW_FILE" 2>/dev/null \
    | grep -v "^#\|^---\|^HEALTH" \
    | sed 's/.*\[MEDIUM\][: ]*//' | sed 's/^\*\*//; s/\*\*$//' \
    | grep -v "^$" | head -20 > "$TMP_M" 2>/dev/null || touch "$TMP_M"

  grep -iE "\[LOW\]" "$RAW_FILE" 2>/dev/null \
    | grep -v "^#\|^---\|^HEALTH" \
    | sed 's/.*\[LOW\][: ]*//' | sed 's/^\*\*//; s/\*\*$//' \
    | grep -v "^$" | head -20 > "$TMP_L" 2>/dev/null || touch "$TMP_L"

  C_COUNT=$(grep -c "." "$TMP_C" 2>/dev/null || echo 0)
  H_COUNT=$(grep -c "." "$TMP_H" 2>/dev/null || echo 0)
  M_COUNT=$(grep -c "." "$TMP_M" 2>/dev/null || echo 0)
  L_COUNT=$(grep -c "." "$TMP_L" 2>/dev/null || echo 0)
  TOTAL=$((C_COUNT + H_COUNT + M_COUNT + L_COUNT))

  # Write report.md
  {
  echo "# SEO Audit Report — Go Qatar"
  echo ""
  echo "**Site:** $SITE_URL"
  echo "**Date:** $DATE_READABLE"
  echo ""
  echo "---"
  echo ""
  echo "## Overview"
  echo ""
  echo "| Metric | Value |"
  echo "|--------|-------|"
  echo "| Health Score | $HEALTH |"
  echo "| 🔴 Critical | $C_COUNT |"
  echo "| 🟠 High | $H_COUNT |"
  echo "| 🟡 Medium | $M_COUNT |"
  echo "| 🟢 Low | $L_COUNT |"
  echo "| **Total to fix** | **$TOTAL** |"
  echo ""
  echo "---"
  echo ""
  echo "## Issues by Category"
  echo ""
  echo "| Category | Signals Found |"
  echo "|----------|--------------|"

  TECH_C=$(grep -ciE "robots|sitemap|canonical|redirect|crawl|indexab|https|status.?code" "$RAW_FILE" 2>/dev/null || echo 0)
  PERF_C=$(grep -ciE "lcp|cls|inp|performance|page.?speed|lazy|compress|javascript|css" "$RAW_FILE" 2>/dev/null || echo 0)
  ONPG_C=$(grep -ciE "title.?tag|meta.?desc|heading|alt.?text|open.?graph|twitter.?card|url.?struct|internal.?link|duplicate" "$RAW_FILE" 2>/dev/null || echo 0)
  SCHM_C=$(grep -ciE "schema|json-ld|structured.?data|faq.?schema|breadcrumb" "$RAW_FILE" 2>/dev/null || echo 0)
  MOBL_C=$(grep -ciE "viewport|mobile|tap.?target|accessibility" "$RAW_FILE" 2>/dev/null || echo 0)

  echo "| Technical SEO | $TECH_C |"
  echo "| Performance | $PERF_C |"
  echo "| On-Page SEO | $ONPG_C |"
  echo "| Structured Data | $SCHM_C |"
  echo "| Mobile & Accessibility | $MOBL_C |"
  echo ""
  echo "---"
  echo ""
  echo "## Full Audit"
  echo ""
  cat "$RAW_FILE"
  } > "$REPORT_FILE"

  ok "Audit report  → seo_work/audit/$TIMESTAMP/report.md"

  # Write fixes.md
  FIX_NUM=0
  {
  echo "# Fix Tracker — Go Qatar"
  echo ""
  echo "**Site:** $SITE_URL"
  echo "**Date:** $DATE_READABLE"
  echo "**Status:** ⏳ Pending"
  echo "**Progress:** 0 / $TOTAL fixed"
  echo ""
  echo "> All issues below can be fixed directly in the Next.js codebase."
  echo "> Re-run this script after fixes to re-audit and update scores."
  echo ""
  echo "---"
  echo ""

  write_section() {
    local label="$1" tmpfile="$2" count
    count=$(grep -c "." "$tmpfile" 2>/dev/null || echo 0)
    [ "$count" -eq 0 ] && return
    echo "## $label"
    echo ""
    while IFS= read -r issue; do
      [ -z "$(echo "$issue" | tr -d '[:space:]')" ] && continue
      FIX_NUM=$((FIX_NUM + 1))
      ID=$(printf "FIX-%03d" $FIX_NUM)
      CLEAN=$(echo "$issue" | cut -c1-150 | tr -d '\r')
      echo "- [ ] \`$ID\` $CLEAN"
    done < "$tmpfile"
    echo ""
  }

  write_section "🔴 Critical" "$TMP_C"
  write_section "🟠 High"     "$TMP_H"
  write_section "🟡 Medium"   "$TMP_M"
  write_section "🟢 Low"      "$TMP_L"

  if [ "$TOTAL" -eq 0 ]; then
    echo "_No code-fixable issues detected. See the full report for details._"
    echo ""
  fi

  RECS=$(awk '/^## Recommendations \(Manual \/ External\)/,0' "$RAW_FILE" 2>/dev/null | tail -n +2 || true)
  if [ -n "$RECS" ]; then
    echo "---"
    echo ""
    echo "## Recommendations (Manual / External)"
    echo ""
    echo "> These cannot be fixed in code. Handle them separately."
    echo ""
    echo "$RECS"
  fi
  } > "$FIXES_FILE"

  rm -f "$TMP_C" "$TMP_H" "$TMP_M" "$TMP_L"
  ok "Fix tracker   → seo_work/fix/$TIMESTAMP/fixes.md"

fi  # end SKIP_AUDIT=false block

# ── Helper: refresh progress + check all solved ───────────────
refresh_progress() {
  local solved total
  solved=$(grep -c "^\- \[x\]" "$FIXES_FILE" 2>/dev/null || echo 0)
  total=$(grep -cE "^\- \[(x| )\]" "$FIXES_FILE" 2>/dev/null || echo 0)
  sed -i '' "s/\*\*Progress:\*\* [0-9]* \/ [0-9]* fixed/**Progress:** $solved \/ $total fixed/" "$FIXES_FILE"
  if [ "$total" -gt 0 ] && [ "$solved" -eq "$total" ]; then
    sed -i '' "s/^\*\*Status:\*\* .*$/**Status:** ✅ All Solved/" "$FIXES_FILE"
    return 0
  fi
  return 1
}

# ── Step 5: Summary + fix prompt ─────────────────────────────
step "5/5" "Done"

# In continue/restart mode, reload counts from the active fixes.md
if [ "$SKIP_AUDIT" = true ]; then
  TOTAL=$(grep -cE "^\- \[(x| )\]" "$FIXES_FILE" 2>/dev/null || echo 0)
  SOLVED=$(grep -c "^\- \[x\]" "$FIXES_FILE" 2>/dev/null || echo 0)
  REMAINING=$((TOTAL - SOLVED))
fi

echo ""
bar
echo -e "  ${BOLD}SUMMARY${NC}"
bar
echo ""
echo -e "  Site         : $SITE_URL"
echo -e "  Health Score : ${BOLD}$HEALTH${NC}"
echo ""

if [ "$SKIP_AUDIT" = true ]; then
  SOLVED=$(grep -c "^\- \[x\]" "$FIXES_FILE" 2>/dev/null || echo 0)
  echo -e "  Progress     : ${BOLD}$SOLVED / $TOTAL fixed${NC}"
else
  echo -e "  ${RED}$C_COUNT Critical${NC}   ${YELLOW}$H_COUNT High${NC}   $M_COUNT Medium   $L_COUNT Low"
  echo -e "  ${BOLD}$TOTAL total code issues${NC}"
fi

echo ""
echo -e "  ${DIM}Fix tracker  : $FIXES_FILE${NC}"
echo -e "  ${DIM}Audit report : $REPORT_FILE${NC}"
bar
echo ""

if [ "$TOTAL" -eq 0 ]; then
  echo -e "${GREEN}${BOLD}No code issues found. Nothing to fix.${NC}"
  echo ""
  exit 0
fi

# Check if everything already solved
PENDING=$(grep -c "^\- \[ \]" "$FIXES_FILE" 2>/dev/null || echo 0)
if [ "$PENDING" -eq 0 ]; then
  bar
  echo -e "  ${GREEN}${BOLD}✅ All issues are already solved!${NC}"
  bar
  echo ""
  exit 0
fi

echo -e "${YELLOW}${BOLD}How do you want to fix these issues?${NC}"
echo ""
echo -e "  ${BOLD}[A]${NC}  Fix all at once"
echo -e "  ${BOLD}[I]${NC}  Fix one by one"
echo -e "  ${BOLD}[N]${NC}  Skip — I'll fix manually"
echo ""
read -rp "$(echo -e "${BOLD}Choice [A/I/N]: ${NC}")" CHOICE
echo ""

case "${CHOICE:-n}" in

  # ── Fix all ─────────────────────────────────────────────────
  [Aa])
    bar
    echo -e "  ${GOLD}${BOLD}Fixing all $PENDING issues...${NC}"
    bar
    echo ""

    ALL_ISSUES=$(grep "^\- \[ \]" "$FIXES_FILE" | sed 's/^\- \[ \] //' || true)

    claude --system-prompt "You are a senior SEO engineer and Next.js developer.

Fix code SEO issues for: $SITE_URL
Project location: $PROJECT_DIR
Full audit report: $REPORT_FILE

Fix ONLY code issues. Do not attempt backlinks, rankings, Google Search Console, analytics, or Google Business Profile.
After all fixes run: cd $PROJECT_DIR && npm run build" \
      "Fix all these SEO issues in order of severity — CRITICAL first, then HIGH, MEDIUM, LOW.
Show each fix clearly as you apply it.

Issues to fix:
$ALL_ISSUES"

    # Mark every pending item as solved
    grep "^\- \[ \]" "$FIXES_FILE" \
      | grep -oE 'FIX-[0-9][0-9][0-9]' \
      > "$FIX_DIR/.solved.tmp" 2>/dev/null || true

    while IFS= read -r fid; do
      [ -z "$fid" ] && continue
      sed -i '' "s/- \[ \] \`$fid\`/- [x] \`$fid\`/" "$FIXES_FILE"
    done < "$FIX_DIR/.solved.tmp"
    rm -f "$FIX_DIR/.solved.tmp"

    refresh_progress || true

    echo ""
    bar
    echo -e "  ${GREEN}${BOLD}✅ All $PENDING issues fixed and marked solved.${NC}"
    echo -e "  ${DIM}Fix tracker updated: $FIXES_FILE${NC}"
    bar
    ;;

  # ── Fix one by one ──────────────────────────────────────────
  [Ii])
    bar
    echo -e "  ${GOLD}${BOLD}Individual fix mode${NC}"
    bar
    echo ""

    grep "^\- \[ \]" "$FIXES_FILE" > "$FIX_DIR/.pending.tmp" 2>/dev/null || true

    while IFS= read -r line; do
      [ -z "$(echo "$line" | tr -d '[:space:]')" ] && continue

      FIX_ID=$(echo "$line" | grep -oE 'FIX-[0-9][0-9][0-9]' || true)
      ISSUE_TEXT=$(echo "$line" | sed 's/^\- \[ \] `FIX-[0-9][0-9][0-9]` //' | tr -d '\r')
      [ -z "$FIX_ID" ] && continue

      echo -e "  ${BOLD}$FIX_ID${NC} — $ISSUE_TEXT"
      read -rp "  Fix this? [y/N]: " FIX_THIS
      echo ""

      if [[ "${FIX_THIS:-n}" =~ ^[Yy]$ ]]; then
        claude -p "Fix this specific SEO issue in the Next.js project at $PROJECT_DIR.

ID: $FIX_ID
Issue: $ISSUE_TEXT

Full audit report for context: $REPORT_FILE

Apply the fix, show what you changed, and confirm it is complete." \
          --allowedTools "Bash,Read,Write,Edit" \
          --output-format text

        sed -i '' "s/- \[ \] \`$FIX_ID\`/- [x] \`$FIX_ID\`/" "$FIXES_FILE"
        echo -e "     ${GREEN}✓${NC}  $FIX_ID marked as solved"
        echo ""

        if ! grep -q "^\- \[ \]" "$FIXES_FILE" 2>/dev/null; then
          refresh_progress || true
          bar
          echo -e "  ${GREEN}${BOLD}✅ All issues solved!${NC}"
          echo -e "  ${DIM}Fix tracker: $FIXES_FILE${NC}"
          bar
          rm -f "$FIX_DIR/.pending.tmp"
          echo ""
          exit 0
        fi

        refresh_progress || true
      else
        echo -e "     ${DIM}Skipped — $FIX_ID stays pending${NC}"
        echo ""
      fi

    done < "$FIX_DIR/.pending.tmp"
    rm -f "$FIX_DIR/.pending.tmp"

    REMAINING=$(grep -c "^\- \[ \]" "$FIXES_FILE" 2>/dev/null || echo 0)
    DONE=$(grep -c "^\- \[x\]" "$FIXES_FILE" 2>/dev/null || echo 0)
    echo ""
    bar
    if [ "$REMAINING" -eq 0 ]; then
      echo -e "  ${GREEN}${BOLD}✅ All issues solved!${NC}"
    else
      echo -e "  ${BOLD}Progress: $DONE solved, $REMAINING still pending${NC}"
      echo -e "  ${DIM}Re-run the script to continue fixing remaining issues.${NC}"
    fi
    echo -e "  ${DIM}Fix tracker: $FIXES_FILE${NC}"
    bar
    ;;

  # ── Skip ────────────────────────────────────────────────────
  *)
    bar
    echo -e "  ${BOLD}Audit saved. Fix when ready:${NC}"
    echo ""
    echo -e "  ${DIM}bash seo-audit/seo_audit.sh${NC}    — re-run"
    echo -e "  ${DIM}open \"$FIXES_FILE\"${NC}   — view issues"
    bar
    ;;
esac

echo ""

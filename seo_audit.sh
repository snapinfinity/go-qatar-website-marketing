#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
#  Go Qatar — SEO Audit Script
#  Uses: https://github.com/AgriciDaniel/claude-seo
#  Run:  bash seo_audit.sh
# ─────────────────────────────────────────────────────────────
set -euo pipefail

# ── Config ────────────────────────────────────────────────────
SITE_URL="https://goqatar.app"
SEO_REPO="https://github.com/AgriciDaniel/claude-seo.git"
SEO_SKILL_DIR="$HOME/.claude/skills/seo"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SEO_WORK_DIR="$SCRIPT_DIR/seo_work"
TIMESTAMP="$(date +%Y-%m-%d_%H-%M-%S)"
REPORT_FILE="$SEO_WORK_DIR/audit_$TIMESTAMP.md"
ISSUES_FILE="$SEO_WORK_DIR/technical_issues_$TIMESTAMP.md"

# ── Colours ───────────────────────────────────────────────────
GOLD='\033[0;33m'
BOLD='\033[1m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
DIM='\033[2m'
NC='\033[0m'

bar() { echo -e "${GOLD}${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"; }
step() { echo -e "${BLUE}${BOLD}[$1]${NC} $2"; }
ok()   { echo -e "     ${GREEN}✓${NC}  $1"; }
warn() { echo -e "     ${YELLOW}⚠${NC}  $1"; }
err()  { echo -e "     ${RED}✗${NC}  $1"; }
info() { echo -e "     ${DIM}$1${NC}"; }

# ── Header ────────────────────────────────────────────────────
echo ""
bar
echo -e "  ${GOLD}${BOLD}Go Qatar — SEO Audit Script${NC}"
echo -e "  ${DIM}Site: $SITE_URL${NC}"
echo -e "  ${DIM}Date: $(date '+%A %d %B %Y, %H:%M')${NC}"
bar
echo ""

# ── Step 1: Check / install claude-seo ───────────────────────
step "1/4" "Checking claude-seo plugin..."

if [ -d "$SEO_SKILL_DIR" ]; then
  ok "claude-seo already installed"
  info "Location: $SEO_SKILL_DIR"
else
  warn "claude-seo not found — installing now"
  echo ""

  # ── Ensure Python 3.10+ is on PATH before running install.sh ──
  BREW_PY="/opt/homebrew/bin/python3.11"
  PY_SHIM=""
  CURRENT_PY_VER=$(python3 -c 'import sys; print(sys.version_info.minor)' 2>/dev/null || echo "0")

  if [ "$CURRENT_PY_VER" -lt 10 ] && [ -x "$BREW_PY" ]; then
    PY_SHIM=$(mktemp -d)
    ln -sf "$BREW_PY" "$PY_SHIM/python3"
    export PATH="$PY_SHIM:$PATH"
    info "System python3 is 3.$CURRENT_PY_VER — shimmed to $($BREW_PY --version)"
  elif [ "$CURRENT_PY_VER" -lt 10 ]; then
    err "Python 3.10+ is required. Install it with: brew install python@3.11"
    exit 1
  fi

  TMP_DIR=$(mktemp -d)
  trap 'rm -rf "$TMP_DIR" "${PY_SHIM:-}"' EXIT

  echo -e "     Cloning repo..."
  if ! git clone --depth 1 "$SEO_REPO" "$TMP_DIR/claude-seo" --quiet 2>&1; then
    err "Failed to clone claude-seo. Check your internet connection."
    exit 1
  fi

  echo -e "     Running install.sh..."
  if ! bash "$TMP_DIR/claude-seo/install.sh" 2>&1; then
    err "install.sh failed. See output above."
    exit 1
  fi

  ok "claude-seo installed successfully"
fi
echo ""

# ── Step 2: Check / create seo_work ──────────────────────────
step "2/4" "Checking seo_work directory..."

if [ -d "$SEO_WORK_DIR" ]; then
  PREV=$(ls "$SEO_WORK_DIR"/audit_*.md 2>/dev/null | wc -l | tr -d ' ')
  ok "seo_work/ exists ($PREV previous report(s) found)"
else
  mkdir -p "$SEO_WORK_DIR"
  ok "Created seo_work/ at $SEO_WORK_DIR"
fi
echo ""

# ── Step 3: Run SEO audit ─────────────────────────────────────
step "3/4" "Running full SEO audit on $SITE_URL..."
info "This runs 25 sub-skills + specialist agents — may take a few minutes."
echo ""

# Run audit via Claude Code print mode with the /seo skill
if ! claude -p "/seo audit $SITE_URL" \
     --allowedTools "Bash,Read,Write,WebFetch,WebSearch" \
     --output-format text \
     2>&1 | tee "$REPORT_FILE"; then
  err "Audit command failed. Trying alternative approach..."

  # Fallback: prompt Claude directly without slash command
  claude -p "You are an expert SEO auditor. Perform a comprehensive technical SEO audit of $SITE_URL.

Cover ALL of these areas:
1. Technical SEO (crawlability, robots.txt, sitemap.xml, HTTPS, redirects, status codes)
2. Core Web Vitals & Page Speed (LCP, CLS, FID/INP, TTB)
3. Meta tags (title, description, OG tags, Twitter cards, canonical)
4. Structured data / Schema.org (present, valid, missing opportunities)
5. Mobile friendliness & viewport
6. URL structure & internal linking
7. Image optimisation (alt text, formats, sizes)
8. Content & keyword gaps (Qatar address, navigation, local SEO)
9. Indexation (what pages are/aren't indexed)
10. Backlink profile gaps
11. AI search optimisation (structured answers, FAQ schema)
12. Local SEO signals

For each issue found:
- State the issue clearly
- Give it a severity: [CRITICAL] [HIGH] [MEDIUM] [LOW]
- Explain why it matters
- Give the exact fix

Format the output as a structured Markdown report." \
     --allowedTools "WebFetch,WebSearch,Bash" \
     --output-format text \
     2>&1 | tee "$REPORT_FILE"
fi

REPORT_SIZE=$(wc -l < "$REPORT_FILE" | tr -d ' ')
ok "Audit complete — $REPORT_SIZE lines written"
info "Report: $REPORT_FILE"
echo ""

# ── Step 4: Extract technical issues ─────────────────────────
step "4/4" "Extracting technical issues..."

{
  echo "# Go Qatar — Technical SEO Issues"
  echo "**Generated:** $(date '+%A %d %B %Y, %H:%M')"
  echo "**Site:** $SITE_URL"
  echo "**Source report:** $REPORT_FILE"
  echo ""
  echo "---"
  echo ""

  # Pull out CRITICAL issues
  CRITICAL=$(grep -i "\[CRITICAL\]\|critical" "$REPORT_FILE" | grep -v "^#\|^---" || true)
  if [ -n "$CRITICAL" ]; then
    echo "## 🔴 Critical Issues"
    echo "$CRITICAL"
    echo ""
  fi

  # Pull out HIGH issues
  HIGH=$(grep -i "\[HIGH\]\|high priority\|high severity" "$REPORT_FILE" | grep -v "^#\|^---" || true)
  if [ -n "$HIGH" ]; then
    echo "## 🟠 High Priority Issues"
    echo "$HIGH"
    echo ""
  fi

  # Pull out MEDIUM issues
  MEDIUM=$(grep -i "\[MEDIUM\]\|medium priority\|medium severity" "$REPORT_FILE" | grep -v "^#\|^---" || true)
  if [ -n "$MEDIUM" ]; then
    echo "## 🟡 Medium Issues"
    echo "$MEDIUM"
    echo ""
  fi

  # Pull out LOW issues
  LOW=$(grep -i "\[LOW\]\|low priority\|low severity" "$REPORT_FILE" | grep -v "^#\|^---" || true)
  if [ -n "$LOW" ]; then
    echo "## 🟢 Low Priority Issues"
    echo "$LOW"
    echo ""
  fi

  # Fallback: grab any line mentioning common SEO problems
  if [ -z "$CRITICAL" ] && [ -z "$HIGH" ] && [ -z "$MEDIUM" ]; then
    echo "## All Detected Issues"
    grep -Ei "(missing|broken|error|warning|issue|fix required|not found|slow|duplicate|redirect|canonical|robots|sitemap|alt text|schema|404|no index)" \
      "$REPORT_FILE" \
      | grep -v "^#\|^---\|^>" \
      | sort -u \
      | head -80 \
      || echo "No issues pattern-matched. Read the full report: $REPORT_FILE"
  fi

} > "$ISSUES_FILE"

ISSUE_COUNT=$(grep -cE "^[^#\-\*[:space:]]" "$ISSUES_FILE" 2>/dev/null || echo "?")
ok "Issues extracted — $ISSUES_FILE"
echo ""

# ── Print issues summary ──────────────────────────────────────
bar
echo -e "  ${BOLD}TECHNICAL ISSUES SUMMARY${NC}"
bar
echo ""
cat "$ISSUES_FILE"
echo ""
bar
echo ""
echo -e "  ${DIM}Full audit report : $REPORT_FILE${NC}"
echo -e "  ${DIM}Issues file       : $ISSUES_FILE${NC}"
echo ""

# ── Ask to proceed with fixes ─────────────────────────────────
echo -e "${YELLOW}${BOLD}Do you want Claude to start fixing these issues now?${NC}"
echo -e "${DIM}This will open a Claude Code session targeting the Next.js project.${NC}"
echo ""
read -rp "$(echo -e "${BOLD}Fix issues now? [y/N]: ${NC}")" PROCEED
echo ""

if [[ "${PROCEED:-n}" =~ ^[Yy]$ ]]; then
  bar
  echo -e "  ${GOLD}${BOLD}Starting fix session...${NC}"
  bar
  echo ""

  CONTEXT="$(cat "$ISSUES_FILE")"

  claude --system-prompt "You are a senior SEO engineer and Next.js developer.
You are fixing technical SEO issues for the website $SITE_URL.
The project is a Next.js 15 App Router site at: $SCRIPT_DIR
The full audit report is at: $REPORT_FILE

Your job: Fix every issue listed below, making changes directly to the project files.
After all fixes, run: cd $SCRIPT_DIR && npm run build
Then push to GitHub and Vercel will auto-deploy.

Issues to fix:
$CONTEXT" \
    "Fix all technical SEO issues from the audit report. Work through them in order of severity (CRITICAL first, then HIGH, MEDIUM, LOW). Show me each fix as you apply it."

else
  bar
  echo -e "  ${BOLD}Audit saved. Run fixes anytime:${NC}"
  echo ""
  echo -e "  ${DIM}bash seo_audit.sh${NC}   — re-run audit"
  echo -e "  ${DIM}cat $ISSUES_FILE${NC}"
  bar
  echo ""
fi

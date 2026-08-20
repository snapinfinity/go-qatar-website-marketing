// Keeps sitemap `lastmod` honest.
//
// These dates used to be hardcoded in src/app/sitemap.ts and went stale by
// almost two months, which teaches Google to ignore our lastmod entirely. So
// derive each route's date from the last commit that touched the files that
// actually produce that route's content, and write it to a committed JSON
// file that sitemap.ts imports.
//
// Only content-bearing files count. Shared chrome (layout.tsx, Navbar,
// Footer) is deliberately excluded: a footer link tweak is not a change to
// the Terms page, and bumping every route on every deploy is exactly the
// lastmod churn that makes search engines distrust the signal.
//
// Runs as `prebuild`. It only regenerates in a full clone. In a SHALLOW clone
// (Vercel's default) `git log -1 -- <path>` does not return nothing for an
// untouched file — it returns the shallow boundary commit, because that
// commit has no known parents and so appears to have created every file in
// the tree. That silently produced dates that were too recent (/contact and
// /terms were stamped with the boundary commit's 2026-07-26 instead of their
// real 2026-07-23) and looked entirely plausible. So detect shallowness up
// front and keep the committed JSON, which was generated in a full clone.
import { execFileSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT_FILE = path.join(process.cwd(), "src", "lib", "pageDates.json");

// route -> paths whose last commit defines that route's content date
const ROUTE_SOURCES = {
  "/": ["src/app/page.tsx", "src/components/sections"],
  "/contact": ["src/app/contact"],
  "/privacy-policy": ["src/app/privacy-policy"],
  "/terms": ["src/app/terms"],
};

function git(args) {
  return execFileSync("git", args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
}

// A shallow clone cannot answer "when did this file last change", so don't ask.
function isShallowOrUnavailable() {
  try {
    return git(["rev-parse", "--is-shallow-repository"]) !== "false";
  } catch {
    return true;
  }
}

function lastCommitDate(paths) {
  try {
    const out = git(["log", "-1", "--format=%cs", "--", ...paths]);
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : null;
  } catch {
    return null;
  }
}

const existing = JSON.parse(await readFile(OUT_FILE, "utf8"));

if (isShallowOrUnavailable()) {
  console.log(
    "generate-page-dates: shallow clone or no git — keeping committed dates " +
      `(${Object.entries(existing)
        .map(([r, d]) => `${r} ${d}`)
        .join(", ")}).`,
  );
  process.exit(0);
}

const next = { ...existing };
const stale = [];

for (const [route, paths] of Object.entries(ROUTE_SOURCES)) {
  const date = lastCommitDate(paths);
  if (date) next[route] = date;
  else stale.push(route);
}

if (stale.length) {
  console.warn(
    `generate-page-dates: no git date for ${stale.join(", ")} — keeping committed value(s).`,
  );
}

const changed = Object.keys(next).filter((k) => next[k] !== existing[k]);
if (changed.length) {
  await writeFile(OUT_FILE, `${JSON.stringify(next, null, 2)}\n`);
  console.log(
    `generate-page-dates: updated ${changed
      .map((r) => `${r} ${existing[r] ?? "—"} -> ${next[r]}`)
      .join(", ")}`,
  );
} else {
  console.log("generate-page-dates: all route dates already current.");
}

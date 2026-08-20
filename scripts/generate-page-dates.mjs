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
// Runs as `prebuild`. If git is unavailable or returns nothing (e.g. a CI
// shallow clone with no history for a path), the committed JSON is left
// untouched rather than overwritten with a guess.
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

function lastCommitDate(paths) {
  try {
    const out = execFileSync(
      "git",
      ["log", "-1", "--format=%cs", "--", ...paths],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    ).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : null;
  } catch {
    return null;
  }
}

const existing = JSON.parse(await readFile(OUT_FILE, "utf8"));
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

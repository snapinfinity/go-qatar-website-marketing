// Shared git-date helpers for the build-time date stamping in
// generate-page-dates.mjs and stamp-llms-txt.mjs.
import { execFileSync } from "node:child_process";

export function git(args) {
  return execFileSync("git", args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
}

// A shallow clone cannot answer "when did this file last change", so don't ask.
//
// `git log -1 -- <path>` does NOT return empty there for a file the clone
// window never touched — it returns the shallow boundary commit, because that
// commit has no known parents and so appears to have created the entire tree.
// That produces dates that are too recent and look perfectly plausible, which
// is exactly how the deployed sitemap once stamped /contact and /terms with
// the wrong date. Callers must bail out when this returns true and fall back
// to whatever is committed, which was generated in a full clone.
export function isShallowOrUnavailable() {
  try {
    return git(["rev-parse", "--is-shallow-repository"]) !== "false";
  } catch {
    return true;
  }
}

// Date (YYYY-MM-DD) of the last commit touching any of `paths`, or null.
export function lastCommitDate(paths) {
  try {
    const out = git(["log", "-1", "--format=%cs", "--", ...paths]);
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : null;
  } catch {
    return null;
  }
}

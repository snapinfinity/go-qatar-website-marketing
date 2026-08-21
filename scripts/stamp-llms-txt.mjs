// Keeps the `Last-Updated:` line in public/llms.txt honest.
//
// llms.txt is a static file in public/, so nothing would otherwise stop its
// date rotting the way the sitemap's hardcoded lastmod did. The date comes
// from the last commit touching llms.txt itself — not the site as a whole —
// so it only moves when the file's contents actually change.
//
// Like generate-page-dates.mjs this is a `prebuild` step that no-ops in a
// shallow clone, keeping the committed stamp rather than guessing.
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { isShallowOrUnavailable, lastCommitDate } from "./git-dates.mjs";

const FILE = path.join(process.cwd(), "public", "llms.txt");
const REL = "public/llms.txt";
const FIELD = /^Last-Updated: (\d{4}-\d{2}-\d{2})$/m;

const contents = await readFile(FILE, "utf8");
const current = contents.match(FIELD);

if (!current) {
  throw new Error(
    `stamp-llms-txt: no "Last-Updated: YYYY-MM-DD" line in ${REL}. ` +
      "Add one — it is what this script keeps current.",
  );
}

if (isShallowOrUnavailable()) {
  console.log(
    `stamp-llms-txt: shallow clone or no git — keeping ${current[1]}.`,
  );
  process.exit(0);
}

const date = lastCommitDate([REL]);

if (!date) {
  console.warn(`stamp-llms-txt: no git date for ${REL} — keeping ${current[1]}.`);
} else if (date === current[1]) {
  console.log(`stamp-llms-txt: already current (${date}).`);
} else {
  await writeFile(FILE, contents.replace(FIELD, `Last-Updated: ${date}`));
  console.log(`stamp-llms-txt: ${current[1]} -> ${date}`);
}

// Next's built-in `experimental.optimizeCss` only wires critters into the
// Pages Router HTML pipeline (`server/render.js` -> `postProcessHTML`). This
// project is App Router only (no `src/pages`), and the App Router renderer
// (`server/app-render/app-render.js`) never calls that pipeline, so the
// option was a silent no-op — the config looked correct but nothing was ever
// inlined. This script runs the same critters pass Next uses internally,
// directly against the static HTML Next already wrote to `.next/server/app`,
// as a postbuild step.
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import Critters from "critters";

const distDir = path.join(process.cwd(), ".next");
const appDir = path.join(distDir, "server", "app");

const critters = new Critters({
  ssrMode: true,
  reduceInlineStyles: false,
  path: distDir,
  publicPath: "/_next/",
  preload: "media",
  fonts: false,
  logLevel: "warn",
});

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (entry.name.endsWith(".html")) files.push(full);
  }
  return files;
}

const htmlFiles = await walk(appDir);
let processed = 0;

// critters' `preload: "media"` strategy defers each stylesheet with
// `media="print" onload="this.media='all'"`. That onload is an inline event
// handler, so it only runs under `script-src 'unsafe-inline'` — under a CSP
// with `script-src-attr 'none'` the swap never fires and the page renders
// with critical CSS only (i.e. visually broken). Move the swap out of the
// attribute and into one inline <script> that does the same thing, so the
// CSP can block handler attributes without breaking the deferred CSS.
const DEFER_ATTR = "data-css-defer";
const deferScript =
  `<script>(function(){var l=document.querySelectorAll('link[${DEFER_ATTR}]');` +
  `for(var i=0;i<l.length;i++){(function(k){` +
  `if(k.sheet){k.media='all';}else{k.addEventListener('load',function(){k.media='all';});}` +
  `})(l[i]);}})();</script>`;

function replaceOnloadHandlers(html) {
  const swapped = html.replace(
    /(<link\b[^>]*?)\s+onload="this\.media='all'"/g,
    `$1 ${DEFER_ATTR}`,
  );
  if (!swapped.includes(DEFER_ATTR)) return { html: swapped, count: 0 };
  const count = swapped.split(DEFER_ATTR).length - 1;
  return {
    html: swapped.includes("</body>")
      ? swapped.replace("</body>", `${deferScript}</body>`)
      : swapped + deferScript,
    count,
  };
}

let deferred = 0;

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  if (!html.includes('<link rel="stylesheet"')) continue;
  const inlined = await critters.process(html);
  const { html: final, count } = replaceOnloadHandlers(inlined);
  if (/\bonload=/.test(final)) {
    throw new Error(
      `inline-critical-css: ${file} still contains an inline onload handler; ` +
        "it would be blocked by script-src-attr 'none'.",
    );
  }
  deferred += count;
  await writeFile(file, final);
  processed++;
}

console.log(
  `inline-critical-css: inlined critical CSS in ${processed}/${htmlFiles.length} static page(s); ` +
    `moved ${deferred} onload handler(s) into a CSP-safe inline script.`,
);

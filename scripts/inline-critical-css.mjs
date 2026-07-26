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

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  if (!html.includes('<link rel="stylesheet"')) continue;
  const inlined = await critters.process(html);
  await writeFile(file, inlined);
  processed++;
}

console.log(`inline-critical-css: inlined critical CSS in ${processed}/${htmlFiles.length} static page(s).`);

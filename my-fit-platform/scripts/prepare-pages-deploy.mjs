import { copyFileSync, cpSync, existsSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const openNextDir = path.join(root, "..", ".open-next");
const assetsDir = path.join(openNextDir, "assets");
const workerSrc = path.join(openNextDir, "worker.js");
const workerDest = path.join(openNextDir, "_worker.js");

if (!existsSync(workerSrc)) {
  console.error("OpenNext worker.js not found. Run pages:build first.");
  process.exit(1);
}

if (!existsSync(assetsDir)) {
  console.error("OpenNext assets directory not found. Run pages:build first.");
  process.exit(1);
}

copyFileSync(workerSrc, workerDest);

// Pages maps ASSETS to pages_build_output_dir root, not the assets/ subfolder.
// Hoist static files so /_next/static/* and /favicon.ico resolve correctly.
for (const entry of ["_next", "_headers", "BUILD_ID", "favicon.ico", "file.svg", "globe.svg", "next.svg", "vercel.svg", "window.svg"]) {
  const src = path.join(assetsDir, entry);
  if (!existsSync(src)) continue;
  cpSync(src, path.join(openNextDir, entry), { recursive: true, force: true });
}

writeFileSync(
  path.join(openNextDir, "_routes.json"),
  JSON.stringify(
    {
      version: 1,
      include: ["/*"],
      exclude: [
        "/_next/static/*",
        "/favicon.ico",
        "/file.svg",
        "/globe.svg",
        "/next.svg",
        "/vercel.svg",
        "/window.svg",
      ],
    },
    null,
    2,
  ),
);

console.log("Prepared Cloudflare Pages output: _worker.js + static assets at .open-next root.");

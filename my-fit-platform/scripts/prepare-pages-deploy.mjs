import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.join(root, "..");
const openNextDir = path.join(appDir, ".open-next");
const assetsDir = path.join(openNextDir, "assets");
const pagesDistDir = path.join(appDir, "pages-dist");

const workerSrc = path.join(openNextDir, "worker.js");
const workerModules = [
  "cloudflare",
  "middleware",
  "server-functions",
  ".build",
  "cloudflare-templates",
];

function assertBuildOutput() {
  if (!existsSync(workerSrc)) {
    console.error("OpenNext worker.js not found. Run pages:build first.");
    process.exit(1);
  }
  if (!existsSync(assetsDir)) {
    console.error("OpenNext assets directory not found. Run pages:build first.");
    process.exit(1);
  }
}

function copyAssetsToDist() {
  for (const entry of readdirSync(assetsDir)) {
    const src = path.join(assetsDir, entry);
    const dest = path.join(pagesDistDir, entry);
    cpSync(src, dest, { recursive: true, force: true });
  }
}

function copyWorkerBundle() {
  copyFileSync(workerSrc, path.join(pagesDistDir, "_worker.js"));

  for (const moduleName of workerModules) {
    const src = path.join(openNextDir, moduleName);
    if (!existsSync(src)) continue;
    cpSync(src, path.join(pagesDistDir, moduleName), { recursive: true, force: true });
  }
}

function writePagesConfig() {
  writeFileSync(
    path.join(pagesDistDir, "_routes.json"),
    JSON.stringify(
      {
        version: 1,
        include: ["/*"],
        exclude: ["/_next/static/*", "/_next/image/*"],
      },
      null,
      2,
    ),
  );
}

function verifyDist() {
  const cssDir = path.join(pagesDistDir, "_next", "static", "chunks");
  const cssFiles = existsSync(cssDir)
    ? readdirSync(cssDir).filter((file) => file.endsWith(".css"))
    : [];

  if (cssFiles.length === 0) {
    console.error("pages-dist is missing CSS chunks in _next/static/chunks.");
    process.exit(1);
  }

  const nextStaticDir = path.join(pagesDistDir, "_next", "static");
  const fileCount = countFiles(nextStaticDir);
  console.log(
    `pages-dist ready: ${fileCount} static files, ${cssFiles.length} CSS bundles, _worker.js`,
  );
}

function countFiles(dir) {
  let total = 0;
  for (const entry of readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      total += countFiles(fullPath);
    } else {
      total += 1;
    }
  }
  return total;
}

assertBuildOutput();

if (existsSync(pagesDistDir)) {
  rmSync(pagesDistDir, { recursive: true });
}
mkdirSync(pagesDistDir, { recursive: true });

copyAssetsToDist();
copyWorkerBundle();
writePagesConfig();
verifyDist();

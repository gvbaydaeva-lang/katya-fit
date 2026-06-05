import { copyFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const openNextDir = path.join(root, "..", ".open-next");
const workerSrc = path.join(openNextDir, "worker.js");
const workerDest = path.join(openNextDir, "_worker.js");

if (!existsSync(workerSrc)) {
  console.error("OpenNext worker.js not found. Run pages:build first.");
  process.exit(1);
}

copyFileSync(workerSrc, workerDest);
console.log("Created _worker.js for Cloudflare Pages deployment.");

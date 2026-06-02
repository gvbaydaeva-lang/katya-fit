import { renameSync, existsSync, copyFileSync } from "node:fs";
import { execSync } from "node:child_process";

const toHide = [
  ["app/api", ".api-github-pages-backup"],
  ["middleware.ts", ".middleware-github-pages-backup"],
];

function hide(path, backup) {
  if (existsSync(path)) renameSync(path, backup);
}

function restore(path, backup) {
  if (existsSync(backup)) renameSync(backup, path);
}

try {
  for (const [path, backup] of toHide) hide(path, backup);

  execSync("next build", {
    stdio: "inherit",
    env: {
      ...process.env,
      GITHUB_PAGES: "true",
      NEXT_PUBLIC_STATIC_HOSTING: "true",
    },
  });

  if (existsSync("index.html") && existsSync("out")) {
    copyFileSync("index.html", "out/index.html");
    console.log("✓ index.html скопирован в out/ как главная страница");
  }
} finally {
  for (const [path, backup] of toHide) restore(path, backup);
}

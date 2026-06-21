import { renameSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";

const toHide = [
  ["app/api", ".api-github-pages-backup"],
  ["app/auth", ".auth-github-pages-backup"],
  ["app/(student)", ".student-github-pages-backup"],
  ["app/(admin)", ".admin-github-pages-backup"],
  ["app/(public)/login", ".login-github-pages-backup"],
  ["app/(public)/register", ".register-github-pages-backup"],
  ["app/(public)/checkout", ".checkout-github-pages-backup"],
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
} finally {
  for (const [path, backup] of toHide) restore(path, backup);
}

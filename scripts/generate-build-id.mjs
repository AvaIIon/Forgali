// Writes src/data/build-id.json: a per-build id that index.html (stamped by the
// forgali-build-stamp plugin in vite.config.ts) and middleware.ts both embed.
// It runs first in the npm `prebuild` step, so one deployment's shell and its
// middleware carry the same id, and middleware.ts refuses a shell carrying a
// different one (see fetchShell there for the deploy-time race this closes).
//
// Best-effort like the other prebuild scripts: on any failure the committed
// file stays and the build goes on. The id is the commit SHA when Vercel
// exposes it, plus a timestamp so two builds of one commit still differ.

import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

try {
  const sha = (process.env.VERCEL_GIT_COMMIT_SHA || "").slice(0, 12) || "nosha";
  const id = `${sha}-${Date.now().toString(36)}`;
  const out = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "data", "build-id.json");
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, `${JSON.stringify({ id })}\n`, "utf-8");
  console.log(`[build-id] ${id}`);
} catch (err) {
  console.warn("[build-id] skipped:", err?.message || err);
}
process.exit(0);

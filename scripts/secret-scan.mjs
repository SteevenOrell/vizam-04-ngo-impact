#!/usr/bin/env node
// Secret scan for a public repo. No dependencies.
// Scans (1) every tracked file in the working tree and (2) every blob reachable from any ref in the
// full git history, for credential patterns and for files that must never be committed.
// Prints the path, blob and line of each finding with the matched value masked. Exits 1 on findings.
import { execFileSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";

const git = (args, opts = {}) =>
  execFileSync("git", args, { maxBuffer: 1024 * 1024 * 512, ...opts });

const RULES = [
  ["AWS access key id", /\b(?:AKIA|ASIA|AGPA|AIDA|AROA)[0-9A-Z]{16}\b/g],
  ["AWS secret key assignment", /aws_?secret_?access_?key\s*[:=]\s*["']?[A-Za-z0-9/+=]{40}/gi],
  ["GitHub token", /\b(?:gh[pousr]_[A-Za-z0-9]{36,}|github_pat_[A-Za-z0-9_]{60,})\b/g],
  ["Stripe key", /\b(?:sk|rk|pk)_(?:live|test)_[A-Za-z0-9]{16,}\b/g],
  ["Google API key", /\bAIza[0-9A-Za-z_-]{35}\b/g],
  ["Google OAuth client secret", /\bGOCSPX-[A-Za-z0-9_-]{20,}\b/g],
  ["Anthropic key", /\bsk-ant-[A-Za-z0-9_-]{20,}\b/g],
  ["OpenAI key", /\bsk-(?:proj-|svcacct-|admin-)?[A-Za-z0-9_-]{32,}\b/g],
  ["Slack token", /\bxox[abposr]-[A-Za-z0-9-]{10,}\b/g],
  ["Private key block", /-----BEGIN (?:[A-Z]+ )?PRIVATE KEY-----/g],
  ["Service-account JSON", /"type"\s*:\s*"service_account"/g],
  ["JWT", /\beyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/g],
  ["Vercel token", /\bvercel_[A-Za-z0-9]{24,}\b/gi],
  ["ElevenLabs key", /\bsk_[a-f0-9]{48}\b/g],
  // Unsplash/Pixabay/ElevenLabs/other keys usually appear as NAME=value; catch any high-entropy value
  // assigned to a *KEY / *SECRET / *TOKEN / *PASSWORD name (env files, JS, JSON, YAML).
  [
    "High-entropy secret assignment",
    /\b[A-Za-z0-9_]*(?:API_?KEY|ACCESS_?KEY|SECRET|TOKEN|PASSWORD|PASSWD|CLIENT_?ID)[A-Za-z0-9_]*["']?\s*[:=]\s*["'`]?([A-Za-z0-9_\-+/=.]{20,})/gi,
    { entropy: 3.5, group: 1 },
  ],
];

// Paths that must never be tracked or appear anywhere in history.
const FORBIDDEN_PATHS = [
  [/(^|\/)\.env(\.|$)(?!example$|sample$)/i, ".env file"],
  [/(^|\/)\.secrets(\/|$)/i, ".secrets directory"],
  [/(^|\/)\.claude(\/|$)/i, ".claude directory"],
  [/(^|\/)CLAUDE(\.local)?\.md$/i, "CLAUDE.md (local instructions)"],
  [/(^|\/)media\.env$/i, "media.env"],
  [/\.(pem|p12|pfx|key|keystore|jks)$/i, "key/certificate file"],
  [/\.(png|jpe?g|gif|tiff?|bmp|heic|heif|psd|raw|cr2|nef|avif)$/i, "non-WebP image (only WebP may be committed)"],
  [/(^|\/)screenshots-raw\//i, "raw screenshots"],
];
// Non-WebP files that are allowed (vector/brand assets, not photos).
const ALLOWED_PATHS = [/^app\/icon\.svg$/, /^public\/.*\.svg$/];

const SELF = "scripts/secret-scan.mjs";
const BINARY_EXT = /\.(webp|png|jpe?g|gif|ico|woff2?|ttf|otf|avif|pdf|zip|mp4|webm|mp3)$/i;

function entropy(s) {
  const freq = new Map();
  for (const ch of s) freq.set(ch, (freq.get(ch) ?? 0) + 1);
  let h = 0;
  for (const n of freq.values()) {
    const p = n / s.length;
    h -= p * Math.log2(p);
  }
  return h;
}

const mask = (v) => (v.length <= 8 ? "****" : `${v.slice(0, 4)}…${v.slice(-2)} (${v.length} chars)`);

function scanText(text, where, findings) {
  const lines = text.split(/\r?\n/);
  lines.forEach((line, i) => {
    if (line.length > 5000) return; // minified/lockfile integrity lines
    if (/"integrity"\s*:\s*"sha\d+-/.test(line)) return; // npm lockfile hashes
    for (const [name, re, opt] of RULES) {
      re.lastIndex = 0;
      for (const m of line.matchAll(re)) {
        const value = opt?.group ? m[opt.group] : m[0];
        if (opt?.entropy) {
          if (entropy(value) < opt.entropy) continue;
          if (/^(process\.env|import\.meta\.env)/.test(value)) continue;
          if (/^[a-z]+(?:[A-Z][a-z]+)+$/.test(value)) continue; // camelCase identifier
          if (/^[a-z0-9_.\-/]+$/.test(value) && !/\d/.test(value)) continue; // plain words/paths
        }
        findings.push(`${where}:${i + 1}  ${name}: ${mask(value)}`);
      }
    }
  });
}

function checkPath(path, where, findings) {
  if (ALLOWED_PATHS.some((re) => re.test(path))) return;
  for (const [re, label] of FORBIDDEN_PATHS) {
    if (re.test(path)) findings.push(`${where}  forbidden path (${label}): ${path}`);
  }
}

const findings = [];

// 1. Working tree: tracked files.
const tracked = git(["ls-files", "-z"]).toString().split("\0").filter(Boolean);
for (const path of tracked) {
  checkPath(path, "[tree]", findings);
  if (path === SELF || BINARY_EXT.test(path) || !existsSync(path)) continue;
  scanText(readFileSync(path, "utf8"), `[tree] ${path}`, findings);
}

// 2. Full history: every path ever committed, and every reachable blob.
const historyPaths = new Set(
  git(["log", "--all", "--name-only", "--format=", "--diff-filter=ACMR"]).toString().split(/\r?\n/).filter(Boolean),
);
for (const path of historyPaths) checkPath(path, "[history]", findings);

const objects = git(["rev-list", "--all", "--objects"]).toString().split(/\r?\n/).filter(Boolean);
const blobPaths = new Map();
for (const line of objects) {
  const sp = line.indexOf(" ");
  if (sp > 0) blobPaths.set(line.slice(0, sp), line.slice(sp + 1));
}
const ids = [...blobPaths.keys()];
const types = git(["cat-file", "--batch-check=%(objectname) %(objecttype) %(objectsize)"], {
  input: ids.join("\n") + "\n",
})
  .toString()
  .split(/\r?\n/)
  .filter(Boolean)
  .map((l) => l.split(" "));
const blobs = types.filter(([, t, size]) => t === "blob" && Number(size) < 5_000_000).map(([id]) => id);

let scannedBlobs = 0;
for (const id of blobs) {
  const path = blobPaths.get(id);
  if (path === SELF || BINARY_EXT.test(path)) continue;
  const buf = git(["cat-file", "blob", id]);
  if (buf.includes(0)) continue; // binary
  scannedBlobs++;
  scanText(buf.toString("utf8"), `[history ${id.slice(0, 8)}] ${path}`, findings);
}

const commits = git(["rev-list", "--all", "--count"]).toString().trim();
console.log(
  `secret-scan: ${tracked.length} tracked files, ${commits} commits, ${historyPaths.size} paths in history, ${scannedBlobs} text blobs scanned.`,
);
const unique = [...new Set(findings)];
if (unique.length) {
  console.error(`secret-scan: ${unique.length} finding(s):`);
  for (const f of unique) console.error("  " + f);
  process.exit(1);
}
console.log("secret-scan: no findings.");

#!/usr/bin/env node
"use strict";

/**
 * Automates the static checks documented (as previously manual) in
 * FanSafe_PWA/TEST_REPORT.md. Zero dependencies, matches the project's
 * no-build-step principle. Runs in CI via .github/workflows/ci.yml.
 *
 * Checks:
 *   1. JavaScript syntax of the inline <script> in FanSafe_PWA/index.html
 *   2. HTML id uniqueness in that file
 *   3. Every $("#id") / getElementById("id") reference resolves, allowing
 *      for the known ids injected via innerHTML before being queried
 *   4. manifest.json is valid JSON
 *   5. FanSafe_Standalone_Prototype.html stays byte-identical to
 *      FanSafe_PWA/index.html (a documented project claim)
 *   6. Every city-packs/<city>/pack.json validates against its schema
 *      (delegates to tools/validate-city-pack.js)
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const INDEX_HTML = path.join(ROOT, "FanSafe_PWA", "index.html");
const STANDALONE_HTML = path.join(ROOT, "FanSafe_Standalone_Prototype.html");
const MANIFEST = path.join(ROOT, "FanSafe_PWA", "manifest.json");

// Ids that are injected via innerHTML immediately before being queried —
// documented and confirmed by reading the surrounding code in
// FanSafe_PWA/TEST_REPORT.md. New entries here must be justified the same way.
const INNERHTML_INJECTED_IDS = new Set([
  "voiceFallbackInput",
  "saveRiskAssessment",
  "makeRiskCase",
  "caseUpdateText",
]);

let failures = 0;

function fail(message) {
  console.log(`FAIL  ${message}`);
  failures += 1;
}

function pass(message) {
  console.log(`OK    ${message}`);
}

function checkScriptSyntax(html) {
  const start = html.indexOf("<script>");
  const end = html.lastIndexOf("</script>");
  if (start === -1 || end === -1) {
    fail("could not find an inline <script>...</script> block in index.html");
    return;
  }
  const script = html.slice(start + "<script>".length, end);
  const tmpFile = path.join(require("os").tmpdir(), `fansafe-validate-${Date.now()}.js`);
  fs.writeFileSync(tmpFile, script);
  try {
    execFileSync(process.execPath, ["--check", tmpFile], { stdio: "pipe" });
    pass(`inline <script> syntax valid (${script.length} chars)`);
  } catch (e) {
    fail(`inline <script> syntax error:\n${e.stderr ? e.stderr.toString() : e.message}`);
  } finally {
    fs.unlinkSync(tmpFile);
  }
}

function checkIds(html) {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  const counts = {};
  ids.forEach((id) => { counts[id] = (counts[id] || 0) + 1; });
  const dups = Object.entries(counts).filter(([, c]) => c > 1);
  if (dups.length === 0) {
    pass(`${ids.length} id attributes, all unique`);
  } else {
    fail(`duplicate HTML ids: ${dups.map(([id, c]) => `${id} (x${c})`).join(", ")}`);
  }
  return new Set(ids);
}

function checkIdReferences(html, staticIds) {
  const refs = new Set([...html.matchAll(/\$\("#([A-Za-z0-9_]+)"\)/g)].map((m) => m[1]));
  [...html.matchAll(/getElementById\("([A-Za-z0-9_]+)"\)/g)].forEach((m) => refs.add(m[1]));

  const missing = [...refs].filter((r) => !staticIds.has(r) && !INNERHTML_INJECTED_IDS.has(r));
  const staleAllowlist = [...INNERHTML_INJECTED_IDS].filter((id) => !refs.has(id));

  if (missing.length === 0) {
    pass(`all ${refs.size} $()/getElementById references resolve (${INNERHTML_INJECTED_IDS.size} known innerHTML-injected ids allowlisted)`);
  } else {
    fail(`referenced ids with no matching static id and not on the innerHTML allowlist: ${missing.join(", ")}`);
  }
  if (staleAllowlist.length > 0) {
    fail(`INNERHTML_INJECTED_IDS entries no longer referenced anywhere — remove from the allowlist: ${staleAllowlist.join(", ")}`);
  }
}

function checkManifestJson() {
  try {
    JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
    pass("manifest.json is valid JSON");
  } catch (e) {
    fail(`manifest.json invalid JSON: ${e.message}`);
  }
}

function checkStandaloneCopy(indexHtml) {
  if (!fs.existsSync(STANDALONE_HTML)) {
    fail("FanSafe_Standalone_Prototype.html not found");
    return;
  }
  const standalone = fs.readFileSync(STANDALONE_HTML, "utf8");
  const hashIndex = crypto.createHash("md5").update(indexHtml).digest("hex");
  const hashStandalone = crypto.createHash("md5").update(standalone).digest("hex");
  if (hashIndex === hashStandalone) {
    pass("FanSafe_Standalone_Prototype.html is byte-identical to FanSafe_PWA/index.html");
  } else {
    fail("FanSafe_Standalone_Prototype.html has DIVERGED from FanSafe_PWA/index.html — README.md claims they are byte-identical");
  }
}

function checkCityPacks() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, "validate-city-pack.js")], { stdio: "inherit" });
    pass("city-pack validation passed (see output above)");
  } catch (e) {
    fail("city-pack validation failed (see output above)");
  }
}

function main() {
  const html = fs.readFileSync(INDEX_HTML, "utf8");
  checkScriptSyntax(html);
  const staticIds = checkIds(html);
  checkIdReferences(html, staticIds);
  checkManifestJson();
  checkStandaloneCopy(html);
  checkCityPacks();

  console.log("");
  if (failures === 0) {
    console.log("All checks passed.");
    process.exit(0);
  } else {
    console.log(`${failures} check(s) failed.`);
    process.exit(1);
  }
}

main();

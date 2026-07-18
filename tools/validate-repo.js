#!/usr/bin/env node
"use strict";

/**
 * Automates the static checks documented (as previously manual) in
 * FanSafe_PWA/TEST_REPORT.md, plus the public-release gate-0 checks added
 * 2026-07-19. Zero dependencies, matches the project's no-build-step
 * principle. Runs in CI via .github/workflows/ci.yml.
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
 *   7. Every phrases/*.json file validates against its schema, including
 *      the reviewStatus/reviewedBy business rule (delegates to
 *      tools/validate-phrases.js)
 *   8. Every non-"sample" city pack's emergency data has a source URL and
 *      access date (docs/content-governance.md's provenance requirement)
 *   9. SECURITY.md and CODE_OF_CONDUCT.md contain a real-looking contact
 *      email and no leftover "placeholder" wording
 *  10. .github/FUNDING.yml has no *uncommented* PLACEHOLDER identifier
 *  11. A static heuristic scan of known user-controlled fields inserted
 *      into innerHTML without escapeHtml() (see docs/threat-model.md, T3)
 *  12. The minimum set of public-repository files exists
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const INDEX_HTML = path.join(ROOT, "FanSafe_PWA", "index.html");
const STANDALONE_HTML = path.join(ROOT, "FanSafe_Standalone_Prototype.html");
const MANIFEST = path.join(ROOT, "FanSafe_PWA", "manifest.json");
const CITY_PACKS_DIR = path.join(ROOT, "city-packs");

// Ids that are injected via innerHTML immediately before being queried —
// documented and confirmed by reading the surrounding code in
// FanSafe_PWA/TEST_REPORT.md. New entries here must be justified the same way.
const INNERHTML_INJECTED_IDS = new Set([
  "voiceFallbackInput",
  "saveRiskAssessment",
  "makeRiskCase",
  "caseUpdateText",
]);

// Known user-controlled object-field accesses that reach innerHTML sinks
// somewhere in index.html, classified during the 2026-07-19 threat-model
// audit (docs/threat-model.md, T3). Every occurrence of these inside an
// `X.innerHTML = ...;` block must be wrapped in escapeHtml(...). This is a
// deliberately narrow, hand-maintained allowlist, not a general JS/HTML
// parser — it exists to catch regressions of the exact bug class found and
// fixed this session (contact-avatar initials), not to replace human
// review of new sinks.
const KNOWN_USER_FIELDS = [
  /\bc\.name\b/g, /\bc\.value\b/g, /\bc\.details\b/g,
  /\bcard\.fullName\b/g, /\bcard\.bloodType\b/g, /\bcard\.allergies\b/g, /\bcard\.medicationsOrConditions\b/g,
  /\bitem\.title\b/g, /\bitem\.value\b/g,
  /\brecent\.title\b/g, /\brecent\.value\b/g,
  /\bm\.text\b/g, /\bu\.text\b/g,
  /\br\.notes\b/g, /\br\.lastKnownLocation\b/g, /\br\.policeReference\b/g,
];

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
    return "";
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
  return script;
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

function checkPhrases() {
  try {
    execFileSync(process.execPath, [path.join(__dirname, "validate-phrases.js")], { stdio: "inherit" });
    pass("phrase validation passed (see output above)");
  } catch (e) {
    fail("phrase validation failed (see output above)");
  }
}

function checkCityPackProvenance() {
  if (!fs.existsSync(CITY_PACKS_DIR)) {
    fail("city-packs/ directory not found");
    return;
  }
  const cities = fs.readdirSync(CITY_PACKS_DIR);
  let checked = 0;
  for (const city of cities) {
    const packPath = path.join(CITY_PACKS_DIR, city, "pack.json");
    if (!fs.existsSync(packPath)) continue;
    let pack;
    try {
      pack = JSON.parse(fs.readFileSync(packPath, "utf8"));
    } catch {
      continue; // already reported by checkCityPacks()
    }
    checked += 1;
    if (pack.reviewStatus === "sample") continue; // explicitly unsourced, not a violation
    const em = pack.emergency || {};
    if (!em.sourceUrl) {
      fail(`city-packs/${city}/pack.json: reviewStatus is "${pack.reviewStatus}" but emergency.sourceUrl is missing`);
    }
    if (!em.sourceAccessedOn) {
      fail(`city-packs/${city}/pack.json: reviewStatus is "${pack.reviewStatus}" but emergency.sourceAccessedOn is missing`);
    }
  }
  if (checked > 0) pass(`${checked} city pack(s) checked for source-reference completeness`);
}

function checkPlaceholderContacts() {
  const files = ["SECURITY.md", "CODE_OF_CONDUCT.md"];
  const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  for (const file of files) {
    const filePath = path.join(ROOT, file);
    if (!fs.existsSync(filePath)) {
      fail(`${file} not found`);
      continue;
    }
    const content = fs.readFileSync(filePath, "utf8");
    if (/placeholder/i.test(content)) {
      fail(`${file}: still contains the word "placeholder" — contact should be confirmed, not draft`);
      continue;
    }
    if (!emailPattern.test(content)) {
      fail(`${file}: no contact email found`);
      continue;
    }
    pass(`${file}: confirmed contact email present, no placeholder wording`);
  }
}

function checkFundingYml() {
  const fundingPath = path.join(ROOT, ".github", "FUNDING.yml");
  if (!fs.existsSync(fundingPath)) {
    fail(".github/FUNDING.yml not found");
    return;
  }
  const lines = fs.readFileSync(fundingPath, "utf8").split("\n");
  const badLines = lines
    .map((line, i) => ({ line: line.trim(), n: i + 1 }))
    .filter(({ line }) => line.length > 0 && !line.startsWith("#"))
    .filter(({ line }) => /PLACEHOLDER/.test(line));
  if (badLines.length === 0) {
    pass(".github/FUNDING.yml has no uncommented placeholder funding identifier");
  } else {
    badLines.forEach(({ line, n }) => fail(`.github/FUNDING.yml:${n}: uncommented placeholder — "${line}"`));
  }
}

function checkUnescapedUserFields(script) {
  const blocks = [...script.matchAll(/\.innerHTML\s*=\s*([\s\S]*?);/g)].map((m) => m[0]);
  let flagged = 0;
  for (const block of blocks) {
    for (const pattern of KNOWN_USER_FIELDS) {
      pattern.lastIndex = 0;
      let match;
      while ((match = pattern.exec(block))) {
        const before = block.slice(0, match.index);
        const after = block.slice(match.index + match[0].length);

        // A bare `field?` or `field &&` is a truthiness/ternary condition
        // guard, not a render site — the actual render happens at a
        // separate occurrence of the same field, checked independently.
        // Skipping these avoids flagging the common
        // `(x.value ? "..." + escapeHtml(x.value) : "")` pattern used
        // throughout this file as a false positive on the condition half.
        if (/^\s*[?]/.test(after) || /^\s*&&/.test(after)) continue;

        const wrapped = /escapeHtml\(\s*[A-Za-z0-9_.]*$/.test(before);
        if (!wrapped) {
          flagged += 1;
          fail(`possible unescaped user-controlled field in an innerHTML block: "${match[0]}" — wrap in escapeHtml() or add to the reviewed-safe allowlist in tools/validate-repo.js if it's actually constrained/trusted`);
        }
      }
    }
  }
  if (flagged === 0) {
    pass(`no unescaped known user-controlled fields found in ${blocks.length} innerHTML block(s) (heuristic scan, not a full parser — see docs/threat-model.md T3)`);
  }
}

function checkRequiredFiles() {
  const required = [
    "README.md", "LICENSE", "NOTICE", "CONTRIBUTING.md", "CODE_OF_CONDUCT.md",
    "SECURITY.md", "PRIVACY.md", "GOVERNANCE.md", "ROADMAP.md", "CHANGELOG.md",
    "CITATION.cff", "TRADEMARK.md", "LICENSE-PROPOSAL.md",
    ".github/FUNDING.yml", ".github/PULL_REQUEST_TEMPLATE.md",
    ".github/workflows/ci.yml",
    "docs/architecture.md", "docs/threat-model.md", "docs/content-governance.md",
    "docs/open-source-strategy.md", "docs/funding-readiness.md", "docs/pilot-plan.md",
    "docs/content-licensing-matrix.md",
    "schemas/city-pack.schema.json", "schemas/phrase.schema.json", "schemas/emergency-info.schema.json",
    "tools/validate-city-pack.js", "tools/validate-phrases.js", "tools/validate-repo.js",
  ];
  const missing = required.filter((f) => !fs.existsSync(path.join(ROOT, f)));
  if (missing.length === 0) {
    pass(`all ${required.length} required public-repository files exist`);
  } else {
    fail(`missing required files: ${missing.join(", ")}`);
  }
}

function main() {
  const html = fs.readFileSync(INDEX_HTML, "utf8");
  const script = checkScriptSyntax(html);
  const staticIds = checkIds(html);
  checkIdReferences(html, staticIds);
  checkManifestJson();
  checkStandaloneCopy(html);
  checkCityPacks();
  checkPhrases();
  checkCityPackProvenance();
  checkPlaceholderContacts();
  checkFundingYml();
  checkUnescapedUserFields(script);
  checkRequiredFiles();

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

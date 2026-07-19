#!/usr/bin/env node
"use strict";

/**
 * Generates the `const cityPacks = [...]` block in FanSafe_PWA/index.html
 * (and its byte-identical standalone copy) from city-packs/<city>/pack.json
 * — making the reviewed, sourced JSON the single source of truth instead
 * of two independently-hand-maintained copies of the same data.
 *
 * This is a codegen step for CONTRIBUTORS, not a runtime dependency for
 * END USERS: the generated output is still a static literal baked into
 * index.html, so the app keeps working with zero fetch calls, zero build
 * step, and zero framework — including opened directly via `file://`,
 * which a runtime `fetch("../city-packs/...")` would have broken (both
 * because `file://` blocks fetch of local JSON in most browsers, and
 * because `city-packs/` lives at the repo root, outside the directory
 * FanSafe_PWA/README.md's quick-start serves as the web root).
 *
 * Usage:
 *   node tools/sync-city-packs.js         # rewrite index.html + standalone copy
 *   node tools/sync-city-packs.js --check # exit 1 if index.html would change (CI drift check)
 */

const fs = require("fs");
const path = require("path");
const { loadSchema, validate } = require("./lib/json-schema-lite");

const ROOT = path.join(__dirname, "..");
const CITY_PACKS_DIR = path.join(ROOT, "city-packs");
const SCHEMA_DIR = path.join(ROOT, "schemas");
const INDEX_HTML = path.join(ROOT, "FanSafe_PWA", "index.html");
const STANDALONE_HTML = path.join(ROOT, "FanSafe_Standalone_Prototype.html");

const START_MARKER = "const cityPacks = [";
const END_MARKER = "];";

function jsString(value) {
  return JSON.stringify(value);
}

function emergencyLiteral(emergency) {
  const parts = [`primary:${jsString(emergency.primary)}`];
  if (emergency.secondaryLabel) parts.push(`secondaryLabel:${jsString(emergency.secondaryLabel)}`);
  if (emergency.secondary) parts.push(`secondary:${jsString(emergency.secondary)}`);
  return `{ ${parts.join(", ")} }`;
}

function serviceContactLiteral(contact) {
  return `{ label:${jsString(contact.label)}, number:${jsString(contact.number)} }`;
}

function servicesLiteral(services) {
  const parts = [];
  if (services.city_services) parts.push(`city_services:${serviceContactLiteral(services.city_services)}`);
  if (services.community_services) parts.push(`community_services:${serviceContactLiteral(services.community_services)}`);
  if (services.police_non_emergency) parts.push(`police_non_emergency:${serviceContactLiteral(services.police_non_emergency)}`);
  return `{ ${parts.join(", ")} }`;
}

function packLiteral(pack) {
  const line1 = `  { id:${jsString(pack.id)}, flag:${jsString(pack.flag)}, short:${jsString(pack.short)}, city:${jsString(pack.city)}, country:${jsString(pack.country)}, locale:${jsString(pack.locale)},`;
  const line2 = `    supportedLanguages:${jsString(pack.supportedLanguages)}, version:${jsString(pack.version)}, updatedAt:${jsString(pack.updatedAt)},`;
  const line3 = `    reviewStatus:${jsString(pack.reviewStatus || "sample")}, sourceAccessedOn:${jsString(pack.emergency.sourceAccessedOn || pack.updatedAt)}, reviewByDate:${jsString(pack.reviewByDate || "")},`;
  const lines = [line1, line2, line3];
  if (pack.services) {
    lines.push(`    emergency:${emergencyLiteral(pack.emergency)},`);
    lines.push(`    services:${servicesLiteral(pack.services)} }`);
  } else {
    lines.push(`    emergency:${emergencyLiteral(pack.emergency)} }`);
  }
  return lines.join("\n");
}

// Explicit display order, matching the order product/UX originally chose
// (Home shows the first 3: mexico, toronto, newyork — see packDetailText's
// callers). Directory listing order is alphabetical and NOT the same
// thing — silently reordering here would silently change which 3 cities
// a user sees on Home. New cities not listed here sort after these,
// alphabetically, so they still validate without editing this list.
const CITY_ORDER = ["mexico", "toronto", "newyork", "vancouver"];

function loadPacks() {
  const schema = loadSchema(SCHEMA_DIR, "city-pack.schema.json");
  const cities = fs.readdirSync(CITY_PACKS_DIR).sort((a, b) => {
    const ia = CITY_ORDER.indexOf(a);
    const ib = CITY_ORDER.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
  const packs = [];
  for (const city of cities) {
    const packPath = path.join(CITY_PACKS_DIR, city, "pack.json");
    if (!fs.existsSync(packPath)) continue;
    const pack = JSON.parse(fs.readFileSync(packPath, "utf8"));
    const errors = [];
    validate(pack, schema, `city-packs/${city}/pack.json`, errors);
    if (errors.length > 0) {
      throw new Error(`Refusing to sync: ${packPath} fails schema validation:\n  ${errors.join("\n  ")}`);
    }
    packs.push(pack);
  }
  return packs;
}

function buildBlock(packs) {
  const header = [
    START_MARKER.slice(0, -1).trimEnd(), // placeholder, replaced below
  ];
  const body = packs.map(packLiteral).join(",\n");
  return `${START_MARKER}\n${body}\n${END_MARKER}`;
}

function replaceBlock(html, newBlock) {
  const start = html.indexOf(START_MARKER);
  if (start === -1) throw new Error(`Could not find "${START_MARKER}" in target file`);
  const end = html.indexOf(END_MARKER, start);
  if (end === -1) throw new Error(`Could not find closing "${END_MARKER}" after cityPacks start`);
  return html.slice(0, start) + newBlock + html.slice(end + END_MARKER.length);
}

function main() {
  const checkOnly = process.argv.includes("--check");
  const packs = loadPacks();
  const newBlock = buildBlock(packs);

  const currentHtml = fs.readFileSync(INDEX_HTML, "utf8");
  const updatedHtml = replaceBlock(currentHtml, newBlock);

  if (checkOnly) {
    if (currentHtml === updatedHtml) {
      console.log("OK    FanSafe_PWA/index.html's cityPacks array matches city-packs/*/pack.json — no drift.");
      process.exit(0);
    } else {
      console.log("FAIL  FanSafe_PWA/index.html's cityPacks array is out of sync with city-packs/*/pack.json.");
      console.log("      Run: node tools/sync-city-packs.js");
      process.exit(1);
    }
  }

  fs.writeFileSync(INDEX_HTML, updatedHtml);
  fs.writeFileSync(STANDALONE_HTML, updatedHtml);
  console.log(`Synced ${packs.length} city pack(s) into FanSafe_PWA/index.html and FanSafe_Standalone_Prototype.html.`);
}

main();

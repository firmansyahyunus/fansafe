#!/usr/bin/env node
"use strict";

/**
 * Generates the phraseBook literal in both shipped HTML files from
 * phrases/safety-critical.json. This is contributor-side code generation,
 * not a runtime fetch, so the static PWA and file:// copy keep working.
 *
 * Usage:
 *   node tools/sync-phrases.js
 *   node tools/sync-phrases.js --check
 */

const fs = require("fs");
const path = require("path");
const { loadSchema, validate } = require("./lib/json-schema-lite");

const ROOT = path.join(__dirname, "..");
const SOURCE = path.join(ROOT, "phrases", "safety-critical.json");
const SCHEMA_DIR = path.join(ROOT, "schemas");
const INDEX_HTML = path.join(ROOT, "FanSafe_PWA", "index.html");
const STANDALONE_HTML = path.join(ROOT, "FanSafe_Standalone_Prototype.html");
const START_MARKER = "const phraseBook = [";
const END_MARKER = "];";

function valuesLiteral(values) {
  return `{ id:${JSON.stringify(values.id)}, en:${JSON.stringify(values.en)}, es:${JSON.stringify(values.es)}, fr:${JSON.stringify(values.fr)} }`;
}

function phraseLiteral(phrase) {
  const parts = [
    `id:${JSON.stringify(phrase.id)}`,
    `category:${JSON.stringify(phrase.category)}`,
    `values:${valuesLiteral(phrase.values)}`,
    `reviewStatus:${JSON.stringify(phrase.reviewStatus)}`,
  ];
  if (phrase.reviewedBy) parts.push(`reviewedBy:${JSON.stringify(phrase.reviewedBy)}`);
  return `  { ${parts.join(", ")} }`;
}

function loadPhrases() {
  const phrases = JSON.parse(fs.readFileSync(SOURCE, "utf8"));
  if (!Array.isArray(phrases)) throw new Error("phrases/safety-critical.json must be a JSON array");
  const schema = loadSchema(SCHEMA_DIR, "phrase.schema.json");
  const errors = [];
  const seen = new Set();
  phrases.forEach((phrase, index) => {
    validate(phrase, schema, `safety-critical.json[${index}]`, errors);
    if (seen.has(phrase.id)) errors.push(`safety-critical.json: duplicate phrase id ${JSON.stringify(phrase.id)}`);
    seen.add(phrase.id);
  });
  if (errors.length) throw new Error(`Refusing to sync invalid phrase data:\n  ${errors.join("\n  ")}`);
  return phrases;
}

function replaceBlock(html, block) {
  const start = html.indexOf(START_MARKER);
  if (start === -1) throw new Error(`Could not find ${START_MARKER}`);
  const end = html.indexOf(END_MARKER, start);
  if (end === -1) throw new Error("Could not find phraseBook closing marker");
  return html.slice(0, start) + block + html.slice(end + END_MARKER.length);
}

function main() {
  const checkOnly = process.argv.includes("--check");
  const phrases = loadPhrases();
  const block = `${START_MARKER}\n${phrases.map(phraseLiteral).join(",\n")}\n${END_MARKER}`;
  const current = fs.readFileSync(INDEX_HTML, "utf8");
  const updated = replaceBlock(current, block);

  if (checkOnly) {
    if (current === updated) {
      console.log("OK    FanSafe_PWA/index.html's phraseBook matches phrases/safety-critical.json - no drift.");
      return;
    }
    console.log("FAIL  FanSafe_PWA/index.html's phraseBook is out of sync with phrases/safety-critical.json.");
    console.log("      Run: node tools/sync-phrases.js");
    process.exit(1);
  }

  fs.writeFileSync(INDEX_HTML, updated);
  fs.writeFileSync(STANDALONE_HTML, updated);
  console.log(`Synced ${phrases.length} phrase(s) into FanSafe_PWA/index.html and FanSafe_Standalone_Prototype.html.`);
}

main();

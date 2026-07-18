#!/usr/bin/env node
"use strict";

/**
 * Validator for FanSafe phrase JSON files (phrases/*.json, each a JSON
 * array of phrase objects) against schemas/phrase.schema.json. Uses
 * tools/lib/json-schema-lite.js (zero-dependency, no ajv).
 *
 * Beyond schema shape, enforces one business rule the draft-07 subset in
 * json-schema-lite.js cannot express: reviewStatus values that claim an
 * actual review ("native-speaker-reviewed", "professionally-translated")
 * must have at least one corresponding reviewedBy entry. See
 * phrases/REVIEW_STATUS.md.
 *
 * Also checks for duplicate phrase ids and phrase values keyed to
 * languages outside FanSafe's four supported languages (id/en/es/fr).
 *
 * Usage:
 *   node tools/validate-phrases.js                  # validates every phrases/*.json
 *   node tools/validate-phrases.js path/to/file.json # validates one file
 */

const fs = require("fs");
const path = require("path");
const { loadSchema, validate } = require("./lib/json-schema-lite");

const SCHEMA_DIR = path.join(__dirname, "..", "schemas");
const PHRASES_DIR = path.join(__dirname, "..", "phrases");
const SUPPORTED_LANGUAGES = ["id", "en", "es", "fr"];
const REVIEWED_STATUSES = new Set(["native-speaker-reviewed", "professionally-translated"]);

function validatePhrase(phrase, schema, pathLabel, errors) {
  validate(phrase, schema, pathLabel, errors);

  if (phrase && typeof phrase === "object") {
    if (REVIEWED_STATUSES.has(phrase.reviewStatus)) {
      if (!Array.isArray(phrase.reviewedBy) || phrase.reviewedBy.length === 0) {
        errors.push(`${pathLabel}: reviewStatus "${phrase.reviewStatus}" claims review but reviewedBy is empty — see phrases/REVIEW_STATUS.md`);
      }
    }
    if (phrase.values && typeof phrase.values === "object") {
      const extraLangs = Object.keys(phrase.values).filter((lang) => !SUPPORTED_LANGUAGES.includes(lang));
      if (extraLangs.length > 0) {
        errors.push(`${pathLabel}.values: unsupported language key(s) ${JSON.stringify(extraLangs)} — FanSafe supports only ${JSON.stringify(SUPPORTED_LANGUAGES)}`);
      }
    }
  }
}

function validateFile(filePath, schema) {
  const raw = fs.readFileSync(filePath, "utf8");
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    return { errors: [`${filePath}: invalid JSON — ${e.message}`], ids: [] };
  }
  if (!Array.isArray(data)) {
    return { errors: [`${filePath}: expected a JSON array of phrase objects`], ids: [] };
  }
  const errors = [];
  const ids = [];
  data.forEach((phrase, i) => {
    validatePhrase(phrase, schema, `${path.basename(filePath)}[${i}]`, errors);
    if (phrase && typeof phrase.id === "string") ids.push(phrase.id);
  });
  return { errors, ids };
}

function main() {
  const schema = loadSchema(SCHEMA_DIR, "phrase.schema.json");
  const args = process.argv.slice(2);
  const targets = args.length
    ? args
    : fs.existsSync(PHRASES_DIR)
      ? fs.readdirSync(PHRASES_DIR)
        .filter((f) => f.endsWith(".json"))
        .map((f) => path.join(PHRASES_DIR, f))
      : [];

  if (targets.length === 0) {
    console.log("No phrase files found to validate (looked in phrases/*.json).");
    process.exit(0);
  }

  let hasErrors = false;
  const idsSeenAcrossFiles = new Map(); // id -> file it first appeared in

  for (const target of targets) {
    const { errors, ids } = validateFile(target, schema);

    ids.forEach((id) => {
      if (idsSeenAcrossFiles.has(id)) {
        errors.push(`${path.basename(target)}: duplicate phrase id "${id}" (already used in ${idsSeenAcrossFiles.get(id)})`);
      } else {
        idsSeenAcrossFiles.set(id, path.basename(target));
      }
    });

    if (errors.length === 0) {
      console.log(`OK   ${target} (${ids.length} phrases)`);
    } else {
      hasErrors = true;
      console.log(`FAIL ${target}`);
      errors.forEach((e) => console.log(`     - ${e}`));
    }
  }

  process.exit(hasErrors ? 1 : 0);
}

main();

#!/usr/bin/env node
"use strict";

/**
 * Validator for FanSafe city-pack JSON files against
 * schemas/city-pack.schema.json. Uses tools/lib/json-schema-lite.js
 * (zero-dependency, no ajv) to stay consistent with the project's
 * "no build step, no npm install" principle (see FanSafe_PWA/README.md).
 *
 * Usage:
 *   node tools/validate-city-pack.js                  # validates every city-packs/<city>/pack.json
 *   node tools/validate-city-pack.js path/to/pack.json # validates one file
 */

const fs = require("fs");
const path = require("path");
const { loadSchema, validate } = require("./lib/json-schema-lite");

const SCHEMA_DIR = path.join(__dirname, "..", "schemas");
const CITY_PACKS_DIR = path.join(__dirname, "..", "city-packs");

function validateFile(filePath, schema) {
  const raw = fs.readFileSync(filePath, "utf8");
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    return [`${filePath}: invalid JSON — ${e.message}`];
  }
  const errors = [];
  validate(data, schema, path.basename(filePath), errors);
  return errors;
}

function main() {
  const schema = loadSchema(SCHEMA_DIR, "city-pack.schema.json");
  const args = process.argv.slice(2);
  const targets = args.length
    ? args
    : fs.existsSync(CITY_PACKS_DIR)
      ? fs.readdirSync(CITY_PACKS_DIR)
        .map((city) => path.join(CITY_PACKS_DIR, city, "pack.json"))
        .filter((p) => fs.existsSync(p))
      : [];

  if (targets.length === 0) {
    console.log("No city-pack.json files found to validate (looked in city-packs/<city>/pack.json).");
    process.exit(0);
  }

  let hasErrors = false;
  for (const target of targets) {
    const errors = validateFile(target, schema);
    if (errors.length === 0) {
      console.log(`OK   ${target}`);
    } else {
      hasErrors = true;
      console.log(`FAIL ${target}`);
      errors.forEach((e) => console.log(`     - ${e}`));
    }
  }

  process.exit(hasErrors ? 1 : 0);
}

main();

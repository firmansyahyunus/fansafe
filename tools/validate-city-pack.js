#!/usr/bin/env node
"use strict";

/**
 * Zero-dependency validator for FanSafe city-pack JSON files against
 * schemas/city-pack.schema.json. Deliberately dependency-free (no ajv or
 * other package) to stay consistent with the project's "no build step, no
 * npm install" principle (see FanSafe_PWA/README.md).
 *
 * Supports the subset of JSON Schema draft-07 actually used by
 * schemas/*.schema.json: type, additionalProperties, required, properties,
 * enum, pattern, minLength, minItems, uniqueItems, format (date/uri,
 * lightweight), items, $ref (resolved to a sibling file), default (ignored
 * for validation purposes).
 *
 * Usage:
 *   node tools/validate-city-pack.js                  # validates every city-packs/<city>/pack.json
 *   node tools/validate-city-pack.js path/to/pack.json # validates one file
 */

const fs = require("fs");
const path = require("path");

const SCHEMA_DIR = path.join(__dirname, "..", "schemas");
const CITY_PACKS_DIR = path.join(__dirname, "..", "city-packs");

function loadSchema(name) {
  const schemaPath = path.join(SCHEMA_DIR, name);
  const raw = fs.readFileSync(schemaPath, "utf8");
  return resolveRefs(JSON.parse(raw));
}

function resolveRefs(schema) {
  if (schema && typeof schema === "object") {
    if (typeof schema.$ref === "string" && schema.$ref.startsWith("./")) {
      const refName = schema.$ref.slice(2);
      return loadSchema(refName);
    }
    for (const key of Object.keys(schema)) {
      schema[key] = resolveRefs(schema[key]);
    }
  }
  return schema;
}

function isDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && !isNaN(Date.parse(value));
}

function isUri(value) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function typeOf(value) {
  if (Array.isArray(value)) return "array";
  if (value === null) return "null";
  return typeof value;
}

function validate(value, schema, pathLabel, errors) {
  if (schema.type) {
    const actual = typeOf(value);
    if (actual !== schema.type) {
      errors.push(`${pathLabel}: expected type "${schema.type}", got "${actual}"`);
      return;
    }
  }

  if (schema.enum && !schema.enum.includes(value)) {
    errors.push(`${pathLabel}: value ${JSON.stringify(value)} not in allowed set ${JSON.stringify(schema.enum)}`);
  }

  if (typeof value === "string") {
    if (schema.pattern && !new RegExp(schema.pattern).test(value)) {
      errors.push(`${pathLabel}: "${value}" does not match pattern ${schema.pattern}`);
    }
    if (typeof schema.minLength === "number" && value.length < schema.minLength) {
      errors.push(`${pathLabel}: string shorter than minLength ${schema.minLength}`);
    }
    if (schema.format === "date" && !isDate(value)) {
      errors.push(`${pathLabel}: "${value}" is not a valid ISO date (YYYY-MM-DD)`);
    }
    if (schema.format === "uri" && !isUri(value)) {
      errors.push(`${pathLabel}: "${value}" is not a valid URI`);
    }
  }

  if (Array.isArray(value)) {
    if (typeof schema.minItems === "number" && value.length < schema.minItems) {
      errors.push(`${pathLabel}: array shorter than minItems ${schema.minItems}`);
    }
    if (schema.uniqueItems) {
      const seen = new Set();
      for (const item of value) {
        const key = JSON.stringify(item);
        if (seen.has(key)) {
          errors.push(`${pathLabel}: duplicate array item ${key}`);
        }
        seen.add(key);
      }
    }
    if (schema.items) {
      value.forEach((item, i) => validate(item, schema.items, `${pathLabel}[${i}]`, errors));
    }
  }

  if (typeOf(value) === "object" && schema.properties) {
    const required = schema.required || [];
    for (const key of required) {
      if (!(key in value)) {
        errors.push(`${pathLabel}: missing required property "${key}"`);
      }
    }
    if (schema.additionalProperties === false) {
      const allowed = new Set(Object.keys(schema.properties));
      for (const key of Object.keys(value)) {
        if (!allowed.has(key)) {
          errors.push(`${pathLabel}: unexpected property "${key}" (not in schema)`);
        }
      }
    }
    for (const [key, subSchema] of Object.entries(schema.properties)) {
      if (key in value) {
        validate(value[key], subSchema, `${pathLabel}.${key}`, errors);
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
    return [`${filePath}: invalid JSON — ${e.message}`];
  }
  const errors = [];
  validate(data, schema, path.basename(filePath), errors);
  return errors;
}

function main() {
  const schema = loadSchema("city-pack.schema.json");
  const args = process.argv.slice(2);
  const targets = args.length
    ? args
    : fs.existsSync(CITY_PACKS_DIR)
      ? fs.readdirSync(CITY_PACKS_DIR)
        .map((city) => path.join(CITY_PACKS_DIR, city, "pack.json"))
        .filter((p) => fs.existsSync(p))
      : [];

  if (targets.length === 0) {
    console.log("No city-pack.json files found to validate (looked in city-packs/*/pack.json).");
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

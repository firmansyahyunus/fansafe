"use strict";

/**
 * Zero-dependency validator for the subset of JSON Schema draft-07 actually
 * used by schemas/*.schema.json: type, additionalProperties, required,
 * properties, enum, pattern, minLength, minItems, uniqueItems, format
 * (date/uri, lightweight), items, $ref (resolved to a sibling file),
 * default (ignored for validation purposes).
 *
 * Shared by tools/validate-city-pack.js and tools/validate-phrases.js so
 * both validators stay consistent without adding an external dependency
 * (no ajv), per the project's no-build-step principle.
 */

const fs = require("fs");
const path = require("path");

function loadSchema(schemaDir, name) {
  const schemaPath = path.join(schemaDir, name);
  const raw = fs.readFileSync(schemaPath, "utf8");
  return resolveRefs(schemaDir, JSON.parse(raw));
}

function resolveRefs(schemaDir, schema) {
  if (schema && typeof schema === "object") {
    if (typeof schema.$ref === "string" && schema.$ref.startsWith("./")) {
      const refName = schema.$ref.slice(2);
      return loadSchema(schemaDir, refName);
    }
    for (const key of Object.keys(schema)) {
      schema[key] = resolveRefs(schemaDir, schema[key]);
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

module.exports = { loadSchema, validate, isDate, isUri, typeOf };

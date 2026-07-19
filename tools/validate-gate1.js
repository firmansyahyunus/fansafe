#!/usr/bin/env node
"use strict";

/**
 * Gate-1 regression checks for data taxonomy, NYC scope, and safe migration.
 * These are intentionally dependency-free and run from validate-repo.js/CI.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const toronto = JSON.parse(fs.readFileSync(path.join(ROOT, "city-packs", "toronto", "pack.json"), "utf8"));
const newYork = JSON.parse(fs.readFileSync(path.join(ROOT, "city-packs", "newyork", "pack.json"), "utf8"));
const vancouver = JSON.parse(fs.readFileSync(path.join(ROOT, "city-packs", "vancouver", "pack.json"), "utf8"));
const app = fs.readFileSync(path.join(ROOT, "FanSafe_PWA", "index.html"), "utf8");

const failures = [];
function expect(condition, message) { if (!condition) failures.push(message); }

expect(toronto.emergency && toronto.emergency.primary === "911", "Toronto must retain 911 as its primary emergency service");
expect(!Object.hasOwn(toronto.emergency || {}, "secondary"), "Toronto must not collapse 311/211 into legacy emergency.secondary");
expect(toronto.services && toronto.services.city_services && toronto.services.city_services.number === "311", "Toronto must model 311 as city_services");
expect(toronto.services && toronto.services.community_services && toronto.services.community_services.number === "211", "Toronto must model 211 as community_services");
expect(!Object.hasOwn(toronto.services || {}, "police_non_emergency"), "Toronto must not claim police_non_emergency before independent review");
expect(newYork.city === "New York City", "newyork pack must be scoped to New York City");
expect(vancouver.emergency && vancouver.emergency.secondaryLabel === "Vancouver Police Department non-emergency", "Vancouver police non-emergency service must name Vancouver Police Department");
expect(!/New York\s*\/\s*New Jersey/.test(app), "running app must not display unsupported New Jersey scope");
expect(app.includes('secondaryLabel:"Vancouver Police Department non-emergency"'), "running app must not attribute Vancouver police non-emergency service to E-Comm");
expect(app.includes('"newyork-newjersey":"newyork"'), "app must migrate legacy newyork-newjersey localStorage values");
expect(app.includes('"new_york_new_jersey":"newyork"'), "app must migrate legacy new_york_new_jersey localStorage values");
expect(app.includes('"new-york-new-jersey":"newyork"'), "app must migrate legacy new-york-new-jersey localStorage values");
expect(app.includes('cityPackStatus.newyork = cityPackStatus[legacyId]'), "app must migrate legacy city-pack status to newyork");
expect(app.includes('cityPackStatus[legacyId] && !cityPackStatus.newyork'), "city-pack migration must not overwrite an existing New York City status");
expect(app.includes('escapeHtml(c.name.slice(0,2).toUpperCase())'), "trusted-contact initials must remain HTML-escaped");

if (failures.length) {
  console.log("Gate-1 regression checks failed:");
  failures.forEach((failure) => console.log(`FAIL  ${failure}`));
  process.exit(1);
}

console.log("OK    Gate-1 Toronto taxonomy, NYC scope, localStorage migration, and contact escaping checks passed.");

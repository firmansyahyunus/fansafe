# Changelog

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
There are no tagged releases yet — everything below is `Unreleased`.

## [Unreleased]

### Changed

- Toronto's 311 and 211 service label now distinguishes city services from
  community services and makes no police-non-emergency claim.
- The `newyork` pack and the running app now explicitly cover New York City
  only; New Jersey is not represented without separately sourced data.
- Legacy New York/New Jersey localStorage values are migrated safely to the
  `newyork` city id without overwriting an existing New York City pack status.

### Added

- Repository-level open-source and funding-readiness audit
  (`docs/open-source-strategy.md`, `docs/funding-readiness.md`).
- `docs/architecture.md`, `docs/threat-model.md`,
  `docs/content-governance.md`, `docs/pilot-plan.md`.
- Root `README.md`, `LICENSE-PROPOSAL.md`, `NOTICE`, `CONTRIBUTING.md`,
  `CODE_OF_CONDUCT.md`, `SECURITY.md`, `PRIVACY.md`, `GOVERNANCE.md`,
  `ROADMAP.md`, `CITATION.cff`, `TRADEMARK.md`, this `CHANGELOG.md`.
- `.github/ISSUE_TEMPLATE/`, `.github/PULL_REQUEST_TEMPLATE.md`,
  `.github/FUNDING.yml` (draft, inert placeholders), `.github/workflows/ci.yml`.
- `tools/validate-repo.js` (static repo checks) and
  `tools/validate-city-pack.js` (zero-dependency JSON Schema-style validator).
- `tools/validate-gate1.js`, `schemas/service-contact.schema.json`, and
  typed Toronto `services` fields for city/community contacts.
- `schemas/city-pack.schema.json`, `schemas/phrase.schema.json`,
  `schemas/emergency-info.schema.json`.
- `city-packs/<city>/pack.json` + `SOURCES.md` + `REVIEW.md` for the four
  then-current demo cities, extracted as reference artifacts from the data
  already hardcoded in `FanSafe_PWA/index.html`. **At that point the running
  app was unchanged and still used its own inline arrays** — this was
  documentation/tooling, not a behavior change.

### Current implementation boundary

- `FanSafe_PWA/index.html` now renders the typed Toronto services and the
  New York City scope; `FanSafe_Standalone_Prototype.html` remains
  byte-identical to it.
- `sw.js`, `manifest.json`, and the icons were not changed in this release
  preparation.

### Prior history

No git history exists before this entry — the working tree had no `.git`
directory when this audit began. See the Git handoff section of the audit
report for what is proposed for the first real commits.

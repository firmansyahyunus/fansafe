# Changelog

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
There are no tagged releases yet — everything below is `Unreleased`.

## [Unreleased]

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
- `schemas/city-pack.schema.json`, `schemas/phrase.schema.json`,
  `schemas/emergency-info.schema.json`.
- `city-packs/<city>/pack.json` + `SOURCES.md` + `REVIEW.md` for the four
  existing demo cities (Mexico City, Toronto, New York/New Jersey,
  Vancouver), extracted as reference artifacts from the data already
  hardcoded in `FanSafe_PWA/index.html`. **The running app is unchanged and
  still uses its own inline arrays** — this is documentation/tooling, not a
  behavior change.

### Unchanged (explicitly, to avoid ambiguity)

- `FanSafe_PWA/index.html`, `sw.js`, `manifest.json`, and the icons were not
  modified.
- `FanSafe_Standalone_Prototype.html` remains byte-identical to
  `FanSafe_PWA/index.html` (re-verified: `md5sum` matches).
- `FanSafe_PWA/README.md`, `DECISION_LOG.md`, `SCREEN_MAP.md`,
  `STATE_SCHEMA.md`, `TEST_REPORT.md` were not modified.

### Prior history

No git history exists before this entry — the working tree had no `.git`
directory when this audit began. See the Git handoff section of the audit
report for what is proposed for the first real commits.

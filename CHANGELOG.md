# Changelog

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
A local, unpushed annotated tag `v0.1.0-alpha` exists as of 2026-07-19 — see
`docs/RELEASE_NOTES_DRAFT_v0.1.0-alpha.md` (which explains why the exact
commit isn't hardcoded here). No GitHub release has been published and
nothing below has been distributed; everything is still tracked as
`Unreleased` until the owner approves a push and public release.

## [Unreleased]

### Added (2026-07-19 — reusability across multiple programs)

- `docs/programs/` convention: one program-agnostic `KIT.md` reused verbatim
  across applications, a `TEMPLATE.md` for per-application dated records, and
  a `README.md` stating the one-way rule that program requirements may never
  shape product documentation. Adopted after an independent advisory review
  (Claude Fable 5) flagged program-chasing artifacts as undermining FanSafe's
  "built to be useful, not to win a program" positioning.
- `docs/release-evidence/MANUAL_SMOKE_TEST_CHECKLIST.md`: the repeatable
  checklist behind the v0.1.0-alpha manual browser smoke test, to be re-run
  before future tagged releases. Deliberately not wired into CI — doing so
  would require introducing Playwright and a first `package.json`, against
  the documented zero-dependency design; revisit only when a second
  contributor or pilot creates real demand for automated regression coverage.
- Dated addenda in `docs/funding-readiness.md` and
  `docs/BUILDER_PROGRAM_READINESS.md` recording a second-opinion
  reprioritization: DPGA registry fit is closer than previously scored (MIT
  license and ownership documentation, done since, were its hardest stated
  blocker), while the four named startup-credit programs are a poorer fit
  than previously framed (three assume outside equity, a registered company,
  or committed cloud spend).

### Removed (2026-07-19)

- Two root-level AI-agent operating-instruction files
  (`FANSAFE_OPEN_SOURCE_REWARD_SUPER_PROMPT.md`,
  `FANSAFE_PUBLIC_PREVIEW_GATE_1_COMPLETION_PROMPT.md`) untracked and moved
  outside the repository. They were session prompts, not project
  documentation or decision records, and their presence in the public tree
  read as "built to win a program" rather than "built to be useful" per the
  same advisory review above. Content is preserved locally by the
  maintainer; nothing in the tracked tree referenced them.

### Changed

- The repository license is now MIT unless otherwise noted; FanSafe brand and
  icons remain excepted, and the repository makes no copyright claim over
  underlying emergency-number facts.
- Phrase/translation provenance is recorded following an owner attestation of
  AI-assisted creation and maintainer review; all phrase language-quality
  statuses remain truthfully `unreviewed`.
- `phraseBook` is now generated from the schema-validated 17-phrase source
  file by `tools/sync-phrases.js`; all phrase translations remain truthfully
  marked `unreviewed` pending evidenced human review.
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
- Independent human source review (reviewer `SABR`) of all four city packs
  at commit `383a08ebbe337f1f9d43ab5299953cf6038d6316`, recorded in each
  `city-packs/<city>/REVIEW.md`.
- Real-browser smoke-test evidence in
  `docs/release-evidence/v0.1.0-alpha/` — navigation, provenance
  indicators, Toronto taxonomy, New York City scope, trusted-contact
  injection handling, medical-card reveal, reset, offline reload, and both
  the granted- and denied-geolocation paths, with screenshots and recorded
  SHA-256 hashes.

### Verified

- `FanSafe_PWA.zip` rebuilt fresh and confirmed integrity-valid
  (`unzip -t`, 10/10 files) with its `index.html` SHA-256 matching
  `FanSafe_PWA/index.html` exactly at HEAD.

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

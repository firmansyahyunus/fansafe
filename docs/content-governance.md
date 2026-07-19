# Content Provenance and City-Pack Governance

## Current state (evidence)

Today, city-pack content is maintained by the sole maintainer. The 17 phrase
entries were created with AI assistance and then reviewed, edited, and
approved by that maintainer; see `phrases/PROVENANCE.md`. City packs and
phrases are generated into `FanSafe_PWA/index.html` from contributor-side
sources. There is:

- No sourcing citation for any emergency number
- No review process (one author, no reviewer)
- No independent native-speaker or professional language-validation record
  beyond the maintainer's own review
- No versioning beyond a free-text `version`/`updatedAt` string per city pack
  (e.g. `"2026.03"`, `"2026-03-01"`) with no enforced format or effective-date
  semantics
- No expiry/review-date field at all
- No revocation mechanism
- No contributor-attribution field (irrelevant today — single author)

This is a **funding-readiness blocker**, not just a nice-to-have: grant and
DPG-style reviewers explicitly distrust unsourced safety-critical content
(see `docs/funding-readiness.md`).

## Model for when this becomes real (design, not yet implemented in the app)

### Who creates a city pack

Anyone may propose one via pull request. Until a second trusted reviewer
exists, the sole maintainer reviews every submission personally against the
required sources below — this is a real bottleneck and is stated as such in
`GOVERNANCE.md`.

### Required sources

Every emergency number and non-emergency service number **must** cite an
official source (government emergency-services page, official municipal
site, or equivalent) in that pack's `SOURCES.md`. "I looked it up" is not a
citation; a URL and access date are.

### Required review

At minimum one reviewer distinct from the submitter, once the project has
more than one trusted contributor. Until then: the maintainer verifies each
source URL resolves and actually states the claimed number before merge.

### Language validation

A phrase must exist, reviewed by at least one fluent speaker (ideally a
native speaker, disclosed in `REVIEW.md`), for every language the pack
claims to support (`supportedLanguages` in the schema). A phrase present in
only some claimed languages should block merge, not ship with a silent gap.

### Medical/emergency phrase validation

Medical and emergency-category phrases (`category: "emergency" | "medical"`)
require an extra pass: a reviewer checks the phrase is unambiguous under
stress (short, direct, no idioms) — this is a stricter bar than general
navigation/hotel phrases.

### Emergency-number validation

Re-verify against the same official source at every `effectiveDate` review
cycle (see below), not just at initial submission — numbers and services
change.

### Versioning, effective date, expiry/review date, revocation

Defined in `schemas/city-pack.schema.json`:

- `version` — semantic-ish string, bumped on any content change
- `effectiveDate` — when this version became current
- `reviewByDate` — a hard date after which the pack must be re-verified
  before being trusted again (the schema requires this field; the current
  hardcoded `index.html` data does not have it yet — a gap to close when
  Phase 2's runtime extraction happens)
- `revoked` (boolean) — set true to pull a pack from active use without
  deleting its history; the app should refuse to mark a revoked pack as
  "ready offline"

### Offline update

Not yet implemented in the running app — city packs are bundled with the
static file. `docs/architecture.md` Phase 2 describes the path to loading
`city-packs/*/pack.json` at runtime, which is the prerequisite for any
future out-of-band update mechanism. Do not build a signed/remote update
channel before that extraction exists (see `docs/threat-model.md`, "staged
approach").

### Contributor attribution

`city-packs/<city>/REVIEW.md` records who authored and who reviewed each
version. Attribution is for accountability, not licensing — the data itself
is proposed under CC0 (see `LICENSE-PROPOSAL.md`), so attribution is a
courtesy record, not a legal requirement on downstream reusers.

### Licensing

MIT applies to phrase content and the copyrightable organization, structure,
annotations, and presentation of city-pack data. The repository does not
claim copyright over the underlying emergency-number facts. Phrase content
remains `unreviewed` for language-quality purposes. See
`docs/content-licensing-matrix.md` for the authoritative per-category status.

### Automated schema validation

`schemas/city-pack.schema.json`, `schemas/phrase.schema.json`, and
`schemas/emergency-info.schema.json` define the required shape.
`tools/validate-city-pack.js` and `tools/validate-phrases.js` are
zero-dependency validators (no `ajv` or other package, consistent with the
project's no-build-step principle, sharing logic via
`tools/lib/json-schema-lite.js`) that check `city-packs/<city>/pack.json`
and `phrases/*.json` files against them; both run in
`.github/workflows/ci.yml`.

`phrase.schema.json` requires a `reviewStatus` field (added 2026-07-19):
`"unreviewed"`, `"maintainer-authored"`, `"native-speaker-reviewed"`, or
`"professionally-translated"`. Claiming either of the latter two without a
corresponding `reviewedBy` entry is a validation failure, not just a
convention — see `phrases/REVIEW_STATUS.md`.

## Do not claim community-generated content is reliable without review

No pack should be presented in the UI as "verified" or "official" — the
existing "SAMPLE DATA — verify locally" labeling convention
(`DECISION_LOG.md`) should be kept even for reviewed, sourced packs, until a
much more rigorous, funded review process exists. A cited source reduces the
chance of an error; it does not eliminate the traveller's own responsibility
to verify before relying on it in an emergency.

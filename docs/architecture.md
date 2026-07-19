# Architecture

## Current state (evidence)

FanSafe today is a **single static HTML file** —
`FanSafe_PWA/index.html`, 2,198 lines, inline `<style>` and one `<script>`
block, no build step, no package manager, no framework, no external runtime
dependency. Verified: `node --check` on the extracted script body passes;
grep for `<script src=`, `fetch(`, `XMLHttpRequest`, and CDN URLs found
nothing except one client-side-only Google Maps URL string. `manifest.json`
and `sw.js` (43 lines, stale-while-revalidate caching) round out the PWA.
`FanSafe_Standalone_Prototype.html` at the repo root is a byte-identical
copy for `file://` use (confirmed via `md5sum`).

All product data — 4 city packs, 17 phrases × 4 languages across 8
categories, 9 scam-risk signals, 4 travel-document checklist items — is
hardcoded as JS array literals inside the same file
(`const cityPacks = [...]`, `const phraseBook = [...]`, `const riskSignals =
[...]`, around `index.html:1060-1123`). There is no schema, no separate data
file, and no build-time or run-time validation of this data today.

State is `localStorage`-backed, namespaced `fansafe.*`, documented
exhaustively in `FanSafe_PWA/STATE_SCHEMA.md`. There is no versioning field
or migration path for the state shape itself (individual records like city
packs carry their own `version`/`updatedAt` strings, but the `localStorage`
schema as a whole has no version key — a schema change today would silently
break on old stored data unless `safeGet`'s fallback happens to mask it).

## Is it one app or a reusable toolkit today?

**One monolithic application.** Phrase data, city data, safety/scoring logic,
UI rendering, and storage are all in the same file with no module boundary
enforced by tooling (no bundler, no separate files to import). A third party
cannot reuse the phrase engine or city-pack logic without copying and
manually excising code from a 2,198-line file. This is the single largest
architectural gap for the "reusable toolkit" positioning this project wants
to claim (see `docs/open-source-strategy.md`).

## Option assessment

### Option A — keep it a single application repository

Zero migration cost, matches the explicit design principle ("no build step,
no npm install" — `FanSafe_PWA/README.md`). But it caps reuse at
copy-paste, which blocks the DPGA/toolkit positioning and most "reusable
open-source infrastructure" funding criteria (`docs/funding-readiness.md`).

### Option B — full modular monorepo (`apps/`, `packages/`, `schemas/`, etc.)

Would deliver real reuse, but is premature: there is exactly one consumer
(the PWA itself), zero external contributors, and no second integration to
validate the package boundaries against. Building `packages/core`,
`packages/phrase-engine`, `packages/city-pack`, `packages/safety-case`, and
`packages/private-storage` now, with only one real caller, risks the
enterprise-architecture-for-its-own-sake trap the project should avoid.

### Option C — app + separate SDK repositories

Even more premature than B — splitting across repositories multiplies
coordination overhead (versioning, cross-repo issues) for a single-
maintainer project with no other consumers.

### Recommendation: gradual migration, not a rewrite

1. **Now (done this audit):** extract the *shape* of the hardcoded data into
   JSON Schemas (`schemas/city-pack.schema.json`,
   `schemas/phrase.schema.json`, `schemas/emergency-info.schema.json`) and a
   reference JSON extraction (`city-packs/<city>/pack.json`) — without
   touching `index.html`. This documents the seam without committing to an
   architecture prematurely.
2. **Done (Phase 2, step 1, 2026-07-19):** `city-packs/<city>/pack.json` is
   now the single source of truth for city-pack data. `index.html`'s inline
   `cityPacks` array is **generated**, not hand-maintained — a codegen
   step for contributors, not a runtime dependency for end users:
   `tools/sync-city-packs.js` reads and schema-validates every
   `city-packs/<city>/pack.json` and rewrites the literal array in
   `FanSafe_PWA/index.html` and its standalone copy. Deliberately **not** a
   runtime `fetch()`: `city-packs/` lives at the repo root, outside the
   directory `FanSafe_PWA/README.md`'s quick-start serves as the web root,
   and `fetch()` of local JSON is blocked on `file://` in most browsers —
   either would have broken the documented double-click/`file://` path.
   `node tools/sync-city-packs.js --check` runs in CI
   (`tools/validate-repo.js`) to catch drift if a contributor edits one
   without the other.
3. **Still open (Phase 2, step 2):** the same treatment for `phraseBook` —
   `phrases/safety-critical.json` exists as a reference extraction (9 of 17
   phrases, the safety-critical categories) but is not yet wired into a
   sync script or consumed by `index.html`.
4. **Later, only if a second real consumer appears:** consider extracting
   the phrase engine and safety-case scoring logic into a small,
   dependency-free JS module (`packages/core` or similar) that both the PWA
   and a hypothetical second integration import. Do not do this speculatively.

### What should never become a public reusable module

- The medical-card and trusted-contact storage logic should not be
  generalized into a shareable "identity/PII store" package — every
  additional consumer of that code is another surface where the privacy
  invariants in `PRIVACY.md` could be violated by a downstream integrator
  who doesn't share this project's constraints. Keep it application-specific.
- The scam/ticket risk-checker's weighted-signal logic is safety-adjacent
  advice; packaging it for reuse without the surrounding disclaimer UI risks
  it being embedded somewhere that presents it as more authoritative than it
  is (see `docs/threat-model.md`, "content integrity" concerns).

## FanLocal boundary

FanLocal — a possible future marketplace/local-experience-booking module —
is **not implemented anywhere in this repository**, not as a UI tab, not as
a disabled placeholder, not as code. It is mentioned here, once, only to
record the architectural boundary: if FanLocal is ever built, it must be a
separate concern (likely a separate app/repo) that, at most, could later
consume the same extracted `packages/core`-style safety/phrase modules
described above — it must never share the medical-card or trusted-contact
storage, and must never appear in FanSafe's navigation or UI. This paragraph
is the only place FanLocal should be referenced; do not expand on it
elsewhere in this repository.

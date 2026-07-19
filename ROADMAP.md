# Roadmap

Complexity is estimated as S / M / L / XL. This is not a calendar — no phase
has a target date, because none can be committed to honestly with a
single-maintainer, unfunded project.

**Status as of 2026-07-19:** Phase 0 and Phase 1 are complete. Phase 2 is
partially complete (city-pack data; phrase data still pending). Phase 3 and
Phase 4 have not started — both are blocked on real-world facts (a pilot
partner, translation provenance) this repository's own tooling cannot
manufacture.

## Phase 0 — Evidence baseline ✅ Complete

- **Goal:** know the true current state before claiming anything about
  readiness.
- **Delivered:** repository audit (`docs/open-source-strategy.md`), honest
  scoring (updated through Gate 1), this roadmap.
- **Evidence:** `FanSafe_PWA/TEST_REPORT.md`, independently spot-verified
  during the audit and again during Gate 1's browser smoke test
  (`docs/release-evidence/v0.1.0-alpha/`).

## Phase 1 — Credible open-source release ✅ Complete

- **Goal:** a stranger can clone the repo, understand what it is, run it,
  and know how to report a bug or a security issue.
- **Delivered:** `LICENSE` finalized (Apache-2.0, owner-confirmed), root
  `README.md`, `CONTRIBUTING.md`/`CODE_OF_CONDUCT.md`/`SECURITY.md`/
  `PRIVACY.md`, `.github/workflows/ci.yml` + `tools/validate-repo.js` (13+
  check categories), real Git history (15+ commits), a real GitHub remote
  (`github.com/firmansyahyunus/fansafe`, public), branch protection on
  `main`, secret scanning + push protection + Dependabot alerts enabled,
  GitHub Actions pinned to commit SHAs.
- **Acceptance criteria met:** CI passes on GitHub's own runners (not just
  locally) on every push; `git log` shows real, reviewable, individually
  described commits.
- **What's still open from this phase:** none — content-license status
  (city-pack/phrase data) is a deliberate, documented gate, not an
  oversight; see Phase 2.

## Phase 2 — Reusable toolkit ⚠️ Partially complete

- **Goal:** city-pack and phrase data can be extended by a third party
  without touching `index.html`.
- **Delivered (city-pack side, 2026-07-19):** `city-packs/<city>/pack.json`
  is now the actual source of truth — `tools/sync-city-packs.js` generates
  `index.html`'s inline array from it, with a CI drift check. All four
  packs are independently human-reviewed (reviewer `SABR`,
  `city-packs/<city>/REVIEW.md`).
- **Not yet done (phrase side):** the same treatment for `phraseBook`.
  `phrases/safety-critical.json` exists as a reference extraction (9 of 17
  phrases) but has no sync script and is not consumed by `index.html`.
  Tracked as
  [issue #2](https://github.com/firmansyahyunus/fansafe/issues/2).
- **Not started:** phrase/city-pack **content licensing** remains
  deliberately unresolved — translation provenance (who translated each
  phrase, by what method) has never been recorded. This blocks marking
  content reusable under any license, independent of the technical sync
  work above. Tracked as
  [issue #3](https://github.com/firmansyahyunus/fansafe/issues/3) —
  **requires owner input, not something this repository's tooling can
  determine on its own.**
- **What not to do yet:** don't split into a multi-package monorepo
  (Option B, `docs/architecture.md`) until a second real consumer exists.

## Phase 3 — Pilot and impact evidence ❌ Not started

- **Goal:** find out if real people can use FanSafe under realistic
  conditions, not just whether the code runs.
- **Blocked on:** a real pilot partner. `docs/pilot-plan.md` (session
  design) and `docs/PILOT_RECRUITMENT.md` (outreach draft) are ready to
  use the moment one exists — **none has been contacted.** This is
  explicitly not something this repository's tooling can manufacture; it
  requires the owner (or someone the owner authorizes) to reach a real
  community, university, or organization.
- **Complexity:** L (recruitment and facilitation, not code).

## Phase 4 — Funding readiness ❌ Not started

- **Goal:** be a credible applicant for the channels assessed in
  `docs/funding-readiness.md`.
- **Blocked on:** Phase 3 pilot evidence (hard blocker — no funding
  channel in `docs/funding-readiness.md` treats a codebase alone as
  sufficient), plus a resolved content license (Phase 2) for any channel
  that reviews the full artifact, not just the code.
- **What's realistic right now, independent of Phase 3/4:** entering a
  hackathon or civic-tech challenge — see
  `docs/HACKATHON_SUBMISSION_DRAFT.md` and
  `docs/funding-readiness.md`'s "Bottom line." This was flagged as the
  single most immediately realistic channel in the original audit and
  remains true; it just needs the owner to pick an actual open
  competition (this repository has no way to know which ones are
  currently accepting entries).

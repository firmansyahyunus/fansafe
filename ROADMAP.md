# Roadmap

Complexity is estimated as S / M / L / XL. This is not a calendar — no phase
has a target date, because none can be committed to honestly with a
single-maintainer, unfunded project.

## Phase 0 — Evidence baseline (this audit)

- **Goal:** know the true current state before claiming anything about
  readiness.
- **Deliverables:** repository audit (`docs/open-source-strategy.md`),
  honest scoring, this roadmap, removal of any overclaiming language found.
- **Acceptance criteria:** every claim in project docs is traceable to a file,
  test, or command.
- **Evidence:** `FanSafe_PWA/TEST_REPORT.md` (pre-existing, independently
  spot-verified during this audit), this repository's new `docs/` tree.
- **Complexity:** S (audit itself); already largely done by the time this
  roadmap exists.
- **What not to do yet:** don't publish, don't apply for funding.

## Phase 1 — Credible open-source release

- **Goal:** a stranger can clone the repo, understand what it is, run it,
  and know how to report a bug or a security issue.
- **Deliverables:** finalized `LICENSE` (currently only a proposal), root
  `README.md` (done this audit), `CONTRIBUTING.md`/`CODE_OF_CONDUCT.md`/
  `SECURITY.md`/`PRIVACY.md` (done this audit), a real CI workflow running
  the static checks that were previously only manual (done this audit —
  `.github/workflows/ci.yml` + `tools/validate-repo.js`), Git history
  actually initialized (currently **there is no `.git` directory at all**).
- **Acceptance criteria:** CI passes on a clean clone; `git log` shows
  real, reviewable commits instead of a single opaque drop.
- **Dependencies:** owner confirms license (see `LICENSE-PROPOSAL.md`).
- **Complexity:** M.
- **What not to do yet:** don't add automated tests beyond static
  validation — there's no test framework decision made yet, and picking one
  before Phase 2's architecture split would mean re-writing tests against a
  different module boundary almost immediately.

## Phase 2 — Reusable toolkit

- **Goal:** city-pack and phrase data can be extended by a third party
  without touching `index.html`, and the safety/phrase logic is at least
  documented as a seam even if not yet physically extracted into packages.
- **Deliverables:** `schemas/*.schema.json` (done this audit, drafted from
  the current hardcoded shapes), `city-packs/<city>/pack.json` +
  `SOURCES.md` + `REVIEW.md` reference extraction (done this audit, **not
  yet wired into the running app** — `index.html` still uses its own
  hardcoded arrays), `tools/validate-city-pack.js` (done this audit). Actual
  runtime extraction (making `index.html` load `city-packs/*/pack.json`
  instead of its inline array) is **not done** and is the next real
  engineering task.
- **Acceptance criteria:** `index.html` fetches or bundles city-pack data
  from `city-packs/` instead of a hardcoded array, with `tools/validate-city-
  pack.js` passing in CI for every pack.
- **Complexity:** M (the schema/reference work is done; the runtime wiring
  is the remaining M-sized piece).
- **What not to do yet:** don't split into a multi-package monorepo
  (Option B from `docs/architecture.md`) until there's a second real
  consumer of the extracted modules — one app doesn't justify package
  boundaries yet.

## Phase 3 — Pilot and impact evidence

- **Goal:** find out if real people can use FanSafe under realistic
  conditions, not just whether the code runs.
- **Deliverables:** executed pilot per `docs/pilot-plan.md` (10–30 users),
  a public summary of what was learned, issues filed from real feedback.
- **Acceptance criteria:** at least one documented pilot session with
  before/after readiness-score or task-completion evidence, and a public
  summary that does not overclaim beyond what was observed.
- **Dependencies:** Phase 1 complete (so participants aren't testing an
  unlicensed, undocumented repo); a recruitment channel identified — **no
  pilot partner exists today** (see `docs/pilot-plan.md`, "Remaining
  decisions").
- **Complexity:** L (recruitment and facilitation, not code).
- **What not to do yet:** don't add analytics/telemetry to "measure" the
  pilot — use the observation methods in `docs/pilot-plan.md` instead.

## Phase 4 — Funding readiness

- **Goal:** be a credible applicant for the channels assessed in
  `docs/funding-readiness.md`, not just theoretically eligible for them.
- **Deliverables:** sponsor profile / funding page, an Open Collective
  decision (join a fiscal host or not — requires the human owner), a grant
  dossier reusing evidence from Phase 3, a partner deck, this roadmap kept
  current.
- **Acceptance criteria:** at least one funding-channel prerequisite from
  `docs/funding-readiness.md` fully met with cited evidence (not just "we
  could apply").
- **Dependencies:** Phase 3 pilot evidence; a license and (if pursuing
  Sovereign Tech Fund or DPGA) clear, documented ownership.
- **Complexity:** XL (this is the phase most gated by real-world facts this
  audit cannot manufacture).
- **What not to do yet:** don't submit a grant application or enable GitHub
  Sponsors/create an Open Collective until the human owner explicitly
  decides to — this roadmap documents the path, it does not execute it.

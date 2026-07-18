# Public Release Checklist — Gate 0

Prepared, not executed. This document exists so the maintainer can decide
when to actually flip the repository to public — it does not do that
itself (see `README.md`'s status banner and the boundaries in the super
prompt this work followed: no push, no visibility change, no release
publish without explicit approval).

**Classification note:** this session's work was independently sanity-
checked (advisory consult, 2026-07-19). The verdict: the readiness label
should stay one notch conservative — "credible public repository,
release-candidate for public preview" rather than "public preview"
outright — until two specific, cheap items clear (see items 12 and 13
below). The reasoning: for a safety app, emergency-number sourcing is the
load-bearing content, and it has so far only been checked by the same
process that audited the repository, not by an independent second person.
That distinction matters more here than generic caution about AI-authored
content would elsewhere.

## Gate 0 scope (this session, 2026-07-19)

The objective was moving from "credible local open-source repository
candidate" to "safe public-preview repository candidate." Below, each item
is marked from actual evidence produced this session — not aspirationally.

| # | Item | Status | Evidence |
|---|---|---|---|
| 1 | Code ownership confirmed | ✅ Done | User decision, this session: "Saya adalah pemilik repository dan kode FanSafe." |
| 2 | Code license finalized | ✅ Done | `LICENSE` (Apache-2.0), `NOTICE`, `docs/content-licensing-matrix.md` |
| 3 | Content (city-pack/phrase) license status resolved | ⚠️ Deliberately unresolved | Owner instruction: do not license until provenance verified. Status documented, not silently assumed — see `LICENSE-PROPOSAL.md` |
| 4 | Security/Code of Conduct contact confirmed | ✅ Done | `moonwalkingpenguins@gmail.com` in `SECURITY.md`, `CODE_OF_CONDUCT.md`; `tools/validate-repo.js` enforces no leftover "placeholder" wording |
| 5 | Emergency-number provenance checked against official sources | ✅ Done, with caveats | `city-packs/<city>/SOURCES.md` — 3/4 packs fully matched, Toronto has a scope gap, New York has an unverified New Jersey claim; **no second human has independently reviewed any of it** |
| 6 | Phrase content review status tracked | ✅ Done | `phrases/safety-critical.json` + `REVIEW_STATUS.md` — all 9 safety-critical phrases explicitly marked `"unreviewed"` |
| 7 | Known XSS/unsafe-rendering gap closed | ✅ Done | `docs/threat-model.md` T3 — 1 real gap found (`renderContacts()` avatar initials) and fixed; all 24 `innerHTML` sites in `index.html` classified |
| 8 | Public-preview provenance visible in-app | ✅ Done | City-pack review-status pill (Safety screen), pack card detail text (Travel screen), phrase-review note (Translate screen) — **not yet interactively browser-verified**, see `TEST_REPORT.md` §4 |
| 9 | Automated validation extended | ✅ Done | `tools/validate-repo.js` — 12 check categories, all passing; synthetic negative-fixture tests confirmed each new check actually fails on bad input |
| 10 | Public README rewritten for a public audience | ✅ Done | `README.md` — functional vs. simulated table, limitations, privacy model, supported cities/languages, quick-start, offline behavior, validation commands, contributing, security, provenance, non-affiliation, roadmap, pilot participation, maturity classification |
| 11 | Pilot partner secured | ❌ Not done | User decision: "NONE YET." `docs/PILOT_RECRUITMENT.md` prepared but not executed |
| 12 | Interactive browser re-verification of this session's UI changes | ❌ Not done | Browser automation unavailable in this session (background job, no connected Chrome extension) — flagged, not silently skipped |
| 13 | Independent (second-person) review of sourced emergency data | ❌ Not done | Automated sourcing pass ≠ independent human confirmation — see every city's `REVIEW.md` |
| 14 | Git remote configured | ❌ Not done | No remote configured; not in this session's scope (explicitly deferred to the "remaining decisions" list) |
| 15 | Repository made public | ❌ Not done | Explicitly out of scope without further approval, per user instruction |

## What "credible public repository, release-candidate for public preview" means given the above

This repository already lets a stranger:

- Understand what FanSafe actually does and doesn't do (✅ — README)
- Know what's licensed and what isn't, without guessing (✅ — LICENSE + content-licensing-matrix)
- Reach the maintainer for security issues (✅)
- See that emergency data is sourced, while being told clearly it isn't
  independently reviewed yet (✅ — this is honestly represented, not
  overclaimed)
- Run the app and validate any content changes themselves (✅ — quick-start
  + `tools/validate-repo.js`)

It should **not** yet be called "public preview" outright, and should
**not** imply:

- That the emergency-number sourcing has been independently confirmed
  (items 12–13 above — the specific, cheap gate to the next tier)
- That the project is ready for meaningful external contribution volume
  (no contributor has ever used `CONTRIBUTING.md`)
- That the project is pilot-ready (no partner, no session run)
- That the project is sponsor- or grant-ready (see
  `docs/funding-readiness.md` — unchanged by this session's work, since
  funding readiness needs pilot evidence this session could not manufacture)

## Next gate (Gate 1) — not started

Would include: interactive browser re-verification, a second-person review
pass on `city-packs/*/SOURCES.md`, resolving the New York/New Jersey scope
gap and Toronto's police-non-emergency gap, and — only after the owner
decides — configuring a Git remote and flipping repository visibility.

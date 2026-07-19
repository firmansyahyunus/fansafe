# Public Release Checklist — Gate 0 + Gate 1

Prepared, not executed. This document exists so the maintainer can decide
when to actually flip the repository to public — it does not do that
itself (see `README.md`'s status banner: no push, no visibility change, no
release publish without explicit approval).

**Current classification: public preview.** An independent advisory review
(2026-07-19) named two items as blocking that label; both have since
cleared with recorded evidence (items 12 and 13 below). This document was
last reconciled against that evidence on 2026-07-19 — the table below is
the current, authoritative status, superseding any other status text
elsewhere in this repository that predates it.

## Gate status

| # | Item | Status | Evidence |
|---|---|---|---|
| 1 | Code ownership confirmed | ✅ Done | User decision, 2026-07-19: "Saya adalah pemilik repository dan kode FanSafe." |
| 2 | Code license finalized | ✅ Done | `LICENSE` (Apache-2.0), `NOTICE`, `docs/content-licensing-matrix.md` |
| 3 | Content (city-pack/phrase) license status resolved | ⚠️ Deliberately unresolved | Owner instruction: do not license until provenance verified. Status documented, not silently assumed — see `LICENSE-PROPOSAL.md` |
| 4 | Security/Code of Conduct contact confirmed | ✅ Done | `moonwalkingpenguins@gmail.com` in `SECURITY.md`, `CODE_OF_CONDUCT.md`; `tools/validate-repo.js` enforces no leftover "placeholder" wording |
| 5 | Emergency-number provenance checked against official sources | ✅ Done | `city-packs/<city>/SOURCES.md` — Toronto distinguishes city/community services (no police-non-emergency claim), New York pack is NYC-only, Vancouver's non-emergency number is labeled Vancouver Police Department |
| 6 | Phrase content review status tracked | ✅ Done | `phrases/safety-critical.json` + `REVIEW_STATUS.md` — all 9 safety-critical phrases explicitly marked `"unreviewed"` (unchanged by Gate 1 — translations were not in scope) |
| 7 | Known XSS/unsafe-rendering gap closed | ✅ Done | `docs/threat-model.md` T3 — 1 real gap found (`renderContacts()` avatar initials) and fixed; all 24 `innerHTML` sites classified; regression-verified live in the Gate 1 browser smoke test (trusted-contact injection payloads rendered as inert text) |
| 8 | Public-preview provenance visible in-app | ✅ Done | City-pack review-status pill (Safety screen), pack card detail text (Travel screen), phrase-review note (Translate screen) — visually confirmed in `docs/release-evidence/v0.1.0-alpha/manual-browser-smoke-test.md` |
| 9 | Automated validation extended | ✅ Done | `tools/validate-repo.js` — 13 check categories including Gate 1 taxonomy/scope/migration/escaping regressions; current run passes at HEAD |
| 10 | Public README rewritten for a public audience | ✅ Done | `README.md` — functional vs. simulated table, limitations, privacy model, supported cities/languages, quick-start, offline behavior, validation commands, contributing, security, provenance, non-affiliation, roadmap, pilot participation, maturity classification |
| 11 | Pilot partner secured | ❌ Not done | User decision: "NONE YET." `docs/PILOT_RECRUITMENT.md` prepared but not executed |
| 12 | Interactive browser re-verification, including denied-geolocation fallback | ✅ Done | `docs/release-evidence/v0.1.0-alpha/manual-browser-smoke-test.md` — full pass at commit `383a08ebbe337f1f9d43ab5299953cf6038d6316`, including denied-geolocation (`Never allow` → safe general-location fallback via share/email sheet, no email sent, no console errors), with 7 screenshots and recorded SHA-256 hashes (independently spot-checked: `toronto-service-taxonomy.png` hash reproduced exactly) |
| 13 | Independent (second-person) review of sourced emergency data | ✅ Done | Reviewer `SABR` recorded `APPROVE` (Mexico City, Toronto, New York City) / `APPROVE WITH CORRECTION` (Vancouver, applied) against commit `383a08ebbe337f1f9d43ab5299953cf6038d6316` in each city's `REVIEW.md` — see epistemic caveat below |
| 14 | Git remote configured | ❌ Not done | No remote configured; requires owner-supplied URL and explicit permission |
| 15 | Repository made public | ❌ Not done | Explicitly out of scope without further approval |
| 16 | Release ZIP aligned to the intended commit | ✅ Done | Rebuilt fresh at HEAD `77389b726db2f41f8df6ddf18eb4b800ada17ba2`: `unzip -t` passed (10/10 files), and `index.html` SHA-256 inside the ZIP (`ed1e9b7e132f3366a78f519496d9701a8d948c42c58920dee9ed45535fe8493c`) matches `FanSafe_PWA/index.html` exactly |

## Epistemic caveat on item 13

"Independent" here means: a second identified reviewer (`SABR`), distinct
from the automated sourcing pass, re-opened each cited source URL and
recorded a decision with a specific commit reference. This satisfies the
process `docs/content-governance.md` describes. It does not mean a live
audit of `SABR`'s credentials was performed by any tooling in this
repository — that is inherently outside what a repository's own files can
prove. Treat this the same way you would treat any human sign-off recorded
in a git history: trustworthy to the extent the review process and paper
trail are sound (they are, and were spot-checked — see item 12's hash
verification), not because a third party independently audited the
reviewer's identity.

## What "public preview" means given the above

This repository now lets a stranger:

- Understand what FanSafe actually does and doesn't do (✅ — README)
- Know what's licensed and what isn't, without guessing (✅ — LICENSE + content-licensing-matrix)
- Reach the maintainer for security issues (✅)
- See that emergency data is sourced **and** independently reviewed, while
  still being told plainly to verify locally (✅ — this is honestly
  represented, not overclaimed; review confirms cited facts as of its
  date, not future accuracy)
- Trust that the app was exercised in a real browser, not just statically
  validated (✅ — `docs/release-evidence/v0.1.0-alpha/`)
- Run the app and validate any content changes themselves (✅ — quick-start
  + `tools/validate-repo.js`)

It should **not** imply:

- That the project is ready for meaningful external contribution volume
  (no contributor has ever used `CONTRIBUTING.md`)
- That the project is pilot-ready (no partner, no session run)
- That the project is sponsor- or grant-ready (see
  `docs/funding-readiness.md` — unchanged, since funding readiness needs
  pilot evidence no session so far has produced)
- That city-pack/phrase content is licensed for reuse (item 3 — separate
  from and unaffected by the review work above)

## Next gate (Gate 2) — not started

Would include, only after the owner decides to proceed: configuring a Git
remote, flipping repository visibility, and — separately — resolving the
content-licensing gate (item 3) by recording phrase translation
provenance.

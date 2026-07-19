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
outright — until independent human source review and the remaining browser
fallback check clear (see items 12 and 13 below). The reasoning: for a safety app, emergency-number sourcing is the
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
| 5 | Emergency-number provenance checked against official sources | ✅ Done, with caveats | `city-packs/<city>/SOURCES.md` — Toronto now distinguishes city/community services and the New York pack is NYC-only; **no second human has independently reviewed any source** |
| 6 | Phrase content review status tracked | ✅ Done | `phrases/safety-critical.json` + `REVIEW_STATUS.md` — all 9 safety-critical phrases explicitly marked `"unreviewed"` |
| 7 | Known XSS/unsafe-rendering gap closed | ✅ Done | `docs/threat-model.md` T3 — 1 real gap found (`renderContacts()` avatar initials) and fixed; all 24 `innerHTML` sites in `index.html` classified |
| 8 | Public-preview provenance visible in-app | ✅ Done | City-pack review-status pill (Safety screen), pack card detail text (Travel screen), and phrase-review note — visually confirmed in `docs/release-evidence/v0.1.0-alpha/manual-browser-smoke-test.md` |
| 9 | Automated validation extended | ✅ Done | `tools/validate-repo.js` — 13 check categories, including the Gate 1 taxonomy, scope, migration, and trusted-contact regression checks; current run passes |
| 10 | Public README rewritten for a public audience | ✅ Done | `README.md` — functional vs. simulated table, limitations, privacy model, supported cities/languages, quick-start, offline behavior, validation commands, contributing, security, provenance, non-affiliation, roadmap, pilot participation, maturity classification |
| 11 | Pilot partner secured | ❌ Not done | User decision: "NONE YET." `docs/PILOT_RECRUITMENT.md` prepared but not executed |
| 12 | Interactive browser re-verification of this session's UI changes | ⚠️ Partially done | `docs/release-evidence/v0.1.0-alpha/manual-browser-smoke-test.md` — provenance, taxonomy, scope, injection, medical-card, reset, and offline checks passed; denied-geolocation fallback remains unverified |
| 13 | Independent (second-person) review of sourced emergency data | ❌ Not done | Automated sourcing pass ≠ independent human confirmation — see every city's `REVIEW.md` |
| 14 | Git remote configured | ❌ Not done | No remote configured; not in this session's scope (explicitly deferred to the "remaining decisions" list) |
| 15 | Repository made public | ❌ Not done | Explicitly out of scope without further approval, per user instruction |
| 16 | Release ZIP aligned to the intended commit | ❌ Not done | `unzip -t FanSafe_PWA.zip` passes, but its `index.html` hash differs from `FanSafe_PWA/index.html`; regenerate the git-ignored ZIP immediately before any approved release |

### Source-review decision update (2026-07-19)

Human-review decisions were supplied for all four city packs: Mexico City,
Toronto, and New York City were marked `APPROVE`; Vancouver was marked
`APPROVE WITH CORRECTION`. The Vancouver correction is applied. However, every
submitted record now identifies reviewer `SABR`, but the reviewed commit is
still a literal placeholder. Item 13 therefore remains open: the reviewer must
record that commit before the decisions can count as auditable, independent
confirmation.

## Gate 1 completion update (2026-07-19)

This update supersedes the earlier table's preliminary status for items 5, 12,
and 13. SABR independently reviewed all four city packs at commit
`383a08ebbe337f1f9d43ab5299953cf6038d6316`; the four `REVIEW.md` files and
release evidence record the approvals. The manual tester also recorded a
denied-geolocation fallback pass for that commit. Safety-critical translations
remain deliberately `unreviewed`.

Items 14-16 remain outside this completion update: no remote or publication is
authorized, and the ZIP must be regenerated from the final release candidate
before any distribution.

## Release bundle verification update (2026-07-19)

`FanSafe_PWA.zip` was regenerated from the application files at commit
`f08b4987e04be1e239a990876dbbc957d5b1ffbb`. `unzip -t` passed and its
`index.html` SHA-256 matched `FanSafe_PWA/index.html`:

```text
ED1E9B7E132F3366A78F519496D9701A8D948C42C58920DEE9ED45535FE8493C
```

This closes the packaging-evidence portion of item 16. It does not authorize
distribution, remote configuration, a release, or a visibility change.

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
  (item 13 remains the principal data-safety gate)
- That the project is ready for meaningful external contribution volume
  (no contributor has ever used `CONTRIBUTING.md`)
- That the project is pilot-ready (no partner, no session run)
- That the project is sponsor- or grant-ready (see
  `docs/funding-readiness.md` — unchanged by this session's work, since
  funding readiness needs pilot evidence this session could not manufacture)

## Next gate (Gate 1) — in progress

Would include: completing the denied-geolocation fallback check, a
second-person review pass on `city-packs/*/SOURCES.md`, and — only after the
owner decides — configuring a Git remote and flipping repository visibility.

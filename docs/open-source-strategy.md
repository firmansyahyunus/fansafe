# Open-Source and Funding Readiness Strategy

This is the central audit document. It scores FanSafe honestly, selects a
positioning, and records the gap matrix that justified every change made in
this repository during this audit. Read this before assuming FanSafe is
further along than it is.

Two sets of scores are given: **pre-audit** (the state found when this audit
began — no root README, no license, no CI, no `.git` directory at all) and
**post-audit** (after the changes described in the Git handoff section of the
final report). Scores did not move on categories that documentation alone
cannot move — that is intentional, not an oversight.

## 7.1 Open-source project readiness (100 pts)

### Product usefulness and differentiation — 8/12 (pre: 8/12, unchanged)

- **Evidence:** `FanSafe_PWA/DECISION_LOG.md` documents genuinely
  differentiated product choices (empty first-run state instead of a fake
  pre-seeded persona; "copied/opened share sheet" wording instead of
  "sent"/"delivered"; medical-card reveal friction removed specifically
  inside the emergency sheet). These are non-obvious, evidence of real
  product thinking, not template output.
- **Missing evidence:** no external user has confirmed this differentiation
  matters to them (see Adoption below).
- **Confidence:** high (the differentiation is directly readable in code and
  decision log, independent of any claim).
- **Action to improve:** none available from documentation alone — this
  requires Phase 3 pilot evidence that real users value these choices.

### Repository reproducibility — 8/10 (pre: 6/10 → post: 8/10)

- **Evidence:** zero dependencies, zero build step (verified: no
  `package.json`, no bundler config, `node --check` passes on the extracted
  script); `python -m http.server` or a double-click is genuinely sufficient
  (verified via `FanSafe_PWA/README.md` instructions, consistent with actual
  file structure).
- **Missing evidence:** not tested by this audit on a machine without Python
  or Node preinstalled; no CI previously existed to prove reproducibility
  outside the maintainer's own machine.
- **Confidence:** high for the "no build step" claim; medium for "works on
  any machine" until CI actually runs it.
- **Action taken this audit:** added root `README.md` with the run
  instructions surfaced immediately, and `.github/workflows/ci.yml` +
  `tools/validate-repo.js`, which now proves reproducibility on every push
  via a clean GitHub Actions runner instead of only the maintainer's machine.

### Architecture and reusability — 4/12 (pre: 3/12 → post: 4/12)

- **Evidence:** all product data and logic in one 2,198-line file
  (`FanSafe_PWA/index.html`); no schema, no module boundary enforced by
  tooling.
- **Missing evidence:** no second real consumer exists anywhere to validate
  any proposed extraction against.
- **Confidence:** high — this is directly observable, not inferred.
- **Action taken this audit:** documented the seam (`schemas/*.schema.json`,
  reference `city-packs/*/pack.json` extraction, `docs/architecture.md`
  Option A/B/C assessment) **without** changing the running app. This moves
  the score only slightly because the runtime is unchanged — the score will
  not meaningfully improve until Phase 2's actual runtime wiring happens.
- **Action still required:** make `index.html` load city-pack data from
  `city-packs/*/pack.json` instead of its inline array (`docs/architecture.md`,
  Phase 2).

### Documentation and contributor experience — 8/10 (pre: 5/10 → post: 8/10)

- **Evidence:** `FanSafe_PWA/` already had unusually good internal docs
  (README, DECISION_LOG, SCREEN_MAP, STATE_SCHEMA, TEST_REPORT) before this
  audit — above average for a prototype. What was missing was anything at
  the repository root: no top-level README, no CONTRIBUTING, no onboarding
  path for a stranger landing on the repo.
- **Missing evidence:** no external contributor has actually followed
  `CONTRIBUTING.md` yet to confirm it's sufficient.
- **Confidence:** high for what exists; unverified for "sufficient for a
  first-time contributor" until one actually shows up.
- **Action taken this audit:** added root `README.md`, `CONTRIBUTING.md`.

### Testing and technical quality — 7/10 (pre: 5/10 → post: 7/10)

- **Evidence:** `TEST_REPORT.md`'s claims were independently spot-checked
  during this audit and confirmed accurate (180 unique HTML ids / 0
  duplicates — reproduced exactly; 174 of 178 referenced ids resolve against
  static HTML, with the same 4 `innerHTML`-injected exceptions named in the
  report; `node --check` passes on the extracted script). This is
  unusually rigorous, honest documentation for a prototype.
- **Missing evidence:** no automated test suite beyond static checks; the
  interactive browser testing in `TEST_REPORT.md` was a one-time manual
  session, not a repeatable regression suite.
- **Confidence:** high (independently reproduced, not taken on faith).
- **Action taken this audit:** `tools/validate-repo.js` +
  `.github/workflows/ci.yml` automate exactly the static checks that were
  previously manual-only, so they now run on every push instead of once.
- **Action still required:** ~~an automated interactive/regression test~~
  **(Gate 1 update, 2026-07-19):** a manual (not yet automated/CI-wired)
  Playwright-driven browser session exercised navigation, the emergency
  action sheet, medical-card reveal, reset, offline reload, and both
  geolocation paths, with screenshots — see
  `docs/release-evidence/v0.1.0-alpha/manual-browser-smoke-test.md`. This
  closes the "never interactively tested" gap for this specific run but is
  still a one-time manual session, not a repeatable CI regression suite —
  that remains a genuine future improvement.

### Security, safety, and privacy — 11/14 (pre: 8/14 → post: 11/14)

- **Evidence:** geolocation requested only after explicit click
  (`shareLocation()`), coordinates never persisted (`buildLocationMessage()`
  builds a one-off string), medical card hidden-by-default with in-memory-
  only reveal state, reset function scoped exactly to `fansafe.*` keys,
  zero analytics/telemetry, zero third-party network calls (all verified by
  direct source inspection during this audit, not assumed from docs).
- **Missing evidence:** no independent security review beyond this audit's
  own reading; no automated XSS/injection test; no PIN/lock beyond
  hide-by-default (a deliberate, documented trade-off, not an oversight).
- **Confidence:** high for the behaviors listed (directly verified in
  source); medium for "no other undiscovered issue exists" (a single read-
  through is not a full security audit).
- **Action taken this audit:** `SECURITY.md`, `PRIVACY.md`,
  `docs/threat-model.md` — formalizing behavior that previously existed only
  as scattered code comments and `DECISION_LOG.md` entries.
- **Action still required:** ~~an XSS/injection-focused review~~ **(Gate 1
  update, 2026-07-19):** all 24 `innerHTML` sites were audited by input
  source; one real unescaped user-controlled sink was found and fixed
  (`renderContacts()` avatar initials), then regression-verified live with
  actual injection payloads (`<img src=x onerror=alert(1)>`, `<script>`,
  raw `< > " ' &`) in a real browser — all rendered as inert text. See
  `docs/threat-model.md` T3. A lint rule to catch *future* unsafe
  `innerHTML` usage still does not exist beyond `tools/validate-repo.js`'s
  heuristic scan.

### Content provenance and city-pack governance — 4/10 (pre: 1/10 → post: 4/10)

- **Evidence:** pre-audit, city/phrase data was hardcoded with only a
  generic "SAMPLE DATA — verify locally" UI label and no sourcing, review,
  versioning, or expiry model at all.
- **Missing evidence:** the new `SOURCES.md`/`REVIEW.md` templates created
  this audit are templates, not actually-sourced official citations for the
  four demo cities' numbers — that citation work was not done, because it
  requires a human to verify against a live official government source,
  which this audit did not fabricate.
- **Confidence:** high that the framework is now documented; high that the
  underlying demo data is still unsourced (both directly checked).
- **Action taken this audit:** `docs/content-governance.md`,
  `schemas/city-pack.schema.json` etc., `tools/validate-city-pack.js`,
  reference `city-packs/<city>/pack.json` + `SOURCES.md` + `REVIEW.md`.
- **Action still required:** ~~a human actually cites official sources~~
  **(Gate 1 update, 2026-07-19):** official sources were cited for all
  four cities (`city-packs/<city>/SOURCES.md`), then independently
  re-verified by a second reviewer (`SABR`) against commit
  `383a08ebbe337f1f9d43ab5299953cf6038d6316` — see each city's `REVIEW.md`.
  Two real content gaps were found and fixed in the same pass: Toronto's
  non-emergency numbers were relabeled as city/community services (not
  police-specific), and the "New York/New Jersey" pack was narrowed to
  New York City only. Sample-data UI labeling is unchanged and intentional
  — review confirms cited facts as of the review date, not future
  accuracy.

### Licensing and legal clarity — 4/8 (pre: 0/8 → post: 4/8)

- **Evidence:** no `LICENSE` file existed before this audit.
- **Missing evidence:** ownership of the codebase and content has not been
  confirmed by the repository owner to this audit (a valid open question
  per the audit's own rules — see the final report's "Remaining decisions").
- **Confidence:** high that the gap existed; the recommendation itself is
  a judgment call (cross-checked with a second-opinion consult — see
  `LICENSE-PROPOSAL.md`), not yet a legal fact.
- **Action taken this audit:** `LICENSE-PROPOSAL.md`, `NOTICE`,
  `TRADEMARK.md` — a clearly-labeled draft, not a finalized grant, per this
  audit's explicit instruction not to finalize licensing without approval.
- **Action still required:** owner confirmation, then promote the proposal
  to an actual `LICENSE` file.

### Community and governance — 4/6 (pre: 0/6 → post: 4/6)

- **Evidence:** no `CODE_OF_CONDUCT.md` or `GOVERNANCE.md` existed before.
- **Missing evidence:** zero actual community exists to test whether the
  documented single-maintainer model holds up under real contribution
  volume.
- **Confidence:** high that the documents are now present and specific to
  this project (not generic boilerplate — e.g., `GOVERNANCE.md` names the
  exact triggers for revisiting the model).
- **Action taken this audit:** `CODE_OF_CONDUCT.md`, `GOVERNANCE.md`.
- **Action still required:** revisit when a second contributor appears, per
  `GOVERNANCE.md`'s own stated triggers.

### Adoption and impact evidence — 1/8 (pre: 0/8 → post: 1/8)

- **Evidence:** zero users, zero pilots, zero external feedback, no public
  roadmap existed before this audit.
- **Missing evidence:** everything — this category cannot be improved by
  documentation.
- **Confidence:** high (absence is straightforward to confirm — no issue
  tracker activity, no linked deployments, no roadmap).
- **Action taken this audit:** `ROADMAP.md` and `docs/pilot-plan.md` make a
  credible plan visible — worth exactly one point, because a plan is not
  evidence.
- **Action still required:** actually run the Phase 3 pilot.

**Open-source project readiness total: 59/100** (pre-audit: 38/100)

## 7.2 Reward and funding readiness (100 pts)

### Clear public-benefit positioning — 7/12 (pre: 3/12 → post: 7/12)

- **Evidence:** the privacy/safety design choices are real (see 7.1,
  Product usefulness); pre-audit, nothing articulated this as a public-
  benefit case anywhere in the repo.
- **Missing evidence:** no external validation that this framing resonates
  with funders or users.
- **Confidence:** medium — the positioning choice itself required judgment
  (see Section 8 below).
- **Action taken:** this document, `README.md`, `docs/funding-readiness.md`.

### Reusable open-source infrastructure — 4/14 (pre: 1/14 → post: 4/14)

- Same evidence/gap as "Architecture and reusability" above — heavily
  weighted here because most infrastructure-focused funders explicitly
  check for this. Score reflects that schemas/reference extraction exist
  but nothing is wired into the running app yet.
- **Action still required:** Phase 2 runtime wiring (`docs/architecture.md`).

### Maintainer and governance credibility — 4/10 (pre: 2/10 → post: 4/10)

- **Evidence:** `GOVERNANCE.md` now documents a specific, honest single-
  maintainer model with named triggers for change — more credible than
  silence, but a documented model is not a track record.
- **Missing evidence:** no history of this maintainer sustaining another
  open-source project is evidenced anywhere in this repository (may exist
  elsewhere — out of scope for a repository-local audit).
- **Confidence:** high for what's documented; cannot assess maintainer
  history from this repo alone.
- **Action still required:** none available from repository content alone.

### Product maturity — 5/10 (unchanged — this is about the app, not paperwork)

- **Evidence:** working, honestly-tested prototype; `TEST_REPORT.md`
  explicitly lists major untested paths (audio playback, live speech
  recognition, geolocation success/denial, screen readers, and
  cross-browser/cross-device; one HeadlessChrome offline reload smoke check
  exists but is not broader offline compatibility evidence).
- **Missing evidence:** all of the above "not tested" items.
- **Confidence:** high (directly from the test report, independently spot-
  checked).
- **Action to improve:** close the untested gaps listed in `TEST_REPORT.md`
  — none of this was in scope for a documentation-focused audit.

### Safety and privacy maturity — 8/12 (pre: 6/12 → post: 8/12)

- Same evidence as 7.1 Security row. Weighted higher here because funders
  in this specific space (public-interest tech, humanitarian) weigh it more.
- **Action taken:** `docs/threat-model.md`, `PRIVACY.md`.
- **Action still required:** the T3 (XSS/injection) gap noted above.

### Evidence of users or pilots — 0/14 (unchanged)

- **Evidence:** none exists.
- **Confidence:** high (straightforward absence).
- **Action to improve:** run the Phase 3 pilot — nothing else moves this.

### Measurable impact — 0/10 (unchanged)

- **Evidence:** no telemetry, no usage measurement (by deliberate privacy-
  preserving design, per `PRIVACY.md`) — zero impact data of any kind exists.
- **Action to improve:** execute `docs/pilot-plan.md`'s privacy-preserving,
  facilitator-observed metrics; do not add telemetry to "solve" this.

### Funding-channel fit — 4/8 (pre: 2/8 → post: 4/8)

- **Evidence:** `docs/funding-readiness.md` now documents which channels
  are realistic near-term (hackathons/challenges) versus poor-fit
  (Sovereign Tech Fund, GitHub Secure Open Source Fund) versus long-term
  plausible (DPGA).
- **Action still required:** actually enter a competition (Phase 4).

### Sustainability model — 2/6 (pre: 0/6 → post: 2/6)

- **Evidence:** `GOVERNANCE.md` and `ROADMAP.md` Phase 4 sketch a possible
  future hosted/consulting model and sponsor profile — a sketch, not a
  functioning model.
- **Action to improve:** requires real revenue-generating decisions the
  human owner has not made.

### Legal and operational readiness — 1/4 (pre: 0/4 → post: 1/4)

- **Evidence:** `LICENSE-PROPOSAL.md` exists but is explicitly unfinalized;
  no legal entity exists.
- **Action to improve:** owner confirmation of ownership and license.

**Reward and funding readiness total: 35/100** (pre-audit: 19/100)

## Section 8 — Positioning

Evaluated all five candidate positions against differentiation, long-term
relevance, community appeal, grant compatibility, corporate-sponsor
compatibility, risk of being too broad, risk of trademark/official-
association confusion, and evidence required. Cross-checked with an
independent advisory consult (Claude Fable 5, 2026-07-18) before deciding.

| Position | Differentiation | Grant fit | Overclaim risk | Trademark/confusion risk |
|---|---|---|---|---|
| 1. "Open-source World Cup supporter safety app" | High (concrete hook) | Medium (event-bound) | Medium | **High** — invites assumption of FIFA affiliation, which `TRADEMARK.md` explicitly denies |
| 2. "Offline-first safety companion for international travellers" | Medium-high | Medium-high | Low | Low |
| 3. "Open multilingual safety toolkit for large public events" | Medium | Medium | Medium (vague "for whom") | Low |
| 4. "Privacy-preserving travel safety infrastructure" | Medium | Medium-high (infra framing appeals to some funders) | **High** — "infrastructure" overclaims for a single-file, non-extracted app today | Low |
| 5. "Digital public-good toolkit for low-connectivity travel and mass gatherings" | High-sounding | High-sounding | **High** — "digital public good" is a specific DPGA designation not yet earned | Low |

**Primary: #2 — "Offline-first safety companion for international
travellers."** Every word is verifiable against the current demo in minutes,
which matters more than a grander frame when there are zero pilots and no
finalized license. It also avoids both the trademark-confusion risk of #1
and the overclaiming risk of #4/#5.

**Secondary: #1 — "Open-source World Cup supporter safety app."** Useful as
campaign/hook framing for a specific 2026 news peg and a concrete pilot
population — but always paired with `TRADEMARK.md`'s no-official-affiliation
disclosure, never standalone.

**Rejected:** #4 and #5 are overclaims for a solo-maintainer prototype with
no pilots — "infrastructure" and "digital public good" are earned labels
(the latter is literally a formal DPGA designation), not marketing framing
to self-apply early. #3 is vague enough to invite "who is this actually
for?" pushback without #2's concrete traveller framing.

## Section 11 — Prioritized gap matrix

| Severity | Problem | Evidence | Recommended change | Implemented this audit? |
|---|---|---|---|---|
| **Blocker** | No Git repository exists at all | `git rev-parse --show-toplevel` → "not a git repository" | `git init`, then real commits | **Done** — repository initialized, 15+ local commits, no remote configured |
| **Blocker** | No license | No `LICENSE` file found anywhere | `LICENSE-PROPOSAL.md` as draft | **Done for code** (Apache-2.0, owner-confirmed, `LICENSE`); content licensing remains deliberately unresolved pending translation provenance |
| **High** | No content sourcing for emergency data | `DECISION_LOG.md` "SAMPLE DATA" label only, no citations | `docs/content-governance.md` + schema + templates | **Done** — official sources cited for all 4 cities and independently re-verified by a second reviewer (`SABR`), commit `383a08ebbe337f1f9d43ab5299953cf6038d6316`; 2 real content gaps found and fixed (Toronto taxonomy, NYC scope) |
| **High** | No CI / automated validation | No `.github/` directory found | `.github/workflows/ci.yml` + `tools/validate-repo.js` | Yes |
| **High** | No security/privacy policy docs | No `SECURITY.md`/`PRIVACY.md` found | Added both, plus `docs/threat-model.md` | Yes |
| **High** | Zero pilot/user evidence | No issues, no roadmap, no feedback record found | `docs/pilot-plan.md` | Plan yes; execution no (needs a real partner) |
| **Medium** | Monolithic architecture blocks reuse | All logic/data in one file, confirmed by source read | `docs/architecture.md` + `schemas/` + reference `city-packs/` | Documented + drafted; runtime unchanged (Phase 2 work) |
| **Medium** | No contribution/governance docs | No `CONTRIBUTING.md`/`GOVERNANCE.md`/`CODE_OF_CONDUCT.md` found | Added all three | Yes |
| **Medium** | No funding-channel analysis | Nothing existed | `docs/funding-readiness.md`, dated 2026-07-18 | Yes |
| **Low** | Redundant `FanSafe_PWA.zip` at repo root | Confirmed duplicate of `FanSafe_PWA/` contents via `unzip -l` | Add to `.gitignore` rather than track in Git | Flagged; not deleted (not this audit's file to remove without confirming it isn't needed) |
| **Low** | No `CHANGELOG.md`/`CITATION.cff`/`TRADEMARK.md` | None found | Added all three | Yes |

## What this audit did not and could not do

- Could not confirm legal ownership of code — **resolved in a later
  session**: owner confirmed ownership, code is licensed Apache-2.0.
  Content (city-pack/phrase) ownership/provenance remains unresolved by
  design.
- Could not run a real pilot — requires real participants. **Still true**
  as of the Gate 1 session — no pilot partner exists.
- Could not verify emergency-number accuracy against live official sources
  — **resolved in a later (Gate 1) session**: sourced against official
  primary sources and independently re-verified by a second reviewer
  (`SABR`). This confirms the cited facts as of the review date, not their
  accuracy forever — city data must still be verified locally by end users.
- Could not change the running app's architecture (Phase 2 extraction) —
  **still true**. `index.html` still uses its own inline arrays; the
  `city-packs/`/`phrases/` extraction remains reference-only, consistent
  with "gradual migration, not a rewrite."

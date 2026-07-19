# Release Notes Draft — `v0.1.0-alpha` (Not Published)

**Tagged locally, not released.** A local, unpushed annotated tag
`v0.1.0-alpha` (created 2026-07-19) pins a reusable evidence baseline for
future program applications (see `docs/programs/KIT.md`). Run
`git rev-parse v0.1.0-alpha^{commit}` for the exact commit it points to —
deliberately not hardcoded here, since any commit that edits this file
changes its own hash, making a pinned value in the same file stale the
moment it's written. This is not a GitHub release: no remote push, no
published release notes, and no distribution has occurred. Do not treat the
existence of this local tag as evidence of a public release.

---

## FanSafe v0.1.0-alpha — Public Preview

FanSafe is an offline-first, privacy-preserving safety and translation
companion for international travellers, currently covering 4 demo cities
(Mexico City, Toronto, New York City, Vancouver) and 4 languages
(Indonesian, English, Spanish, French).

This is a **public preview**: emergency-number sources were checked
against official primary sources and then independently re-verified by a
second reviewer (`SABR`), and the public-preview UI and safety-critical
flows passed a real-browser smoke test including the denied-geolocation
fallback. See `docs/PUBLIC_RELEASE_CHECKLIST.md` for the full gate table
and `docs/open-source-strategy.md` for the underlying readiness
assessment. MIT applies to copyrightable repository content; FanSafe does not
claim copyright over underlying emergency-number facts. No formal pilot is
planned, and no external contributor has used this repository — see "Known
gaps," below.

### Gate 1 verification (2026-07-19)

Reviewer `SABR` re-opened and approved all four city packs' sources at
commit `383a08ebbe337f1f9d43ab5299953cf6038d6316` (`APPROVE` for Mexico
City, Toronto, and New York City; `APPROVE WITH CORRECTION` for
Vancouver — the correction is applied). A manual tester exercised the
denied-geolocation path (`Never allow`) at the same commit: the safe
general-location fallback opened through the device email/share sheet,
with no email sent and no console errors. Safety-critical translations
remain `unreviewed` — this gate did not touch translation review.

The distribution ZIP was rebuilt fresh at HEAD
`77389b726db2f41f8df6ddf18eb4b800ada17ba2`: `unzip -t` passed (10/10
files), and its `index.html` SHA-256
(`ed1e9b7e132f3366a78f519496d9701a8d948c42c58920dee9ed45535fe8493c`)
matches `FanSafe_PWA/index.html` exactly. This remains a draft release;
no distribution occurred.

### Added this release

- Repository-wide MIT license, with FanSafe brand and icon exceptions
  (`LICENSE`, `NOTICE`, `TRADEMARK.md`)
- Full community/governance file set (`CONTRIBUTING.md`,
  `CODE_OF_CONDUCT.md`, `SECURITY.md`, `PRIVACY.md`, `GOVERNANCE.md`,
  `ROADMAP.md`, `CHANGELOG.md`, `CITATION.cff`, `TRADEMARK.md`)
- Official-source citations for all 4 demo cities' emergency numbers,
  each independently reviewed by a second person (`city-packs/<city>/SOURCES.md`, `REVIEW.md`)
- Phrase source and provenance tracking for all 17 phrases (`phrases/`),
  while language-quality status remains `unreviewed`
- In-app provenance indicators: city-pack sourcing status pill (Safety
  screen), pack detail text (Travel screen), phrase review note (Translate
  screen) — visually confirmed in a real browser
- Extended CI validation: 13 automated check categories
  (`tools/validate-repo.js`), including Gate 1 taxonomy/scope/migration/
  escaping regressions and a static heuristic scan for unescaped
  user-controlled data in HTML rendering
- GitHub issue/PR templates, funding-config draft, CI workflow

### Fixed this release

- A trusted-contact avatar initials render was missing HTML escaping,
  inconsistent with the rest of the codebase (`FanSafe_PWA/index.html`,
  `renderContacts()`) — low practical exploitability (only 2 characters
  reached the sink) but fixed for defense-in-depth and consistency.
  Regression-tested live with real injection payloads in the Gate 1
  browser smoke test. See `docs/threat-model.md`, T3.
- Toronto's non-emergency numbers (311, 211) are now labeled as city and
  community services respectively, with no police-non-emergency claim.
- The city pack previously labeled "New York / New Jersey" is now scoped
  to New York City only, with a safe migration for any existing
  `newyork-newjersey` value in a user's local storage.
- Vancouver's non-emergency number is now explicitly labeled as the
  Vancouver Police Department line.

### Known gaps in this release

- Safety-critical phrase translations remain `unreviewed` by a native or
  fluent speaker.
- No formal pilot is planned; no external contributor has used this
  repository yet.

### Not included (by design)

- Any FanLocal (marketplace/booking) functionality — out of scope, see
  `README.md`.
- A claim of production readiness, real-world validation, or formal-pilot
  outcomes.

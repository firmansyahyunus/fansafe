# Release Notes Draft — `v0.1.0-alpha` (Not Published)

**Not tagged, not released.** Draft only. Do not treat this as evidence a
release exists — no tag, no GitHub release, no distribution has occurred.

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
assessment. City-pack and phrase **content** is still not licensed for
reuse, no pilot has run, and no external contributor has used this
repository — see "Known gaps," below.

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

- Apache-2.0 license for code and tooling (`LICENSE`)
- Full community/governance file set (`CONTRIBUTING.md`,
  `CODE_OF_CONDUCT.md`, `SECURITY.md`, `PRIVACY.md`, `GOVERNANCE.md`,
  `ROADMAP.md`, `CHANGELOG.md`, `CITATION.cff`, `TRADEMARK.md`)
- Official-source citations for all 4 demo cities' emergency numbers,
  each independently reviewed by a second person (`city-packs/<city>/SOURCES.md`, `REVIEW.md`)
- Phrase review-status tracking for all 9 safety-critical phrases
  (`phrases/`) — still `unreviewed`, tracked rather than silently assumed
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

- City-pack/phrase **content is not licensed for reuse** — translation
  and authorship provenance has not been established. See
  `docs/content-licensing-matrix.md`.
- Safety-critical phrase translations remain `unreviewed` by a native or
  fluent speaker.
- No pilot has run; no external contributor has used this repository yet.
- No Git remote is configured; the repository is not public.

### Not included (by design)

- Any FanLocal (marketplace/booking) functionality — out of scope, see
  `README.md`.
- A finalized license for city-pack/phrase content — deliberately withheld
  pending provenance verification.

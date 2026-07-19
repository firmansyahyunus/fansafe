# Release Notes Draft — `v0.1.0-alpha` (Not Published)

**Not tagged, not released.** Draft only, prepared per this session's
scope ("prepare but do not publish"). Do not treat this as evidence a
release exists.

---

## FanSafe v0.1.0-alpha — Release Candidate for Public Preview

FanSafe is an offline-first, privacy-preserving safety and translation
companion for international travellers, currently covering 4 demo cities
(Mexico City, Toronto, New York City, Vancouver) and 4 languages
(Indonesian, English, Spanish, French).

This is a **release candidate**, one step before a public preview label:
emergency-number sources were checked against official primary sources but
not yet independently confirmed by a second person, no pilot has run, and
the license covers code only — city-pack and phrase content are not yet
licensed for reuse. See `docs/PUBLIC_RELEASE_CHECKLIST.md` items 12–13 for
the exact two items that gate the "public preview" label, and
`docs/open-source-strategy.md` for the full readiness assessment.

### Gate 1 verification completion update

The earlier preliminary wording about independent source review and denied
geolocation is superseded by the final evidence. SABR approved all four city
packs at commit `383a08ebbe337f1f9d43ab5299953cf6038d6316`. A manual tester
selected `Never allow` for geolocation at the same commit; the safe
general-location fallback opened through the device email/share sheet, with no
email sent and no Console errors reported. Safety-critical translations remain
`unreviewed`.

### Added this release

- Apache-2.0 license for code and tooling (`LICENSE`)
- Full community/governance file set (`CONTRIBUTING.md`,
  `CODE_OF_CONDUCT.md`, `SECURITY.md`, `PRIVACY.md`, `GOVERNANCE.md`,
  `ROADMAP.md`, `CHANGELOG.md`, `CITATION.cff`, `TRADEMARK.md`)
- Official-source citations for all 4 demo cities' emergency numbers
  (`city-packs/<city>/SOURCES.md`) — all remain sourced but not
  independently human-reviewed
- Phrase review-status tracking for all 9 safety-critical phrases
  (`phrases/`)
- In-app provenance indicators: city-pack sourcing status pill (Safety
  screen), pack detail text (Travel screen), phrase review note (Translate
  screen)
- Extended CI validation: 13 automated check categories
  (`tools/validate-repo.js`), including a static heuristic scan for
  unescaped user-controlled data in HTML rendering
- GitHub issue/PR templates, funding-config draft, CI workflow

### Fixed this release

- A trusted-contact avatar initials render was missing HTML escaping,
  inconsistent with the rest of the codebase (`FanSafe_PWA/index.html`,
  `renderContacts()`) — low practical exploitability (only 2 characters
  reached the sink) but fixed for defense-in-depth and consistency. See
  `docs/threat-model.md`, T3.

### Known gaps in this release

- No independent (second-person) review of sourced emergency numbers yet.
- Four human-review decisions have been supplied by `SABR`, but all omit the
  exact commit reviewed; they cannot yet be treated as auditable independent
  confirmation. Vancouver's resulting label correction is applied.
- Browser smoke testing is recorded in
  `docs/release-evidence/v0.1.0-alpha/manual-browser-smoke-test.md`; the
  denied-geolocation fallback remains unverified.
- Toronto's 311 and 211 entries are city/community services, respectively;
  neither is represented as police non-emergency.
- New York City is the pack's explicit scope; New Jersey is not covered.
- No pilot has run; no external contributor has used this repository yet.
- The current git-ignored `FanSafe_PWA.zip` is integrity-valid but not aligned
  with this source tree; regenerate it from the approved release commit before
  any distribution.

### Not included (by design)

- Any FanLocal (marketplace/booking) functionality — out of scope, see
  `README.md`.
- A finalized license for city-pack/phrase content — deliberately withheld
  pending provenance verification, see `docs/content-licensing-matrix.md`.

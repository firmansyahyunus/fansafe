# GitHub Milestone Proposal: `v0.1.0-alpha`

**Not created on GitHub.** This is a draft proposal for the maintainer to
create manually (or approve creating) once a remote exists — no GitHub API
call was made, no milestone was created, per this session's scope
boundaries (no push, no release, no remote configuration without approval).

## Milestone title

`v0.1.0-alpha — Release candidate for public preview`

## Description (proposed)

> Tracks the remaining verification gates in
> `docs/PUBLIC_RELEASE_CHECKLIST.md`: the denied-geolocation browser fallback
> and independent (second-person) review of `city-packs/*/SOURCES.md`. The
> real-browser pass, Toronto city/community-service taxonomy correction, and
> New York City scope correction are recorded in
> `docs/release-evidence/v0.1.0-alpha/`.

## Proposed issues to attach

1. **Complete denied-geolocation fallback verification**
   Labels: `testing`, `priority-high`
   Body: the browser smoke test verified navigation, provenance displays,
   Toronto taxonomy, New York City scope, trusted-contact escaping, medical
   reveal, reset, and offline reload. Its browser context left geolocation
   pending, so explicitly exercise a denied permission and confirm the safe
   general-location fallback. Update the smoke-test evidence with the result.

2. **Independent review of city-pack emergency-number sources**
   Labels: `content-governance`, `priority-high`
   Body: a second person (not the one who ran the automated sourcing pass)
   opens each URL in `city-packs/<city>/SOURCES.md` and confirms the cited
   number matches. Update each `REVIEW.md` accordingly.

3. **city-pack schema: express "reviewedBy required if reviewStatus claims
   review" in schema itself, or document as JS-only rule**
   Labels: `tooling`, `priority-low`
   Body: `schemas/phrase.schema.json` documents this rule in prose because
   the draft-07 subset supported by `tools/lib/json-schema-lite.js` has no
   if/then support; `tools/validate-phrases.js` enforces it in code. Decide
   if this is sufficient long-term or needs a schema-level fix.

4. **Phase 2 architecture: wire city-packs/*/pack.json into the running app**
   Labels: `architecture`, `priority-low`
   Body: per `docs/architecture.md`, Phase 2 — `index.html` still uses its
   own inline `cityPacks` array; the `city-packs/` extraction is reference-
   only. Out of scope for `v0.1.0-alpha`.

## Suggested labels (if not already present)

`bug`, `enhancement`, `documentation`, `content-governance`, `security`,
`testing`, `architecture`, `tooling`, `priority-high`, `priority-medium`,
`priority-low`, `good-first-issue`

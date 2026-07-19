# GitHub Milestone Proposal: `v0.1.0-alpha`

**Not created on GitHub.** This is a draft proposal for the maintainer to
create manually (or approve creating) once a remote exists — no GitHub API
call was made, no milestone was created, per this session's scope
boundaries (no push, no release, no remote configuration without approval).

## Milestone title

`v0.1.0-alpha — Public preview`

## Description (proposed)

> Both verification gates in `docs/PUBLIC_RELEASE_CHECKLIST.md` are
> cleared: the denied-geolocation browser fallback passed, and `SABR`
> independently reviewed and approved `city-packs/*/SOURCES.md`. Evidence
> is recorded in `docs/release-evidence/v0.1.0-alpha/`. Remaining issues
> below are lower-priority follow-ups, not release blockers.

## Proposed issues to attach

1. ~~Complete denied-geolocation fallback verification~~ — **Done.** See
   `docs/release-evidence/v0.1.0-alpha/manual-browser-smoke-test.md`,
   "Completed denial follow-up."

2. ~~Independent review of city-pack emergency-number sources~~ — **Done.**
   See each city's `REVIEW.md`, reviewer `SABR`, commit
   `383a08ebbe337f1f9d43ab5299953cf6038d6316`.

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

5. **Establish phrase translation provenance**
   Labels: `content-governance`, `priority-medium`
   Body: unlocks the content-licensing gate (`docs/content-licensing-matrix.md`
   item 3) — record who authored/translated each phrase and by what
   method, then re-run the license decision for phrase content.

## Suggested labels (if not already present)

`bug`, `enhancement`, `documentation`, `content-governance`, `security`,
`testing`, `architecture`, `tooling`, `priority-high`, `priority-medium`,
`priority-low`, `good-first-issue`

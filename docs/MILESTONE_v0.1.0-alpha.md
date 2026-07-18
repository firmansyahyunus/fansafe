# GitHub Milestone Proposal: `v0.1.0-alpha`

**Not created on GitHub.** This is a draft proposal for the maintainer to
create manually (or approve creating) once a remote exists — no GitHub API
call was made, no milestone was created, per this session's scope
boundaries (no push, no release, no remote configuration without approval).

## Milestone title

`v0.1.0-alpha — Release candidate for public preview`

## Description (proposed)

> Tracks the two items that gate the "public preview" label (see
> `docs/PUBLIC_RELEASE_CHECKLIST.md` items 12–13): interactive browser
> re-verification of the 2026-07-19 UI changes, and independent
> (second-person) review of `city-packs/*/SOURCES.md`. Also tracks
> resolving the Toronto police-non-emergency gap and the New York/New
> Jersey scope gap, and any fixes surfaced by actually exercising the app
> in a real browser session.

## Proposed issues to attach

1. **Interactive browser re-verification of gate-0 UI changes**
   Labels: `testing`, `priority-high`
   Body: verify the city-pack review-status pill (Safety screen), pack
   card detail text (Travel screen), and phrase-review note (Translate
   screen) actually render correctly; re-drive the "add trusted contact"
   flow to confirm the escaping fix doesn't break normal names.

2. **Independent review of city-pack emergency-number sources**
   Labels: `content-governance`, `priority-high`
   Body: a second person (not the one who ran the automated sourcing pass)
   opens each URL in `city-packs/<city>/SOURCES.md` and confirms the cited
   number matches. Update each `REVIEW.md` accordingly.

3. **Resolve Toronto police-non-emergency number gap**
   Labels: `content-governance`, `priority-medium`
   Body: `city-packs/toronto/SOURCES.md` found that TPS's own
   police-specific non-emergency number (416-808-2222) differs from the
   `311`/`211` city/community numbers currently in the pack. Decide
   whether to add a dedicated field or a second pack entry.

4. **Resolve New York / New Jersey pack scope**
   Labels: `content-governance`, `priority-medium`
   Body: `city-packs/newyork/SOURCES.md` found the pack's stated scope
   ("New York / New Jersey") is only verified for NYC. Split the pack or
   narrow its `city` field.

5. **city-pack schema: express "reviewedBy required if reviewStatus claims
   review" in schema itself, or document as JS-only rule**
   Labels: `tooling`, `priority-low`
   Body: `schemas/phrase.schema.json` documents this rule in prose because
   the draft-07 subset supported by `tools/lib/json-schema-lite.js` has no
   if/then support; `tools/validate-phrases.js` enforces it in code. Decide
   if this is sufficient long-term or needs a schema-level fix.

6. **Phase 2 architecture: wire city-packs/*/pack.json into the running app**
   Labels: `architecture`, `priority-low`
   Body: per `docs/architecture.md`, Phase 2 — `index.html` still uses its
   own inline `cityPacks` array; the `city-packs/` extraction is reference-
   only. Out of scope for `v0.1.0-alpha`.

## Suggested labels (if not already present)

`bug`, `enhancement`, `documentation`, `content-governance`, `security`,
`testing`, `architecture`, `tooling`, `priority-high`, `priority-medium`,
`priority-low`, `good-first-issue`

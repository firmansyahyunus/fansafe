# Contributing to FanSafe

Thank you for considering a contribution. FanSafe is currently maintained by
a single maintainer and has no external contributors yet — this document
exists to make the first ones easy.

## Before you start

- Read `FanSafe_PWA/README.md`, `FanSafe_PWA/DECISION_LOG.md`, and
  `FanSafe_PWA/STATE_SCHEMA.md`. Most "why is it built this way" questions are
  already answered there.
- FanSafe is the only in-scope product. Do not add FanLocal features
  (marketplace, bookings, host profiles, payments, listings) anywhere in this
  repository — see `docs/architecture.md` for the one place FanLocal may be
  mentioned as a future, separate concern.
- Do not add a build step, framework, external CDN dependency, or API key
  requirement without discussing it in an issue first. The zero-dependency,
  single-file architecture is a deliberate, documented product decision.

## Development setup

There is no install step.

```bash
cd FanSafe_PWA
python -m http.server 8080
```

Open `http://localhost:8080/`. Edits to `index.html` take effect on refresh.

## Before opening a pull request

Run the repository's static validation locally:

```bash
node tools/validate-repo.js
```

This checks JavaScript syntax inside `index.html`, HTML id uniqueness, that
every `getElementById`/`$("#...")` reference resolves (accounting for the
handful of ids injected via `innerHTML` — see the script's allowlist), and
that `manifest.json` and any `city-packs/*/pack.json` files are valid JSON
that conform to their schema. The same script runs in CI
(`.github/workflows/ci.yml`).

If your change touches a screen or user-facing flow, manually exercise it in
a real browser and update `FanSafe_PWA/TEST_REPORT.md` with what you actually
checked — including what you did *not* check. Do not mark something tested
that you only read as source code; the existing report distinguishes these
carefully and new entries should too.

## Adding or changing a city pack

City-pack data (emergency numbers, supported languages, version) is currently
hardcoded in `FanSafe_PWA/index.html` (`const cityPacks = [...]`). Follow
`docs/content-governance.md` for the sourcing/review process before proposing
a new or changed city pack, and validate any JSON representation against
`schemas/city-pack.schema.json` with `tools/validate-city-pack.js`. Do not
invent emergency numbers — cite a source in the pack's `SOURCES.md`.

## Adding or changing phrases

Follow the existing `phraseBook` shape (`id`, `category`, `values` per
language). Every phrase must exist in all four supported languages (`id`,
`en`, `es`, `fr`) before merge — a partial phrase is worse than no phrase,
since the UI has no per-language fallback for it.

## Commit and PR conventions

- Keep commits scoped to one logical change.
- Reference the relevant section of `DECISION_LOG.md` if your change reverses
  or narrows an existing documented decision — add a new entry rather than
  silently overwriting the reasoning that's there.
- Security-relevant changes (medical card, trusted contacts, location
  handling, incident/case storage) should call that out explicitly in the PR
  description and reference `docs/threat-model.md`.

## Reporting bugs vs. reporting security issues

Use the normal issue templates in `.github/ISSUE_TEMPLATE/` for functional
bugs. For anything that could expose another user's medical card, location,
or trusted-contact data, follow `SECURITY.md` instead of filing a public
issue.

## Code of conduct

By participating, you agree to abide by `CODE_OF_CONDUCT.md`.

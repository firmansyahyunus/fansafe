---
name: City pack contribution
about: Propose a new or updated city pack (emergency numbers, languages, phrases)
title: "[City pack] "
labels: city-pack
---

Read `docs/content-governance.md` before filling this out — it defines the
required sourcing, review, and validation process. This template exists to
make sure that process is actually followed, not skipped for convenience.

## City / pack

- City, country:
- New pack, or update to an existing one (`city-packs/<id>/pack.json`)?

## Sourced data

Fill in `city-packs/<id>/pack.json` per `schemas/city-pack.schema.json`, and
`city-packs/<id>/SOURCES.md` with an **official** source URL and access date
for every number. "I looked it up" is not sufficient — a citation is.

- Primary emergency number + source URL:
- Non-emergency number/service + source URL:

## Language coverage

- Which of `id` / `en` / `es` / `fr` does this pack support?
- Is every phrase for those languages complete? (A pack claiming a language
  with incomplete phrase coverage will not be merged — see
  `schemas/phrase.schema.json`.)

## Validation

Run before submitting:

```bash
node tools/validate-city-pack.js city-packs/<id>/pack.json
```

Paste the output here:

```
```

## Reviewer

Per `docs/content-governance.md`, at least one reviewer distinct from the
submitter is required once the project has more than one trusted
contributor. Until then, the maintainer verifies the source URLs directly.

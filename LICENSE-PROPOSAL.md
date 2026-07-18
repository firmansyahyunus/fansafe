# License Status

## Code license: FINAL

As of 2026-07-19, the repository owner has confirmed:

1. **Ownership:** the owner holds the rights to the FanSafe code in this
   repository.
2. **License choice:** Apache-2.0 for source code and tooling.

The full license text is now in [`LICENSE`](LICENSE) and applies to
`FanSafe_PWA/index.html`, `FanSafe_PWA/sw.js`,
`FanSafe_Standalone_Prototype.html`, and everything under `tools/` and
`schemas/`. This is a real grant, not a draft.

## Content license (city-pack data, phrase/translation content): UNRESOLVED

**By explicit owner instruction, city-pack data and phrase content are NOT
licensed for reuse yet**, even though a permissive license (CC0-1.0) was
recommended in the previous draft of this file. The owner's instruction was:

> Do not license city-pack data or phrase content yet unless provenance,
> ownership, and source-license compatibility have been verified.

Status of that verification as of this session (2026-07-19):

- **Emergency numbers:** provenance work was done this session — see
  `city-packs/<city>/SOURCES.md` for what was and wasn't verifiable against
  an official primary source (results vary per city; some numbers remain
  unverified and are marked as such, not silently assumed correct).
  Verifying that a fact (a phone number) is *accurate* is a different
  question from verifying *who owns the right to redistribute the phrasing
  used to present it* — the latter has not been assessed.
- **Phrase/translation content:** authorship provenance (who translated
  each phrase, whether any translation was sourced from a third-party
  service with its own terms) has **not** been investigated this session.
  This remains the precise blocker.

**Precise unresolved-license blocker:** the phrase/translation strings in
`FanSafe_PWA/index.html`'s `phraseBook` and the reference copies in
`schemas/phrase.schema.json`-conformant data have no recorded translator or
translation-method attribution. Until that provenance is recorded (even
informally — "maintainer-authored" is a valid answer, but it must be
recorded, not assumed), this repository must not represent phrase content
as available under any open license, including in `NOTICE`, `README.md`, or
any funding/grant material.

Until this is resolved: city-pack and phrase content in this repository is
**all rights reserved by default** (standard copyright — no license grant),
same as any other unlicensed original content. It may be viewed as part of
this source-available repository but should not be assumed reusable
elsewhere.

See `docs/content-licensing-matrix.md` for the full per-category breakdown
(code, docs, phrase content, city-pack data, emergency data, icons,
screenshots, brand).

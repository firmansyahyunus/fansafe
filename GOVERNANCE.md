# Governance

## Current model: single maintainer

FanSafe has one maintainer and no external contributors as of this writing.
There is no steering committee, no voting process, and no formal RFC process
— because none is needed yet at this scale, and inventing one now would be
governance theater rather than a real accountability mechanism.

The maintainer:

- Has final say on all code, content, and documentation changes
- Is responsible for security triage (`SECURITY.md`)
- Owns the repository license (finalized: MIT, see `LICENSE`) and the
  still-unresolved content license (`LICENSE-PROPOSAL.md`,
  `docs/content-licensing-matrix.md`)
- Owns city-pack content governance decisions (`docs/content-governance.md`)
  until a review-board model is warranted by contributor volume

## What triggers a governance change

This document should be revisited (not before) when any of the following
becomes true:

- A second person is granted commit/merge access
- The project accepts its first external city-pack or phrase contribution
- The project applies to a fiscal host (Open Collective) or forms a legal
  entity — funding bodies typically require documented decision-making, at
  which point this file should specify how funds-related decisions are made
- The project is nominated to the Digital Public Goods registry, which
  requires clear, documented ownership (see `docs/funding-readiness.md`)

## Decision record

Product and architecture decisions are logged as they are made in
`FanSafe_PWA/DECISION_LOG.md` (product/UX decisions) and `docs/architecture.md`
(structural decisions). New maintainers or contributors should treat silence
in an area as "not yet decided," not as an implicit precedent.

## Conflict of interest / commercial use

Because the repository license (`LICENSE`, MIT) permits commercial and
white-label reuse, the maintainer may in the future offer a hosted or
consulting version of FanSafe. If that happens, this document will be updated
to disclose it and to separate the maintainer's commercial interests from
project governance decisions (e.g., which contributions get merged).

# Independent source review — v0.1.0-alpha

## Status: not complete

The manual verification checklist requires a reviewer who is independent of
the authoring/audit session to open every cited source and record a name or
initials, date, result, and notes. That did not occur in this run. An AI
review or an automated browser check is not recorded as independent human
review.

| Pack | Current review status | Independent human reviewer | Result |
|---|---|---|---|
| Mexico City | sourced, unreviewed | — | Not performed |
| Toronto | sourced, unreviewed | — | Not performed |
| New York City | sourced, unreviewed | — | Not performed |
| Vancouver | sourced, unreviewed | — | Not performed |

## Scope corrections recorded in this run

- Toronto now labels 311 as city services and 211 as community services.
  Neither is labeled police non-emergency; no police-specific service was
  approved or added.
- The `newyork` pack is explicitly New York City only. It makes no New
  Jersey coverage claim.
- Safety-critical phrase records remain `unreviewed`; no translation status
  was elevated.

## Required human follow-up

For each URL in `city-packs/<city>/SOURCES.md`, an independent person must
confirm the organization/domain, stated number or service, geographic scope,
and taxonomy label, then add their identity/initials, date, result, and notes
to that pack's `REVIEW.md`. Until then, the UI and all release material must
continue to say sourced/unreviewed and sample data/verify locally.

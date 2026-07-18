# Sources — Toronto pack

**Status: VERIFIED against official primary sources on 2026-07-19, with one
scope caveat noted below.**

| Fact | Value | Organization | Page title | Source URL | Accessed | Scope |
|---|---|---|---|---|---|---|
| Primary emergency number | 911 | Toronto Police Service | "9-1-1 Emergency - Toronto Police Service" | https://www.tps.ca/contact/9-1-1-emergency/ | 2026-07-19 | Toronto |
| Non-emergency (city services) | 311 | City of Toronto | "311 Toronto – City of Toronto" | https://www.toronto.ca/home/311-toronto-at-your-service/ | 2026-07-19 | Toronto |
| Non-emergency (community/social services) | 211 | 211 Ontario | "Welcome / Bienvenue \| 211 Ontario" | https://211ontario.ca/ | 2026-07-19 | Ontario (province-wide, including Toronto) |

## Result

`pack.json`'s primary (`911`) and secondary (`311 / 211`) values **match
official sources exactly.**

## Scope caveat — found during this verification, not previously flagged

Toronto Police Service's own **police-specific** non-emergency number is
**416-808-2222** (source: https://www.tps.ca/contact/416-808-2222-police-non-emergency/,
accessed 2026-07-19) — a *different* number from the `311`/`211` pair
currently in `pack.json`. `311` routes to general city services and `211`
to community/social services; neither is the number Toronto Police
Service itself directs people to for a non-emergency police matter (e.g.
"my bike was stolen and the thief is gone"). This is not a data error —
`pack.json`'s existing `secondaryLabel` says "City / community
non-emergency," which is accurate for what `311`/`211` actually are — but
it means a traveller with a non-emergency *police* need specifically has
no dedicated number in this pack today. Flagged for a future pack update,
not fixed in this session (schema/data structure change, not a provenance
fix).

## Reviewer

- Sourced by: repository audit (public-release gate-0 session), 2026-07-19.
- Independent human review: not yet performed — see `REVIEW.md`.

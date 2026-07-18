# Sources — Toronto pack

**Status: sourced against official primary sources on 2026-07-19; not
independently human-reviewed.**

| Fact | Value | Organization | Page title | Source URL | Accessed | Scope |
|---|---|---|---|---|---|---|
| Primary emergency number | 911 | Toronto Police Service | "9-1-1 Emergency - Toronto Police Service" | https://www.tps.ca/contact/9-1-1-emergency/ | 2026-07-19 | Toronto |
| Non-emergency (city services) | 311 | City of Toronto | "311 Toronto – City of Toronto" | https://www.toronto.ca/home/311-toronto-at-your-service/ | 2026-07-19 | Toronto |
| Non-emergency (community/social services) | 211 | 211 Ontario | "Welcome / Bienvenue \| 211 Ontario" | https://211ontario.ca/ | 2026-07-19 | Ontario (province-wide, including Toronto) |

## Result

`pack.json` records `911` as the emergency number and keeps the two distinct
non-emergency services as typed entries: `services.city_services` is **311**
and `services.community_services` is **211**. It does not present either
service as police non-emergency.

## Service taxonomy

Toronto Police Service lists a separate police-specific non-emergency number
(416-808-2222, https://www.tps.ca/contact/416-808-2222-police-non-emergency/,
accessed 2026-07-19). This pack does **not** include or label a
`police_non_emergency` service, because no independently reviewed police
entry has been approved. The Toronto UI and pack label now distinguish only
the sourced `city_services` (311) and `community_services` (211) values.

## Reviewer

- Sourced by: repository audit (public-release gate-0 session), 2026-07-19.
- Independent human review: not yet performed — see `REVIEW.md`.

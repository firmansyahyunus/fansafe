# Sources — New York / New Jersey pack

**Status: PARTIALLY VERIFIED against official primary sources on
2026-07-19 — see scope caveat below.**

| Fact | Value | Organization | Page title | Source URL | Accessed | Scope |
|---|---|---|---|---|---|---|
| Primary emergency number | 911 | New York City Police Department (NYPD) | "Contact Us - NYPD" | https://www.nyc.gov/site/nypd/about/about-nypd/contact-us.page | 2026-07-19 | New York City only |
| Non-emergency (city services) | 311 | NYC311 (City of New York) | "About 311" / "Home · NYC311" | https://www.nyc.gov/311/about-311.page ; https://portal.311.nyc.gov/ | 2026-07-19 | New York City only |

## Result — and an unresolved scope problem

`pack.json`'s numbers **match official New York City sources exactly**.
However, this pack's `city` field is **"New York / New Jersey"** — a
combined label — while every source found and cited above is **NYC-only**.
911 is a shared national emergency number across the US (including New
Jersey), so the primary number is not wrong, but **311 is a New York
City-specific non-emergency service and is not confirmed to work the same
way, or at all, from a New Jersey phone/location.** No New Jersey-specific
non-emergency number was researched or verified in this session.

**This is a real content gap, not just a citation gap.** Recommendation:
either split this pack into two (`newyork` and `newjersey`) with
independently sourced non-emergency numbers, or narrow the existing pack's
`city` field to "New York City" only and remove the New Jersey framing
until it has its own verified data. Not changed in this session — this is
a data-modeling decision for the maintainer, not a provenance citation
task.

## Reviewer

- Sourced by: repository audit (public-release gate-0 session), 2026-07-19.
- Independent human review: not yet performed — see `REVIEW.md`.

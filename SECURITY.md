# Security Policy

## This is not an emergency contact channel

If you are in immediate danger, contact your local emergency number directly
(FanSafe surfaces sample emergency numbers per city, but always verify
locally). Do not use this file, GitHub issues, or the repository's
`localStorage`-backed incident/case records to report a real emergency —
none of them reach any emergency service, embassy, or event organizer. This
is a documented product invariant (see `FanSafe_PWA/README.md` and
`FanSafe_PWA/DECISION_LOG.md`, "No-false-claims wording").

## Reporting a security vulnerability

FanSafe stores medical-card data, trusted-contact details, and location-
adjacent messages entirely in browser `localStorage` on the user's own
device (see `docs/threat-model.md` and `FanSafe_PWA/STATE_SCHEMA.md`). A
security report is anything that could:

- Expose another user's medical card, trusted contacts, or saved records
  across origins, tabs, or devices
- Cause `localStorage` data to leave the device without the user's explicit
  share/copy action
- Bypass the medical-card hide-by-default behavior
- Inject or execute script via a phrase, city-pack, or saved-item field
  (XSS via `innerHTML` usage — see the four dynamically-injected ids noted
  in `FanSafe_PWA/TEST_REPORT.md`)
- Compromise the service worker's cache in a way that serves stale or
  attacker-controlled content

**Do not open a public GitHub issue for a security report.** Email
**moonwalkingpenguins@gmail.com** (owner-confirmed security contact,
2026-07-19) with:

- A description of the issue and its impact
- Steps to reproduce (a minimal HTML/JS snippet is ideal, since the whole
  app is one static file)
- Your assessment of severity

## What to expect

This is a single-maintainer, pre-release, unfunded project. There is no
formal SLA and no bug bounty program. As a good-faith target: acknowledgment
within 7 days, and a fix or mitigation plan communicated within 30 days for
confirmed issues affecting the medical-card, contact, or storage-isolation
invariants above. These timelines will be revisited once the project has
real users (see `docs/pilot-plan.md`).

## Supported versions

There are no tagged releases yet. Security reports apply to the current
state of the `FanSafe_PWA/index.html` on the default branch.

## Known, already-documented limitations (not new reports)

`FanSafe_PWA/TEST_REPORT.md` already documents what has not been tested,
including screen-reader passes, cross-browser behavior, and true offline
reload. `docs/threat-model.md` documents accepted residual risks (e.g., any
device with local file-system or browser DevTools access can read
`localStorage` in plaintext — this is a shared-device risk inherent to the
storage model, not a code defect, and is already surfaced to users via the
medical card's shared-device warning text).

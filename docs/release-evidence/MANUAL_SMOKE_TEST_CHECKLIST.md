# Manual browser smoke-test checklist (re-run template)

This is the repeatable checklist behind
[`v0.1.0-alpha/manual-browser-smoke-test.md`](v0.1.0-alpha/manual-browser-smoke-test.md).
It exists so the same evidence can be produced again for the next tagged
release without re-deriving the check list from scratch, and so a future
contributor or reviewer can see exactly what "smoke-tested" means here.

**This is deliberately not wired into CI.** Automating it would require
introducing Playwright as a dependency, which means introducing a
`package.json` for the first time — directly against the zero-dependency,
zero-build-step design `README.md` and `.github/workflows/ci.yml` both
document as intentional. For a single-maintainer project with no regression
history yet, that trade is not worth making. Revisit this decision (per
`GOVERNANCE.md`'s stated triggers) when a second contributor or a real pilot
creates actual demand for automated regression protection.

## When to re-run this

- Before cutting any new version tag.
- After any change to: emergency action flow, medical-card reveal/hide,
  trusted-contact rendering, geolocation handling, service-worker/offline
  behavior, or city-pack/phrase data shape.

## Checklist

Serve the repository root locally (`python -m http.server 8080` from the repo
root — do not `cd FanSafe_PWA` first, or the path below 404s), open
`http://127.0.0.1:8080/FanSafe_PWA/` in a real browser, and record a pass/fail
plus evidence (screenshot, console output, or hash) for each row:

| Check | What to verify |
|---|---|
| Primary navigation | Home, Translate, Safety, Travel, and Me all render and respond to real clicks. |
| Provenance is readable | Safety/Travel show sourced/unreviewed status for city packs; Translate shows the phrase-review disclosure. |
| Toronto taxonomy | Displays `City services (311) / community services (211)` — no police-non-emergency claim. |
| New York pack scope | Displays "New York City" only — no New Jersey claim. |
| Trusted-contact injection regression | `<img src=x onerror=alert(1)>`, `<script>alert(1)</script>`, and raw `< > " ' &` all render as inert text — no alert, no injected element, no console error. |
| Medical-card reveal | Hidden by default after save; requires an explicit "Reveal medical card" click. |
| Reset demo data | Confirmation lists affected local data; confirming restores an empty first-run state. |
| Service worker / offline reload | `navigator.serviceWorker.controller` is `true`; reload while offline retains the app shell and bundled content. |
| Geolocation requested only after click | No location request on load; only after an explicit "Share my location" tap. |
| Denied geolocation fallback | Selecting "Never allow" closes the prompt and opens the general-location share/email fallback — no email sent, no console errors. |

## Recording the result

Copy this table into a new dated file under `docs/release-evidence/<version>/`
(see `v0.1.0-alpha/manual-browser-smoke-test.md` for the exact format,
including commit-under-test, screenshot hashes, and pass/fail notes), rather
than editing this template in place.

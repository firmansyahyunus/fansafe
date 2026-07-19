# Manual browser smoke test — v0.1.0-alpha

## Test environment

- Date: 2026-07-19
- OS: Windows 11 Pro 10.0.26200
- Browser: HeadlessChrome 150.0.0.0 (Playwright CLI)
- Local URL: `http://127.0.0.1:8080/FanSafe_PWA/`
- Commit under test: `c13c2db4245c8078cdb6887489a33b755f49902f`
- Server: `python -m http.server 8080`, serving the repository root; the PWA
  was exercised at its `FanSafe_PWA/` path.

## Results

| Check | Result | Evidence / notes |
|---|---|---|
| PWA loads and primary navigation works | Pass | Home, Translate, Safety, Travel, and Me all rendered and responded to real-browser clicks. |
| Provenance is readable | Pass | Safety displayed `SOURCED · UNREVIEWED`; Travel cards displayed sourced/unreviewed details for all four packs. |
| Toronto taxonomy | Pass | Safety displayed `311 / 211` as `City services (311) / community services (211)`; no police-non-emergency label. |
| New York pack scope | Pass | City switcher, Home, Travel, and Safety all displayed `New York City`; no New Jersey claim was rendered. |
| Translation limitation | Pass | Translate displayed that phrases are maintainer-authored and not native-speaker reviewed. |
| Trusted-contact injection regression | Pass | `<img src=x onerror=alert(1)>`, `<script>alert(1)</script>`, and `< > " ' &` rendered as text; no alert, injected HTML element, or console error appeared. The first payload remained inert after reload. |
| Medical-card reveal | Pass | A test card was hidden after save and required the explicit `Reveal medical card` click before its fields were shown. |
| Reset demo data | Pass | Confirmation listed the affected local data; confirming restored an empty 0% first-run state. |
| Service worker / offline reload | Pass | `navigator.serviceWorker.controller` returned `true`; after setting browser network state to offline, reload retained the app shell and bundled city/phrase content. UI still described the data as sample/prototype, not live external data. |
| Geolocation requested only after click | Pass | No request was made during initial load; `Share my location` initiated the request after an explicit click. |
| Denied geolocation fallback | Not verified | This browser context left the permission request pending and did not resolve it as denied. No pass is claimed. |

The first attempt opened the repository-root directory listing rather than the
PWA path; it was discarded as harness setup, not treated as app evidence. The
proper PWA route had no console errors during the recorded checks.

## Screenshots

| File | SHA-256 |
|---|---|
| `screenshots/toronto-service-taxonomy.png` | `E67FF6B04E100CF590E43F7912EB158306C923123A8E71DD6507304A326C3704` |
| `screenshots/translation-review-status.png` | `AC60DFBA04B56529405C03F436BAF48BF89E042EC3D7EF7B040709FBDB8B2D34` |
| `screenshots/trusted-contact-injection.png` | `DF2334836F2E1A605F371E5D467A26062C9F6C52A06000996F94B3B5BFD26FDD` |
| `screenshots/offline-reload.png` | `F40C7766C7F0CA516BA7D726A829AF09C3AF1891A42FD399D94024F0FEEF1D99` |
| `screenshots/denied-geolocation-city-selection.png` | `7896F5DC26320BF72A9F100F93702CB8197E15684EE3B09D320EAEA20DD1847D` |
| `screenshots/denied-geolocation-before-request.png` | `95401436C508AB8C0E0EDB416BD85B7EF78BA9883261948A09EDCC2839766277` |
| `screenshots/denied-geolocation-pending-permission-fallback.png` | `68B3DBA69340E70313635930B6FA211B70602CCC4BE878752B59D49D298F8728` |

## Gate conclusion

Browser and offline smoke evidence is substantially complete, but this is
**not a complete manual-checklist pass**: denied-geolocation fallback and the
independent human source review remain open. No public-preview readiness or
translation-review claim is elevated by this evidence.

## Focused Gate 1 follow-up (not a repeated readiness audit)

- Date: 2026-07-19
- Browser: HeadlessChrome 150.0.0.0 through Playwright CLI on Windows 11
- Application files: the content recorded immediately afterward in commit
  `5a55254` (`FanSafe_PWA/index.html` and its byte-identical standalone copy)

| Focused check | Result | Evidence |
|---|---|---|
| Toronto taxonomy rendering | Pass | Safety rendered three separate contexts: `911` emergency, `311` City services, and `211` Community referral. No police-non-emergency label appeared. |
| New York City scope | Pass | The active-city chooser showed `New York City`; no New Jersey scope was shown. |
| Legacy city migration | Pass | A browser-local `fansafe.city` value of `newyork-newjersey` migrated on reload to `newyork`; the corresponding downloaded-pack status was preserved under `newyork`. |

This small follow-up only covers the modified taxonomy and migration paths. It
does not change the earlier evidence limitation: denied-geolocation fallback
and independent human source review remain unverified.

## User-supplied geolocation evidence (partial)

- Evidence received: 2026-07-19
- Local origin visible in the permission prompt: `http://127.0.0.1:8081`
- Browser and operating-system versions: not supplied

The screenshots show the city-selection screen, the Safety screen before the
request, and a location-permission prompt after `Share my location` was
clicked. The final screenshot also shows the safe general-location fallback:
`I'm currently in Mexico City. I don't have precise coordinates available...`
and no precise coordinates or delivery claim.

**Result: partial pass, not a denied-permission pass.** The browser prompt is
still visible with a `Never allow` option in the final screenshot. Therefore
the evidence does not show that the user selected denial or that the browser
returned a permission-denied callback; the fallback may have followed the
application timeout. A final test must select `Never allow`, wait for the
prompt to disappear, confirm the same fallback, and record browser/OS version,
tested commit, and console result.

# FanSafe — Travel Safety Companion (Prototype)

FanSafe is a standalone, offline-first safety, communication, and travel-assistance
companion for international football supporters. It is a **prototype**, not a live
emergency, medical, embassy, or ticket-authentication service.

This build implements FanSafe only. FanLocal (a possible future marketplace/booking
module) is explicitly out of scope and does not appear anywhere in this app — not
even as a disabled tab or placeholder.

## What's included

- `index.html` — the full application (HTML + CSS + vanilla JS, no build step, no
  external dependencies, no API keys)
- `manifest.json` — PWA manifest
- `sw.js` — service worker (app-shell caching, offline fallback)
- `icon-192.png`, `icon-512.png` — app icons
- `README.md` — this file
- `DECISION_LOG.md` — meaningful decisions and deviations from the reference prototype
- `TEST_REPORT.md` — what was actually validated, and what was not

The standalone file at the project root, `FanSafe_Standalone_Prototype.html`, is a
byte-identical copy of `index.html`. It works by double-clicking it open in a
browser (`file://`) — the service worker simply won't register there, which is
expected and handled gracefully.

## Running it

**Standalone (fastest):** double-click `FanSafe_Standalone_Prototype.html`, or open
it in any modern desktop or mobile browser.

**As a PWA (recommended for the full offline/install experience):**

```bash
cd FanSafe_PWA
python -m http.server 8080
```

Then open `http://localhost:8080/` and, if your browser supports it, install it to
the home screen / desktop via the install prompt or the browser's "Install app" menu
option.

No build step, no `npm install`, no API keys, no mandatory CDN.

## Navigation

`Home | Translate | Safety | Travel | Me`

## Product principles this build follows

- Safety-critical tools are independent of any commerce/marketplace concept.
- Nothing is uploaded anywhere. All data lives in this browser's `localStorage` on
  this device only, until the user explicitly copies or shares it themselves.
- The app never claims a message was "sent" or "delivered" — only that it was
  copied to the clipboard or handed to the device's native share sheet.
- The medical card is hidden by default and requires an explicit tap to reveal,
  except inside the emergency action sheet, where reveal is one tap with no extra
  confirmation (the whole point of the card is to be usable in a real incident).
- Local safety/incident/scam records are always labeled as local-only and are never
  claimed to have been submitted to police, an embassy, or event organizers.
- FanSafe never invents specific embassy/consulate contact details — it points to
  "your government's official consular directory" only.

## Known limitations (see TEST_REPORT.md for full detail)

- Voice input (speech recognition) and text-to-speech depend entirely on the
  browser/device. Both are feature-detected with graceful fallbacks (a type-to-speak
  modal, and a "not supported" toast, respectively).
- Emergency numbers are sample/demo data for four cities (Mexico City, Toronto,
  New York City, Vancouver) and must be verified locally before real travel.
- Flag emoji render as two-letter codes on Windows/Chrome — a known OS font
  limitation, not an app bug (Mac/iOS render real flags).

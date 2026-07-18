# Privacy Model

This document describes what FanSafe actually does with data today, verified
against `FanSafe_PWA/index.html` and `FanSafe_PWA/STATE_SCHEMA.md`. It is not
a legal privacy policy for a deployed service — FanSafe is not currently
deployed anywhere except a user's own local browser.

## Where data lives

All application state lives in the browser's `localStorage`, namespaced
under the `fansafe.` prefix (`fansafe.profile`, `fansafe.medical_card`,
`fansafe.trusted_contacts`, `fansafe.lost_documents`,
`fansafe.scam_assessments`, `fansafe.safety_cases`, `fansafe.city_packs`,
`fansafe.languages`, `fansafe.saved`, `fansafe.readiness`, `fansafe.ui`,
`fansafe.city`). Every read goes through a `safeGet(key, fallback)` helper
that falls back to a safe default on missing or malformed data.

**Nothing is transmitted to any server.** Verified: the only literal external
URL in the source is a `https://maps.google.com/?q=...` string built
client-side for a "here's my location" share message — the app never
`fetch`es it or any other network resource; there is no analytics, telemetry,
or third-party script anywhere in `index.html`.

## Medical card

- Hidden by default; `hidden` is a persisted preference, but *reveal* is a
  transient in-memory flag (`medicalRevealed`) that resets whenever the user
  changes screens.
- One exception: inside the emergency action sheet, reveal is a single tap
  with no secondary confirmation — a deliberate trade-off documented in
  `FanSafe_PWA/DECISION_LOG.md` (friction there works against the card's
  purpose during a real incident).
- The medical card, and the shared-device warning shown alongside it, are
  never uploaded anywhere; deleting it is immediate and local.

## Location

- Geolocation is requested **only** after an explicit tap on "Share my
  location" (`shareLocation()` in `index.html`) — never on page load, never
  in the background.
- Precise coordinates are **never persisted**. `buildLocationMessage()`
  rounds coordinates to 4 decimal places and builds a one-off message string
  for the user to copy or hand to their device's native share sheet; the
  coordinates are not written to any `localStorage` key.
- If geolocation is unavailable or denied, the app falls back to a
  city-level message with no coordinates at all.

## Trusted contacts and check-in messages

Contact details (`name`, `channel`, `value`) are stored locally only. "I am
safe" / "I need help" / location-share messages are copied to the clipboard
or handed to the OS share sheet — the app never claims a message was "sent"
or "delivered," because a successful share-sheet call does not guarantee the
message reached anyone. This wording was a deliberate, audited decision (see
`DECISION_LOG.md`, "No-false-claims wording").

## Incident, scam-assessment, and lost-document records

All local-only. Every record surfaces a visible "local record only — not
submitted anywhere" label and is never claimed to have reached police, an
embassy, or event organizers.

## No analytics, no telemetry, no first-run tracking

There is no usage measurement of any kind in the current build. This means
FanSafe currently has **no way to measure adoption or feature usage without
adding instrumentation** — a real gap for funding/impact evidence (see
`docs/pilot-plan.md`), which must be closed with privacy-preserving,
opt-in, aggregate-only methods, not by adding silent tracking.

## Resetting data

"Reset demo data" deletes every `localStorage` key with the `fansafe.`
prefix (`Object.keys(localStorage).filter(k => k.startsWith("fansafe."))`)
after an explicit confirmation modal listing what will be deleted.

## Shared-device risk

`localStorage` is plaintext and readable by anyone with access to the same
browser profile or the device's DevTools/file system. This is a structural
property of the storage model, not a bug — it is surfaced to users via the
medical card's shared-device warning text, and is tracked as an accepted
residual risk in `docs/threat-model.md`.

## Third parties

None. No CDN, no analytics vendor, no API provider, no embedded iframe, no
font service. If any of these are introduced in the future, this document
must be updated in the same change.

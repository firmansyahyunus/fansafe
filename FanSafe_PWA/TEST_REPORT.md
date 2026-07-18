# Test Report

Honest record of what was actually checked. Claims are limited to checks that were
actually performed — see "Not tested" at the end for explicit gaps.

## Method

1. **Static/automated checks** (Node.js, run from the project root).
2. **Interactive browser checks** — the app was served locally
   (`python -m http.server 8099` from `FanSafe_PWA/`) and driven in real Chrome via
   browser automation (clicks, typing, screenshots, console-log inspection), not
   just read as source code. `FanSafe_Standalone_Prototype.html` is byte-identical
   to `FanSafe_PWA/index.html`, so these results apply to both.

## 1. Static checks (all passed)

| Check | Result |
|---|---|
| JavaScript syntax (`node --check` on the extracted `<script>` body) | Pass |
| Duplicate HTML `id` attributes | Pass — 180 unique ids, 0 duplicates |
| HTML tag balance (`div`, `section`, `button`, `header`, `nav`, `main`, `label`, `a`) | Pass — open/close counts match for every tag checked |
| `$("#id")` / `getElementById` references vs. actual HTML ids | Pass — 174 of 178 referenced ids exist in the static HTML; the remaining 4 (`voiceFallbackInput`, `saveRiskAssessment`, `makeRiskCase`, `caseUpdateText`) are injected via `innerHTML` immediately before being queried — confirmed by reading the surrounding code, not just the id list |
| ZIP integrity (`unzip -t FanSafe_PWA.zip`) | Pass — 5/5 files, no errors |
| Service-worker registration is conditional | Confirmed by code: guarded by `"serviceWorker" in navigator` and wrapped in `.catch()`, so it fails silently and harmlessly under `file://` |
| Icons generated and load | Confirmed — `icon-192.png` (2.6 KB) and `icon-512.png` (7.6 KB) generated with Pillow, both readable as valid PNGs |
| `manifest.json` / `sw.js` reachable over HTTP | Confirmed — HTTP 200 for `index.html`, `manifest.json`, `sw.js` from the local server |

## 2. Interactive browser checks (Chrome, served over local HTTP)

All of the following were driven live in a browser, not inferred from source:

- **Journey A (initial setup):** welcome overlay dismiss (both "Start setup" and
  "Skip intro next time"); city switcher sheet opens, lists all 4 packs with correct
  flag/country/download status; selecting Mexico City sets the active city, shows a
  toast, and immediately moves readiness 0% → 20%; readiness ring is **live**, not
  cached — it recalculated correctly at every subsequent step (20% → 40% after
  downloading the city pack → 60% after adding a trusted contact → 80% after
  creating a medical card), matching the same number on both Home and Me.
- **Journey B (translate a phrase):** all 17 quick-phrase pills render across all 8
  category chips; tapping "Tolong panggil ambulans." auto-translated to "Por favor,
  llame a una ambulancia."; Save phrase produced a toast and the phrase appeared
  correctly in Saved Phrases, Home's "Recent saved phrase," and Me's "Saved items."
  Full-screen phrase mode opened with large centered text and working Close/Play/
  Copy-share controls.
- **Emergency entry points:** a quick tap-and-release on the hold-to-confirm SOS
  button correctly did **not** open the emergency sheet, confirming the
  accidental-activation guard works. The emergency sheet was separately opened via
  the incident-report "No, I need help now" path, showing the correct contextual
  copy ("You indicated you are not currently safe...") and all five actions (call,
  share location, message contact, reveal medical card, play phrase).
- **Journey I (scam/ticket checker → local case):** checking "Payment is crypto,
  gift card, or bank transfer only" and running the check produced "Risk level:
  MEDIUM" with the correct reason and suggested actions (this required a threshold
  fix during testing — see DECISION_LOG.md). "Create local record" produced the
  toast "Local record created (FS-EV4MB). Not submitted anywhere." and the record
  appeared in "My local safety records" with a `DRAFT` status badge and the
  "LOCAL RECORD ONLY — NOT SENT TO POLICE, AN EMBASSY, OR EVENT ORGANIZERS" label.
- **Journey J (offline city pack):** downloading the Mexico City pack ran a visible
  progress animation (0%→100%), ended in a "✓ Ready" state, updated "Offline storage
  health" to "1 of 4 packs ready," and showed a "City pack ready offline." toast.
- **Journey H (lost document):** selecting "No, just missing," filling the form, and
  saving produced toast "Local record saved (record DOC-URMSH)," generated the
  correct Spanish phrase ("He perdido mi pasaporte."), and rendered a record card
  with the same "LOCAL RECORD ONLY" disclaimer, Mark resolved/Delete actions, and
  the official-directory guidance text (no invented embassy details).
- **Journey F (medical card):** created a card (name + allergy); it was hidden by
  default immediately after saving; "Reveal medical card" showed all fields
  correctly, including a live "Add a trusted contact" placeholder for the emergency
  contact field before any contact existed; the shared-device warning text rendered.
- **Journey G (trusted contact):** added a contact; it appeared in the list; the
  medical card's "Emergency contact" field updated to reference it on the next
  reveal.
- **Reset:** "Reset demo data" opened a confirmation modal listing exactly what
  would be deleted; confirming it cleared all `fansafe.*` `localStorage` keys,
  reloaded the app, and returned Home to a genuine 0% / empty state with the welcome
  overlay reappearing (proof that `fansafe.ui.seenWelcome` was cleared along with
  everything else).
- **Console:** no JavaScript errors or exceptions were observed in the browser
  console during any of the above (checked directly via the browser's console log).

## 3. Not tested (explicit gaps — do not assume these pass)

- **Audio output.** `speechSynthesis.speak()` calls fired without console errors,
  but actual audio playback cannot be confirmed by a screenshot and was not
  independently verified.
- **Live voice input / two-way conversation speech recognition.** The automation
  environment has no microphone permission, so the `SpeechRecognition` success path
  was not exercised. The type-to-speak fallback modal (for browsers without
  `SpeechRecognition` support) and the conversation screen's language selection,
  bubble rendering, and transcript clear/toggle were reviewed in code but not
  click-tested end-to-end with a real recognized utterance.
- **Geolocation success/denial paths.** "Share my location" was clicked and
  correctly showed "Requesting your location…," but the automation environment does
  not grant real geolocation permission, so neither the success branch (real
  coordinates in the composed message) nor the explicit denial branch was visually
  confirmed — only the request itself.
- **Clipboard / native share-sheet final state.** Copy-to-clipboard and
  `navigator.share()` calls were triggered, but automated/sandboxed browser contexts
  often restrict clipboard access silently; the actual clipboard contents or a
  native OS share sheet appearing were not independently verified.
- **True PWA install + standalone window.** Chrome's install banner appeared
  (proof the manifest + service worker are recognized as installable), but the app
  was not actually installed and reopened in standalone display mode.
- **True offline reload.** The service worker's cache-first/offline fallback
  behavior was reviewed in code (`sw.js`) but not exercised by disconnecting the
  network and reloading.
- **Screen reader / assistive technology.** No NVDA, VoiceOver, or TalkBack pass was
  performed. Semantic headings, form labels, focus-visible styling, and `aria-*`
  attributes were code-reviewed only.
- **Cross-browser / cross-device.** Only tested in one desktop Chrome instance.
  Safari, Firefox, Edge, and real iOS/Android devices were not tested.
- **Real-world accuracy of any emergency, embassy, or ticket-authenticity
  information.** All such content is explicitly labeled sample/demo data in the
  UI and must not be treated as verified.

## 4. 2026-07-19 public-release gate-0 changes — what was and wasn't (re-)verified

Two functional changes were made to `index.html` this session (see
`DECISION_LOG.md`): escaping the contact-avatar initials, and adding the
`reviewStatus`/`packReviewLabel()` provenance display (dynamic pill on the
Safety screen, extra detail text on Travel pack cards, a static note on the
Translate screen about phrase review status).

- **Re-verified (static/automated):** `node tools/validate-repo.js` passes
  — JS syntax valid, all 181 ids unique, all `$()/getElementById`
  references resolve, `FanSafe_Standalone_Prototype.html` re-synced and
  confirmed byte-identical.
- **NOT re-verified interactively.** This session did not have interactive
  browser automation available. The new pill text, tooltip, and note have
  **not** been visually confirmed to render correctly, and the
  contact-avatar escaping fix has not been re-driven through the actual
  "add a trusted contact" flow in a live browser. Static validation catches
  syntax errors and dangling id references; it does not catch CSS layout
  issues or confirm the pill/tooltip actually reads as intended on screen.
  Treat this as an open item for the next session with browser access.

No claim in this report extends beyond what is listed above as tested.

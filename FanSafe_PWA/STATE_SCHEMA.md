# State Schema

All state lives in `localStorage`, namespaced under `fansafe.*`. Every read goes
through `safeGet(key, fallback)`, which resiliently falls back to a safe default on
missing keys or malformed JSON.

| Key | Shape | Notes |
|---|---|---|
| `fansafe.profile` | `{ name, homeLanguage, accessibility, dietary, cityConfirmed }` | `cityConfirmed` is a readiness factor, set true only via the city switcher |
| `fansafe.city` | `string` (city id) | one of `mexico`, `toronto`, `newyork`, `vancouver` |
| `fansafe.city_packs` | `{ [cityId]: { downloaded, version, updatedAt } }` | simulated download state |
| `fansafe.languages` | `{ travellerLang, localLang }` | ISO-ish codes: `id`, `en`, `es`, `fr` |
| `fansafe.saved` | `SavedItem[]` | unified store — `type: "phrase" \| "place" \| "document_reference"` |
| `fansafe.medical_card` | `{ fullName, bloodType, allergies, medicationsOrConditions, hidden, updatedAt }` | never auto-revealed |
| `fansafe.trusted_contacts` | `TrustedContact[]` | `{ id, name, channel, value, primary }` |
| `fansafe.lost_documents` | `LostDocumentRecord[]` | `{ id, documentType, ongoingDanger, lastKnownLocation, policeReference, departureDate, notes, status, createdAt }` |
| `fansafe.scam_assessments` | `ScamAssessment[]` | `{ id, riskLevel, reasons, createdAt }` — saved independently of case creation |
| `fansafe.safety_cases` | `SafetyCase[]` | unified incident + scam-case store — `{ id, kind, caseType, currentlySafe, locationLabel, occurredAt, details, desiredNextStep, status, riskLevel?, reasons?, updates[], createdAt }`; `status` is `draft \| active \| closed` |
| `fansafe.readiness` | `{ docChecklist: { [itemId]: boolean } }` | the other 4 readiness factors are derived live from the stores above, not persisted separately |
| `fansafe.ui` | `{ seenWelcome, translateMode, activeCategory, lastCheckin, conversationTranscript[], keepTranscript }` | `conversationTranscript` is only persisted when `keepTranscript` is true |

## Invariants enforced in code

- Medical card is never displayed automatically; `hidden` gates rendering, and reveal
  is a transient in-memory flag (`medicalRevealed`) that resets on every screen
  change except inside the emergency sheet.
- Precise geolocation coordinates are never persisted — `buildLocationMessage()`
  builds a one-off string and does not write coordinates to any store.
- `Reset demo data` deletes every key with the `fansafe.` prefix via
  `Object.keys(localStorage).filter(k => k.startsWith("fansafe."))`.

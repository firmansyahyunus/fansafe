# Decision Log

Meaningful decisions made while building FanSafe from the handoff package, and
deviations from the reference prototype (`reference_prototype/FanSafe_26_Prototype_95.html`).
Per the source-of-truth hierarchy, undocumented assumptions are called out here.

## Navigation relabel

The reference prototype used `Home | Translate | SOS | Guide | Me`. The handoff's
locked navigation is `Home | Translate | Safety | Travel | Me`. Screens were rebuilt
under the new names and re-scoped: `Safety` absorbs SOS plus the scam/ticket checker
and the new non-emergency incident-report flow; `Travel` absorbs the old Guide screen
plus city-pack management, saved places, and the travel-document checklist.

## Fresh (empty) first-run state instead of a pre-seeded persona

The reference prototype shipped with a fake pre-filled user ("Susan Lee", a fake
trusted contact, a fake medical card). This build ships **empty**: no fake medical
data, no fake contact. Home realistically shows ~0% readiness on first load and
grows as the user completes real setup steps (Journey A). Reasoning: pre-filling
private fields (medical/contact data) undercuts the app's own privacy-by-design
claims, and a safety app should not ship with a stranger's fake medical card
already visible. Traded off against "feels less immediately impressive" — mitigated
with a welcome overlay that frames the setup checklist as the first thing to do.

## Readiness scoring

Five equally-weighted (20% each) boolean factors, computed live (not persisted/
ratcheted) so the ring reacts immediately to any change, including undoing a step
(e.g. deleting the only trusted contact drops the score back down):

1. Active city explicitly confirmed (via the city switcher, not just the default)
2. Active city's pack downloaded
3. At least one trusted contact added
4. Medical card has a full name **and** at least one substantive field (blood type,
   allergies, or medication/conditions) — a name-only card was judged not
   "emergency-useful" enough to count
5. At least one travel-document checklist item checked

## Medical card reveal behavior

Hidden by default, persisted as a preference. Revealing requires an explicit tap and
is a session-only (in-memory) flag — it re-locks whenever the user switches tabs. The
one exception: inside the emergency action sheet, "Reveal medical card" is a single
tap with no secondary confirmation, since friction there works against the card's
purpose (a bystander helping in a real incident).

## City emergency data

All four demo cities (Mexico City, Toronto, New York City, Vancouver) legitimately
share `911` as the primary number (they're all NANP countries), so instead of
inventing artificial per-city variation, each city pack also carries a real,
distinct **non-emergency** number/service (Locatel for CDMX, 311/211 for Toronto,
311 for NYC, E-Comm non-emergency for Vancouver). The whole demo dataset is labeled
"SAMPLE DATA — verify locally," once per screen, rather than annotating every
individual number.

## Scam/ticket risk thresholds

Initial weights (1–3 per signal) with medium ≥4 / high ≥8 under-scored a single
serious signal (e.g. "payment is crypto/gift-card/wire only," weight 3) as LOW risk.
Thresholds were tightened to medium ≥3 / high ≥6 during in-browser testing so that
one serious red flag alone reaches MEDIUM, and two reach HIGH.

## Scam assessments and incident reports share one case store

Both flows write into the same `SafetyCase`-shaped local record store (with a
`kind: "incident" | "scam_assessment"` field) rather than two separate stores, to
avoid duplicating CRUD/update/delete code for no user-facing benefit. They remain
two distinct *creation* flows and are visually distinguishable via `caseType` and
`riskLevel`. Case status uses `draft / active / closed` (not `open`, which could read
as "someone is handling this").

## No-false-claims wording

Every user-facing string for location sharing and contact messaging was written to
say "copied to clipboard" or "opened your share sheet" and explicitly never "sent"
or "delivered" — a share-sheet action resolving successfully does not mean the
message reached anyone. Local safety/incident/scam/lost-document records always
carry a visible "local record only — not submitted anywhere" label.

## Lost-document "ongoing danger" branch opens the emergency sheet directly

Rather than just switching the user to the Safety tab (which would require a second
navigation while potentially still in danger), answering "yes, ongoing danger" in
the lost-document flow opens the same emergency action sheet used by the hold-to-confirm
SOS button and the incident-report "No, I need help now" path, with contextual
messaging. This reuses one component (`openEmergencySheet(context)`) across all three
entry points instead of building three separate danger UIs.

## Header copy fix

Home's header subtitle was originally "Safety readiness overview," which reads as if
the user is on the Safety tab. Renamed to "Your travel readiness" to remove the
ambiguity (caught during in-browser testing).

## Stack

Single HTML file (inline CSS + vanilla JS), `localStorage`, Web Speech Synthesis,
optional `SpeechRecognition` (feature-detected, with a type-to-speak modal fallback),
Geolocation (only requested after an explicit click), Web Share API with a clipboard
fallback and a final "copy this text" modal fallback. No framework, no build step,
no external API keys, no mandatory CDN — matches the handoff's preferred stack.

## Contact-avatar initials now escaped (2026-07-19)

During a public-release security pass, every `innerHTML` assignment in this
file was audited (see `../docs/threat-model.md`, T3). All but one already
escaped user-controlled input via the existing `escapeHtml()` helper. The
exception: `renderContacts()`'s contact-avatar initials
(`c.name.slice(0,2).toUpperCase()`) were inserted unescaped. Practical
exploitability was low (only 2 characters reach the sink), but it was
inconsistent with the rest of the file. Fixed by wrapping the same
expression in `escapeHtml()` — no behavior change for any normal contact
name, since escaping only affects the 5 characters `& < > " '`. This was the
only functional change made to `index.html` in the earlier gate-0 session;
later gate work is recorded separately below.

## City-pack scope and service taxonomy correction (2026-07-19)

The New York pack is now labeled **New York City** throughout the running
app and its reference artifacts. Its cited 311 information is NYC-specific;
retaining a New Jersey claim would imply coverage that the pack does not
have. A separate New Jersey pack needs its own official sources and review.

Toronto's two non-emergency entries remain 311 and 211, but their user-facing
label now calls out the distinct services: 311 is city services and 211 is
community services. Neither is called police non-emergency. Toronto Police's
separate non-emergency number is not added here because independent human
source review has not been completed. This is a label/scope correction, not
a claim that the whole city-pack data model has been independently verified.

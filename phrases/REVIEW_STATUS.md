# Phrase Review Status

Reference extraction of the **safety-critical** phrase categories
(`emergency`, `medical`, `police`, `lost_document`) from
`FanSafe_PWA/index.html`'s hardcoded `phraseBook` array, produced during the
2026-07-19 public-release gate-0 session. Like `city-packs/`, this is a
reference artifact — **`index.html` still uses its own inline array; this
extraction is not wired into the running app** (see `docs/architecture.md`,
Phase 2).

## Scope

9 of the 17 total phrases: `em1`, `em2` (emergency), `med1`, `med2`, `med3`
(medical), `pol1`, `pol2` (police), `doc1`, `doc2` (lost_document). The
remaining 8 phrases (`navigation`, `transport`, `hotel`, `ticket_scam`
categories) were not extracted this session — they are lower safety
priority and out of scope for this pass. `docs/content-governance.md`'s
review requirements apply to them too whenever they are extracted.

## Status: all 9 phrases are `"unreviewed"`

Every phrase in `phrases/safety-critical.json` is marked
`"reviewStatus": "unreviewed"`. This is a deliberate, evidence-based
default, not an oversight:

- No record exists anywhere in the repository (code, `DECISION_LOG.md`, or
  elsewhere) of who translated these phrases or by what method
  (self-authored, professional translator, machine translation, etc.).
- Per `LICENSE-PROPOSAL.md` and `docs/content-licensing-matrix.md`, this
  same missing-provenance gap is also why phrase content is not licensed
  for reuse yet — the two issues (review status and license status) share
  one root cause.
- **Do not claim `"native-speaker-reviewed"` or `"professionally-translated"`
  for any phrase without an evidenced `reviewedBy` entry.**
  `tools/validate-phrases.js` enforces this: it fails validation if
  `reviewStatus` claims review but `reviewedBy` is empty.

## What would change a phrase's status

1. A fluent or native speaker of the target language reviews the phrase
   for accuracy and, for emergency/medical phrases specifically, for being
   unambiguous under stress (per `docs/content-governance.md`).
2. Record that reviewer in the phrase's `reviewedBy` array:
   `{ "language": "es", "reviewer": "<name or handle>" }`.
3. Update `reviewStatus` to `"native-speaker-reviewed"` (or
   `"professionally-translated"` if applicable, with the same evidence
   standard).
4. Re-run `node tools/validate-phrases.js` to confirm it passes.

## Why this matters more for these 4 categories than the other 8

A wrong "navigation" phrase is an inconvenience. A wrong or ambiguous
"medical" or "emergency" phrase, used by someone under real stress in a
country where they don't speak the language, is a safety issue. This is
why `docs/content-governance.md` singles out emergency/medical phrases for
a stricter review bar, and why this session's provenance pass started here
rather than with the full 17-phrase set.

# Phrase Review Status

`phrases/safety-critical.json` is the contributor-side source of truth for
all 17 entries in FanSafe's phrase book. Its legacy filename is retained for
continuity; it does not mean that every one of the 17 phrases is
safety-critical.

`node tools/sync-phrases.js` schema-validates this file and generates the
inline `const phraseBook = [...]` literal in both
`FanSafe_PWA/index.html` and `FanSafe_Standalone_Prototype.html`. This is a
code-generation step, not a runtime data fetch, so the documented
double-click/`file://` path remains supported.

## Scope and current status

All 17 phrases are marked `"reviewStatus": "unreviewed"`. This is a
deliberate, evidence-based default: the repository has no record of who
translated the phrases or by which method. No translation text was changed
when this source-of-truth file was introduced.

The nine safety-critical phrases remain explicitly unreviewed:

- `em1`, `em2` (emergency)
- `med1`, `med2`, `med3` (medical)
- `pol1`, `pol2` (police)
- `doc1`, `doc2` (lost document)

The remaining eight navigation, transport, hotel, and ticket/scam phrases
are also unreviewed. Their lower immediate safety priority does not create
evidence of translation quality or authorship.

## What would change a phrase's status

1. A fluent or native speaker reviews the phrase for accuracy and, for
   emergency/medical phrases, for being unambiguous under stress (per
   `docs/content-governance.md`).
2. Record the reviewer in the phrase's `reviewedBy` array, for example:
   `{ "language": "es", "reviewer": "<name or handle>" }`.
3. Update `reviewStatus` to `"native-speaker-reviewed"` (or
   `"professionally-translated"` where evidenced).
4. Run `node tools/sync-phrases.js`, then `node tools/validate-repo.js`.

Do not claim `"native-speaker-reviewed"` or
`"professionally-translated"` without the corresponding `reviewedBy`
evidence. `tools/validate-phrases.js` rejects reviewed statuses without it.

## Why the safety-critical subset needs particular care

A wrong navigation phrase is an inconvenience. A wrong or ambiguous medical
or emergency phrase, used by someone under real stress in a country where
they do not speak the language, is a safety issue. That is why
`docs/content-governance.md` applies a stricter review bar to the emergency
and medical categories.

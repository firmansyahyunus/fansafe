# Threat Model

Practical, V1-appropriate threat model. No cryptography is recommended here
beyond what the browser already provides — see "Deliberately not doing yet."

## Assets

| Asset | Where it lives | Sensitivity |
|---|---|---|
| Medical card (`fansafe.medical_card`) | `localStorage` | High — blood type, allergies, medications/conditions, full name |
| Trusted contacts (`fansafe.trusted_contacts`) | `localStorage` | Medium — third-party names and contact channels/values |
| Location strings composed for sharing | Transient (built in-memory, never persisted) | Medium while in memory/clipboard; not an at-rest asset |
| Incident / scam-assessment / lost-document records (`fansafe.safety_cases`, `fansafe.scam_assessments`, `fansafe.lost_documents`) | `localStorage` | Medium — may include free-text `details`/`notes` fields the user wrote |
| Traveller profile (`fansafe.profile`) | `localStorage` | Low-medium — name, home language, accessibility/dietary notes |
| City-pack / phrase content | Hardcoded in `index.html` today; JSON in `city-packs/` (reference only) | Low sensitivity, but **high integrity requirement** — wrong emergency numbers are a safety risk |

## Actors

- **The device owner** (intended user) — full legitimate access to all
  local data.
- **A person who shares the device** (family member, hostel roommate,
  someone who finds a lost/unlocked phone) — the primary realistic threat
  actor for this app, given the storage model.
- **A malicious or compromised web page** in the same browser — cannot read
  another origin's `localStorage` due to same-origin policy; not a realistic
  threat unless the browser itself is compromised.
- **A supply-chain attacker** — not applicable today (zero dependencies),
  but becomes relevant the moment any dependency is introduced (see NOTICE).
- **A malicious city-pack contributor** (once external contributions exist)
  — could submit an incorrect emergency number or an XSS payload disguised
  as phrase content.

## Trust boundaries

1. Browser `localStorage` origin boundary (device/browser-profile scoped).
2. The device's own OS/lock-screen boundary (FanSafe has no boundary of its
   own beneath the OS).
3. Service-worker cache boundary (`fansafe-cache-v1`) — same-origin, but a
   compromised or malicious update could poison what's served offline.
4. Future: a city-pack content-review boundary, once contributions are
   accepted (see `docs/content-governance.md`).

## Threats, existing mitigations, missing mitigations

### T1 — Shared-device exposure of medical card / contacts

- **Mitigation in place:** medical card hidden by default, reveal is a
  transient in-memory flag that resets on screen change (except inside the
  emergency sheet, a deliberate exception — see `DECISION_LOG.md`); a
  shared-device warning is shown alongside the revealed card.
- **Missing:** no PIN/passphrase lock on top of "hidden by default"; no
  auto-lock timer independent of screen navigation.
- **Residual risk:** accepted as V1-appropriate. A PIN would add friction
  that could work against emergency usability, and would give a false sense
  of security against anyone who can unlock the underlying device anyway.

### T2 — False impression that help was contacted

- **Mitigation in place:** every check-in/location/help message uses
  "copied to clipboard" / "opened your share sheet" wording, never "sent" or
  "delivered" (verified: no such overclaiming strings found in `index.html`
  by direct search). All local records carry a "local record only" label.
- **Missing:** nothing identified as missing for this specific threat at
  current scope.

### T3 — XSS / injection via phrase, city-pack, or saved-item content

**Status: audited exhaustively and closed for all currently-existing sinks,
2026-07-19 (public-release gate-0 session).**

Every `innerHTML` assignment in `FanSafe_PWA/index.html` (24 sites) was
read and classified by input source:

| Input classification | Example | Handling |
|---|---|---|
| Static trusted constant (maintainer-authored arrays: `cityPacks`, `phraseBook`, `categories`, `languages`, `riskSignals`, `docChecklistItems`) | City names, phrase text, category labels | Not escaped — correct, since these are not user input and are part of the source under the same trust boundary as the code itself |
| Browser-derived from a constrained `<select>` (fixed enum options in the HTML) | `caseType`, `documentType`, `channel` | Not escaped — correct, the value space is limited to a handful of hardcoded `<option>` values; no free text can reach these fields |
| User-controlled free text (`<input>`/`<textarea>` values, or values read back from `localStorage` that originated from such fields) | Medical card fields, trusted-contact name/value, saved phrase/place titles, incident/case details and updates, lost-document notes, conversation transcript text | **Escaped via the existing `escapeHtml()` helper** (`index.html:1207-1209`) in 23 of 24 sites — confirmed correct by direct reading, not assumed |

**Finding:** one site was NOT escaped: `renderContacts()`
(`index.html`, `contact-avatar` div) inserted
`c.name.slice(0,2).toUpperCase()` — derived from the trusted-contact name,
a free-text `<input>` field (`#contactName`, no `<select>` constraint) —
directly into `innerHTML` without calling `escapeHtml()`. Practical
exploitability was low (only the first 2 characters of the name reach the
sink, too short to construct a functioning tag or event-handler attribute
in isolation), but it was inconsistent with every other user-controlled
sink in the same file and is exactly the class of defect this audit was
asked to close regardless of immediate exploitability.

**Fix applied:** wrapped the same expression in the existing `escapeHtml()`
helper — `escapeHtml(c.name.slice(0,2).toUpperCase())`
(`FanSafe_PWA/index.html`, `renderContacts()`). No new dependency added
(the helper already existed and is already used everywhere else). The
byte-identical `FanSafe_Standalone_Prototype.html` copy was regenerated
from the fixed file (`md5sum` re-verified to match).

**Also found, not a security issue but noted for completeness:** the
non-emergency, `SafetyCase.locationLabel` field (captured from a free-text
`<input>` in the incident-report form) is stored in `localStorage` but is
**never rendered anywhere** in `renderCaseList()` — a product/UX
completeness gap, not an injection risk (nothing unescaped happens because
nothing happens with it at all). Flagged for the maintainer as a possible
future fix, out of scope for this security pass.

- **Residual risk after fix:** low. All 24 `innerHTML` sites in the shipped
  code now either handle only trusted/constrained input, or escape
  user-controlled input consistently. Residual risk is limited to (a) any
  *new* code introducing an unescaped sink in the future — mitigated by the
  PR template checklist item added this session and by
  `tools/validate-repo.js`'s ability to be extended with a static grep-based
  check (see `docs/content-governance.md`'s automated-validation section for
  the equivalent city-pack/phrase pattern; a full static analyzer for this
  is not built, since it would require parsing JS AST — out of scope for a
  zero-dependency validator); and (b) once external phrase/city-pack
  contributions are accepted (`docs/content-governance.md`), that content
  flows into sinks classified above as "static trusted constant" — human
  PR review is the actual control there, same conclusion as before.
- **Evidence:** direct line-by-line reading of all `innerHTML` assignments
  in `FanSafe_PWA/index.html` during this session; `node tools/validate-
  repo.js` re-run after the fix (still passes, id/reference counts
  unchanged: script now 65,057 chars post-fix vs 65,045 before, ids still
  180 unique, 174 references resolve).

### T4 — Incorrect emergency-number data reaching a real traveller

- **Mitigation in place:** every city screen carries a "SAMPLE DATA — verify
  locally" label (per `DECISION_LOG.md`); `TEST_REPORT.md` explicitly states
  real-world accuracy of emergency/embassy/ticket information was never
  independently verified and must not be treated as such.
- **Missing:** a sourcing/review/expiry process for any future real
  (non-demo) emergency data — see `docs/content-governance.md`, which is the
  direct mitigation for this threat.

### T5 — Service-worker cache poisoning / stale offline content

- **Mitigation in place:** cache is same-origin; `sw.js` uses a versioned
  cache name (`fansafe-cache-v1`) and clears old caches on `activate`.
- **Missing:** no integrity/signature check on cached content; not tested
  under a true offline reload (`TEST_REPORT.md`, "Not tested").
- **Residual risk:** low while there is no server-side deployment and no
  update channel other than redeploying the static files wholesale.

### T6 — Supply-chain risk

- **Not applicable today** — zero dependencies (verified). This section
  must be revisited the moment `tools/` or any future build step introduces
  an npm dependency; at that point, add dependency-pinning and an audit step
  to `tools/validate-repo.js` / CI.

## Content integrity and signed updates — staged approach

Signed city-pack updates are **premature** for a project with one
maintainer, no distribution channel beyond static files, and no external
contributors yet. Staged approach:

1. **Now:** schema validation only (`tools/validate-city-pack.js`) — catches
   malformed data, not malicious-but-well-formed data.
2. **When external contributions begin:** human review via pull request
   (see `docs/content-governance.md`) is the actual integrity control — no
   cryptography substitutes for a human checking a cited emergency-number
   source.
3. **Only if/when FanSafe ships an out-of-band content-update mechanism**
   (i.e., city packs update without a full app redeploy): revisit signing
   packs at that point. Do not build this speculatively before that
   mechanism exists.

## Abuse cases considered

- A user relying on the scam/ticket risk checker's output as a definitive
  authenticity verdict rather than a risk signal — mitigated by the UI
  showing "risk level" + reasons, not a binary "safe/unsafe" claim (per
  `SCREEN_MAP.md`); not independently UX-tested for how it's perceived under
  stress.
- A user relying on the emergency action sheet believing "share location"
  guarantees delivery — mitigated by T2's wording controls.

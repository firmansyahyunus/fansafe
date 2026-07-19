# FanSafe — program-agnostic application kit

Reuse this file's content verbatim across grant, accelerator, hackathon, and
builder-program applications. It intentionally contains no program-specific
language. Do not edit it to fit a single program — see `README.md` in this
folder for why.

## Short description (~150 words)

FanSafe is an offline-first, privacy-preserving safety companion for
international travellers, running as a single-file web app with no account,
no server, and no data leaving the device. It bundles offline city packs
(emergency numbers), 17 curated safety/medical/navigation phrases across
four languages, a hold-to-confirm emergency action flow, a private local
medical card, trusted-contact check-ins, and a scam/fake-ticket risk
checklist. Everything runs from `localStorage`; there is zero analytics,
telemetry, or third-party network traffic. It is MIT-licensed (brand/icons
excepted), has CI-enforced repository validation, a documented threat model,
and independently re-verified source citations for its four demo cities. It
is a solo-maintainer public-preview project — not contributor-ready,
pilot-ready, or sponsor/grant-ready by its own honest classification — being
prepared as a reusable reference application, not event-specific
infrastructure.

## Links

- **Repository:** `https://github.com/firmansyahyunus/fansafe`
- **Latest tagged release:** see repository tags (do not hardcode a tag name
  here — check the repository for the current one at application time).
- **README / quick-start:** `README.md`
- **License:** `LICENSE`, `NOTICE`, `docs/content-licensing-matrix.md`
- **Privacy model:** `PRIVACY.md`
- **Security policy:** `SECURITY.md`
- **Threat model:** `docs/threat-model.md`
- **Governance:** `GOVERNANCE.md`
- **Roadmap:** `ROADMAP.md`
- **Honest readiness scoring:** `docs/open-source-strategy.md`
- **Release evidence:** `docs/release-evidence/`

## Positioning

**Primary:** "Offline-first safety companion for international travellers."
**Secondary (only paired with the non-affiliation disclosure in
`TRADEMARK.md`):** "Open-source World Cup supporter safety app."

Do not use "infrastructure," "digital public good," or similar earned labels
until they are actually true of this repository's state — see
`docs/open-source-strategy.md` Section 8 for why those framings were
rejected for now.

## Standing claim boundaries (true regardless of audience)

- Not a live emergency, medical, embassy, or ticket-authentication service.
- Emergency numbers are sample data for 4 demo cities — sourced and
  independently reviewed, but travellers must still verify locally.
- Safety-critical phrase translations remain `unreviewed`.
- No pilot, partner, funding, or program acceptance is implied by this kit's
  existence — see the per-application file in `docs/programs/` for actual
  outcomes.

# Content Licensing Matrix

Authoritative per-category license status. Last updated 2026-07-19 (public-
release gate-0 session). Supersedes the category table previously in
`LICENSE-PROPOSAL.md`.

| Category | Status | License | Basis |
|---|---|---|---|
| **Code** — `FanSafe_PWA/index.html`, `sw.js`, `FanSafe_Standalone_Prototype.html`, `tools/*.js` | **Final** | Apache-2.0 | Owner-confirmed ownership + explicit license choice, 2026-07-19. Full text in `LICENSE`. No third-party dependencies exist (verified: zero `<script src>`, zero npm packages), so there is no compatibility question to resolve. |
| **Schemas** — `schemas/*.schema.json` | **Final** | Apache-2.0 | These are structural/technical artifacts (field definitions), not creative content or factual data — treated as part of the codebase, not content. |
| **Documentation** — `README.md`, `CONTRIBUTING.md`, `docs/*.md`, and similar project-authored prose | **Final** | CC-BY-4.0 | Not covered by the owner's data/phrase restriction (that instruction named only "city-pack data or phrase content"). Documentation here is original prose authored during this project's build and audit sessions, with no third-party source material identified. |
| **Phrase / translation content** — `FanSafe_PWA/index.html`'s `phraseBook`, and any `values` fields in `schemas/phrase.schema.json`-conformant data | **UNRESOLVED — all rights reserved by default** | None granted | Owner instruction: do not license until provenance (who translated it, by what method) is verified. Not investigated this session — see `LICENSE-PROPOSAL.md` for the precise blocker. |
| **City-pack structural data** — non-emergency fields in `city-packs/*/pack.json` (`id`, `flag`, `short`, `city`, `country`, `locale`, `supportedLanguages`, `version`, `updatedAt`) | **UNRESOLVED — all rights reserved by default** | None granted | Same owner instruction. These are mostly facts (city names, ISO-ish codes) with thin copyright exposure, but the instruction did not carve out an exception, so none is applied here without asking. |
| **Emergency/non-emergency numbers** — `emergency.*` fields in `city-packs/*/pack.json` | **UNRESOLVED — all rights reserved by default**, despite provenance work done this session | None granted | Provenance (which official source states the number) was investigated this session — see `city-packs/<city>/SOURCES.md` per city. Provenance of the *fact* is not the same as a license grant for *redistributing FanSafe's specific presentation of it*; the owner's instruction gates the license, not just the fact-check. Facts themselves (a phone number) are generally not copyrightable in most jurisdictions, but this repository does not rely on that as a substitute for an explicit grant. |
| **Icons** — `FanSafe_PWA/icon-192.png`, `icon-512.png` | **All rights reserved** | None granted | Originally generated with Pillow during the initial build (per `FanSafe_PWA/TEST_REPORT.md`); no third-party source. Kept separate from the code license deliberately (see `TRADEMARK.md`) so a fork cannot present itself as FanSafe using the same icon. |
| **Screenshots** | **N/A** | — | No screenshot files exist in this repository as of this session. |
| **Brand name and logo** — "FanSafe" name, wordmark, brand lockup styling | **All rights reserved** | None granted | See `TRADEMARK.md`. Never bundled with the code license. |

## What "UNRESOLVED — all rights reserved by default" means in practice

- The content is visible in this repository (source-available) but is not
  under any open license.
- Downstream reuse of the phrase content or city-pack data specifically
  (as opposed to the surrounding code) should not be represented as
  permitted in any README, funding application, or grant dossier until this
  is resolved.
- This does **not** block the repository from going public — a public
  repository can contain unlicensed content; it only blocks *representing
  that content as reusable*.

## What would resolve this

1. Owner confirms (even briefly, in writing) who authored/translated the
   phrase content and by what method (self-authored, professional
   translator, translation tool, etc.) — this is the actual blocker, not a
   research task this session could complete.
2. Once recorded, re-run the content-licensing decision (likely CC0-1.0 for
   factual emergency-number data, a to-be-decided license for phrase
   content depending on the answer to #1 — machine-translated content and
   professionally-licensed translations have different reuse implications).
3. Update this matrix and `NOTICE` in the same change.

# FanSafe

**Offline-first safety companion for international travellers.** FanSafe is a
privacy-preserving prototype originally built for football/World Cup-style
supporter travel: offline city packs, phrase translation, an emergency action
flow, a private medical card, trusted-contact check-ins, and a scam/fake-ticket
risk checker — all running from a single static file, with no account, no
server, and no data leaving the device. Its secondary positioning is an
**open-source supporter-safety reference application for large international
events**; it is not event emergency infrastructure.

**Not officially affiliated with FIFA, any World Cup organizing body, or any
government or emergency service.** See [`TRADEMARK.md`](TRADEMARK.md).

> **Status: public preview.** The MIT License applies to this repository
> unless otherwise noted; the FanSafe name and icons are excepted. See
> [`LICENSE`](LICENSE), [`NOTICE`](NOTICE), and
> [`docs/content-licensing-matrix.md`](docs/content-licensing-matrix.md).
> The two gates that previously held this at "release-candidate" have both
> cleared: reviewer `SABR` independently re-opened and approved all four
> city-pack sources (commit `383a08ebbe337f1f9d43ab5299953cf6038d6316`), and
> a real-browser smoke test — including the denied-geolocation fallback —
> passed at the same commit. See
> [`docs/release-evidence/v0.1.0-alpha/`](docs/release-evidence/v0.1.0-alpha/)
> for the recorded evidence and
> [`docs/PUBLIC_RELEASE_CHECKLIST.md`](docs/PUBLIC_RELEASE_CHECKLIST.md) for
> the full gate-by-gate status. This is still **not** "contributor-ready,"
> "pilot-ready," or "sponsor/grant-ready" — no external contributor or pilot
> has used this repository — and city data remains sample data to verify
> locally; safety-critical translations remain `unreviewed`. No remote,
> public release, pilot, or submission is implied by this status. See
> "Current maturity" below for the full classification.

FanSafe is the only active product scope. **FanLocal** (a possible future
marketplace/booking companion) is not implemented anywhere in this repository
and must not be inferred from anything here — see
[`docs/architecture.md`](docs/architecture.md#fanlocal-boundary) for the one
paragraph where it is acknowledged as a future, separate concern.

## What FanSafe does today

- **Offline city packs** — download-simulated per-city bundles with a
  primary and non-emergency contact number.
- **Phrase translation** — 17 curated phrases across 8 categories
  (emergency, medical, navigation, transport, hotel, police, lost document,
  ticket/scam), in Indonesian, English, Spanish, and French.
- **Two-way conversation mode** — a simple bubble feed for speaking or
  typing back and forth in two languages.
- **Emergency action flow** — a hold-to-confirm SOS button and a
  contextual action sheet (call, share location, message a contact, reveal
  medical card, play an emergency phrase).
- **Private medical card** — hidden by default, local-only.
- **Trusted contacts and check-ins** — "I am safe" / "I need help" /
  location-share messages via clipboard or the device share sheet.
- **Scam / fake-ticket risk checker** — a weighted checklist producing a
  risk level and suggested next actions.
- **Lost-document guidance** — a short flow plus a local record and a
  generated local-language phrase.
- **Local incident records** — unified, local-only case store for
  incidents and scam assessments.
- **PWA install + offline caching** via a service worker.

### What is functional vs. simulated

| Functional (real, on-device logic) | Simulated / demo-only |
|---|---|
| Phrase translation and playback (`speechSynthesis`) | City-pack "download" is a progress animation, not a real network fetch of a content bundle (the data is already bundled in the page) |
| Medical card storage, hide/reveal, delete | Emergency numbers are **sample data for 4 demo cities** — see "Content provenance" below |
| Trusted contact storage and check-in message composition | The scam/ticket checker flags risk signals — it **never confirms** a ticket is real or fake |
| Local incident/case records (`localStorage`) | "Two-way conversation" quality depends entirely on the browser's `SpeechRecognition` support — no server-side translation |
| Geolocation-based location message (only on explicit tap, coordinates never persisted) | — |
| Service worker offline caching | — |

Messages are **never claimed to be "sent" or "delivered"** — only copied to
the clipboard or handed to the device's native share sheet, because a
successful share-sheet call does not guarantee the message reached anyone.
Local records always carry a "local record only" label.

## Safety limitations (read this before relying on FanSafe for anything real)

- FanSafe is **not** a live emergency, medical, embassy, or
  ticket-authentication service.
- Emergency numbers shown are **sample data for 4 demo cities** (Mexico
  City, Toronto, New York City, Vancouver) — see "Content provenance"
  below for exactly what was and wasn't verified.
- The scam/ticket risk checker is a heuristic checklist, not an
  authentication service.
- No claim of translation accuracy — see "Content provenance."
- See [`FanSafe_PWA/TEST_REPORT.md`](FanSafe_PWA/TEST_REPORT.md) for the
  exhaustive list of what has and hasn't actually been tested. Audio playback,
  live speech recognition, geolocation success/denial paths, screen readers,
  and cross-browser/cross-device remain **untested**; a single-browser offline
  reload smoke check is not broader compatibility evidence.

## Privacy model

All data lives in the browser's `localStorage`, namespaced `fansafe.*`.
Nothing is transmitted to any server — verified: zero analytics, zero
telemetry, zero third-party network calls (the only literal external URL
in the source is a Google Maps link built client-side for a share message;
it is never fetched by the app). Geolocation is requested only after an
explicit tap, and precise coordinates are never persisted. Full detail:
[`PRIVACY.md`](PRIVACY.md) and [`docs/threat-model.md`](docs/threat-model.md).

## Supported cities and languages

| City | Country | Primary number | Non-emergency | Languages supported |
|---|---|---|---|---|
| Mexico City | Mexico | 911 | Locatel — 55 5658-1111 | Spanish, English |
| Toronto | Canada | 911 | 311 (city) / 211 (community) | English, French |
| New York City | United States | 911 | 311 | English, Spanish |
| Vancouver | Canada | 911 | 604-717-3321 (police, E-Comm) | English |

Phrase content covers Indonesian, English, Spanish, and French. **All
numbers above are sample data — verify locally before you travel.** See
"Content provenance."

## Quick-start

No build step, no `npm install`, no API keys, no mandatory CDN.

**Fastest:** double-click `FanSafe_Standalone_Prototype.html` in any modern
desktop or mobile browser.

**As an installable PWA** (recommended — this exercises the service worker
and offline caching):

```bash
cd FanSafe_PWA
python -m http.server 8080
```

Then open `http://localhost:8080/` and use your browser's "Install app" option.

## Offline behavior

`FanSafe_PWA/sw.js` caches the app shell (`index.html`, `manifest.json`,
icons) on install using a stale-while-revalidate strategy, and falls back
to the cached `index.html` when the network is unavailable. One HeadlessChrome
smoke check exercised an offline reload; it is not proof of cross-browser or
device reliability. See `TEST_REPORT.md` and the release evidence.

## Validating city packs and phrases

The city-pack and phrase arrays in the HTML are generated contributor-side;
validate that neither generated block has drifted before committing a data
change:

```bash
node tools/validate-repo.js         # full repository validation (CI runs this)
node tools/validate-city-pack.js    # city-packs/<city>/pack.json against schemas/city-pack.schema.json
node tools/validate-phrases.js      # phrases/*.json against schemas/phrase.schema.json
node tools/sync-city-packs.js --check  # verify generated city data has no drift
node tools/sync-phrases.js --check     # verify generated phrase data has no drift
```

All validation and sync scripts are zero-dependency Node scripts (no `ajv`,
no build step). See
[`docs/content-governance.md`](docs/content-governance.md) for the full
city-pack/phrase contribution and review process.

## Content provenance

City-pack emergency numbers were sourced from official primary sources on
2026-07-19 (government/police/311-service sites — not travel blogs or SEO
content). Toronto distinguishes its city-services 311 and community-services
211 entries and does not call either a police line. The New York pack is
scoped to New York City, the scope of its cited sources. Full per-city
detail, exact source URLs, and access dates:
`city-packs/<city>/SOURCES.md` and `REVIEW.md`.

**None of this sourcing has been independently reviewed by a second
person** — see each city's `REVIEW.md`. Keep treating all numbers as
sample data to verify locally, per the in-app labeling.

Phrase content was created with AI assistance, then reviewed, edited, and
approved by the project maintainer; see
[`phrases/PROVENANCE.md`](phrases/PROVENANCE.md). This does not establish
independent native-speaker or professional translation review, so all phrase
review statuses remain `unreviewed`.

Emergency numbers and similar information are factual data compiled from
official public sources. The repository does not claim copyright over the
underlying facts. The original organization, structure, annotations, and
documentation in this repository are licensed under the MIT License.

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for setup, validation, and PR
conventions, and [`docs/content-governance.md`](docs/content-governance.md)
for the city-pack/phrase-specific sourcing and review process. Issue
templates: [`.github/ISSUE_TEMPLATE/`](.github/ISSUE_TEMPLATE/).

## Security reporting

**Do not open a public issue for a security report.** See
[`SECURITY.md`](SECURITY.md) — email `moonwalkingpenguins@gmail.com`.
This is also not an emergency contact channel: if you are in immediate
danger, contact your local emergency number directly.

## Roadmap

See [`ROADMAP.md`](ROADMAP.md) for the full phase breakdown (evidence
baseline → credible open-source release → reusable toolkit → pilot →
funding readiness) and [`docs/PUBLIC_RELEASE_CHECKLIST.md`](docs/PUBLIC_RELEASE_CHECKLIST.md)
for exactly what gates this specific public-preview release.

## Community feedback

FanSafe does not currently plan a formal pilot program. Validation will come
from community feedback, issue reports, and future contributions rather than
a structured pilot deployment. No claim of production readiness or real-world
validation is made.

## Current maturity: **public preview**

Above "prototype only" (finalized code license, CI, security/privacy
policy) and above "credible public repository, release-candidate for
public preview" (the two data-safety gates named below have both cleared
with recorded evidence). Still **not** "contributor-ready," "pilot-ready,"
or "sponsor-/grant-ready" — no external contributor or pilot has used this
repository, and funding-channel prerequisites are unchanged from
`docs/funding-readiness.md`.

The two gates an independent advisory review (2026-07-19) identified as
blocking the "public preview" label are both now cleared:

1. **Independent human source verification.** Reviewer `SABR` re-opened
   the cited official sources for all four city packs and recorded
   `APPROVE` (Mexico City, Toronto, New York City) or `APPROVE WITH
   CORRECTION` (Vancouver — correction applied) against commit
   `383a08ebbe337f1f9d43ab5299953cf6038d6316`. See each city's
   `city-packs/<city>/REVIEW.md`. This was reviewed by a second person
   using the sourcing this repository's own audit process produced — it is
   not a from-scratch independent investigation, and it does not make the
   underlying numbers immune to change; keep verifying locally.
2. **Real-browser smoke test, including the denied-geolocation fallback.**
   A Playwright-driven Chrome session exercised navigation, the
   provenance indicators, Toronto's service taxonomy, New York City scope,
   trusted-contact injection handling, medical-card reveal, reset,
   service-worker/offline reload, and both the granted- and denied-
   geolocation paths, with screenshots and recorded SHA-256 hashes. See
   [`docs/release-evidence/v0.1.0-alpha/manual-browser-smoke-test.md`](docs/release-evidence/v0.1.0-alpha/manual-browser-smoke-test.md).

Neither of these changes establishes production readiness, real-world
validation, or external contributor activity. See
[`docs/open-source-strategy.md`](docs/open-source-strategy.md) for the full
scored assessment and [`docs/PUBLIC_RELEASE_CHECKLIST.md`](docs/PUBLIC_RELEASE_CHECKLIST.md)
for the exact gate-by-gate status.

## What's in this repository

| Path | What it is |
|---|---|
| `FanSafe_PWA/` | The actual application: `index.html`, `manifest.json`, `sw.js`, icons, and its own `README.md`, `DECISION_LOG.md`, `SCREEN_MAP.md`, `STATE_SCHEMA.md`, `TEST_REPORT.md` |
| `FanSafe_Standalone_Prototype.html` | Byte-identical copy of `FanSafe_PWA/index.html`, for double-click/`file://` use |
| `FanSafe_PWA.zip` | A packaged copy of `FanSafe_PWA/`, git-ignored — not required for anything documented here |
| `docs/` | Architecture, threat model, content-governance, pilot-plan, funding-readiness, content-licensing-matrix, open-source-strategy documents, and a reusable, program-agnostic application kit (`docs/programs/`) |
| `schemas/` | JSON Schemas for city packs, phrases, and emergency info (the shapes the app currently hardcodes; not yet wired into the running app — see `docs/architecture.md`) |
| `city-packs/` | Reference extraction of the 4 demo city packs, with `SOURCES.md`/`REVIEW.md` per city |
| `phrases/` | Reference extraction of the safety-critical phrase categories, with `reviewStatus` tracking |
| `tools/` | Zero-dependency validators (`validate-repo.js`, `validate-city-pack.js`, `validate-phrases.js`, `lib/json-schema-lite.js`) |
| `.github/` | Issue templates, PR template, funding config draft, CI workflow |

## License

- **Repository content:** MIT, unless otherwise noted — see
  [`LICENSE`](LICENSE), [`NOTICE`](NOTICE), and
  [`docs/content-licensing-matrix.md`](docs/content-licensing-matrix.md).
- **"FanSafe" name, wordmark, and icons:** all rights reserved — see
  [`TRADEMARK.md`](TRADEMARK.md).

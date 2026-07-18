# FanSafe

**Offline-first safety companion for international travellers.** FanSafe is a
privacy-preserving prototype originally built for football/World Cup-style
supporter travel: offline city packs, phrase translation, an emergency action
flow, a private medical card, trusted-contact check-ins, and a scam/fake-ticket
risk checker — all running from a single static file, with no account, no
server, and no data leaving the device.

> **Status: prototype, not yet a released open-source project.** There is no
> license grant yet (see [`LICENSE-PROPOSAL.md`](LICENSE-PROPOSAL.md)), no CI
> has run in a real pipeline yet, and there is no evidence of real users. Read
> [`docs/open-source-strategy.md`](docs/open-source-strategy.md) for the full,
> evidence-based readiness assessment before assuming this is contributor- or
> sponsor-ready.

FanSafe is the only active product scope. **FanLocal** (a possible future
marketplace/booking companion) is not implemented anywhere in this repository
and must not be inferred from anything here — see
[`docs/architecture.md`](docs/architecture.md#fanlocal-boundary) for the one
paragraph where it is acknowledged as a future, separate concern.

## What's in this repository

| Path | What it is |
|---|---|
| `FanSafe_PWA/` | The actual application: `index.html` (all HTML/CSS/JS, no build step, no dependencies), `manifest.json`, `sw.js`, icons, and its own `README.md`, `DECISION_LOG.md`, `SCREEN_MAP.md`, `STATE_SCHEMA.md`, `TEST_REPORT.md` |
| `FanSafe_Standalone_Prototype.html` | Byte-identical copy of `FanSafe_PWA/index.html`, kept for double-click/`file://` use without a local server |
| `FanSafe_PWA.zip` | A packaged copy of `FanSafe_PWA/`, regenerated ad hoc — not a build artifact of this repo's tooling; not required for anything documented here |
| `docs/` | Architecture, threat model, content-governance, pilot-plan, funding-readiness, and open-source-strategy documents produced by the repository audit |
| `schemas/` | Draft JSON Schemas for city packs, phrases, and emergency info (the shapes the app currently hardcodes in `index.html`; not yet wired into the running app — see `docs/architecture.md`) |
| `city-packs/` | Reference extraction of the 4 demo city packs into schema-conformant JSON, with source/review templates — reference artifacts for a future extraction, not consumed by the running app yet |
| `tools/` | `validate-city-pack.js`, a zero-dependency validator, and `validate-repo.js`, the script the CI workflow runs |
| `.github/` | Issue templates, PR template, funding config draft, CI workflow |

## Running it

No build step, no `npm install`, no API keys, no mandatory CDN.

**Fastest:** double-click `FanSafe_Standalone_Prototype.html` in any modern
desktop or mobile browser.

**As an installable PWA** (recommended — this is what exercises the service
worker and offline caching):

```bash
cd FanSafe_PWA
python -m http.server 8080
```

Then open `http://localhost:8080/` and use your browser's "Install app" option.

## Honesty about what has and hasn't been verified

`FanSafe_PWA/TEST_REPORT.md` is the authoritative record of what was actually
tested (static checks + a driven interactive browser session) versus what is
explicitly untested (audio output, live speech recognition, geolocation
success/denial paths, clipboard/share-sheet final state, true offline reload,
screen-reader passes, cross-browser/cross-device). This root README does not
repeat or soften those distinctions — read that file directly for claims about
functionality.

## Contributing, security, and privacy

See [`CONTRIBUTING.md`](CONTRIBUTING.md), [`SECURITY.md`](SECURITY.md), and
[`PRIVACY.md`](PRIVACY.md). FanSafe stores medical and location-adjacent data
locally; anyone touching those code paths should read `PRIVACY.md` and
`docs/threat-model.md` first.

## License

Not yet finalized. See [`LICENSE-PROPOSAL.md`](LICENSE-PROPOSAL.md) for the
recommended (but not yet legally confirmed) license split between code,
documentation, and data.

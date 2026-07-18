# License Proposal (Draft — Not Yet Legally Final)

This file is a **recommendation**, not a license grant. No `LICENSE` file
exists in this repository yet because two prerequisites are not confirmed by
any evidence available to this audit:

1. **Ownership** — who holds the rights to the existing code, phrase
   translations, city emergency-number data, icons, and documentation (this
   matters because the repo was produced under a Claude Code build session;
   confirm the human owner/organization before publishing any license).
2. **Third-party content compatibility** — the four demo city packs, 17
   phrases, and risk-checker signal set were authored for this build (no
   external dataset or copyrighted source was found referenced in
   `FanSafe_PWA/index.html` or its docs), but this has not been independently
   verified against, e.g., a translation service's terms of use.

Do not copy this proposal into a `LICENSE` file and treat the project as
licensed until a human owner confirms both points above.

## Recommendation

| Content | Recommended license | Why |
|---|---|---|
| Application source code (`FanSafe_PWA/index.html`, `sw.js`, tooling in `tools/`) | **Apache-2.0** | Explicit patent grant (relevant to a "safety" product where a downstream commercial actor could otherwise assert patents against reusers), permissive enough for commercial/white-label reuse, and its inbound=outbound contribution terms need no CLA — appropriate for a solo-maintainer project. MIT lacks the patent grant; MPL-2.0's file-level copyleft is nearly meaningless for a single-file app and adds friction without benefit. |
| Documentation (`docs/`, `*.md` files) | **CC-BY-4.0** | Standard for prose/docs, keeps attribution, accepted by grant programs (e.g., Digital Public Goods Alliance requires no NC/ND clauses — CC-BY-4.0 qualifies). |
| Phrase/translation strings and city emergency-number datasets (`schemas/`, `city-packs/`) | **CC0-1.0** | These are largely factual/short-phrase content with thin copyright protection anyway. Public-safety data should have zero attribution friction so other travel-safety or civic-tech projects can ingest it directly — that maximizes exactly the reuse this project wants credit for enabling. |
| Icons / brand mark (`icon-192.png`, `icon-512.png`, the "FanSafe" name and lockup) | **All rights reserved**, separate from the code license | See `TRADEMARK.md`. Brand assets should not be bundled into the same permissive grant as the code, or downstream forks could present themselves as FanSafe. |

## Consequence to accept before finalizing

Apache-2.0 (code) + CC0 (data) together mean a commercial competitor could
white-label the entire application, including the curated emergency-number
data, with no attribution and no obligation to contribute fixes back. This is
a deliberate trade of control for adoption, consistent with maximizing reuse
and grant/DPG eligibility — but it is not reversible for anything already
distributed under these terms once a `LICENSE` file ships. Confirm this
trade-off is acceptable before promoting this proposal to a real `LICENSE`.

## What would make this final

- Written confirmation from the repository owner of (1) and (2) above.
- Replace this file's content into `LICENSE` (Apache-2.0 full text) and add a
  `LICENSE-DATA` file (CC0-1.0 full text) plus a one-line `NOTICE` addition
  pointing to both — see `NOTICE`.
- Update `package.json`/`manifest.json` `license` fields if introduced later.

# Funding and Reward Readiness

All external program facts below were retrieved via web search on
**2026-07-18** and are marked with their source. Program terms change —
re-verify before actually applying. Nothing here should be read as FanSafe
having applied to, or been accepted by, any of these programs.

## Maintainer funding

### GitHub Sponsors

- **Facts (as of 2026-07-18):** open to individual developers and
  organizations that contribute to open source and live/operate in a
  supported region; requires an approved sponsored-developer profile,
  sponsorship tiers, bank/tax info, and 2FA enabled. Depends on Stripe,
  which limits eligibility to roughly 70 countries — large parts of Asia,
  Africa, the Middle East, and Eastern Europe are excluded (waitlist
  available). Source:
  [GitHub Docs — About GitHub Sponsors](https://docs.github.com/en/sponsors/getting-started-with-github-sponsors/about-github-sponsors).
- **Current fit:** low. No public repository, no license, no contributors,
  no evidence of usage.
- **Fit after repo improvements:** medium, contingent on geography
  (unverified whether the maintainer's country is supported) and on having
  something a sponsor would actually pay for ongoing maintenance of.
- **Prerequisites:** public repo, license, 2FA, tax/bank setup, being in a
  supported region.
- **Blocking gaps:** no public repo yet; no adoption evidence to justify
  ongoing sponsorship (sponsors fund maintenance of things people use).
- **Effort:** low (mostly account setup) once prerequisites are met.
- **Likely reward type:** small recurring individual donations, not
  meaningful revenue without real adoption.
- **Realistic timing:** only after Phase 1 (license, public repo) —
  earliest useful moment is post-Phase-3 pilot evidence, since sponsorship
  without visible usage rarely materializes.
- **Risk of wasted effort:** low to set up, but low expected return before
  real usage exists.

### Open Collective / fiscal hosting

- **Facts (2026-07-18):** a fiscal host holds funds and handles
  accounting/compliance so a project doesn't need its own legal entity;
  hosts typically charge 5–15% of incoming funds and only host projects
  aligned with their own charter. Source:
  [Open Collective — What Is Fiscal Hosting?](https://opencollective.com/fiscal-hosting).
- **Current fit:** low — nothing to collect funds for yet.
- **Fit after improvements:** medium — useful specifically if/when grant or
  corporate money needs a compliant destination without forming a legal
  entity.
- **Prerequisites:** a fiscal host whose charter matches "travel safety /
  civic tech"; a Collective profile.
- **Blocking gaps:** no funds pending that need hosting; decision to accept
  a host's fee model requires the human owner.
- **Effort:** medium (finding a matching host, then account setup).
- **Likely reward type:** a compliant pass-through for donations/grants,
  not funding itself.
- **Realistic timing:** only once a grant or sponsor is actually ready to
  pay, not speculatively.
- **Risk of wasted effort:** low, but premature before Phase 4.

### Direct corporate sponsorship / consulting or supported deployment

- **Current fit:** very low — no deployed instance, no organization
  relationship (e.g., a tourism board or telecom) evidenced anywhere in the
  repo.
- **Fit after improvements:** depends entirely on a real partner appearing;
  repository quality cannot manufacture this.
- **Prerequisites:** an actual interested organization.
- **Blocking gaps:** none identified besides "no partner exists yet."
- **Effort/timing/risk:** cannot be assessed responsibly without a
  candidate partner — do not treat this as "coming soon."

## Builder, startup, open-source, and AI-credit programs

- **Current fit:** assess program-by-program; no application is currently
  selected or submitted.
- **Prerequisites:** current official terms, geography, funding/company
  requirements, business-email requirements, and any partner referral must
  be checked for the selected program.
- **Repository preparation:** see `docs/BUILDER_PROGRAM_READINESS.md`.
- **Claim boundary:** do not claim eligibility, credits, acceptance, or a
  partnership before written confirmation from the program.
- **Official source requiring verification:** none generic to cite; verify
  the specific competition's current rules before submitting.

## Grants

### Digital Public Goods Alliance (DPGA) registry

- **Facts (2026-07-18):** the DPG Standard has 9 indicators reviewed in two
  stages; core requirements include demonstrated SDG relevance, an approved
  open license (public evidence link required), clearly documented
  ownership, "do no harm" (privacy/legal compliance, active harm
  prevention), and documentation of source code, use cases, and functional
  requirements. Source:
  [Digital Public Goods Alliance — Registry](https://www.digitalpublicgoods.net/registry),
  [DPGA — Frequently Asked Questions](https://www.digitalpublicgoods.net/frequently-asked-questions).
- **Current fit:** low — no finalized open license, and "clear ownership"
  cannot be documented until the human owner confirms it (see
  `LICENSE-PROPOSAL.md`).
- **Fit after improvements:** medium-high — SDG relevance is plausible
  (safety/accessibility for travellers touches SDG 11 "sustainable cities,"
  arguably SDG 3 "health"), and the privacy-by-design model in `PRIVACY.md`
  supports "do no harm." This is a **strong long-term thematic fit**,
  explicitly not an immediate one.
- **Prerequisites:** finalized open license with public evidence link;
  documented ownership; demonstrated do-no-harm review (this repo's
  `docs/threat-model.md` is a start, not sufficient alone).
- **Blocking gaps:** no finalized license; no evidence of real-world use
  (DPGA reviewers commonly weigh actual adoption even though it's not a
  hard-listed indicator here).
- **Effort:** medium (application + review cycles).
- **Likely reward type:** registry listing and associated visibility/credibility, not direct funding — but often a prerequisite that other DPG-linked funders check for.
- **Realistic timing:** Phase 2–3 at the earliest (needs the license
  finalized and the toolkit-reuse story credible).
- **Risk of wasted effort:** low to prepare for, but applying before license
  finalization would likely be rejected or delayed — do not submit
  prematurely.

### Sovereign Tech Fund (Sovereign Tech Agency)

- **Facts (2026-07-18):** public investment initiative (German Federal
  Ministry for Economic Affairs and Climate Action, implemented by the
  Sovereign Tech Agency) funding "open digital base technologies." Minimum
  funding request €50,000 per contract (reduced from €150,000 in June
  2024); requires OSI- or FSF-approved code licensing and CC-like
  documentation licensing without NC/ND clauses; excludes projects already
  publicly funded for the same work; rolling applications, still accepting
  as of this search. Source:
  [Sovereign Tech Agency — Sovereign Tech Fund](https://www.sovereign.tech/programs/fund).
- **Current fit:** very low. FanSafe is an application, not "base
  infrastructure" (the Fund's stated focus is foundational technologies
  other software depends on) — this is a **poor thematic fit today**, not
  just an evidence gap.
- **Fit after improvements:** would only become plausible if the Phase 2
  toolkit extraction (schemas, city-pack format, phrase engine) matured
  into genuine shared infrastructure other travel-safety projects actually
  depend on — speculative, not a near-term path.
- **Prerequisites/blocking gaps:** thematic mismatch is the primary
  blocker, not documentation quality.
- **Effort/timing/risk:** not recommended as a near-term target; flagging
  it here only because it was explicitly researched, and to prevent a
  future maintainer from spending effort on a poor-fit application.

### GitHub Secure Open Source Fund

- **Facts (2026-07-18):** invests in critical open-source **security**
  work; 2026 expansion added $5.5M in Azure credits/funding plus a security
  education program, partners, and health check-ins; has supported 138
  projects with 200+ maintainers to date. Source:
  [GitHub Blog — Announcing the Secure Open Source Fund](https://github.blog/news-insights/company-news/announcing-github-secure-open-source-fund/),
  [GitHub — Secure Open Source Fund](https://github.com/open-source/github-secure-open-source-fund).
- **Current fit:** very low — this program targets projects that are
  already **critical infrastructure with existing security risk at scale**
  (i.e., widely-depended-upon packages), which FanSafe is not.
- **Fit after improvements:** unlikely to ever fit unless FanSafe's
  extracted packages (Phase 2) become widely depended upon by other
  projects — not a realistic near-term or even medium-term target.
- **Note:** included to show it was checked and correctly ruled out, not
  recommended.

### Public-interest technology / privacy / accessibility / humanitarian / low-connectivity / open-internet grants (general category)

- **Current fit:** not assessed against any single named program — these
  are categories, not one application. Thematically, FanSafe's offline-
  first, privacy-preserving, accessibility-considered design is a
  reasonable narrative fit for this category in general.
- **Requires verification:** any specific program in this category before
  applying — do not treat "thematically attractive" as "currently open and
  eligible."

## Institutional partnerships (tourism boards, hotels, universities, supporter communities, event organizers, NGOs, accessibility orgs, telecom/eSIM providers)

- **Current fit:** none confirmed — no partner relationship exists in any
  repository evidence.
- **Current approach:** no formal pilot is planned. Any institutional
  relationship would require an independent owner decision and must not be
  implied from community feedback or repository activity.

## Category separation (per audit requirement)

- **Fund maintainers directly:** GitHub Sponsors, Open Collective (via a
  host), direct sponsorship.
- **Fund organizations:** Sovereign Tech Fund (contract-based, €50k
  minimum — effectively requires organizational capacity to execute a
  funded contract), most institutional partnerships.
- **Require a legal entity:** Sovereign Tech Fund in practice (contracting);
  Open Collective does not (that's its entire purpose).
- **Require demonstrated users:** DPGA (in practice, even if not a hard
  line item), most credible grant/partnership conversations.
- **Require specific geography:** GitHub Sponsors (Stripe-supported
  countries); Sovereign Tech Fund (German public funding, though open
  internationally in principle — verify current geographic scope before
  assuming eligibility).
- **Thematically attractive but currently unrealistic:** Sovereign Tech
  Fund (infrastructure-focus mismatch), GitHub Secure Open Source Fund
  (scale mismatch), DPGA (license/ownership prerequisites unmet today).

## Bottom line

**The next planned activity is builder-program readiness, not a hackathon.**
Identify a current official program, compare its eligibility against actual
facts, and prepare only the required repository artifacts. See
`docs/BUILDER_PROGRAM_READINESS.md`. No application should be submitted
without explicit owner approval.

## Addendum, 2026-07-19 — second-opinion reprioritization (Claude Fable 5)

An independent advisory consult flagged that this document's own scoring
had gone stale in FanSafe's favor on one channel, while `BUILDER_PROGRAM_
READINESS.md`'s four named targets are a poorer fit than that document
implies. Recorded here rather than silently rewriting the dated assessment
above.

- **DPGA registry is closer than scored above.** The "Current fit: low —
  no finalized open license" line predates the MIT license decision and
  `docs/content-licensing-matrix.md`'s ownership documentation, both now
  done (see `docs/PUBLIC_RELEASE_CHECKLIST.md` items 1–3). That was DPGA's
  hardest stated blocker. Real gaps remain (demonstrated adoption, a formal
  do-no-harm review beyond this repo's own threat model), but "no finalized
  license" is no longer one of them.
- **The `BUILDER_PROGRAM_READINESS.md` startup-credit targets (OpenAI for
  Startups, AWS Activate, Microsoft for Startups, GitHub for Startups) are
  farther than that document's framing implies**, not nearer: three of the
  four effectively assume outside equity funding, a registered company, or
  committed cloud spend, none of which fit a solo-maintainer, no-server,
  no-entity project by design. Evaluate them, but do not treat them as the
  natural next step over public-interest-tech/DPG-style channels.
- **Practical effect:** the `docs/programs/` convention (added the same
  date) is designed so that whichever channel goes first — DPG-style or a
  startup program — costs the same one-page delta to apply to, per program,
  rather than one channel's requirements shaping repository prep for all of
  them.

This addendum does not change any score above; it flags that the
"Prerequisites"/"Blocking gaps" text for DPGA and the startup-program
category should be re-read against this note before acting on it.

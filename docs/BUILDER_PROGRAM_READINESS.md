# Builder Program Readiness

## Objective

Identify a suitable AI builder, startup, open-source, or AI-credit program
and prepare repository evidence required by its application. This is not a
hackathon plan, funding claim, or application submission.

## Current targets to evaluate

| Program | Why evaluate | Known condition or limitation | Source |
|---|---|---|---|
| OpenAI for Startups / Startup Community | Builder resources, events, and technical community relevant to an AI-assisted product. | API-credit benefits described for eligible VC-backed portfolio companies; no credit eligibility is assumed. | [OpenAI for Startups](https://openai.com/startups) |
| AWS Activate | Potential cloud and AI-service credits if the product later needs hosted services. | Eligibility and current credit terms must be checked before applying; use the official application flow only. | [AWS Activate guide](https://aws.amazon.com/aws-startups/learn/applying-for-aws-activate-credits-a-step-by-step-guide/) |
| Microsoft for Startups Founders Hub | Founder-oriented technical and business resources. | Current eligibility, country coverage, and benefits require verification at application time. | [Microsoft Learn](https://learn.microsoft.com/en-us/shows/ask-the-expert/founders-hub) |
| GitHub for Startups | Potential developer-platform benefits. | The published program requires outside equity funding and new Enterprise/Advanced Security eligibility, so it is conditional rather than assumed fit. | [GitHub for Startups](https://github.com/enterprise/startups?locale=en-US) |

## Repository artifacts already available

- Public repository, MIT license, and explicit brand exception.
- Product overview, limitations, privacy model, and security contact in
  `README.md`, `PRIVACY.md`, and `SECURITY.md`.
- CI-backed repository validation and recorded browser/source-review evidence.
- AI-assisted phrase provenance disclosure in `phrases/PROVENANCE.md`.

## Evidence to prepare per selected program

1. Confirm the official program page, application window, geography,
   eligibility, benefits, and terms on the application date.
2. Prepare a short product description, current problem statement, and honest
   explanation of what FanSafe does not do.
3. Provide the public repository URL, README, license, privacy and security
   links, and a specific commit SHA.
4. Prepare a short demo/video only if the selected program requires one.
5. Provide company, funding, business-email, legal-entity, cloud-account, or
   API-organization information only when actually required and approved by
   the owner.
6. Record the submitted materials and decision in a dated repository note;
   do not claim acceptance or credits before confirmation.

## Current boundaries

- FanSafe does not currently plan a formal pilot program.
- Community feedback, issues, and contributions are future validation
  channels, not evidence of production readiness today.
- No application or external submission may be made without explicit owner
  approval.

## Addendum, 2026-07-19 — reusability across multiple programs

To avoid preparing this repository for one program at a time, application
materials now follow two rules:

1. **No target program is assumed by default.** The four programs listed
   above are candidates to *evaluate*, not a queue to apply to in order —
   see `docs/funding-readiness.md`'s 2026-07-19 addendum: three of the four
   assume outside equity funding, a registered company, or committed cloud
   spend, which is a poorer fit for this solo-maintainer, no-entity project
   than a public-interest-tech or DPG-style channel.
2. **Application materials live in `docs/programs/`, not in this file or in
   product docs.** `docs/programs/KIT.md` is the single program-agnostic
   description/link set reused verbatim across every application; each
   actual application gets its own dated file
   (`docs/programs/YYYY-MM-DD-program-name.md`) recording what was
   submitted, the exact commit SHA cited, and the outcome. See
   `docs/programs/README.md` for the full convention, including the rule
   that a program's requirements may never shape `README.md`, `ROADMAP.md`,
   or other product documentation.

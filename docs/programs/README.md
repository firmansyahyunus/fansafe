# Program applications — convention

This folder exists so FanSafe can apply to more than one developer, builder,
grant, or open-source program over time **without redoing repository prep
for each one**, and without any single program's requirements leaking into
the product documentation itself.

This convention was adopted 2026-07-19 after an independent advisory review
(Claude Fable 5) flagged that program-chasing artifacts sitting in product
docs or the repo root read as "built to win a program" rather than "built to
be useful" — see `docs/open-source-strategy.md` Section 8 and the dated
addenda in `docs/funding-readiness.md` / `../BUILDER_PROGRAM_READINESS.md`.

## The rule

**Dependency runs one way only: program files may cite product docs; product
docs (`README.md`, `ROADMAP.md`, `docs/architecture.md`, etc.) must never
cite or be shaped by a specific program.** If a program's requirements would
force a change to product docs, that change goes through the normal
product-decision process (`DECISION_LOG.md` / `GOVERNANCE.md`), evaluated on
its own merits — not accepted because a program asked for it.

## What goes here

One thin, dated file per program you actually apply to:
`docs/programs/YYYY-MM-DD-program-name.md`. Do not create a file for a
program merely under consideration — see `../BUILDER_PROGRAM_READINESS.md`
and `../funding-readiness.md` for evaluation of candidates before applying.

Each file must record, at minimum:

- **Program name and official source URL**, checked as of the application
  date (terms change; re-verify, don't trust an older file here).
- **Status:** one of `drafted`, `submitted`, `accepted`, `declined`,
  `withdrawn`. Update this field as the outcome changes — a file that only
  ever says "submitted" is a dead record, not evidence.
- **Commit SHA cited in the application** (pin the exact commit, not a
  moving branch reference — this is what makes the application reproducible
  after the repo has since changed).
- **What was submitted** (link to or quote the actual description/materials
  given to the program — not a paraphrase written after the fact).
- **What the program required that this repo did not already have**, if
  anything, and how it was satisfied without changing product docs.

Never record in this folder: private application credentials, non-public
contact details, or draft materials for a program not yet actually
submitted. Public tree gets facts about what happened, not staging area for
what might.

## The shared kit

[`KIT.md`](KIT.md) is the one program-agnostic input every application
in this folder should reuse verbatim (description, links, positioning). It
intentionally has no pinned commit SHA — it points at the latest tagged
release instead, so it doesn't go stale between applications. Pin the exact
SHA in the per-application dated file, not in the shared kit.

## Template

See [`TEMPLATE.md`](TEMPLATE.md) for the exact structure of a new dated
application file.

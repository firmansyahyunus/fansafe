# Pilot Plan

## Why this exists

`FanSafe_PWA/TEST_REPORT.md` proves the app runs and its screens work. It
does not prove a real traveller can use it under realistic conditions. No
pilot has been run. This document is a plan, not a report of results.

## What the pilot must answer

- Does the target user understand the product without an explainer?
- Can they prepare a city pack unassisted?
- Can they find the right phrase under simulated time pressure?
- Do they understand the emergency-flow limitations (not real dispatch)?
- Can they safely create and manage a medical card?
- Can they distinguish "scam risk flagged" from "ticket confirmed authentic"?
- Does offline mode measurably help, or go unnoticed/unused?
- Which features are ignored or confusing?

## Design

- **Size:** 10–30 participants, recruited in two or three small batches so
  early feedback can adjust the script before the next batch.
- **Recruitment:** people who actually travel internationally for events —
  e.g., a local supporters' club, a university international-student office,
  or a hostel/backpacker community. **No recruitment channel is confirmed
  today** — this is a remaining decision for the human owner, not something
  this audit can arrange.
- **Consent and privacy:** written, plain-language consent before any
  session. Explicitly state that real medical details or real precise
  location must **not** be entered during the pilot — see guardrails below.
  Recordings/notes are about *behavior* (where they tapped, what confused
  them), never about the content they typed into medical/location fields.
- **Scenarios (task-based, not a feature tour):**
  1. "You just arrived in a new city. Set up FanSafe as if this were real."
  2. "Find and play the phrase for 'I need a doctor' in the local language."
  3. "You lost your passport. Walk through what FanSafe tells you to do."
  4. "Someone messaged you offering tickets for cash only, off-platform.
     Use FanSafe to assess it."
  5. "Turn off your device's network connection. Try to find your saved
     city pack's emergency number."
- **Success criteria:** task completion without facilitator intervention;
  post-task confidence rating; explicit check for *misunderstanding* (e.g.,
  believing a message was "sent" when it was only copied) — a
  misunderstanding here is a finding, not a pass.
- **Safety guardrails:**
  - No real medical conditions, medications, or precise home addresses
    entered — use a provided fictional persona for the medical card and
    contacts.
  - No real emergency numbers dialed during the session.
  - A facilitator present at all times; the pilot is not a substitute for
    an actual emergency and participants are told this explicitly beforehand.
- **Feedback questions (post-session, open-ended):**
  - What did you expect this button/screen to do, before you tapped it?
  - Was there a moment you weren't sure what FanSafe could actually do for
    you versus what you'd still need to do yourself?
  - What would you have wanted before a real trip that this doesn't have?
- **Metrics that do not require invasive analytics:**
  - Facilitator-observed task completion (yes/no/partial) per scenario
  - Time-to-first-successful-tap per scenario (stopwatch, not instrumentation)
  - Self-reported confidence (1–5) per scenario
  - Count and category of "explicit confusion" moments (facilitator-logged,
    not device-logged)
  - None of this requires adding telemetry to the app itself — see
    `PRIVACY.md`, "No analytics, no telemetry."
- **Issue-tracking process:** every confusion point or failed task becomes a
  GitHub issue using the `bug_report` or `feature_request` template, tagged
  `pilot-feedback`, referencing the scenario number.
- **Public summary template:** a short public write-up (aggregate
  completion rates, top 3 confusion points, top 3 fixes made in response) —
  never participant names, never their entered content, never per-person
  data. Draft this template before the first session, not after, so
  facilitators know in advance what will and won't be shared.

## Remaining decisions (require the human owner)

- Is there a real candidate community/partner to recruit from?
- Who facilitates sessions — the maintainer alone, or additional help?
- Timing relative to any real event this is meant to support?

Until these are answered, Phase 3 (`ROADMAP.md`) cannot start, and any
funding-channel prerequisite requiring "evidence of users or pilots"
(`docs/funding-readiness.md`) remains unmet.

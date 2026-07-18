## What does this change and why?

## Checklist

- [ ] `node tools/validate-repo.js` passes locally
- [ ] If this touches `index.html`'s UI/behavior: I exercised it in a real
      browser and updated `FanSafe_PWA/TEST_REPORT.md` with what I actually
      checked (and, honestly, what I didn't)
- [ ] If this adds/changes a city pack or phrase: `city-packs/<id>/SOURCES.md`
      cites an official source, and `node tools/validate-city-pack.js` passes
- [ ] If this touches medical-card, trusted-contact, location, or
      incident/case data: I reviewed `PRIVACY.md` and `docs/threat-model.md`
      and this change is consistent with them (or I've explained below why
      they need updating)
- [ ] This does not add a FanLocal-shaped feature (marketplace, booking,
      host profiles, payments, listings) — see `README.md` scope statement
- [ ] This does not add a build step, framework, or external dependency
      without prior discussion in an issue

## Screenshots / recording (for UI changes)

## Related issue(s)

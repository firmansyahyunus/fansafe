# Repository Settings Recommendation

**Draft for the owner to apply manually.** No GitHub settings were changed.

## Before any remote or visibility change

- Confirm there are no credentials, API keys, private contact records,
  screenshots containing personal data, or unreviewed third-party assets in
  the complete history and intended push set.
- Confirm `SECURITY.md` contains the intended reporting contact and that it
  is not an emergency-support channel.
- Retain the current content-license boundary: code and tooling are
  Apache-2.0; city-pack and phrase content remain unavailable for reuse until
  provenance and translation review are resolved.
- Re-run `node tools/validate-repo.js` from the commit proposed for push.

## Recommended GitHub controls

For `main`, require a pull request, one approving review, successful `validate`
CI, up-to-date branches, and linear history. Disable force pushes and branch
deletion. Require conversation resolution when collaboration begins.

Protect release tags after a release process exists. Do not require a status
check that the repository does not actually produce.

## Labels and milestone

Create: `bug`, `documentation`, `security`, `testing`, `content-governance`,
`architecture`, `tooling`, `priority-high`, `priority-medium`, and
`priority-low`. Use the draft milestone in `MILESTONE_v0.1.0-alpha.md`.

Only apply `good first issue` to bounded documentation, test, or tooling work
that does not let a new contributor alter safety-critical facts without a
maintainer's independent source review.

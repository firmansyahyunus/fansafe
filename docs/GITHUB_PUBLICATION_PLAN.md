# GitHub Publication Plan

**Preparation only.** No remote, push, repository-visibility change, tag, or
GitHub release is authorized by this document.

## Positioning

- Primary: **Offline-first safety companion for international travellers.**
- Secondary: **Open-source supporter-safety reference application for large
  international events.**

Do not describe FanSafe as emergency infrastructure, ticket authentication,
medical advice, affiliated with FIFA, or a certified digital public good.

## Owner actions after explicit approval

1. Review `git diff`, confirm the intended commit history, and provide the
   exact destination URL for a private remote.
2. Create or select the private repository manually; then configure the
   remote and push only after separate approval.
3. Complete the privacy and secret review in
   `REPOSITORY_SETTINGS_RECOMMENDATION.md` before any visibility change.
4. Regenerate and integrity-test `FanSafe_PWA.zip` from the approved release
   commit; the existing git-ignored ZIP is structurally valid but does not
   match the current application file.
5. Keep the repository private until the owner explicitly approves a
   visibility decision. The Gate 1 source-review and denied-geolocation
   evidence has been recorded; this is not authorization to publish.
6. Create a release only after a tag, release notes, and a final approval.

## Suggested repository metadata

- Description: `Offline-first safety companion for international travellers.`
- Topics: `offline-first`, `pwa`, `travel-safety`, `privacy`, `accessibility`,
  `open-source`.
- Homepage: leave unset unless the owner supplies an official project URL.

## Suggested first issues

1. Complete denied-geolocation fallback evidence.
2. Obtain independent human source review for each city pack.
3. Add a reviewable city-pack import path for the runtime (Phase 2).
4. Add accessibility testing evidence from a real device and screen reader.

Assign the first two to the `v0.1.0-alpha` milestone proposal. Do not label
any safety-critical data correction as `good first issue` unless a maintainer
will review the cited sources before merge.

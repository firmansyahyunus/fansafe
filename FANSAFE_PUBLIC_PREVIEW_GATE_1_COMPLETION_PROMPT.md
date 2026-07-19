# FanSafe Public Preview Gate 1 - Completion Prompt

Run this prompt from the current repository root after Gate 1 evidence has
been recorded. Do not repeat earlier readiness audits and do not push,
configure a remote, publish a release, change repository visibility, or submit
anything without the owner's explicit approval.

## Completed Gate 1 facts

- Toronto presents 911 emergency, 311 city services, and 211 community
  referral; it does not claim a police non-emergency service.
- The New York pack is New York City only, with safe migration of legacy
  New York/New Jersey localStorage values.
- Vancouver labels 604-717-3321 as Vancouver Police Department
  non-emergency.
- SABR independently re-opened and approved the four city-pack sources for
  commit `383a08ebbe337f1f9d43ab5299953cf6038d6316`.
- The denied-geolocation fallback was manually tested at that commit: after
  `Never allow`, a general-location message opened through the email/share
  sheet; no email was sent and no Console errors were reported.
- Safety-critical translations remain `unreviewed`; do not change that status.

## Required completion work

1. Establish the exact release-candidate revision:

   ```powershell
   git status --short
   git rev-parse HEAD
   node tools/validate-repo.js
   ```

2. Confirm the standalone file remains byte-identical through the repository
   validator. Do not change source-review or translation statuses without new
   evidence.

3. Rebuild the ignored distribution artifact only after the final application
   files are committed:

   ```powershell
   Remove-Item -LiteralPath .\FanSafe_PWA.zip
   Compress-Archive -Path .\FanSafe_PWA\* -DestinationPath .\FanSafe_PWA.zip
   wsl.exe -e bash -lc 'cd /mnt/c/Project/fansafe && unzip -t FanSafe_PWA.zip'
   ```

4. Confirm the ZIP contains the same application HTML as the final source:

   ```powershell
   $zipHash = wsl.exe -e bash -lc 'cd /mnt/c/Project/fansafe && unzip -p FanSafe_PWA.zip index.html | sha256sum'
   $appHash = (Get-FileHash .\FanSafe_PWA\index.html -Algorithm SHA256).Hash
   $zipHash
   $appHash
   ```

   Record matching hashes in the public checklist and release notes. If they
   differ, do not distribute the ZIP.

5. Verify publication material remains truthful:

   - city packs are independently reviewed but still sample data to verify
     locally;
   - translations remain unreviewed;
   - FanSafe is not emergency infrastructure, medical advice, ticket
     authentication, FIFA-affiliated software, or a certified digital public
     good;
   - no pilot, partner, public release, or GitHub remote is implied.

6. Make local commits for any evidence or packaging-document update. Do not
   push. Report the exact HEAD, validation output, ZIP test, ZIP/source hash
   comparison, untracked artifacts, and all remaining owner approvals.

## Final owner approvals that remain separate

- exact private remote URL and permission to configure it;
- permission to push;
- permission to make the repository public;
- permission to create a release or submit a hackathon entry;
- pilot partner, consent, and escalation authorization.

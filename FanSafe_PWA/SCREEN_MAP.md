# Screen Map

```
Home
├── Readiness ring + 5-step setup checklist (city, pack, contact, medical card, doc checklist)
├── Contextual "next step" card (active case > open lost-doc record > next unfinished setup step)
├── Trusted-circle check-in strip
├── Quick actions: Emergency, Medical card, Lost passport, Get me there
├── Offline city packs (top 3)
└── Recent saved phrase

Translate
├── Mode switch: Phrase | Two-way conversation
├── Phrase mode
│   ├── Language selects + swap
│   ├── 8 category chips (emergency/medical/navigation/transport/hotel/police/lost_document/ticket_scam)
│   ├── Input + voice input (feature-detected) + quick-phrase scroller (17 phrases)
│   ├── Translate → output (play / save / show-large / copy-share)
│   └── Full-screen phrase overlay
├── Conversation mode
│   ├── Traveller ⇄ Local language, feed of bubbles
│   ├── Speak (traveller) / Speak (local) — voice input with type-to-speak fallback
│   └── Keep-transcript toggle (default off) + Clear transcript
└── Saved phrases list

Safety
├── Hold-to-confirm emergency button → opens Emergency sheet
├── City safety brief (primary + non-emergency number, sample-data label)
├── Emergency phrase cards
├── "I am safe" check-in
├── Scam / ticket risk checker → risk level + reasons + actions → Save assessment / Create local record
├── Report a non-emergency incident: "Are you currently safe?"
│   ├── No → opens Emergency sheet
│   └── Yes → category/time/location/details/next-step form → local SafetyCase
└── My local safety records (unified incident + scam case list: update / cycle status / delete)

Travel
├── Offline storage health + 4 city packs (download simulate / remove / version+date)
├── Destination phrase generator (play / copy-share / save)
├── Saved places (add / remove)
├── Lost passport/document
│   ├── Ongoing-danger question → Yes opens Emergency sheet directly
│   ├── 4-step accordion guide
│   ├── Record form → generates local-language phrase, saves LostDocumentRecord
│   └── Official-directory guidance (no invented embassy details)
└── Travel document checklist (4 items, feeds readiness)

Me
├── Traveller profile (name, home language, accessibility, dietary notes)
├── App readiness (same live score as Home, itemized)
├── Emergency medical card (create/edit/hide/reveal/copy-share/delete + shared-device warning)
├── Trusted contacts (add/edit-primary/delete)
├── Saved items (unified: phrases/places/document refs)
├── App preferences (hide-medical-card-by-default toggle)
├── Privacy explanation
└── Reset all local data (confirmation modal → full wipe)

Global overlays
├── Emergency action sheet (call / share location / message contact / reveal medical card / play phrase)
├── City switcher sheet
├── Generic modal (confirmations, add-update, type-to-speak fallback)
├── Welcome overlay (first run only, or until "Skip intro" is chosen)
└── Toast + PWA install banner
```

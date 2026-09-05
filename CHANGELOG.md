# Changes

## 2026-09-05 — Veya Labs design and reliability pass

- Adopted self-hosted Geist Sans and Geist Pixel Square, with the upstream SIL font license. Fulminare's CSS identifies Geist Pixel for display text and Geist Sans for general text; Square is the selected Veya variant.
- Replaced the before/after hero demonstration with an accessible, working package selector linked directly to package customisation.
- Reworked shared typography, spacing, mobile cards, dark surfaces, buttons and review layout. Raised microscopic inherited text declarations to a 12px minimum; core estimator descriptions use 14px, body copy 16px.
- Retained official Phosphor duotone icons, six estimator steps, multilingual/RTL dependency, package matching with price, and contact handoff.
- Added a saved-draft choice, validation of stored option IDs, persisted website-type dependency provenance, and recovery when browser storage is unavailable.
- Added project-brief download and print/PDF styles to the review screen.
- Removed unsubstantiated “most popular” package label and internal implementation language from customer copy.
- Added skip navigation, active-page semantics, Escape-to-close mobile navigation and storage-safe theme toggling.
- Enquiries now reject oversized, malformed and foreign-origin requests, bound untrusted scope text, time out email calls, and identify browser estimates as unverified in the founder email.
- Missing email configuration returns a visible failure and preserves the customer's brief, rather than falsely reporting successful delivery.
- Added response security headers and no-store API responses.

### Research

- Fulminare: https://fulmina.re/ — observed typography and restrained coding interface. No artwork or site code copied.
- Vercel Geist: https://vercel.com/font — official font family and licensing distribution.
- GOV.UK: https://design-system.service.gov.uk/patterns/check-answers/ — editable final review.
- Nielsen Norman Group: https://www.nngroup.com/articles/progressive-disclosure/ — keep advanced detail secondary to the current decision.

### Scope and limitations

- Email delivery still needs RESEND_API_KEY, LEAD_TO_EMAIL and an approved LEAD_FROM_EMAIL. No email was sent during testing.
- Visual direction is research-informed; conversion uplift is not established without user testing.
- Automated checks exercise server-rendered routes and enquiry failure paths. They are not a browser interaction or penetration test.
- Added an expandable side-by-side package comparison using existing package inclusions.
- Added best-effort per-isolate rate limiting for the enquiry endpoint. Durable cross-isolate abuse protection is not configured.
- Upgraded vulnerable framework, React server rendering, build and Cloudflare dependencies; added Cloudflare types so standalone type checking works.

### Validation

- Production build, ESLint and TypeScript checks passed.
- 16 rendered-route and enquiry integration tests passed.
- Full npm audit (including development dependencies): 0 known vulnerabilities on 2026-09-05.
- Existing Vinext runtime upgraded to 1.0.0-beta.9 to remove the vulnerable image-size dependency; all routes rechecked.

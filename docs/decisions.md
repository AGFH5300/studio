# Decision log

## 2026-09-07 / Phase 2

1. Retain The Veya Fold; select the side-bound folio within that direction.
2. Preserve existing Vinext/Next architecture and Three.js dependency. No R3F dependency needed for this bounded authoring experiment.
3. Keep `/lab/fold` development-only via server production `notFound()` guard. Existing campus shell bypass applies only in development. Do not deploy this branch.
4. Blender unavailable after one bounded attempt. Use procedural source; do not claim a Blender asset.
5. WebGL disabled in QA browser. Introduce CSS 3D as a useful verified prototype/fallback; retain optional WebGL code explicitly unverified. This is a phase-specific accommodation, not a settled production renderer decision.
6. Use a duplex display leaf so the reverse remains a finished experience when opened. Validate this design assumption in the next industrial-design pass.
7. Mobile shows one active interior face; narrow desktop wing is omitted. Shared normal HTML previews carry readability.
8. CONDITIONAL PASS — WEBGL VISUAL GATE UNVERIFIED. Do not expand into estimator or site construction until physical material/geometry quality is proven.
9. Commercial audit discrepancy: existing Starter code says 5 pages; Session 1 approximate boundary says 4. Preserve both records, change neither package logic nor pricing during Phase 2.

10. On resumption, replace environmental “FAIL” wording with CONDITIONAL PASS — WEBGL VISUAL GATE UNVERIFIED. One fresh supported-browser retry confirms the limitation. Stop renderer investigation; do not infer design failure from missing WebGL access.


## 2026-09-08 — Phase 2B Checkpoint A

Branch `feat/veya-fold-phase-2b` starts at `5cee6d8`. Upgraded GPU geometry, recessed frames, structural spine/chassis/feet, rearward mobile hinge, studio reflections/lights, perspective camera and editorial Saha screen art. CSS fallback, shared React content, mobile controls and production guard preserved. Two independent generated target passes retained; first rejected. Build/TypeScript/Fold lint and CPU subframe clearance checks pass. No GPU visual claim: STOP at Candidate A and obtain local Mac screenshots. See `docs/fold-2b-comparison.md` for target interpretation, evidence slots, commands and URLs. No deployment or estimator work.

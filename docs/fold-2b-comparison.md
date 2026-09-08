# Fold 2B — Candidate A visual comparison record

2026-09-08. **Checkpoint A prepared; awaiting local GPU screenshots. No visual pass/fail issued.**

Repository AGFH5300/studio. Branch `feat/veya-fold-phase-2b`, based on Phase 2 commit `5cee6d8f2986646ffaaaa3171deb208f05a7a810`. Exact Candidate A delivery commit is recorded in Git history / the checkpoint response.

## Independent target

Two image-generation passes were made before local GPU review. First: `evidence/fold-2b/target-rejected-portrait.png`. Rejected for tall book proportions and absent supporting foot, despite useful lighting/material treatment. Second: `target-selected-three-states.png`, selected as a closed/half/open art-direction board. It establishes the mineral/metal contrast, dark display gasket, restrained cobalt and broad photographic key. Prompt record: `target-prompts.md` in the same folder. These are generated targets, NOT Three.js screenshots. No generated art is used as runtime evidence or deployed as a screen asset.

The target is an art reference, not a mechanical drawing: its incidental small feet beneath moving leaves and foreshortened screen proportions must not override the fixed chassis/foot and landscape dimensions specified in code. Candidate A deliberately keeps support on the fixed assembly. The generated site's copy is illustrative; approved Veya copy and shared headline remain authoritative.

## Candidate A implementation

- Broad cobalt backplate, continuous lower chassis rail, two aligned metal feet with elastomer pads. These form a visible support path.
- Interleaved knuckles on fixed clevis seats; through-pins and moving bearing arms. The front display uses the existing side-bound duplex mechanism.
- Metal subframes, actual extruded mineral rims with holes, recessed graphite gaskets and display planes. Shared rim profile unifies the three faces.
- Rear mobile cavity. Wing opens **rearward**, avoiding the fixed chassis. No new mechanism study or interaction engine.
- Mineral MeshPhysicalMaterial with subtle deterministic roughness, satin metal and restrained cobalt. RoomEnvironment-derived PMREM reflections; no remote HDRI or texture library.
- Broad RectAreaLight key/fill/rim, a co-located directional shadow source, low ambient fill. Area lights do not cast the shadow maps; no claim of fully path-traced soft shadows.
- Restrained 30° perspective camera with limited framing compensation. Detail query provides an explicit spine inspection view. One shallow stage and one backing plane; no room or postprocessing.
- Original locally drawn editorial Saha architecture plate and improved desktop/mobile screen typography. Same React headline and ordinary HTML previews. No backend.
- Existing CSS fallback/mobile HTML controls preserved. A development badge distinguishes actual WebGL2 from fallback. Frame diagnostics do not overwrite GPU counters with CSS measurements.
- Viewport fixture now preserves `webgl` and `detail` flags. In Phase 2 these were dropped inside the iframe.

## Validation so far

- Production build PASS (retained log).
- TypeScript PASS; Fold-only ESLint PASS.
- CPU geometry test PASS across 101 opening positions: moving display-subframe AABBs do not overlap the fixed display-subframe AABB. This is a conservative subframe check, not certification of every hinge/trim clearance.
- Source geometry: 59 meshes, 23,830 triangles for the Fold assembly (excludes stage, environment and shadow passes). Contact pad lowest vertex approximately y=0. This is source measurement, not GPU renderer counters.
- Runtime draw calls, frame behavior, materials and lighting remain UNMEASURED/UNINSPECTED.
- No Work browser retry, Blender setup, deployment or estimator work in 2B.

## Evidence slots — pending user uploads

| State | Target | Candidate A GPU | Critique / corrected capture |
|---|---|---|---|
| Closed | selected board, left | Pending | Pending |
| 25% | mechanism continuity | Pending | Pending |
| Half | selected board, centre | Pending | Pending |
| 75% | mechanism continuity | Pending | Pending |
| Open | selected board, right | Pending | Pending |
| CMS | one shared headline | Pending | Pending |
| Detail | support/hinge/material | Pending | Pending |
| Mobile | existing single-active-face layout | Optional pending | Pending |

Browser/device: pending user evidence. First critique must rank ONLY three issues, prioritizing silhouette, physicality, then composition. Make one coherent correction pass after screenshots. Stop here until evidence arrives.

## Local Mac run

Requires Git and Node >=22.13 as specified by the repository. Use ordinary `npm ci` on Mac; `install:ci` is a Linux-specific helper.

```bash
mkdir -p "$HOME/Downloads"
VEYA_FOLD_DIR="$(mktemp -d "$HOME/Downloads/veya-fold-2b.XXXXXX")"
git clone --branch feat/veya-fold-phase-2b --single-branch https://github.com/AGFH5300/studio.git "$VEYA_FOLD_DIR"
cd "$VEYA_FOLD_DIR"
npm ci
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

Open Chrome at http://localhost:5173/lab/fold?webgl=1&fixture=hero_closed. Keep page zoom at 100%; use roughly 1440×900 content area if convenient. The badge must say `GPU CANDIDATE A · WEBGL2 ACTIVE`. If it does not, send the badge and console error instead of treating CSS as GPU evidence.

Capture these URLs with the same window size:

- http://localhost:5173/lab/fold?webgl=1&fixture=hero_closed
- http://localhost:5173/lab/fold?webgl=1&fixture=hero_quarter
- http://localhost:5173/lab/fold?webgl=1&fixture=hero_half
- http://localhost:5173/lab/fold?webgl=1&fixture=hero_threequarter
- http://localhost:5173/lab/fold?webgl=1&fixture=hero_open
- http://localhost:5173/lab/fold?webgl=1&fixture=cms_edit — also change the field and capture the two readable previews.
- http://localhost:5173/lab/fold?webgl=1&fixture=hero_half&detail=1
- Optional: http://localhost:5173/lab/fold?webgl=1&fixture=mobile_open&viewport=mobile

Send factual screenshots into this same conversation, plus browser/Mac model if known. Open the Development fixtures & measurements section and copy the runtime counters if easy. No subjective assessment is required from the user.

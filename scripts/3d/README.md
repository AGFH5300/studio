# Veya / 01

Original Veya Labs design instrument, modelled procedurally with Blender 4.5 LTS.
No competitor artwork or third-party character model is included.

Rebuild from the repository root:

1. Install Python Pillow, fonttools and brotli.
2. Run `python scripts/3d/paint-screen.py`.
3. Run `blender --background --python scripts/3d/build-workstation.py -- /absolute/path/to/project`.
4. Convert the poster to WebP using Pillow, keeping its transparency.

The `.blend` is a reproducible intermediate, excluded from Git. The compressed
GLB and WebP poster are checked in under `public/models`. The GLB uses Draco
mesh compression; its decoder is served locally from the official Three.js
package. Retain upstream Three.js/Draco licensing notices when updating it.

The browser replaces the model's `LIVE_SCREEN` material with a local canvas.
`KEY_BRAND`, `KEY_BOOK`, `KEY_SHOP`, and `DIAL` are interactive raycast targets.
Equivalent labelled HTML controls provide keyboard and touch access.

The 3D experience is progressive enhancement: a poster is visible before
loading, the controls and estimator links remain usable without WebGL, and
rendering pauses off-screen/in hidden tabs. Reduced motion disables tracking.


## Veya Core — full redesign

`build-core.py` builds the layered monogram from original geometry and exports the seven separately movable layers to `public/models/veya-core.glb`. Run in Blender 4.5 LTS with the project root after `--`. Convert the rendered `scripts/3d/veya-core.png` to `public/models/veya-core.webp` at quality 88. The PNG and `.blend` are reproducible intermediates. Source geometry and final GLB/WebP are retained in Git.

The browser uses local Draco decoding, selectable finishes, explicit rotation and assembly controls, and reduced-motion behavior. No third-party model or artwork is used.


## Explorable campus

`build-campus.py` creates the original six-place Veya campus and explorer in Blender 4.5 LTS. Run Blender in background mode with the script and project root after `--`. Exported GLB station meshes retain `<place>__<material>` names for raycasting. `EXPLORER` is a separate parent with five child meshes. Convert the generated campus PNG to WebP at quality 88; the GLB and WebP are tracked, while the .blend and raw PNG are reproducible intermediates.

Runtime: drag-to-orbit, click-to-walk, keyboard movement and jump, click-to-visit station routes, camera reset, zoom, day/evening lighting. Grid navigation excludes building footprints, the reflecting pool and platform edges. The static map and direct Places links remain usable without WebGL.

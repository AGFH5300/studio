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

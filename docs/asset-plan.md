# Veya Labs — asset and production plan

## Asset inventory

| Asset | Method / owner task | Source format → delivery | Acceptance |
|---|---|---|---|
| Fold frame and offset spine | Model in Blender; art direction task | .blend + deterministic bpy script → GLB | Distinct silhouette, real bevels/joints, clean normals at all poses |
| Hinged leaves | Procedural instanced geometry; author one reference | TS parameters + optional Blender source → code/GLB | 1–7 visible leaves, groups for more; no intersections |
| Stage | Minimal modeled shallow surface/backdrop | Blender → GLB or primitives | Focal composition, no decorative building |
| Three material families | Author porcelain, metal and dark stage; source licensed maps only when useful | Material parameters + source maps → web PBR/KTX2 | Consistent scale, controlled reflections, no baked-light duplication |
| Light environment | Small licensed studio HDRI or authored baked environment | HDR/EXR source → compressed environment asset | Attribution/license tracked; reflection matches key direction |
| Connector kit | Procedural short channels, sockets, request marker | TS geometry → runtime | Clear route, capped counts, no random spaghetti |
| Sample websites | Design/build two original styles with identical semantic scope | React/HTML + authored assets | Actual responsive layouts; “illustrative preview” label |
| CMS demonstration | Code one source field updating desktop/phone samples | Typed fixture → HTML + visual state | Both reflect same value; no fake integration claim |
| Commerce/booking/CRM demo terminals | Code simple inspectable previews | Typed fixtures → HTML and screen surfaces | Real local interactions with synthetic records |
| AI knowledge/demo fixtures | Write short owned business FAQ and sample enquiries | JSON/MD → server allowlist | Structured response validation; no private real-world data |
| Hero poster | Render approved browser-comparable scene | Blender/browser PNG → AVIF/WebP | Exact initial framing; mobile crop independently composed |
| Work imagery | Capture owned work / obtain permission | Source screenshots → responsive AVIF/WebP | Accurate content, role and rights; no invented metrics |
| Team imagery | Owner-supplied genuine photographs | Originals → responsive images | Permission and accurate names; no generated fake staff |
| Fonts | Source self-hostable licensed candidates | WOFF2 | Only necessary weights; fallback metrics reviewed |
| Icons | Build/use consistently licensed SVG set | SVG | Readable at small size; no raster text |
| OG image | Compose from approved hero + short title | PNG/JPEG | 1200×630 and legible in small cards |
| Optional audio | Deferred; authored or licensed micro-sounds only | WAV source → compressed clip | Off by default; no sound-only information |

Do not source trademarked worlds or borrow the supplied reference videos as Veya production assets. The saved reference contact sheets are for private research, not website publication.

## Blender-to-browser pipeline

1. Confirm Blender executable, version, render support and script execution before allocating an asset session. Blender was not available on PATH in this planning environment; future access is a setup dependency, not an assumed capability. A Blender MCP connection is optional, not a requirement if bpy scripts can run directly.
2. Use a meter-based authoring scale and named collections: Stage, Frame, Spine, Leaves, Fixtures, Cameras, Lights. Apply transforms intentionally; use stable object IDs and pivots. Save the editable source before destructive modifiers/export.
3. Produce a neutral clay pass at closed, half-open and open poses. Test hinge envelope and attachment geometry before textures.
4. Establish bevel widths and smoothing; inspect grazing-angle normals. Create UVs with consistent texel density. Reuse material slots; keep transparent materials rare.
5. Author a warm key/cool fill reference render. Browser glTF PBR will not reproduce every Blender/Cycles feature: bake unsupported nodes, simplify material graphs, and validate in the actual browser renderer.
6. Export GLB with correct scale/orientation, selected meshes and stable names. Inspect loaded bounding boxes, pivots, colors and animations. Do not assume Blender axis conventions transfer unchanged.
7. Compare compressed/uncompressed meshes and textures at actual camera distance. Choose Meshopt or Draco based on measured decode/transfer tradeoff; avoid redundant compression paths. Use KTX2 where supported and keep a tested fallback/transcoder path.
8. Render matched desktop/mobile posters from the approved look. Save a browser screenshot beside the target; a beautiful Cycles render alone does not pass.
9. Produce a manifest with asset ID, version, bytes, triangle count, material count, texture dimensions, origin/license, checksum, export command and source revision.

## Texture and material discipline

Prefer geometry for silhouette and large structural joints; normal/roughness for small surface detail. Avoid adding dirt simply to make digital objects “real”. The Fold is crafted, precise and lightly tactile. Use generated textures only for original nontechnical surface detail; inspect tiling and scale. Do not generate prices, labels or UI text into images. Base-color textures use appropriate color space; data maps do not. Verify baked ambient occlusion is not multiplied excessively by runtime shading.

## Animation deliverables

One reusable unfold/close timeline, local leaf insertion/removal, content propagation highlight, a short request journey and camera transitions. No separate movie for every estimator combination. Each animation has defined start/end poses, cancel behavior, reduced-motion state and owner of transforms. Capture 25/50/75% positions for collision/occlusion QA.

## Reference set for the next visual session

Use A–H lessons, but choose only 3–5 specific visual targets: the approved Fold form; a hinge/material close-up; one open composition; one mobile frontal view; one screen layout. Generate concept images only after a concrete structure brief. Reject impossible hinges or unreadable panels even if an image looks impressive. Save source prompts, seeds where available and the selected image. Do not generate a large moodboard instead of deciding.

## Reuse and scope

Create one kit that supports hero, estimator and work explanation. Do not build a second showroom for each route. At launch, prioritize two high-quality sample styles and a small number of honest work cases over ten shallow scenes. The first slice uses only closed/open states and one CMS change; all other assets wait for its visual gate.

# Veya Labs — technical architecture

## Stack decision

**Next.js + React + TypeScript**, server-rendered/static business content, isolated client-side estimator, **React Three Fiber / Three.js WebGL2** for the first browser scene, **Blender** for the frame and authored asset kit, GLB for exchange. CSS for interface transitions; one small scene timeline based on Three.js transforms or a scoped GSAP timeline if orchestration requires it. Pin compatible versions during implementation after the repository audit. No version numbers are invented here.

| Option | Decision / reason |
|---|---|
| Next.js vs Vite-only SPA | Next.js for crawlable routes, server forms and content. A Vite lab is acceptable for a throwaway visual experiment, but avoid maintaining two production shells |
| R3F vs direct Three.js | R3F for component lifecycle and React integration; business engine is plain TS. Direct Three.js remains inside specialized helpers, not a second renderer |
| WebGL2 vs WebGPU | Start WebGL2 to prove the asset/art pipeline. Evaluate WebGPU only against a specific visual or performance need in phase 2. Three.js documents a WebGL2 fallback for WebGPURenderer; feature parity still needs testing, especially materials/postprocessing. [Three.js docs](https://threejs.org/docs/pages/WebGPURenderer.html) |
| Blender vs all procedural meshes | Blender for distinctive frame, hinges, bevels and material authoring; code for repeated leaves/connectors and deterministic layouts |
| Unreal | Reference production tool, not web delivery target. No streamed Unreal sessions, GPU servers or native executable required |
| Rapier / physics | Exclude from launch. Authored constrained movement gives better scope-selection control. Add physics only if a proven interaction needs it |
| Workers / WASM | No WASM by default. Worker only if measured geometry/export work creates main-thread stalls |
| AI | Small server-side bounded demonstration, independently switchable. No model in pricing/recommendation loop |
| Database / CMS | No database for estimator drafts. Typed content/MDX first; no paid headless CMS until owner editing needs justify it |

This is a proposed architecture, not a claim about the current repository. First implementation action: inspect `AGENTS.md`, package.json, existing data/rules, hosting files and deployment workflow. Reuse viable infrastructure and commercial logic while replacing presentation. If a Sites project is actually present, follow its required project lifecycle; production preference carried from context is Render with manual deployment, not Replit.

## Intended project structure

```text
app/
  page.tsx
  work/page.tsx
  work/[slug]/page.tsx
  services/page.tsx
  services/[slug]/page.tsx
  pricing/page.tsx
  build/page.tsx
  process/page.tsx
  about/page.tsx
  contact/page.tsx
  privacy/page.tsx
  terms/page.tsx
  api/inquiry/route.ts
  api/demo/route.ts
components/
  site/                # navigation, footer, content and pricing
  estimator/           # chapters, dependency dialog, summary, share
  experience/          # lazy canvas boundary, poster, accessible controls
lib/
  estimator/           # schema, catalog, predicates, dependencies, evaluate, explain
  scene/               # manifest adapter, cameras, transitions, quality tiers
  content/             # typed work/service loaders and validation
  server/              # inquiry delivery, demo model adapter, rate limits
  analytics/           # consent-aware event interface, safe payload schemas
content/
  work/ services/ faq/ team/
assets-source/
  blender/ scripts/ materials/ licenses/
public/assets/
  fold/ posters/ work/ fonts/
tests/
  estimator/ journeys/ visual/ accessibility/
docs/
  [Session 1 documents] decisions.md session-log.md
```

Keep heavy source models out of ordinary application bundles. Git LFS or versioned artifact storage for large source assets; small web-ready outputs can be checked in when practical. No monolithic 40MB homepage GLB. Record checksums and source/output correspondence.

## Component and state boundaries

Server content renders without importing Three.js. `ExperienceBoundary` reserves dimensions, renders poster and ordinary links, lazy-loads a client canvas, and catches rendering errors. Only one active canvas; unload the home scene on navigation to Build or Work. No canvas shared invisibly across unrelated routes unless measurements show a real benefit.

Estimator domain state uses a reducer with typed commands and transaction history. A lightweight external store is optional for selectors, not a reason to duplicate state. Derived estimate and scene manifest are computed from the same immutable resolved scope. Navigation/UI state (chapter, focus target, open drawer) and presentation state (camera, progress, hover) live separately. Contact data never enters scene state.

Scene hierarchy: `StageRoot → LightingRig + FoldRoot + RequestTrace + CameraRig`. FoldRoot contains spine, hinged leaves, frame, optional system terminals and capped procedural connectors. Stable IDs allow reuse. Each scene state is a target transform graph. Animation interruption interpolates from current transform to latest target. Final target is authoritative; elapsed time is not business state.

Named camera/state fixtures: hero_closed, hero_open, cms_edit, enquiry_trace, starter_summary, complex_scope, mobile_open, reduced_motion. Only development/test builds expose a diagnostic API to load fixtures and inspect scene readiness, catalog version, scope hash, triangle/draw counts and frame timings. Do not ship a mutation/debug API publicly.

## Content and CMS

Veya’s own content uses typed MDX/JSON records reviewed through Git. Work schema: title, slug, sector, workType(client/founder/concept), role, permissionStatus, problem, scope, images with alt/rights, demoId, outcomes with evidence source, date and CTA preset. Services share explicit capability IDs with estimator prefills but do not contain prices. Package UI reads the same approved catalog as the engine.

A future editorial CMS must adapt into these schemas; it cannot change rates casually through rich text. Editorial content cannot execute arbitrary scripts. Client projects’ CMS capabilities are what the estimator sells; they do not force Veya to run its own headless CMS now.

## Forms and delivery

POST `/api/inquiry`: accept bounded, validated contact fields and canonical scope; apply rate limiting, honeypot, origin checks, CSRF defense as appropriate, idempotency key, and server recomputation. Email via a selected transactional provider behind a small adapter. Exact vendor/account, recipient, sender domain and retention are launch prerequisites, not invented contact details.

Provider acceptance yields inquiry ID and a precise acknowledgment. On provider failure, return a retryable failure and preserve the client form. Do not claim success on a swallowed exception. If durable queueing is later introduced, distinguish queued from delivered. Prevent header injection, escape user content, redact logs, and do not expose secret credentials through `NEXT_PUBLIC_*`. Add only narrowly scoped attachments after need is proven; launch contact has no uploads.

## AI demo system

POST `/api/demo`: synthetic input chosen from bounded fixtures or short non-sensitive text, one allowlisted demo knowledge base, structured response schema, max output and request limits, short timeout, per-session/IP budget and global kill switch. Model/provider chosen at implementation from available cost/latency needs; no need to run Astra for every visitor. No browsing, arbitrary URLs, external tools or actual CRM permissions. Treat text as untrusted content. Validate returned structure and display an honest unavailable state if validation fails. Moderation/data controls follow selected provider requirements.

The model produces a suggested interpretation and draft, not a quote. A deterministic local workflow shows what would happen next. User-confirmed capability suggestions are converted to ordinary estimator commands. No external contact or account action occurs from the demo.

## Animation and assets

Author hinge constraints in Blender with named pivots; export geometry/materials, not an opaque baked movie for every configuration. Use shared materials and pooled leaf geometry. CMS and enquiry examples update real HTML views; 3D screen textures can reflect simplified display snapshots. At close range, transition to a flat DOM preview to preserve readable text, keyboard input and selection. Avoid live iframe textures.

A single controller owns camera/joint timelines. CSS owns UI transitions. Do not have GSAP, Motion and frame hooks all writing the same transform. Render on demand when settled; sustain frames only during active transitions, input or the bounded sample journey.

## Deployment and operations

Git feature branch → reviewed changes → production build/test → staging → manual Render deployment → verify deployed commit and smoke paths. Inspect actual repository policy before changing deploy settings. Next.js supports Render deployment as a Node service; validate runtime/build commands against the pinned app. [Render guide](https://render.com/docs/deploy-nextjs-app)

Use content-hashed asset filenames and immutable caching; HTML should revalidate normally. Keep essential assets and fonts on the same origin where feasible, particularly given prior school-network certificate problems. Add a CDN/object store for larger versioned scene assets only if needed; it must have valid TLS, CORS and versioned manifests. Avoid runtime dependence on third-party demo hosts.

Environment inventory: SITE_URL, INQUIRY_TO, MAIL_FROM, MAIL_PROVIDER_KEY, DEMO_PROVIDER_KEY, DEMO_ENABLED, rate-limit backend details if selected, monitoring DSN. Document public vs server-only values. No credentials in handoffs, shared config or generated static files.

Monitoring: safe frontend exception reporting, form delivery failure counts, model timeout/cost counts, real-user web vitals, scene fallback reasons. Scrub personal input, URLs/fragments and model text. Deploy a renderer feature flag so canvas can be disabled while content, estimator and contact stay live. Rollback retains version-compatible catalogs and inquiry interpretation.

## Verification gates

Unit/property checks: package boundaries, dependency graph validity, deterministic recommendation, no double charge, serialization/migration, renderer-independent results. Browser journeys: direct pricing, estimator changes/back/undo/share, stale restore, form failure/retry, no-WebGL, reduced motion, keyboard-only, mobile keyboard and Back navigation. AI: valid schema, timeout, prompt-injection-like text, budget exhaustion and no external side effect. Visual QA: named frames with fixed seed/time, transitions checked at 0/25/50/75/100%, no clipping and readable UI. Build passing is necessary but does not establish visual quality.

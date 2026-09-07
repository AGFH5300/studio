# Performance, mobile, accessibility and SEO

## Performance budgets — proposed acceptance targets, not achieved measurements

Measure transferred/compressed bytes separately from decoded memory and GPU allocation. Budgets include dependencies and transcoders in their respective tier; headline mesh size alone is not a page budget.

| Area | Initial target | Enforcement / fallback |
|---|---|---|
| Useful first response | Navigation, proposition, price and links before 3D | Server HTML; no canvas loading gate |
| Initial shell transfer | ≤650KB including HTML/CSS/critical JS/font/poster | Analyze production waterfall; defer noncritical code |
| Initial non-3D JS | ≤250KB compressed | Route splitting; measure framework baseline; document justified exception |
| Hero poster | ≤200KB desktop, ≤120KB mobile | Responsive AVIF/WebP, reserved dimensions |
| Interactive scene addition | ≤4MB desktop; ≤2MB mobile, cumulative initially loaded 3D code/assets | Stream only needed kit; poster remains if unsupported or declined |
| Visible geometry | ≤150K triangles desktop, ≤60K mobile starting cap | Simplify hidden detail, instance repeats |
| Draw calls | ≤80 desktop, ≤40 mobile starting cap | Material sharing/instancing; real renderer counters |
| Texture allocation | Aim ≤64MB desktop, ≤32MB mobile | Count mip chains and decoded formats; lower resolutions before adding effects |
| Frame rate | 60fps target desktop during interaction; stable 30fps mobile minimum target | Measure sustained frame times, not only average fps; reduce DPR/shadows |
| Interaction latency | Scope feedback immediate; render animation does not block | Business reducer off animation clock |
| Page stability | CLS ≤0.1 | Reserved stage sizes and font metrics |
| Field CWV | p75 LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 | RUM by route/device after launch; lab checks are proxies |

CWV thresholds and field-percentile approach follow [web.dev](https://web.dev/articles/vitals). Asset/GPU budgets are Veya engineering choices and must be calibrated on real devices. Do not claim field performance before traffic exists.

## Progressive loading and quality tiers

Tier 0: server content + poster + full estimator HTML + readable project-system diagram. This is a designed experience, not an error screen.

Tier 1: mobile/limited GPU—same main silhouette, fewer page leaves, smaller maps, baked/cheap shadows, DPR capped around 1–1.25, no postprocessing chain. Tap-driven transitions, then stop rendering.

Tier 2: normal desktop—full kit, DPR cap around 1.5, carefully limited contact shadows and antialiasing, bounded camera controls. Optional richer highlights only if measured headroom exists.

Do not use viewport width as the sole performance detector. Respect reduced motion and data-saving signals when available; handle unavailable signals. Observe frame times after warm-up with hysteresis before downgrading; never oscillate quality every second. A user preference can select simpler visuals. Stop rendering when tab hidden or scene offscreen. Respond to WebGL context loss with a stable poster and unchanged controls.

Preload only the poster/font actually required. Start scene loading after essential UI is available, with intent-based prefetch for Work/Build where useful. Avoid fetching all portfolio GLBs on home. Cache content-hashed assets immutably; validate scene-manifest version consistency on deploy. A slow connection must not receive an endless animated loading placeholder.

## Mobile design

Portrait composition is authored separately: front-facing folio, one active leaf, readable contextual labels in HTML. No free roaming, drag-only interaction, hover dependencies, pointer lock or required landscape orientation. Tap/add/remove alternatives exist for every spatial action.

At 360–430px widths, questions are full-width; numeric pages input and steppers coexist; CTA does not overlap the keyboard or safe area. Long summaries are ordinary scrollable pages. Menus and dialogs have focus handling. Browser Back returns correctly between routes and meaningful page states. The scene never steals vertical touch scrolling. Responsive UI still works at 200% zoom and reflows at narrower effective widths.

Actual mobile QA: iPhone Safari, a midrange Android Chrome device, portrait/landscape, keyboard open, reduced motion and poor network. Emulation is useful but cannot establish sustained GPU/thermal behavior. If physical-device access is unavailable, record it as an unpassed gate.

## Accessibility

Target WCAG 2.2 AA, with manual checks in addition to automation. Reference: [W3C quick reference](https://www.w3.org/WAI/WCAG22/quickref/).

Semantic headings, links, buttons, fieldsets/legends, error descriptions and focus visibility carry all essential functions. Canvas is decorative when redundant; if it communicates unique explanation, provide adjacent equivalent structured text. Never duplicate every visual object in the tab order.

Target 44px comfortable touch controls as a design choice. Check 4.5:1 normal-text contrast, 3:1 large text and relevant UI contrast. Use labels/icons as well as color. Announce settled estimate status politely; do not read every animation tick. No flashing, autoplay sound or mandatory timed task. Reduced motion switches long movements to immediate state changes or a brief fade; it does not remove access to capabilities.

Keyboard test: enter Build, complete all six chapters, resolve a dependency, return to a prior chapter, copy summary and contact without using canvas. Screen-reader test checks package status, unknown amounts, errors, changed dependencies and submission result. Dragging is always optional.

## SEO and sharing

SSG/SSR service, pricing, work and about content. Unique titles/descriptions, canonical URL, readable headings, sitemap, robots policy and real internal links. Public content is not canvas-only. Scope hashes and private draft state are not crawlable landing pages. Staging is noindex and protected where appropriate; production indexing is intentionally checked.

Use Organization/Service structured data only for accurate business information; include genuine profiles and contact details when supplied. No fake review schema or invented physical address. FAQs stay visible in HTML; do not promise rich results. Work screenshots have useful alt text and descriptive captions.

UAE positioning is explicit in copy, AED prices and relevant examples. Publish English first unless actual Arabic content is available; build logical CSS properties and locale-aware formatting so future RTL does not require a rewrite. Do not publish machine-filled Arabic pages merely to claim localization. Set hreflang only when real corresponding localized pages exist.

OG preview uses an approved static Fold image and concise proposition. Estimator share links reconstruct scope client-side; personalized link-preview images require separate server state and are deferred.

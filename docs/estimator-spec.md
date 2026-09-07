# Veya estimator — interaction and business engine specification

## Product contract

The estimator produces a useful, editable scope and an honest investment status. It does not generate a finished website or a binding quote. Business logic is renderer-independent. The full conventional HTML interface is the canonical UI; the Fold is a second view of the same result.

The current brief establishes headline prices and approximate page limits. It does **not** establish a complete per-feature commercial table. Preserve those unknowns as unknowns. Do not turn an absent price into zero or infer that all features fit within the page-based package.

## Known commercial inputs

| Package ID | Headline AED | Approximate page ceiling | Treatment |
|---|---:|---:|---|
| starter | 999 | 4 | Preserve; exact counting policy to confirm |
| pro | 2,499 | 7 | Preserve |
| business | 4,999 | 15 | Preserve |
| signature | 9,999+ | approximately 25/custom | Starting headline, not fixed total; custom above boundary |

Prior project context mentions revisions 2/3/5/flexible and support 30/60/90/120 days in package order. Preserve as **carried-forward, awaiting commercial confirmation**, not newly approved commitments. One gateway, one CRM, AI assistant and standard workflow are existing concepts; the precise package mapping and depth are not established here. The implementation phase must inspect any actual existing catalog before replacing it. No repository or live estimator was audited in this planning session.

## Six chapters, concrete questions

| Chapter | Inputs / answer types | Dependencies and pricing effect | Visual consequence |
|---|---|---|---|
| 1 Website type | Single select: business/lead generation, ecommerce, booking/service, content/publication, custom product; optional sector enum and “not sure” | Type proposes requirements; never silently assigns a paid package. Custom product marks scope review | Same Fold frame; authored sample content and customer journey change |
| 2 Pages | Integer 1–25; “more/custom”; optional named page checklist; unknown allowed | Derive page-based candidate only; 26+ goes to custom review. Repeated CMS records are recorded separately, pending counting policy | Show up to 7 page leaves; above that show grouped leaves with an exact HTML count |
| 3 Design | Single select: focused/polished standard, tailored brand design, signature interactive; unknown | Approved catalog later maps design to eligibility or add-on. Until then nonbasic choices are unpriced scope | Change composition and preview style; design preview theme is separate from commercial tier |
| 4 Content & CMS | CMS none/basic pages/collections; blog bool; content supplied/needs editing/needs creation; languages one/multiple/unknown; migration none/small/custom | Blog needs collection-backed CMS; multilingual and migration require scope review until rates and definitions approved | One source panel becomes editable, updates two views; additional language visible only if selected |
| 5 Business features | Multi-select booking, ecommerce, payments, CRM, member area, custom feature; gatewayCount and crmCount integers 0–3 plus custom; named platform optional enum/other | Online payment needs provider integration; booking can be enquiry-only or live; ecommerce can be catalog-only or checkout; quantities do not imply included allowances | Show only selected paths and terminals; sample input traverses them |
| 6 AI & automation | Assistant none/knowledge FAQ/custom; workflow none/one standard/custom; allowed demo intent optional; unknown | Assistant requires an approved knowledge source; CRM automation requires a CRM destination or explicit alternative. No autonomous additions | Optional interpretation panel and a traceable event route; inspectable output |

Additional qualification (budget range, timing, existing site) belongs after the scope summary or in Contact. It must not become a seventh compulsory chapter. Budget does not manipulate price or package selection.

Page counting needs explicit approval: unique designed pages versus template types, system pages (cart/checkout/account), products/posts, and language variants. Interim preview labels the input “Pages you expect to need” and does not promise an exact fixed quote based on ambiguous counts.

## Proposed TypeScript data contracts

These are implementation contracts, not a production engine shipped in Session 1.

```ts
type PackageId = 'starter' | 'pro' | 'business' | 'signature';
type Decision<T> = { status: 'answered'; value: T } | { status: 'unknown' };
type PriceEffect =
  | { kind: 'included'; packageIds: PackageId[]; allowance?: number }
  | { kind: 'fixed'; amountMinor: number; currency: 'AED' }
  | { kind: 'perUnit'; amountMinor: number; unit: string }
  | { kind: 'quoteRequired'; reason: string };
type Rule = {
  id: string; version: number; status: 'draft' | 'approved';
  when: Predicate; requires?: Requirement[]; excludes?: string[];
  minPackage?: PackageId; priceEffect?: PriceEffect;
  explanation: string; source: string;
};
type Scope = {
  schemaVersion: 1;
  type: Decision<'business' | 'ecommerce' | 'booking' | 'content' | 'custom'>;
  pages: Decision<number | 'custom'>;
  design: Decision<'focused' | 'tailored' | 'signature'>;
  cms: Decision<'none' | 'pages' | 'collections'>;
  content: Decision<'supplied' | 'editing' | 'creation'>;
  languages: Decision<'one' | 'multiple'>;
  migration: Decision<'none' | 'small' | 'custom'>;
  features: string[]; gatewayCount: number; crmCount: number;
  commerceMode: 'none' | 'catalog' | 'checkout';
  bookingMode: 'none' | 'enquiry' | 'live';
  assistant: 'none' | 'faq' | 'custom';
  automation: 'none' | 'standard' | 'custom';
};
type Estimate = {
  catalogVersion: string; scopeHash: string;
  state: 'incomplete' | 'needsResolution' | 'indicative' | 'scopeReview';
  pageBasedCandidate?: PackageId;
  recommendedPackage?: PackageId;
  recommendationReasons: { ruleId: string; message: string }[];
  baseStartingMinor?: number; pricedAddonsMinor: number;
  knownSubtotalMinor?: number;
  unpricedItems: { featureId: string; reason: string }[];
  unresolvedQuestions: string[];
  dependencies: ProposedChange[];
  lineItems: { key: string; label: string; qty: number; amountMinor: number }[];
  exclusions: string[];
};
```

`Predicate` is a small typed expression tree over known fields (equals, includes, greaterThan, all, any), never executable strings or eval. Draft commercial rules are not used for public pricing. Approved logic can still return quoteRequired; approval does not require a fixed number.

Store amounts as integer fils: 999 AED = 99,900 minor units. Currency formatting at the boundary. No floating arithmetic or price extraction from UI labels. Commercial catalog includes approval status, owner, source, effective date and version, with a reviewed migration policy.

## Pure processing pipeline

1. **Parse:** schema-validate every command, restored draft, URL and server request; reject unknown IDs, unsafe lengths and out-of-range numbers.
2. **Normalize:** canonical ordering and exact answer values; do not discard explicit user intent.
3. **Resolve dependencies:** calculate required/excluded selections as a proposed transaction. Show its meaning before acceptance if it changes choices. Graph validation rejects cycles; derived requirements are recalculated, not incrementally accumulated.
4. **Validate completeness:** unknown is legitimate for an inquiry but not a completed fixed-scope estimate. Missing required answers get explicit messages.
5. **Assess eligibility:** choose the least expensive approved package satisfying all confirmed requirements and allowances. Page ceiling alone gives only `pageBasedCandidate`. If feature mapping is unavailable, leave `recommendedPackage` unset and return `scopeReview`.
6. **Calculate:** base starting amount plus approved, nonincluded, deduplicated add-ons. Apply allowances before incremental quantities. Unknown rates remain unpriced line items; never zero. No arbitrary complexity multipliers or AI-set prices.
7. **Explain:** emit triggered rule IDs, recommendation reasons, exclusions and unpriced scope. The server computes the same result from the same catalog.
8. **Project visually:** a separate pure adapter produces `SceneManifest` from resolved scope: page groups, visible demo systems, theme ID, status and stable object IDs. It contains no price authority.

`dispatch(command)` → business reducer → derive estimate → render HTML and publish scene target. Neither animation progress nor a physics collision dispatches a price update. Dragging, if enabled, resolves to the same explicit validated command as the Add button. A render crash cannot change scope.

## Concrete dependency examples

- Selecting “Blog” with CMS none proposes “Add a collection-based CMS so posts can be managed.” Accept adds both; cancel leaves the prior state. A selected blog cannot remain silently disconnected.
- Removing CMS while blog is selected offers “Remove blog too” or “Keep CMS”. Atomic operation; no half-valid state and one Undo restores both.
- Ecommerce first asks catalog or online checkout. Catalog does not force payment. Checkout proposes one gateway plus required commerce setup. Additional gateways remain scope review until allowed quantities and rates are approved.
- Booking enquiry does not imply a live calendar integration. Live booking asks for platform choice or “Help me choose”. Unspecified platform is a scope-review item.
- “Send enquiries to CRM” requires a destination. If none exists, offer existing CRM, help choose, or use an email-only workflow; explain the distinction.
- Removing the prerequisite reverses derived requirements only if no other explicit selection needs them. Provenance tags distinguish user-selected from derived values.
- Unknown/custom answers never get silently mapped to the cheapest option. They can still proceed to a clearly qualified inquiry.

## Price and recommendation presentation

**Complete approved configuration:** “Recommended: Pro · Estimated starting investment AED 2,499” plus line items, included allowances and exclusion copy; only valid when the catalog supports every selection.

**Known page scope, unresolved feature mapping:** “Page-based starting point: Pro, from AED 2,499. CRM and AI scope need review.” A separate block lists unpriced items. Do not describe AED 2,499 as the total for that configuration.

**Custom scope:** “Custom scope review · Signature projects start at AED 9,999.” It is not an upper bound, quote or guarantee that all custom work qualifies at this amount.

**Incomplete:** show the known package menu and missing answers, not a spurious exact total. The summary remains shareable as an incomplete brief.

Unknown recurring service costs and VAT treatment stay visibly separate from implementation subtotal. Do not add a tax number or “VAT included” until the actual business treatment is confirmed.

## State, progress and recovery

UI states: initial, editing, dependency confirmation, invalid field, restored draft, stale catalog, summary incomplete, summary indicative, summary scope-review, submitting, accepted, failed. A scene has independent poster/loading/ready/paused/fallback/error states.

All six chapters are named and selectable. Back preserves answers. Changing an earlier answer recalculates all downstream requirements, offers an atomic resolution, and explains changes. Undo keeps the last 20 user transactions in memory; reset requires a clear confirmation because it deletes the draft. “Not sure” is visually distinct from unanswered.

Persist canonical scope, schemaVersion, catalogVersion and updatedAt locally after changes (debounced ~300ms). No contact information or free text in persistent estimator state by default. Proposed expiry 30 days with a delete/reset control. Catch storage denial/quota errors and continue in memory. Restore only on explicit “Continue your saved project”; show when saved. Recalculate under current catalog and explain changes. Never treat stored totals as authoritative.

Share: `/build#v=1&c=<base64url compact scope>` for an allowlisted, nonpersonal payload with a target maximum URL length of 1,800 characters. Hash state is user-readable and editable, not secret. Decode safely with byte and array limits, validate, migrate known versions and recalculate. Unsupported/corrupt links show an explanation and a clean start without destroying a current local draft. Strip fragment/payload from analytics and error logs. Fall back to Copy scope when too long. A future short-link database is optional, not launch infrastructure.

A generic Open Graph image represents Build; a client-side hash cannot create a personalized server OG preview. A saved image can be added later, generated from the same safe summary data; do not imply link previews will show a unique project.

## Summary and CTA

Show type, page expectation/count basis, design level, content/CMS, business features, integration quantities and unknown platforms, AI/automation, resolved dependencies, recommendation status, known amounts, unpriced additions, ongoing costs to discuss, and expected process. Links edit each chapter. “Build this with Veya” opens contact with scope attached; no account or email wall to see the result.

Launch outputs: **copy scope**, **share link**, **locally saved draft**, **send inquiry**. Email scope only occurs on user submission; a booking link is optional afterward. Downloadable PDF and server short links are deferred unless evidence shows they are useful. The text export is deterministic and includes catalog version and nonbinding estimate status.

## Analytics contract

Events: estimator_open(source), chapter_view(id), answer_commit(fieldId, enumValue), dependency_proposed(ruleId), dependency_accepted(ruleId), recommendation_view(packageId/status), summary_view(status), scope_copy, scope_share, inquiry_start, inquiry_accepted, inquiry_failed(category), fallback_used(reason), demo_run(type), ai_demo_result(status).

Do not log typed text, contact information, full config URLs or model input/output. Event payload uses versioned enums and session-scoped random IDs where consent permits. Completion = first summary reached per draft; conversion = server-accepted inquiry, separately from click. Count deduplication keys so retries do not inflate leads. Compare qualified inquiries and drop-off by device; time in 3D is secondary.

## Essential tests / sample outcomes

| Case | Required result |
|---|---|
| Pages 4 / 5 / 7 / 8 / 15 / 16 / 25 | Page-based candidates Starter / Pro / Pro / Business / Business / Signature / Signature; approximate-count policy caveat retained |
| Pages 0, negative, decimal, NaN, huge value | Reject with field error; no price |
| 26+ or custom | Custom review, not fixed Signature price |
| 3 pages + custom AI | Starter page candidate only; no full recommendation if mapping unknown |
| 6 pages + unknown CRM price | Pro page candidate; unpriced CRM item; no misleading total |
| Blog + no CMS | Resolution required; accepted pair is consistent; Undo restores |
| Remove CMS while blog remains | No silent invalid configuration |
| Same requirement from two paths | One derived requirement, no double billing |
| Approved included gateway + second gateway | First covered by approved allowance, excess charged only if rate approved; otherwise review |
| Rapid add/remove during animation | Final business state equals ordinary HTML controls; no queued stale total |
| Tampered shared price / package / IDs | Ignore transmitted financial claims; reject unknown fields; recompute |
| New catalog after local restore | Explain changed recommendation; old version never used for new inquiry |
| WebGL crash / blocked storage / API timeout | Full conventional scope and contact flow remain usable |
| Server receives client-modified subtotal | Server authoritative recomputation; no reliance on client numbers |

Before public launch, require an approved fixture set covering representative commercial configurations. Current page-boundary fixtures validate only the known part of the catalog.

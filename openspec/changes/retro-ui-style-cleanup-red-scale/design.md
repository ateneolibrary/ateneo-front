## Context

The project currently combines CSS modules, global tokens, and screen-specific overrides with uneven component primitives. This creates styling drift and duplicated effort whenever a view is updated. The change introduces a single composition baseline using RetroUI/shadcn components and a normalized red scale to preserve the Ateneo visual language while reducing UI entropy.

Constraints:
- No product behavior changes are required; the change is focused on interface structure and styling consistency.
- Existing route structure and Spanish content must remain stable during migration.
- Migration should be incremental to avoid blocking feature work.

Stakeholders:
- Frontend contributors who need predictable component primitives and style rules.
- Product/design owners who need consistent visual outcomes across all screens.

## Goals / Non-Goals

**Goals:**
- Migrate all interface surfaces to RetroUI/shadcn primitives where equivalents exist.
- Remove or reduce legacy style overrides and standardize style ownership boundaries.
- Define and enforce a three-level red token scale with clear semantic usage.
- Establish rollout checkpoints and acceptance criteria that can be verified by screen audit.

**Non-Goals:**
- Rewriting domain logic, routing behavior, or data-fetching patterns.
- Introducing a new design system outside RetroUI/shadcn.
- Full visual redesign beyond standardization and token normalization.

## Decisions

1. Adopt RetroUI/shadcn as the canonical UI primitive layer.
   - Rationale: consolidates composition patterns and lowers maintenance overhead.
   - Alternative considered: keep mixed legacy + new primitives; rejected because inconsistency would persist.

2. Use token-first styling with strict global-vs-feature ownership.
   - Rationale: shared tokens belong in global styles; component/page specificity remains local via CSS modules.
   - Alternative considered: utility-first migration; rejected because current repository conventions are CSS module-centric.

3. Define semantic red scale tokens:
   - `--red-intense`: primary emphasis, critical highlights, strongest call-to-action accents.
   - `--red-mid`: interactive defaults, active states, supportive emphasis.
   - `--red-light`: soft surfaces, subtle backgrounds, low-priority highlights.
   - Rationale: separates color intensity from usage intent, reducing arbitrary color choices.
   - Alternative considered: a single accent red; rejected because it cannot cover strong and subtle states consistently.

4. Roll out incrementally by UI surface groups.
   - Rationale: allows gradual adoption with low regression risk.
   - Alternative considered: big-bang migration; rejected due to high review and rollback risk.

## Risks / Trade-offs

- [Risk] Visual regressions during partial migration when old and new primitives coexist. -> Mitigation: migrate by route group with explicit before/after audit checklist.
- [Risk] Token misuse (`red-intense` overuse causing visual noise). -> Mitigation: codify usage rules in spec acceptance criteria and review checklist.
- [Risk] Increased short-term refactor effort across many files. -> Mitigation: phased rollout with prioritized high-traffic screens first.
- [Trade-off] Strict component standardization may reduce one-off visual freedom. -> Mitigation: define approved extension points instead of ad-hoc overrides.

## Migration Plan

1. Baseline audit: inventory current screen primitives and style overrides.
2. Token setup: introduce red-scale tokens and map existing red usages.
3. Surface migration: replace legacy structures with RetroUI/shadcn components route by route.
4. Cleanup pass: remove obsolete CSS selectors and duplicated overrides.
5. Verification: run lint, manual visual checks, and acceptance checklist per capability.

Rollback strategy:
- Keep migration commits/slices scoped by surface so any problematic segment can be reverted independently without undoing the entire initiative.

## Open Questions

- Should any legacy custom components remain as wrappers around RetroUI/shadcn for product-specific semantics?
- Which route group is the first rollout candidate based on business usage and UI complexity?

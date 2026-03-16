## Why

The current UI mixes legacy CSS patterns with partial component conventions, which creates visual drift and slows feature delivery. We need a single, enforceable UI system now to reduce maintenance cost and make future product updates predictable.

## What Changes

- Migrate app screens to use RetroUI/shadcn components as the default UI primitives, replacing ad-hoc custom structures where equivalent primitives exist.
- Standardize style architecture by removing redundant page-level overrides, consolidating shared tokens, and defining clear ownership for global vs feature-level styles.
- Introduce a three-step red scale token system (`red-intense`, `red-mid`, `red-light`) with explicit usage guidance for emphasis, interactive states, and subtle surfaces.
- Define rollout and acceptance gates so migration can ship incrementally without blocking product work.

## Capabilities

### New Capabilities
- `retro-ui-component-migration`: Full interface migration contract to RetroUI/shadcn component primitives with compatibility and fallback rules.
- `style-standardization-cleanup`: Style cleanup and standardization rules for global tokens, CSS module boundaries, and legacy override removal.
- `red-scale-token-system`: Three-level red color scale with semantic roles and consistent UI usage constraints.

### Modified Capabilities

None.

## Impact

- Affected code: `app/**`, `components/**`, shared styling in `app/globals.css`, and feature-level CSS module files.
- Affected systems: design tokens, UI composition conventions, and component usage guidelines.
- Dependencies: RetroUI/shadcn component library already present in the UI stack; migration aligns existing patterns to one system instead of adding a new runtime dependency.

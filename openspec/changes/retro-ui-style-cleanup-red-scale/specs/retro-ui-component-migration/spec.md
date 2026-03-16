## ADDED Requirements

### Requirement: Complete RetroUI coverage across interface surfaces
The system SHALL render all user-facing interface surfaces with RetroUI/shadcn component primitives when an equivalent component exists.

#### Scenario: Equivalent primitive exists
- **WHEN** a screen currently uses a custom structure that maps to a RetroUI/shadcn primitive
- **THEN** the implementation uses the RetroUI/shadcn primitive as the default rendered component

#### Scenario: No equivalent primitive exists
- **WHEN** a required UI pattern has no direct RetroUI/shadcn equivalent
- **THEN** the implementation uses a minimal wrapper or local fallback that preserves API compatibility with future RetroUI/shadcn replacement

### Requirement: Migration preserves route behavior and content structure
The system SHALL keep existing route behavior, information architecture, and user-facing copy unchanged while replacing UI primitives.

#### Scenario: Route behavior verification
- **WHEN** a migrated route is reviewed
- **THEN** navigation outcomes, interactive flows, and displayed content order remain functionally equivalent to pre-migration behavior

### Requirement: Incremental migration slices are independently releasable
The system SHALL define migration slices by route or feature surface so each slice can be reviewed, released, or reverted independently.

#### Scenario: Slice rollback
- **WHEN** a regression is found in a migrated surface
- **THEN** that surface can be reverted without requiring rollback of unrelated migrated surfaces

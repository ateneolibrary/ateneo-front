## ADDED Requirements

### Requirement: Style ownership boundaries are explicit and enforced
The system SHALL define and maintain style ownership boundaries where global styles contain shared tokens and resets, and feature/page styles remain in local CSS modules.

#### Scenario: Shared style concern
- **WHEN** a style concern is reused across multiple screens
- **THEN** it is represented as a global token or shared convention instead of duplicated local overrides

#### Scenario: Feature-specific concern
- **WHEN** a style concern is unique to one feature or page
- **THEN** it remains in that feature or page CSS module and does not leak into global styles

### Requirement: Legacy override cleanup is measurable
The system SHALL remove obsolete selectors and redundant overrides introduced by pre-migration styling patterns.

#### Scenario: Cleanup verification
- **WHEN** a feature migration is completed
- **THEN** related obsolete selectors and duplicate declarations are removed as part of the same change slice

### Requirement: Migration includes verifiable acceptance checks
The system SHALL provide a repeatable acceptance checklist for each migrated surface covering component adoption, style consistency, and lint verification.

#### Scenario: Surface acceptance
- **WHEN** a migration slice is marked complete
- **THEN** the checklist confirms RetroUI/shadcn usage, standardized style boundaries, and successful lint execution

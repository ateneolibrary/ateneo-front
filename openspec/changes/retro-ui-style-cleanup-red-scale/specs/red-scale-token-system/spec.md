## ADDED Requirements

### Requirement: Three semantic red tokens are defined
The system SHALL define exactly three semantic red tokens for UI usage: `red-intense`, `red-mid`, and `red-light`.

#### Scenario: Token availability
- **WHEN** design tokens are loaded in the application
- **THEN** all three red tokens are available for use in component and page styles

### Requirement: Red token usage follows semantic purpose
The system SHALL enforce semantic usage where `red-intense` is used for strongest emphasis, `red-mid` for primary interactive and active states, and `red-light` for subtle surfaces and low-intensity highlighting.

#### Scenario: Intense emphasis usage
- **WHEN** a UI element requires highest visual urgency or dominant emphasis
- **THEN** it uses `red-intense` and not lower-intensity tokens

#### Scenario: Default interactive usage
- **WHEN** a UI element represents standard active or interactive emphasis
- **THEN** it uses `red-mid` as the default red state

#### Scenario: Subtle surface usage
- **WHEN** a UI surface requires low-intensity tinting or background emphasis
- **THEN** it uses `red-light` without replacing high-emphasis tokens

### Requirement: Token changes are backward-auditable during rollout
The system SHALL track and validate replacement of legacy red values with semantic tokens during migration slices.

#### Scenario: Legacy red replacement audit
- **WHEN** a migration slice is completed
- **THEN** replaced legacy red literals are mapped to one of the three semantic red tokens and documented in the slice checklist

# Requirement: create-club

## Goal
Allow a user to create a new reading club in free-tier MVP with only essential setup choices, keeping the flow fast and avoiding any automation or scheduling complexity.

## Route
/create-club

## UI Scope
- New components: Create Club page container and minimal `CreateClubForm` with grouped sections.
- Reused components: Follow interaction and visual patterns from `components/club-meetings/EventForm.tsx` (segmented options, conditional fields) and `components/club-meetings/CalendarDay.tsx` (clear state styles, keyboard-friendly interactions).
- States (empty/loading/error/populated):
  - Empty: first render with defaults and no validation errors.
  - Loading: submit button disabled with progress label while club is being created.
  - Error: inline validation for required fields and submit-level error message.
  - Populated: success state redirects to the new club dashboard.

## Interaction Notes
- User completes a single-page form and submits once.
- Required fields:
  - Club name.
  - Description.
  - Up to 5 reading categories.
  - Modality: `online` / `presencial` / `hibrido`.
  - Address is required only when modality is `presencial` or `hibrido`; not required for `online`.
  - Next-book selection strategy: `admin decides` / `most-voted from readlist` / `random from readlist`.
  - Club visibility: `public` / `private`.
  - Ratings visibility toggle.
  - Member quotes visibility toggle.
- Additional MVP fields (non-automation, low complexity):
  - Primary language (single-select).
  - Content warnings visibility toggle.
- Validate category count hard limit at 5.
- Do not include periodic meetings, recurring rules, reminders, or any automation-related controls.

## Visual Notes
- Keep a compact single-column form on mobile and comfortable centered form width on desktop.
- Use segmented controls/chips for modality, next-book strategy, and visibility options, aligned with `EventForm` interaction style.
- Use explicit visual states for selected/unselected/error, similar to the state clarity pattern used in `CalendarDay`.
- Preserve existing design tokens and spacing rhythm from current club-meetings UI language.
- Free-tier messaging must clearly state: club images are not available in MVP and are reserved for Pro.

## Acceptance Criteria
- [ ] Route renders correctly on desktop and mobile.
- [ ] Required states are implemented (empty/loading/error/populated).
- [ ] Core interactions and navigation work as specified.
- [ ] UI aligns with project visual language and token system.
- [ ] Create-club form includes only MVP/free-tier fields listed in this requirement.
- [ ] Address field is conditionally required only for `presencial` and `hibrido` modalities.
- [ ] Reading categories enforce a maximum of 5 entries.
- [ ] No periodic meetings or automation settings appear anywhere in the flow.
- [ ] Club image upload/selection is not available in free tier and shows Pro-only note.

## Out of Scope
- Any recurring or periodic meeting configuration.
- Automation workflows (reminders, auto-created events, cadence rules, background scheduling).
- Club image upload, gallery, or cover customization in free tier.
- Advanced moderation or analytics settings.

## Notes for Implementation
- Keep payload and schema intentionally small for MVP; avoid adding settings not listed above.
- Prefer simple client-side validation with clear server error fallback.
- Reuse existing UI primitives where possible to avoid net-new complex controls.
- Ensure modality/address conditional logic is mirrored in frontend validation and backend contract.

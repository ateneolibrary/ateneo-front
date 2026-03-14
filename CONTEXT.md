# Project Context

## Product Vision
Ateneo is a web product for managing book clubs in Spain. The current phase focuses on static frontend mockups with local/mock data to define structure, interaction, and visual language before backend integration.

## Current Scope
- Frontend-only implementation (no production backend flows yet).
- High-fidelity route-level mockups and reusable UI pieces.
- Consistent UX patterns for club management: discover clubs, manage club spaces, and navigate personal profile areas.

## Implemented Routes
- Landing: `app/page.tsx` (`/`)
- Login: `app/login/page.tsx` (`/login`)
- Create account: `app/create-account/page.tsx` (`/create-account`)
- My clubs list: `app/my-clubs/page.tsx` (`/my-clubs`)
- Club dashboard: `app/my-clubs/[id]/dashboard/page.tsx` (`/my-clubs/[id]/dashboard`)
- Club members: `app/my-clubs/[id]/members/page.tsx` (`/my-clubs/[id]/members`)
- Club library: `app/my-clubs/[id]/library/page.tsx` (`/my-clubs/[id]/library`)
- Book detail inside club: `app/my-clubs/[id]/[bookId]/page.tsx` (`/my-clubs/[id]/[bookId]`)
- Club meetings: `app/my-clubs/[id]/meetings/page.tsx` (`/my-clubs/[id]/meetings`)
- User profile: `app/profile/[userId]/page.tsx` (`/profile/[userId]`)

## Pending Routes
- Explore clubs: `app/explore/page.tsx` (`/explore`)
- Register (if kept as a separate route from `/create-account`): `app/register/page.tsx` (`/register`)
- Create club: `app/create-club/page.tsx` (`/create-club`)
- Club settings: `app/my-clubs/[id]/settings/page.tsx` (`/my-clubs/[id]/settings`)

## Tech Stack
- Next.js 16.1.6
- React 19.2.3
- TypeScript
- Tailwind CSS

## UI System (Bauhaus-inspired)
Design direction: minimal, geometric, high contrast, editorial spacing.

Color tokens (canonical):
- bg: #F2F0EA
- paper: #FAF8F3
- ink: #111111
- muted: #4E4E4E
- accent: #C1121F
- line: #111111

## UX and Navigation Flow
- Default entry is the landing page (`/`).
- Main navigation leads to My Clubs, Explore, and authentication routes.
- Unauthenticated users can access Login and Create Account.
- Authenticated users can access profile and club workspaces.
- Club workspace flow centers on dashboard, members, library, meetings, and book detail.

## Frontend Architecture Rules
- Keep route naming aligned with existing project paths unless a typo is explicit and confirmed.
- Typo normalization applied: use `dashboard` (not `dasboard`).
- For any UI change in `app/` or `components/`, load and follow the `frontend-design` skill.
- For reusable React components, load and follow the `ateneo-react-components` skill.
- Build pages from composable, reusable components; avoid page-specific duplication when a shared component is viable.

## Requirement File Contract (`requirements/x-requirement.md` template)
```md
# Requirement: <short-name>

## Goal
<What user-facing outcome must be delivered>

## Route
<Target route path, e.g. /my-clubs/[id]/settings>

## UI Scope
- New components: <list>
- Reused components: <list>
- States: <empty/loading/error/populated>

## Interaction Notes
- <navigation and key user actions>

## Visual Notes
- <layout, hierarchy, animation constraints>

## Acceptance Criteria
- [ ] Route renders correctly on desktop and mobile
- [ ] Matches Bauhaus-inspired token system
- [ ] Covers required states and interactions
```

## Definition of Done (UI task checklist)
- [ ] Requirement file exists and is complete under `requirements/`.
- [ ] Route/page is implemented with responsive behavior (desktop + mobile).
- [ ] UI uses the canonical color tokens and project visual language.
- [ ] Components are reusable where appropriate and follow project conventions.
- [ ] Navigation flow and main interactions are implemented and testable manually.
- [ ] No obvious typos in route names, labels, or headings.

## Working Agreement
- Work starts from a requirement file (`requirements/x-requirement.md`).
- UI is implemented based on existing project patterns and this context.
- Prefer reusable components and coherent interaction patterns over one-off implementations.
- Keep scope frontend-only unless backend integration is explicitly requested.

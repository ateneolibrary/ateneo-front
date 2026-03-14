# Testing Strategy

This repo does not have test tooling wired yet. The goal of this document is to separate what is true today from what should be added next, so nobody pretends coverage exists when it does not.

## Current State In This Repo

As of today:

- Package manager: `npm`
- App stack: Next.js 16 App Router, React 19, TypeScript 5, ESLint 9
- Styling pattern in practice: CSS Modules plus `app/globals.css`
- Existing scripts in `package.json`:
  - `npm run dev`
  - `npm run build`
  - `npm run start`
  - `npm run lint`
- Test scripts: none
- Test frameworks configured: none
- Test config files present: none for Vitest, Jest, Playwright, or Cypress
- Test files present: none matching common `*.test.*` or `*.spec.*` patterns
- CI workflow for tests: none found
- Single-test execution currently possible: no, because there is no test runner configured

Evidence checked:

- `package.json`
- `tsconfig.json`
- `eslint.config.mjs`
- `next.config.ts`
- `.github/workflows/opencode.yml`
- representative route files under `app/`
- representative form components under `components/`
- mock data helpers in `components/mock-app/data.ts`

Important detail: `package-lock.json` contains an optional peer mention of `@playwright/test` through Next.js internals, but that is NOT an installed test setup for this repo and does not enable tests by itself.

## What The App Structure Means For Testing

This project is a frontend-heavy Next.js app with three clear testing surfaces:

1. Pure mock-data helpers and lookups in `components/mock-app/data.ts`
2. Client components with local state and form validation, such as:
   - `components/create-club/CreateClubForm.tsx`
   - `components/club-meetings/EventForm.tsx`
3. Thin App Router pages that compose mock data plus feature components, such as:
   - `app/create-club/page.tsx`
   - `app/profile/[userId]/page.tsx`
   - `app/my-clubs/[id]/dashboard/page.tsx`

Because many screens are client-side and depend on mock data instead of APIs, the highest ROI is unit and component testing first, then a small number of route-level and end-to-end flows.

## Recommended Testing Stack

Do not add this blindly in the same PR as feature work. Add it intentionally as a testing-infrastructure PR.

### 1. Unit + Component Tests

Recommended stack:

- `vitest`
- `jsdom`
- `@testing-library/react`
- `@testing-library/jest-dom`
- `@testing-library/user-event`
- `vite-tsconfig-paths`
- `@vitest/coverage-v8`

Why this stack fits this repo:

- Vitest is fast and simple for TypeScript + React component tests
- Testing Library matches the repo's UI behavior focus better than implementation-detail testing
- `jsdom` is enough for current client forms and interaction-heavy components
- `vite-tsconfig-paths` keeps the `@/*` alias working in tests

### 2. End-To-End Tests

Recommended stack:

- `@playwright/test`

Why Playwright fits here:

- It covers real App Router navigation and browser behavior
- It is the right place to verify happy paths like creating a club, browsing a profile, or opening a club dashboard
- It should stay small and focused; do not use E2E to replace component tests

### 3. Optional, Only When Real Network Calls Appear

- `msw`

Right now most data is local mock data, so MSW is optional. Add it when components start depending on fetch calls or route handlers that need request-level mocking.

## Recommended Setup Commands

These commands are for the future setup PR. They do NOT reflect the current repo state.

Install unit/component test tooling:

```bash
npm install -D vitest jsdom @vitest/coverage-v8 @testing-library/react @testing-library/jest-dom @testing-library/user-event vite-tsconfig-paths
```

Install E2E tooling:

```bash
npm install -D @playwright/test
npx playwright install
```

Recommended `package.json` scripts to add once configured:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:e2e:headed": "playwright test --headed"
  }
}
```

Once configured, single-test execution should work like this:

```bash
npm run test -- components/mock-app/data.test.ts
npm run test -- components/create-club/CreateClubForm.test.tsx
npm run test:e2e -- tests/e2e/create-club.spec.ts
```

## TDD Workflow For This Repo

Do TDD where the behavior is stable enough to specify. That applies especially to mock-data helpers, validation rules, and interaction-heavy forms.

### Red

Write a failing test first for one real behavior.

Good examples in this repo:

- `getBookById` should match a book by route-safe title or by id
- `getBookRouteId` should normalize route ids consistently
- `CreateClubForm` should block submit when required fields are empty
- `CreateClubForm` should require address for `presencial` and `hibrido`
- `EventForm` should build the correct `location` string for each modality
- `ProfilePage` should call `notFound()` when the user does not exist

### Green

Write the minimum code needed to make the test pass.

In this repo that means:

- keep route pages thin
- push conditional logic into small helpers when possible
- test UI through labels, roles, and visible text instead of CSS classes
- avoid over-mocking local state behavior that can be tested directly through rendered output

### Refactor

Clean the code without changing behavior.

Typical refactors that are worth it here:

- extracting validation logic from large forms into testable helpers
- extracting repeated lookup or normalization logic from `components/mock-app/data.ts`
- reducing page-level branching by moving presentation concerns into feature components

### TDD Rule Of Thumb

If a change is mostly layout or styling, do not force fake TDD theater. Cover the risky behavior, not every CSS detail. For this repo, TDD pays off most on:

- data lookup rules
- routing decisions
- validation and submit flows
- conditional rendering driven by state or mock data

## Testing Pyramid For This Frontend App

Use this balance:

- Most tests: unit and component tests
- Some tests: route-level integration tests
- Few tests: browser E2E flows

Practical split for this repo:

- 60-70% unit/helper/component tests
- 20-30% route/integration tests
- 10% or less E2E

Why:

- the app has a lot of local state and mock data, so cheap component tests catch most regressions
- route files are mostly composition layers, so they need a few targeted tests, not huge suites
- E2E is valuable for confidence, but expensive to maintain if abused

## Test File Naming And Location Conventions

Stay close to the code. Do not dump everything into one giant `tests/` folder except browser E2E.

### Unit And Component Tests

Use co-located files next to the source file:

- `components/create-club/CreateClubForm.test.tsx`
- `components/club-meetings/EventForm.test.tsx`
- `components/mock-app/data.test.ts`
- `app/profile/[userId]/page.test.tsx`

Conventions:

- `*.test.ts` for helpers and data modules
- `*.test.tsx` for React components and route pages
- one source file, one adjacent test file when practical
- if a folder grows large, a local `__tests__/` folder is acceptable, but co-location is preferred first

### E2E Tests

Keep browser flows in a dedicated folder:

- `tests/e2e/create-club.spec.ts`
- `tests/e2e/profile.spec.ts`
- `tests/e2e/club-dashboard.spec.ts`

Use `*.spec.ts` for Playwright so unit/component tests and E2E tests stay visually distinct.

## What To Test In This Repo

### App Routes In `app/`

Test route behavior, not framework internals.

Focus on:

- `generateStaticParams()` returns ids from mock data
- missing records trigger `notFound()`
- route pages pass the right props into feature components
- route params map correctly to mock helpers

Examples:

- `app/profile/[userId]/page.tsx`: valid user builds `userClubs`; invalid user hits `notFound()`
- `app/my-clubs/[id]/dashboard/page.tsx`: wishlist is sorted by votes and limited before rendering
- `app/create-club/page.tsx`: renders the form shell without extra route logic

### Components In `components/`

Test user-visible behavior and contract boundaries.

Focus on:

- rendered labels, headings, and controls
- state transitions after clicks or typing
- callbacks invoked with the right payload
- conditional sections appearing or disappearing
- disabled and loading states

Examples:

- `components/create-club/CreateClubForm.tsx`
  - shows validation errors on submit
  - enforces max 5 categories
  - clears address when switching back to `online`
  - submits and navigates to `/my-clubs/new-club/dashboard`
- `components/club-meetings/EventForm.tsx`
  - does not submit when title/date are missing
  - builds online, presencial, and ambos locations correctly
  - calls `onCreate` with a valid `ClubMeeting`

### Mock Data Helpers In `components/mock-app/`

This is the easiest place to start TDD because the logic is deterministic.

Focus on:

- `getUserById`
- `getClubById`
- `getBookRouteId`
- `getBookById`

Examples:

- returns `undefined` for unknown ids
- finds a book by stored id
- finds a book by normalized title route segment
- handles encoded route params safely

### Forms

Forms deserve serious coverage because they contain the most regression-prone behavior in this repo.

Focus on:

- required field validation
- conditional validation based on modality or other selections
- error summary behavior
- submit locking and disabled state
- recovery after fixing invalid fields

Do not waste time asserting CSS module class names unless the class controls meaningful accessibility or behavior.

## Verification And CI Guidance

Current reality:

- `npm run lint` exists today
- there is no `typecheck` script today
- do not claim there is a supported single-test command until the tooling is actually added
- do not run `npm run build` as part of normal verification unless explicitly requested

Recommended verification flow after test tooling exists:

```bash
npm run lint
npm run test
npm run test:e2e
```

For feature PRs, the normal expectation should be:

1. lint passes
2. relevant unit/component tests pass
3. E2E runs only for flows touched by the change or in CI on protected branches

Recommended CI shape once tests exist:

- job 1: `npm ci`
- job 2: `npm run lint`
- job 3: `npm run test`
- job 4: `npx playwright install --with-deps` then `npm run test:e2e`

If CI time becomes a problem, keep Playwright limited to a smoke suite and leave deeper behavior to Vitest.

## Suggested First Wave Of Tests

When this repo adopts testing, start here in order:

1. `components/mock-app/data.test.ts`
2. `components/create-club/CreateClubForm.test.tsx`
3. `components/club-meetings/EventForm.test.tsx`
4. `app/profile/[userId]/page.test.tsx`
5. `app/my-clubs/[id]/dashboard/page.test.tsx`
6. `tests/e2e/create-club.spec.ts`

That sequence gives fast coverage over the highest-value logic without dragging the team into an overengineered setup.

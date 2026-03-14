# Ateneo Agent Guide

## Project Snapshot
- Stack: Next.js 16 App Router, React 19, TypeScript 5, ESLint 9, Tailwind 4 tooling.
- Package manager: `npm` is the source of truth here because the repo root has `package-lock.json`.
- Styling in practice: the app currently uses CSS Modules plus `app/globals.css`; Tailwind is installed but not the active authoring pattern.
- Main directories:
  - `app/` route segments, layouts, and page-level CSS modules.
  - `components/` reusable UI, feature boards, mock data, and barrel exports.
  - `public/` images and static assets.
  - `requirements/` product/context docs.

## Skills To Load
- For UI work in `app/` or `components/`, load both:
  - `ateneo-react-components`
  - `frontend-design`
- Keep the current Ateneo visual language: editorial/Bauhaus-inspired, strong geometry, red/ink/paper palette.

## Commands
- Install deps: `npm install`
- Start dev server: `npm run dev`
- Lint: `npm run lint`
- Production build exists: `npm run build`
- Start production server after a build: `npm run start`

## Tests
- There is currently no test script in `package.json`.
- No Jest, Vitest, Playwright, Cypress, or test file pattern was found in the repo.
- There is no supported single-test command today because there is no test infrastructure configured.
- Do not invent test commands in code, docs, or PR notes.

## Lint And Verification Expectations
- Run `npm run lint` after code changes when practical.
- Do not run a build unless the user explicitly asks for it.
- Since there is no `typecheck` script, do not claim one exists. Type checking happens through Next.js/TS tooling and editor feedback.

## External Agent Rules
- Cursor rules: none found in `.cursor/rules/`.
- `.cursorrules`: not present.
- Copilot instructions: `.github/copilot-instructions.md` is not present.
- If future rule files are added, merge them into this guide instead of contradicting them.

## Architecture And File Layout
- Follow App Router conventions: each route lives under `app/**/page.tsx`; the root shell lives in `app/layout.tsx`.
- Keep reusable UI in `components/<feature>/`.
- Prefer folder-local barrel files like `components/create-club/index.ts` for feature exports.
- Co-locate styles with the feature they serve:
  - page styles in `app/**/page.module.css`
  - component styles in `components/**/<Feature>.module.css` or shared folder module files
- Keep mock domain data and helpers inside `components/mock-app/`; many screens depend on that fake data layer.

## Repository-Specific Conventions
- Use the path alias `@/*` for cross-project imports.
- Prefer CSS Modules over Tailwind utility classes in this repo unless the user asks for a different direction.
- Reuse the global design tokens from `app/globals.css`:
  - `--bg`
  - `--paper`
  - `--ink`
  - `--muted`
  - `--accent`
  - `--line`
- Route pages are usually thin wrappers that compose feature components.
- Many interactive features are fully client-side and backed by mock data rather than API calls.
- Preserve Spanish product copy and existing IA labels unless the task explicitly changes content strategy.

## Imports
- Keep imports grouped in this order:
  1. framework/external packages
  2. aliased project imports from `@/`
  3. local relative imports
- Use `import type` for type-only imports.
- Prefer barrel imports for feature folders when a local `index.ts` already exists.
- Use relative imports for same-folder files such as CSS modules and local helper components.

## Formatting
- Match the existing code style already used across the repo:
  - double quotes
  - semicolons
  - trailing commas where multiline formatting adds them
  - concise arrow functions unless extra structure is needed
- There is no Prettier or Biome config in the repo, so preserve surrounding formatting instead of imposing a new style.
- Keep files ASCII unless the file already uses accented Spanish text or another existing Unicode character.

## TypeScript And Types
- `tsconfig.json` is strict; write code that passes `strict` mode.
- Do not introduce `any` unless there is no safe alternative and the user accepts the tradeoff.
- Define explicit prop types for every exported component.
- Keep feature-local types close to the component when they are not shared.
- Extract shared mock/domain types into dedicated files like `components/mock-app/types.ts`.
- Use union types for constrained UI states when the valid values are known.
- Type route metadata/config imports with `import type`, e.g. `Metadata`, `NextConfig`.

## Naming
- Components: PascalCase file names and component names, e.g. `CreateClubForm.tsx`.
- Route folders: lowercase or dynamic segment names that follow Next.js routing.
- Props/types: PascalCase with `Props` suffix for component props.
- Event handlers: `handleX`.
- State setters: `setX`.
- Booleans: `isX`, `hasX`, `needsX`, `shouldX`.
- Constants: `UPPER_SNAKE_CASE` for module-level constants.
- Barrel files: `index.ts` only; avoid logic there.

## React And Component Organization
- Default to Server Components in `app/`; add `"use client"` only when hooks, browser APIs, or client-side interactivity are required.
- Keep page components small; push heavy UI into feature components under `components/`.
- For large stateful screens, keep helper functions and tiny private subcomponents in the same file only while they remain feature-local.
- If a component becomes reusable across routes, move it into a named feature folder with its CSS module and barrel export.
- Prefer semantic elements first: `main`, `section`, `article`, `aside`, `nav`, `button`, `label`.
- Prefer `next/link` and `next/image` when the UI is rendering navigation or image assets.

## Error Handling And Control Flow
- Validate user input before async actions; the forms in this repo usually compute a local `errors` object first.
- Surface recoverable UI failures through local state such as `submitError` rather than throwing into the render tree.
- In App Router pages, use framework helpers like `notFound()` for missing mock records.
- Omit the caught error variable in `catch` blocks when it is unused.
- Guard early and return early for invalid state instead of nesting deeply.

## Data And Mocking
- Treat `components/mock-app/data.ts` and `components/mock-app/types.ts` as the current mock domain source.
- Extend existing helpers such as `getUserById`, `getClubById`, and `getBookById` before creating parallel lookup utilities.
- Keep fake data additions shape-consistent with existing records.

## Styling Guidance
- Prefer CSS Modules for component styling and `globals.css` for app-wide tokens/resets.
- Reuse the established aesthetic: strong contrast, paper backgrounds, black borders, restrained accent red.
- Build mobile-first and scale up.
- Avoid generic dashboards or random Tailwind utility dumps that break the current visual language.
- When creating or refactoring UI, follow the loaded skills instead of inventing a separate design system.

## What An Agent Should Check Before Editing
- Does the target need to be a Server Component or a Client Component?
- Is there already a barrel export for this feature folder?
- Should the change reuse mock-app data/types instead of creating new shapes?
- Is there an existing CSS module for the feature that should be extended?
- Will the change preserve the current Spanish copy, route structure, and design tokens?

## Safe Defaults For Agentic Work
- Use `npm` commands in instructions and automation.
- Prefer minimal, localized edits over repo-wide rewrites.
- Do not add new dependencies for small UI tweaks.
- Do not claim test coverage exists when it does not.
- If you add tests in the future, update this file with the exact command for running the whole suite and one test file.

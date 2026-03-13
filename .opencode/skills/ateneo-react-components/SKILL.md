---
name: ateneo-react-components
description: >
  Defines the standard for building reusable React UI components in Ateneo using
  Next.js, TypeScript, Tailwind, and Bauhaus-inspired styling.
  Trigger: When creating or refactoring React components for app/, components/,
  or shared UI patterns in this project.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Creating new UI components in `components/` or page-level sections in `app/`
- Refactoring duplicated JSX into reusable component primitives
- Defining component APIs (props, variants, states, accessibility behavior)
- Implementing animated interactions for cards, lists, and page sections

## Critical Patterns

- Type all props explicitly with TypeScript interfaces and keep public APIs small
- Prefer presentational components with data passed from parent containers
- Use semantic HTML first (`button`, `nav`, `section`, `label`) before div wrappers
- Keep styling aligned with project tokens and Bauhaus direction:
  - `bg` `#F2F0EA`
  - `paper` `#FAF8F3`
  - `ink` `#111111`
  - `muted` `#4e4e4e`
  - `accent` `#c1121f`
  - `line` `#111111`
- Build components mobile-first, then scale to desktop breakpoints
- Add meaningful animation only when it supports hierarchy or feedback (no noise)

### Component Decision Table

| Need | Approach |
|------|----------|
| Shared visual building block (button, card, badge) | Create a reusable component in `components/` |
| Page-only section with local behavior | Keep in route folder under `app/...` |
| Multiple visual styles of same component | Use typed `variant` prop + class mapping |
| Complex stateful feature | Split into container + presentational children |
| Repeated animations across views | Extract reusable motion wrapper/component |

## Code Examples

```tsx
type ClubCardProps = {
  name: string
  city: string
  members: number
  onOpen: () => void
  variant?: "default" | "featured"
}

const cardVariants: Record<NonNullable<ClubCardProps["variant"]>, string> = {
  default: "bg-[#FAF8F3] border-[#111111]",
  featured: "bg-[#c1121f] text-[#FAF8F3] border-[#111111]",
}

export function ClubCard({
  name,
  city,
  members,
  onOpen,
  variant = "default",
}: ClubCardProps) {
  return (
    <article className={`rounded-none border-2 p-4 ${cardVariants[variant]}`}>
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-[#4e4e4e]">{city}</p>
      <p className="mt-2 text-sm">{members} members</p>
      <button type="button" onClick={onOpen} className="mt-4 border-2 px-3 py-2">
        View club
      </button>
    </article>
  )
}
```

```tsx
type SectionProps = {
  title: string
  children: React.ReactNode
}

export function Section({ title, children }: SectionProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <div>{children}</div>
    </section>
  )
}
```

## Commands

```bash
npm run lint
npm run typecheck
```

## Resources

- **Templates**: See [assets/](assets/) for component scaffolding templates
- **Documentation**: See [references/](references/) for project-local UI context

## Baseline Audit (Route/Feature Level)

### Primitive classification snapshot

| Surface | Current primitive baseline | Classification |
|---|---|---|
| `/` landing + inline auth rail | shadcn (`Card`, `Button`, `Input`, `Label`, `Carousel`) | RetroUI/shadcn |
| `/login`, `/create-account` | shadcn (`Card`, `Button`, `Input`, `Alert`, `Calendar`, `Popover`, `Tooltip`) | RetroUI/shadcn |
| `/my-clubs` | Migrated in this change to shadcn card/button baseline | RetroUI/shadcn |
| `/explore` | `ExploreBoard` migrado a baseline shadcn (`Card`, `Button`, `Input`) + wrappers minimos (`ToggleRow`, tags/iconos de seccion) | RetroUI/shadcn + approved wrappers |
| `/create-club` | `CreateClubForm` migrado a baseline shadcn (`Button`, `Input`, `Label`) + wrappers minimos (`SegmentedControl`, `ToggleRow`) | RetroUI/shadcn + approved wrappers |
| `/my-clubs/[id]/dashboard` and sibling dashboard routes | dashboard/members/meetings/library/book-detail migrated to shadcn + wrappers minimos para patrones sin paridad directa | mixed (advanced migration) |
| `/my-clubs/[id]/meetings` | shadcn (`Card`, `Button`, `Input`) + wrappers minimos de calendario/panel | RetroUI/shadcn + approved wrappers |
| `/profile/[userId]` | `ProfileBoard`/`BookPickerModal` migrados a baseline shadcn (`Button`, `Input`) + wrappers minimos (flip cards y picker) | RetroUI/shadcn + approved wrappers |
| `/my-clubs/[id]/library` and `/my-clubs/[id]/[bookId]` | shadcn (`Card`, `Button`) + wrappers minimos (`ModernBookCover`, filtros de miembros) | RetroUI/shadcn + approved wrappers |

### Prioritized migration slices

1. **Slice A (done):** auth + home surfaces (`/`, `/login`, `/create-account`) and `/my-clubs` entry screen.
2. **Slice B (in progress):** dashboard route family (`/my-clubs/[id]/**`) because it concentrates daily member activity.
3. **Slice C (done):** `explore` + `create-club` flows.
4. **Slice D (done for functional remaining):** `/profile/[userId]` migrado; quedan solo verificaciones finales de cierre global.

## Red Token Mapping Rules

### Canonical semantic tokens

- `--red-intense`: strongest emphasis (hero labels, dominant accents, urgent visual callouts).
- `--red-mid`: default interactive red (primary actions and active states).
- `--red-light`: subtle red surfaces (chips, soft backgrounds, gentle emphasis blocks).

### Backward-compatible mapping policy

- `--primary` -> `--red-mid`
- `--primary-hover` -> `--red-intense`
- `--active` -> `--red-mid`
- `--secondary` -> `--red-light`
- `--accent` -> `--red-light`

### Representative validation in migrated surfaces

- **Strong emphasis (`red-intense`)**: `/my-clubs` section kicker (`bg-[var(--color-red-intense)]`).
- **Default interactive (`red-mid`)**: primary CTA buttons via `bg-primary`.
- **Subtle surface (`red-light`)**: mode chip wrapper `ClubModeBadge` in `/my-clubs`.

## Slice Acceptance Checklist (Slice A)

- [x] Equivalent custom structures replaced with RetroUI/shadcn primitives in first prioritized slice.
- [x] Obsolete local style file removed for migrated route (`app/my-clubs/page.module.css`).
- [x] Red token mapping applied and documented for migrated surfaces.
- [x] Route structure and Spanish copy preserved.
- [x] Lint run after slice migration.

## Slice Acceptance Checklist (Slice B.1/B.2 - dashboard family core routes)

- [x] Equivalent custom structures replaced with RetroUI/shadcn primitives in `/my-clubs/[id]/dashboard` and `/my-clubs/[id]/members`.
- [x] Equivalent custom structures replaced with RetroUI/shadcn primitives in `/my-clubs/[id]/meetings`, `/my-clubs/[id]/library` y `/my-clubs/[id]/[bookId]`.
- [x] Shared shell (`DashboardViewport`, `DashboardSidebar`, `DashboardSearchBar`) aligned to RetroUI/shadcn baseline.
- [x] Legacy route-level CSS modules removed in migrated B.2 surfaces (`ClubMeetings.module.css`, `BookDetail.module.css`, `MemberPicker.module.css`).
- [x] Route structure and Spanish copy preserved.
- [x] Lint run after slice migration (sin errores; warnings legacy fuera de este slice).
- [x] Manual visual before/after complete on desktop and mobile.
- [ ] Legacy style selectors removed para TODO el proyecto (aun hay features fuera de Slice B sin migrar).

## Slice B.1/B.2 Notes

- Migrated files: `app/my-clubs/[id]/dashboard/page.tsx`, `components/club-dashboard/{DashboardViewport,DashboardSidebar,DashboardSearchBar,StatsPanel,ReadHistoryItem,WishBookVoteItem,MembersBoard}.tsx`.
- Migrated files (B.2): `components/club-meetings/{MeetingsBoard,MonthCalendar,CalendarDay,EventPanel,EventForm,EventDetail}.tsx`, `components/club-library/ClubLibraryBoard.tsx`, `components/book-detail/{BookHeaderPanel,ClubRatingPanel,CommunityQuotesSection,MemberPicker}.tsx`.
- Removed legacy files (B.2): `components/club-meetings/ClubMeetings.module.css`, `components/book-detail/BookDetail.module.css`, `components/book-detail/MemberPicker.module.css`.
- Remaining global scope after Slice C/D batch: validacion visual manual cross-slice y confirmacion final de literales rojos legacy.

## Slice C/D Acceptance Checklist (explore + create-club + profile)

- [x] Equivalent custom structures replaced with RetroUI/shadcn primitives en `/explore`, `/create-club` y `/profile/[userId]`.
- [x] Wrappers minimos aplicados solo en patrones sin paridad directa (`ToggleRow`, `SegmentedControl`, flip-card profile).
- [x] Legacy style file removido donde fue seguro en este batch (`app/explore/page.module.css`).
- [x] Route structure and Spanish copy preserved.
- [x] Lint run after slice migration (sin errores; warnings legacy preexistentes fuera de este batch).
- [x] Manual visual before/after complete on desktop and mobile.

## Visual Review Snapshot (2026-03-16, rerun de cierre)

- Evidencia capturada con Playwright CLI en `openspec/changes/retro-ui-style-cleanup-red-scale/visual-review/2026-03-16/` (desktop + mobile para 12 rutas objetivo, baseline + rerun `*-r2.png` y `*-r2-verified.png`).
- Criterios evaluados: consistencia RetroUI (esquinas rectas, bordes negros, sombras duras), tipografia y paleta roja semantica, preservacion de copy en espanol, roturas visibles de layout.
- Validacion extra para blockers previos: selectores esperados renderizados en runtime (`members`, `library`, `profile`) y verificacion de ancho mobile fijo de `390px` en capturas `club-dashboard-mobile-r2-verified.png`, `club-meetings-mobile-r2-verified.png`, `club-book-detail-mobile-r2-verified.png`.

| Route | Desktop | Mobile | Resultado |
|---|---|---|---|
| `/` | OK | OK | Sin blockers; baseline RetroUI consistente. |
| `/login` | OK | OK | Sin blockers; jerarquia y componentes consistentes. |
| `/create-account` | OK | OK | Sin blockers; sin roturas visibles. |
| `/my-clubs` | OK | OK | Sin blockers; cards y CTA consistentes. |
| `/my-clubs/[id]/dashboard` | OK | OK | Blocker cerrado: shell mobile colapsa correctamente y sin overflow (ver `club-dashboard-desktop-r2.png`, `club-dashboard-mobile-r2-verified.png`). |
| `/my-clubs/[id]/members` | OK | OK | Blocker cerrado: runtime `next/image` resuelto para `i.pravatar.cc` (ver `club-members-desktop-r2.png`, `club-members-mobile-r2-verified.png`). |
| `/my-clubs/[id]/meetings` | OK | OK | Blocker cerrado: panel y grilla responden en mobile sin desborde horizontal (ver `club-meetings-desktop-r2.png`, `club-meetings-mobile-r2-verified.png`). |
| `/my-clubs/[id]/library` | OK | OK | Blocker cerrado: runtime `next/image` resuelto para `i.pravatar.cc` (ver `club-library-desktop-r2.png`, `club-library-mobile-r2-verified.png`). |
| `/my-clubs/[id]/[bookId]` | OK | OK | Blocker cerrado: layout mobile estable, sin overflow horizontal (ver `club-book-detail-desktop-r2.png`, `club-book-detail-mobile-r2-verified.png`). |
| `/explore` | OK | OK | Sin blockers; layout funcional en ambos breakpoints. |
| `/create-club` | OK | OK | Sin blockers; se observa contraste bajo en textos secundarios (bajo). |
| `/profile/[userId]` | OK | OK | Blocker cerrado: runtime `next/image` resuelto para `i.pravatar.cc` (ver `profile-desktop-r2.png`, `profile-mobile-r2-verified.png`). |

- Conclusion: rerun de cierre sin blockers altos en rutas auditadas; 5.2 queda **done** y habilita cierre global de migracion (5.4).

## Rollback Notes

- Slice-scoped rollback path: revert only `app/my-clubs/page.tsx` + `app/globals.css` + `app/page.tsx` + this checklist + task checkboxes.
- No business logic or route rewiring was changed, so reverting this slice does not affect data flows.

### Slice B.1 rollback path

- Revert `app/my-clubs/[id]/dashboard/page.tsx` and the updated `components/club-dashboard/*.tsx` files listed above.

### Slice B.2 rollback path

- Revert `components/club-meetings/*.tsx`, `components/club-library/ClubLibraryBoard.tsx`, `components/book-detail/*.tsx` and restore the three CSS modules removidos en este batch.
- Mantener intacto Slice B.1 para no mezclar rollback de shell/dashboard con rutas secundarias.

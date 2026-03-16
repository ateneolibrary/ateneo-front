## 1. Baseline And Planning

- [x] 1.1 Audit all `app/**` and `components/**` UI surfaces to classify current primitives as RetroUI/shadcn, custom-equivalent, or custom-no-equivalent.
- [x] 1.2 Define migration slices by route/feature and prioritize high-traffic surfaces for first rollout.
- [x] 1.3 Create a per-slice acceptance checklist covering component migration, style cleanup, red token mapping, and lint verification.

## 2. Red Scale Token System

- [x] 2.1 Add `red-intense`, `red-mid`, and `red-light` design tokens in global style variables with semantic descriptions.
- [x] 2.2 Map existing red literals/usages to the new three-token system and document replacement rules.
- [x] 2.3 Validate token usage policy in representative components (strong emphasis, default interactive, subtle surface).

## 3. RetroUI/Shadcn Component Migration

- [x] 3.1 Replace equivalent custom UI structures with RetroUI/shadcn primitives in the first prioritized migration slice.
- [x] 3.2 Implement minimal wrappers for patterns without direct primitive parity, preserving future replacement compatibility.
- [x] 3.3 Repeat migration slice-by-slice until all user-facing surfaces use RetroUI/shadcn primitives or approved wrappers.
  - Avance 2026-03-16 (Slice B.1): migrados `/my-clubs/[id]/dashboard` y `/my-clubs/[id]/members` a baseline shadcn/RetroUI (`Card`, `Button`, `Input`) y shell compartido (`DashboardViewport`, `DashboardSidebar`, `DashboardSearchBar`).
  - Avance 2026-03-16 (Slice B.2): migradas `/my-clubs/[id]/meetings`, `/my-clubs/[id]/library` y `/my-clubs/[id]/[bookId]` a baseline RetroUI/shadcn con wrappers minimos para calendario mensual, podio 3D (`ModernBookCover`) y filtros de miembros.
  - Avance 2026-03-16 (Slice C/D): migradas `/explore`, `/create-club` y `/profile/[userId]` a baseline con primitivas `Card`/`Button`/`Input`/`Label` y wrappers minimos donde no hubo paridad directa (`ToggleRow`, `SegmentedControl`, flip cards de perfil).

## 4. Style Cleanup And Standardization

- [x] 4.1 Remove obsolete selectors and redundant overrides for each migrated slice in the same change unit.
- [x] 4.2 Enforce ownership boundaries: shared tokens/reset in global styles, feature-specific rules in local CSS modules.
- [x] 4.3 Review migrated slices for regressions caused by mixed legacy/new styles and apply targeted corrections.
  - Avance 2026-03-16: correcciones aplicadas en Slice B.1 para homogeneizar cards/botones/bordes y evitar estilos legacy en dashboard/members; se mantiene CSS legacy aislado para componentes aun no migrados.
  - Avance 2026-03-16 (Slice B.2): eliminados modulos legacy `ClubMeetings.module.css`, `BookDetail.module.css` y `MemberPicker.module.css`; componentes de meetings/library/book detail ya no dependen de selectores legacy compartidos.
  - Avance 2026-03-16 (Slice C/D): unificados controles interactivos de `/explore`, `/create-club` y `/profile/[userId]` sobre baseline shadcn y eliminado style wrapper obsoleto de `app/explore/page.module.css`.

## 5. Risk Control, Verification, And Rollout

- [x] 5.1 Run `npm run lint` after each completed migration slice and resolve reported issues.
- [x] 5.2 Execute manual before/after visual checks for each slice, including responsive behavior and Spanish copy preservation.
  - Avance 2026-03-16: verificacion de copy/rutas en codigo para Slice B.1 completada; falta corrida manual visual antes/despues en navegador (desktop + mobile) para cerrar el item.
  - Avance 2026-03-16 (Slice B.2): lint ejecutado y copy/rutas preservadas en meetings/library/book detail a nivel codigo; continua pendiente la validacion manual visual desktop/mobile.
  - Avance 2026-03-16 (Slice C/D): rutas y copy en espanol preservadas en codigo para `/explore`, `/create-club` y `/profile/[userId]`; sigue pendiente evidencia manual visual en navegador (desktop + mobile) para marcar done.
  - Avance 2026-03-16 (revision visual real): captura automatizada desktop/mobile completada para 12 rutas en `openspec/changes/retro-ui-style-cleanup-red-scale/visual-review/2026-03-16/`.
  - Blocker alto 2026-03-16: runtime error `Invalid src prop ... hostname "i.pravatar.cc" is not configured` en `/my-clubs/[id]/members`, `/my-clubs/[id]/library` y `/profile/[userId]` (evidencia: `club-members-*.png`, `club-library-*.png`, `profile-*.png`).
  - Blocker alto 2026-03-16: rotura responsive en mobile para shell dashboard family (`/my-clubs/[id]/dashboard`, `/my-clubs/[id]/meetings`, `/my-clubs/[id]/[bookId]`) con overflow horizontal severo y paneles fuera de viewport (evidencia: `club-dashboard-mobile.png`, `club-meetings-mobile.png`, `club-book-detail-mobile.png`).
  - Cierre 2026-03-16: host remoto `i.pravatar.cc` habilitado en `next.config.ts` con `images.remotePatterns`; rutas con crash previo (`/my-clubs/[id]/members`, `/my-clubs/[id]/library`, `/profile/[userId]`) vuelven a renderizar OK (evidencia r2: `club-members-mobile-r2-verified.png`, `club-library-mobile-r2-verified.png`, `profile-mobile-r2-verified.png`).
  - Cierre 2026-03-16: shell mobile corregida para familia `/my-clubs/[id]/**` (sidebar colapsada por defecto + drawer mobile + contenedores `min-w-0`) y sin overflow horizontal en `/dashboard`, `/meetings`, `/[bookId]` (evidencia r2: `club-dashboard-mobile-r2-verified.png`, `club-meetings-mobile-r2-verified.png`, `club-book-detail-mobile-r2-verified.png`; ancho capturado 390px).
- [x] 5.3 Prepare rollback notes per slice so regressions can be reverted independently without reverting unrelated work.
- [x] 5.4 Mark migration complete only when all checklist criteria are satisfied for every slice and no legacy red literals remain in migrated surfaces.
  - Cierre 2026-03-16: completado tras resolver blockers de 5.2, rerun visual desktop/mobile en rutas auditadas y confirmar cumplimiento de checklist de slices migrados; quedan solo warnings de lint preexistentes fuera del alcance del change.

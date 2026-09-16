# Current Feature

<!-- Feature name and short description -->

## Status

<!-- Not started | In Progress | Completed -->

Completed

## Goals

<!-- Goals and Requirements -->

## Notes

<!-- Any extra notes -->

## History

<!-- Keep this updated. Earliest to latest -->

- 2026-09-16 — Phase 1 spec documented here and marked In Progress.
- 2026-09-16 — **Dashboard UI — Phase 1 (Shell & Layout)** — Completed.
  Spec: @context/features/dashboard-phase-1-spec.md. Built on branch
  `feature/dashboard-phase-1`.
  - shadcn/ui initialized (radix base, Nova preset — Lucide + Geist); `button`, `input`
    and `separator` installed.
  - `/dashboard` route created under the `(app)` route group, with the shell split into
    `Topbar` and `Sidebar` in `src/components/layout/`.
  - Dark mode on by default via a `dark` class on `<html>`; shadcn design tokens in
    `src/app/globals.css` (Tailwind v4 `@theme`, no `tailwind.config.ts`).
  - Top bar is display only — search field with ⌘K badge, New Collection and New Item.
  - Sidebar and main area are placeholder `h2`s; they get built out in phases 2 and 3.
  - `/` temporarily redirects to `/dashboard` until the marketing landing page exists.
  - `npm run build` and `npm run lint` pass; verified in the browser at 1440px and 390px,
    dark confirmed even with the OS set to light.
- 2026-09-16 — Phase 2 spec documented here and marked In Progress.
- 2026-09-16 — **Dashboard UI — Phase 2 (Sidebar)** — Completed.
  Spec: @context/features/dashboard-phase-2-spec.md. Built on branch
  `feature/dashboard-phase-2`.
  - shadcn `sidebar`, `avatar` and `collapsible` installed (pulling in `sheet`,
    `tooltip`, `skeleton` and the `use-mobile` hook).
  - `Sidebar` rebuilt on the shadcn sidebar with `collapsible="icon"`: logo header,
    `SidebarTypes`, `SidebarCollections`, `SidebarUser` footer and a rail.
  - Types link to `/items/[slug]` with their Lucide icon, type color and item count;
    collections are split into favorites (star) and the most recent (count), linking
    to `/collections/[id]`. Both groups are collapsible, matching the screenshot.
  - `(app)/layout.tsx` wraps the shell in `SidebarProvider` + `SidebarInset` and reads
    the `sidebar_state` cookie so the collapsed state survives a reload; `Topbar` gained
    the `SidebarTrigger`.
  - Item type colors added as `@theme` tokens in `globals.css` (`text-type-snippet`,
    `border-type-*` ready for phase 3) since Tailwind can't build classes from the hex
    values on the data.
  - `use-mobile.ts` shipped by the shadcn CLI called `setState` in an effect, which this
    project's React Compiler lint rules reject; rewritten with `useSyncExternalStore`.
  - The second collections group is labelled RECENT per the spec (the screenshot says
    ALL COLLECTIONS); mock collections have no timestamps, so "recent" is source order
    capped at 5.
  - Data still comes straight from `src/lib/mock-data.ts`.
  - `npm run build` and `npm run lint` pass; verified at 1440px (expanded + icon
    collapsed with tooltips) and 390px (drawer), no console errors.
  - Known gaps: `/items/[type]`, `/collections/[id]` and `/settings` don't exist yet, so
    those links 404; section collapse state isn't persisted; main area lands in phase 3.

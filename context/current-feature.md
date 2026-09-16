# Current Feature

<!-- Feature name and short description -->

**Dashboard UI — Phase 2 (Sidebar)** — Build out the real sidebar: item types,
favorite and recent collections, a user area, and collapse/drawer behavior.
Spec: @context/features/dashboard-phase-2-spec.md

## Status

<!-- Not started | In Progress | Completed -->

Completed

## Goals

<!-- Goals and Requirements -->

- Collapsible sidebar, with a drawer/panel toggle icon in the top bar
- **Types** section listing every item type with its Lucide icon, type color and item
  count, each linking to `/items/[slug]` (e.g. `/items/snippets`)
- **Collections** section split into favorites (starred) and the most recent
  collections, each linking to `/collections/[id]`
- User avatar area pinned to the bottom (name, email, settings affordance)
- Always a drawer on mobile; fixed sidebar on desktop
- Data comes from `@src/lib/mock-data.ts` imported directly — no database yet

## Notes

<!-- Any extra notes -->

- Replaces the phase 1 placeholder in `src/components/layout/Sidebar.tsx`; the
  `Topbar` gains the sidebar toggle.
- Reference screenshot: @context/screenshots/dashboard-ui-main.png. It labels the
  second collections group "ALL COLLECTIONS"; the spec asks for *most recent*
  collections, so sort by recency and cap the list.
- Type icons are stored as Lucide icon *names* in mock data, so the sidebar needs a
  name → component map.
- Likely shadcn additions: `sidebar` (brings `sheet`, `tooltip`, `skeleton`),
  `avatar`, `collapsible`, `scroll-area`.
- Routes `/items/[type]` and `/collections/[id]` don't exist yet — links can point at
  them ahead of the pages (404 until phase 3 / later features).
- Main area stays a placeholder; it's built in phase 3
  (@context/features/dashboard-phase-3-spec.md).

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
  - Data still comes straight from `src/lib/mock-data.ts`.
  - `npm run build` and `npm run lint` pass; verified at 1440px (expanded + icon
    collapsed with tooltips) and 390px (drawer), no console errors.
  - Known gaps: `/items/[type]`, `/collections/[id]` and `/settings` don't exist yet, so
    those links 404; section collapse state isn't persisted; main area lands in phase 3.

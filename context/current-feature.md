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

# Current Feature

<!-- Feature name and short description -->

**Stats & Sidebar** — read the dashboard stats and the sidebar's item types and
collections from Neon via Prisma instead of `src/lib/mock-data.ts`.
Spec: @context/features/stats-sidebar-spec.md.

## Status

<!-- Not started | In Progress | Completed -->

Completed

## Goals

<!-- Goals and Requirements -->

- Stats cards show database counts, keeping the current design/layout
- Sidebar lists the system item types with their icons, linking to `/items/[typename]`
- "View all collections" link under the sidebar collections list, going to `/collections`
- Favorite collections keep the star; recent collections show a colored circle for the
  most-used item type in that collection
- Database functions live in `src/lib/db/items.ts` (using `src/lib/db/collections.ts`
  as reference)

## Notes

<!-- Any extra notes -->

- Reference: @src/lib/db/collections.ts

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
- 2026-09-16 — Phase 3 spec documented here and marked In Progress.
- 2026-09-16 — **Dashboard UI — Phase 3 (Main Area)** — Completed.
  Spec: @context/features/dashboard-phase-3-spec.md. Built on branch
  `feature/dashboard-phase-3`.
  - shadcn `card` and `badge` installed.
  - `/dashboard` now renders: page heading, 4 stats cards, a Collections grid with a
    "View all" link, a Pinned section and a Recent section of the 10 newest items.
  - `StatsCards` (`src/components/dashboard/`) counts items, collections and the
    favorites of each. Counts come from the mock arrays, so they read 10 / 6 / 3 / 3
    rather than matching the larger per-type counts baked into the sidebar mock — the
    two line up once the database replaces `mock-data.ts`.
  - `CollectionCard` (`src/components/collections/`) takes its left accent border and
    faint card wash from the collection's `defaultTypeId`, and lists the types it holds
    as icons. Links to `/collections/[id]`.
  - `ItemCard` (`src/components/items/`) is a type-colored icon tile, title with pin and
    star markers, description, tags and the updated date. Display only for now — items
    are meant to open in a drawer, which is a later feature.
  - `item-types.ts` gained `getTypeById` plus `border-l-type-*`, `bg-type-*/5` and
    `bg-type-*/10` class maps, following the phase 2 pattern of static classes over hex
    values. `src/lib/format.ts` added for the short "Jan 15" date, formatted in UTC so
    server and client agree.
  - The React Compiler lint rule `react-hooks/static-components` rejects
    `const Icon = getTypeIcon(...)` in a component body, so the lookup moved into a
    `TypeIcon` component that builds the icon with `createElement`.
  - Pinned items also appear in Recent; "recent" is the 10 newest by `updatedAt`
    regardless of pin state, which is what the spec asks for.
  - `npm run build` and `npm run lint` pass; verified at 1440px and 390px with no console
    errors and no horizontal overflow.
  - The spec references `@src/lib/mock-data.js`; the file in the repo is `.ts`.
  - Mock collections still have no timestamps, so the collections grid uses source
    order, capped at 6 — the same fallback the phase 2 sidebar uses.
  - Known gaps: `/collections`, `/collections/[id]` and `/items/[type]` still don't
    exist, so the collection cards and "View all" 404; no item drawer yet.
- 2026-09-25 — Database (Prisma + Neon) spec documented here and marked In Progress.
- 2026-09-26 — **Prisma + Neon PostgreSQL Setup** — Completed.
  Spec: @context/features/database-spec.md. Built on branch `feature/database-setup`.
  - Prisma 7 installed with `@prisma/adapter-neon`; the `prisma-client` generator outputs
    to `src/generated/prisma` (gitignored, regenerated on `postinstall`).
  - `prisma.config.ts` loads env vars via `dotenv` and points the CLI at `DIRECT_URL`
    (falling back to `DATABASE_URL`) since migrations need a non-pooled Neon connection.
  - `prisma/schema.prisma` built from the project overview data model: User, Item,
    ItemType, Collection, ItemCollection, Tag, plus the Auth.js models (Account, Session,
    VerificationToken), with indexes and cascade deletes.
  - Initial migration `20260925172454_init` created and applied to the Neon development
    branch with `prisma migrate dev` — no `db push`. `prisma migrate status` reports the
    schema up to date.
  - `prisma/seed.ts` seeds the 7 system item types. Postgres treats `NULL` userIds as
    distinct, so it upserts by name manually rather than relying on
    `@@unique([name, userId])`.
  - `src/lib/db.ts` exports a Prisma client singleton on the Neon adapter, reused across
    hot reloads in development.
  - `scripts/test-db.ts` added as a read-only smoke test (`npx tsx scripts/test-db.ts`):
    checks the connection, table row counts and seeded system types — all 7 found.
  - `db:generate`, `db:migrate`, `db:seed` and `db:studio` npm scripts added;
    `.env.example` documents `DATABASE_URL` and `DIRECT_URL`.
  - Known gaps: the migration hasn't been applied to the Neon production branch (needs
    `prisma migrate deploy`); the app still reads from `src/lib/mock-data.ts`.
- 2026-09-26 — Seed sample data spec documented here and marked In Progress.
- 2026-09-26 — **Seed Sample Data** — Completed.
  Spec: @context/features/seed-spec.md. Built on branch `feature/seed-data`.
  - `bcryptjs` added; `prisma/seed.ts` rewritten to seed the 7 system types, a demo user
    (`demo@devstash.io` / `12345678`, hashed with 12 rounds, `isPro: false`, email
    verified) and 5 collections with 18 items.
  - Collections: React Patterns (3 TS snippets), AI Workflows (3 prompts), DevOps
    (1 snippet, 1 command, 2 links), Terminal Commands (4 commands), Design Resources
    (4 links). Links use real URLs; each item is joined to its collection through
    `ItemCollection`.
  - Snippets, prompts and commands are `TEXT`; links are `URL`. Each collection gets a
    `defaultTypeId` so its card is colored.
  - A few items are pinned or favorited, and React Patterns and AI Workflows are favorite
    collections, so the dashboard's pinned and favorite sections have data (the spec
    doesn't specify these).
  - Re-runnable: system types upserted by name, demo user upserted by email, and the
    demo user's items and collections deleted and recreated on each run.
  - Seeded the Neon dev branch twice; `scripts/test-db.ts` reports 1 user, 7 types,
    5 collections, 18 items. `npm run build` and `npm run lint` pass.
  - Known gaps: no tags seeded; the app still reads from `src/lib/mock-data.ts`.
- 2026-09-26 — Dashboard collections spec documented here and marked In Progress.
- 2026-09-26 — **Dashboard Collections** — Completed.
  Spec: @context/features/dashboard-collections-spec.md. Built on branch
  `feature/dashboard-collections`.
  - `src/lib/db/collections.ts` added: `getRecentCollections` (6 most recently updated,
    with item count and the types inside each) and `getCollectionStats` (total and
    favorite counts).
  - `src/lib/db/users.ts` added: `getCurrentUserId` looks up the seeded demo user
    (`demo@devstash.io`) until sign-in exists, wrapped in `React.cache`. If the demo user
    is missing, the dashboard shows no collections and zeroed stats.
  - Types for the card data live in `src/types/collections.ts`.
  - The dashboard page is now `async` and fetches collections and stats directly with
    Prisma.
  - `CollectionCard` takes its border and wash from the collection's most-used type
    (ties broken alphabetically), falling back to its `defaultTypeId`, then a neutral
    border. Footer icons list every type, most-used first.
  - Database type names are singular (`snippet`), so the slug for the existing color and
    icon class maps is the name plus "s".
  - `StatsCards` reads Collections and Favorite Collections from the database; Items and
    Favorite Items stay on mock data. `TypeIcon`'s prop narrowed to `name`, `slug` and
    `icon` so it takes both mock and database types.
  - `npm run build` and `npm run lint` pass; verified at 1440px and phone width with no
    console errors and no horizontal overflow. DevOps shows green (links, 2 of 4).
  - Known gaps: item stat cards (10 mock) don't match the 18 seeded items; Pinned,
    Recent and the sidebar still read `mock-data.ts`; `/collections` routes still 404.
- 2026-09-26 — Dashboard items spec documented here and marked In Progress.
- 2026-09-26 — **Dashboard Items** — Completed.
  Spec: @context/features/dashboard-items-spec.md. Built on branch
  `feature/dashboard-items`.
  - `src/lib/db/items.ts` added: `getPinnedItems` (all pinned, newest first),
    `getRecentItems` (10 most recently updated, pinned or not) and `getItemStats` (total
    and favorite counts). Types live in `src/types/items.ts`.
  - The dashboard fetches pinned items, recent items and item stats alongside the
    collection queries in one `Promise.all`. The Pinned section only renders when there
    are pinned items.
  - `ItemCard` takes a `DashboardItem`; its icon, border and icon tile come from the
    item's database type, reusing `toCollectionItemType` (now exported from
    `collections.ts`) for the singular-name → plural-slug mapping. Tags render as badges
    sorted by name; the description line is skipped when empty.
  - `StatsCards` now reads every count from the database: 18 items, 5 collections,
    3 favorite items, 2 favorite collections.
  - `getTypeById` removed from `item-types.ts` (no longer used); `TypeIcon` types its prop
    against `CollectionItemType` instead of the mock `ItemType`.
  - `npm run build`, `npm run lint` and `tsc` pass; verified in the browser at 1440px and
    narrow width, no console errors and no horizontal overflow.
  - Known gaps: no tags are seeded, so no tag badges show yet; the sidebar still reads
    `mock-data.ts`; items don't open in a drawer yet.
- 2026-09-26 — Stats & sidebar spec documented here and marked In Progress.
- 2026-09-26 — **Stats & Sidebar** — Completed.
  Spec: @context/features/stats-sidebar-spec.md. Built on branch `feature/stats-sidebar`.
  - Stats cards already read from the database (done in Dashboard Items); layout unchanged.
  - `getSidebarItemTypes` added to `src/lib/db/items.ts`: the system types with the
    user's item count for each (filtered `_count`), in seed order. `SidebarItemType`
    lives in `src/types/items.ts`.
  - `getSidebarCollections` added to `src/lib/db/collections.ts`: every favorite plus the
    5 most recently updated non-favorites, each with item count and most-used type
    (same `rankTypes` ranking as the cards, falling back to `defaultTypeId`).
  - `Sidebar` is now an async server component that fetches both and passes them to the
    client `SidebarTypes` and `SidebarCollections` as props.
  - Type names are shown as the capitalized plural slug ("Snippets"), linking to
    `/items/[slug]`.
  - Favorites keep the folder icon and star; recent collections show a colored circle
    for their most-used type (`getTypeDotClass`, a new `bg-type-*` class map in
    `item-types.ts`). A "View all collections" link sits under the list, going to
    `/collections`.
  - `npm run build`, `npm run lint` and `tsc` pass; verified in the browser at 1440px —
    type counts (4 / 3 / 5 / 0 / 0 / 0 / 6) sum to the 18 seeded items, no console errors.
  - Known gaps: `SidebarUser` still reads the mock user until auth exists;
    `/collections` and `/items/[type]` routes still 404.

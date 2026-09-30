# Users Table — Nuxt 4

Interactive users table with filtering, sorting, pagination, URL-synced state,
debounced search and an SSR-safe dark/light theme. Built as a test task.

## Stack

- **Nuxt 4** (Vue 3.5, vue-router 4) — SSR
- **TypeScript**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **@nuxtjs/color-mode** — theme switching
- **pnpm**

## Setup

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build
pnpm preview  # preview the production build
pnpm typecheck
```

## Features

- **Filtering** — case-insensitive search by name/email (trimmed) + role filter, combined.
- **Sorting** — by `age` (numeric) and `createdAt` (by timestamp); click toggles asc/desc,
  changing the field resets to asc. Sorts a copy, never mutates the source. Direction
  indicator + `aria-sort` on headers.
- **Pagination** — 10 / 15 / 20 per page, Prev/Next with disabled edge states,
  `totalPages` clamped to a minimum of 1.
- **URL state** — filters, sort, page and perPage are synced to query params and
  restored on reload; invalid params are ignored.
- **Debounced search** — 400 ms, so the table doesn't refilter on every keystroke.
- **Dark / light theme** — SSR-safe, persisted, no flash of the wrong theme.
- **Sticky table header** with a scrollable body.
- **Accessibility** — `aria-sort` on sortable headers, `aria-label` on the theme toggle.

## Requirements coverage

**Core**

- [x] Filtering: role + search
- [x] Sorting: age, createdAt
- [x] Pagination (10 per page by default)
- [x] Sticky table header on scroll
- [x] State in query params: filters, sort, page, perPage
- [x] State restored on reload
- [x] Page-size switcher: 10 / 15 / 20

**Optional**

- [x] Dark / light theme
- [x] Debounced search

## Decisions & tradeoffs

### Single source of truth: the composable

All derived logic lives in `useUsersTable` as a **chain of pure `computed`s**:
`filteredUsers → sortedUsers → paginatedUsers`. `pages/index.vue` stays thin — it only
wires state to components. `watch` is used strictly for side effects (resetting `page`,
clamping it, syncing the URL), never to recompute derived data.

### SSR / hydration for the theme

Reading `localStorage` directly in setup would cause a **hydration mismatch** and a theme
flash, because the server can't see it. I use **`@nuxtjs/color-mode`**, which injects an
inline script that sets the `.dark` class on `<html>` **before hydration** — so colors are
consistent and don't flash.

One subtlety: `useColorMode()` returns the default value on the server (the real theme is
only known in the browser), so any markup that branches on `colorMode.value` — the toggle
icon — is wrapped in `<ClientOnly>` to avoid a mismatch on that node. The theme _class_
itself is applied before hydration, so backgrounds never flicker.

### Query-sync: `router.replace` + validation

State → URL uses `router.replace` (not `push`) so filtering/sorting doesn't flood the
browser history. The URL omits default values (empty search, page 1, default perPage) to
keep it clean. On the way in, every param is **parsed and validated** against allowed
values (`role`, `sortBy`, `sortDirection`, `perPage` whitelist, positive-integer `page`);
anything invalid falls back to a default instead of breaking the app. A dirty URL is
normalized once on mount.

Query params are SSR-safe (`useRoute().query` works on the server), which is why state
restoration doesn't need `<ClientOnly>` — unlike the theme.

### Debounce on state, not on the input

The raw `searchInput` updates on every keystroke (so the input stays responsive), while a
separate debounced `search` ref (400 ms) drives filtering and the URL. This keeps typing
smooth without refiltering or rewriting the URL on each character, and the restored search
value still shows immediately in the input on reload.

## Project structure

```
app.vue                     # layout wrapper + theme toggle
pages/index.vue             # thin page, wires composable to components
components/
  UserFilters.vue           # search input + role/perPage selects
  UserTable.vue             # table, sticky header, sort indicators
  BaseSelect.vue            # typed generic <select>
  ThemeToggle.vue           # SSR-safe theme switch
composables/
  useUsersTable.ts          # all table logic (computed chain + query sync)
  useDebouncedRef.ts        # generic debounced ref
types/user.ts               # User type, ROLES, PER_PAGE_OPTIONS
data/users.ts               # 200 sample users
assets/css/main.css         # Tailwind entry + dark variant
```

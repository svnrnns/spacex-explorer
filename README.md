# SpaceX Explorer

A small Next.js app to browse SpaceX launches. Data comes from the public [SpaceX API v4](https://github.com/r-spacex/SpaceX-API)

## How to run

1. **Install dependencies**

```bash
 npm install
```

1. **Environment**
  Create a `.env` (or `.env.local`) file. The app expects a **server-only** variable whose name is `SSPACEX_API_URL` but whose value must be the **full base URL**. Copy the key from `.env.example`
2. **Development**

```bash
 npm run dev
```

Open [http://localhost:3000](http://localhost:3000). 4. **Production**

```bash
 npm run build
 npm run start
```

1. **Lint**

```bash
 npm run lint
```

## Architecture decisions

### App Router vs Pages Router

The app uses the **App Router** under `src/app/`. Route files are thin re-exports; UI and data logic live in **feature modules** under `src/features/*/pages/` and `src/features/*/components/`. There is **no** Next.js `pages/` router directory—only. That's outdated.

That split keeps routes stable while grouping everything a feature needs (helpers, filters, hooks) in one place.

### SWR / React Query vs custom fetchers

The project does **not** use SWR, TanStack Query, or similar. Instead it uses:

- **Axios** behind a small `api-service` (`get` / `post` / …) with a configurable base URL.
- **React `cache()`** around read-only GET helpers (`getLaunchById`, `getRocketById`, `getLaunchpadById`) so repeated calls in the same server render (e.g. metadata + page) dedupe automatically.
- **Server Actions** (`"use server"`) for the launches list: `POST /launches/query` runs on the server, and `loadMoreLaunches` is called from the client for infinite scroll but also never leaked to the client.
- **Local React state** on the client to append pages and track `hasNextPage` / offset. No global client cache library.

**Why:** The list’s first page is server-rendered from `searchParams`; extra pages are a simple “append rows” flow. Server actions avoid exposing the API base URL to the browser and keep types on the server boundary. The tradeoff is no built-in request deduplication, retries, or background refetch on the client—see below.

## SpaceX API usage

### Endpoints


| Use case                     | Method | Path               | Notes                                                              |
| ---------------------------- | ------ | ------------------ | ------------------------------------------------------------------ |
| Filtered, sorted launch list | `POST` | `/launches/query`  | Body: Mongo-style `query` + `options` (`limit`, `offset`, `sort`). |
| Single launch                | `GET`  | `/launches/{id}`   | 404 → treated as missing launch on detail.                         |
| Rocket                       | `GET`  | `/rockets/{id}`    | Optional; launch may omit rocket id.                               |
| Launchpad                    | `GET`  | `/launchpads/{id}` | Optional.                                                          |


Launch detail loads launch first, then loads rocket and launchpad **in parallel** with `Promise.all` when ids exist.

### Query shape (list)

Filters from the URL (`q`, `when`, `outcome`, `from`, `to`, `sort`) are parsed server-side and translated into API query fields, for example, name search via `$regex`, `upcoming` / `success` booleans, and `date_utc` range objects. Sort options map to API sort objects (e.g. `date_utc: "desc"`).

### Pagination strategy

- **Page size:** 40 launches per request (`LAUNCHES_PAGE_SIZE`).
- **Mechanism:** **Offset-based** pagination using the API’s `offset` / `limit` and the response’s `hasNextPage`, `offset`, and `docs`.
- **UX:** First page is fetched in the **server component** for the current URL. **Infinite scroll** loads more: a sentinel node is observed with `IntersectionObserver` (with a bottom `rootMargin` to prefetch slightly before the user hits the end). Merging **dedupes by launch id** in case of overlapping or repeated responses.

## Performance and accessibility

### Performance

- **SSR for the first launches page** so filters in the URL produce meaningful HTML without waiting for client hydration.
- `**useTransition` + `router.push` for filter/search navigation so the UI can show pending skeleton state without blocking typing.
- `**reactStrictMode: true`** in `next.config.ts`.
- `htmlLimitedBots: /.*/**` so metadata generation follows the “blocking” behavior described in Next.js docs for bots (project-specific choice).
- **Parallel fetches** on launch detail for rocket and launchpad.
- **Horizontal scroll** on narrow viewports for the launches table (`overflow-x-auto`) so the grid does not crush columns.

### Accessibility

- `lang="en"` on `<html>`.
- **Semantic table** for the launches list with a proper `<thead>` / header row.
- **Decorative icons** marked `aria-hidden` where appropriate; **icon-only controls** get `aria-label` or visible text (e.g. clear search, theme, favorites toggle).
- **Favorite control** uses `aria-pressed` and descriptive labels.
- **Focus styles** via `focus-visible` on links and controls.
- **Images** on detail (patch, gallery) use descriptive `alt` text where implemented.
- **Loading states** for favorites use `aria-busy` / `aria-label` on the skeleton region.

## Tradeoffs and what we’d do next

- **Client data library:** Adding TanStack Query (or SWR) would give retries, stale-while-revalidate, and simpler infinite-query
- **Favorites:** Stored only in `localStorage` with a sync hook for React; no accounts, no cross-device sync, and stale rows if a favorite launch is removed from the API.
- **Error handling:** Network failures on “load more” could surface inline toasts or retry UI instead of failing silently in the client flow.
- Extra: develop more optional features (offline support, charts, launch comparison...)

## Known limitations

- **No authentication**; favorites are per-browser only.
- **Public API dependency:** Rate limits, downtime, or schema changes are outside app control.
- **Filter total** (`totalDocs`) reflects the API count for the current query; very large result sets still load in chunks of 40 only as the user scrolls.
- **No automated tests**.
- **Date picker component** could be made. Using native datepicker right now.


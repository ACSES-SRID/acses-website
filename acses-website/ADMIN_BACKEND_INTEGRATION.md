# Admin dashboard and API integration plan

This document describes the **simplest, lowest-risk path** to align the React frontend (Vite app in this folder) with the **ACSES CDN & API** OpenAPI v2 contract you shared. It is based on the current code under `src/`, not on separate project documentation files.

## 1. Where the real app lives

The installable Vite/React project is the **inner** `acses-website/` directory (the one that contains `package.json`, `vite.config.js`, and `src/`). Any env files, CI, and deployment roots should target that folder.

## 2. What you already have (good foundations)

- **Configurable API host**: `src/utils/api.js` uses `import.meta.env.VITE_API_BASE_URL` with a fallback to `http://localhost:3002`, matching your Swagger server URL.
- **Single HTTP helper**: `fetchApi()` and `apiUrl()` centralize JSON calls—extend here rather than scattering `fetch` across pages.
- **Admin is routed separately**: `src/App.jsx` mounts `/admin` with its own shell; public routes stay on `RouteLayout`. You can harden admin API usage without rewriting the whole marketing site in one go.

## 3. Gaps between current frontend calls and the real API

These are the main reasons admin (and some public pages) will not behave correctly against the documented backend until adjusted.

| Area | Current frontend behavior | OpenAPI / backend expectation |
|------|---------------------------|--------------------------------|
| **Login** | `AdminContext` calls `GET /api/users` (protected), compares **plaintext** passwords client-side, and never obtains a JWT. | `POST /api/auth/login` with `{ username, password }` returns `{ token, user }`. Passwords are never returned from user APIs. |
| **Auth on writes** | Mutations call `fetchApi` without `Authorization`. | All `POST` / `PUT` / `DELETE` require `Authorization: Bearer <token>`. |
| **REST paths** | Several admin screens use `PUT`/`DELETE` on collection URLs with `{ id }` in the body (e.g. `/api/events`, `/api/users`). | Updates/deletes use **path parameters**: `/api/events/{id}`, `/api/users/{id}`, etc. |
| **Pagination** | Admin and public code often treat list responses as a **plain array** (e.g. `data.map(...)`). | `GET /api/events`, `/api/store`, `/api/gallery`, `/api/student-projects` return `{ items, total, page, limit }`. |
| **Student projects (admin)** | Likely uses public list or local assumptions. | Admin listing is `GET /api/student-projects/all` (Bearer). Public showcase stays on `GET /api/student-projects` (approved only). |
| **“Offline mode”** | Some handlers update UI even when the API fails, which can **mask** real integration bugs. | Prefer clear errors during integration; keep optimistic UI only where you explicitly design for it. |

Addressing the **login + Bearer token + correct paths + pagination shape** once in a small shared layer fixes most admin screens with minimal duplication.

## 4. Simplest integration architecture (recommended)

### Step A — Environment and production safety

1. **Never bake API URLs or secrets into the repo.** Use Vite env at build time:
   - Local: `.env.local` with `VITE_API_BASE_URL=http://localhost:3002` (gitignored).
   - Production: set `VITE_API_BASE_URL` in the hosting dashboard (e.g. Vercel) to your **HTTPS** API origin.
2. **CORS**: Ensure the backend allows your production site origin and preflight for `Authorization` and `Content-Type: application/json`.
3. **Health check**: You already ping the API from `App.jsx` via `/api/leadership`. Optionally switch the wake-up call to `GET /health` for a clearer contract and less load on a data route.

This keeps shipping the static frontend safe: if the API is down, the site still builds and serves; only dynamic parts fail gracefully.

### Step B — One thin API client (extend `src/utils/api.js`)

Keep **one module** responsible for:

1. **Building URLs** (already `apiUrl`).
2. **Attaching the JWT** for mutating requests (and for any authenticated `GET` such as `/api/users`, `/api/student-projects/all`).
3. **Storing the token** in `sessionStorage` (clears when the tab closes; slightly safer than `localStorage` for tokens) or `localStorage` if you need persistence across tabs—pick one and document it.
4. **Normalizing list responses**: small helpers, e.g. `const items = Array.isArray(data) ? data : data.items ?? []`, used by list screens so **production does not break** if some routes return arrays and others return pagination objects during migration.
5. **Parsing errors**: your backend may return JSON `{ error: "..." }` or plain text; map both to a single `Error` message for toasts.

Avoid adding heavy dependencies unless the team already standardizes on one; `fetch` is enough.

### Step C — Auth flow in `AdminContext` (highest priority)

1. Replace the current login with:
   - `POST /api/auth/login`
   - On success: persist `token`, persist `user` (no password), expose `logout` that clears token + user.
2. Remove any dependency on **client-side password comparison** or on **listing users to log in** (that cannot work with real bcrypt-backed users and protected routes).
3. Optional: after login, call `GET /api/users` only if the logged-in user is allowed to manage users, to populate the Users screen—not for authentication.
4. **Rate limiting**: the spec mentions login rate limits; surface `429` with a friendly message.

Until this is done, **do not consider admin integration production-ready**, regardless of other screens.

### Step D — Update admin pages in a fixed order (small batches, easy rollback)

Suggested order (each step is independently testable against Swagger UI):

1. **Users** — `GET/POST /api/users`, `PUT/DELETE /api/users/{id}` with `UserInput` (password required on create; optional on update per your backend rules).
2. **Events** — `GET /api/events` (unwrap `items`), `POST /api/events`, `PUT/DELETE /api/events/{id}` with Bearer on writes.
3. **Announcements** — array `GET`; `POST /api/announcements`; `PUT/DELETE /api/announcements/{id}`.
4. **Leadership** (executives) — `GET/POST /api/leadership`; `PUT/DELETE /api/leadership/{id}` (align naming with `AdminLeadership` / routes).
5. **Resources** — `GET` returns grouped `{ academic, tools, career }`; mutations use `/api/resources` and `/api/resources/{id}`.
6. **Store** — paginated `GET /api/store`; `POST`; `PUT/DELETE /api/store/{id}`.
7. **Gallery** — paginated `GET /api/gallery`; `POST`; `PUT/DELETE /api/gallery/{id}`.
8. **Student projects** — admin: `GET /api/student-projects/all`; approve via `PUT /api/student-projects/{id}` with `{ status: "approved" }` (and other fields as needed).
9. **Home editor** — `GET /api/home`; `PUT /api/home` with `HomeInput` (full document replace per spec).

After each module, **manually verify** in Swagger and in the UI so regressions stay localized.

### Step E — Public site (second wave, same helpers)

Components such as `src/components/home/events/Events.jsx` already call `/api/events` but assume an array. Reuse the same **pagination unwrap** helper so public pages stay in sync with admin data without a second HTTP stack.

**Submit project** flow should use `POST /api/student-projects` (public) with the schema’s `StudentProjectInput`; avoid sending `status` from the client if the API sets `pending` by default.

## 5. Keeping production stable (practical rules)

1. **Ship config, not code, for URLs**: production builds only need the correct `VITE_API_BASE_URL`; no API URL hardcoded in components.
2. **Feature-neutral refactors**: prefer extending `fetchApi` (or a sibling `authFetch`) over rewriting every component at once.
3. **Backend first in staging**: point a preview deployment’s `VITE_API_BASE_URL` at a staging API; run through admin CRUD before changing production env vars.
4. **Roles**: the UI has `hasAccess` and roles like `super admin` / `editor`. The JWT may not encode the same fields—either map API `user.role` to your existing keys or simplify UI checks to match the API once roles are confirmed server-side.
5. **Remove demo credentials from production builds** when real auth is live (e.g. the hard-coded test accounts on the admin login screen)—or gate them behind `import.meta.env.DEV`.

## 6. Definition of “integration complete” for admin

- Login uses **`/api/auth/login`** and JWT storage; logout clears it.
- All mutating admin requests send **`Authorization: Bearer …`**.
- All resource updates/deletes use **path-based IDs** per OpenAPI.
- List screens handle **paginated** responses where specified.
- Users management never expects plaintext passwords from `GET /api/users`.
- Public pages read the same API shapes (especially paginated lists) through shared helpers.

## 7. Optional later improvements (not required for first integration)

- Refresh tokens or shorter-lived JWT handling if the backend adds them.
- OpenAPI-generated TypeScript types from the spec (codegen) once the API is stable.
- React Query (or similar) for caching and invalidation if admin complexity grows.

---

**Summary:** The smallest change with the largest impact is a **single authenticated client** plus **correct login and REST paths**; then update admin modules one resource at a time, normalizing paginated responses in one place. Configure the API base URL via **`VITE_API_BASE_URL`** per environment so production stays isolated and reversible.

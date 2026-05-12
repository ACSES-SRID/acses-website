# Changelog

All notable changes to the ACSES website frontend (Vite app in this directory) are recorded here.  
**Convention:** add new entries under `[Unreleased]` as work lands; roll dated snapshots when you cut a release.

---

## [Unreleased]

### Changed

- **Student project submissions:** Public submit form and admin copy now treat new submissions as **`pending`** (not `draft`), aligned with the API. Pending rows stay sorted to the **end** of the admin list.

---

## 2026-05-12 — Backend wiring, news, student projects

### Added

- **`CHANGELOG.md`** (this file) for tracking product and integration changes over time.
- **`ADMIN_BACKEND_INTEGRATION.md`** — integration plan for the OpenAPI v2 backend (reference doc from earlier work).
- **JWT session handling** in `src/utils/api.js`: `getAdminToken`, `setAdminToken`, `clearAdminToken` (session storage), optional `auth: true` on `fetchApi`, `unwrapList()` for paginated `{ items, total, page, limit }` responses, clearer errors and 401 / 429 handling, `acses-admin-session-expired` event on auth failure.
- **Admin navigation:** Store link in `AdminShell.jsx` with `hasAccess("store")`.
- **Submit project page:** Full form wired to `POST /api/student-projects` with redirect after success.

### Changed

- **Admin login (`AdminContext.jsx`):** Uses `POST /api/auth/login`; stores JWT + user; logout clears token and user; session restored only when token and stored user match; listens for session-expired event.
- **Editor permissions:** Include `resources` and `store` for non–super-admin roles where applicable.
- **Admin CRUD:** Events, announcements, gallery, users, student projects, home editor — correct REST paths (`/api/.../:id`), Bearer auth on mutating requests, paginated list handling where needed.
- **Admin leadership / resources / store:** Reimplemented on `fetchApi` with auth and API-aligned payloads (leadership `order`/`icon`; resources `ResourceInput`; store numeric prices and paginated `GET`).
- **Admin overview:** Loads protected endpoints only when `hasAccess` allows; uses `unwrapList` for paginated routes.
- **Admin student projects:** Loads `GET /api/student-projects/all` with auth; table **Status** column; sorts **pending** rows last (by `createdAt`); approve via checkbox → `approved`, else `pending`; admin “add” uses public `POST` with full payload including `status`.
- **`App.jsx`:** API warm-up uses `GET /health` instead of hitting leadership data.
- **`Admin.jsx`:** Demo credentials hint only in development (`import.meta.env.DEV`).
- **Public `Events.jsx`, `StorePage.jsx`, `Gallery.jsx`, `StudentProjectsPage.jsx`:** Use `unwrapList` and query limits where helpful.
- **`Leadership.jsx`:** Uses `fetchApi("/api/leadership")`; safe icon (`User` fallback) and image placeholder for API-shaped records.
- **`ResourcesPage.jsx`:** Safer handling of grouped API resources and stable `id` for list keys.
- **`News.jsx` (home):** Replaced mock list with `GET /api/announcements` — shows **published** + **public** items, sorted newest first; loading / error / empty states.
- **`StudentProjectsPage.jsx`:** Removed mock fallback grid; loads **approved** projects from `GET /api/student-projects` only; loading / error / empty UI; optional links only when URLs exist; `submittedBy` line when present.

### Fixed / corrected (same day)

- Student submit status corrected from **`draft` to `pending`** to match API vocabulary and product wording.

---

## Maintenance notes

- Configure **`VITE_API_BASE_URL`** in `.env` / hosting (points at the ACSES API, e.g. `http://localhost:3002` in development).
- When you ship more changes in chat or in PRs, append bullets under **`[Unreleased]`** (or add a new dated section when you tag a release).

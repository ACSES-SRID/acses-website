# Changelog

All notable changes to the ACSES website frontend (Vite app in this directory) are recorded here.  
**Convention:** add new entries under `[Unreleased]` as work lands; roll dated snapshots when you cut a release.

---

## [Unreleased]

## 2026-05-13

### Added
- **Unified Design System (`adminUI.jsx`)**: A new single-source-of-truth module for all UI primitives.
  - **Layouts**: `PageShell`, `PageHeader`, `TwoColLayout`.
  - **Containers**: `Panel`, `FormPanel`, `TabBar`.
  - **Interactions**: `CardRow`, `RowActions`, `FormActions`.
  - **Data Display**: `Pill`, `Pagination`, `ExportBtn`.
  - **Form Controls**: `Field`, `TextArea`, `Select` with standardized focus rings and tracked labels.
  - **States**: `PanelEmpty` and `BlockedAccess` (standardized error/empty states).
- **Collapsible Desktop Sidebar**: 
  - Added a "Rail" mode (80px) to maximize workspace for data management.
  - Hover tooltips (title attributes) added to nav icons when collapsed.
  - Smooth CSS transitions for sidebar width and main content margins.
- **Smart Search Logic**:
  - Implemented **Local-State Debouncing (400ms)** in the header to reduce API overhead.
  - Global `searchQuery` now updates only after the user stops typing, allowing for efficient server-side filtering.

### Changed
- **Navigation Structure**: 
  - Added **Users** and **Home Editor** to the sidebar navigation.
  - Updated `hasAccess` logic to include these new modules in standard editor permissions.
- **Page Architecture**: Migrated all 10 admin modules (Events, Leadership, Resources, etc.) from raw tables to a **Two-Column Card Layout**.
  - Left Column: List of items in `CardRow` format with hover-activated actions.
  - Right Column: Sticky `FormPanel` for rapid creation and editing.
- **Header Refinement**: 
  - Standardized the `Welcome back` greeting and typography.
  - Search bar now features a yellow focus ring consistent with the new design system.
- **Component Specific Enhancements**:
  - **Gallery/Leadership/Store**: Integrated thumbnail previews and avatar support in both lists and forms.
  - **Events**: Added inline toolbar filters for category and status.
  - **Student Projects**: Implemented tech-tag chips in row views.
  - **Users**: Added initial avatars and role-based hint text in forms.

### Fixed
- **Visual Inconsistency**: Eliminated varied button styles, input sizes, and table borders across the panel by forcing all pages to use `adminUI.jsx` primitives.
- **Mobile Experience**: Improved the mobile drawer toggle logic to ensure navigation remains accessible regardless of desktop collapse state.
- **Access Control**: Fixed a bug where "Users" and "Home Editor" links remained hidden for authorized roles.


---

## 2026-05-12 — Backend integration, admin, public content, and component modules

This section records the full set of changes from the integration and UX work through the **component folder restructure** (KISS, clearer ownership per page, easier debugging).

### Added

- **`CHANGELOG.md`** (this file) for tracking product and integration changes over time.
- **`ADMIN_BACKEND_INTEGRATION.md`** — integration plan for the OpenAPI v2 backend.
- **`src/utils/api.js`:** `VITE_API_BASE_URL`, `unwrapList()` for paginated `{ items, total, page, limit }` responses, `fetchApi` with optional `auth: true` (Bearer JWT from session storage), clearer errors, 401 / 429 handling, `acses-admin-session-expired` event on auth failure, token helpers (`getAdminToken`, `setAdminToken`, `clearAdminToken`).
- **Admin navigation:** Store link in `layout/AdminShell.jsx` gated with `hasAccess("store")`.
- **Submit project page:** Form wired to `POST /api/student-projects` with success redirect.

### Changed

- **Admin login (`context/AdminContext.jsx`):** `POST /api/auth/login`; stores JWT + user; logout clears token and user; session restored only when token and stored user match; listens for session-expired event.
- **Editor permissions:** Include `resources` and `store` for non–super-admin roles where applicable.
- **Admin CRUD:** Events, announcements, gallery, users, student projects, home editor — REST paths with `:id`, Bearer on mutating requests, paginated list handling where needed.
- **Admin leadership / resources / store:** Implemented on `fetchApi` with auth and API-aligned payloads (leadership `order` / `icon`; resources `ResourceInput`; store numeric prices and paginated `GET`).
- **Admin overview:** Loads protected endpoints only when `hasAccess` allows; uses `unwrapList` for paginated routes.
- **Admin student projects:** `GET /api/student-projects/all` with auth; table **Status** column; **pending** rows sorted last (by `createdAt`); **Publication status** (`pending` / `approved`) via `<select>` on **add** and **edit** (replaces approval-only checkbox); admin create uses public `POST` with full payload including `status`; `normalizeProject` clamps unknown statuses for the form.
- **`App.jsx`:** API warm-up uses `GET /health`.
- **`Admin.jsx`:** Demo credentials hint only in development (`import.meta.env.DEV`).
- **Public pages:** `Events.jsx`, `StorePage.jsx`, `Gallery.jsx`, `StudentProjectsPage.jsx` use `unwrapList` and sensible query limits where helpful.
- **`Leadership.jsx`:** `fetchApi("/api/leadership")`; safe icon (`User` fallback) and image placeholder for API-shaped records.
- **`ResourcesPage.jsx`:** Safer handling of grouped API resources and stable `id` for list keys.
- **`News.jsx` (home):** Loads **published** + **public** announcements from `GET /api/announcements`, sorted newest first; loading / error / empty states (no mock list).
- **`StudentProjectsPage.jsx`:** API-only list from `GET /api/student-projects` (no mock fallback); loading / error / empty UI; optional links only when URLs exist; `submittedBy` when present.
- **Student project submissions:** New submissions use **`pending`** (not `draft`), aligned with the API and admin list ordering.
- **Admin Forms and UI layout:** Made sidebar unscrollable, ensured easily readability in leadearship, store and resource forms.

- **Admin dashboard file layout:** Route screens live under `src/pages/admin/views/`; shared **sidebar** and shell under `src/pages/admin/layout/` (`AdminShell`, `AdminSidebar`, `AdminNavLinks`, `adminNavConfig.js`); JWT/session context under `context/`; static seeds and CSV helpers under `lib/`. `App.jsx` imports admin views from `pages/admin/views/…`. Desktop and small screens use the same nav definition so every admin page stays consistent.

### Component layout (maintainability)

- **`src/components/home/`** — Everything used primarily by the public home page: `about`, `welcome`, `patrons`, `programs`, `statistics`, `contact`, `events`, `news`, `hero-section`. Keeps home concerns in one module.
- **`src/components/shared/`** — Site-wide chrome: `navbar`, `footer`, `xlogo`. `RouteLayout.jsx`, `Executives.jsx`, and home hero/social blocks import from here; relative imports inside moved files were updated (e.g. hero → `shared/xlogo`, home `events` / `news` → `../../../utils/api`).
- **`src/components/store/`** — Unchanged pattern: store-specific UI stays under the store module (e.g. store navbar separate from global `shared/navbar`).
- **Consumers:** `Home.jsx` imports from `components/home/...`; `RouteLayout.jsx` and `Executives.jsx` import layout from `components/shared/...`.
- **`ADMIN_BACKEND_INTEGRATION.md`:** Example path for public events updated to `src/components/home/events/Events.jsx`.

### Fixed / corrected

- Student submit payload status corrected from **`draft`** to **`pending`** to match API vocabulary.

---

## Maintenance notes

- Configure **`VITE_API_BASE_URL`** in `.env` / hosting (points at the ACSES API, e.g. `http://localhost:3002` in development).
- When you ship more changes in chat or in PRs, append bullets under **`[Unreleased]`** (or add a new dated section when you tag a release).

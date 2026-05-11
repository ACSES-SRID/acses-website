# ACSES Website and CDN Documentation

Last reviewed: 2026-05-11

## 1. Project Overview

This workspace contains two related projects:

- `acses-cdn`: an Express server that serves static images from `public/` and exposes JSON API routes backed by MongoDB.
- `acses-website/acses-website`: a Vite + React frontend for the public ACSES website and its admin dashboard.

The current direction is to move the website from mostly static data toward a MongoDB-backed admin-managed site. The frontend already calls many API endpoints, but it still keeps static fallback data for public pages and some forms remain UI-only.

## 2. Folder Structure

```text
General website/
  acses-cdn/
    api/
      announcements.js
      auth.js
      events.js
      executives.js
      gallery.js
      home.js
      leadership.js
      mongodb.js
      resources.js
      routes.js
      store.js
      student-projects.js
      users.js
    public/
      gallery/
    index.js
    server.js
    package.json

  acses-website/
    README.md
    package-lock.json
    acses-website/
      public/
      src/
        components/
        data/
        layouts/
        pages/
        utils/
      dist/
      package.json
      vite.config.js
      vercel.json
```

Note: the actual React app is nested under `acses-website/acses-website`. The outer `acses-website` folder is mostly a wrapper with README/package-lock.

## 3. ACSES CDN / API

### Purpose

Despite the name, `acses-cdn` is no longer only a CDN. It now does three jobs:

- Serves static files from `acses-cdn/public`.
- Provides REST-style JSON endpoints under `/api`.
- Connects to MongoDB using `MONGODB_URI`.

### Runtime

Start command:

```bash
npm start
```

Default port:

```text
3002
```

Required environment variables:

```text
MONGODB_URI
ADMIN_PASSWORD
CORS_ORIGIN
PORT
```

`CORS_ORIGIN` is optional in code, but should be set in production to the frontend domain.

### Main Server Files

- `server.js`: current main server. Enables compression, CORS, JSON parsing, API routes, and static file serving.
- `index.js`: older image-server-only entry point on port `4000`. This appears legacy and should either be removed or clearly documented as a separate static-only server.

### API Endpoints

All current endpoints are mounted under `/api`:

| Route | Collection / Purpose |
| --- | --- |
| `/api/auth/login` | Password-only admin login check using `ADMIN_PASSWORD`; currently not used by the main frontend admin login |
| `/api/leadership` | CRUD for `acses-website.leadership` |
| `/api/executives` | CRUD for `acses.executives`; uses a different database name from the rest |
| `/api/events` | CRUD for `acses-website.events` |
| `/api/announcements` | CRUD for `acses-website.announcements` |
| `/api/resources` | CRUD for `acses-website.resources`; GET returns grouped `academic`, `tools`, and `career` arrays |
| `/api/store` | CRUD for `acses-website.store` |
| `/api/gallery` | CRUD for `acses-website.gallery` |
| `/api/student-projects` | CRUD for `acses-website.studentProjects` |
| `/api/users` | CRUD for `acses-website.users` |
| `/api/home` | Single-record home page content and statistics |

### Important Backend Issues

- There is no real route protection. Anyone who can reach the API can create, update, or delete content if they know the endpoints.
- Admin users are stored and compared with plain-text passwords through `/api/users` and `AdminContext.jsx`.
- `/api/auth/login` uses bcrypt but is disconnected from the main admin login flow.
- `executives.js` uses database `acses`, while most routes use `acses-website`. This inconsistency can cause missing or duplicated leadership data.
- There is minimal validation. Most routes accept request bodies directly and write them to MongoDB.
- Delete requests expect JSON bodies, which can be awkward across clients and proxies. Prefer resource URLs such as `DELETE /api/events/:id`.
- Image upload is not implemented. Admin forms store image URLs only.
- Error responses hide useful debugging context and do not consistently validate bad IDs before creating `ObjectId`.

## 4. ACSES Website Frontend

### Purpose

The React app provides:

- Public ACSES pages.
- A store/cart browsing experience.
- Student project showcase.
- A browser-based admin dashboard for managing website content.
- PWA support through `vite-plugin-pwa`.
- Vercel Analytics.

### Runtime

Development:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

Required frontend environment variable:

```text
VITE_API_BASE_URL
```

Default fallback API URL in code:

```text
http://localhost:3002
```

### Public Routes

Defined in `src/App.jsx`:

| Route | Purpose |
| --- | --- |
| `/` | Home page with hero, welcome, about, programs, statistics, patrons, events, news, contact |
| `/leadership` | Leadership/executive listing |
| `/programs` | Programs page |
| `/resources` | Academic/career/tools resources |
| `/store` | Product listing, filters, cart, checkout modal |
| `/gallery` | Event/activity gallery |
| `/student-projects` | Student project showcase |
| `/submit-project` | Project submission form UI |
| `*` | 404 page |

### Admin Routes

Also defined in `src/App.jsx`:

| Route | Purpose |
| --- | --- |
| `/admin` | Overview dashboard |
| `/admin/events` | Manage events |
| `/admin/executives` | Points to `AdminLeadership` |
| `/admin/leadership` | Manage leadership |
| `/admin/announcements` | Manage announcements/news |
| `/admin/resources` | Manage resources |
| `/admin/store` | Manage store products |
| `/admin/gallery` | Manage gallery items |
| `/admin/student-projects` | Manage student projects |
| `/admin/users` | Manage admin users |
| `/admin/home-editor` | Manage home messages/statistics |

### Frontend Data Flow

The frontend uses `src/utils/api.js` as the main API helper:

```js
VITE_API_BASE_URL || "http://localhost:3002"
```

Several pages fetch API data and fall back to static local data if the API fails:

- Store falls back to `src/data/storeData.js`.
- Student projects fall back to mock data inside `StudentProjectsPage.jsx`.
- Resources fall back to `src/data/ResourcesData.jsx`.
- Gallery falls back to `src/pages/gallery/galleryItems.js`.
- Leadership falls back to `src/pages/executives/executiveList.js`.
- Events falls back to `src/data/events.js`.

Admin pages mostly write directly to the API.

## 5. Current Verification Status

Build result:

- `npm.cmd run build` succeeds.
- Vite reports a large JavaScript chunk around 1.1 MB after minification.
- PWA build warns that `theme_color` is missing from the web manifest.

Lint result:

- `npm.cmd run lint` fails with 247 errors and 7 warnings.
- Most errors are unused React imports and missing prop validation.
- One functional lint error stands out: `AdminLeadership.jsx` references `BlockedAccess`, but that component is not imported or defined.

## 6. Completed / Working Areas

- Public routing is set up with React Router.
- Home, leadership, resources, store, gallery, events, and student project pages exist.
- Admin dashboard shell exists with login screen, sidebar navigation, search state, notifications, toast, and confirmation modal.
- MongoDB-backed CRUD endpoints exist for most content types.
- Admin screens exist for events, announcements, leadership, resources, store, gallery, student projects, users, and home content.
- Store has a working local cart, quantity updates, checkout modal, and success modal.
- PWA build is configured and service worker output is generated.
- Static images and logos are included in both frontend `public/` and CDN `public/`.

## 7. Uncompleted Tasks

### Security and Authentication

- Replace plain-text admin password matching with a real authentication flow.
- Hash user passwords before saving them.
- Use `/api/auth/login` or replace it with a proper username/password login endpoint.
- Add sessions or JWT access tokens.
- Protect all create/update/delete API routes.
- Enforce admin roles on the backend, not only in React.
- Remove test credentials from the visible admin login page before production.

### API Completion

- Normalize database names. Use one database, probably `acses-website`, for all collections.
- Add request validation for all POST/PUT routes.
- Add consistent IDs and route patterns, for example:

```text
GET /api/events
POST /api/events
PUT /api/events/:id
DELETE /api/events/:id
```

- Add pagination/filtering where collections can grow, especially gallery, events, products, and projects.
- Add proper logging for server errors.
- Add seed scripts for initial users and public content.

### Frontend Integration

- Wire `/submit-project` to actually submit to `/api/student-projects`.
- Decide whether submitted projects should be public immediately or require admin approval.
- Complete API fallback behavior consistently. Some files use `fetchApi`, while others use raw `fetch` with `import.meta.env.VITE_API_BASE_URL`.
- Fix `AdminLeadership.jsx` missing `BlockedAccess`.
- Connect checkout to a real order flow if store orders need to be tracked.
- Add loading, empty, and error states consistently across public pages.

### Admin UX

- Add image upload or asset picker instead of requiring raw image URLs.
- Add validation messages on admin forms.
- Add consistent success/failure feedback after API actions.
- Add pagination for large admin tables.
- Make role permissions clear and enforce them server-side.
- Consider audit fields such as `createdBy`, `updatedBy`, `createdAt`, and `updatedAt` on all collections.

### Quality and Maintainability

- Fix lint errors.
- Remove unused React imports where not needed by the current JSX transform.
- Add PropTypes or disable `react/prop-types` if the project does not want runtime prop validation.
- Split oversized frontend bundle with route-level lazy loading.
- Remove or ignore generated `dist/` and dependency folders if they should not be committed.
- Clean README character encoding issues where emoji/text appears corrupted.
- Remove duplicate/legacy files such as `acses-cdn/index.js` if no longer needed.

### Testing

- Add backend route tests for CRUD handlers.
- Add frontend smoke tests for public pages and admin login.
- Add form tests for admin create/edit/delete flows.
- Add a build/lint check to deployment or CI.

## 8. Recommended Priority Order

1. Fix admin/API security first: hashed passwords, token/session login, protected write routes.
2. Fix `AdminLeadership.jsx` runtime issue and complete lint cleanup enough for CI.
3. Wire `SubmitProjectPage.jsx` to the API and add approval status for submitted projects.
4. Normalize backend database and collection usage.
5. Add validation and consistent REST route patterns.
6. Add image upload or a managed asset workflow.
7. Improve bundle size with lazy-loaded routes and admin-only chunks.
8. Add tests and CI checks.

## 9. Deployment Notes

Frontend:

- Intended deployment appears to be Vercel.
- `vercel.json` supports SPA fallback routing.
- `VITE_API_BASE_URL` must point to the deployed CDN/API server.

Backend:

- Needs a Node host that supports Express and MongoDB connections.
- Production must define `MONGODB_URI`, `ADMIN_PASSWORD`, and restrictive `CORS_ORIGIN`.
- If hosted on a sleeping/free server, the frontend currently wakes it by fetching `/api/leadership`.

## 10. Key Risks Before Production

- The admin API is writable without authentication.
- Admin passwords are handled as plain text in the active login flow.
- Public admin login displays test accounts.
- The project submission form does not submit data.
- Lint currently fails heavily.
- Generated build artifacts and dependencies appear present in the workspace, which makes the project heavier and harder to review.

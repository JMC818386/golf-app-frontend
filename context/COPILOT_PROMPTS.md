# Copilot Agent Prompts for Migration

Copy/paste these prompts into VS Code Copilot (Claude Sonnet 4) to execute the migration steps.

---

## Prompt 1 — Monorepo merge + root orchestration

```
You are pair-programming in VS Code inside my Clover Golf App repo.

TASK: Convert my project into a single monorepo with:
- /frontend (React) and /backend (Django)
- a ROOT package.json that orchestrates both
- docker-compose for local Postgres
- one-command local dev workflow

DO THIS:
1) Inspect current repo structure. Create /backend if it does not exist and move/import the Django backend code into /backend (preserve git history where possible).
2) At repo root, create or update:
   - package.json with scripts:
     - "dev" runs backend + frontend concurrently
     - "dev:frontend" runs Vite dev server in /frontend
     - "dev:backend" runs Django server in /backend
     - "setup" installs frontend deps and prints backend setup instructions
   - docker-compose.yml for Postgres 15 with port 5432 and POSTGRES_PASSWORD=postgres
   - .env.example at repo root describing required env vars for backend and frontend
3) Ensure backend uses DATABASE_URL and local docker-compose Postgres.
4) Ensure backend runs at http://localhost:8000 and serves API under /api/.

OUTPUT REQUIRED:
- The exact file diffs/created files.
- Any commands I should run after your changes.

CONSTRAINTS:
- Do not break existing API routes or JWT auth endpoints.
- Do not hardcode secrets in repo.
```

---

## Prompt 2 — CRA → Vite migration (frontend modernization)

```
TASK: Migrate the /frontend app from Create React App (react-scripts) to Vite (modern React).

DO THIS:
1) Detect whether /frontend is CRA. If yes:
   - Replace CRA tooling with Vite React template
   - Preserve existing src/ components/routes/context/services/assets
2) Update entrypoints:
   - CRA index.js -> Vite main.jsx
3) Convert env vars:
   - REACT_APP_* -> VITE_*
   - Replace process.env usage with import.meta.env
4) Add Vite dev server proxy:
   - proxy /api -> http://localhost:8000
5) Update build output:
   - Vite uses dist/
6) Update Firebase hosting config (if present) to serve dist instead of build.

OUTPUT REQUIRED:
- Updated /frontend/package.json
- vite.config.(js|ts) with proxy
- A short checklist to verify Login, Register, RoundSetup, Round, RoundHistory

CONSTRAINTS:
- Keep React Router routes working.
- Do not rewrite business logic unless required.
```

---

## Prompt 3 — API layer consolidation (no more axios spaghetti)

```
TASK: Standardize the frontend API layer.

DO THIS:
1) Create /frontend/src/lib/api/client.(ts|js):
   - axios instance
   - baseURL = "/api"
   - auth header injection from localStorage
   - refresh token flow compatible with existing backend endpoints:
     - POST /api/token/refresh/
2) Create feature APIs:
   - /frontend/src/lib/api/authApi
   - /frontend/src/lib/api/coursesApi
   - /frontend/src/lib/api/roundsApi
   - /frontend/src/lib/api/holesApi
   - /frontend/src/lib/api/holeScoresApi
3) Refactor UI components to use these modules only.
4) Remove direct axios calls from components.

OUTPUT REQUIRED:
- file list changed
- confirm RoundSetup, Round, RoundHistory still function

CONSTRAINTS:
- Keep existing localStorage token format stable.
```

---

## Prompt 4 — Design tokens → CSS architecture + component cleanup

```
TASK: Implement a tokens-first CSS architecture suitable for Figma Variables/Tokens.

DO THIS:
1) Create /frontend/src/styles/ structure:
   - tokens/tokens.css (primitives)
   - tokens/tokens.semantic.css (semantic aliases)
   - base/typography.css, base/layout.css
   - components/button.css, forms.css, card.css, nav.css
   - index.css to import all
2) Populate tokens using current palette:
   - #314035, #46594B, #698C75, #F2EFDF, #F2A74B
3) Refactor repeated CSS patterns into token-based classes.
4) Update components to reference semantic tokens (no raw hex scattered).
5) Consolidate repeated UI:
   - shared Spinner component
   - shared EmptyState component
   - extract shared Auth layout components

OUTPUT REQUIRED:
- new style files
- before/after examples in 1-2 key components (Login + Round)
```

---

## Prompt 5 — "It runs on my machine" proof (end-to-end dev script)

```
TASK: Make local dev dead simple.

DO THIS:
1) Ensure repo root command works:
   - npm run dev
2) Add a root README section:
   - prerequisites (node, python, docker)
   - step-by-step setup
   - common issues
3) Add a /scripts/verify-dev.(sh|ps1) that:
   - checks docker running
   - checks backend env file exists
   - checks Postgres reachable
   - prints next actions

OUTPUT REQUIRED:
- README changes
- verify script
```

---

## Important Notes

### Firebase Hosting Build Output
When migrating CRA → Vite, update `firebase.json`:
- CRA uses: `"public": "build"`
- Vite uses: `"public": "dist"`

Without this change, Firebase Hosting will deploy successfully but serve nothing.

### Database Configuration
Your production backend on App Engine is currently using SQLite (read-only filesystem error). It needs:
- DATABASE_URL environment variable pointing to Cloud SQL PostgreSQL
- Cloud SQL connection string: `postgresql://pocketpro-user:PASSWORD@/pocketpro?host=/cloudsql/pocket-pro-api:us-central1:pocket-pro-db`

### Current Production Backend Issue
The backend is using SQLite instead of PostgreSQL. To fix:
1. Add DATABASE_URL to App Engine environment variables
2. Or update backend settings.py to use Cloud SQL connector
3. Redeploy backend after configuration change

# Monorepo Architecture & Dev Orchestration

## Standardized Paths
- frontend/ : Vite React app
- backend/  : Django project + scoretracker app
- infra/    : (optional) deployment + scripts later

## Root Scripts (single command dev)
We will use root package.json scripts to run:
- frontend dev server (Vite)
- backend dev server (Django runserver)
- Postgres via docker-compose

## Local Ports
- FE: http://localhost:5173
- BE: http://localhost:8000
- DB: localhost:5432

## Proxy Strategy (dev)
Vite dev server proxies `/api` to the backend:
- FE calls: /api/...
- Vite proxies -> http://localhost:8000/api/...
This keeps frontend services clean and avoids hardcoding hostnames.

## Environment Files
- /frontend/.env.development.local  (VITE_API_BASE=/api)
- /backend/.env                     (SECRET_KEY, DATABASE_URL, DEBUG)

## Deployment Notes (unchanged intent)
- Firebase Hosting for frontend (SPA rewrites)
- Google App Engine for Django backend

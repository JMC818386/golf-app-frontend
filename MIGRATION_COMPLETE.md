# Golf App Monorepo - Setup Complete! 🎉

## What's Been Done

✅ **Monorepo Structure** - Root package.json with dev orchestration
✅ **Docker Compose** - Local PostgreSQL database
✅ **Vite Migration** - Replaced CRA with modern Vite tooling
✅ **API Layer** - Centralized API clients (auth, courses, rounds, holes, holeScores)
✅ **Design Tokens** - Token-based CSS architecture
✅ **Shared Components** - Spinner, EmptyState, AuthLayout

## Next Steps

### 1. Install Dependencies & Test

```bash
# From repo root
npm install

# Start database
npm run db:up

# Start dev servers (frontend + backend)
npm run dev
```

### 2. Update Components to Use New API Layer

Replace old imports in your components:

**Before:**
```javascript
import AuthService from '../../services/auth.service';
```

**After:**
```javascript
import { authApi } from '../../lib/api';
```

Example updates needed:
- Login.js → use `authApi.login()`
- Register.js → use `authApi.register()`
- RoundSetup.js → use `roundsApi.createRound()`
- RoundHistory.js → use `roundsApi.getRounds()`

### 3. Apply Design Tokens

Import the new styles in your main.jsx:

```javascript
import './styles/index.css';
```

Then update components to use token-based classes instead of inline styles.

### 4. Backend Integration

You still need to:
1. Get your Django backend code
2. Put it in `/backend` directory
3. Add `requirements.txt`, `manage.py`, etc.
4. Configure to use PostgreSQL from docker-compose

## Current Production Issue

Your App Engine backend is using SQLite (read-only filesystem error). To fix:

1. Access App Engine → Settings → Environment Variables
2. Add: `DATABASE_URL=postgresql://pocketpro-user:PASSWORD@/pocketpro?host=/cloudsql/pocket-pro-api:us-central1:pocket-pro-db`
3. Or find backend repo and redeploy with proper database config

## Files Created

### Root Level
- `/package.json` - Dev orchestration scripts
- `/docker-compose.yml` - PostgreSQL 15
- `/.env.example` - Environment variable template

### Frontend
- `/frontend/vite.config.js` - Vite configuration with API proxy
- `/frontend/index.html` - Vite entry HTML
- `/frontend/src/main.jsx` - App entry point (was index.js)
- `/frontend/src/lib/api/` - Centralized API clients
- `/frontend/src/styles/` - Token-based design system
- `/frontend/src/components/shared/` - Reusable components
- Updated package.json for Vite
- Updated firebase.json for `dist/` output

### Documentation
- `/context/` - 8 architecture guides + prompts
- `/context/COPILOT_PROMPTS.md` - Copy/paste agent prompts

## Architecture Overview

```
Frontend (Vite + React)
  ↓ /api proxy
Backend (Django REST)
  ↓
PostgreSQL (Docker locally, Cloud SQL in production)
```

All `/api` calls in frontend are proxied to `localhost:8000` in dev, or handled by your hosting config in production.

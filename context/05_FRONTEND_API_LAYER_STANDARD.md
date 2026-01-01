# Frontend API Layer Standard (Post-Migration)

## Requirements
- Centralized request client (axios instance)
- Auth header injection from stored tokens
- Auto-refresh on 401 token_not_valid where applicable
- Single source of truth for API base path:
  - dev/prod should both use `/api` on the FE side
  - Vite proxy handles local -> backend mapping

## Rules
- Never hardcode http://localhost:8000 inside UI components.
- All API calls go through /src/lib/api/client.ts (or .js)
- Feature modules use typed wrappers:
  - authApi.login/register/refresh
  - roundsApi.createRound/getRounds/...
  - coursesApi.getCourses
  - holesApi.getHolesForCourse
  - holeScoresApi.create

## Error Handling
- Normalize errors (status, message, field errors)
- UI components only render user-friendly messages and states

## Token Storage
- Keep localStorage storage format stable to avoid breaking existing sessions.

# CRA -> Vite Migration Plan (React)

## Why
CRA/react-scripts is legacy. We migrate to Vite for faster dev server, modern config, smaller tooling surface.

## Migration Steps (high level)
1. Create /frontend-vite (temporary) using Vite React template.
2. Move src/ + public/ assets from CRA into Vite structure.
3. Replace CRA entry:
   - CRA: src/index.js -> Vite: src/main.jsx
4. Ensure React Router works under Vite.
5. Update environment variables:
   - CRA: process.env.REACT_APP_*
   - Vite: import.meta.env.VITE_*
6. Implement Vite dev proxy for /api calls.
7. Remove CRA dependencies (react-scripts, CRA-only config).
8. Rename /frontend-vite -> /frontend once validated.

## "Gotchas"
- Paths/imports: confirm any absolute import assumptions.
- Build output dir:
  - CRA: build/
  - Vite: dist/
  Update Firebase hosting public directory accordingly.

## Acceptance Criteria
- `npm run dev` at repo root starts FE + BE.
- Login/Register flow works end-to-end.
- RoundSetup/Round/RoundHistory API calls succeed via proxy.
- Production build works and can be deployed to Firebase Hosting.

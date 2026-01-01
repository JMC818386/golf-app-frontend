# Clover Golf App — Unified Full-Stack Monorepo (Overview)

## Goal
Unify the current React frontend and Django backend into a single monorepo so local dev + CI/CD can run from ONE repo and ONE set of root scripts.

## Target Monorepo Layout
/
  backend/          # Django REST API (SimpleJWT) + Postgres
  frontend/         # React + Vite app
  package.json      # root scripts orchestrating FE + BE
  docker-compose.yml# local Postgres
  README.md
  .gitignore
  .env.example
  context/          # this documentation

## Existing System (from documentation)
- Frontend: React (currently CRA / react-scripts) with React Router, Axios, JWT handling, Bootstrap.
- Backend: Django REST + SimpleJWT, custom user model, Postgres.
- Local API: http://localhost:8000/api/
- Prod API: App Engine URL
- Frontend hosting: Firebase Hosting with SPA rewrites
- Local DB: docker-compose Postgres 15

## Key Constraints
- Keep API contract stable: /api/, /user/login/, /user/signup/, /token/refresh/, plus router viewsets for courses/holes/rounds/hole-scores.
- Maintain JWT refresh behavior in the frontend service layer.
- Keep Postgres-based dev workflow.

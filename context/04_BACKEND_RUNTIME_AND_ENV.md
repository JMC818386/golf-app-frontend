# Django Backend Runtime (Local + Prod)

## Local DB
Use docker-compose Postgres 15.
DATABASE_URL example:
postgresql://postgres:postgres@localhost:5432/golf_db

## Local Setup Workflow
1) python -m venv venv
2) pip install -r requirements.txt
3) docker-compose up -d
4) create backend/.env with:
   SECRET_KEY=...
   DATABASE_URL=...
   DEBUG=True
5) python manage.py migrate
6) python manage.py loaddata scoretracker/fixtures/course.json
7) python manage.py loaddata scoretracker/fixtures/holes.json
8) python manage.py runserver

## CORS/CSRF Expectations
- Dev: allow localhost + broader dev origins
- Prod: configured via APPENGINE_URL + regex patterns for Firebase hosting domains

## Auth
- SimpleJWT token endpoints:
  - POST /api/user/login/
  - POST /api/token/refresh/
  - POST /api/user/signup/
- Tokens are long-lived in current config (days)

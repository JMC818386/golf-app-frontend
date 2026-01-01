# One-Repo Runbook (Commands)

## First-time setup
- npm install (root)
- python -m venv venv (backend) + pip install -r requirements.txt
- docker-compose up -d (root)
- backend migrations + fixtures

## Daily dev
- npm run dev   # FE + BE
- npm run dev:frontend
- npm run dev:backend

## Build
- npm run build:frontend
- (optional) backend collectstatic + deploy steps

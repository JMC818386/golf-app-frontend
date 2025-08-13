# Golf App Monorepo

This repository contains both the frontend (React) and backend (Django) for the Golf App.

## Structure

- `frontend/` - React application 
- `backend/` - Django API

## Development

### Prerequisites
- Node.js 16+
- Python 3.8+
- pip

### Quick Start

1. Install all dependencies:
```bash
npm run setup
```

2. Start both frontend and backend:
```bash
npm run dev
```

This will start:
- Frontend on http://localhost:3000
- Backend on http://localhost:8000

### Individual Services

Start only frontend:
```bash
npm run dev:frontend
```

Start only backend:
```bash
npm run dev:backend
```

## Adding the Backend

To add your GOLF-APP backend to this monorepo:

1. Clone or copy your backend repository into the `backend/` folder
2. Install backend dependencies: `npm run install:backend`
3. Start the full stack: `npm run dev`

## Deployment

The frontend and backend can be deployed together or separately as needed.
# Golf App Deployment Guide

## Overview
Your golf app consists of two parts:
1. **Frontend**: React app hosted on Firebase
2. **Backend**: Django API hosted on Google App Engine

## Prerequisites
1. Google Cloud SDK installed (`gcloud` command)
2. Firebase CLI installed
3. Access to your Google Cloud Project: `pocket-pro-api`

## Frontend Deployment (Firebase)

### Option 1: Automatic Deployment Script
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (if not already done)
npm install

# Build the production version
npm run build

# Deploy to Firebase (you'll need to login first)
firebase login
firebase use pocket-pro-api  # or your Firebase project ID
firebase deploy
```

### Option 2: Manual Upload
1. Build the frontend: `npm run build`
2. Upload the `build/` folder contents to your Firebase hosting

## Backend Deployment (Google App Engine)

### Option 1: Using gcloud CLI
```bash
# Navigate to backend directory
cd backend

# Deploy to App Engine
gcloud app deploy app.yaml

# If you have database migrations:
gcloud app deploy app.yaml --stop-previous-version
```

### Option 2: Manual via Google Cloud Console
1. Zip the entire `backend/` directory
2. Go to Google Cloud Console → App Engine
3. Upload and deploy the zip file

## Environment Variables
Make sure these are set in your production environment:

### Backend (app.yaml)
- `APPENGINE_URL`: pocket-pro-api.ue.r.appspot.com
- `DATABASE_URL`: Your PostgreSQL connection string
- `SECRET_KEY`: Your Django secret key

### Frontend (automatically handled)
- Production API URL: `https://pocket-pro-api.ue.r.appspot.com/api/`
- Development API URL: `http://localhost:8000/api/`

## Verification
After deployment:
1. Frontend should be accessible at your Firebase hosting URL
2. Backend API should be accessible at: `https://pocket-pro-api.ue.r.appspot.com/api/`
3. Test registration and login functionality

## Files Updated in This Session
- Fixed registration button (removed disabled state)
- Fixed login error handling
- Updated frontend to use production API in production builds
- Both frontend and backend are ready for deployment

## Quick Deploy Commands
```bash
# Frontend only
cd frontend && npm run build && firebase deploy

# Backend only  
cd backend && gcloud app deploy

# Both (run in sequence)
cd frontend && npm run build && firebase deploy && cd ../backend && gcloud app deploy
```

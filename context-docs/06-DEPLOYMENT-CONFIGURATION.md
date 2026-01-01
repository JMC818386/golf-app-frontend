# PocketPro - Deployment & Configuration

## Deployment Architecture

```
┌─────────────────────────────────────┐
│         User Browser                │
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│    Firebase Hosting (Frontend)      │
│  https://[project-id].web.app       │
└──────────────┬──────────────────────┘
               │
               │ HTTPS API Calls
               ↓
┌─────────────────────────────────────┐
│  Google App Engine (Backend API)    │
│  pocket-pro-api.ue.r.appspot.com    │
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│    Cloud PostgreSQL Database        │
└─────────────────────────────────────┘
```

---

## Frontend Deployment (Firebase)

### Firebase Configuration

**File**: `/frontend/firebase.json`

```json
{
  "hosting": {
    "public": "build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

**Configuration Details**:
- **public**: `build` - Serves production build directory
- **ignore**: Firebase-specific files and dependencies
- **rewrites**: SPA routing - all routes serve index.html

---

### Deployment Commands

#### Option 1: Automatic Deployment Script

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (if not already done)
npm install

# Build the production version
npm run build

# Deploy to Firebase (login required)
firebase login
firebase use pocket-pro-api
firebase deploy
```

---

#### Option 2: Manual Upload

```bash
# 1. Build the frontend
npm run build

# 2. Upload the build/ folder contents to Firebase hosting
# Via Firebase Console or CLI
```

---

### Build Process

**Command**: `npm run build`

**What It Does**:
1. Compiles React app for production
2. Minifies JavaScript and CSS
3. Optimizes images and assets
4. Generates static files in `/frontend/build/`
5. Creates asset manifest
6. Configures service worker (if enabled)

**Output Structure**:
```
build/
├── index.html
├── manifest.json
├── robots.txt
├── asset-manifest.json
└── static/
    ├── css/
    │   └── main.82e68781.css
    ├── js/
    │   ├── main.9b435f57.js
    │   └── main.9b435f57.js.LICENSE.txt
    └── media/
        └── [image assets]
```

---

### Environment Configuration

**Development**:
- API URL: `http://localhost:8000/api/`
- Hot reload enabled
- Source maps enabled
- Debugging tools active

**Production**:
- API URL: `https://pocket-pro-api.ue.r.appspot.com/api/`
- Code minified
- Source maps disabled
- Optimized bundle size

**Automatic Switching** (auth.constants.js):
```javascript
export const API_URL = process.env.NODE_ENV === 'development'
    ? LOCAL_API_URL
    : PROD_API_URL;
```

---

### Firebase Project Details

**Project ID**: `pocket-pro-api`
**Region**: Default (US)
**Hosting URL**: `https://pocket-pro-api.web.app` (or similar)

**Firebase CLI Installation**:
```bash
npm install -g firebase-tools
```

**Login to Firebase**:
```bash
firebase login
```

**Select Project**:
```bash
firebase use pocket-pro-api
```

---

## Backend Deployment (Google App Engine)

### Backend Technology
- **Framework**: Django (Python)
- **API Type**: RESTful with JWT authentication
- **Database**: Cloud PostgreSQL
- **Hosting**: Google App Engine (Standard Environment)

---

### Deployment Commands

#### Option 1: Using gcloud CLI

```bash
# Navigate to backend directory
cd backend

# Deploy to App Engine
gcloud app deploy app.yaml

# With database migrations
gcloud app deploy app.yaml --stop-previous-version
```

---

#### Option 2: Manual via Google Cloud Console

1. Zip the entire `backend/` directory
2. Go to Google Cloud Console → App Engine
3. Upload and deploy the zip file

---

### Backend Configuration (app.yaml)

**Typical Django app.yaml structure**:
```yaml
runtime: python39
entrypoint: gunicorn -b :$PORT myproject.wsgi:application

env_variables:
  APPENGINE_URL: "pocket-pro-api.ue.r.appspot.com"
  DATABASE_URL: "postgres://user:password@host/dbname"
  SECRET_KEY: "your-django-secret-key"
  DEBUG: "False"

automatic_scaling:
  min_instances: 0
  max_instances: 10
```

---

### Environment Variables

#### Backend (Set in app.yaml or Cloud Console)

| Variable | Value | Purpose |
|----------|-------|---------|
| `APPENGINE_URL` | `pocket-pro-api.ue.r.appspot.com` | App Engine domain |
| `DATABASE_URL` | PostgreSQL connection string | Database connection |
| `SECRET_KEY` | Django secret key | Security |
| `DEBUG` | `False` | Disable debug mode |
| `ALLOWED_HOSTS` | `pocket-pro-api.ue.r.appspot.com` | Django security |

---

#### Frontend (Handled Automatically)

| Variable | Dev Value | Prod Value |
|----------|-----------|------------|
| `NODE_ENV` | `development` | `production` |
| `API_URL` | `http://localhost:8000/api/` | `https://pocket-pro-api.ue.r.appspot.com/api/` |

---

## Database Configuration

### Production Database
- **Type**: Cloud SQL (PostgreSQL)
- **Connection**: Via App Engine built-in connector
- **Backups**: Automatic daily backups
- **SSL**: Enforced connections

### Database Migrations

**Before Deployment**:
```bash
# Generate migrations locally
python manage.py makemigrations

# Test locally
python manage.py migrate

# Include migrations in deployment
```

**After Deployment**:
```bash
# Run migrations on App Engine
gcloud app deploy app.yaml
# Migrations run automatically via startup script
```

---

## Deployment Workflow

### Complete Deployment Process

```bash
# 1. Frontend Deployment
cd frontend
npm run build
firebase deploy

# 2. Backend Deployment
cd ../backend
gcloud app deploy

# 3. Verify
# Test frontend: https://[firebase-url]
# Test API: https://pocket-pro-api.ue.r.appspot.com/api/
```

---

### Quick Deploy Commands

**Root package.json** provides shortcuts:

```json
{
  "scripts": {
    "dev:frontend": "cd frontend && npm start",
    "build:frontend": "cd frontend && npm run build",
    "install:frontend": "cd frontend && npm install",
    "install:backend": "cd backend && python3 -m pip install -r requirements.txt",
    "dev": "concurrently \"npm run dev:frontend\" \"npm run dev:backend\"",
    "dev:backend": "cd backend && python3 manage.py runserver 8000",
    "setup": "npm run install:frontend && npm run install:backend"
  }
}
```

**Usage**:
```bash
# Setup all dependencies
npm run setup

# Run full stack locally
npm run dev

# Build frontend for production
npm run build:frontend
```

---

## Verification Steps

### After Deployment

1. **Frontend Verification**:
   - Visit Firebase hosting URL
   - Test login/register
   - Check console for errors
   - Verify API calls work

2. **Backend Verification**:
   - Hit API endpoint directly
   - Test authentication endpoints
   - Check database connections
   - Review logs in Cloud Console

3. **Integration Testing**:
   - Complete user registration flow
   - Create a round
   - Track scores
   - View round history

---

## Monitoring & Logs

### Frontend Logs (Firebase)

```bash
# View hosting logs
firebase hosting:logs

# View function logs (if using Cloud Functions)
firebase functions:log
```

**Console Access**:
- Firebase Console → Hosting → Usage
- View bandwidth, requests, errors

---

### Backend Logs (App Engine)

```bash
# View recent logs
gcloud app logs tail -s default

# View logs in console
# Google Cloud Console → App Engine → Logs
```

**Log Types**:
- Request logs (access logs)
- Application logs (print/console.log)
- Error logs (exceptions)
- System logs (startup, scaling)

---

## Rollback Procedures

### Frontend Rollback

```bash
# View deployment history
firebase hosting:versions:list

# Rollback to previous version
firebase hosting:rollback
```

---

### Backend Rollback

```bash
# List versions
gcloud app versions list

# Switch traffic to previous version
gcloud app services set-traffic default --splits=v1=1

# Delete bad version
gcloud app versions delete v2
```

---

## Cost Considerations

### Firebase Hosting

**Free Tier**:
- 10 GB storage
- 360 MB/day data transfer
- SSL certificate included

**Pricing**: Pay-as-you-go after free tier

---

### Google App Engine

**Standard Environment**:
- Free tier: 28 instance hours/day
- $0.05/hour after free tier
- Automatic scaling reduces costs

**Database**:
- Cloud SQL pricing varies by instance size
- Typically $10-50/month for small apps

---

## Security Configuration

### HTTPS Enforcement

**Firebase**:
- Automatic HTTPS on all hosting
- SSL certificates managed by Firebase

**App Engine**:
- HTTPS enforced by default
- Custom domain SSL via Google-managed certificates

---

### CORS Configuration

**Backend Django Settings**:
```python
CORS_ALLOWED_ORIGINS = [
    "https://pocket-pro-api.web.app",
    "https://pocket-pro-api.firebaseapp.com",
    "http://localhost:3000",  # Development
]
```

---

### Environment Security

- ✅ Secret keys in environment variables
- ✅ Database credentials secured
- ✅ DEBUG=False in production
- ✅ ALLOWED_HOSTS configured
- ✅ CORS properly configured

---

## CI/CD Considerations

### Potential GitHub Actions Workflow

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: cd frontend && npm install
      - name: Build
        run: cd frontend && npm run build
      - name: Deploy to Firebase
        uses: w9jds/firebase-action@master
        with:
          args: deploy --only hosting
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to App Engine
        uses: google-github-actions/deploy-appengine@main
        with:
          credentials: ${{ secrets.GCP_CREDENTIALS }}
```

---

## Domain Configuration

### Custom Domain Setup

**Firebase Hosting**:
1. Go to Firebase Console → Hosting
2. Add custom domain
3. Update DNS records (provided by Firebase)
4. SSL certificate auto-provisioned

**App Engine**:
1. Go to App Engine → Settings → Custom Domains
2. Add domain
3. Verify ownership
4. Update DNS records
5. SSL certificate auto-provisioned

---

## Troubleshooting

### Common Issues

#### Frontend Issues

**Issue**: API calls failing
- **Check**: API_URL in auth.constants.js
- **Verify**: CORS configuration on backend
- **Solution**: Ensure production API URL is correct

**Issue**: 404 on refresh
- **Check**: firebase.json rewrites
- **Solution**: Ensure SPA rewrite rule is present

**Issue**: Old version still showing
- **Check**: Browser cache
- **Solution**: Hard refresh (Cmd+Shift+R)

---

#### Backend Issues

**Issue**: 502 Bad Gateway
- **Check**: App Engine logs
- **Common Cause**: Django startup error
- **Solution**: Check requirements.txt, migrations

**Issue**: Database connection error
- **Check**: DATABASE_URL environment variable
- **Solution**: Verify Cloud SQL instance is running

**Issue**: 403 Forbidden
- **Check**: ALLOWED_HOSTS in Django settings
- **Solution**: Add App Engine URL to ALLOWED_HOSTS

---

## Performance Optimization

### Frontend

- ✅ Code splitting with React.lazy
- ✅ Minification in production build
- ✅ Asset optimization
- ✅ CDN via Firebase hosting

### Backend

- ✅ Automatic scaling on App Engine
- ✅ Database connection pooling
- ✅ Query optimization
- ✅ API response caching (consider adding)

---

## Backup & Recovery

### Database Backups

**Cloud SQL**:
- Automatic daily backups enabled
- Point-in-time recovery
- 7-day retention default

**Manual Backup**:
```bash
gcloud sql backups create --instance=INSTANCE_NAME
```

---

### Code Backups

- ✅ Git repository (GitHub/GitLab)
- ✅ Firebase version history
- ✅ App Engine version history

---

## Deployment Checklist

### Pre-Deployment

- [ ] Code tested locally
- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] API endpoints tested
- [ ] Frontend build successful
- [ ] No console errors

### Deployment

- [ ] Backend deployed first
- [ ] Database migrations run
- [ ] API verified working
- [ ] Frontend built with prod API URL
- [ ] Frontend deployed
- [ ] DNS configured (if custom domain)

### Post-Deployment

- [ ] Frontend accessible
- [ ] API responding
- [ ] Authentication working
- [ ] Database queries working
- [ ] Logs checked for errors
- [ ] Performance acceptable
- [ ] User testing completed

---

## Deployment Commands Reference

### Frontend

```bash
# Install dependencies
cd frontend && npm install

# Build production
npm run build

# Deploy to Firebase
firebase deploy

# Or deploy hosting only
firebase deploy --only hosting
```

---

### Backend

```bash
# Deploy to App Engine
gcloud app deploy

# Deploy with specific version
gcloud app deploy --version=v1

# View logs
gcloud app logs tail -s default

# Open in browser
gcloud app browse
```

---

### Both

```bash
# Quick deploy commands (from root)
npm run build:frontend && cd frontend && firebase deploy
cd backend && gcloud app deploy
```

---

## URLs & Endpoints

### Production URLs

- **Frontend**: `https://pocket-pro-api.web.app` (or custom domain)
- **Backend API**: `https://pocket-pro-api.ue.r.appspot.com/api/`
- **Admin Panel**: `https://pocket-pro-api.ue.r.appspot.com/admin/`

### Development URLs

- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:8000/api/`
- **Admin Panel**: `http://localhost:8000/admin/`

---

## Documentation Links

- **Firebase Hosting**: https://firebase.google.com/docs/hosting
- **Google App Engine**: https://cloud.google.com/appengine/docs
- **Cloud SQL**: https://cloud.google.com/sql/docs
- **gcloud CLI**: https://cloud.google.com/sdk/gcloud

---

## Summary

**PocketPro Deployment**:
- ✅ Frontend: Firebase Hosting (static files)
- ✅ Backend: Google App Engine (Django API)
- ✅ Database: Cloud SQL (PostgreSQL)
- ✅ SSL/HTTPS: Automatic on both platforms
- ✅ Environment-aware: Dev/prod configuration
- ✅ Scalable: Automatic scaling enabled
- ✅ Monitored: Cloud logging available
- ✅ Backed up: Database backups automated

**Deployment is production-ready** with proper configuration, monitoring, and security measures in place.

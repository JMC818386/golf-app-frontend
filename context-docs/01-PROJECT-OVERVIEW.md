# PocketPro Golf App - Project Overview

## Project Identity
- **Name**: PocketPro Golf Application
- **Type**: Full-stack Golf Tracking Application (Frontend Portion)
- **Version**: 1.0.0
- **Purpose**: Mobile-first web application for tracking golf rounds, scores, and statistics

## Project Structure
This is a monorepo containing:
- **Frontend**: React application (Located in `/frontend`)
- **Backend**: Django API (Located in `/backend`)

## Technology Stack

### Frontend Technologies
- **Framework**: React 18.2.0
- **Routing**: React Router DOM 6.10.0
- **UI Framework**: Bootstrap 5.2.3 with React-Bootstrap 2.7.4
- **HTTP Client**: Axios 1.3.5
- **Authentication**: JWT (jwt-decode 3.1.2)
- **State Management**: React Context API (Custom GlobalState)
- **Notifications**: React Hot Toast 2.4.0
- **Icons**: React Icons 4.8.0
- **Animations**: AOS (Animate On Scroll) 2.3.4
- **Build Tool**: React Scripts 5.0.1

### Backend Technologies
- **Framework**: Django (Python)
- **Database**: PostgreSQL (Production)
- **API**: RESTful API with JWT authentication

### Hosting & Deployment
- **Frontend Hosting**: Firebase Hosting
- **Backend Hosting**: Google App Engine
- **Production API URL**: https://pocket-pro-api.ue.r.appspot.com/api/
- **Development API URL**: http://localhost:8000/api/
- **Google Cloud Project**: pocket-pro-api

## Core Features

### 1. User Authentication
- User registration with validation
- JWT-based login/logout
- Token refresh mechanism
- Protected routes requiring authentication

### 2. Round Management
- **Round Setup**: Select course and initiate new rounds
- **Live Round Tracking**: Real-time score tracking during play
- **Round History**: View and filter past rounds

### 3. Score Tracking
- Hole-by-hole stroke counting
- Separate tracking for swings and putts
- Real-time score calculations
- Front 9/Back 9/Total score displays
- Score differential (relative to par) calculations

### 4. Geolocation Features
- GPS distance calculation to green
- Real-time distance updates during play
- Haversine formula for accurate distance calculations

### 5. Statistics & Analytics
- Eagles, birdies, pars, bogeys tracking
- Total putts per round
- Score differentials
- Round filtering by course
- Sorting by date or total score

### 6. Course Management
- Course selection interface
- Multiple course support
- 18-hole course tracking
- Par tracking per hole

## Application Flow

### User Journey
1. **Landing**: User arrives at login page
2. **Authentication**: Login or register new account
3. **Main Dashboard**: Access to Round Setup or Round History
4. **Round Setup**: Select course and begin round
5. **Active Round**: Track scores hole-by-hole with live stats
6. **Round Completion**: Save round and return to history
7. **Round History**: View, filter, and analyze past rounds

## Project Architecture

### Monorepo Structure
```
golf-app-frontend/
├── package.json (root - monorepo configuration)
├── README.md
├── DEPLOYMENT.md
├── backend/ (Django API)
└── frontend/ (React app)
    ├── package.json
    ├── firebase.json
    ├── public/
    ├── build/ (production build)
    └── src/
        ├── App.js
        ├── index.js
        ├── components/
        │   ├── Main.js (Dashboard)
        │   ├── NavBar.js
        │   ├── round/ (Round components)
        │   └── user/ (Auth components)
        ├── context/ (Global state)
        ├── services/ (API & Auth services)
        └── img/ (Assets)
```

### Development Commands
```bash
# Install all dependencies
npm run setup

# Run full stack (frontend + backend)
npm run dev

# Run frontend only
npm run dev:frontend

# Run backend only
npm run dev:backend

# Build frontend for production
npm run build:frontend
```

## Design System

### Color Palette
- **Dark Green**: #314035 (Headers, dark elements)
- **Light Green**: #698C75 (Buttons, accents)
- **Mid Green**: #46594B (Backgrounds)
- **Off White**: #F2EFDF (Text, light elements)
- **Orange**: #F2A74B (Primary actions, highlights)

### Typography
- **Primary Font**: Montserrat (Headings, bold text)
- **Secondary Font**: Hind (Body text, UI elements)

### Visual Style
- Radial gradient backgrounds
- Drop shadows on interactive elements
- Fade animations for score updates
- Clean, minimalist golf-focused design
- Mobile-first responsive layout

## Key Differentiators
1. **Real-time GPS tracking** during rounds
2. **Simple, intuitive score entry** with separate swing/putt tracking
3. **Live score updates** with smooth animations
4. **Comprehensive round history** with filtering/sorting
5. **Mobile-optimized** for on-course use
6. **JWT-based security** for user data protection

## Target Deployment
- Production-ready codebase
- Firebase hosting for frontend
- Google App Engine for backend
- PostgreSQL database
- Environment-aware API configuration

## Current Status
✅ Core functionality complete
✅ Authentication working
✅ Round tracking operational
✅ Score history implemented
✅ GPS distance calculation functional
✅ Deployment configuration ready
✅ Production and development environments configured

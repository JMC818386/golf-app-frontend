# PocketPro Golf ⛳

> **A modern, full-stack golf tracking application merging professional-grade features with intuitive user experience.**

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![Django](https://img.shields.io/badge/Django-4.2-092E20?logo=django)](https://www.djangoproject.com/)
[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?logo=python)](https://www.python.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap)](https://getbootstrap.com/)

---

## 🎯 Overview

**PocketPro Golf** is a comprehensive golf tracking and analytics platform designed to help golfers of all skill levels track, analyze, and improve their game. Built with modern web technologies, the application offers real-time round tracking, detailed statistics, and an intuitive mobile-first interface.

### 🌟 Key Features

**Current Production Features:**
- ✅ **Live Round Tracking** - Real-time shot-by-shot scoring with instant statistics
- ✅ **Comprehensive Round History** - Complete archive of past rounds with detailed scorecards
- ✅ **Multi-Course Support** - Track rounds across different golf courses with accurate par data
- ✅ **Advanced Statistics** - Swings, putts, fairways hit, and greens in regulation tracking
- ✅ **User Authentication** - Secure login and personalized user profiles
- ✅ **Responsive Design** - Optimized mobile-first UI with desktop compatibility
- ✅ **Visual Status Indicators** - Dynamic badges showing active round status
- ✅ **Professional UI/UX** - Custom color scheme with radial gradients and smooth animations

**Technical Highlights:**
- Modern React 18 with functional components and hooks
- Django REST Framework backend with robust API endpoints
- Bootstrap 5 responsive grid system
- localStorage for persistent round state management
- RESTful API architecture with JWT authentication

---

## 🚀 Project Status

### Current Milestone: **PocketPro v2.0** (Production Ready)

**Phase**: Active Development & UI Enhancement  
**Status**: ✅ Core features complete, ⚡ UI polish in progress

### Recent Achievements (Q4 2025 - Q1 2026)

#### ✨ UI/UX Overhaul (January 2026)
- Implemented dual-logo branding system (PocketPro + Clover)
- Redesigned color scheme with professional gradients
  - Primary: `#804C11` / `#E18837` (Orange tones)
  - Secondary: `#252F2A` / `#888888` (Forest green tones)
  - Background: Radial gradient `#2F4130` → `#252F2A` → `#171C1E`
- Added animated round status badges with pulsing effects
- Standardized container spacing across all pages
- Enhanced button styling with consistent sizing and colors

#### 🎮 Round Management System
- Real-time round tracking with hole-by-hole progression
- Live scorecard with running totals and par calculations
- Swings and putts counter with intuitive button controls
- Distance tracking and hole navigation
- Automatic round completion and history archival

#### 📊 Statistics & Analytics
- Per-round statistics: Total score, swings, putts
- Scorecard visualization with par comparison
- Round history dashboard with sortable cards
- Course-specific data preservation

#### 🔐 User System
- Full authentication flow (Register/Login/Logout)
- JWT token-based session management
- User profile management
- Secure API communication

---

## 🔮 Roadmap: PocketPro + Clover Integration

### **Phase 1: Foundation Enhancement** (Q1 2026)
*Current Phase - In Progress*

- [x] Complete UI standardization across all pages
- [x] Implement professional branding (dual-logo system)
- [x] Establish consistent color scheme and gradients
- [ ] Comprehensive error handling and user feedback
- [ ] Performance optimization and code refactoring
- [ ] Accessibility improvements (WCAG 2.1 compliance)

### **Phase 2: Clover Core Integration** (Q2 2026)
*Next Major Milestone*

**Clover Platform Features:**
- 🎯 **AI-Powered Shot Analysis**
  - Machine learning shot prediction and club recommendations
  - Historical performance analysis with trend visualization
  - Personalized improvement suggestions based on play patterns

- 📈 **Advanced Analytics Dashboard**
  - Handicap calculation and tracking over time
  - Statistical breakdowns by course, weather, and playing partners
  - Heat maps showing strengths and weaknesses by hole type
  - Comparative analytics against peer groups

- 🌐 **Social & Community Features**
  - Player profiles with public statistics
  - Friend system and social feed
  - Round sharing and competitive leaderboards
  - Course reviews and community ratings

- 📱 **Mobile-First Enhancements**
  - Offline mode with automatic sync
  - GPS integration for real-time course mapping
  - Apple Watch and wearable device support
  - Push notifications for tournaments and challenges

### **Phase 3: Professional Tools** (Q3 2026)

- 🏆 **Tournament Management**
  - Create and manage custom tournaments
  - Live leaderboards with real-time updates
  - Multiple scoring formats (Stroke, Match, Stableford)
  - Handicap adjustments and flight management

- 🎓 **Coaching & Training Modules**
  - Practice session tracking separate from rounds
  - Drill library with video demonstrations
  - Progress tracking for specific skills
  - Coach/student relationship tools

- 🌤️ **Environmental Context**
  - Weather integration with historical correlation
  - Course conditions tracking (wet, dry, wind)
  - Elevation and terrain analysis
  - Optimal playing time recommendations

### **Phase 4: Enterprise & Monetization** (Q4 2026)

- 💼 **Club & Pro Features**
  - Multi-user management for golf clubs
  - Member directory and handicap services
  - Tee time integration
  - Course maintenance tracking

- 💳 **Premium Subscription Tiers**
  - Free tier: Basic round tracking and statistics
  - Pro tier: Advanced analytics and AI features
  - Club tier: Full tournament and team management
  - White-label options for golf courses

- 🔗 **Third-Party Integrations**
  - GolfNow and tee time platforms
  - Swing analysis apps (TrackMan, SkyTrak)
  - Fitness trackers (Apple Health, Google Fit)
  - Golf equipment retailers (club recommendations)

---

## 🏗️ Technical Architecture

### **Frontend Stack**
```
React 18.2.0
├── React Router DOM (v6) - Navigation
├── Bootstrap 5 - UI Framework
├── Axios - HTTP Client
├── Context API - State Management
└── localStorage - Persistent Storage
```

**Key Technologies:**
- **Build Tool**: Vite 7.3.0 (Fast HMR and optimized builds)
- **Styling**: Bootstrap 5 + Custom CSS with CSS3 animations
- **API Communication**: Axios with interceptors for authentication
- **State Management**: Context API with localStorage persistence

### **Backend Stack**
```
Django 4.2
├── Django REST Framework - API Layer
├── JWT Authentication - User Sessions
├── PostgreSQL - Primary Database
└── Corsheaders - Cross-Origin Support
```

**API Architecture:**
- RESTful endpoints with consistent resource naming
- Token-based authentication with refresh capabilities
- Comprehensive serializers for data validation
- Efficient query optimization with select_related/prefetch_related

### **Deployment Infrastructure**
```
Frontend: Firebase Hosting
Backend: [To be deployed - Railway/Heroku/AWS]
Database: PostgreSQL (Production)
```

---

## 📁 Project Structure

```
golf-app-frontend/
├── frontend/                    # React Application
│   ├── public/                  # Static assets
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Main.js          # Main dashboard
│   │   │   ├── NavBar.js        # Top navigation
│   │   │   ├── BottomNav.jsx    # Mobile bottom nav with badges
│   │   │   ├── round/           # Round tracking components
│   │   │   │   ├── Round.js     # Live round interface
│   │   │   │   ├── RoundHistory.js
│   │   │   │   ├── RoundScorecard.js
│   │   │   │   └── RoundSetup.js
│   │   │   └── user/            # Authentication components
│   │   │       ├── Login.jsx    # Login page (dual-logo)
│   │   │       ├── Register.js
│   │   │       └── Profile.js
│   │   ├── context/
│   │   │   └── GlobalState.js   # Global state management
│   │   ├── services/
│   │   │   ├── api.request.js   # API utility functions
│   │   │   ├── auth.service.js  # Authentication logic
│   │   │   └── auth.headers.js  # JWT token handling
│   │   ├── img/                 # Images and logos
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── firebase.json            # Firebase hosting config
│
├── backend/                     # Django Application
│   ├── api/                     # Main API app
│   │   ├── models/              # Database models
│   │   │   ├── User.py
│   │   │   ├── Course.py
│   │   │   ├── Round.py
│   │   │   └── HoleScore.py
│   │   ├── serializers/         # DRF serializers
│   │   ├── views/               # API endpoints
│   │   └── urls.py
│   ├── manage.py
│   └── requirements.txt
│
├── package.json                 # Root-level scripts
├── DEPLOYMENT.md               # Deployment documentation
└── README.md                   # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 16+ and npm
- **Python** 3.8+ and pip
- **PostgreSQL** (for backend database)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/JMC818386/golf-app-frontend.git
cd golf-app-frontend
```

2. **Install dependencies**
```bash
# Install all dependencies (frontend + backend)
npm run setup
```

3. **Configure environment variables**

Create `.env` files in both frontend and backend directories:

**Frontend** (`frontend/.env`):
```env
REACT_APP_API_URL=http://localhost:8000
```

**Backend** (`backend/.env`):
```env
SECRET_KEY=your-secret-key-here
DEBUG=True
DATABASE_URL=postgresql://user:password@localhost:5432/golfapp
```

4. **Set up the database**
```bash
cd backend
python manage.py migrate
python manage.py createsuperuser
```

### Running the Application

**Development Mode** (Recommended):
```bash
# Start both frontend and backend concurrently
npm run dev
```

This launches:
- Frontend: http://localhost:5173 (Vite dev server)
- Backend: http://localhost:8000 (Django dev server)

**Individual Services**:
```bash
# Frontend only
npm run dev:frontend

# Backend only
npm run dev:backend
# OR manually:
cd backend
python manage.py runserver
```

### Building for Production

```bash
# Build frontend for production
cd frontend
npm run build

# The build artifacts will be in frontend/build/
# Deploy to Firebase Hosting or any static host
```

---

## 🎨 Design Philosophy

### Visual Identity

**Color Palette:**
- **Primary (Warm)**: `#804C11` background, `#E18837` accents - Represents energy and action
- **Secondary (Cool)**: `#252F2A` background, `#888888` accents - Represents stability and nature
- **Gradient Background**: `radial-gradient(circle, #2F4130 0%, #252F2A 35%, #171C1E 100%)`
  - Creates depth and focuses attention on content
  - Professional appearance suitable for all lighting conditions

**Typography & Spacing:**
- Bootstrap 5 utility classes for consistent spacing
- `mb-2` (0.5rem) standard vertical spacing between containers
- Responsive font scaling for optimal readability

**Interactive Elements:**
- Smooth CSS transitions and animations
- Pulsing badge indicators for live states
- Button hover effects with brightness adjustments
- Consistent 80px button height for easy mobile interaction

### User Experience Principles

1. **Mobile-First**: Designed for on-course use with thumb-friendly controls
2. **Immediate Feedback**: Visual confirmation for all user actions
3. **Minimal Friction**: Quick access to common actions (start round, complete hole)
4. **Data Persistence**: Never lose progress with localStorage backup
5. **Progressive Enhancement**: Core functionality works without advanced features

---

## 📊 Development Metrics

### Code Statistics
- **Frontend**: ~15,000 lines of JavaScript/JSX
- **Backend**: ~5,000 lines of Python
- **Components**: 25+ React components
- **API Endpoints**: 15+ RESTful routes
- **Database Models**: 6 core models with relationships

### Performance Targets
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.0s
- Lighthouse Score: 90+ (Performance, Accessibility, Best Practices)
- Mobile-Optimized: Touch targets > 44px, readable fonts

---

## 🤝 Contributing

This project is currently in active development. While not yet open for external contributions, it will transition to open-source once the Clover integration is complete.

### Future Contribution Areas:
- UI/UX improvements and mobile optimization
- New statistical visualizations and charts
- Golf course database expansion
- Internationalization (i18n) support
- Accessibility enhancements

---

## 📄 License

Copyright © 2025-2026 PocketPro Golf. All rights reserved.

*This project is currently proprietary. Licensing terms will be updated upon public release.*

---

## 👥 Team & Contact

**Lead Developer**: JMC  
**Project Type**: Full-Stack Web Application  
**Status**: Active Development  

**Technologies**: React • Django • PostgreSQL • Bootstrap • Firebase

---

## 🙏 Acknowledgments

- **Bootstrap Team** - For the excellent responsive framework
- **Django Community** - For comprehensive REST Framework documentation
- **React Team** - For the powerful and flexible UI library
- **Golf Community** - For inspiration and feature suggestions

---

<div align="center">

**Built with ⛳ for golfers, by golfers**

*PocketPro Golf - Track Your Game. Improve Your Score.*

[View Demo](#) • [Report Bug](https://github.com/JMC818386/golf-app-frontend/issues) • [Request Feature](https://github.com/JMC818386/golf-app-frontend/issues)

</div>
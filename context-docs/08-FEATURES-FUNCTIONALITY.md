# PocketPro - Features & Functionality Reference

## Complete Feature Catalog

This document provides a comprehensive reference of all features, user flows, and functionality in the PocketPro golf application.

---

## 1. User Authentication

### 1.1 User Registration

**Flow**:
```
User visits /register
  ↓
Fills registration form
  ↓
Validates password match
  ↓
Submits form
  ↓
POST /user/signup/
  ↓
Auto-login with credentials
  ↓
Navigate to /profile
  ↓
Success toast notification
```

**Features**:
- ✅ Username creation
- ✅ Email address
- ✅ Password (min 8 characters)
- ✅ Password confirmation
- ✅ First and last name
- ✅ Client-side validation
- ✅ Server-side validation
- ✅ Toast notifications for errors
- ✅ Loading state during submission
- ✅ Automatic login after registration

**Validation**:
- All fields required
- Passwords must match
- Email format validation
- Password minimum length
- Toast error messages

**UI Elements**:
- NavBar with logo
- Form with 6 input fields
- Submit button with loading state
- Toast notifications

---

### 1.2 User Login

**Flow**:
```
User visits / or /login
  ↓
Enters username and password
  ↓
Submits form
  ↓
POST /user/login/
  ↓
Receives JWT tokens
  ↓
Decode and store in GlobalState
  ↓
Navigate to /main
```

**Features**:
- ✅ Username authentication
- ✅ Password authentication
- ✅ JWT token handling
- ✅ Persistent sessions (localStorage)
- ✅ Error handling with alerts
- ✅ Link to registration
- ✅ Remember user across sessions

**Security**:
- JWT-based authentication
- Secure token storage
- Automatic token refresh
- Token expiration handling

**UI Elements**:
- NavBar with logo
- Username input
- Password input
- Sign In button (primary action)
- Create Account button (secondary)

---

### 1.3 User Logout

**Flow**:
```
User clicks "Sign Out" in NavBar
  ↓
Clear localStorage
  ↓
Reset GlobalState to null
  ↓
Navigate to /login
```

**Features**:
- ✅ One-click logout
- ✅ Clear all session data
- ✅ Immediate state update
- ✅ Redirect to login

**UI Element**:
- "Sign Out" link in NavBar (when authenticated)

---

### 1.4 Session Persistence

**Features**:
- ✅ Sessions persist across browser closes
- ✅ Automatic state restoration on reload
- ✅ JWT token refresh on expiration
- ✅ Automatic redirect on invalid token

**Implementation**:
- localStorage for token storage
- GlobalState initialization from localStorage
- Axios interceptor for token refresh

---

## 2. Main Dashboard

### 2.1 Dashboard Home

**Location**: `/main`

**Features**:
- ✅ Centered PocketPro logo
- ✅ Two primary action buttons
- ✅ Clean, focused interface
- ✅ Easy navigation

**Actions**:
1. **ROUND SETUP** → Start new round
2. **ROUND HISTORY** → View past rounds

**UI Layout**:
```
┌─────────────────────────┐
│      Navigation         │
├─────────────────────────┤
│                         │
│    [PocketPro Logo]     │
│                         │
│   [ROUND SETUP BTN]     │
│                         │
│  [ROUND HISTORY BTN]    │
│                         │
└─────────────────────────┘
```

---

## 3. Round Setup

### 3.1 Course Selection

**Location**: `/round-setup`

**Flow**:
```
User navigates to Round Setup
  ↓
GET /courses/ (fetch all courses)
  ↓
Display course list
  ↓
User searches/filters courses
  ↓
User selects course
  ↓
Click "BEGIN ROUND"
  ↓
POST /rounds/ with course ID
  ↓
Navigate to /round/{roundId}/{courseId}
```

**Features**:
- ✅ List all available courses
- ✅ Search/filter by course name
- ✅ Real-time search filtering
- ✅ Course selection highlighting
- ✅ Disabled button until course selected
- ✅ Clean scrollable list
- ✅ Auth protection (redirect if not logged in)

**Search Functionality**:
- Case-insensitive search
- Filters as user types
- Searches course names

**UI Elements**:
- NavBar
- "Select a Course" heading
- Search input field
- Scrollable course list (buttons)
- BEGIN ROUND button

**Button States**:
- Disabled: No course selected
- Enabled: Course selected
- Click: Creates round and navigates

---

### 3.2 Round Initialization

**API Call**: `POST /rounds/`

**Request**:
```json
{
  "course": 1,
  "round_length": 18,
  "total_score": 0
}
```

**Response**:
```json
{
  "id": 456,
  "course": 1,
  "round_length": 18,
  "total_score": 0,
  "date": "2024-01-15T14:30:00Z"
}
```

**Actions After**:
- Navigate to active round screen
- Load hole data for selected course
- Initialize tracking for hole 1

---

## 4. Active Round Tracking

### 4.1 Hole-by-Hole Score Entry

**Location**: `/round/{roundId}/{courseId}`

**Flow**:
```
Round screen loads
  ↓
GET /holes/?selected_course={courseId}
  ↓
GET /rounds/{roundId}/
  ↓
Display Hole 1 information
  ↓
User adjusts swing counter (+/-)
  ↓
User adjusts putt counter (+/-)
  ↓
Total strokes = swings + putts
  ↓
GPS distance updates in real-time
  ↓
User clicks "COMPLETE HOLE"
  ↓
POST /hole-scores/
  ↓
Move to next hole
  ↓
Reset counters with animation
  ↓
Repeat for holes 2-18
```

**Features**:
- ✅ Real-time stroke counting
- ✅ Separate swing and putt tracking
- ✅ GPS distance to green
- ✅ Hole information display (number, par, distance)
- ✅ Live scorecard (front 9 / back 9)
- ✅ Score differential tracking
- ✅ Smooth animations on score changes
- ✅ Progress through all 18 holes
- ✅ Auto-save after each hole

---

### 4.2 Score Counter Interface

**Swings Counter**:
```
┌─────────────────────────┐
│   [  -  ]  3  [  +  ]  │
│       SWINGS            │
└─────────────────────────┘
```

**Putts Counter**:
```
┌─────────────────────────┐
│   [  -  ]  2  [  +  ]  │
│       PUTTS             │
└─────────────────────────┘
```

**Features**:
- ✅ Increment buttons (+)
- ✅ Decrement buttons (-)
- ✅ Cannot go below 0
- ✅ Circular button design
- ✅ Large, touch-friendly buttons (50px)
- ✅ Fade animation on change

**Behavior**:
- Each click increments/decrements by 1
- Total strokes auto-calculated
- 150ms fade transition
- Smooth user experience

---

### 4.3 GPS Distance Calculation

**Implementation**:
- Uses browser Geolocation API
- Haversine formula for distance calculation
- Updates in real-time during round
- Displays distance in yards

**Formula**:
```javascript
// Haversine formula
const R = 6371e3; // Earth radius in meters
// Calculate great circle distance
// Convert to yards: distance / 0.9144
```

**Display**:
- Current Distance: Updates live
- Hole Distance: Fixed from course data
- Color-coded: Orange for emphasis

**Accuracy**:
- Depends on GPS signal
- Updates as user moves
- Calculated from current position to hole GPS coordinates

---

### 4.4 Hole Information Display

**Information Shown**:
- Course name
- Hole number (1-18)
- Par for hole (3, 4, or 5)
- Hole distance (yards)
- Current GPS distance
- Current strokes
- Score differential (+/-)

**Layout**:
```
┌─────────────────────────────────┐
│      Pine Valley Golf Club      │
├──────────┬──────────┬───────────┤
│ DISTANCE │  HOLE #  │  PAR      │
│ 420 yds  │    1     │   4       │
├──────────┴──────────┴───────────┤
│ CURRENT DIST │ STROKES │ -/+    │
│   350 yds    │    0    │  -     │
└──────────────────────────────────┘
```

---

### 4.5 Live Scorecard

**Front 9 Display**:
```
┌──┬──┬──┬──┬──┬──┬──┬──┬──┬────┬───┐
│  │1 │2 │3 │4 │5 │6 │7 │8 │9 │ 36 │ - │
├──┼──┼──┼──┼──┼──┼──┼──┼──┼────┼───┤
│F │4 │5 │3 │5 │4 │3 │4 │4 │5 │ 37 │ - │
└──┴──┴──┴──┴──┴──┴──┴──┴──┴────┴───┘
```

**Back 9 Display**:
```
┌──┬───┬───┬───┬───┬───┬───┬───┬───┬───┬────┬────┐
│  │10 │11 │12 │13 │14 │15 │16 │17 │18 │ 36 │ 72 │
├──┼───┼───┼───┼───┼───┼───┼───┼───┼───┼────┼────┤
│B │ 4 │ 5 │ 3 │ 4 │ 4 │ 5 │ 3 │ 4 │ 5 │ 37 │ 74 │
└──┴───┴───┴───┴───┴───┴───┴───┴───┴───┴────┴────┘
```

**Features**:
- ✅ Live updates as holes are completed
- ✅ Front 9 subtotal
- ✅ Back 9 subtotal
- ✅ Total score
- ✅ Scrollable on small screens

**Calculation**:
- Each hole score saved to array
- Subtotals calculated with reduce
- Updates immediately after completing hole

---

### 4.6 Completing a Hole

**Button**: "COMPLETE HOLE" (or "COMPLETE ROUND" on hole 18)

**Actions**:
1. Save current hole score
2. POST to `/hole-scores/`
3. Update local state
4. Increment hole number
5. Reset stroke counters
6. Play fade animation
7. Load next hole data
8. Update scorecard

**Data Saved**:
```json
{
  "hole_round": 456,
  "hole": 1,
  "strokes": 5,
  "swings": 3,
  "putts": 2
}
```

**Validation**:
- Must have at least 1 stroke
- Strokes = swings + putts

---

### 4.7 Completing a Round

**Trigger**: Click "COMPLETE ROUND" on hole 18

**Flow**:
```
User completes hole 18
  ↓
POST final hole score
  ↓
Navigate to /round-history
  ↓
Round now appears in history
```

**Features**:
- ✅ Automatic round finalization
- ✅ All scores saved
- ✅ Statistics calculated
- ✅ Immediate availability in history

---

## 5. Round History

### 5.1 Round History List

**Location**: `/round-history`

**Flow**:
```
User navigates to Round History
  ↓
GET /rounds/ (authenticated)
  ↓
Display list of rounds
  ↓
User can filter/sort
  ↓
View detailed scorecards
```

**Features**:
- ✅ List all completed rounds
- ✅ Sort by date or total score
- ✅ Ascending/descending order
- ✅ Filter by course
- ✅ Detailed statistics per round
- ✅ Expandable scorecards
- ✅ Auth protection

---

### 5.2 Round Cards

**Information Displayed Per Round**:
- Course name
- Date (formatted: "Jan 15, 2024")
- Total score (large number)
- Score differential (+10, -2, E)
- Total putts
- Eagles count
- Birdies count
- Pars count
- Bogeys count
- Bogey+ count
- Full 18-hole scorecard

**Layout**:
```
┌───────────────────────────────────┐
│ Pine Valley Golf Club             │
│ Jan 15, 2024               [82]   │
│ +10                   Putts | 36  │
│                                   │
│ EAGLES | 0      BOGIES | 5        │
│ BIRDIES | 2     BOGIES+ | 1       │
│ PARS | 10                         │
│                                   │
│ [Front 9 Scorecard]               │
│ [Back 9 Scorecard]                │
└───────────────────────────────────┘
```

---

### 5.3 Sorting & Filtering

**Sort Options**:
1. **By Date**
   - Ascending: Oldest first
   - Descending: Newest first (default)

2. **By Total Score**
   - Ascending: Best (lowest) scores first
   - Descending: Highest scores first

**Filter Options**:
- All Courses (default)
- Individual course selection
- Dynamic course list from data

**UI**:
- Checkbox groups for sort order
- Checkbox groups for direction
- Dropdown for course filter

**Features**:
- ✅ Real-time filtering
- ✅ Persistent sort order
- ✅ Multiple filter criteria
- ✅ Clean, intuitive controls

---

### 5.4 Statistics Display

**Round-Level Statistics**:
- Total strokes
- Total putts
- Score differential (vs par)
- Eagle count
- Birdie count
- Par count
- Bogey count
- Bogey+ count

**Calculations**:
- Backend calculates based on hole scores vs par
- Aggregated per round
- Displayed in round cards

---

## 6. User Profile (Partial Implementation)

### 6.1 Profile View

**Location**: `/profile`

**Current Status**: Partially implemented with mock data

**Features Planned**:
- ✅ User name display
- ✅ Overall statistics
- ⚠️ Round average (hardcoded)
- ⚠️ Total rounds played (hardcoded)
- ⚠️ Overall score differential (hardcoded)
- ⚠️ Average putts (hardcoded)
- ⚠️ Career eagles, birdies, pars
- ⚠️ Career bogeys breakdown

**Layout**:
```
┌──────────────────────────┐
│   Chip McPutterson       │
│                          │
│        80                │
│   ROUND AVERAGE          │
│                          │
│  Overall Statistics      │
│                          │
│ ROUNDS │ -/+ │ PUTTS    │
│   25   │ +8  │  36      │
│                          │
│ PARS │ BIRDIES │ EAGLES  │
│  12  │   3     │   0     │
└──────────────────────────┘
```

**Note**: Backend integration needed for real user statistics

---

## 7. Navigation System

### 7.1 Navigation Bar

**Components**:
- PocketPro logo (links to /main)
- Conditional menu items based on auth state

**Unauthenticated**:
- Login
- Register

**Authenticated**:
- Sign Out

**Features**:
- ✅ Persistent across all pages
- ✅ Dynamic based on auth state
- ✅ Logo navigation to home
- ✅ One-click logout

---

### 7.2 Route Protection

**Protected Routes**:
- `/main` - Dashboard
- `/profile` - User profile
- `/round-setup` - Course selection
- `/round/{roundId}/{courseId}` - Active round
- `/round-history` - Past rounds

**Public Routes**:
- `/` - Login
- `/login` - Login
- `/register` - Registration

**Protection Mechanism**:
```javascript
useEffect(() => {
  if (!state.currentUser) {
    navigate("/login");
  }
}, []);
```

**Behavior**: Automatic redirect to login if not authenticated

---

## 8. Real-time Features

### 8.1 Live GPS Distance

**Update Frequency**: Real-time during round

**Calculation**: 
- Haversine formula
- User location → Hole GPS coordinates
- Displayed in yards

**UI Feedback**:
- Orange highlighted text
- Updates as user moves
- Loading indicator while fetching

---

### 8.2 Score Animations

**Fade Transition**:
- Fade out old value (0.5s)
- Wait 150ms
- Update value
- Fade in new value (0.5s)

**Applied To**:
- Swing counter
- Putt counter
- Total stroke counter

**User Experience**:
- Smooth visual feedback
- Confirms user action
- Professional feel

---

## 9. Data Persistence

### 9.1 Local Storage

**Stored Data**:
- JWT tokens (access & refresh)
- Persists across sessions

**Key**: `'user'`

**Format**:
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

---

### 9.2 Server Persistence

**Stored on Backend**:
- User accounts
- Course data
- Hole data
- Round records
- Hole score records
- Calculated statistics

**Database**: PostgreSQL (production)

---

## 10. Error Handling

### 10.1 Authentication Errors

**Login Failed**:
- Alert: "Login failed. Please check your credentials."
- Console error logging

**Registration Failed**:
- Toast notification: "Registration failed. Please try again."

**Token Expired**:
- Automatic refresh attempt
- Redirect to login if refresh fails

---

### 10.2 API Errors

**Network Errors**:
- Console logging
- Promise rejection
- User feedback (varies by component)

**404 Errors**:
- Logged to console
- Handled gracefully

**500 Errors**:
- Logged to console
- User should retry

---

### 10.3 Form Validation Errors

**Registration**:
- "Passwords do not match!"
- "Please fill in all fields!"

**Round Setup**:
- BEGIN ROUND button disabled until course selected

**Round Tracking**:
- Cannot decrement below 0

---

## 11. Responsive Design

### 11.1 Mobile Optimization

**Features**:
- ✅ Touch-friendly buttons (50px)
- ✅ Readable text sizes (min 9px)
- ✅ Vertical scrolling
- ✅ Single-column layouts
- ✅ Large tap targets
- ✅ Bootstrap responsive grid

**Breakpoints**: Bootstrap 5 defaults

---

### 11.2 Layout Patterns

**Container Width**:
- Max 400px for main content
- Centered on larger screens
- Full-width on mobile

**Stacking**:
- Elements stack vertically on mobile
- Flexbox for alignment
- Grid for complex layouts

---

## 12. Loading States

### 12.1 Spinner

**Usage**:
- While fetching course data
- While fetching hole data
- During data loading

**Animation**: CSS spinning circle

---

### 12.2 Button States

**Registration Button**:
- "Register" (default)
- "Creating Account..." (loading)
- Disabled while loading

**Other Buttons**:
- Disabled states (visual feedback)
- Hover states (color change)
- Active states (depressed look)

---

## 13. Accessibility

### 13.1 Current Features

- ✅ Semantic HTML
- ✅ Color contrast (light text on dark backgrounds)
- ✅ Touch-friendly targets
- ✅ Keyboard navigation (basic)

### 13.2 Potential Improvements

- ⚠️ ARIA labels
- ⚠️ Screen reader support
- ⚠️ Focus indicators
- ⚠️ Keyboard shortcuts

---

## 14. Performance

### 14.1 Optimizations

- ✅ React production build
- ✅ Code minification
- ✅ CSS optimization
- ✅ Image optimization
- ✅ Lazy loading (where applicable)
- ✅ Memoization (potential)

---

### 14.2 Bundle Size

**Production Build**: Optimized by React Scripts

**CDN Usage**:
- Bootstrap CSS
- Google Fonts

---

## Feature Roadmap

### Implemented ✅
- User authentication
- Round creation
- Hole-by-hole tracking
- GPS distance calculation
- Score statistics
- Round history
- Sorting & filtering

### Partial Implementation ⚠️
- User profile (mock data)
- Score differential display (needs backend update)

### Future Enhancements 🔮
- Edit past rounds
- Delete rounds
- User statistics dashboard (real data)
- Multiple round formats (9-hole)
- Course management
- Social features
- Handicap calculation
- Weather integration
- Friends & leaderboards

---

## Summary

PocketPro is a **fully functional golf tracking app** with:
- ✅ Complete authentication system
- ✅ Real-time round tracking
- ✅ GPS distance calculation
- ✅ Comprehensive statistics
- ✅ Historical round viewing
- ✅ Sorting and filtering
- ✅ Mobile-optimized interface
- ✅ Smooth animations
- ✅ Production-ready deployment

**Core Strength**: Simple, intuitive on-course score tracking with GPS integration and detailed post-round analytics.

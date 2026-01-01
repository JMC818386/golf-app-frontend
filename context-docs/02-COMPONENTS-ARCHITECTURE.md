# PocketPro - Components Architecture

## Component Hierarchy

```
App (Root)
│
├── index.js (Router Configuration)
│   └── GlobalProvider (Context Wrapper)
│       └── Routes
│           ├── Login
│           ├── Register
│           ├── Main (Dashboard)
│           ├── Profile
│           ├── Round (Active Round)
│           ├── RoundHistory
│           └── RoundSetup
```

---

## Core Components

### 1. App.js (Root Component)
**Location**: `/frontend/src/App.js`

**Purpose**: Application root, currently minimal with background styling

**Key Features**:
- Imports Bootstrap CSS
- Wraps app with GlobalProvider
- Contains NavBar component (commented out in current version)
- Background gradient styling

**Dependencies**:
- Bootstrap CSS
- GlobalProvider context
- NavBar component

---

### 2. index.js (Application Entry Point)
**Location**: `/frontend/src/index.js`

**Purpose**: Application bootstrapping and route configuration

**Route Structure**:
```javascript
<Routes>
  <Route path="/" element={<Login />} />
  <Route path="login" element={<Login />} />
  <Route path="register" element={<Register />} />
  <Route path="profile" element={<Profile />} />
  <Route path="round/:roundId/:courseId" element={<Round />} />
  <Route path="round-history" element={<RoundHistory />} />
  <Route path="round-setup" element={<RoundSetup />} />
  <Route path="main" element={<Main />} />
</Routes>
```

**Key Features**:
- React Router configuration
- Global state provider wrapper
- Strict mode enabled

---

## Layout Components

### 3. NavBar.js
**Location**: `/frontend/src/components/NavBar.js`

**Purpose**: Global navigation bar with conditional rendering based on auth state

**Key Features**:
- Logo display (PocketPro LogoType)
- Conditional navigation items based on authentication
- Logout functionality
- User state management

**Navigation Items**:
- **Unauthenticated**: Login, Register
- **Authenticated**: Home, Sign Out

**State Management**:
- Uses GlobalState for user authentication
- Fetches user data on mount
- Handles logout with navigation

**Styling**: NavBar.css

---

### 4. Main.js (Dashboard)
**Location**: `/frontend/src/components/Main.js`

**Purpose**: Main dashboard/home screen after login

**Key Features**:
- PocketPro logo display
- Two primary navigation buttons:
  - **ROUND SETUP**: Start new round
  - **ROUND HISTORY**: View past rounds
- Centered layout with vertical alignment

**Layout**:
```
┌─────────────────┐
│   PocketPro     │
│     Logo        │
│                 │
│  [ROUND SETUP]  │
│                 │
│ [ROUND HISTORY] │
└─────────────────┘
```

**Navigation**:
- `/round-setup` - Start new round
- `/round-history` - View history

**Styling**: Main.css

---

## User/Authentication Components

### 5. Login.js
**Location**: `/frontend/src/components/user/Login.js`

**Purpose**: User authentication screen

**Key Features**:
- Username/password input
- Form validation
- JWT token handling
- Error handling with alerts
- Link to registration

**Authentication Flow**:
1. User enters credentials
2. AuthService.login() called
3. JWT token received and decoded
4. User state updated in GlobalState
5. Navigate to /main dashboard

**Form Fields**:
- Username (required)
- Password (required, min 8 characters)

**Error Handling**:
- Alert on failed login
- Console error logging
- Catches authentication errors

**UI Elements**:
- NavBar
- Logo
- Sign In button (orange/primary)
- Create Account button (green/secondary)

**Styling**: User.css

---

### 6. Register.js
**Location**: `/frontend/src/components/user/Register.js`

**Purpose**: New user registration

**Key Features**:
- Multi-field registration form
- Password confirmation validation
- Toast notifications
- Loading state during submission
- Auto-login after registration

**Form Fields**:
- Username (required)
- Email (required)
- Password (required, min 8 characters)
- Confirm Password (required)
- First Name (required)
- Last Name (required)

**Validation**:
- Password match checking
- All fields required
- Toast error messages

**Registration Flow**:
1. User fills form
2. Validate passwords match
3. AuthService.register() called
4. Auto-login on success
5. Navigate to /profile
6. Toast success/error messages

**State Management**:
- Local state for form data
- Loading state for button
- Toast notifications (react-hot-toast)

**Styling**: User.css

---

### 7. Profile.js
**Location**: `/frontend/src/components/user/Profile.js`

**Purpose**: User profile and statistics display (partially implemented)

**Key Features**:
- User statistics display
- Overall performance metrics
- Protected route (redirects if not authenticated)

**Displayed Statistics**:
- Round average
- Total rounds played
- Overall +/- score
- Average putts
- Pars, Birdies, Eagles
- Bogeys breakdown

**Auth Guard**:
```javascript
useEffect(() => {
  if (!state.currentUser) {
    navigate("/login");
  }
});
```

**Note**: Currently displays hardcoded data - needs backend integration

**Layout**: Statistics in grid format with large numbers and labels

**Styling**: User.css

---

## Round Management Components

### 8. RoundSetup.js
**Location**: `/frontend/src/components/round/RoundSetup.js`

**Purpose**: Course selection and round initialization

**Key Features**:
- Course list display
- Course search/filter
- Auth protection
- Round creation

**Workflow**:
1. Fetch all available courses from API
2. Display searchable course list
3. User selects course
4. Click "BEGIN ROUND" button
5. POST new round to backend
6. Navigate to round tracking screen

**API Integration**:
- **GET** `/courses/` - Fetch available courses
- **POST** `/rounds/` - Create new round
  - Body: `{ course, round_length: 18, total_score: 0 }`
  - Returns: Round ID and course ID
- Navigate to: `/round/{roundId}/{courseId}`

**UI Components**:
- Search input for course filtering
- Scrollable course list (buttons)
- BEGIN ROUND button (disabled until course selected)

**State**:
- courses: Array of available courses
- selectedCourse: Currently selected course ID
- searchValue: Filter string

**Styling**: Round.css

---

### 9. Round.js (Active Round Tracking)
**Location**: `/frontend/src/components/round/Round.js`

**Purpose**: Live score tracking during active round

**Key Features**:
- Hole-by-hole score entry
- Swing and putt tracking
- GPS distance calculation
- Live scorecard
- Score animations

**Component Structure**:
```
┌──────────────────────────────┐
│ Course Name                  │
├──────────────────────────────┤
│ Distance | Hole # | Par      │
├──────────────────────────────┤
│ Current Distance | Strokes   │
│                  | +/- Par   │
├──────────────────────────────┤
│ Swings Counter [- 0 +]       │
├──────────────────────────────┤
│ Putts Counter [- 0 +]        │
├──────────────────────────────┤
│ Front 9 Scorecard            │
│ Back 9 Scorecard             │
├──────────────────────────────┤
│ [COMPLETE HOLE] or           │
│ [COMPLETE ROUND]             │
└──────────────────────────────┘
```

**State Management**:
- holes: Array of hole data from API
- scores: Array of scores by hole
- currentHole: Index of current hole (0-17)
- strokeCount: Total strokes for current hole
- swingCount: Swings (excluding putts)
- puttCount: Putts only
- distance: GPS distance to green
- holeStrokes: Array of completed hole scores

**GPS Distance Calculation**:
Uses Haversine formula:
```javascript
const R = 6371e3; // Earth radius in meters
// Calculate distance between current position and hole coordinates
// Convert to yards: distance / 0.9144
```

**Score Entry Flow**:
1. User on specific hole
2. Increment/decrement swings
3. Increment/decrement putts
4. Total strokes = swings + putts
5. Click "COMPLETE HOLE"
6. POST hole score to API
7. Move to next hole
8. Reset counters with fade animation

**API Integration**:
- **GET** `/holes/?selected_course={courseId}` - Get hole data
- **GET** `/rounds/{roundId}/` - Get round data
- **POST** `/hole-scores/` - Save hole score
  ```javascript
  {
    hole_round: roundId,
    hole: holeNumber,
    strokes: strokeCount,
    swings: swingCount,
    putts: puttCount
  }
  ```

**Animations**:
- Fade-out on score change
- Fade-in with new value
- 150ms transition timing

**Scorecard Display**:
- Front 9: Holes 1-9 with subtotal
- Back 9: Holes 10-18 with subtotal
- Total score displayed

**Completion**:
- Last hole: Button changes to "COMPLETE ROUND"
- Navigates to `/round-history`

**Loading State**:
Shows spinner while fetching hole data

**Styling**: Round.css

---

### 10. RoundHistory.js
**Location**: `/frontend/src/components/round/RoundHistory.js`

**Purpose**: Display list of completed rounds

**Key Features**:
- Auth protection
- Fetch user's rounds
- Display round cards
- Navigation to history

**API Integration**:
- **GET** `/rounds/` - Fetch user's rounds (JWT authenticated)

**Component Structure**:
```javascript
<RoundHistory>
  └── <RoundCard rounds={rounds} />
```

**Auth Guard**: Redirects to login if not authenticated

**Styling**: Round.css

---

### 11. RoundCard.js
**Location**: `/frontend/src/components/round/RoundCard.js**

**Purpose**: Display and filter round history cards

**Key Features**:
- Round list display
- Sorting (by date or score)
- Filtering by course
- Ascending/descending order
- Detailed statistics per round

**Display Information Per Round**:
- Course name
- Date (formatted)
- Total score
- Score differential (+/-)
- Total putts
- Eagles, Birdies, Pars, Bogeys, Bogey+
- Hole-by-hole scorecard

**Sorting Options**:
- By Total Score (ascending/descending)
- By Date (ascending/descending)

**Filtering**:
- Filter by course name
- "All Courses" option
- Dynamically generated course list

**Round Card Layout**:
```
┌──────────────────────────────────┐
│ Course Name                      │
│ Date                     [Score] │
│ +/- Score        Putts | 36      │
│                                  │
│ EAGLES | 0    BOGIES | 5         │
│ BIRDIES | 2   BOGIES+ | 1        │
│ PARS | 10                        │
│                                  │
│ [Scorecard Tables]               │
└──────────────────────────────────┘
```

**State Management**:
- scores: All round data
- sortDirection: "asc" or "desc"
- sortOrder: "date" or "stroke_total"
- filter: Selected course name or ""

**Data Structure Expected**:
```javascript
round: {
  id: number,
  course_name: string,
  date: string,
  formatted_date: string,
  stroke_total: number,
  putt_total: number,
  strokes_difference: string,
  hole_scores: {
    counts: {
      eagles: number,
      birdies: number,
      pars: number,
      bogeys: number,
      bogey_plus: number
    },
    scores: Array
  }
}
```

**Styling**: Round.css

---

### 12. RoundScorecard.js
**Location**: `/frontend/src/components/round/RoundScorecard.js`

**Purpose**: Display 18-hole scorecard in table format

**Key Features**:
- Two-table display (Front 9, Back 9)
- Subtotals for each nine
- Total score calculation

**Table Structure**:

**Front 9**:
```
     | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 36 | -  |
─────|───|───|───|───|───|───|───|───|───|────|────|
  F  | 4 | 5 | 3 | 5 | 4 | 3 | 4 | 4 | 5 | 37 | -  |
```

**Back 9**:
```
     | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 36 | 72 |
─────|────|────|────|────|────|────|────|────|────|────|────|
  B  | 4  | 5  | 3  | 4  | 4  | 5  | 3  | 4  | 5  | 37 | 74 |
```

**Props**:
- scores: Array of score objects
  ```javascript
  { hole_number: 1-18, strokes: number }
  ```

**Calculations**:
- Maps scores to 18-hole array
- Calculates front 9 subtotal (holes 0-8)
- Calculates back 9 subtotal (holes 9-17)
- Displays total score

**Styling**: Round.css

---

### 13. HoleEntry.js
**Location**: `/frontend/src/components/round/HoleEntry.js`

**Purpose**: Individual hole score entry component (alternative to Round.js)

**Note**: This appears to be an earlier version or alternative implementation of hole tracking. The current active implementation is Round.js.

**Key Features** (similar to Round.js):
- Stroke counting
- Swing/putt separation
- GPS distance calculation
- Fade animations

**Differences from Round.js**:
- Standalone component
- Props-based score management
- Simplified interface

**Usage**: May be used for modular hole entry or as a reusable component

---

## Component Relationships

### Authentication Flow
```
Login → GlobalState → Main Dashboard
  ↓
Register → Auto-Login → Profile
```

### Round Tracking Flow
```
Main → RoundSetup → Round → RoundHistory
                      ↓         ↓
                   (saves)  (displays)
                      ↓         ↓
                    API ← RoundCard
                            ↓
                      RoundScorecard
```

### State Flow
```
GlobalProvider (JWT Token + User)
       ↓
  All Components (via useGlobalState hook)
```

---

## Component Dependencies

### Shared Dependencies
- Bootstrap CSS (all components)
- React Router (navigation)
- GlobalState Context (auth state)

### API Service Dependencies
- AuthService: Login, Register
- request (api.request.js): Round, RoundSetup, RoundHistory, RoundCard
- axios: Direct API calls in some components

### Styling Dependencies
- App.css: Root styling
- Main.css: Dashboard
- NavBar.css: Navigation
- Round.css: All round-related components
- User.css: Authentication components

---

## Protected Routes

Components requiring authentication:
- Main
- Profile
- Round
- RoundHistory
- RoundSetup

All implement auth guard:
```javascript
useEffect(() => {
  if (!state.currentUser) {
    navigate("/login");
  }
}, []);
```

---

## Component Best Practices Used

1. **Functional Components**: All components use modern React hooks
2. **Custom Hooks**: useGlobalState for state management
3. **Route Protection**: Auth guards on protected pages
4. **Loading States**: Spinners during data fetching
5. **Error Handling**: Try-catch blocks with user feedback
6. **Responsive Design**: Bootstrap grid system
7. **Conditional Rendering**: Based on auth state and data availability
8. **Animation**: Smooth transitions for user feedback
9. **Form Validation**: Client-side validation before API calls
10. **Code Organization**: Logical folder structure by feature

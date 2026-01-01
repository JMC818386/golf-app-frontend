# PocketPro - Data Models & API Contracts

## Overview

This document describes the data structures and API contracts used in the PocketPro golf app. These models represent the backend Django API structure as consumed by the React frontend.

---

## User Model

### JWT Decoded User Object

**Location**: GlobalState (`currentUser`)

```typescript
interface DecodedUser {
  user_id: number;
  username: string;
  email?: string;
  exp: number;        // Token expiration (Unix timestamp)
  iat: number;        // Issued at (Unix timestamp)
  token_type: "access";
}
```

**Example**:
```json
{
  "user_id": 42,
  "username": "johndoe",
  "email": "john@example.com",
  "exp": 1704067200,
  "iat": 1704063600,
  "token_type": "access"
}
```

**Source**: Decoded from JWT access token

---

### Full User Profile

**Endpoint**: `GET /users/{userId}/`

```typescript
interface UserProfile {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  date_joined: string;
  // Additional profile fields
}
```

---

## Authentication Models

### Login Request

**Endpoint**: `POST /user/login/`

```typescript
interface LoginRequest {
  username: string;
  password: string;
}
```

**Example**:
```json
{
  "username": "johndoe",
  "password": "securepassword123"
}
```

---

### Login Response

```typescript
interface LoginResponse {
  access: string;   // JWT access token
  refresh: string;  // JWT refresh token
}
```

**Example**:
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Storage**: Saved to localStorage as 'user' object

---

### Registration Request

**Endpoint**: `POST /user/signup/`

```typescript
interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}
```

**Example**:
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123",
  "first_name": "John",
  "last_name": "Doe"
}
```

**Note**: Frontend uses camelCase, converted to snake_case in AuthService

---

### Token Refresh Request

**Endpoint**: `POST /token/refresh/`

```typescript
interface RefreshRequest {
  refresh: string;
}
```

**Response**:
```typescript
interface RefreshResponse {
  access: string;  // New access token
}
```

---

## Course Model

### Course Object

**Endpoint**: `GET /courses/`

```typescript
interface Course {
  id: number;
  name: string;
  location?: string;
  par?: number;
  // Additional course metadata
}
```

**Example**:
```json
{
  "id": 1,
  "name": "Pine Valley Golf Club",
  "location": "New Jersey, USA",
  "par": 72
}
```

**Used In**: RoundSetup component for course selection

---

## Hole Model

### Hole Object

**Endpoint**: `GET /holes/?selected_course={courseId}`

```typescript
interface Hole {
  id: number;
  number: number;           // 1-18
  par: number;              // 3, 4, or 5
  distance: number;         // Yards
  latitude: number;         // GPS coordinate
  longitude: number;        // GPS coordinate
  course_name: string;
}
```

**Example**:
```json
{
  "id": 101,
  "number": 1,
  "par": 4,
  "distance": 420,
  "latitude": 40.7128,
  "longitude": -74.0060,
  "course_name": "Pine Valley Golf Club"
}
```

**Used In**: Round component for hole tracking

**Array**: Returned as array of 18 holes per course

---

## Round Model

### Create Round Request

**Endpoint**: `POST /rounds/`

```typescript
interface CreateRoundRequest {
  course: number;           // Course ID
  round_length: number;     // Always 18
  total_score: number;      // Initial 0
}
```

**Example**:
```json
{
  "course": 1,
  "round_length": 18,
  "total_score": 0
}
```

---

### Create Round Response

```typescript
interface CreateRoundResponse {
  id: number;               // New round ID
  course: number;           // Course ID
  round_length: number;
  total_score: number;
  date: string;             // ISO date
}
```

**Example**:
```json
{
  "id": 456,
  "course": 1,
  "round_length": 18,
  "total_score": 0,
  "date": "2024-01-15T14:30:00Z"
}
```

**Navigation**: App navigates to `/round/{roundId}/{courseId}`

---

### Round Summary (for History)

**Endpoint**: `GET /rounds/` (user's rounds)

```typescript
interface RoundSummary {
  id: number;
  course: number;
  course_name: string;
  date: string;                    // ISO date
  formatted_date: string;          // "Jan 15, 2024"
  stroke_total: number;            // Total strokes
  putt_total: number;              // Total putts
  strokes_difference: string;      // "+8" or "-2" or "E"
  hole_scores: {
    counts: {
      eagles: number;
      birdies: number;
      pars: number;
      bogeys: number;
      bogey_plus: number;          // Double bogey+
    };
    scores: HoleScore[];           // Detailed scores
  };
}
```

**Example**:
```json
{
  "id": 456,
  "course": 1,
  "course_name": "Pine Valley Golf Club",
  "date": "2024-01-15T14:30:00Z",
  "formatted_date": "Jan 15, 2024",
  "stroke_total": 82,
  "putt_total": 36,
  "strokes_difference": "+10",
  "hole_scores": {
    "counts": {
      "eagles": 0,
      "birdies": 2,
      "pars": 10,
      "bogeys": 5,
      "bogey_plus": 1
    },
    "scores": [
      { "hole_number": 1, "strokes": 4, "putts": 2 },
      { "hole_number": 2, "strokes": 5, "putts": 2 },
      // ... holes 3-18
    ]
  }
}
```

**Used In**: RoundHistory and RoundCard components

---

### Single Round Detail

**Endpoint**: `GET /rounds/{roundId}/`

```typescript
interface RoundDetail {
  id: number;
  course: number;
  course_name: string;
  user: number;
  date: string;
  round_length: number;
  stroke_total: number;
  putt_total: number;
  strokes_difference: number;    // Numeric difference
  // ... additional calculated fields
}
```

**Used In**: Round component for live round tracking

---

## Hole Score Model

### Save Hole Score Request

**Endpoint**: `POST /hole-scores/`

```typescript
interface SaveHoleScoreRequest {
  hole_round: number;      // Round ID
  hole: number;            // Hole number (1-18)
  strokes: number;         // Total strokes
  swings: number;          // Non-putt swings
  putts: number;           // Putts only
}
```

**Example**:
```json
{
  "hole_round": 456,
  "hole": 1,
  "strokes": 5,
  "swings": 3,
  "putts": 2
}
```

**Validation**: `strokes === swings + putts`

---

### Hole Score Object

```typescript
interface HoleScore {
  id: number;
  hole_round: number;
  hole: number;              // Hole number
  hole_number: number;       // Alias for hole
  strokes: number;
  swings: number;
  putts: number;
  created_at: string;
}
```

**Example**:
```json
{
  "id": 1001,
  "hole_round": 456,
  "hole": 1,
  "hole_number": 1,
  "strokes": 5,
  "swings": 3,
  "putts": 2,
  "created_at": "2024-01-15T14:35:00Z"
}
```

---

## Calculated Fields & Statistics

### Score Type Counts

**Calculated by backend based on hole par vs strokes**:

```typescript
interface ScoreCounts {
  eagles: number;         // 2 under par
  birdies: number;        // 1 under par
  pars: number;           // Equal to par
  bogeys: number;         // 1 over par
  bogey_plus: number;     // 2+ over par
}
```

**Calculation Logic**:
- Eagle: `strokes = par - 2`
- Birdie: `strokes = par - 1`
- Par: `strokes = par`
- Bogey: `strokes = par + 1`
- Bogey+: `strokes >= par + 2`

---

### Strokes Difference

**Format**: String with +/- prefix or "E" for even

```typescript
type StrokesDifference = string;  // "+10" | "-2" | "E"
```

**Calculation**: `total_strokes - course_par`

**Display**:
- Positive: "+8" (over par)
- Negative: "-2" (under par)
- Zero: "E" (even/par)

---

## API Response Patterns

### Success Response

```typescript
interface SuccessResponse<T> {
  data: T;
  status: number;        // 200, 201, etc.
}
```

---

### Error Response

```typescript
interface ErrorResponse {
  response: {
    status: number;      // 400, 401, 404, 500, etc.
    data: {
      error?: string;
      message?: string;
      detail?: string;
    };
    headers: object;
  };
}
```

---

## Query Parameters

### Get Holes by Course

**URL**: `/holes/?selected_course={courseId}`

**Parameter**:
- `selected_course`: Course ID (number)

**Example**: `/holes/?selected_course=1`

---

## Frontend State Models

### LocalStorage User Object

```typescript
interface StoredUser {
  access: string;    // JWT access token
  refresh: string;   // JWT refresh token
}
```

**Key**: `'user'`

**Usage**: Persisted between sessions

---

### Global State Structure

```typescript
interface GlobalState {
  currentUser: DecodedUser | null;
  currentUserToken: string | null;
}
```

**Initialized**: From localStorage on app load

---

### Component Local State Examples

#### Round Component State

```typescript
interface RoundState {
  holes: Hole[];
  scores: number[];
  currentHole: number;          // Index 0-17
  strokeCount: number;
  swingCount: number;
  puttCount: number;
  distance: number | null;      // GPS distance to green
  holeStrokes: number[];        // Array of 18 hole scores
  round: RoundDetail;
  // ... fade animation classes
}
```

---

#### RoundCard Component State

```typescript
interface RoundCardState {
  scores: RoundSummary[];
  sortDirection: "asc" | "desc";
  sortOrder: "date" | "stroke_total";
  filter: string;               // Course name or ""
}
```

---

#### RoundSetup Component State

```typescript
interface RoundSetupState {
  courses: Course[];
  selectedCourse: number | null;
  searchValue: string;
}
```

---

## Data Flow Diagrams

### Round Creation Flow

```
User (RoundSetup)
  ↓
  Select Course
  ↓
  Click "BEGIN ROUND"
  ↓
POST /rounds/ { course: 1, round_length: 18, total_score: 0 }
  ↓
Backend creates Round
  ↓
Response: { id: 456, course: 1, ... }
  ↓
Navigate to: /round/456/1
  ↓
Round Component Loads
  ↓
GET /holes/?selected_course=1
  ↓
Display Hole 1 tracking interface
```

---

### Hole Score Submission Flow

```
User (Round Component)
  ↓
  Adjust swings/putts
  ↓
  Click "COMPLETE HOLE"
  ↓
POST /hole-scores/ {
  hole_round: 456,
  hole: 1,
  strokes: 5,
  swings: 3,
  putts: 2
}
  ↓
Backend saves HoleScore
  ↓
Response: { id: 1001, ... }
  ↓
Frontend moves to next hole
  ↓
Update local holeStrokes array
  ↓
Display Hole 2 interface
```

---

### Round History Retrieval Flow

```
User navigates to /round-history
  ↓
RoundHistory Component mounts
  ↓
GET /rounds/ (authenticated with JWT)
  ↓
Backend returns user's rounds with statistics
  ↓
RoundCard component receives rounds array
  ↓
Display with sorting/filtering options
  ↓
User can filter by course or sort by date/score
```

---

## Validation Rules

### Frontend Validations

**Registration**:
- All fields required
- Password min 8 characters
- Passwords must match
- Email format validation (HTML5)

**Round Tracking**:
- Stroke count >= 0
- Swing count >= 0
- Putt count >= 0
- Cannot decrement below 0

**Round Setup**:
- Course must be selected before starting round

---

### Backend Validations (Expected)

**User Registration**:
- Username unique
- Email unique and valid format
- Password strength requirements

**Round Creation**:
- User must be authenticated
- Course must exist
- round_length = 18 (or 9)

**Hole Score**:
- User must own the round
- Hole number 1-18
- strokes = swings + putts
- All values >= 0

---

## Data Relationships

```
User (1) ----< (many) Round
Round (1) ----< (many) HoleScore
Course (1) ----< (many) Hole
Course (1) ----< (many) Round
Hole (1) ----< (many) HoleScore (conceptual)
```

**Key Relationships**:
- A User has many Rounds
- A Round belongs to one Course
- A Round has many HoleScores
- A Course has many Holes (typically 18)

---

## API Endpoint Summary

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---------------|
| POST | `/user/login/` | User login | No |
| POST | `/user/signup/` | User registration | No |
| POST | `/token/refresh/` | Refresh access token | No |
| GET | `/users/{id}/` | Get user profile | Yes |
| GET | `/courses/` | List all courses | No |
| GET | `/holes/` | Get holes (with filter) | No |
| POST | `/rounds/` | Create new round | Yes |
| GET | `/rounds/` | Get user's rounds | Yes |
| GET | `/rounds/{id}/` | Get single round | Yes |
| POST | `/hole-scores/` | Save hole score | Yes |

**Auth**: JWT token in Authorization header: `Bearer <token>`

---

## TypeScript Type Definitions (Recommended)

For a future TypeScript migration, create `types/api.ts`:

```typescript
// types/api.ts
export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface Course {
  id: number;
  name: string;
  location?: string;
  par?: number;
}

export interface Hole {
  id: number;
  number: number;
  par: number;
  distance: number;
  latitude: number;
  longitude: number;
  course_name: string;
}

export interface Round {
  id: number;
  course: number;
  course_name: string;
  date: string;
  stroke_total: number;
  putt_total: number;
  strokes_difference: string;
  hole_scores: {
    counts: {
      eagles: number;
      birdies: number;
      pars: number;
      bogeys: number;
      bogey_plus: number;
    };
    scores: HoleScore[];
  };
}

export interface HoleScore {
  id: number;
  hole_round: number;
  hole_number: number;
  strokes: number;
  swings: number;
  putts: number;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}
```

---

## Summary

**PocketPro Data Models**:
- ✅ User authentication with JWT
- ✅ Course and hole management
- ✅ Round tracking with statistics
- ✅ Hole-by-hole score recording
- ✅ Calculated statistics (eagles, birdies, etc.)
- ✅ Score differentials
- ✅ GPS coordinates for distance calculation
- ✅ RESTful API contracts
- ✅ Consistent data shapes across frontend/backend
- ✅ Type-safe operations (with proper TypeScript migration)

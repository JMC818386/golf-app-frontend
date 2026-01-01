# PocketPro - API Services & Authentication

## Service Architecture

```
Components
    ↓
Services Layer
    ├── auth.service.js (Authentication logic)
    ├── api.request.js (HTTP client wrapper)
    ├── auth.headers.js (JWT header injection)
    └── auth.constants.js (API configuration)
    ↓
Backend API (Django)
```

---

## Authentication Constants

### File: `auth.constants.js`
**Location**: `/frontend/src/services/auth.constants.js`

```javascript
// Local development - backend running on port 8000
const LOCAL_API_URL = "http://localhost:8000/api/";

// Production API (PostgreSQL database)
const PROD_API_URL = "https://pocket-pro-api.ue.r.appspot.com/api/";

export const API_URL = process.env.NODE_ENV === 'development'
    ? LOCAL_API_URL
    : PROD_API_URL;

export const LOGIN_ENDPOINT = "user/login/";
export const REGISTER_ENDPOINT = "user/signup/";
export const REFRESH_ENDPOINT = "token/refresh/";
```

**Purpose**: Centralized API configuration with environment-based URL switching

**Key Features**:
- **Environment Detection**: Automatically switches between dev/prod
- **API Endpoints**: Defined as constants for consistency
- **Easy Deployment**: Single source of truth for API URLs

**Endpoints**:
- Login: `{API_URL}user/login/`
- Register: `{API_URL}user/signup/`
- Token Refresh: `{API_URL}token/refresh/`

---

## Authentication Headers

### File: `auth.headers.js`
**Location**: `/frontend/src/services/auth.headers.js`

```javascript
export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.access) {
    return { Authorization: 'Bearer ' + user.access };
  } else {
    return {};
  }
}
```

**Purpose**: Generate Authorization headers with JWT tokens

**How It Works**:
1. Retrieves user object from localStorage
2. Extracts access token
3. Returns Bearer token header or empty object
4. Used by api.request.js for authenticated requests

**Usage**:
```javascript
headers: authHeader()
// Returns: { Authorization: 'Bearer <jwt_token>' }
```

---

## Authentication Service

### File: `auth.service.js`
**Location**: `/frontend/src/services/auth.service.js`

**Purpose**: Handles all authentication operations

### Methods

#### 1. login(username, password)
```javascript
async login(username, password) {
  try {
    const response = await request({
      url: LOGIN_ENDPOINT,
      method: 'POST',
      data: { username, password },
    });

    if (response.data.access) {
      return this.setToken(response);
    }
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    return null;
  }
}
```

**Flow**:
1. POST credentials to `/user/login/`
2. Receive JWT access and refresh tokens
3. Store tokens via setToken()
4. Return token data or null on failure

**Returns**: `{ access: string, refresh: string }` or `null`

---

#### 2. logout()
```javascript
logout() {
  localStorage.removeItem('user');
}
```

**Purpose**: Clear user session

**Action**: Removes user object from localStorage

---

#### 3. register(userData)
```javascript
async register({
  username,
  email,
  password,
  firstName,
  lastName,
}) {
  try {
    const response = await request({
      url: REGISTER_ENDPOINT,
      method: 'POST',
      data: {
        username,
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      },
    });

    // Registration successful, now login
    await this.login(username, password);
    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return error.response;
  }
}
```

**Flow**:
1. POST user data to `/user/signup/`
2. Convert camelCase to snake_case for backend
3. Auto-login after successful registration
4. Return response or error

**Input Parameters**:
- username (string)
- email (string)
- password (string)
- firstName (string)
- lastName (string)

---

#### 4. setToken(response)
```javascript
setToken(response) {
  localStorage.setItem('user', JSON.stringify(response.data));
  return response.data;
}
```

**Purpose**: Store JWT tokens in localStorage

**Storage Format**:
```javascript
{
  access: "eyJ0eXAiOiJKV1QiLCJhbGc...",
  refresh: "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

---

#### 5. refreshToken()
```javascript
async refreshToken() {
  try {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user.refresh) {
      const response = await request({
        url: REFRESH_ENDPOINT,
        method: 'POST',
        data: { refresh: user.refresh },
      });

      return response.data;
    }
  } catch (error) {
    return error.response;
  }
}
```

**Purpose**: Refresh expired access token

**Flow**:
1. Get refresh token from localStorage
2. POST to `/token/refresh/`
3. Receive new access token
4. Return new token data

---

## API Request Wrapper

### File: `api.request.js`
**Location**: `/frontend/src/services/api.request.js`

**Purpose**: Centralized HTTP client with authentication and token refresh

### Axios Client Configuration

```javascript
const client = axios.create({
  baseURL: API_URL,
});
```

**Features**:
- Pre-configured with base URL
- Automatic auth header injection
- Token refresh interceptor
- Request/response logging
- Error handling

---

### Response Interceptor

**Purpose**: Automatic token refresh on 401 Unauthorized

```javascript
client.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;

    // Prevent infinite loops on refresh endpoint
    if (error.response.status === 401 && 
        originalRequest.url === API_URL + REFRESH_ENDPOINT) {
      window.location.href = '/login/';
      return Promise.reject(error);
    }

    // Token not valid - attempt refresh
    if (error.response.data.code === "token_not_valid" &&
        error.response.status === 401) {
      
      const user = localStorage.getItem('user');

      if (user) {
        const tokenParts = JSON.parse(atob(user.refresh.split('.')[1]));
        const now = Math.ceil(Date.now() / 1000);

        // Check if refresh token is still valid
        if (tokenParts.exp > now) {
          return client
            .post(REFRESH_ENDPOINT, { refresh: user.refresh })
            .then((response) => {
              // Update stored token
              localStorage.setItem('user', response.data);
              
              // Update headers
              client.defaults.headers['Authorization'] = 
                "Bearer " + response.data.access;
              originalRequest.headers['Authorization'] = 
                "Bearer " + response.data.access;

              // Retry original request
              return client(originalRequest);
            })
            .catch(err => {
              console.log(err)
            });
        } else {
          // Refresh token expired
          window.location.href = '/login/';
        }
      } else {
        // No refresh token available
        window.location.href = '/login/';
      }
    }

    return Promise.reject(error);
  }
);
```

**Flow**:
1. Request fails with 401
2. Check if it's a token refresh failure (redirect to login)
3. Decode refresh token JWT
4. Check refresh token expiration
5. If valid: Request new access token
6. Update localStorage and headers
7. Retry original request
8. If invalid: Redirect to login

**Edge Cases Handled**:
- Infinite loop prevention on refresh endpoint
- Expired refresh tokens
- Missing refresh tokens
- Token decode errors

---

### Request Wrapper Function

```javascript
const request = (opts) => {
  let options = {
    ...opts,
    headers: authHeader(),
  }

  const onSuccess = (response) => {
    console.debug('Request Successful!', response);
    return response;
  }

  const onError = (error) => {
    console.error('Request Failed:', error.config);

    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
    } else {
      console.error('Error Message:', error.message);
    }

    return Promise.reject(error.response || error.message);
  }

  return client(options)
    .then(onSuccess)
    .catch(onError);
}

export default request;
```

**Purpose**: Wrapper with automatic auth headers and logging

**Features**:
- Injects auth headers automatically
- Success/error logging
- Detailed error information
- Returns promise

**Usage**:
```javascript
import request from './api.request';

// GET request
let response = await request({
  url: '/rounds/',
  method: 'GET'
});

// POST request
let response = await request({
  url: '/rounds/',
  method: 'POST',
  data: { course: 1, round_length: 18 }
});
```

---

## API Endpoints Used

### Authentication Endpoints

#### Login
- **Method**: POST
- **URL**: `/user/login/`
- **Body**: `{ username, password }`
- **Response**: `{ access: string, refresh: string }`

#### Register
- **Method**: POST
- **URL**: `/user/signup/`
- **Body**: 
  ```javascript
  {
    username: string,
    email: string,
    password: string,
    first_name: string,
    last_name: string
  }
  ```
- **Response**: User object

#### Token Refresh
- **Method**: POST
- **URL**: `/token/refresh/`
- **Body**: `{ refresh: string }`
- **Response**: `{ access: string }`

---

### Course Endpoints

#### Get All Courses
- **Method**: GET
- **URL**: `/courses/`
- **Auth**: Not required (public)
- **Response**: Array of course objects
  ```javascript
  [
    {
      id: number,
      name: string,
      // ... other course data
    }
  ]
  ```

---

### Hole Endpoints

#### Get Holes for Course
- **Method**: GET
- **URL**: `/holes/`
- **Query Params**: `?selected_course={courseId}`
- **Auth**: Not required
- **Response**: Array of hole objects
  ```javascript
  [
    {
      id: number,
      number: 1-18,
      par: number,
      distance: number,
      latitude: number,
      longitude: number,
      course_name: string
    }
  ]
  ```

---

### Round Endpoints

#### Create New Round
- **Method**: POST
- **URL**: `/rounds/`
- **Auth**: Required (JWT)
- **Body**: 
  ```javascript
  {
    course: number,
    round_length: 18,
    total_score: 0
  }
  ```
- **Response**: 
  ```javascript
  {
    id: number,
    course: number,
    round_length: number,
    total_score: number,
    date: string
  }
  ```

#### Get User's Rounds
- **Method**: GET
- **URL**: `/rounds/`
- **Auth**: Required (JWT)
- **Response**: Array of round objects with statistics
  ```javascript
  [
    {
      id: number,
      course: number,
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
        scores: [
          { hole_number: number, strokes: number }
        ]
      }
    }
  ]
  ```

#### Get Single Round
- **Method**: GET
- **URL**: `/rounds/{roundId}/`
- **Auth**: Required (JWT)
- **Response**: Single round object with details

---

### Hole Score Endpoints

#### Save Hole Score
- **Method**: POST
- **URL**: `/hole-scores/`
- **Auth**: Required (JWT)
- **Body**: 
  ```javascript
  {
    hole_round: number,    // Round ID
    hole: number,          // Hole number (1-18)
    strokes: number,       // Total strokes
    swings: number,        // Swings (not including putts)
    putts: number          // Putts only
  }
  ```
- **Response**: Saved hole score object

---

### User Endpoints

#### Get User Profile
- **Method**: GET
- **URL**: `/users/{userId}/`
- **Auth**: Required (JWT)
- **Response**: User profile data

---

## Token Management

### JWT Token Structure

**Access Token**:
```javascript
{
  "token_type": "access",
  "exp": 1234567890,      // Expiration timestamp
  "user_id": 123,
  "username": "username"
}
```

**Refresh Token**:
```javascript
{
  "token_type": "refresh",
  "exp": 1234567890,      // Expiration (longer than access)
  "user_id": 123
}
```

### Token Decoding

Used in GlobalState:
```javascript
import jwtDecode from 'jwt-decode';

const decoded = jwtDecode(token.access);
// Returns: { user_id, username, exp, ... }
```

---

## LocalStorage Schema

### Stored User Object

**Key**: `'user'`

**Value**:
```javascript
{
  access: "eyJ0eXAiOiJKV1QiLCJhbGc...",  // JWT access token
  refresh: "eyJ0eXAiOiJKV1QiLCJhbGc..."  // JWT refresh token
}
```

**Operations**:
```javascript
// Set
localStorage.setItem('user', JSON.stringify(tokenData));

// Get
const user = JSON.parse(localStorage.getItem('user'));

// Remove (logout)
localStorage.removeItem('user');
```

---

## Error Handling

### Login Errors
```javascript
.catch((error) => {
  console.error("Login error:", error);
  alert("Login failed. Please check your credentials.");
});
```

### Registration Errors
```javascript
toast.error("Registration failed. Please try again.");
```

### API Request Errors
```javascript
const onError = (error) => {
  console.error('Request Failed:', error.config);
  console.error('Status:', error.response.status);
  console.error('Data:', error.response.data);
  return Promise.reject(error.response || error.message);
}
```

### Token Refresh Errors
- Expired refresh token → Redirect to login
- Network error → Promise rejection
- Invalid token → Redirect to login

---

## Security Features

1. **JWT Authentication**: Stateless token-based auth
2. **Automatic Token Refresh**: Transparent to user
3. **Secure Storage**: Tokens in localStorage (consider httpOnly cookies for production)
4. **Token Expiration**: Both access and refresh tokens expire
5. **Protected Routes**: Auth guards on sensitive pages
6. **Bearer Token Transmission**: Standard Authorization header
7. **HTTPS in Production**: Secure transmission of credentials

---

## Service Integration Flow

### User Registration Flow
```
Component (Register.js)
  → AuthService.register()
  → request() with auth.constants endpoints
  → Django API /user/signup/
  → Auto-login after success
  → Store tokens in localStorage
  → Navigate to profile
```

### User Login Flow
```
Component (Login.js)
  → AuthService.login()
  → request() to /user/login/
  → Receive JWT tokens
  → setToken() to localStorage
  → jwtDecode() access token
  → Update GlobalState
  → Navigate to /main
```

### Authenticated API Request Flow
```
Component (e.g., Round.js)
  → request({ url, method, data })
  → authHeader() injects Bearer token
  → axios.request() to backend
  → [If 401] Interceptor catches error
  → Attempt token refresh
  → Retry original request
  → Return response to component
```

### Logout Flow
```
Component (NavBar.js)
  → AuthService.logout()
  → localStorage.removeItem('user')
  → Update GlobalState (null user)
  → Navigate to /login
```

---

## Environment Configuration

### Development
- API URL: `http://localhost:8000/api/`
- Backend: Local Django server
- Database: SQLite or local PostgreSQL

### Production
- API URL: `https://pocket-pro-api.ue.r.appspot.com/api/`
- Backend: Google App Engine
- Database: Cloud PostgreSQL

**Automatic Switching**:
```javascript
process.env.NODE_ENV === 'development' ? LOCAL : PROD
```

---

## Best Practices Implemented

1. ✅ **Single Source of Truth**: Centralized API configuration
2. ✅ **DRY Principle**: Reusable request wrapper
3. ✅ **Error Handling**: Comprehensive try-catch blocks
4. ✅ **Logging**: Debug and error logging
5. ✅ **Token Management**: Automatic refresh
6. ✅ **Security**: Bearer token authentication
7. ✅ **User Feedback**: Alerts and toasts for errors
8. ✅ **Code Organization**: Separate service files by concern
9. ✅ **Environment Awareness**: Dev/prod configuration
10. ✅ **Promise-based**: Async/await patterns

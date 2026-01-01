# PocketPro - State Management

## Global State Architecture

PocketPro uses React Context API for centralized state management.

---

## GlobalState Context

### File: `GlobalState.js`
**Location**: `/frontend/src/context/GlobalState.js`

```javascript
import React, { createContext, useReducer, useContext } from 'react';
import jwtDecode from 'jwt-decode'

let user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  currentUser: user ? jwtDecode(user.access) : null,
  currentUserToken: user ? user.access : null
}

const GlobalStateContext = createContext(initialState);
const DispatchStateContext = createContext(undefined)

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    (state, newValue) => ({ ...state, ...newValue }),
    initialState
  );

  return (
    <GlobalStateContext.Provider value={state}>
      <DispatchStateContext.Provider value={dispatch}>
        {children}
      </DispatchStateContext.Provider>
    </GlobalStateContext.Provider>
  )
}

export const useGlobalState = () => [
  useContext(GlobalStateContext),
  useContext(DispatchStateContext)
];
```

---

## State Structure

### Initial State

```javascript
{
  currentUser: {
    user_id: number,
    username: string,
    exp: timestamp,
    iat: timestamp,
    // ... other JWT claims
  } | null,
  
  currentUserToken: "eyJ0eXAiOiJKV1QiLCJhbGc..." | null
}
```

**currentUser**: Decoded JWT token containing user information
**currentUserToken**: Raw JWT access token string

---

## State Initialization

### On App Load

```javascript
let user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  currentUser: user ? jwtDecode(user.access) : null,
  currentUserToken: user ? user.access : null
}
```

**Flow**:
1. Check localStorage for 'user' object
2. If exists: Decode JWT access token
3. Extract user information from token
4. Set as initial state
5. If not exists: Set both to null (unauthenticated state)

---

## Context Structure

### Dual Context Pattern

**GlobalStateContext**: Holds the state values (read-only)
**DispatchStateContext**: Holds the dispatch function (write)

**Benefits**:
- Prevents unnecessary re-renders
- Components can subscribe to just state or just dispatch
- Better performance optimization

---

## Reducer Pattern

### Custom Reducer Function

```javascript
(state, newValue) => ({ ...state, ...newValue })
```

**How It Works**:
- Takes current state and new values
- Spreads current state
- Overwrites with new values
- Returns merged state object

**Example**:
```javascript
dispatch({
  currentUser: userData,
  currentUserToken: token
})
// Merges new values into existing state
```

---

## useGlobalState Hook

### Custom Hook Export

```javascript
export const useGlobalState = () => [
  useContext(GlobalStateContext),
  useContext(DispatchStateContext)
];
```

**Returns**: `[state, dispatch]` tuple (similar to useState)

**Usage in Components**:
```javascript
import { useGlobalState } from './context/GlobalState';

function MyComponent() {
  const [state, dispatch] = useGlobalState();
  
  // Read state
  const userId = state.currentUser?.user_id;
  const isAuthenticated = !!state.currentUser;
  
  // Update state
  dispatch({
    currentUser: newUserData,
    currentUserToken: newToken
  });
}
```

---

## State Operations

### 1. Login (Set User State)

**Location**: Login.js, Register.js

```javascript
const [state, dispatch] = useGlobalState();

// After successful login
let data = jwtDecode(resp.access);
await dispatch({
  currentUserToken: resp.access,
  currentUser: data,
});
```

**Flow**:
1. Receive JWT tokens from API
2. Decode access token
3. Dispatch to global state
4. State updated across all components

---

### 2. Logout (Clear User State)

**Location**: NavBar.js

```javascript
const handleLogout = (e) => {
  e.preventDefault();
  AuthService.logout();  // Clear localStorage
  navigate('/login');
  dispatch({
    currentUserToken: null,
    currentUser: null
  })
}
```

**Flow**:
1. Call AuthService.logout() (clears localStorage)
2. Dispatch null values to state
3. Navigate to login page
4. All components see unauthenticated state

---

### 3. Check Authentication

**Usage**: Any component

```javascript
const [state] = useGlobalState();

if (state.currentUser) {
  // User is authenticated
  const userId = state.currentUser.user_id;
  const username = state.currentUser.username;
} else {
  // User is not authenticated
  navigate('/login');
}
```

---

### 4. Get User Token for API Calls

**Usage**: API request components

```javascript
const [state] = useGlobalState();
const token = state.currentUserToken;

// Used by api.request.js automatically via authHeader()
```

---

## State Consumers

### Components Using Global State

1. **NavBar.js**
   - Read: currentUser (show/hide menu items)
   - Write: Logout (set to null)

2. **Login.js**
   - Write: Set user after login

3. **Register.js**
   - Write: Set user after registration

4. **Profile.js**
   - Read: currentUser (display user info)
   - Auth guard

5. **Round.js**
   - Read: currentUser (for API authentication)

6. **RoundSetup.js**
   - Read: currentUser (auth guard)

7. **RoundHistory.js**
   - Read: currentUser (auth guard)

---

## JWT Token Structure in State

### Decoded Token (currentUser)

```javascript
{
  user_id: 123,
  username: "johndoe",
  email: "john@example.com",
  exp: 1704067200,      // Expiration timestamp
  iat: 1704063600,      // Issued at timestamp
  token_type: "access"
}
```

**Accessed Via**:
```javascript
state.currentUser.user_id
state.currentUser.username
state.currentUser.exp
```

### Raw Token (currentUserToken)

```javascript
"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoi..."
```

**Used By**:
- authHeader() in auth.headers.js
- API request authentication
- Token refresh mechanism

---

## State Persistence

### localStorage Integration

**Write to localStorage**:
```javascript
// Done by AuthService.setToken()
localStorage.setItem('user', JSON.stringify({
  access: accessToken,
  refresh: refreshToken
}));
```

**Read from localStorage**:
```javascript
// Done on app initialization in GlobalState.js
let user = JSON.parse(localStorage.getItem('user'))
```

**Clear localStorage**:
```javascript
// Done by AuthService.logout()
localStorage.removeItem('user');
```

---

## State Flow Diagram

```
                    ┌──────────────┐
                    │ localStorage │
                    └──────┬───────┘
                           │
                    [App Initialization]
                           │
                           ↓
                 ┌─────────────────┐
                 │  GlobalProvider │
                 │  (initialState)  │
                 └────────┬─────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ↓                 ↓                 ↓
 ┌──────────┐      ┌──────────┐     ┌──────────┐
 │ NavBar   │      │  Login   │     │  Round   │
 │ (read)   │      │ (write)  │     │ (read)   │
 └──────────┘      └──────────┘     └──────────┘
        │                 │                 │
        │                 ↓                 │
        │          [dispatch update]        │
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
                          ↓
                 ┌─────────────────┐
                 │  State Updated  │
                 │  (all consumers │
                 │   re-render)    │
                 └─────────────────┘
```

---

## Authentication Guards

### Protected Route Pattern

```javascript
// Used in: Profile, Round, RoundSetup, RoundHistory
const [state] = useGlobalState();
let navigate = useNavigate();

useEffect(() => {
  if (!state.currentUser) {
    navigate("/login");
  }
}, [state.currentUser, navigate]);
```

**How It Works**:
1. Component mounts
2. useEffect checks currentUser
3. If null: Redirect to login
4. If exists: Continue rendering

**Alternative Pattern** (immediate check):
```javascript
useEffect(() => {
  if (!state.currentUser) {
    navigate("/login");
  }
});
```

---

## Conditional Rendering

### NavBar Menu Items

```javascript
const [state] = useGlobalState();

{!state.currentUser && (
  <Link to="/">Login</Link>
)}

{!state.currentUser && (
  <Link to="/register">Register</Link>
)}

{state.currentUser && (
  <Link to="/login" onClick={handleLogout}>Sign Out</Link>
)}
```

**Logic**:
- Show Login/Register when NOT authenticated
- Show Sign Out when authenticated

---

## State Update Patterns

### Synchronous Update

```javascript
dispatch({
  currentUser: userData,
  currentUserToken: token
});
// State immediately updated
```

### Async Update (with await)

```javascript
await dispatch({
  currentUser: data,
  currentUserToken: token
});
navigate('/main');  // Navigate after state update
```

**Note**: The await here doesn't actually wait for re-renders, it's for consistency. Consider removing for clarity.

---

## State Dependencies

### jwt-decode Library

**Installation**:
```bash
npm install jwt-decode
```

**Usage**:
```javascript
import jwtDecode from 'jwt-decode';

const decoded = jwtDecode(jwtToken);
// Returns decoded JWT payload
```

**Purpose**: Decode JWT to extract user information without verifying signature (client-side decoding only)

---

## State Best Practices

### ✅ Implemented

1. **Centralized State**: Single source of truth for user auth
2. **Context API**: Built-in React state management
3. **Custom Hook**: Easy consumption with useGlobalState()
4. **Persistence**: localStorage integration
5. **Initialization**: Restore state on page refresh
6. **Type Safety**: Consistent state shape

### ⚠️ Potential Improvements

1. **TypeScript**: Add type definitions for state shape
2. **State Validation**: Validate JWT expiration client-side
3. **Middleware**: Add logging/debugging middleware
4. **Actions**: Define action types instead of direct dispatch
5. **Testing**: Add unit tests for state operations
6. **HttpOnly Cookies**: Consider moving tokens from localStorage

---

## Example State Usage Patterns

### Read-Only Consumer

```javascript
function DisplayUser() {
  const [state] = useGlobalState();
  
  return (
    <div>
      {state.currentUser && (
        <p>Welcome, {state.currentUser.username}!</p>
      )}
    </div>
  );
}
```

### Write-Only Consumer

```javascript
function UpdateUser() {
  const [, dispatch] = useGlobalState();
  
  const updateToken = (newToken) => {
    dispatch({ currentUserToken: newToken });
  };
}
```

### Read-Write Consumer

```javascript
function UserProfile() {
  const [state, dispatch] = useGlobalState();
  
  const handleLogout = () => {
    dispatch({
      currentUser: null,
      currentUserToken: null
    });
  };
  
  return (
    <div>
      <p>{state.currentUser?.username}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
```

---

## State Lifecycle

```
1. App Loads
   ↓
2. GlobalState checks localStorage
   ↓
3. If user exists:
   - Decode JWT
   - Set currentUser
   - Set currentUserToken
   ↓
4. Components mount and consume state
   ↓
5. User actions trigger dispatch
   ↓
6. State updates
   ↓
7. Components re-render
   ↓
8. On logout:
   - Clear localStorage
   - Set state to null
   - Redirect to login
```

---

## Debugging State

### Log Current State

```javascript
const [state] = useGlobalState();
console.log('Current User:', state.currentUser);
console.log('Token:', state.currentUserToken);
```

### React DevTools

- Install React Developer Tools extension
- View Context values in Components tab
- Inspect GlobalStateContext

### localStorage Inspection

```javascript
// In browser console
console.log(localStorage.getItem('user'));
```

---

## Security Considerations

### Current Implementation

1. ✅ JWT tokens in localStorage
2. ✅ Automatic token refresh
3. ✅ Protected routes with guards
4. ✅ Token expiration handled

### Security Notes

- **localStorage**: Accessible to JavaScript (XSS vulnerability)
- **Recommendation**: Consider httpOnly cookies for tokens
- **Current**: Acceptable for demo/MVP, enhance for production
- **JWT Decoding**: Client-side only, doesn't verify signature

---

## Testing Global State

### Mock GlobalState for Tests

```javascript
// Test setup
const mockState = {
  currentUser: { user_id: 1, username: 'test' },
  currentUserToken: 'mock-token'
};

const mockDispatch = jest.fn();

// Wrap component
<GlobalStateContext.Provider value={mockState}>
  <DispatchStateContext.Provider value={mockDispatch}>
    <ComponentUnderTest />
  </DispatchStateContext.Provider>
</GlobalStateContext.Provider>
```

---

## Summary

**GlobalState provides**:
- ✅ Centralized authentication state
- ✅ User information across app
- ✅ JWT token management
- ✅ Simple API via custom hook
- ✅ Persistence via localStorage
- ✅ Auth guards for protected routes
- ✅ Clean separation of state/dispatch

**Used by all major components for**:
- Authentication status
- User identification
- Protected route access
- API authentication headers

# Authentication Persistence Implementation

## Objective
Implement session persistence for user authentication using httpOnly JWT cookies. Users should remain authenticated across browser refreshes and sessions until the JWT expires or they explicitly log out.

## Backend Requirements

### 1. Create CheckAuth Route
- Add a new route `GET /api/auth/check` in the auth routes
- Follow the existing route structure and naming conventions
- Use the existing `protectRoute` middleware for authentication
- Return the authenticated user's profile data (excluding password)

### 2. Controller Implementation
- Add `checkAuthUser` function in `authController.js`
- Follow the same error handling pattern as other auth controllers
- Use the existing `authService.getProfile()` method
- Return user data in the same format as login/register responses

## Frontend Requirements

### 1. Redux Auth Slice Updates
- Add `checkAuth` async thunk that calls the new backend route
- Add corresponding reducer cases for pending/fulfilled/rejected states
- Set initial loading state to `true` to check auth on app load
- Handle auth check failures gracefully (don't show error messages)

### 2. Authentication Provider Component
- Create `AuthProvider` component that wraps the app
- Dispatch `checkAuth` on component mount
- Show loading spinner while checking authentication status
- Only render children after auth check completes

### 3. App Integration
- Wrap existing routes with `AuthProvider`
- Maintain existing route protection logic
- Ensure no flash of unauthenticated content

### 4. Axios Interceptor
- Add response interceptor to handle 401 errors
- Automatically dispatch logout action on token expiry
- Maintain existing axios configuration

## Implementation Guidelines

### Code Quality Standards
- Follow existing code patterns and naming conventions
- Use consistent error handling across all components
- Maintain clean separation of concerns
- Keep functions focused and single-purpose
- Use existing imports and dependencies where possible

### Minimal Changes Approach
- Leverage existing authentication infrastructure
- Reuse current auth service methods
- Maintain backward compatibility
- Don't modify existing successful login/register flows

### Security Considerations
- Keep httpOnly cookie implementation unchanged
- Maintain existing JWT expiration and security settings
- Use existing middleware for route protection
- Don't expose sensitive data in client-side code

## Expected Behavior
1. User logs in successfully → JWT cookie set → redirected to protected route
2. User refreshes browser → auth check runs → user stays authenticated
3. User closes/reopens browser → auth check runs → user stays authenticated (until JWT expires)
4. JWT expires → 401 response → user automatically logged out
5. User clicks logout → cookie cleared → redirected to login

## File Structure
```
backend/src/
├── routes/auth.js (add checkAuth route)
├── controllers/authController.js (add checkAuthUser function)
└── services/AuthService.js (use existing getProfile method)

frontend/src/
├── store/authSlice.js (add checkAuth thunk)
├── components/AuthProvider.jsx (new file)
├── App.jsx (wrap with AuthProvider)
└── lib/axios.js (add response interceptor)
```

Keep the implementation simple, professional, and maintainable. Focus on reliability and user experience.

YOU MUST NOT TAKE ANY ACTION FOR GIT OR GITHUB.

Follow the below prompts only after completing the above prompt.
---


Update the /docs/DESIGN.md file for this project based on the changes we just discussed. 
Follow these rules:
- Keep the writing concise but professional.
- Use clear section headings for each decision.
- For every design choice, include: Context, Decision, and Reasoning.
- If this change modifies or replaces a previous decision, clearly note it.
- Maintain an organized, logical flow so that someone reading DESIGN.md alone can understand why each major decision was made.


---


Update the /docs/ARCHITECTURE.md file to reflect the latest changes in code or system design from this session. 
Follow these rules:
- Keep it simple and clean, using markdown headings.
- If changes affect the database, update the schema tables accordingly.
- If changes affect classes or modules, update the class/module breakdown with concise descriptions of their roles.
- If changes affect the overall system, update the technical documentation and flow diagrams/text to match.
- Ensure the document remains logically structured and self-explanatory for someone seeing it for the first time.


---


Update the /docs/AI_USAGE.md file for this project based on the AI interaction we just had. 
Follow these rules:
- Add a new numbered entry with the date and time.
- Include: Context, Exact Prompt, AI Output Summary, Applied Changes, Reasoning, Verification method, and Related Commit.
- Keep each entry self-contained so it can be understood without other context.
- Ensure the language is professional but clear for both technical and non-technical readers.

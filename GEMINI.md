Setup React Redux in the existing frontend codebase.  
Inside /src/store, create an `authSlice.js` file.  

1. **State Shape**:  
User {
  username: string,
  email: string,
  password: string
}
Also include loading (boolean) and error (string | null) fields for API status handling.

Reducers (Async Thunks):

signup → Calls backend endpoint:

Method: POST

URL: /api/auth/register

Body: { username, email, password }

On success: store returned user data in state, clear errors.

On failure: store error message in state.

login → Calls backend endpoint:

Method: POST

URL: /api/auth/login

Body: { email, password }

On success: store returned user data in state, clear errors.

On failure: store error message in state.

logout → Calls backend endpoint:

Method: POST

URL: /api/auth/logout

No body.

On success: reset user state to initial values.

On failure: store error message in state.

Implementation Notes:

Use @reduxjs/toolkit to create slice and async thunks.

Use axiosInstance from /src/lib/axios.js for all API calls.

Include clear and concise comments explaining each step.

Keep code clean, simple, and professional.

Ensure error handling covers 400 and 500 status codes.

Export the reducer and actions for use in store configuration.

Example Folder Structure:

pgsql
Copy
Edit
src/
  store/
    authSlice.js
    index.js  // where store is configured
  lib/
    axios.js
Example State Handling:

While API call is in progress → loading = true

On success → update user and set loading = false

On failure → set error message and loading = false


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

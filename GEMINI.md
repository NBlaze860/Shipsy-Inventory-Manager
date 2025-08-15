Read the files AuthService.js and authController.js to fully understand the current signup implementation — including code style, structure, and comments. 

Then, using the same clean, modular, and well-documented approach, implement the following routes in the controller and service layers:

1. **Login**
   - Accept `email` and `password` in the request body.
   - Check if the user exists in the database.
   - Compare the provided password with the hashed password using bcrypt.
   - If credentials are valid, generate an auth token with `generateToken(user._id, res)`.
   - Return user details except password in the response.
   - Return `400` for invalid credentials, `500` for server errors.

2. **Logout**
   - Clear the `jwt` cookie by setting it to an empty string with `{ maxAge: 0 }`.
   - Return a success message on logout.
   - Handle and log any server errors.

3. **Get Profile**
   - Extract the user ID from the JWT token.
   - Fetch the user details from the database using the user ID.
   - Return the user object.
   - Handle and log errors, returning `500` for internal failures.

General Requirements:
- Maintain the same clean, readable style as the signup route.
- Use async/await with try/catch for error handling.
- Use proper HTTP status codes and descriptive JSON messages.
- Keep logic separated between services and controllers.
- Include meaningful comments explaining each key step.


YOU MUST NOT TAKE ANY ACTION FOR GIT OR GITHUB.

Now follow the below prompts.
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

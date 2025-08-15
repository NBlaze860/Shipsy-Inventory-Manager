Create a new backend route in the "analytics" module for a simple product-related chatbot.

Requirements:
1. Route: POST /analytics/chatbot
2. Input: JSON body with a field "prompt" (string).
3. Authentication: Use the existing auth middleware to identify the current logged-in user.
4. Behavior:
   - Use Gemini as the LLM.
   - Respond ONLY to queries related to the current authenticated user’s products.
   - Fetch product data from the database filtered by the current user's ID.
   - If the prompt is not product-related, respond with a short message: "Not related to products."
   - Reply concisely — minimal words, only as much as needed to answer.
5. Implementation:
   - Extract the authenticated user ID from the request.
   - Get all products belonging to the user.
   - Pass both the prompt and the product list as context to Gemini.
   - Return Gemini's response in JSON { "reply": "..." }.
6. Code style: Match the existing project conventions, async/await style, and proper error handling.




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

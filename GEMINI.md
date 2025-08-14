You have access to the following files in my project: ProductService.js, ProductModel.js, and productController.js.

Step 1: Carefully read and analyze these files to fully understand:
- How the "create product" method was implemented in ProductService.js
- How the "create product" controller was implemented in productController.js
- How the ProductModel.js schema works
- Any patterns, coding style, comments, naming conventions, error handling, and data validation approaches used.

Step 2: Identify all other controllers in productController.js that currently have placeholders (no real implementation).

Step 3: For each placeholder controller:
- Implement it following the exact same style, cleanliness, professional quality, and organization as the existing "create product" controller.
- Implement their corresponding service methods in ProductService.js, following the same style, comments, and professional quality as the "create product" method.
- If any additional properties or methods are needed in the ProductModel.js to support these features, add them with clear documentation.

Step 4: Ensure:
- Code is fully functional and free from syntax errors.
- Variable naming is consistent and descriptive.
- Comments are clear, concise, and meaningful.
- All business logic resides in the service layer, not the controller.
- Controllers handle request/response and call the correct service methods.
- Proper error handling is implemented exactly as in "create product".
- Follow best practices for asynchronous code with async/await.

Output:
- The full updated code for ProductService.js and productController.js with all placeholder controllers replaced by complete, professional implementations.

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

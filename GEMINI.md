Modify the existing Node.js/Express product CRUD system to ensure authenticated users can only access their own products. Make the following minimal changes:

1. **ProductService.js**: Update all methods to accept and use a userId parameter for filtering:
   - Add userId parameter to createProduct, getProducts, getProductById, updateProduct, deleteProduct methods
   - Modify database queries to filter by userId (assuming Product model has a userId field)
   - Add userId to new product creation

2. **productController.js**: Pass the authenticated user's ID from req.user to service methods:
   - Extract userId from req.user._id in all controller functions
   - Pass userId to corresponding service methods
   - Add ownership validation for get/update/delete operations

3. **Product Model assumption**: The code should assume the Product model has a userId field that references the User model.

Requirements:
- Keep changes minimal and focused
- Add clear, self-explanatory comments
- Maintain existing error handling patterns
- Ensure users can only see/modify their own products
- Professional code style with proper validation
- No changes needed to routes or auth middleware

The auth middleware already provides req.user, so use req.user._id as the userId in controllers.



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

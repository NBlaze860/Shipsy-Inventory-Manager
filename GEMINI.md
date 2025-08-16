Create a Redux slice named "productsSlice" with the following specifications:

##### State
- name: String (required)
- description: String (default: "")
- category: String (enum: ['electronics', 'clothing', 'food', 'books', 'other'], required)
- quantity: Number (required, min: 0)
- unitPrice: Number (required, min: 0)
- isActive: Boolean (default: true)
- totalValue: Number (calculated automatically as quantity * unitPrice)

##### Reducers (with async thunks)
1. Get All Products
   - Method: GET
   - URL: /api/products
   - Auth: JWT token required
   - No request body
   - Return backend response
   - Handle errors: 401 Unauthorized, 500 Server Error

2. Get Product by ID
   - Method: GET
   - URL: /api/products/:id
   - Auth: JWT token required
   - Use product ID as parameter
   - Return backend response
   - Handle errors: 401 Unauthorized, 404 Not Found, 500 Server Error

3. Create Product
   - Method: POST
   - URL: /api/products
   - Auth: JWT token required
   - Request body fields: name (required), description (optional, default ""), category (required enum), quantity (required, min: 0), unitPrice (required, min: 0), isActive (optional, default true)
   - Return backend response
   - Handle errors: 400 Validation, 401 Unauthorized, 500 Server Error

4. Update Product
   - Method: PUT
   - URL: /api/products/:id
   - Auth: JWT token required
   - Request body: same as Create Product (all optional for update)
   - Return updated product
   - Handle errors: 400 Validation, 401 Unauthorized, 404 Not Found, 500 Server Error

5. Delete Product
   - Method: DELETE
   - URL: /api/products/:id
   - Auth: JWT token required
   - Return backend response with empty data object
   - Handle errors: 401 Unauthorized, 404 Not Found, 500 Server Error

##### Implementation Notes
- Read Auth slice implementation first and follow the same style.
- Keep the slice code simple, clean, organized, and professional.
- Add self-explanatory comments above reducers and async thunks.

##### UI Integration (Products Page)
- On dashboard load => dispatch "Get All Products" and display the products
- On form submit => dispatch "Create Product"
- On edit => dispatch "Update Product"
- On delete => dispatch "Delete Product"
- Ensure proper error handling and success notifications in the UI.


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

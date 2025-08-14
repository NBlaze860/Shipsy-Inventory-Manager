YOU MUST NOT TAKE ANY ACTION FOR GIT OR GITHUB.

Create two Mongoose model files in the `models` folder (folder already exists).  
Keep the code simple, clean, and professional, with self-explanatory comments.  

1. **User Model** (`models/User.js`):
{
  _id: ObjectId,
  username: String (unique, required),
  email: String (unique, required),
  password: String (hashed),
  role: Enum ['admin', 'user'],
  createdAt: Date
}

2. **Product Model** (`models/Product.js`):
{
  _id: ObjectId,
  name: String (required), // Text field
  description: String,
  category: Enum ['electronics', 'clothing', 'food', 'books', 'other'], // Enum field
  quantity: Number (required),
  unitPrice: Number (required),
  isActive: Boolean (default: true), // Boolean field
  totalValue: Number (calculated: quantity * unitPrice), // Calculated field
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}

**Requirements:**
- Use Mongoose syntax.
- Add appropriate validation and schema options (`timestamps` where relevant).
- Include a pre-save middleware in the Product model to calculate `totalValue`.
- Export each model with `module.exports`.
- Write concise, clear, and professional comments above fields and middleware explaining their purpose.

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

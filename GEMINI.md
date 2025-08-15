# Gemini CLI Prompt for Products.jsx

Create a complete Products.jsx React component with the following specifications:

## UI Requirements

### Layout & Theme
- Follow the same minimalistic, soothing design theme as Login.jsx and Register.jsx
- Use Tailwind CSS classes with gray-100 background, white cards, and indigo accent colors
- Maintain consistent spacing, shadows, and rounded corners (sm:rounded-lg)
- Keep the design clean, organized, and professional

### Page Structure
1. **Greeting Section**: Display a personalized greeting message at the top using the user's name from Redux auth state
2. **Add Product Button**: Prominent button above the product list to create new products
3. **Products List**: Display all products in a clean, organized format
4. **Modal Popups**: For create and edit product forms

### Product Display Format
Each product should show:
- **Name** (prominent)
- **Category** (badge/tag style)
- **Price** (formatted currency)
- **Quantity** (with unit)
- **Total Value** (calculated: price × quantity)
- **Description** (below the main details, muted text)
- **Action Buttons**: Edit and Delete buttons aligned to the right

### Product Form Fields
For both create and update modals:
- **name**: String (required)
- **description**: String (default: "")
- **category**: Dropdown/Select with options: ['electronics', 'clothing', 'food', 'books', 'other'] (required)
- **quantity**: Number input (required, min: 0)
- **unitPrice**: Number input (required, min: 0)
- **totalValue**: Auto-calculated field (quantity × unitPrice) - display only

## Technical Requirements

### State Management
- leave placeholders for now.

### Form Handling
- Use React useState for form data and modal visibility
- Implement proper form validation with toast notifications
- Reset form data after successful operations

### Modal Implementation
- Create reusable modal component or use inline modal
- Show/hide modals based on state
- Support both create and edit modes
- Include proper close functionality (X button, outside click, ESC key)

### Styling Guidelines
- Use the exact same color scheme as Login/Register pages:
  - Background: `bg-gray-100`
  - Cards: `bg-white` with `shadow` and `sm:rounded-lg`
  - Primary buttons: `bg-indigo-600 hover:bg-indigo-700`
  - Text: `text-gray-900` for headings, `text-gray-700` for labels, `text-gray-500` for muted text
  - Inputs: `border-gray-300 focus:ring-indigo-500 focus:border-indigo-500`
- Use consistent spacing: `py-8 px-4 sm:px-10` for main containers
- Button styling should match the login/register forms

### Component Structure
```jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// Import necessary actions from productsSlice

const Products = () => {
  // Component implementation here
};

export default Products;
```

### Key Features to Implement
1. **Responsive Design**: Works on mobile and desktop
2. **Loading States**: Show loading indicators during API calls
3. **Error Handling**: Display error messages via toast notifications
4. **Confirmation Dialogs**: Confirm before deleting products
5. **Form Validation**: Validate all required fields and constraints
6. **Auto-calculation**: Automatically calculate and display total value
7. **Empty State**: Show appropriate message when no products exist

### Data Flow
- Fetch products on component mount
- Update local state when Redux store changes
- Dispatch actions for CRUD operations
- Handle success/error responses appropriately

Generate a complete, production-ready React component that follows these specifications exactly. The code should be clean, well-organized, and follow React best practices.

After completing the above prompt, read the below prompts.

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

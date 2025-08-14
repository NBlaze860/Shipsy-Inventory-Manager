# Design Decisions

## Backend Project Structure

**Context:** A clear and scalable backend project structure is needed to support the development of the Shipsy Inventory Manager. The structure should be modular and easy to navigate.

**Decision:** The project will follow a feature-based structure with a clear separation of concerns. The main directories are `src/config`, `src/models`, `src/services`, `src/controllers`, `src/routes`, `src/middleware`, and `src/utils`.

**Reasoning:** This structure promotes modularity and scalability. Each feature (e.g., authentication, products) has its own set of routes, controllers, and services, making it easy to develop and maintain individual features. The separation of concerns also improves code readability and reusability.

## API Endpoints

**Context:** A well-defined set of API endpoints is required to allow the frontend to interact with the backend services.

**Decision:** The API will be structured around three main resources: Authentication, Products, and Analytics. The endpoints are as follows:

*   **Authentication**
    *   `POST /api/auth/register`: Register a new user.
    *   `POST /api/auth/login`: Log in an existing user.
    *   `GET /api/auth/profile`: Get the profile of the currently authenticated user.
*   **Products**
    *   `GET /api/products`: Get a list of all products.
    *   `GET /api/products/:id`: Get a single product by its ID.
    *   `POST /api/products`: Create a new product.
    *   `PUT /api/products/:id`: Update an existing product.
    *   `DELETE /api/products/:id`: Delete a product.
*   **Analytics**
    *   `GET /api/analytics`: A placeholder endpoint for future analytics features.

**Reasoning:** This RESTful API design is intuitive and follows standard conventions. It provides a clear and consistent way for client applications to interact with the backend. The separation of resources makes the API easy to understand and extend.

## Database Schema Design

**Context:** The application requires a robust data model to handle user management and product inventory. The schema needs to support user authentication, role-based access control, and comprehensive product management.

**Decision:** Two primary Mongoose models will be implemented with clean, minimal validation:

*   **User Model:** Contains essential user authentication data with role-based access control (admin/user roles)
*   **Product Model:** Contains core product information with automatic value calculations and user references

**Reasoning:** This design prioritizes simplicity and maintainability while providing essential functionality. The models use ES6 import/export syntax with minimal but effective validation. The User model supports authentication and authorization needs, while the Product model includes pre-save middleware for automatic total value calculations.

## Business Logic Implementation

**Context:** The business logic for creating, reading, updating, and deleting products needs to be implemented. The logic should be separated from the controller layer to maintain a clean architecture.

**Decision:** The business logic for the "create product" feature will be implemented in `ProductService.js`. The `productController.js` will handle the request and response, while the service will handle the core logic of creating a new product.

**Reasoning:** This approach follows the principle of separation of concerns, where the controller is responsible for handling HTTP requests and responses, and the service is responsible for the business logic. This makes the code more modular, testable, and easier to maintain.

## CRUD Operations for Products

**Context:** The initial implementation only included creating products. To provide full inventory management, functionality for reading, updating, and deleting products was required.

**Decision:** The remaining CRUD (Create, Read, Update, Delete) operations for products have been fully implemented. This includes:
- **Read:** `getProducts` to fetch all products and `getProductById` to fetch a single product.
- **Update:** `updateProduct` to modify an existing product.
- **Delete:** `deleteProduct` to remove a product.

These functions are implemented in `ProductService.js` with corresponding controller methods in `productController.js`.

**Reasoning:** Completing the CRUD functionality is a core requirement for the inventory management system. The implementation follows the established pattern of separating business logic into a service layer and handling HTTP requests/responses in the controller layer. This ensures consistency with the existing codebase and maintains a clean, scalable architecture. Error handling for cases like a product not being found (`404`) has been included for a robust API.

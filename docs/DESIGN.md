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
    *   `POST /api/auth/logout`: Log out the current user.
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

## User Authentication

**Context:** The application requires a secure way to authenticate users and manage their sessions.

**Decision:** User authentication will be implemented using JSON Web Tokens (JWT). The `AuthService` will handle the logic for signing up, logging in, and logging out users. The `authController` will handle the HTTP requests and responses.

*   **Login:** The login process will involve checking the user's credentials, and if they are valid, a JWT will be generated and sent to the client as a cookie.
*   **Logout:** The logout process will clear the JWT cookie.
*   **Get Profile:** The user's profile can be retrieved by a protected route that verifies the JWT.

**Reasoning:** JWT is a standard and secure way to handle authentication in web applications. Using a service layer for the business logic and a controller for handling requests and responses follows the principle of separation of concerns, making the code more modular and maintainable.

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


## User Authentication Features

**Context:** The initial authentication setup only included user registration. To provide a complete authentication system, login, logout, and profile retrieval functionalities were required.

**Decision:** The following authentication features have been implemented:
- **Login:** `login` in `AuthService.js` to authenticate users and issue a JWT.
- **Logout:** `logout` in `AuthService.js` to clear the JWT cookie.
- **Get Profile:** `getProfile` in `AuthService.js` to retrieve the profile of the currently authenticated user.

These functions are implemented in `AuthService.js` with corresponding controller methods in `authController.js`.

**Reasoning:** These features are essential for any application that requires user authentication. The implementation follows the established pattern of separating business logic into a service layer and handling HTTP requests/responses in the controller layer. This ensures consistency with the existing codebase and maintains a clean, scalable architecture. The use of JWTs provides a secure and stateless authentication mechanism.

## User-Specific Product Access

**Context:** The previous implementation allowed any authenticated user to access all products in the system. This is a security risk and does not align with the multi-user nature of the inventory management system.

**Decision:** The `ProductService` and `productController` have been updated to ensure that users can only access their own products. This was achieved by:
- Adding a `userId` parameter to all `ProductService` methods.
- Modifying the database queries in `ProductService` to filter products by `userId`.
- Passing the authenticated user's ID from `req.user._id` to the `ProductService` methods in `productController`.
- Adding ownership validation in `productController` to ensure users can only view, update, or delete their own products.

**Reasoning:** This change enforces data privacy and security by restricting access to resources based on ownership. It's a critical feature for a multi-tenant application where users' data should be isolated. This implementation is scalable and aligns with best practices for building secure applications.

## AI-Powered Product Chatbot

**Context:** Users need an intelligent way to query and interact with their product data using natural language. A chatbot interface would improve user experience and provide quick access to product information.

**Decision:** A new analytics endpoint `POST /analytics/chatbot` has been implemented with the following features:
- Uses Gemini LLM for natural language processing
- Restricts responses to product-related queries only
- Filters product data by authenticated user ID for privacy
- Returns concise, contextual responses based on user's product inventory
- Implements proper authentication middleware integration
- Provides fallback response for non-product-related queries

**Reasoning:** This feature enhances user interaction with their inventory data through conversational AI. By restricting access to user-specific products and limiting responses to product-related queries, it maintains security and relevance. The integration with existing authentication ensures data privacy while providing a modern, intuitive interface for inventory management.

## AI-Powered Product Chatbot

**Context:** Users need an intelligent way to query and interact with their product data using natural language. A chatbot interface would improve user experience and provide quick access to product information.

**Decision:** A new analytics endpoint `POST /analytics/chatbot` has been implemented with the following features:
- Uses Gemini LLM for natural language processing
- Restricts responses to product-related queries only
- Filters product data by authenticated user ID for privacy
- Returns concise, contextual responses based on user's product inventory
- Implements proper authentication middleware integration
- Provides fallback response for non-product-related queries

**Reasoning:** This feature enhances user interaction with their inventory data through conversational AI. By restricting access to user-specific products and limiting responses to product-related queries, it maintains security and relevance. The integration with existing authentication ensures data privacy while providing a modern, intuitive interface for inventory management.
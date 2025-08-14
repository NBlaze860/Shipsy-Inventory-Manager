# Architecture

## Backend Architecture

The backend follows a layered architecture to ensure a clear separation of concerns and maintainability.

### Layers

*   **Routes (`src/routes`):** Defines the API endpoints and maps them to the corresponding controllers.
    *   `auth.js`: Handles authentication-related routes (`/api/auth`).
    *   `products.js`: Handles product-related routes (`/api/products`).
    *   `analytics.js`: Handles analytics-related routes (`/api/analytics`).
*   **Controllers (`src/controllers`):** Handles incoming requests, validates the data, and calls the appropriate services to perform business logic.
    *   `authController.js`: Contains the logic for user registration, login, and profile retrieval.
    *   `productController.js`: Contains the logic for CRUD operations on products.
    *   `analyticsController.js`: Contains placeholder logic for analytics.
*   **Services (`src/services`):** Contains the core business logic of the application. It interacts with the models to access and manipulate data.
*   **Models (`src/models`):** Defines the database schemas and provides an interface to interact with the database.
*   **Middleware (`src/middleware`):** Provides a way to execute code before a request is handled by the controllers. This is used for tasks such as authentication, validation, and error handling.
*   **Config (`src/config`):** Contains configuration files for the database, JWT, and other services.
*   **Utils (`src/utils`):** Contains utility functions that can be used throughout the application.
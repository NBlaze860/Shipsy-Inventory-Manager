# Architecture

## Backend Architecture

The backend follows a layered architecture to ensure a clear separation of concerns and maintainability.

### Layers

- **Routes (`src/routes`):** Defines the API endpoints and maps them to the corresponding controllers.
  - `auth.js`: Handles authentication-related routes (`/api/auth`).
  - `products.js`: Handles product-related routes (`/api/products`).
  - `analytics.js`: Handles analytics-related routes (`/api/analytics`).
- **Controllers (`src/controllers`):** Handles incoming requests, validates the data, and calls the appropriate services to perform business logic.
  - `authController.js`: Contains the logic for user registration, login, and profile retrieval.
  - `productController.js`: Contains the logic for CRUD operations on products.
  - `analyticsController.js`: Contains placeholder logic for analytics.
- **Services (`src/services`):** Contains the core business logic of the application. It interacts with the models to access and manipulate data.
- **Models (`src/models`):** Defines the database schemas and provides an interface to interact with the database.
  - `User.js`: User authentication and authorization model with role-based access control.
  - `Product.js`: Product inventory model with automatic value calculations and user references.
- **Middleware (`src/middleware`):** Provides a way to execute code before a request is handled by the controllers. This is used for tasks such as authentication, validation, and error handling.
- **Config (`src/config`):** Contains configuration files for the database, JWT, and other services.
- **Utils (`src/utils`):** Contains utility functions that can be used throughout the application.

## Database Schema

### User Model

| Field     | Type     | Constraints                              | Description                      |
| --------- | -------- | ---------------------------------------- | -------------------------------- |
| \_id      | ObjectId | Auto-generated                           | Primary key                      |
| username  | String   | Required, unique                         | User identification              |
| email     | String   | Required, unique                         | Authentication and communication |
| password  | String   | Required, min 6 chars                    | Hashed password for security     |
| role      | String   | Enum: ['admin', 'user'], default: 'user' | Role-based access control        |
| createdAt | Date     | Auto-generated                           | Account creation timestamp       |
| updatedAt | Date     | Auto-generated                           | Last modification timestamp      |

### Product Model

| Field       | Type     | Constraints                                                           | Description                 |
| ----------- | -------- | --------------------------------------------------------------------- | --------------------------- |
| \_id        | ObjectId | Auto-generated                                                        | Primary key                 |
| name        | String   | Required                                                              | Product identification      |
| description | String   | Default: ""                                                           | Product details             |
| category    | String   | Required, enum: ['electronics', 'clothing', 'food', 'books', 'other'] | Product categorization      |
| quantity    | Number   | Required, min 0                                                       | Inventory quantity          |
| unitPrice   | Number   | Required, min 0                                                       | Price per unit              |
| isActive    | Boolean  | Default: true                                                         | Product availability flag   |
| totalValue  | Number   | Auto-calculated                                                       | quantity × unitPrice        |
| createdBy   | ObjectId | Required, ref: User                                                   | Product creator reference   |
| createdAt   | Date     | Auto-generated                                                        | Creation timestamp          |
| updatedAt   | Date     | Auto-generated                                                        | Last modification timestamp |

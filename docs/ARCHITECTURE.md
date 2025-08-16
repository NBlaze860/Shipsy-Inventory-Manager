# Architecture

## Backend Architecture

The backend follows a layered architecture to ensure a clear separation of concerns and maintainability.

### Layers

- **Routes (`src/routes`):** Defines the API endpoints and maps them to the corresponding controllers.
  - `auth.js`: Handles authentication-related routes (`/api/auth`) including the new `/check` endpoint for session persistence.
  - `products.js`: Handles product-related routes (`/api/products`).
  - `analytics.js`: Handles analytics-related routes (`/api/analytics`) including the AI chatbot endpoint for product queries.
- **Controllers (`src/controllers`):** Handles incoming requests, validates the data, and calls the appropriate services to perform business logic.
  - `authController.js`: Contains the logic for user registration, login, logout, profile retrieval, and authentication checking for session persistence.
  - `productController.js`: Contains the logic for CRUD operations on products, ensuring that users can only access their own products by passing the authenticated user's ID to the service layer and handling ownership validation.
  - `analyticsController.js`: Contains analytics logic including AI-powered chatbot functionality for product queries using Gemini LLM with authentication and user-specific product filtering.
- **Services (`src/services`):** Contains the core business logic of the application. It interacts with the models to access and manipulate data.
  - `AuthService.js`: Handles the business logic for user signup, login, logout, and profile retrieval.
  - `ProductService.js`: Implements the business logic for all CRUD operations on products, filtering products based on the `userId` to ensure data privacy.
  - `AnalyticsService.js`: A placeholder for future analytics-related business logic.
  - `GeminiService.js`: Handles AI-powered natural language processing for product queries using Google's Gemini LLM, with built-in query validation and context construction.
- **Models (`src/models`):** Defines the database schemas and provides an interface to interact with the database.
  - `User.js`: User authentication and authorization model with role-based access control.
  - `Product.js`: Product inventory model with automatic value calculations and user references.
- **Middleware (`src/middleware`):** Provides a way to execute code before a request is handled by the controllers. This is used for tasks such as authentication, validation, and error handling.
- **Config (`src/config`):** Contains configuration files for the database, JWT, and other services.
- **Utils (`src/utils`):** Contains utility functions that can be used throughout the application.

## Frontend Architecture

The frontend is structured to support a scalable and maintainable React application, with a clear separation of concerns.

### Directory Structure

- **`src/components`**: Contains reusable components that are used across different parts of the application.
  - `ui/`: Basic, general-purpose UI elements like buttons, inputs, and modals.
  - `layout/`: Components that define the overall structure of the application, such as headers, footers, and sidebars.
  - `auth/`, `products/`, `analytics/`: Feature-specific components related to authentication, products, and analytics.
  - `common/`: Components that are shared across multiple features, such as the `Pagination.jsx` component.
- **`src/pages`**: Contains top-level components that represent the different pages of the application (e.g., `Login.jsx`, `Register.jsx`, `Products.jsx`). Each page component is responsible for composing the layout and components for a specific route.
- **`src/store`**: Holds all the Redux-related code for state management.
  - `store.js`: The main Redux store configuration.
  - `*Slice.js`: Redux Toolkit slices that define the state, reducers, and actions for different features (e.g., `authSlice.js`, `productsSlice.js`).
- **`src/utils`**: A collection of helper functions and utilities that can be used throughout the application.
- **`src/styles`**: Contains global CSS files and styling-related configurations.

### Routing

The frontend routing is managed by `react-router-dom`. The main application routes are defined in `App.jsx`:
- `/login`: The default route, which renders the `Login` component.
- `/register`: Renders the `Register` component.
- `/products`: Renders the `Products` component.
- `/`: Redirects to `/login`.

### Redux Auth Slice

The `authSlice.js` file is a key part of the frontend state management, responsible for handling all authentication-related logic. It uses Redux Toolkit's `createSlice` and `createAsyncThunk` to manage the user's authentication state.

- **State Shape:** The slice manages the `user` object, a `loading` boolean, and an `error` string/null.
- **Async Thunks:**
  - `signup`: Handles user registration by making a `POST` request to `/api/auth/register`.
  - `login`: Handles user login by making a `POST` request to `/api/auth/login`.
  - `logout`: Handles user logout by making a `POST` request to `/api/auth/logout`.
  - `checkAuth`: Handles authentication verification by making a `GET` request to `/api/auth/check` for session persistence.
- **Reducers:** The slice includes reducers to handle the pending, fulfilled, and rejected states of the async thunks, updating the state accordingly. The initial loading state is set to `true` to check authentication on app initialization.

### Redux Products Slice

The `productsSlice.js` file manages all product-related state and operations in the frontend application. It follows the same architectural patterns as the auth slice for consistency.

- **State Shape:** The slice manages a `products` array, a `loading` boolean, and an `error` string/null.
- **Async Thunks:**
  - `getAllProducts`: Fetches all user products by making a `GET` request to `/api/products`.
  - `getProductById`: Fetches a specific product by making a `GET` request to `/api/products/:id`.
  - `createProduct`: Creates a new product by making a `POST` request to `/api/products`.
  - `updateProduct`: Updates an existing product by making a `PUT` request to `/api/products/:id`.
  - `deleteProduct`: Deletes a product by making a `DELETE` request to `/api/products/:id`.
- **Reducers:** The slice includes reducers to handle the pending, fulfilled, and rejected states of all async thunks, with proper state updates for CRUD operations including optimistic updates for create, update, and delete operations.

### Authentication Flow

The application implements session persistence using httpOnly JWT cookies:

1. **Initial Load:** App.jsx dispatches `checkAuth` on component mount using useEffect
2. **Authentication Check:** `GET /api/auth/check` validates JWT cookie and returns user data
3. **Loading State:** App shows loading spinner while checking authentication
4. **Route Protection:** Routes render based on authentication state after check completes
5. **Manual Logout:** Clears JWT cookie and redirects to login page

### Logout Flow

1.  **User Action:** The user clicks the "Logout" button in the application's header.
2.  **Dispatch Action:** The `handleLogout` function is called, which dispatches the `logout` async thunk from `authSlice`.
3.  **API Request:** The `logout` thunk sends a `POST` request to the `/api/auth/logout` endpoint on the backend.
4.  **Clear Cookie:** The backend clears the httpOnly JWT cookie, effectively logging the user out on the server side.
5.  **Update State:** Upon a successful API response, the `logout.fulfilled` reducer in `authSlice` is executed, setting the `user` state to `null`.
6.  **Redirect:** The `handleLogout` function in the `Products` component uses the `useNavigate` hook to redirect the user to the `/login` page.
7.  **UI Update:** The application's UI re-renders, and because the `user` is `null`, the routing logic in `App.jsx` ensures that the `Login` page is displayed.

### HTTP Client Configuration

The frontend uses Axios with the following configuration:
- **Base URL:** Automatically detects development vs production environment
- **Credentials:** `withCredentials: true` for cookie-based authentication

## Database Schema

### User Model

| Field     | Type     | Constraints                              | Description                      |
| --------- | -------- | ---------------------------------------- | -------------------------------- |
| _id      | ObjectId | Auto-generated                           | Primary key                      |
| username  | String   | Required, unique                         | User identification              |
| email     | String   | Required, unique                         | Authentication and communication |
| password  | String   | Required, min 6 chars                    | Hashed password for security     |
| role      | String   | Enum: ['admin', 'user'], default: 'user' | Role-based access control        |
| createdAt | Date     | Auto-generated                           | Account creation timestamp       |
| updatedAt | Date     | Auto-generated                           | Last modification timestamp      |

### Product Model

| Field       | Type     | Constraints                                                           | Description                 |
| ----------- | -------- | --------------------------------------------------------------------- | --------------------------- |
| _id        | ObjectId | Auto-generated                                                        | Primary key                 |
| name        | String   | Required                                                              | Product identification      |
| description | String   | Default: ""                                                           | Product details             |
| category    | String   | Required, enum: ['electronics', 'clothing', 'food', 'books', 'other'] | Product categorization      |
| quantity    | Number   | Required, min 0                                                       | Inventory quantity          |
| unitPrice   | Number   | Required, min 0                                                       | Price per unit              |
| isActive    | Boolean  | Default: true                                                         | Product availability flag   |
| totalValue  | Number   | Auto-calculated                                                       | quantity × unitPrice        |
| userId      | ObjectId | Required, ref: User                                                   | Product creator reference   |
| createdAt   | Date     | Auto-generated                                                        | Creation timestamp          |
| updatedAt   | Date     | Auto-generated                                                        | Last modification timestamp |

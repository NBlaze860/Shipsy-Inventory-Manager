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

## Frontend Project Structure

**Context:** A well-organized frontend project structure is essential for building a scalable and maintainable React application. The structure should provide clear separation of concerns and make it easy for developers to locate and work on different parts of the application.

**Decision:** The frontend will adopt a standard feature-based folder structure. The main directories under `src/` are:
- `components/`: For reusable UI components, further divided into `ui/`, `layout/`, `auth/`, `products/`, and `analytics/`.
- `pages/`: For top-level page components that correspond to application routes.
- `store/`: For Redux state management, including the store configuration and slices for different features.
- `utils/`: For utility functions and helpers.
- `styles/`: For global styles.

## Login and Register Pages

**Context:** The application requires user-friendly and visually appealing pages for user registration and login. These pages are the entry point for users and should provide a seamless experience.

**Decision:** Two new pages, `Login.jsx` and `Register.jsx`, have been created with the following features:
- **Minimalistic Design:** A clean and simple design with a soothing color palette, generous spacing, and readable typography.
- **Centered Form:** The login and registration forms are placed in a centered card-like container to draw the user's attention.
- **Rounded Input Fields:** Input fields are rounded to give a modern and friendly look.
- **Form Validation:** Client-side validation is implemented to provide immediate feedback to the user.
- **Toast Notifications:** `react-toastify` is used to display clear and concise error messages.
- **Navigation:** A clear link is provided to navigate between the login and register pages.

**Reasoning:** The design choices are aimed at providing a positive user experience and making the authentication process as smooth as possible. The minimalistic design reduces distractions, while the centered form and clear validation messages guide the user through the process. The use of toast notifications provides non-intrusive feedback, and the navigation link improves the overall usability of the application.

## Frontend Routing

**Context:** A robust routing solution is needed to manage navigation between different pages in the frontend application.

**Decision:** `react-router-dom` will be used for handling client-side routing. The main routes are:
- `/login`: The default route, which displays the login page.
- `/register`: Displays the registration page.
- `/dashboard`: A placeholder for the main application dashboard.

**Reasoning:** `react-router-dom` is the standard routing library for React applications. It provides a declarative way to manage routes and navigation, making the application easy to understand and maintain. Setting `/login` as the default route ensures that unauthenticated users are directed to the login page first.

## Frontend State Management with Redux

**Context:** As the application grows, managing state with React's built-in state management can become complex. A centralized state management solution is needed to handle application-wide state, such as user authentication and product data.

**Decision:** Redux Toolkit will be used for state management in the frontend. An `authSlice` has been created to handle user authentication, including `signup`, `login`, and `logout` actions. The Redux store has been configured and provided to the application using `react-redux`.

**Reasoning:** Redux Toolkit is the recommended approach for writing Redux logic. It simplifies store setup, reduces boilerplate code, and includes built-in best practices. Using Redux for state management provides a single source of truth for the application's state, making it easier to debug and maintain. The `authSlice` encapsulates all authentication-related state and logic, promoting a modular and organized codebase.

## Redux Auth Slice State Shape

**Context:** The `authSlice` in the Redux store needs a well-defined state shape to manage user authentication data, loading states, and errors effectively.

**Decision:** The `authSlice` will have the following state shape:
- `user`: An object containing the authenticated user's data (`{_id, username, email, role}`) upon successful login or signup, and `null` when logged out or in an unauthenticated state.
- `loading`: A boolean flag to indicate when an asynchronous authentication operation (signup, login, logout) is in progress.
- `error`: A string or `null` to store any error messages that occur during authentication, allowing the UI to display feedback to the user.

**Reasoning:** This state shape provides a clear and comprehensive representation of the authentication status. Storing the user object allows the application to easily access user information. The `loading` state is crucial for providing UI feedback during asynchronous operations, such as showing a spinner. The `error` state enables robust error handling and communication of issues to the user. This structure is clean, simple, and aligns with best practices for managing asynchronous state in Redux.

## Authentication Persistence

**Context:** Users expect to remain authenticated across browser refreshes and sessions until they explicitly log out or their session expires. The initial implementation required users to log in again after every browser refresh, creating a poor user experience.

**Decision:** Session persistence has been implemented using httpOnly JWT cookies with the following components:
- **Backend:** New `GET /api/auth/check` route with `checkAuthUser` controller that validates JWT and returns user profile
- **Frontend:** `checkAuth` async thunk in Redux that calls the auth check endpoint on app initialization
- **App-level Auth Check:** Direct integration in App.jsx using useEffect to dispatch checkAuth on mount
- **Initial Loading State:** App starts with `loading: true` to check authentication before rendering routes

**Reasoning:** This implementation provides seamless user experience by maintaining authentication state across sessions while keeping the code simple and maintainable. The httpOnly cookies prevent XSS attacks, the auth check endpoint reuses existing authentication middleware, and the loading state prevents flash of unauthenticated content. By integrating the auth check directly in App.jsx, we avoid unnecessary component abstraction while maintaining clean separation of concerns.

## Products Page UI

**Context:** The application needs a dedicated page to display and manage the user's products. The design should be consistent with the existing login and register pages, providing a clean, intuitive, and professional user experience.

**Decision:** A new `Products.jsx` page has been created with the following design and features:
- **Layout & Theme:** Follows the same minimalistic theme with a `bg-gray-100` background, `bg-white` cards, and `indigo` accent colors. Consistent spacing, shadows, and `sm:rounded-lg` corners are used to maintain visual harmony with the rest of the application.
- **Greeting Section:** A personalized greeting message (`Welcome, {user.username}!`) is displayed at the top to create a welcoming experience.
- **Add Product Button:** A prominent "Add Product" button is placed above the product list, making it easy for users to create new products.
- **Products List:** Products are displayed in a responsive grid layout. Each product card shows the product's name, category, price, quantity, and total value. Edit and delete buttons are included for each product.
- **Modal for Create/Edit:** A single, reusable modal is used for both creating and editing products. The modal includes a form with fields for name, description, category, quantity, and unit price. The total value is automatically calculated and displayed.
- **Empty State:** A message is displayed when the user has no products, guiding them to add their first product.

**Reasoning:** This design provides a comprehensive and user-friendly interface for managing products. The consistent theme and layout create a cohesive user experience. The use of a modal for create/edit operations keeps the main page clean and focused. The responsive grid ensures that the page looks good on all devices. The empty state improves the user experience for new users.

## Pagination for Products Page

**Context:** The Products page previously displayed all products on a single page. As the number of products grows, this can lead to performance issues and a cluttered user interface.

**Decision:** Pagination has been added to the Products page to display a limited number of products per page (9). A reusable `Pagination` component has been created with the following features:
- **Controls:** Includes "Previous" and "Next" buttons, as well as page numbers.
- **Styling:** Matches the existing design system, with the current page highlighted in indigo.
- **Logic:** The pagination logic is handled in the `Products.jsx` component, which slices the product list based on the current page.

**Reasoning:** Pagination improves the user experience and performance of the Products page by breaking down a large number of products into smaller, more manageable chunks. The reusable `Pagination` component promotes code reuse and maintains a consistent look and feel across the application. The styling is consistent with the existing design system, ensuring a seamless user experience.

## Product Filtering

**Context:** To enhance the usability of the Products page, users need the ability to filter the product list based on specific criteria.

**Decision:** A set of filter controls has been added to the Products page, allowing users to filter by category, minimum total value, and maximum total value. A reusable `FilterControls` component was created to encapsulate the filter UI.

- **Controls:** The filter controls include a dropdown for category and number inputs for minimum and maximum total value.
- **Logic:** The filtering logic is implemented in the `Products.jsx` component. It uses the `filter` method to apply the selected filters to the product list. The pagination is reset to the first page whenever a filter is changed.
- **Styling:** The filter controls are styled to match the existing form elements in the application, ensuring a consistent look and feel.

**Reasoning:** The addition of filtering functionality provides users with a powerful tool to quickly find the products they are looking for. The reusable `FilterControls` component promotes code reuse and separation of concerns. The decision to reset the pagination on filter changes ensures a better user experience by preventing users from being on a page that no longer exists after filtering.

## Product Sorting

**Context:** To further enhance the usability of the Products page, users need the ability to sort the product list based on specific criteria.

**Decision:** A sorting dropdown has been added to the filter bar, allowing users to sort products by unit price in ascending or descending order. The default option is to not sort the products.

- **Controls:** The sorting control is a dropdown with options for "Default", "Price: Low to High", and "Price: High to Low".
- **Logic:** The sorting logic is implemented in the `Products.jsx` component. It uses the `sort` method to apply the selected sorting to the filtered product list. The sorting is applied after filtering but before pagination.
- **Styling:** The sorting dropdown is styled to match the existing filter controls, ensuring a consistent look and feel.

**Reasoning:** The addition of sorting functionality provides users with another powerful tool to organize and find the products they are looking for. The implementation is consistent with the existing filtering and pagination logic, ensuring a seamless user experience.

## Real-time Product Search

**Context:** To provide an even more intuitive and efficient way to find products, a real-time search bar was needed in the filter controls.

**Decision:** A search input field has been added to the `FilterControls` component, allowing users to search for products by name in real-time. The search is case-insensitive and matches partial strings.

- **Controls:** The search control is a text input field with a placeholder to guide the user.
- **Logic:** The search logic is implemented in the `Products.jsx` component. It uses the `filter` method with `includes` to perform a case-insensitive search on the product names. The search is applied before any other filters.
- **Styling:** The search input is styled to match the other filter controls, and it is placed as the first element in the filter bar.

**Reasoning:** The real-time search functionality provides users with immediate feedback as they type, making it faster and easier to find specific products. The case-insensitive and partial matching capabilities make the search more user-friendly. Placing the search bar as the first element in the filter bar follows a common and intuitive design pattern.
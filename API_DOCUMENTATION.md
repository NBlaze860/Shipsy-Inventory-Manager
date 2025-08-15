# Backend API Documentation

## Overview
This is a Node.js/Express backend API for a product management system with user authentication. The API uses MongoDB for data storage, JWT for authentication, and includes AI-powered analytics via Google Gemini.

## Base URL
```
http://localhost:8000
```

## Authentication System

### Authentication Method
- **Type**: JWT (JSON Web Tokens)
- **Storage**: HTTP-only cookies
- **Token Name**: `jwt`
- **Expiration**: 7 days
- **Security**: 
  - HttpOnly cookies (prevents XSS)
  - SameSite: strict
  - Secure flag in production

### Authentication Flow
1. User registers/logs in → Server generates JWT → Token stored in HTTP-only cookie
2. Protected routes require valid JWT in cookie
3. Middleware validates token and attaches user to request object
4. User-specific data is filtered by `createdBy` field

---

## API Endpoints

### Authentication Endpoints

#### 1. Register User
- **Method**: `POST`
- **URL**: `/api/auth/register`
- **Authentication**: None required
- **Request Body**:
```json
{
  "username": "string (required, unique)",
  "email": "string (required, unique, valid email)",
  "password": "string (required, min 6 characters)",
  "role": "string (optional, 'admin' | 'user', defaults to 'user')"
}
```
- **Success Response** (201):
```json
{
  "_id": "string",
  "username": "string",
  "email": "string",
  "role": "string"
}
```
- **Error Responses**:
  - `400`: Validation errors (missing fields, weak password, duplicate username/email)
  - `500`: Internal server error
- **Example Request**:
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### 2. Login User
- **Method**: `POST`
- **URL**: `/api/auth/login`
- **Authentication**: None required
- **Request Body**:
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```
- **Success Response** (200):
```json
{
  "_id": "string",
  "username": "string",
  "email": "string",
  "role": "string"
}
```
- **Error Responses**:
  - `400`: Invalid credentials
  - `500`: Internal server error
- **Example Request**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### 3. Logout User
- **Method**: `POST`
- **URL**: `/api/auth/logout`
- **Authentication**: None required
- **Request Body**: None
- **Success Response** (200):
```json
{
  "message": "Logged out successfully"
}
```
- **Error Responses**:
  - `500`: Internal server error

#### 4. Get User Profile
- **Method**: `GET`
- **URL**: `/api/auth/profile`
- **Authentication**: Required (JWT token)
- **Request Body**: None
- **Success Response** (200):
```json
{
  "_id": "string",
  "username": "string",
  "email": "string",
  "role": "string",
  "createdAt": "ISO date string",
  "updatedAt": "ISO date string"
}
```
- **Error Responses**:
  - `401`: Unauthorized (no token or invalid token)
  - `404`: User not found
  - `500`: Internal server error

---

### Product Management Endpoints

All product endpoints require authentication via JWT token in cookies.

#### 1. Get All Products
- **Method**: `GET`
- **URL**: `/api/products`
- **Authentication**: Required (JWT token)
- **Request Body**: None
- **Success Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "_id": "string",
      "name": "string",
      "description": "string",
      "category": "electronics | clothing | food | books | other",
      "quantity": "number",
      "unitPrice": "number",
      "isActive": "boolean",
      "totalValue": "number (calculated: quantity * unitPrice)",
      "createdBy": "string (user ID)",
      "createdAt": "ISO date string",
      "updatedAt": "ISO date string"
    }
  ]
}
```
- **Error Responses**:
  - `401`: Unauthorized
  - `500`: Internal server error

#### 2. Get Product by ID
- **Method**: `GET`
- **URL**: `/api/products/:id`
- **Authentication**: Required (JWT token)
- **URL Parameters**: 
  - `id`: MongoDB ObjectId of the product
- **Success Response** (200):
```json
{
  "success": true,
  "data": {
    "_id": "string",
    "name": "string",
    "description": "string",
    "category": "string",
    "quantity": "number",
    "unitPrice": "number",
    "isActive": "boolean",
    "totalValue": "number",
    "createdBy": "string",
    "createdAt": "ISO date string",
    "updatedAt": "ISO date string"
  }
}
```
- **Error Responses**:
  - `401`: Unauthorized
  - `404`: Product not found or no permission
  - `500`: Internal server error

#### 3. Create Product
- **Method**: `POST`
- **URL**: `/api/products`
- **Authentication**: Required (JWT token)
- **Request Body**:
```json
{
  "name": "string (required)",
  "description": "string (optional, defaults to empty string)",
  "category": "electronics | clothing | food | books | other (required)",
  "quantity": "number (required, min: 0)",
  "unitPrice": "number (required, min: 0)",
  "isActive": "boolean (optional, defaults to true)"
}
```
- **Success Response** (201):
```json
{
  "success": true,
  "data": {
    "_id": "string",
    "name": "string",
    "description": "string",
    "category": "string",
    "quantity": "number",
    "unitPrice": "number",
    "isActive": "boolean",
    "totalValue": "number",
    "createdBy": "string",
    "createdAt": "ISO date string",
    "updatedAt": "ISO date string"
  }
}
```
- **Error Responses**:
  - `400`: Validation error (invalid data)
  - `401`: Unauthorized
  - `500`: Internal server error
- **Example Request**:
```json
{
  "name": "iPhone 15",
  "description": "Latest iPhone model",
  "category": "electronics",
  "quantity": 10,
  "unitPrice": 999.99
}
```

#### 4. Update Product
- **Method**: `PUT`
- **URL**: `/api/products/:id`
- **Authentication**: Required (JWT token)
- **URL Parameters**: 
  - `id`: MongoDB ObjectId of the product
- **Request Body**: Same as Create Product (all fields optional for update)
- **Success Response** (200):
```json
{
  "success": true,
  "data": {
    // Updated product object
  }
}
```
- **Error Responses**:
  - `400`: Validation error
  - `401`: Unauthorized
  - `404`: Product not found or no permission
  - `500`: Internal server error

#### 5. Delete Product
- **Method**: `DELETE`
- **URL**: `/api/products/:id`
- **Authentication**: Required (JWT token)
- **URL Parameters**: 
  - `id`: MongoDB ObjectId of the product
- **Success Response** (200):
```json
{
  "success": true,
  "data": {}
}
```
- **Error Responses**:
  - `401`: Unauthorized
  - `404`: Product not found or no permission
  - `500`: Internal server error

---

### Analytics Endpoints

#### 1. AI Chatbot
- **Method**: `POST`
- **URL**: `/api/analytics/chatbot`
- **Authentication**: Required (JWT token)
- **Request Body**:
```json
{
  "prompt": "string (required, non-empty)"
}
```
- **Success Response** (200):
```json
{
  "reply": "string (AI-generated response about user's products)"
}
```
- **Error Responses**:
  - `400`: Invalid prompt (empty or missing)
  - `401`: Unauthorized
  - `503`: AI service unavailable
  - `500`: Internal server error
- **Example Request**:
```json
{
  "prompt": "What are my most expensive products?"
}
```

---

## Middleware

### Authentication Middleware (`protectRoute`)
- **Purpose**: Validates JWT tokens and protects routes
- **Implementation**: 
  - Extracts JWT from `jwt` cookie
  - Verifies token using `JWT_SECRET`
  - Fetches user from database (excluding password)
  - Attaches user object to `req.user`
- **Applied to**: All product endpoints and user profile endpoint

### Built-in Express Middleware
- **JSON Parser**: `express.json()` - Parses JSON request bodies
- **Cookie Parser**: `cookieParser()` - Parses cookies from requests

---

## CORS Configuration
- **Status**: Not explicitly configured
- **Default Behavior**: Same-origin requests only
- **Recommendation**: Add CORS middleware for frontend integration

---

## Rate Limiting
- **Status**: Not implemented
- **Recommendation**: Add rate limiting for production use

---

## Data Models

### User Model
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, min: 6, hashed),
  role: String (enum: ['admin', 'user'], default: 'user'),
  createdAt: Date,
  updatedAt: Date
}
```

### Product Model
```javascript
{
  name: String (required),
  description: String (default: ""),
  category: String (enum: ['electronics', 'clothing', 'food', 'books', 'other'], required),
  quantity: Number (required, min: 0),
  unitPrice: Number (required, min: 0),
  isActive: Boolean (default: true),
  totalValue: Number (calculated automatically),
  createdBy: ObjectId (ref: 'User', required),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Environment Variables Required

```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/your-database
JWT_SECRET=your-secret-key
GEMINI_API_KEY=your-gemini-api-key
NODE_ENV=development
```

---

## Frontend Integration Guidelines

### Authentication Flow for React
1. **Login/Register**: POST to auth endpoints, server sets HTTP-only cookie
2. **Authenticated Requests**: Include credentials in fetch options
3. **Token Management**: Automatic via cookies (no manual token handling)
4. **Logout**: POST to logout endpoint to clear cookie

### Example Fetch Configuration
```javascript
// For authenticated requests
fetch('/api/products', {
  method: 'GET',
  credentials: 'include', // Important: includes cookies
  headers: {
    'Content-Type': 'application/json'
  }
})

// For requests with body
fetch('/api/products', {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(productData)
})
```

### Error Handling
- Always check response status codes
- Handle 401 errors by redirecting to login
- Parse error messages from response body
- Implement loading states for better UX

### State Management Recommendations
- Store user data in React state/context after login
- Implement optimistic updates for better UX
- Cache product data and sync with server
- Handle offline scenarios gracefully

---

## Security Considerations

1. **Password Security**: Bcrypt hashing with salt rounds
2. **JWT Security**: HTTP-only cookies prevent XSS attacks
3. **Authorization**: User-scoped data access (products filtered by `createdBy`)
4. **Input Validation**: Server-side validation for all inputs
5. **Error Handling**: Generic error messages to prevent information leakage

---

## Dependencies

### Core Dependencies
- `express`: Web framework
- `mongoose`: MongoDB ODM
- `jsonwebtoken`: JWT implementation
- `bcryptjs`: Password hashing
- `cookie-parser`: Cookie parsing middleware
- `dotenv`: Environment variable management

### AI Integration
- `@google/generative-ai`: Google Gemini AI integration

---

This documentation provides everything needed to integrate a React frontend with this backend API. The authentication system uses secure HTTP-only cookies, and all endpoints follow RESTful conventions with consistent error handling and response formats.
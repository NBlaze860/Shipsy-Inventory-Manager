# 🏪 Shipsy Inventory Manager

> **AI-Powered Product Inventory Management System**

A modern, full-stack web application that combines intelligent product inventory management with AI-powered analytics. Built with React, Node.js, and Google Gemini AI to provide businesses with smart inventory insights and natural language query capabilities.

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![Node.js](https://img.shields.io/badge/node.js-v18+-green.svg)
![React](https://img.shields.io/badge/react-v19+-blue.svg)
![MongoDB](https://img.shields.io/badge/mongodb-cloud-green.svg)

---

## 🚀 Quick Start Guide

**Want to test the app immediately? Here's how to get started in 5 minutes:**

### Test Login Credentials

Use these credentials to explore the app without creating an account:

- **Email:** `ab@ab.com`
- **Password:** `123456`

### How to Launch the App

1. **Start the Backend:**

   ```bash
   cd backend
   npm start
   ```

   ✅ Server will run on `http://localhost:8000`

2. **Start the Frontend:**

   ```bash
   cd frontend
   npm run dev
   ```

   ✅ App will open at `http://localhost:5173`

3. **Login and Explore:**
   - Open `http://localhost:5173` in your browser
   - Use the test credentials above to login

### What You Can Do Right Away

**📦 Product Management:**

- Add new products using the "Add Product" button
- Edit and delete existing products
- Search products by name in real-time
- Filter products by category (electronics, clothing, books, food)
- Filter by price range (min/max total value)
- Sort products by price (low to high, high to low)

**🤖 AI Assistant:**

- Click the chat bubble icon in the bottom-right corner
- Ask questions about your inventory in plain English:
  - "How many electronics do I have?"
  - "What's my total inventory value?"
  - "Show me products under $100"
- Get instant, intelligent responses

**User Management:**

- Each user has their own private inventory
- Secure authentication with automatic session persistence
- Logout anytime with the logout button

---

## 🎯 Features & Functionalities Overview

### Core Features Explained

**Product Inventory Management**

- **What it does:** Complete CRUD operations for your product inventory
- **How to use:** Click "Add Product" to create new items, edit/delete existing ones
- **Navigation:** All products appear as cards on the main dashboard

**Smart Search & Filtering**

- **What it does:** Find products quickly using multiple filter options
- **How to use:** Use the filter bar above the product grid
- **Navigation:** Filters apply instantly as you type or select options

**AI-Powered Chat Assistant**

- **What it does:** Answer questions about your inventory using natural language
- **How to use:** Click the chat bubble and ask "How many electronics do I have?"
- **Navigation:** Chat stays open while you browse, maintaining context

**User Authentication**

- **What it does:** Secure login/logout with session management
- **How to use:** Register new account or login with existing credentials
- **Navigation:** Logout button available in the header

**Responsive Design**

- **What it does:** Works seamlessly across desktop, tablet, and mobile devices
- **How to use:** Access from any device - layout adapts automatically
- **Navigation:** Same features available on all screen sizes

---

## 🔄 Complete App Workflow

### User Journey (Step-by-Step)

**Getting Started:**

1. Open the application in your browser
2. Register a new account or login with existing credentials
3. You'll see the main dashboard with your product inventory

**Daily Usage Flow:**

1. **View Inventory:** See all your products in an organized grid layout
2. **Add Products:** Click "Add Product" to create new inventory items
3. **Manage Products:** Edit or delete existing products as needed
4. **Search & Filter:** Use the filter bar to quickly find specific products
5. **Get AI Insights:** Click chat bubble to ask questions about your inventory
6. **Logout:** Click "Logout" when finished

**Key User Interactions:**

- **Product Cards:** Click to view/edit individual products
- **Filter Bar:** Real-time search and filtering
- **Chat Widget:** Fixed position chat assistant (bottom-right of page)

### For Developers

**Application Architecture Flow:**

**Frontend (React) ↔ Backend (Express) ↔ Database (MongoDB) + AI (Gemini)**

1. **Authentication Flow:**

   - User submits credentials to `/api/auth/login`
   - Backend validates credentials → Issues JWT cookie
   - Frontend stores auth state in Redux → Redirects to dashboard
   - Session persists across browser refreshes via JWT cookie

2. **Product Management Flow:**

   - Frontend sends CRUD requests to `/api/products`
   - Backend processes requests with user authentication
   - Database returns results → Backend sends to frontend
   - UI updates in real-time with new data

3. **AI Chat Flow:**

   - User types question → Frontend sends to chat component
   - Message sent to `/api/analytics/chatbot` → Backend validates user
   - Backend sends user's inventory data + question to Gemini AI
   - AI processes query → Returns intelligent response
   - Response displayed in chat interface

4. **Data Security Flow:**
   - All API endpoints require authentication middleware
   - JWT tokens validate user identity on each request
   - Each user sees only their own inventory data

**Module Interactions:**

**Frontend Modules:**

- `pages/` - Route components (Login, Products, Dashboard)
- `components/` - Reusable UI components
- `components/analytics/` - AI chat widget and analytics
- `store/` - Redux state management
- `lib/` - Utility functions and API configuration

**Backend Modules:**

- `controllers/` - Request handlers and route logic
- `models/` - MongoDB schemas and data models
- `services/` - Business logic and external API integrations
- `middleware/` - Authentication and request processing
- `config/` - Database and environment configuration

**External Services:**

- **Google Gemini AI:** Natural language processing for chat
- **MongoDB Atlas:** Cloud database hosting
- **JWT Cookies:** Secure session management

---

## ✨ Key Features

- **🔐 Secure Authentication** - JWT-based cookies with session persistence
- **🤖 AI-Powered Analytics** - Natural language queries with Google Gemini
- **📱 Responsive Design** - Mobile-first approach with Tailwind CSS
- **⚡ Real-time Search** - Instant filtering and search capabilities
- **� CUser Privacy** - Each user has isolated inventory data
- **📊 Smart Analytics** - AI-driven insights and inventory analytics

## 🛠️ Technology Stack

### Frontend

- **React 19** - Modern UI library with hooks and concurrent features
- **React Router** - Client-side routing and navigation
- **Redux Toolkit** - State management with modern Redux patterns
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API communication
- **Vite** - Fast build tool and development server

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with flexible schema
- **Mongoose** - MongoDB ODM for data modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing and security
- **Google Gemini AI** - AI integration for natural language processing

### Development Tools

- **ESLint** - Code linting and style enforcement
- **Vite** - Development server and build tool
- **Nodemon** - Auto-restart development server

## Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   External      │
│   (React SPA)   │◄──►│   (Express API) │◄──►│   Services      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
│                      │                      │
├── Pages              ├── Routes             ├── MongoDB Atlas
├── Components         ├── Controllers        └── Google Gemini AI
├── Redux Store        ├── Services
├── Axios Client       ├── Models
└── Tailwind CSS       └── Middleware
```

## Project Structure

```
shipsy-inventory-manager/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── analytics/    # AI chat widget components
│   │   │   └── products/     # Product-related components
│   │   ├── pages/           # Route components (Login, Products)
│   │   ├── store/           # Redux store and slices
│   │   ├── lib/             # Utilities and API configuration
│   │   └── assets/          # Static assets (images, icons)
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic
│   │   ├── models/          # Database schemas
│   │   ├── config/          # Database and app configuration
│   │   └── middleware/      # Custom middleware
│   ├── server.js           # Application entry point
│   └── package.json
├── docs/                   # Additional documentation
└── README.md              # This file
```

### Database Schema

**Users Collection:**

```javascript
{
  _id: ObjectId,
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  role: String (default: "user"),
  createdAt: Date,
  updatedAt: Date
}
```

**Products Collection:**

```javascript
{
  _id: ObjectId,
  name: String (required),
  description: String,
  category: String (required),
  quantity: Number (min: 0),
  unitPrice: Number (required),
  totalValue: Number (calculated),
  isActive: Boolean (default: true),
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Key API Endpoints

```
Authentication:
POST   /api/auth/register     # Register new user
POST   /api/auth/login        # User login
POST   /api/auth/logout       # User logout
GET    /api/auth/profile      # Get user profile

Products:
GET    /api/products          # Get all user products
GET    /api/products/:id      # Get specific product
POST   /api/products          # Create new product
PUT    /api/products/:id      # Update product
DELETE /api/products/:id      # Delete product

Analytics:
POST   /api/analytics/chatbot # AI chat queries
```

# 📋 Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)
- **Git** for version control
- **MongoDB Atlas Account** (free tier available)
- **Google Cloud Account** (for Gemini AI API)

### Required API Keys

1. **MongoDB Atlas Connection String**
2. **Google Gemini API Key**
3. **JWT Secret** (any secure random string)

# 🚀 Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-username/shipsy-inventory-manager.git
cd shipsy-inventory-manager
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### 3. Configure Environment Variables

Edit the `.env` file in the backend directory:

```env
# Server Configuration
PORT=8000

# Database Configuration
MONGODB_URI=your-mongodb-atlas-connection-string

# Authentication
JWT_SECRET=your-super-secure-jwt-secret-key

# AI Configuration
GEMINI_API_KEY=your-google-gemini-api-key
```

### 4. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install
```

### 5. Start Development Servers

**Terminal 1 - Backend:**

```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

### 6. Verify Installation

- **Backend:** Visit `http://localhost:8000` - should show API status
- **Frontend:** Visit `http://localhost:5173` - should show login page
- **Database:** Check MongoDB Atlas dashboard for connection status

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**

```json
{
  "_id": "user_id",
  "username": "johndoe",
  "email": "john@example.com",
  "role": "user"
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```

### Product Endpoints

#### Get All Products

```http
GET /api/products
Authorization: JWT Cookie
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "product_id",
      "name": "iPhone 14",
      "description": "Latest smartphone",
      "category": "electronics",
      "quantity": 5,
      "unitPrice": 999.99,
      "totalValue": 4999.95,
      "isActive": true,
      "createdBy": "user_id",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Create Product

```http
POST /api/products
Content-Type: application/json
Authorization: JWT Cookie

{
  "name": "MacBook Pro",
  "description": "Professional laptop",
  "category": "electronics",
  "quantity": 2,
  "unitPrice": 2499.99
}
```

#### AI Chat Query

```http
POST /api/analytics/chatbot
Content-Type: application/json
Authorization: JWT Cookie

{
  "prompt": "How many electronics do I have?"
}
```

**Response:**

```json
{
  "reply": "You have 7 electronics in your inventory with a total value of $12,499.93!"
}
```

### Error Responses

```json
{
  "success": false,
  "error": "Error message description"
}
```

**Common Status Codes:**

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

### Database Setup

**MongoDB Atlas Setup:**

1. Create free cluster
2. Configure network access (IP whitelist)
3. Create database user
4. Get connection string
5. Update `MONGODB_URI` in environment variables

### Monitoring & Logging

**Backend Logging:**

```javascript
// server.js
import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.Console(),
  ],
});
```

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow

1. **Fork the Repository**

   ```bash
   git fork https://github.com/your-username/shipsy-inventory-manager
   ```

2. **Create Feature Branch**

   ```bash
   git checkout -b feature-name
   ```

3. **Make Changes**

   - Write clean, documented code
   - Add comments for complex logic
   - Update documentation if needed

4. **Test Changes**

   - Test all affected functionality
   - Ensure no breaking changes
   - Verify responsive design

5. **Submit Pull Request**
   - Provide clear description
   - Reference related issues

### Coding Guidelines

**JavaScript/React:**

- Use ES6+ features and modern syntax
- Follow React Hooks patterns
- Use functional components
- Implement proper error boundaries
- Maintain consistent prop types

**CSS/Styling:**

- Use Tailwind CSS classes
- Follow mobile-first approach
- Maintain consistent spacing
- Use semantic color names

**Backend:**

- Follow RESTful API conventions
- Use async/await for promises
- Implement proper error handling
- Add JSDoc comments for functions

### Commit Message Format

```
type(scope): description

feat(products): add product filtering functionality
fix(auth): resolve password reset issue
docs(readme): update installation instructions
style(ui): improve mobile responsiveness
```

## 🔧 Troubleshooting

### Common Issues

**1. Backend Server Won't Start**

```bash
# Check if port is in use
netstat -ano | findstr :8000
# Kill process if needed (Windows)
taskkill /PID <PID> /F

# Check environment variables
type backend\.env
```

**2. Database Connection Failed**

- Verify MongoDB URI format
- Check network access in MongoDB Atlas
- Ensure database user has proper permissions
- Test connection string

**3. Frontend Build Errors**

```bash
# Clear node_modules and reinstall
rmdir /s node_modules
del package-lock.json
npm install
```

**4. AI Assistant Not Responding**

- Verify Gemini API key is valid
- Check API quota limits in Google Cloud Console
- Review backend logs for AI service errors
- Test APIs with curl:
  ```bash
  curl -H "Authorization: Bearer YOUR_API_KEY" \
       https://generativelanguage.googleapis.com/v1/models
  ```

### Debug Mode

**Enable Backend Debugging:**

```bash
DEBUG=* npm start
```

**Frontend Development Tools:**

- React Developer Tools browser extension
- Redux DevTools extension
- Network tab for API inspection

### Authentication Issues

- Clear browser cookies and local storage
- Verify JWT secret configuration
- Check cookie settings in browser dev tools
- Test with incognito/private browsing

---

## **Last updated:** August 2025

# 🏪 Shipsy Inventory Manager

> **AI-Powered Product Inventory Management System**

A modern, full-stack web application that combines intelligent product inventory management with AI-powered analytics. Built with React, Node.js, and Google Gemini AI to provide businesses with smart inventory insights and natural language query capabilities.

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![Node.js](https://img.shields.io/badge/node.js-v18+-green.svg)
![React](https://img.shields.io/badge/react-v19+-blue.svg)
![MongoDB](https://img.shields.io/badge/mongodb-cloud-green.svg)

## ✨ Key Features

- **🔐 Secure Authentication** - JWT-based user authentication with HTTP-only cookies
- **📦 Product Management** - Complete CRUD operations for inventory items
- **🤖 AI-Powered Analytics** - Natural language queries about your inventory using Google Gemini AI
- **🔍 Advanced Filtering** - Search, categorize, and sort products with real-time updates
- **📱 Responsive Design** - Mobile-first design with Tailwind CSS
- **⚡ Real-time Chat** - Interactive AI assistant for inventory insights
- **🔒 User Isolation** - Each user manages their own private inventory
- **📊 Smart Calculations** - Automatic total value calculations and inventory metrics

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern UI library with hooks and context
- **Redux Toolkit** - Predictable state management
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API communication
- **React Toastify** - Toast notifications
- **Vite** - Fast build tool and development server

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js 5** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Google Gemini AI** - AI-powered natural language processing
- **CORS** - Cross-origin resource sharing

### Development Tools
- **ESLint** - Code linting and formatting
- **Vite** - Frontend build tool
- **Nodemon** - Backend development server

## 🏗️ Architecture Overview

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

### Project Structure

```
shipsy-inventory-manager/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── analytics/    # AI chat widget
│   │   │   ├── common/       # Shared components
│   │   │   └── products/     # Product-specific components
│   │   ├── pages/           # Route components
│   │   ├── store/           # Redux state management
│   │   ├── lib/             # Utility libraries
│   │   └── assets/          # Static assets
│   ├── package.json
│   └── vite.config.js
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic
│   │   ├── models/          # Database schemas
│   │   ├── routes/          # API endpoints
│   │   ├── middleware/      # Custom middleware
│   │   └── config/          # Configuration files
│   ├── server.js           # Application entry point
│   └── package.json
└── docs/                   # Project documentation
```

### Database Schema

**Users Collection:**
```javascript
{
  _id: ObjectId,
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['admin', 'user']),
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
  category: String (enum: ['electronics', 'clothing', 'food', 'books', 'other']),
  quantity: Number (min: 0),
  unitPrice: Number (min: 0),
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
POST   /api/auth/register     # User registration
POST   /api/auth/login        # User login
POST   /api/auth/logout       # User logout
GET    /api/auth/check        # Verify authentication
GET    /api/auth/profile      # Get user profile

Products:
GET    /api/products          # Get user's products
GET    /api/products/:id      # Get specific product
POST   /api/products          # Create new product
PUT    /api/products/:id      # Update product
DELETE /api/products/:id      # Delete product

Analytics:
POST   /api/analytics/chatbot # AI chat queries
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher)
- **Git** for version control
- **MongoDB Atlas Account** (or local MongoDB instance)
- **Google Cloud Account** with Gemini AI API access

### Required API Keys

1. **MongoDB Connection String** - From MongoDB Atlas
2. **Google Gemini API Key** - From Google AI Studio
3. **JWT Secret** - For token signing (generate a secure random string)

## 🚀 Installation & Setup

### 1. Clone the Repository

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

Edit `backend/.env` with your configuration:

```env
# Server Configuration
PORT=8000

# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shipsy-inventory?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your-super-secure-jwt-secret-key-here

# AI Configuration
GEMINI_API_KEY=your-google-gemini-api-key-here
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

- **Backend:** Visit `http://localhost:8000` - Should show "Hello from Express!"
- **Frontend:** Visit `http://localhost:5173` - Should show the login page
- **Database:** Check MongoDB Atlas dashboard for connection

## 🎯 Usage Instructions

### Starting the Application

1. **Start Backend Server:**
   ```bash
   cd backend && npm start
   ```
   Server runs on `http://localhost:8000`

2. **Start Frontend Development Server:**
   ```bash
   cd frontend && npm run dev
   ```
   Application runs on `http://localhost:5173`

### First Time Setup

1. **Create Account:**
   - Navigate to `http://localhost:5173/register`
   - Fill in username, email, and password
   - Click "Register" to create your account

2. **Login:**
   - Use your credentials to log in
   - You'll be redirected to the products dashboard

3. **Add Your First Product:**
   - Click "Add Product" button
   - Fill in product details (name, category, quantity, price)
   - Save to add to your inventory

### Using the AI Assistant

1. **Open Chat Widget:**
   - Click the chat bubble icon in the bottom-right corner
   - The AI assistant will greet you

2. **Ask Questions:**
   ```
   Examples:
   - "How many electronics do I have?"
   - "What's my total inventory value?"
   - "Show me products under $50"
   - "Which category has the most items?"
   ```

3. **Get Insights:**
   - The AI analyzes your inventory data
   - Provides natural language responses
   - Maintains conversation context

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123"
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
  "password": "securepassword123"
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

### AI Analytics Endpoints

#### Chat with AI
```http
POST /api/analytics/chatbot
Content-Type: application/json
Authorization: JWT Cookie

{
  "prompt": "How many electronics do I have in stock?"
}
```

**Response:**
```json
{
  "reply": "You have 7 electronics items in your inventory with a total value of $12,499.93!"
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

**MongoDB Atlas:**
1. Create a new cluster
2. Configure network access (IP whitelist)
3. Create database user
4. Get connection string
5. Update `MONGODB_URI` in environment variables

### Monitoring & Logging

**Backend Logging:**
```javascript
// Add to server.js
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow

1. **Fork the Repository**
   ```bash
   git fork https://github.com/your-username/shipsy-inventory-manager.git
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test Your Changes**
   - Test all affected functionality
   - Ensure no breaking changes
   - Verify responsive design

5. **Submit Pull Request**
   - Provide clear description
   - Reference related issues
   - Include screenshots if UI changes

### Code Style Guidelines

**JavaScript/React:**
- Use ES6+ features
- Follow React Hooks patterns
- Use functional components
- Implement proper error boundaries

**CSS/Styling:**
- Use Tailwind CSS classes
- Follow mobile-first approach
- Maintain consistent spacing
- Use semantic color names

**Backend:**
- Follow RESTful API conventions
- Implement proper error handling
- Use async/await for promises
- Add JSDoc comments for functions

### Commit Message Format

```
type(scope): description

feat(auth): add password reset functionality
fix(products): resolve pagination bug
docs(readme): update installation instructions
style(ui): improve mobile responsiveness
```

## 🔧 Troubleshooting

### Common Issues

**1. Backend Server Won't Start**
```bash
# Check if port is in use
lsof -i :8000

# Kill process if needed
kill -9 <PID>

# Check environment variables
cat backend/.env
```

**2. Database Connection Failed**
- Verify MongoDB URI format
- Check network access in MongoDB Atlas
- Ensure database user has proper permissions
- Test connection string in MongoDB Compass

**3. Frontend Build Errors**
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for version conflicts
npm ls
```

**4. AI Assistant Not Responding**
- Verify Gemini API key is valid
- Check API quota limits in Google Cloud Console
- Review backend logs for AI service errors
- Test API key with curl:
  ```bash
  curl -H "Authorization: Bearer YOUR_API_KEY" \
       https://generativelanguage.googleapis.com/v1/models
  ```

**5. Authentication Issues**
- Clear browser cookies and localStorage
- Check JWT secret configuration
- Verify cookie settings in browser dev tools
- Test with incognito/private browsing

### Debug Mode

**Enable Backend Debugging:**
```bash
DEBUG=* npm start
```

**Frontend Development Tools:**
- React Developer Tools browser extension
- Redux DevTools browser extension
- Network tab for API request inspection

### Getting Help

- **Issues:** Create a GitHub issue with detailed description
- **Discussions:** Use GitHub Discussions for questions
- **Documentation:** Check `/docs` folder for additional guides
- **Email:** Contact maintainers at [your-email@example.com]

## 📄 License & Contact

### License
This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

### Maintainers
- **Primary Maintainer:** [Your Name] - [your-email@example.com]
- **Contributors:** See [CONTRIBUTORS.md](CONTRIBUTORS.md)

### Acknowledgments
- Google Gemini AI for natural language processing
- MongoDB Atlas for cloud database hosting
- Tailwind CSS for utility-first styling
- React community for excellent documentation

---

**Built with ❤️ for modern inventory management**

*Last updated: January 2024*
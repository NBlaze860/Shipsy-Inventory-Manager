/**
 * Main Express Server Configuration
 * 
 * This file sets up the Express.js server with all necessary middleware,
 * routes, and database connections for the Product Management System.
 * 
 * Features:
 * - Environment variable configuration
 * - CORS setup for frontend communication
 * - JSON parsing middleware
 * - Cookie parsing for authentication
 * - Route mounting for different API endpoints
 * - Database connection initialization
 */

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// ES modules compatibility: Get current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve();

// Load environment variables before any other imports to ensure availability
dotenv.config({ path: path.join(__dirname, ".env") });

import express from "express";
import cookieParser from "cookie-parser";
import { connectdb } from "./src/config/database.js";
import ProductRoutes from "./src/routes/products.js";
import AuthRoutes from "./src/routes/auth.js";
import AnalyticsRoutes from "./src/routes/analytics.js";
import cors from "cors";

// Initialize Express application
const app = express();

// Server configuration
const PORT = process.env.PORT || 8000;

// CORS middleware configuration - must be applied before route handlers
// Allows frontend (React) to communicate with backend API
app.use(
  cors({
    origin: "http://localhost:5173", // Vite development server default port
    credentials: true, // Allow cookies to be sent with requests
  })
);

// Body parsing middleware - enables JSON request body parsing
app.use(express.json());

// Cookie parsing middleware - enables reading HTTP cookies for authentication
app.use(cookieParser());

// API route mounting - organize endpoints by feature
app.use("/api/products", ProductRoutes);    // Product CRUD operations
app.use("/api/auth/", AuthRoutes);          // User authentication endpoints
app.use("/api/analytics", AnalyticsRoutes); // AI chatbot analytics endpoints

// Health check endpoint - basic server status verification

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Server startup - initialize HTTP server and database connection
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
  connectdb(); // Establish MongoDB connection
});

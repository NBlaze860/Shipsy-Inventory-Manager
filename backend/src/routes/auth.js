/**
 * Authentication Routes
 * 
 * Defines all HTTP endpoints related to user authentication and account management.
 * Handles user registration, login, logout, profile access, and authentication verification.
 */

import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  checkAuthUser,
} from "../controllers/authController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

// Initialize Express router for authentication endpoints
const router = Router();

// Public authentication endpoints - no authentication required
router.post("/register", registerUser);    // User account creation
router.post("/login", loginUser);          // User login with credentials
router.post("/logout", logoutUser);        // User session termination

// Protected endpoints - require valid JWT authentication
router.get("/profile", protectRoute, getUserProfile);  // Get user profile data
router.get("/check", protectRoute, checkAuthUser);     // Verify authentication status

export default router;

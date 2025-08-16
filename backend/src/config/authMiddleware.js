/**
 * Authentication Middleware
 * 
 * Provides JWT-based authentication protection for API routes.
 * Validates JWT tokens from HTTP cookies and attaches user data to request object.
 */

import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

/**
 * Middleware to protect routes requiring authentication
 * 
 * Validates JWT token from cookies, verifies user existence, and attaches
 * user data to the request object for use in subsequent middleware/controllers.
 * 
 * @async
 * @function protectRoute
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object  
 * @param {Function} next - Express next middleware function
 * @returns {void} Calls next() on success, sends error response on failure
 */
export const protectRoute = async (req, res, next) => {
  try {
    // Extract JWT token from HTTP-only cookie
    const token = req.cookies.jwt;
    
    // Check if token exists in the request
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }
    
    // Verify and decode the JWT token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Additional validation check (though jwt.verify would throw if invalid)
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }
    
    // Fetch user from database using decoded user ID, excluding password field
    const user = await User.findById(decoded.userId).select("-password");
    
    // Verify user still exists in database
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Attach user data to request object for use in protected routes
    req.user = user;
    
    // Continue to next middleware/route handler
    next();
    
  } catch (error) {
    // Log authentication errors for debugging
    console.log("Error in protectRoute middleware: " + error.message);
    
    // Return generic server error to avoid exposing internal details
    res.status(500).json({ message: "Internal server error" });
  }
};

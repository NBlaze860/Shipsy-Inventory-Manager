/**
 * Authentication Controller
 * 
 * Handles HTTP requests for user authentication operations.
 * Acts as the interface between routes and authentication business logic.
 * Manages user registration, login, logout, and profile operations.
 */

import AuthService from '../services/AuthService.js';
import User from '../models/UserModel.js';

// Initialize authentication service with User model dependency
const authService = new AuthService(User);

/**
 * User Registration Controller
 * 
 * Handles new user account creation with validation and error handling.
 * Creates user account, sets authentication cookie, and returns user data.
 * 
 * @async
 * @function registerUser
 * @param {Object} req - Express request object containing user registration data
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with user data or error message
 */
export const registerUser = async (req, res) => {
    try {
        // Delegate registration logic to service layer
        const userData = await authService.signup(req.body, res);
        
        // Return successful registration response with user data
        res.status(201).json(userData);
        
    } catch (error) {
        console.log('Error in signup controller:', error.message);
        
        // Handle known validation errors with appropriate HTTP status
        if (error.message === 'All fields are required' || 
            error.message === 'Password must be at least 6 characters long' ||
            error.message === 'Email already registered' ||
            error.message === 'Username is already taken' ||
            error.message === 'Invalid email format'
          ) {
            return res.status(400).json({ message: error.message });
        }
        
        // Handle unexpected errors with generic message
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * User Login Controller
 * 
 * Authenticates user credentials and establishes session.
 * Validates login data, sets authentication cookie, and returns user information.
 * 
 * @async
 * @function loginUser
 * @param {Object} req - Express request object containing login credentials
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with user data or error message
 */
export const loginUser = async (req, res) => {
    try {
        // Delegate login logic to service layer
        const userData = await authService.login(req.body, res);
        res.status(200).json(userData);
    } catch (error) {
        console.log('Error in login controller:', error.message);
        
        // Handle authentication failures
        if (error.message === 'Invalid credentials') {
            return res.status(400).json({ message: error.message });
        }
        
        // Handle unexpected errors
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * User Logout Controller
 * 
 * Terminates user session by clearing authentication cookie.
 * Provides secure logout functionality.
 * 
 * @function logoutUser
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response confirming logout or error message
 */
export const logoutUser = (req, res) => {
    try {
        // Clear authentication cookie through service
        authService.logout(res);
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.log('Error in logout controller:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * Get User Profile Controller
 * 
 * Retrieves authenticated user's profile information.
 * Uses user ID from authentication middleware to fetch profile data.
 * 
 * @async
 * @function getUserProfile
 * @param {Object} req - Express request object with authenticated user data
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with user profile data or error message
 */
export const getUserProfile = async (req, res) => {
    try {
        // Get user profile using ID from authentication middleware
        const user = await authService.getProfile(req.user._id);
        res.status(200).json(user);
    } catch (error) {
        console.log('Error in getUserProfile controller:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * Check Authentication Status Controller
 * 
 * Verifies if user is currently authenticated and returns user data.
 * Used by frontend to maintain authentication state across page refreshes.
 * 
 * @async
 * @function checkAuthUser
 * @param {Object} req - Express request object with authenticated user data
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with user data or error message
 */
export const checkAuthUser = async (req, res) => {
    try {
        // Retrieve user profile to confirm authentication status
        const user = await authService.getProfile(req.user._id);
        res.status(200).json(user);
    } catch (error) {
        console.log('Error in checkAuthUser controller:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


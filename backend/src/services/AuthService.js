/**
 * Authentication Service Layer
 * 
 * Handles business logic for user authentication operations.
 * Provides secure user registration, login, logout, and profile management
 * with JWT token generation and password hashing.
 */

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

class AuthService {
    /**
     * Initialize Authentication Service
     * 
     * @param {Object} UserModel - Mongoose User model for database operations
     */
    constructor(UserModel) {
        this.User = UserModel;
    }

    /* ----------  Helper Methods ---------- */

    /**
     * Generate JWT Token and Set HTTP Cookie
     * 
     * Creates a signed JWT token for user authentication and sets it as
     * an HTTP-only cookie for secure client-side storage.
     * 
     * @method generateToken
     * @param {string} userId - User ID to encode in the token
     * @param {Object} res - Express response object for setting cookie
     * @returns {string} Generated JWT token
     */
    generateToken(userId, res) {
        // Create JWT token with user ID payload and expiration
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: '7d', // Token valid for 7 days
        });

        // Set secure HTTP-only cookie with the token
        res.cookie('jwt', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
            httpOnly: true,                   // Prevent XSS attacks
            sameSite: 'strict',              // CSRF protection
            secure: process.env.NODE_ENV !== 'development', // HTTPS in production
        });

        return token;
    }

    /**
     * Validate User Registration Data
     * 
     * Performs comprehensive validation of user signup data including
     * required fields, password strength, and role validation.
     * 
     * @method validateSignupData
     * @param {Object} userData - User registration data
     * @param {string} userData.username - Desired username
     * @param {string} userData.email - User email address
     * @param {string} userData.password - User password
     * @param {string} [userData.role] - Optional user role
     * @throws {Error} Validation error messages for invalid data
     */
    validateSignupData({ username, email, password, role }) {
        // Check for required fields
        if (!username || !email || !password) {
            throw new Error('Username, email and password are required');
        }

        // Validate password strength
        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }

        // Validate role if provided
        if (role && !['admin', 'user'].includes(role)) {
            throw new Error('Role must be either "admin" or "user"');
        }
    }

    /**
     * Check for Existing User Conflicts
     * 
     * Verifies that username and email are not already registered
     * in the system to prevent duplicate accounts.
     * 
     * @async
     * @method checkExistingUser
     * @param {string} username - Username to check for conflicts
     * @param {string} email - Email to check for conflicts
     * @throws {Error} If username or email already exists
     */
    async checkExistingUser(username, email) {
        // Search for existing user with same username or email
        const existing = await this.User.findOne({
            $or: [{ username }, { email }],
        });

        // Check for specific conflicts and provide clear error messages
        if (existing) {
            if (existing.username === username) {
                throw new Error('Username is already taken');
            }
            if (existing.email === email) {
                throw new Error('Email already registered');
            }
        }
    }

    /* ----------  Public API Methods ---------- */

    /**
     * User Registration (Signup)
     * 
     * Creates a new user account with validation, password hashing,
     * and automatic authentication token generation.
     * 
     * @async
     * @method signup
     * @param {Object} userData - User registration information
     * @param {string} userData.username - Desired username
     * @param {string} userData.email - User email address
     * @param {string} userData.password - Plain text password
     * @param {string} [userData.role] - Optional user role (defaults to 'user')
     * @param {Object} res - Express response object for setting auth cookie
     * @returns {Promise<Object>} User data without sensitive information
     * @throws {Error} Validation errors or database operation failures
     */
    async signup(userData, res) {
        const { username, email, password, role } = userData;

        // Step 1: Validate input data
        this.validateSignupData({ username, email, password, role });

        // Step 2: Check for existing users with same username/email
        await this.checkExistingUser(username, email);

        // Step 3: Hash password for secure storage
        const hashedPassword = await bcrypt.hash(password, 10);

        // Step 4: Create new user document
        const newUser = new this.User({
            username,
            email,
            password: hashedPassword,
            role, // Will default to 'user' if undefined
        });

        // Step 5: Save to database and generate authentication token
        await newUser.save();
        this.generateToken(newUser._id, res);

        // Step 6: Return user data without sensitive information
        return {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
        };
    }

    /**
     * User Authentication (Login)
     * 
     * Authenticates user credentials and establishes a session.
     * Validates email/password combination and generates auth token.
     * 
     * @async
     * @method login
     * @param {Object} userData - Login credentials
     * @param {string} userData.email - User email address
     * @param {string} userData.password - Plain text password
     * @param {Object} res - Express response object for setting auth cookie
     * @returns {Promise<Object>} User data without sensitive information
     * @throws {Error} If credentials are invalid
     */
    async login(userData, res) {
        const { email, password } = userData;

        // Step 1: Find user by email address
        const user = await this.User.findOne({ email });
        if (!user) {
            throw new Error('Invalid credentials');
        }

        // Step 2: Verify password against stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        // Step 3: Generate authentication token and return user data
        this.generateToken(user._id, res);

        return {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        };
    }

    /**
     * User Logout
     * 
     * Terminates user session by clearing the authentication cookie.
     * Provides secure logout functionality.
     * 
     * @method logout
     * @param {Object} res - Express response object for clearing cookie
     */
    logout(res) {
        // Clear JWT cookie by setting empty value and past expiration
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0), // Set expiration to past date
        });
    }

    /**
     * Get User Profile
     * 
     * Retrieves user profile information by user ID.
     * Excludes sensitive information like password from response.
     * 
     * @async
     * @method getProfile
     * @param {string} userId - User ID to retrieve profile for
     * @returns {Promise<Object>} User profile data without password
     * @throws {Error} If user not found
     */
    async getProfile(userId) {
        // Find user by ID, excluding password field
        const user = await this.User.findById(userId).select('-password');
        
        // Verify user exists
        if (!user) {
            throw new Error('User not found');
        }
        
        return user;
    }
}

export default AuthService;

/**
 * User Data Model
 * 
 * Defines the MongoDB schema for user accounts in the system.
 * Handles user authentication data, roles, and account metadata.
 */

import mongoose from "mongoose";

/**
 * User Schema Definition
 * 
 * Defines the structure and validation rules for user documents in MongoDB.
 * Includes authentication fields, role-based access control, and automatic timestamps.
 */
const userSchema = new mongoose.Schema({
  // Unique identifier for user login - must be unique across all users
  username: {
    type: String,
    required: true,
    unique: true,
  },
  
  // User's email address - used for login and communication
  email: {
    type: String,
    required: true,
    unique: true,
  },
  
  // Hashed password - stored securely using bcrypt
  password: {
    type: String,
    required: true,
    minlength: 6, // Minimum security requirement
  },
  
  // User role for access control - determines permissions level
  role: {
    type: String,
    enum: ['admin', 'user'], // Restrict to predefined roles only
    default: 'user',         // Default role for new registrations
  },
}, { 
  // Automatically add createdAt and updatedAt timestamps
  timestamps: true 
});

// Create and export the User model based on the schema
const User = mongoose.model("User", userSchema);
export default User;
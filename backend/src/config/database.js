/**
 * Database Configuration Module
 * 
 * Handles MongoDB connection setup using Mongoose ODM.
 * Provides centralized database connection management with error handling.
 */

import mongoose from "mongoose";

/**
 * Establishes connection to MongoDB database
 * 
 * Uses the MONGODB_URI environment variable to connect to the database.
 * Implements basic error handling and connection status logging.
 * 
 * @async
 * @function connectdb
 * @returns {Promise<void>} Resolves when connection is established or logs error
 */
export const connectdb = async () => {
  try {
    // Attempt to connect to MongoDB using connection string from environment
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected successfully");
  } catch (error) {
    // Log connection errors for debugging purposes
    console.log("Database connection error: " + error);
    
    // In production, you might want to exit the process or implement retry logic
    // process.exit(1);
  }
};

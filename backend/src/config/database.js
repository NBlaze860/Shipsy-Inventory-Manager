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
    // Configure mongoose options for better production performance
    const options = {
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      maxPoolSize: 10, // Maintain up to 10 socket connections
    };

    // Attempt to connect to MongoDB using connection string from environment
    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    console.log(`Database connected successfully to: ${conn.connection.host}`);
  } catch (error) {
    // Log connection errors for debugging purposes
    console.log("Database connection error: " + error);
    
    // In production, exit the process if database connection fails
    if (process.env.NODE_ENV === "production") {
      console.log("Exiting process due to database connection failure");
      process.exit(1);
    }
  }
};

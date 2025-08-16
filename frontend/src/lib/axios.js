/**
 * Axios HTTP Client Configuration
 * 
 * Pre-configured axios instance for API communication with the backend.
 * Handles environment-specific base URLs and credential management for
 * secure authentication cookie transmission.
 */

import axios from "axios";

/**
 * Configured Axios Instance
 * 
 * Creates an axios instance with environment-specific configuration:
 * - Development: Points to local backend server (localhost:8000)
 * - Production: Uses relative URLs (same domain)
 * - Credentials: Automatically includes cookies for authentication
 */
export const axiosInstance = axios.create({
  // Set base URL based on environment - localhost for dev, relative for production
  baseURL:
    import.meta.env.MODE === "development" ? "http://localhost:8000" : "",
  
  // Include cookies in requests for JWT authentication
  withCredentials: true,
});

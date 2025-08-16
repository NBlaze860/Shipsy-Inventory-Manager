/**
 * Authentication Redux Slice
 * 
 * Manages user authentication state including login, registration, logout,
 * and authentication verification. Handles async operations with proper
 * loading states and error management.
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {axiosInstance} from '../lib/axios';

/**
 * Initial Authentication State
 * 
 * Default state structure for authentication slice:
 * - user: Current authenticated user data (null if not logged in)
 * - loading: Loading state for async operations
 * - error: Error messages from failed operations
 */
const initialState = {
  user: null,      // Authenticated user object or null
  loading: true,   // Loading state for auth operations
  error: null,     // Error messages from auth failures
};

/**
 * User Registration Async Thunk
 * 
 * Handles user account creation with validation and error handling.
 * Sends registration data to backend and manages response/error states.
 * 
 * @async
 * @function signup
 * @param {Object} userData - User registration data (username, email, password)
 * @param {Object} thunkAPI - Redux toolkit thunk API with rejectWithValue
 * @returns {Promise} User data on success, error data on failure
 */
export const signup = createAsyncThunk('auth/signup', async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/api/auth/register', userData);
    return response.data;
  } catch (error) {
    // Return structured error data for proper error handling
    if (error.response) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue(error.message);
  }
});

/**
 * User Login Async Thunk
 * 
 * Authenticates user credentials and establishes session.
 * Handles login process with proper error management and state updates.
 * 
 * @async
 * @function login
 * @param {Object} userData - Login credentials (email, password)
 * @param {Object} thunkAPI - Redux toolkit thunk API with rejectWithValue
 * @returns {Promise} User data on success, error data on failure
 */
export const login = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/api/auth/login', userData);
    return response.data;
  } catch (error) {
    // Return structured error data for UI error display
    if (error.response) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue(error.message);
  }
});

/**
 * User Logout Async Thunk
 * 
 * Terminates user session and clears authentication state.
 * Handles logout process with backend communication and state cleanup.
 * 
 * @async
 * @function logout
 * @param {void} _ - No parameters needed for logout
 * @param {Object} thunkAPI - Redux toolkit thunk API with rejectWithValue
 * @returns {Promise} Void on success, error data on failure
 */
export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await axiosInstance.post('/api/auth/logout');
    return; // No data needed for successful logout
  } catch (error) {
    // Handle logout errors (though they're typically not critical)
    if (error.response) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue(error.message);
  }
});

/**
 * Authentication Check Async Thunk
 * 
 * Verifies current authentication status on app initialization.
 * Checks if user has valid session and retrieves user data.
 * 
 * @async
 * @function checkAuth
 * @param {void} _ - No parameters needed for auth check
 * @param {Object} thunkAPI - Redux toolkit thunk API with rejectWithValue
 * @returns {Promise} User data if authenticated, error if not
 */
export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/api/auth/check');
    return response.data;
  } catch (error) {
    // Auth check failures are expected for non-authenticated users
    return rejectWithValue(error.response?.data || error.message);
  }
});

/**
 * Authentication Slice Definition
 * 
 * Creates Redux slice with reducers and extra reducers for async thunks.
 * Manages authentication state transitions and error handling.
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  
  // Synchronous reducers for immediate state updates
  reducers: {
    /**
     * Clear Authentication Error
     * 
     * Resets error state to null, typically used when user
     * dismisses error messages or starts new operations.
     * 
     * @param {Object} state - Current authentication state
     */
    clearError: (state) => {
      state.error = null;
    },
  },
  // Async thunk reducers for handling promise lifecycle states
  extraReducers: (builder) => {
    builder
      // User Registration (Signup) State Management
      .addCase(signup.pending, (state) => {
        state.loading = true;  // Show loading during registration
        state.error = null;    // Clear previous errors
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;      // Hide loading spinner
        state.user = action.payload; // Set authenticated user data
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;        // Hide loading spinner
        state.error = action.payload; // Store error for UI display
      })
      
      // User Login State Management
      .addCase(login.pending, (state) => {
        state.loading = true;  // Show loading during login
        state.error = null;    // Clear previous errors
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;      // Hide loading spinner
        state.user = action.payload; // Set authenticated user data
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;        // Hide loading spinner
        state.error = action.payload; // Store error for UI display
      })
      
      // User Logout State Management
      .addCase(logout.pending, (state) => {
        state.loading = true;  // Show loading during logout
        state.error = null;    // Clear previous errors
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false; // Hide loading spinner
        state.user = null;     // Clear user data (logged out)
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;        // Hide loading spinner
        state.error = action.payload; // Store error for UI display
      })
      
      // Authentication Check State Management
      .addCase(checkAuth.pending, (state) => {
        state.loading = true; // Show loading during auth check
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;      // Hide loading spinner
        state.user = action.payload; // Set authenticated user data
        state.error = null;         // Clear any previous errors
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false; // Hide loading spinner
        state.user = null;     // No authenticated user
        state.error = null;    // Don't show error for failed auth checks (expected)
      });
  },
});

// Export action creators for use in components
export const { clearError } = authSlice.actions;

// Export reducer for store configuration
export default authSlice.reducer;

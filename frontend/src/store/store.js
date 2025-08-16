/**
 * Redux Store Configuration
 * 
 * Central state management store for the application using Redux Toolkit.
 * Combines multiple feature slices for authentication, products, and analytics
 * into a single, predictable state container.
 */

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productsReducer from './productsSlice';
import analyticsReducer from './analyticsSlice';

/**
 * Application Redux Store
 * 
 * Configured store that combines all feature reducers:
 * - auth: User authentication and session management
 * - products: Product inventory CRUD operations
 * - analytics: AI chatbot interactions and analytics data
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,        // User authentication state
    products: productsReducer, // Product inventory state
    analytics: analyticsReducer, // AI analytics and chat state
  },
});

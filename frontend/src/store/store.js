import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
// import analyticsReducer from './analyticsSlice';
// import productsReducer from './productsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // analytics: analyticsReducer,
    // products: productsReducer,
  },
});

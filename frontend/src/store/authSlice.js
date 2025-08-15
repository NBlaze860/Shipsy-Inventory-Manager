import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {axiosInstance} from '../lib/axios';

// Initial state for the auth slice
const initialState = {
  user: null,
  loading: false,
  error: null,
};

// Async thunk for user signup
export const signup = createAsyncThunk('auth/signup', async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/api/auth/register', userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue(error.message);
  }
});

// Async thunk for user login
export const login = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/api/auth/login', userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue(error.message);
  }
});

// Async thunk for user logout
export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await axiosInstance.post('/api/auth/logout');
    return;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Signup actions
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login actions
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout actions
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;

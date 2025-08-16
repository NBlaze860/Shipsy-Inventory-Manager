/**
 * Products Redux Slice
 * 
 * Manages product inventory state including CRUD operations, loading states,
 * and error handling. Handles async operations for product management with
 * proper state transitions and error management.
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";

/**
 * Initial Products State
 * 
 * Default state structure for products slice:
 * - products: Array of user's product inventory
 * - loading: Loading state for async operations
 * - error: Error messages from failed operations
 */
const initialState = {
  products: [],    // Array of product objects
  loading: false,  // Loading state for product operations
  error: null,     // Error messages from product operation failures
};

// Async thunk for getting all products
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/products");
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for getting product by ID
export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/products/${id}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for creating a product
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      console.log('Creating product with data:', productData);
      const response = await axiosInstance.post("/api/products", productData);
      console.log('Create product response:', response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating a product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, ...productData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/api/products/${id}`,
        productData
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for deleting a product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/products/${id}`);
      return id;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all products actions
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        console.log('getAllProducts response:', action.payload);
        // Handle different response formats from backend
        state.products = Array.isArray(action.payload)
          ? action.payload
          : action.payload.data || action.payload.products || [];
        console.log('Products set to:', state.products);
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error('getAllProducts failed:', action.payload);
      })
      // Get product by ID actions
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        // Handle different response formats - extract the actual product data
        const product = action.payload.data || action.payload.product || action.payload;
        const payloadId = product._id || product.id;
        const index = state.products.findIndex(
          (p) => (p._id || p.id) === payloadId
        );
        if (index !== -1) {
          state.products[index] = product;
        }
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create product actions
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        console.log('Product created:', action.payload);
        // Handle different response formats - extract the actual product data
        const newProduct = action.payload.data || action.payload.product || action.payload;
        console.log('Extracted product data:', newProduct);
        state.products.push(newProduct);
        state.error = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update product actions
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        // Handle different response formats - extract the actual product data
        const updatedProduct = action.payload.data || action.payload.product || action.payload;
        console.log('Updated product data:', updatedProduct);
        const payloadId = updatedProduct._id || updatedProduct.id;
        const index = state.products.findIndex(
          (p) => (p._id || p.id) === payloadId
        );
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete product actions
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter((p) => (p._id || p.id) !== action.payload);
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = productsSlice.actions;

export default productsSlice.reducer;

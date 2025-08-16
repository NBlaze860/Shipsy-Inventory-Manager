/**
 * Product Management Controller
 * 
 * Handles HTTP requests for product CRUD operations.
 * Acts as the interface between routes and product business logic.
 * Implements user-specific product management with proper authorization.
 */

import Product from '../models/ProductModel.js';
import ProductService from '../services/ProductService.js';

// Initialize product service with Product model dependency
const productService = new ProductService(Product);

/**
 * Get All Products Controller
 * 
 * Retrieves all products belonging to the authenticated user.
 * Returns user-specific product list with success/error status.
 * 
 * @async
 * @function getProducts
 * @param {Object} req - Express request object with authenticated user data
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with products array or error message
 * @route GET /api/products
 */
export const getProducts = async (req, res) => {
  try {
    // Extract user ID from authentication middleware
    const userId = req.user._id;
    
    // Fetch all products owned by the authenticated user
    const products = await productService.getProducts(userId);
    
    // Return successful response with products data
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    // Handle service layer errors
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Get Product By ID Controller
 * 
 * Retrieves a specific product by ID for the authenticated user.
 * Ensures users can only access their own products.
 * 
 * @async
 * @function getProductById
 * @param {Object} req - Express request object with product ID parameter
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with product data or error message
 * @route GET /api/products/:id
 */
export const getProductById = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Fetch specific product with ownership validation
    const product = await productService.getProductById(req.params.id, userId);
    
    // Check if product exists and belongs to user
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        error: 'Product not found or you do not have permission to view it' 
      });
    }
    
    // Return successful response with product data
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    // Handle service layer errors
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Create Product Controller
 * 
 * Creates a new product for the authenticated user.
 * Validates product data and associates it with the current user.
 * 
 * @async
 * @function createProduct
 * @param {Object} req - Express request object with product data in body
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with created product data or error message
 * @route POST /api/products
 */
export const createProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Create new product with user ownership
    const product = await productService.createProduct(req.body, userId);
    
    // Return successful creation response
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    // Handle validation errors with 400 status
    res.status(400).json({ success: false, error: error.message });
  }
};

/**
 * Update Product Controller
 * 
 * Updates an existing product for the authenticated user.
 * Validates ownership and updates product data.
 * 
 * @async
 * @function updateProduct
 * @param {Object} req - Express request object with product ID and update data
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with updated product data or error message
 * @route PUT /api/products/:id
 */
export const updateProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Update product with ownership validation
    const product = await productService.updateProduct(req.params.id, req.body, userId);
    
    // Check if product exists and belongs to user
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        error: 'Product not found or you do not have permission to update it' 
      });
    }
    
    // Return successful update response
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    // Handle validation errors with 400 status
    res.status(400).json({ success: false, error: error.message });
  }
};

/**
 * Delete Product Controller
 * 
 * Deletes a product for the authenticated user.
 * Validates ownership before performing deletion.
 * 
 * @async
 * @function deleteProduct
 * @param {Object} req - Express request object with product ID parameter
 * @param {Object} res - Express response object
 * @returns {Object} JSON response confirming deletion or error message
 * @route DELETE /api/products/:id
 */
export const deleteProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Delete product with ownership validation
    const product = await productService.deleteProduct(req.params.id, userId);
    
    // Check if product exists and belongs to user
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        error: 'Product not found or you do not have permission to delete it' 
      });
    }
    
    // Return successful deletion response
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    // Handle service layer errors
    res.status(500).json({ success: false, error: error.message });
  }
};

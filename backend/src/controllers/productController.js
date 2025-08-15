import Product from '../models/ProductModel.js';
import ProductService from '../services/ProductService.js';

// Initialize the service
const productService = new ProductService(Product);

/**
 * @description Get all products for the authenticated user
 * @route GET /api/products
 */
export const getProducts = async (req, res) => {
  try {
    const userId = req.user._id;
    const products = await productService.getProducts(userId);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * @description Get a single product by ID for the authenticated user
 * @route GET /api/products/:id
 */
export const getProductById = async (req, res) => {
  try {
    const userId = req.user._id;
    const product = await productService.getProductById(req.params.id, userId);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found or you do not have permission to view it' });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * @description Create a new product for the authenticated user
 * @route POST /api/products
 */
export const createProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    const product = await productService.createProduct(req.body, userId);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

/**
 * @description Update a product for the authenticated user
 * @route PUT /api/products/:id
 */
export const updateProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    const product = await productService.updateProduct(req.params.id, req.body, userId);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found or you do not have permission to update it' });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

/**
 * @description Delete a product for the authenticated user
 * @route DELETE /api/products/:id
 */
export const deleteProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    const product = await productService.deleteProduct(req.params.id, userId);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found or you do not have permission to delete it' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

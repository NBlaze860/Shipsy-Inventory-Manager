import Product from '../models/ProductModel.js'
import ProductService from '../services/ProductService.js'

//Initialize the service
const productService = new ProductService(Product);

export const getProducts = (req, res) => {
  //get products
};

export const getProductById = (req, res) => {
  // Get a single product by ID
};

export const createProduct = async (req, res) => {
  // Create a new product
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const updateProduct = (req, res) => {
  // Update a product
};

export const deleteProduct = (req, res) => {
  // Delete a product
};

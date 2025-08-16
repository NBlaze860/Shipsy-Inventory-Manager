/**
 * Product Management Routes
 *
 * Defines all HTTP endpoints for product CRUD operations.
 * All routes are protected and require user authentication.
 * Implements RESTful API design patterns for product management.
 */

import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protectRoute } from "../config/authMiddleware.js";

// Initialize Express router for product endpoints
const router = Router();

// All product routes require authentication - user must be logged in
router.get("/", protectRoute, getProducts); // GET /api/products - List all user's products
router.get("/:id", protectRoute, getProductById); // GET /api/products/:id - Get specific product
router.post("/", protectRoute, createProduct); // POST /api/products - Create new product
router.put("/:id", protectRoute, updateProduct); // PUT /api/products/:id - Update existing product
router.delete("/:id", protectRoute, deleteProduct); // DELETE /api/products/:id - Delete product

export default router;

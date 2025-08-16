/**
 * Product Data Model
 * 
 * Defines the MongoDB schema for product inventory items.
 * Handles product information, pricing, categorization, and user ownership.
 */

import mongoose from "mongoose";

/**
 * Product Schema Definition
 * 
 * Defines the structure and validation rules for product documents in MongoDB.
 * Includes inventory tracking, pricing calculations, and user association.
 */
const productSchema = new mongoose.Schema({
  // Product name - required identifier for the item
  name: {
    type: String,
    required: true,
  },
  
  // Optional detailed description of the product
  description: {
    type: String,
    default: "", // Empty string if no description provided
  },
  
  // Product category - restricted to predefined options for consistency
  category: {
    type: String,
    enum: ['electronics', 'clothing', 'food', 'books', 'other'],
    required: true,
  },
  
  // Inventory quantity - must be non-negative integer
  quantity: {
    type: Number,
    required: true,
    min: 0, // Prevent negative inventory
  },
  
  // Price per individual unit - must be non-negative
  unitPrice: {
    type: Number,
    required: true,
    min: 0, // Prevent negative pricing
  },
  
  // Product status flag - allows soft deletion/deactivation
  isActive: {
    type: Boolean,
    default: true, // Products are active by default
  },
  
  // Calculated total value - automatically computed from quantity × unitPrice
  totalValue: {
    type: Number,
    default: 0,
  },
  
  // User ownership reference - links product to the user who created it
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',     // References the User model
    required: true,  // Every product must have an owner
  },
}, { 
  // Automatically add createdAt and updatedAt timestamps
  timestamps: true 
});

/**
 * Pre-save middleware hook
 * 
 * Automatically calculates and updates the totalValue field before saving
 * the document to the database. Ensures data consistency.
 * 
 * @param {Function} next - Callback to continue with save operation
 */
productSchema.pre('save', function(next) {
  // Calculate total value as quantity multiplied by unit price
  this.totalValue = this.quantity * this.unitPrice;
  next(); // Continue with the save operation
});

// Create and export the Product model based on the schema
const Product = mongoose.model("Product", productSchema);
export default Product;
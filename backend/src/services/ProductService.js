/**
 * Product Service Layer
 * 
 * Handles business logic for product management operations.
 * Provides data validation, user authorization, and database interactions
 * for product CRUD operations with proper error handling.
 */

class ProductService {
    /**
     * Initialize Product Service
     * 
     * @param {Object} ProductModel - Mongoose Product model for database operations
     */
    constructor(ProductModel) {
        this.Product = ProductModel;
    }

    /**
     * Create New Product
     * 
     * Validates product data and creates a new product associated with the user.
     * Performs data validation before database insertion.
     * 
     * @async
     * @method createProduct
     * @param {Object} productData - Product information (name, description, category, etc.)
     * @param {string} userId - ID of the user creating the product
     * @returns {Promise<Object>} Created product document
     * @throws {Error} Validation errors or database operation failures
     */
    async createProduct(productData, userId) {
        // Validate input data before processing
        this.validateProductData(productData);
        
        // Create new product instance with user ownership
        const product = new this.Product({ ...productData, createdBy: userId });
        
        // Save to database
        const savedProduct = await product.save();
        
        // Verify successful creation
        if (!savedProduct) {
            throw new Error('Failed to create product');
        }
        
        return savedProduct;
    }

    /**
     * Get All User Products
     * 
     * Retrieves all products belonging to a specific user.
     * Implements user-based data isolation.
     * 
     * @async
     * @method getProducts
     * @param {string} userId - ID of the user whose products to retrieve
     * @returns {Promise<Array>} Array of user's product documents
     */
    async getProducts(userId) {
        // Find all products created by the specified user
        return await this.Product.find({ createdBy: userId });
    }

    /**
     * Get Product By ID
     * 
     * Retrieves a specific product by ID with user ownership validation.
     * Ensures users can only access their own products.
     * 
     * @async
     * @method getProductById
     * @param {string} id - Product ID to retrieve
     * @param {string} userId - ID of the requesting user
     * @returns {Promise<Object>} Product document if found and owned by user
     * @throws {Error} If product not found or access denied
     */
    async getProductById(id, userId) {
        // Find product with both ID and ownership validation
        const product = await this.Product.findOne({ _id: id, createdBy: userId });
        
        // Verify product exists and belongs to user
        if (!product) {
            throw new Error('Product not found');
        }
        
        return product;
    }

    /**
     * Update Existing Product
     * 
     * Updates product data with validation and user ownership verification.
     * Ensures data integrity and proper authorization.
     * 
     * @async
     * @method updateProduct
     * @param {string} id - Product ID to update
     * @param {Object} productData - Updated product information
     * @param {string} userId - ID of the user requesting the update
     * @returns {Promise<Object>} Updated product document
     * @throws {Error} Validation errors or if product not found/unauthorized
     */
    async updateProduct(id, productData, userId) {
        // Validate updated data before processing
        this.validateProductData(productData);
        
        // Update product with ownership validation, return updated document
        const product = await this.Product.findOneAndUpdate(
            { _id: id, createdBy: userId }, 
            productData, 
            { new: true } // Return updated document
        );
        
        // Verify product was found and updated
        if (!product) {
            throw new Error('Product not found');
        }
        
        return product;
    }

    /**
     * Delete Product
     * 
     * Removes a product from the database with user ownership validation.
     * Implements secure deletion with proper authorization.
     * 
     * @async
     * @method deleteProduct
     * @param {string} id - Product ID to delete
     * @param {string} userId - ID of the user requesting deletion
     * @returns {Promise<Object>} Deleted product document
     * @throws {Error} If product not found or access denied
     */
    async deleteProduct(id, userId) {
        // Delete product with ownership validation
        const product = await this.Product.findOneAndDelete({ _id: id, createdBy: userId });
        
        // Verify product was found and deleted
        if (!product) {
            throw new Error('Product not found');
        }
        
        return product;
    }

    /**
     * Validate Product Data
     * 
     * Performs business logic validation on product data.
     * Ensures data integrity and business rule compliance.
     * 
     * @private
     * @method validateProductData
     * @param {Object} data - Product data to validate
     * @throws {Error} Validation error messages for invalid data
     */
    validateProductData(data) {
        // Validate product name is not empty
        if (data.name && data.name.trim().length === 0) {
            throw new Error('Product name is required');
        }
        
        // Validate quantity is not negative
        if (data.quantity < 0) {
            throw new Error('Quantity cannot be negative');
        }
        
        // Validate unit price is not negative
        if (data.unitPrice < 0) {
            throw new Error('Price cannot be negative');
        }
    }
}

export default ProductService;

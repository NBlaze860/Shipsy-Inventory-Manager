class ProductService {
    constructor(ProductModel) {
        this.Product = ProductModel;
    }

    // Create a new product with validation.
    async createProduct(productData, userId) {
        this.validateProductData(productData);
        const product = new this.Product({ ...productData, createdBy: userId });
        return await product.save();
    }

    // Retrieve all products for a specific user.
    async getProducts(userId) {
        return await this.Product.find({ createdBy: userId });
    }

    // Retrieve a single product by its ID for a specific user.
    async getProductById(id, userId) {
        return await this.Product.findOne({ _id: id, createdBy: userId });
    }

    // Update an existing product for a specific user.
    async updateProduct(id, productData, userId) {
        this.validateProductData(productData);
        return await this.Product.findOneAndUpdate({ _id: id, createdBy: userId }, productData, { new: true});
    }

    // Delete a product by its ID for a specific user.
    async deleteProduct(id, userId) {
        return await this.Product.findOneAndDelete({ _id: id, createdBy: userId });
    }

    // Private validation method for product data.
    validateProductData(data) {
        if (data.name && data.name.trim().length === 0) {
            throw new Error('Product name is required');
        }
        
        if (data.quantity < 0) {
            throw new Error('Quantity cannot be negative');
        }
        
        if (data.unitPrice < 0) {
            throw new Error('Price cannot be negative');
        }
    }
}

export default ProductService;

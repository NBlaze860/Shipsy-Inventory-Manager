class ProductService {
    constructor(ProductModel) {
        this.Product = ProductModel;
    }

    // Create a new product with validation.
    async createProduct(productData, userId) {
        this.validateProductData(productData);
        const product = new this.Product({ ...productData, createdBy: userId });
        const savedProduct = await product.save();
        if (!savedProduct) {
            throw new Error('Failed to create product');
        }
        return savedProduct;
    }

    // Retrieve all products for a specific user.
    async getProducts(userId) {
        return await this.Product.find({ createdBy: userId });
    }

    // Retrieve a single product by its ID for a specific user.
    async getProductById(id, userId) {
        const product = await this.Product.findOne({ _id: id, createdBy: userId });
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }

    // Update an existing product for a specific user.
    async updateProduct(id, productData, userId) {
        this.validateProductData(productData);
        const product = await this.Product.findOneAndUpdate({ _id: id, createdBy: userId }, productData, { new: true});
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }

    // Delete a product by its ID for a specific user.
    async deleteProduct(id, userId) {
        const product = await this.Product.findOneAndDelete({ _id: id, createdBy: userId });
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
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

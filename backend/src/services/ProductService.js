class ProductService {
    constructor(ProductModel) {
        this.Product = ProductModel;
    }

    // Create a new product with validation.
    async createProduct(productData) {
        this.validateProductData(productData);
        const product = new this.Product(productData);
        return await product.save();
    }

    // Retrieve all products.
    async getProducts() {
        return await this.Product.find();
    }

    // Retrieve a single product by its ID.
    async getProductById(id) {
        return await this.Product.findById(id);
    }

    // Update an existing product.
    async updateProduct(id, productData) {
        this.validateProductData(productData);
        return await this.Product.findByIdAndUpdate(id, productData, { new: true});
    }

    // Delete a product by its ID.
    async deleteProduct(id) {
        return await this.Product.findByIdAndDelete(id);
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
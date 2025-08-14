class ProductService {
    constructor(ProductModel) {
        this.Product = ProductModel;
    }

    // Create a new product
    async createProduct(productData) {
        // Validate input data
        this.validateProductData(productData);
        
        // Create new product instance
        const product = new this.Product(productData);
        
        
        // Save to database
        return await product.save();
    }

    // Private validation method
    validateProductData(data) {
        if (!data.name || data.name.trim().length === 0) {
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

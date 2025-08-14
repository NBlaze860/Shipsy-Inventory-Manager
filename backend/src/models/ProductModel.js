import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    enum: ['electronics', 'clothing', 'food', 'books', 'other'],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  totalValue: {
    type: Number,
    default: 0,
  },
  createdBy: {
    //A reference field linking products to users who created them
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

// pre-hook (middleware) that runs before the save operation.
productSchema.pre('save', function(next) {
  this.totalValue = this.quantity * this.unitPrice;
  next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;
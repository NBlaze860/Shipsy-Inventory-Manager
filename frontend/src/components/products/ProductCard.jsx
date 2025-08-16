import React from "react";

const ProductCard = ({ product, onEdit, onDelete }) => {
  console.log("ProductCard received product:", product);

  // Ensure we have valid values
  const name = product?.name || "Unnamed Product";
  const category = product?.category || "other";
  const description = product?.description || "";
  const quantity = Number(product?.quantity) || 0;
  const unitPrice = Number(product?.unitPrice) || 0;
  const totalValue = (quantity * unitPrice).toFixed(2);

  return (
    <div className="bg-white shadow sm:rounded-lg p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{name}</h3>
          <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-medium mt-2 px-2.5 py-0.5 rounded-full">
            {category}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(product)}
            className="text-indigo-600 hover:text-indigo-900"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(product._id || product.id)}
            className="text-red-600 hover:text-red-900"
          >
            Delete
          </button>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-500">
        {description
          ? description.length > 30
            ? `${description.substring(0, 30)}...`
            : description
          : "No description"}
      </p>
      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-gray-700 font-medium">Price</p>
          <p className="text-gray-900">${unitPrice}</p>
        </div>
        <div>
          <p className="text-gray-700 font-medium">Quantity</p>
          <p className="text-gray-900">{quantity}</p>
        </div>
        <div>
          <p className="text-gray-700 font-medium">Total Value</p>
          <p className="text-gray-900">${totalValue}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

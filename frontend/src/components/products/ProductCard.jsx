import React from 'react';

const ProductCard = ({ product, onEdit, onDelete }) => {
  const totalValue = (product.quantity * product.unitPrice).toFixed(2);

  return (
    <div className="bg-white shadow sm:rounded-lg p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
          <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-medium mt-2 px-2.5 py-0.5 rounded-full">
            {product.category}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={() => onEdit(product)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
          <button onClick={() => onDelete(product._id)} className="text-red-600 hover:text-red-900">Delete</button>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-500">{product.description}</p>
      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-gray-700 font-medium">Price</p>
          <p className="text-gray-900">${product.unitPrice}</p>
        </div>
        <div>
          <p className="text-gray-700 font-medium">Quantity</p>
          <p className="text-gray-900">{product.quantity}</p>
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

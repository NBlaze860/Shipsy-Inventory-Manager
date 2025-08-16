import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products, onEdit, onDelete }) => {
  // Ensure products is an array before mapping
  const productList = Array.isArray(products) ? products : [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {productList.map((product) => (
        <ProductCard
          key={product._id || product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProductList;

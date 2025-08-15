import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ProductList from '../components/products/ProductList';
import ProductModal from '../components/products/ProductModal';

// Placeholder for product actions
const fetchProducts = () => ({ type: 'products/fetchProducts' });
const createProduct = (product) => ({ type: 'products/createProduct', payload: product });
const updateProduct = (product) => ({ type: 'products/updateProduct', payload: product });
const deleteProduct = (id) => ({ type: 'products/deleteProduct', payload: id });

const Products = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { products, loading, error } = useSelector((state) => state.products || { products: [], loading: false, error: null });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'electronics',
    quantity: 0,
    unitPrice: 0,
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || 'An error occurred');
    }
  }, [error]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setCurrentProduct(null);
    setFormData({
      name: '',
      description: '',
      category: 'electronics',
      quantity: 0,
      unitPrice: 0,
    });
  };

  const handleCreate = () => {
    setIsEditMode(false);
    setFormData({
      name: '',
      description: '',
      category: 'electronics',
      quantity: 0,
      unitPrice: 0,
    });
    openModal();
  };

  const handleEdit = (product) => {
    setIsEditMode(true);
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      unitPrice: product.unitPrice,
    });
    openModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, category, quantity, unitPrice } = formData;
    if (!name || !category || quantity < 0 || unitPrice < 0) {
      return toast.error('Please fill all required fields');
    }

    if (isEditMode) {
      dispatch(updateProduct({ ...currentProduct, ...formData }));
    } else {
      dispatch(createProduct(formData));
    }
    closeModal();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-8 px-4 sm:px-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Welcome, {user?.username || 'User'}!
          </h1>
          <button
            onClick={handleCreate}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Product
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : products.length === 0 ? (
          <p>No products found. Add a new one to get started!</p>
        ) : (
          <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        isEditMode={isEditMode}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Products;
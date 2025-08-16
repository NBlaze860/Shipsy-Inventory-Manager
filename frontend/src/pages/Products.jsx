import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../store/productsSlice";
import { logout } from "../store/authSlice";
import ProductList from "../components/products/ProductList";
import ProductModal from "../components/products/ProductModal";
import Pagination from "../components/common/Pagination";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { products, loading, error } = useSelector((state) => state.products);

  // Ensure products is always an array
  const productList = Array.isArray(products) ? products : [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "electronics",
    quantity: 0,
    unitPrice: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  const totalPages = Math.ceil(productList.length / productsPerPage);
  const paginatedProducts = productList.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    console.log("User authenticated:", user);
    if (user) {
      dispatch(getAllProducts())
        .unwrap()
        .then((data) => {
          console.log("Products loaded:", data);
        })
        .catch((error) => {
          console.error("Failed to load products:", error);
          toast.error("Failed to load products");
        });
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || error || "An error occurred");
    }
  }, [error]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setCurrentProduct(null);
    setFormData({
      name: "",
      description: "",
      category: "electronics",
      quantity: 0,
      unitPrice: 0,
    });
  };

  const handleCreate = () => {
    setIsEditMode(false);
    setFormData({
      name: "",
      description: "",
      category: "electronics",
      quantity: 0,
      unitPrice: 0,
    });
    openModal();
  };

  const handleEdit = (product) => {
    console.log("Editing product:", product);
    setIsEditMode(true);
    setCurrentProduct(product);
    setFormData({
      name: product.name || "",
      description: product.description || "",
      category: product.category || "electronics",
      quantity: product.quantity || 0,
      unitPrice: product.unitPrice || 0,
    });
    openModal();
  };

  const handleDelete = (id) => {
    console.log("Deleting product with ID:", id);
    if (!id) {
      toast.error("Product ID is missing");
      return;
    }
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id))
        .unwrap()
        .then(() => {
          toast.success("Product deleted successfully");
        })
        .catch((error) => {
          console.error("Delete error:", error);
          toast.error(error.message || error || "Failed to delete product");
        });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message || error || "Failed to log out");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, category, quantity, unitPrice } = formData;

    // Convert to numbers for validation
    const numQuantity = Number(quantity);
    const numUnitPrice = Number(unitPrice);

    if (!name.trim() || !category || numQuantity < 0 || numUnitPrice < 0) {
      return toast.error("Please fill all required fields");
    }

    // Prepare data with proper types
    const productData = {
      name: name.trim(),
      description: formData.description || "",
      category,
      quantity: numQuantity,
      unitPrice: numUnitPrice,
    };

    if (isEditMode) {
      console.log("Updating product:", currentProduct);
      const productId = currentProduct?._id || currentProduct?.id;
      if (!productId) {
        toast.error("Product ID is missing");
        return;
      }
      dispatch(updateProduct({ id: productId, ...productData }))
        .unwrap()
        .then(() => {
          toast.success("Product updated successfully");
          closeModal();
        })
        .catch((error) => {
          console.error("Update error:", error);
          toast.error(error.message || error || "Failed to update product");
        });
    } else {
      dispatch(createProduct(productData))
        .unwrap()
        .then(() => {
          toast.success("Product created successfully");
          closeModal();
        })
        .catch((error) => {
          toast.error(error.message || error || "Failed to create product");
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-8 px-4 sm:px-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Welcome, {user?.username || "User"}!
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleCreate}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Product
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : productList.length === 0 ? (
          <p>No products found. Add a new one to get started!</p>
        ) : (
          <ProductList
            products={paginatedProducts}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
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

/**
 * Main Application Component
 * 
 * Root component that handles application routing, authentication state management,
 * and global UI components. Implements protected routes and conditional rendering
 * based on user authentication status.
 */

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ChatWidget from "./components/analytics/ChatWidget";
import { checkAuth } from "./store/authSlice";

/**
 * App Component
 * 
 * Main application component that manages routing, authentication state,
 * and global UI elements like notifications and chat widget.
 * 
 * @component
 * @returns {JSX.Element} Complete application with routing and authentication
 */
function App() {
  // Extract authentication state from Redux store
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Check authentication status on app initialization
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Router>
      {/* Global toast notification container */}
      <ToastContainer />
      
      {/* Application routing with authentication-based navigation */}
      <Routes>
        {/* Login route - redirect to products if already authenticated */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/products" />}
        />
        
        {/* Register route - redirect to products if already authenticated */}
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/products" />}
        />
        
        {/* Protected products route - redirect to login if not authenticated */}
        <Route
          path="/products"
          element={user ? <Products /> : <Navigate to="/login" />}
        />
        
        {/* Default route - redirect to products page */}
        <Route path="/" element={<Navigate to="/products" />} />
      </Routes>
      
      {/* AI chat widget - only show for authenticated users */}
      {user && <ChatWidget />}
    </Router>
  );
}

export default App;

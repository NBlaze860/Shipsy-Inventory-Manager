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

function App() {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/products" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/products" />}
        />
        <Route
          path="/products"
          element={user ? <Products /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/products" />} />
      </Routes>
      {user && <ChatWidget />}
    </Router>
  );
}

export default App;

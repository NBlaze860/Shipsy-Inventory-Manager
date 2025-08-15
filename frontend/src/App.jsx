import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/products" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/products" />} />
        <Route path="/products" element={user ? <Products /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/products" />} />
      </Routes>
    </Router>
  );
}

export default App;
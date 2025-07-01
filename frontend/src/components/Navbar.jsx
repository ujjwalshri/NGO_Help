import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <motion.nav 
      className="bg-blue-500 p-4"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", duration: 0.8 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <h1 className="text-white text-3xl font-bold">NGO Help</h1>
        </Link>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link 
                to="/dashboard"
                className="text-white hover:text-blue-100 transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/login"
              className="bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors"
            >
              Admin?
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
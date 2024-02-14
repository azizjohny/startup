import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import ProductsPage from '../pages/ProductsPage';
import SearchPage from '../pages/SearchPage';
import ProductPage from '../pages/ProductPage';
import './MainContent.css';

const MainContent = ({ setExpandedCategory }) => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to the top of the window when the route changes
    window.scrollTo(0, 0);

    // Close the subcategories in LeftSidebar when the route changes
    setExpandedCategory(null);

  }, [location.pathname, location.search, location.hash, setExpandedCategory]);

  return (
    <div className="MainContent">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/product" element={<ProductPage />} />
      </Routes>
    </div>
  );
};

export default MainContent;

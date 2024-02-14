import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import config from '../config';

const Header = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    try {
      // Navigate to the '/search' route with the search term as a query parameter
      navigate(`/search?q=${searchTerm}`);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleKeyPress = (e) => {
    // Check if the pressed key is 'Enter'
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header>
      <div className="header-content">
        <div className="logo-container">
          <a href="/" className="logo-link">
            <img src="/logo.jpg" alt="Logo" className="logo" />
          </a>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button type="button" className="search-button" onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

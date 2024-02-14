import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import './ProductsPage.css';
import config from '../config';

const SearchPage = () => {
  const location = useLocation();
  let searchTerm = new URLSearchParams(location.search).get('q');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const apiUrl = `${config.REACT_APP_BACKEND_URL}/product/getByName?product_name=${searchTerm}`;

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatPrice = (price) => {
    const formattedPrice = parseFloat(price).toFixed(0);
    return formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + " s'om";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(apiUrl, {
          params: {
            minPrice: 0,
            maxPrice: 100000000,
            orderType: true,
            size: 20,
            page: currentPage,
          },
        });

        setTotalPages(response.data.totalPages);
        // Assuming response.data.object contains direct image URLs
        const searchResultsWithFormattedPrice = response.data.object.map(result => ({
          ...result,
          price: formatPrice(result.price),
        }));

        setSearchResults(searchResultsWithFormattedPrice);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="search-page container">
      {loading && <p>Loading...</p>}
      <h2>Search Results for "{searchTerm}"</h2>
      <div className="row">
        {searchResults.map(result => (
          <div key={result.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div className="card">
              <Link to={`/product?product_name=${result.name}`}>
                {/* Use the direct image URL from the API response */}
                <img src={`${config.REACT_APP_BACKEND_URL}/images/name/${result.product_image}`} alt={result.name} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{result.name}</h5>
                  <p className="card-text">{result.price}</p>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <nav aria-label="Search results pagination">
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, i) => (
            <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(i)}>
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SearchPage;

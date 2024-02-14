import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import './ProductsPage.css';

const apiUrl = `${config.REACT_APP_BACKEND_URL}`;

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0); // New state to store total pages
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000000 });
  const [sortOrder, setSortOrder] = useState('true'); // Assume 'true' means ascending
  const location = useLocation();
  const navigate = useNavigate(); 

  const formatPrice = (price) => {
    const formattedPrice = parseFloat(price).toFixed(0);
    return formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + " s'om";
  };
  const formatPrice2 = (price) => {
    const formattedPrice = parseFloat(price).toFixed(0);
    return formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const searchParams = new URLSearchParams(location.search);
        const category = searchParams.get('category');
        const page = searchParams.get('page') || 0; // Default to page 0 if not specified

        const response = await axios.get(`${apiUrl}/product/category/${category}`, {
          params: {
            minPrice: priceRange.min,
            maxPrice: priceRange.max,
            orderType: sortOrder,
            page: page,
            size: 20,
          },
        });

        setTotalPages(response.data.totalPages); // Update state with total pages

        const productsWithFormattedPrice = await Promise.all(
          response.data.object.map(async (product) => {
            const imageResponse = await axios.get(`${apiUrl}/images/name/${product.product_image}`, { responseType: 'blob' });
            const productImage = URL.createObjectURL(imageResponse.data);
            const formattedPrice = formatPrice(product.price);

            return { ...product, product_image: productImage, price: formattedPrice };
          })
        );

        setProducts(productsWithFormattedPrice || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.search, priceRange, sortOrder]);

  const handlePriceChange = (event, type) => {
    const value = parseInt(event.target.value.replace(/\./g, ''), 10) || 0;
    setPriceRange((prev) => ({ ...prev, [type]: value }));
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handlePageChange = (newPage) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', newPage);
    navigate(`?${searchParams.toString()}`); // Updated navigation logic
  };

  return (
    <div className="products-page container">
      <div className="filters">
        <div>
          <label>Min Price:</label>
          <input type="text" value={formatPrice2(priceRange.min)} onChange={(e) => handlePriceChange(e, 'min')} />
        </div>
        <div>
          <label>Max Price:</label>
          <input type="text" value={formatPrice2(priceRange.max)} onChange={(e) => handlePriceChange(e, 'max')} />
        </div>
        <div>
          <label>Sort By Price:</label>
          <select value={sortOrder} onChange={handleSortChange}>
            <option value="true">Ascending</option>
            <option value="false">Descending</option>
          </select>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div className="card">
              <a href={`/product?product_name=${product.name}`} target="_blank" rel="noopener noreferrer">
                <img src={product.product_image} alt={product.name} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.price}</p>
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <nav aria-label="Product pagination">
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, i) => (
            <li key={i} className={`page-item ${new URLSearchParams(location.search).get('page') == i ? 'active' : ''}`}>
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

export default ProductsPage;
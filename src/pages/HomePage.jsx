import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';
import './HomePage.css';
import config from '../config';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const storeContainerRef = useRef(null);
  const brandContainerRef = useRef(null);
  const productsContainerRef = useRef(null);

  const [productImages, setProductImages] = useState([]);
  const [data, setData] = useState({ stores: [], brands: [], products: [] });

  const formatPrice = (price) => {
    const formattedPrice = parseFloat(price).toFixed(0);
    return formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + " s'om";
  };

  useEffect(() => {
    const fetchStoresAndBrands = async () => {
      try {
        const homeResponse = await axios.get(`${config.REACT_APP_BACKEND_URL}/home`);
        setData(prevData => ({ ...prevData, stores: homeResponse.data.stores, brands: homeResponse.data.brands }));
      } catch (error) {
        console.error('Error fetching stores and brands:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const productsResponse = await axios.get(`${config.REACT_APP_BACKEND_URL}/product/category/Smartfonlar`, {
          params: {
            minPrice: 1,
            maxPrice: 100000000,
            orderType: 'True',
          },
        });
  
        const productsData = productsResponse.data.object || [];
        const productPromises = productsData.map(async (product) => {
          const imageResponse = await axios.get(`${config.REACT_APP_BACKEND_URL}/images/name/${product.product_image}`, { responseType: 'blob' });
          const productImage = URL.createObjectURL(imageResponse.data);
          const formattedPrice = formatPrice(product.price);
  
          return { ...product, product_image: productImage, price: formattedPrice };
        });
  
        const productsWithImages = await Promise.all(productPromises);
        setData(prevData => ({ ...prevData, products: productsWithImages }));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchStoresAndBrands();
    fetchProducts();
  }, []);

  const handleScroll = (containerRef, direction) => {
    const container = containerRef.current;
    const scrollWidth = container.scrollWidth - container.clientWidth;
    const scrollDistance = container.clientWidth;

    if (direction === 'left') {
      container.scrollLeft = Math.max(container.scrollLeft - scrollDistance, 0);
    } else {
      container.scrollLeft = Math.min(container.scrollLeft + scrollDistance, scrollWidth);
    }
  };

  const renderScrollArrows = (containerRef, direction) => (
    <div className={`scroll-arrows ${direction === 'left' ? 'left-arrow' : 'right-arrow'}`} onClick={() => handleScroll(containerRef, direction)}>
      {direction === 'left' ? <FaChevronLeft /> : <FaChevronRight />}
    </div>
  );

  return (
    <div className="HomePage">
      {/* Stores Container */}
      <div className="container mb-4 position-relative">
        {renderScrollArrows(storeContainerRef, 'left')}
        <h2 className="mb-3">Stores</h2>
        <div className="row" ref={storeContainerRef} style={{ flexWrap: 'nowrap', overflowX: 'hidden' }}>
          {data.stores.map((store, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4 col-xl-3 store-item">
              <a href={store.store_link} target="_blank" rel="noopener noreferrer">
                <div className="image-container">
                  <img src={`/stores/${store.store_image}`} alt={`Store ${index}`} className="img-fluid" />
                </div>
              </a>
              <div className="item-info">
                <p className="item-name">{store.store_name}</p>
              </div>
            </div>
          ))}
        </div>
        {renderScrollArrows(storeContainerRef, 'right')}
      </div>

      {/* Brands Container */}
      <div className="container mb-4 position-relative">
        {renderScrollArrows(brandContainerRef, 'left')}
        <h2 className="mb-3">Brands</h2>
        <div className="row" ref={brandContainerRef} style={{ flexWrap: 'nowrap', overflowX: 'hidden' }}>
          {data.brands.map((brand, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4 col-xl-3 brand-item">
              <div className="image-container">
                <img src={`/brands/${brand.brand_image}`} alt={`Brand ${index}`} className="img-fluid" />
              </div>
              <div className="item-info">
                <p className="item-name">{brand.brand_name}</p>
              </div>
            </div>
          ))}
        </div>
        {renderScrollArrows(brandContainerRef, 'right')}
      </div>

      {/* Products Container */}
      <div className="container mb-4 position-relative">
        {renderScrollArrows(productsContainerRef, 'left')}
        <h2 className="mb-3">Popular Products</h2>
        <div className="row" ref={productsContainerRef} style={{ flexWrap: 'nowrap', overflowX: 'hidden' }}>
          {data.products.map((product, index) => (
            <Link to={`/product?product_name=${product.name}`} key={index} className="col-12 col-md-6 col-lg-4 col-xl-3 product-item-link">
              <div className="product-item">
                <div className="image-container">
                  <img src={product.product_image} alt={`Product ${index}`} className="img-fluid" />
                </div>
                <div className="item-info">
                  <p className="item-name">{product.name}</p>
                  <p className="item-price">{product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {renderScrollArrows(productsContainerRef, 'right')}
      </div>
    </div>
  );
};

export default HomePage;

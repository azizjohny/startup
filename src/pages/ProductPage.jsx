import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { useLocation } from 'react-router-dom';
import { DateTime } from 'luxon';
import 'chartjs-adapter-luxon';
import axios from 'axios';
import './ProductPage.css';
import config from '../config';


const apiUrl = `${config.REACT_APP_BACKEND_URL}`;


const ProductPage = () => {
  const chartRef = useRef(null);
  const [product, setProduct] = useState(null);
  const [productImageUrl, setProductImageUrl] = useState('');
  const [priceHistoryByStore, setPriceHistoryByStore] = useState({});
  const location = useLocation();
  const product_name = new URLSearchParams(location.search).get('product_name');
  const productUrl = `${apiUrl}/product/getAllPH?product_name=${product_name}`;

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(productUrl);
        const data = await response.json();
        if (data.success && data.object.length > 0) {
          const firstProduct = data.object[0];
          setProduct(firstProduct);

          if (firstProduct.product_image) {
            const imageResponse = await axios.get(`${apiUrl}/images/name/` + firstProduct.product_image, { responseType: 'blob' });
            const imageBlob = imageResponse.data;
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setProductImageUrl(imageObjectURL);
          }

          const historyByStore = firstProduct.priceHistory.reduce((acc, item) => {
            acc[item.store_name] = [...(acc[item.store_name] || []), item];
            return acc;
          }, {});

          setPriceHistoryByStore(historyByStore);
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, [apiUrl, product_name]);

  useEffect(() => {
    if (product && Object.keys(priceHistoryByStore).length > 0) {
      const ctx = chartRef.current.getContext('2d');

      const datasets = Object.entries(priceHistoryByStore).map(([store, history]) => {
        const color = getRandomColor();
        return {
          label: store,
          data: history.map(h => ({ x: DateTime.fromISO(h.date).toMillis(), y: h.price })),
          borderColor: color,
          backgroundColor: color,
        };
      });

      new Chart(ctx, {
        type: 'line',
        data: { datasets },
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
              },
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [product, priceHistoryByStore]);

  const formatPrice = (price) => {
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} s'om`;
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    return `#${Array.from({ length: 6 }, () => letters[Math.floor(Math.random() * 16)]).join('')}`;
  };

  // Function to find the product with the lowest latest price
  const findCheapestLatestPrice = () => {
    let lowestPrice = Infinity;
    let cheapestStore = null;

    Object.entries(priceHistoryByStore).forEach(([store, history]) => {
      const latestItem = history[history.length - 1];
      if (latestItem.price < lowestPrice) {
        lowestPrice = latestItem.price;
        cheapestStore = store;
      }
    });

    return { price: lowestPrice, store: cheapestStore };
  };

  // Call the function to find the cheapest latest price
  const cheapestLatest = findCheapestLatestPrice();

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-page">
      <div className="first-section">
        <div className="product-image-container">
          {productImageUrl && <img src={productImageUrl} alt={product.product_name} className="product-image" />}
        </div>
        <div className="product-details-container">
          <div className="product-details">
            <h2>{product.product_name}</h2>
            {/* Additional details can be added here */}
          </div>
        </div>
        <div className="chart-container">
          <canvas ref={chartRef} className="chart" />
        </div>
      </div>

      <div className="go-shopping-section">
        <h3>Go shopping</h3>
        {Object.entries(priceHistoryByStore).map(([store, history], index) => {
          const latestItem = history[history.length - 1];
          const isCheapest = store === cheapestLatest.store && latestItem.price === cheapestLatest.price;
          return (
            <div key={index} className={`product-item ${isCheapest ? 'lightning-border' : ''}`}>
              <img src={`/stores/${store}.png`} alt={store} className="store-image" />
              <div className="product-info">
                <p className={`price ${isCheapest ? 'lowest-price' : ''}`}>
                  Price: {formatPrice(latestItem.price)}
                </p>
              </div>
              <a href={latestItem.product_link} target="_blank" rel="noopener noreferrer">
                <button className="buy-button">
                  Buy
                </button>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductPage;

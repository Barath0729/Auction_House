/*import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

const products = [
  { id: 1, name: 'Santa Clock', price: '$50', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoC1-d91DxNu8FpQ1ytA78bh03yADKriO4hg&usqp=CAU' ,category: 'Clock'},
  { id: 2, name: 'Morfon bike', price: '$60', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL_I8NCJQbf14VfQBv3Fyfv0D9P4T8S-Z0gg&usqp=CAU',category: 'Coins' },
  { id: 3, name: 'Classic Ratio', price: '$70', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs3e9mwiFsJq7wv-ifwa3Go3KSA7p30BsLyQ&usqp=CAU' ,category: 'Miscellaneous'},
  { id: 4, name: 'Benz Elite Car', price: '$80', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMV-b4cBWumNY_-yQrXIYJe_9-sPOKNTQg_g&usqp=CAU' ,category: 'Miscellaneous'},
];

const ToggleButton = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All'); 



  const handleWatchlistClick = () => {
    navigate('/watchlist');
  };

  const handleProductClick = () => {
    navigate('/product');
  };

  const handleLogoutClick = () => {
    navigate('/');
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="toggle-container">
      <div>
        
        <button className="toggle-button" onClick={handleWatchlistClick}>
          Watchlist
        </button>
        <button className="toggle-button" onClick={handleProductClick}>
          Add Product
        </button>
      </div>
      <div className="user-info">
        <button className="toggle-button" onClick={handleLogoutClick}>
          Logout
        </button>
      </div>
      <div className="filter-dropdown">
        <select value={selectedCategory} onChange={(e) => handleCategorySelect(e.target.value)}>
          <option value="All">All</option>
          <option value="Coins">Coins</option>
          <option value="Stamps">Stamps</option>
          <option value="Things">Things</option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>
      </div>
      <div className="product-list">
        {products.map(product => (
          (selectedCategory === 'All' || product.category === selectedCategory) && (
            <div key={product.id} className="product-card">
              <img src={product.imageUrl} alt={product.name} />
              <div>
                <h3>{product.name}</h3>
                <p>{product.price}</p>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default ToggleButton;*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Details = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [bidPrice, setBidPrice] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [notification, setNotification] = useState('');


  const handleWatchlistClick = () => {
    navigate('/watchlist');
  };


  const handleLogoutClick = () => {
    navigate('/');
  };
  const handleProductClick = () =>{
    navigate('/product');
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleBidButtonClick = (product) => {
    setSelectedProduct(product);
    setBidPrice('');
  };

  const handleBidPriceChange = (e) => {
    setBidPrice(e.target.value);
  };

  const handleBidSubmit = async () => {
    if (Number(bidPrice) <= Number(selectedProduct.price)) {
      setNotification('Your price is too low.bid a better Price..!!');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8000/api/v1/product/${selectedProduct._id}/bid`, {
        bidPrice: bidPrice,
      });
      console.log(response.data);
      // Update the product with the new bid price in the frontend
      const updatedProducts = products.map((product) => {
        if (product._id === selectedProduct._id) {
          return {
            ...product,
            price: bidPrice,
          };
        }
        return product;
      });
      setProducts(updatedProducts);
      setNotification('Bid submitted successfully.');

    } catch (error) {
      console.error('Error updating bid price:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setNotification(error.response.data.message);
      } else {
        setNotification('An error occurred while updating bid price.');

      }
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/products');
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
        console.log("Fetched");
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = products.filter(product => product.category === selectedCategory);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  return (
    <div>
      <div>
        <button className="toggle-button" onClick={handleWatchlistClick}>
          Watchlist
        </button>
        <button className="toggle-button" onClick={handleProductClick}>
          Add Product
        </button>
      </div>
      <div className="user-info">
        <button className="toggle-button" onClick={handleLogoutClick}>
          Logout
        </button>
      </div>
      <h2>Products</h2>
      <div>
        <label htmlFor="category">Filter by Category:</label>
        <select id="category" onChange={handleCategoryChange} value={selectedCategory}>
        <option value="">All</option>
<option value="Electronics">Electronics</option>
<option value="Vehicles">Vehicles</option>
<option value="Books">Books</option>
<option value="miscellenous">Miscellaneous</option>
<option value="jewellary">Jewellary</option>
        </select>
      </div>
      <div className="product-list">
        {filteredProducts.map(product => (
          <div key={product._id} className="product-card">
            <div onClick={() => handleProductClick(product._id)}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>{product.seller}</p>
              <img src={`http://localhost:8000/${product.images[0].image}`} alt={product.name} style={{ maxWidth: '200px', maxHeight: '200px' }} />
            </div>
            <div className="bid-section">
              <button onClick={() => handleBidButtonClick(product)}>Make a Bid</button>
              {selectedProduct && selectedProduct._id === product._id && (
                <div className="bid-form">
                  <input type="text" value={bidPrice} onChange={handleBidPriceChange} placeholder="Enter Bid Price" />
                  {notification && <p className="notification">{notification}</p>}
                  <button onClick={handleBidSubmit}>Submit Bid</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;

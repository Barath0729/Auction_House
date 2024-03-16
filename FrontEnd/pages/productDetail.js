import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { productId } = useParams(); 
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        console.log("yes pid: ",productId);
        const response = await axios.get(`http://localhost:8000/api/v1/product/${productId}`);
        setProduct(response.data.product); 
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]); 

  return (
    <div>
      <h2>Product Details</h2>
      {product ? (
        <div>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Seller: {product.seller}</p>
          <img src={`http://localhost:8000/${product.images[0].image}`} alt={product.name} style={{ maxWidth: '200px', maxHeight: '200px' }} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetail;

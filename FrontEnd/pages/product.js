/*import React, { useState } from 'react';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePictureChange = (event) => {
    const selectedFile = event.target.files[0];
    setPicture(selectedFile);
    setPreviewURL(URL.createObjectURL(selectedFile));
  };

  const handleRemovePicture = () => {
    setPicture(null);
    setPreviewURL(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Product Name:', productName);
    console.log('Category:', category);
    console.log('Price:', price);
    console.log('Description:', description);
    console.log('Picture:', picture); 
    setProductName('');
    setCategory('');
    setPrice('');
    setDescription('');
    setPicture(null);
    setPreviewURL(null);
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input type="text" value={productName} onChange={handleProductNameChange} />
        </label>
        <br />
        <label>
          Category:
          <select value={category} onChange={handleCategoryChange}>
            <option value="">Select Category</option>
            <option value="dress">Dress</option>
            <option value="coins">Coins</option>
            <option value="stamps">Stamps</option>
            <option value="things">Things</option>
            <option value="miscellaneous">Miscellaneous</option>
          </select>
        </label>
        <br />
        <label>
          Price:
          <input type="text" value={price} onChange={handlePriceChange} />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={handleDescriptionChange}></textarea>
        </label>
        <br />
        {picture && (
          <div>
            <img src={previewURL} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />
            <button type="button" onClick={handleRemovePicture}>Remove Picture</button>
          </div>
        )}
        {!picture && (
          <label>
            Upload Picture:
            <input type="file" onChange={handlePictureChange} accept="image/*" />
          </label>
        )}
        <br />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default AddProduct;*/

import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        seller: '',
        stock: '',
        image: '' // Changed to string type for image URL
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/v1/product/new', formData);
            console.log(response.data);
            alert('Product added successfully!');
            setFormData({
                name: '',
                price: '',
                description: '',
                category: '',
                seller: '',
                stock: '',
                image: ''
            });
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Failed to add product. Please try again.');
        }
    };

    return (
        <div>
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label><br />
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required /><br />

                <label htmlFor="price">Price:</label><br />
                <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required /><br />

                <label htmlFor="description">Description:</label><br />
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} required /><br />

                <label htmlFor="category">Category:</label><br />
                <select id="category" name="category" value={formData.category} onChange={handleChange} required>
                    <option value="">Select a category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Vehicles">Vehicles</option>
                    <option value="Books">Books</option>
                    <option value="miscellaneous">Miscellaneous</option>
                    <option value="jewellary">Jewellary</option>
                </select><br />

                <label htmlFor="seller">Seller:</label><br />
                <input type="text" id="seller" name="seller" value={formData.seller} onChange={handleChange} required /><br />

                <label htmlFor="stock">Stock:</label><br />
                <input type="number" id="stock" name="stock" value={formData.stock} onChange={handleChange} required /><br />

                <label htmlFor="image">Image URL:</label><br />
                <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} required /><br />

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default AddProduct;


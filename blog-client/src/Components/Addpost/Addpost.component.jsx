import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

import "./AddProductForm.styles.css";

const Addpost = () => {
  const [product, setProduct] = useState({
    name: '',

  });

  // Function to handle changes in form inputs
  const handleChange = (e) => {
    if (e.target.name === 'file') {
      // If file input changes, read file data
      const file = e.target.files[0];
      const fileName = file.name;
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        // Convert file data to byte array
        const fileByteArray = Array.from(new Uint8Array(reader.result));
        // Update product state with file data
        setProduct({ ...product, fileName, file: fileByteArray });
      };
    } else {
      // If other inputs change, update product state
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwtToken');
      const decoded = jwtDecode(token);
      const userId = decoded.sub;

      const response = await fetch(`http://localhost:8080/v1/posts/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: product.name,
          description: product.description,
          price: product.price,
          fileName: product.fileName,
          file: product.file
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
    <Navbar/>
    <div className="add-product-form-container">
      <form onSubmit={handleSubmit} className="add-product-form">
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder={t("product.name")}
          required
        />
        <input
          type="text"
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder={t("description")}
          required
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder={t("price")}
          required
        />
        <input
          type="file"
          name="file"
          onChange={handleChange}
          required
        />
        <button type="submit">{t("add-product")}</button>
      </form>
    </div>
    </div>
  );
};

export default Addpost;

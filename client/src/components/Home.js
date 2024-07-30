import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
//using hook (useEfferct) to fatch the data to the Web first of all .
  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        console.log('Fetched products:', res.data); // Log fetched products for verification for debbug
        setProducts(res.data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setError(err.message || 'An error occurred while fetching products.');
        setLoading(false); // Set loading to false if there is an error
      });
  }, []);

  //loading for better Transition for the user and Debbug 
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="home">
    <div className="hero-image text-center">
      <h1>לֵךְ לְךָ</h1>
    </div>
    <div className="slogan text-center">Top-Tier Shoe Collection & Best Prices Online</div>
    <div className="container">
      <div className="product-grid">
        {products.slice(0, 9).map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.imageUrl} alt={product.name} />
            <div className="product-info">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">{product.price} NIS</p>
              <button className="btn btn-primary" onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
};
export default Home;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //using hook (useEffect) to fetch the data when mounting
  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false); //set loading to false once data is fetched
      })
      .catch(err => {
        console.error('Error fetching products:', err); //log error
        setError(err.message || 'An error occurred while fetching products.');
        setLoading(false); // Set loading to false if there is an error
      });
  }, []); // assure this effect runs only once when mounting

  //loading to indicate to the user that data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // main component rendering
  return (
    <div className="home">
      {/*hero section*/}
    <div className="hero-image text-center">
      <h1>לֵךְ לְךָ</h1>
    </div>
    <div className="slogan text-center">Top-Tier Shoe Collection & Best Prices Online</div>
    <div className="container">
      <div className="product-grid">
        {products.slice(0, 9).map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.imageUrl} alt={product.name} /> {/*product image */}
            <div className="product-info">
              <h5 className="card-title">{product.name}</h5>{/*product name */}
              <p className="card-text">{product.description}</p>{/* product description */}
              <p className="card-text">{product.price} NIS</p> {/*product price */}
              <div>
                <button className="btn btn-primary" onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
};
export default Home;

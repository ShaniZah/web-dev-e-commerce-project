import React, { useState, useEffect } from 'react';
//import Router so it will be easier to navigate the pages.
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import the navbar 
import NavBar from './components/Navbar';
//import homepage
import Home from './components/Home';
//import page for the cart func
import Cart from './components/Cart';
import PlaceOrder from './components/PlaceOrder';
//using axios for better and easier Communication with the server (fatching data from database /posting data into database)
import axios from 'axios';
import './App.css';

const App = () => {
  //Key name for the cart local storage (for me , ask shani if its ok !)
  const CART_STORAGE_KEY = 'cart';

  // Initialize state with localStorage data if available
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    console.log('Saving cart to localStorage:', cart);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // add a product to the cart 
  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.product._id === product._id);
    // update quantity if the product exists 
    if (existingProduct) {
      setCart(cart.map(item => item.product._id === product._id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      // add new product
      setCart([...cart, { product, quantity: 1, price: product.price }]);
    }
  };

  // update quantity of product in the cart
  const updateQuantity = (product, quantity) => {
    setCart(cart.map(item => item.product._id === product._id ? { ...item, quantity: Number(quantity) } : item));
  };

  //remove a product from the cart
  const removeFromCart = (product) => {
    setCart(cart.filter(item => item.product._id !== product._id));
  };

  // submit an order
  const submitOrder = (orderDetails, navigate) => {
    const order = {
      products: cart.map(item => ({ product: item.product._id, quantity: item.quantity })),
      customerName: orderDetails.name,
      email: orderDetails.email,
      phone: orderDetails.phone,
      address: orderDetails.address,
      shippingMethod: orderDetails.shippingMethod,
      totalAmount: cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + (orderDetails.shippingMethod === '3-day' ? 20 : 0)
    };
    
    // make post request to place the order
    axios.post('http://localhost:5000/api/orders', order)
      .then(res => {
        alert(`Order placed successfully! Order ID: ${res.data._id}`);
        setCart([]); // empty the cart
        localStorage.clear(); // Clean the localStorage after each Order 
        navigate('/'); // navigate back to homepage
      })
      .catch(err => {
        console.error('Error placing order:', err); 
        alert('Error placing order. Please try again.');
      });
  };

  return (
    <Router>
      <div className="App">
        <NavBar cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)} toggleCart={() => setIsCartOpen(!isCartOpen)} />
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/placeorder" element={<PlaceOrder cart={cart} totalAmount={cart.reduce((sum, item) => sum + item.price * item.quantity, 0)} submitOrder={submitOrder} />} />
        </Routes>
        {isCartOpen && <Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} closeCart={() => setIsCartOpen(false)} />}
      </div>
    </Router>
  );
};
export default App;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PlaceOrder.css';

const PlaceOrder = ({ cart, totalAmount, submitOrder }) => {
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    shippingMethod: '14-day'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit called');
    if (cart.length === 0) {
      alert('Your cart is empty. Please add items to your cart before placing an order.');
      return;
    }
    submitOrder(orderDetails, navigate);
  };
  



  return (
    <div className="container place-order">
      <h2>Place Order</h2>
      {cart.map(item => (
        <div key={item.product._id} className="row order-item mb-3">
          <div className="col-md-2">
            <img src={item.product.imageUrl} className="img-fluid" alt={item.product.name} />
          </div>
          <div className="col-md-3">
            <h5>{item.product.name}</h5>
          </div>
          <div className="col-md-2">
            <p>Quantity: {item.quantity}</p>
          </div>
          <div className="col-md-2">
            <p>Unit Price: {item.price} NIS</p>
          </div>
          <div className="col-md-3">
            <p>Total: {item.price * item.quantity} NIS</p>
          </div>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={orderDetails.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={orderDetails.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={orderDetails.phone}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={orderDetails.address}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <select
            name="shippingMethod"
            value={orderDetails.shippingMethod}
            onChange={handleChange}
            className="form-control"
          >
            <option value="14-day">14-day shipping (free)</option>
            <option value="3-day">3-day shipping (20 NIS)</option>
          </select>
        </div>
        <h3>Total: {totalAmount + (orderDetails.shippingMethod === '3-day' ? 20 : 0)} NIS</h3>
        <button type="submit" className="btn btn-primary">Place Order</button>
      </form>
    </div>
  );
};

export default PlaceOrder;

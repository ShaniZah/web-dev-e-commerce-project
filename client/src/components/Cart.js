import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cart, updateQuantity, removeFromCart, closeCart }) => {
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-modal">
      <div className="cart-content">
        <button className="close-btn" onClick={closeCart}>×</button>
        <h2>Shopping Cart</h2>
        {cart.map(item => (
          <div key={item.product._id} className="row cart-item mb-3">
            <div className="col-md-2">
              <img src={item.product.imageUrl} className="img-fluid" alt={item.product.name} />
            </div>
            <div className="col-md-3">
              <h5>{item.product.name}</h5>
            </div>
            <div className="col-md-2">
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.product, e.target.value)}
                min="1"
                className="form-control"
              />
            </div>
            <div className="col-md-2">
              <p>{item.price} NIS</p>
            </div>
            <div className="col-md-2">
              <p>Total: {item.price * item.quantity} NIS</p>
            </div>
            <div className="col-md-1">
              <button className="btn btn-danger" onClick={() => removeFromCart(item.product)}>Remove</button>
            </div>
          </div>
        ))}
        <div className="row">
          <div className="col text-right">
            <h3>Total: {totalAmount} NIS</h3>
            <Link className="btn btn-success" to="/placeorder" onClick={closeCart}>Place Order</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

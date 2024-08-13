import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

// cart component
const Cart = ({ cart, updateQuantity, removeFromCart, closeCart }) => {
  //calculate total amount
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div className="cart-modal">
      <div className="cart-content">
        {/*close button for cart model */}
        <button className="close-btn" onClick={closeCart}>×</button> 
        {/*cart title */}
        <h2>Shopping Cart</h2> 
        {/* map of the cart items to display each one */}
        {cart.map(item => (
          <div key={item.product._id} className="row cart-item mb-3">
            {/* column for the product image*/}
            <div className="col-md-2">
              <img src={item.product.imageUrl} className="img-fluid" alt={item.product.name} />
            </div>
            {/* column for the product name*/}
            <div className="col-md-3">
              <h5>{item.product.name}</h5>
            </div>
            {/* column for the quantity , users can update the quantity */}
            <div className="col-md-2">
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.product, e.target.value)}
                min="1"
                className="form-control"
              />
            </div>
            {/*column for the price of the product */}
            <div className="col-md-2">
              <p>{item.price} NIS</p>
            </div>
            {/*clumn for displaying the total price of the product (price*quantity) */}
            <div className="col-md-2">
              <p>Total: {item.price * item.quantity} NIS</p>
            </div>
            {/*column for the remove button, delete the item from the cart */}
            <div className="col-md-1">
              <button className="btn btn-danger" onClick={() => removeFromCart(item.product)}>Remove</button>
            </div>
          </div>
        ))}
        {/*row for the total amount and the place order button */}
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

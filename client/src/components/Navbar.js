import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ cartItemCount, toggleCart }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">לך לך</Link>
        <div className="navbar-nav ml-auto">
          <Link className="nav-link" to="/">Home</Link>
          <button
            className="nav-link btn"
            onClick={toggleCart}
            disabled={cartItemCount === 0}
            style={{ cursor: cartItemCount === 0 ? 'not-allowed' : 'pointer' }}
          >
            <img
              width="35"
              height="35"
              src="https://img.icons8.com/?size=100&id=9671&format=png&color=000000"
              alt="Cart"
            />
            {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

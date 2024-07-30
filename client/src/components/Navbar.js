import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ cartItemCount, toggleCart }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">לך לך</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
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
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

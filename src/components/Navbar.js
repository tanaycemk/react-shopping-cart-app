import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const Navbar = props => {
  return (
    <nav className="nav-wrapper">
      <div className="container">
        <Link to="/" className="brand-logo">
          Shopping
        </Link>

        <ul className="right">
          <li>
            <Link to="/">Shop</Link>
          </li>
          <li>
            <Link to="/cart">My cart</Link>
          </li>
          <li>
            <Link to="/cart">
              <i className="material-icons">shopping_cart</i>
            </Link>
          </li>
          <li>
            <strong>({props.items.length}) Items</strong>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    items: state.addedItems || 0
  };
};

export default connect(mapStateToProps)(Navbar);

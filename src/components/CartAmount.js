import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  ADD_SHIPPING,
  SUB_SHIPPING
} from "./actions/action-types/cart-actions";

class CartAmount extends Component {
  state = {
    shouldRedirect: false
  };

  componentWillUnmount() {
    if (this.refs.shipping && this.refs.shipping.checked)
      this.props.substractShipping();
  }

  handleChecked = e => {
    if (e.target.checked) {
      this.props.addShipping();
    } else {
      this.props.substractShipping();
    }
  };

  goToCheckout = e => {
    e.preventDefault();
    this.setState({
      shouldRedirect: true
    });
  };

  render() {
    const { shouldRedirect } = this.state;

    if (shouldRedirect) {
      return <Redirect to="/checkout" />;
    }

    return (
      <div className="container">
        <div className="collection">
          <li className="collection-item">
            <label>
              <input
                type="checkbox"
                ref="shipping"
                onChange={this.handleChecked}
              />
              <span>Shipping(+ Rs./=100)</span>
            </label>
          </li>
          <li className="collection-item">
            <b>Total: {this.props.total} (in Rs./=)</b>
          </li>
        </div>
        <div className="checkout">
          <button
            className="waves-effect waves-light btn"
            onClick={this.goToCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    addedItems: state.addedItems,
    total: state.total
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addShipping: () => {
      dispatch({ type: ADD_SHIPPING });
    },
    substractShipping: () => {
      dispatch({ type: SUB_SHIPPING });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartAmount);

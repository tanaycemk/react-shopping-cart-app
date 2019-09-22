import React, { Component } from "react";
import { connect } from "react-redux";
import { isEmail } from "validator";
import { performCheckout } from "./actions/cartActions";
import { Redirect } from "react-router-dom";

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState();
  }

  getInitialState = () => ({
    data: {
      firstName: "",
      lastName: "",
      email: "",
      mobileNo: "",
      province: "",
      city: "",
      zipcode: "",
      country: ""
    },
    errors: {},
    shouldRedirect: false
  });

  handleChange = e => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      },
      errors: {
        ...this.state.errors,
        [e.target.name]: ""
      }
    });
  };

  validate = () => {
    const { data } = this.state;
    let errors = {};

    if (data.firstName === "")
      errors.firstName = "First Name can not be blank.";
    if (data.lastName === "") errors.lastName = "Last Name can not be blank.";
    if (!isEmail(data.email)) errors.email = "Email must be valid.";
    if (data.email === "") errors.email = "Email can not be blank.";
    if (data.mobileNo === "") errors.mobileNo = "Mobile no can not be blank.";
    if (data.province === "") errors.province = "Province can not be blank.";
    if (data.city === "") errors.city = "City can not be blank.";
    if (data.zipcode === "") errors.zipcode = "Zipcode no can not be blank.";
    if (data.country === "") errors.country = "Country no can not be blank.";

    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();

    const { data } = this.state;

    const errors = this.validate();

    if (Object.keys(errors).length === 0) {
      console.log(data);

      this.props.performCheckout(data);

      this.setState({
        shouldRedirect: true
      });
    } else {
      this.setState({ errors });
    }
  };

  handleReset = e => {
    e.preventDefault();
    //Resetting the form
    this.setState(this.getInitialState());
  };

  render() {
    const { data, shouldRedirect, errors } = this.state;

    if (shouldRedirect) {
      return <Redirect to="/thankyou" />;
    }
    return (
      <div className="container checkout">
        <h3 className="center">Checkout Form</h3>
        <div className="box">
          <div className="row">
            <form className="col s12" onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="input-field col s6">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    className="validate"
                    value={data.firstName}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="firstName">First Name</label>
                  <span className="helper-text" data-error="wrong">
                    {errors.firstName}
                  </span>
                </div>
                <div className="input-field col s6">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    className="validate"
                    value={data.lastName}
                    onChange={this.handleChange}
                  />
                  <span className="helper-text" data-error="wrong">
                    {errors.lastName}
                  </span>
                  <label htmlFor="lastName">Last Name</label>
                </div>
                <div className="input-field col s6">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    className="validate"
                    value={data.email}
                    onChange={this.handleChange}
                  />
                  <span className="helper-text" data-error="wrong">
                    {errors.email}
                  </span>
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input-field col s6">
                  <input
                    id="mobileNo"
                    name="mobileNo"
                    type="text"
                    className="validate"
                    value={data.mobileNo}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="mobileNo">Mobile No</label>
                  <span className="helper-text" data-error="wrong">
                    {errors.mobileNo}
                  </span>
                </div>
                <div className="input-field col s6">
                  <input
                    id="province"
                    name="province"
                    type="text"
                    className="validate"
                    value={data.province}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="province">Province</label>
                  <span className="helper-text" data-error="wrong">
                    {errors.province}
                  </span>
                </div>
                <div className="input-field col s6">
                  <input
                    id="city"
                    name="city"
                    type="text"
                    className="validate"
                    value={data.city}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="city">City</label>
                  <span className="helper-text" data-error="wrong">
                    {errors.city}
                  </span>
                </div>
                <div className="input-field col s6">
                  <input
                    id="zipcode"
                    name="zipcode"
                    type="text"
                    className="validate"
                    value={data.zipcode}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="zipcode">Zipcode</label>
                  <span className="helper-text" data-error="wrong">
                    {errors.zipcode}
                  </span>
                </div>
                <div className="input-field col s6">
                  <input
                    id="country"
                    name="country"
                    type="text"
                    className="validate"
                    value={data.country}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="country">Country</label>
                  <span className="helper-text" data-error="wrong">
                    {errors.country}
                  </span>
                </div>

                <div className="col s12">
                  <div className="row">
                    <button
                      className="btn waves-effect waves-light"
                      type="submit"
                      name="action"
                    >
                      Submit
                      <i className="material-icons right">send</i>
                    </button>
                    {"   "}
                    <button
                      className="btn waves-effect waves-light red"
                      type="button"
                      name="action"
                      onClick={this.handleReset}
                    >
                      Reset
                      <i className="material-icons right">cancel</i>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    performCheckout: data => {
      dispatch(performCheckout(data));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Checkout);

import React, { Component } from "react";
import "./css/checkout.css";
import Cookies from "universal-cookie";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toLocaleString(),
      orderItems: [],
      isFired: false,
      isCheckedOut: false
    };
  }

  state = {};

  componentDidMount() {
    const cookie = new Cookies();

    fetch(
      `http://localhost:8080/orderItems/cart/orderItem/${cookie.get(
        "username"
      )}`
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          orderItems: json
        });
      });
    console.log(this.state.orderItems);
  }

  confirmCheckout = e => {
    e.preventDefault();
    var tempDate = new Date();
    var date =
      tempDate.getFullYear() +
      "-" +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getDate() +
      " " +
      tempDate.getHours() +
      ":" +
      tempDate.getMinutes();
    const currDate = date;

    this.setState({
      isCheckedOut: true
    });
    const cookie = new Cookies();

    fetch(`http://localhost:8080/products`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        orderItemList: this.state.orderItems
      })
    });

    fetch(`http://localhost:8080/orders/${cookie.get("username")}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        order_date: currDate,
        status: "purchased",
        user: {
          username: cookie.get("username")
        },
        orderItems: this.state.orderItems
      })
    });

     
  };

  render() {
    let alert;

    if (this.state.isCheckedOut) {
      alert = (
        <div class="alert alert-success">
          Items successfuly checked out! Thank you for shopping with us!
        </div>
      );
    }
    return (
      <div class="main">
        <div class="row">
          <div class="col-75">
            <div class="containerCheckout">
              <form onSubmit={this.confirmCheckout}>
                <div class="rowCheckout">
                  <div class="col-50">
                    <h3>Billing Address</h3>
                    <label for="fname">
                      <i class="fa fa-user" /> Full Name
                    </label>
                    <input
                      type="text"
                      id="fname"
                      name="firstname"
                      placeholder="John M. Doe"
                    />
                    <label for="email">
                      <i class="fa fa-envelope" /> Email
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      placeholder="john@example.com"
                    />
                    <label for="adr">
                      <i class="fa fa-address-card-o" /> Address
                    </label>
                    <input
                      type="text"
                      id="adr"
                      name="address"
                      placeholder="542 W. 15th Street"
                    />
                    <label for="city">
                      <i class="fa fa-institution" /> City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="New York"
                    />

                    <div class="row">
                      <div class="col-50">
                        <label for="state">State</label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          placeholder="NY"
                        />
                      </div>
                      <div class="col-50">
                        <label for="zip">Zip</label>
                        <input
                          type="text"
                          id="zip"
                          name="zip"
                          placeholder="10001"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="col-50">
                    <h3>Payment</h3>
                    <label for="fname">Accepted Cards</label>
                    <div class="icon-container">
                      <i class="fa fa-cc-visa" />
                      <img src="http://galado.com.my/gld-files/uploads/2015/06/major-Credit-Card-Logos-1024x211.png" />
                      <i class="fa fa-cc-amex" />
                      <i class="fa fa-cc-mastercard" />
                      <i class="fa fa-cc-discover" />
                    </div>
                    <label for="cname">Name on Card</label>
                    <input
                      type="text"
                      id="cname"
                      name="cardname"
                      placeholder="John More Doe"
                    />
                    <label for="ccnum">Credit card number</label>
                    <input
                      type="text"
                      id="ccnum"
                      name="cardnumber"
                      placeholder="1111-2222-3333-4444"
                    />
                    <label for="expmonth">Exp Month</label>
                    <input
                      type="text"
                      id="expmonth"
                      name="expmonth"
                      placeholder="September"
                    />
                    <div class="row">
                      <div class="col-50">
                        <label for="expyear">Exp Year</label>
                        <input
                          type="text"
                          id="expyear"
                          name="expyear"
                          placeholder="2018"
                        />
                      </div>
                      <div class="col-50">
                        <label for="cvv">CVV</label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          placeholder="352"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <label>
                  <input type="checkbox" checked="checked" name="sameadr" />{" "}
                  Shipping address same as billing
                </label>
                {alert}

                <input type="submit" value="Continue to checkout" class="btn" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Checkout;

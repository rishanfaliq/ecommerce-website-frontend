import React, { Component } from "react";
import "./css/cart.css";
import Cookies from "universal-cookie";
import CartItem from "./cart_item";
import UserProfile from "./UserProfile";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      total: 0,
      orderList: [],
      tempVar: 0,
      isRemoved: false,
      isDefault: false
    };
  }

  getCookies = () => {
    const cookies = new Cookies();
    cookies.get("username");
  };

  calculateCartTotal = cartArray => {
    let total;
    let tempVar = 0;

    for (let i = 0; i < cartArray.length; i++) {
      total = cartArray[i].product.price * cartArray[i].quantity;
      tempVar = tempVar + total;
    }
    return tempVar;
  };

  removeCartItem = id => {
    const cookies = new Cookies();

    fetch(`http://localhost:8080/orderItems/${id}/${cookies.get("username")}`, {
      method: "DELETE"
    });

    fetch(
      `http://localhost:8080/orderItems/cart/orderItem/${cookies.get(
        "username"
      )}`
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          cartItems: json
        });
      })
      .catch(function(error) {
        console.log(error);
      });

    this.setState({
      isRemoved: true
    });
  };

  componentDidMount() {
    const cookies = new Cookies();
    if(cookies.get("username") == "" || cookies.get("username") == "default")
    {
      cookies.set("username", "default");
      this.setState({
        isDefault: true
      })
    }
    fetch(
      `http://localhost:8080/orderItems/cart/orderItem/${cookies.get(
        "username"
      )}`
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          cartItems: json
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleLoginNoUser = () => {
    this.props.history.push({
      pathname: "/",
      state: { message: "default"} });
  }
  render() {
    let removedalert;

    if (this.state.isRemoved) {
      removedalert = (
        <div class="alert alert-success">
          Item Removed. Refresh for updated cart.
        </div>
      );
    }

    return (
      <div className="page">
        <form className="bg0 p-t-75 p-b-85">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 col-xl-7 m-lr-auto m-b-50">
                <div className="m-l-25 m-r--38 m-lr-0-xl">
                  {removedalert}
                  <div className="wrap-table-shopping-cart">
                    <table className="table-shopping-cart">
                      <tr className="table_head">
                        <th className="column-1">Product</th>
                        <th className="column-2" />
                        <th className="column-3">Price</th>
                        <th className="column-4">Quantity</th>
                        <th className="column-5">Total</th>
                      </tr>
                      {this.state.cartItems.map(cartItem => {
                        return (
                          <CartItem
                            key={cartItem.id}
                            cartItem={cartItem}
                            removeCartItem={this.removeCartItem}
                          />
                        );
                      })}
                    </table>
                  </div>

                  <div className="flex-w flex-sb-m bor15 p-t-18 p-b-15 p-lr-40 p-lr-15-sm">
                    <div className="flex-w flex-m m-r-20 m-tb-5">
                      <input
                        className="stext-104 cl2 plh4 size-117 bor13 p-lr-20 m-r-10 m-tb-5"
                        type="text"
                        name="coupon"
                        placeholder="Coupon Code"
                      />
                      <div className="flex-c-m stext-101 cl2 size-118 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-5">
                        Apply coupon
                      </div>
                    </div>

                    <div className="flex-c-m stext-101 cl2 size-119 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-10">
                      Update Cart
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-10 col-lg-7 col-xl-5 m-lr-auto m-b-50">
                <div className="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
                  <h4 className="mtext-109 cl2 p-b-30">Cart Totals</h4>

                  <div className="flex-w flex-t bor12 p-b-13">
                    <div className="size-208">
                      <span className="stext-110 cl2">Items:</span>
                    </div>

                    <div className="size-209">
                      <span className="mtext-110 cl2">
                        {this.state.cartItems.length}
                      </span>
                    </div>
                    {/* <div className="size-208">
                      <span className="stext-110 cl2">Shipping:</span>
                    </div>

                    <div className="size-209">
                      <span className="mtext-110 cl2">$00.00</span>
                    </div> */}
                  </div>

                  <div className="flex-w flex-t p-t-27 p-b-33">
                    <div className="size-208">
                      <span className="mtext-101 cl2">Total:</span>
                    </div>

                    <div className="size-209 p-t-1">
                      <span className="mtext-110 cl2">
                        ${this.calculateCartTotal(this.state.cartItems)}.00
                      </span>
                    </div>
                  </div>
                      {this.state.isDefault? 
                      <div>
                       <button 
                        disabled={true}
                     >
                       Unable to checkout. User not logged in
                       </button>
                       <br />
                         <a onClick={this.handleLoginNoUser}
                         className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer"
                       >
                        Click here to login
                         </a>
                         </div>
                      :
                     
                       <Link
                       to={"/checkout"}
                       className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer"
                     >
                       Proceed to Checkout
                     </Link>
                      }
                 
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Cart;

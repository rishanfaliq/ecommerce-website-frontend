import React, { Component } from "react";
import "./product.css";
import "./css/main.css";
import "./css/util.css";
import Detailed from "./detailed";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink
} from "react-router-dom";
import UpdateButton from "./updateButton";
import Modal from "react-awesome-modal";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateProduct: props.updateProduct
    };
  }
  state = {
    updateProduct: false,
    visible: false
  };

  makeVisible = () => {
    this.setState({ visible: true });
  };

  render() {
    return (
      <React.Fragment>
        <span class="shadow p-4 mb-4 ml-3 mr-3 bg-white">
          <div className="block2">
            <div className="block2-pic hov-img0">
              <img src={this.props.product.prodImage} alt="IMG-PRODUCT" />
              <Link
                to={`/home/${this.props.product.pid}`}
                params={{ pid: this.props.product.pid }}
                className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
              >
                View
              </Link>
            </div>

            <div className="block2-txt flex-w flex-t p-t-14">
              <div className="block2-txt-child1 flex-col-l ">
                <a
                  href="product-detail.html"
                  className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                />
                <div class="prodname">
                  {" "}
                  <b> {this.props.product.productName}</b>{" "}
                </div>
                <span className="stext-105 cl3">
                  $ {this.props.product.price}
                </span>
              </div>

              <div className="block2-txt-child2 flex-r p-t-3">
                <a className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                  <img
                    className="icon-heart1 dis-block trans-04"
                    src="https://image.flaticon.com/icons/svg/149/149217.svg"
                    alt="ICON"
                  />
                  <img
                    className="icon-heart2 dis-block trans-04 ab-t-l"
                    src="https://image.flaticon.com/icons/svg/149/149217.svg"
                    alt="ICON"
                  />
                  <div />
                </a>
              </div>
            </div>
          </div>
        </span>
      </React.Fragment>
    );
  }
}

export default Product;

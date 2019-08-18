import React, { Component } from "react";
import "./css/util.css";
import "./css/main.css";
import "./css/core-style.css";
import Cookies from "universal-cookie";
import UserProfile from "./UserProfile";
import Review from "./Review";
import SingleReview from "./SingleReview";
import NumberSpinner from "./NumberSpinnger";
import SimpleZoom from "react-simple-zoom";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      counter: 0,
      username: UserProfile.getName(),
      requiredQuantity: 1,
      cartItems: [],
      reviews: [],
      isAdded: false
    };
  }

  quantityIncrement = () => {
    this.setState({
      requiredQuantity: this.state.requiredQuantity + 1
    });

    {
      console.log(this.state.requiredQuantity);
    }
  };

  handleAddCart = e => {
    e.preventDefault();
    this.setState({
      isAdded: true
    });

    const cookies = new Cookies();

    if (cookies.get("username") === "") {
      return <div> NO USER LOGGED IN </div>;
    } else {
      fetch("http://localhost:8080/oitems", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          quantity: this.state.requiredQuantity,
          status: "cart",
          product: {
            pid: this.props.match.params.prodId
          },
          user: {
            username: cookies.get("username")
          }
        })
      });
    }
  };

  componentDidMount() {
    fetch(`http://localhost:8080/products/${this.props.match.params.prodId}`)
      .then(data => data.json())
      .then(json => {
        this.setState({
          product: json
        });
      });

    fetch(`http://localhost:8080/reviews/${this.props.match.params.prodId}`)
      .then(data => data.json())
      .then(json => {
        this.setState({
          reviews: json
        });
      });

    const cookies = new Cookies();
    this.setState({
      username: cookies.get("username")
    });
  }

  render() {
    const normalImage = this.state.product.prodImage;
    const hsImage = this.state.product.prod_hsimage;
    let addtocart;

    if (this.state.isAdded) {
      addtocart = (
        <div>
          <div class="alert alert-success">
            "" {this.state.product.productName} " added to Cart!
          </div>
        </div>
      );
    }

    return (
      <div className="detail">
        {addtocart}

        {/* <div className="detail">{this.props.match.params.productId}</div>; */}
        <section className="single_product_details_area d-flex align-items-center">
          <div className="single_product_thumb clearfix">
            <span class="border">
              <div class="zoom">
                <SimpleZoom
                  thumbUrl={this.state.product.prodImage}
                  fullUrl={this.state.product.prodImage}
                  zoomScale={1.9}
                  onEnterCallback={() => {
                    /* Do something on mouseenter */
                  }}
                  onExitCallback={() => {
                    /* Do something on mouseout */
                  }}
                  onExitTimeout={2000}
                />
              </div>
            </span>
          </div>

          <div className="details">
            <span />
            <h2>
              <b>{this.state.product.productName}</b>
            </h2>
            <hr />
            <p className="product-price">
              <span className="old-price" />
              <h4>
                <b>$ {this.state.product.price}</b>
              </h4>
            </p>
            <h5>
              {" "}
              Availability: <b>{this.state.product.quantity} </b>
            </h5>
            <p className="product-desc">{this.state.product.prod_desc}</p>

            <form className="cart-form clearfix">
              <div className="select-box d-flex  ">
                <select name="select" id="productSize" className="mr-5">
                  <option>Size: XL</option>
                  <option>Size: X</option>
                  <option>Size: M</option>
                  <option>Size: S</option>
                </select>
                <select name="select" id="productColor">
                  <option>Color: Black</option>
                  <option>Color: White</option>
                  <option>Color: Red</option>
                  <option>Color: Purple</option>
                </select>
                <NumberSpinner
                  product={this.state.product}
                  qIncrease={this.quantityIncrement}
                  requiredQuantity={this.state.requiredQuantity}
                />
              </div>
              <br />
              <br />
              <hr />

              <div className="cart-fav-box d-flex align-items-center">
                <button
                  className="btn btn-info btn-lg"
                  name="addtocart"
                  onClick={this.handleAddCart}
                >
                  <span className="glyphicon glyphicon-shopping-car" />
                  Add to Cart
                </button>
              </div>

              <div class="customreview">
                <Review productId={this.props.match.params.prodId} />
              </div>
            </form>
          </div>
        </section>
        <hr />
        <div class="review">
          <div class="setReview" />
          <span className="topicReview">
            <h4>
              <b>Reviews and Ratings</b>{" "}
            </h4>
          </span>
          <div class="viewReviews">
            {this.state.reviews.map(review => (
              <SingleReview
                iew
                username={this.state.username}
                review={review}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;

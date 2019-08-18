import React, { Component } from "react";
import "./product.css";
import Cookies from "universal-cookie";

class UpdateProduct extends Component {
  componentDidMount() {
    fetch("http://localhost:8080/products")
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          products: json,
          isClicked: false,
          isUpdated: false
        });
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      pname: "",
      price: 0,
      quantity: 0,
      image: "",
      description: "",
      status: ""
    };

    this.handleChangePname = this.handleChangePname.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
  }

  updateProduct = () => { 
    fetch(`http://localhost:8080/products/${this.props.product.pid}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        quantity: this.state.quantity,
        price: this.state.price
      })
    });
    this.setState({
      isUpdated: true
    })
  };

  handleChangePname = event => {
    this.setState({
      pname: event.target.value,
      value: event.target.value
    });
  };
  handleChangePrice = event => {
    this.setState({ price: event.target.value });
  };
  handleChangeQuantity = event => {
    this.setState({ quantity: event.target.value });
  };
  handleChangeImage = event => {
    this.setState({ image: event.target.value });
  };
  handleChangeStatus = event => {
    this.setState({ status: event.target.value });
  };
  hanldeChangeDescription = event => {
    this.setState({ description: event.target.value });
  };

  state = {};
  render() {

    let confirmation;
    const cookie = new Cookies();

    if (this.state.isUpdated) {
      confirmation = (
        <div class="alert alert-success">
           Product Updated! 
        </div>
      );
    } else {
    }
    
    return (
      <form id="updateProductForm" onSubmit={this.updateProduct}>
        <div>
          <span class="close" onClick={this.props.closeModal}>&times;</span>
          <div class="col-50">
            <br />
            <h3>Update Product</h3>
            <label for="pname">
              <i class="fa fa-user" /> Product Name
            </label>
            <input
              type="text"
              id="pname"
              placeholder={this.props.product.productName}
              onChange={this.handleChangePname}
              disabled

            />
            <label for="price">
              <i class="fa fa-envelope" /> Price
            </label>
            <input
              type="text"
              id="price"
              placeholder={this.props.product.price}
              onChange={this.handleChangePrice}
            />
            <label for="quantity">
              <i class="fa fa-institution" /> Amount in Stock
            </label>
            <input
              type="text"
              id="quantity"
              placeholder={this.props.product.quantity}
              onChange={this.handleChangeQuantity}
            />
            <label for="quantity">
              <i class="fa fa-institution" /> Description{" "}
            </label>
            <input
              type="text"
              id="description"
              placeholder={this.props.product.prod_desc}
              onChange={this.hanldeChangeDescription}
              disabled
              onFocus
            />
            <label for="image">
              <i class="fa fa-institution" /> Image Link
            </label>
            <input
              type="text"
              id="image"
              placeholder={this.props.product.prodImage}
              onChange={this.handleChangeImage}
              disabled 
              select

            />
            <label for="status">
              <i class="fa fa-institution" /> Status
            </label>

            <select
              placeholder={this.props.product.status}
              form="updateProductForm"
              onChange={this.handleChangeStatus}
              disabled

            >
              <option value="Available">Available </option>
              <option value="Unavailable"> Unavailable</option>
            </select>
            <br />
            <hr />
            {confirmation}
            <input type="submit" value="Update Product" class="updatebtn" />

            <a class="updatebtn" onClick={this.props.closeModal}>
              {" "}
              Reset to Default{" "}
            </a>
          </div>
        </div>
      </form>
    );
  }
}

export default UpdateProduct;

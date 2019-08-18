import React, { Component } from "react";
import "./product.css";
import Cookies from "universal-cookie";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pname: "",
      price: 0,
      quantity: 0,
      image: "",
      description: "",
      status: "",
      isAdded: false
    };

    this.handleChangePname = this.handleChangePname.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
  }

  addProduct = () => {
    const cookie = new Cookies();
    fetch(`http://localhost:8080/products`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        productName: this.state.pname,
        quantity: this.state.quantity,
        price: this.state.price,
        prodStock: this.state.quantity,
        prodImage: this.state.image,
        status: this.state.status,
        prod_desc: this.state.description
      })
    });
    this.setState({
      isUpdated: true
    })
  };

  handleChangePname = event => {
    this.setState({ pname: event.target.value });
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
 
    if (this.state.isAdded) {
      confirmation = (
        <div class="alert alert-success">
           Product Added! 
        </div>
      );
    } else {
    }
    return (
      <form id="addProductForm" onSubmit={this.addProduct}>
        <div>
        <span class="close" onClick={this.props.closeModal}>&times;</span>
          <div class="col-50">
            <br />
            <h3>Add New Product</h3>
            <label for="pname">
              <i class="fa fa-user" /> Product Name
            </label>
            <input type="text" id="pname" onChange={this.handleChangePname} />
            <label for="price">
              <i class="fa fa-envelope" /> Price
            </label>
            <input type="text" id="price" onChange={this.handleChangePrice} />
            <label for="quantity">
              <i class="fa fa-institution" /> Amount in Stock
            </label>
            <input
              type="text"
              id="quantity"
              onChange={this.handleChangeQuantity}
            />
            <label for="quantity">
              <i class="fa fa-institution" /> Description{" "}
            </label>
            <input
              type="text"
              id="description"
              onChange={this.hanldeChangeDescription}
            />
            <label for="image">
              <i class="fa fa-institution" /> Image Link
            </label>
            <input type="text" id="image" onChange={this.handleChangeImage} />
            <label for="status">
              <i class="fa fa-institution" /> Status
            </label>

            <select
              value={this.state.status}
              form="addProductForm"
              onChange={this.handleChangeStatus}
            >
              <option value="Available">Available </option>
              <option value="Unavailable"> Unavailable</option>
            </select>
            <br />
            <hr />
            <div class="addbtn">
              <input type="submit" value="Add Product" />
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default AddProduct;

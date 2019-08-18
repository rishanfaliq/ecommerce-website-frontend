import React, { Component } from "react";
import "./navbar";
import Product from "./product";
import Detailed from "./detailed";
import "./product.css";
import "./navbar.css";
import SideBar from "./sidebar";
import AdminProduct from "./AdminProduct";
import AddProduct from "./AddProduct";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Modal from "react-awesome-modal";

const divStyle = {
  display: "flex",
  flexWrap: "wrap",
  marginLeft: "200px",
  width: "100%",
  flexDirection: "row",
  justifyContent: "flex-start",
  overFlow: "auto",
  whiteSpace: "nowrap"
};

const horizontalScroll = {
  display: "inline-block"
};

class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      isLoaded: false,
      visible: false,
      productSelected: false,
      productId: null
    };
    this.handleProductSelected = this.handleProductSelected.bind(this);
  }

  handleProductSelected = productId => {
    this.state.productSelected = !this.state.productSelected;
    this.state.productId = productId;
  };

  openModal() {
    this.setState({
      visible: true
    });
  }

  closeModal() {
    this.setState({
      visible: false
    });
  }

  componentDidMount() {
    this.setState({
      products: this.props.filteredList
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      products: nextProps.filteredList
    });
  }

  state = {};
  render() {
    return (
      <div>
        <div style={divStyle}>
          {this.state.products.map(product => (
            <AdminProduct
              key={product.pid}
              onDelete={this.props.onDelete}
              product={product}
              productSelected={this.handleProductSelected}
              onIncrement={this.props.onIncrement}
            />
          ))}
          <Route exact path="/home/:pid" Component={Detailed} />
        </div>
        <button
          className="addButton"
          aria-label="Add a category"
          onClick={() => this.openModal()}
        >
          <img src="https://cdn0.iconfinder.com/data/icons/flat-design-database-set-1/24/button-filledcircle-add-512.png" />
        </button>
        <Modal
          visible={this.state.visible}
          width="500"
          height="800"
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}
        >
          <AddProduct
                          closeModal={this.closeModal}
                          />
        </Modal>
      </div>
    );
  }
}

export default AdminHome;

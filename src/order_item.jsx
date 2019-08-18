import React, { Component } from "react";
import Cookies from "universal-cookie";
import "./oitem.css";

class OrderItem extends Component {
  state = {
    orderList: []
  };

  componentDidMount() {}

  calculateTotalPrice = (price, quantity) => {
    let total = price * quantity;
    return total;
  };

  render() {
    return (
      <div>
        {this.props.date}
        <tr class="table_row">
          <td className="column-1">
            <div class="how-itemcart1">
              <div class="orderrow">
                {this.props.orderItem.product.id}
                <div class="imgorder">
                  <img src={this.props.orderItem.product.prodImage} alt="IMG" />
                </div>
              </div>
            </div>
          </td>
          <td class="column-2">
            <div class="column2">
              {this.props.orderItem.product.productName}
            </div>
          </td>
          <td class="column-3">
            <div class="column3"> $ {this.props.orderItem.product.price} </div>
          </td>
          <td class="column-4">
            <div class="column4">
              <div class="wrap-num-product flex-w m-l-auto m-r-0">
                <input
                  class="mtext-104 cl3 txt-center num-product"
                  type="number"
                  value={this.props.orderItem.quantity}
                />
              </div>
            </div>
          </td>
          <td class="column-5">
            <div class="column5">
              ${" "}
              {this.calculateTotalPrice(
                this.props.orderItem.product.price,
                this.props.orderItem.quantity
              )}
            </div>
          </td>
          <td class="column-6">
            <div class="column6">
              <b>
                {" "}
                <strong> # {this.props.orderid}</strong>
              </b>
            </div>
          </td>
        </tr>
      </div>
    );
  }
}

export default OrderItem;

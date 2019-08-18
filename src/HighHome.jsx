import React, { Component } from "react";
import SearchBar from "./SearchBar";
import Home from "./home";
import Cookies from "universal-cookie";

class HighHome extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    filteredList: [],
    originalList: [],
    welcome: ""
  };

  componentDidMount() {
    fetch("http://localhost:8080/products")
      .then(res => res.json())
      .then(json => {
        this.setState({
          originalList: json,
          filteredList: json
        });
      });
  }

  handleChange(e) {
    let currentList = [];
    let newList = [];

    if (e.target.value !== "") {
      currentList = this.state.originalList;
      newList = currentList.filter(item => {
        const lc = item.productName.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = this.state.originalList;
    }
    this.setState({
      filteredList: newList
    });
  }

  render() {
    let welcome;
    const cookie = new Cookies();

    if (this.props.location.state != null) {
      welcome = (
        <div class="alert alert-success">
          {this.props.location.state.welcome} {cookie.get("username")} !
        </div>
      );
    } else {
    }

    return (
      <div>
        {welcome}
        <SearchBar handleChange={this.handleChange} />
        <Home filteredList={this.state.filteredList} />
      </div>
    );
  }
}

export default HighHome;
